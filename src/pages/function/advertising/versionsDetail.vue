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

            <div class="table-title"> <i class="fa fa-bookmark" aria-hidden="true"></i> 基本信息</div>
            <table class="common-table">
                <tr>
                    <td colspan="1" width="16.67%">ID</td>
                    <td colspan="2" width="33.33%">{{info.editionId}}</td>
                    <td colspan="1" width="16.67%">版本名称</td>
                    <td colspan="2">{{info.editionName}}</td>
                </tr>
                <tr>
                    <td colspan="1">日期</td>
                    <td colspan="2">{{$dateFormat(info.editionCreated)}}</td>
                    <td colspan="1">版本号</td>
                    <td colspan="2">{{info.editionNum}}</td>
                </tr>
                <tr>
                    <td colspan="1">版本描述</td>
                    <td colspan="5">{{info.editionRemark}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script type="text/javascript">
import { panelTitle} from "components";
export default {
    data() {
        return {
            type: '基本信息',
            info: {}
        };
    },
    components: {
        panelTitle
    },
    created() {
        this.getDetail();
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
            
        },
        getDetail() {
            let url = this.$route.query.type === '在线版本' ? '/advert/selectEdiAdvDetail' :'/advert/selectEdiAdvOutDetail';
            this.$http({
                url: url,
                method: "POST",
                data: { editionId: this.$route.query.id }
            })
            .then(({data}) => {
                console.log(data);
                this.info = data;
            })
            .catch((err) => {
                console.log(err)
            });
        },
    }
};
</script>

