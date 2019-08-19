<template>
<!-- 宋洪叶 3019.3.11 修改 -->
 <mdb-footer  color="elegant-color-dark" class="page-footer font-small lighten-5 pt-4 footer-warp" style="margin-top:0 !important;">
    <mdb-container class=" font-color text-center" style="padding-right:0;">
      <mdb-row class="mt-3 justify-content-center">
        
        <mdb-col lg="3" xl="3" class="mb-4 text-center" style="padding:0">
          <div class="our-logo">
            <div class="logo-wrap"><img src="@/assets/images/logo.png" alt="">合筑空间</div>
          </div>
          <div class="language">
            <!-- <mdb-container class="text-center">
              <mdb-select @getValue="getSelectValue" :options="countries" class="language-select" color="primary"/>
            </mdb-container> -->
            <div class="language-select select-wrapper">
              中国
              <span class="caret">▼</span>
            </div>
            <!-- <mdb-select @getValue="getSelectValue" :options="countries" class="language-select" /> -->
          </div>
          <div class="english-name">© Shanghai Union Construction Co., Ltd.</div>
        </mdb-col>
        <mdb-col lg="6" xl="6" class="pos-padding mb-4 text-center" style="padding:0">
          <mdb-row>
            <mdb-col  class="mb-4 text-center" style="padding:0">
              <h6 class="text-uppercase font-weight-bold"><strong>公司</strong></h6>
              <hr class=" accent-2 mb-4 mt-0 d-inline-block mx-auto hidden" style="width: 60px" />
              <p><a href="#/understandCoop">关于合筑</a></p>
              <p><a href="#/hezhuNews" >相关报道</a></p>
              <p><a href="#/hezhuItem" >合筑条款</a></p>
              <p><a href="#/LegalStatement">法律声明</a></p>
              <p><a href="#">知识产权</a></p>
            </mdb-col>
            
            <mdb-col  class="mb-4 text-center" style="padding:0">
              <h6 class="text-uppercase font-weight-bold"><strong>服务</strong></h6>
              <hr class=" accent-2 mb-4 mt-0 d-inline-block mx-auto hidden" style="width: 60px" />
              <p><a href="#" >合作伙伴</a></p>
              <p><a href="#">广告招商</a></p>
              <p><a href="#/recruitInfo">招贤纳士</a></p>
            </mdb-col>
            
            <mdb-col  class="mb-4 text-center" style="padding:0">
              <h6 class="text-uppercase font-weight-bold"><strong>帮助</strong></h6>
              <hr class="accent-2 mb-4 mt-0 d-inline-block mx-auto hidden" style="width: 60px" />
              <p><a href="#/CommissionedInvitation">服务流程</a></p>
              <p><a href="#/CommonProblem">常见问题</a></p>
              <p><a href="https://cschat-ccs.aliyun.com/index.htm?tntInstId=_1I7tqYq&scene=SCE00004459#/" target="_blank">在线客服</a></p>
              <p><a href="#/contactUs">联系我们</a></p>
            </mdb-col>
          </mdb-row>
        </mdb-col>
        <mdb-col  lg="3" xl="3" class="pos-margin mb-4 text-center" style="padding:0">
          <h6 class="text-uppercase font-weight-bold hidden"><strong>帮助</strong></h6>
          <hr class=" accent-2 mb-4 mt-0 d-inline-block mx-auto hidden" style="width: 60px" />
          <p><span class="logo-box"><mdb-icon icon="download" size="lg" class="logo mr-2"/></span>APP下载</p>
          <p class="backTipParent" style="cursor:pointer;" @mouseover="shareHoverIndex2 = 0" @mouseout="shareHoverIndex2 = -1">
            <span class="logo-box"><mdb-icon fab icon="weixin" size="lg" class="logo mr-2 "/></span>官方微信
            <span class="backTip" v-if="shareHoverIndex2 == 0"><img width="100%" height="100%" src="../assets/images/qr-code.png" alt=""></span>
          </p>
          <p><span class="logo-box"><mdb-icon fab icon="weibo" size="lg" class="logo mr-2 "/></span>新浪微博</p>
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </mdb-footer>
  <!-- Footer -->
  <!-- <mdb-footer color="unique-color-dark" class="page-footer mdb-color elegant-color text-center text-md-left pt-5">
    <mdb-container class="mt-5 mb-4 text-center text-md-left">
      <mdb-row class="mt-3">
        <mdb-col md="3" lg="4" xl="5" class="mb-4 text-center">
          <hr class="mb-4 mt-0 d-inline-block mx-auto" style="width: 60px" />
          <div class="our-logo"><img src="@/assets/images/logo.png" alt=""></div>
          <div class="company-name">上海合筑有限公司</div>
          <div class="english-name">Shanghai Union Construction Co., Ltd.</div>
        </mdb-col>
        <mdb-col md="2" lg="2" xl="2" class="mb-4">
          <h6 class="text-uppercase font-weight-bold"><strong>关于</strong></h6>
          <hr class="mb-4 mt-0 d-inline-block mx-auto" style="width: 60px" />
          <p><a href="#/understandCoop">关于我们</a></p>
          <p><a href="#/hezhuNews">媒体报道</a></p>
          <p><a href="#/recruitInfo">招聘信息</a></p>
          <p><a href="#/hezhuItem">合筑条款</a></p>
          <p><a href="#/LegalStatement">法律声明</a></p>
        </mdb-col>
        <mdb-col md="3" lg="2" xl="2" class="mb-4">
          <h6 class="text-uppercase font-weight-bold"><strong>合筑产品</strong></h6>
          <hr class="mb-4 mt-0 d-inline-block mx-auto" style="width: 60px" />
          <p><a href="#/excellentProject">合筑视界</a></p>
        </mdb-col>
        <mdb-col md="4" lg="3" xl="3" class="mb-4">
          <h6 class="text-uppercase font-weight-bold"><strong>帮助</strong></h6>
          <hr class="mb-4 mt-0 d-inline-block mx-auto" style="width: 60px" />
          <p><a href="#/login">服务流程</a></p>
          <p><a href="#/CommonProblem">常见问题</a></p>
          <p><a href="#/contactUs">联系我们</a></p>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <div class="footer-copyright text-center py-3">
      <mdb-container fluid>
        Copyright Shanghai Union Construction Co., Ltd.
      </mdb-container>
    </div>
  </mdb-footer> -->
  <!-- Footer -->
