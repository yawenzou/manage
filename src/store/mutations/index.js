/**
 * Created by zzmhot on 2017/3/21.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/21 16:04
 * @Copyright(©) 2017 by zzmhot.
 *
 */
import * as type from 'store/mutations/type'
import { localStorage } from 'common/storage'

export default {
    //设置用户信息和是否登录
    [type.SET_USER_INFO](state, userinfo) {
        state.user_info = userinfo || {}
        if (userinfo === null) {
            localStorage.remove('user_info')
        } else {
            localStorage.set('user_info', userinfo)
        }
    },
    [type.SET_powerList](state, data) {
        state.powerList = data || []
    },
    [type.SET_hairstyleList](state, data) {
        state.hairstyleList = data || []
    },
    [type.SET_clothingList](state, data) {
        state.clothingList = data || []
    },
    [type.SET_faceList](state, data) {
        state.faceList = data || []
    },
    [type.SET_seasonList](state, data) {
        state.seasonList = data || []
    },
    [type.SET_otherList](state, data) {
        state.otherList = data || []
    },
    [type.SET_faceClassificationList](state, data) {
        state.faceClassificationList = data || []
    },
    [type.SET_ageList](state, data) {
        state.ageList = data || []
    },
    [type.SET_colorList](state, data) {
        state.colorList = data || []
    },
}