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

import { localStorage } from 'common/storage'

export default {
    //用户信息和是否登录
    user_info: localStorage.get('user_info'),
    powerList: [],
    hairstyleList: [], //发型标签
    clothingList: [], //服装标签
    faceList: [], //脸型标签
    seasonList: [], //季节标签
    otherList: [], //其他标签
    faceClassificationList: [], //脸型分类标签
    ageList: [], //年龄分类
    colorList: [] //人种分类
}