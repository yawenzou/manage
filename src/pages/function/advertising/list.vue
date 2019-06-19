<template>
    <div class="panel">
        <panel-title :title="$route.meta.title"></panel-title>
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
                    <el-input v-model="formData.advertName" placeholder="广告名称" ></el-input>
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
                <el-form-item label="到期时间">
                    <el-date-picker v-model="formData.advertStopTime" type="date"  placeholder="选择到期日期"
                    > </el-date-picker>
                </el-form-item>
                <el-form-item label="是否显示">
                    <el-select v-model="formData.isShow" placeholder="全部" >
                        <el-option key="0" value="" label="全部"></el-option>
                        <el-option key="1" value="0" label="是" ></el-option>
                        <el-option key="2" value="1" label="否" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否停用">
                    <el-select v-model="formData.isStop" placeholder="全部" >
                        <el-option key="0" value="" label="全部"></el-option>
                        <el-option key="1" value="1" label="是" ></el-option>
                        <el-option key="2" value="0" label="否" ></el-option>
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
                <el-table-column type="selection"  width="55" > </el-table-column>
                <el-table-column prop="advertId" label="ID" align="center" > </el-table-column>
                <el-table-column prop="advertLink" label="展示内容" align="center" width="150" >
                    <template slot-scope="props">
                        <video v-if="props.row.advertImag.indexOf('.mp4') > -1" 
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
                        <el-switch 
                            :value="props.row.isShow==0" 
                            active-color="#13ce66" 
                            inactive-color="#ff4949" 
                            @change="switchChange(props.row.advertId, props.row.isShow, props.row.isStop)" 
                        > </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="weight" label="权重" align="center"> </el-table-column>
                <el-table-column
                    prop="advertId"
                    label="下载资源"
                    align="center"
                >
                    <template slot-scope="props">
                    <!-- <el-button type="succes" size="small" @click="down(props.row)">下载</el-button> -->
                    <a
                        :href="origin+'/FileDownload/pic/ad/'+props.row.advertId"
                        title="下载"
                        target="_blank"
                    >下载</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="advertId"
                    label="状态"
                    align="center"
                >
                    <template slot-scope="props">
                    <el-button
                        type="info"
                        size="small"
                        @click="upload(props.row)"
                    >上传</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center"  width="230" >
                    <template slot-scope="props">
                        <span class="operate-icon" @click="toView(props.row)"><i class="fa fa-eye"></i> 查看</span>
                        <span
                            class="operate-icon" 
                            v-bind:class="{ 'operate-icon-disabled': props.row.isStop }" 
                            @click="toEdit(props.row)"
                        >
                            <i class="fa fa-pencil"></i> 编辑
                        </span>
                        <span 
                            class="operate-icon" 
                            v-if="props.row.isStop == 1" 
                            @click="start(props.row.advertId, props.row.isShow)"
                        >
                            <i class="fa fa-check-circle-o"></i> 启用
                        </span>
                        <span 
                            class="operate-icon" 
                            v-if="props.row.isStop == 0" 
                            v-bind:class="{ 'operate-icon-disabled': !props.row.isShow }" 
                            @click="stop(props.row.advertId, props.row.isShow)"
                        >
                            <i class="fa fa-ban"></i> 停用
                        </span>
                        <span 
                            class="operate-icon" 
                            v-bind:class="{ 'operate-icon-disabled': !props.row.isShow }" 
                            @click="del(props.row.advertId, props.row.isShow )"
                        >
                            <i class="fa fa-trash"></i> 删除
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <bottom-tool-bar>
                    <div slot="handler">
                        <el-checkbox v-model="allChoose" label="全选" border @change="chooseAll"></el-checkbox>
                        <el-checkbox v-model="invertChoose" label="反选" border @change="chooseInvert"></el-checkbox>
                        <el-button type="primary" circle @click="allDel">批量删除</el-button>
                        <!-- <el-button type="primary" circle @click="allShow">批量显示</el-button> -->
                        <el-button type="primary" circle @click="allHide">批量隐藏</el-button>
                        <el-button type="primary" circle @click="allStop">批量停用</el-button>
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
        <view-big-img :showImg = showImg></view-big-img>
        <upload :dialogMsg="uploadMsg" ></upload>
    </div>
</template>

