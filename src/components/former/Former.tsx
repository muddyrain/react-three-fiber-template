import React, { useState, useEffect, FC } from 'react'
import { Form, Row, Col, Button, FormProps, ButtonProps, FormInstance, FormItemProps } from 'antd'
import _ from 'lodash'
import { Align } from '@bees/ui'
import styles from './index.module.less'
import regulars from './regulars'
import elements, { elementsProps } from './elements'
import { CommonComponentsProps } from '@/interface/commonComponentsProps'
import { Rule } from 'antd/lib/form'
export type RecordType = { [key: string]: any }

type viewtype = keyof typeof elements
type RegularsType = keyof typeof regulars
type RulesType = Omit<Rule, 'type'> & { type: RegularsType }
interface FormerItemProps {
  key: string // 关键字段
  label?: string // 标题
  hide?: boolean | ((record: RecordType, index: number) => boolean) // 是否隐藏保留 key 关键字的隐藏状态 => Boolean; default: null;
  visible?: boolean | ((record: RecordType, index: number) => boolean) // 是否显示(销毁 key 关键字的隐藏状态) => Boolean
  initialValue?: any // 初始值
  required?: boolean // 是否必填
  requiredMsg?: string // 必填时提示文案 => 请[填写|选择]${label} | requiredMsg
  rules?: RulesType[] // 校验规则 => 校验规则 => [{ required, pattern, message, type, ... }, ...]
  props?: FormItemProps // 表单项 Props => { className, style, help, ... }
  view: viewtype | JSX.Element // 组件 => 'Input' | Element | Node
  viewProps?: elementsProps[viewtype] // 组件 Props => {}
  onlyEntryNumber?: boolean // 仅支持输入数字
  width?: number // 宽度 => 220
  placeholder?: string // 前置文字 => placeholder || 请填写${item.label}
  allowClear?: boolean // 支持清除 => true || false
  span?: number // Col 独立布局块
}
export interface FormerProps extends CommonComponentsProps, Pick<FormProps, 'onFieldsChange' | 'onValuesChange'> {
  /** formProps 配置项 */
  formProps?: FormProps
  /** 经 Former.useForm() 创建的 form 控制实例，不提供时会自动创建 */
  form?: FormInstance<RecordType>
  /** form数据配置 */
  datasource?: FormerItemProps[] | ((value: RecordType) => FormerItemProps[])
  /** label 标签布局(24栅格) */
  labelCol?: number
  /** 内容包装 布局(24栅格) */
  wrapperCol?: number
  /** 间隔大小 */
  gutter?: number
  /** 一排几个 */
  column?: number
  /** 提交表单时的操作 参数: values 表单项 */
  onSubmit?: (values: object) => void
  /** 重置表单时的操作 参数: values 表单项 */
  onReset?: (values: object | undefined) => void
  /** 提交按钮文字 */
  submitText?: React.ReactNode
  /** 重置按钮文字 */
  resetText?: React.ReactNode
  /** 提交按钮配置项 */
  submitProps?: ButtonProps
  /** 重置按钮配置项 */
  resetProps?: ButtonProps
  /** 自定义渲染操作 */
  renderActions?: ((submit: () => void, reset: () => void) => void) | null
}
const Former: FC<FormerProps> = ({
  formProps,
  form,
  datasource,
  labelCol,
  wrapperCol,
  gutter,
  column,
  onFieldsChange,
  onValuesChange,
  onSubmit,
  submitText,
  submitProps,
  onReset,
  resetText,
  resetProps,
  renderActions,
  className,
  style
}) => {
  const datasourceType = Object.prototype.toString.call(datasource)
  const [initForm] = Form.useForm()
  const $form = form || initForm
  const [formdata, setFormdata] = useState<RecordType>({}) // 记录更新值
  useEffect(() => {
    const values = $form.getFieldsValue()
    const result = _.isEqual(values, formdata)
    if (!result) {
      setFormdata(values)
    }
  }, [formdata])

  const colSpan = 24 / (column || 3)

  const handleProps = (item): React.ReactNode => {
    const props = {
      style: { width: item?.width || '100%' },
      placeholder:
        item?.view === 'RangePicker'
          ? undefined
          : item?.placeholder || `${['Select', 'Picker', 'TreeSelect'].some((key) => key.includes(item?.view)) ? '请选择' : '请输入'}${item?.label || ''}`,
      ...(item?.viewProps || {})
    }

    const type = Object.prototype.toString.call(item.view)
    if (type === '[object String]') {
      const Element = elements[item.view]
      return <Element {...props} />
    } else if (type === '[object Object]') {
      const Element = item.view
      return Element
    } else if (type === '[object Function]') {
      const Element = item.view
      return <Element {...props} />
    } else {
      throw 'view 参数不合法'
    }
  }
  // 处理FormItem项
  const procedureFormItem = (item: FormerItemProps) => {
    if (!item) return
    if (item?.key) {
      return (
        <Form.Item
          name={item.key}
          label={item?.label}
          initialValue={item?.initialValue}
          rules={[
            { required: item?.required, message: item?.requiredMsg },
            ...(item?.rules || []).map((item) => ({
              ...(regulars[item.type as RegularsType] || {}),
              ...item,
              ...(regulars[item.type as RegularsType] && {
                type: undefined
              })
            }))
          ]}
          {...(item?.onlyEntryNumber
            ? {
                getValueFromEvent: (e) => e.target.value.replace(/[^\d.]/g, '')
              }
            : {})}
          {...(item?.props || {})}
        >
          {handleProps(item)}
        </Form.Item>
      )
    } else {
      return (
        <Form.Item label={item?.label} {...(item?.props || {})}>
          {item.view as string}
        </Form.Item>
      )
    }
  }

  // 处理操作行
  const procedureAction = () => {
    // 重置
    const reset = () => {
      const result = onReset && onReset(undefined)
      if (!result) {
        $form.resetFields()
        setFormdata($form.getFieldsValue())
      }
    }

    if (Object.prototype.toString.call(renderActions) === '[object Function]') {
      return (
        renderActions &&
        renderActions(() => {
          $form.validateFields().then((values) => {
            onSubmit && onSubmit(values)
          })
        }, reset)
      )
    } else if (resetText && submitText) {
      return (
        <Align align='cm' gutter={16}>
          <Button {...resetProps} onClick={reset}>
            {resetText}
          </Button>
          <Button type='primary' htmlType='submit' {...submitProps}>
            {submitText}
          </Button>
        </Align>
      )
    } else if (submitText) {
      return (
        <Button type='primary' htmlType='submit' {...submitProps}>
          {submitText}
        </Button>
      )
    } else if (resetText) {
      return (
        <Button {...resetProps} onClick={reset}>
          {resetText}
        </Button>
      )
    }
  }

  return (
    <Form
      {...formProps}
      className={`${styles.former} ${className}`}
      style={style}
      form={$form}
      name='former'
      labelCol={{ span: labelCol }}
      wrapperCol={{ span: wrapperCol }}
      onFinish={(values) => {
        onSubmit!(values)
      }}
      onFieldsChange={onFieldsChange}
      onValuesChange={(changedValues, allValues) => {
        setFormdata(allValues)
        onValuesChange!(changedValues, allValues)
      }}
    >
      <>
        <Row gutter={gutter}>
          {(() => {
            if (datasourceType === '[object Function]') {
              return (datasource as Function)(formdata)
            } else if (datasourceType === '[object Array]') {
              return datasource
            } else {
              return []
            }
          })().map((item: FormerItemProps, index: number) =>
            (() => {
              const type = Object.prototype.toString.call(item?.visible)
              if (!(type === '[object Boolean]' && item.visible === false)) {
                return (
                  <Col
                    key={index}
                    span={item?.span || colSpan}
                    style={(() => {
                      if (Object.prototype.toString.call(item?.hide) === '[object Boolean]' && item.hide) {
                        return { display: 'none' }
                      }
                      return {}
                    })()}
                  >
                    {procedureFormItem(item)}
                  </Col>
                )
              }
            })()
          )}
        </Row>
        {procedureAction()}
      </>
    </Form>
  )
}

