import lazy from './modules/lazy'
import imageError from './modules/imageError'
export default {
  install(app) {
    app.directive('lazy', lazy)
    app.directive('imageError', imageError)
  }
}