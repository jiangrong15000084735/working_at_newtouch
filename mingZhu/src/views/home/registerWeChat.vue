<template>
  <div class="registerWeChat">
    <div class="register-title">注册</div>
    <!-- <div class="register-title" style="font-size: 14px;word-break: break-all;">{{curHref}}</div> -->
    <!-- <div class="register-title" style="font-size: 14px;word-break: break-all;">{{code}}</div> -->
    <div class="register-box">
      <input type="text" class="import" placeholder="手机号/邮箱" v-model.trim="accountNum" />
    </div>
    <div class="register-box">
      <input type="text" maxlength="6" class="import" placeholder="验证码" v-model.trim="verifyCode" />
      <span class="code" @click="sendVerifyCode">{{buttonName}}</span>
    </div>
    <div class="register-box">
      <input type="password" maxlength="16" class="import" placeholder="输入密码" v-model.trim="initPassword" />
    </div>
    <div class="register-box">
      <input type="password" maxlength="16" class="import" placeholder="再次输入密码" v-model.trim="confirmPassword" />
    </div>
    <div class="register-box">
      <input type="text" class="import" readonly placeholder="选择身份" @click="identityShow = true" v-model.trim="identity" />
      <mdb-icon icon="angle-right" />
      <ul class="identity" v-show="identityShow">
        <li class="identity-item" @click="changeIdentity(0)">我是客户</li>
        <li class="identity-item" @click="changeIdentity(1)">我是设计师</li>
      </ul>
    </div>
    <!-- <div class="register-box">
      <select class="import">
        <option value="0">选择身份</option>
        <option value="1">我是客户</option>
        <option value="2">我是设计师</option>
      </select>
      <mdb-icon icon="angle-right" />
    </div> -->
    <div class="register-btn" @click="registerBtn">注册</div>
    <div class="errorTip">{{errorTip}}</div>
    <div class="protocol"><i class="icon-check" :class="{'active': checked}" @click="switchCheck"></i>我已阅读并接受<span class="skip" @click="protocolShow = true">《用户协议》</span></div>
    <div class="protocol-mask" v-show="protocolShow" @click.self="protocolShow = false">
      <div class="protocols">
        <mdb-icon far icon="times-circle" @click.native="protocolShow = false" />
        <div class="word">这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容
          这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容
          这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容
          这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容
          这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容这里是用户协议内容 这里是用户协议内容这里是用户协议内容这里是用户协议内容
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      // 账户名
      accountNum: null,
      // 验证码
      verifyCode: null,
      // 按钮名字
      buttonName: '发送验证码',
      // 定时器
      interval: null,
      // 倒计时时间
      totalTime: 60,
      // 密码
      initPassword: null,
      // 确认密码
      confirmPassword: null,
      // 身份选择框
      identityShow: false,
      // 身份id
      identityId: null,
      // 身份
      identity: null,
      // 是否阅读过用户协议
      checked: false,
      // 错误提示
      errorTip: null,
      // 按钮禁用
      isDisabled: false,
      // 注册按钮禁用
      registerDisabled: false,
      // 协议隐藏显示
      protocolShow: false,
      // 微信openId
      openId: ''
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
    // 选择身份
    changeIdentity (id) {
      this.identityId = id;
      this.identityShow = false;
      console.log(id);
      if (id == 0) {
        this.identity = '我是客户';
      } else if (id == 1) {
        this.identity = '我是设计师';
      }
    },
    // 切换协议
    switchCheck () {
      this.checked = !this.checked;
    },
    // 发送验证码
    sendVerifyCode () {
      if (this.isDisabled) return false;
      this.isDisabled = false;
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
      this.errorTip = "";
      // 验证码倒计时
      this.timeInvertval();
      // 调用验证码
      this.api.getVerificationCode({ phoneNum: this.accountNum }).then(res => {
        if (res.code != 0) {
          this.errorTip = "验证码发送失败";
        }
      }).catch(() => {
        this.errorTip = "验证码发送失败";
      });
    },
    // 倒计时
    timeInvertval() {
      this.isDisabled = true;
      this.interval = window.setInterval(() => {
        this.buttonName = this.totalTime + "s 后重新发送";
        this.totalTime --;
        if (this.totalTime < 0) {
          this.isDisabled = false;
          this.buttonName = "重新发送";
          this.totalTime = 60;
          window.clearInterval(this.interval);
        }
      }, 1000);
    },
    // 注册
    registerBtn () {
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
      if (!this.verifyCode) {
        this.errorTip = "请输入验证码";
        return false;
      }
      if (!/^\d{6}$/.test(this.verifyCode)) {
        this.errorTip = "验证码错误";
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
      if (!this.confirmPassword) {
        this.errorTip = "请再次输入密码";
        return false;
      } 
      if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,16})$/.test(this.confirmPassword)) {
        this.errorTip = "8到16位数字与字母组合";
        return false;
      }
      if (this.initPassword !== this.confirmPassword) {
        this.errorTip = "两次输入的密码不一致";
        return false;
      }
      if (!this.identity) {
        this.errorTip = "请选择身份";
        return false;
      }
      if (!this.checked) {
        this.errorTip = "请确认接受用户协议";
        return false;
      }
      this.errorTip = null;
      // 去注册
      this.registerLogin();
    },
    // 去注册
    registerLogin () {
      // 获取微信openId
      this.openId = this.getOpenId;
      console.log('获取openId----', this.openId);
      if (this.registerDisabled) return false;
      this.registerDisabled = true;
      if (!this.openId) return false;
      // 客户是0，设计师是1
      if (this.identityId == 0) {
        // 客户注册
        this.customerRegister();
      } else if (this.identityId == 1) {
        // 设计师注册
        this.designerRegister();
      }
    },
    // 客户注册
    customerRegister () {
      this.api
        .customerRegister({
          phoneNum: this.accountNum,
          password: this.$md5(this.initPassword),
          verificationCode: this.verifyCode,
          openId: this.openId
        })
        .then(res => {
          this.registerDisabled = false;
          switch (res.code) {
            case 1:
              this.errorTip = res.msg;
              // this.telMsg = res.msg;
              // this.tipError = res.msg;
              break;
            case 2:
              this.errorTip = res.msg;
              // this.verifiCodeErrors = res.msg;
              // this.tipError = res.msg;
              break;
            case 0:
              // this.tipError = res.msg;
              this.userDetial = res.data;
              // 存储登陆信息
              this.resetInfo(this.userDetial);
              // this.tabs = 0;
              // this.isShowmodal = true;
              // this.$router.push("/registerSuccess");
              break;
          }
        }).catch(() => {
          this.registerDisabled = false;
        });
    },
    // 设计师注册
    designerRegister () {
      this.api
        .designerRegister({
          phoneNum: this.accountNum,
          password: this.$md5(this.initPassword),
          verificationCode: this.verifyCode,
          openId: this.openId
        })
        .then(res => {
          this.registerDisabled = false;
          switch (res.code) {
            case 1:
              this.errorTip = res.msg;
              // this.errorTip = res.msg;
              // this.tipError = res.msg;
              break;
            case 2:
              this.errorTip = res.msg;
              // this.verifiCodeErrors = res.msg;
              // this.tipError = res.msg;
              break;
            case 0:
              // 设置登陆状态
              this.setIsLogin(true);
              // this.tipError = res.msg;
              this.userDetial = res.data;
              // 存储登陆信息
              this.resetInfo(this.userDetial);
              // this.tabs = 0;
              // this.isShowmodal = true;
              // this.$router.push("/registerSuccess");
              break;
          }
        }).catch(() => {
          this.registerDisabled = false;
        });;
    },
    // 存储登陆信息
    resetInfo(data) {
      //注册后就算是登录成功，保存注册信息
      let userInfo = {};
      if (data.bossSerial) {
        userInfo.bossSerial = data.bossSerial;
      }
      if (data.designerSerial) {
        userInfo.designerSerial = data.designerSerial;
      }
      userInfo.id = data.userId;
      userInfo.phoneNumber = this.accountNum;
      //先清除
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem("accountNum", this.accountNum);
      // 微信端不需要存储密码
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // 存储登陆状态
      localStorage.setItem("isLogin", this.getIsLogin);
      localStorage.setItem("userId", userInfo.id);
      localStorage.setItem("role", data.role);

      //存储 userInfo和role
      this.$store.commit("setUser", userInfo);
      this.$store.commit("setRole", data.role);
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
  .registerWeChat{
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
      color: #000;
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

