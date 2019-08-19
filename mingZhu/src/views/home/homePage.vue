<template>
  <div class="home-page" ref="homePage">
    <headerPart></headerPart>
    <video autoplay="true" playsinline loop muted style="object-fit:fill;min-width: auto; min-height: auto; width: 100%; height: 100%;">
      <source src="@/assets/images/1080.mp4" type="video/mp4">
    </video>
    <!-- 首页banner -->
       <!-- <stars-view
      :active-index="index"
      :clickable="true"
      :auto-play="true"
      v-on:resetIndex="resetIndex"
      :description="description"
      :slogon="slogon"
    /> -->
     <!-- <div class="wrapper"  >
      <button @click.stop="onClick(0)">水星</button>
      <button @click.stop="onClick(1)">金星</button>
      <button @click.stop="onClick(3)">火星</button>
      <button @click.stop="onClick(4)">木星</button>
      <button @click.stop="onClick(5)">土星</button>
    </div> -->

    <!-- <mdb-carousel showIndicators full v-if="bannerImgList.length>0">
      <mdb-carousel-item
        img
        v-for="(item,index) in bannerImgList"
        :key="index"
        :src="item.saveSite"
        style="height:100%"
      >
        <mdb-carousel-caption></mdb-carousel-caption>
      </mdb-carousel-item>
    </mdb-carousel> -->
    <!-- 合筑流程 -->
    <div class="container-fluid background-z" style="background:#fff;">
        <div class="container">
    <section class="section py-4">
      <h1 class="text-center text-uppercase font-weight-bold mt-5 pt-4 spacing wow fadeIn" data-wow-delay="0.2s" style="margin-bottom:0.5rem;color:#212529">
        <strong>合筑流程</strong>
      </h1>
      <p class="text-center w-responsive mx-auto text-uppercase font-weight-bold wow fadeIn" data-wow-delay="0.2s" style='color:#212529'
      >Our Progress</p>

      <mdb-row class="wow fadeIn mb-5" data-wow-delay="0.4s">
        <mdb-col class="text-center pt-1">
          <div class="icon-area">
            <div class="circle-icon">
              <i class="fas fa-pencil-alt blue-text"></i>
            </div>
            <br>
            <strong class>发布需求</strong>
            <p>告诉我们项目基本信息和您的设计需求</p>
          </div>
        </mdb-col>
        <mdb-col class="text-center pt-1">
          <div class="icon-area">
            <div class="circle-icon">
              <i class="far fa-comments blue-text"></i>
            </div>
            <br>
            <strong>免费咨询</strong>
            <p>为您免费量身打造设计需求</p>
          </div>
        </mdb-col>
        <mdb-col class="text-center pt-1">
          <div class="icon-area">
            <div class="circle-icon">
              <i class="far fa-handshake blue-text"></i>
            </div>
            <br>
            <strong>精确匹配</strong>
            <p>大数据智能匹配，多种招标方式供您选择</p>
          </div>
        </mdb-col>
        <mdb-col class="text-center pt-1">
          <div class="icon-area">
            <div class="circle-icon">
              <i class="far fa-file-alt blue-text"></i>
            </div>
            <br>
            <strong>签署合同</strong>
            <p>明确各方责权，提供法律保障</p>
          </div>
        </mdb-col>
        <mdb-col class="text-center pt-1">
          <div class="icon-area">
            <div class="circle-icon">
              <i class="fas fa-users blue-text"></i>
            </div>
            <br>
            <strong>实时管理</strong>
            <p>全程跟踪，为项目保驾护航</p>
          </div>
        </mdb-col>
        <mdb-col class="text-center pt-1">
          <div class="icon-area">
            <div class="circle-icon">
              <i class="fas fa-video blue-text"></i>
            </div>
            <br>
            <strong>直播评审</strong>
            <p>权威专家直播评审，中标作品实至名归</p>
          </div>
        </mdb-col>
      </mdb-row>
    </section>
        </div>
        </div>
        <!-- 合筑流程结束 -->
    <!-- 合筑作品 -->
    <div class="container-fluid" style="background-color: #e8eaec;">
      <div class="container-fluid" style=" padding-bottom:2rem">
      <section id="portfolio" class="section pt-3 pb-3">
        <h1
          class="text-center text-uppercase font-weight-bold mt-5 mb-3 mt-5 wow fadeIn"
          data-wow-delay="0.2s"
          style="color:#212529"
        >合筑作品</h1>
        <p
          class="text-center w-responsive mx-auto text-uppercase font-weight-bold wow fadeIn"
          data-wow-delay="0.2s"
          style="color:#212529"
        >Our Work</p>
        <div class="line line-v2 wow fadeIn" data-wow-delay="0.2s"></div>
        <mdb-row class="ml-3">
          <mdb-col class="text-center w-responsive mx-auto my-5" style="padding:0;">匠心独运，倾力打造，诠释名为建筑的艺术</mdb-col>
          </mdb-row>
          <mdb-row class="ml-3 mr-3 wow fadeIn col-md-12 work-msg" data-wow-delay="0.4s" style="margin:0!important;">
            <mdb-col class="col-md-3" v-for="(item,index) in successCaseList" :key="index" style="flex-basis:auto;padding:0.5rem!important;">
              <div>
              <mdb-view hover class="imgHeight"  @click.native="goCaseDetail(item.id,item.openType,item.webUrl)"
              style="-webkit-box-shadow: 0 4px 5px 0 rgba(0,0,0,.16),0 4px 10px 0 rgba(0,0,0,.12)!important;
    box-shadow: 0 4px 5px 0 rgba(0,0,0,.16),0 4px 10px 0 rgba(0,0,0,.12)!important;">
                <img
                  class="img-fluid"
                  :src="item.url"
                  alt="Sample image"
                >
                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
              </mdb-view>
              <p class="text-uppercase font-weight-bold blue-grey-text mt-4" style="color:#53535c!important;cursor:pointer" @click.stop="goCaseDetail(item.id,item.openType,item.webUrl)">
                | {{item.title}}
              </p>
              </div>
            </mdb-col>

          </mdb-row>
           <div class="row pt-5 mb-4 text-center">
              <div class="col-md-12">
               <mdb-btn outline="primary" @click.native="$router.push('/checkCase')" style="border-color:#000!important;color:#000!important;font-weight:600;">MORE</mdb-btn>
              </div>
            </div>
      </section>
      </div>
    </div>
    <!-- 合筑建筑师-->
    <div class="container">
      <section class="section text-center pb-4">
        <!--Section heading-->
        <h1
          class="text-center text-uppercase font-weight-bold mt-5 pt-4 spacing wow fadeIn"
          data-wow-delay="0.2s" style="margin-bottom:0.5rem;color:#212529"
        >
          <strong class="font-weight-bold">合筑建筑师</strong>
        </h1>
        <p
          class="text-center w-responsive mx-auto text-uppercase font-weight-bold wow fadeIn"
          data-wow-delay="0.2s"
          style="color:#212529"
        >Our Architect</p>
        <div class="row designer-row">
          <!--Carousel Wrapper-->
          <!-- <mdb-carousel showControls multi slide v-if="architectList.length>0"> -->
             <mdb-carousel showControls multi slide navClass="btn-primary" v-if="architectList && architectList.length>0">
            <mdb-carousel-item v-for="(items,index) in architectList" :key="index">
              <mdb-row>
                <!--Grid column-->
                <div class="col-md-4 slidePageImg" v-for="(item,childIndex) in items" :key="childIndex">
                  <div class="testimonial">
                    <!--Avatar-->
                    <div class="avatar mx-auto">
                      <img style="max-width: 170px;" :src="item.head" class="rounded-circle img-fluid z-depth-1-half" @click="$router.push('/seniorDesignerDetails?id=' + item.id);"
                       >
                    </div>
                    <!--Content-->
                    <h4 class="font-weight-bold mt-4" >{{item.realName}}</h4>
                    <h6 class="blue-text font-weight-bold my-3">{{item.tag}}</h6>
                    <p class="des-jian font-weight-normal" v-html="item.homePage" style="height:6rem;overflow:hidden;">
                      <!-- {{item.homePage}} -->
                    </p>
                    <!--Review-->
                    <!-- <div class="grey-text">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star-half-alt"></i>
                    </div> -->
                  </div>
                </div>
                <!--Grid column-->
              </mdb-row>
            </mdb-carousel-item>
          </mdb-carousel>
          <!--Carousel Wrapper-->
        </div>
      </section>
      <!--Section: Testimonials v.4-->
    </div>
    <!-- 视差效果 -->
    <div
      class="streak streak-photo"
      style="background-image:url('https://mdbootstrap.com/img/Photos/Horizontal/Nature/full%20page/img%20%2821%29.jpg')"
    >
      <div class="mask flex-center rgba-black-light">
        <div class="container wow fadeIn" data-wow-delay="0.2s">
          <!--First row -->
          <div class="row text-white text-center streak-line" v-if="designerNumList && designerNumList.length>0">
            <!--First column -->
            <div class="col-md-3 mb-2">
              <h1 class="white-text mb-1 font-weight-bold">
                <strong>+{{designerNumList[0].value}}</strong>
              </h1>
              <p>建筑师</p>
            </div>
            <!-- First column -->
            <!--Second column -->
            <div class="col-md-3 mb-2">
              <h1 class="white-text mb-1 font-weight-bold">
                <strong>+{{designerNumList[1].value}}</strong>
              </h1>
              <p>客户会员</p>
            </div>

            <!-- Second column -->
            <!--Third column -->
            <div class="col-md-3 mb-2">
              <h1 class="white-text mb-1 font-weight-bold">
                <strong>+{{designerNumList[2].value}}</strong>
              </h1>
              <p>完成项目</p>
            </div>
            <!-- Third column -->
            <!--Fourth column -->
            <div class="col-md-3">
              <h1 class="white-text mb-1 font-weight-bold">
                <strong>+{{designerNumList[3].value}}</strong>
              </h1>
              <p>进行中项目</p>
            </div>
            <!-- Fourth column -->
          </div>
          <!-- First row -->
        </div>
      </div>
    </div>
    <!-- 视差效果结束 -->
    <!-- 合筑消息 -->
    <section>
      <div class="container-fluid white mb-0 pb-0">
        <hr class="mt-0">
        <div class="container">
          <!--Grid row-->
          <div class="row">
            <!--Grid column-->
            <div class="col-lg-4 col-md-12">
              <h6 class="font-weight-bold mt-5 mb-3">竞赛消息</h6>
              <hr class="mb-4">
              <mdb-view hover rounded class="z-depth-1-half contentInfo" @click.native="$router.push('/competitionDetail?activityId=' + contestList.id);">
                <img
                  class="img-fluid z-depth-1"
                  :src="contestList.picture"
                  alt="Sample image"
                  style="width:100%"
                >
                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
              </mdb-view>
              <p class="mt-4 mb-5" style="height: 4.6rem;overflow: hidden;text-overflow: ellipsis;">
                {{contestList.describe}}
              </p>

            </div>
            <!--Grid column-->
            <!--Grid column-->
            <div class="col-lg-4 col-md-6 news-msg">
              <h6 class="font-weight-bold mt-5 mb-3">合筑新闻</h6>
              <hr class="mb-4" v-if="newsList && newsList.length>0">
              <!--Grid row-->
              <!-- <div class="row mt-4" v-for="(item,index) in newsList" :key="index"> -->
                <div class="row msg-row" v-for="(item,index) in newsList" :key="index" style="height:5.5rem;">
                <!--Grid column-->
                <div class="col-4"  @click="$router.push('/newsDetails?id=' + item.id);">
                  <!--Image-->
                  <mdb-view hover  class="z-depth-1-half" style="height:100%;">
                <img
                width="100% !important"
                  class="img-fluid"
                  :src="item.thumbnailPic"
                  alt="Sample image"
                >
                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
              </mdb-view>
                </div>
                <!--Grid column-->
                <!--Second column-->
                <div class="col-8 mb-1"  @click="$router.push('/newsDetails?id=' + item.id);">
                  <!--Post data-->
                  <div class>
                    <p class="mb-1 new-saml-title">
                      <a class="text-hover font-weight-bold">
                        {{item.newsTitle}}
                      </a>
                    </p>
                    <p class="font-small" style="font-size:0.9rem;font-style:italic;font-weight: 300;">
                      <em>{{item.newsTime | formatDate}}</em>
                    </p>
                  </div>
                </div>
                <!--Second column-->
              </div>
              <!--Grid row-->
            </div>
            <!--Grid column-->
            <!--Grid column-->
            <div class="col-lg-4 col-md-6 project-msg">
              <h6 class="font-weight-bold mt-5 mb-3">项目信息</h6>
              <hr class="mb-4">
              <!--Grid row-->
              <div class="row msg-row" v-for="(item,index) in pointList" :key="index" style="height:5.5rem;">
                <!--Grid column-->
                <div class="col-4" @click.prevent="goProjectDetial(item.id)">
                  <mdb-view hover  class="z-depth-1-half" style="height:100%;">

                <img
                width="100% !important"
                  class="img-fluid"
                  :src="item.cover"
                  alt="Sample image"
                >
                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
              </mdb-view>
                  <!--Image-->

                </div>
                <!--Grid column-->
                <!--Second column-->
                <div class="col-8 mb-1" @click.prevent="goProjectDetial(item.id)">
                  <!--Post data-->
                  <div class>
                    <p class="mb-1 new-saml-title">
                      <a class="text-hover font-weight-bold">
                        {{item.viewPointTitle}}
                      </a>
                    </p>
                    <p class="font-small" style="font-size:0.9rem;font-style:italic">
                      <em>{{item.createTime | formatDate}}</em>
                    </p>
                  </div>
                </div>
                <!--Second column-->
              </div>
              <!--Grid row-->
            </div>
            <!--Grid column-->
          </div>
          <!--Grid row-->
        </div>
      </div>
    </section>
    <!-- 合筑视界 -->
    <div class="container">
      <!--Section: Magazine v.1-->
      <section class="wow fadeIn viewInfo" data-wow-delay="0.2s">
        <!--Section heading-->
        <h2 class="h1 text-center my-5 font-weight-bold" style="color:rgb(33, 37, 41)">合筑视界</h2>

        <!--Grid row-->
        <div class="row text-left">
          <!--Grid column-->
          <div class="col-lg-6 col-md-12">
            <mdb-view hover rounded class="shijie-height z-depth-1-half mask rgba-white-slight waves-effect waves-light mb-3"  @click.native="$router.push('/excellentProjectDetails?id=' + designerInterviewList.bigImgList.id);"
             style="height:22.51rem;overflow:hidden;">
                <img
                height="100% !important"
                  class="img-fluid"
                  :src="designerInterviewList.bigImgList.url"
                  alt="Sample image"
                >
                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
              </mdb-view>

            <!--Excerpt-->
            <div class="news-data">
              <a href class="light-blue-text">
                <h6>
                  <i class="fas fa-ethernet"></i>
                  <strong>{{designerInterviewList.bigImgList.subTitle}}</strong>
                </h6>
              </a>
              <p>
                <strong style="color:rgb(33, 37, 41);">
                  <i class="far fa-clock"></i> {{designerInterviewList.bigImgList.createTime | formatDate}}
                </strong>
              </p>
            </div>
            <h3 class="no-wrap"  style="margin-bottom:0.5rem;">
                <strong style="font-size:1.75rem;font-weight:bolder;">{{designerInterviewList.bigImgList.title}}</strong>
            </h3>
            <p class="detailInfo" style="display:-webkit-box">
              {{designerInterviewList.bigImgList.describe}}
            </p>

            <!--/Featured news-->
            <hr>

            <!--Small news-->
            <template v-for="(item,index) in designerInterviewList.smallImgList">
              <div class="row showView" :key="index"
              v-if="designerInterviewList.smallImgList && designerInterviewList.smallImgList.length>0">

                <div class="col-md-3 sight-img" @click="$router.push('/excellentProjectDetails?id=' + designerInterviewList.smallImgList[index].id);">
                  <mdb-view hover rounded class="z-depth-1-half mask rgba-white-slight waves-effect waves-light">
                  <img
                    class="img-fluid"
                    :src="item.url"
                    alt="Sample image"
                  >
                  <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                </mdb-view>
                </div>

                <!--Excerpt-->
                <div style="height: 4.7rem;" class="col-md-9"  @click="$router.push('/excellentProjectDetails?id=' + designerInterviewList.smallImgList[index].id);">
                  <p class="dark-grey-text">
                    <strong>{{item.createTime | formatDate}}</strong>
                  </p>
                  <a style="color:rgb(33,37,41)">
                    <span class="fontsInfo">{{item.title}}</span>
                    <i class="fas fa-angle-right float-right"></i>
                  </a>
                </div>
                <div :key="index" v-if="index != 2" class="lined"></div>
              </div>
            </template>

            <!--/Small news-->
          </div>
          <!--Grid column-->
          <!--Grid column-->
          <div class="col-lg-6 col-md-12">
            <!--Image-->
            <mdb-view hover rounded class="shijie-height z-depth-1-half mask rgba-white-slight waves-effect waves-light mb-3"  @click.native="$router.push('/excellentProjectDetails?id=' + designerInterviewList2.bigImgList.id);"
             style="height:22.51rem;overflow:hidden;">
                <img
                height="100% !important"
                  class="img-fluid"
                  :src="designerInterviewList2.bigImgList.url"
                  alt="Sample image"
                >
                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
              </mdb-view>

            <!--Excerpt-->
            <div class="news-data">
              <a href class="light-blue-text">
                <h6>
                  <i class="fas fa-ethernet"></i>
                  <strong>{{designerInterviewList2.bigImgList.subTitle}}</strong>
                </h6>
              </a>
              <p>
                <strong>
                  <i class="far fa-clock"></i> {{designerInterviewList2.bigImgList.createTime | formatDate}}
                </strong>
              </p>
            </div>
            <h3 class="no-wrap" style="margin-bottom:0.5rem;">
              <a>
                <strong style="font-size:1.75rem;font-weight:bolder;">{{designerInterviewList2.bigImgList.title}}</strong>
              </a>
            </h3>
            <p class="detailInfo" style="display:-webkit-box">
              {{designerInterviewList2.bigImgList.describe}}
            </p>

            <!--/Featured news-->
            <hr>

            <!--Small news-->
            <template v-for="(item,index) in designerInterviewList2.smallImgList">
              <div class="row" :key="index" v-if="designerInterviewList2.smallImgList && designerInterviewList2.smallImgList.length>0">
                <div class="col-md-3 sight-img"  @click="$router.push('/excellentProjectDetails?id=' + designerInterviewList2.smallImgList[index].id);">
                  <mdb-view hover rounded class="z-depth-1-half mask rgba-white-slight waves-effect waves-light">
                  <img
                    class="img-fluid"
                    :src="item.url"
                    alt="Sample image"
                  >
                  <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                </mdb-view>
                </div>

                <!--Excerpt-->
                <div style="height: 4.7rem;" class="col-md-9"  @click="$router.push('/excellentProjectDetails?id=' + designerInterviewList2.smallImgList[index].id);">
                  <p class="dark-grey-text">
                    <strong>{{item.createTime | formatDate}}</strong>
                  </p>
                  <a style="color:rgb(33,37,41)" href="javascript: ;" >
                    <span class="fontsInfo">{{item.title}}</span>
                    <i class="fas fa-angle-right float-right"></i>
                  </a>
                </div>
                <div :key="index" v-if="index != 2" class="lined"></div>
              </div>
            </template>
            <!--/Small news-->
          </div>

          <!--Grid column-->
        </div>
        <!--Grid row-->
      </section>
      <!--/Section: Magazine v.1-->
    </div>
    <!-- 常见问题 -->
    <div class="container question">
      <section
        id="newsletter"
        class="section mt-5 mb-5 pb-5 wow fadeIn newsletter"
        data-wow-delay="0.2s"
      >
        <!--Section heading-->
        <h2
          class="text-center mb-5 my-5 py-5 dark-grey-text font-weight-bold wow fadeIn"
          data-wow-delay="0.2s" style="font-size:2rem; color:#212529;padding-bottom: 2rem!important;"
        >常见问题</h2>

        <!--Section sescription-->
        <!--First row-->
        <div class="row">
          <!--First column-->
          <div class="col-lg-6 mb-3">
          <accordion :panes="panes" material style="color:#333!important;" :open=0></accordion>
            <!--/.Accordion wrapper-->
          </div>
          <!--First column-->
          <div class="col-lg-6" style="padding-top:1rem">
            <mdb-view hover rounded class=" mask rgba-white-slight waves-effect waves-light mb-3"
            style="-webkit-box-shadow: 0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)!important;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)!important;">
                <img
                  class="img-fluid"
                  src="https://mdbootstrap.com/img/Photos/Horizontal/Relax/4-col/img%20%288%29.jpg"
                  alt="Sample image"
                >
                <!-- <mdb-mask flex-center waves overlay="white-slight"></mdb-mask> -->
            </mdb-view>
          </div>
        </div>
        <!--/First row-->
      </section>
    </div>
    <footerPart></footerPart>
  </div>
