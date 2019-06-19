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

import * as type from 'store/getters/type'

export default {
    //获取用户信息
    [type.GET_USER_INFO]: state => {
        return state.user_info
    },
    [type.GET_powerList]: state => {
        return state.powerList
    },
    [type.GET_hairstyleList]: state => {
        return state.hairstyleList
    },
    [type.GET_clothingList]: state => {
        return state.clothingList
    },
    [type.GET_faceList]: state => {
        return state.faceList
    },
    [type.GET_seasonList]: state => {
        return state.seasonList
    },
    [type.GET_otherList]: state => {
        return state.otherList
    },
    [type.GET_faceClassificationList]: state => {
        return state.faceClassificationList
    },
    [type.GET_ageList]: state => {
        return state.ageList
    },
    [type.GET_colorList]: state => {
        return state.colorList
    },
}