import request from '@/utils/request'

// 获取图片列表
export function getPexelsList(data) {
  return request({
    url: '/pexels/list',
    params:data
  })
} 

// 获取搜索提示
export function getHint(q) {
  return request({
    url: '/pexels/hint',
    params: {
      q
    }
  })
}
