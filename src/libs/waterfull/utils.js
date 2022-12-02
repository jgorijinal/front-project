// 获取所有 img 标签
export function getImgElements(itemElements) {
  const imgElements = []
  itemElements.forEach(el => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}


// 获取 img 标签的 src 链接
export function getAllImgs(imgElements) {
  const allImgs = []
  imgElements.forEach(el => {
    allImgs.push(el.getAttribute('src'))
  })
  return allImgs
}

/**
 * 监听图片数组加载完成
 */
export function onCompleteImgs(allImgs) {
  const promiseAll = [] // imgEl promise的数组
  allImgs.forEach((src, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      const imgEl = new Image()
      imgEl.src = src 
      imgEl.onload = () => {
        resolve({
          src,
          index
        })
      }
    })
  })
  return Promise.all(promiseAll)
}