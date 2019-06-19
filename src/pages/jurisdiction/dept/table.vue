<template>
  <div>
      <el-table
          :data="tableData"
          border
          stripe
          style="width: 100%;"
          ref="configurationTable"
        >
          <el-table-column
            prop="employeeName"
            label="姓名"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号码"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="eMail"
            label="邮箱地址"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="deptName"
            label="部门"
            align="center"
          >
          </el-table-column>
        </el-table>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    tableData: {
        type: Array
    },
  },
  data() {
    return {
    };
  },
  updated () {

  },
  methods:{
    
  }
};
</script>
<style>
</style>
