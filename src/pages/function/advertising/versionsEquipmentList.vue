<template>
    <div class="panel">
        <panel-title :title="$route.meta.title">
            <el-button type="primary" @click="$router.go(-1)" >返回</el-button>
        </panel-title>
        <div class="panel-body">
            <div class="select-ele">
                <el-radio-group v-model="type" @change="TypeChange" >
                    <el-radio-button label="基本信息"></el-radio-button>
                    <el-radio-button label="推送列表"></el-radio-button>
                    <el-radio-button label="设备列表"></el-radio-button>
                </el-radio-group>
            </div>

            <el-form ref="formData" :inline="true" :model="formData" label-width="80px" >
                <el-form-item label="输入查询">
                    <el-input v-model="formData.deviceId" placeholder="设备ID" ></el-input>
                </el-form-item>
                <!-- <el-form-item label="状态">
                    <el-select>
                        <el-option value="" label="全部"></el-option>
                        <el-option value="1" label="在线"></el-option>
                        <el-option value="2" label="已离线"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="">
                    <el-button type="primary" @click="find" >查询</el-button>
                    <el-button type="primary" @click="emptyForm" >重置</el-button>
                </el-form-item>
            </el-form>

            <div class="table-title">使用该版本的设备</div>
            <el-table ref = "multipleTable" :data="tableData" v-loading="loadData" element-loading-text="拼命加载中" border stripe @selection-change="handleSelectionChange" style="width: 100%;">
                <el-table-column type="selection"  width="55" > </el-table-column>
                <el-table-column prop="devId" label="设备ID" align="center" > </el-table-column>
                <el-table-column prop="devArea" label="所在地区" align="center" width="150" >
                    <template slot-scope="props">
                        {{props.row.devProvince + props.row.devCity + props.row.devArea + props.row.devAddress}}
                    </template>
                </el-table-column>
                <el-table-column prop="devName" label="联系人" align="center" >  </el-table-column>
                <el-table-column prop="devPhone" label="联系方式" align="center" ></el-table-column>
                <el-table-column prop="hairdoCreated" label="创建时间" align="center" width="220" >
                    <template slot-scope="props">
                        {{$dateFormat(parseInt(props.row.devCreated),"yyyy-MM-dd hh:mm:ss")}}
                    </template>
                </el-table-column>
                <el-table-column prop="isShow" label="状态" align="center" width="80" >
                    <template slot-scope="props">
                        {{props.row.devStatus == 1 ? '离线' : '在线'}}
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <bottom-tool-bar>
                    <div slot="page">
                        <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, sizes" :total="total" ></el-pagination>
                    </div>
                </bottom-tool-bar>
            </div>

        </div>
    </div>
</template>

<script type="text/javascript">
    import { panelTitle, bottomToolBar } from "components";

    export default {
        data() {
            return {
                type: '设备列表',
                tableData: [],
                //当前页码
                currentPage: 1,
                //数据总条目
                total: 0,
                totalClick: 0,
                //每页显示多少条数据
                length: 10,
                //请求时的loading效果
                loadData: true,
                formData: {
                    deviceId: ''
                },
                allChoose: false,
                invertChoose: false,
                selectArr: [],
                position: {
                    1: '待机全屏页',
                    2: '试穿页广告位1',
                    3: '试穿页广告位2'
                }
            }
        },
        components: {
            panelTitle,
            bottomToolBar
        },
        created() {
            this.getTableData();
        },
        methods: {
            //切换页面
            TypeChange(val) {
                if(this.type === '推送列表') {
                    this.$router.push({ 
                        path: '/advertising/versions/pushList', 
                        query: {
                            id: this.$route.query.id, 
                            type: this.$route.query.type
                        }
                    });
                }
                else if(this.type === '设备列表') {
                    this.$router.push({ 
                        path: '/advertising/versions/equipmentList', 
                        query: {
                            id: this.$route.query.id, 
                            type: this.$route.query.type
                        }
                    });
                }
                else if(this.type === '基本信息') {
                    this.$router.push({ 
                        path: '/advertising/versions/detail', 
                        query: {
                            id: this.$route.query.id, 
                            type: this.$route.query.type
                        }
                    });
                }
                
            },
            //清空查询
            emptyForm() {
                this.formData = {
                    deviceId: ''
                };
                this.getTableData();
            },
            //查询
            find() {
                this.currentPage = 1;
                this.getTableData();
            },
            //获取table数据
            getTableData() {
                this.loadData = true;
                var form = this.formData;
                //var form = {};
                form.curPage = this.currentPage;
                form.pageSize = this.length;
                form.editionId = this.$route.query.id;
                this.$http({
                    url: '/device/selectDeviceList',
                    method: "POST",
                    data: form
                })
                .then(({ data }) => {
                    this.tableData = data.rows;
                    this.currentPage = data.page == 0 ? 1 : data.page;
                    this.total = data.total;
                    this.loadData = false;
                    })
                .catch(() => {
                    this.loadData = false;
                });
            },
            //选择页码
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getTableData();
            },
            //选择每页条数
            handleSizeChange(val) {
                this.currentPage = 1;
                this.length = val;
                this.getTableData();
            },
            //选择条数
            handleSelectionChange(selection) {
                this.selectArr = selection;
                this.isAllChoose();
                console.log(selection)
            }
        }
    }
</script>
