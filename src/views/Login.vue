<template>
<section class="login" style="padding-left: 35%;padding-top: 10%">
<!--  <div class="login-box">-->
<!--    <div class="side-banner">-->
<!--      <h2>欢迎使用兼职平台后台管理系统</h2>-->
<!--      <p>兼职平台是一家***************。</p>-->
<!--      <div><img src="../static/images/login-asie.png" alt="" style="display:block;width:100%;"></div>-->
<!--    </div>-->
    <div class="side-form" >
<!--      <img src="../static/images/logo_se.png" alt="互联LOGO">-->
      <h2>兼职 实践<br>
        Part-time Job<br></h2>
<!--      <p class="icon-arrow-down">{{userControlStatus}}</p>-->
      <p style="font-size: 30px">{{userControlStatus}}</p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-if="isLogin">
        <el-form-item prop="username">
          <el-input placeholder="请输入帐号" prefix-icon="el-icon-user" v-model="ruleForm.username" clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入登录密码" type="password" autocomplete="off" prefix-icon="el-icon-lock" v-model="ruleForm.password" clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
<!--        <el-checkbox v-model="checked" @change="rememberMe()">记住我</el-checkbox>-->
      </el-form-item>
        <el-button type="info" size="default" @click="login('ruleForm')" style="display:block;width:100%;">登录</el-button>
      </el-form>

    </div>
<!--  </div>-->
</section>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      headers: {
        Authorization: sessionStorage.getItem("JWT_TOKEN"),
      },
      checked: false,
      isForgetPassword: false,
      isLogin: true,
      isReg: false,
      userControlStatus: '登录',
      show: true, //验证码：显示”获取验证码”
      count: 60, //验证码：设置倒计时时长
      timer: null, //验证码：设置计时器
      checkForm: {
        username: "",
        password: "",
      },
      ruleForm: {
        companyCode: '',
        username: '',
        phone: '',
        password: '',
        verificationCode: '',
        rememberMyName: true
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
      }
    }
  },
  methods: {
    login(formName){
      console.log("this.toLocalStorage",this.toLocalStorage);
      console.log("formName"+formName);
      this.rememberMe();
      this.loading = true;
      console.log("this.ruleForm",this.ruleForm);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/sysUser/login", this.ruleForm).then((res) => {
            console.log("res",res);
            if (res.code == 200) {
              //提交成功才保存
              this.toLocalStorage(this.checkForm);
              this.$message.success("登入成功");
              //保存token
              sessionStorage.setItem("JWT_TOKEN", res.data);
              this.getUserInfo();
            } else {
              console.log("登陆失败",res);
              this.$message.error({
                title: "登入失败",
                message: res.msg,
                type: "error",
              });
            }
            this.loading = false;
          }).catch(err=>{
            this.$message.error({title: "登入失败", message: err, type: "error"});
            this.loading = false;
          });
        } else {
          this.$message.error("登录失败");
          return false;
        }
      });
    },
    async getUserInfo() {
      var data = {};
      data["headers"] = this.headers;
      let res = await this.$axios.get("/user/info",data);
      console.log("res",res);
      if (res.code !== 200) {
        return this.$message.error("获取用户信息失败:" + res.data.msg);
      }
      if(!res.data.isAdmin&&res.data.roles.length<1){
        return this.$message.error("您没有任何权限进入此系统，请联系管理员为您分配");
      }
      //保存用户
      this.$store.commit("SET_USER_INFO", res.data);
      //跳转到home
      this.$router.push("/");
      console.log("this.$router",this.$router);
    },
    //响应记住我，先保存在checkform中
    rememberMe(){
      if(this.checked === true){
        this.checkForm.username = this.ruleForm.username;
        this.checkForm.password = this.ruleForm.password;
        //console.log("已选择记住我",this.checkForm);
      }else{
        this.checkForm.username = '';
        this.checkForm.password = '';
        //console.log("取消选择记住我",this.checkForm);
      }
    },
    //部位空字符串就保存
    toLocalStorage(data){
      if(data.username !== ''){
        localStorage.setItem("username",data.username);
        localStorage.setItem("password",data.password);
      }
    },
  },
  mounted() {
    //不为空就填充
    if(localStorage.getItem("username") != null){
      this.ruleForm.username = localStorage.getItem("username");
      this.ruleForm.password = localStorage.getItem("password");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#particle-canvas {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}
.login {
    height: 100%;
    /*<!--background-color: @color-deep-bg;-->*/
  background-image: url(../../src/../source/bbbb.jpg);
  background-size: cover;
    .login-box {
        width: 1024px;
        margin: 0 auto;
        display: flex;
        transform: translate(-50%,-50%);
        position: absolute;
        z-index: 20;
        top: 50%;
        left: 50%;
        box-shadow: 0 20px 40px 0 rgba(0,0,0,0.08);
    }
    .side-banner {
        width: 512px;
        flex: 0 0 512px;
        /*background: linear-gradient(314deg, #3a54e1 5%, #3acce1 100%) #00aae7;*/
        /*background-color: #3acce1ab;*/
      background: linear-gradient(314deg, #3a54e1 5%, #3acce1 100%) #00aae7;
      background-color: #3acce1ab;
        background-blend-mode: saturation;
        text-align: center;
        color: #FFF;
        padding-bottom: 56px;
        border-radius: 4px 0 0 4px;
        display: flex;
        flex-flow: column;
        h2 {
            font-size: 32px;
            margin-bottom: 16px;
            padding-top: 56px;
        }
        p {
            padding: 0 56px;
            margin-bottom: 16px;
        }
        div {
            flex: 1;
            margin-top: auto;
            display: flex;
            flex-flow: column;
            justify-content: flex-end;
        }
    }
    .side-form {
        width: 512px;
        flex: 0 0 512px;
        padding: 56px;
        background-color: #FFF;
        border-radius: 0 4px 4px 0;
        text-align: center;
        h2 {
            font-size: 32px;
            margin-bottom: 16px;
        }
        p {
            padding: 0 56px;
            margin-bottom: 56px;
            font-size: 20px;
            font-weight: 800;
            color: @color-primary;
            &.icon-arrow-down {
                position: relative;
                &::after {
                    content: "";
                    position: absolute;
                    border: 10px solid transparent;
                    border-top-color: @color-border;
                    left: 50%;
                    margin-left: -10px;
                    bottom: -30px;
                }
            }
        }

        .el-form {
            margin-bottom: 24px;
        }
    }
}
</style>
