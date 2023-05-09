import { STATIC_SERVER_URL } from '@/constant'
import { FC, forwardRef, useEffect, useRef, useState } from 'react'
import mapGif from './image/map.gif'
import locationImg from './image/location.png'
import * as THREE from 'three'
import { Canvas, Euler, Vector3, useLoader, useThree } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { TextureLoader } from 'three'
import { useMouseMove } from './useMouseMove'
const Room: FC<{
  roomIndex: number
  textureUrl: 'livingroom' | 'kitchen' | 'blalcony'
  position: Vector3
  euler: Euler
}> = ({ position, euler, roomIndex, textureUrl }) => {
  const [materials, setMaterials] = useState<THREE.MeshBasicMaterial[]>([])
  const textures = useLoader(TextureLoader, [
    STATIC_SERVER_URL + `/vr/${textureUrl}/${roomIndex}_l.jpg`,
    STATIC_SERVER_URL + `/vr/${textureUrl}/${roomIndex}_r.jpg`,
    STATIC_SERVER_URL + `/vr/${textureUrl}/${roomIndex}_u.jpg`,
    STATIC_SERVER_URL + `/vr/${textureUrl}/${roomIndex}_d.jpg`,
    STATIC_SERVER_URL + `/vr/${textureUrl}/${roomIndex}_b.jpg`,
    STATIC_SERVER_URL + `/vr/${textureUrl}/${roomIndex}_f.jpg`
  ])
  useEffect(() => {
    textures.forEach((texture) => {
      const url = texture.image.src as string
      if (url.includes('d') || url.includes('u')) {
        texture.rotation = Math.PI
        texture.center = new THREE.Vector2(0.5, 0.5)
      }
      materials.push(new THREE.MeshBasicMaterial({ map: texture }))
    })
    setMaterials([...materials])
  }, [])
  return (
    <mesh position={position} rotation={euler} material={materials} scale={[1, 1, -1]}>
      <boxGeometry args={[10, 10, 10]} />
    </mesh>
  )
}
const WatchMove = ({ container }) => {
  const { camera } = useThree()
  useMouseMove(container, camera)
  return <></>
}

const Fragment: FC = () => {
  const tagRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <div className='w-full h-full relative' ref={containerRef}>
      {/* camera={{ position: [0, 0, 0], far: 1000, near: 0.1, fov: 75 }} */}
      <Canvas shadows>
        <Room roomIndex={0} textureUrl={'livingroom'} position={[0, 0, 0]} euler={[0, 0, 0]} />
        {/* <mesh>
          <boxGeometry />
          <meshBasicMaterial color='red' />
        </mesh> */}
        <axesHelper args={[10]} />
        <WatchMove container={containerRef} />
      </Canvas>
      <div className='w-[300px] h-[260px] absolute left-0 bottom-0'>
        <div className='absolute w-[30px] h-[30px] tag' ref={tagRef}>
          <img className='w-full h-full' src={locationImg} alt='' />
        </div>
        <img className='w-full h-full' src={mapGif} alt='' />
      </div>
    </div>
  )
}
export default Fragment
