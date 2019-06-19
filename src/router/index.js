/**
 * Created by zzmhot on 2017/3/23.
 *
 * 路由Map
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:30
 * @Copyright(©) 2017 by zzmhot.
 *
 */


import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'


Vue.use(VueRouter)

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),

//主页
const homeRoutes = [{
    path: '/home',
    name: 'home',
    component: function(resolve) {
        require(['pages/home'], resolve)
    },
    meta: {
        title: "主页",
        auth: true,
        activeRouter: '/home'
    }
}]

//功能管理--发型试戴
const hairstyleRoutes = [{
        path: '/hairstyle',
        name: 'hairstyle',
        component: function(resolve) {
            require(['pages/function/hairstyle'], resolve)
        },
        meta: {
            title: "发型试戴",
            auth: true,
            activeRouter: '/hairstyle'
        }
    },
    {
        path: '/hairstyleAdd',
        name: 'hairstyleAdd',
        component: function(resolve) {
            require(['pages/function/hairstyle/addForm'], resolve)
        },
        meta: {
            title: "新增发型",
            auth: true,
            activeRouter: '/hairstyle'
        }
    },
    {
        path: '/hairstyleDetails',
        name: 'hairstyleDetails',
        component: function(resolve) {
            require(['pages/function/hairstyle/details'], resolve)
        },
        meta: {
            title: "发型详情",
            auth: true,
            activeRouter: '/hairstyle'
        }
    },
    {
        path: '/hairstyleLookData',
        name: 'hairstyleLookData',
        component: function(resolve) {
            require(['pages/function/hairstyle/lookData'], resolve)
        },
        meta: {
            title: "发型试戴 / 查看详情",
            auth: true,
            activeRouter: '/hairstyle'
        }
    }
]

//功能管理--服装试穿
const clothingRoutes = [{
        path: '/clothing',
        name: 'clothing',
        component: function(resolve) {
            require(['pages/function/clothing'], resolve)
        },
        meta: {
            title: "服装试穿",
            auth: true,
            activeRouter: '/clothing'
        }
    },
    {
        path: '/clothingAdd',
        name: 'clothingAdd',
        component: function(resolve) {
            require(['pages/function/clothing/addForm'], resolve)
        },
        meta: {
            title: "查看服装",
            auth: true,
            activeRouter: '/clothing'
        }
    },
    {
        path: '/clothingDetails',
        name: 'clothingDetails',
        component: function(resolve) {
            require(['pages/function/clothing/details'], resolve)
        },
        meta: {
            title: "查看服装",
            auth: true,
            activeRouter: '/clothing'
        }
    },
    {
        path: '/clothingLookData',
        name: 'clothingLookData',
        component: function(resolve) {
            require(['pages/function/clothing/lookData'], resolve)
        },
        meta: {
            title: "服装试穿 / 查看详情",
            auth: true,
            activeRouter: '/clothing'
        }
    }
]

//功能管理--一键搭配
const collocationRoutes = [{
        path: '/collocation',
        name: 'collocation',
        component: function(resolve) {
            require(['pages/function/collocation'], resolve)
        },
        meta: {
            title: "一键搭配",
            auth: true,
            activeRouter: '/collocation'
        }
    },
    {
        path: '/collocationDetails',
        name: 'collocationDetails',
        component: function(resolve) {
            require(['pages/function/collocation/details.vue'], resolve)
        },
        meta: {
            title: "搭配详情",
            auth: true,
            activeRouter: '/collocation'
        }
    },
    {
        path: '/collocationAdd',
        name: 'collocationAdd',
        component: function(resolve) {
            require(['pages/function/collocation/addForm'], resolve)
        },
        meta: {
            title: "一键搭配 / 新增搭配",
            auth: true,
            activeRouter: '/collocation'
        }
    },
    {
        path: '/collocationLookData',
        name: 'collocationLookData',
        component: function(resolve) {
            require(['pages/function/collocation/lookData'], resolve)
        },
        meta: {
            title: "一键搭配 / 查看详情",
            auth: true,
            activeRouter: '/collocation'
        }
    }
]

//功能管理--脸型管理
const faceRoutes = [{
        path: '/face',
        name: 'face',
        component: function(resolve) {
            require(['pages/function/face'], resolve)
        },
        meta: {
            title: "脸型管理",
            auth: true,
            activeRouter: '/face'
        }
    },
    {
        path: '/faceDetails',
        name: 'faceDetails',
        component: function(resolve) {
            require(['pages/function/face/details'], resolve)
        },
        meta: {
            title: "脸型详情",
            auth: true,
            activeRouter: '/face'
        }
    },
    {
        path: '/faceLookData',
        name: 'faceLookData',
        component: function(resolve) {
            require(['pages/function/face/lookData'], resolve)
        },
        meta: {
            title: "脸型管理 / 查看详情",
            auth: true,
            activeRouter: '/face'
        }
    }
]

