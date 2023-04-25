import { FC, forwardRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { Mesh, Object3D } from 'three'
import * as THREE from 'three'
import { useFrame, useLoader } from '@react-three/fiber'

// 预先加载 车辆 模型
useGLTF.preload('./ferrari.glb')

// 主题材质
const bodyMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 1.0,
  roughness: 0.5,
  clearcoat: 1.0,
  clearcoatRoughness: 0.03,
  sheen: 0.5
})
// 通用轮缘材质
const detailsMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1.0,
  roughness: 0.5
})
// 玻璃材质
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0.25,
  roughness: 0,
  transmission: 1.0
})

const Chassis: FC<{ ref: any }> = forwardRef<Mesh>((_, ref) => {
  const gltfObj = useGLTF('./ferrari.glb')
  // 获取汽车模型对象
  const carModel = gltfObj.scene.children[0]
  // 获取汽车轮胎模型对象
  const rims = [
    carModel.getObjectByName('rim_fl') as Mesh,
    carModel.getObjectByName('rim_fr') as Mesh,
    carModel.getObjectByName('rim_rl') as Mesh,
    carModel.getObjectByName('rim_rr') as Mesh
  ]
  // 遍历轮缘对象组分别设置材质
  for (const rim of rims) {
    rim.material = detailsMaterial
  }
  // 获取汽车玻璃模型对象
  const glass = carModel.getObjectByName('glass') as Mesh
  glass.material = glassMaterial

  // 获取汽车主题模型对象
  const body = carModel.getObjectByName('body') as Mesh
  body.material = bodyMaterial
  const wheels: Array<Mesh> = []
  // 存放 轮胎模型对象
  wheels.push(
    carModel.getObjectByName('wheel_fl') as Mesh,
    carModel.getObjectByName('wheel_fr') as Mesh,
    carModel.getObjectByName('wheel_rl') as Mesh,
    carModel.getObjectByName('wheel_rr') as Mesh
  )

  // 添加 汽车底板阴影
  const shadow = useLoader(THREE.TextureLoader, './ferrari_ao.png')

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    for (const wheel of wheels) {
      wheel.rotation.x = time * Math.PI * 2
    }
  })
  return (
    <mesh ref={ref}>
      <group>
        <primitive object={carModel}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
            <planeGeometry args={[0.655 * 4, 1.3 * 4]} />
            <meshBasicMaterial map={shadow} blending={THREE.MultiplyBlending} toneMapped={false} transparent />
          </mesh>
        </primitive>
      </group>
    </mesh>
  )
})

Chassis.displayName = 'Chassis'
export default Chassis