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
          label="服装名称:"
          prop="clothName"
          :rules="{required: true, message: '服装名称不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addForm.clothName"
            placeholder="请填写服装名称"
            :maxlength="10"
          ></el-input>
        </el-form-item>
        <p></p>
        <el-form-item
          label="服装货号:"
          prop="clothNum"
          :rules="{required: true, message: '服装货号不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addForm.clothNum"
            placeholder="发型的唯一货号"
            :maxlength="10"
            @blur="clothNumBlur"
          ></el-input>
        </el-form-item>
        <p></p>
        <el-form-item
          label="上传（丰满）面片:"
          prop="p_0_0_0"
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
            prop="p_0_0_0"
            :rules="{required: true, message: '亮面身体前面片不能为空', trigger: 'change'}"
            style="position:relative"
          >
            <four-progress :active="fatImage"></four-progress>
            <img-upload labelText="亮面身体前" :action="action" @imgdel="imgdel" position="p_0_0_0" :img="addForm.p_0_0_0" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item prop="p_0_0_1" 
            :rules="{required: true, message: '亮面身体后面片不能为空', trigger: 'change'}">
            <img-upload labelText="亮面身体后" :action="action" @imgdel="imgdel" position="p_0_0_1" :img="addForm.p_0_0_1" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item
            prop="p_0_0_2"
            :rules="{required: true, message: '亮面身体左面片不能为空', trigger: 'change'}"
          >
            <img-upload labelText="亮面身体左" :action="action" @imgdel="imgdel" position="p_0_0_2" :img="addForm.p_0_0_2" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item
            prop="p_0_0_3"
            :rules="{required: true, message: '亮面身体右面片不能为空', trigger: 'change'}"
          >
            <img-upload labelText="亮面身体右" :action="action" @imgdel="imgdel" position="p_0_0_3" :img="addForm.p_0_0_3" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <p></p>
          <el-form-item
            prop="p_0_1_0"
            :rules="{required: true, message: '暗面身体前面片不能为空', trigger: 'change'}"
          >
            <img-upload labelText="暗面身体前" :action="action" @imgdel="imgdel" position="p_0_1_0" :img="addForm.p_0_1_0" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item prop="p_0_1_1" 
            :rules="{required: true, message: '暗面身体后面片不能为空', trigger: 'change'}">
            <img-upload labelText="暗面身体后" :action="action" @imgdel="imgdel" position="p_0_1_1" :img="addForm.p_0_1_1" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item prop="p_0_1_2" 
            :rules="{required: true, message: '暗面身体左面片不能为空', trigger: 'change'}">
            <img-upload labelText="暗面身体左" :action="action" @imgdel="imgdel" position="p_0_1_2" :img="addForm.p_0_1_2" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item prop="p_0_1_3" 
            :rules="{required: true, message: '暗面身体右面片不能为空', trigger: 'change'}">
            <img-upload labelText="暗面身体右" :action="action" @imgdel="imgdel" position="p_0_1_3" :img="addForm.p_0_1_3" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <image-text size="2M" width="2000" height="2000"></image-text>
        </div>
        <el-form-item
          label="上传(适中)面片："
          prop="p_0_0_0"
          style="position:relative"
        >
          <el-upload
            :action="action"
            accept="image/*"
            :http-request	="httpRequest1"
            :multiple="true"
            :show-file-list="false">
            <el-button type="primary">批量上传</el-button>
          </el-upload>
        </el-form-item>
        <div style="margin-left:160px;">
          <el-form-item
            label=""
            prop="p_1_0_0"
            :rules="{required: true, message: '亮面身体前面片不能为空', trigger: 'change'}"
            style="position:relative"
          >
            <four-progress :active="middeImage"></four-progress>
            <img-upload labelText="亮面身体前" :action="action" @imgdel="imgdel" position="p_1_0_0" :img="addForm.p_1_0_0" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item prop="p_1_0_1" 
            :rules="{required: true, message: '亮面身体后面片不能为空', trigger: 'change'}">
            <img-upload labelText="亮面身体后" :action="action" @imgdel="imgdel" position="p_1_0_1" :img="addForm.p_1_0_1" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item
            prop="p_1_0_2"
            :rules="{required: true, message: '亮面身体左面片不能为空', trigger: 'change'}"
          >
            <img-upload labelText="亮面身体左" :action="action" @imgdel="imgdel" position="p_1_0_2" :img="addForm.p_1_0_2" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item
            prop="p_1_0_3"
            :rules="{required: true, message: '亮面身体右面片不能为空', trigger: 'change'}"
          >
            <img-upload labelText="亮面身体右" :action="action" @imgdel="imgdel" position="p_1_0_3" :img="addForm.p_1_0_3" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <p></p>
          <el-form-item
            prop="p_1_1_0"
            :rules="{required: true, message: '暗面身体前面片不能为空', trigger: 'change'}"
          >
            <img-upload labelText="暗面身体前" :action="action" @imgdel="imgdel" position="p_1_1_0" :img="addForm.p_1_1_0" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item prop="p_1_1_1" 
            :rules="{required: true, message: '暗面身体后面片不能为空', trigger: 'change'}">
            <img-upload labelText="暗面身体后" :action="action" @imgdel="imgdel" position="p_1_1_1" :img="addForm.p_1_1_1" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item prop="p_1_1_2" 
            :rules="{required: true, message: '暗面身体左面片不能为空', trigger: 'change'}">
            <img-upload labelText="暗面身体左" :action="action" @imgdel="imgdel" position="p_1_1_2" :img="addForm.p_1_1_2" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item prop="p_1_1_3" 
            :rules="{required: true, message: '暗面身体右面片不能为空', trigger: 'change'}">
            <img-upload labelText="暗面身体右" :action="action" @imgdel="imgdel" position="p_1_1_3" :img="addForm.p_1_1_3" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <image-text size="2M" width="2000" height="2000"></image-text>
        </div>
        <el-form-item
          label="上传(窈窕)面片："
          prop="p_0_0_0"
          style="position:relative"
        >
          <el-upload
            :action="action"
            accept="image/*"
            :http-request	="httpRequest2"
            :multiple="true"
            :show-file-list="false">
            <el-button type="primary">批量上传</el-button>
          </el-upload>
        </el-form-item>
        <div style="margin-left:160px;">
          <el-form-item
            label=""
            prop="p_2_0_0"
            :rules="{required: true, message: '亮面身体前面片不能为空', trigger: 'change'}"
            style="position:relative"
          >
            <four-progress :active="thinImage"></four-progress>
            <img-upload labelText="亮面身体前" :action="action" @imgdel="imgdel" position="p_2_0_0" :img="addForm.p_2_0_0" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item prop="p_2_0_1" 
            :rules="{required: true, message: '亮面身体后面片不能为空', trigger: 'change'}">
            <img-upload labelText="亮面身体后" :action="action" @imgdel="imgdel" position="p_2_0_1" :img="addForm.p_2_0_1" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item
            prop="p_2_0_2"
            :rules="{required: true, message: '亮面身体左面片不能为空', trigger: 'change'}"
          >
            <img-upload labelText="亮面身体左" :action="action" @imgdel="imgdel" position="p_2_0_2" :img="addForm.p_2_0_2" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item
            prop="p_2_0_3"
            :rules="{required: true, message: '亮面身体右面片不能为空', trigger: 'change'}"
          >
            <img-upload labelText="亮面身体右" :action="action" @imgdel="imgdel" position="p_2_0_3" :img="addForm.p_2_0_3" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <p></p>
          <el-form-item
            prop="p_2_1_0"
            :rules="{required: true, message: '暗面身体前面片不能为空', trigger: 'change'}"
          >
            <img-upload labelText="暗面身体前" :action="action" @imgdel="imgdel" position="p_2_1_0" :img="addForm.p_2_1_0" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item prop="p_2_1_1" 
            :rules="{required: true, message: '暗面身体后面片不能为空', trigger: 'change'}">
            <img-upload labelText="暗面身体后" :action="action" @imgdel="imgdel" position="p_2_1_1" :img="addForm.p_2_1_1" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item prop="p_2_1_2" 
            :rules="{required: true, message: '暗面身体左面片不能为空', trigger: 'change'}">
            <img-upload labelText="暗面身体左" :action="action" @imgdel="imgdel" position="p_2_1_2" :img="addForm.p_2_1_2" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <el-form-item prop="p_2_1_3" 
            :rules="{required: true, message: '暗面身体右面片不能为空', trigger: 'change'}">
            <img-upload labelText="暗面身体右" :action="action" @imgdel="imgdel" position="p_2_1_3" :img="addForm.p_2_1_3" @imgChange="imgChange1"></img-upload>
          </el-form-item>
          <image-text size="2M" width="2000" height="2000"></image-text>
        </div>
        <el-form-item
          label="边缘点位:"
          prop="clothExtend"
        >
          <el-button
            type="primary"
            @click="dialogPoint"
          >编辑点位</el-button>
          <span>已标注({{addForm.clothExtend.length}})</span>
        </el-form-item>
        <p></p>
        <el-form-item
          label="上传封面:"
          prop="clothImage"
          :rules="{required: true, message: '封面不能为空', trigger: 'change'}"
        >
          <img-upload labelText="上传封面" :action="action" @imgdel="imgdel" position="clothImage" :img="addForm.clothImage" @imgChange="imgChange1"></img-upload>
        </el-form-item>
        <p></p>
        <el-form-item
          label="货品链接:"
          prop="cgoodsImage"
          :rules="{required: true, message: '货品链接不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addForm.cgoodsImage"
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
          label="服装分类:"
          prop="labelActiveList1"
          :rules="{type: 'number',required: true, message: '服装分类不能为空', trigger: 'change'}"
        >
          <el-select
            v-model="addForm.labelActiveList1"
            placeholder="请选择服装分类"
            @change="clothActive"
          >
            <el-option
              v-for="item in $store.getters.GET_clothingList"
              :key="item.labelId"
              :label="item.labelName"
              :value="item.labelId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="addForm.labelActiveList1 == 49"
          label="上装分类:"
          prop="clothUpType"
          :rules="{required: true, message: '上装分类不能为空', trigger: 'change'}"
        >
          <el-select
            v-model="addForm.clothUpType"
            placeholder="请选择上装分类"
            @change="clothUpChange"
          >
            <el-option
              label="上衣内"
              value="200"
            >
            </el-option>
            <el-option
              label="上衣外"
              value="400"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <p></p>
        <el-form-item
          label="面片层级:"
          prop="cpacthTop"
          :rules="{type:'number',required: true, message: '面片层级不能为空', trigger: 'blur'}"
        >
          <el-tooltip class="item" effect="dark" content="层级越大越贴近相机，展示的时候越靠前（例：上衣层级5，裤子层级6，展示的时候裤子会遮挡上衣）" placement="top-start">
            <el-input-number v-model="addForm.cpacthTop" :min="0" :max="1000" label="填写层级(0-1000之间的数字)"></el-input-number>
          </el-tooltip>
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
          label="身高:"
          prop="labelActiveList4"
          :rules="{type: 'array',required: true, message: '其他不能为空', trigger: 'change'}"
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
          :rules="{type: 'array',required: true, message: '其他不能为空', trigger: 'change'}"
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
          :rules="{type: 'array',required: true, message: '其他不能为空', trigger: 'change'}"
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
          label="标签:"
          prop="clothLabel"
          :rules="{validator: labelRep,required: true, trigger: 'change'}"
        >
          <el-input
            v-model="addForm.clothLabel"
            placeholder="填写搭配相关的标签，以逗号做分隔"
            style="width:300px"
            type="textarea"
            :rows="3"
          ></el-input>
        </el-form-item>
        <label-text></label-text>
        <p></p>
        <el-form-item
          label="备注:"
          prop="clothRemark"
        >
          <el-input
            v-model="addForm.clothRemark"
            placeholder="请输入备注信息,不超过300字"
            :maxlength="300"
            type="textarea"
            :rows="4"
            style="width:400px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button @click="dialogFlase">取 消</el-button>
        <el-button
          type="primary"
          @click="addSave"
        >保 存</el-button>
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
        cgoodsImage: "", //货品链接
        clothName: "", //发型名字
        clothImage: "", //封面链接
        hairdoWeight: "10", //权重
        clothNum: "", //发型货号
        clothLabel: "", //标签
        hairdoCreatedId: "", //操作人id
        list: [], //版本关联集合
        labelRelevanDOS: [], //标签集合
        p_0_0_0:'',
        p_0_0_1:'',
        p_0_0_2:'',
        p_0_0_3:'',
        p_0_1_0:'',
        p_0_1_1:'',
        p_0_1_2:'',
        p_0_1_3:'',
        p_1_0_0:'',
        p_1_0_1:'',
        p_1_0_2:'',
        p_1_0_3:'',
        p_1_1_0:'',
        p_1_1_1:'',
        p_1_1_2:'',
        p_1_1_3:'',
        p_2_0_0:'',
        p_2_0_1:'',
        p_2_0_2:'',
        p_2_0_3:'',
        p_2_1_0:'',
        p_2_1_1:'',
        p_2_1_2:'',
        p_2_1_3:'',
        clothRemark: "", //备注
        cpacthTop: "", //层级
        clothExtend: [],
        UpLines: [],
        onLines: [],
        labelActiveList1: "",
        clothUpType:'200',
        labelActiveList2: [],
        labelActiveList3: [],
        labelActiveList4: [],
        labelActiveList5: [],
        labelActiveList6: [],
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
      action: "/picUpload/clothes-cover",
      loading:false,
      clothNum:'',
      edit:false,
      title:'新增服装',
      upDateForm:{},
    };
  },
  created() {
    if (typeof this.$route.query.id != "undefined") {
      this.title = "修改服装";
    }
    this.open();
  },
  computed:{
    fatImage(){
      return {
        outTop:this.addForm.p_0_0_0,
        outBottom:this.addForm.p_0_0_1,
        outLeft:this.addForm.p_0_0_2,
        outRight:this.addForm.p_0_0_3,
        inTop:this.addForm.p_0_1_0,
        inBottom:this.addForm.p_0_1_1,
        inLeft:this.addForm.p_0_1_2,
        inRight:this.addForm.p_0_1_3,
      }
    },
    middeImage(){
      return {
        outTop:this.addForm.p_1_0_0,
        outBottom:this.addForm.p_1_0_1,
        outLeft:this.addForm.p_1_0_2,
        outRight:this.addForm.p_1_0_3,
        inTop:this.addForm.p_1_1_0,
        inBottom:this.addForm.p_1_1_1,
        inLeft:this.addForm.p_1_1_2,
        inRight:this.addForm.p_1_1_3,
      }
    },
    thinImage(){
      return {
        outTop:this.addForm.p_2_0_0,
        outBottom:this.addForm.p_2_0_1,
        outLeft:this.addForm.p_2_0_2,
        outRight:this.addForm.p_2_0_3,
        inTop:this.addForm.p_2_1_0,
        inBottom:this.addForm.p_2_1_1,
        inLeft:this.addForm.p_2_1_2,
        inRight:this.addForm.p_2_1_3,
      }
    },
  },
  methods: {
    clothActive(val){
      if(this.edit){
        this.edit = false;
        return
      }
      if(val == 47){
        this.addForm.cpacthTop = '100'
      }else if(val == 48){
        this.addForm.cpacthTop = '300'
      }else if(val == 50){
        this.addForm.cpacthTop = '600'
      }else if(val == 49){
        this.addForm.cpacthTop = '200'
      }else{
        this.addForm.cpacthTop = '600'
      }
    },
    clothUpChange(val){
      if(!this.loading){
        this.addForm.cpacthTop = val
      }
    },
    open() {
      this.get_table_data1();
      this.get_table_data2();
      if (this.title == "修改服装") {
        this.$http({
        url: "/cloth/queryClothDetail",
        method: "POST",
        data: { clothId: this.$route.query.id}
      })
        .then(({ data }) => {
          this.upDateForm = data;
          this.openClick();
        })
        .catch(err => {
          console.log(err);
        });
      } else {
        // this.emptyForm();
      }
    },
    close() {
      this.emptyForm();
    },
    openClick() {
      debugger
      this.loading = true;
      this.edit = true;
      console.log(this.upDateForm);
      var upDateForm = this.upDateForm;
      this.clothNum = upDateForm.clothNum;
      var addForm = {
        clothId: upDateForm.clothId,
        cpacthTop: upDateForm.clothTop,
        cgoodsImage: upDateForm.cgoodsImage, //货品链接
        clothName: upDateForm.clothName, //发型名字
        clothImage: upDateForm.clothImage, //封面链接
        hairdoWeight: "10", //权重
        clothNum: upDateForm.clothNum, //发型货号
        clothLabel: upDateForm.label, //标签
        clothCreatedId: "", //操作人id
        labelRelevanDOS: [], //标签关联集合
        list: [], //版本关联集合
        p_0_0_0:upDateForm.fatImage['0_0'],
        p_0_0_1:upDateForm.fatImage['0_1'],
        p_0_0_2:upDateForm.fatImage['0_2'],
        p_0_0_3:upDateForm.fatImage['0_3'],
        p_0_1_0:upDateForm.fatImage['1_0'],
        p_0_1_1:upDateForm.fatImage['1_1'],
        p_0_1_2:upDateForm.fatImage['1_2'],
        p_0_1_3:upDateForm.fatImage['1_3'],
        p_1_0_0:upDateForm.middeImage['0_0'],
        p_1_0_1:upDateForm.middeImage['0_1'],
        p_1_0_2:upDateForm.middeImage['0_2'],
        p_1_0_3:upDateForm.middeImage['0_3'],
        p_1_1_0:upDateForm.middeImage['1_0'],
        p_1_1_1:upDateForm.middeImage['1_1'],
        p_1_1_2:upDateForm.middeImage['1_2'],
        p_1_1_3:upDateForm.middeImage['1_3'],
        p_2_0_0:upDateForm.thinImage['0_0'],
        p_2_0_1:upDateForm.thinImage['0_1'],
        p_2_0_2:upDateForm.thinImage['0_2'],
        p_2_0_3:upDateForm.thinImage['0_3'],
        p_2_1_0:upDateForm.thinImage['1_0'],
        p_2_1_1:upDateForm.thinImage['1_1'],
        p_2_1_2:upDateForm.thinImage['1_2'],
        p_2_1_3:upDateForm.thinImage['1_3'],
        clothRemark: upDateForm.remark==null||upDateForm.remark=='null'?'':upDateForm.remark, //备注
        clothExtend: JSON.parse(upDateForm.clothExtend)||[],
        UpLines: [],
        onLines: [],
        labelActiveList1: [],
        clothUpType:'200',
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
      addForm.labelActiveList1 = upDateForm.clothTypeName[0].labelId;
      for (var i = 0; i < upDateForm.season.length; i++) {
        addForm.labelActiveList2.push(upDateForm.season[i].labelId);
      }
      for (var i = 0; i < upDateForm.face.length; i++) {
        addForm.labelActiveList3.push(upDateForm.face[i].labelId);
      }
      for (var i = 0; i < upDateForm.otherLabel.length; i++) {
        if(upDateForm.otherLabel[i].labelId<30){
          addForm.labelActiveList6.push(upDateForm.otherLabel[i].labelId);
        }else if(upDateForm.otherLabel[i].labelId<33){
          addForm.labelActiveList5.push(upDateForm.otherLabel[i].labelId);
        }else{
          addForm.labelActiveList4.push(upDateForm.otherLabel[i].labelId);
        }
      }
      this.addForm = addForm;
      this.loading = false;
    },
    dialogChange(val) {
      this.addForm.clothExtend = val;
    },
    dialogPoint() {
      if (!this.addForm.clImaThinBefore) {
        this.$message.error("请先上传照片");
        return;
      }
      var _this = this;
      var img = new Image();
      img.src = this.addForm.clImaThinBefore;
      _this.dialogMsg1 = {
        url: _this.addForm.clImaThinBefore,
        dialog: true,
        points: this.addForm.clothExtend
      };
      console.log(_this.dialogMsg1);
    },
    //获取在线版本
    get_table_data1() {
      this.$http({
        url: "/edition/selectEdition",
        method: "POST",
        data: { editionType: 3, offLine: 0 }
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
        data: { editionType: 3, offLine: 1 }
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
            this.addForm.labelActiveList4,
            this.addForm.labelActiveList5,
            this.addForm.labelActiveList6
          );
          var arr3 = arr2.concat(this.addForm.UpLines, this.addForm.onLines);
          for (var i = 0; i < arr1.length; i++) {
            _this.addForm.labelRelevanDOS.push({ labelId: arr1[i] });
          }
          for (var i = 0; i < arr3.length; i++) {
            _this.addForm.list.push({ editionId: arr3[i] });
          }
          console.log(this.addForm)
          if (this.title == "新增服装") {
            this.$http({
              url: "/cloth/insertCloth",
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
              url: "/cloth/updateCloth",
              method: "POST",
              data: this.addForm
            })
              .then(({ data }) => {
                this.$message.success("修改成功");
                this.emptyForm();
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
        cgoodsImage: "", //货品链接
        clothName: "", //发型名字
        clothImage: "", //封面链接
        hairdoWeight: "10", //权重
        clothNum: "", //发型货号
        clothLabel: "", //标签
        hairdoCreatedId: "", //操作人id
        list: [], //版本关联集合
        labelRelevanDOS: [], //标签集合
        p_0_0_0:'',
        p_0_0_1:'',
        p_0_0_2:'',
        p_0_0_3:'',
        p_0_1_0:'',
        p_0_1_1:'',
        p_0_1_2:'',
        p_0_1_3:'',
        p_1_0_0:'',
        p_1_0_1:'',
        p_1_0_2:'',
        p_1_0_3:'',
        p_1_1_0:'',
        p_1_1_1:'',
        p_1_1_2:'',
        p_1_1_3:'',
        p_2_0_0:'',
        p_2_0_1:'',
        p_2_0_2:'',
        p_2_0_3:'',
        p_2_1_0:'',
        p_2_1_1:'',
        p_2_1_2:'',
        p_2_1_3:'',
        clothRemark: "", //备注
        cpacthTop: "", //层级
        clothExtend: [],
        UpLines: [],
        onLines: [],
        labelActiveList1: "",
        clothUpType:'200',
        labelActiveList2: [],
        labelActiveList3: [],
        labelActiveList4: [],
        labelActiveList5: [],
        labelActiveList6: [],
      };
      this.$refs['addForm'].resetFields();
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
    imgChange1(data){
      console.log(data)
      this.addForm[data.position] = data.img;
    },
    imgdel(data){
      this.addForm[data] = '';
    },
    clothNumBlur() {
      if (!this.addForm.clothNum) {
        return;
      }
      if(this.clothNum == this.addForm.clothNum){
        return
      }
      this.$http({
        url: "/hairdo/number",
        method: "POST",
        data: { num: this.addForm.clothNum, type: 0 }
      })
        .then(data => {
          console.log(data);
        })
        .catch(({ msg }) => {
          this.addForm.clothNum = "";
        });
    },
    httpRequest(res) {
      console.log(res);
      if(res.file.type.split("/")[0]!='image'){
        this.$message.error("只能上传图片");
        return;
      }
      var arr = ['p_0_0_0','p_0_0_1','p_0_0_2','p_0_0_3','p_0_1_0','p_0_1_1','p_0_1_2','p_0_1_3'];
      var index = parseInt(res.file.name.split(".")[0]);
      if(index<9 && index>0){
        this.imgUpdate({
          action:res.action,
          position:arr[index-1],
          file:res.file
        })
      }else{
        this.$message.error("文件名不正确");
      }
    },
    httpRequest1(res) {
      console.log(res);
      if(res.file.type.split("/")[0]!='image'){
        this.$message.error("只能上传图片");
        return;
      }
      var arr = ['p_1_0_0','p_1_0_1','p_1_0_2','p_1_0_3','p_1_1_0','p_1_1_1','p_1_1_2','p_1_1_3'];
      var index = parseInt(res.file.name.split(".")[0]);
      if(index<9 && index>0){
        this.imgUpdate({
          action:res.action,
          position:arr[index-1],
          file:res.file
        })
      }else{
        this.$message.error("文件名不正确");
      }
    },
    httpRequest2(res) {
      console.log(res);
      if(res.file.type.split("/")[0]!='image'){
        this.$message.error("只能上传图片");
        return;
      }
      var arr = ['p_2_0_0','p_2_0_1','p_2_0_2','p_2_0_3','p_2_1_0','p_2_1_1','p_2_1_2','p_2_1_3'];
      var index = parseInt(res.file.name.split(".")[0]);
      if(index<9 && index>0){
        this.imgUpdate({
          action:res.action,
          position:arr[index-1],
          file:res.file
        })
      }else{
        this.$message.error("文件名不正确");
      }
    },
    imgUpdate(res){
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
          this.addForm[res.position] = r.data;
          this.$message.success("上传成功");
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

