<template>
    <div>
        <el-dialog 
            title="高级搜索" 
            :visible.sync="search.isShow"
            width="40%"
            :close-on-click-modal="false"
            @open="open"
            center
        >
            <el-form
                :inline="true"
                :model="form"
                label-width="80px"
            >
                <el-form-item label="输入查询:">
                    <el-select 
                        v-model="form.goodsType"
                        placeholder="全部"
                        style="width:80px"
                    >
                        <el-option value="1" label="发型"></el-option>
                        <el-option value="2" label="服装"></el-option>
                    </el-select>
                    <el-input
                        v-model="form.goodsNo"
                        placeholder="货号"
                        :disabled="!form.goodsType"
                        style="width:120px"
                    ></el-input>
                </el-form-item>
                <el-form-item label="试穿时间:">
                    <el-date-picker
                        v-model="form.wearTime"
                        placeholder="选择时间"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="试穿地点:">
                    <el-select 
                        v-model="form.city"
                        placeholder="全部"
                    >
                        <el-option value="11" label="11"></el-option>
                        <el-option value="22" label="22"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="clear">清空条件</el-button>
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="save" >保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        search: Object,
        form2: Object
    },
    data() {
        return {
            form: JSON.parse(JSON.stringify(this.form2))
        }
    },
    methods: {
        open() {
            this.form = JSON.parse(JSON.stringify(this.form2))
        },
        cancel() {
            this.$emit("updateSearch", false)
        },
        save() {
            this.$emit("updateSearch", this.form)
        },
        clear() {
            this.form={
                goodsNo: '',
                goodsType: '',
                wearTime: '',
                city: ''
            }
            this.$emit("updateSearch", this.form)
        }
    }
}
</script>


