<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">

    </panel-title>
    <div class="panel-body">
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="输入查询">
          <el-input
            v-model="form.deviceId"
            placeholder="公司名称/联系人"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在地区">
          <el-select
            v-model="form.city"
            placeholder="全部"
          >
            <el-option
              v-for="item in citys"
              :label="item"
              :value="item"
              :key="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备版本">
          <el-select
            v-model="form.devVersion"
            placeholder="全部"
          >
            <el-option label="全部" value="" key="-1"></el-option>
            <el-option
              v-for="(value, key, index) in devVersionList"
              :label="value"
              :value="key"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button
            type="primary"
            @click="find"
          >查询</el-button>
          <el-button
            type="primary"
            @click="emptyForm"
          >重置</el-button>
        </el-form-item>
      </el-form>
      <div class="title-table">
        <div class="float-left">
          数据列表
        </div>
        <div class="float-right">
          <el-button
            type="primary"
            icon="plus"
            size="small"
            @click="addForm"
          >添加</el-button>
        </div>
      </div>
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        stripe
        style="width: 100%;"
      >
        <!-- <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column> -->
        <el-table-column
          prop="devId"
          label="设备ID"
          align="center"
        >
          <template slot-scope="props">
            <div
              @click="tbClick(props.row.devId)"
              style="color:#0079FE;cursor: pointer;"
            >
              {{props.row.devId}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="devProvince"
          label="所在地区"
          align="center"
        >
          <template slot-scope="props">
            {{props.row.devProvince + props.row.devCity + props.row.devArea}}
          </template>
        </el-table-column>
        <el-table-column
          prop="devName"
          label="联系人"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="devPhone"
          label="联系方式"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="hairdoCreated"
          label="创建时间"
          align="center"
          width="240"
        >
          <template slot-scope="props">
            {{$dateFormat(parseInt(props.row.contractDate),"yyyy-MM-dd hh:mm:ss")}}
          </template>
        </el-table-column>
        <el-table-column
          prop="devVersion"
          label="设备版本"
          align="center"
        >
          <template slot-scope="props">
            {{devVersionList[props.row.devVersion]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="isAlive"
          label="状态"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="isAlive"
          label="机器状态"
          align="center"
        >
          <template slot-scope="props">
            <el-switch
              :value="props.row.devEnable==0"
              active-color="#13ce66" 
              inactive-color="#ff4949" 
              @change="switchChange(props.row.devId, props.row.devEnable)" 
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="240"
        >
          <template slot-scope="props">
            <el-button
              type="info"
              size="small"
              @click="tbClick(props.row.devId)"
            >查看</el-button>
            <el-button
              type="info"
              size="small"
              @click="upDate(props.row)"
            >编辑</el-button>
            <!-- <el-button
              :disabled="props.row.devEnable==0"
              type="success"
              @click="open(props.row)"
              size="small"
            >开通</el-button>
            <el-button
              :disabled="props.row.devEnable==1"
              type="warning"
              @click="close(props.row)"
              size="small"
            >禁用</el-button> -->
            <el-button
              :disabled="props.row.collocaShow==0"
              type="danger"
              size="small"
              @click="del(props.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <div slot="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";
export default {
  data() {
    return {
      table_data: [],
      //当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      totalClick: 0,
      //每页显示多少条数据
      length: 10,
      //请求时的loading效果
      load_data: true,
      form: {
        deviceId: "",
        city: "",
        devVersion: ''
      },
      citys: [],
      Edition: "一键搭配",
      labelList: [],
      dialogMsg: {
        dialog: false,
        dialogText: "新增搭配"
      },
      dialogMsg1: {
        dialog: false,
        dialogText: "修改搭配",
        id: ""
      },
      olineMsg: {
        dialog: false,
        dialogText: "新增在线版本"
      },
      addForm1: {},
      upDateForm: {},
      devVersionList: {
        2: '主线版',
        4: '4个面版',
        0: '广告版'
      }
    };
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created() {
    this.$http({
      url: "/device/area",
      method: "POST",
      data: {}
    })
      .then(({ data }) => {
        //console.log(data);
        this.citys = data;
      })
      .catch(() => {});
    this.currentPage = this.$route.query.page || 1;
    this.get_table_data_filter();
  },
  methods: {
    get_table_data_filter() {
      this.load_data = true;
      var form = this.form;
      form.curPage = this.currentPage;
      form.pageSize = this.length;
      this.$http({
        url: "/device/selectDeviceList2",
        method: "POST",
        data: this.form
      })
        .then(({ data }) => {
          this.table_data = data.rows;
          this.currentPage = data.page == 0 ? 1 : data.page;
          this.total = data.total;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //查找
    find() {
      this.currentPage = 1;
      this.get_table_data_filter();
    },
    handleSelectionChange(val) {},
    //页码选择
    handleCurrentChange(val) {
      var query = JSON.parse(JSON.stringify(this.$route.query));
      query.page = val;
      this.$router.replace({ path: this.$route.path, query: query });
      this.currentPage = val;
      this.get_table_data_filter();
    },
    //通用操作
    base(url, id) {
      this.load_data = true;
      this.$http({
        url: url,
        method: "POST",
        data: { devId: id }
      })
        .then(({ data }) => {
          this.get_table_data_filter();
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //开通禁用
    switchChange(id, status) {
      let url = status ===1 ? '/device/startDevice': '/device/stopDevice';
      this.base(url, id);
    },
    // //开通
    // open(data) {
    //   this.$confirm("是否确定开通?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.base("/device/startDevice", data.devId);
    //     })
    //     .catch(() => {});
    // },
    // //禁用
    // close(data) {
    //   this.$confirm("是否确定禁用?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.base("/device/stopDevice", data.devId);
    //     })
    //     .catch(() => {});
    // },
    //删除
    del(data) {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.base("/device/delDevice", data.devId);
        })
        .catch(() => {});
    },
    //修改
    upDate(data) {
      this.$router.push({
        path: "/equipmentEdit",
        query: { devId: data.devId }
      });
    },
    //清空查询条件
    emptyForm() {
      this.form = {
        hairdoName: "",
        uploadDate: "",
        labelId: "",
        editionId: "",
        devVersion: ''
      };
      this.get_table_data_filter()
    },
    //新增
    addForm() {
      this.$router.push({ path: "/equipmentAdd" });
    },
    //查看详情
    lookData(data) {
      console.log(data);
      this.$router.push({
        path: "/collocationLookData",
        query: { editionId: data.editionId, Edition: this.Edition }
      });
    },
    dateChange(val) {
      console.log(val);
      this.form.uploadDate = val;
    },
    tbClick(data) {
      console.log(data);
      this.$router.push({ path: "/equipmentLook", query: { devId: data } });
    }
  }
};
</script>
