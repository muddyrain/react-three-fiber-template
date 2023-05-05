import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { FC } from 'react'
import Mesh from './Mesh'
import Scene from './Scene'
import Page from './Page'

const Fragment: FC = () => {
  return (
    <div className='relative w-full h-full'>
      <Canvas shadows gl={{ antialias: true, logarithmicDepthBuffer: true }} camera={{ far: 100000, fov: 75, position: [100, 300, 600] }}>
        {/* 物体 */}
        <Mesh />
        {/* 轨道控制器 */}
        <OrbitControls />
        {/* 坐标辅助器 */}
        <axesHelper args={[50]} />
        {/* 平行光 */}
        <directionalLight intensity={1} position={[10, 100, 10]} />
        {/* 环境 */}
        <Scene />
      </Canvas>
      {/* 页面 */}
      <Page />
    </div>
  )
}
export default Fragment
