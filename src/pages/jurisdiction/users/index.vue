<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">

    </panel-title>
    <div class="panel-body">
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="输入查询">
          <el-input
            v-model="form.searchKey"
            placeholder="姓名/账号/手机"
          ></el-input>
        </el-form-item>
        <el-form-item label="员工职务">
          <el-select
            v-model="form.jobId"
            placeholder="全部"
          >
            <el-option
              v-for="item in jobList2"
              :label="item.jobName"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-cascader
            v-model="form.deptId"
            :options="deptList"
            :props="defaultProps1"
            @change="depChange"
            >
          </el-cascader>
        </el-form-item>
        <el-form-item label="">
          <el-button
            type="primary"
            @click="find"
          >查询</el-button>
          <el-button
            type="primary"
            @click="emptyForm"
          >重置</el-button>
        </el-form-item>
      </el-form>
      <div class="title-table">
        <div class="float-left">
          数据列表
        </div>
        <div class="float-right">
          <!-- <el-button
            type="primary"
            icon="plus"
            size="small"
            @click="addMore"
          >批量导入</el-button> -->
          <el-button
            type="primary"
            icon="plus"
            size="small"
            @click="addJobClick"
          >添加</el-button>
        </div>
      </div>
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        stripe
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          prop="employeeName"
          label="員工姓名"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性別"
          align="center"
        >
          <template slot-scope="props">
            {{props.row.sex == 0?'男':'女'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="所属部门"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="jobName"
          label="当前职位"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="登录账号"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="state"
          label="启用"
          align="center"
          width="80"
        >
          <template slot-scope="props">
            <el-switch
              :value="props.row.state=='1'"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="switchChange(props.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="320"
        >
          <template slot-scope="props">
            <el-button
              type="info"
              size="small"
              @click="upDate(props.row)"
            >编辑</el-button>
            <el-button
              type="info"
              size="small"
              @click="gethistory(props.row)"
            >记录</el-button>
            <el-button
              :disabled="props.row.collocaShow==0"
              type="danger"
              size="small"
              @click="del(props.row)"
            >删除</el-button>
            <el-button
              type="warning"
              size="small"
              @click="editJur(props.row)"
            >设置权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <div slot="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
    <el-dialog
      :title="dialog.addJobText"
      :visible.sync="dialog.addJob"
      :close-on-click-modal="false"
      width="50%"
      center
    >
      <el-form
        ref="addJob"
        :model="addJob"
        label-width="160px"
      >
        <p class="form-title">基础信息</p>
        <el-form-item
          label="登录账号:"
          prop="eUserName"
          :rules="{required: true, message: '登录账号不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addJob.eUserName"
            placeholder="登录账号"
            @blur="userNameBlur"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="登录密码:"
          prop="ePwd"
          :rules="{required: true, message: '登录密码不能为空', trigger: 'blur'}"
        >
          <el-input
            type="password"
            v-model="addJob.ePwd"
            placeholder="登录密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="员工姓名:"
          prop="eName"
          :rules="{required: true, message: '员工姓名不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addJob.eName"
            placeholder="员工姓名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="员工性别:"
          prop="eSex"
          :rules="{required: true, message: '员工性别不能为空', trigger: 'blur'}"
        >
          <el-radio
            class="radio"
            v-model="addJob.eSex"
            label="0"
          >男</el-radio>
          <el-radio
            class="radio"
            v-model="addJob.eSex"
            label="1"
          >女</el-radio>
        </el-form-item>
        <el-form-item
          label="手机号码:"
          prop="ePhone"
          :rules="{required: true, message: '手机号码不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addJob.ePhone"
            placeholder="手机号码"
            :maxlength="11"
            @blur="phoneBlur"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="当前部门:"
          prop="deptId"
          :rules="{type:'array',required: true, message: '当前部门不能为空', trigger: 'blur'}"
        >
          <el-cascader
            v-model="addJob.deptId"
            :options="users"
            :props="defaultProps1"
            @change="depChange"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item
          label="当前职务:"
          prop="jobId"
          :rules="{type:'number',required: true, message: '当前职务不能为空', trigger: 'blur'}"
        >
          <el-select
            v-model="addJob.jobId"
            placeholder="选择职务"
          >
            <el-option
              v-for="item in jobList1"
              :label="item.jobName"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="邮箱地址:"
          prop="eMail"
        >
          <el-input
            v-model="addJob.eMail"
            placeholder="邮箱地址"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="座机:"
          prop="eTel"
        >
          <el-input
            v-model="addJob.eTel"
            placeholder="座机"
          ></el-input>
        </el-form-item>
        <p class="form-title">辅助信息</p>
        <el-form-item
          label="工号:"
          prop="eJobNum"
        >
          <el-input
            v-model="addJob.eJobNum"
            placeholder="工号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="籍贯:"
          prop="eNativePlace"
        >
          <el-input
            v-model="addJob.eNativePlace"
            placeholder="籍贯"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="毕业院校:"
          prop="eGraduationSchool"
        >
          <el-input
            v-model="addJob.eGraduationSchool"
            placeholder="毕业院校"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="毕业时间:"
          prop="eGraduationTime"
        >
          <el-date-picker
            v-model="addJob.eGraduationTime"
            type="date"
            placeholder="选择毕业时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="学历:"
          prop="eEducation"
        >
          <el-select
            v-model="addJob.eEducation"
            placeholder="选择学历"
          >
            <el-option
              v-for="item in eEducationList"
              :label="item"
              :value="item"
              :key="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所学专业:"
          prop="eMajor"
        >
          <el-input
            v-model="addJob.eMajor"
            placeholder="毕业院校"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="备注信息:"
          prop="note"
        >
          <el-input
            v-model="addJob.note"
            placeholder="备注信息"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialog.addJob=false">取 消</el-button>
        <el-button
          type="primary"
          @click="addJobSave"
        >保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";
export default {
  data() {
    return {
      table_data: [],
      //当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      totalClick: 0,
      //每页显示多少条数据
      length: 10,
      //请求时的loading效果
      load_data: true,
      form: {
        searchKey: "",
        sex: "",
        createTime: "",
        state: "",
        jobId: "",
        deptId: [],
        jobType: 0
      },
      states: [{ name: "启用", state: 1 }, { name: "禁用", state: 0 }],
      dialog: {
        addUser: false,
        addJob: false,
        addJobText: "添加员工"
      },
      addJob: {
        eUserName: "",
        ePwd: "",
        eName: "",
        eSex: "0",
        ePhone: "",
        eMail: "",
        eTel: "",
        eJobNum: "",
        eNativePlace: "",
        eGraduationSchool: "",
        eGraduationTime: "",
        eEducation: "",
        eMajor: "",
        note: "",
        deptId: "",
        jobId: "",
        userId: "1"
      },
      jobId: "",
      jobList: [],
      deptList: [],
      eEducationList: ["初中", "高中", "大专", "本科", "硕士", "博士", "其他"],
      eUserName: "",
      defaultProps1:{children: "children",label: "deptName",value:'deptId'},
      users:[],
      defaultProps1:{children: "children",label: "deptName",value:'deptId'},
      password:"",
      phone:''
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
  },
  computed:{
    jobList1:function(){
      if(this.addJob.deptId&&this.addJob.deptId.length){
        return this.jobListFilter(this.addJob.deptId)
      }else{
        return []
      }
    },
    jobList2:function(){
      if(this.form.deptId&&this.form.deptId.length){
        return this.jobListFilter(this.form.deptId)
      }else{
        return this.jobList
      }
    },
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created() {
    if (typeof this.$route.query.deptId != "undefined") {
      this.form.deptId = [this.$route.query.deptId];
    }
    if (typeof this.$route.query.jobId != "undefined") {
      this.form.jobId = this.$route.query.jobId;
    }
    this.get_table_data_filter();
    this.getList();
  },
  methods: {
    jobListFilter(data){
      var arr = this.jobList.filter(item=>{
        return item.deptId == data[data.length-1]
      })
      
      if(this.addJob.jobId){
        // debugger
        var arr1 = arr.filter(item=>{
          return item.id == this.addJob.jobId
        })
        if(!arr1.length){
          this.addJob.jobId = ""
        }
      }
      console.log(arr)
      return arr
    },
    gethistory(data){
      this.$router.push({path:"/usersHistory",query:{id:data.employeeId,label:data.userName}})
    },
    depChange(value){
      
    },
    getList() {
      var form = {};
      form.curPage = 1;
      form.pageSize = 100;
      this.$http({
        url: "/employee/listGroupByDeptAndSon",
        method: "POST",
        data: {}
      })
      .then(({ data }) => {
        this.deptList = data;
      })
      .catch(() => {});
      this.$http({
        url: "/job/list",
        method: "POST",
        data: form
      })
        .then(({ data }) => {
          this.jobList = data
        })
        .catch(() => {
        });
      this.$http({
        url: "/employee/listGroupByDeptAndSon",
        method: "POST",
        data: {}
      })
        .then(({ data }) => {
          this.users = data;
        })
        .catch(() => {});
    },
    arrFilter(arr) {
      var _this = this;
      arr.forEach(function(i) {
        if (i.employees != null) {
          if (i.children == null) {
            i.children = [];
          }
        }
        if (i.children != null) {
          _this.arrFilter(i.children);
        }
      });
    },
    get_table_data_filter() {
      this.load_data = true;
      var form = this.form;
      form.deptId = form.deptId.length?form.deptId[form.deptId.length-1]:"";
      form.curPage = this.currentPage;
      form.pageSize = this.length;
      this.$http({
        url: "/employee/list",
        method: "POST",
        data: this.form
      })
        .then(({ data }) => {
          this.table_data = data.rows;
          this.currentPage = data.page == 0 ? 1 : data.page;
          this.total = data.total;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //查找
    find() {
      this.currentPage = 1;
      this.get_table_data_filter();
    },
    handleSelectionChange(val) {},
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_table_data_filter();
    },
    // 显示隐藏
    switchChange(val) {
      var url = "";
      if (val.state == "0") {
        url = "/employee/enable";
      } else {
        url = "/employee/ban";
      }
      this.$http({
        url: url,
        method: "POST",
        data: { employeeIds: val.employeeId }
      })
        .then(({ data }) => {
          this.get_table_data_filter();
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //删除
    del(data) {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          this.$http({
            url: "/employee/del",
            method: "POST",
            data: { employeeIds: data.employeeId }
          })
            .then(({ data }) => {
              this.get_table_data_filter();
            })
            .catch(() => {
              this.load_data = false;
            });
        })
        .catch(() => {});
    },
    //修改
    upDate(data) {
      this.jobId = data.employeeId;
      this.$http({
        url: "/employee/getEmployeeById",
        method: "POST",
        data: { empId: data.employeeId }
      })
        .then(({ data }) => {
          this.eUserName = data.eUserName;
          this.phone = data.ePhone;
          this.addJob = {
            eUserName: data.eUserName,
            ePwd: data.ePwd,
            eName: data.eName,
            eSex: data.eSex + "",
            ePhone: data.ePhone,
            eMail: data.eMail,
            eTel: data.eTel,
            eJobNum: data.eJobNum,
            eNativePlace: data.eNativePlace,
            eGraduationSchool: data.eGraduationSchool,
            eGraduationTime: data.eGraduationTime?data.eGraduationTime:'',
            eEducation: data.eEducation,
            eMajor: data.eMajor,
            note: data.note,
            deptId: [data.deptId],
            jobId: data.jobId,
            userId: "1"
          };
          this.password = data.ePwd;
          this.dialog.addJobText = "修改员工";
          this.dialog.addJob = true;
        })
        .catch(() => {});
    },
    //清空查询条件
    emptyForm() {
      this.form = {
        searchKey: "",
        sex: "",
        createTime: "",
        state: "",
        jobId: "",
        deptId: []
      };
      this.getList();
      this.get_table_data_filter();
    },
    //设置权限
    editJur(data) {
      this.$router.push({
        path: "/jurEditByUser",
        query: { employeeId: data.employeeId }
      });
    },
    dateChange(val) {
      console.log(val);
      this.form.uploadDate = val;
    },
    addMore(){
      this.$router.push({path:'/usersAddmore'})
    },
    addJobClick() {
      this.eUserName = "";
      this.addJob = {
        eUserName: "",
        ePwd: "",
        eName: "",
        eSex: "0",
        ePhone: "",
        eMail: "",
        eTel: "",
        eJobNum: "",
        eNativePlace: "",
        eGraduationSchool: "",
        eGraduationTime: "",
        eEducation: "",
        eMajor: "",
        note: "",
        deptId: "",
        jobId: "",
        userId: "1"
      };
      this.dialog.addJob = true;
      this.dialog.addJobText = "添加员工";
    },
    addJobSave() {
      this.$refs["addJob"].validate(valid => {
        if (valid) {
          var form = JSON.parse(JSON.stringify(this.addJob));
          if (
            typeof form.eGraduationTime != "number" &&
            !!form.eGraduationTime
          ) {
            form.eGraduationTime = form.eGraduationTime.getTime();
          }
          form.deptId = form.deptId[form.deptId.length-1];
          if (this.dialog.addJobText == "添加员工") {
            form.ePwd = hex_md5(form.ePwd);
            this.$http({
              url: "/employee/add",
              method: "POST",
              data: form
            })
              .then(({ data }) => {
                this.dialog.addJob = false;
                this.get_table_data_filter();
              })
              .catch(() => {});
          } else {
            if(form.ePwd != this.password){
              form.ePwd = hex_md5(form.ePwd);
            }
            form.employeeId = this.jobId;
            this.$http({
              url: "/employee/edit",
              method: "POST",
              data: form
            })
              .then(({ data }) => {
                this.dialog.addJob = false;
                this.get_table_data_filter();
              })
              .catch(() => {});
          }
        } else {
          return false;
        }
      });
    },
    userNameBlur(val) {
      if (!this.addJob.eUserName) {
        return;
      }
      if (this.eUserName == this.addJob.eUserName) {
        return;
      }
      this.$http({
        url: "/user/inspectName",
        method: "POST",
        data: { userName: this.addJob.eUserName }
      })
        .then(data => {
          console.log(data);
        })
        .catch(({ msg }) => {
          this.addJob.eUserName = "";
        });
    },
    phoneBlur(val){
      debugger
      if (!this.addJob.ePhone) {
        return;
      }
      if (this.phone == this.addJob.ePhone) {
        return;
      }
      this.$http({
        url: "/user/getPhoneOnly",
        method: "POST",
        data: { phone:this.addJob.ePhone }
      })
        .then(data => {
          console.log(data);
        })
        .catch(({ msg }) => {
          this.addJob.ePhone = "";
        });
    }
  }
};
</script>
<style type="text/css">
.add-user-title {
  background: #f7f7f7;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  color: #999;
}
</style>
