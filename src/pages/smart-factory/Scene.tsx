import { STATIC_SERVER_URL } from '@/constant'
import { useCubeTexture } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { TextureLoader } from 'three'

export const useScene = () => {
  const { scene } = useThree()
  const texture = useCubeTexture(['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'], {
    path: STATIC_SERVER_URL + '/textures/sky/'
  })
  useEffect(() => {
    scene.background = texture
  }, [])
}

const Scene = () => {
  useScene()
  return <></>
}
export default Scene