</template>

<script>
import headerPart from "@/components/header.vue";
import footerPart from "@/components/footer.vue";
//import rightNav from '@/components/rightNav'
// import {WOW} from 'wowjs'

export default {
  components: {
    headerPart,
    footerPart
    //rightNav
  },
  data() {
    return {
      index: -1,
      description: [
        "评审过程公开透明 中标作品实至名归",
        "诠释建筑艺术的魅力与真谛",
        "",
        "客户与建筑师完美邂逅的平台",
        "多种征集方式 大数据智能匹配",
        "国内外实名认证的优秀建筑师在此云集"
      ],
      slogon: "原创建筑设计服务在线平台",
      accordionIndex: 2,
      mobileCustomIndex: 1,
      heightH: window.innerHeight,
      options: {
        sectionsColor: ["#000"],
        scrollOverflow: true,
        onLeave: this.onLeave,
        afterRender: this.onAfter
      },
       panes: [],
      bannerImgList: [],
      // 静态合筑服务流程
      serviceList: [
        {
          title: "提交项目需求",
          detail:
            "提交项目基本信息，项目立项，合著空间专职项目经理为提供进一步...",
          imgSrc: require("@/assets/images/service1.png")
        },
        {
          title: "项目需求对接",
          detail:
            "项目经理免费协助客户对设计需求进行专业化整理，提供项目设计策划...",
          imgSrc: require("@/assets/images/service2.png")
        },
        {
          title: "精确匹配设计师",
          detail:
            "平台将基于大数据算法为您智能匹配合适的项目设计资源，项目经理...",
          imgSrc: require("@/assets/images/service3.png")
        },
        {
          title: "签署项目合同",
          detail:
            "对项目相关信息、设计师作出二次审核；与供、需双方签订服务合同...",
          imgSrc: require("@/assets/images/service4.png")
        },
        {
          title: "实时项目管理",
          detail:
            "对项目进行里程碑式管理确保项目进度，在客户与设计师之间建立规...",
          imgSrc: require("@/assets/images/service5.png")
        },
        {
          title: "项目成果评审",
          detail:
            "业界权威领衔专家组对成果作出有效性评价或者竞标评审，确保提交...",
          imgSrc: require("@/assets/images/service6.png")
        }
      ],
      // 静态设计之旅
      cooperationList: [
        {
          number: "01",
          title: "发布项目需求",
          detail:
            "提交您的项目需求，合筑空间将为您智能匹配设计师，并由专职项目经理为您提供进一步服务。",
          imgSrc: require("@/assets/images/cooperation1.png")
        },
        {
          number: "02",
          title: "查找设计师",
          detail:
            "您可以在合筑空间设计师中寻找和筛选满意的设计师，委托设计师设计或邀请设计师参与竞标。",
          imgSrc: require("@/assets/images/cooperation2.png")
        },
        {
          number: "03",
          title: "查看案例",
          detail:
            "您也可以在合筑空间案例库中寻找灵感及其背后的设计师，以最直观的方式需寻找最佳设计师。",
          imgSrc: require("@/assets/images/cooperation3.png")
        },
        {
          number: "04",
          title: "智能估价",
          detail:
            "根据发布任务的类型、特点和规模，以及您希望的方案征集方式，系统自动给出设计费预估价。",
          imgSrc: require("@/assets/images/cooperation4.png")
        }
      ],
      // 合筑视界左边
      designerInterviewList: {
        bigImgList: [],
        smallImgList: []
      },
      designerInterviewList2: {
        bigImgList: [],
        smallImgList: []
      },
      designerNumList: [],
      designerList: [],
      customerList: [],
      successCaseList: [],
      customerLogoList: [],
      cooperationActiveIndex: null,
      designerActiveIndex: "0",
      architectList: [], //推荐建筑师
      contestList: [], //竞赛消息
      newsList: [], //新闻消息
      pointList: [], //推荐项目

      opts: {
        start: 0,
        dir: "v",
        loop: false,
        duration: 500,
        stopPageScroll: true,
        beforeChange: function(prev, next) {},
        afterChange: function(prev, next) {}
      },
      itemBtnVisible: false,
      i: 0,
      offsetheight: document.documentElement.clientHeight, // 获取当前页面的高度
      role: localStorage.getItem("role") || sessionStorage.getItem("role"),
      imgNum: 1
    };
  },
  computed: {},
  filters:{
    formatDate:function(val){
      if(val && val.length>0){
        return val.split(" ")[0]
      } else {
        return ""
      }

    }
  },
  methods: {
    goProjectDetial(id){
      console.log(id)
      this.$router.push(`/projectDetail/${id}`);
    },
    goDesigner(id, web) {
      if (web) {
        window.location.href = web;
      } else {
        this.$router.push("/speak?id=" + id);
      }
    },
     onClick(e) {
      this.index = e;
    },
    resetIndex() {
      this.index = -1;
    },
    goCaseDetail(id,type,webUrl){

      // if(type == "1"){
      //   this.$router.push('/success?id='+id)
      // } else {
      //   window.location.href = webUrl;
      // }
      if(webUrl){
        window.location.href = webUrl;
      }else{
        this.$router.push('/success?id='+id)
      }
    },
    imageLoaded() {
      this.imgNum += 1;
      if (this.imgNum >= this.successCaseList.length) {
        console.log("大图片加载完毕", this.$refs.fullpage.api);
        this.$refs.fullpage.api.reBuild();
      }
    },
    successEnter(index) {
      this.successCaseList[index].active = true;
    },
    successLeave(index) {
      this.successCaseList[index].active = false;
    },
    showMobileCustomer(index) {
      this.mobileCustomIndex = index;
    },
    publishProject(index) {
      switch (index) {
        case 0:
          this.$router.push("/CommissionedDesign");
          break;
        case 1:
          this.$router.push("/SearchDesigners");
          break;
        case 2:
          this.$router.push("/checkCase");
          break;
        case 3:
          this.$router.push("/appraisalHome");
          break;
      }
    },
    onLeave(origin) {
      if (origin.index > 0) {
        this.$store.commit("setNavScroll", false);
      } else {
        this.$store.commit("setNavScroll", true);
      }
    },
    onAfter() {
      // new WOW({
      //   live:false,
      //   boxClass:     'wow',      // default
      //   animateClass: 'animated', // default
      //   offset:       1000,          // default
      //   mobile:       true,       // default
      // }).init()
    },
    test() {
      var scrollT = document.documentElement.scrollTop;
      document.documentElement.scrollTop = 500;
    },
    // 设计之旅进入样式
    selectStyle(index) {
      this.cooperationActiveIndex = index;
      this.itemBtnVisible = true;
    },
    // 设计之旅离开样式
    outStyle(index) {
      this.itemBtnVisible = false;
      this.cooperationActiveIndex = null;
    },
    // 设计师类型点击事件
    designerType(index, url) {
      this.designerActiveIndex = index;
      // console.log(index)
      this.$router.push(url);
    },
    accordionIndexClick(id, web) {
      if (web) {
        window.location.href = web;
      } else {
        this.$router.push("/speak?id=" + id);
      }
    },
    // 手风琴mouseenter
    accordionIndexEnter(index) {
      this.accordionIndex = index;
      // let obj = document.getElementsByClassName('customerDescription')
      // if (obj[index] !== obj[2]) {
      //   obj[index].style.display = 'block'
      //   obj[2].style.display = 'none'
      // } else {
      //   obj[2].style.display = 'block'
      // }
    },
    // 手风琴mouseleave
    accordionIndexLeave(index) {
      // let obj = document.getElementsByClassName('customerDescription')
      // obj[index].style.display = 'none'
      // obj[2].style.display = 'block'
    },
    // banner轮播图-Data
    getBanner() {
      this.api.homePageBanner({}).then(res => {
        this.bannerImgList = res.data;
      });
    },
    //推荐建筑师
    gerDesigner() {
       this.api.homePageDesigner({}).then(res => {
        this.architectList = res.indexDesigners;
      });
    },
    //竞赛消息
     gerContest() {
       this.api.homePageContest({}).then(res => {
        this.contestList = res.indexContest[0];
      });
    },
    //常见问题
     gerQuestion() {
       this.api.homePageQuestion({}).then(res => {
        this.panes = res.rows;
      });
    },
    //设计师及项目数量
     gerNumList() {
       this.api.homePageNum({}).then(res => {
        this.designerNumList = res.data;
        console.log(this.designerNumList[0].value)
      });
    },

     //新闻
     gerNews() {
       this.api.homePageNews({}).then(res => {
        this.newsList = res.indexNews;
      });
    },
     //推荐项目
     gerPoint() {
       this.api.homePagePoint({}).then(res => {
        this.pointList = res.indexViewPoints;
      });
    },
    // 成功案例-Data
    getSuccessCase() {
      let _this = this;
      this.api.homePagePic({ type: "1" }).then(res => {
        this.successCaseList = res.data;
      });
    },
    // 合筑视界--手风琴--Data
    getCustomer() {
      this.api.homePagePic({ type: "2" }).then(res => {
        if (res.code) return;
        if (res.data.length > 3) {
          this.customerList = res.data.slice(0, 3);
        } else {
          this.customerList = res.data;
        }
        if (this.$refs.fullpage) {
          this.$refs.fullpage.api.reBuild();
        }
      });
    },
    // 合作过的客户-Data
    getCustomerLogo() {
      this.api.homePagePic({ type: "3" }).then(res => {
        this.customerLogoList = res.data;
        if (this.$refs.fullpage) {
          this.$refs.fullpage.api.reBuild();
        }
        if (this.$refs.fullpage) {
          this.$refs.fullpage.api.reBuild();
        }
      });
    },
    // 滚动事件
    handleScroll(e) {
      var mainOffsetTop = document.getElementById("main").offsetTop || 0;
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // if(scrollTop > 0){
      //   this.headerBarFixed = true;
      //   this.$store.commit('setNavScroll',true);
      //   // document.documentElement.scrollTop = mainOffsetTop;
      // }else{
      //   this.headerBarFixed = false;
      //   this.$store.commit('setNavScroll',false);
      //   // document.documentElement.scrollTop = 0;
      // },
      e = e || window.event;
      // e.wheelDelta为负数时向下滑动
      if (e.wheelDelta < 0) {
        // console.log("向下")
        if (scrollTop > 0 && scrollTop < mainOffsetTop) {
          console.log("向下", scrollTop, mainOffsetTop);
          this.headerBarFixed = true;
          this.$store.commit("setNavScroll", true);
          document.documentElement.scrollTop = mainOffsetTop;
        }
        // 否则就是向上划
      } else {
        // console.log("向上")
        if (scrollTop > 0 && scrollTop < mainOffsetTop) {
          console.log("向上", scrollTop, mainOffsetTop);
          window.parent.scrollTo(0, 0);
          this.headerBarFixed = false;
          this.$store.commit("setNavScroll", false);
        }
      }
    },
    getDesignerFront() {
      this.api.designerFront().then(res => {
        console.log(res.indexHezhuView)
        if (res.code === 0) {
          if(res.indexHezhuView.length >=2){
            this.designerInterviewList.bigImgList = res.indexHezhuView[0];
            this.designerInterviewList2.bigImgList = res.indexHezhuView[1];
          //   let viewListLength = res.indexHezhuView.length-2;
          //   if(viewListLength>0){
          //     let samllListlength = viewListLength/2+2;
          //     if ( viewListLength%2 == 0 ){
          //       this.designerInterviewList.smallImgList = res.indexHezhuView.slice(2,samllListlength);
          //       this.designerInterviewList2.smallImgList = res.indexHezhuView.slice(samllListlength,res.indexHezhuView.length);
          //     } else {
          //       this.designerInterviewList.smallImgList = res.indexHezhuView.slice(2,samllListlength+1);
          //       this.designerInterviewList2.smallImgList = res.indexHezhuView.slice(samllListlength+1,res.indexHezhuView.length);
          //     }
          //     // console.log( this.designerInterviewList.smallImgList,this.designerInterviewList2.smallImgList)
          //   }
          }
        }
      });
    },
    getDesignerFrontL() {
      this.api.designerFrontL().then(res => {
        if (res.code === 0) {
          let samllListlength = res.indexHezhuView.length/2;
          this.designerInterviewList.smallImgList = res.indexHezhuView.slice(0,samllListlength);
          this.designerInterviewList2.smallImgList = res.indexHezhuView.slice(samllListlength,res.indexHezhuView.length);
        }
      })
    },
  },
  beforeMount() {
    this.getSuccessCase(); // 成功案例
  },
  mounted() {
    console.log('homepage ---- 是否在微信中', this.inWeixin);
    // window.parent.scrollTo(0, 0)
    this.$store.commit("setNavScroll", false);
    this.getBanner(); // banner轮播图
    this.getCustomer(); // 视界
    this.gerDesigner(); //合筑设计师
    this.gerContest(); //竞赛消息
    this.gerNews(); //新闻消息
    this.gerPoint();//推荐项目
    this.gerNumList();//设计师及项目数量
    this.gerQuestion();//常见问题
    this.getCustomerLogo(); // 合作客户logo //在元素加载完毕的时候添加鼠标滑动事件
    this.getDesignerFront();
    this.getDesignerFrontL();
    //console.log(window.innerHeight)
    // window.addEventListener('scroll', this.handleScroll, true)
    // if (document.addEventListener) {
    //   document.addEventListener("DOMMouseScroll", this.handleScroll, false);
    // } //兼容firefox的滚轮事件
    // window.onmousewheel = document.onmousewheel = this.handleScroll;
  },
  updated() {
    let el = document.getElementsByClassName('new-saml-title');
    if(el.length == 6){
      for(let j=0; j<el.length; j++){
        let n = el[j].offsetheight;
        while(el[j].offsetHeight < el[j].scrollHeight){
          let s = el[j].children[0].innerText;
          el[j].children[0].innerText = s.substr(0,s.length-7);
          el[j].children[0].innerText += '...';
        }
      }
    };
    let pEl = document.getElementsByClassName('detailInfo')
    if(pEl.length == 2){
      for(let j=0; j<pEl.length; j++){
        let n = pEl[j].offsetheight;
        console.log(pEl[j].offsetHeight+'---------'+pEl[j].scrollHeight)
        while(pEl[j].offsetHeight < pEl[j].scrollHeight){
          let s = pEl[j].innerText;
          pEl[j].innerText = s.substr(0,s.length-4);
          pEl[j].innerText += '...';
        }
      }
    };
  },
  destroyed() {
    // var canvas = document.getElementById("animation");
    // canvas.style.display = "none";
    // document.body.style.background = "transparent"
    // window.removeEventListener("scroll", this.handleScroll); //销毁页面滚动事件
  }
};
</script>