//功能管理--广告管理
const advertisingRoutes = [{
    path: '/advertising/list',
    name: 'advertisingList',
    component: function(resolve) {
        require(['pages/function/advertising/list'], resolve)
    },
    meta: {
        title: "广告管理",
        auth: true,
        activeRouter: '/advertising/list'
    }
}, {
    path: '/advertising/add',
    name: 'advertisingAdd',
    component: function(resolve) {
        require(['pages/function/advertising/add'], resolve)
    },
    meta: {
        title: "新增广告",
        auth: true,
        activeRouter: '/advertising/list'
    }
}, {
    path: '/advertising/edit',
    name: 'advertisingEdit',
    component: function(resolve) {
        require(['pages/function/advertising/edit'], resolve)
    },
    meta: {
        title: "修改广告",
        auth: true,
        activeRouter: '/advertising/list'
    }
}, {
    path: '/advertising/detail',
    name: 'advertisingDetail',
    component: function(resolve) {
        require(['pages/function/advertising/detail'], resolve)
    },
    meta: {
        title: "查看广告",
        auth: true,
        activeRouter: '/advertising/list'
    }
}, {
    path: '/advertising/versions/list',
    name: 'advertisingVersionsList',
    component: function(resolve) {
        require(['pages/function/advertising/versionsList'], resolve)
    },
    meta: {
        title: "广告版本列表",
        auth: true,
        activeRouter: '/advertising/list'
    }
}, {
    path: '/advertising/versions/add',
    name: 'advertisingVersionsAdd',
    component: function(resolve) {
        require(['pages/function/advertising/versionsAdd'], resolve)
    },
    meta: {
        title: "新增广告版本",
        auth: true,
        activeRouter: '/advertising/list'
    }
}, {
    path: '/advertising/versions/join',
    name: 'advertisingVersionsJoin',
    component: function(resolve) {
        require(['pages/function/advertising/versionsJoin'], resolve)
    },
    meta: {
        title: "添加广告",
        auth: true,
        activeRouter: '/advertising/list'
    }
}, {
    path: '/advertising/versions/detail',
    name: 'advertisingVersionsDetail',
    component: function(resolve) {
        require(['pages/function/advertising/versionsDetail'], resolve)
    },
    meta: {
        title: "查看",
        auth: true,
        activeRouter: '/advertising/list'
    }
}, {
    path: '/advertising/versions/pushList',
    name: 'advertisingVersionsPushList',
    component: function(resolve) {
        require(['pages/function/advertising/versionsPushList'], resolve)
    },
    meta: {
        title: "推送列表",
        auth: true,
        activeRouter: '/advertising/list'
    }
}, {
    path: '/advertising/versions/equipmentList',
    name: 'advertisingVersionsEquipmentList',
    component: function(resolve) {
        require(['pages/function/advertising/versionsEquipmentList'], resolve)
    },
    meta: {
        title: "设备列表",
        auth: true,
        activeRouter: '/advertising/list'
    }
}]

//设备管理
const equipmentRoutes = [{
        path: '/equipment',
        name: 'equipment',
        component: function(resolve) {
            require(['pages/equipment'], resolve)
        },
        meta: {
            title: "设备列表",
            auth: true,
            activeRouter: '/equipment'
        }
    },
    {
        path: '/equipmentAdd',
        name: 'equipmentAdd',
        component: function(resolve) {
            require(['pages/equipment/addForm'], resolve)
        },
        meta: {
            title: "新增设备",
            auth: true,
            activeRouter: '/equipmentAdd'
        }
    },
    {
        path: '/equipmentEdit',
        name: 'equipmentEdit',
        component: function(resolve) {
            require(['pages/equipment/editForm'], resolve)
        },
        meta: {
            title: "设备编辑",
            auth: true,
            activeRouter: '/equipment'
        }
    },
    {
        path: '/equipmentLook',
        name: 'equipmentLook',
        component: function(resolve) {
            require(['pages/equipment/lookData'], resolve)
        },
        meta: {
            title: "设备详情",
            auth: true,
            activeRouter: '/equipment'
        }
    }, {
        path: '/equipmentHistory',
        name: 'equipmentHistory',
        component: function(resolve) {
            require(['pages/equipment/historyDetail'], resolve)
        },
        meta: {
            title: "历史记录详情",
            auth: true,
            activeRouter: '/equipment'
        }
    }
]

