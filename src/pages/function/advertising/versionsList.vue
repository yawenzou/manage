<template>
    <div class="panel">
        <panel-title :title="$route.query.type"></panel-title>
        <div class="panel-body">

            <div class="select-ele">
                <el-radio-group v-model="type" @change="TypeChange" >
                    <el-radio-button label="广告管理"></el-radio-button>
                    <el-radio-button label="在线版本"></el-radio-button>
                    <el-radio-button label="离线版本"></el-radio-button>
                </el-radio-group>
            </div>

            <el-form ref="formData" :inline="true" :model="formData" label-width="80px" >
                <el-form-item label="输入查询">
                    <el-input v-model="formData.editionId" placeholder="版本ID" ></el-input>
                </el-form-item>
                <el-form-item label="上传日期">
                    <el-date-picker v-model="formData.uploadDate" type="date" placeholder="选择上传时间"
                    > </el-date-picker>
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
                <el-table-column type="selection"  width="55" > </el-table-column>
                <el-table-column prop="editionId" label="ID" align="center" > </el-table-column>
                <el-table-column prop="hairdoCreated" label="上传日期" align="center" width="200" >
                    <template slot-scope="props">
                        {{$dateFormat(parseInt(props.row.editionCreated),"yyyy-MM-dd hh:mm:ss")}}
                    </template>
                </el-table-column>
                <el-table-column prop="editionName" label="名称" align="center" >  </el-table-column>
                <el-table-column prop="editionRemark" label="版本描述" align="center" >  </el-table-column>
                <el-table-column prop="editionNum" label="版本编号" align="center" >  </el-table-column>
                <el-table-column prop="editionStatus" label="状态" align="center">
                    <template slot-scope="props">
                        <span v-if="props.row.editionRelease == '0'">未发布</span>
                        <span v-if="props.row.editionRelease == '1'">已发布</span>
                        <span v-if="props.row.editionRelease == '2'">已修改</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center"  width="230" >
                    <template slot-scope="props">
                        <span class="operate-icon" @click="toView(props.row)"><i class="fa fa-eye"></i> 查看</span>
                        <span 
                            class="operate-icon" 
                            v-bind:class="{ 'operate-icon-disabled': props.row.editionRelease==1 }" 
                            @click="publish(props.row)"
                        >
                            <i class="fa fa-pencil"></i> 发布
                        </span>
                        <span class="operate-icon" @click="del(props.row)"><i class="fa fa-trash"></i> 删除</span>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <bottom-tool-bar>
                    <div slot="handler">
                        <el-checkbox v-model="allChoose" label="全选" border @change="chooseAll"></el-checkbox>
                        <el-checkbox v-model="invertChoose" label="反选" border @change="chooseInvert"></el-checkbox>
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
    import { panelTitle, bottomToolBar, upload } from "components";

    export default {
        data() {
            return {
                type: this.$route.query.type,
                tableData: [],
                //当前页码
                currentPage: 1,
                //数据总条目
                total: 0,
                totalClick: 0,
                //每页显示多少条数据
                length: 10,
                currentLength: 0, //当前列表有几条数据
                loadData: true, //请求时的loading效果
                formData: {
                    editionId: '',
                    uploadDate: ''
                },
                allChoose: false,
                invertChoose: false,
                selectArr: [],
                
                
            }
        },
        components: {
            panelTitle,
            bottomToolBar,
            
        },
        created() {
            this.getTableData();
        },
        methods: {
            //切换页面
            TypeChange(val) {
                this.currentPage = 1;
                this.emptyForm();
                if(this.type === '广告管理') {
                    this.$router.push({ path: '/advertising/list'});
                }
                else {
                    this.$router.push({ path: this.$route.path, query: { type: val } });
                }
                
            },
            //清空查询
            emptyForm() {
                this.formData = {
                    editionId: '',
                    uploadDate: ''
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

                let returnData = this.getStorageData();
                this.currentPage = returnData ? returnData.currentPage: this.currentPage;

                let uploadDate = returnData ? returnData.searchData.uploadDate : this.formData.uploadDate;
                var form = {
                    editionId: returnData ? returnData.searchData.editionId : this.formData.editionId,
                    uploadDate: uploadDate ? this.$dateFormat(uploadDate, 'yyyy-MM-dd'): ''
                };
                form.curPage = this.currentPage;
                form.pageSize = this.length;
                let url = this.type === '在线版本' ? '/advert/selectListEdiAdvet' : '/advert/selectListEdiAdvetout';
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
                    
                    window.sessionStorage.setItem('data', JSON.stringify({
                        searchData: this.formData,
                        currentPage: this.currentPage
                    }))

                })
                .catch(() => {
                    this.loadData = false;
                });
            },
            //获取缓存的页码及搜索数据
            getStorageData() {
                let prevRouteName = window.sessionStorage.getItem("prevRouteName");
                if(['advertisingVersionsDetail'].indexOf(prevRouteName) > -1) {
                    let storageData = JSON.parse(window.sessionStorage.getItem("data"));
                    window.sessionStorage.setItem('prevRouteName', '');
                    return {
                        searchData: storageData.searchData, 
                        currentPage: storageData.currentPage
                    }
                }
                return false
            },
            //添加数据
            addForm() {
                this.$router.push({path: "/advertising/versions/add", query: {type: this.type}});
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
            //删除
            del(val) {
                let url = this.type === '在线版本' ? '/advert/delEditionAdvert' : '/advert/delEditionOutAdvert';
                this.$confirm("是否确定删除?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(() => {
                    this.loadData = true;
                    this.$http({
                        url: url,
                        method: "POST",
                        data: {
                            editionId: val.editionId
                        }
                    })
                    .then(({ data }) => {
                        this.getTableData();
                    })
                    .catch(() => {
                        this.loadData = false;
                    });
                })
                .catch(() => {});
            },
            //查看
            toView(val) {
                this.$router.push({path: "/advertising/versions/detail", query: {type: this.type, id: val.editionId}});
            },
            //发布
            publish(val) {
                if(val.editionRelease != 1) {
                    this.$confirm("是否确定发布广告?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(() => {
                        let url = this.type === '在线版本' ? '/advert/release/online' : '/advert/release/offline';
                        this.$http({
                            url: url,
                            method: "POST",
                            data: { editionId: val.editionId }
                        })
                        .then(({ data }) => {
                            this.getTableData();
                        })
                        .catch(() => {
                            this.loadData = false;
                        });
                    })
                }
                
            },
            //选择条数
            handleSelectionChange(selection) {
                this.selectArr = selection;
                this.isAllChoose();
                console.log(selection)
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
                    this.invertChoose = false;
                    this.selectArr = [];
                    this.$refs.multipleTable.clearSelection();
                }
                else {
                    this.tableData.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                    this.isAllChoose();
                }
            },
        }
    }
</script>