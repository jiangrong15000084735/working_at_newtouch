<template>
  <div class="body">
    <div class="Authentication" v-if="auditStatus!='3'">
      <img src="@/assets/images/Group.png" alt="" >
      <p class="certification">
        请进行<a @click="toDesignerSubmitInfo" href="javascript:;">设计师身份认证</a>，认证通过成为<a href="javascript:;" @click="toPersonalInformation" >建筑师会员</a>
      </p>
      <p>您将可以报名参与项目或收到项目邀请</p>
      <mdb-btn color="primary" rounded @click="verification">设计师身份验证</mdb-btn>
    </div>

    <div class="audioAgreen" v-if="auditStatus=='3'">
      <img src="@/assets/images/Group.png" alt="" >
      <p class="info top57">您尚未参与任何项目或收到项目邀请</p>
      <p class="info">请至<a class="taskHall" @click="toTaskHall()">任务大厅</a>查看征集中的项目</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      auditStatus: '1',
      userId: '',
      role: '',
      loginRole: ''
    }
  },
  mounted () {
    this.getLoginInfo()
  },
  methods: {
    // 获取当前登入信息
    getLoginInfo () {
      this.api.findLoginInfo(null).then(res => {
        if (res.code === 0) {
          // auditStatus 1:完善信息 2:已提交 3:已验证
          // loginRole：登陆角色: 1设计师 2项目经理 3客户 4设计大咖 5境外设计大咖
          // role：0 非设计师 1设计师（设计师，设计大咖，境外设计大咖）
          this.auditStatus = res.data.auditStatus
          this.userId = res.data.userId
          this.role = res.data.role
          this.loginRole = res.data.loginRole
        }
      })
    },
    // 点击设计师身份验证按钮
    toDesignerSubmitInfo () {
      if (this.role === '0') {
        this.$message('对不起请您先进行设计师身份验证！')
      }
      if (this.role === '1') {
        // this.$router.push(`/designerSubmitInfo/${this.userId}`)
        this.$router.push(`/personalInformation`)
      }
    },
    // 转会员信息
    toPersonalInformation () {
      if (this.role === '0') {
        this.$message('对不起请您先进行设计师身份验证！')
      }
      if (this.role === '1') {
        this.$router.push(`/personalInformation`)
      }
    },
    // 设计师身份验证
    verification () {
      if (this.role === '1') {
        this.$message('恭喜您是设计师！,可进行后续操作')
      } else {
        this.$message('对不起您不是设计师,不可进行后续操作！')
      }
    },
    // 转任务大厅
    toTaskHall () {
      this.$router.push(`/taskHall`)
    }
  }
};
</script>
<style lang="less" scoped>
.body {
  background: #ffffff;
  margin: 1.25rem 10%;
  padding: 2% 5%;
  .emptyTitle {
    // font-family: PingFangHK-Medium;
    font-size: 1.75rem;
    color: #333333;
    letter-spacing: 0;
  }
  .Authentication {
    text-align: center;
    padding: 6.25rem 0;
    img {
      width: 9.0625rem;
      display: block;
      margin: 0 auto;
    }
    .certification {
      margin-top: 3.5625rem;
      a {
        color: #dcbe86;
      }
    }
    p {
      // font-family: PingFangSC-Regular;
      font-size: 1.125rem;
      color: #666666;
      letter-spacing: 0.0125rem;
      text-align: center;
      line-height: 1.875rem;
      margin: 0 auto;
    }
  }
  .audioAgreen {
    text-align: center;

    margin: 0 auto;
    padding-top: 13.0625rem;
    padding-bottom: 10rem;
    img {
      width: 9.0625rem;
      display: block;
      margin: 0 auto;
    }
    .info {
      // font-family: PingFangSC-Regular;
      font-size: 1.125rem;
      color: #666666;
      letter-spacing: 0.0125rem;
      text-align: center;
      line-height: 1.875rem;
      margin: 0 auto;
      .taskHall {
        color: #dcbe86;
      }
    }
    .top57 {
      margin-top: 3.5625rem;
    }
  }
}
</style>
