<template>
    <div class="panel">
        <panel-title :title="title">
            <span class = "font-normal"><i class="red">*</i>为必填项</span>
            <el-button type="primary" @click="$router.go(-1)" >返回</el-button>
        </panel-title>
        <div class="panel-body">
            <el-form :model="formData" ref="formData" :rules="rules" class="form-container" label-width="150px">
                <el-form-item label="版本名称:" prop="name">
                    <el-input placeholder="请填写版本名称" v-model="formData.name"></el-input>
                    <p class="tip">
                        <i class="fa fa-info-circle" aria-hidden="true"></i> 
                        版本名称只是作为辨别多个版本之用，并不显示在广告中
                    </p>
                </el-form-item>
                <el-form-item label="备注:" prop="remark" >
                    <el-input 
                        v-model="formData.remark" 
                        placeholder="请输入备注信息,不超过300字" 
                        type="textarea" 
                        :rows="4" 
                        :maxlength="300"
                    ></el-input>
                </el-form-item>
                <el-form-item label="版本号:" prop="number">
                    <el-input placeholder="版本号是用来区分同名版本的区别" v-model="formData.number"></el-input>
                </el-form-item>
                
            </el-form>
            <div class="button-block">
                <el-button type="primary" @click="addSave" >提 交</el-button>
                <el-button @click="clearForm">重 置</el-button>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import { panelTitle } from "components";

    export default {
        data() {
            return {
                formData: {
                    name: '',
                    remark: '',
                    number: ''
                },
                rules: {
                    name: [{required: true, message: '广告名称不能为空', trigger: 'blur'}],
                    number: [{required: true, message: '版本号不能为空', trigger: 'blur'}],
                    remark: [{required: true, max: 300, message: '备注不能为空', trigger: 'blur'}]
                }
            }
        },
        computed: {
            title: function() {
                return '新增'+this.$route.query.type
            }
        },
        components: {
            panelTitle
        },
        methods: {
            //清空
            clearForm() {
                this.formData = {
                    name: '',
                    remark: '',
                    number: ''
                };
                this.$refs['formData'].resetFields();
            },
            //保存
            addSave() {
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        let url = this.$route.query.type === '在线版本' ? '/advert/insertEditiAdvert' : '/advert/insertOutEditiAdvert';
                        this.$http({
                            url: url,
                            method: 'POST',
                            data: {
                                editionName: this.formData.name,
                                editionNum: this.formData.number,
                                editionRemark: this.formData.remark,
                                editionCreatedId: 1
                            }
                        })
                        .then((res) => {
                            this.$message.success(res.msg);
                            this.clearForm();
                            this.$router.go(-1);
                        })
                        .catch(() => {});
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
