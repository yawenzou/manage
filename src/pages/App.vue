<template>
  <div class="view-page">
    <left-slide></left-slide>
    <main-content>
      <router-view></router-view>
    </main-content>
  </div>
</template>
<script type="text/javascript"> 
String.prototype.getBytesLength = function() {   
    var totalLength = 0;     
    var charCode;  
    for (var i = 0; i < this.length; i++) {  
        charCode = this.charCodeAt(i);  
        if (charCode < 0x007f)  {     
            totalLength++;     
        } else if ((0x0080 <= charCode) && (charCode <= 0x07ff))  {     
            totalLength += 2;     
        } else if ((0x0800 <= charCode) && (charCode <= 0xffff))  {     
            totalLength += 3;   
        } else{  
            totalLength += 4;   
        }          
    }  
    return totalLength;   
}
import { mainContent, leftSlide } from "components";
export default {
  name: "page",
  components: {
    mainContent,
    leftSlide
  },
  data(){
    return {
      clothList:[
        {"labelId":47,"labelName":"内衣"},
        {"labelId":48,"labelName":"下装"},
        {"labelId":49,"labelName":"上装"},
        {"labelId":50,"labelName":"外套"},
        {"labelId":51,"labelName":"套装"},
      ],
      hiarList:[
        {"labelId":52,"labelName":"中长发"},
        {"labelId":53,"labelName":"长发"},
        {"labelId":54,"labelName":"短发"}
      ],
      faceList:[{"labelId":7,"labelName":"正方形1"},{"labelId":8,"labelName":"三角形2"},{"labelId":9,"labelName":"oval: 椭圆"},{"labelId":10,"labelName":"heart: 心形"},{"labelId":11,"labelName":"round: 圆形"}],
      seasonList:[{"labelId":12,"labelName":"春"},{"labelId":13,"labelName":"夏"},{"labelId":14,"labelName":"秋"},{"labelId":15,"labelName":"冬"}],
      faceList1:[{"labelId":16,"labelName":"正方形"},{"labelId":17,"labelName":"三角形"},{"labelId":18,"labelName":"椭圆"},{"labelId":19,"labelName":"心形"},{"labelId":20,"labelName":"圆形"}],
      otherList:[{"labelId":33,"labelName":"100-109"},{"labelId":34,"labelName":"110-119"},{"labelId":35,"labelName":"120-129"},{"labelId":36,"labelName":"130-139"},{"labelId":37,"labelName":"140-149"},{"labelId":38,"labelName":"150-159"},{"labelId":39,"labelName":"160-169"},{"labelId":40,"labelName":"170-179"},{"labelId":41,"labelName":"180-189"},{"labelId":42,"labelName":"190-199"}],
      ageList:[
        {"labelId":21,"labelName":"5-15"},
        {"labelId":22,"labelName":"16-25"},
        {"labelId":23,"labelName":"26-35"},
        {"labelId":24,"labelName":"36-45"},
        {"labelId":25,"labelName":"46-55"},
        {"labelId":26,"labelName":"56-65"},
        {"labelId":27,"labelName":"66-75"},
        {"labelId":28,"labelName":"76-85"},
        {"labelId":29,"labelName":"86-95"}
      ],
      colorList:[{"labelId":30,"labelName":"黄种人"},{"labelId":31,"labelName":"黑人"},{"labelId":32,"labelName":"白人"}]
    }
  },
  created() {
    this.$store.commit("SET_clothingList", this.clothList);
    this.$store.commit("SET_hairstyleList", this.hiarList);
    this.$store.commit("SET_faceClassificationList", this.faceList);
    this.$store.commit("SET_seasonList", this.seasonList);
    this.$store.commit("SET_faceList", this.faceList1);
    this.$store.commit("SET_otherList", this.otherList);
    this.$store.commit("SET_ageList", this.ageList);
    this.$store.commit("SET_colorList", this.colorList);
    // this.$http({
    //   url: "/power/list",
    //   method: "POST",
    //   data: {}
    // })
    // .then(({ data }) => {
    //   //debugger
    //   this.$store.commit("SET_powerList", data);
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  },
  methods: {}
};
</script>
<style>
.select-ele {
  margin-bottom: 20px;
}
.title-table {
  overflow: hidden;
  padding-bottom: 10px;
}
.float-left {
  float: left;
  font-weight: bold;
}
.float-right {
  float: right;
}
.imgFile {
  min-width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  line-height: 1;
  cursor: pointer;
  display: inline-block;
}
.p1 {
  font-size: 22px;
  line-height: 1;
  padding-top: 20px;
  margin-bottom: 5px;
}
.p2 {
  font-size: 14px;
}
.img-box {
  width: 80px;
  padding: 10px;
  position: relative;
}
.img-box img {
  height: 80px;
}
.img-box .text{
  position: absolute;
  line-height:30px;
  height:30px;
  bottom:0;
  left:0;
  width:100%;
  text-align:center;
  color:#fff;
  background: rgba(0,0,0,.4);
}
.img-box .del{
  position:absolute;
  top:0;
  right:0;
  width:20px;
  height:20px;
  text-align:center;
  line-height: 20px;
  font-size:20px;
  color:#fff;
  background: red;
  border-radius: 50%;

}
.list {
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  line-height: 60px;
  margin-bottom: 20px;
}
.list-item-1 {
  padding-right: 20px;
  text-align: right;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background: #eee;
}
.list-item-2 {
  padding-left: 20px;
  text-align: left;
  background: #fff;
}
.details-table{
  width:100%;
  border-spacing:0;
  border-top:1px solid #ddd;
  border-left:1px solid #ddd;
  margin-bottom: 20px;
}
.details-table td{
  border-right:1px solid #ddd;
  border-bottom:1px solid #ddd;
  float:none;
}
.details-table td>div{
  padding:20px;
}
.details-table td:first-child,.details-table td:nth-child(3){
  background: #f7f7f7;
  text-align:right;
}
.details-table tr .el-col-10{
  background:#fff;
  text-align:left;
}
.el-button--info{
  background-color: #409eff;
  border-color: #409eff;
}
.el-button--info:active, .el-button--info:focus, .el-button--info:hover{
  background-color: #409eff;
  border-color: #409eff;
}
</style>
