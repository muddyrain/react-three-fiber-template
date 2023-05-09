import { Camera, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

export const useMouseMove = (container: React.RefObject<HTMLDivElement>, camera: Camera) => {
  const isMouseDown = useRef(false)
  useEffect(() => {
    if (!container.current) return
    // 监听鼠标按下事件
    container.current.addEventListener(
      'mousedown',
      () => {
        isMouseDown.current = true
      },
      false
    )
    container.current.addEventListener(
      'mouseup',
      () => {
        isMouseDown.current = false
      },
      false
    )
    // 是否按下鼠标 移动鼠标
    container.current.addEventListener('mousemove', (event) => {
      if (isMouseDown.current) {
        camera.rotation.y += event.movementX * 0.001
        camera.rotation.x += event.movementY * 0.001
        camera.rotation.order = 'YXZ'
      }
    })
  }, [])
}
