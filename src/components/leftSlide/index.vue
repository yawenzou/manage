<template>
  <div class="left-side">
    <div class="left-side-inner">
      <router-link
        to="/"
        class="logo block"
      >
        <h1 style="color:#fff;font-size:20px">魔镜管理系统</h1>
      </router-link>
      <el-menu
        class="menu-box"
        theme="dark"
        router
        :default-active="$route.meta.activeRouter"
      >
        <div
          v-for="(item, index) in nav_menu_data"
          :key="index"
          v-if="$filterJur(item.id)"
        >
          <el-menu-item
            class="menu-list"
            v-if="typeof item.child === 'undefined'"
            :index="item.path"
          >
            <i
              class="icon fa"
              :class="item.icon"
            ></i>
            <span
              v-text="item.title"
              class="text"
            ></span>
          </el-menu-item>
          <el-submenu
            :index="item.path"
            v-else
          >
            <template slot="title">
              <i
                class="icon fa"
                :class="item.icon"
              ></i>
              <span
                v-text="item.title"
                class="text"
              ></span>
            </template>
            <el-menu-item
              class="menu-list"
              v-for="(sub_item, sub_index) in item.child"
              v-if="$filterJur(sub_item.id)"
              :index="sub_item.path"
              :key="sub_index"
            >
              <!--<i class="icon fa" :class="sub_item.icon"></i>-->
              <span
                v-text="sub_item.title"
                class="text"
              ></span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "slide",
  data() {
    return {
      nav_menu_data: [
        {
          title: "主页",
          path: "/home",
          icon: "fa-home",
          id: 0
        },
        {
          title: "功能管理",
          path: "/ser",
          icon: "el-icon-menu",
          id: 1,
          child: [
            {
              title: "发型试戴",
              path: "/hairstyle",
              id: 7
            },
            {
              title: "服装试穿",
              path: "/clothing",
              id: 8
            },
            {
              title: "一键搭配",
              path: "/collocation",
              paths:'/collocationAdd',
              id: 9
            },
            {
              title: "脸型管理",
              path: "/face",
              id: 10
            },
            {
              title: "广告管理",
              path: "/advertising/list",
              id: 6
            }
          ]
        },
        {
          title: "设备管理",
          path: "/ser1",
          icon: "el-icon-menu",
          id: 2,
          child: [
            {
              title: "新增设备",
              path: "/equipmentAdd",
              id: 11
            },
            {
              title: "设备列表",
              path: "/equipment",
              id: 11
            }
          ]
        },
        {
          title: "会员管理",
          path: "/ser2",
          icon: "el-icon-menu",
          id: 151,
          child: [
            {
              title: "会员列表",
              path: "/vip",
              id: 152
            },
          ]
        },
        {
          title: "权限管理",
          path: "/ser3",
          icon: "el-icon-menu",
          id: 3,
          child: [
            {
              title: "部门管理",
              path: "/dept",
              id: 14
            },
            {
              title: "职位管理",
              path: "/job",
              id: 15
            },
            {
              title: "员工管理",
              path: "/users",
              id: 13
            }
          ]
        },
        // {
        //   title: "测试功能",
        //   path: "/point",
        //   id: 7
        // }
      ]
    };
  },
  created() {
    console.log(this.$store.getters.get_user_info.jur);
  }
};
</script>
