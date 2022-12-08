/**
 * 用户明德表单校验
 * 返回 true 表示表单校验通过 , 返回 字符串 表示表单校验不通过
 */
export const validateUsername = (value) => {
  if (!value) {
    return '用户名必须要填写!'
  }
  if (value.length < 3 || value.length > 12) {
    return '用户名的长度应该在3 ~ 12位之间'
  }
  return true
}
/**
 * 
 * 密码的比导弹校验
 */
export const validatePassword = (value) => {
  if (!value) {
    return '密码必须要填写!'
  }
  if (value.length < 6 || value.length > 12) {
    return '密码的长度应该在6 ~ 12位之间'
  }
  return true
}

export const validateConfirmPassword = (value, arr) => {
  if (value !== arr[0]) {
    return '两次密码不一致'
  }
  return true
}
