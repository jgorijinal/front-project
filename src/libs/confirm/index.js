import { h, render } from 'vue'
import confirmComponent from './index.vue'
/**
 * 
 * @param {*} title  标题
 * @param {*} content  内容
 * @param {*} cancelText 取消按钮的文本
 * @param {*} confirmText 确定按钮的文本
 * @returns 
 */
export const confirm = (title, content, cancelText, confirmText) => {
  // 返回一个 Promise
  return new Promise((resolve, reject) => {
    // 允许只传递一个参数 , 那么这个时候 title 会变为 content
    if (title && !content) {
      content = title
      title = ''
    }
    // close 函数
    const close = () => {
      render(null, document.body)
    }
    // 点击取消按钮事件
    const cancelHandler = () => {
      reject()
      close()
    }
    // 点击确定按钮事件 
    const confirmHandler = () => {
      resolve()
      close()
    }
    // h函数会生成一个 vNode
    const vNode = h(confirmComponent, {
      title,
      content,
      cancelText,
      confirmText,
      cancelHandler,
      confirmHandler,
      close
    })
    // 渲染
    render(vNode, document.body)
  })
} 
