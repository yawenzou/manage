<template>
    <div class="panel">
        <panel-title :title="$route.meta.title"></panel-title>
        <div class="panel-body clearfix">
            <div class="left-container">
                <div class="left-card">
                    <div class="pic">
                        <img src="###" alt="头像">
                    </div>
                    <p class="nickname">{{dealData('nickName')}}</p>
                    <p class="id">ID: {{dealData('id')}}</p>
                    <div class="info">
                        <i class = "fa fa-intersex"></i> 
                        性别：{{sex}}
                    </div>   
                    <div class="info">
                        <i class = "fa fa-user-o"></i> 
                        年龄：{{dealData('age')}}
                    </div>
                    <div class="info">
                        <i class = "fa fa-user-o"></i> 
                        身高：{{dealData('height')}}
                    </div>  

                    <div class="line"></div>

                    <div class="title">形象</div>
                    <div class="card-content">
                        <div class="info">
                            <i class = "fa fa-user-o"></i> 
                            体型：{{faceSize}}
                        </div>   
                        <div class="info">
                            <i class = "fa fa-user-o"></i> 
                            肤色：{{dealData('color')}}
                        </div>
                        <div class="info">
                            <i class = "fa fa-user-o"></i> 
                            脸型：{{dealData('faceName')}}
                        </div>
                    </div>

                    <div class="line"></div>

                    <div class="title">标签</div>
                    <div class="card-content">
                        <ul class="label-ul label-black clearfix">
                            <li 
                                v-for="(value, index) in dealData('behaviorLabelList')" 
                                :key="index"
                            >{{value.labelName}}</li>
                            <!-- <li>长卷发</li>
                            <li>假两件衬衫</li>
                            <li>休闲大衣</li>
                            <li>牛仔裤</li>
                            <li>长款毛衫</li>
                            <li>黑色长裤</li> -->
                        </ul>
                        <ul class="label-ul label-blue clearfix">
                            <li 
                                v-for="(value, index) in labelArr" 
                                :key="index"
                            >{{value}}</li>
                            <li class="add-label" @click="openLabel">+</li>
                        </ul>
                    </div>

                </div>
                <div class="left-card">
                    <div class="info">
                        <i class = "fa fa-phone"></i> 
                        联系方式：未知
                    </div>   
                    <div class="info">
                        <i class = "fa fa-calendar-check-o"></i> 
                        注册时间：{{dealData('faceName') === '--' ? '--' : $dateFormat(dealData('faceName'))}}
                    </div>
                    <div class="info">
                        <i class = "fa fa-area-chart"></i> 
                        常用地区：{{dealData("city")}}
                    </div>  
                </div>            
            </div>
            <div class="right-container">
                <div class="title">
                    试穿记录
                    <span class="search fr" @click="openSearch" >搜索</span>
                </div>
                <div class="list-content">
                    <div v-for="(item, index) in fittingData" :key="index" class="list-row">
                        <div class="list-tip">
                            <span class="time">
                                <i class="fa fa-clock-o"></i> 
                                {{$dateFormat(item.createTime)}}
                            </span>
                            <span class="area">
                                <i class="fa fa-map-marker"></i> 
                                {{item.province}}-{{item.city}}
                            </span>
                        </div>
                        <div class="card-block">
                            <div class="cover">
                                <img :src="item.picUrl" alt="正面图" />
                            </div>
                            <div class="detail-row">
                                <span class="label">发型</span>
                                <ul class="id-list">
                                    <li @click="toHair(item.hairNumLog)">{{item.hairNumLog}}</li>   
                                </ul>
                            </div>
                            <div class="detail-row">
                                <span class="label">服装</span>
                                <ul v-if="item.clothesNumLog" class="id-list">
                                    <li 
                                        v-for="(value, index) in item.clothesNumLog.split(',')" 
                                        :key="index"
                                        @click="toClothes(value)"
                                    >{{value}}</li>  
                                </ul>
                            </div>
                            <div class="detail-btn" @click="lookDetail(item.id)">查看详情</div>
                        </div>
                    </div>
                </div>
                <div v-if="!isFinish" class="load-more" @click="toNext">加载更多......</div>
                <div v-else class="load-finish">数据已全部加载完</div>
            </div>
        </div>
        <add-label
            :label="dialogMsg.label"
            :labelArr2="labelArr"
            @updateLabel="updateLabel1"
        ></add-label>
        <search
            :search="dialogMsg.search"
            :form2="form"
            @updateSearch="updateSearch"
        ></search>
    </div>
