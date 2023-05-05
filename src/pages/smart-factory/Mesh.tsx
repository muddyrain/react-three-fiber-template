import { STATIC_SERVER_URL } from '@/constant'
import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { Group } from 'three'
import { emitter } from './event'
import { gsap } from 'gsap'

const Mesh = () => {
  const floor1Group = useRef<Group>(new Group())
  const floor2Group = useRef<Group>(new Group())
  const wallGroup = useRef<Group>(new Group())
  const floor1 = useGLTF(STATIC_SERVER_URL + '/models/floor1.glb')
  const floor2 = useGLTF(STATIC_SERVER_URL + '/models/floor2.glb')
  const wall = useGLTF(STATIC_SERVER_URL + '/models/wall.glb')
  const initEvent = () => {
    /** 合并全部 */
    emitter.on('mergeAll', () => {
      gsap.to(floor1Group.current.position, {
        y: 0,
        duration: 3
      })
      gsap.to(floor2Group.current.position, {
        y: 0,
        duration: 3
      })
      gsap.to(wallGroup.current.position, {
        y: 0,
        duration: 3
      })
    })
    /** 展示全部 */
    emitter.on('showAll', () => {
      gsap.to(floor1Group.current.position, {
        y: -100,
        duration: 3
      })
      gsap.to(floor2Group.current.position, {
        y: 10,
        duration: 3
      })
      gsap.to(wallGroup.current.position, {
        y: 150,
        duration: 3
      })
    })
  }
  useEffect(() => {
    floor1Group.current = floor1.scene
    floor2Group.current = floor2.scene
    wallGroup.current = wall.scene

    initEvent()
  }, [])
  return (
    <>
      <primitive object={floor1.scene} />
      <primitive object={floor2.scene} />
      <primitive object={wall.scene} />
    </>
  )
}

export default Mesh
