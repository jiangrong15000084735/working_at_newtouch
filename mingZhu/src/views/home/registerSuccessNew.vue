<template>
  <div class="register-success">
    <mdb-modal v-if="isShowmodal" class="modal" >
        <mdb-modal-header :close="false">
          <mdb-modal-title ></mdb-modal-title>
          <a  @click="close(false)"><mdb-icon icon="times" /></a>
        </mdb-modal-header>
      <mdb-modal-body>
        <div class="icon-img">
          <mdb-icon far icon="check-circle"/>
        </div>
        <div class="text1" style="margin-bottom:1.4375rem;">恭喜您注册成功</div>
        <div class="text1">成为我们的正式会员，您可以享受以下服务 快去进行会员身份验证吧</div>
        <div class="service">
            <mdb-row>
                <mdb-col col="6" class="clearfix" style="padding-right:110px;border-right: 1px solid #999;">
                    <div class="QRcode fr">
                        <img src="@/assets/images/publicAddress.png">
                        <p class="text-center">立即关注合筑空间</p>
                    </div>
                </mdb-col>
                <mdb-col col="6" style="padding-left:110px;">
                    <mdb-row class="text-left" v-if="$store.state.role==0">
                        <mdb-col col="12" class="text2" v-for="item in customerInfo" :key="item.id">
                           <img :src="item.imgUrl"/>{{item.text}}
                        </mdb-col>
                    </mdb-row>
                    <mdb-row class="text-left" v-if="$store.state.role==1">
                        <mdb-col col="12" class="text2" v-for="item in designerInfo" :key="item.id">
                           <img :src="item.imgUrl"/>{{item.text}}
                        </mdb-col>
                    </mdb-row>
                </mdb-col>
            </mdb-row>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn color="primary" @click.native="modalClose(true)">进行会员身份验证</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>

<script>
import headerPart from "@/components/header.vue";
export default {
  props: ["isShowmodal"],
  components: {
    headerPart
  },
  data() {
    return {
      auditState: 1,
      modal: false,
      type: "",
      customerInfo:[
        {
          id:1,
          text:"发布项目信息",
          imgUrl:require("@/assets/images/commissionedDesign_icon.png")
        },{
          id:2,
          text:"选择增值服务",
          imgUrl:require("@/assets/images/addservice_icon.png")
        },{
          id:3,
          text:"邀请心仪律师",
          imgUrl:require("@/assets/images/lvshi_icon.png")
        }
      ],
      designerInfo:[
        {
          id:1,
          text:"查看招标信息",
          imgUrl:require("@/assets/images/taskHall_icon.png")
        },{
          id:2,
          text:"承接受要项目",
          imgUrl:require("@/assets/images/inviteDesigner_icon.png")
        },{
          id:3,
          text:"个人主页展示",
          imgUrl:require("@/assets/images/personCenter_icon.png")
        }
      ],
      infoList:[],
    };
  },
  methods: {
    go(val) {
      this.$router.push(val);
    },
    goSubmit() {
      //0需求1设计师
      if (localStorage.getItem("role")== 0) {
        this.$router.push("/submit");
      } else {
        this.$router.push("/personalInformationNew");
      }
    },
    modalClose(data) {
      this.$emit("modalClose", data);
      this.goSubmit();
    },
    close(data){
      this.$emit("modalClose", data);
    }
  },
  mounted() {
    this.type = this.$store.state.role;
    this.$store.commit("setNavScroll", true);
    // let role = localStorage.getItem("role")||sessionStorage.getItem("role")
    // console.log(role)
    // if(role==0){
    //   this.infoList = this.customerInfo;
    // }else if(role==1){
    //   this.infoList = this.designerInfo
    // }
  }
};
</script>

<style lang="less" scoped>
.modal {
  text-align: center;
  .icon-img {
    height:auto;
    color:#789e42;
    font-size:4.125rem;
    line-height: 1 !important;
    margin-bottom:0.875rem;
  }
  .text1{
      font-size: 1.375rem;
      color: #333;
  }
  .text2{
      font-size: 1.125rem;
      color: #666666;
      margin-bottom: 1.5rem;
      img{
          width:1.125rem;
          vertical-align: middle;
          margin-right: 2.75rem;
      }
  }
  .middle {
    overflow: hidden;
    width: 80%;
    margin: auto;
    padding-top: 1.25rem;
    border-bottom: none;
    .wechat-img {
      float: left;
      margin: auto;
      width: 50%;
      img {
        vertical-align: middle;
        width: 3.5rem;
        height: 3.5rem;
      }
    }
    .detail {
      float: left;
      width: 50%;
      text-align: center;
      font-size: 0.875rem;
      color: #666666;
      margin-top: 0.625rem;
      p {
        line-height: 1.5rem;
      }
    }
  }
  .service {
    width: 100%;
    margin: 3.125rem auto 1rem;
    padding: 0 4rem;
    .QRcode{
        width:11.25rem;
       
        img{
          margin-top: -1.25rem;
          height:11.25rem;
        }
    }
  }

//   .service ul li {
//     border: 1px solid #ebebeb;
//     width: 31%;
//     float: left;
//     margin-right: 3%;
//     padding: 0 1.25rem 0.625rem;
//     font-size: 0.7rem;
//     cursor: pointer;
//     color: #8b8b8b;
//   }
//   .service ul li:last-child {
//     margin-right: 0;
//   }
  // .service ul li:hover,
  // .service ul li.active {
  //   border: 1px solid orange;
  // }
  // .service ul li:hover
  .text-primary {
    color: #eaeaea !important;
  }
//   .service .custom-control-label::before,
//   .custom-control-label::after {
//     top: 0.5rem;
//     left: 4rem;
//   }
//   .custom-control-label {
//     margin-top: 1rem;
//   }
//   .ripple-parent {
//     margin: auto !important;
//   }
//   .service .custom-control-inline {
//     width: 100%;
//     margin-right: 0rem;
//     padding-left: 0;
//   }
//   .service .custom-control-label {
//     width: 100%;
//   }
//   .service ul li i {
//     margin-top: 1rem;
//   }
//   .service ul li p {
//     // line-height: 1.5rem;
//   }
}
</style>
<style lang="less">
.register-success {
  @media (min-width: 750px) {
    .modal-dialog {
      max-width: 600px;
      margin: 1.75rem auto;
    }
  }
 @media (min-width: 1200px) {
    .modal-dialog {
      max-width: 70%;
      margin: 1.75rem auto;
    }
  }
  .modal-header {
    padding-bottom: 0;
  }
  .modal-body {
    padding: 0;
    padding-bottom: 1rem;
  }
  .modal-content {
    background: #ffffff !important;
  }
  .modal-header {
    border: none;
  }
  .modal-footer {
    border: none;
    padding: 1rem;
    padding-bottom: 1.5rem;
  }
}
</style>
