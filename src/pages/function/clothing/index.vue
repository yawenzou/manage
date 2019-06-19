<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">

    </panel-title>
    <div class="panel-body">
      <div class="select-ele">
        <el-radio-group
          v-model="Edition"
          @change="EditionChange"
        >
          <el-radio-button label="服装管理"></el-radio-button>
          <el-radio-button label="在线版本"></el-radio-button>
          <el-radio-button label="离线版本"></el-radio-button>
        </el-radio-group>
      </div>
      <div v-show="Edition == '服装管理'">
        <el-form
          ref="form"
          :inline="true"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="服装名称">
            <el-input
              v-model="form.clothName"
              placeholder="请输入服装名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="服装分类">
            <el-select
              v-model="form.labelId"
              placeholder="全部"
            >
              <el-option
                v-for="item in $store.getters.GET_clothingList"
                :key="item.labelId"
                :label="item.labelName"
                :value="item.labelId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传时间">
            <el-date-picker
              v-model="form.uploadDate"
              type="date"
              placeholder="选择日期"
              @change="dateChange"
            >
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
        <table-data :tableData="table_data" :loadData="load_data" @save="get_table_data_filter" @upDate="upDate"></table-data>
      </div>
      <div v-show="Edition != '服装管理'">
        <el-form
          ref="form"
          :inline="true"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="输入查询">
            <el-input
              v-model="form.editionId"
              placeholder="版本ID"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传时间">
            <el-date-picker
              v-model="form.uploadDate"
              type="date"
              placeholder="选择日期"
              @change="dateChange"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
          label="展示面数:"
          >
            <el-select
              v-model="form.editionShowNum"
              placeholder="请选择离线版本"
            >
              <el-option
                label="四个面"
                :value="4"
              >
              </el-option>
              <el-option
                label="两个面"
                :value="2"
              >
              </el-option>
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
              @click="addOnLine"
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            prop="editionId"
            label="ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="hairdoCreated"
            label="上传时间"
            align="center"
            width="240"
          >
            <template slot-scope="props">
              <p>{{$dateFormat(parseInt(props.row.editionCreated),"yyyy-MM-dd hh:mm:ss")}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="editionName"
            label="名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="editionShowNum"
            label="展示面数"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="editionRemark"
            label="版本描述"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="editionNum"
            label="版本编号"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="editionRelease"
            label="状态"
            align="center"
          >
            <template slot-scope="props">
              <p v-if="props.row.editionRelease==0">未发布</p>
              <p v-if="props.row.editionRelease==1">已发布</p>
              <p v-if="props.row.editionRelease==2">已修改</p>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="300"
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
              <el-button
                :disabled="props.row.editionRelease==1"
                type="info"
                size="small"
                @click="release(props.row)"
              >发布</el-button>
            </template>
          </el-table-column>
        </el-table>
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
    </div>
    <add-oline
      :dialogMsg="olineMsg"
      @test="olineChange"
      @save="get_table_data_filter"
    ></add-oline>
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar, upload } from "components";
import addDialog from "./addForm.vue";
import addOline from "./addOline";
import tableData from "./table";
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
        clothName: '',
        uploadDate: '',
        labelId: '',
        editionId: '',
        editionShowNum:''
      },
      Edition: "服装管理",
      labelList: [],
      olineMsg: {
        dialog: false,
        dialogText: "新增在线版本"
      },
      uploadMsg: {
        dialog: false,
        id: "",
        url: "",
        getUrl: ""
      },
      addForm1: {},
      upDateForm: {},
    };
  },
  components: {
    panelTitle,
    bottomToolBar,
    addDialog,
    addOline,
    tableData
  },
  created() {
    if (this.$route.query.type) {
      this.Edition = this.$route.query.type;
    }
    this.get_table_data_filter();
  },
  methods: {
    dateChange(v){
      console.log(this.$dateFormat(v,"yyyy-MM-dd hh:mm:ss"))
      this.form.uploadDate = this.$dateFormat(v,"yyyy-MM-dd");
    },
    details(data){
      this.$router.push({path:'/clothingDetails',query:{id:data.clothId}})
    },
    upload(data) {
      this.uploadMsg = {
        dialog: true,
        id: data.clothId,
        url: "/picUpload/unityFileUpload-web/clothes",
        getUrl: "/picUpload/picFileList/clothes"
      };
    },
    get_table_data_filter() {
      var url = "";
      if (this.Edition == "服装管理") {
        url = "/cloth/selectClothList";
      } else if (this.Edition == "在线版本") {
        url = "/cloth/selectListEdiCloth";
      } else {
        url = "/cloth/selectListEdiOutCloth";
      }
      this.load_data = true;
      var form = this.form;
      form.curPage = this.currentPage;
      form.pageSize = this.length;
      this.$http({
        url: url,
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
    //版本切换
    EditionChange(val) {
      this.currentPage = 1;
      this.emptyForm();
      this.$router.replace({ path: this.$route.path, query: { type: val } });
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
    // 显示隐藏
    switchChange(val) {
      var url = "";
      if (val.clothShow == 0) {
        url = "/cloth/stopCloth";
      } else {
        url = "/cloth/startCloth";
      }
      this.$http({
        url: url,
        method: "POST",
        data: { clothId: val.clothId }
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
          if (this.Edition == "服装管理") {
            url = "/cloth/delCloth";
            data1 = { clothId: data.clothId };
          } else if (this.Edition == "在线版本") {
            url = "/cloth/delEditionCloth";
            data1 = { editionId: data.editionId };
          } else {
            url = "/cloth/delOutEditionCloth";
            data1 = { editionId: data.editionId };
          }
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
    //发布
    release(data) {
      this.$confirm("是否确定发布该版本?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          var url = "";
          var data1 = {};
          if (this.Edition == "在线版本") {
            url = "/cloth/release/online";
            data1 = { editionId: data.editionId };
          } else {
            url = "/cloth/release/offline";
            data1 = { editionId: data.editionId };
          }
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
      this.$router.push({path:'clothingAdd',query:{id:data.clothId}})
    },
    //清空查询条件
    emptyForm() {
      this.form = {
        hairdoName: '',
        uploadDate: '',
        labelId: '',
        editionId: ''
      };
      this.get_table_data_filter();
    },
    //新增
    addForm() {
      this.$router.push({path:'clothingAdd'})
    },
    //新增在线版本
    addOnLine() {
      if (this.Edition == "在线版本") {
        this.olineMsg = {
          dialog: true,
          dialogText: "新增在线版本"
        };
      } else {
        this.olineMsg = {
          dialog: true,
          dialogText: "新增离线版本"
        };
      }
      this.olineMsg.dialog = true;
    },
    //新增在线版本回调
    olineChange(val) {
      this.olineMsg = val;
      this.get_table_data_filter();
    },
    //查看详情
    lookData(data) {
      console.log(data);
      this.$router.push({
        path: "/clothingLookData",
        query: { editionId: data.editionId, Edition: this.Edition }
      });
    }
  }
};
</script>
