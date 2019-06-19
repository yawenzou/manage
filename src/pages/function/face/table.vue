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
            prop="faceId"
            label="ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="faceImage"
            label="脸型图片"
            align="center"
          >
            <template slot-scope="props">
              <img
                :src="props.row.faceImage"
                style="height:50px;cursor:pointer"
                @click="details(props.row)"
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="faceName"
            label="脸型名称"
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
              {{$dateFormat(parseInt(props.row.faceUpdated),"yyyy-MM-dd hh:mm:ss")}}
            </template>
          </el-table-column>
          <el-table-column
            prop="faceShow"
            label="显示"
            align="center"
            width="80"
          >
            <template slot-scope="props">
              <el-switch
                :value="props.row.faceShow==0"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="switchChange(props.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="faceCommend"
            label="推荐次数"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="faceChoice"
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
                :href="origin+'/FileDownload/pic/face/'+props.row.faceId"
                title="下载"
                target="_blank"
              >下载</a>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="状态"
            align="center"
          >
            <template slot-scope="props">
              <el-button
                type="info"
                size="small"
                @click="upload1(props.row)"
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
                v-if="props.row.faceBlockStatus"
                type="warning"
                size="small"
                @click="block(props.row)"
              >停用</el-button>
              <el-button
                v-if="!props.row.faceBlockStatus"
                type="warning"
                size="small"
                @click="initiate(props.row)"
              >启用</el-button>
              <el-button
                :disabled="props.row.faceShow==0"
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
          var  data1 = { faceId: data.faceId,status:0 };
          this.$http({
            url: "/face/blockFeature",
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
          var  data1 = { faceId: data.faceId,status:1 };
          this.$http({
            url: "/face/initiateFeature",
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
      this.$router.push({path:'/faceDetails',query:{id:data.faceId}})
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
          var url = "/face/delFace";
          var data1 = { faceId: data.faceId };
          this.$http({
            url: url,
            method: "POST",
            data: data1
          })
            .then(({ data }) => {
              this.$emit("save", data)
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
    upload1(data) {
      this.uploadMsg = {
        dialog:true,
        id: data.faceId,
        url: "/picUpload/unityFileUpload-web/face",
        getUrl: "/picUpload/picFileList/face"
      };
    },
  }
};
</script>
      