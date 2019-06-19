<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button
        type="primary"
        @click="$router.go(-1)"
      >返回</el-button>
    </panel-title>
    <div class="panel-body">
      <div>
        <div class="title-table">
          <div class="float-left">
            基本信息
          </div>
        </div>
        <div class="list">
          <el-row>
            <el-col :span="4">
              <div class="list-item-1">ID</div>
            </el-col>
            <el-col :span="8">
              <div class="list-item-1 list-item-2">{{info.editionId}}</div>
            </el-col>
            <el-col :span="4">
              <div class="list-item-1">版本名称</div>
            </el-col>
            <el-col :span="8">
              <div class="list-item-1 list-item-2">{{info.editionName}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="list-item-1">日期</div>
            </el-col>
            <el-col :span="8">
              <div class="list-item-1 list-item-2">{{$dateFormat(parseInt(info.editionUpdated),"yyyy-MM-dd hh:mm:ss")}}</div>
            </el-col>
            <el-col :span="4">
              <div class="list-item-1">版本号</div>
            </el-col>
            <el-col :span="8">
              <div class="list-item-1 list-item-2">{{info.editionNum}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="list-item-1">版本描述</div>
            </el-col>
            <el-col :span="8">
              <div class="list-item-1 list-item-2">{{info.editionRemark}}</div>
            </el-col>
          </el-row>
        </div>
        <div class="title-table">
          <div class="float-left">
            脸型推送
          </div>
        </div>
        <table-data :tableData="table_data" :loadData="load_data" @save="get_table_data" @upDate="upDate"></table-data>
      </div>
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
      <div class="box-1">
        <div class="title-table">
          <div class="float-left">
            使用该版本的设备
          </div>
        </div>
        <el-table
          :data="table_data1"
          v-loading="load_data1"
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
            prop="devId"
            label="设备ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="devProvince"
            label="所在地区"
            align="center"
          >
            <template slot-scope="props">
              {{props.row.devProvince+props.row.devCity+props.row.devArea}}
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
            prop="devUpdated"
            label="创建时间"
            align="center"
            width="240"
          >
            <template slot-scope="props">
              {{$dateFormat(parseInt(props.row.devUpdated),"yyyy-MM-dd hh:mm:ss")}}
            </template>
          </el-table-column>
          <el-table-column
            prop="devStatus"
            label="状态"
            align="center"
          >
            <template slot-scope="props">
              {{props.row.devStatus == 1?'已离线':'在线'}}
            </template>
          </el-table-column>
        </el-table>
        <bottom-tool-bar>
          <div slot="page">
            <el-pagination
              @current-change="handleCurrentChange1"
              :current-page="equipment.currentPage"
              :page-size="10"
              layout="total, prev, pager, next"
              :total="equipment.total"
            >
            </el-pagination>
          </div>
        </bottom-tool-bar>
      </div>
    </div>
    <add-dialog
      :dialogMsg="dialogMsg1"
      @test="dialogChange1"
      @save="get_table_data"
      :upDateForm="upDateForm"
    ></add-dialog>
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";
import addDialog from "./addForm.vue";
import tableData from './table.vue';
export default {
  data() {
    return {
      table_data: [],
      table_data1: [],

      //当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      //每页显示多少条数据
      length: 10,
      //请求时的loading效果
      load_data: true,
      load_data1: true,
      labelList: [],
      dialogMsg1: {
        dialog: false,
        dialogText: "修改脸型",
        id: ""
      },
      upDateForm: {},
      info: {
        editionId: "",
        editionName: "",
        editionUpdated: "",
        editionNum: "",
        editionRemark: ""
      },
      equipment: {
        total: 0,
        currentPage: 1
      }
    };
  },
  components: {
    panelTitle,
    bottomToolBar,
    addDialog,
    tableData
  },
  created() {
    this.get_table_data();
    this.getDetail();
    this.get_table_data1();
  },
  methods: {
    getDetail() {
      var url = "";
      if (this.$route.query.Edition == "离线版本") {
        url = "/face/selectEdiFeaOutDetail";
      } else {
        url = "/face/selectEdiFeaDetail";
      }
      this.$http({
        url: url,
        method: "POST",
        data: { editionId: this.$route.query.editionId }
      })
        .then(({ data }) => {
          console.log(data);
          this.info = data;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //获取数据
    get_table_data() {
      this.load_data = true;
      var form = {};
      form.curPage = this.currentPage;
      form.pageSize = this.length;
      form.editionId = this.$route.query.editionId;
      this.$http({
        url: "/face/selectFeature",
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
    get_table_data1() {
      this.load_data1 = true;
      var form = {};
      form.curPage = this.equipment.currentPage;
      form.pageSize = this.length;
      form.editionId = this.$route.query.editionId;
      this.$http({
        url: "/device/selectDeviceList",
        method: "POST",
        data: form
      })
        .then(({ data }) => {
          this.table_data1 = data.rows;
          this.equipment.currentPage = data.page == 0 ? 1 : data.page;
          this.equipment.total = data.total;
          this.load_data1 = false;
        })
        .catch(() => {
          this.load_data1 = false;
        });
    },
    //查找
    handleSelectionChange(val) {},
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_table_data();
    },
    handleCurrentChange1(val) {
      this.equipment.currentPage = val;
      this.get_table_data1();
    },
    // 显示隐藏
    switchChange(val) {
      var url = "";
      if (val.faceShow == 0) {
        url = "/face/stopFace";
      } else {
        url = "/face/startFace";
      }
      this.$http({
        url: url,
        method: "POST",
        data: { faceId: val.faceId }
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
          this.load_data = true;
          var url = "";
          var data1 = {};
          url = "/face/delFace";
          data1 = { faceId: data.faceId };
          this.$http({
            url: url,
            method: "POST",
            data: data1
          })
            .then(({ data }) => {
              this.get_table_data_filter();
            })
            .catch(() => {
              this.load_data = false;
            });
        })
        .catch(() => {});
    },
    //修改
    upDate(data) {
      this.$http({
        url: "/face/selectFeatureDetail",
        method: "POST",
        data: { faceId: data.faceId }
      })
        .then(({ data }) => {
          this.upDateForm = data;
          this.dialogMsg1.dialog = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改成功回调
    dialogChange1(val) {
      this.dialogMsg1 = val;
      this.get_table_data();
    }
  }
};
</script>
<style type="text/css">
.list {
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  line-height: 60px;
  margin-bottom: 20px;
}
.list-item-1 {
  padding-right: 20px;
  text-align: right;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background: #eee;
}
.list-item-2 {
  padding-left: 20px;
  text-align: left;
  background: #fff;
}
</style>
