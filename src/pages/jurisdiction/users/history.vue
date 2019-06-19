<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
        <el-button
            type="primary"
            @click="$router.go(-1)"
        >返回</el-button>
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
            v-model="form.powerContent"
            placeholder="内容信息"
          ></el-input>
        </el-form-item>
        <el-form-item label="操作类型">
          <el-select
            v-model="form.deptId"
            placeholder="全部"
          >
            <el-option
              v-for="item in deptList"
              :label="item.powerName"
              :value="item.id"
              :key="item.id"
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
        <el-table-column
          prop="createTime"
          label="日志时间"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="employeeName"
          label="員工姓名"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="powerType"
          label="操作类型"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="employeeName"
          label="操作人员"
          align="center"
        >
          <template>
            <p>{{$route.query.label}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="ipAddress"
          label="IP地址"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="powerContent"
          label="内容"
          align="center"
        >
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
        powerContent: '',
        powerType: '',
        beginCreateTime: '',
        endCreateTime: '',
        userId:""
      },
      deptList:[]
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created() {
    // if (typeof this.$route.query.deptId != "undefined") {
    //   this.form.deptId = this.$route.query.deptId;
    // }
    // if (typeof this.$route.query.jobId != "undefined") {
    //   this.form.jobId = this.$route.query.jobId;
    // }
    this.get_table_data_filter();
    this.getList();
  },
  methods: {
    getList() {
      this.$http({
        url: "/employee/getOpType",
        method: "POST",
        data: {}
      })
        .then(({ data }) => {
          this.deptList = data;
        })
        .catch(() => {
        });
    },
    get_table_data_filter() {
      this.load_data = true;
      var form = this.form;
      form.userId = this.$route.query.id;
      form.curPage = this.currentPage;
      form.pageSize = 10;
      this.$http({
        url: "/employee/getOpListLog",
        method: "POST",
        data: form
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
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_table_data_filter();
    },
    //清空查询条件
    emptyForm() {
      this.form = {
        powerContent: '',
        powerType: '',
        beginCreateTime: '',
        endCreateTime: '',
        userId:""
      }
      this.get_table_data_filter()
    },
  }
};
</script>
<style type="text/css">
.add-user-title {
  background: #f7f7f7;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  color: #999;
}
</style>
