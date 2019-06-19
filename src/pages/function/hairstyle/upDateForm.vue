<template>
  <div>
    <el-dialog
      :title="dialogMsg.dialogText"
      :visible.sync="dialogMsg.dialog"
      :close-on-click-modal="false"
      @open="openClick"
      width="50%"
      center
    >
      <el-form
        ref="addForm"
        :model="addForm"
        label-width="160px"
      >
        <el-form-item
          label="发型名称:"
          prop="hairdoName"
          :rules="{required: true, message: '发型名称不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addForm.hairdoName"
            placeholder="请填写发型名称"
            :maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="发型货号:"
          prop="hairdoNum"
          :rules="{required: true, message: '发型货号不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addForm.hairdoNum"
            placeholder="发型的唯一货号"
            :maxlength="10"
            @blur="hairdoNumBlur"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="上传照片(窈窕):"
          prop="haImaThinBefore"
          :rules="{required: true, message: '正面照片不能为空', trigger: 'change'}"
        >
          <div class="imgFile">
            <el-upload
              action="/picUpload/hair"
              accept="image/*"
              :on-success="imgsuccess"
              :show-file-list="false"
              @click.native="imgChange('haImaThinBefore')"
            >
              <div v-if="!addForm.haImaThinBefore">
                <svg
                  viewBox="64 64 896 896"
                  class="p1"
                  data-icon="plus"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M848 474H550V152h-76v322H176c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h298v322h76V550h298c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                </svg>
                <p class="p2">上传正面</p>
              </div>
              <div
                class="img-box"
                v-if="addForm.haImaThinBefore"
              >
                <img :src="addForm.haImaThinBefore">
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item
          prop="haImaThinAfter"
          :rules="{required: true, message: '反面照片不能为空', trigger: 'change'}"
        >
          <div class="imgFile">
            <el-upload
              action="/picUpload/hair"
              accept="image/*"
              :on-success="imgsuccess"
              :show-file-list="false"
              @click.native="imgChange('haImaThinAfter')"
            >
              <div v-if="!addForm.haImaThinAfter">
                <svg
                  viewBox="64 64 896 896"
                  class="p1"
                  data-icon="plus"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M848 474H550V152h-76v322H176c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h298v322h76V550h298c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                </svg>
                <p class="p2">上传反面</p>
              </div>
              <div
                class="img-box"
                v-if="addForm.haImaThinAfter"
              >
                <img :src="addForm.haImaThinAfter">
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item
          label="上传照片(适中):"
          prop="haImaInBefore"
          :rules="{required: true, message: '正面照片不能为空', trigger: 'change'}"
        >
          <div class="imgFile">
            <el-upload
              action="/picUpload/hair"
              accept="image/*"
              :on-success="imgsuccess"
              :show-file-list="false"
              @click.native="imgChange('haImaInBefore')"
            >
              <div v-if="!addForm.haImaInBefore">
                <svg
                  viewBox="64 64 896 896"
                  class="p1"
                  data-icon="plus"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M848 474H550V152h-76v322H176c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h298v322h76V550h298c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                </svg>
                <p class="p2">上传正面</p>
              </div>
              <div
                class="img-box"
                v-if="addForm.haImaInBefore"
              >
                <img :src="addForm.haImaInBefore">
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item
          prop="haImaInAfter"
          :rules="{required: true, message: '反面照片不能为空', trigger: 'change'}"
        >
          <div class="imgFile">
            <el-upload
              action="/picUpload/hair"
              accept="image/*"
              :on-success="imgsuccess"
              :show-file-list="false"
              @click.native="imgChange('haImaInAfter')"
            >
              <div v-if="!addForm.haImaInAfter">
                <svg
                  viewBox="64 64 896 896"
                  class="p1"
                  data-icon="plus"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M848 474H550V152h-76v322H176c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h298v322h76V550h298c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                </svg>
                <p class="p2">上传反面</p>
              </div>
              <div
                class="img-box"
                v-if="addForm.haImaInAfter"
              >
                <img :src="addForm.haImaInAfter">
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item
          label="上传照片(丰满):"
          prop="haImaInBefore"
          :rules="{required: true, message: '正面照片不能为空', trigger: 'change'}"
        >
          <div class="imgFile">
            <el-upload
              action="/picUpload/hair"
              accept="image/*"
              :on-success="imgsuccess"
              :show-file-list="false"
              @click.native="imgChange('haImaFatBefore')"
            >
              <div v-if="!addForm.haImaFatBefore">
                <svg
                  viewBox="64 64 896 896"
                  class="p1"
                  data-icon="plus"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M848 474H550V152h-76v322H176c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h298v322h76V550h298c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                </svg>
                <p class="p2">上传正面</p>
              </div>
              <div
                class="img-box"
                v-if="addForm.haImaFatBefore"
              >
                <img :src="addForm.haImaFatBefore">
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item
          prop="haImaFatAfter"
          :rules="{required: true, message: '反面照片不能为空', trigger: 'change'}"
        >
          <div class="imgFile">
            <el-upload
              action="/picUpload/hair"
              accept="image/*"
              :on-success="imgsuccess"
              :show-file-list="false"
              @click.native="imgChange('haImaFatAfter')"
            >
              <div v-if="!addForm.haImaFatAfter">
                <svg
                  viewBox="64 64 896 896"
                  class="p1"
                  data-icon="plus"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M848 474H550V152h-76v322H176c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h298v322h76V550h298c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                </svg>
                <p class="p2">上传反面</p>
              </div>
              <div
                class="img-box"
                v-if="addForm.haImaFatAfter"
              >
                <img :src="addForm.haImaFatAfter">
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item
          label="上传封面:"
          prop="hairdoImage"
          :rules="{required: true, message: '正面照片不能为空', trigger: 'change'}"
        >
          <div
            class="imgFile"
            style="display: inline-block;"
          >
            <el-upload
              action="/picUpload/hair"
              accept="image/*"
              :on-success="imgsuccess"
              :show-file-list="false"
              @click.native="imgChange('hairdoImage')"
            >
              <div v-if="!addForm.hairdoImage">
                <svg
                  viewBox="64 64 896 896"
                  class="p1"
                  data-icon="plus"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M848 474H550V152h-76v322H176c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h298v322h76V550h298c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                </svg>
                <p class="p2">上传封面</p>
              </div>
              <div
                class="img-box"
                v-if="addForm.hairdoImage"
              >
                <img :src="addForm.hairdoImage">
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item
          label="货品链接:"
          prop="goodsImage"
          :rules="{required: true, message: '货品链接不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addForm.goodsImage"
            placeholder="请填写货品链接"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="关联离线版本:"
          prop="UpLines"
          :rules="{type: 'array',required: true, message: '关联离线版本不能为空', trigger: 'change'}"
        >
          <el-select
            v-model="addForm.UpLines"
            multiple
            placeholder="请选择离线版本"
          >
            <el-option
              v-for="item in editionIdsUpLine"
              :key="item.editionId"
              :label="item.editionName"
              :value="item.editionId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="关联在线版本:"
          prop="onLines"
        >
          <el-select
            v-model="addForm.onLines"
            multiple
            placeholder="请选择在线版本"
          >
            <el-option
              v-for="item in editionIdsOnline"
              :key="item.editionId"
              :label="item.editionName"
              :value="item.editionId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="发型分类:"
          prop="labelActiveList1"
          :rules="{type: 'number',required: true, message: '发型分类不能为空', trigger: 'change'}"
        >
          <el-select
            v-model="addForm.labelActiveList1"
            placeholder="请选择发型分类"
          >
            <el-option
              v-for="item in $store.getters.GET_hairstyleList"
              :key="item.labelId"
              :label="item.labelName"
              :value="item.labelId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="季节:"
          prop="labelActiveList2"
          :rules="{type: 'array',required: true, message: '季节不能为空', trigger: 'change'}"
        >
          <el-select
            v-model="addForm.labelActiveList2"
            multiple
            placeholder="请选择季节"
          >
            <el-option
              v-for="item in $store.getters.GET_seasonList"
              :key="item.labelId"
              :label="item.labelName"
              :value="item.labelId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="脸型:"
          prop="labelActiveList3"
          :rules="{type: 'array',required: true, message: '脸型不能为空', trigger: 'change'}"
        >
          <el-select
            v-model="addForm.labelActiveList3"
            multiple
            placeholder="请选择脸型"
          >
            <el-option
              v-for="item in $store.getters.GET_faceList"
              :key="item.labelId"
              :label="item.labelName"
              :value="item.labelId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="其他:"
          prop="labelActiveList4"
          :rules="{type: 'array',required: true, message: '其他不能为空', trigger: 'change'}"
        >
          <el-select
            v-model="addForm.labelActiveList4"
            multiple
            placeholder="请选择内容"
          >
            <el-option
              v-for="item in $store.getters.GET_otherList"
              :key="item.labelId"
              :label="item.labelName"
              :value="item.labelId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="标签:"
          prop="hairdoLabel"
          :rules="{required: true, message: '标签不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addForm.hairdoLabel"
            placeholder="填写搭配相关的标签，以逗号做分隔"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="备注:"
          prop="hairdoRemark"
        >
          <el-input
            v-model="addForm.hairdoRemark"
            placeholder="请输入备注信息"
          ></el-input>
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
    },
    upDateForm: {
      type: Object
    }
  },
  data() {
    return {
      addForm: {
        hairdoId: "",
        goodsImage: "", //货品链接
        hairdoName: "", //发型名字
        hairdoImage: "", //封面链接
        hairdoWeight: "10", //权重
        hairdoNum: "", //发型货号
        hairdoLabel: "", //标签
        hairdoCreatedId: "", //操作人id
        editionIds: [], //版本关联集合
        list: [], //标签关联集合
        haImaThinBefore: "", //窈窕第一张
        haImaThinAfter: "", //窈窕第二张
        haImaInBefore: "", //适中第一张
        haImaInAfter: "", //适中第二张
        haImaFatBefore: "", //丰满第一张
        haImaFatAfter: "", //丰满第二张
        hairdoRemark: "", //备注
        UpLines: [],
        onLines: [],
        labelActiveList1: [],
        labelActiveList2: [],
        labelActiveList3: [],
        labelActiveList4: []
      },
      imgfileName: "",
      editionIdsOnline: [],
      editionIdsUpLine: []
    };
  },
  created() {
    this.get_table_data1();
    this.get_table_data2();
  },
  updated() {
    // console.log(123)
  },
  methods: {
    openClick() {
      console.log(this.upDateForm);
      var upDateForm = this.upDateForm;
      var addForm = {
        hairdoId: upDateForm.hairdoId,
        goodsImage: upDateForm.goodsImage, //货品链接
        hairdoName: upDateForm.hairdoName, //发型名字
        hairdoImage: upDateForm.hairdoImage, //封面链接
        hairdoWeight: "10", //权重
        hairdoNum: upDateForm.hairdoNum, //发型货号
        hairdoLabel: upDateForm.label, //标签
        hairdoCreatedId: "", //操作人id
        labelRelevanDOS: [], //标签关联集合
        list: [], //版本关联集合
        haImaThinBefore: upDateForm.thinImage[0], //窈窕第一张
        haImaThinAfter: upDateForm.thinImage[1], //窈窕第二张
        haImaInBefore: upDateForm.middeImage[0], //适中第一张
        haImaInAfter: upDateForm.middeImage[1], //适中第二张
        haImaFatBefore: upDateForm.fatImage[0], //丰满第一张
        haImaFatAfter: upDateForm.fatImage[1], //丰满第二张
        hairdoRemark: upDateForm.remark, //备注
        UpLines: [],
        onLines: [],
        labelActiveList1: [],
        labelActiveList2: [],
        labelActiveList3: [],
        labelActiveList4: []
      };
      for (var i = 0; i < upDateForm.edition.length; i++) {
        if (upDateForm.edition[i].offLine == 1) {
          addForm.UpLines.push(upDateForm.edition[i].editionId);
        } else {
          addForm.onLines.push(upDateForm.edition[i].editionId);
        }
      }
      addForm.labelActiveList1 = upDateForm.hairType[0].labelId;
      for (var i = 0; i < upDateForm.season.length; i++) {
        addForm.labelActiveList2.push(upDateForm.season[i].labelId);
      }
      for (var i = 0; i < upDateForm.face.length; i++) {
        addForm.labelActiveList3.push(upDateForm.face[i].labelId);
      }
      for (var i = 0; i < upDateForm.otherLbale.length; i++) {
        addForm.labelActiveList4.push(upDateForm.otherLbale[i].labelId);
      }
      this.addForm = addForm;
    },
    //获取在线版本
    get_table_data1() {
      this.$http({
        url: "/edition/selectEdition",
        method: "POST",
        data: { editionType: 2, offLine: 0 }
      })
        .then(({ data }) => {
          this.editionIdsOnline = data.rows;
        })
        .catch(() => {});
    },
    //获取离线版本
    get_table_data2() {
      this.$http({
        url: "/edition/selectEdition",
        method: "POST",
        data: { editionType: 2, offLine: 1 }
      })
        .then(({ data }) => {
          this.editionIdsUpLine = data.rows;
        })
        .catch(() => {});
    },
    addSave() {
      var _this = this;
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          var arr = [],
            arr2 = [];
          var arr1 = arr.concat(
            [this.addForm.labelActiveList1],
            this.addForm.labelActiveList2,
            this.addForm.labelActiveList3,
            this.addForm.labelActiveList4
          );
          var arr3 = arr2.concat(this.addForm.UpLines, this.addForm.onLines);
          for (var i = 0; i < arr1.length; i++) {
            _this.addForm.labelRelevanDOS.push({ labelId: arr1[i] });
          }
          for (var i = 0; i < arr3.length; i++) {
            _this.addForm.list.push({ editionId: arr3[i] });
          }
          this.$http({
            url: "/hairdo/updateHairdo",
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
      // this.$emit('test',{
      //    	dialog:false,
      //    	dialogText:'新增发型',
      //    });
    },
    dialogFlase() {
      this.$emit("test", {
        dialog: false,
        dialogText: "修改发型"
      });
    },
    imgsuccess(res, file, fileList, str) {
      this.$message.success("上传成功");
      this.addForm[this.imgfileName] = res.data;
    },
    imgChange(str) {
      this.imgfileName = str;
    },
    hairdoNumBlur() {
      if (!this.addForm.hairdoNum) {
        return;
      }
      this.$http({
        url: "/hairdo/number",
        method: "POST",
        data: { num: this.addForm.hairdoNum, type: 1 }
      })
        .then(data => {
          console.log(data);
        })
        .catch(({ msg }) => {
          this.addForm.hairdoNum = "";
        });
    }
  }
};
</script>