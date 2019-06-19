<template>
  <div class="point-dialog">
    <el-dialog
      title="边缘点位"
      :visible.sync="dialogMsg.dialog"
      :close-on-click-modal="false"
      width="100%"
      :fullscreen="true"
      :modal="false"
      top="0"
      @open="open"
      center
      style="width:100%;height:100%;position: fixed;top:0;left:0"
    >
      <div style="overflow: auto;height:600px;display: inline-block;position: relative;">
        <canvas
          style="border:1px solid black;display: block"
          id="myCanvas"
          @click="drawPoint"
          @mousedown="mousedown"
          @mousemove="mousemove"
          @mouseup="mouseup"
        ></canvas>
        <img
          :src="dialogMsg.url"
          class="img-1"
        >
        <div
          class="btn-box"
          style="position: fixed;right:100px;top:100px"
        >
          <el-button type="default">{{points1.length}}</el-button>
          <el-button
            type="danger"
            @click="back"
          >回退</el-button>
          <el-button
            type="primary"
            @click="addSave"
          >保 存</el-button>
          <div style="margin:20px 0;">
            <el-select
              v-model="faceId"
              placeholder="选择插入脸型"
              @change="faceChange"
            >
              <el-option
                v-for="item in faceList"
                :label="item.faceName"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </div>
          <el-button
            icon="plus"
            type="primary"
            @click="scale=parseFloat((scale+0.1).toFixed(1))"
          ></el-button>
          <el-button type="default">{{parseInt(scale*100)}}%</el-button>
          <el-button
            icon="minus"
            type="primary"
            @click="scale=parseFloat((scale-0.1).toFixed(1))"
          ></el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import { mapState } from "vuex";
