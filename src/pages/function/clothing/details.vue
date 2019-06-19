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
              <div>{{info.clothId}}</div>
            </td>
            <td class="el-col-4">
              <div>货号</div>
            </td>
            <td class="el-col-8">
              <div>{{info.clothNum}}</div>
            </td>
          </tr>
          <tr>
            <td class="el-col-4">
              <div>日期</div>
            </td>
            <td class="el-col-8">
              <div>{{$dateFormat(parseInt(info.clothUpdated),"yyyy-MM-dd hh:mm:ss")}}</div>
            </td>
            <td class="el-col-4">
              <div>服装名称</div>
            </td>
            <td class="el-col-8">
              <div>{{info.clothName}}</div>
            </td>
          </tr>
          <tr>
            <td class="el-col-4">
              <div>分类</div>
            </td>
            <td class="el-col-20" colspan="3">
              <div>{{info.clothTypeName[0].labelName}}</div>
            </td>
          </tr>
          <tr class="image-box">
            <td class="el-col-4">
              <div>服装封面</div>
            </td>
            <td class="el-col-20" colspan="3">
                <div>
                    <img style="height:80px;" :src="info.clothImage" alt="">
                </div> 
            </td>
          </tr>
          <tr class="image-box">
            <td class="el-col-4">
              <div>面片丰满（亮面）</div>
            </td>
            <td class="el-col-20" colspan="3">
                <div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.fatImage['0_0']" alt="">
                    <p class="mt-10">前</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.fatImage['0_1']" alt="">
                    <p class="mt-10">后</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.fatImage['0_2']" alt="">
                    <p class="mt-10">左</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.fatImage['0_3']" alt="">
                    <p class="mt-10">右</p>
                  </div>
                </div> 
            </td>
          </tr>
          <tr class="image-box">
            <td class="el-col-4">
              <div>面片丰满（暗面）</div>
            </td>
            <td class="el-col-20" colspan="3">
                <div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.fatImage['1_0']" alt="">
                    <p class="mt-10">前</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.fatImage['1_1']" alt="">
                    <p class="mt-10">后</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.fatImage['1_2']" alt="">
                    <p class="mt-10">左</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.fatImage['1_3']" alt="">
                    <p class="mt-10">右</p>
                  </div>
                </div> 
            </td>
          </tr>
          <tr class="image-box">
            <td class="el-col-4">
              <div>面片适中（亮面）</div>
            </td>
            <td class="el-col-20" colspan="3">
                <div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.middeImage['0_0']" alt="">
                    <p class="mt-10">前</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.middeImage['0_1']" alt="">
                    <p class="mt-10">后</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.middeImage['0_2']" alt="">
                    <p class="mt-10">左</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.middeImage['0_3']" alt="">
                    <p class="mt-10">右</p>
                  </div>
                </div> 
            </td>
          </tr>
          <tr class="image-box">
            <td class="el-col-4">
              <div>面片适中（暗面）</div>
            </td>
            <td class="el-col-20" colspan="3">
                <div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.middeImage['1_0']" alt="">
                    <p class="mt-10">前</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.middeImage['1_1']" alt="">
                    <p class="mt-10">后</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.middeImage['1_2']" alt="">
                    <p class="mt-10">左</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.middeImage['1_3']" alt="">
                    <p class="mt-10">右</p>
                  </div>
                </div> 
            </td>
          </tr>
          <tr class="image-box">
            <td class="el-col-4">
              <div>面片窈窕（亮面）</div>
            </td>
            <td class="el-col-20" colspan="3">
                <div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.thinImage['0_0']" alt="">
                    <p class="mt-10">前</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.thinImage['0_1']" alt="">
                    <p class="mt-10">后</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.thinImage['0_2']" alt="">
                    <p class="mt-10">左</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.thinImage['0_3']" alt="">
                    <p class="mt-10">右</p>
                  </div>
                </div> 
            </td>
          </tr>
          <tr class="image-box">
            <td class="el-col-4">
              <div>面片窈窕（暗面）</div>
            </td>
            <td class="el-col-20" colspan="3">
                <div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.thinImage['1_0']" alt="">
                    <p class="mt-10">前</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.thinImage['1_1']" alt="">
                    <p class="mt-10">后</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.thinImage['1_2']" alt="">
                    <p class="mt-10">左</p>
                  </div>
                  <div class="td-inline-block">
                    <img style="height:80px;" :src="info.thinImage['1_3']" alt="">
                    <p class="mt-10">右</p>
                  </div>
                </div> 
            </td>
          </tr>
          <tr>
            <td class="el-col-4">
              <div>边缘点位</div>
            </td>
            <td class="el-col-20" colspan="3">
                <div>
                   无
                </div> 
            </td>
          </tr>
          <tr>
            <td class="el-col-4">
              <div>货品链接</div>
            </td>
            <td class="el-col-20" colspan="3">
                <div>
                  {{info.cgoodsImage}}
                </div> 
            </td>
          </tr>
          <tr>
            <td class="el-col-4">
              <div>标签</div>
            </td>
            <td class="el-col-20" colspan="3">
                <div>
                  {{info.label}}
                </div> 
            </td>
          </tr>
          <tr>
            <td class="el-col-4">
              <div>备注</div>
            </td>
            <td class="el-col-20" colspan="3">
                <div>
                  {{info.remark?info.remark:'无'}}
                </div> 
            </td>
          </tr>
          <tr class="image-box">
            <td class="el-col-4">
              <div>关联版本</div>
            </td>
            <td class="el-col-20" colspan="3">
                <div>
                  <span v-for="item in info.edition" :key="item.editionId" style="margin-right:20px;">{{item.editionName}}</span>
                </div> 
            </td>
          </tr>
          <tr>
            <td class="el-col-4">
              <div>其他</div>
            </td>
            <td class="el-col-20" colspan="3">
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
        url: "/cloth/queryClothDetail",
        method: "POST",
        data: { clothId: this.$route.query.id }
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
<style>
.td-inline-block{
  display:inline-block;
  margin-right:20px;
  text-align:center;
}
.mt-10{
  margin-top:10px;
}
</style>

