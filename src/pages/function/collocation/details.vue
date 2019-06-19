<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button
        type="primary"
        @click="$router.go(-1)"
      >返回</el-button>
    </panel-title>
    <div class="panel-body" v-if="info">
      <div>
        <div class="title-table">
          <div class="float-left">
            基本信息
          </div>
        </div>
        <table class="details-table">
          <tr>
            <td class="el-col-4">
              <div>ID</div>
            </td>
            <td class="el-col-8">
              <div>{{info.collocatBasis.collocaId}}</div>
            </td>
            <td class="el-col-4">
              <div>搭配名称</div>
            </td>
            <td class="el-col-8">
              <div>{{info.collocatBasis.collocaName}}</div>
            </td>
          </tr>
          <tr>
            <td class="el-col-4">
              <div>日期</div>
            </td>
            <td
              class="el-col-20"
              colspan="3"
            >
              <div>{{$dateFormat(parseInt(info.collocatBasis.collocaCreated),"yyyy-MM-dd hh:mm:ss")}}</div>
            </td>
          </tr>
          <tr class="image-box">
            <td class="el-col-4">
              <div>搭配封面</div>
            </td>
            <td
              class="el-col-20"
              colspan="3"
            >
              <div>
                <img
                  style="height:80px;margin-left:20px;"
                  :src="info.collocatBasis.collocaImage"
                  alt=""
                >
              </div>
            </td>
          </tr>
        </table>
        <div class="title-table">
          <div class="float-left">
            搭配信息
          </div>
        </div>
        <table class="details-table">
          <tr>
            <td class="el-col-4">
              <div>搭配类型</div>
            </td>
            <td class="el-col-4">
              <div>
                id
              </div>
            </td>
            <td class="el-col-4" style="text-align:left;background:#fff">
              <div>
                封面
              </div>
            </td>
            <td class="el-col-8">
              <div>
                名称
              </div>
            </td>
            <td class="el-col-4">
              <div>
                层级
              </div>
            </td>
          </tr>
          <tr
            v-for="(item,index) in info.collocatInformat"
            :key="index"
          >
            <td class="el-col-4">
              <div>{{item.crType==1?'发型':'服装'}}</div>
            </td>
            <td class="el-col-4">
              <div>
                {{item.relevanId}}
              </div>
            </td>
            <td class="el-col-4" style="text-align:left;background:#fff">
              <div>
                <img style="width:100px" :src="item.relevanImage" alt="">
              </div>
            </td>
            <td class="el-col-8">
              <div>
                {{item.relevanName}}
              </div>
            </td>
            <td class="el-col-4">
              <div>
                {{item.crHierarchy}}
              </div>
            </td>
          </tr>
        </table>
        <div class="title-table">
          <div class="float-left">
            关联信息
          </div>
        </div>
        <table class="details-table">
          <tr>
            <td class="el-col-4">
              <div>备注</div>
            </td>
            <td
              class="el-col-20"
              colspan="3"
            >
              <div>
                {{info.collocatAssociated.remark?info.remark:'无'}}
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
                <span
                  v-for="item in info.collocatAssociated.editionDOList"
                  :key="item.editionId"
                  style="margin-right:20px;"
                >{{item.editionName}}</span>
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
                <span
                  v-for="item in info.collocatAssociated.otherLabel"
                  :key="item.labelId"
                  style="margin-right:20px;"
                >{{item.labelName}}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td class="el-col-4">
              <div>季节</div>
            </td>
            <td class="el-col-8">
              <div>
                <span
                  v-for="item in info.collocatAssociated.season"
                  :key="item.labelId"
                  style="margin-right:20px;"
                >{{item.labelName}}</span>
              </div>
            </td>
            <td class="el-col-4">
              <div>脸型</div>
            </td>
            <td class="el-col-8">
              <div>
                <span
                  v-for="item in info.collocatAssociated.face"
                  :key="item.labelId"
                  style="margin-right:20px;"
                >{{item.labelName}}</span>
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
      info: null
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
        url: "/collocat/selectCollocatDetail",
        method: "POST",
        data: { collocaId: this.$route.query.id }
      })
        .then(({ data }) => {
          console.log(data);
          this.info = data;
        })
        .catch(() => {
          this.load_data = false;
        });
    }
  }
};
</script>
