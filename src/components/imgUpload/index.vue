<template>
    <div class="imgFile" v-loading="loading">
      <el-upload
          :action="action"
          accept="image/*"
          :before-upload="beforeUpload"
          :on-success="imgsuccess"
          :show-file-list="false"
          :data="{token:$store.getters.get_user_info.token || ''}"
          :disabled="disabled">
          <div v-if="!img">
              <svg viewBox="64 64 896 896" class="p1" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M848 474H550V152h-76v322H176c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h298v322h76V550h298c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
              <p class="p2">{{labelText}}</p>
          </div>
          <div class="img-box" v-if="img">
              <img :src="img">
              <div class="del" @click="del">×</div>
              <p class="text">{{labelText}}</p>
          </div>
        </el-upload>
    </div>
</template>
<script>
export default {
  props: {
    action:{
        type:String
    },
    position:{
        type:String,
        default:''
    },
    img:{
        type:String,
        default:''
    },
    labelText:{
        type:String,
    }
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    img: function(n,old) {
      console.log(n)
      if(n){
        this.disabled = true;
      }else{
          setTimeout(() => {
              this.disabled = false;
          }, 100);
      }
    }
  },
  data() {
    return {
        loading:false,
        disabled:false,
        token:this.$store.getters.get_user_info.token || '',
    };
  },
  created() {
      console.log(this.img)
  },
  methods: {
    beforeUpload(){
      this.loading = true
    },
    imgsuccess(res, file, fileList, str) {
      this.$message.success("上传成功");
      var obj = {
          img:res.data,
          position:this.position
      }
      this.$emit('imgChange',obj)
      this.loading = false;
      this.disabled = true;
    },
    del(){
        this.$emit('imgdel',this.position);
    }
  }
};
</script>

