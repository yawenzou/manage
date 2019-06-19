<template>
  <div class="panel">
    <panel-title :title="title">
      <el-button
        type="primary"
        @click="$router.go(-1)"
      >返回</el-button>
    </panel-title>
    <div style="background: #fff;padding:30px 30px 50px 30px;">
      <update-form></update-form>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapState } from "vuex";
import { panelTitle } from "components";
import updateForm from "./updateForm";
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
    panelTitle,
    updateForm
  },
  created() {

  },
  methods: {

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