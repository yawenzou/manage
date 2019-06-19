<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
        <el-button
            type="primary"
            @click="$router.go(-1)"
        >返回</el-button>
    </panel-title>
    <div class="panel-body">
        <el-steps :active="active" finish-status="success" :align-center="true" style="padding-left:25%">
            <el-step title="上传文件"></el-step>
            <el-step title="导入完成"></el-step>
        </el-steps>
        <div style="margin-top:50px;padding:0 20%;">
            <div style="padding:20px;line-height:1.8;border:1px solid #eee;margin-bottom:20px">
                <p>填写导入员工的信息</p>
                <p>请按照数据模板的格式准备导入数据，模板中的表头名称不可更改，表头行不能删除</p>
                <el-button
                    type="primary"
                    @click="down"
                >下载模板</el-button>
            </div>
            <div style="padding:20px;line-height:1.8;border:1px solid #eee;margin-bottom:20px">
                <p>上传填好的员工信息表</p>
                <p>文件后缀名必须</p>
                <el-upload
                    action="/excel/importExcel"
                    :limit="1"
                    :on-success="success">
                    <el-button type="primary">上传文件</el-button>
                </el-upload>
            </div>
            <div>
                <el-button type="primary" @click="next">下一步</el-button>
            </div>
        </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";
export default {
  data() {
    return {
      active:0,
      origin: window.location.origin,
    };
  },
  watch: {
    
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created() {
    
  },
  methods: {
    down(){
        window.open(this.origin+'/excel/download',"_blank");  
    },
    success(res,file,fileList){
        console.log(res)
    },
    next(){
        this.active = 2;
    }
  }
};
</script>
<style type="text/css">

</style>
