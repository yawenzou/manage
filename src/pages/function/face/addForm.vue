<template>
  <div>
    <el-dialog
      :title="dialogMsg.dialogText"
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
        label-width="160px"
        :inline="true"
        v-loading="loading"
      >
        <el-form-item
          label="脸型名称:"
          prop="faceName"
          :rules="{required: true, message: '脸型名称不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addForm.faceName"
            placeholder="请填写脸型名称"
          ></el-input>
        </el-form-item>
        <p></p>
        <el-form-item
          label="上传面片:"
          prop="faImaThinBefore"
          :rules="{required: true, message: '正面面片不能为空', trigger: 'change'}"
        >
          <div class="imgFile">
            <el-upload
              :action="action"
              accept="image/*"
              :on-success="imgsuccess"
              :data="{token:$store.getters.get_user_info.token || ''}"
              :before-upload="beforeUpload"
              :show-file-list="false"
              @click.native="imgChange('faImaThinBefore')"
            >
              <div v-if="!addForm.faImaThinBefore">
                <svg
                  viewBox="64 64 896 896"
                  class="p1"
                  data-icon="plus"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M848 474H550V152h-76v322H176c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h298v322h76V550h298c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                </svg>
                <p class="p2">上传正面</p>
              </div>
              <div
                class="img-box"
                v-if="addForm.faImaThinBefore"
              >
                <img :src="addForm.faImaThinBefore">
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item
          prop="faImaThinAfter"
          :rules="{required: true, message: '反面面片不能为空', trigger: 'change'}"
        >
          <div class="imgFile">
            <el-upload
              :action="action"
              accept="image/*"
              :on-success="imgsuccess"
              :data="{token:$store.getters.get_user_info.token || ''}"
              :before-upload="beforeUpload"
              :show-file-list="false"
              @click.native="imgChange('faImaThinAfter')"
            >
              <div v-if="!addForm.faImaThinAfter">
                <svg
                  viewBox="64 64 896 896"
                  class="p1"
                  data-icon="plus"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M848 474H550V152h-76v322H176c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h298v322h76V550h298c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                </svg>
                <p class="p2">上传反面</p>
              </div>
              <div
                class="img-box"
                v-if="addForm.faImaThinAfter"
              >
                <img :src="addForm.faImaThinAfter">
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <div style="padding-left:160px"><image-text></image-text></div>
        <!-- <p></p>
        <el-form-item
          label="边缘点位:"
          prop="faceSpraced"
        >
          <el-button
            type="primary"
            @click="dialogPoint"
          >编辑点位</el-button>
          <span>已标注({{addForm.faceSpraced.length}})</span>
        </el-form-item> -->
        <p></p>
        <el-form-item
          label="上传模型:"
          prop="faImaInBefore"
          :rules="{required: true, message: '模型不能为空', trigger: 'change'}"
        >
          <div
            class="imgFile"
            style="display: inline-block;"
          >
            <el-upload
              action="/picUpload/face-object"
              :on-success="imgsuccess"
              :data="{token:$store.getters.get_user_info.token || ''}"
              :before-upload="beforeUpload1"
              :show-file-list="false"
              @click.native="imgChange('faImaInBefore')"
            >
              <div v-if="!addForm.faImaInBefore">
                <svg
                  viewBox="64 64 896 896"
                  class="p1"
                  data-icon="plus"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M848 474H550V152h-76v322H176c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h298v322h76V550h298c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                </svg>
                <p class="p2">上传模型</p>
              </div>
              <div
                class="img-box"
                v-if="addForm.faImaInBefore"
              >
                <span>{{addForm.faImaInBefore}}</span>
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <label-text title="支持文件格式：.fbx 、.obj"></label-text>
        <p></p>
        <el-form-item
          label="上传封面:"
          prop="faceImage"
          :rules="{required: true, message: '封面不能为空', trigger: 'change'}"
        >
          <div
            class="imgFile"
            style="display: inline-block;"
          >
            <el-upload
              action="/picUpload/face-cover"
              accept="image/*"
              :on-success="imgsuccess"
              :data="{token:$store.getters.get_user_info.token || ''}"
              :before-upload="beforeUpload"
              :show-file-list="false"
              @click.native="imgChange('faceImage')"
            >
              <div v-if="!addForm.faceImage">
                <svg
                  viewBox="64 64 896 896"
                  class="p1"
                  data-icon="plus"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M848 474H550V152h-76v322H176c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h298v322h76V550h298c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                </svg>
                <p class="p2">上传封面</p>
              </div>
              <div
                class="img-box"
                v-if="addForm.faceImage"
              >
                <img :src="addForm.faceImage">
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <p></p>
        <el-form-item
          label="关联离线版本:"
          prop="UpLines"
          :rules="{type: 'array',required: true, message: '关联离线版本不能为空', trigger: 'change'}"
        >
          <el-select
            v-model="addForm.UpLines"
            multiple
            placeholder="请选择离线版本"
          >
            <el-option
              v-for="item in editionIdsUpLine"
              :key="item.editionId"
              :label="item.editionName"
              :value="item.editionId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <p></p>
        <el-form-item
          label="关联在线版本:"
          prop="onLines"
        >
          <el-select
            v-model="addForm.onLines"
            multiple
            placeholder="请选择在线版本"
          >
            <el-option
              v-for="item in editionIdsOnline"
              :key="item.editionId"
              :label="item.editionName"
              :value="item.editionId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <p></p>
        <el-form-item
          label="脸型分类:"
          prop="labelActiveList1"
          :rules="{type: 'number',required: true, message: '脸型分类不能为空', trigger: 'change'}"
        >
          <el-select
            v-model="addForm.labelActiveList1"
            placeholder="请选择脸型分类"
          >
            <el-option
              v-for="item in $store.getters.GET_faceClassificationList"
              :key="item.labelId"
              :label="item.labelName"
              :value="item.labelId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <p></p>
        <el-form-item
          label="季节:"
          prop="labelActiveList2"
          :rules="{type: 'array',required: true, message: '季节不能为空', trigger: 'change'}"
        >
          <el-select
            v-model="addForm.labelActiveList2"
            multiple
            placeholder="请选择季节"
          >
            <el-option
              v-for="item in $store.getters.GET_seasonList"
              :key="item.labelId"
              :label="item.labelName"
              :value="item.labelId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <p></p>
        <el-form-item
          label="脸型:"
          prop="labelActiveList3"
          :rules="{type: 'array',required: true, message: '脸型不能为空', trigger: 'change'}"
        >
          <el-select
            v-model="addForm.labelActiveList3"
            multiple
            placeholder="请选择脸型"
          >
            <el-option
              v-for="item in $store.getters.GET_faceList"
              :key="item.labelId"
              :label="item.labelName"
              :value="item.labelId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <p></p>
        <el-form-item
          label="其他:"
          prop="labelActiveList4"
          :rules="{type: 'array',required: true, message: '其他不能为空', trigger: 'change'}"
        >
          <el-select
            v-model="addForm.labelActiveList4"
            multiple
            placeholder="请选择内容"
          >
            <el-option
              v-for="item in $store.getters.GET_otherList"
              :key="item.labelId"
              :label="item.labelName"
              :value="item.labelId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <p></p>
        <el-form-item
          label="标签:"
          prop="faceLabel"
          :rules="{validator: labelRep,required: true, trigger: 'change'}"
        >
          <el-input
            v-model="addForm.faceLabel"
            placeholder="填写搭配相关的标签，以逗号做分隔"
            type="textarea"
            :rows="3"
            style="width:300px"
          ></el-input>
        </el-form-item>
        <p></p>
        <el-form-item
          label="备注:"
          prop="faceRemark"
        >
          <el-input
            v-model="addForm.faceRemark"
            placeholder="请输入备注信息,不超过300字"
            :maxlength="300"
            type="textarea"
            :rows="4"
            style="width:400px"
          ></el-input>
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
    <point
      v-if="dialogMsg.dialog"
      :dialogMsg="dialogMsg1"
      @test1="dialogChange"
    ></point>
    <input
      style="display: none"
      @change="fileChange"
      id="fileInput"
      type="file"
      name=""
    >
    <canvas id="flieCan"></canvas>
  </div>
