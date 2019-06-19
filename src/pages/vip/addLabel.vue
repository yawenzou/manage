<template>
    <div>
        <el-dialog 
            title="添加标签" 
            :visible.sync="label.isShow"
            width="50%"
            :close-on-click-modal="false"
            @open="open"
            @close="cancel"
            center
        >

            <div class="add-label">
                <div class="title">输入标签:</div>
                <div class="input-area">
                    <el-input 
                        v-model.trim = "labelText" 
                        placeholder="不超过12个字节，按回车生成标签"
                        :maxlength = '12'
                        v-on:keyup.enter.native="addLabel"
                    ></el-input>
                </div>
                
                <div class="title">当前自定义标签:</div>
                <ul class="label-list cearfix">
                    <li v-for="(value, index) in labelArr"
                        :key = "index">
                        <div class="label-name">{{value}}</div>
                        <div class="del-btn" @click="delLabel(value)">
                            <i class="fa fa-trash"></i>
                        </div>
                    </li>
                </ul>
            </div>

            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="save" >保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        label: {
            type: Object
        },
        labelArr2: {
            type: Array
        }
    },
    data() {
        return {
            labelText: '',
            labelArr: JSON.parse(JSON.stringify(this.labelArr2))
        }
    },
    methods: {
        open() {
            this.labelArr = JSON.parse(JSON.stringify(this.labelArr2));
        },
        cancel() {
            this.$emit("updateLabel", false)
        },
        save() {
            this.$emit("updateLabel", this.labelArr)
        },
        //添加标签
        addLabel() {
            if(!this.labelText) {
                this.$message.error("不能添加空标签");
            }
            else if(this.labelArr.indexOf(this.labelText) > -1) {
                this.$message.error("该标签已经存在，请勿重复添加");
            }
            else if(this.labelArr.length >= 10) {
                this.$message.error("标签最多添加10个");
            }
            else {
                this.labelArr.push(this.labelText);
                this.labelText = '';
            }
            
        },
        //删除标签
        delLabel(value) {
            let index = this.labelArr.indexOf(value);
            this.labelArr.splice(index,1);
        }
    }
}
</script>


