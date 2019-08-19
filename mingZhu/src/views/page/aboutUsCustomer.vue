<template>
	<div class="aboutUsCustomer" :class="{'isMobile': isMobile}">
    <div class="header" v-if="activeIndex != 6">
      <div class="container-fluid">
        <div class="header_content">
          <div class="logo">
            <a href="javascript:;" :class="{'active': activeIndex == 5}">
              <img src="@/assets/images/logo.png" />
              合筑空间
            </a>
          </div>
        </div>
      </div>
    </div>
    <swiper id="swiperBox" class="swiper-container" v-bind:options="swiperOption" ref="mySwiper">
      <!-- 第一页 -->
      <swiper-slide class="swiper-slide">
        <div class="page page1" :class="{'bg0': bgActive == 0}">
          <div class="container-center">
            <div class="title_who title_who0">
              <div class="mask-wrap">
                <div class="who_text text_bold">我们是谁</div>
              </div>
            </div>
            <div class="title_who title_who1">
              <div class='loop-wrap'>
                <div class="mask-wrap">
                  <h2 class="who_text1 text_bold">合筑空间是一个拥有丰富资源的精品建筑设计服务平台</h2>
                </div>
              </div>
            </div>
            <div class="title_who title_who2">
              <div class='loop-wrap'>
                <div class="mask-wrap">
                  <p class="who_text2">我们致力于客户与建筑师的完美对接，让您以最低的价格获得最满意的原创精品</p>
                </div>
              </div>
            </div>
            <div class="title_who contact_us">
              <div class='loop-wrap'>
                <div class="mask-wrap mask_btn" >
                  <a href="#/contactUs" class="contactBtn">
                    <span>联系我们</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="mouse-wheel-wrap">
            <a href="#" class="mouse-wheel js-mouse-wheel">
              <span class="mouse-wheel_inner"></span>
            </a>
            <span class="ti-angle-double-dow mouse-wheel_down">
              <mdb-icon icon="angle-double-down" />
            </span>
          </div>
        </div>
      </swiper-slide>
      <!-- 第二页 -->
      <swiper-slide class="swiper-slide">
        <div class="page page2" :class="{'bg1': bgActive == 1}">
          <div class="tp-mask-wrap animated" 
            :class="activeIndex == 1 ? 'fadeIn' : 'fadeOut'">
            <div class="tp-loop-wrap">
              <div class="zerotrenta-title animated" 
                :class="activeIndex == 1 ? 'fadeInUp' : 'fadeOutDown'">01<span>.</span></div>
              <div class="tp-caption animated text_bold" 
                :class="activeIndex == 1 ? 'fadeInUp delay05' : 'fadeOutDown'">远低于市场的价格</div>
              <div class="tp-parallax-wrap animated" 
                :class="activeIndex == 1 ? 'bounceInRight delay1' : 'bounceOutRight'">
                <div class="tp-loop-wrap">平台不抽取任何中间费用，所有设计费全部支付给建筑师。建筑师获得的更多，您支出的更少。</div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <!-- 第三页 -->
      <swiper-slide class="swiper-slide">
        <div class="page page3" :class="{'bg2': bgActive == 2}">
          <div class="tp-mask-wrap animated"
            :class="activeIndex == 2 ? 'fadeIn' : 'fadeOut'">
            <div class="tp-loop-wrap" >
              <div class="zerotrenta-title animated"
                :class="activeIndex == 2 ? 'fadeInUp' : 'fadeOutDown'">02<span>.</span></div>
              <div class="tp-caption animated text_bold"
                :class="activeIndex == 2 ? 'fadeInUp delay05' : 'fadeOutDown'">获得最优质的作品</div>
              <div class="tp-parallax-wrap animated"
                :class="activeIndex == 2 ? 'bounceInLeft delay1' : 'bounceOutLeft'">
                <h3>海量优质建筑师</h3>
                <div class="tp-loop-wrap">平台拥有海量国内外风格各异的一流建筑师，任君挑选</div>
                <div class="tp-loop-wrap">大数据技术智能匹配，为每一位客户精准对接设计资源</div>
              </div>
              <div class="tp-parallax-wrap tp-parallax-wrap1 animated"
                :class="activeIndex == 2 ? 'bounceInLeft delay1' : 'bounceOutLeft'">
                <h3>实名认证</h3>
                <div class="tp-loop-wrap">每一位建筑师都经过实名认证</div>
                <div class="tp-loop-wrap">严格审查，保证每一位建筑师的真实可靠</div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <!-- 第四页 -->
      <swiper-slide class="swiper-slide">
        <div class="page page4" :class="{'bg3': bgActive == 3}">
          <div class="tp-mask-wrap animated"
            :class="activeIndex == 3 ? 'fadeIn' : 'fadeOut'">
            <div class="tp-loop-wrap" >
              <div class="zerotrenta-title animated"
                :class="activeIndex == 3 ? 'fadeInUp' : 'fadeOutDown'">03<span>.</span></div>
              <div class="tp-caption animated text_bold"
                :class="activeIndex == 3 ? 'fadeInUp delay05' : 'fadeOutDown'">透明规范的流程</div>
              <div class="tp-parallax-wrap animated"
                :class="activeIndex == 3 ? 'bounceInRight delay1' : 'bounceOutRight'">
                <div class="tp-loop-wrap">所有建筑师同时拿到需求任务书，设计过程全程独立，设计完成立刻开标，杜绝潜规则。</div>
                <div class="tp-loop-wrap">权威专家直播评审，保证中标作品实至名归。</div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <!-- 第五页 -->
      <swiper-slide class="swiper-slide">
        <div class="page page5" :class="{'bg4': bgActive == 4}">
          <div class="tp-mask-wrap animated"
            :class="activeIndex == 4 ? 'fadeIn' : 'fadeOut'">
            <div class="tp-loop-wrap" >
              <div class="zerotrenta-title animated"
                :class="activeIndex == 4 ? 'fadeInUp' : 'fadeOutDown'">04<span>.</span></div>
              <div class="tp-caption animated text_bold"
                :class="activeIndex == 4 ? 'fadeInUp delay05' : 'fadeOutDown'">多样化的贴心服务</div>
              <div class="tp-parallax-wrap animated"
                :class="activeIndex == 4 ? 'bounceInLeft delay1' : 'bounceOutLeft'">
                <div class="tp-loop-wrap">四种招标方式可供选择</div>
                <div class="tp-loop-wrap">多种增值服务满足您任何需求</div>
                <div class="tp-loop-wrap">专属项目经理，为您全程保驾护航</div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <!-- 第六页 -->
      <swiper-slide class="swiper-slide">
        <div class="page page6" :class="{'bg5': bgActive == 5}">
          <div class="page-box">
            <!-- <header class="section-header">
              <h2 class="section-title">关于 <span class="text-color">合筑空间</span></h2>
            </header> -->
            <div class="section-content">
              <div class="row-base">
                <div class="col-base">
                  <h3 class="col-about-title">我们把想法转化为艺术</h3>
                  <div class="col-about-info">每个项目我们都全力以赴。我们与客户建立良好关系，力求提供完美服务。我们希望能够建立长期稳定的多领域合作。在合作过程中，我们相互学习，并共同创造社会文化价值，建筑艺术价值与经济价值。</div>
                </div>
                <div class="col-base col-about-spec">
                  <header class="section-header">
                    <h2 class="section-title">关于 <span class="text-color">合筑空间</span></h2>
                  </header>
                  <h3 class="col-about-title">我们提供<span class="text-color">:</span></h3>
                  <div class="service-item">
                    <!-- <img src="@/assets/images/icon-architecture.png" /> -->
                    <h4>详细方案设计</h4>
                  </div>
                  <div class="service-item">
                    <!-- <img src="@/assets/images/icon-interiors.png" /> -->
                    <h4>概念方案设计</h4>
                  </div>
                  <div class="service-item">
                    <!-- <img src="@/assets/images/icon-planing.png" /> -->
                    <!-- <h4>各类增值服务（代写需求任务书等）</h4> -->
                    <h4>各类增值服务</h4>
                  </div>
                </div>
                <div class="col-base col-about-img">
                  <img src="@/assets/images/380x370.jpg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <!-- 第七页 -->
      <swiper-slide class="swiper-slide">
        <div class="page page7" :class="{'bg6': bgActive == 6}">
          <div class="header">
            <div class="container-fluid">
              <div class="head-title">合筑作品欣赏</div>
            </div>
          </div>
          <div class="main-contain">
            <section id="fs-container"
              :class="{
                'active1' : imgIndex == 0,
                'active2' : imgIndex == 1,
                'active3' : imgIndex == 2,
                'active4' : imgIndex == 3,
                'active5' : imgIndex == 4
                }">
              <template v-for="(item,index) in successCaseList">
                <div class="media-project-hover" :key="item.id" @mouseover="mouseImage(index)">
                  <div class="bg-overlay"></div>
                  <div class="media__body">
                    <h5 class="media__sub-title title-sub">Interior</h5>
                    <h3 class="media__title" @click="goCaseDetail(item.id, item.webUrl)">
                      <a href="javascript:;">{{item.title}}</a>
                    </h3>
                    <a class="link" href="javascript:;" @click="goCaseDetail(item.id, item.webUrl)">see project
                      <i class="zmdi zmdi-arrow-right"></i>
                    </a>
                  </div>
                  <span class="media__number">0{{index + 1}}</span>
                </div>
              </template>
            </section>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination"></div>
    </swiper>
    <div class="page-fix" :class="{
      'bg0': bgNextActive == 0,
      'bg1': bgNextActive == 1,
      'bg2': bgNextActive == 2,
      'bg3': bgNextActive == 3,
      'bg4': bgNextActive == 4,
      'bg5': bgNextActive == 5,
      'bg6': bgNextActive == 6,
    }"></div>
	</div>
