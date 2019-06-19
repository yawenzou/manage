<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button
        type="primary"
        @click="$router.go(-1)"
      >返回</el-button>
    </panel-title>
    <div class="panel-body">
      <div class="select-ele">
        <el-radio-group
          v-model="Edition"
          @change="edChange"
        >
          <el-radio-button label="设备信息"></el-radio-button>
          <el-radio-button label="编辑资料"></el-radio-button>
          <el-radio-button label="数据记录"></el-radio-button>
          <el-radio-button label="默认设置"></el-radio-button>
        </el-radio-group>
      </div>
      <div v-if="Edition == '设备信息'">
        <div class="title-table">
          <p class="form-title">基本信息</p>
        </div>
        <div
          class="list"
          v-if="info"
        >
          <el-row>
            <el-col :span="4">
              <div class="list-item-1">设备ID</div>
            </el-col>
            <el-col :span="8">
              <div class="list-item-1 list-item-2">{{addForm.devId}}</div>
            </el-col>
            <el-col :span="4">
              <div class="list-item-1">机器码</div>
            </el-col>
            <el-col :span="8">
              <div class="list-item-1 list-item-2">{{addForm.devExtend}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="list-item-1">激活码</div>
            </el-col>
            <el-col :span="8">
              <div class="list-item-1 list-item-2">{{addForm.devNum}}</div>
            </el-col>
            <el-col :span="4">
              <div class="list-item-1">联系人</div>
            </el-col>
            <el-col :span="8">
              <div class="list-item-1 list-item-2">{{addForm.devName}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="list-item-1">手机号码</div>
            </el-col>
            <el-col :span="8">
              <div class="list-item-1 list-item-2">{{addForm.devPhone}}</div>
            </el-col>
            <el-col :span="4">
              <div class="list-item-1">所属公司</div>
            </el-col>
            <el-col :span="8">
              <div class="list-item-1 list-item-2">{{addForm.devCompany}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="list-item-1">状态</div>
            </el-col>
            <el-col :span="8">
              <div class="list-item-1 list-item-2">{{info.DeviceDO.isAlive}}</div>
            </el-col>
            <el-col :span="4">
              <div class="list-item-1">机器状态</div>
            </el-col>
            <el-col :span="8">
              <div class="list-item-1 list-item-2">{{info.DeviceDO.state}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="list-item-1">详细地址</div>
            </el-col>
            <el-col :span="20">
              <div class="list-item-1 list-item-2">{{addForm.devProvince + addForm.devCity + addForm.devArea + addForm.devAddress}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="list-item-1">客户编号</div>
            </el-col>
            <el-col :span="8">
              <div class="list-item-1 list-item-2">{{addForm.devCustNum}}</div>
            </el-col>
            <el-col :span="4">
              <div class="list-item-1">管理员</div>
            </el-col>
            <el-col :span="8">
              <div class="list-item-1 list-item-2">{{info.DeviceDO.adminName}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <div class="list-item-1">签约时间</div>
            </el-col>
            <el-col :span="8">
              <div class="list-item-1 list-item-2">{{$dateFormat(parseInt(addForm.contractDate),"yyyy-MM-dd hh:mm:ss")}}</div>
            </el-col>
            <el-col :span="4">
              <div class="list-item-1">备注</div>
            </el-col>
            <el-col :span="8">
              <div class="list-item-1 list-item-2">{{info.DeviceDO.devRemark}}</div>
            </el-col>
          </el-row>
        </div>
        <div class="title-table">
          <p class="form-title">离线功能</p>
          <div
            class="list"
            v-if="info&&info.outLine"
          >
            <el-row
              v-for="item in info.outLine.hair"
              v-show="info.outLine.hair"
              :key="item.editionName"
            >
              <el-col :span="4">
                <div class="list-item-1">发型试戴</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionName}}</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionRemark}}</div>
              </el-col>
            </el-row>
            <el-row
              v-for="item in info.outLine.cloth"
              v-show="info.outLine.cloth"
              :key="item.editionName"
            >
              <el-col :span="4">
                <div class="list-item-1">服装试穿</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionName}}</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionRemark}}</div>
              </el-col>
            </el-row>
            <el-row
              v-for="item in info.outLine.colloca"
              v-show="info.outLine.colloca"
              :key="item.editionName"
            >
              <el-col :span="4">
                <div class="list-item-1">一键搭配</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionName}}</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionRemark}}</div>
              </el-col>
            </el-row>
            <el-row
              v-for="item in info.outLine.face"
              v-show="info.outLine.face"
              :key="item.editionName"
            >
              <el-col :span="4">
                <div class="list-item-1">脸型管理</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionName}}</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionRemark}}</div>
              </el-col>
            </el-row>
            <el-row
              v-for="item in info.outLine.advert"
              v-show="info.outLine.advert"
              :key="item.editionName"
            >
              <el-col :span="4">
                <div class="list-item-1">广告</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionName}}</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionRemark}}</div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="title-table">
          <p class="form-title">在线功能</p>
          <div
            class="list"
            v-if="info&&info.offLine"
          >
            <el-row
              v-for="item in info.offLine.hair"
              v-show="info.offLine.hair"
              :key="item.editionName"
            >
              <el-col :span="4">
                <div class="list-item-1">发型试戴</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionName}}</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionRemark}}</div>
              </el-col>
            </el-row>
            <el-row
              v-for="item in info.offLine.cloth"
              v-show="info.offLine.cloth"
              :key="item.editionName"
            >
              <el-col :span="4">
                <div class="list-item-1">服装试穿</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionName}}</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionRemark}}</div>
              </el-col>
            </el-row>
            <el-row
              v-for="item in info.offLine.colloca"
              v-show="info.offLine.colloca"
              :key="item.editionName"
            >
              <el-col :span="4">
                <div class="list-item-1">一键搭配</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionName}}</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionRemark}}</div>
              </el-col>
            </el-row>
            <el-row
              v-for="item in info.offLine.face"
              v-show="info.offLine.face"
              :key="item.editionName"
            >
              <el-col :span="4">
                <div class="list-item-1">脸型管理</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionName}}</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{item.editionRemark}}</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div v-if="Edition == '编辑资料'">
        <update-form :addForm="addForm"></update-form>
      </div>
      <div v-if="Edition == '数据记录'">
        <history-table
          key="history"
        ></history-table>
      </div>
      <div v-if="Edition == '默认设置'">
        <div class="list">
          <el-row style="font-weight: bold">
            <el-col :span="4">
              <div class="list-item-1">默认项</div>
            </el-col>
            <el-col :span="10">
              <div
                class="list-item-1"
                style="text-align: left;padding-left: 20px"
              >默认服饰</div>
            </el-col>
            <el-col :span="10">
              <div
                class="list-item-1"
                style="text-align: left;padding-left: 20px"
              >设置时间</div>
            </el-col>
          </el-row>
          <div>
            <el-row>
              <el-col :span="4">
                <div class="list-item-1">默认内衣</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{defInfo.defReId0||''}}</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{defInfo.defCreated0||''}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <div class="list-item-1">默认上装</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{defInfo.defReId1||''}}</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{defInfo.defCreated1||''}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <div class="list-item-1">默认下装</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{defInfo.defReId2||''}}</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{defInfo.defCreated2||''}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <div class="list-item-1">默认外套</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{defInfo.defReId3||''}}</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{defInfo.defCreated3||''}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <div class="list-item-1">默认套装</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{defInfo.defReId4||''}}</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{defInfo.defCreated4||''}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <div class="list-item-1">默认发型</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{defInfo.defReId5||''}}</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{defInfo.defCreated5||''}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <div class="list-item-1">默认脸型</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{defInfo.defReId6||''}}</div>
              </el-col>
              <el-col :span="10">
                <div class="list-item-1 list-item-2">{{defInfo.defCreated6||''}}</div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div style="text-align: center">
          <span class="dialog-footer">
            <el-button
              type="primary"
              @click="upDate"
            >修改</el-button>
          </span>
        </div>
        <el-dialog
          title="默认设置修改"
          :visible.sync="dialog"
          :close-on-click-modal="false"
          width="50%"
          center
        >
          <el-form
            ref="upDateForm"
            :model="upDateForm"
            label-width="160px"
          >
            <el-form-item
              label="默认内衣:"
              prop="defReId0"
              :rules="{required: true, message: '默认内衣不能为空', trigger: 'blur'}"
            >
              <el-input
                v-model="upDateForm.defReId0"
                placeholder="默认内衣编号"
                @blur="idBlur('defReId0',2)"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="默认上装:"
              prop="defReId1"
              :rules="{required: true, message: '默认上装不能为空', trigger: 'blur'}"
            >
              <el-input
                v-model="upDateForm.defReId1"
                placeholder="默认上装编号"
                @blur="idBlur('defReId1',2)"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="默认下装:"
              prop="defReId2"
              :rules="{required: true, message: '默认下装不能为空', trigger: 'blur'}"
            >
              <el-input
                v-model="upDateForm.defReId2"
                placeholder="默认下装编号"
                @blur="idBlur('defReId2',2)"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="默认外套:"
              prop="defReId3"
              :rules="{required: true, message: '默认外套不能为空', trigger: 'blur'}"
            >
              <el-input
                v-model="upDateForm.defReId3"
                placeholder="默认外套编号"
                @blur="idBlur('defReId3',2)"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="默认套装:"
              prop="defReId4"
              :rules="{required: true, message: '默认套装不能为空', trigger: 'blur'}"
            >
              <el-input
                v-model="upDateForm.defReId4"
                placeholder="默认套装编号"
                @blur="idBlur('defReId4',2)"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="默认发型:"
              prop="defReId5"
              :rules="{required: true, message: '默认发型不能为空', trigger: 'blur'}"
            >
              <el-input
                v-model="upDateForm.defReId5"
                placeholder="默认发型编号"
                @blur="idBlur('defReId5',1)"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="默认脸型:"
              prop="defReId6"
              :rules="{required: true, message: '默认脸型不能为空', trigger: 'blur'}"
            >
              <el-input
                v-model="upDateForm.defReId6"
                placeholder="默认脸型编号"
                @blur="idBlur('defReId6',3)"
              ></el-input>
            </el-form-item>
          </el-form>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="dialog=false">取 消</el-button>
            <el-button
              type="primary"
              @click="addSaveDefault"
            >保 存</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";
