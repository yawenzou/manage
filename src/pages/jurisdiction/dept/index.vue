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
        <el-form-item label="部门名称">
          <el-input
            v-model="form.deptName"
            placeholder="请输入职位名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="职务状态">
          <el-select
            v-model="form.deptState"
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
          >展开/收起列表</el-button>
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
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        ref="toggleDeptTable"
        default-expand-all
      >
        <el-table-column
          prop="deptName"
          label="部门名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="num"
          label="部门人员"
          align="center"
        >
          <template slot-scope="props">
            <p
              style="color:blue;cursor: pointer;"
              @click="lookUsers(props.row)"
            >{{getNum(props.row)}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="部门描述"
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
          width="320"
        >
          <template slot-scope="props">
            <el-button
              type="info"
              size="small"
              @click="upDate(props.row)"
            >编辑</el-button>
            <el-button
              :disabled="props.row.collocaShow==0"
              type="danger"
              size="small"
              @click="del(props.row,props)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <bottom-tool-bar>
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
      </bottom-tool-bar> -->
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
        <el-form-item
          label="上级部门:"
          prop="parentId"
        >
          <el-select
            v-model="addJob.parentId"
            placeholder="(可选)上级部门"
          >
            <el-option
              v-for="item in deptList"
              :label="item.deptName"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="部门名称:"
          prop="deptName"
          :rules="{required: true, message: '部门名称不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addJob.deptName"
            placeholder="部门名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="部门描述:"
          prop="remark"
        >
          <el-input
            v-model="addJob.remark"
            placeholder="部门描述"
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
      title="部门人员"
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
import deptUserTable from './table'
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
        deptName: "",
        deptState: ""
      },
      states: [{ name: "启用", state: 1 }, { name: "禁用", state: 0 }],
      dialog: {
        addUser: false,
        addJob: false,
        addJobText: "添加部门",
        userList:false,
      },
      adduser: {
        jobName: ""
      },
      addJob: {
        deptName: "",
        remark: "",
        parentId: "",
        userId: "1"
      },
      deptList: [],
      users: [],
      usersActive: [],
      usersActiveShow: [],
      filterText: "",
      defaultProps: {
        children: "children",
        label: "deptName"
      },
      jobId: "",
      Expan:true,
      userTable:[]
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
    dialog:{
      handler(newName, oldName) {  
          this.$http({
            url: "/dept/getSuperiorDept",
            method: "POST",
            data: { userId:9 }
          })
          .then(({ data }) => {
            this.deptList = data;
          })
          .catch(() => {
            // this.load_data = false
          });
       },
      deep: true,
      immediate: true
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
  methods: {
    getNum(data){
      var num = 0;
      if(!data.children){
        return data.num
      }else{
        data.children.forEach(item=>{
          if(!item.children){
            num += item.num;
          }else{
            item.children.forEach(child=>{
              num += child.num
            })
          }
        })
        return num
      }
    },
    toggleTable(){
      this.Expan = !this.Expan;
      this.table_data.forEach(item=>{
        if(item.children){
          this.$refs.toggleDeptTable.toggleRowExpansion(item)
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    get_table_data_filter() {
      this.load_data = true;
      var form = this.form;
      form.page = this.currentPage;
      form.pageSize = this.length;
      this.$http({
        url: "/dept/list",
        method: "POST",
        data: form
      })
        .then(({ data }) => {
          this.setTable(data);
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
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
      for(var i=0;i<array.length;i++){
        if(array[i].children){
          for(var b=0;b<array[i].children.length;b++){
            var children =  [];
            for(var a=0;a<arr.length;a++){
              if(arr[a].parentId == array[i].children[b].id){
                children.push(arr[a])
              }
            }
            if(children.length){
              array[i].children[b].children = children;
            }
          }
        }
      }
      this.table_data = array;
      console.log(array)
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
        url = "/dept/enable";
      } else {
        url = "/dept/ban";
      }
      this.$http({
        url: url,
        method: "POST",
        data: { deptIds: val.id }
      })
        .then(({ data }) => {
          this.get_table_data_filter();
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //删除
    del(data,props) {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          this.$http({
            url: "/dept/del",
            method: "POST",
            data: { deptIds: data.id }
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
      this.jobId = data.id;
      this.addJob = {
        deptName: data.deptName,
        remark: data.remark,
        parentId: data.parentId == 0?'':data.parentId,
        userId: "1"
      };
      this.dialog.addJobText = "修改部门";
      this.dialog.addJob = true;
    },
    //清空查询条件
    emptyForm() {
      this.form = {
        deptName: "",
        deptState: ""
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
    addJobClick() {
      this.$http({
        url: "/dept/getSuperiorDept",
        method: "POST",
        data: { userId:9 }
      })
        .then(({ data }) => {
          this.deptList = data;
          this.addJob = {
            deptName: "",
            remark: "",
            parentId: "",
            userId: "1"
          };
          this.dialog.addJob = true;
          this.dialog.addJobText = "添加部门";
        })
        .catch(() => {
          // this.load_data = false
        });
      
    },
    addJobSave() {
      this.$refs["addJob"].validate(valid => {
        if (valid) {
          var form = this.addJob;
          if (this.dialog.addJobText == "添加部门") {
            this.$http({
              url: "/dept/add",
              method: "POST",
              data: form
            })
              .then(({ data }) => {
                this.dialog.addJob = false;
                this.get_table_data_filter();
                this.$refs['addJob'].resetFields();
              })
              .catch(() => {});
          } else {
            form.deptId = this.jobId;
            this.$http({
              url: "/dept/edit",
              method: "POST",
              data: form
            })
              .then(({ data }) => {
                this.dialog.addJob = false;
                this.get_table_data_filter();
                this.$refs['addJob'].resetFields();
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
        url: "/dept/getEmpListByDeptId",
        method: "POST",
        data: {deptId:info.id}
      })
        .then(({ data }) => {
          this.userTable = data;
          this.dialog.userList = true;
        })
        .catch(() => {});
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
