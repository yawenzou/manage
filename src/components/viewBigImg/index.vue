<template>
    <div>
        <el-dialog
            title= "预览大图"
            width= "50%"
            :visible.sync= "showImg.isShow"
        >
            <img :src="showImg.src" alt="大图" style = 'width: 100%;' />
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        showImg: {
            type: Object
        }
    },
    data() {
        return {}
    },
    methods: {
    }
}
</script>