</template>
<script type="text/javascript">
import { mapState } from "vuex";
import { point } from "components";
export default {
  components: {
    point
  },
  props: {
    dialogMsg: {
      type: Object, //传入的类型
      default: {
        dialog: false,
        dialogText: "新增脸型"
      } //这样可以指定默认的值
    },
    upDateForm: {
      type: Object
    },
  },
  data() {
    return {
      labelRep:(rule, value, callback) => {
        if (!value) {
          return callback(new Error('标签不能为空'));
        }
        var values = value.split(",");
        if(values.length>10){
          return callback(new Error('最多可添加10个标签'));
        }
        for(var i=0;i<values.length;i++){
          if(values[i].getBytesLength()>12){
            return callback(new Error('单个标签不能超过12个字节'));
          }
        }
        callback();
      },
      addForm: {
        faceName: "", //脸型名字
        faceImage: "", //封面链接
        hairdoWeight: "10", //权重
        faceLabel: "", //标签
        faceCreatedId: "", //操作人id
        list: [], //版本关联集合
        labelRelevanDOS: [], //标签关联集合
        faImaThinBefore: "", //窈窕第一张
        faImaThinAfter: "", //窈窕第二张
        faceSpraced: [], //边缘点位
        faceRemark: "", //备注脸型模型
        faImaInBefore:'',//
        UpLines: [],
        onLines: [],
        labelActiveList1: null,
        labelActiveList2: [],
        labelActiveList3: [],
        labelActiveList4: []
      },
      imgfileName: "",
      editionIdsOnline: [],
      editionIdsUpLine: [],
      dialogMsg1: {
        width: 500,
        height: 500,
        dialog: false,
        imgUrl: ""
      },
      action: "/picUpload/face",
      loading:false
    };
  },
  created() {},
  methods: {
    fileChange(e) {
      console.log(e);
    },
    open() {
      this.get_table_data1();
      this.get_table_data2();
      if (this.dialogMsg.dialogText == "修改脸型") {
        this.openClick();
      }
    },
    close() {
      this.emptyForm();
    },
    openClick() {
      console.log(this.upDateForm);
      var upDateForm = this.upDateForm;
      var addForm = {
        faceId: upDateForm.faceId,
        faceName: upDateForm.faceName, //脸型名字
        faceImage: upDateForm.faceImage, //封面链接
        faceLabel: upDateForm.faceLabel, //标签
        faceCreatedId: "", //操作人id
        aeIds: [], //版本关联集合
        lrIds: [], //标签关联集合
        faImaThinBefore: upDateForm.thinImage[0], //窈窕第一张
        faImaThinAfter: upDateForm.thinImage[1], //窈窕第二张
        faceRemark: upDateForm.remark, //备注
        faceSpraced: JSON.parse(upDateForm.faceSpraced),
        faImaInBefore:upDateForm['face-object'],
        UpLines: [],
        onLines: [],
        labelActiveList1: [],
        labelActiveList2: [],
        labelActiveList3: [],
        labelActiveList4: []
      };
      debugger
      for (var i = 0; i < upDateForm.edition.length; i++) {
        if (upDateForm.edition[i].offLine == 1) {
          addForm.UpLines.push(upDateForm.edition[i].editionId);
        } else {
          addForm.onLines.push(upDateForm.edition[i].editionId);
        }
      }
      addForm.labelActiveList1 = upDateForm.faceTypeName[0].labelId;
      for (var i = 0; i < upDateForm.season.length; i++) {
        addForm.labelActiveList2.push(upDateForm.season[i].labelId);
      }
      for (var i = 0; i < upDateForm.face.length; i++) {
        addForm.labelActiveList3.push(upDateForm.face[i].labelId);
      }
      for (var i = 0; i < upDateForm.otherLabel.length; i++) {
        addForm.labelActiveList4.push(upDateForm.otherLabel[i].labelId);
      }
      this.addForm = addForm;
    },
    dialogChange(val) {
      this.addForm.faceSpraced = val;
    },
    dialogPoint() {
      if (!this.addForm.faImaThinBefore) {
        this.$message.error("请先上传照片");
        return;
      }
      var _this = this;
      var img = new Image();
      img.src = this.addForm.faImaThinBefore;
      _this.dialogMsg1 = {
        url: _this.addForm.faImaThinBefore,
        dialog: true,
        points: this.addForm.faceSpraced
      };
      console.log(_this.dialogMsg1);
    },
    //获取在线版本
    get_table_data1() {
      this.$http({
        url: "/edition/selectEdition",
        method: "POST",
        data: { editionType: 5, offLine: 0 }
      })
        .then(({ data }) => {
          this.editionIdsOnline = data.rows;
        })
        .catch(() => {});
    },
    //获取离线版本
    get_table_data2() {
      this.$http({
        url: "/edition/selectEdition",
        method: "POST",
        data: { editionType: 5, offLine: 1 }
      })
        .then(({ data }) => {
          this.editionIdsUpLine = data.rows;
        })
        .catch(() => {});
    },
    addSave() {
      var _this = this;
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          var arr = [],
            arr2 = [];
          var arr1 = arr.concat(
            [this.addForm.labelActiveList1],
            this.addForm.labelActiveList2,
            this.addForm.labelActiveList3,
            this.addForm.labelActiveList4
          );
          var arr3 = arr2.concat(this.addForm.UpLines, this.addForm.onLines);
          if (this.dialogMsg.dialogText == "新增脸型") {
            for (var i = 0; i < arr1.length; i++) {
              _this.addForm.labelRelevanDOS.push({ labelId: arr1[i] });
            }
            for (var i = 0; i < arr3.length; i++) {
              _this.addForm.list.push({ editionId: arr3[i] });
            }
            this.$http({
              url: "/face/insertFeature",
              method: "POST",
              data: this.addForm
            })
              .then(({ data }) => {
                this.$message.success("新增成功");
                this.$emit("save");
                this.dialogFlase();
              })
              .catch(() => {});
          } else {
            for (var i = 0; i < arr1.length; i++) {
              _this.addForm.lrIds.push({ labelId: arr1[i] });
            }
            for (var i = 0; i < arr3.length; i++) {
              _this.addForm.aeIds.push({ editionId: arr3[i] });
            }
            this.$http({
              url: "/face/updateFeature",
              method: "POST",
              data: this.addForm
            })
              .then(({ data }) => {
                this.$message.success("修改成功");
                this.$emit("save");
                this.dialogFlase();
              })
              .catch(() => {});
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    emptyForm() {
      this.addForm = {
        faceName: "", //脸型名字
        faceImage: "", //封面链接
        hairdoWeight: "10", //权重
        faceLabel: "", //标签
        faceCreatedId: "", //操作人id
        list: [], //版本关联集合
        labelRelevanDOS: [], //标签关联集合
        faImaThinBefore: "", //窈窕第一张
        faImaThinAfter: "", //窈窕第二张
        faceSpraced: [], //边缘点位
        faceRemark: "", //备注脸型模型
        faImaInBefore:'',//
        UpLines: [],
        onLines: [],
        labelActiveList1: null,
        labelActiveList2: [],
        labelActiveList3: [],
        labelActiveList4: []
      };
      this.$refs['addForm'].resetFields();
    },
    dialogFlase() {
      this.emptyForm();
      this.$emit("test", {
        dialog: false,
        dialogText: "新增脸型"
      });
    },
    beforeUpload(){
      this.loading = true;
    },
    beforeUpload1(file){
      var names = file.name.split(".");
      if(names[names.length-1]!='FBX'){
        this.$message.error("文件格式错误");
        return false
      }
      console.log(names[names.length-1])
    },
    imgsuccess(res, file, fileList, str) {
      this.$message.success("上传成功");
      this.addForm[this.imgfileName] = res.data;
      this.loading = false;
    },
    imgChange(str) {
      this.imgfileName = str;
    }
  }
};
</script>