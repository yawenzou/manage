/**
 * Created by zzmhot on 2017/3/23.
 *
 * 组件
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:41
 * @Copyright(©) 2017 by zzmhot.
 *
 */
import Vue from 'vue'
import leftSlide from 'components/leftSlide'
import mainContent from 'components/mainContent'
import panelTitle from 'components/panelTitle'
import simpleImageUpload from 'components/simpleImageUpload'
import bottomToolBar from 'components/bottomToolBar'
import charts from 'components/charts'
import point from 'components/point'
import pointTest from 'components/pointTest'
import upload from 'components/upload'
import imageText from 'components/imageText'
import labelText from 'components/labelTest'
import imgUpload from 'components/imgUpload'
import progress from 'components/progress'
import viewBigImg from 'components/viewBigImg'
Vue.component('panel-title', panelTitle)
Vue.component('image-text', imageText)
Vue.component('label-text', labelText)
Vue.component('img-upload', imgUpload)
Vue.component('four-progress', progress)

export {
    leftSlide,
    mainContent,
    panelTitle,
    simpleImageUpload,
    bottomToolBar,
    charts,
    point,
    pointTest,
    upload,
    viewBigImg
}