//权限管理
const jurisdictionRoutes = [{
        path: '/job',
        name: 'job',
        component: function(resolve) {
            require(['pages/jurisdiction/job'], resolve)
        },
        meta: {
            title: "职位管理",
            auth: true,
            activeRouter: '/job'
        }
    },
    {
        path: '/jurEdit',
        name: 'jurEdit',
        component: function(resolve) {
            require(['pages/jurisdiction/job/addForm'], resolve)
        },
        meta: {
            title: "权限设置",
            auth: true,
            activeRouter: '/job'
        }
    },
    {
        path: '/jurEditByUser',
        name: 'jurEditByUser',
        component: function(resolve) {
            require(['pages/jurisdiction/job/addForm'], resolve)
        },
        meta: {
            title: "权限设置",
            auth: true,
            activeRouter: '/users'
        }
    },
    {
        path: '/dept',
        name: 'dept',
        component: function(resolve) {
            require(['pages/jurisdiction/dept'], resolve)
        },
        meta: {
            title: "部门管理",
            auth: true,
            activeRouter: '/dept'
        }
    },
    {
        path: '/users',
        name: 'users',
        component: function(resolve) {
            require(['pages/jurisdiction/users'], resolve)
        },
        meta: {
            title: "员工管理",
            auth: true,
            activeRouter: '/users'
        }
    },
    {
        path: '/usersHistory',
        name: 'usersHistory',
        component: function(resolve) {
            require(['pages/jurisdiction/users/history'], resolve)
        },
        meta: {
            title: "操作记录",
            auth: true,
            activeRouter: '/users'
        }
    },
    {
        path: '/usersAddmore',
        name: 'usersAddmore',
        component: function(resolve) {
            require(['pages/jurisdiction/users/addmore'], resolve)
        },
        meta: {
            title: "批量导入",
            auth: true,
            activeRouter: '/users'
        }
    }
]

//会员管理
const vipRoutes = [{
    path: '/vip',
    name: 'vip',
    component: function(resolve) {
        require(['pages/vip'], resolve)
    },
    meta: {
        title: "会员管理",
        auth: true,
        activeRouter: '/vip'
    }
}, {
    path: '/vip/detail',
    name: 'vipDetail',
    component: function(resolve) {
        require(['pages/vip/detail'], resolve)
    },
    meta: {
        title: "会员详情",
        auth: true,
        activeRouter: '/vip'
    }
}, {
    path: '/vip/useRecord',
    name: 'vipUseRecord',
    component: function(resolve) {
        require(['pages/vip/useRecord'], resolve)
    },
    meta: {
        title: "使用记录",
        auth: true,
        activeRouter: '/vip'
    }
}]

//测试
const testRoutes = [{
        path: '/point',
        name: 'point',
        component: function(resolve) {
            require(['pages/test'], resolve)
        },
        meta: {
            title: "点位测试",
            auth: true,
            activeRouter: '/point'
        }
    },
    {
        path: '/point1',
        name: 'point1',
        component: function(resolve) {
            require(['pages/test1'], resolve)
        },
        meta: {
            title: "点位测试",
            auth: true,
            activeRouter: '/point1'
        }
    }
]

let childrenRoutesArr = [];
const childrenRoutes = childrenRoutesArr.concat(
    homeRoutes,
    hairstyleRoutes,
    clothingRoutes,
    collocationRoutes,
    faceRoutes,
    advertisingRoutes,
    equipmentRoutes,
    jurisdictionRoutes,
    vipRoutes,
    testRoutes
)

const routes = [{
        path: '/404',
        name: 'notPage',
        component: function(resolve) {
            require(['pages/error/404'], resolve)
        }
    },
    {
        path: '*',
        redirect: '/404'
    },
    {
        path: '/user/login',
        name: 'login',
        component: function(resolve) {
            require(['pages/user/login'], resolve)
        }
    },
    {
        path: '/',
        redirect: '/home',
        component: function(resolve) {
            require(['pages/App'], resolve)
        },
        children: childrenRoutes
    }
]

const router = new VueRouter({
    routes,
    mode: 'hash', //default: hash ,history
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
    window.sessionStorage.setItem('prevRouteName', from.name)
        // NProgress.done().start()
    let toName = to.name
        // let fromName = from.name\
    console.log(store.state);
    let is_login = store.state.user_info.login

    if (!is_login && toName !== 'login') {
        next({
            name: 'login'
        })
    } else {
        if (is_login && toName === 'login') {
            next({
                path: '/'
            })
        } else {
            next()
        }
    }
})

//路由完成之后的操作
router.afterEach(route => {
    // NProgress.done()
})

export default router