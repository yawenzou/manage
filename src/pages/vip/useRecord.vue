<template>
    <div class="panel">
        <panel-title :title="$route.meta.title">
            <el-button type="primary" @click="$router.go(-1)" >返回</el-button>
        </panel-title>
    <div class="panel-body">
        <div class="detail-container">
            <div class="table-title"> <i class="fa fa-bookmark" aria-hidden="true"></i> 历史形象</div>
            <ul class="img-list">
                <li>
                    <img :src="dealData(historyInfo, 'picUrl')" alt="正面图">
                    <div class="p-bg"></div>
                    <p>正面图</p>
                </li>
                <li>
                    <img :src="dealData(historyInfo, 'leftPicUrl')" alt="左面图">
                    <div class="p-bg"></div>
                    <p>左面图</p>
                </li>
                <li>
                    <img :src="dealData(historyInfo, 'rightPicUrl')" alt="右面图">
                    <div class="p-bg"></div>
                    <p>右面图</p>
                </li>
                <li>
                    <img :src="dealData(historyInfo, 'backPicUrl')" alt="背面图">
                    <div class="p-bg"></div>
                    <p>背面图</p>
                </li>
            </ul>
            <table class="common-table">
                <tr>
                    <td width="16.67%">发型</td>
                    <td >
                        <span class = "a-blue" @click="toHair(historyInfo.hairNumLog)" >
                            {{dealData(historyInfo, 'hairNumLog')}}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td width="16.67%">服装</td>
                    <td >
                        <span
                            class = "a-blue"
                            v-for="(value, index) in dealData(historyInfo, 'clothesNumLog').split(',')" 
                            :key="index"
                            @click="toClothes(value)"
                        >{{value }} </span>  
                    </td>
                </tr>
            </table>
            <div class="table-title"> <i class="fa fa-bookmark" aria-hidden="true"></i> 使用记录</div>
            <table class="common-table marb40">
                <tr>
                    <td colspan="1" width="16.67%">设备ID</td>
                    <td colspan="2" width="33.33%">{{dealData(useInfo, 'devId')}}</td>
                    <td colspan="1" width="16.67%">开始时间</td>
                    <td colspan="2">
                        {{dealData(useInfo, 'beginTime')}}
                        {{$dateFormat(parseInt(dealData(useInfo, 'beginTime')),"yyyy-MM-dd hh:mm:ss")}}
                    </td>
                </tr>
                <tr>
                    <td colspan="1">使用时长</td>
                    <td colspan="2">{{useTime}}</td>
                    <td colspan="1">使用地点</td>
                    <td colspan="2">
                        {{dealData(useInfo, 'devCity')}}
                        {{dealData(useInfo, 'devArea')}}
                        {{dealData(useInfo, 'devAddress')}}
                    </td>
                </tr>
            </table>
            <el-table 
                ref = "multipleTable" 
                :data="tableData" 
                v-loading="loadData" 
                element-loading-text="拼命加载中" 
                border 
                stripe
                style="width: 100%;"
            >
                <el-table-column prop="timeStamp" label="操作时间" align="center" >
                    <template slot-scope="props">
                        {{$dateFormat(props.row.timeStamp)}}
                    </template>
                </el-table-column>
                <el-table-column prop="functionType" label="使用功能" align="center" > 
                    <template slot-scope="props">
                        {{operateType[props.row.functionType]}}
                    </template>
                </el-table-column>
                <el-table-column prop="fingerprintId" label="记录" align="center" >
                    <template slot-scope="props">
                        <span  
                            class = "a-blue"
                            v-for="(value, index) in dealData(props.row, 'list', [])" 
                            :key="index"
                        >
                            <span v-if="value.typeInt === 1">
                                <img 
                                    :src="value.goodsId"
                                    style="width:100px;padding: 10px;"  
                                    @click="details(value.goodsId)" 
                                /> 
                            </span>
                            <span v-else @click="toViewDetail(value)">{{value.goodsId}} </span>
                        </span>  
                    </template>
                </el-table-column>
                
            </el-table>
            <div>
                <bottom-tool-bar>
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
    <view-big-img :showImg = showImg></view-big-img>
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar, viewBigImg } from "components";
export default {
    data() {
        return {
            useInfo: null,
            historyInfo: null,
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
            showImg: {
                isShow: false,
                src: ''
            },
            operateType: {
                0: "跳过拍照",
                1: "拍摄图片",
                2: "推荐脸型",
                3: "选择脸型",
                4: "选择脸型（选择后微调）",
                5: "推荐发型",
                6: "推荐服装",
                7: "一件搭配",
                8: "选择发型",
                9: "选择服装",
                10: '历史记录',
                11: "获取搭配",
                12: "结束",
                13: "重拍",
                14: "截屏"
            }
        };
    },
    computed: {
        useTime: function() {
            if(this.useInfo && this.useInfo.useTime) {
                let sss = parseInt(this.useInfo.useTime /1000);
                if(sss > 0) {
                    let hh = parseInt(sss/3600, 10);
                    let mm = parseInt((sss - hh*3600)/60, 10);
                    let ss = parseInt((sss - hh*3600 - mm*60), 10);
                    let h = hh ? hh+'h' : '';
                    let m = mm ? mm+'m' : '';
                    let s = ss ? ss+'s' : '';
                    return h+m+s;
                }
               return '不到一秒';
              
            }
            else {
                return '--';
            }
        }
    },
    components: {
        panelTitle,
        bottomToolBar,
        viewBigImg
    },
    created() {
        this.getHistoryDetail();
        this.getDetail();
        this.getTableData();
    },
    methods: {
        //获取历史形象数据
        getHistoryDetail() {
            this.$http({
                url: "wxuser/getHistory",
                method: "POST",
                data: { 
                    wearLogId: this.$route.query.id
                }
            })
            .then(({ data }) => {
                console.log(data);
                this.historyInfo = data;
            })
            .catch(() => {
                this.load_data = false;
            });
        },
        //获取使用记录详情
        getDetail() {
            this.$http({
                url: "/wxuser/getWxUserWearDetail",
                method: "POST",
                data: { 
                    wearLogId: this.$route.query.id,
                    wxUserId: this.$route.query.userId 
                }
            })
            .then(({ data }) => {
                console.log(data);
                this.useInfo = data;
            })
            .catch(() => {
                this.load_data = false;
            });
        },
        //获取使用记录分页数据
        getTableData() {
            this.loadData = true;
            var form = {
                wxUserId: this.$route.query.userId,
                wearLogId: this.$route.query.id,
                curPage: this.currentPage,
                pageSize: this.length
            };
            this.$http({
                url: '/wxuser/getWxUserDeviceLog',
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
        dealData(obj, key, format) {
            if(obj&&obj[key]) {
                return obj[key]
            }
            else {
                return format ? format : ''
            }
        },
        toViewDetail(value) {
            //1图片链接2脸型3发型4服装5一件搭配
            switch (value.typeInt) {   
                case 2:
                    this.toFace(value.goodsId);
                    break;
                case 3:
                    this.toHair(value.goodsId);
                    break;
                case 4:
                    this.toClothes(value.goodsId);
                    break;
                case 5:
                    this.toCollocation(value.goodsId);
                    break;
                default:
                    this.$message.error('该操作类型无法识别');
                    
            }
        },
        //查看发型详情
        toHair(id) {
            this.$router.push({path: '/hairstyleDetails', query: {id: id}});
        },
        //查看脸型详情
        toFace(id) {
            this.$router.push({path: '/faceDetails', query: {id: id}});
        },
        //查看一件搭配详情
        toCollocation(id) {
            this.$router.push({path: '/collocationDetails', query: {id: id}});
        },
        //查看服装详情
        toClothes(id) {
            this.$router.push({path: '/clothingDetails', query: {id: id}});
        },
        //查看大图或视频
        details(src) {
            this.showImg= {
                isShow: true, 
                src: src
            };
        },
    }
};
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss">
 @import "../../style/vip";
</style>