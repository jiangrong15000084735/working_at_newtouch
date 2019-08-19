<template>
  <div class="procurement-plan">
    <div class="produrement-body">
      <mdb-row class="align-items-center justify-content-center">
        <mdb-col col="7" v-if="auditState<3">
          <div style="text-align:center;">
            <p>您已成功提交初步项目需求，合筑项目专员将在2小时内与您取得联系！</p>
            <p>
              由于您是未认用户，请您先进行认证 
              <router-link to="/submit">[会员认证]</router-link>
            </p>
            <p>认证通过后，您可以发布及管理您的项目信息，并获得更多专属服务</p>
          </div>
        </mdb-col>
        <mdb-col col="7" v-else>
          <div style="text-align:center;">
            <p>您已成功提交初步项目需求，合筑项目经理将在2小时内，与您取得联系！</p>
            <p>
              您也可以继续
              <a  @click="toTaskDetail" href="javascript:;">[完善项目任务书]</a>
            </p>
          </div>
        </mdb-col>
        <mdb-col col="5">
          <div style="text-align:center;">
            <img src="@/assets/images/QRcode.png" alt>
            <p>扫描二维码，下载手机app，关注微信服务号，实时关注项目进程</p>
          </div>
        </mdb-col>
      </mdb-row>
      <!-- <mdb-row v-if="auditState!==3" class="my-5 text-center align-items-center justify-content-center">
        <mdb-col col="6">
          <div class="tips" style="text-align:center;">
            <div>
              <p class="tip">
                <mdb-icon icon="exclamation-circle" class="amber-text pr-3"/>合筑小贴士
              </p>
              <p class="warin">只有经过身份审核的用材才能正式发布项目，请尽快提交您的资料进行审核</p>
            </div>
          </div>
        </mdb-col>
        <mdb-col col="6" class="text-center">
          <mdb-btn color="primary" @click="toCompanyInformation">提交审核资料</mdb-btn>
        </mdb-col>
      </mdb-row> -->
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
export default {
  data() {
    return {
      auditState: 100
    };
  },
  created(){
    let id = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    this.api.companyDetail({ id: id }).then(res => {
      if(res.code==0){
        this.auditState = res.data.auditState
      }
    });
  },
  methods: {
    // 跳到项目任务书
    toTaskDetail() {
      this.api.getProjectStatus({id: this.$route.query.id}).then(res=>{
        if(res.code==0){
          this.$router.push({
            path: "/projectDetial",
            query: {
              id: this.$route.query.id,
              step:res.data.status,
              t:"s"
            }
          });

        }
      })
    },
    // 跳到增值服务页面
    toPay() {
      this.$router.push({
        path: "/pay",
        name: "pay",
        query: {
          id: this.$route.query.id
        }
      });
    },
    // 跳转到项目中心
    projectMent() {
      this.$router.push("/customerProjectManage");
    },
    // 跳转到项目中心
    toCompanyInformation() {
      this.$router.push("/companyInformation");
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less">
@media only screen and (min-width: 1600px) {
  .procurement-plan {
    max-width: 1200px;
    margin: 0 auto !important;
    overflow: hidden;
 
  }
}
.procurement-plan{
  min-height: 71%;
  padding-bottom: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.produrement-body{
  margin-top: 3rem;
  overflow: hidden;
}
// .plan_steps {
//   padding: 0.5rem 0;
//   .el-step.is-horizontal .el-step__line {
//     top: 9px;
//   }
// }

// .guid {
//   .el-step__head.is-process {
//     .el-step__icon.is-text {
//       // border-color: orange;
//       // border-width: 2px;
//       background-image: linear-gradient(-90deg, #f3daa4 6%, #f2cd89 98%);
//     }
//   }
//   .el-step__title {
//     font-family: PingFangSC-Medium;
//     font-size: 14px;
//     color: #333333;
//     letter-spacing: 0;
//     text-align: center;
//     line-height: 24px;
//   }
//   .el-step__icon.is-text {
//     width: 16px;
//     height: 16px;
//     border: 1px solid;
//   }
//   .el-step__icon-inner {
//     display: none;
//   }
//   .el-step__title.is-process {
//     font-family: PingFangSC-Medium;
//     font-size: 14px;
//     color: #333333;
//     letter-spacing: 0;
//     text-align: center;
//     line-height: 24px;
//   }
//   .el-step__title.is-wait {
//     font-family: PingFangSC-Regular;
//     font-size: 14px;
//     color: #bbbbbb;
//     letter-spacing: 0;
//     text-align: center;
//     line-height: 24px;
//   }
// }

// .commit {
//   margin-top: 141 * 0.625px;
// }

// .left {
//   text-align: center;
//   img {
//     width: 211px;
//     height: 211px;
//     display: block;
//     margin: 0 auto;
//   }
//   p {
//     font-family: PingFangSC-Regular;
//     font-size: 12px;
//     color: #666666;
//     letter-spacing: 0.2px;
//     line-height: 30px;
//     .center {
//       color: #78b4ff;
//       cursor: pointer;
//     }
//     a {
//       font-family: PingFangSC-Regular;
//       font-size: 11px;
//       color: #999999;
//       letter-spacing: 0.13px;
//       text-align: center;
//       line-height: 30px;
//       text-decoration: none;
//     }
//   }
// }

// .right {
//   margin-top: 15px;
//   text-align: center;
//   img {
//     width: 125px;
//     height: 125px;
//     display: block;
//     margin: 0 auto;
//   }
//   p {
//     font-family: PingFangSC-Regular;
//     font-size: 12px;
//     color: #666666;
//     letter-spacing: 0.2px;
//     text-align: center;
//     line-height: 30px;
//   }
// }

// .tips {
//   .warinicon {
//     margin-right: 20px;
//   }
//   .tip {
//     font-family: PingFangSC-Medium;
//     font-size: 14px;
//     color: #404040;
//     letter-spacing: 0;
//     line-height: 21px;
//   }
//   .warin {
//     font-family: PingFangSC-Regular;
//     font-size: 12px;
//     color: #666666;
//     letter-spacing: 0;
//     line-height: 18px;
//   }
// }

// .commitFile {
//   margin: 0 auto;
//   margin-top: 236 * 0.625px;
//   margin-bottom: 200px;
//   .cmfile {
//     background-image: linear-gradient(-90deg, #f3daa4 6%, #f2cd89 98%);
//     border-radius: 16.5px;
//     font-family: PingFangSC-Regular;
//     font-size: 14px;
//     color: #333333;
//     letter-spacing: 0.16px;
//     text-align: center;
//   }
// }
</style>
<style lang="less">
.procurement-plan{
footer{
  
}
}
</style>
