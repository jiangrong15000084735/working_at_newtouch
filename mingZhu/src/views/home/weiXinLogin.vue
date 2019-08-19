<template>
  <div class="weiXinLogin">
    <div class="loginBottom">
      <div class="loginBottomContent">
        <div class="returnHome" @click="returnHome">返回首页</div>
        <div class="login-way">
          <img src="@/assets/images/WeChat.png" alt="微信" @click="loginWX">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      state: 0
    };
  },
  methods: {
    returnHome() {
      this.$router.push("/homePage");
    },
    // 微信二维码
    loginWX() {
      this.$router.push("/wxLogin");
    }
  }
};
</script>
<style lang="less" scoped>
.loginBottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  background: #f6f6f6;
  box-shadow: inset 0 1px 0 0 #eeeeee;
  overflow: hidden;
  display: flex;
  text-align: center;
  .loginBottomContent {
    margin: 0.17rem 0.3rem;
    width: 100%;
    font: 0.12rem "PingFangSC-Regular";
    color: #ff6e0d;
    .returnHome {
      float: left;
      cursor: pointer;
    }
    .login-way {
      float: right;
      cursor: pointer;
      img {
        width: 0.16rem;
        height: 0.16rem;
        vertical-align: middle;
      }
    }
  }
}
</style>