<style scoped lang="less">
.home-page{
  .designer-row{
    .img-fluid{
      cursor: pointer;
    }
  }
  .news-msg,
  .project-msg{
    .msg-row{
      height:5.25rem;
      margin-bottom: 0.75rem;
      overflow: hidden;
    }
    .img-fluid{
      min-width: 160%;
      margin-left: -30%;
      // height:4rem;
    }
  }
  @media (max-width: 750px){
    .work-msg{
      .img-fluid{
        min-width: 120%;
        margin-left: -10%;
      }
    }
    .streak-photo{
      .streak-line{
        .col-md-3 {
          flex: 0 0 50%;
          max-width: 50%;
        }
      }
    }
    .news-msg,
    .project-msg{
      .img-fluid{
        min-width: 160%;
        margin-left: -30%;
        height: auto;
      }
    }
  }
}
.imgHeight{
  height:11.64rem;
  overflow: hidden;
}
.home-page{
  color: rgb(33, 37, 41);
  h1,strong,p,h6,a,em,h2{
   font-family: Roboto,sans-serif !important;
  }
}
.home-page .question a h5{
  color:#000;
}
.rgba-white-slight, .rgba-white-slight:after {
    background-color: rgba(255,255,255,.1);
}
a.fix[data-v-673fa2c2]:not([href]):not([tabindex]) {
    color: #333!important;
}
body {
  overflow: visible;
}
.detailInfo{
  height: 5rem;
  // display: -webkit-box;
  // -webkit-box-orient: vertical;
  // -webkit-line-clamp: 3;
  overflow: hidden;
  // text-overflow: ellipsis;
  line-height: 1.66rem;
}
.lined{
  height: 1px;
  background: rgba(0,0,0,.1);
  margin: 1rem 0;
  width: 95%;
  margin-left: 15px;
}
.icon-area .circle-icon {
    display: block;
    display: inline-block;
    font-size: 35px;
    padding-bottom: 30px;
}
.icon-area strong {
    color: #343434;
    margin-bottom: 15px;
    padding-bottom: 15px;
    position: relative;
    font-family: 'Source Sans Pro',sans-serif;
    font-weight: 700;
}
.icon-area strong::after {
    background: #343434;
    bottom: 0;
    content: "";
    height: 2px;
    left: 50%;
    margin-left: -35px;
    position: absolute;
    width: 70px;
}
.icon-area p {
    font-size: 15px;
    padding-top: 20px;
    color: #6a6a6a;
}
@media (max-width: 740px){
.w-responsive {
    width: 100%;
}
}

