<template>
    <div class="progress-box">
        <canvas :ref="classStr"></canvas>
    </div>
</template>
<script>
export default {
  props: {
    active:{
        type:Object,
        default(){
            return {
                outTop:false,
                outBottom:false,
                outLeft:false,
                outRight:false,
                inTop:false,
                inBottom:false,
                inLeft:false,
                inRight:false,
            }
        }
    },
    classStr:{
        type:String,
        default:'canvasProgress'
    }
  },
  data() {
    return {
        loading:false,
        disabled:false
    };
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    active: function(n,old) {
      this.init();
    }
  },
  mounted(){
      this.init();
  },
  methods: {
    getColor(str){
        if(str == undefined){
            return '#fff'
        }
        if(str){
            return '#65ACFC'
        }else{
            return '#999'
        }
    },
    init(){
        const canvas = this.$refs[this.classStr];
        const ctx = canvas.getContext('2d');
        canvas.width=100;
        canvas.height=100;
        /*第一个圆*/

        // 正面身体右
        ctx.beginPath();
        ctx.arc(50,50,40,Math.PI*3/2,Math.PI*2);
        ctx.lineTo(100,50);
        ctx.arc(50,50,50,Math.PI*2,Math.PI*3/2,true);
        ctx.closePath();
        ctx.fillStyle=this.getColor(this.active.outRight);
        ctx.fill();
        //正面身体后
        ctx.beginPath();
        ctx.moveTo(10,50);
        ctx.arc(50,50,40,Math.PI,Math.PI*3/2);
        ctx.lineTo(50,100);
        ctx.arc(50,50,50,Math.PI*3/2,Math.PI,true);
        ctx.closePath();
        ctx.fillStyle=this.getColor(this.active.outBottom);
        ctx.fill();
        //正面身体左
        ctx.beginPath();
        ctx.moveTo(10,50);
        ctx.arc(50,50,40,Math.PI,Math.PI/2,true);
        ctx.lineTo(50,100);
        ctx.arc(50,50,50,Math.PI/2,Math.PI);
        ctx.closePath();
        ctx.fillStyle=this.getColor(this.active.outLeft);
        ctx.fill();
        //正面身体前
        ctx.beginPath();
        ctx.moveTo(50,10);
        ctx.arc(50,50,40,Math.PI/2,0,true);
        ctx.lineTo(100,50);
        ctx.arc(50,50,50,0,Math.PI/2);
        ctx.closePath();
        ctx.fillStyle=this.getColor(this.active.outTop);
        ctx.fill();

        /*第二个圆*/
        //背面身体右
        ctx.beginPath();
        ctx.arc(50,50,20,Math.PI*3/2,Math.PI*2);
        ctx.lineTo(100,50);
        ctx.arc(50,50,30,Math.PI*2,Math.PI*3/2,true);
        ctx.closePath();
        ctx.fillStyle=this.getColor(this.active.inRight);
        ctx.fill();
        //背面身体后
        ctx.beginPath();
        ctx.moveTo(10,50);
        ctx.arc(50,50,20,Math.PI,Math.PI*3/2);
        ctx.lineTo(50,100);
        ctx.arc(50,50,30,Math.PI*3/2,Math.PI,true);
        ctx.closePath();
        ctx.fillStyle=this.getColor(this.active.inBottom);
        ctx.fill();
        //背面身体左
        ctx.beginPath();
        ctx.moveTo(10,50);
        ctx.arc(50,50,20,Math.PI,Math.PI/2,true);
        ctx.lineTo(50,100);
        ctx.arc(50,50,30,Math.PI/2,Math.PI);
        ctx.closePath();
        ctx.fillStyle=this.getColor(this.active.inLeft);
        ctx.fill();
        //背面身体前
        ctx.beginPath();
        ctx.moveTo(50,10);
        ctx.arc(50,50,20,Math.PI/2,0,true);
        ctx.lineTo(100,50);
        ctx.arc(50,50,30,0,Math.PI/2);
        ctx.closePath();
        ctx.fillStyle=this.getColor(this.active.inTop);
        ctx.fill();

        /*2个白色矩形*/
        ctx.beginPath();
        ctx.rect(47,0,6,100);
        ctx.closePath();
        ctx.fillStyle="white";
        ctx.fill();

        ctx.beginPath();
        ctx.rect(0,47,100,6);
        ctx.closePath();
        ctx.fillStyle="white";
        ctx.fill();
    },
    beforeUpload(){
      this.loading = true
    },
    imgsuccess(res, file, fileList, str) {
      this.$message.success("上传成功");
      var obj = {
          img:res.data,
          position:this.position
      }
      this.$emit('imgChange',obj)
      this.loading = false;
      this.disabled = true;
    },
    del(){
        this.$emit('imgdel',this.position);
        setTimeout(()=>{
            this.disabled = false;
        },100)
    }
  }
};
</script>
<style>
.progress-box{
  width:100px;
  height:100px;
  /* background-color: #65ACFC; */
  position:absolute;
  left:-120px;
  top:0;
  z-index:10;
  transform:rotate(45deg);
  -ms-transform:rotate(45deg);
  -moz-transform:rotate(45deg);
  -webkit-transform:rotate(45deg);
  -o-transform:rotate(45deg);
}
</style>


