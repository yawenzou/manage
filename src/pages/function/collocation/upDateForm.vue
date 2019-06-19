<template>
  <div>
    <el-dialog
      title="新增"
      :visible.sync="dialogMsg.dialog"
      :close-on-click-modal="false"
      @open="find"
      width="50%"
      center
    >
      <el-form
          ref="form"
          :inline="true"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="输入查询">
            <el-input
              v-model="form.advertId"
              placeholder="产品ID"
            ></el-input>
          </el-form-item>
          <el-form-item label="选择维度">
            <el-select
              v-model="form.type"
              placeholder="服装.发型"
            >
              <el-option
                label="服装"
                value="cloth"
              >
              </el-option>
              <el-option
                label="发型"
                value="hair"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button
              type="primary"
              @click="find1"
            >查询</el-button>
            <el-button
              type="primary"
              @click="emptyForm"
            >重置</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="table_data"
          v-loading="loadData"
          element-loading-text="拼命加载中"
          border
          stripe
          style="width: 100%;"
        >
          <el-table-column
            prop="id"
            label="ID"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="clothNum"
            label="封面"
            align="center"
          >
            <template slot-scope="props">
              <img
                :src="props.row.image"
                style="width:100px"
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="top"
            label="层级"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200"
          >
            <template slot-scope="props">
              <el-button
                type="info"
                size="small"
                :disabled="isDisabled(props.row)"
                @click="add(props.row)"
              >添加至搭配</el-button>
            </template>
          </el-table-column>
        </el-table> 
        <p style="margin-top:20px"></p>
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total"
          >
          </el-pagination>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import { mapState } from "vuex";
export default {
  props: {
    dialogMsg: {
      type: Object //传入的类型
    },
    relation: {
      type: Array //传入的类型
    },
  },
  data() {
    return {
      table_data:[],
      currentPage:1,
      total:0,
      loadData:false,
      form:{
        type:'cloth',
        labelId:'',
        advertId:''
      }
    };
  },
  created() {
    
  },
  updated() {
    // console.log(123)
  },
  methods: {
    isDisabled(data){
      var _this = this ;
      for(var i = 0;i<this.relation.length;i++){
        if(_this.relation[i].id == data.id && _this.relation[i].type == data.type){
          return true
        }
      }
      return false
    },
    emptyForm(){
      this.form = {
        type:'cloth',
        labelId:'',
        advertId:""
      }
      this.currentPage = 1;
      this.openClick();
    },
    find(){
      this.emptyForm();
      this.openClick();
    },
    find1(){
      this.currentPage = 1;
      this.openClick();
    },
    handleCurrentChange(value){
      this.currentPage = value;
      this.openClick()
    },
    openClick(){
      this.$http({
        url: '/collocat/getListByCondition',
        method: "POST",
        data: {
          advertId:this.form.advertId,
          type:this.form.type,
          label:'',
          curPage:this.currentPage,
          pageSize:10
        }
      })
      .then(({ data }) => {
        var arr = [];
        if(this.form.type == 'cloth'){
          data.rows.forEach(item => {
            arr.push({
              id:item.clothId,
              name:item.clothName,
              image:item.clothImage,
              top:item.cpacthTop,
              type:2
            })
          });
        }else{
          data.rows.forEach(item => {
            arr.push({
              id:item.hairdoId,
              name:item.hairdoName,
              image:item.hairdoImage,
              top:item.haHierarchy,
              type:1
            })
          });
        }
        

        this.table_data = arr;
        this.currentPage = data.page;
        this.total = data.total;
        console.log(data)
      })
      .catch(() => {
        this.load_data = false;
      });
    },
    dialogFlase() {
      
    },
    add(data){
      this.$emit('add',data)
    }
  }
};
</script>