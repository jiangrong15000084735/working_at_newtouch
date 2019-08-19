<template>
  <div class="loginWeChat">
    <div class="register-title">欢迎回来</div>
    <!-- <div class="register-title" style="font-size: 14px;word-break: break-all;">{{curHref}}</div> -->
    <!-- <div class="register-title" style="font-size: 14px;word-break: break-all;">{{code}}</div> -->
    <div class="register-box">
      <input type="text" class="import" placeholder="手机号/邮箱" v-model.trim="accountNum" />
    </div>
    <div class="register-box">
      <input type="password" maxlength="16" class="import" placeholder="输入密码" v-model.trim="initPassword" />
    </div>
    <div class="register-btn" @click="loginBtn">登陆</div>
    <div class="errorTip">{{errorTip}}</div>
    <div class="protocol">没有账号？<span class="skip" @click="toRegisterWeChat">去注册</span></div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      // 账户名
      accountNum: null,
      // 密码
      initPassword: null,
      // 错误提示
      errorTip: null,
      // 注册按钮禁用
      registerDisabled: false,
      // 微信openId
      openId: '',
      // 用户个人信息
      userInfo: {}
    }
  },
  computed: {
    ...mapGetters([
      // 获取登陆状态
      "getIsLogin",
      // 获取微信openId
      "getOpenId"
    ])
  },
  methods: {
    // 设置登陆状态
    ...mapMutations(["setIsLogin"]),
    // 登陆
    loginBtn () {
      let telReg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      let emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      if(!this.accountNum) {
        this.errorTip = "请输入账号";
        return false;
      }
      if (!telReg.test(this.accountNum) && !emailReg.test(String(this.accountNum))) {
        this.errorTip = "请输入正确手机号码或电子邮箱地址";
        return false;
      }
      if (!this.initPassword) {
        this.errorTip = "请输入密码";
        return false;
      } 
      if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,16})$/.test(this.initPassword)) {
        this.errorTip = "8到16位数字与字母组合";
        return false;
      }
      this.errorTip = null;
      // 去登陆
      this.bindLogin();
    },
    // 去注册
    toRegisterWeChat () {
      this.$router.push('/registerWeChat');
    },
    // 去登陆
    bindLogin () {
      // 获取微信openId
      this.openId = this.getOpenId;
      console.log('获取openId----', this.openId);
      if (this.registerDisabled) return false;
      this.registerDisabled = true;
      if (!this.openId) return false;
      this.api
        .login({
          phoneNumber: this.accountNum,
          passWord: this.$md5(this.initPassword),
          openId: this.openId
        })
        .then(res => {
          this.registerDisabled = false;
          if (res.code == 1) {
            // this.$message({
            //   showClose: true,
            //   message: res.msg
            // });
            // 错误清空密码
            this.initPassword = "";
            this.errorTip = res.msg;
          } else if (res.code == 2) {
            // this.$message("第一次绑定微信，请注册或者登陆");
            this.errorTip = res.msg;
          } else {
            this.errorTip = '';
            let userId = res.data.userId;
            let role = res.data.role;
            this.quaryData(userId, role);
          }
        }).catch(() => {
          this.registerDisabled = false;
        });
    },
    //根据userId 去查用户信息
    quaryData(userId, role) {
      let _this = this;
      if (role == "0") {
        //需求方登录
        this.api
          .bossloginInfo({
            id: userId
          })
          .then(res => {
            if (res.code == 1) return;
            this.userInfo = res.data;
            // 需求方头像用 imageUrl
            this.userInfo.head = res.data.imageUrl;
            // 设置登陆状态
            this.setIsLogin(true);
            this.save(userId, role);
            // 向父组件header传值
            this.$emit('loginVisible', false);
          });
      } else {
        // 设计师登录
        this.api
          .designerloginInfo({
            designerid: userId
          })
          .then(res => {
            if (res.code == 1) return;
            this.userInfo = res.data;
            // 设置登陆状态
            this.setIsLogin(true);
            this.save(userId, role);
            // 向父组件header传值
            this.$emit('loginVisible', false);
          });
      }
    },
    // 存储个人信息
    save(userId, role) {
      //先清除
      localStorage.clear();
      sessionStorage.clear();
      
      // 存储用户名
      localStorage.setItem("accountNum", this.accountNum);

      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
      // 存储登陆状态
      localStorage.setItem("isLogin", this.getIsLogin);
      localStorage.setItem("loginType", role);

      sessionStorage.setItem("accountNum", this.accountNum);

      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("userInfo", JSON.stringify(this.userInfo));
      // 存储登陆状态
      sessionStorage.setItem("isLogin", this.getIsLogin);
      sessionStorage.setItem("loginType", role);
      // 跳转到首页
      this.$router.push('/');
    }
  },
  created () {
    console.log('是否在微信中', this.inWeixin);
    // 获取微信openId
    this.openId = this.getOpenId;
    console.log('----初始获取openId----', this.openId);
    console.log('getIsLogin',this.getIsLogin);
    this.curHref = window.location.href
    console.log(this.curHref)
  }
}
</script>

