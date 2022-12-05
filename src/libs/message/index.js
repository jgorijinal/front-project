import { h,render } from 'vue'
import messageComponent from './index.vue'
export const message = (type, content, duration) => {
  // 3. message 组件销毁 
  const destroy = () => {
    render(null, document.body)
  }

  // 1. 创建 vnode
  const vNode = h(messageComponent, {
    type,
    content,
    duration,
    destroyCallback : destroy
  })
  // 2. render 渲染
  render(vNode, document.body)
}