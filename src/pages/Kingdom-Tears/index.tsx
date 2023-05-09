import { FC } from 'react'
import * as THREE from 'three'
import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Preload, useIntersect, ScrollControls, Scroll, Image as ImageImpl } from '@react-three/drei'
import styles from './index.module.scss'
import { STATIC_SERVER_URL } from '@/constant'
import './scroll.scss'
const Image: FC<{
  c?: THREE.Color
  url: string
  scale?: [number, number] | number
  position?: [number, number, number]
  transparent?: boolean
}> = ({ c = new THREE.Color(), ...props }) => {
  const visible = useRef(false)
  const [hovered, hover] = useState(false)
  const ref = useIntersect<any>((isVisible) => (visible.current = isVisible))
  useFrame((state, delta) => {
    // 鼠标悬浮时的图片材质颜色变化
    ref.current.material.color.lerp(c.set(hovered ? '#fff' : '#ccc'), hovered ? 0.4 : 0.05)
    // 图片滚动到视区时大小缩放变化
    ref.current.material.zoom = THREE.MathUtils.damp(ref.current.material.zoom, visible.current ? 1 : 4, 4, delta)
  })
  return <ImageImpl ref={ref} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} {...props} />
}

const Images = () => {
  const { width, height } = useThree((state) => state.viewport)
  console.log(width, height)
  const group = useRef<THREE.Group>(null)
  return (
    <group ref={group}>
      {/* 第一页 */}
      <Image position={[0, 0, 0]} scale={[width, height]} url={STATIC_SERVER_URL + '/kingdom/images/0.jpg'} />
      <Image position={[0, 0, 1]} scale={3.2} url={STATIC_SERVER_URL + '/kingdom/images/banner.png'} transparent={true} />
      {/* 第2页 */}
      <Image position={[-2.5, -height + 1, 2]} scale={3} url={STATIC_SERVER_URL + '/kingdom/images/1.jpg'} />
      <Image position={[0, -height, 3]} scale={2} url={STATIC_SERVER_URL + '/kingdom/images/2.jpg'} />
      <Image position={[1.25, -height - 1, 3.5]} scale={1.5} url={STATIC_SERVER_URL + '/kingdom/images/3.jpg'} />
      {/* 第3页 */}
      <Image position={[0, -height * 1.5, 2.5]} scale={[6, 3]} url={STATIC_SERVER_URL + '/kingdom/images/4.jpg'} />
      {/* 第3页 */}
      <Image position={[0, -height * 2 - height / 4, 0]} scale={[width, height]} url={STATIC_SERVER_URL + '/kingdom/images/5.jpg'} />
      {/* 第4页 */}
      <Image position={[-3, -height * 3 - height / 4, 2]} scale={[width / 2.6, height / 2.675]} url={STATIC_SERVER_URL + '/kingdom/images/6.jpg'} />
      <Image position={[3, -height * 3 - height / 4, 1]} scale={[width / 2.5, height / 2]} url={STATIC_SERVER_URL + '/kingdom/images/7.jpg'} />
      {/* 第5页 */}
      <Image position={[-5, -height * 4, 0]} scale={[width / 3, height / 1.5]} url={STATIC_SERVER_URL + '/kingdom/images/8.jpg'} />
      <Image position={[0, -height * 4, 0]} scale={[width / 3, height / 1.5]} url={STATIC_SERVER_URL + '/kingdom/images/9.jpg'} />
      <Image position={[5, -height * 4, 0]} scale={[width / 3, height / 1.5]} url={STATIC_SERVER_URL + '/kingdom/images/10.jpg'} />
      {/* 第6页 */}
      <Image position={[0, -height * 5, 0]} scale={[width, height]} url={STATIC_SERVER_URL + '/kingdom/images/11.jpg'} />
      {/* 第7页 */}
      <Image position={[0, -height * 6, 1]} scale={[width, height]} url={STATIC_SERVER_URL + '/kingdom/images/12.jpg'} />
      <Image position={[-1.5, -height * 6, 3]} scale={2.5} url={STATIC_SERVER_URL + '/kingdom/images/link.png'} transparent={true} />
    </group>
  )
}

const Fragment: FC = () => {
  return (
    <div className={styles['container']}>
      <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ScrollControls damping={1} pages={7}>
            <Scroll>
              <Images />
            </Scroll>
            <Scroll html>
              <h1 className={styles['text']}>王</h1>
              <h1 className={styles['text']}>国</h1>
              <h1 className={styles['text']}>之</h1>
              <h1 className={styles['text']}>泪</h1>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
      <div className={styles['shikar']}></div>
    </div>
  )
}
export default Fragment
