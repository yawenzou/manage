<template>
  <div style="margin-top:40px">
    <el-form
        ref="addForm"
        :model="addForm"
        label-width="160px"
        :inline="true"
        label-position="top"
      >
        <div>
          <p class="form-title">基础信息</p>
          <el-form-item
            label="联系人:"
            prop="devName"
            :rules="{required: true, message: '联系人不能为空', trigger: 'blur'}"
          >
            <el-input
              v-model="addForm.devName"
              placeholder="请填写联系人"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="手机号码:"
            prop="devPhone"
            :rules="{required: true, message: '手机号码不能为空', trigger: 'blur'}"
          >
            <el-input
              v-model="addForm.devPhone"
              placeholder="请填写手机号码"
              :maxlength="11"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="所属公司:"
            prop="devCompany"
            :rules="{required: true, message: '所属公司不能为空', trigger: 'blur'}"
            style="width:300px"
          >
            <el-input
              v-model="addForm.devCompany"
              placeholder="请填写所属公司"
            ></el-input>
          </el-form-item>
          <div>
            <el-form-item
              label="地区选择:"
              prop="devProvince"
              :rules="{required: true, message: '地区选择不能为空', trigger: 'blur'}"
            >
              <v-distpicker
                :province="addForm.devProvince"
                :city="addForm.devCity"
                :area="addForm.devArea"
                @selected="addresChange"
              ></v-distpicker>
            </el-form-item>
            <el-form-item
              label="详细地址:"
              prop="devAddress"
              :rules="{required: true, message: '详细地址不能为空', trigger: 'blur'}"
              style="width:300px"
            >
              <el-input
                v-model="addForm.devAddress"
                placeholder="请填写详细地址"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <p class="form-title">客户信息</p>
          <el-form-item
            label="客户编码:"
            prop="devCustNum"
            :rules="{required: true, message: '客户编码不能为空', trigger: 'blur'}"
          >
            <el-input
              v-model="addForm.devCustNum"
              placeholder="请填写客户编码"
            ></el-input>
          </el-form-item>
          <el-form-item
            label=" 管理员:"
            prop="userId"
            :rules="{type:'number',required: true, message: ' 管理员不能为空', trigger: 'blur'}"
          >
            <el-select
              v-model="addForm.userId"
              placeholder="请选择管理员"
            >
              <el-option
                v-for="item in user"
                :key="item.id"
                :label="item.eUserName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="签约时间:"
            prop="contractDate"
            :rules="{required: true, message: '签约时间不能为空', trigger: 'blur'}"
          >
            <el-date-picker
              v-model="addForm.contractDate"
              type="datetime"
              placeholder="选择日期"
              @change="dateChange"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="备注:"
            prop="devRemark"
            style="display: block"
          >
            <el-input
              v-model="addForm.devRemark"
              placeholder="请输入备注信息"
            ></el-input>
          </el-form-item>
        </div>
        <div class="form-title">
          <el-form-item
            prop="editionType"
          >
            <el-select
              v-model="addForm.editionType"
              placeholder="请选择版本"
            >
              <el-option
                label="在线版本"
                value="1"
              >
              </el-option>
              <el-option
                label="离线版本"
                value="0"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
          >
            <el-select
              v-model="editionShowNum"
              placeholder="请选择展示面数"
              @change="editionShowNumChange"
            >
              <el-option
                label="四个面"
                :value="4"
              >
              </el-option>
              <el-option
                label="两个面"
                :value="2"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-checkbox v-if="title=='修改设备'" v-model="addForm.changeBig">清除原始数据更新</el-checkbox>
          <div
            label="资源版本号："
            style="display: inline-block;"
            v-if="addForm.editionType == '0'"
            key="editionType0"
          >
            <span style="color:#ff4949;">*</span>
            <span style="color:#666;font-weight: 400;">资源版本号：</span>
            <el-form-item
              prop="devOffeditprev"
              style="position: relative;top:-5px;width:80px;"
              :rules="{required: true, message: '离线大版本号不能为空', trigger: 'blur'}"
            >
              <el-input
                v-model="addForm.devOffeditprev"
                placeholder="大版本号"
              ></el-input>
            </el-form-item>
            .
            <el-form-item
              prop="devOffeditNext"
              style="position: relative;top:-5px;width:80px;"
              :rules="{required: true, message: '离线小版本号不能为空', trigger: 'blur'}"
            >
              <el-input
                v-model="addForm.devOffeditNext"
                placeholder="小版本号"
              ></el-input>
            </el-form-item>
          </div>
          <div
            style="display: inline-block;"
            v-if="addForm.editionType == '1'"
            key="editionType1"
          >
            <span style="color:#ff4949;">*</span>
            <span style="color:#666;font-weight: 400;">资源版本号：</span>
            <el-form-item
              prop="devOneditprev"
              style="position: relative;top:-5px;width:80px;"
              :rules="{required: true, message: '离线大版本号不能为空', trigger: 'blur'}"
            >
              <el-input
                v-model="addForm.devOneditprev"
                placeholder="大版本号"
              ></el-input>
            </el-form-item>
            .
            <el-form-item
              prop="devOneditNext"
              style="position: relative;top:-5px;width:80px;"
              :rules="{required: true, message: '离线小版本号不能为空', trigger: 'blur'}"
            >
              <el-input
                v-model="addForm.devOneditNext"
                placeholder="小版本号"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-if="addForm.editionType == '0'">
          <el-form-item
            label="发型试戴:"
            prop="UpLines2"
            :rules="{type: 'array',required: true, message: '关联离线版本不能为空', trigger: 'change'}"
          >
            <el-select
              v-model="addForm.UpLines2"
              multiple
              placeholder="请选择发型试戴离线版本"
            >
              <el-option
                v-for="item in editionShowNumFilter(editionIdsUpLine2)"
                :key="item.editionId"
                :label="item.editionName"
                :value="item.editionId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="服装试穿:"
            prop="UpLines3"
            :rules="{type: 'array',required: true, message: '关联离线版本不能为空', trigger: 'change'}"
          >
            <el-select
              v-model="addForm.UpLines3"
              multiple
              placeholder="请选择服装试穿离线版本"
            >
              <el-option
                v-for="item in editionShowNumFilter(editionIdsUpLine3)"
                :key="item.editionId"
                :label="item.editionName"
                :value="item.editionId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="脸型管理:"
            prop="UpLines5"
            :rules="{type: 'array',required: true, message: '关联离线版本不能为空', trigger: 'change'}"
          >
            <el-select
              v-model="addForm.UpLines5"
              multiple
              placeholder="请选择脸型管理离线版本"
            >
              <el-option
                v-for="item in editionIdsUpLine5"
                :key="item.editionId"
                :label="item.editionName"
                :value="item.editionId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="一键搭配:"
            prop="UpLines4"
            :rules="{type: 'array',required: true, message: '关联离线版本不能为空', trigger: 'change'}"
          >
            <el-select
              v-model="addForm.UpLines4"
              multiple
              placeholder="请选择一键搭配离线版本"
            >
              <el-option
                v-for="item in editionShowNumFilter(editionIdsUpLine4)"
                :key="item.editionId"
                :label="item.editionName"
                :value="item.editionId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="广告:"
            prop="UpLines1"
          >
            <el-select
              v-model="addForm.UpLines1"
              multiple
              placeholder="请选择广告离线版本"
            >
              <el-option
                v-for="item in editionIdsUpLine1"
                :key="item.editionId"
                :label="item.editionName"
                :value="item.editionId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-if="addForm.editionType == '1'">
          <el-form-item
            label="发型试戴:"
            prop="onLines2"
            :rules="{type: 'array',required: true, message: '关联在线版本不能为空', trigger: 'change'}"
          >
            <el-select
              v-model="addForm.onLines2"
              multiple
              placeholder="请选择发型试戴在线版本"
            >
              <el-option
                v-for="item in editionShowNumFilter(editionIdsOnline2)"
                :key="item.editionId"
                :label="item.editionName"
                :value="item.editionId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="服装试穿:"
            prop="onLines3"
            :rules="{type: 'array',required: true, message: '关联在线版本不能为空', trigger: 'change'}"
          >
            <el-select
              v-model="addForm.onLines3"
              multiple
              placeholder="请选择服装试穿在线版本"
            >
              <el-option
                v-for="item in editionShowNumFilter(editionIdsOnline3)"
                :key="item.editionId"
                :label="item.editionName"
                :value="item.editionId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="脸型管理:"
            prop="onLines5"
            :rules="{type: 'array',required: true, message: '关联在线版本不能为空', trigger: 'change'}"
          >
            <el-select
              v-model="addForm.onLines5"
              multiple
              placeholder="请选择脸型管理在线版本"
            >
              <el-option
                v-for="item in editionIdsOnline5"
                :key="item.editionId"
                :label="item.editionName"
                :value="item.editionId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="一键搭配:"
            prop="onLines4"
            :rules="{type: 'array',required: true, message: '关联在线版本不能为空', trigger: 'change'}"
          >
            <el-select
              v-model="addForm.onLines4"
              multiple
              placeholder="请选择一键搭配在线版本"
            >
              <el-option
                v-for="item in editionShowNumFilter(editionIdsOnline4)"
                :key="item.editionId"
                :label="item.editionName"
                :value="item.editionId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="广告:"
            prop="onLines1"
          >
            <el-select
              v-model="addForm.onLines1"
              multiple
              placeholder="请选择广告在线版本"
            >
              <el-option
                v-for="item in editionIdsOnline1"
                :key="item.editionId"
                :label="item.editionName"
                :value="item.editionId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    <div style="text-align: center">
      <span class="dialog-footer">
        <el-button @click="$router.go(-1)">重置</el-button>
        <el-button
          type="primary"
          @click="addSave"
        >保 存</el-button>
      </span>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapState } from "vuex";