export default {
  props: {
    dialogMsg: {
      type: Object //传入的类型
    }
  },
  watch: {
    // dialogMsg:{
    //        immediate: true,    // 这句重要
    //        handler:function(val,old){
    //            console.log(val);
    //            if(val.dialog){
    //            	this.$nextTick(() => {
    // 		       this.darwImg(val);
    // 		       this.points = val.points;
    // 		       this.darw(val.points);
    // 		    });
    //            }
    //        }
    //    },
    points: {
      immediate: true, // 这句重要
      handler: function(val, old) {
        var _this = this;
        if (this.dialogMsg.dialog) {
          this.darwImg(this.dialogMsg);
          this.darw(val);
        }
        var arr = [];
        val.forEach(function(item) {
          arr.push({
            x: parseFloat((item.x / _this.scale).toFixed(2)),
            y: parseFloat((item.y / _this.scale).toFixed(2))
          });
        });
        this.points1 = arr;
      }
    },
    scale: {
      handler: function(val, old) {
        var _this = this;
        var scale = parseFloat(val.toFixed(1));
        this.scale = scale;
        this.darwImg(this.dialogMsg);
        var points = JSON.parse(JSON.stringify(this.points1));
        points.forEach(function(item, i) {
          item.x = parseFloat((item.x * scale).toFixed(2));
          item.y = parseFloat((item.y * scale).toFixed(2));
        });
        this.points = points;
        // this.darw(points);
      }
    }
  },
  data() {
    return {
      points: [],
      move: false,
      click: true,
      index: null,
      faceList: [],
      faceId: null,
      scale: 1,
      points1: [],
      imgData: null,
      wh: {
        width: 100,
        height: 100
      }
    };
  },
  methods: {
    open() {
      console.log(this.$route);
      this.$nextTick(() => {
        this.init();
        this.scale = 1;
      });
    },
    init() {
      var arr = [];
      this.dialogMsg.points.forEach(function(item, i) {
        arr.push({
          x: item.position[0],
          y: item.position[1]
        });
      });
      this.points = arr;
      this.$http({
        url: "/face/selectFeature",
        method: "POST",
        data: { curPage: 1, pageSize: 100 }
      })
        .then(({ data }) => {
          var arr = [];
          data.rows.forEach(function(item) {
            arr.push({
              faceName: item.faceName,
              points: item.faceSpraced,
              id: item.faceId
            });
          });
          this.faceList = arr;
        })
        .catch(() => {});
    },
    faceChange(val) {
      var _this = this;
      this.faceList.forEach(function(item) {
        if (item.id == val) {
          var points = JSON.parse(item.points);
          var arr = [];
          points.forEach(function(item, i) {
            arr.push({
              x: item.position[0],
              y: item.position[1]
            });
          });
          if (_this.$route.name == "hairstyle") {
            arr.forEach(function(item) {
              item.x += 146;
              item.y += 186.5;
            });
          }
          _this.points = arr;
          return;
        }
      });
      console.log(val);
    },
    getCTX() {
      var c = document.getElementById("myCanvas");
      let ctx = c.getContext("2d");
      return ctx;
    },
    darw(val) {
      if (val.length == 0) {
        return;
      }
      let _this = this;
      let ctx = this.getCTX();
      let len = val.length;
      // ctx.fillStyle="#0000FF";
      ctx.strokeStyle = "#0000FF";
      ctx.lineWidth = 1;
      //绘制成矩形
      val.forEach(function(item, i) {
        ctx.rect(item.x - 4, item.y - 4, 8, 8);
        ctx.stroke();
        if (i < len - 1) {
          _this.draw_line(ctx, item, val[i + 1]);
        }
      });
    },
    darwImg(val) {
      var _this = this;
      var c = document.getElementById("myCanvas");
      var img = new Image();
      img.src = val.url;
      // img.onload=function(){
      c.width = img.width * _this.scale;
      c.height = img.height * _this.scale;
      var ctx = c.getContext("2d");
      ctx.drawImage(
        img,
        0,
        0,
        img.width * _this.scale,
        img.height * _this.scale
      );
      // if(!_this.imgData){
      // _this.imgData=ctx.getImageData(0,0,img.width*_this.scale,img.height*_this.scale);
      // console.log(_this.imgData);
      // }
      // }
    },
    drawPoint(point) {
      if (!this.click) {
        return;
      }
      var ctx = this.getCTX();
      this.points.push({ x: point.offsetX, y: point.offsetY });
    },
    mousedown(point) {
      var ctx = this.getCTX();
      if (ctx.isPointInPath(point.offsetX, point.offsetY)) {
        this.move = true;
        this.click = false;
        this.getIndex(point.offsetX, point.offsetY);
      }
      console.log(ctx.isPointInPath(point.offsetX, point.offsetY));
      console.log(point.offsetX, point.offsetY);
    },
    getIndex(x, y) {
      var _this = this;
      this.points.forEach(function(item, i) {
        if (
          x >= item.x - 4 &&
          x <= item.x + 4 &&
          y >= item.y - 4 &&
          y <= item.y + 4
        ) {
          _this.index = i;
          return;
        }
      });
    },
    mousemove(e) {
      if (!this.move) {
        return;
      }
      console.log(this.index);
      var points = JSON.parse(JSON.stringify(this.points));
      points[this.index] = { x: e.offsetX, y: e.offsetY };
      this.points = points;
    },
    mouseup(e) {
      if (!this.move) {
        return;
      }
      var _this = this;
      var points = JSON.parse(JSON.stringify(this.points));
      points[this.index] = { x: e.offsetX, y: e.offsetY };
      this.points = points;
      this.move = false;
      setTimeout(function() {
        _this.click = true;
      }, 100);
    },
    back() {
      if (this.points.length < 1) {
        return;
      }
      this.points.pop();
    },
    draw_line(ctx, a, b) {
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
    },
    addSave() {
      var points = this.points1;
      var arr = [];
      points.forEach(function(item, i) {
        arr.push({
          number: i,
          position: [item.x, item.y]
        });
      });
      this.$emit("test1", arr);
      this.dialogMsg.dialog = false;
    },
    dialogFlase() {}
  }
};
</script>
<style type="text/css">
.point-dialog .el-dialog--small {
  width: 100%;
  top: 0;
  height: 100%;
  margin-bottom: 0;
}
.point-dialog .el-dialog__footer {
  text-align: center;
}
.img-1 {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>