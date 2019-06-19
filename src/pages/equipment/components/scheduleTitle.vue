<template>
    <div class="schedule-title" >
        <div class="fl" v-for="(item,index) in stepList" :key="index">
            <div 
                class="title-block" 
                :class="{'title-blue': index<=step}" >
                <span class="title-icon">
                    <i :class="`fa fa-`+item.icon"></i>
                </span>
                <p>{{item.name}}</p>
            </div>
            <div 
                v-if='index !== stepList.length-1'
                class="title-line"
                :class="{'line-blue': index<step}"
            ></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            stepList: [
                {name: '设备信息', icon: 'edit'},
                {name: '版本信息', icon: 'edit'},
                {name: '默认设置', icon: 'edit'},
                {name: '提交成功', icon: 'edit'},
            ]
        }
    },
    computed: {
        step: function() {
            return this.$store.state.equipment.step
        }
    }
}
</script>

<style lang="sass">
@import '../../../style/equipment.scss';
</style>
