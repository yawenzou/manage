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
          :class="['configurationTable', {afterRenderClass: showAfterRenderClass}]"
          ref="configurationTable"
        >
          <!-- <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column> -->
          <el-table-column type="expand">
          <template slot-scope="props">
            <el-form inline label-width="160px">
              <el-form-item label="服装名称:">
                <span>{{ props.row.clothName }}</span>
              </el-form-item>
              <el-form-item label="上传时间:">
                <span>{{$dateFormat(parseInt(props.row.clothCreated),"yyyy-MM-dd hh:mm:ss")}}</span>
              </el-form-item>
              <el-form-item label="推荐次数:">
                <span>{{ props.row.clothCommend }}</span>
              </el-form-item>
              <el-form-item label="选择次数:">
                <span>{{ props.row.clothChoice }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
          <el-table-column
            prop="clothId"
            label="ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="clothNum"
            label="货号"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="clothImage"
            label="封面"
            align="center"
            width="100"
          >
            <template slot-scope="props">
              <img
                :src="props.row.clothImage"
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="labelName"
            label="分类"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="cpacthTop"
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
                :value="props.row.clothShow==0"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="switchChange(props.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="下载资源"
            align="center"
          >
            <template slot-scope="props">
              <!-- <el-button type="succes" size="small" @click="down(props.row)">下载</el-button> -->
              <a
                :href="origin+'/FileDownload/pic/clothes/'+props.row.clothId"
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
                v-if="props.row.clothBlockStatus"
                type="warning"
                size="small"
                @click="block(props.row)"
              >停用</el-button>
              <el-button
                v-if="!props.row.clothBlockStatus"
                type="warning"
                size="small"
                @click="initiate(props.row)"
              >启用</el-button>
              <el-button
                :disabled="props.row.clothShow==0"
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
        getUrl: "",
      },
      showAfterRenderClass: false
    };
  },
  components: {
    upload,
  },
  updated () {
    console.log("update")
    /**
     * 用于隐藏固定高度时显示不必要的scrollX的定时器
     * 这是el-table初次渲染时宽度计算的bug，可在渲染后通过重新赋予overflow: auto调整
     */
    const handleScrollX = setInterval(() => {
      // 检测是否已经生成table节点，如果不是就每隔0.5s检测一次
      // 只有生成了真实节点才能够通过修改overflow属性让浏览器重新计算
      if (this.$refs.configurationTable) {
        this.showAfterRenderClass = true
        clearInterval(handleScrollX)
      }
    }, 500)
  },
  methods:{
    handleSelectionChange(val) {},
    details(data){
        this.$router.push({path:'/clothingDetails',query:{id:data.clothId}})
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
           this.$emit("save")
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //删除
    del(data) {
        debugger
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          var  url = "/cloth/delCloth";
          var  data1 = { clothId: data.clothId };
          this.$http({
            url: "/cloth/delCloth",
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
    block(data) {
      this.$confirm("是否确定停用?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          var  data1 = { clothId: data.clothId,status:0 };
          this.$http({
            url: "/cloth/blockCloth",
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
          var  data1 = { clothId: data.clothId,status:1 };
          this.$http({
            url: "/cloth/initiateCloth",
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
    upDate(data){
        this.$emit("upDate", data)
    },
    // upload(data){
    //     this.$emit("upload", data)
    // },
    upload(data) {
      this.uploadMsg = {
        dialog: true,
        id: data.clothId,
        url: "/picUpload/unityFileUpload-web/clothes",
        getUrl: "/picUpload/picFileList/clothes"
      };
    },
  }
};
</script>
<style>
.configurationTable .el-table__body-wrapper {
    overflow: hidden;
}
.afterRenderClass .el-table__body-wrapper {
    overflow: auto;
}
</style>