.architect .icon-area .circle-icon i {
    background: rgba(107,109,114,.84);
}
.icon-area .circle-icon i {
    background-color: #fff !important;
    box-shadow: 0 8px 19px #4285F4;
}
.blue-text {
    color: #2196f3!important;
}
.icon-area .circle-icon i {
    background: rgba(236,42,69,.4);
    color: #fff;
    border: 2px solid #fff;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-transition: all .5s ease-in-out;
    -o-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;
    -webkit-box-shadow: 0 1px 10px rgba(0,0,0,.46);
    box-shadow: 0 1px 10px rgba(0,0,0,.46);
}

@media only screen and (max-width: 720px) {
  .el-col-4 {
    /*min-width: 140px;*/
    width: 50%;
  }
  .el-col-6 {
    /*min-width: 360px;*/
    width: 50%;
  }

  .cooperation {
    .el-col-6 {
      width: 100% !important;
    }
  }
  .el-col-8,
  .el-col-16 {
    /*min-width: 360px;*/
    width: 100%;
  }
  .architecture {
    display: none;
  }
  .mobile-customer {
    display: block !important;
  }

  .success-case {
    min-height: 2000px;
  }

  .inner {
    width: 90% !important;
    .common-title {
      font-size: 0.21rem !important;
    }
  }

  .designer-text {
    li {
      padding: 0.2rem 0 !important;
    }
    .el-col-14 {
      width: 80%;
    }
  }

  .release-project .number {
    font-size: 0.35rem !important;
  }

  .release-project-bg img {
    width: 200% !important;
  }
}

