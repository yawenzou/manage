<template>
  <div>
    <el-dialog
      title="上传文件"
      :visible.sync="dialogMsg.dialog"
      :close-on-click-modal="false"
      width="50%"
      @open="open"
      @close="close"
      center
    >
      <el-form
        ref="addForm"
        :model="addForm"
        label-width="60px"
        style="min-height:200px"
        v-loading="load_data"
      >
        <el-form-item>
          <!-- <div>
								:auto-upload="false"
								:before-upload="beforeUpload"
							</div> -->
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="dialogMsg.url"
            :show-file-list="false"
            :http-request	="httpRequest"
            :multiple="true"
          >
            <el-button
              slot="trigger"
              size="small"
              type="primary"
            >批量上传</el-button>
            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
          </el-upload>
          <div style="margin-top:20px;"></div>
          <el-table
            :data="tableData"
            element-loading-text="拼命加载中"
            border
            stripe
            style="width: 100%;"
          >
            <el-table-column
              prop="picName"
              label="文件名"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="picUrl"
              label="图片"
              align="center"
            >
              <template slot-scope="props">
                <img
                  v-lazy="props.row.picUrl"
                  style="height:80px;"
                  alt=""
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="u3dCover"
              label="略缩图"
              align="center"
            >
              <template slot-scope="props">
                <div v-if="isfxd(props.row.picName)">
                  <div v-if="props.row.u3dCover">
                    <span>已上传</span>
                    <el-button
                      @click.native="del(props.row,1)"
                      style="margin-top:5px;"
                      size="small"
                      type="danger"
                    >删除资源</el-button>
                  </div>
                  <div v-else>
                    <el-upload
                      class="upload-demo"
                      :action="dialogMsg.url"
                      :show-file-list="false"
                      :http-request	="httpRequest"
                    >
                      <el-button
                        size="small"
                        type="primary"
                      >点击上传</el-button>
                    </el-upload>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="u3dCover"
              label="高清图"
              align="center"
            >
              <template slot-scope="props">
                <div v-if="props.row.u3dOriginal">
                  <span>已上传</span>
                  <el-button
                    @click.native="del(props.row,0)"
                    style="margin-top:5px;"
                    size="small"
                    type="danger"
                  >删除资源</el-button>
                </div>
                <div v-else>
                  <el-upload
                    class="upload-demo"
                    :action="dialogMsg.url"
                    :http-request	="httpRequest"
                  >
                    <el-button
                      size="small"
                      type="primary"
                    >点击上传</el-button>
                  </el-upload>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFlase">取 消</el-button>
        <el-button
          type="primary"
          @click="addSave"
        >保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import axios from "axios";
export default {
  props: {
    dialogMsg: {
      type: Object, //传入的类型
      default: {
        dialog: false
      } //这样可以指定默认的值
    }
  },
  data() {
    return {
      addForm: {},
      fileList: [],
      fileType: [],
      tableData: [],
      imgUrl: "",
      form:{id:this.dialogMsg.id},
      load_data:false,
      token:this.$store.getters.get_user_info.token || ''
    };
  },
  created() {},
  methods: {
    isfxd(data){
      var f = data.split(".")[1];
      return f!='fbx'
    },
    submitUpload() {
      if (!this.fileType.length) {
        this.$message.error("请选择文件");
        return;
      }
      this.$refs.upload.submit();
    },
    open() {
      if (this.fileType.length) {
        this.$refs.upload.clearFiles();
        this.fileType = [];
      }
      this.load_data = false;
      this.getTable();
    },
    close(){
      this.tableData = [];
      this.load_data = false;
    },
    getTable() {
      this.load_data = true;
      this.$http({
        url: this.dialogMsg.getUrl,
        method: "POST",
        data: { id: this.dialogMsg.id }
      })
        .then(({ data }) => {
          this.tableData = data;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    del(data, type) {
      this.$http({
        url: "/picUpload/delU3DFile",
        method: "POST",
        data: { picUrl: data.picUrl, type: type }
      })
        .then(({ data }) => {
          this.getTable();
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    onceCLick(data) {
      this.imgUrl = data.picName.split(".")[0];
      console.log(this.imgUrl);
    },
    onceChange(res, file, fileList, str) {
      debugger
      if (res.status === 0) {
        this.$message.error(res.msg);
      } else {
        this.getTable();
      }
    },
    error(){
      this.$message.error("文件上传失败");
      this.load_data = false;
    },
    addSave() {
      this.dialogMsg.dialog = false;
    },
    dialogFlase() {
      this.dialogMsg.dialog = false;
    },
    beforeUpload(file) {
      debugger
      var names = file.name.split(".");
      if (names[names.length-1] != "unity3d") {
        this.$message.error("只能上传unity3d文件");
        return false;
      } else if (names[0] != this.imgUrl && names[0].split("_")[0] !=this.imgUrl ) {
        this.$message.error("文件名错误");
        return false;
      }
      this.load_data = true;
    },
    imgsuccess(res, file, fileList, str) {
      debugger
      this.load_data = false;
      if (res.status == 0) {
        this.$message.error(res.msg);
      } else {
        this.$message.success("上传成功");
        this.getTable();
      }
    },
    imgprogress(e, file, fileList) {},
    imgChange(file, fileList) {
      fileList = [];
      if (file.status == "ready") {
        var len = this.fileType.length;
        this.$set(this.fileType, len, file);
        console.log(this.fileType);
      }
    },
    httpRequest(res) {
      if(res.file.name.split(".")[1]!='unity3d'){
        this.$message.error("只能上传unity3d文件");
        return;
      }
      var _this = this;
      var form = new FormData();
      form.append("file", res.file);
      form.append("id", this.dialogMsg.id);
      var isOK = false;
      for(var i=0;i<_this.tableData.length;i++){
        var str = _this.tableData[i].picName.split(".");
        if(str[1] == 'fbx' || str[1] == 'obj'){
          if(res.file.name.split(".")[0] == str[0]){
            form.append("isFBX", true);
            isOK = true;
          }
        }
        if(str[0] == res.file.name.split(".")[0] || res.file.name.split(".")[0].split("_")[0] ==str[0] ){
          isOK = true;
        }
      }
      if(!isOK){
        this.$message.error("文件名错误");
        console.log(res.file.name)
        return;
      }
      this.$http({
        url: this.dialogMsg.url,
        method: "POST",
        data: form
      })
      .then(({ data }) => {
        this.load_data = false;
        if (res.status == 0) {
          this.$message.error(res.msg);
        } else {
          this.$message.success("上传成功");
          this.getTable();
        }
      })
      .catch(() => {
        this.$message.error("文件上传失败");
        this.load_data = false;
      });
    }
  }
};
</script>