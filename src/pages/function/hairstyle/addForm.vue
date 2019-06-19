<template>
  <div class="panel">
    <panel-title :title="title">
      <el-button
        type="primary"
        @click="$router.go(-1)"
      >返回</el-button>
    </panel-title>
    <div style="background: #fff;padding:30px 30px 50px 30px;">
      <el-form
				ref="addForm"
				:model="addForm"
				label-width="160px"
				:inline="true"
        v-loading="loading"
			>
        <el-form-item
          label="发型名称:"
          prop="hairdoName"
          :rules="{required: true, message: '发型名称不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addForm.hairdoName"
            placeholder="请填写发型名称"
            :maxlength="10"
          ></el-input>
        </el-form-item>
        <p></p>
        <el-form-item
          label="发型货号:"
          prop="hairdoNum"
          :rules="{required: true, message: '发型货号不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addForm.hairdoNum"
            placeholder="发型的唯一货号"
            :maxlength="10"
            @blur="hairdoNumBlur"
          ></el-input>
        </el-form-item>
        <p></p>
        <el-form-item
          label="上传面片："
          prop="haImaThinBefore"
          style="position:relative"
        >
          <el-upload
            :action="action"
            accept="image/*"
            :http-request	="httpRequest"
            :multiple="true"
            :show-file-list="false">
            <el-button type="primary">批量上传</el-button>
          </el-upload>
        </el-form-item>
        <div style="margin-left:160px;">
          <el-form-item
            label=""
            prop="haImaThinBefore"
            :rules="{required: true, message: '亮面发型前面片不能为空', trigger: 'change'}"
            style="position:relative"
          >
            <four-progress :active="hairdoImage"></four-progress>
            <img-upload labelText="亮面发型前" :action="action" @imgdel="imgdel" position="haImaThinBefore" :img="addForm.haImaThinBefore" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item prop="haImaInBefore" 
            :rules="{required: true, message: '亮面发型后面片不能为空', trigger: 'change'}">
            <img-upload labelText="亮面发型后" :action="action" @imgdel="imgdel" position="haImaInBefore" :img="addForm.haImaInBefore" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item
            prop="haImaThinLeft"
            :rules="{required: true, message: '亮面发型左面片不能为空', trigger: 'change'}"
          >
            <img-upload labelText="亮面发型左" :action="action" @imgdel="imgdel" position="haImaThinLeft" :img="addForm.haImaThinLeft" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item
            prop="haImaThinRight"
            :rules="{required: true, message: '亮面发型右面片不能为空', trigger: 'change'}"
          >
            <img-upload labelText="亮面发型右" :action="action" @imgdel="imgdel" position="haImaThinRight" :img="addForm.haImaThinRight" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <p></p>
          <el-form-item
            prop="haImaThinAfter"
            :rules="{required: true, message: '暗面发型前面片不能为空', trigger: 'change'}"
          >
            <img-upload labelText="暗面发型前" :action="action" @imgdel="imgdel" position="haImaThinAfter" :img="addForm.haImaThinAfter" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item prop="haImaInAfter" 
            :rules="{required: true, message: '暗面发型后面片不能为空', trigger: 'change'}">
            <img-upload labelText="暗面发型后" :action="action" @imgdel="imgdel" position="haImaInAfter" :img="addForm.haImaInAfter" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item prop="haImaInLeft" 
            :rules="{required: true, message: '暗面发型左面片不能为空', trigger: 'change'}">
            <img-upload labelText="暗面发型左" :action="action" @imgdel="imgdel" position="haImaInLeft" :img="addForm.haImaInLeft" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item prop="haImaInRight" 
            :rules="{required: true, message: '暗面发型右面片不能为空', trigger: 'change'}">
            <img-upload labelText="暗面发型右" :action="action" @imgdel="imgdel" position="haImaInRight" :img="addForm.haImaInRight" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <image-text width="600" height="1000"></image-text>
        </div>
        <p></p>
        <el-form-item
          label="边缘点位:"
          prop="hairdoExtend"
        >
          <el-button
            type="primary"
            @click="dialogPoint"
          >编辑点位</el-button>
          <span>已标注({{addForm.hairdoExtend.length}})</span>
        </el-form-item>
        <p></p>
        <el-form-item
          label="上传封面:"
          prop="hairdoImage"
          :rules="{required: true, message: '正面照片不能为空', trigger: 'change'}"
        >
          <div
            class="imgFile"
            style="display: inline-block;"
          >
            <el-upload
              action="/picUpload/hair-cover"
              accept="image/*"
              :on-success="imgsuccess"
              :before-upload="beforeUpload"
              :data="{token:$store.getters.get_user_info.token || ''}"
              :show-file-list="false"
              @click.native="imgChange('hairdoImage')"
            >
              <div v-if="!addForm.hairdoImage">
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
                v-if="addForm.hairdoImage"
              >
                <img :src="addForm.hairdoImage">
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <p></p>
        <el-form-item
          label="货品链接:"
          prop="goodsImage"
          :rules="{required: true, message: '货品链接不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addForm.goodsImage"
            placeholder="请填写货品链接"
          ></el-input>
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
          label="发型分类:"
          prop="labelActiveList1"
          :rules="{type: 'number',required: true, message: '发型分类不能为空', trigger: 'change'}"
        >
          <el-select
            v-model="addForm.labelActiveList1"
            placeholder="请选择发型分类"
          >
            <el-option
              v-for="item in $store.getters.GET_hairstyleList"
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
        <p></p>
        <el-form-item
          label="身高:"
          prop="labelActiveList4"
          :rules="{type: 'array',required: true, message: '身高不能为空', trigger: 'change'}"
        > 
          <el-select
            v-model="addForm.labelActiveList4"
            multiple
            placeholder="请选择身高"
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
          label="肤色:"
          prop="labelActiveList5"
          :rules="{type: 'array',required: true, message: '肤色不能为空', trigger: 'change'}"
        >
          <el-select
            v-model="addForm.labelActiveList5"
            multiple
            placeholder="请选择肤色"
          >
            <el-option
              v-for="item in $store.getters.GET_colorList"
              :key="item.labelId"
              :label="item.labelName"
              :value="item.labelId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <p></p>
        <el-form-item
          label="年龄范围:"
          prop="labelActiveList6"
          :rules="{type: 'array',required: true, message: '年龄范围不能为空', trigger: 'change'}"
        > 
          <el-select
            v-model="addForm.labelActiveList6"
            multiple
            placeholder="请选择年龄范围"
          >
            <el-option
              v-for="item in $store.getters.GET_ageList"
              :key="item.labelId"
              :label="item.labelName"
              :value="item.labelId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <p></p>
        <el-form-item
          label="层级:"
          prop="haHierarchy"
          :rules="{type:'number',required: true, message: '层级不能为空', trigger: 'change'}"
        >
          <el-tooltip class="item" effect="dark" content="层级越大越贴近相机，展示的时候越靠前（例：上衣层级5，裤子层级6，展示的时候裤子会遮挡上衣）" placement="top-start">
            <el-input-number v-model="addForm.haHierarchy" :min="0" :max="1000" label="填写层级(0-1000之间的数字)"></el-input-number>
          </el-tooltip>
        </el-form-item>
        <p></p>
        <el-form-item
          label="标签:"
          prop="hairdoLabel"
          :rules="{validator: labelRep,required: true, trigger: 'change'}"
        >
          <el-input
            v-model="addForm.hairdoLabel"
            placeholder="填写搭配相关的标签，以逗号做分隔"
            type="textarea"
            :rows="3"
            style="width:400px"
          ></el-input>
        </el-form-item>
        <label-text title="标签以英文逗号作为分割符"></label-text>
        <p></p>
        <el-form-item
          label="备注:"
          prop="hairdoRemark"
        >
          <el-input
            v-model="addForm.hairdoRemark"
            placeholder="请输入备注信息,不超过300字"
            :maxlength="300"
            type="textarea"
            :rows="4"
            style="width:400px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <span class="dialog-footer">
          <el-button @click="dialogFlase">重置</el-button>
          <el-button
            type="primary"
            @click="addSave"
          >保 存</el-button>
        </span>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapState } from "vuex";
