<template>
    <div class="panel">
        <panel-title :title="$route.meta.title">
            <el-button type="primary" @click="$router.go(-1)" >返回</el-button>
        </panel-title>
        <div class="panel-body">

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
                <el-form-item label="">
                    <el-button type="primary" @click="find" >查询</el-button>
                    <el-button type="primary" @click="emptyForm" >重置</el-button>
                </el-form-item>
            </el-form>

            <div class="table-title">数据列表</div>
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
                        <span class = "cyan">{{props.row.isShow == 0 ? '展示中': '隐藏中'}}</span>      
                    </template>
                </el-table-column>
                <el-table-column prop="weight" label="权重" align="center"> </el-table-column>
                <el-table-column label="操作" align="center"  width="230" >
                    <template slot-scope="props">
                        <span class="operate-icon" @click="toView(props.row)">
                            <i class="fa fa-eye"></i> 查看
                        </span>
                        <span class="operate-icon" @click="joinList(props.row.advertId)">
                            <i class="fa fa-plus"></i> 添加至列表
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <bottom-tool-bar>
                    <div slot="handler">
                        <el-checkbox v-model="allChoose" label="全选" border @change="chooseAll"></el-checkbox>
                        <el-checkbox v-model="invertChoose" label="反选" border @change="chooseInvert"></el-checkbox>
                        <el-button type="primary" @click="allJoinList" circle>批量添加</el-button>
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
                this.currentPage = 1;
                this.emptyForm();
                this.$router.push({ path: '/advertising/versions/list', query: { type: val } });
            },
            //清空查询
            emptyForm() {
                this.formData = {
                    advertName: '',
                    advertSeat: ''
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
                form.editionId = this.$route.query.vid;
                let url = this.type === '在线版本' ? '/advert/getAdvertInEd' : '/advert/getAdvertInEd';
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
            //查看
            toView(val) {
                this.$router.push({path:"/advertising/detail", query: { id: val.advertId}});
            },
            //批量添加
            allJoinList() {
                this.joinList(this.selectIds.join(","))
            },
            //添加至列表
            joinList(id) {
                this.$http({
                    url: '/advert/addAD2Version',
                    method: "POST",
                    data: { 
                        adIds: id,
                        vId: this.$route.query.vid
                    }
                })
                .then(({ data }) => {
                    this.getTableData();
                })
                .catch(() => {
                    this.loadData = false;
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