</template>
<script>
// import { WOW } from 'wowjs';
// new WOW({ mobile: true, live: true }).init();
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
	name:'aboutUsCustomer',
	components: {
    swiper,
    swiperSlide
	},
	data() {
    return {
      // heightH: window.innerHeight,
      // 当前索引
      activeIndex: 0,
      // 当前页面背景的索引
      bgActive: 0,
      // 下一个页面背景的索引
      bgNextActive: 0,
      swiperOption: {
				speed: 800,
        notNextTick: true,//notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        direction: 'vertical',//水平方向移动
        grabCursor: false,//鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
        setWrapperSize: true,//Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
        autoHeight: true,//自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
        slidesPerView: 1,//设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
        mousewheel: true,//开启鼠标滚轮控制Swiper切换。可设置鼠标选项，默认值false
        mousewheelControl: true,//同上
        // height: window.innerHeight, // 高度设置，占满设备高度
        resistanceRatio: 0,//抵抗率。边缘抵抗力的大小比例。值越小抵抗越大越难将slide拖离边缘，0时完全无法拖离。本业务需要
        observeParents: true,//将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新
        effect:'slide',
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        //debugger: true,
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        on:{
          //监听滑动切换事件，返回swiper对象
          slideChange: ()=> {
          },
          slideChangeTransitionStart: () => {
            let swiper = this.swiper;
            if (swiper.activeIndex == 6 && swiper.previousIndex == 5) {
              this.activeIndex = swiper.activeIndex
            }
            this.bgActive = swiper.previousIndex
            this.bgNextActive = swiper.activeIndex
          },
          slideChangeTransitionEnd: () => {
            let swiper = this.swiper;
            this.activeIndex = swiper.activeIndex
            this.bgActive = swiper.activeIndex
            this.bgNextActive = swiper.previousIndex
          }
        }
      },
      // 图片索引
      imgIndex: 0,
      // 合筑作品
      successCaseList: []
    }
  },
  methods: {
    // 成功案例-Data
    getSuccessCase() {
      this.api.homePagePic({ type: "1" }).then(res => {
        let {code , data} = res;
        if (code == 0) {
          this.successCaseList = data.filter((item, index) => index < 5);
        }
      });
    },
    // 跳转到案例详情
    goCaseDetail (id, webUrl) {
      if (webUrl) {
        window.location.href = webUrl;
      } else {
        this.$router.push('/success?id=' + id);
      }
    },
    mouseImage(index) {
      this.imgIndex = index
    }
  },
	computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  created() {
    this.getSuccessCase();
  }
}
</script>
<style lang="less" scoped>
.aboutUsCustomer{
  height: 100%;
  .swiper-container{
    height: 100%;
  }
  .text_bold{
    font-weight: 600;
  }
  .header{
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    padding: 2.125rem /* 34/16 */ 0;
    .container-fluid{
      width: 100%;
      padding-right: 3.25rem /* 52/16 */;
      padding-left: 3.25rem /* 52/16 */;
      margin: 0 auto;
      .header_content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo{
          a{
            display: inline-block;
            vertical-align: top;
            cursor: auto;
            font-size: 1.375rem /* 22/16 */;
            color: #fff;
            &.active{
              color: #333;
            }
            img{
              vertical-align: -20%;
              width: 1.875rem /* 30/16 */;
              max-width: 100%;
            }
          }
        }
      }
    }
  }
  .page-fix{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;
    &.bg0{
      background-image:url('./../../assets/images/aboutUs1_bg.jpg');
    }
    &.bg1{
      background-image:url('./../../assets/images/l-amaro.jpg');
    }
    &.bg2{
      background-image:url('./../../assets/images/il-laboratorio-02.jpg');
    }
    &.bg3{
      background-image:url('./../../assets/images/l-amaro.jpg');
    }
    &.bg4{
      background-image:url('./../../assets/images/il-laboratorio-02.jpg');
    }
    &.bg5{
      background-color: #fff;
    }
    &.bg6{
      background-color: #fff;
    }
  }
	.page{
    position: relative;
    overflow: hidden;
    height: 100%;
    // background-color: #fff;
  }
  .page1{
    // background-repeat: no-repeat;
    // background-image:url('./../../assets/images/aboutUs1_bg.jpg');
    // background-size: cover;
    // background-position: center center;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 20;
    &.bg0{
      background-repeat: no-repeat;
      background-image:url('./../../assets/images/aboutUs1_bg.jpg');
      background-size: cover;
      background-position: center center;
    }
    .container-center{
      position: absolute;
      left: 19.5%;
      right: 22.5%;
      top: 27%;
    }
    .title_who{
      display: block;
      visibility: visible;
      z-index: 1;
      transform-style: preserve-3d;
      .who_text{
        transition: none 0s ease 0s;
        text-align: center;
        line-height: 4rem /* 64/16 */;
        margin-bottom: 5rem /* 80/16 */;
        letter-spacing: 5px;
        white-space: nowrap;
        font-size: 3rem /* 48/16 */;
        color: #ebebeb;
      }
      .who_text1{
        transition: none 0s ease 0s;
        text-align: left;
        line-height: 4rem /* 64/16 */;
        margin-bottom: 3rem /* 48/16 */;
        letter-spacing: 0px;
        font-size: 3rem /* 48/16 */;
        white-space: normal;
        // min-width: 73.75rem /* 1180/16 */;
        max-height: none;
        // max-width: 1020px;
        color: #ebebeb;
      }
      .who_text2{
        transition: none 0s ease 0s;
        text-align: left;
        line-height: 1.0625rem /* 17/16 */;
        margin-bottom: 4.1875rem /* 67/16 */;
        letter-spacing: 0px;
        font-weight: 400;
        font-size: 1.25rem /* 20/16 */;
        white-space: normal;
        min-width: 50rem /* 800/16 */;
        max-height: none;
        max-width: 50rem /* 800/16 */;
        color: #ebebeb;
      }
      .contactBtn{
        display: block;
        transition: none 0s ease 0s;
        text-align: inherit;
        // line-height: 30px;
        border-width: 0px;
        margin: 0px;
        padding: 0px;
        letter-spacing: 0px;
        font-weight: 400;
        // font-size: 13px;
        white-space: nowrap;
        min-height: 0px;
        min-width: 0px;
        max-height: none;
        max-width: none;
        color:#fff;
        span{
          transition: none 0s ease 0s;
          text-align: inherit;
          // line-height: 43px;
          border-width: 1px;
          margin: 0px;
          // padding: 0px 22px;
          letter-spacing: 0px;
          font-weight: 400;
          font-size: .8125rem /* 13/16 */;
        }
      }
    }
    // .title_who1{
    //   top: 25rem /* 400/16 */;
    // }
    // .title_who2{
    //   top: 31.8125rem /* 509/16 */;
    // }
    .contact_us{
      // top: 39.4375rem /* 631/16 */;
      .loop-wrap{
        display: inline-block;
        vertical-align: top;
      }
      .mask_btn{
        padding: .4375rem /* 7/16 */ 1.75rem /* 28/16 */;
        // width: 6.875rem /* 110/16 */;
        // height: 2.5rem /* 40/16 */;
        // line-height: 2.5rem /* 40/16 */;
        text-align: center;
        border:1px solid #fff;
        cursor:pointer;
      }    
      .mask_btn:hover{
        background-color:#bebebe;
        border-color:#bebebe;
      }
      .mask_btn:hover a{
        color:#000;
      }
    }
    .mouse-wheel-wrap{
      position:absolute;
      bottom:2.5rem /* 40/16 */;
      left:50%;
      transform: translateX(-50%);
      z-index: 999;
      .mouse-wheel{
        display: block;
        width: 17px;
        height: 25px;
        border: 1px solid #fff;
        border-radius: 8px;
        margin: 0 auto 8px;
        position: relative;
        .mouse-wheel_inner{
          display: inline-block;
          height: 8px;
          width: 5px;
          border: 1px solid #fff;
          border-radius: 15px;
          position: absolute;
          left: 50%;
          margin-left: -2.5px;
          top: 4px;
          transition: all .3s ease;
          animation: mouse_scroll 1.5s ease-out infinite forwards;
        }
      }
      .mouse-wheel_down{
        color: #fff;
        transition: all .3s ease;
        .fa-angle-double-down{
          width: 20px;
          // height: 30px;
          text-align: center;
          font-size: 20px;
        }
      }
    }
    @keyframes mouse_scroll {
      0%,100% {
        -webkit-transform: translateY(0);
        -moz-transform: translateY(0);
        -o-transform: translateY(0);
        transform: translateY(0);
      }

      50% {
        -webkit-transform: translateY(5px);
        -moz-transform: translateY(5px);
        -o-transform: translateY(5px);
        transform: translateY(5px);
      }
    }
  }
  .page2,.page3,.page4,.page5{
    .tp-mask-wrap{
      position: absolute;
			top: 0;
			bottom: 0;
			padding-top: 8.4375rem /* 135/16 */;
      padding-left: 6.25rem /* 100/16 */;
			overflow: hidden;
			background-color: rgba(0, 0, 0, 0.5);
			letter-spacing: 0;
			font-weight: 300;
			font-size: .6875rem /* 11/16 */;
			min-width: 32.75rem /* 524/16 */;
      width: 34%;
      h3{
        margin-bottom: 1.375rem /* 22/16 */;
        font-size: 1.625rem /* 26/16 */;
        color: #ebebeb;
      }
      .tp-loop-wrap{
        text-align: left;
        .zerotrenta-title{
          font-weight: bold;
          font-size: 4.375rem /* 70/16 */;
          line-height: 3.75rem /* 60/16 */;
          white-space: nowrap;
          letter-spacing: 0;
          color: #ebebeb;
        }
        .tp-caption{
          margin-top: 2rem /* 32/16 */;
          padding-right: 3.125rem /* 50/16 */;
          letter-spacing: 2px;
          line-height: 3.75rem /* 60/16 */;
          font-size: 3.75rem /* 60/16 */;
          color: #ebebeb;
        }
        .tp-parallax-wrap{
          // margin-top: 3.125rem /* 50/16 */;
          margin-top: 6.25rem /* 100/16 */;
          padding-right: 7.5rem /* 120/16 */;
          &.tp-parallax-wrap1{
            margin-top: 4.875rem /* 78/16 */;
          }
          .tp-loop-wrap{
            letter-spacing: 1px;
            font-size: 1.25rem /* 20/16 */;
            color: #ebebeb;
          }
        }
      }
    }
  }
	.page2,.page4{
		// background-repeat: no-repeat;
    // background-image: url(./../../assets/images/l-amaro.jpg);
    // background-size: cover;
    // background-position: center center;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 20;
    .tp-mask-wrap{
			right: 0;
    }
    &.bg1,&.bg3{
      background-repeat: no-repeat;
      background-image: url(./../../assets/images/l-amaro.jpg);
      background-size: cover;
      background-position: center center;
    }
	}
	.page3,.page5{
		// background-repeat: no-repeat;
    // background-image: url(./../../assets/images/il-laboratorio-02.jpg);
    // background-size: cover;
    // background-position: center center;
    width: 100%;
    height: 100%;
    opacity: 1;
		z-index: 20;
		.tp-mask-wrap{
			left: 0;
    }
    &.bg2,&.bg4{
      background-repeat: no-repeat;
      background-image: url(./../../assets/images/il-laboratorio-02.jpg);
      background-size: cover;
      background-position: center center;
    }
  }
	.page6{
    background-color: #fff;
    &.bg5{
      background-color: #fff;
    }
		.page-box{
      // max-width: 970px;
      height: 100%;
      // max-width: 1140px;
      max-width: 1106px;
      margin: 0 auto;
			.section-header{
        position: absolute;
        top: 7.5rem /* 120/16 */;
        left: 0;
        width: 100%;
        // margin-top: 7.5rem /* 120/16 */;
        // margin-bottom: 7.875rem /* 126/16 */;
				.section-title{
          // width: 33.33%;
          margin: 0 auto;
					text-align: center;
					font-size: 3rem /* 48/16 */;
					// letter-spacing: 0.32em;
					font-weight: bold;
					color: #333;
					.text-color{
						color: #4285f4;
					}
				}
			}
			.section-content{
        height: 100%;
        // margin-top: 7.875rem /* 126/16 */;
        // padding-top: 7.875rem /* 126/16 */;
				.row-base{
          height: 100%;
					font-size: 0;
					// min-height: 31.25rem /* 500/16 */;
					.col-base{
						display: inline-block;
						vertical-align: top;
						width: 33.3333%;
            // height: 37.5rem /* 600/16 */;
            height: 100%;
						padding-left: .9375rem /* 15/16 */;
            padding-right: .9375rem /* 15/16 */;
            padding-top: 18.9375rem /* 303/16 */;
						border-right: 1px solid #f4f4f4;
						&:nth-child(1){
							border-left: 1px solid #f4f4f4;
						}
						.col-about-title{
              max-width: 13.5rem /* 216/16 */;
							margin-bottom: 2.875rem /* 46/16 */;
              // font-size: 1.875rem /* 30/16 */;
              font-size: 1.625rem /* 26/16 */;
							line-height: 1.4;
							font-weight: normal;
							color: #333;
							span{
								color: #c5a47e;
							}
						}
						.col-about-info{
							font-size: 1.25rem /* 20/16 */;
							line-height: 1.65;
							color: #999;
						}
					}
					.col-about-spec{
            position: relative;
            padding-left: 3.75rem /* 60/16 */;
            padding-right: 3.75rem /* 60/16 */;
						.service-item{
							img{
								vertical-align: middle;
							}
							h4{
								margin-top: 3.125rem /* 50/16 */;
								// margin-bottom: 1.25rem /* 20/16 */;
								font-size: 1.25rem /* 20/16 */;
								line-height: 1.35;
								font-weight: normal;
								color: #333;
								letter-spacing: 0.2em;
								text-transform: uppercase;
							}
						}
					}
					.col-about-img{
            // padding: 0;
            padding-left: 0;
            padding-right: 0;
						img{
							max-width: calc(100%);
							display: block;
							box-shadow: 0 8px 25px rgba(0,0,0,0.2);
						}
					}
				}
			}
		}
	}
	.page7{
    &.bg6{
      background-color: #fff;
    }
		.header{
			position: absolute;
			z-index: 99;
			top: 0;
			right: 0;
			left: 0;
			padding: 35px 0;
			.container-fluid{
				width: 100%;
				margin: 0 auto;
				padding-right: 15px;
				padding-left: 15px;
				.head-title{
					font-size: 1.25rem /* 20/16 */;
					color: #fff;
				}
			}
		}
		.main-contain{
			#fs-container{
				height: 100vh;
				background-repeat: no-repeat;
				-webkit-background-size: cover;
				-moz-background-size: cover;
				-o-background-size: cover;
				background-size: cover;
				background-image: url(./../../assets/images/bg-project-01.jpg);
				background-position: center center;
				display: -webkit-box;
				display: -webkit-flex;
				display: -moz-box;
				display: -ms-flexbox;
				display: flex;
				-webkit-transition: all .5s ease;
				-o-transition: all .5s ease;
				-moz-transition: all .5s ease;
        transition: all .5s ease;
        &.active1{
          background-image: url(./../../assets/images/bg-project-01.jpg);
        }
        &.active2{
          background-image: url(./../../assets/images/bg-project-02.jpg);
        }
        &.active3{
          background-image: url(./../../assets/images/bg-project-03.jpg);
        }
        &.active4{
          background-image: url(./../../assets/images/bg-project-04.jpg);
        }
        &.active5{
          background-image: url(./../../assets/images/bg-project-05.jpg);
        }
				.media-project-hover {
					width: -webkit-calc(100% / 5);
					width: -moz-calc(100% / 5);
					width: calc(100% / 5);
					height: 100%;
					display: -webkit-box;
					display: -webkit-flex;
					display: -moz-box;
					display: -ms-flexbox;
					display: flex;
					-webkit-box-align: center;
					-webkit-align-items: center;
					-moz-box-align: center;
					-ms-flex-align: center;
					align-items: center;
					-webkit-box-pack: center;
					-webkit-justify-content: center;
					-moz-box-pack: center;
					-ms-flex-pack: center;
					justify-content: center;
					border-right: 1px solid rgba(242,242,242,.3);
					position: relative;
					-webkit-transition: background .5s ease-in-out;
					-o-transition: background .5s ease-in-out;
					-moz-transition: background .5s ease-in-out;
					transition: background .5s ease-in-out;
					.bg-overlay {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background: rgba(0,0,0,.6);
						z-index: 0;
						-webkit-transition: all .3s ease;
						-o-transition: all .3s ease;
						-moz-transition: all .3s ease;
						transition: all .3s ease;
						-webkit-transform: scaleX(0);
						-moz-transform: scaleX(0);
						-ms-transform: scaleX(0);
						-o-transform: scaleX(0);
						transform: scaleX(0);
					}
					.media__body{
						text-align: center;
						position: absolute;
						top: 50%;
						left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
						z-index: 99;
						.media__sub-title{
							color: #fff;
							margin-bottom: 15px;
							font-size: 11px;
							text-transform: uppercase;
							font-weight: 400;
							letter-spacing: .3em;
						}
						.media__title{
							margin-bottom: 60px;
							a{
								font-size: 24px;
								color: #fff;
								line-height: -webkit-calc(48/30);
								line-height: -moz-calc(48/30);
								line-height: calc(48/30);
								display: block;
								-webkit-transition: all .5s ease;
								-o-transition: all .5s ease;
								-moz-transition: all .5s ease;
								transition: all .5s ease;
								&:hover{
									text-decoration: underline;
									-webkit-transition: all .5s ease;
									-o-transition: all .5s ease;
									-moz-transition: all .5s ease;
									transition: all .5s ease;
								}
							}
						}
						.link{
							-webkit-transition: all .3s ease;
							-o-transition: all .3s ease;
							-moz-transition: all .3s ease;
							font-size: 13px;
							color: #fff;
							text-transform: capitalize;
							transition: all .3s ease;
							i{
								font-size: inherit;
								color: inherit;
								margin-left: 7px;
								-webkit-transition: all .3s ease;
								-o-transition: all .3s ease;
								-moz-transition: all .3s ease;
								transition: all .3s ease;
							}
						}
					}
					.media__number{
						position: absolute;
						font-size: 100px;
						color: #fff;
						font-weight: 100;
						line-height: 1;
						transition: all .3s ease;
						bottom: -50px;
						left: 50%;
						-webkit-transform: translateX(-50%);
						-moz-transform: translateX(-50%);
						-ms-transform: translateX(-50%);
						-o-transform: translateX(-50%);
						transform: translateX(-50%);
					}
					&:hover{
						.bg-overlay{
							-webkit-transform: scaleX(1);
							-moz-transform: scaleX(1);
							-ms-transform: scaleX(1);
							-o-transform: scaleX(1);
							transform: scaleX(1);
						}
						.media__number{
							bottom: 0;
						}
					}
				}
			}
		}
  }
  .delay05{
    animation-delay: 0.5s;
  }
  .delay1{
    animation-delay: 1s;
  }
  .delay15{
    animation-delay: 1.5s;
  }
  .delay2{
    animation-delay: 2s;
  }
  .delay25{
    animation-delay: 2.5s;
  }
  .delay3{
    animation-delay: 3s;
  }
}

