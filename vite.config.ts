import { ConfigEnv, UserConfigExport } from 'vite'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'
// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  // command 环境:  "build" | "serve"
  return {
    plugins: [
      react(),
      viteMockServe({
        supportTs: true, // 是否读取 ts模块
        logger: false, // 是否在控制台显示请求日志
        mockPath: './mocks/', // mock文件位置
        watchFiles: true // 开启对mock文件的监听
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@/static': path.resolve(__dirname, 'server/static/')
      }
    },
    server: {}
  }
}