import updateForm from "./updateForm";
import historyTable from "./historyTable";
export default {
  data() {
    return {
      info: null,
      addForm: null,
      Edition: "设备信息",
      upDateForm: {
        defReId0: "",
        defReId1: "",
        defReId2: "",
        defReId3: "",
        defReId4: "",
        defReId5: "",
        defReId6: ""
      },
      releIds: [
        { defId: null, defReId: null, defType: 0 },
        { defId: null, defReId: null, defType: 1 },
        { defId: null, defReId: null, defType: 2 },
        { defId: null, defReId: null, defType: 3 },
        { defId: null, defReId: null, defType: 4 },
        { defId: null, defReId: null, defType: 5 },
        { defId: null, defReId: null, defType: 6 }
      ],
      dialog: false,
      defInfo: [],
      table: []
    };
  },
  components: {
    panelTitle,
    bottomToolBar,
    updateForm,
    historyTable
  },
  created() {
    if (this.$route.query.type) {
      this.Edition = this.$route.query.type;
    }
    this.getDetail(this.$route.query.devId);
    this.getDef(this.$route.query.devId);
    // this.getHistory(this.$route.query.devId);
  },
  methods: {
    edChange(val) {
      this.$router.replace({
        path: this.$route.path,
        query: { type: val, devId: this.$route.query.devId }
      });
    },
    getDetail(id) {
      this.$http({
        url: "/device/selectDeviceDetail",
        method: "POST",
        data: { devId: id }
      })
        .then(({ data }) => {
          var upDateForm = data;
          this.info = data;
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
            devOneditNum: upDateForm.DeviceDO.devOneditNum,
            devNum: upDateForm.DeviceDO.devNum,
            devExtend: upDateForm.DeviceDO.devExtend,
            UpLines2: [],
            UpLines3: [],
            UpLines4: [],
            UpLines5: [],
            onLines2: [],
            onLines3: [],
            onLines4: [],
            onLines5: [],
            isAlive:upDateForm.DeviceDO.isAlive,
            state:upDateForm.DeviceDO.state,
          };
          if (typeof upDateForm.offLine.hair != "undefined") {
            upDateForm.offLine.hair.forEach(function(i) {
              addForm.onLines2.push(i.editionId);
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
          if (typeof upDateForm.outLine.hair != "undefined") {
            upDateForm.outLine.hair.forEach(function(i) {
              addForm.UpLines2.push(i.editionId);
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
    getDef(id) {
      this.$http({
        url: "/device/select/defult",
        method: "POST",
        data: { devId: id }
      })
        .then(({ data }) => {
          console.log(data);
          if (data.length < 1) {
            return;
          }
          var defInfo = {};
          var _this = this;
          data.forEach(function(item){
            switch(item.defType){
              case 0:
                defInfo.defReId0 = item.defReId;
                defInfo.name0 = item.name;
                defInfo.defCreated0 = _this.$dateFormat(item.defCreated,"yyyy-MM-dd hh:mm:ss");
                break;
              case 1:
                defInfo.defReId1 = item.defReId;
                defInfo.name1 = item.name;
                defInfo.defCreated1 = _this.$dateFormat(item.defCreated,"yyyy-MM-dd hh:mm:ss");
                break;
              case 2:
                defInfo.defReId2 = item.defReId;
                defInfo.name2 = item.name;
                defInfo.defCreated2 = _this.$dateFormat(item.defCreated,"yyyy-MM-dd hh:mm:ss");
                break;
              case 3:
                defInfo.defReId3 = item.defReId;
                defInfo.name3 = item.name;
                defInfo.defCreated3 = _this.$dateFormat(item.defCreated,"yyyy-MM-dd hh:mm:ss");
                break;
              case 4:
                defInfo.defReId4 = item.defReId;
                defInfo.name4 = item.name;
                defInfo.defCreated4 = _this.$dateFormat(item.defCreated,"yyyy-MM-dd hh:mm:ss");
                break;
              case 5:
                defInfo.defReId5 = item.defReId;
                defInfo.name5 = item.name;
                defInfo.defCreated5 = _this.$dateFormat(item.defCreated,"yyyy-MM-dd hh:mm:ss");
                break;
              case 6:
                defInfo.defReId6 = item.defReId;
                defInfo.name6 = item.name;
                defInfo.defCreated6 = _this.$dateFormat(item.defCreated,"yyyy-MM-dd hh:mm:ss");
                break;
            }
          })
          this.defInfo = defInfo;

        })
        .catch(err => {
          console.log(err);
        });
    },
    getHistory(id) {
      this.$http({
        url: "/pc/record/recordList",
        method: "POST",
        data: {
          page: this.page,
          pageSize: 10,
          devId: this.$route.query.devId
        }
      })
        .then(({ data }) => {
          this.table = data.rows;
          this.total = data.total;
        })
        .catch(() => {});
    },
    upDate() {
      this.upDateForm = {
        defReId0: this.defInfo.defReId0?this.defInfo.defReId0+'':'',
        defReId1: this.defInfo.defReId1?this.defInfo.defReId1+'':'',
        defReId2: this.defInfo.defReId2?this.defInfo.defReId2+'':'',
        defReId3: this.defInfo.defReId3?this.defInfo.defReId3+'':'',
        defReId4: this.defInfo.defReId4?this.defInfo.defReId4+'':'',
        defReId5: this.defInfo.defReId5?this.defInfo.defReId5+'':'',
        defReId6: this.defInfo.defReId6?this.defInfo.defReId6+'':''
      };
      this.dialog = true;
    },
    addSaveDefault() {
      this.$refs["upDateForm"].validate(valid => {
        if (valid) {
          var data = {};
          var releIds = this.releIds;
          releIds[0].defReId = this.upDateForm.defReId0;
          releIds[1].defReId = this.upDateForm.defReId1;
          releIds[2].defReId = this.upDateForm.defReId2;
          releIds[3].defReId = this.upDateForm.defReId3;
          releIds[4].defReId = this.upDateForm.defReId4;
          releIds[5].defReId = this.upDateForm.defReId5;
          releIds[6].defReId = this.upDateForm.defReId6;
          data.releIds = releIds;
          data.devId = this.$route.query.devId;
          this.$http({
            url: "/device/default",
            method: "POST",
            data: data
          })
            .then(({ data }) => {
              console.log(data);
              this.getDef(this.$route.query.devId);
              this.dialog = false;
              this.releIds = [
                { defId: null, defReId: null, defType: 0 },
                { defId: null, defReId: null, defType: 1 },
                { defId: null, defReId: null, defType: 2 },
                { defId: null, defReId: null, defType: 3 },
                { defId: null, defReId: null, defType: 4 },
                { defId: null, defReId: null, defType: 5 },
                { defId: null, defReId: null, defType: 6 }
              ];
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
    idBlur(i, type) {
      this.$http({
        url: "/collocat/existId2",
        method: "POST",
        data: { crType: type, id: this.upDateForm[i],devId:this.$route.query.devId}
      })
        .then(({ data }) => {
          return;
        })
        .catch(() => {
          this.upDateForm[i] = "";
        });
      console.log(i);
    }
  }
};
</script>
<style type="text/css">
.list {
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  line-height: 60px;
  /*margin-bottom:20px;*/
}
.list-item-1 {
  padding-right: 20px;
  text-align: right;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background: #eee;
  height: 60px;
}
.list-item-2 {
  padding-left: 20px;
  text-align: left;
  background: #fff;
  height: 60px;
}
.form-title {
  line-height: 28px;
  font-size: 14px;
  color: #666;
  font-weight: 700;
  margin: 15px 0;
}
</style>
