//导入模块
import axios from 'axios'
import { port_code } from 'common/port_uri'
import router from 'src/router'
import { Message } from 'element-ui'
import store from 'store'
import { SET_USER_INFO } from 'store/actions/type'
import { server_base_url } from 'common/config'
import { cookieStorage } from 'common/storage'

//设置用户信息action
const setUserInfo = function(user) {
    store.dispatch(SET_USER_INFO, user)
}

export default function fetch(options, header) {
    if (options.url[0] != '/') {
        options.url = '/' + options.url
    }
    var opt = options;
    opt.transformRequest = [function(data) {
        var userInfo = store.getters.get_user_info;
        if (data.toString() == "[object FormData]") {
            if (typeof userInfo.token != 'undefined') {
                data.append("token", userInfo.token);
            }
            return data
        }
        var userInfo = store.getters.get_user_info;
        if (typeof userInfo.token != 'undefined') {
            data.token = userInfo.token;
        }
        let ret = ''
        for (let it in data) {
            if (typeof data[it] == 'object') {
                ret += encodeURIComponent(it) + '=' + JSON.stringify(data[it]) + '&';
            } else {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
        }
        return ret
    }];

    var headers = header || {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Access-Control-Allow-Origin": "*",
    };


    return new Promise((resolve, reject) => {
        // https://github.com/mzabriskie/axios

        //创建一个axios实例
        const instance = axios.create({
                //设置默认根地址
                baseURL: server_base_url,
                //设置请求超时设置
                timeout: 200000,
                //设置请求时的header
                headers: headers,
                withCredentials: false,
            })
            //请求处理
        instance(opt)
            .then(({ data: { data, status, msg, token } }) => {
                //请求成功时,根据业务判断状态
                if (status === 1) {
                    resolve({ data, status, msg, token })
                    return false
                } else if (status === 2) {
                    Message.warning(msg)
                    setUserInfo(null)
                    setTimeout(router.replace({ name: "login" }), 500)
                    return false
                }
                Message.warning(msg)
                reject({ data, status, msg })
            })
            .catch((error) => {
                //请求失败时,根据业务判断状态
                if (error.response) {
                    let resError = error.response
                    let resCode = resError.status
                    let resMsg = error.message
                    Message.error('操作失败！错误原因 ' + resMsg)
                    reject({ code: resCode, msg: resMsg })
                }
            })
    })
}