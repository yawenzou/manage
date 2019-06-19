<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button
        type="primary"
        @click="$router.go(-1)"
      >返回</el-button>
    </panel-title>
    <div class="panel-body">
      <div>
        <div class="title-table">
          <div class="float-left">
            基本信息
          </div>
        </div>
        <table class="details-table"  v-if="info">
          <tr>
            <td class="el-col-4">
              <div>ID</div>
            </td>
            <td class="el-col-8">
              <div>{{info.faceId}}</div>
            </td>
            <td class="el-col-4">
              <div>脸型名称</div>
            </td>
            <td class="el-col-8">
              <div>{{info.faceName}}</div>
            </td>
          </tr>
          <tr>
            <td class="el-col-4">
              <div>日期</div>
            </td>
            <td class="el-col-8">
              <div>{{$dateFormat(parseInt(info.faceUpdated),"yyyy-MM-dd hh:mm:ss")}}</div>
            </td>
            <td class="el-col-4">
              <div>脸型分类</div>
            </td>
            <td class="el-col-8">
              <div>{{info.faceTypeName[0].labelName}}</div>
            </td>
          </tr>
          <tr class="image-box">
            <td class="el-col-4">
              <div>脸型封面</div>
            </td>
            <td
              class="el-col-20"
              colspan="3"
            >
                <div>
                    <img style="height:80px;margin-left:20px;" :src="info.faceImage" alt="">
                </div> 
            </td>
          </tr>
          <tr class="image-box">
            <td class="el-col-4">
              <div>脸型面片</div>
            </td>
            <td
              class="el-col-20"
              colspan="3"
            >
                <div>
                    <img v-for="item in info.thinImage" :key="item" style="height:80px;margin-left:20px;" :src="item" alt="">
                </div> 
            </td>
          </tr>
          <tr>
            <td class="el-col-4">
              <div>边缘点位</div>
            </td>
            <td
              class="el-col-20"
              colspan="3"
            >
                <div>
                   无
                </div> 
            </td>
          </tr>
          <tr>
            <td class="el-col-4">
              <div>标签</div>
            </td>
            <td
              class="el-col-20"
              colspan="3"
            >
                <div>
                  {{info.faceLabel}}
                </div> 
            </td>
          </tr>
          <tr>
            <td class="el-col-4">
              <div>备注</div>
            </td>
            <td
              class="el-col-20"
              colspan="3"
            >
                <div>
                  {{info.remark?info.remark:'无'}}
                </div> 
            </td>
          </tr>
          <tr class="image-box">
            <td class="el-col-4">
              <div>关联版本</div>
            </td>
            <td
              class="el-col-20"
              colspan="3"
            >
                <div>
                  <p v-for="item in info.edition" :key="item.editionId" style="margin-right:20px;">{{item.editionName}}</p>
                </div> 
            </td>
          </tr>
          <tr>
            <td class="el-col-4">
              <div>其他</div>
            </td>
            <td
              class="el-col-20"
              colspan="3"
            >
                <div>
                  <span v-for="item in info.otherLabel" :key="item.labelId" style="margin-right:20px;">{{item.labelName}}</span>
                </div> 
            </td>
          </tr>
          <tr>
            <td class="el-col-4">
              <div>季节</div>
            </td>
            <td class="el-col-8">
                <div>
                  <span v-for="item in info.season" :key="item.labelId" style="margin-right:20px;">{{item.labelName}}</span>
                </div> 
            </td>
            <td class="el-col-4">
              <div>脸型</div>
            </td>
            <td class="el-col-8">
                <div>
                  <span v-for="item in info.face" :key="item.labelId" style="margin-right:20px;">{{item.labelName}}</span>
                </div> 
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";
export default {
  data() {
    return {
      info:null,
    };
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$http({
        url: "/face/selectFeatureDetail",
        method: "POST",
        data: { faceId: this.$route.query.id }
      })
        .then(({ data }) => {
          console.log(data);
          this.info = data;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
  }
};
</script>