</template>
<script>
import { panelTitle, bottomToolBar } from "components";
import addLabel from './addLabel.vue';
import search from './search.vue';
export default {
    data() {
        return {
            labelArr: [],
            form: {
                goodsNo: '',
                goodsType: '',
                wearTime: '',
                city: ''
            },
            dialogMsg: {
                label: {
                    isShow: false
                },
                search: {
                    isShow: false
                }
            },
            baseDetail: null,
            fittingData: [],
            labelData: null,
            currentPage: 1,
            total: 0,
            pageSize: 10
        }
    },
    computed: {
        sex: function() {
            if(this.baseDetail) {
                switch (this.baseDetail.gender) {
                    case 1: 
                        return '男';
                    case 2: 
                        return '女';
                    default: 
                        return '未知'
                }
            }
            else {
                return '未知'
            }
            
        },
        faceSize: function() {
            if(this.baseDetail) {
                switch (this.baseDetail.bodySize) {
                    case 0: 
                        return '苗条';
                    case 1: 
                        return '标准';
                    case 2: 
                        return '丰满';
                    default: 
                        return '--'
                }
            }
            else {
                return '--'
            }
        },
        isFinish: function() {
            if(this.pageSize*this.currentPage < this.total) {
                return false;
            }
            else {
                return true;
            }
        }
    },
    components: {
        panelTitle,
        addLabel,
        search
    },
    created() {
        this.getBaseDetail();
        this.getFitting();
    },
    methods: {
        //获取会员基本信息
        getBaseDetail() {
            this.$http({
                url: '/wxuser/getWXUserDetail',
                method: 'POST',
                data: {
                    wxUserId: this.$route.query.id,
                    wearLogId: 1
                }
            })
            .then(({data}) => {
                this.baseDetail = data;
                this.getLabel(data.openId);
            })
        },
        //获取试穿记录
        getFitting() {
            let form = this.form;
            form.wxUserId = this.$route.query.id
            form.curPage= this.currentPage;
            form.pageSize= this.pageSize;
            this.$http({
                url: '/wxuser/getWxUserWearLog',
                method: 'POST',
                data: form
            })
            .then(({data}) => {
                this.total = data.total;
                this.fittingData = this.fittingData.concat(data.rows);
                
            })
        },
        //获取标签记录
        getLabel(openId) {
            this.$http({
                url: '/wxuser/getWxLabelByOpenId',
                method: 'POST',
                data: {
                    openId: openId
                }
            })
            .then(({data}) => {
               console.log(data);
               this.getLabelName(data);
            })
        },
        //获取标签记录的名称
        getLabelName(arr) {
            let arr1 = [];
            for(let i=0; i< arr.length; i++) {
                arr1.push(arr[i].labelName);
            }
            this.labelArr = arr1;
        },
        //添加标签
        openLabel() {
            this.dialogMsg.label.isShow = true
        },
        //更新标签
        updateLabel1(arr) {
            if(arr) {
                
                this.$http({
                    url: '/wxuser/addWxLabel',
                    method: 'POST',
                    data: {
                        labelNameJson: JSON.stringify(arr),
                        openId: this.baseDetail.openId
                    }
                })
                .then(({data}) => {
                    console.log(data);
                    this.labelArr = arr;
                })
                .catch(({msg}) => {
                    this.$message.error(msg);
                });
            }
            this.dialogMsg.label.isShow = false
        },
        //打开搜索
        openSearch() {
            this.dialogMsg.search.isShow = true;
        },
        //更新搜索
        updateSearch(form) {
            if(form) {
                this.form = form;
                this.fittingData = [];
                this.getFitting();
            }
            this.dialogMsg.search.isShow = false;
        },
        //查看使用记录详情
        lookDetail(id) {
            this.$router.push({path: '/vip/useRecord', query: {id: id, userId: this.$route.query.id}})
        },
        //判断数据是否存在
        dealData(data) {
            let data1 = this.baseDetail && this.baseDetail[data] ? this.baseDetail[data] : '--';
            return data1;
        },
        //下一页 
        toNext() {
            this.currentPage++;
            this.getFitting();
        },
        //查看发型详情
        toHair(id) {
            this.$router.push({path: '/hairstyleDetails', query: {id: id}});
        },
        //查看服装详情
        toClothes(id) {
            this.$router.push({path: '/clothingDetails', query: {id: id}});
        }
    }
}
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
 @import "../../style/vip";
</style>

