<template>
    <div>
        <el-table
          :data="tableData"
          v-loading="loadData"
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
            prop="collocaId"
            label="ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="clothNum"
            label="封面"
            align="center"
            width="100"
          >
            <template slot-scope="props">
              <img
                :src="props.row.collocaImage"
                style="height:60px;width:60px;"
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="collocaName"
            label="搭配名称"
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
              {{$dateFormat(parseInt(props.row.collocaCreated),"yyyy-MM-dd hh:mm:ss")}}
            </template>
          </el-table-column>
          <el-table-column
            prop="collocaShow"
            label="显示"
            align="center"
            width="80"
          >
            <template slot-scope="props">
              <el-switch
                :value="props.row.collocaShow==0"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="switchChange(props.row)"
              >
              </el-switch>
              <p v-if="props.row.isEdit" style="color:red">数据异常</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="collocaRecom"
            label="推荐次数"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="collocaNum"
            label="选择次数"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop=""
            label="下载资源"
            align="center"
          >
            <template slot-scope="props">
              <!-- <el-button type="succes" size="small" @click="down(props.row)">下载</el-button> -->
              <a
                :href="origin+'/FileDownload/pic/recommend/'+props.row.collocaId"
                title="下载"
                target="_blank"
              >下载</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="clothChoice"
            label="状态"
            align="center"
          >
            <template slot-scope="props">
              <el-button
                type="info"
                size="small"
                @click="upload(props.row)"
              >上传</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="300"
          >
            <template slot-scope="props">
              <el-button
                type="success"
                size="small"
                @click="details(props.row)"
              >查看</el-button>
              <el-button
                type="info"
                size="small"
                @click="upDate(props.row)"
              >编辑</el-button>
              <el-button
                v-if="props.row.collocaBlockStatus"
                type="warning"
                size="small"
                @click="block(props.row)"
              >停用</el-button>
              <el-button
                v-if="!props.row.collocaBlockStatus"
                type="warning"
                size="small"
                @click="initiate(props.row)"
              >启用</el-button>
              <el-button
                :disabled="props.row.collocaShow==0"
                type="danger"
                size="small"
                @click="del(props.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <upload
        :dialogMsg="uploadMsg"
        ></upload>
    </div>
</template>

<script type="text/javascript">
import {upload } from "components";
export default {
  props: {
    tableData: {
        type: Array
    },
    loadData:{
        type:Boolean
    }
  },
  data() {
    return {
       origin: window.location.origin,
       uploadMsg: {
        dialog: false,
        id: "",
        url: "",
        getUrl: ""
      },
    };
  },
  components: {
    upload,
  },
  methods:{
    block(data) {
      this.$confirm("是否确定停用?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          var  data1 = { collcaId: data.collcaId,status:0 };
          this.$http({
            url: "/collocat/blockCollca",
            method: "POST",
            data: data1
          })
            .then(({ data }) => {
              this.$emit("save")
            })
            .catch(() => {
              this.load_data = false;
            });
        })
        .catch(() => {});
    },
    initiate(data) {
      this.$confirm("是否确定启用?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          var  data1 = { collcaId: data.collcaId,status:1 };
          this.$http({
            url: "/collocat/initiateCollca",
            method: "POST",
            data: data1
          })
            .then(({ data }) => {
              this.$emit("save")
            })
            .catch(() => {
              this.load_data = false;
            });
        })
        .catch(() => {});
    },
    handleSelectionChange(val) {},
    details(data){
      this.$router.push({path:'/collocationDetails',query:{id:data.collocaId}})
    },
    // 显示隐藏
    switchChange(val) {
      var url = "";
      if (val.collocaShow == 0) {
        url = "/collocat/stopCollocat";
      } else {
        url = "/collocat/startCollocat";
      }
      this.$http({
        url: url,
        method: "POST",
        data: { collocaId: val.collocaId }
      })
        .then(({ data }) => {
          this.$emit("save");
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
          var url = "/collocat/delCollocat";
          var data1 = { collocaId: data.collocaId };
          this.$http({
            url: url,
            method: "POST",
            data: data1
          })
            .then(({ data }) => {
              this.$emit("save");
            })
            .catch(() => {
              this.load_data = false;
            });
        })
        .catch(() => {});
    },
    upDate(data) {
      this.$emit("upDate", data)
    },
    upload(data) {
      this.uploadMsg = {
        dialog: true,
        id: data.collocaId,
        url: "/picUpload/unityFileUpload-web/recommend",
        getUrl: "/picUpload/picFileList/recommend"
      };
    },
  }
};
</script>
      