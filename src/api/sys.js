import request from '@/utils/request'

// 人类行为验证
export function getCaptcha(data) {
  return request({
    url: '/sys/captcha',
    method: 'post',
    data
  })
}

// 登录请求
export function loginUser(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getProfile() {
  return request({
    url:'/user/profile',
    method: 'get',
  })
}

// 注册
export function registerUser(data) {
  return request({
    url: '/sys/register',
    data
  })
}

