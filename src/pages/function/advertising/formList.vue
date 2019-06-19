<template>
    <div>
        <panel-title :title="$route.meta.title">
            <span class = "font-normal"><i class="red">*</i>为必填项</span>
            <el-button type="primary" @click="$router.go(-1)" >返回</el-button>
        </panel-title>
        <div class="panel-body">
            <el-form 
                :model="formData" 
                ref="formData" 
                :rules="rules" 
                class="form-container" 
                label-width="150px"
            >
                <el-form-item label="广告名称:" prop="adName">
                    <el-input 
                        placeholder="请填写广告名称" 
                        v-model="formData.adName"
                        :maxlength="10"
                    ></el-input>
                    <p class="tip">
                        <i class="fa fa-info-circle" aria-hidden="true"></i> 
                        广告名称只是作为辨别多个广告条目之用，并不显示在广告中
                    </p>
                </el-form-item>
                <el-form-item label="起止时间:" prop="adTimer">
                    <el-date-picker 
                        type="datetimerange" 
                        v-model="formData.adTimer" 
                        placeholder="请选择起止日期和时间" 
                        style="width: 100%;"
                        :pickerOptions="pickerOptions"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="广告位置:" prop="adPosition">
                    <el-select 
                        v-model="formData.adPosition" 
                        placeholder="请选择广告位置" 
                        style="width: 100%;"
                        @visible-change="oldSelectData"
                        @change="isChange"
                    >
                        <el-option value="1" label="待机全屏页"></el-option>
                        <el-option value="2" label="试穿页广告位1"></el-option>
                        <el-option value="3" label="试穿页广告位2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="展示内容:" prop="adContent">
                    <div v-show="!(!isImg&&formData.adContent)">
                        <div v-if="formData.adContent" class="upload-view-block">
                            <img :src="formData.adContent" width= "100px" @click="details()"/>
                            <div class="del-btn" @click ="delUploadImg"><i class="fa fa-remove"></i></div>
                        </div>
                        
                        <el-upload 
                            v-if="!formData.adContent" 
                            list-type="picture-card" 
                            action="/picUpload/ad" 
                            accept="image/*" 
                            :disabled = "!formData.adPosition"
                            :data="{token:$store.getters.get_user_info.token || ''}"
                            :show-file-list ="false" 
                            :on-success="imgSuccess" 
                            :before-upload="beforeUploadImg" 
                            :on-remove="delUploadImg"
                            @click.native="isUpload"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <p class="tip">
                            <i class="fa fa-info-circle" aria-hidden="true"></i> 
                            支持上传JPG/JPEG格式图片，文件不能超过3mb
                        </p>
                    </div>
                    
                    <div 
                        v-show="!isImg 
                            && (formData.adPosition === '1' )">
                        <div v-if="formData.adContent" class="upload-view-block">
                            <video v-if="formData.adContent" width="80"  controls>
                                <source :src="formData.adContent" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                            <div class="del-btn" @click ="delUploadImg"><i class="fa fa-remove"></i></div>
                        </div>
                        <el-upload 
                            v-if="!formData.adContent" 
                            list-type="picture-card" 
                            action="/picUpload/ad" 
                            accept="mp4/*" 
                            :disabled = "!formData.adPosition"
                            :data="{token:$store.getters.get_user_info.token || ''}"
                            :show-file-list ="false" 
                            :on-success="videoSuccess" 
                            :before-upload="beforeUploadVideo"
                            @click.native="isUpload"
                        >
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <p class="tip">
                            <i class="fa fa-info-circle" aria-hidden="true"></i> 
                            支持上传MP4格式视频，文件不能超过20mb
                        </p>
                    </div>
                </el-form-item>
                <el-form-item label="广告链接:" prop="adLink">
                    <el-input placeholder="请填写广告链接" v-model="formData.adLink"></el-input>
                </el-form-item>
                <el-form-item label="关联离线版本:" prop="offLines" >
                    <el-select v-model="formData.offLines" multiple placeholder="请选择离线版本"  style="width: 100%;">
                        <el-option 
                            v-for="item in editionIdsOffLine" 
                            :key="item.editionId" 
                            :label="item.editionName" 
                            :value="item.editionId" 
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关联在线版本:" prop="onLines" >
                    <el-select v-model="formData.onLines" multiple placeholder="请选择在线版本" style="width: 100%;"  >
                        <el-option 
                            v-for="item in editionIdsOnline" 
                            :key="item.editionId" 
                            :label="item.editionName" 
                            :value="item.editionId" 
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权重:" prop="adWeight">
                    <el-input type="number" placeholder="相同位置的广告权重越大展示排列越前" v-model="formData.adWeight"></el-input>
                </el-form-item>
                <el-form-item label="标签:" prop="adLabel" >
                    <el-input  v-model="formData.adLabel" placeholder="填写广告相关的标签，以英文逗号做分隔" type="text"></el-input>
                </el-form-item>
                <el-form-item label="备注:" prop="adRemark" >
                    <el-input 
                        v-model="formData.adRemark" 
                        placeholder="请输入备注信息,不超过300字" 
                        type="textarea" 
                        :rows="4" 
                        :maxlength="300"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div class="button-block">
                <el-button type="primary" @click="addSave" >提 交</el-button>
                <el-button @click="clearForm">重 置</el-button>
            </div>
                
        </div>
        <view-big-img :showImg = showImg></view-big-img>
    </div>