<style lang="less" scoped>
  .loginWeChat{
    padding-top: 2.0625rem /* 33/16 */;
    .register-title{
      margin-bottom: 1.5625rem /* 25/16 */;
      text-align: center;
      font-size: 1.875rem /* 30/16 */;
      color: #000;
    }
    .register-box{
      position: relative;
      height: 2.75rem /* 44/16 */;
      line-height: 2.75rem /* 44/16 */;
      margin: 0 .9375rem /* 15/16 */ .625rem /* 10/16 */;
      border-radius: 22px;
      background-color: rgba(142, 142, 147, 0.12);
      .import{
        display: block;
        width: 100%;
        height: 100%;
        padding-left: .9375rem /* 15/16 */;
        padding-right: .9375rem /* 15/16 */;
        font-size: 1rem /* 16/16 */;
        color: #000;
        outline: none;
        background: none;
        border: none;
        &::-webkit-input-placeholder{
          color: rgba(0, 0, 0, 0.4);
        }
      }
      .code{
        position: absolute;
        top: 0;
        right: .9375rem /* 15/16 */;
        height: 2.75rem /* 44/16 */;
        line-height: 2.75rem /* 44/16 */;
        font-size: 1rem /* 16/16 */;
        color: #508DF4;
      }
      .fas{
        position: absolute;
        top: 50%;
        right: .9375rem /* 15/16 */;
        transform: translate(0,-50%);
        font-size: 1.25rem /* 20/16 */;
        color: #B8B8B9;
      }
      .identity{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        background-color: #fff;
        .identity-item{
          padding-left: 1.25rem /* 20/16 */;
        }
      }
    }
    .register-btn{
      height: 2.75rem /* 44/16 */;
      line-height: 2.75rem /* 44/16 */;
      margin: 1.25rem /* 20/16 */ .9375rem /* 15/16 */ .3125rem /* 5/16 */;
      text-align: center;
      border-radius: 22px;
      font-size: 1rem /* 16/16 */;
      color: #fff;
      background-color: #4285F4;
    }
    .errorTip{
      height: 1.25rem /* 20/16 */;
      line-height: 1.25rem /* 20/16 */;
      margin: 0 .9375rem /* 15/16 */;
      padding-left: .9375rem /* 15/16 */;
      font-size: .875rem /* 14/16 */;
      color: #f44336;
    }
    .protocol{
      height: 1.25rem /* 20/16 */;
      line-height: 1.25rem /* 20/16 */;
      margin-top: .625rem /* 10/16 */;
      text-align: center;
      font-size: .875rem /* 14/16 */;
      color: rgba(0, 0, 0, 0.4);
      .icon-check{
        display: inline-block;
        vertical-align: middle;
        width: 1.25rem /* 20/16 */;
        height: 1.25rem /* 20/16 */;
        margin-right: .625rem /* 10/16 */;
        background: url(../../assets/images/icon-checknot.png) no-repeat center;
        background-size: 100% 100%;
        &.active{
          background-image: url(../../assets/images/icon-checked.png);
        }
      }
      .skip{
        color: #007bff;
      }
    }
    .protocol-mask{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding-top: 20%;
      padding-bottom: 20%;
      background-color: rgba(0, 0, 0, 0.4);
      .protocols{
        position: relative;
        height: 100%;
        padding: 1.25rem /* 20/16 */;
        padding-top: 2.5rem /* 40/16 */;
        border-radius: 10px;
        background-color: #fff;
        .far{
          position: absolute;
          top: .3125rem /* 5/16 */;
          right: 1.25rem /* 20/16 */;
          font-size: 1.875rem /* 30/16 */;
          color: #999;
        }
        .word{
          height: 100%;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          font-size: 1rem /* 16/16 */;
          color: #000;
        }
      }
    }
  }
</style>

