import drap from './drap'

const install = function(Vue) {
  Vue.directive('drap', drap)
}

if (window.Vue) {
  window.drap = drap
  Vue.use(install); // eslint-disable-line
}

drap.install = install
export default drap