export default {
  data() {
    return {
      addForm: {
        devName: "", //联系人名称
        devPhone: "", //联系人电话
        devCompany: "", //所属公司
        devProvince: "", //省
        devCity: "", //市
        devArea: "", //区
        devAddress: "", //详细地址
        devCustNum: "", //客户编号
        contractDate: "", //签约时间
        userId: "", //管理员ID
        editionIds: [], //版本关联集合
        devRemark: "", //备注
        devOffeditNum: "",
        devOneditNum: "",
        UpLines1: [],
        UpLines2: [],
        UpLines3: [],
        UpLines4: [],
        UpLines5: [],
        onLines1: [],
        onLines2: [],
        onLines3: [],
        onLines4: [],
        onLines5: [],
        editionType:"0",
        changeBig:false,
      },
      editionIdsOnline1: [],
      editionIdsOnline2: [],
      editionIdsOnline3: [],
      editionIdsOnline4: [],
      editionIdsOnline5: [],
      editionIdsUpLine1: [],
      editionIdsUpLine2: [],
      editionIdsUpLine3: [],
      editionIdsUpLine4: [],
      editionIdsUpLine5: [],
      title: "新增设备",
      user: [],
      editionShowNum:4,
      onceChange:false,
    };
  },
  created() {
    if (typeof this.$route.query.devId != "undefined") {
      this.title = "修改设备";
      this.getDetail(this.$route.query.devId);
    }
    // this.get_table_data();
    this.get_table_data1();
    this.get_table_data2();
    this.$http({
      url: "/device/user",
      method: "POST",
      data: {}
    }).then(({ data }) => {
      this.user = data;
    });
  },
  methods: {
    editionShowNumFilter(arr){
      var arr1 = [];
      arr.forEach((item)=>{
        if(item.editionShowNum == this.editionShowNum){
          arr1.push(item)
        }
      })
      return arr1
    },
    editionShowNumChange(value){
       if(this.onceChange || this.title != '修改设备'){
          this.addForm.UpLines1= [];
          this.addForm.UpLines2= [];
          this.addForm.UpLines3= [];
          this.addForm.UpLines4= [];
          this.addForm.UpLines5= [];
          this.addForm.onLines1= [];
          this.addForm.onLines2= [];
          this.addForm.onLines3= [];
          this.addForm.onLines4= [];
          this.addForm.onLines5= [];
        } 
    },
    getDetail(id) {
      this.$http({
        url: "/device/selectDeviceDetail",
        method: "POST",
        data: { devId: id }
      })
        .then(({ data }) => {
          var _this = this;
          var upDateForm = data;
          var addForm = {
            devId: id,
            devName: upDateForm.DeviceDO.devName, //联系人名称
            devPhone: upDateForm.DeviceDO.devPhone, //联系人电话
            devCompany: upDateForm.DeviceDO.devCompany, //所属公司
            devProvince: upDateForm.DeviceDO.devProvince, //省
            devCity: upDateForm.DeviceDO.devCity, //市
            devArea: upDateForm.DeviceDO.devArea, //区
            devAddress: upDateForm.DeviceDO.devAddress, //详细地址
            devCustNum: upDateForm.DeviceDO.devCustNum, //客户编号
            contractDate: upDateForm.DeviceDO.contractDate, //签约时间
            userId: upDateForm.DeviceDO.adminId, //管理员ID
            editionIds: [], //版本关联集合
            devRemark: upDateForm.DeviceDO.devRemark, //备注
            devOffeditNum: upDateForm.DeviceDO.devOffeditNum,
            devOffeditprev: "",
            devOffeditNext: "",
            devOneditNum: upDateForm.DeviceDO.devOneditNum,
            devOneditprev: "",
            devOneditNext: "",
            UpLines1: [],
            UpLines2: [],
            UpLines3: [],
            UpLines4: [],
            UpLines5: [],
            onLines1: [],
            onLines2: [],
            onLines3: [],
            onLines4: [],
            onLines5: [],
            editionType:"0",
            changeBig:false,
          };
          if(!upDateForm.DeviceDO.devRemark){
            addForm.devRemark = ""
          }
          if (upDateForm.DeviceDO.devOffeditNum != null) {
            addForm.devOffeditprev = upDateForm.DeviceDO.devOffeditNum.split(
              "."
            )[0];
            addForm.devOffeditNext = upDateForm.DeviceDO.devOffeditNum.split(
              "."
            )[1];
          } else {
            addForm.devOffeditNum = "";
          }
          if (upDateForm.DeviceDO.devOneditNum != null) {
            addForm.devOneditprev = upDateForm.DeviceDO.devOneditNum.split(
              "."
            )[0];
            addForm.devOneditNext = upDateForm.DeviceDO.devOneditNum.split(
              "."
            )[1];
          } else {
            addForm.devOneditNum = "";
          }
          if (typeof upDateForm.offLine.advert != "undefined") {
            upDateForm.offLine.advert.forEach(function(i) {
              addForm.onLines1.push(i.editionId);
            });
          }
          if (typeof upDateForm.offLine.hair != "undefined") {
            upDateForm.offLine.hair.forEach(function(i) {
              addForm.onLines2.push(i.editionId);
              _this.editionShowNum = i.editionShowNum;
              setTimeout(function(){_this.onceChange = true},200)
            });
          }
          if (typeof upDateForm.offLine.cloth != "undefined") {
            upDateForm.offLine.cloth.forEach(function(i) {
              addForm.onLines3.push(i.editionId);
            });
          }
          if (typeof upDateForm.offLine.colloca != "undefined") {
            upDateForm.offLine.colloca.forEach(function(i) {
              addForm.onLines4.push(i.editionId);
            });
          }
          if (typeof upDateForm.offLine.face != "undefined") {
            upDateForm.offLine.face.forEach(function(i) {
              addForm.onLines5.push(i.editionId);
            });
          }
          if (typeof upDateForm.outLine.advert != "undefined") {
            upDateForm.outLine.advert.forEach(function(i) {
              addForm.UpLines1.push(i.editionId);
            });
          }
          if (typeof upDateForm.outLine.hair != "undefined") {
            upDateForm.outLine.hair.forEach(function(i) {
              addForm.UpLines2.push(i.editionId);
              _this.editionShowNum = i.editionShowNum;
              setTimeout(function(){_this.onceChange = true},200)
            });
          }
          if (typeof upDateForm.outLine.cloth != "undefined") {
            upDateForm.outLine.cloth.forEach(function(i) {
              addForm.UpLines3.push(i.editionId);
            });
          }
          if (typeof upDateForm.outLine.colloca != "undefined") {
            upDateForm.outLine.colloca.forEach(function(i) {
              addForm.UpLines4.push(i.editionId);
            });
          }
          if (typeof upDateForm.outLine.face != "undefined") {
            upDateForm.outLine.face.forEach(function(i) {
              addForm.UpLines5.push(i.editionId);
            });
          }
          this.addForm = addForm;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取在线版本
    get_table_data1() {
      this.$http({
        url: "/edition/selectEdition",
        method: "POST",
        data: { editionType:1, offLine: 0 }
      })
      .then(({ data }) => {
        this.editionIdsOnline1 = data.rows;
      })
      .catch(() => {});
      this.$http({
        url: "/edition/selectEdition",
        method: "POST",
        data: { editionType:2, offLine: 0 }
      })
      .then(({ data }) => {
        this.editionIdsOnline2 = data.rows;
      })
      .catch(() => {});
      this.$http({
        url: "/edition/selectEdition",
        method: "POST",
        data: { editionType:3, offLine: 0 }
      })
      .then(({ data }) => {
        this.editionIdsOnline3 = data.rows;
      })
      .catch(() => {});
      this.$http({
        url: "/edition/selectEdition",
        method: "POST",
        data: { editionType:4, offLine: 0 }
      })
      .then(({ data }) => {
        this.editionIdsOnline4 = data.rows;
      })
      .catch(() => {});
      this.$http({
        url: "/edition/selectEdition",
        method: "POST",
        data: { editionType:5, offLine: 0 }
      })
      .then(({ data }) => {
        this.editionIdsOnline5 = data.rows;
      })
      .catch(() => {});
    },
    //获取离线版本
    get_table_data2() {
      this.$http({
          url: "/edition/selectEdition",
          method: "POST",
          data: { editionType: 1, offLine: 1 }
        })
          .then(({ data }) => {
            this.editionIdsUpLine1 = data.rows;
          })
          .catch(() => {});
        this.$http({
          url: "/edition/selectEdition",
          method: "POST",
          data: { editionType: 2, offLine: 1 }
        })
          .then(({ data }) => {
            this.editionIdsUpLine2 = data.rows;
          })
          .catch(() => {});
        this.$http({
          url: "/edition/selectEdition",
          method: "POST",
          data: { editionType: 3, offLine: 1 }
        })
          .then(({ data }) => {
            this.editionIdsUpLine3 = data.rows;
          })
          .catch(() => {});
          this.$http({
          url: "/edition/selectEdition",
          method: "POST",
          data: { editionType: 4, offLine: 1 }
        })
          .then(({ data }) => {
            this.editionIdsUpLine4 = data.rows;
          })
          .catch(() => {});
          this.$http({
            url: "/edition/selectEdition",
            method: "POST",
            data: { editionType: 5, offLine: 1 }
          })
            .then(({ data }) => {
              this.editionIdsUpLine5 = data.rows;
            })
            .catch(() => {});
    },
    addSave() {
      console.log(this.addForm);
      var _this = this;
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          var obj = Object.assign({},this.addForm);
          if(typeof obj.contractDate != 'string'){
            obj.contractDate = this.$dateFormat(obj.contractDate,"yyyy-MM-dd hh:mm:ss")
          }
          obj.editionIds = [];
          var arr = [];
          if(obj.editionType == '0'){0
            var arr1 = arr.concat(
              obj.UpLines1,
              obj.UpLines2,
              obj.UpLines3,
              obj.UpLines4,
              obj.UpLines5,
            );
            obj.devOffeditNum =
            obj.devOffeditprev + "." + obj.devOffeditNext;
            delete obj["devOneditNum"];
          }else{
            var arr1 = arr.concat(
              obj.onLines1,
              obj.onLines2,
              obj.onLines3,
              obj.onLines4,
              obj.onLines5
            );
            obj.devOneditNum =
            obj.devOneditprev + "." + obj.devOneditNext;
            delete obj["devOffeditNum"];
          }  
          for (var i = 0; i < arr1.length; i++) {
            obj.editionIds.push({ editionId: arr1[i] });
          }
          if (this.title == "新增设备") {
            this.$http({
              url: "/device/insertDevice",
              method: "POST",
              data: obj
            })
              .then(({ data }) => {
                // this.dialogFlase();
                this.$router.go(-1);
              })
              .catch(() => {});
          } else {
            this.$http({
              url: "/device/updateDevice",
              method: "POST",
              data: obj
            })
              .then(({ data }) => {
                // this.dialogFlase();
                this.$router.go(-1);
              })
              .catch(() => {});
          }
          
        } else {
          console.log("error submit!!");
        }
      });
    },
    dialogFlase() {
      this.addForm = {
        devName: "", //联系人名称
        devPhone: "", //联系人电话
        devCompany: "", //所属公司
        devProvince: "", //省
        devCity: "", //市
        devArea: "", //区
        devAddress: "", //详细地址
        devCustNum: "", //客户编号
        contractDate: "", //签约时间
        userId: "", //管理员ID
        editionIds: [], //版本关联集合
        labelIds: [], //标签关联集合
        devRemark: "", //备注
        UpLines1: [],
        UpLines2: [],
        UpLines3: [],
        UpLines4: [],
        UpLines5: [],
        onLines1: [],
        onLines2: [],
        onLines3: [],
        onLines4: [],
        onLines5: [],
        editionType:"0",
        changeBig:false,
      };
    },
    imgsuccess(res, file, fileList, str) {
      this.addForm[this.imgfileName] = res.data;
    },
    imgChange(str) {
      this.imgfileName = str;
    },
    addresChange(val) {
      this.addForm.devProvince = val.province.value;
      this.addForm.devCity = val.city.value;
      this.addForm.devArea = val.area.value;
    },
    dateChange(val) {
      console.log(val);
      this.addForm.contractDate = val;
    }
  }
};
</script>
<style type="text/css">
.form-title {
  line-height: 28px;
  font-size: 14px;
  color: #666;
  font-weight: 700;
  margin: 20px 0;
}
</style>