<template >
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div
      class="panel-body"
      style="position:relative"
    >
      <div :style="boxStyle">
        <div
          class="body-box"
          :style="{width:width+'px',height:height+'px'}"
        >
          <div class="hair" v-for="item in hiarActive" :key="item.url" :style="{zIndex:item.top}">
            <img
              :src="item.url"
              alt=""
            >
          </div>
          <div class="face" v-for="item in faceActive" :key="item.url" :style="{zIndex:item.top}">
            <img
              :src="item.url"
              alt=""
            >
          </div>
          <div class="body">
            <img
              :src="side?bodyActive[0]:bodyActive[1]"
              alt=""
            >
          </div>
          <div class="cloth-footer">
            <img
              :src="side?clothFooter[0]:clothFooter[1]"
              alt=""
            >
          </div>
          <div
            class="cloth-top"
            v-for="item in upperActive"
            :key="item.url"
            :style="{zIndex:item.top}"
          >
            <img
              :src="item.url"
              alt=""
            >
          </div>
          <div
            class="cloth-top cloth-bottom"
            v-for="item in lowerActive"
            :key="item.url"
            :style="{zIndex:item.top}"
          >
            <img
              :src="item.url"
              alt=""
            >
          </div>
          <div
            class="btn-box"
            style="position:absolute;left:0;top:0"
          >
            <el-button @click="side=!side">旋转</el-button>
            <div style="margin-top:10px"></div>
            <el-button @click="enlarge">{{width==500?'查看原图':'返回'}}</el-button>
          </div>

        </div>
      </div>
      <div class="slect-box">
        <div>
          <div class="title">身体模型</div>
          <el-radio-group
            v-model="type"
            size="small"
            @change="typeChange"
          >
            <el-radio
              :label="2"
              border
            >胖</el-radio>
            <el-radio
              :label="1"
              border
            >标准</el-radio>
            <el-radio
              :label="0"
              border
            >瘦</el-radio>
          </el-radio-group>
          <div style="margin-top:10px"></div>
          <div class="title">发型</div>
          <div class="img-box1">
            <img
              @click="clickHair(item)"
              v-for="item in hiarList"
              style="width:70px;border:1px solid #ddd"
              :src="item.hairdoImage"
              :key="item.clothId"
              alt=""
            >
          </div>
          <div class="title">脸型</div>
          <div class="img-box1">
            <img
              @click="clickFace(item)"
              v-for="item in faceList"
              style="width:70px;border:1px solid #ddd"
              :src="item.faceImage"
              :key="item.faceId"
              alt=""
            >
          </div>
          <div class="title">上装</div>
          <div class="img-box1">
            <img
              @click="clickUpper(item)"
              v-for="item in clothUpper"
              style="width:70px;border:1px solid #ddd"
              :src="item.clothImage"
              :key="item.clothId"
              alt=""
            >
          </div>
          <div class="title">下装</div>
          <div class="img-box1">
            <img
              @click="clickLower(item)"
              v-for="item in clothLower"
              style="width:70px;border:1px solid #ddd"
              :src="item.clothImage"
              :key="item.clothId"
              alt=""
            >
          </div>
          <div class="title">套装</div>
          <div class="img-box1">
            <img
              @click="clickUpper(item)"
              v-for="item in clothSuit"
              style="width:70px;border:1px solid #ddd"
              :src="item.clothImage"
              :key="item.clothId"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle } from "components";