</template>
<script type="text/javascript">
    import { panelTitle, viewBigImg } from "components";

    const labelRep = {
        label: (rule, value, callback) => {
            if (!value) {
                return callback(new Error('标签不能为空'));
            }
            var values = value.split(",");
            if(values.length>10){
                return callback(new Error('最多可添加10个标签'));
            }
            for(var i=0;i<values.length;i++){
                if(values[i].getBytesLength()>12){
                    return callback(new Error('单个标签不能超过12个字节'));
                }
            }
            callback();
        },
        weight: (rule, value, callback) => {
            if(!value) {
                return callback(new Error('权重不能为空'));
            }
            if(Number(value) > 9999 || Number(value) < 0){
                return callback(new Error('权重只能是0-9999'));
            }
            callback();
        }
    }

    export default {
        props: {
            type: {
                type: String
            }
        },
        data() {
            return {
                formData: {
                    adName: '',
                    adTimer: [],
                    adPosition: '',
                    adContent: '',
                    adLink: '',
                    offLines: [],
                    onLines: [],
                    adWeight: '',
                    adLabel: '',
                    adRemark: ''
                },
                isImg: false,
                editionIdsOnline: [],
                editionIdsOffLine: [],
                rules: {
                    adName: [{required: true, message: '广告名称不能为空', trigger: 'blur'}],
                    adTimer: [{required: true, type: 'array', message: '起止时间不能为空', trigger: 'change'}],
                    adPosition: [{required: true, message: '广告位置不能为空', trigger: 'blur'}],
                    adContent: [{required: true, message: '展示内容不能为空', trigger: 'change'}],
                    adWeight: [{required: true, validator: labelRep.weight, trigger: 'blur'}],
                    adLabel: [{validator: labelRep.label, required: true, trigger: 'blur'}],
                    adRemark: [{max: 300, message: '长度不超过300字符', trigger: 'blur'}]
                },
                showImg: {
                    isShow: false,
                    src: ''
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                selectOld: {
                    value: '',
                    change: false
                }
            }
        },
        components: {
            panelTitle,
            viewBigImg
        },
        created() {
            if(this.type === 'edit') {
                this.getDetailData();
            }
            this.get_table_data1();
            this.get_table_data2();
        },
        methods: {
            //获取详情数据
            getDetailData() {
                this.$http({
                    url: '/advert/quertDetail',
                    method: 'POST',
                    data: {
                        advertId: this.$route.query.id
                    }
                })
                .then(({data}) => {
                    console.log(data);
                    let rs= data.advertDetail;
                    this.formData = {
                        adName: rs.advertName,
                        adTimer: [new Date(rs.advertStartTime), new Date(rs.advertStopTime)],
                        adPosition: String(rs.advertSeat),
                        adContent: rs.advertImag,
                        adLink: rs.advertLink,
                        offLines: rs.offLine ? this.getOnefromObj(rs.offLine, 'editionId'): [],
                        onLines: rs.onLine ? this.getOnefromObj(rs.onLine, 'editionId'): [],
                        adWeight: rs.weight,
                        adLabel: rs.advertLabel,
                        adRemark: rs.advertRemark
                    }
                    this.isImg= (rs.advertType == 1) ? false : true;
                })
            },
            //是否开始上传图片或视频
            isUpload(event) {
                if(!this.formData.adPosition) {
                    this.$refs["formData"].validateField("adPosition");
                    return false;
                }
            },
            //图片上传成功
            imgSuccess(response, file, fileList) {
                this.formData.adContent = response.data;
                this.isImg = true;
                console.log(response)
            },
            //视频上传成功
            videoSuccess(response, file, fileList) {
                this.formData.adContent = response.data;
                this.isImg = false;
                console.log(response)
            },
            //上传图片校验
            beforeUploadImg(file) {
                const isJPG = file.type === ('image/jpeg'||'image/jpg');
                const isLt3M = file.size / 1024 / 1024 <= 3;

                if(!this.formData.adPosition) {
                    this.$refs["formData"].validateField("adPosition");
                    return false;
                }
                else if(this.formData.adContent == '') {
                    if (!isJPG) {
                        this.$message.error('上传图片只能是 JPG/JPEG 格式!');
                    }
                    if (!isLt3M) {
                        this.$message.error('上传图片大小不能超过 3MB!');
                    }
                    return isJPG && isLt3M;
                }
                else {
                    this.$message.error('只能上传一张图片哦！');
                    return false;
                }
            },
            //上传视频校验
            beforeUploadVideo(file) {
                const isJPG = file.type === 'video/mp4';
                const isLt20M = file.size / 1024 / 1024 <= 20;

                if(!this.formData.adPosition) {
                    this.$refs["formData"].validateField("adPosition");
                    return false;
                }
                else if(this.formData.adContent == '') {
                    if (!isJPG) {
                        this.$message.error('上传视频只能是 mp4 格式!');
                    }
                    if (!isLt20M) {
                        this.$message.error('上传视频大小不能超过 20MB!');
                    }
                    return isJPG && isLt20M;
                }
                else {
                    this.$message.error('只能上传一个视频哦！');
                    return false;
                }
            },
            //删除视频或图片
            delUploadImg(file, fileList) {
                this.formData.adContent = "";
                this.isImg = false;
            },
            //查看大图
            details() {
                this.showImg= {
                    isShow: true, 
                    src: this.formData.adContent
                };
            },
            oldSelectData(val) {
                if(val) {
                    this.selectOld.value = this.formData.adPosition;
                    this.selectOld.change = false;
                }
                
            },
            //是否改变广告位置
            isChange(val) {
                if(this.selectOld.value && !this.selectOld.change) {
                    this.$confirm("修改广告位置需重新上传展示内容，是否继续？", "提示", {
                        cancelButtonText: "取消",
                        confirmButtonText: "确定",
                        type: "warning"
                    })
                    .then (({data}) => {
                        this.formData.adContent = "";
                        this.isImg = false;
                    })
                    .catch(() => {
                        this.formData.adPosition = this.selectOld.value;
                        this.selectOld.change = true;
                    })
                }
                
            },
            //获取在线版本
            get_table_data1() {
                this.$http({
                    url: "/edition/selectEdition",
                    method: "POST",
                    data: { editionType: 1, offLine: 0 }
                })
                .then(({ data }) => {
                    this.editionIdsOnline = data.rows;
                })
                .catch(() => {});
            },
            //获取离线版本
            get_table_data2() {
                this.$http({
                    url: "/edition/selectEdition",
                    method: "POST",
                    data: { editionType: 1, offLine: 1 }
                })
                .then(({ data }) => {
                    this.editionIdsOffLine = data.rows;
                })
                .catch(() => {});
            },
            //清空
            clearForm() {
                this.formData = {
                    adName: '',
                    adTimer: [],
                    adPosition: '',
                    adContent: '',
                    adLink: '',
                    offLines: [],
                    onLines: [],
                    adWeight: '',
                    adLabel: '',
                    adRemark: ''
                };
                this.isImg = false;
                this.$refs['formData'].resetFields();
            },
            //保存
            addSave() {
                this.$refs['formData'].validate((valid) => {
                if (valid) {
                    let url = this.type === 'edit' 
                            ? (this.$route.query.originName === 'updateShowTime'
                                ? '/advert/startAdvert'
                                : '/advert/updateAdvert') 
                            : '/advert/insertAdvert'
                    let data = {
                        advertName: this.formData.adName,
                        advertImag: this.formData.adContent,
                        advertSeat: this.formData.adPosition,
                        advertLink: this.formData.adLink,
                        advertStartTime: this.$dateFormat(this.formData.adTimer[0],"yyyy-MM-dd hh:mm:ss"),
                        advertStopTime: this.$dateFormat(this.formData.adTimer[1],"yyyy-MM-dd hh:mm:ss"),
                        advertRemark: this.formData.adRemark,
                        weight: this.formData.adWeight,
                        advertLabel: this.formData.adLabel,
                        advertType: this.isImg ? 0 : 1,
                        list: this.formData.offLines.concat(this.formData.onLines).join(','),
                        advertCreatedId: 1
                    };
                    if(this.type === 'edit') {
                        data.advertId = this.$route.query.id;
                    }
                    this.$http({
                        url: url,
                        method: 'POST',
                        data: data
                    })
                    .then((res) => {
                        this.$message.success(res.msg);
                        this.$router.push("/advertising/list");
                        //this.clearForm();
                    })
                    .catch(() => {});
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            //拼版本数据
            dealEditionData(ids, key) {
                let allArr = [];
                for (let index = 0; index < ids.length; index++) {
                    let all ={};
                    all[key] = ids[index];
                    allArr.push(all);
                }
                return allArr;
            },
            //获取数组对象中某个数据数组
            getOnefromObj(arr, key) {
                let arr2 = [];
                arr.map((obj) => {
                    arr2.push(obj[key]);
                })
                return arr2;
            }
        }
    }
</script>

<style>
.upload-view-block {
    float: left;
    position: relative;
    width: 128px;
    height: 128px;
    padding: 10px;
    overflow: hidden;
    margin-right: 10px;
}
.upload-view-block img {
    width: 100%;
}
.upload-view-block .del-btn {
    position: absolute;
    right: 0;
    top: 0;
    color: red;
    font-size: 20px;
    cursor: pointer;
}
</style>

