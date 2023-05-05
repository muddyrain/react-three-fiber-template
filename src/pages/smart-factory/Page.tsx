import { FC } from 'react'
import styles from './Page.module.scss'
import icon from './assets/bar.svg'
import { emitter } from './event'

const Item: FC<{
  onClick?: () => void
  text: string
}> = ({ text, onClick = () => null }) => {
  return (
    <div className={styles.item} onClick={onClick}>
      <img className={styles.icon} src={icon} />
      <span className={styles.text}>{text}</span>
    </div>
  )
}
const Fragment: FC = () => {
  return (
    <div className={`absolute top-0 left-0 z-10 w-full h-full ${styles.container}`}>
      <div className={`${styles.header} w-full h-[7.5%]`}>智慧园区管理系统平台</div>
      <div className={styles.main}>
        <div className={styles.left}>
          <Item
            text='分离显示'
            onClick={() => {
              emitter.emit('showAll')
            }}
          />
          <Item
            text='合并显示'
            onClick={() => {
              emitter.emit('mergeAll')
            }}
          />
        </div>
        <div className={styles.right}></div>
      </div>
    </div>
  )
}
export default Fragment
