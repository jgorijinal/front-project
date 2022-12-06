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


// 获取热门主题
export function getThemes() {
  return request({
    url: '/pexels/themes',
  })
}

// 获取指定图片数据
export function getPexelById(id) {
  return request({
    url: `/pexels/${id}`
  })
}