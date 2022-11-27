import request from '@/utils/request'

export function getCategory() {
  return request({
    method: 'get',
    url:'/category'
  })
}

