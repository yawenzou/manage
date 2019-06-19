<template>
	<div class="panel">
	    <div class="panel-body">
	    	<el-form ref="addForm" :model="addForm" label-width="160px">
		        <el-form-item label="上传正面面片:" prop="clImaThinBefore"
	      			:rules="{required: true, message: '身体前1面片不能为空', trigger: 'change'}">
	      			<div class="imgFile">
								<el-upload
									action="/picUpload/clothes"
									accept="image/*"
									:http-request	="httpRequest"
									:show-file-list="false">
										<div v-if="!addForm.clImaThinBefore">
										<svg viewBox="64 64 896 896" class="p1" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M848 474H550V152h-76v322H176c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h298v322h76V550h298c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
													<p class="p2">身体前1</p>
									</div>
									<div class="img-box" v-if="addForm.clImaThinBefore">
										<img :src="addForm.clImaThinBefore">
									</div>
								</el-upload>
							</div>
	      		</el-form-item>
		        <el-form-item label="边缘点位:" prop="clothExtend" 
		          	:rules="{type:'array',required: true, message: '边缘点位不能为空', trigger: 'blur'}">
		            <el-button type="primary" @click="dialogPoint">编辑点位</el-button>
		            <span>已标注({{addForm.clothExtend.length}})</span>
		        </el-form-item>
						<el-form-item label="测试key:" v-for="(item,index) in arr" :key="item">
		          	<el-input placeholder="请填写广告链接"></el-input>
								<el-button type="primary" @click="del(item,index)" >删除</el-button>
		        </el-form-item>
	        </el-form>
		    <point-test :addForm="addForm" :dialogMsg="dialogMsg1" @test1="dialogChange"></point-test>
	    </div>
    </div>
</template>
<script type="text/javascript">
	import { mapState } from 'vuex'
	import {pointTest} from 'components'
	const OSS = require('ali-oss');
  import base64 from 'js-base64'
	export default{
		components: {
		  pointTest
		},
	    data(){
	      return {
	      	addForm:{
						clImaThinBefore:'',//正面1
						clothExtend:[],
						arr:[11,22,33,44]
					},
					imgfileName:'',
					dialogMsg1:{
						width:500,
						height:500,
						dialog:false,
						imgUrl:''
					},
					arr:[11,22,33,44]
	      }
	    },
	    created(){
	    	
	    },
	    methods: {
				del(item,index){
					this.arr.splice(index,1);
					console.log(this.arr);
				},
	    	dialogChange(val){
	    		this.addForm.clothExtend = val;
	    	},
	    	dialogPoint(){
	    		// if(!this.addForm.clImaThinBefore){
	    		// 	this.$message.error('请先上传照片');
	    		// 	return
	    		// }
	    		// var _this = this;
				// var img = new Image();
				// img.src = this.addForm.clImaThinBefore;
				// _this.dialogMsg1 = {
				//     url:_this.addForm.clImaThinBefore,
				//     dialog:true,
				//     points:this.addForm.clothExtend,
				// }
				this.dialogMsg1.dialog = true;
	    	},
	    	addSave(){

				},
				getUuid(){
        var len=32;//32长度
        var radix=16;//16进制
        var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');var uuid=[],i;radix=radix||chars.length;if(len){for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';uuid[14]='4';for(i=0;i<36;i++){if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[(i==19)?(r&0x3)|0x8:r];}}}
        return uuid.join('');
      },
				httpRequest(data1){
					debugger
					this.$http({
						url: "/webtest/util/sts",
						method: "POST",
						data:{}
					})
					.then(({ data }) => {
						var client = new OSS.Wrapper({
							accessKeyId: data.accessKey,
							accessKeySecret: data.accessKeySecret,
							stsToken: data.securityToken,
							bucket:'asdimg',
							endpoint:'https://oss-cn-hangzhou.aliyuncs.com'
						});
						var file =data1.file;
						let suffix = file.name.split('.')[file.name.split('.').length - 1]
						var filename = this.getUuid() +'.'+ suffix;
						// var xV = base64.Base64.encode(new Buffer(JSON.stringify({
						// 	"x:fullName":file.name,
						// })));
						client.initMultipartUpload(filename)
						.then((res)=>{
							// var tempCheckpoint = {
							// 	doneParts:[],
							// 	file:file,
							// 	fileSize:file.size,
							// 	name:filename,
							// 	partSize:1024000,
							// 	uploadId:res.uploadId
							// };
							console.log(res)
							client.multipartUpload(filename, file)
							.then((results) => {
									console.log(results);
							}).catch((err) => {
									console.log(err)
							});
						})
					})
					.catch(() => {
						this.load_data = false;
					});	
				},
	    	imgBefore(file){
	    		var r = new FileReader();
	    		var imgBase64;
	    		var _this = this;
	    		r.onload = function(){
		           //变成字符串
		            _this.addForm.clImaThinBefore = r.result;
		        }
		        r.readAsDataURL(file);
		        return false
	    	},
	    	imgsuccess(res, file, fileList,str){
	    		this.$message.success('上传成功');
	    		this.addForm[this.imgfileName] = res.data;
	    	},
	    	imgChange(str){
	    		this.imgfileName = str;
	    	},
	    }
	}
</script>