@media only screen and (min-width: 721px) and (max-width: 1080px) {
  .el-col-4 {
    /*min-width: 256px;*/
    width: 33%;
  }
  .el-col-6 {
    /*min-width: 360px;*/
    width: 50%;
  }
  .el-col-8,
  .el-col-16 {
    /*min-width: 460px;*/
    width: 50%;
  }
  .architecture {
    display: none;
  }
  .mobile-customer {
    display: block !important;
  }

  .success-case {
    min-height: 2000px;
  }
}

.home-page {
  // background: #f6f6f6;
  height: 100%;
  #fullpage {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .contentInfo p img{
  width: 100%!important;
}
.question .row a.fix{
  color: #333!important;
}

  .new-saml-title{
    color: #333 !important;
    // text-overflow:ellipsis;
    overflow: hidden;
    // display: -webkit-box;
    // -webkit-line-clamp: 2;
    // -webkit-box-orient: vertical;
    height: 48px;
    line-height: 24px;
  }
  .testimonial {
    margin-right: 23%;
    margin-left: 23%;
  }

  h1 {
    font-size: 2.5rem;
    font-family: inherit;
    line-height: 1.2;
  }
  p {
    margin-bottom: 1rem;
  }
  .icon-area .circle-icon i {
    background-color: #fff;
    box-shadow: 0 8px 19px #4285f4;
  }
  .ads {
    position: absolute;
    left: 1rem;
    top: 50%;
    -webkit-transform: translateY(-50%);
    h3 {
      font-size: 0.3rem;
      color: #fff;
    }
    div {
      font-size: 0.14rem;
      color: rgba(255, 255, 255, 0.6);
      padding-top: 0.28rem;
    }
  }

  .el-main {
    padding: 0;
    width: 100%;
  }
  // 模块相同样式
  .common-module {
    img {
      width: 100%;
    }
    .inner {
      width: percentage(1440/1920);
      margin: 0 auto;
      .common-title {
        color: #000;
        visibility: visible;
        padding: 0.5rem 0 0.4rem;
        text-align: center;
        font-size: 0.42rem;
      }
      .common-title2 {
        visibility: visible;
        padding: 0.5rem 0 0.4rem;
        text-align: center;
        font-size: 0.3rem;
      }
      .grid-content {
        text-align: center;
        /*margin-bottom: 1rem;*/
        .item-pic {
          width: 0.6rem;
          padding: 0.3rem 0;
          margin: 0 auto;
          img {
            width: 100%;
            transition: all 0.5s;
            -webkit-transition: all 0.5s; /* Safari */
          }
        }
        .item-title {
          color: #666;
          font-size: 0.16rem;
        }
        .item-content {
          color: #d0d0d0;
          font-size: 0.14rem;
          padding: 0.14rem 0.25rem;
          word-break: break-all;
        }
      }
      .more-case {
        text-align: center;
        font-size: 0.2rem;
        padding: 0.6rem 0;
        cursor: pointer;
        color: #999;
      }
    }
  }
  // 交易与服务
  .service {
    .inner {
      margin-top: 0.6rem;
      .grid-content {
        .item-content {
          visibility: hidden;
        }
      }
      .grid-content:hover {
        background: #fff;
      }
      .grid-content:hover .item-title {
        color: #333;
      }
      .grid-content:hover .item-pic img {
        transform: scale(1.1);
        -ms-transform: scale(1.1); /* IE 9 */
        -moz-transform: scale(1.1); /* Firefox */
        -webkit-transform: scale(1.1); /* Safari 和 Chrome */
        -o-transform: scale(1.1);
      }
      .grid-content:hover .item-content {
        visibility: visible;
      }
    }
  }
  // 设计之旅
  .cooperation {
    position: relative;
    background: #fff;
    padding-bottom: 1rem;
    .inner {
      .grid-content {
        margin-bottom: 0;
        .item {
          width: 100%;
          margin: 0;
          position: relative;
          overflow: hidden;
          img {
            width: 100%;
            float: left;
          }
          .mask {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.4);
          }
          .item-content {
            position: absolute;
            top: 0rem;
            left: 0;
            text-align: left;
            color: #fff;

            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding-top: 0;
            padding-bottom: 0;
            .item-number {
              font-size: 0.16rem;
              padding-bottom: 0.12rem;
            }
            .item-title {
              font-size: 0.2rem;
              color: #fff;
              padding-bottom: 0.08rem;
            }
            .item-detail {
              margin-top: -1rem;
              font-size: 0.14rem;
              opacity: 0.8;
              filter: alpha(opacity=80);
            }
          }
          .item-content.active {
            top: 0.05rem;
          }
          .item-btn {
            cursor: pointer;
            width: 100%;
            height: 0.56rem;
            line-height: 0.56rem;
            color: #fff;
            font-size: 0.14rem;
            position: absolute;
            bottom: 0;
            left: 0;
            background: linear-gradient(to right, #fe7e59, #f5594c);
          }
        }
      }
    }
  }
  // 成功案例
  .success-case {
    #left {
      .item-pic {
        min-height: 4.6rem;
        cursor: pointer;
      }
    }
    .success-case-part1 {
      .item-pic {
        cursor: pointer;
      }
    }

    .item-line {
      width: 100%;
      height: 1px;
      overflow: hidden;
      background: #e0e0e0;
      margin-bottom: 0.3rem;
      .item-line-inner {
        width: 0%;
        height: 100%;
        background: #f36;
      }
    }

    .success-case-part2 .item-line {
      margin: 0 10px 0.3rem;
    }

    .inner {
      .grid-content {
        margin-bottom: 0;
        text-align: left;

        .item-pic {
          /*border-top: 1px solid #e0e0e0;*/
          width: 100%;
          margin: 0;
          height: 2.3rem;
          overflow: hidden;
          position: relative;
          padding: 0;
          .mask {
            position: absolute;
            left: 0;
            top: 0rem;
            width: 100%;
            height: 100%;
            background: #000;
            opacity: 0.5;
          }
        }

        .item-title {
          padding: 0.15rem 0;
          font-size: 0.26rem;
        }
        .item-content {
          padding: 0 0.3rem 0.15rem 0;
          color: #999;
          font-size: 0.14rem;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 0.26rem;
          margin-bottom: 0.05rem;
        }
      }
      .more {
        display: inline-block;
        margin: 0.1rem 0 0.3rem;
        cursor: pointer;
        width: 0.8rem;
        height: 0.2rem;
      }

      .more2 {
        background: url("../../assets/images/viewmore-grey.png") left top
          no-repeat;
        background-size: 95%;
      }
      .more1 {
        background: url("../../assets/images/viewmore-black.png") left top
          no-repeat;
        background-size: 95%;
      }
    }
    .success-case-part2 {
      .success-case-part2-bottom {
        cursor: pointer;
        overflow: hidden;
        display: inline-block;
        position: relative;
        height: 2.3rem;
        .mask {
          position: absolute;
          left: 0;
          top: 0rem;
          width: 100%;
          height: 100%;
          background: #000;
          opacity: 0.4;
        }
      }
      .success-case-part2-title {
        color: #666;
        font-size: 0.26rem;
        /*padding-top: 1.5rem;*/
      }
      .success-case-part2-detail {
        color: #999;
        font-size: 0.14rem;
        margin: 0.2rem 0;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        height: 0.26rem;
        padding-bottom: 0.15rem;
      }
      .more {
        margin-bottom: 0;
      }
    }
    .line {
      border-top: 1px solid #f5594c !important;
    }
    .item-title-active {
      color: #333 !important;
    }
  }
  // 合筑视界
  .customer {
    /*padding-bottom: 1rem;*/
    .inner {
      .customer-detail {
        background: #000;
        padding: 0 0.6rem;

        height: 5.6rem;
        .line {
          color: #fff;
          padding: 1.49rem 0 0.5rem;
          font-weight: bold;
        }
        .title {
          font-size: 0.24rem;
          color: #fff;
        }
        .content {
          font-size: 0.14rem;
          height: 0.3rem;
          color: rgba(255, 255, 255, 0.6);
          padding-bottom: 0.3rem;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }
        .view-more {
          display: inline-block;
          cursor: pointer;
          width: 0.8rem;
          height: 0.2rem;
          background: url("../../assets/images/viewmore-white.png") left top
            no-repeat;
          background-size: 95%;
        }
      }
      .vue-accordion {
        width: 100%;
        background: #fff;
        overflow: hidden;
        height: 5.6rem;
        /*max-width: 9rem;*/
        ul {
          width: 100%;
          height: 100%;
          display: table;
          table-layout: fixed;
          margin: 0;
          padding: 0;
        }
        ul li {
          display: table-cell;
          vertical-align: bottom;
          position: relative;
          width: 15%;
          background-repeat: no-repeat;
          background-position: center center;
          transition: all 500ms ease;
          height: 100%;
          background-size: cover;
        }

        ul li a {
          display: block;
          width: 100%;
          position: relative;
          z-index: 3;
          vertical-align: bottom;
          padding: 0.15rem 0.2rem;
          box-sizing: border-box;
          color: #fff;
          text-decoration: none;
          transition: all 200ms ease;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
        }

        ul li a * {
          opacity: 0;
          margin: 0;
          width: 100%;
          text-overflow: ellipsis;
          position: relative;
          z-index: 5;
          white-space: nowrap;
          overflow: hidden;
          -webkit-transform: translateX(-20px);
          transform: translateX(-20px);
          -webkit-transition: all 400ms ease;
          transition: all 400ms ease;
        }

        ul li a h2 {
          text-overflow: clip;
          font-size: 0.24rem;
          text-transform: uppercase;
          margin-bottom: 0.02rem;
          position: absolute;
          left: 0.2rem;
          bottom: 0.35rem;
        }

        ul li a p {
          font-size: 0.13rem;
          position: absolute;
          left: 0.2rem;
          bottom: 0.2rem;
          width: 80%;
        }
        .active-li {
          width: 60%;
        }
        .active-a {
          background: rgba(0, 0, 0, 0);
          * {
            opacity: 1;
            -webkit-transform: translateX(0);
            transform: translateX(0);
          }
        }
      }

      /*.vue-accordion ul:hover li:hover a {*/
      /*background: rgba(0, 0, 0, 0);*/
      /*}*/

      /*.vue-accordion ul:hover li:hover a * {*/
      /*opacity: 1;*/
      /*-webkit-transform: translateX(0);*/
      /*transform: translateX(0);*/
      /*}*/
    }
  }
  // 合筑建筑师
  .designer-interview {
    background: #fff;
    .inner {
      .el-row {
        .el-col {
          background: transparent;
          cursor: pointer;
          .grid-content {
            cursor: pointer;
            position: relative;
            padding-bottom: 0;
            overflow: hidden;
            .item-pic {
              width: 100%;
              padding: 0;
              img {
                float: left;
              }
            }
            .item-content {
              width: 100%;
              height: 100%;
              padding: 0;
              .mask {
                width: 100%;
                height: 100%;
                // background:transparent;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
                background: #000;
              }

              .item-detail {
                position: absolute;
                top: 50%;
                left: 50%;
                -webkit-transform: translate(-50%, -50%);
                opacity: 0;
                .p1 {
                  padding-bottom: 0.12rem;
                }
                .p2 {
                  padding-bottom: 0.12rem;
                }
                .p3 {
                }
              }
            }
          }
          .grid-content:hover {
            .item-detail {
              opacity: 1;
              transition: opacity 2s ease;
            }
            .mask {
              opacity: 0.4;
              transition: opacity 2s ease;
              // background:rgba(0,0,0,.4);
              // transition:background-color 2s ease;
            }
          }
        }
      }

      .designer-text {
        display: flex;
        align-items: center;
        ul {
          width: 100%;
          li {
            overflow: hidden;
            margin: 0 0.3rem;
            padding: 0.4rem 0;
            h3 {
              font-size: 0.18rem;
            }
            p {
              font-size: 0.12rem;
            }
          }
          li:hover {
            color: #f45e54;
            border-bottom: 1px solid #f45e54;
          }
          li.active {
            color: #f45e54;
            border-bottom: 1px solid #f45e54;
          }
        }
      }
    }
  }
  // 平台服务
  .release-project {
    .release-project-bg {
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
      }
      .inner {
        position: absolute;
        left: 0%;
        top: 0%;

        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        text-align: center;
        color: #fff;
        .number {
          font-size: 0.7rem;
          font-family: "HoeflerText-Regular";
        }
        .title {
          padding-bottom: 0.18rem;
        }
        .detail {
          padding-bottom: 0.38rem;
          font-family: "HoeflerText-Regular";
        }
        .release-project-btn {
          color: #fff;
          font-size: 0.16rem;
          border: none;
          background: linear-gradient(
            to right,
            #fe7e59,
            #fc7857,
            #fc7756,
            #fc7656,
            #fb7355,
            #fb7255,
            #f5594c
          );
        }
      }
    }
  }
  // 客户logo
  .customer-logo {
    background: #fff;
    .customer-logo-pic {
      padding: 0.6rem 0.2rem;
    }
  }
  //合筑视界手机端
  .mobile-customer {
    display: none;
    .mobile-customer-title {
      height: 0.8rem;
      color: #fff;
      overflow: hidden;
      position: relative;
      transition-property: all;
      transition-duration: 0.5s;
      transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }
    .heightAuto {
      height: auto;
      transition-property: all;
      transition-duration: 0.5s;
      transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }
    .shadow {
      width: 100%;
      background: #000;
      opacity: 0.6;
      height: 0.8rem;
      position: absolute;
      left: 0;
      top: 0;
      p {
        text-align: center;
      }
    }
    .cus-img-wrap {
      position: absolute;
      left: 0;
      bottom: 5%;
    }
    .title2 {
      /*height:4rem;*/
    }
    .show-all {
      background: #000;
      width: percentage(680/720);
      margin: 0 auto;
      /*display: none;*/
      .title {
        font-size: 0.18rem;
        font-weight: bold;
      }
      .show-all-wrap {
        padding: 0.3rem 0.25rem;
      }
      .content {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 0.14rem;
        opacity: 0.6;
        margin: 0.11rem 0 0.2rem;
      }
      .view-more {
        font-size: 0.12rem;
        border-bottom: 1px solid #fff;
        display: inline-block;
      }
    }
  }
}