@media only screen and (max-width: 1680px) {
  .aboutUsCustomer{
    .page1{
      .container-center {
        top: 15%;
      }
      .title_who{
        .who_text{
          margin-bottom: 2.5rem /* 40/16 */;
          font-size: 2.5rem /* 40/16 */;
        }
        .who_text1{
          font-size: 2.5rem /* 40/16 */;
        }
      }
    }
    .page2,.page3,.page4,.page5{
      .tp-mask-wrap{
        padding-top: 5rem /* 80/16 */;
        .tp-loop-wrap{
          font-size: 1.125rem /* 18/16 */;
          h3{
            font-size: 1.375rem /* 22/16 */;
          }
          .zerotrenta-title{
            font-size: 3.125rem /* 50/16 */;
          }
          .tp-caption{
            font-size: 2.5rem /* 30/16 */;
          }
          .tp-parallax-wrap{
            margin-top: 1.875rem /* 30/16 */;
            &.tp-parallax-wrap1{
              margin-top: 1.875rem /* 30/16 */;
            }
            .tp-loop-wrap{
              font-size: 1rem /* 16/16 */;
            }
          }
        }
      }
    }
    .page6 {
      .page-box{
        max-width: 1000px;
        .section-content{
          .row-base{
            .col-base{
              padding-top: 9.375rem /* 150/16 */;
              .col-about-title{
                font-size: 1.25rem /* 20/16 */;
              }
              .col-about-info{
                font-size: 1rem /* 16/16 */;
              }
            }
            .col-about-spec{
              .service-item{
                h4{
                  font-size: 1rem /* 16/16 */;
                }
              }
            }
          }
        }
        .section-header{
          // margin-top: 2.5rem /* 40/16 */;
          top: 2.5rem /* 40/16 */;
          .section-title{
            font-size: 2.375rem /* 38/16 */;
          }
        }
      }
    } 
  }
}
@media only screen and (max-width: 768px) {
  .aboutUsCustomer{
    .header{
      padding-top: 1.25rem /* 20/16 */;
    }
    .page1{
      .container-center{
        left: 0;
        width: 100%;
        padding: 0 .625rem /* 10/16 */;
        .title_who{
          .who_text{
            font-size: 2.75rem /* 44/16 */;
          }
          .who_text1{
            min-width: auto;
            max-width: auto;
            line-height: 2.5rem /* 40/16 */;
            font-size: 2.75rem /* 44/16 */;
          }
          .who_text2{
            min-width: auto;
            max-width: auto;
            line-height: 1.875rem /* 30/16 */;
            // font-size: 1rem /* 16/16 */;
          }
        }
      }
    }
    .page2,.page3,.page4,.page5{
      .tp-mask-wrap{
        min-width: auto;
        max-width: auto;
        width: 100%;
        padding-left: .625rem /* 10/16 */;
        padding-right: .625rem /* 10/16 */;
        .tp-loop-wrap{
          // font-size: 1.125rem /* 18/16 */;
          .tp-parallax-wrap {
            .tp-loop-wrap{
              // font-size: 1.125rem /* 18/16 */;
            }
          }
          .tp-caption{
            // font-size: 1.875rem /* 30/16 */;
          }
        }
      }
    }
    .page6{
      .page-box{
        .section-header{
          // margin-top: 3.75rem /* 60/16 */;
          top: 3.75rem /* 60/16 */;
          .section-title{
            font-size: 1.125rem /* 18/16 */;
          }
        }
        .section-content{
          // margin-top: 1.25rem /* 20/16 */;
          .row-base{
            .col-base{
              // padding-top: 1.25rem /* 20/16 */;
              padding-top: 6.25rem /* 100/16 */;
              .col-about-title{
                font-size: 1.125rem /* 18/16 */;
              }
              .col-about-info{
                font-size: .875rem /* 14/16 */;
              }
            }
            .col-about-spec{
              // padding: 0 .625rem /* 10/16 */;
              padding-left: .625rem /* 10/16 */;
              padding-right: .625rem /* 10/16 */;
              .service-item{
                h4{
                  font-size: .875rem /* 14/16 */;
                }
              }
            }
          }
        }   
      }
    }
    .page7{
      .main-contain{
        #fs-container{
          .media-project-hover{
            padding: 0 .3125rem /* 5/16 */;
            word-break: break-all;
            .media__body{
              .media__sub-title{
                font-size: .625rem /* 10/16 */;
              }
              .media__title{
                a{
                  font-size: .75rem /* 12/16 */;
                }
              }
            }
            .media__number{
              bottom: -1.5625rem /* 25/16 */;
              font-size: 3.125rem /* 50/16 */;
              word-break: normal;
            } 
          }
        }
      }
    }
  }
}
// @media only screen and (max-width: 768px) {
//   .aboutUsCustomer{
//     .header{
//       padding-top: 1.25rem /* 20/16 */;
//     }
//     .page1{
//       .container-center{
//         left: 0;
//         width: 100%;
//         padding: 0 .625rem /* 10/16 */;
//         .title_who{
//           .who_text1{
//             min-width: auto;
//             max-width: auto;
//             font-size: 1.875rem /* 30/16 */;
//           }
//           .who_text2{
//             min-width: auto;
//             max-width: auto;
//             font-size: .8125rem /* 13/16 */;
//           }
//         }
//       }
//     }
//     .page2,.page3,.page4,.page5{
//       .tp-mask-wrap{
//         min-width: auto;
//         max-width: auto;
//         width: 100%;
//         padding-left: .625rem /* 10/16 */;
//         padding-right: .625rem /* 10/16 */;
//         .tp-loop-wrap{
//           // font-size: 1.125rem /* 18/16 */;
//           .tp-parallax-wrap {
//             .tp-loop-wrap{
//               font-size: 1.125rem /* 18/16 */;
//             }
//           }
//           .tp-caption{
//             font-size: 1.875rem /* 30/16 */;
//           }
//         }
//       }
//     }
//     .page6{
//       .page-box{
//         .section-header{
//           // margin-top: 3.75rem /* 60/16 */;
//           top: 3.75rem /* 60/16 */;
//           .section-title{
//             font-size: 1.125rem /* 18/16 */;
//           }
//         }
//         .section-content{
//           // margin-top: 1.25rem /* 20/16 */;
//           .row-base{
//             .col-base{
//               // padding-top: 1.25rem /* 20/16 */;
//               padding-top: 6.25rem /* 100/16 */;
//               .col-about-title{
//                 font-size: 1.125rem /* 18/16 */;
//               }
//               .col-about-info{
//                 font-size: .875rem /* 14/16 */;
//               }
//             }
//             .col-about-spec{
//               // padding: 0 .625rem /* 10/16 */;
//               padding-left: .625rem /* 10/16 */;
//               padding-right: .625rem /* 10/16 */;
//               .service-item{
//                 h4{
//                   font-size: .875rem /* 14/16 */;
//                 }
//               }
//             }
//           }
//         }   
//       }
//     }
//     .page7{
//       .main-contain{
//         #fs-container{
//           .media-project-hover{
//             padding: 0 .3125rem /* 5/16 */;
//             word-break: break-all;
//             .media__body{
//               .media__sub-title{
//                 font-size: .625rem /* 10/16 */;
//               }
//               .media__title{
//                 a{
//                   font-size: .75rem /* 12/16 */;
//                 }
//               }
//             }
//             .media__number{
//               bottom: -1.5625rem /* 25/16 */;
//               font-size: 3.125rem /* 50/16 */;
//               word-break: normal;
//             } 
//           }
//         }
//       }
//     }
//   }
// }
.aboutUsCustomer.isMobile{
  .header{
    padding-top: 1.25rem /* 20/16 */;
  }
  .page1{
    .container-center{
      left: 0;
      width: 100%;
      padding: 0 .625rem /* 10/16 */;
      .title_who{
        .who_text1{
          min-width: auto;
          max-width: auto;
          font-size: 1.875rem /* 30/16 */;
        }
        .who_text2{
          min-width: auto;
          max-width: auto;
          font-size: .8125rem /* 13/16 */;
        }
      }
    }
  }
  .page2,.page3,.page4,.page5{
    .tp-mask-wrap{
      min-width: auto;
      max-width: auto;
      width: 100%;
      padding-left: .625rem /* 10/16 */;
      padding-right: .625rem /* 10/16 */;
      .tp-loop-wrap{
        // font-size: 1.125rem /* 18/16 */;
        .tp-parallax-wrap {
          .tp-loop-wrap{
            font-size: 1.125rem /* 18/16 */;
          }
        }
        .tp-caption{
          font-size: 1.875rem /* 30/16 */;
        }
      }
    }
  }
  .page6{
    .page-box{
      .section-header{
        // margin-top: 3.75rem /* 60/16 */;
        top: 3.75rem /* 60/16 */;
        .section-title{
          font-size: 1.125rem /* 18/16 */;
        }
      }
      .section-content{
        // margin-top: 1.25rem /* 20/16 */;
        .row-base{
          .col-base{
            // padding-top: 1.25rem /* 20/16 */;
            padding-top: 6.25rem /* 100/16 */;
            .col-about-title{
              font-size: 1.125rem /* 18/16 */;
            }
            .col-about-info{
              font-size: .875rem /* 14/16 */;
            }
          }
          .col-about-spec{
            // padding: 0 .625rem /* 10/16 */;
            padding-left: .625rem /* 10/16 */;
            padding-right: .625rem /* 10/16 */;
            .service-item{
              h4{
                font-size: .875rem /* 14/16 */;
              }
            }
          }
        }
      }   
    }
  }
  .page7{
    .main-contain{
      #fs-container{
        .media-project-hover{
          padding: 0 .3125rem /* 5/16 */;
          word-break: break-all;
          .media__body{
            .media__sub-title{
              font-size: .625rem /* 10/16 */;
            }
            .media__title{
              a{
                font-size: .75rem /* 12/16 */;
              }
            }
          }
          .media__number{
            bottom: -1.5625rem /* 25/16 */;
            font-size: 3.125rem /* 50/16 */;
            word-break: normal;
          } 
        }
      }
    }
  }
}
</style>
