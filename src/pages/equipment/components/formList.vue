<template>
    <div class="panel">
        <panel-title :title="title">
            <el-button
                type="primary"
                @click="$router.go(-1)"
            >返回</el-button>
        </panel-title>
        <div>
            <div class="equipment-contailer">
                <schedule-title></schedule-title>
                <div class="equipment-content">
                    <baseInfo 
                        v-if="step===0"
                    ></baseInfo>
                    <versionsInfo 
                        v-if="step===1"
                    ></versionsInfo>
                    <defaultSetting 
                        v-if="step===2"
                    ></defaultSetting>
                    <submitSuccess 
                        v-if="step===3"
                    ></submitSuccess>
                </div>
                <div class="btn-block">
                    <span 
                        v-if="(step===1)||(step===2)" 
                        class="btn1 blue-o-btn" 
                        @click="toPrev"
                    >上一步</span>
                   <!--  <span 
                        v-if="(step===0)||(step===1)"
                        class="btn1 blue-btn" 
                        @click="toNext"
                    >下一步</span>  -->
                    <span 
                        v-if="step===2"
                        class="btn1 blue-btn" 
                    >提交</span>
                    <span 
                        v-if="step===3" 
                        class="btn1 blue-btn" 
                    >返回列表</span>
                    <span 
                        v-if="step===3"
                        class="btn1 blue-o-btn" 
                        @click="toFirst"
                    >重新修改</span> 
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import {mapMutations} from 'vuex';
    import {panelTitle} from 'components';
    import scheduleTitle from './scheduleTitle';
    import baseInfo from './baseInfo';
    import versionsInfo from './versionsInfo';
    import defaultSetting from './defaultSetting';
    import submitSuccess from './submitSuccess';
    export default {
        props: ['title'],
        data() {
            return {}
        },
        computed: {
            step: function() {
                return this.$store.state.equipment.step
            }
        },
        components: {
            scheduleTitle,
            panelTitle,
            baseInfo,
            versionsInfo,
            defaultSetting,
            submitSuccess
        },
        methods: {
            ...mapMutations([
                'NEXT_STEP',
                'PREV_STEP',
                'SET_STEP'
            ]),
            toPrev() {
                this.PREV_STEP()
            },
            toNext() {
                this.NEXT_STEP()
            },
            toFirst() {
               this.SET_STEP(0) 
            }
        }
    }
</script>