@-webkit-keyframes fadeInHalf {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.5;
  }
}

@keyframes fadeInHalf {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.5;
  }
}

.fadeInHalf {
  -webkit-animation-name: fadeInHalf;
  animation-name: fadeInHalf;
}

@-webkit-keyframes fadeOutHalf {
  0% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}

@keyframes fadeOutHalf {
  0% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}

.fadeOutHalf {
  -webkit-animation-name: fadeOutHalf;
  animation-name: fadeOutHalf;
}

.animate11 {
  width: 100% !important;
  animation: loader1 1s ease;
}

.animate22 {
  width: 0%;
  animation: loader2 1s ease;
}

.animate33 {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  animation: loader3 1s ease;
}

.animate44 {
  -webkit-transform: scale(1);
  transform: scale(1);
  animation: loader4 1s ease;
}

@keyframes loader1 {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

@keyframes loader2 {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}

@keyframes loader3 {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}

@keyframes loader4 {
  0% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
<style>
a.fix[data-v-ee4ef31a]:not([href]):not([tabindex]):hover{
  color: #4f4f4f!important;
}
.home-page .question a.fix[data-v-673fa2c2]:not([href]):not([tabindex]){
  color:#4f4f4f!important;
  font-size:1.25rem;
  line-height: 1.2
}
.home-page .line {
    background: #848484;
    height: 2px;
    width: 70px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    position: absolute;
    line-height: 1.6;}
  .home-page .btn-floating i {
    font-size: .96154rem;
    line-height: 36.15px;
    user-select: none;
}
.btn-floating i {
    font-size: 1.25rem;
    line-height: 47px;
    display: inline-block;
    width: inherit;
    text-align: center;
    color: #fff;
}
.home-page .btn-floating{
    width: 36.15px;
    height: 36.15px;
    user-select: none;
}

.home-page .slidePageImg h4{
  font-size: 1.4rem;
  margin-bottom: 0.5rem
}
.home-page .viewInfo h5,.home-page .viewInfo h6{
  margin-bottom: 0.5rem;
}
.home-page .wrapper{
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index:1;
  text-align: center;
}
@media (min-width: 1200px){
.container {
    max-width: 1140px!important;
}
}

.no-wrap{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.home-page .card .card-header .fix h5{
  color:#333 !important;
  }
  .home-page .card .card-header .fix h5 span{
  color:#333 !important;
    text-overflow:ellipsis;
    overflow: hidden;
    font-weight: 300;
    font-size: 1.25rem;
    width: 90%;
    float: left;
    white-space: nowrap;
  }
.home-page a.fix[data-v-26fc6db5]:not([href]):not([tabindex]){
  color:#333 !important;
}
#app .home-page .z-depth-1 {
    -webkit-box-shadow: 0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)!important;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12)!important;
}
#app .home-page .fontsInfo{
    text-overflow:ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 90%;
    float: left;
}
.home-page .mb-1 a:hover{
    color: #0056b3 !important;
}
.carousel-multi-item .controls-top .btn-floating{
  background: #1976d2!important;
}
.sight-img{
  height: 4.7rem;
}
.des-jian p span{
    background-color: rgba(255, 255 ,255,0) !important;
  }
@media (max-width: 990px){
  .sight-img{
    height: auto !important;
  }
  .shijie-height{
    height: auto !important;
  }
}
</style>

