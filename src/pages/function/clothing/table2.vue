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
            prop="clothName"
            label="服装名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="labelName"
            label="分类"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="clothCreated"
            label="上传时间"
            align="center"
          >
            <template slot-scope="props">
                <span>{{$dateFormat(parseInt(props.row.clothCreated),"yyyy-MM-dd hh:mm:ss")}}</span>
            </template>
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
              {{props.row.clothShow==0?'显示':'不显示'}}
            </template>
          </el-table-column>
         <el-table-column
            prop="clothCommend"
            label="推荐次数"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="clothChoice"
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
      this.$confirm("是否确定移除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          var  data1 = { clothId: data.clothId,editionId:this.$route.query.editionId };
          this.$http({
            url: "/cloth/removeRef",
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
