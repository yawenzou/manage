<template>
  <div style="margin-top:40px">
    <el-table
      :data="table"
      border
      stripe
      style="width: 100%;"
    >
      <el-table-column
        prop="startTime"
        label="开始时间"
        align="center"
      >
        <template slot-scope="props">
          {{$dateFormat(parseInt(props.row.min),"yyyy-MM-dd hh:mm:ss")}}
        </template>
      </el-table-column>
      <el-table-column
        prop="serTime"
        label="时长"
        align="center"
      >
        <template slot-scope="props">
          {{getTime(props.row.time)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="serTime"
        label="操作"
        align="center"
      >
        <template slot-scope="props">
          <el-button
            size="small"
            type="primary"
            @click="look(props.row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <bottom-tool-bar>
      <div slot="page">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </bottom-tool-bar>
  </div>
</template>
<script type="text/javascript">
import { bottomToolBar } from "components";
export default {
  data() {
    return {
      page: 1,
      total: 0,
      table:[]
    };
  },
  components: {
    bottomToolBar
  },
  created() {
    this.page = Number(this.$route.query.page) || 1;
    this.init();
    console.log(159236);
  },
  methods: {
    handleCurrentChange(val) {
      var query = JSON.parse(JSON.stringify(this.$route.query));
      query.page = val;
      this.$router.replace({ path: this.$route.path, query: query });
    },
    getTime(num){
      if(num < 1000){
        return '小于1秒'
      }else if(num>=1000 && num<60000){
        return parseInt(num/1000) + '秒'
      }else if(num>=60000){
        return Math.floor(num/60000)+"分"+parseInt((num%60000)/1000) + '秒'
      }
    },
    init() {
      this.$http({
        url: "/pc/record/recordList",
        method: "POST",
        data: {
          page: this.page,
          pageSize: 20,
          devId: this.$route.query.devId
        }
      })
        .then(({ data }) => {
          this.table = data.rows;
          this.total = data.total;
        })
        .catch(() => {});
    },
    look(data) {
      this.$router.push({
        path: "/equipmentHistory",
        query: { 
          uuid: data.uuid,
          devId:this.$route.query.devId,
          time:this.getTime(data.time),
          beginTime:this.$dateFormat(data.min,"yyyy-MM-dd hh:mm:ss")
        }
      });
    }
  }
};
</script>
<style type="text/css">
</style>