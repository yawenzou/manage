<template>
  <div class="panel">
    <panel-title :title="title">
      <el-button
        type="primary"
        @click="$router.go(-1)"
      >返回</el-button>
    </panel-title>
    <div style="background: #fff;padding:30px 30px 50px 30px;">
      <el-form
        ref="addForm"
        :model="addForm"
        label-width="160px"
        v-loading="loading"
      >
        <el-form-item
          label="搭配名称:"
          prop="collocaName"
          :rules="{required: true, message: '服装名称不能为空', trigger: 'blur'}"
        >
          <el-input
            v-model="addForm.collocaName"
            placeholder="请填写搭配名称"
            :maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="上传封面:"
          prop="collocaImage"
          :rules="{required: true, message: '封面不能为空', trigger: 'change'}"
        >
          <div
            class="imgFile"
            style="display: inline-block;"
          >
            <el-upload
              action="/picUpload/recommend-cover"
              accept="image/*"
              :data="{token:$store.getters.get_user_info.token || ''}"
              :before-upload="beforeUpload"
              :on-success="imgsuccess"
              :show-file-list="false"
              @click.native="imgChange('collocaImage')"
            >
              <div v-if="!addForm.collocaImage">
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
                v-if="addForm.collocaImage"
              >
                <img :src="addForm.collocaImage">
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item
          label="关联:"
          prop="collocaIds"
          :rules="{type: 'array',required: true, message: '关联不能为空', trigger: 'change'}"
        >
          <el-table
            :data="relation"
            border
            stripe
            style="width: 50%;"
          >
            <el-table-column
              prop="type"
              label="维度"
              align="center"
            >
              <template slot-scope="props">
                {{props.row.type==1?'发型':'服装'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              label="ID"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="clothNum"
              label="封面"
              align="center"
            >
              <template slot-scope="props">
                <img
                  :src="props.row.image"
                  style="width:100px"
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="top"
              label="层级"
              align="center"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
              <template slot-scope="props">
                <el-button
                  type="danger"
                  @click="delLine(props.row)"
                  round
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table> 
          <el-button
            style="margin-top:20px;"
            type="primary"
            @click="addLine"
            round
          >添加搭配</el-button>
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
          prop="collocaLabel"
          :rules="{validator: labelRep,required: true, trigger: 'change'}"
        >
          <el-input
            v-model="addForm.collocaLabel"
            placeholder="填写搭配相关的标签，以逗号做分隔"
            type="textarea"
            :rows="3"
          ></el-input>
        </el-form-item>
        <label-text title="标签以英文逗号作为分割符"></label-text>
        <el-form-item
          label="备注:"
          prop="collocaRemark"
        >
          <el-input
            v-model="addForm.collocaRemark"
            placeholder="请输入备注信息,不超过300字"
            :maxlength="300"
            type="textarea"
            :rows="4"
            style="width:400px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <span class="dialog-footer">
          <el-button @click="dialogFlase">重置</el-button>
          <el-button
            type="primary"
            @click="addSave"
          >保 存</el-button>
        </span>
      </div>
      <up-date-form :dialogMsg="dialogMsg" :relation="relation" @add="add"></up-date-form>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapState } from "vuex";
import { panelTitle } from "components";
import upDateForm from "./upDateForm"
export default {
  data() {
    return {
      labelRep:(rule, value, callback) => {
        if (!value) {
          return callback(new Error('标签不能为空'));
        }
        var values = value.split(",");
        if(values.length>10){
          return callback(new Error('最多可添加10个标签'));
        }
        for(var i=0;i<values.length;i++){
          if(values[i].getBytesLength()>12){
            return callback(new Error('单个标签不能超过12个字节'));
          }
        }
        callback();
      },
      addForm: {
        collocaName: "", //发型名字
        collocaImage: "", //封面链接
        hairdoWeight: "10", //权重
        collocaLabel: "", //标签
        hairdoCreatedId: "", //操作人id
        editionIds: [], //版本关联集合
        labelIds: [], //标签关联集合
        collocaRemark: "", //备注
        collocaTop: "", //层级
        collocaIds: [], //服装/发型关联集合crType1发型2服装
        UpLines: [],
        onLines: [],
        labelActiveList1: [],
        labelActiveList2: [],
        labelActiveList3: [],
        labelActiveList4: []
      },
      relation: [],//{ relevanId: "", crType: "", crHierarchy: "" }
      crType: [{ name: "发型", id: 1 }, { name: "服装", id: 2 }],
      imgfileName: "",
      editionIdsOnline: [],
      editionIdsUpLine: [],
      title: "一键搭配 / 新增搭配",
      action: "/picUpload/clothes-cover",
      loading:false,
      dialogMsg:{
        dialog:false
      }
    };
  },
  components: {
    panelTitle,
    upDateForm
  },
  created() {
    if (typeof this.$route.query.collocaId != "undefined") {
      this.title = "一键搭配 / 修改搭配";
      this.getDetail(this.$route.query.collocaId);
    }
    this.get_table_data1();
    this.get_table_data2();
  },
  methods: {
    add(data){
      console.log(data)
      this.relation.push(data)
    },
    getDetail(id) {
      this.$http({
        url: "/collocat/selectCollocatDetail",
        method: "POST",
        data: { collocaId: id }
      })
        .then(({ data }) => {
          var upDateForm = data;
          var addForm = {
            collocaId: data.collocatBasis.collocaId,
            collocaName: data.collocatBasis.collocaName, //名字
            collocaImage: data.collocatBasis.collocaImage, //封面链接
            hairdoWeight: "10", //权重
            collocaLabel: data.collocatBasis.collocaLabel, //标签
            hairdoCreatedId: "", //操作人id
            editionIds: [], //版本关联集合
            labelIds: [], //标签关联集合
            collocaRemark: data.collocatAssociated.remark, //备注
            collocaIds: [], //服装/发型关联集合crType1发型2服装
            UpLines: [],
            onLines: [],
            labelActiveList1: [],
            labelActiveList2: [],
            labelActiveList3: [],
            labelActiveList4: []
          };
          for (
            var i = 0;
            i < upDateForm.collocatAssociated.editionDOList.length;
            i++
          ) {
            if (upDateForm.collocatAssociated.editionDOList[i].offLine == 1) {
              addForm.UpLines.push(
                upDateForm.collocatAssociated.editionDOList[i].editionId
              );
            } else {
              addForm.onLines.push(
                upDateForm.collocatAssociated.editionDOList[i].editionId
              );
            }
          }
          for (
            var i = 0;
            i < upDateForm.collocatAssociated.season.length;
            i++
          ) {
            addForm.labelActiveList2.push(
              upDateForm.collocatAssociated.season[i].labelId
            );
          }
          for (var i = 0; i < upDateForm.collocatAssociated.face.length; i++) {
            addForm.labelActiveList3.push(
              upDateForm.collocatAssociated.face[i].labelId
            );
          }
          for (
            var i = 0;
            i < upDateForm.collocatAssociated.otherLabel.length;
            i++
          ) {
            addForm.labelActiveList4.push(
              upDateForm.collocatAssociated.otherLabel[i].labelId
            );
          }
          upDateForm.collocatInformat.forEach((item)=>{
             this.relation.push({
               id:item.relevanId,
               type:item.crType,
               top:item.crHierarchy,
               name:item.relevanName,
               image:item.relevanImage
             })
          });
          this.addForm = addForm;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取在线版本
    get_table_data1() {
      this.$http({
        url: "/edition/selectEdition",
        method: "POST",
        data: { editionType: 4, offLine: 0 }
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
        data: { editionType: 4, offLine: 1 }
      })
        .then(({ data }) => {
          this.editionIdsUpLine = data.rows;
        })
        .catch(() => {});
    },
    addSave() {
      var _this = this;
      _this.addForm.collocaIds = [];
      this.relation.forEach(item => {
        _this.addForm.collocaIds.push({
          relevanId:item.id,
          crType:item.type,
          crHierarchy:item.top
        })
      });
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          var arr = [],
            arr2 = [];
          var arr1 = arr.concat(
            this.addForm.labelActiveList1,
            this.addForm.labelActiveList2,
            this.addForm.labelActiveList3,
            this.addForm.labelActiveList4
          );
          var arr3 = arr2.concat(this.addForm.UpLines, this.addForm.onLines);
          for (var i = 0; i < arr1.length; i++) {
            _this.addForm.labelIds.push({ labelId: arr1[i] });
          }
          for (var i = 0; i < arr3.length; i++) {
            _this.addForm.editionIds.push({ editionId: arr3[i] });
          }
          if (this.title == "一键搭配 / 新增搭配") {
            this.$http({
              url: "/collocat/inserteCollocat",
              method: "POST",
              data: this.addForm
            })
              .then(({ data }) => {
                this.$message.success("新增成功");
                this.dialogFlase();
                this.$router.go(-1);
              })
              .catch(() => {});
          } else {
            this.$http({
              url: "/collocat/updateCollocat",
              method: "POST",
              data: this.addForm
            })
              .then(({ data }) => {
                this.$message.success("修改成功");
                this.dialogFlase();
                this.$router.go(-1);
              })
              .catch(() => {});
          }
        } else {
          console.log("error submit!!");
        }
      });
    },
    dialogFlase() {
      this.addForm = {
        collocaName: "", //发型名字
        collocaImage: "", //封面链接
        hairdoWeight: "10", //权重
        collocaLabel: "", //标签
        hairdoCreatedId: "", //操作人id
        editionIds: [], //版本关联集合
        labelIds: [], //标签关联集合
        collocaRemark: "", //备注
        collocaTop: "", //层级
        collocaIds: [], //服装/发型关联集合crType1发型2服装
        UpLines: [],
        onLines: [],
        labelActiveList1: [],
        labelActiveList2: [],
        labelActiveList3: [],
        labelActiveList4: []
      };
      this.relation = [{ relevanId: "", crType: "", crHierarchy: "" }];
    },
    beforeUpload(){
      this.loading = true;
    },
    imgsuccess(res, file, fileList, str) {
      this.$message.success("上传成功");
      this.addForm[this.imgfileName] = res.data;
      this.loading = false;
    },
    imgChange(str) {
      this.imgfileName = str;
    },
    addLine() {
      this.dialogMsg.dialog = true;
      // this.relation.push({ relevanId: "", crType: "", crHierarchy: "" });
    },
    delLine(i) {
      var _this = this;
      for(var a = 0;a<this.relation.length;a++){
        if(_this.relation[a].id == i.id && _this.relation[a].type == i.type){
          _this.relation.splice(a, 1);
          return
        }
      }
    },
  }
};
</script>
<style type="text/css">
.add,
.del {
  width: 30px;
  height: 30px;
  display: inline-block;
  line-height: 20px;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  border-radius: 50%;
  text-align: center;
}
.add {
  background: #50bfff;
}
.del {
  background: #ff4040;
}
</style>