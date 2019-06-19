<template>
  <formList :title='title'></formList>
  <!-- <div class="panel">
    <panel-title :title="title">
      <el-button
        type="primary"
        @click="$router.go(-1)"
      >返回</el-button>
    </panel-title>
    <div style="background: #fff;padding:30px 30px 50px 30px;">
      <schedule-title></schedule-title>
      <div @click="toNext">next</div>
      <update-form></update-form>
    </div>
  </div> -->
</template>
<script type="text/javascript">
import formList from "./components/formList";
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
        UpLines2: [],
        UpLines3: [],
        UpLines4: [],
        UpLines5: [],
        onLines2: [],
        onLines3: [],
        onLines4: [],
        onLines5: []
      },
      editionIdsOnline2: [],
      editionIdsOnline3: [],
      editionIdsOnline4: [],
      editionIdsOnline5: [],
      editionIdsUpLine2: [],
      editionIdsUpLine3: [],
      editionIdsUpLine4: [],
      editionIdsUpLine5: [],
      title: "新增设备",
      user: []
    };
  },
  components: {
    formList
  },
  created() {
    if (typeof this.$route.query.devId != "undefined") {
      this.title = "修改设备";
      this.getDetail(this.$route.query.devId);
    }
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
    getDetail(id) {
      this.$http({
        url: "/device/selectDeviceDetail",
        method: "POST",
        data: { devId: id }
      })
        .then(({ data }) => {
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
            UpLines2: [],
            UpLines3: [],
            UpLines4: [],
            UpLines5: [],
            onLines2: [],
            onLines3: [],
            onLines4: [],
            onLines5: []
          };
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
    //获取在线版本
    get_table_data1() {
      this.$http({
        url: "/edition/selectEdition",
        method: "POST",
        data: { editionType: 2, offLine: 0 }
      })
        .then(({ data }) => {
          this.editionIdsOnline2 = data.rows;
        })
        .catch(() => {});
      this.$http({
        url: "/edition/selectEdition",
        method: "POST",
        data: { editionType: 3, offLine: 0 }
      })
        .then(({ data }) => {
          this.editionIdsOnline3 = data.rows;
        })
        .catch(() => {});
      this.$http({
        url: "/edition/selectEdition",
        method: "POST",
        data: { editionType: 4, offLine: 0 }
      })
        .then(({ data }) => {
          this.editionIdsOnline4 = data.rows;
        })
        .catch(() => {});
      this.$http({
        url: "/edition/selectEdition",
        method: "POST",
        data: { editionType: 5, offLine: 0 }
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
          _this.addForm.editionIds = [];
          var arr = [];
          var arr1 = arr.concat(
            this.addForm.UpLines2,
            this.addForm.UpLines3,
            this.addForm.UpLines4,
            this.addForm.UpLines5,
            this.addForm.onLines2,
            this.addForm.onLines3,
            this.addForm.onLines4,
            this.addForm.onLines5
          );
          for (var i = 0; i < arr1.length; i++) {
            _this.addForm.editionIds.push({ editionId: arr1[i] });
          }
          if (this.title == "新增设备") {
            this.$http({
              url: "/device/insertDevice",
              method: "POST",
              data: this.addForm
            })
              .then(({ data }) => {
                // this.dialogFlase();
                this.$router.go(-1);
              })
              .catch(() => {});
          } else {
            this.addForm.devOffeditNum =
              this.addForm.devOffeditprev + "." + this.addForm.devOffeditNext;
            this.addForm.devOneditNum =
              this.addForm.devOneditprev + "." + this.addForm.devOneditNext;
            this.$http({
              url: "/device/updateDevice",
              method: "POST",
              data: this.addForm
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
        UpLines2: [],
        UpLines3: [],
        UpLines4: [],
        UpLines5: [],
        onLines2: [],
        onLines3: [],
        onLines4: [],
        onLines5: []
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
.el-form--inline .el-form-item {
  margin-right: 0;
}
</style>