<template>
	<div class="point-dialog">
		<el-dialog
	      title="边缘点位"
	      :visible.sync="dialogMsg.dialog"
	      center
		  @open="open"
	      style="width:100%;height:100%;position: fixed;top:0;left:0">
	      	<div style="overflow: auto;height:600px;display: inline-block;position: relative;">
	      		<canvas style="border:1px solid black;display: block" id="myCanvas"  width="1080" height="1512"></canvas>
	      	</div>
	    </el-dialog>
    </div>
</template>
<script type="text/javascript">
	import { mapState } from 'vuex'
	export default{
		props:{
			dialogMsg: {
		        type: Object    //传入的类型
			},
			addForm:{
				type: Object    //传入的类型
			}
		},
		watch:{
			dialogMsg:{
		        immediate: true,    // 这句重要
		        handler:function(val,old){
		            console.log(val);
		        }
			},
			addForm:{
		        immediate: true,    // 这句重要
		        handler:function(val,old){
		            console.log(val);
		        }
		    },
		},
	    data(){
	      return {
	      	points:[],
	      	move:false,
	      	click:true,
	      	index:null,
	      	faceList:[], 
	      	faceId:null,
	      	scale:1,
	      	points1:[],
	      	imgData:null,
	      	wh:{
	      		width:100,
	      		height:100
	      	},
	      	fullImagePoint:[],
	      	startPoint:{},
	      	path:[],
	      	pointSorts:[],
	      }
	    },
	    methods: {
			open(){
				console.log(this.addForm)
				var canvas=document.getElementById("myCanvas");
				var ctx=canvas.getContext("2d");
				var newImg = new Image();
				newImg.src=this.addForm.clImaThinBefore;
				ctx.drawImage(newImg,0,0);
				var arr = ctx.getImageData(0,0,1080,1512);
				debugger
				var data = arr.data;
				console.log(arr);
				for(var i=3;i<data.length;i+=4){
					if(data[i-3]==0&&data[i-2]==0&&data[i-1]==0){
						data[i]=0
					}
				}
				console.log(arr);
				ctx.putImageData(arr,0,0);

			}
		}
	}
</script>
<style type="text/css">
	.point-dialog .el-dialog--small{
		width: 100%;
		top:0;
		height:100%;
		margin-bottom:0;
	}
	.point-dialog .el-dialog__footer{
		text-align: center;
	}
	.img-1{
		position: absolute;
		top:0;
		left:0;
		z-index:-1;
		opacity: 0;
	}
	.point-rect{
		width: 4px;
		height:4px;
		border: 1px solid #f00;
	}
</style>