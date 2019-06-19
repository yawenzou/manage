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
            v-model="form.wxName"
            placeholder="用户ID/昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="会员状态">
          <el-select
            v-model="form.wxStatus"
            placeholder="全部"
          >
            <el-option
              label="全部"
              value=""
            ></el-option>
            <el-option
              label="启用"
              value="0"
            ></el-option>
            <el-option
              label="禁用"
              value="1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker
            v-model="form.createTime"
            type="date"
            placeholder="选择注册时间">
          </el-date-picker>
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
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        stripe
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="用户昵称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="isHide"
          label="启用"
          align="center"
        >
            <template slot-scope="props">
              <el-switch
                :value="!props.row.isHide"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="switchChange(props.row)"
              >
              </el-switch>
            </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间"
          align="center"
        >
          <template slot-scope="props">
              {{$dateFormat(parseInt(props.row.createTime),"yyyy-MM-dd hh:mm:ss")}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="260"
        >
          <template slot-scope="props">
            <el-button
              type="info"
              size="small"
              @click="lookData(props.row)"
            >查看</el-button>
            <el-button
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
      //每页显示多少条数据
      length: 10,
      //请求时的loading效果
      load_data: true,
      form: {
        wxName: "",
        wxStatus: "",
        createTime: ''
      },
    };
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created() {
    this.get_table_data_filter();
  },
  methods: {
    get_table_data_filter() {
      this.load_data = true;
      var form = this.form;
      let date = this.$dateFormat(new Date(form.createTime), 'yyyy-MM-dd');
      form.createTime = date;
      form.curPage = this.currentPage;
      form.pageSize = this.length;
      this.$http({
        url: "/wxuser/clientList",
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
      this.currentPage = val;
      this.get_table_data_filter();
    },
    switchChange(val) {
      var url = "";
      if (val.isHide) {
        url = "/wxuser/permit";
      } else {
        url = "/wxuser/ban";
      }
      this.$http({
        url: url,
        method: "POST",
        data: { id: val.id }
      })
        .then(({ data }) => {
           this.get_table_data_filter();
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //删除
    del(data) {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http({
            url: 'wxuser/delWxUser',
            method: "POST",
            data: { wxId: data.id }
          })
            .then(({ data }) => {
              this.get_table_data_filter();
            })
            .catch((err) => {
              this.load_data = false;
            });
        })
        .catch(() => {});
    },
    //清空查询条件
    emptyForm() {
      this.form = {
        wxName: "",
        wxStatus: "",
        createTime: ''
      };
      this.currentPage =1;
      this.get_table_data_filter();
    },
    //查看详情
    lookData(data) {
      this.$router.push({path: "/vip/detail", query: {"id": data.id}});
    },
  }
};
</script>
