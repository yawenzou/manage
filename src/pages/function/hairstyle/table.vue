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
          <el-table-column type="expand">
          <template slot-scope="props">
            <el-form inline label-width="160px">
                <el-form-item label="发型名称:">
                  <span>{{ props.row.hairdoName }}</span>
                </el-form-item>
                <el-form-item label="上传时间:">
                  <span>{{$dateFormat(parseInt(props.row.hairdoCreated),"yyyy-MM-dd hh:mm:ss")}}</span>
                </el-form-item>
                <el-form-item label="推荐次数:">
                  <span>{{ props.row.recommenTimes }}</span>
                </el-form-item>
                <el-form-item label="选择次数:">
                  <span>{{ props.row.selectTimes }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
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
            <template slot-scope="props">
              <p style="cursor:pointer;color:#0055ff" @click="details(props.row)">{{props.row.hairdoNum}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="hairdoImage"
            label="封面"
            align="center"
            width="100"
          >
            <template slot-scope="props">
              <img
                :src="props.row.hairdoImage"
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="haHierarchy"
            label="层级"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="isShow"
            label="显示"
            align="center"
            width="80"
          >
            <template slot-scope="props">
              <el-switch
                :value="props.row.isShow==0"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="switchChange(props.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="clothChoice"
            label="下载资源"
            align="center"
          >
            <template slot-scope="props">
              <!-- <el-button type="succes" size="small" @click="down(props.row)">下载</el-button> -->
              <a
                :href="origin+'/FileDownload/pic/hair/'+props.row.hairdoId"
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
                v-if="props.row.hairBlockStatus"
                type="warning"
                size="small"
                @click="block(props.row)"
              >停用</el-button>
              <el-button
                v-if="!props.row.hairBlockStatus"
                type="warning"
                size="small"
                @click="initiate(props.row)"
              >启用</el-button>
              <el-button
                :disabled="props.row.isShow==0"
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
      this.$confirm("是否确定删除发型?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          var url = "hairdo/delHair";
          var data1 = { hairdoId: data.hairdoId };
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
      