import request from '@/utils/request'

export function getPexelsList(data) {
  return request({
    url: '/pexels/list',
    params:data
  })
} 