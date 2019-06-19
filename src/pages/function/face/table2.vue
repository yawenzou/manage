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
                style="height:50px;"
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
              {{props.row.faceShow==0?"显示中":"不显示"}}
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
            label="操作"
            align="center"
            width="200"
          >
            <template slot-scope="props">
              <el-button
                type="success"
                size="small"
                @click="details(props.row)"
              >查看</el-button>
              <el-button
                type="danger"
                size="small"
                @click="del(props.row)"
              >移除</el-button>
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
      this.$confirm("是否确定移除该脸型?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          var url = "/face/removeRef";
          var data1 = { faceId: data.faceId,editionId:this.$route.query.editionId };
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
      