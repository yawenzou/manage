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

            <el-form 
                ref="formData" 
                :inline="true" 
                :model="formData" 
                label-width="80px"
             >
                <el-form-item label="展示类型">
                    <el-select v-model="formData.showType" placeholder="全部">
                        <el-option value="1" label="视频"></el-option>
                        <el-option value="2" label="图片"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="广告位置">
                    <el-select v-model="formData.advertSeat" placeholder="请选择广告位置">
                        <el-option 
                            v-for="(val, key, index) in position" 
                            :key="index" 
                            :value="key" 
                            :label="val"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" @click="find" >查询</el-button>
                    <el-button type="primary" @click="emptyForm" >重置</el-button>
                </el-form-item>
            </el-form>

            <div class="table-title">数据列表
                <div class="float-right">
                    <el-button type="primary"  icon="plus" size="small" @click="addForm" >添加</el-button>
                </div>
            </div>
            <el-table 
                ref = "multipleTable" 
                :data="tableData" 
                v-loading="loadData" 
                element-loading-text="拼命加载中" 
                border 
                stripe 
                @selection-change="handleSelectionChange" 
                style="width: 100%;"
            >
                <el-table-column type="selection" width="55" > </el-table-column>
                <el-table-column prop="advertId" label="ID" align="center" > </el-table-column>
                <el-table-column prop="advertLink" label="展示" align="center" width="150" >
                    <template slot-scope="props">
                        <video v-if="props.row.advertType == 1" 
                            :key="props.row.advertImag"
                            width="100"  
                            style="width:100px;padding: 10px;z-index:1000"  
                            controls
                        >
                            <source :src="props.row.advertImag" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <img v-else 
                            :src="props.row.advertImag" 
                            style="width:100px;padding: 10px;"  
                            @click="details(props.row)" 
                        >
                    </template>
                </el-table-column>
                <el-table-column prop="advertName" label="名称" align="center" >  </el-table-column>
                <el-table-column prop="advertSeat" label="位置" align="center" >
                    <template slot-scope="props" >
                        {{position[props.row.advertSeat]}}
                    </template>  
                </el-table-column>
                <el-table-column prop="hairdoCreated" label="有效期" align="center" width="220" >
                    <template slot-scope="props">
                        <p>开始：{{$dateFormat(parseInt(props.row.advertStartTime),"yyyy-MM-dd hh:mm:ss")}}</p>
                        <p>到期：{{$dateFormat(parseInt(props.row.advertStopTime),"yyyy-MM-dd hh:mm:ss")}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="isShow" label="显示" align="center" width="80" >
                    <template slot-scope="props">
                        <span v-if="props.row.isShow == 0" class = "cyan">展示中</span>
                        <span v-else class = "red">隐藏中</span>
                        
                    </template>
                </el-table-column>
                <el-table-column prop="weight" label="权重" align="center"> </el-table-column>
                <el-table-column prop="aeWeight" label="展示权重" align="center"> </el-table-column>
                <el-table-column label="操作" align="center"  width="230" >
                    <template slot-scope="props">
                        <span class="operate-icon" @click="remove(props.row.advertId)"><i class="fa fa-sign-in"></i> 移除</span>
                        <span class="operate-icon" @click="modifyWeight(props.row)">
                            <i class="fa fa-balance-scale"></i> 权重
                        </span>
                        
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <bottom-tool-bar>
                    <div slot="handler">
                        <el-checkbox v-model="allChoose" label="全选" border @change="chooseAll"></el-checkbox>
                        <el-checkbox v-model="invertChoose" label="反选" border @change="chooseInvert"></el-checkbox>
                        <el-button type="primary" @click="allRemove" circle>批量移除</el-button>
                    </div>
                    <div slot="page">
                        <el-pagination 
                            background 
                            @current-change="handleCurrentChange" 
                            @size-change="handleSizeChange" 
                            :current-page="currentPage" 
                            :page-size="10" 
                            layout="total, prev, pager, next, sizes" 
                            :total="total" 
                        ></el-pagination>
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
                type: '推送列表',
                tableData: [],
                //当前页码
                currentPage: 1,
                //数据总条目
                total: 0,
                totalClick: 0,
                //每页显示多少条数据
                length: 10,
                //请求时的loading效果
                currentLength: 0, //当前列表有几条数据
                loadData: true,
                formData: {
                    showType: '',
                    advertSeat: ''
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
                    showType: '',
                    advertSeat: ''
                };
                this.getTableData();
            },
            //查询
            find() {
                this.currentPage = 1;
                this.getTableData();
            },
            //添加数据
            addForm() {
                this.$router.push({path:'/advertising/versions/join', query: {vid: this.$route.query.id}});
            },
            //获取table数据
            getTableData() {
                this.loadData = true;
                var form = this.formData;
                //var form = {};
                form.editionId = this.$route.query.id;
                form.curPage = this.currentPage;
                form.pageSize = this.length;
                form.isThisVersion = 1;
                let url = this.type === '在线版本' ? '/advert/selectAdvert' : '/advert/selectAdvert';
                this.$http({
                    url: url,
                    method: "POST",
                    data: form
                })
                .then(({ data }) => {
                    this.tableData = data.rows;
                    this.currentPage = data.page == 0 ? 1 : data.page;
                    this.currentLength = data.rows.length;
                    this.total = data.total;
                    this.loadData = false;
                    this.allChoose = false;
                    this.invertChoose = false;
                    this.selectArr = [];
                    this.selectIds = [];
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
            //查看大图或视频
            details(id) {
                console.log('查看大图或视频');
            },
            //批量移除
            allRemove() {
                this.remove(this.selectIds.join(","))
            },
            //移除
            remove(id) {
                this.$http({
                    url: '/advert/rmAD2Version',
                    method: "POST",
                    data: { 
                        vId: this.$route.query.id,
                        adIds: id 
                    }
                })
                .then(({ data }) => {
                    this.getTableData();
                })
                .catch(() => {
                    this.loadData = false;
                });
            },
            //修改权重
            modifyWeight(val) {
                this.$prompt('展示权重', '提示', {
                    title: '修改权重',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPlaceholder: '展示权重仅在当前版本中生效',
                    inputType: 'number'
                }).then(({ value }) => {
                    this.$http({
                        url: '/advert/adVersionWeight',
                        method: "POST",
                        data: {
                            eId:  this.$route.query.id,
                            aId: val.advertId,
                            weight: value
                        }
                    })
                    .then(({ data }) => {
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        this.getTableData();
                    })
                    .catch(() => {
                        this.loadData = false;
                    });
                    
                }).catch(() => {
                          
                });
            },
            
            //选择条数
            handleSelectionChange(selection) {
                this.selectArr = selection;
                this.isAllChoose();
                 this.getSelectIds();
            },
            getSelectIds() {
                let ids = [];
                this.selectArr.map(obj => {
                    ids.push(obj.advertId);
                })
                this.selectIds = ids;
                console.log(this.selectIds)
            },
            //判断是否全选
            isAllChoose() {
                if(this.selectArr.length === this.currentLength) {
                    this.allChoose = true;
                }
                else {
                    this.allChoose = false;
                }
            },
            //全选
            chooseAll() {
                if(!this.allChoose) {
                    this.selectArr = [];
                    this.$refs.multipleTable.clearSelection();
                }
                else {
                    this.selectArr = this.tableData;
                    this.tableData.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row, "selected");
                    });
                }
            },
            //反选
            chooseInvert() {
                if(!this.invertChoose) {
                    this.selectArr = [];
                    this.$refs.multipleTable.clearSelection();
                }
                else {
                    this.tableData.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                    this.isAllChoose();
                }
            }
        }
    }
</script>
