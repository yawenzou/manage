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
        <el-form-item label="职位名称">
          <el-input
            v-model="form.jobName"
            placeholder="请输入职位名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="职务状态">
          <el-select
            v-model="form.jobStatus"
            placeholder="全部"
          >
            <el-option
              v-for="item in states"
              :label="item.name"
              :value="item.state"
              :key="item.name"
            ></el-option>
          </el-select>
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
          <el-button
            type="primary"
            icon="plus"
            size="small"
            @click="toggleTable"
          >展开列表</el-button>
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
        row-key="id"
        style="width: 100%;"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        ref="toggleJobTable"
        default-expand-all
      >
        <!-- <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column> -->
        <el-table-column
          prop="jobName"
          label="职位名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="jobCount"
          label="职位人员"
          align="center"
        >
          <template slot-scope="props">
            <p
              style="color:blue;cursor: pointer;"
              @click="lookUsers(props.row)"
            >{{props.row.jobCount}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="note"
          label="职位描述"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="部门"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="更新时间"
          align="center"
          width="240"
        >
          <template slot-scope="props">
            {{$dateFormat(parseInt(props.row.updateTime),"yyyy-MM-dd hh:mm:ss")}}
          </template>
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
          width="360"
        >
          <template slot-scope="props">
            <!-- <el-button
              type="success"
              size="small"
              @click="addUser(props.row)"
            >添加人员</el-button> -->
            <el-button
              type="warning"
              size="small"
              @click="editJur(props.row)"
            >设置权限</el-button>
            <el-button
              type="info"
              size="small"
              @click="upDate(props.row)"
            >编辑</el-button>
            <el-button
              :disabled="props.row.collocaShow==0"
              type="danger"
              size="small"
              @click="del(props.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="添加人员"
      :visible.sync="dialog.addUser"
      :close-on-click-modal="false"
      width="50%"
      center
    >
      <el-form
        ref="adduser"
        :model="adduser"
      >
        <el-form-item>
          <el-input
            v-model="adduser.jobName"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div
            class="tree-box"
            style="float:left;width:45%;margin-right:9%;min-height:300px;border:1px solid #eee"
          >
            <p class="add-user-title">选择员工</p>
            <el-input
              placeholder="输入员工姓名"
              v-model="filterText"
            >
            </el-input>
            <el-tree
              class="filter-tree"
              :data="users"
              :props="defaultProps"
              show-checkbox
              default-expand-all
              node-key="deptId"
              :filter-node-method="filterNode"
              :default-checked-keys="usersActive"
              ref="tree2"
              @check-change="treeChange"
            >
            </el-tree>
          </div>
          <div style="float:left;width:45%;min-height:300px;border:1px solid #eee">
            <p class="add-user-title">已选{{usersActiveShow.length}}(还能选)</p>
            <ul style="padding-left:20px">
              <li
                v-for="(item,index) in usersActiveShow"
                style="position: relative;border-bottom:1px solid #eee"
                :key="index"
              >
                {{item.deptName}}
                <el-button
                  style="position: absolute;right:20px;top:4px"
                  type="danger"
                  size="small"
                  @click="delActive(index)"
                >删除</el-button>
              </li>
            </ul>
          </div>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialog.addUser=false">取 消</el-button>
        <el-button
          type="primary"
          @click="addUserSave"
        >保 存</el-button>
      </span>
    </el-dialog>
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
        <el-form-item
          label="选择部门:"
          prop="deptId"
          :rules="{type:'array',required: true, message: '部门不能为空', trigger: 'blur'}"
        >
          <el-cascader
            v-model="addJob.deptId"
            :options="deptSelcet"
            :props="defaultProps1"
            @change="depChange"
            >
          </el-cascader>
        </el-form-item>
        <el-form-item
          label="上级职务:"
          prop="parentId"
        >
          <el-select
            v-model="addJob.parentId"
            placeholder="(可选)上级职务"
          >
            <el-option
              v-for="item in jobList"
              :label="item.jobName"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="职务名称:"
          prop="jobName"
          :rules="{required: true, message: '职务名称不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addJob.jobName"
            placeholder="职务名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="职务描述:"
          prop="note"
        >
          <el-input
            v-model="addJob.note"
            placeholder="职务描述"
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
    <el-dialog
      title="职位人员"
      :visible.sync="dialog.userList"
      :close-on-click-modal="false"
      width="50%"
      center
    >
      <dept-user-table :tableData="userTable"></dept-user-table>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";
import deptUserTable from '../dept/table'
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
        jobName: "",
        jobStatus: "",
        deptId:''
      },
      states: [{ name: "启用", state: 1 }, { name: "禁用", state: 0 }],
      dialog: {
        addUser: false,
        addJob: false,
        addJobText: "添加职务",
        userList:false,
      },
      adduser: {
        jobName: ""
      },
      addJob: {
        jobName: "",
        note: "",
        userId: "1",
        deptId:[],
        parentId:""
      },
      users: [],
      usersActive: [],
      usersDefault: [],
      usersActiveShow: [],
      filterText: "",
      defaultProps: {
        children: "children",
        label: "deptName"
      },
      defaultProps1:{children: "children",label: "deptName",value:'deptId',checkStrictly:true},
      jobId: "",
      userId: 100000,
      parentList:[],
      deptList:[],
      deptSelcet:[],
      userTable:[]
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  components: {
    panelTitle,
    bottomToolBar,
    deptUserTable
  },
  created() {
    this.get_table_data_filter();
  },
  computed:{
    jobList:function(){
      if(this.addJob.deptId&&this.addJob.deptId.length){
        return this.jobListFilter(this.addJob.deptId)
      }else{
        return []
      }
    }
  },
  methods: {
    jobListFilter(data){
      var arr = this.parentList.filter(item=>{
        return item.deptId == data[data.length-1]&&item.parentId == 0
      })
      
      if(this.addJob.parentId){
        // debugger
        var arr1 = arr.filter(item=>{
          return item.id == this.addJob.parentId
        })
        if(!arr1.length){
          this.addJob.parentId = ""
        }
      }
      console.log(arr)
      return arr
    },
    toggleTable(){
      this.table_data.forEach(item=>{
        if(item.children){
          this.$refs.toggleJobTable.toggleRowExpansion(item)
        }
      })
    },
    filterNode(value, data, node) {
      if (!value) return true;
      return data.deptName.indexOf(value) !== -1;
    },
    get_table_data_filter() {
      this.load_data = true;
      var form = this.form;
      form.curPage = this.currentPage;
      form.pageSize = this.length;
      this.$http({
        url: "/job/list",
        method: "POST",
        data: form
      })
        .then(({ data }) => {
          this.parentList = JSON.parse(JSON.stringify(data));
          this.setTable(data);
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
      this.$http({
        url: "/dept/list",
        method: "POST",
        data: form
      })
        .then(({ data }) => {
          this.deptList = data;
        })
        .catch(() => {
        });
      this.$http({
        url: "/employee/listGroupByDeptAndSon",
        method: "POST",
        data: {}
      })
        .then(({ data }) => {
          this.deptSelcet = data;
        })
        .catch(() => {});
    },
    arrFilter1(arr) {
      var _this = this;
      arr.forEach(function(i) {
        debugger
        if (i.children != null) {
          _this.arrFilter(i.children);
        }
      });
    },
    setTable(arr){
      var array = [];
      arr.forEach(item=>{
        if(item.parentId == 0){
          array.push(item)
        }
      })
      if(array.length == 0){
        this.table_data = arr;
        return
      }
      for(var i=0;i<array.length;i++){
        var children =  [];
        for(var a=0;a<arr.length;a++){
          if(arr[a].parentId == array[i].id){
            children.push(arr[a])
          }
        }
        if(children.length){
          array[i].children = children;
        }
      }
      this.table_data = array;
      console.log(array)
    },
    depChange(value){
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
        url = "/job/enable";
      } else {
        url = "/job/ban";
      }
      this.$http({
        url: url,
        method: "POST",
        data: { jobIds: val.id }
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
            url: "/job/del",
            method: "POST",
            data: { jobIds: data.id }
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
      console.log(data);
      var arr = [];
      arr.unshift(data.deptId)
      this.deptList.forEach(item=>{
        if(item.id == data.deptId){
          arr.unshift(item.parentId)
          if(item.parentId != 0){
            this.deptList.forEach(item1=>{
              if(item.parentId == item1.id && item1.parentId!=0){
                arr.unshift(item1.parentId)
              }
            })
          }
        }
      })
      this.jobId = data.id;
      this.addJob = {
        jobName: data.jobName,
        note: data.note,
        userId: "1",
        parentId:data.parentId == 0?'':data.parentId,
        deptId:arr
      };
      this.dialog.addJob = true;
      this.dialog.addJobText = "修改职务";
    },
    //清空查询条件
    emptyForm() {
      this.form = {
        jobName: "",
        jobStatus: "",
        deptId:''
      };
      this.get_table_data_filter();
    },
    //设置权限
    editJur(data) {
      this.$router.push({ path: "/jurEdit", query: { jobId: data.id } });
    },
    dateChange(val) {
      console.log(val);
      this.form.uploadDate = val;
    },
    addUser(row) {
      this.adduser.jobName = row.jobName;
      this.jobId = row.id;
      var _this = this;
      this.$http({
        url: "/employee/listGroupByDeptAndSon",
        method: "POST",
        data: {}
      })
        .then(({ data }) => {
          var users = data;
          this.arrFilter(users);
          this.users = users;
          console.log(this.users)
          this.dialog.addUser = true;
          this.$http({
            url: "/employee/list",
            method: "POST",
            data: {
              jobId: row.id,
              userId: "1",
              jobType: 2,
              curPage: 1,
              pageSize: 100
            }
          })
            .then(({ data }) => {
              if (data) {
                var arr = [];
                _this.usersDefault.forEach(function(item) {
                  data.rows.forEach(function(i) {
                    if (i.employeeId == item.employeeId) {
                      arr.push(item.deptId);
                    }
                  });
                });
                _this.$refs.tree2.setCheckedKeys(arr);
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    delActive(index) {
      console.log(index);
      this.usersActiveShow.splice(index, 1);
      var arr = [];
      this.usersActiveShow.forEach(function(item) {
        arr.push(item.deptId);
      });
      this.$refs.tree2.setCheckedKeys(arr);
    },
    arrFilter(arr) {
      var _this = this;
      arr.forEach(function(i) {
        if (i.employees != null) {
          if (i.children == null) {
            i.children = [];
          }
          i.employees.forEach(function(a) {
            var obj = {
              deptName: a.employeeName,
              deptId: _this.userId,
              employeeId: a.employeeId,
              children: null,
              employees: null
            };
            i.children.push(obj);
            _this.usersDefault.push(obj);
            _this.userId--;
          });
        }
        if (i.children != null) {
          _this.arrFilter(i.children);
        }
      });
    },
    treeChange() {
      var _this = this;
      var arr = this.$refs.tree2.getCheckedNodes();
      console.log(arr);
      var arr1 = [];
      arr.forEach(function(i) {
        if (typeof i.employeeId != "undefined") {
          arr1.push(i);
        }
      });
      this.usersActiveShow = arr1;
    },
    addUserSave() {
      console.log(this.usersActiveShow);
      var data = {};
      data.jobId = this.jobId;
      data.employeeIds = "";
      data.userId = "1";
      this.usersActiveShow.forEach(function(i) {
        data.employeeIds += i.employeeId + ",";
      });
      data.employeeIds = data.employeeIds.substring(
        0,
        data.employeeIds.length - 1
      );
      this.$http({
        url: "/job/doAddEmployee2Job",
        method: "POST",
        data: data
      })
        .then(({ data }) => {
          this.dialog.addUser = false;
          this.usersActiveShow = [];
          this.users = [];
          this.get_table_data_filter();
        })
        .catch(() => {});
    },
    addJobClick() {
      this.addJob = {
        jobName: "",
        note: "",
        userId: "1",
        deptId:[],
        parentId:""
      };
      this.dialog.addJob = true;
      this.dialog.addJobText = "添加职务";
    },
    addJobSave() {
      this.$refs["addJob"].validate(valid => {
        if (valid) {
          var form = this.addJob;
          console.log(form)
          form.deptId = form.deptId[form.deptId.length-1];
          if (this.dialog.addJobText == "添加职务") {
            this.$http({
              url: "/job/add",
              method: "POST",
              data: form
            })
              .then(({ data }) => {
                this.dialog.addJob = false;
                this.get_table_data_filter();
              })
              .catch(() => {});
          } else {
            form.jobId = this.jobId;
            this.$http({
              url: "/job/edit",
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
    lookUsers(info) {
      this.$http({
        url: "/employee/list",
        method: "POST",
        data: {
          jobId:info.id,
          curPage:1,
          pageSize:100
        }
      })
        .then(({ data }) => {
          this.userTable = data.rows;
          this.dialog.userList = true;
        })
        .catch(() => {
        });
    },
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
.tree-box .el-tree {
  border: none;
}
</style>
