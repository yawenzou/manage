<template>
  <div class="login-body">
    <div class="loginWarp"
         v-loading="load_data"
         element-loading-text="正在登陆中..."
         @keyup.enter="submit_form">
      <div class="login-title">
        <!-- <img src="./images/logo.png" style="width:100px"/> -->
        <h2>魔镜后台管理系统</h2>
      </div>
      <div class="login-form">
        <el-form ref="form" :model="form" :rules="rules" label-width="0">
          <el-form-item prop="userName" class="login-item">
            <el-input v-model="form.userName" placeholder="请输入账户名：" class="form-input" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <el-input type="password" v-model="form.password" placeholder="请输入账户密码：" class="form-input"></el-input>
          </el-form-item>
          <el-form-item class="login-item">
            <el-button size="large" icon="check" class="form-submit" @click="submit_form">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapActions} from 'vuex'
  import {port_user, port_code} from 'common/port_uri'
  import {SET_USER_INFO} from 'store/actions/type'

  export default{
    data(){
      return {
        form: {
          userName: null,
          password: null
        },
        rules: {
          userName: [{required: true, message: '请输入账户名！', trigger: 'blur'}],
          password: [{required: true, message: '请输入账户密码！', trigger: 'blur'}]
        },
        //请求时的loading效果
        load_data: false,
        usersActive:[],
        
      }
    },
    created(){
      console.log(hex_md5('123456'))
    },
    methods: {
      ...mapActions({
        set_user_info: SET_USER_INFO
      }),
      cmdRSAEncrypt(str){
        var publicKey = 
          "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCaMI2bEll7DuoZOtCxS1ZhXJhqedz/vHqQ9qSfIyVHyy5wDSfzNAmydnW01N6NnG8Jw9npGgH6RboM4NbUbhYS211hFAeQ9slXcyIoJENGCxf/9ZQY0moqYcZEoejLDVAtJS4ZD79mFv/e2Zn8QKBi7vh1tQeMTHIrEh5Q3x/NrwIDAQAB";
        var encrypt=new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        return encrypt.encrypt(str);
      },
      //提交
      submit_form() {
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          var data = this.cmdRSAEncrypt(JSON.stringify(this.form));
          this.$http({
            url: '/user/login',
            method: 'post',
            data:{data:data}
          })
          .then((res) => {
            this.load_data = true;
            this.arrFilter(res.data);
            this.usersActive.push(0);
            this.set_user_info({
              token:res.token,
              login: true,
              jur:this.usersActive,
              user:{
                name:this.form.userName
              }
            })
            this.$message.success("登陆成功")
            setTimeout(this.$router.push({path: '/'}), 500)
          })
          .catch((err) => {
            console.log(err)
          }) 
        })
      },
      arrFilter(arr){
        var _this = this;
        arr.forEach(function(i){
          if(typeof i.id != 'undefined'){
            _this.usersActive.push(i.id)
          }
          if(i.children == null){
            _this.usersActive.push(i.id)
          }else{
            _this.arrFilter(i.children)
          }
        })
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .login-body {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(./images/login_bg.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .loginWarp {
      width: 300px;
      padding: 25px 15px;
      margin: 100px auto;
      background-color: #fff;
      border-radius: 5px;
      .login-title {
        margin-bottom: 25px;
        text-align: center;
      }
      .login-item {
        .el-input__inner {
          margin: 0 !important;
        }
      }
      .form-input {
        input {
          margin-bottom: 15px;
          font-size: 12px;
          height: 40px;
          border: 1px solid #eaeaec;
          background: #eaeaec;
          border-radius: 5px;
          color: #555;
        }
      }
      .form-submit {
        width: 100%;
        color: #fff;
        border-color: #6bc5a4;
        background: #6bc5a4;
        &:active, &:hover {
          border-color: #6bc5a4;
          background: #6bc5a4;
        }
      }
    }
  }
</style>