import { point } from "components";
export default {
  components: {
    point
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
        goodsImage: "", //货品链接
        hairdoName: "", //发型名字
        hairdoImage: "", //封面链接
        hairdoWeight: "10", //权重
        hairdoNum: "", //发型货号
        hairdoLabel: "", //标签
        hairdoCreatedId: "", //操作人id
        editionIds: [], //版本关联集合
        list: [], //标签关联集合
        haImaThinBefore: "", //窈窕第一张
        haImaThinAfter: "", //窈窕第二张
        haImaInBefore: "", //适中第一张
        haImaInAfter: "", //适中第二张
        haImaThinLeft:'',
        haImaThinRight:'',
        haImaInLeft:"",
        haImaInRight:'',
        hairdoRemark: "", //备注
        UpLines: [],
        onLines: [],
        labelActiveList1: null,
        labelActiveList2: [],
        labelActiveList3: [],
        labelActiveList4: [],
        labelActiveList5: [],
        labelActiveList6: [],
        hairdoExtend: [],
        haHierarchy: "700" //面片层级
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
      action: "/picUpload/hair",
      loading:false,
      title:"新增发型",
      hairdoNum:''
    };
  },
  computed:{
    hairdoImage(){
      return {
        outTop:this.addForm.haImaThinBefore,
        outBottom:this.addForm.haImaInBefore,
        outLeft:this.addForm.haImaThinLeft,
        outRight:this.addForm.haImaThinRight,
        inTop:this.addForm.haImaThinAfter,
        inBottom:this.addForm.haImaInAfter,
        inLeft:this.addForm.haImaInLeft,
        inRight:this.addForm.haImaInRight,
      }
    },
  },
  created() {
    if (typeof this.$route.query.id != "undefined") {
      this.title = "修改发型";
    }
    this.open();
  },
  methods: {
    open() {
      this.get_table_data1();
      this.get_table_data2();
      if (this.title == "修改发型") {
        this.$http({
        url: "/hairdo/queryHairDetail",
        method: "POST",
        data: { hairdoId: this.$route.query.id }
      })
        .then(({ data }) => {
          this.upDateForm = data;
          this.openClick();
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    close() {
      this.emptyForm();
    },
    imgdel(data){
      this.addForm[data] = '';
    },
    imgChange1(data){
      console.log(data)
      this.addForm[data.position] = data.img;
    },
    httpRequest(res) {
      console.log(res);
      if(res.file.type.split("/")[0]!='image'){
        this.$message.error("只能上传图片");
        return;
      }
      var arr = ['haImaThinBefore','haImaInBefore','haImaThinLeft','haImaThinRight','haImaThinAfter','haImaInAfter','haImaInLeft','haImaInRight'];
      var index = parseInt(res.file.name.split(".")[0]);
      if(index<9 && index>0){
        var position = arr[index-1];
        var form = new FormData();
        form.append("file", res.file);
        this.$http({
          url: res.action,
          method: "POST",
          data: form
        })
        .then((r) => {
          this.load_data = false;
          if (r.status == 0) {
            this.$message.error(r.msg);
          } else {
            this.addForm[position] = r.data;
            this.$message.success("上传成功");
          }
        })
        .catch(() => {
          this.$message.error("文件上传失败");
          this.load_data = false;
        });
      }else{
        this.$message.error("文件名不正确");
      }
      
    },
    openClick() {
      console.log(this.upDateForm);
      var upDateForm = this.upDateForm;
      this.hairdoNum = upDateForm.hairdoNum;
      var addForm = {
        hairdoId: upDateForm.hairdoId,
        goodsImage: upDateForm.goodsImage, //货品链接
        hairdoName: upDateForm.hairdoName, //发型名字
        hairdoImage: upDateForm.hairdoImage, //封面链接
        hairdoWeight: "10", //权重
        hairdoNum: upDateForm.hairdoNum, //发型货号
        hairdoLabel: upDateForm.label, //标签
        hairdoCreatedId: "", //操作人id
        editionIds: [], //版本关联集合
        list: [], //标签关联集合
        haImaThinBefore: upDateForm.thinImage[0], //正面第一张
        haImaThinAfter: upDateForm.middeImage[0], //正面第二张
        haImaInBefore: upDateForm.thinImage[1], //背面第一张
        haImaInAfter: upDateForm.middeImage[1], //背面第二张
        haImaThinLeft:upDateForm.thinImage[2],
        haImaThinRight:upDateForm.thinImage[3],
        haImaInLeft:upDateForm.middeImage[2],
        haImaInRight:upDateForm.middeImage[3],
        hairdoExtend: [],
        haHierarchy: upDateForm.hierarchy,
        hairdoRemark: upDateForm.remark, //备注
        UpLines: [],
        onLines: [],
        labelActiveList1: null,
        labelActiveList2: [],
        labelActiveList3: [],
        labelActiveList4: [],
        labelActiveList5: [],
        labelActiveList6: [],
      };
      for (var i = 0; i < upDateForm.edition.length; i++) {
        if (upDateForm.edition[i].offLine == 1) {
          addForm.UpLines.push(upDateForm.edition[i].editionId);
        } else {
          addForm.onLines.push(upDateForm.edition[i].editionId);
        }
      }
      addForm.labelActiveList1 = upDateForm.hairType[0].labelId;
      for (var i = 0; i < upDateForm.season.length; i++) {
        addForm.labelActiveList2.push(upDateForm.season[i].labelId);
      }
      for (var i = 0; i < upDateForm.face.length; i++) {
        addForm.labelActiveList3.push(upDateForm.face[i].labelId);
      }
      debugger
      for (var i = 0; i < upDateForm.otherLbale.length; i++) {
        if(upDateForm.otherLbale[i].labelId<30){
          addForm.labelActiveList6.push(upDateForm.otherLbale[i].labelId);
        }else if(upDateForm.otherLbale[i].labelId<33){
          addForm.labelActiveList5.push(upDateForm.otherLbale[i].labelId);
        }else{
          addForm.labelActiveList4.push(upDateForm.otherLbale[i].labelId);
        }
      }
      this.addForm = addForm;
    },
    //获取在线版本
    get_table_data1() {
      this.$http({
        url: "/edition/selectEdition",
        method: "POST",
        data: { editionType: 2, offLine: 0 }
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
        data: { editionType: 2, offLine: 1 }
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
          debugger;
          var arr = [],
            arr2 = [];
            debugger
          var arr1 = arr.concat(
            [this.addForm.labelActiveList1],
            this.addForm.labelActiveList2,
            this.addForm.labelActiveList3,
            this.addForm.labelActiveList4,
            this.addForm.labelActiveList5,
            this.addForm.labelActiveList6,
          );
          var arr3 = arr2.concat(this.addForm.UpLines, this.addForm.onLines);
          for (var i = 0; i < arr1.length; i++) {
            _this.addForm.list.push({ labelId: arr1[i] });
          }
          for (var i = 0; i < arr3.length; i++) {
            _this.addForm.editionIds.push({ editionId: arr3[i] });
          }
          if (this.title == "新增发型") {
            
            this.$http({
              url: "/hairdo/insterHairdoDO",
              method: "POST",
              data: this.addForm
            })
              .then(({ data }) => {
                this.$message.success("新增成功");
                this.dialogFlase();
              })
              .catch(() => {});
          } else {
            this.$http({
              url: "/hairdo/updateHairdo",
              method: "POST",
              data: this.addForm
            })
              .then(({ data }) => {
                this.$message.success("修改成功");
                this.dialogFlase();
              })
              .catch(() => {});
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // this.$emit('test',{
      //    	dialog:false,
      //    	dialogText:'新增发型',
      //    });
    },
    dialogFlase() {
      this.$router.go(-1)
    },
    beforeUpload(){
      this.loading = true;
    },
    imgsuccess(res, file, fileList, str) {
      this.$message.success("上传成功");
      this.addForm[this.imgfileName] = res.data;
      this.loading = false;
    },
    imgChange(str) {
      this.imgfileName = str;
    },
    hairdoNumBlur() {
      if (!this.addForm.hairdoNum) {
        return;
      }
      if(this.hairdoNum == this.addForm.hairdoNum){
        return
      }
      this.$http({
        url: "/hairdo/number",
        method: "POST",
        data: { num: this.addForm.hairdoNum, type: 1 }
      })
        .then(data => {
          console.log(data);
        })
        .catch(({ msg }) => {
          this.addForm.hairdoNum = "";
        });
    },
    dialogChange(val) {
      this.addForm.hairdoExtend = val;
    },
    dialogPoint() {
      if (!this.addForm.haImaThinBefore) {
        this.$message.error("请先上传照片");
        return;
      }
      var _this = this;
      var img = new Image();
      img.src = this.addForm.haImaThinBefore;
      _this.dialogMsg1 = {
        url: _this.addForm.haImaThinBefore,
        dialog: true,
        points: this.addForm.hairdoExtend,
        width: img.width,
        height: img.height
      };
      console.log(_this.dialogMsg1);
    }
  }
};
</script>
