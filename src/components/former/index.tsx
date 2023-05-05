import { FC } from 'react'
import Fromer, { FormerProps, RecordType } from './Former'
import { Form, FormInstance } from 'antd'
export type TypeComponent = FC<FormerProps> & {
  useForm: () => [FormInstance<RecordType>]
}
const TranComponent = Fromer as TypeComponent
TranComponent.useForm = Form.useForm
export default TranComponent
