<template>
    <div>
        <el-form
            :ref="baseForm"
            :model="baseForm"
            :inline="true"
            label-position="top"
            :rules="rules"
        >
            <div class="form-title">基本信息</div>
            <div class="form-content">
                <div class="form-row">
                    <el-form-item label="联系人" prop="devName" >
                        <el-input 
                            v-model="baseForm.devName"
                            placeholder="请填写联系人"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="devPhone" >
                        <el-input 
                            v-model="baseForm.devPhone"
                            placeholder="请填写手机号码"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="所属公司" prop="devCompany" >
                        <el-input 
                            v-model="baseForm.devCompany"
                            placeholder="请填写所属公司"
                        ></el-input>
                    </el-form-item>
                </div>
                <div class="form-row">
                    <el-form-item label="客户编码" prop="devCustNum" >
                        <el-input 
                            v-model="baseForm.devCustNum"
                            placeholder="请填写客户编码"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="地址选择" prop="devArea" >
                        <v-distpicker
                            :province="baseForm.devProvince"
                            :city="baseForm.devCity"
                            :area="baseForm.devArea"
                            placeholder="选择省市区县"
                            @selected="addresChange"
                        ></v-distpicker>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="devAddress" >
                        <el-input 
                            v-model="baseForm.devAddress"
                            placeholder="请填写详细地址"
                        ></el-input>
                    </el-form-item>
                </div>
                
            </div>
            <div class="form-title">其他信息</div>
            <div class="form-content">
                <div class="form-row">
                    <el-form-item label="设备版本" prop="devVersion" >
                        <el-select
                            v-model="baseForm.devVersion"
                            placeholder="请选择设备版本"
                        >
                            <el-option
                              v-for="(value, key, index) in devVersionList"
                              :label="value"
                              :value="key"
                              :key="index"
                            ></el-option>
                          </el-select>
                    </el-form-item>
                    <el-form-item label="签约时间" prop="contractDate" >
                        <el-date-picker
                            v-model="baseForm.contractDate"
                            type="datetime"
                            placeholder="选择日期"
                            @change="dateChange"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="管理员" prop="userId" >
                        <el-select
                            v-model="baseForm.userId"
                            placeholder="请选择管理员"
                        >
                            <el-option
                                v-for="item in userList"
                                :key="item.id"
                                :label="item.eUserName"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="form-row">
                    <el-form-item label="备注" prop="devRemark" >
                        <el-input 
                            class="w540"
                            v-model="baseForm.devRemark"
                            placeholder="请输入备注信息"
                        ></el-input>
                    </el-form-item>
                </div>
                
            </div>
        </el-form>
        <div class="btn-block">
            <span 
                class="btn1 blue-btn" 
                @click="toNext"
            >下一步</span> 
        </div>
    </div>
</template>
<script type="text/javascript">
    import {mapMutations} from 'vuex';
    export default {
        data() {
            return {
                baseForm: {
                    devName: "", //联系人名称
                    devPhone: "", //联系人电话
                    devCompany: "", //所属公司
                    devProvince: "", //省
                    devCity: "", //市
                    devArea: "", //区
                    devAddress: "", //详细地址
                    devCustNum: "", //客户编号
                    devVersion:"", //设备版本
                    contractDate: "", //签约时间
                    userId: "", //管理员ID
                    devRemark: "", //备注
                },
                userList: [],
                devVersionList: {
                    2: '主线版',
                    4: '4个面版',
                    0: '广告版'
                },
                rules:{
                    devName: [{
                        required: true, 
                        message:'联系人不能为空',
                        trigger:'blur'
                    }],
                    devPhone: [{
                        required: true, 
                        message:'手机号码不能为空',
                        trigger:'blur'
                    }],
                    devCompany: [{
                        required: true, 
                        message:'所属公司不能为空',
                        trigger:'blur'
                    }],
                    devAddress: [{
                        required: true, 
                        message:'详细地址不能为空',
                        trigger:'blur'
                    }],
                    devArea: [{
                        required: true, 
                        message:'省市区不能为空',
                        trigger:'blur'
                    }],
                    devCustNum: [{
                        required: true, 
                        message:'客户编号不能为空',
                        trigger:'blur'
                    }],
                    devVersion: [{
                        required: true, 
                        message:'设备版本不能为空',
                        trigger:'change'
                    }],
                    contractDate: [{
                        required: true, 
                        message:'签约时间不能为空',
                        trigger:'change'
                    }],
                    devCustNum: [{
                        required: true, 
                        message:'管理员不能为空',
                        trigger:'change'
                    }],
                }
            }
        },
        created() {
            let formData = this.$store.getters.GET_EQUINMENT_INFO;
            if(formData.devName) {
                this.baseForm = formData;
            }
            this.getUserList();
        },
        methods: {
            ...mapMutations([
                'NEXT_STEP',
                'SET_EQUINMENT_INFO'
            ]),
            toNext() {
                this.NEXT_STEP();
                this.SET_EQUINMENT_INFO(this.baseForm);
            },
            addresChange(val) {
                this.baseForm.devProvince = val.province.value;
                this.baseForm.devCity = val.city.value;
                this.baseForm.devArea = val.area.value;
            },
            dateChange(val) {
                console.log(val);
                this.baseForm.contractDate = val;
            },
            //获取管理员信息
            getUserList() {
                this.$http({
                    url: "/device/user",
                    method: "POST",
                    data: {}
                }).then(({ data }) => {
                    this.userList = data;
                });
            }
        }
    }
</script>