Former.defaultProps = {
  formProps: {},
  className: '',
  style: {},
  form: undefined, // 经 Former.useForm() 创建的 form 控制实例，不提供时会自动创建
  labelCol: 8,
  wrapperCol: 16,
  gutter: 0,
  column: 3, // 列数
  // [{
  //   key: undefined, // 关键字段
  //   label: undefined, // 标题
  //   hide: null, // 是否隐藏保留 key 关键字的隐藏状态 => Boolean; default: null;
  //   visible: null, // 是否显示(销毁 key 关键字的隐藏状态) => Boolean
  //   initialValue: undefined, // 初始值
  //   required: false, // 是否必填
  //   requiredMsg: undefined, // 必填时提示文案 => 请[填写|选择]${label} | requiredMsg
  //   rules: [], // 校验规则 => 校验规则 => [{ required, pattern, message, type, ... }, ...]
  //   校验规则:type(校验规则类型) => mobile | mail | IDCard | mobile_telephone | telephone | amount | bankCard | disabledCertificate | postalCode
  //   props: {}, // 表单项 Props => { className, style, help, ... }
  //   view: 'input', // 组件 => 'Input' | Element | Node
  //   viewProps: {}, // 组件 Props => {}
  //   onlyEntryNumber: false, // 仅支持输入数字
  //   width: 220, // 宽度 => 220
  //   placeholder: undefined, // 前置文字 => placeholder || 请填写${item.label}
  //   allowClear: false, // 支持清除 => true || false
  //   span: undefined, // Col 独立布局块
  // }]
  datasource: [], // 数据源 => [] | (formdata = {}) => ([])
  onFieldsChange: (changedFields, allFields) => null, // 字段更新时触发回调事件
  onValuesChange: (changedValues, allValues) => null, // 字段值更新时触发回调事件
  onSubmit: (values = {}) => {}, // function
  submitText: '确定', // null | string
  submitProps: {},
  onReset: (values = {}) => {}, // function
  resetText: '重置', // null | string
  resetProps: {},
  renderActions: null // 自定义操作行，优先级高。 => (submit = () => { }, reset = () => { }) => { }, // return Node;
}

export default Former
