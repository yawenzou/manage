<template>
    <div class="panel">
        <panel-title :title="$route.meta.title">
            <el-button type="primary" @click="$router.go(-1)" >返回</el-button>
        </panel-title>
    <div class="panel-body">
        <div class="detail-container">
            <div class="table-title"> <i class="fa fa-bookmark" aria-hidden="true"></i> 基本信息</div>
            <table class="common-table" v-if="info">
                <tr>
                    <td colspan="1" width="16.67%">ID</td>
                    <td colspan="2" width="33.33%">{{info.advertId}}</td>
                    <td colspan="1" width="16.67%">广告名称</td>
                    <td colspan="2">{{info.advertName}}</td>
                </tr>
                <tr>
                    <td colspan="1">权重</td>
                    <td colspan="2">{{info.weight}}</td>
                    <td colspan="1">状态</td>
                    <td colspan="2">
                      {{info.isShow==0 ? '显示' : '不显示'}}
                    </td>
                </tr>
                <tr>
                    <td colspan="1">有效期</td>
                    <td colspan="5">
                      <p>开始：{{$dateFormat(info.advertStartTime)}}</p>
                      <p>到期：{{$dateFormat(info.advertStopTime)}}</p>
                    </td>
                </tr>
                <tr>
                    <td colspan="1">展示位置</td>
                    <td colspan="5">{{position[info.advertSeat]}}</td>
                </tr>
                <tr>
                    <td colspan="1">内容</td>
                    <td colspan="5">
                        <video v-if="info.advertType == 1" width="100"  style="width:100px;padding: 10px;z-index:1000"  controls>
                            <source :src="info.advertImag" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <img v-else :src="info.advertImag" style="width:100px;padding: 10px;"  @click="details(info.advertImag)" >
                    </td>
                </tr>
                <tr>
                    <td colspan="1">广告链接</td>
                    <td colspan="5">{{info.advertLink}}</td>
                </tr>
                <tr>
                    <td colspan="1">标签</td>
                    <td colspan="5">{{info.advertLabel}}</td>
                </tr>
                <tr>
                    <td colspan="1">关联版本</td>
                    <td colspan="5">
                      <p v-for="(value, index) in info.offLine" :key="index+1">{{value.editionName}}</p>
                      <p v-for="(value, index) in info.onLine" :key="index+1">{{value.editionName}}</p>
                    </td>
                </tr>
            </table>
            <div class="table-title"> <i class="fa fa-bookmark" aria-hidden="true"></i> 其他信息</div>
            <table class="common-table" v-if="info">
                <tr>
                    <td colspan="1" width="16.67%">创建时间</td>
                    <td colspan="2" width="33.33%">{{$dateFormat(info.advertCreated)}}</td>
                    <td colspan="1" width="16.67%">创建人</td>
                    <td colspan="2"></td>
                </tr>
                <tr>
                    <td colspan="1">最近操作时间</td>
                    <td colspan="2">{{$dateFormat(info.advertUpdated)}}</td>
                    <td colspan="1">操作人</td>
                    <td colspan="2"></td>
                </tr>
            </table>
        </div>
        
    </div>
    <el-dialog
        title= "预览大图"
        width= "50%"
        :visible.sync= "isBigImg"
        @close = "closeImg"
    >
        <img :src="showImg" alt="大图" style="width: 100%;" />
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import { panelTitle} from "components";
export default {
  data() {
    return {
      info:null,
      position: {
          1: '待机全屏页',
          2: '试穿页广告位1',
          3: '试穿页广告位2'
      },
      isBigImg: false,
      showImg: ''
    };
  },
  components: {
    panelTitle
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.$http({
        url: "advert/quertDetail",
        method: "POST",
        data: { advertId: this.$route.query.id }
      })
        .then(({ data }) => {
          console.log(data);
          this.info = data.advertDetail;
        })
        .catch(() => {
        });
    },
    //查看大图
    details(img) {
        this.isBigImg = true;
        this.showImg= img;
    },
    //关闭预览
    closeImg() {
        this.isBigImg = false;
        this.showImg = "";
    },
  }
};
</script>

