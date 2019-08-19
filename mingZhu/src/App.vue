<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "App",
  data () {
    return {
      // 微信openId
      openId: ''
    }
  },
  computed: {
    ...mapGetters([
      // 获取登陆状态
      "getIsLogin"
    ])
  },
  methods: {
    ...mapMutations([
      "setIsLogin", // 存储登陆状态
      "setOpenId" // 存储微信openId
    ]),
    // 获取地址栏参数
    getQueryString (key) {
      // let after = window.location.hash.split("?")[1];
      // if (after){
      //   let reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
      //   let r = after.match(reg);
      //   if (r != null) {
      //     return  decodeURIComponent(r[2]);
      //   } else {
      //     return null;
      //   }
      // }
      let after = window.location.search;
      if (after && after.indexOf("?") === -1) return null; //如果url中没有传参直接返回空
      //key存在先通过search取值如果取不到就通过hash来取
      after = after.substr(1) || window.location.hash.split("?")[1];
      if (after) {
        let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        let r = after.match(reg);
        if (r != null) {
          return decodeURIComponent(r[2]);
        } else {
          return null;
        }
      }
    },
    // 微信自动登陆
    wechatLogin () {
      this.api.wechatCheckLogin({
        code: this.code
      }).then(res => {
        // let {code, data} = res;
        console.log(res);
        if (res.code == 0) {
          console.log('app---登陆成功');
          // 设置登陆状态
          this.setIsLogin(true);
          // 存储登陆信息
          this.resetInfo(res.data);
        } else if (res.code == 1) { // 未注册
          console.log('app---未注册');
          this.openId = res.data.openId;
          console.log('第一次openId', this.openId);
          if (this.openId) {
            sessionStorage.setItem('openId', this.openId);
            // 存储微信openId
            this.setOpenId(this.openId);
          }
        }
      });
    },
    // 存储登陆信息
    resetInfo(data) {
      console.log('app ---- 存储登陆信息');
      // let userInfo = {};
      // if (data.bossSerial) {
      //   userInfo.bossSerial = data.bossSerial;
      // }
      // if (data.designerSerial) {
      //   userInfo.designerSerial = data.designerSerial;
      // }
      // userInfo.id = data.userId;
      // userInfo.phoneNumber = this.accountNum;
      //先清除
      localStorage.clear();
      sessionStorage.clear();
      // 不存储账户名
      // localStorage.setItem("accountNum", this.accountNum);
      // 微信端不需要存储密码
      localStorage.setItem("userInfo", JSON.stringify(data));
      // 存储登陆状态
      localStorage.setItem("isLogin", this.getIsLogin);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("role", data.role);

      //存储 userInfo和role
      this.$store.commit("setUser", data);
      this.$store.commit("setRole", data.role);
      // 刷新头部
      Bus.$emit("refreshHeader");
      // if (window.history.length > 1) {
      //   this.$router.back();
      // } else {
      //   this.$router.push('/');
      // }
      // 只有注册和绑定页面才跳转到首页
      if (this.$route.path == '/registerWeChat' || this.$route.path == '/loginWeChat') {
        // 跳转到首页
        this.$router.push('/');
      }
    }
  },
  created () {
    console.log(this.$route.path);
    // 获取没有使用过的code，用于测试
    if (this.$route.path == 'codeWeChat') return false;
    let codeUse = sessionStorage.getItem('codeUse');
    console.log('codeUse', codeUse);
    // 如果使用过，不再请求
    if (codeUse == 1) return false;
    // 如果是微信端
    if (this.inWeixin) {
      // 获取地址栏参数
      this.code = this.getQueryString('code');
      sessionStorage.setItem('codeUse', 1);
      console.log('第一次获取code');
      console.log('code', this.code);
      if (this.code) {
        // 微信自动登陆
        this.wechatLogin();
      }
    }
    // 监听兄弟组件
    // let self = this;
    // // 触发微信自动登陆
    // Bus.$off("wechatLogin");
    // Bus.$on("wechatLogin", function(msg) {
    //   // 调用登陆框
    //   self.wechatLogin();
    // });
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
a{
  text-decoration: none;
}
</style>
