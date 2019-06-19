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
            prop="hairdoId"
            label="ID"
            align="center"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="hairdoNum"
            label="货号"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="hairdoName"
            label="发型名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="haHierarchy"
            label="层级"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="hairdoCreated"
            label="上传时间"
            align="center"
          >
            <template slot-scope="props">
                <span>{{$dateFormat(parseInt(props.row.hairdoCreated),"yyyy-MM-dd hh:mm:ss")}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="isShow"
            label="显示"
            align="center"
            width="80"
          >
            <template slot-scope="props">
                {{props.row.isShow==0?'显示中':'不显示'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="recommenTimes"
            label="推荐次数"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="selectTimes"
            label="选择次数"
            align="center"
          >
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
    block(data) {
      this.$confirm("是否确定停用?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          var  data1 = { hairdoId: data.hairdoId,status:0 };
          this.$http({
            url: "/hairdo/blockHair",
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
          var  data1 = { hairdoId: data.hairdoId,status:1 };
          this.$http({
            url: "/hairdo/initiateHair",
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
      this.$router.push({path:'/hairstyleDetails',query:{id:data.hairdoId}})
    },
    // 显示隐藏
    switchChange(val) {
      var url = "";
      if (val.isShow == 0) {
        url = "hairdo/stopHair";
      } else {
        url = "hairdo/startHairdo";
      }
      this.$http({
        url: url,
        method: "POST",
        data: { hairdoId: val.hairdoId }
      })
      .then(({ data }) => {
        this.$emit("save")
      })
      .catch(() => {
        this.load_data = false;
      });
    },
    //删除
    del(data) {
      this.$confirm("是否确定在此版本移除该发型?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          var url = "/hairdo/removeRef";
          var data1 = { hairdoId: data.hairdoId,editionId:this.$route.query.editionId};
          this.$http({
            url: url,
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
    upDate(data) {
      this.$emit("upDate", data)
    },
    upload(data) {
      this.uploadMsg = {
        dialog: true,
        id: data.hairdoId,
        url: "/picUpload/unityFileUpload-web/hair",
        getUrl: "/picUpload/picFileList/hair"
      };
    },
  }
};
</script>
      