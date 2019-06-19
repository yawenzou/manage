<template>
  <div class="panel">
    <panel-title title="权限设置">
      <el-button
        type="primary"
        @click="$router.go(-1)"
      >返回</el-button>
    </panel-title>
    <div style="background: #fff;padding:30px 30px 50px 30px;">
      <!-- <el-form
        ref="addForm"
        :model="addForm"
        label-width="160px"
      >
        <el-form-item>
          <el-tree
            class="filter-tree"
            :data="$store.getters.GET_powerList"
            :props="defaultProps"
            show-checkbox
            default-expand-all
            node-key="id"
            :default-checked-keys="usersActive"
            ref="tree"
          >
          </el-tree>
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
      </div> -->
      <p style="text-align:right;padding-right:20px;margin-bottom:20px;font-size:20px;"><span style="color:red">*</span>勾上自动保存</p>
      <el-table
          :data="tableData"
          v-loading="loadData"
          element-loading-text="拼命加载中"
          border
          stripe
          style="width: 100%;"
        >
          <el-table-column
            prop="name"
            label="权限名称"
            align="left"
          >
            <template slot-scope="props">
              <span v-if="props.row.id>3&&props.row.id!=151" style="margin-right:40px"></span>
              <span>{{props.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200"
          >
            <template slot-scope="props">
              <el-checkbox @change="checkChange(props.row)" :disabled="props.row.id<4||props.row.id==151" :checked="props.row.flag"></el-checkbox>
            </template>
          </el-table-column>
        </el-table> 
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapState } from "vuex";
import { panelTitle } from "components";
export default {
  data() {
    return {
      addForm: {},
      defaultProps: {
        children: "children",
        label: "name"
      },
      usersActive: [],
      tableData:[],
      loadData:false
    };
  },
  components: {
    panelTitle
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail(id) {
      this.tableData = [];
      if (typeof this.$route.query.jobId != "undefined") {
        this.$http({
          url: "/job/getJobPowerList",
          method: "POST",
          data: { jobId: this.$route.query.jobId }
        })
          .then(({ data }) => {
            debugger
            this.arrFilter(data);
            this.$refs.tree.setCheckedKeys(this.usersActive);
          })
          .catch(() => {});
      } else {
        this.$http({
          url: "employee/getEmployeePowerList",
          method: "POST",
          data: { employeeId: this.$route.query.employeeId }
        })
          .then(({ data }) => {
            this.arrFilter(data);
            this.$refs.tree.setCheckedKeys(this.usersActive);
          })
          .catch(() => {});
      }
    },
    arrFilter1(arr) {
      var _this = this;
      arr.forEach(function(i) {
        if (i.children == null) {
          _this.usersActive.push(i.id);
        } else {
          _this.arrFilter(i.children);
        }
      });
    },
    checkChange(data){
      if (typeof this.$route.query.jobId != "undefined") {
        var obj = { jobId: this.$route.query.jobId,powerId:data.id,flag:Number(data.flag)};
        if(data.flag){
          obj = { jobId: this.$route.query.jobId,powerId:data.id,flag:Number(data.flag),pjId:data.pjId };
        }
        this.$http({
          url: "/job/updateJobPower",
          method: "POST",
          data: obj
        })
          .then(({ data }) => {
            this.getDetail()
          })
          .catch(() => {});
      } else {
        debugger
        var obj = { employeeId: this.$route.query.employeeId,powerId:data.id,flag:Number(data.flag)};
        if(data.flag){
          obj = { employeeId: this.$route.query.employeeId,powerId:data.id,flag:Number(data.flag),id:data.peId };
        }
        this.$http({
          url: "/employee/updateEmpPower",
          method: "POST",
          data: obj
        })
          .then(({ data }) => {
            this.getDetail()
          })
          .catch(() => {});
      }
    },
    arrFilter(arr) {
      var _this = this;
      arr.forEach(function(i) {
        if (i.children == null) {
          _this.tableData.push({
            id:i.id,
            name:i.name,
            flag:Boolean(i.flag),
            parentId:i.parentId,
            peId:i.peId,
            pjId:i.pjId
          });
        } else {
          _this.tableData.push({
            id:i.id,
            name:i.name,
            flag:Boolean(i.flag),
            parentId:i.parentId,
            peId:i.peId,
            pjId:i.pjId
          });
          _this.arrFilter(i.children);
        }
      });
    },
    addSave() {
      var arr = this.$refs.tree.getCheckedKeys();
      if (arr.length < 1) {
        this.$message.error("请至少添加一条权限");
        return;
      }
      if (typeof this.$route.query.jobId != "undefined") {
        var form = {
          jobId: this.$route.query.jobId,
          userId: "1",
          powerIds: arr.join(",")
        };
        this.$http({
          url: "/job/doSetJobPower",
          method: "POST",
          data: form
        })
          .then(({ data }) => {
            this.$message.success("设置成功");
            this.$router.go(-1);
          })
          .catch(() => {});
      } else {
        var form = {
          employeeId: this.$route.query.employeeId,
          userId: "1",
          powerIds: arr.join(",")
        };
        this.$http({
          url: "/employee/doSetEmployeePower",
          method: "POST",
          data: form
        })
          .then(({ data }) => {
            this.$message.success("设置成功");
            this.$router.go(-1);
          })
          .catch(() => {});
      }
    },
    dialogFlase() {}
  }
};
</script>
<style type="text/css">
</style>