<script type="text/javascript">
    import { panelTitle, bottomToolBar, upload, viewBigImg } from "components";

    export default {
        data() {
            return {
                type: '广告管理',
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
                    advertName: '',
                    advertSeat: '',
                    advertStopTime: '',
                    isShow: '',
                    isStop: ''
                },
                allChoose: false,
                invertChoose: false,
                selectArr: [],
                selectIds: [],
                chooseShow: false,
                position: {
                    1: '待机全屏页',
                    2: '试穿页广告位1',
                    3: '试穿页广告位2'
                },
                showImg: {
                    isShow: false,
                    src: ''
                },
                origin: window.location.origin,
                uploadMsg: {
                    dialog: false,
                    id: "",
                    url: "",
                    getUrl: ""
                },
                
            }
        },
        components: {
            panelTitle,
            bottomToolBar,
            upload,
            viewBigImg
        },
        created() {
            this.getTableData();
        },
        methods: {
            //切换页面
            TypeChange(val) {
                this.currentPage = 1;
                this.emptyForm();
                this.$router.push({ path: '/advertising/versions/list', query: { type: val } });
            },
            //清空查询
            emptyForm() {
                this.formData = {
                    advertName: '',
                    advertSeat: '',
                    advertStopTime: '',
                    isShow: '',
                    isStop: ''
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
                var form = returnData ? returnData.searchData : this.formData;
                form.curPage = returnData ? returnData.currentPage : this.currentPage;
                form.pageSize = this.length;
                let matDate = form.advertStopTime ? this.$dateFormat(form.advertStopTime) : '';
                form.advertStopTime = matDate;
                this.$http({
                    url: '/advert/selectAdvert',
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
                if(['advertisingEdit', 'advertisingDetail'].indexOf(prevRouteName) > -1) {
                    let storageData = JSON.parse(window.sessionStorage.getItem("data"));
                    window.sessionStorage.setItem('prevRouteName', '');
                    this.currentPage = storageData.currentPage;
                    this.formData = storageData.searchData
                    return {
                        searchData: storageData.searchData, 
                        currentPage: storageData.currentPage
                    }
                }
                return false
            },
            //添加数据
            addForm() {
                this.$router.push({path:'/advertising/add'});
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
            details(row) {
                this.showImg= {
                    isShow: true, 
                    src: row.advertImag
                };
            },
            //批量显示
            allShow() {
                this.switchChange(this.selectIds.join(','), 1);
            },
            //批量隐藏
            allHide() {
                this.switchChange(this.selectIds.join(','), 0);
            },
            //是否显示
            switchChange(id, isShow, isStop) {
                var url = "";
                if(isStop) {
                    this.$message.error("停用状态下不能修改该广告显示状态！");
                    return false;
                }
                else if (isShow == 0) {
                    if(id) {
                        url = "/advert/stopAll";
                        this.$confirm("是否确认提前结束广告？", "提示", {
                            cancelButtonText: "取消",
                            confirmButtonText: "确定",
                            type: "warning"
                        })
                        .then(({ data }) => {
                            this.$http({
                                url: url,
                                method: "POST",
                                data: { 
                                    advertIds: JSON.stringify(id.toString().split(',')) 
                                }
                            })
                            .then(({ data }) => {
                                this.getTableData();
                            })
                            .catch(() => {
                                this.loadData = false;
                            });
                        })
                        .catch(() => {
                            
                        });
                    }
                    else {
                        this.$message.error('请先选择需要批量操作的数据!');
                    }
                } else {
                    this.$confirm("当前广告不在显示时间内，如需显示请修改起止时间！", "提示", {
                        confirmButtonText: "去修改",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                    .then(({ data }) => {
                        this.$router.push({path:'/advertising/edit', query: {id: id, originName: 'updateShowTime'}});
                        
                    })
                }
                
            },
            //编辑
            toEdit(val) {
                if(!val.isStop) {
                    this.$router.push({path:'/advertising/edit', query: {id: val.advertId}});
                }
                
            },
            //所有删除
            allDel() {
                console.log(this.chooseShow)
                if(this.chooseShow) {
                    this.$message.error('显示广告不能删除!');
                }
                else {
                    this.del(this.selectIds.join(','));
                }
                
            },
            //删除
            del(id, isShow) {
                if(isShow != 0) {
                    if(id) {
                        this.$confirm("是否确定删除?", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        })
                        .then(() => {
                            this.loadData = true;
                            this.$http({
                                url: '/advert/delAdvert',
                                method: "POST",
                                data: {
                                    advertIds: JSON.stringify(id.toString().split(','))
                                }
                            })
                            .then(({ data }) => {
                                this.getTableData();
                            })
                            .catch(() => {
                                this.loadData = false;
                            });
                        })
                        .catch((err) => {
                        });
                    }
                    else {
                        this.$message.error('请先选择需要批量操作的数据!');
                    }
                }
            },
            //查看
            toView(val) {
                this.$router.push({path:"/advertising/detail", query: { id: val.advertId}});
            },
            //启用
            start(id, isShow) {
                this.$confirm("是否确定启用广告? ", "确认提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    dangerouslyUseHTMLString: true
                })
                .then(() => {
                    this.$http({
                        url: '/advert/_enable',
                        method: "POST",
                        data: { aIds: id }
                    })
                    .then(({ data }) => {
                        this.getTableData();
                    })
                    .catch(() => {
                        this.loadData = false;
                    });
                })
            },
            //所有停用
            allStop() {
                this.stop(this.selectIds.join(","));
            },
            //停用
            stop(id, isShow) {
                if(isShow != 0) {
                    if(id) {
                        this.$confirm("是否确定停用广告? 停用后关联信息将被删除且不可恢复", "确认提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning",
                            dangerouslyUseHTMLString: true
                        })
                        .then(() => {
                            this.$http({
                                url: '/advert/_disable',
                                method: "POST",
                                data: { aIds: id }
                            })
                            .then(({ data }) => {
                                this.getTableData();
                            })
                            .catch(() => {
                                this.loadData = false;
                            });
                        })
                    }
                    else {
                        this.$message.error('请先选择需要批量操作的数据!');
                    }
                }
                
            },
            //选择条数
            handleSelectionChange(selection) {
                this.selectArr = selection;
                this.isAllChoose();
                this.getSelectIds();
                this.isChooseShow();
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
            //选中是否含有显示状态广告
            isChooseShow() {
                let _this = this;
                this.chooseShow = false;
                this.selectArr.map(obj => {
                    if(obj.isShow === 0) {
                        _this.chooseShow = true;
                        console.log(_this.chooseShow);
                    }
                })
            },
            //全选
            chooseAll() {
                if(!this.allChoose) {
                    //this.allChoose = true;
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
                    //this.invertChoose = false;
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
            upDate(data) {
                this.$emit("upDate", data)
            },
            upload(data) {
                this.uploadMsg = {
                    dialog: true,
                    id: data.advertId,
                    url: "/picUpload/unityFileUpload-web/ad",
                    getUrl: "/picUpload/picFileList/ad"
                };
            },
        }
    }
</script>