export default {
  data() {
    return {
      // msg: 'home page'
      form: {
        clothName: "",
        uploadDate: "",
        labelId: "",
        editionId: ""
      },
      fullHeight: document.documentElement.clientHeight,
      load_data: true,
      side: true,
      clothFooter: [
        "http://abc.asdaimeiye.com/other/0.png",
        "http://abc.asdaimeiye.com/other/1.png"
      ],
      face: null,
      hiar: null,
      upper: {},
      lower: {},
      clothUpper: [], //上装
      clothLower: [], //下装
      clothSuit: [], //套装
      hiarList: [],
      faceList: [],
      body: {
        fatBefore:
          "http://abc.asdaimeiye.com/img-original/ad/b9ca71c06cc74dd699f54a3eff584876.png",
        fatAfter:
          "http://abc.asdaimeiye.com/img-original/ad/d4a51fe77ad8418d86e47478974b7151.png",
        middleBefore:
          "http://abc.asdaimeiye.com/img-original/ad/660ab8b354214387892c31be66bd0358.png",
        middleAfter:
          "http://abc.asdaimeiye.com/img-original/ad/8687d1ba05774d559031bab7d3d656cc.png",
        maInBefore:
          "http://abc.asdaimeiye.com/img-original/ad/1bfcb547184840cea3a7555e2cc34f0d.png",
        maInAfter:
          "http://abc.asdaimeiye.com/img-original/ad/b3f121d9728448c3a4eb3839fe3c26f1.png"
      },
      width: 500,
      height: 700,
      scalc: 100,
      boxStyle: {},
      type: 1 //0瘦，1标准，2胖
    };
  },
  computed: {
    faceActive() {
      if(!this.face){
        return []
      }
      var arr = [];
      if(this.side){
        arr = [
          {
            url:this.face.faImaThinBefore,
            top:1500
          },
          {
            url:this.face.faImaThinAfter,
            top:500
          },
        ];
      }else{
        arr = [
          {
            url:"http://abc.asdaimeiye.com/img-original/face/c1859e303bae422180fb77173acacad9.png",
            top:1500
          }
        ]
      }
      return arr;
    },
    hiarActive() {
      if(!this.hiar){
        return []
      }
      var arr = [];
      if (this.side) {
        arr = [
          {
            url:this.hiar.haImaThinBefore,
            top:this.hiar.haHierarchy+1000
          },
          {
            url:this.hiar.haImaInBefore,
            top:0-this.hiar.haHierarchy+1000
          },
        ];
      }else{
        arr = [
          {
            url:this.hiar.haImaThinAfter,
            top:this.hiar.haHierarchy+1000
          },
          {
            url:this.hiar.haImaInAfter,
            top:0-this.hiar.haHierarchy+1000
          },
        ];
      }
      return arr;
    },
    bodyActive() {
      var arr = [];
      if (this.type == 0) {
        arr = [this.body.maInBefore, this.body.maInAfter];
      } else if (this.type == 1) {
        arr = [this.body.middleBefore, this.body.middleAfter];
      } else {
        arr = [this.body.fatBefore, this.body.fatAfter];
      }
      return arr;
    },
    upperActive() {
      if (JSON.stringify(this.upper) == '{}') {
        return []
      }
      var arr = [{},{}];
      arr[0].top = this.upper.cpacthTop+1000;
      arr[1].top = 0-this.upper.cpacthTop+1000;
      var type = 1;
      if(this.type == 0){
        type = 2
      }else if(this.type == 1){
        type = 1
      }else{
        type = 0
      }
      var side = Number(!this.side);
      arr[0].url = this.upper['p_'+type+'_'+side + '_0'];
      arr[1].url = this.upper['p_'+type+'_'+side + '_1'];
      return arr;
    },
    lowerActive() {
      if (JSON.stringify(this.lower) == '{}') {
        return []
      }
      var arr = [{},{}];
      arr[0].top = this.lower.cpacthTop+1000;
      arr[1].top = 0-this.lower.cpacthTop+1000;
      var side = Number(!this.side);
      var type = 1;
      if(this.type == 0){
        type = 2
      }else if(this.type == 1){
        type = 1
      }else{
        type = 0
      }
      arr[0].url = this.lower['p_'+type+'_'+side + '_0'];
      arr[1].url = this.lower['p_'+type+'_'+side + '_1'];
      return arr;
    }
  },
  created() {
    this.loadCloth();
  },
  methods: {
    changeBack() {
      this.isBefore = this.isBefore ? false : true;
      //  this.drawPic();
    },
    cF(labelId) {
      var form = {};
      form.curPage = 1;
      form.pageSize = 10000;
      // form.editionId = 70;
      form.labelId = labelId;
      return form;
    },
    loadCloth() {
      this.$http({
        url: "/hairdo/selectHairdo",
        method: "POST",
        data: {
          pageSize: 10000,
          curPage: 1
        }
      }).then(({ data }) => {
        console.log(data.rows);
        this.hiarList = data.rows;
      });
      this.$http({
        url: "/face/selectFeature",
        method: "POST",
        data: {
          pageSize: 10000,
          curPage: 1
        }
      })
        .then(({ data }) => {
          console.log(data.rows);
          this.faceList = data.rows;
        })
        .catch(() => {
          this.load_data = false;
        });
      this.$http({
        url: "/cloth/selectClothList",
        method: "POST",
        data: this.cF(48)
      })
        .then(({ data }) => {
          console.log(data.rows);
          this.clothLower = data.rows;
        })
        .catch(() => {
          this.load_data = false;
        });
      // form.labelId=49;
      this.$http({
        url: "/cloth/selectClothList",
        method: "POST",
        data: this.cF(49)
      })
        .then(({ data }) => {
          // console.log(data.rows)
          this.clothUpper = data.rows;
        })
        .catch(() => {
          this.load_data = false;
        });
      // form.labelId=50;
      this.$http({
        url: "/cloth/selectClothList",
        method: "POST",
        data: this.cF(50)
      })
        .then(({ data }) => {
          // console.log(data.rows)
          this.clothSuit = data.rows;
        })
        .catch(() => {
          this.load_data = false;
        });
      // form.labelId=51;
      // this.$http({
      //   url: "/cloth/selectClothList",
      //   method: 'POST',
      //   data:this.cF(51)
      // })
      // .then(({data}) => {
      //     // console.log(data.rows)
      //     this.clothes3=data.rows;
      // })
      // .catch(() => {
      //     this.load_data = false
      // })
    },
    clickUpper(item) {
      console.log(item);
      this.upper = item;
    },
    clickLower(item) {
      console.log(item);
      this.lower = item;
    },
    clickHair(item) {
      console.log(item);
      this.hiar = item;
    },
    clickFace(item) {
      console.log(item);
      this.face = item;
    },
    typeChange(val) {
      console.log(val);
    },
    enlarge() {
      if (this.width == 500) {
        this.width = 2000;
        this.height = 2800;
        this.boxStyle = {
          position: "fixed",
          overflow: "auto",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 10000
        };
      } else {
        this.width = 500;
        this.height = 700;
        this.boxStyle = {};
      }
    }
  },
  components: {
    panelTitle
  }
};
</script>
<style>
.body-box {
  height: 700px;
  width: 500px;
  position: relative;
  border: 1px solid #ccc;
  display: inline-block;
  z-index: 20;
  background: #fff;
}
.body-box img {
  width: 100%;
  display: block;
}
.hair {
  width: 30%;
  position: absolute;
  top: 0;
  left: 35%;
  z-index: 30;
}
.face {
  width: 15%;
  position: absolute;
  top: 7.5%;
  left: 42.5%;
  z-index: 20;
}
.body,.cloth-footer,.cloth-top,.cloth-bottom {
  width: 100%;
  position: absolute;
  top: 12.8%;
  z-index: 0;
}
.cloth-footer {
  z-index: 300;
}
.cloth-top {
  z-index: 400;
}
.cloth-bottom {
  z-index: 100;
}
.slect-box {
  position: absolute;
  top: 20px;
  left: 550px;
  height: 700px;
  overflow: auto;
}
.slect-box .title {
  color: #fff;
  display: inline-block;
  background: #00f;
  padding: 8px 20px;
}
</style>