</template>

<script>
export default {
  data() {
    return {
       countries: [
        { text: '中国', value: null, selected: true },
        { text: '英国', value: null, selected: true },
      ],
      shareHoverIndex2:-1
    }
  },
  methods:{
    getSelectValue(){

    }
  }
}
</script>

<style lang="less" scoped>
  .bg-color{
    background: #F0F0F0;
    margin-top: 0!important;
  }
  .container{
    padding: 0;
  }
  .container .row{
    margin: 0;
  }
   .container .row .col{
    padding: 0!important;
  }
  @media (min-width: 1200px){
    .container {
        max-width: 1200px!important;
    }
  }
  .our-logo{
    font-size: 1.5rem;
    font-weight: 700;
    .logo-wrap{
      width: 10rem /* 160/16 */;
      margin: 0 auto;
      text-align: left;
    }
    img{
      vertical-align: middle;
      width: 3.125rem /* 50/16 */;
      max-width: 50px;
      margin-right: 0.5rem;
    } 
  } 
  .language{
    margin: 1rem 0 0.25rem;
    text-align: center;
    .language-select{
      background: #fff;
      width:10rem;
      padding: 0 0.5rem;
      margin: 0 auto;
      height: 32px;
      line-height: 32px;
      text-align: left;
      font-size: 1rem /* 16/16 */;
      color: #333;
      .caret{
        top: 50%;
        transform: translate(0,-50%);
      }
    }
  }
  

  .hidden{
    visibility: hidden;
  }
  .logo-box{
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    line-height: 21px;
    background: #9e9e9e;
    border-radius: 100%;
    width: 21px;
    height: 21px;
    margin-right: 0.625rem;
  }
  .logo{
    // border-radius: 100%;
    // vertical-align: middle;
    // display: inline-block;
    // background: #D7D5D4;
    // color: #F0F0F0;
    // width: 20px;
    // height: 20px;
    // font-size: 12px;
    // text-align: center;
    // line-height: 20px;
    color: #ffffff;
    font-size: 0.75rem;
  }

.font-weight-bold {
  font-size:0.9375rem;
  font-weight: bold;
}
p{
  margin-bottom: 1rem;
  color: #fff;
  font-size: 0.875rem;
}
.english-name{
  font-size: 0.875rem;
  margin-top: 1rem;
  // text-align: center;
}
.backTipParent{
  // display: inline-block;
  position: relative;
  cursor:pointer;
}
.backTip{
  background: rgba(0, 0, 0);
  color: #fff;
  padding: 0.25rem;
  font-size: 0.75rem;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top:110%;
  transform: translateX(-40%);
  width: 8rem;
  height: 8rem;
  text-align: center;
  z-index: 10;
  display: inline-block;
}
	.backTip:before{
    		content: ' ';
    		border-bottom: 5px solid rgba(0, 0, 0);
    		border-left: 5px solid transparent;
    		border-right: 5px solid transparent;
    		position: absolute;
    		top: -5px;
        left: 50%;
        transform: translateX(-50%);
  }
  @media (max-width: 690px){
    .pos-padding{
      padding-top: 2rem !important;
    }
    .pos-margin{
      margin-top: -3rem !important;
    }
  }
</style>
<style lang="less">
.footer-warp{
  .fa-lg {
        margin-right: 0px !important;
  }
}
</style>

