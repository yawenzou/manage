/**
 * Created by zzmhot on 2017/3/23.
 *
 * 自定义插件
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:29
 * @Copyright(©) 2017 by zzmhot.
 *
 */
import dateFormat from 'plugins/date'
import http from 'common/fetch'
import filterJur from 'plugins/jur'

const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  //定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $dateFormat: {
      get() {
        return dateFormat
      }
    },
    $http: {
      get() {
        return http
      }
    },
    $filterJur: {
      get() {
        return filterJur
      }
    },
  })
}

export default {
  install
}
