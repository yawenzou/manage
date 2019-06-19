<template>
  <div class="panel">
    <panel-title title="数据记录">
      <el-button
        type="primary"
        @click="$router.go(-1)"
      >返回</el-button>
    </panel-title>
    <div class="panel-body">
      <table class="details-table">
          <tr>
            <td class="el-col-4">
              <div>设备ID</div>
            </td>
            <td class="el-col-8">
              <div>{{$route.query.devId}}</div>
            </td>
            <td class="el-col-4">
              <div>开始时间</div>
            </td>
            <td class="el-col-8">
              <div>{{$route.query.beginTime}}</div>
            </td>
          </tr>
          <tr>
            <td class="el-col-4">
              <div>使用时长</div>
            </td>
            <td class="el-col-8">
              <div>{{$route.query.time}}</div>
            </td>
            <td class="el-col-4">
              <div></div>
            </td>
            <td class="el-col-8">
              <div></div>
            </td>
          </tr>
      </table>
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        stripe
        style="width: 100%;"
      >
        <el-table-column
          prop="opeTime"
          label="操作时间"
          align="center"
          width="220"
        >
          <template slot-scope="props">
            {{$dateFormat(parseInt(props.row.time),"yyyy-MM-dd hh:mm:ss")}}
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="使用功能"
          align="center"
          width="220"
        >
        </el-table-column>
        <el-table-column
          prop="opeRecord"
          label="记录"
          align="center"
        >
          <template slot-scope="props">
            <el-button
            v-if="props.row.typeInt == 1"
            size="small"
            type="primary"
            @click="look(props.row)"
          >查看</el-button>
          <span v-else-if="props.row.typeInt == 0">{{props.row.type}}</span>
          <div v-else>
            <span @click="typeIntDetail(item)" :class="item.typeInt!=-1?'span-active':''" v-for="item in props.row.content" :key="item.data">{{item.type}}{{item.data==null?'':item.data}}</span>
          </div>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <div slot="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="length"
            layout="total, prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
    <el-dialog
      title="图片详情"
      :visible.sync="dialogVisible"
      width="50%">
      <img style="width:100%" :src="img" alt="">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
      length: 20,
      //请求时的loading效果
      load_data: true,
      dialogVisible:false,
      img:''
    };
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created() {
    debugger
    this.currentPage = Number(this.$route.query.page) || 1;
    this.getTable();
  },
  methods: {
    //页码选择
    handleCurrentChange(val) {
      var query = JSON.parse(JSON.stringify(this.$route.query));
      query.page = val;
      this.currentPage = val;
      this.getTable();
      this.$router.replace({ path: this.$route.path, query: query });
    },
    getTable() {
      this.load_data = true;
      var form = {};
      form.page = this.currentPage;
      form.pageSize = this.length;
      form.uuid = this.$route.query.uuid;
      this.$http({
        url: "/pc/record/recordDetail",
        method: "POST",
        data: form
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
    typeIntDetail(data){
      if(data.typeInt == -1){
        return 
      }else if(data.typeInt == 1){
        
      }else if(data.typeInt == 2){
        this.$router.push({path:'/faceDetails',query:{id:data.data}})
      }else if(data.typeInt == 3){
        this.$router.push({path:'/hairstyleDetails',query:{id:data.data}})
      }else if(data.typeInt == 4){
        this.$router.push({path:'/clothingDetails',query:{id:data.data}})
      }else if(data.typeInt == 5){
        this.$router.push({path:'/collocationDetails',query:{id:data.data}})
      }
      console.log(data);
    },
    look(data){
      console.log(data)
      if(!data.content[0].data){
        this.$message.error("暂无图片资源");
        return
      }
      if(data.content[0].data[0]!='h'){
        this.$message.error("暂无图片资源")
      }else{
        this.img = data.content[0].data;
        this.dialogVisible = true;
      }
    }
  }
};
</script>
<style type="text/css">
  .span-active{
    color:rgb(0, 85, 255);
    cursor:pointer;
    display: inline-block;
    margin-right:10px;
  }
</style>

