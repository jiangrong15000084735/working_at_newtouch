<template>
	<div class="aboutUsDesigner" :class="{'isMobile': isMobile}">
    <div class="header">
      <div class="container-fluid">
        <div class="header_content">
          <div class="logo">
            <a href="javascript:;">
              <img src="@/assets/images/logo.png" />
              合筑空间
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- 第一页 -->
    <div class="page page1" v-if="!isMobile">
      <div class="container-center">
        <div class="title_who title_who0">
          <div class="mask-wrap">
            <div class="who_text text_bold">我们是谁</div>
          </div>
        </div>
        <div class="title_who title_who1">
          <div class='loop-wrap'>
            <div class="mask-wrap">
              <h2 class="who_text1 text_bold">我们是合筑空间，一个拥有丰富资源的精品建筑设计服务平台</h2>
            </div>
          </div>
        </div>
        <div class="title_who title_who2">
          <div class='loop-wrap'>
            <div class="mask-wrap">
              <p class="who_text2">我们致力于客户与建筑师的完美对接，让身怀天赋的建筑师找到最匹配的设计项目</p>
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
    <swiper id="swiperBox" v-bind:options="swiperOption" ref="mySwiper">
      <!-- 第一页 -->
      <swiper-slide class="swiper-slide" v-if="isMobile">
        <div class="page page1" v-if="isMobile">
          <div class="container-center">
            <div class="title_who title_who0">
              <div class="mask-wrap">
                <div class="who_text text_bold">我们是谁</div>
              </div>
            </div>
            <div class="title_who title_who1">
              <div class='loop-wrap'>
                <div class="mask-wrap">
                  <h2 class="who_text1 text_bold">我们是合筑空间，一个拥有丰富资源的精品建筑设计服务平台</h2>
                </div>
              </div>
            </div>
            <div class="title_who title_who2">
              <div class='loop-wrap'>
                <div class="mask-wrap">
                  <p class="who_text2">我们致力于客户与建筑师的完美对接，让身怀天赋的建筑师找到最匹配的设计项目</p>
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
        <div class="page page2" @mousemove="mousemove($event,'smart1')" @mouseleave="mouseleave($event,'smart1')">
          <div class="smart-object" id="smart1">
            <img src="@/assets/images/HM_Landing_page_nat-geo_layer1.jpg" class="smart-layer" />
            <img src="@/assets/images/HM_Landing_page_nat-geo_layer2.png" class="smart-layer" />
            <img src="@/assets/images/HM_Landing_page_nat-geo_layer3.png" class="smart-layer" />
          </div>
          <!-- <div class="smart-left" v-if="!(activeIndex == 1 && previousIndex == 2)"> -->
          <div class="smart-left" v-if="!fixShow || isMobile">
            <div class="smart-cover">
              <div class="smart-box">
                <div class="title-01 text_bold">为何选择我们</div>
                <div class="title-right">
                  <div class="p1">ReasonⅠ</div>
                  <div class="p2 text_bold">众多项目信息</div>
                  <div class="p3 text_bold">总有适合您的好项目</div>
                  <div class="p4">我们的客户多为实名认证的上市公司，品质信誉皆有保证。</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <!-- 第三页 -->
      <swiper-slide class="swiper-slide">
        <div class="page page3" @mousemove="mousemove($event,'smart2')" @mouseleave="mouseleave($event,'smart2')">
          <div class="smart-object" id="smart2">
            <img src="@/assets/images/yt-kid-01.jpg" class="smart-layer" />
            <img src="@/assets/images/yt-kid-02.png" class="smart-layer" />
            <img src="@/assets/images/yt-kid-03.png" class="smart-layer" />
          </div>
          <div class="smart-left" v-if="!fixShow || isMobile">
            <div class="smart-cover">
              <div class="smart-box">
                <div class="title-01 text_bold">为何选择我们</div>
                <div class="title-right">
                  <div class="p1">ReasonⅡ</div>
                  <div class="text_bold p2">实现自我价值</div>
                  <div class="text_bold p3 ">展示才华的绝佳舞台</div>
                  <div class="p4">
                    怀才不遇？来这里就对了。Just show your talent!<br/>
                    个人专属主页，可编辑，可分享。We can focus user’s attention on your design!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <!-- 第四页 -->
      <swiper-slide class="swiper-slide">
        <div class="page page4" @mousemove="mousemove($event,'smart3')" @mouseleave="mouseleave($event,'smart3')">
          <div class="smart-object" id="smart3">
            <img src="@/assets/images/HM_gcp_01.jpg" class="smart-layer" />
            <img src="@/assets/images/HM_gcp_02.png" class="smart-layer" />
            <img src="@/assets/images/HM_gcp_03.png" class="smart-layer" />
            <img src="@/assets/images/HM_gcp_04.png" class="smart-layer" />
          </div>
          <div class="smart-left" v-if="!fixShow || isMobile">
            <div class="smart-cover">
              <div class="smart-box">
                <div class="title-01 text_bold">为何选择我们</div>
                <div class="title-right">
                  <div class="p1">ReasonⅢ</div>
                  <div class="text_bold p2 ">流程透明规范</div>
                  <div class=" text_bold p3">杜绝任何行业潜规则</div>
                  <div class="p4">
                    所有建筑师同时拿到需求任务书，客户无法私下对接<br/>
                    设计完成立刻开标，杜绝任何潜规则的存在可能。<br/>
                    权威专家直播评审，保证中标作品实至名归。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <!-- 第五页 -->
      <swiper-slide class="swiper-slide">
        <div class="page page5" @mousemove="mousemove($event,'smart4')" @mouseleave="mouseleave($event,'smart4')">
          <div class="smart-object" id="smart4">
            <img src="@/assets/images/HM_Landing_page_witness-change_layer1.jpg" class="smart-layer" />
            <img src="@/assets/images/HM_Landing_page_witness-change_layer2.png" class="smart-layer" />
            <img src="@/assets/images/HM_Landing_page_witness-change_layer3.png" class="smart-layer" />
          </div>
          <div class="smart-left" v-if="!fixShow || isMobile">
            <div class="smart-cover">
              <div class="smart-box">
                <div class="title-01 text_bold">为何选择我们</div>
                <div class="title-right">
                  <div class="p1">ReasonⅣ</div>
                  <div class="text_bold p2 ">没有中间费用</div>
                  <div class="text_bold p3 ">获得丰厚的奖金与回报</div>
                  <div class="p4">
                    平台不抽取任何中间费用，所有设计费全部支付给建筑师。客户支出的更少，建筑师获得的更多。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <!-- 第六页 -->
      <swiper-slide class="swiper-slide">
        <div class="page page6" @mousemove="mousemove($event,'smart5')" @mouseleave="mouseleave($event,'smart5')">
          <div class="smart-object" id="smart5">
            <img src="@/assets/images/HM_Landing_page_hollow_layer1.jpg" class="smart-layer" />
            <img src="@/assets/images/HM_Landing_page_hollow_layer2.png" class="smart-layer" />
            <img src="@/assets/images/HM_Landing_page_hollow_layer3.png" class="smart-layer" />
          </div>
          <div class="smart-left" v-if="!fixShow || isMobile">
            <div class="smart-cover">
              <div class="smart-box">
                <div class="title-01 text_bold">为何选择我们</div>
                <div class="title-right">
                  <div class="p1">ReasonⅤ</div>
                  <div class="text_bold p2 ">平台托管资金</div>
                  <div class="text_bold p3 ">保证设计费按时发放</div>
                  <div class="p4">
                    客户确认结果后立刻发放设计费，有我在，你放心。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <!-- <div class="smart-left-fixed" 
      v-if="(activeIndex == 1 && previousIndex == 2) ||
            activeIndex == 2 || 
            activeIndex == 3 || 
            activeIndex == 4 || 
            activeIndex == 5"> -->
    <div class="smart-left-fixed" 
      v-if="(activeIndex == 0 ||
            activeIndex == 1 || 
            activeIndex == 2 || 
            activeIndex == 3 || 
            activeIndex == 4) && fixShow  && !isMobile">
      <div class="smart-cover">
        <div class="smart-box"
          :class="{
            'smart-box1': activeIndex == 0,
            'smart-box2': activeIndex == 1,
            'smart-box3': activeIndex == 2,
            'smart-box4': activeIndex == 3,
            'smart-box5': activeIndex == 4,
            }"
          >
          <div class="title-01">为何选择我们</div>
          <div class="title-right" v-show="activeIndex == 0 && direction == 1">
            <div class="p1 animated"
              :class="activeIndex == 0 ? 'fadeInUp delay00' : 'fadeOutDown'">ReasonⅠ</div>
            <div class="p2 animated"
              :class="activeIndex == 0 ? 'fadeInUp delay01' : 'fadeOutDown'">众多项目信息</div>
            <div class="p3 animated"
              :class="activeIndex == 0 ? 'fadeInUp delay02' : 'fadeOutDown'">总有适合您的好项目</div>
            <div class="p4 animated"
              :class="activeIndex == 0 ? 'fadeInUp delay03' : 'fadeOutDown'">我们的客户多为实名认证的上市公司，品质信誉皆有保证。</div>
          </div>
          <div class="title-right" v-show="activeIndex == 1 && direction == 1">
            <div class="p1 animated"
              :class="activeIndex == 1 ? 'fadeInUp delay00' : 'fadeOutDown'">ReasonⅡ</div>
            <div class="p2 animated"
              :class="activeIndex == 1 ? 'fadeInUp delay01' : 'fadeOutDown'">实现自我价值</div>
            <div class="p3 animated"
              :class="activeIndex == 1 ? 'fadeInUp delay02' : 'fadeOutDown'">展示才华的绝佳舞台</div>
            <div class="p4 animated"
              :class="activeIndex == 1 ? 'fadeInUp delay03' : 'fadeOutDown'">
              怀才不遇？来这里就对了。Just show your talent!<br/>
              个人专属主页，可编辑，可分享。We can focus user’s attention on your design!
            </div>
          </div>
          <div class="title-right" v-show="activeIndex == 2 && direction == 1">
            <div class="p1 animated"
              :class="activeIndex == 2 ? 'fadeInUp delay00' : 'fadeOutDown'">ReasonⅢ</div>
            <div class="p2 animated"
              :class="activeIndex == 2 ? 'fadeInUp delay01' : 'fadeOutDown'">流程透明规范</div>
            <div class="p3 animated"
              :class="activeIndex == 2 ? 'fadeInUp delay02' : 'fadeOutDown'">杜绝任何行业潜规则</div>
            <div class="p4 animated"
              :class="activeIndex == 2 ? 'fadeInUp delay03' : 'fadeOutDown'">
              所有设计师同时拿到需求任务书，客户无法私下对接<br/>
              设计完成立刻开标，杜绝任何潜规则的存在可能。<br/>
              权威专家直播评审，保证中标作品实至名归。
            </div>
          </div>
          <div class="title-right" v-show="activeIndex == 3 && direction == 1">
            <div class="p1 animated"
              :class="activeIndex == 3 ? 'fadeInUp delay00' : 'fadeOutDown'">ReasonⅣ</div>
            <div class="p2 animated"
              :class="activeIndex == 3 ? 'fadeInUp delay01' : 'fadeOutDown'">没有中间费用</div>
            <div class="p3 animated"
              :class="activeIndex == 3 ? 'fadeInUp delay02' : 'fadeOutDown'">获得丰厚的奖金与回报</div>
            <div class="p4 animated"
              :class="activeIndex == 3 ? 'fadeInUp delay03' : 'fadeOutDown'">
              平台不抽取任何中间费用，所有设计费全部支付给建筑师。客户支出的更少，建筑师获得的更多。
            </div>
          </div>
          <div class="title-right" v-show="activeIndex == 4 && direction == 1">
            <div class="p1 animated"
              :class="activeIndex == 4 ? 'fadeInUp delay00' : 'fadeOutDown'">ReasonⅤ</div>
            <div class="p2 animated"
              :class="activeIndex == 4 ? 'fadeInUp delay01' : 'fadeOutDown'">平台托管资金</div>
            <div class="p3 animated"
              :class="activeIndex == 4 ? 'fadeInUp delay02' : 'fadeOutDown'">保证设计费按时发放</div>
            <div class="p4 animated"
              :class="activeIndex == 4 ? 'fadeInUp delay03' : 'fadeOutDown'">
              客户确认结果后立刻发放设计费，有我在，你放心。
            </div>
          </div>

          <div class="title-right" v-show="activeIndex == 0 && direction == -1">
            <div class="p1 animated"
              :class="activeIndex == 0 ? 'fadeInDown delay03' : 'fadeOutDown'">ReasonⅠ</div>
            <div class="p2 animated"
              :class="activeIndex == 0 ? 'fadeInDown delay02' : 'fadeOutDown'">众多项目信息</div>
            <div class="p3 animated"
              :class="activeIndex == 0 ? 'fadeInDown delay01' : 'fadeOutDown'">总有适合您的好项目</div>
            <div class="p4 animated"
              :class="activeIndex == 0 ? 'fadeInDown delay00' : 'fadeOutDown'">我们的客户多为实名认证的上市公司，品质信誉皆有保证。</div>
          </div>
          <div class="title-right" v-show="activeIndex == 1 && direction == -1">
            <div class="p1 animated"
              :class="activeIndex == 1 ? 'fadeInDown delay03' : 'fadeOutDown'">ReasonⅡ</div>
            <div class="p2 animated"
              :class="activeIndex == 1 ? 'fadeInDown delay02' : 'fadeOutDown'">实现自我价值</div>
            <div class="p3 animated"
              :class="activeIndex == 1 ? 'fadeInDown delay01' : 'fadeOutDown'">展示才华的绝佳舞台</div>
            <div class="p4 animated"
              :class="activeIndex == 1 ? 'fadeInDown delay00' : 'fadeOutDown'">
              怀才不遇？来这里就对了。Just show your talent!<br/>
              个人专属主页，可编辑，可分享。We can focus user’s attention on your design!
            </div>
          </div>
          <div class="title-right" v-show="activeIndex == 2 && direction == -1">
            <div class="p1 animated"
              :class="activeIndex == 2 ? 'fadeInDown delay03' : 'fadeOutDown'">ReasonⅢ</div>
            <div class="p2 animated"
              :class="activeIndex == 2 ? 'fadeInDown delay02' : 'fadeOutDown'">流程透明规范</div>
            <div class="p3 animated"
              :class="activeIndex == 2 ? 'fadeInDown delay01' : 'fadeOutDown'">杜绝任何行业潜规则</div>
            <div class="p4 animated"
              :class="activeIndex == 2 ? 'fadeInDown delay00' : 'fadeOutDown'">
              所有设计师同时拿到需求任务书，客户无法私下对接<br/>
              设计完成立刻开标，杜绝任何潜规则的存在可能。<br/>
              权威专家直播评审，保证中标作品实至名归。
            </div>
          </div>
          <div class="title-right" v-show="activeIndex == 3 && direction == -1">
            <div class="p1 animated"
              :class="activeIndex == 3 ? 'fadeInDown delay03' : 'fadeOutDown'">ReasonⅣ</div>
            <div class="p2 animated"
              :class="activeIndex == 3 ? 'fadeInDown delay02' : 'fadeOutDown'">没有中间费用</div>
            <div class="p3 animated"
              :class="activeIndex == 3 ? 'fadeInDown delay01' : 'fadeOutDown'">获得丰厚的奖金与回报</div>
            <div class="p4 animated"
              :class="activeIndex == 3 ? 'fadeInDown delay00' : 'fadeOutDown'">
              平台不抽取任何中间费用，所有设计费全部支付给建筑师。客户支出的更少，建筑师获得的更多。
            </div>
          </div>
          <div class="title-right" v-show="activeIndex == 4 && direction == -1">
            <div class="p1 animated"
              :class="activeIndex == 4 ? 'fadeInDown delay03' : 'fadeOutDown'">ReasonⅤ</div>
            <div class="p2 animated"
              :class="activeIndex == 4 ? 'fadeInDown delay02' : 'fadeOutDown'">平台托管资金</div>
            <div class="p3 animated"
              :class="activeIndex == 4 ? 'fadeInDown delay01' : 'fadeOutDown'">保证设计费按时发放</div>
            <div class="p4 animated"
              :class="activeIndex == 4 ? 'fadeInDown delay00' : 'fadeOutDown'">
              客户确认结果后立刻发放设计费，有我在，你放心。
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
// import {WOW} from 'wowjs'
// new WOW().init();
import TWEEN from "@tweenjs/tween.js";
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui.js';
export default {
  name:'aboutUsDesigner',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      // heightH: window.innerHeight,
      widthW: window.innerWidth,
      // 当前索引
      activeIndex: 0,
      // 上一个页面索引
      previousIndex: 0,
      // 滑动方向 1为上，-1为下
      direction: 1,
      swiperOption: {
        // 设定初始化时slide的索引
        // initialSlide: 1,
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
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        on:{
          //监听滑动切换事件，返回swiper对象
          slideChange: ()=> {
          },
          slideChangeTransitionStart: () => {
            if (
              this.swiper.activeIndex != 0 || 
              (this.swiper.previousIndex == 1 && this.swiper.activeIndex == 0)
            ) {
              this.activeIndex = this.swiper.activeIndex;
              this.previousIndex = this.swiper.previousIndex;
              this.direction = this.activeIndex - this.previousIndex
            }
            this.fixShow = true;
            if (this.activeIndex == 0) {
              this.disabled = true;
            }
          },
          slideChangeTransitionEnd: () => {
            if (this.swiper.activeIndex == 0) {
              this.activeIndex = this.swiper.activeIndex;
              this.previousIndex = this.swiper.previousIndex;
              this.direction = this.activeIndex - this.previousIndex
            }
            this.fixShow = false;
            if (this.activeIndex == 0) {
              this.disabled = false;
            }
          }
        }
      },
      // 图片索引
      imgIndex: 0,
      // positionX: 0,
      // positionY: 0,
      diffX: 0,
      diffY: 0,
      tween: null,
      fixShow: false,
      // 第一页滑动控制
      pageSlide: 1
    }
  },
  methods: {
    mousemove(e,id) {
      // if (this.tween){
      //   this.tween.stop();
      // }
      let distance = 30;
      this.diffX += e.movementX;
      this.diffY += e.movementY;
      if (this.diffX > distance) {
        this.diffX = distance;
      }
      if (this.diffX < -distance) {
        this.diffX = -distance;
      }
      if (this.diffY > distance) {
        this.diffY = distance;
      }
      if (this.diffY < -distance) {
        this.diffY = -distance;
      }
      // console.log(this.diffX + '~' + this.diffY)
      // function animate() {
      //   requestAnimationFrame(animate);
      //   TWEEN.update();
      // }
      // animate();
      // var position = { x: 0, y: 0 };
      // this.tween = new TWEEN.Tween(position);
      // this.tween.to({ x: this.diffX,y: this.diffY }, 100);
      // // this.tween.easing(TWEEN.Easing.Quadratic.Out);
      // this.tween.start();
      // this.tween.onUpdate(()=> {
      //   document.getElementById(id).style.transform = 'translate(' + position.x + 'px,' + position.y + 'px)';
      // });
      let diffX = this.diffX,
          diffY = this.diffY;
      $("#"+ id).stop().animate({}, function(){
        $(this).css({'transform': 'translate3d(' + -diffX + 'px,' + -diffY + 'px, 0)'});
        $(this).css({'-webkit-transform': 'translate3d(' + -diffX + 'px,' + -diffY + 'px, 0)'});
      });
    },
    mouseleave(e, id) {
      $("#"+ id).stop().animate({},function(){
        $(this).css({'transform': 'translate3d(0, 0, 0)'});
        $(this).css({'-webkit-transform': 'translate3d(0, 0, 0)'});
      });
      // if (this.tween){
      //   this.tween.stop();
      // }
      // function animate() {
      //   requestAnimationFrame(animate);
      //   TWEEN.update();
      // }
      // animate();
      // var position = { x: 0, y: 0 };
      // this.tween = new TWEEN.Tween(position);
      // this.tween.to({ x: this.diffX,y: this.diffY }, 100);
      // // this.tween.easing(TWEEN.Easing.Quadratic.Out);
      // this.tween.start();
      // this.tween.onUpdate(()=> {
      //   document.getElementById(id).style.transform = 'translate(0,0)';
      // });
    },
    handleScroll (e) {
      if (this.disabled) return false;
      this.disabled = true;
      if (e.deltaY > 0 && this.activeIndex == 0 && this.pageSlide > 0) {
        Velocity($('.page1'), {translateY: ['-100%', 'easing',  '0']}, { duration: 800 });
        this.pageSlide = -1;
      } else if(e.deltaY < 0 && this.activeIndex == 0 && this.pageSlide < 0) {
        this.pageSlide = 1;
        Velocity($('.page1'), 'reverse');
      }
      this.timer = setTimeout(() => {
        this.disabled = false;
        clearTimeout(this.timer);
      },800);
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    this.timer = null;
    this.disabled = false;
    let element = document.getElementsByClassName('page1')[0];
    // chrome and ie
    element.addEventListener('mousewheel',this.handleScroll,false);
    // firefox
    element.addEventListener("DOMMouseScroll",this.handleScroll,false);

    let element2 = document.getElementsByClassName('page2')[0];
    // chrome and ie
    element2.addEventListener('mousewheel',this.handleScroll,false);
    // firefox
    element2.addEventListener("DOMMouseScroll",this.handleScroll,false);
    
    // window.onresize = () => {
    //   window.location.reload();
    // }
  }
}
</script>
<style lang="less" scoped>
.aboutUsDesigner{
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
  .smart-cover{
    position: absolute;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 1.25rem /* 20/16 */ 0px 1.25rem /* 20/16 */ 1.25rem /* 20/16 */;
    .smart-box{
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgb(35, 31, 29);
      opacity: 0.9;
      &.smart-box1{
        background: rgb(35, 31, 29);
      }
      &.smart-box2{
        background: rgb(230, 33, 23);
      }
      &.smart-box3{
        background: rgb(59, 59, 59);
      }
      &.smart-box4{
        background: rgb(0, 0, 0);
      }
      &.smart-box5{
        background: rgb(41, 41, 41);
      }
      .title-01{
        position: absolute;
        left: 2rem /* 32/16 */;
        // top: 25.6%;
        top: 10.625rem /* 170/16 */;
        z-index: 999;
        font-size: 1.5rem /* 24/16 */;
        color: #fff;
        font-weight: 600;/*设置加粗防止动画*/
      }
      .title-right{
        position: absolute;
        left: 52%;
        top: 31.25rem /* 500/16 */;
        // top: 50%;
        // bottom: 70px;
        right: 0px;
        margin-right: 2.5rem /* 40/16 */;
        // transform: translate3d(0,-50%,0);
        .p1{
          font-size: .8125rem /* 13/16 */;
          margin-bottom: 2.5rem /* 40/16 */;
          color: #ebebeb;
        }
        .p2{
          font-size: 2.25rem /* 36/16 */;
          line-height: 2.5rem /* 40/16 */;
          color: #ebebeb;
          margin-bottom: .625rem /* 10/16 */;
          margin-left: -2px;
          padding-left: 2px;
          font-weight: 600; /*设置加粗防止动画*/
        }
        .p3{
          font-size: 2.25rem /* 36/16 */;
          line-height: 2.5rem /* 40/16 */;
          color: #4285f4;
          font-weight: 600;/*设置加粗防止动画*/
        }
        .p4{
          margin-top: 3rem /* 48/16 */;
          font-size: 1.25rem /* 20/16 */;
          line-height: 2.5rem /* 40/16 */;
          color: #d9d9d9;
        }
      }
    }
  }
  .smart-left-fixed{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    // width: 41.25rem /* 660/16 */;
    width: 48.9%;
    height: 100%;
    // .smart-cover{
    //   position: absolute;
    //   width: 100%;
    //   height: auto;
    //   top: 0;
    //   left: 0;
    //   right: 0;
    //   bottom: 0;
    //   margin: 1.25rem /* 20/16 */ 0px 1.25rem /* 20/16 */ 1.25rem /* 20/16 */;
    //   .smart-box{
    //     position: absolute;
    //     width: 100%;
    //     height: 100%;
    //     background: rgb(35, 31, 29);
    //     opacity: 0.9;
    //     &.smart-box1{
    //       background: rgb(35, 31, 29);
    //     }
    //     &.smart-box2{
    //       background: rgb(230, 33, 23);
    //       .title-right{
    //         .p1{
    //           color: rgb(77, 17, 15);
    //         }
    //         .p2{
    //           color: rgb(255, 255, 255);
    //         }
    //         .p3{
    //           color: rgb(77, 17, 15);
    //         }
    //         .p4{
    //           color: rgb(77, 17, 15);
    //         }
    //       }
    //     }
    //     &.smart-box3{
    //       background: rgb(59, 59, 59);
    //       .title-right{
    //         .p1{
    //           color: rgb(255, 255, 255);
    //         }
    //         .p2{
    //           color: rgb(255, 255, 255);
    //         }
    //         .p3{
    //           color: #9a9a9a;
    //         }
    //         .p4{
    //           color: rgb(255, 255, 255);
    //         }
    //       }
    //     }
    //     &.smart-box4{
    //       background: rgb(0, 0, 0);
    //       .title-right{
    //         .p1{
    //           color: rgb(255, 255, 255);
    //         }
    //         .p2{
    //           color: rgb(255, 255, 255);
    //         }
    //         .p3{
    //           color: #616161;
    //         }
    //         .p4{
    //           color: rgb(255, 255, 255);
    //         }
    //       }
    //     }
    //     &.smart-box5{
    //       background: rgb(41, 41, 41);
    //       .title-right{
    //         .p1{
    //           color: rgb(255, 255, 255);
    //         }
    //         .p2{
    //           color: rgb(255, 255, 255);
    //         }
    //         .p3{
    //           color: #8f756f;
    //         }
    //         .p4{
    //           color: rgb(255, 255, 255);
    //         }
    //       }
    //     }
    //     .title-01{
    //       position: absolute;
    //       left: 1.25rem /* 20/16 */;
    //       top: 25.6%;
    //       z-index: 999;
    //       font-size: 1.5rem /* 24/16 */;
    //       color: #fff;
    //     }
    //     .title-right{
    //       position: absolute;
    //       left: 52%;
    //       top: 50%;
    //       bottom: 70px;
    //       right: 0px;
    //       margin-right: 2.5rem /* 40/16 */;
    //       transform: translate3d(0,-50%,0);
    //       .p1{
    //         font-size: .875rem /* 14/16 */;
    //         margin-bottom: 30px;
    //         color: rgb(112, 102, 95);
    //       }
    //       .p2{
    //         font-size: 2.0625rem /* 33/16 */;
    //         line-height: 2.25rem /* 36/16 */;
    //         color: rgb(255, 255, 255);
    //         margin-left: -2px;
    //         padding-left: 2px;
    //       }
    //       .p3{
    //         font-size: 2.0625rem /* 33/16 */;
    //         line-height: 2.5rem /* 40/16 */;
    //         color: #FFCC00;
    //       }
    //       .p4{
    //         margin-top: 1.875rem /* 30/16 */;
    //         font-size: .875rem /* 14/16 */;
    //         line-height: 1.25rem /* 20/16 */;
    //         color: rgb(112, 102, 95);
    //       }
    //     }
    //   }
    // }
  }
  .page{
    position: relative;
    overflow: hidden;
    height: 100%;
    background-color: #fff;
  }
  .page1{
    background-repeat: no-repeat;
    background-image:url('./../../assets/images/aboutUs1_bg.jpg');
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 20;
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
          // margin: 0px;
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
  .page1{
    position: absolute;
    top: 0;
    left: 0;
  }
  .page2,.page3,.page4,.page5,.page6{
    width: 100%;
    height: 100%;
    .smart-object{
      position: relative;
      // width: 100%;
      // height: 100%;
      // position: absolute;
      // top: 0;
      // left: 0%;
      width: 110%;
      height: 155%;
      min-width: 1060px;
      min-height: 721px;
      transition-duration: 1s;
      .smart-layer{
        position: absolute;
        width: 116%;
        min-width: 1235px;
        // min-height: 110%;
        transform: translate(-9%,-18%);
        // transform: translate(-160px,-190px);
      }
    }
    .smart-left{
      position: absolute;
      top: 0;
      left: 0;
      // z-index: 999;
      z-index: 1000;
      // width: 41.25rem /* 660/16 */;
      width: 48.9%;
      height: 100%;
    }
  }
  .page3{
    .smart-left{
      .smart-cover{
        .smart-box{
          background: rgb(230, 33, 23);
          // .title-right{
          //   .p1{
          //     color: rgb(77, 17, 15);
          //   }
          //   .p2{
          //     color: rgb(255, 255, 255);
          //   }
          //   .p3{
          //     color: rgb(77, 17, 15);
          //   }
          //   .p4{
          //     color: rgb(77, 17, 15);
          //   }
          // }
        }
      }
    }
  }
  .page4{
    .smart-left{
      .smart-cover{
        .smart-box{
          background: rgb(59, 59, 59);
          // .title-right{
          //   .p1{
          //     color: rgb(255, 255, 255);
          //   }
          //   .p2{
          //     color: rgb(255, 255, 255);
          //   }
          //   .p3{
          //     color: #9a9a9a;
          //   }
          //   .p4{
          //     color: rgb(255, 255, 255);
          //   }
          // }
        }
      }
    }
  }
  .page5{
    .smart-left{
      .smart-cover{
        .smart-box{
          background: rgb(0, 0, 0);
          // .title-right{
          //   .p1{
          //     color: rgb(255, 255, 255);
          //   }
          //   .p2{
          //     color: rgb(255, 255, 255);
          //   }
          //   .p3{
          //     color: #616161;
          //   }
          //   .p4{
          //     color: rgb(255, 255, 255);
          //   }
          // }
        }
      }
    }
  }
  .page6{
    .smart-left{
      .smart-cover{
        .smart-box{
          background: rgb(41, 41, 41);
          // .title-right{
          //   .p1{
          //     color: rgb(255, 255, 255);
          //   }
          //   .p2{
          //     color: rgb(255, 255, 255);
          //   }
          //   .p3{
          //     color: #8f756f;
          //   }
          //   .p4{
          //     color: rgb(255, 255, 255);
          //   }
          // }
        }
      }
    }
  }
  // .swiper-pagination{}
  .delay00{
    animation-duration: 0.2s;
  }
  .delay01{
    animation-delay: 0.1s;
    animation-duration: 0.2s;
  }
  .delay02{
    // animation-delay: 0.2s;
    animation-delay: 0.15s;
    animation-duration: 0.2s;
  }
  .delay03{
    // animation-delay: 0.3s;
    animation-delay: 0.2s;
    animation-duration: 0.2s;
  }
  .delay04{
    animation-delay: 0.4s;
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
  .aboutUsDesigner{
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
    .smart-cover{
      .smart-box{
        .title-right{
          top: 50%;
          transform: translate3d(0,-50%,0);
          .p2{
            line-height: 2.25rem /* 36/16 */;
            font-size: 2rem /* 32/16 */;
          }
          .p3{
            line-height: 2.25rem /* 36/16 */;
            font-size: 2rem /* 32/16 */;
          }
          .p4{
            line-height: 2.25rem /* 36/16 */;
            font-size: 1rem /* 16/16 */;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 1200px) {
  .aboutUsDesigner{
    .page2,.page3,.page4,.page5,.page6{
      .smart-object{
        .smart-layer{
          transform: translate(-9%, -10%);
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .aboutUsDesigner{
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
    .page2,.page3,.page4,.page5,.page6{
      .smart-object{
        .smart-layer{
          transform: translate(-9%, -5%);
        }
      }
      .smart-left{
        width: 100%;
        .smart-cover{
          .smart-box{
            .title-01{
              top: 10%;
            }
            .title-right{
              left: .625rem /* 10/16 */;
            }
          }
        }
      }
    }
    .smart-left-fixed{
      width: 100%;
      .smart-cover{
        .smart-box{
          .title-01{
            top: 10%;
          }
          .title-right{
            left: .625rem /* 10/16 */;
          }
        }
      }
    }    
  }
}
// @media only screen and (max-width: 768px) {
//   .aboutUsDesigner{
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
//     .page2,.page3,.page4,.page5,.page6{
//       .smart-object{
//         .smart-layer{
//           transform: translate(-9%, -5%);
//         }
//       }
//       .smart-left{
//         width: 100%;
//         .smart-cover{
//           .smart-box{
//             .title-01{
//               top: 10%;
//             }
//             .title-right{
//               left: .625rem /* 10/16 */;
//             }
//           }
//         }
//       }
//     }
//     .smart-left-fixed{
//       width: 100%;
//       .smart-cover{
//         .smart-box{
//           .title-01{
//             top: 10%;
//           }
//           .title-right{
//             left: .625rem /* 10/16 */;
//           }
//         }
//       }
//     }    
//   }
// }
.aboutUsDesigner.isMobile{
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
  .page2,.page3,.page4,.page5,.page6{
    .smart-object{
      .smart-layer{
        transform: translate(-9%, -5%);
      }
    }
    .smart-left{
      width: 100%;
      .smart-cover{
        .smart-box{
          .title-01{
            top: 10%;
          }
          .title-right{
            left: .625rem /* 10/16 */;
          }
        }
      }
    }
  }
  .smart-left-fixed{
    width: 100%;
    .smart-cover{
      .smart-box{
        .title-01{
          top: 10%;
        }
        .title-right{
          left: .625rem /* 10/16 */;
        }
      }
    }
  }    
}
</style>


