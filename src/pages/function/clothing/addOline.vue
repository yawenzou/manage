<template>
  <div>
    <el-dialog
      :title="dialogMsg.dialogText"
      :visible.sync="dialogMsg.dialog"
      :close-on-click-modal="false"
      width="50%"
      center
    >
      <el-form
        ref="addForm"
        :model="addForm"
        label-width="160px"
      >
        <el-form-item
          label="版本名称:"
          prop="editionName"
          :rules="{required: true, message: '版本名称不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addForm.editionName"
            placeholder="请填写该版本的版本名称"
            :maxlength="50"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="展示面数:"
          prop="editionShowNum"
          :rules="{type: 'number',required: true, message: '展示面数不能为空', trigger: 'change'}"
        >
          <el-select
            v-model="addForm.editionShowNum"
            placeholder="请选择离线版本"
          >
            <el-option
              label="四个面"
              :value="4"
            >
            </el-option>
            <el-option
              label="两个面"
              :value="2"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="备注:"
          prop="editionRemark"
          :rules="{required: true, message: '备注不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addForm.editionRemark"
            placeholder="请输入备注信息"
            type="textarea"
            :rows="4"
            :maxlength="255"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="版本号:"
          prop="editionNum"
          :rules="{required: true, message: '版本号不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addForm.editionNum"
            placeholder="版本号是用来区分同名版本的区别"
            :maxlength="20"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFlase">取 消</el-button>
        <el-button
          type="primary"
          @click="addSave"
        >保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import { mapState } from "vuex";
export default {
  props: {
    dialogMsg: {
      type: Object //传入的类型
    }
  },
  data() {
    return {
      addForm: {
        editionName: "", //版本名称
        editionNum: "", //版本号
        editionRemark: "", //备注
        editionCreatedId: "1", //操作人ID
        editionShowNum:''
      }
    };
  },
  methods: {
    addSave() {
      var _this = this;
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          var url = "";
          if (this.dialogMsg.dialogText == "新增在线版本") {
            url = "/cloth/insertEditiCloth";
          } else {
            url = "/cloth/insertOutEditiCloth";
          }
          this.$http({
            url: url,
            method: "POST",
            data: this.addForm
          })
            .then(({ data }) => {
              this.$emit("save");
              this.dialogFlase();
            })
            .catch(() => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    dialogFlase() {
      this.$emit("test", {
        dialog: false,
        dialogText: "在线版本"
      });
      this.addForm = {
        editionName: "", //版本名称
        editionNum: "", //版本号
        editionRemark: "", //备注
        editionCreatedId: "1", //操作人ID
        editionShowNum:''
      };
    }
  }
};
</script>