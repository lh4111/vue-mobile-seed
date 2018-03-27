import Vue from 'vue'
import App from './App'
import router from './router'
import components from './components'
import filters from './filters'
import FastClick from 'fastclick'
import './assets/style/finbtc.styl'
// Use FastClick reslove mobile browser 300ms delay
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false)
}
// regiest global components
for (const key in components) {
  if (components.hasOwnProperty(key)) {
    Vue.component(key, components[key])
  }
}
// regiest global filters
for (const key in filters) {
  if (filters.hasOwnProperty(key)) {
    Vue.filter(key, filters[key])
  }
}

const ua = navigator.userAgent
const env = {
  ua,
  isProd: process.env.NODE_ENV === 'production',
  isApp: /finbtc/i.test(ua),
  isIOS: /iphone|ipod/i.test(ua),
  isAndroid: /android/i.test(ua),
  isWechat: /micromessenger/i.test(ua),
  isQQ: /qq\//i.test(ua),
  version: /finbtc/i.test(ua) ? ua.match(/^FINBTC\/\w+\/([\d|.]+)/).pop().replace(/\./g, (match, i) => i > 1 ? '' : '.') : 0
}

Vue.prototype.env = env
Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

(() => {
  const doc = window.document
  if (window.devicePixelRatio && devicePixelRatio >= 2) {
    var testElem = doc.createElement('div')
    testElem.style.border = '.5px solid transparent'
    doc.body.appendChild(testElem)
    if (testElem.offsetHeight == 1) {
      doc.querySelector('html').classList.add('hairline')
    }
    doc.body.removeChild(testElem)
  }
  // is android
  if (/android/i.test(window.navigator.userAgent)) {
    doc.body.classList.add('android')
    if (/android.+redmi/i.test(window.navigator.userAgent)) {
      doc.body.classList.add('old-android')
    }
  }
  // 处理微信viewport异常
  if (window.innerWidth < doc.body.clientWidth) {
    const viewport = document.getElementsByName('viewport')[0]
    viewport.setAttribute(
      'content',
      'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1'
    )
  }
})()
