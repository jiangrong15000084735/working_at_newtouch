<template>
  <div class="p-body">
    <mdb-container class="fist-page">
      <mdb-row md="6" offsetMd="3">
        <div class="main-brand">
          <div class="our-logo" @click="submitHome">
            <img src="@/assets/images/logo.png" alt="">合筑空间
          </div>
          <div class="main">
            <div class="brand">
              <!-- go
              <span class="text-dot">.</span>
              arch -->
              了解合筑
            </div>
            <div class="row">
              <div class="description col-md-9 col-md-offset-2">
              <p>
                合筑空间以完美服务客户为宗旨，追求原创精品，力求卓越极致。让客户投最少的资金，
                获得最优原创作品；让身怀天赋的建筑师，找到最匹配的项目。
              </p>
              </div>
            </div>
          </div>
        </div>
        <div class="demo row">
           <div class="demo-version col-md-6">
            <h3>我是客户</h3>
            <a href="javascript:;" @click='aboutUsCustomer'>
              <figure>
                <img alt class="img-responsive" src="@/assets/images/demo1.jpg"
                 style="display:block;width:100%;"/>
                <figcaption>
                  <div class="inner">
                   <span class="btn">View Demo</span>
                  </div>
                </figcaption>
              </figure>
            </a>
           </div>
           <div class="demo-version col-md-6">
            <h3>我是建筑师</h3>
            <a href="javascript:;" @click='aboutUsDesigner'>
              <figure>
                <img alt class="img-responsive" src="@/assets/images/demo2.jpg"/>
                <figcaption>
                  <div class="inner">
                   <span class="btn">View Demo</span>
                  </div>
                </figcaption>
              </figure>
            </a>
           </div>
        </div>
      </mdb-row>
    </mdb-container>  
  </div>
</template>

<script>
// import WOW from "wowjs";
import { WOW } from 'wowjs';
new WOW({ mobile: true, live: true }).init();
export default {
  data() {
    return {
      heightH: window.innerHeight
    };
  },
  methods: {
    aboutUsCustomer(){
      //  const { href } = this.$router.resolve({
      //        path: "/aboutUsCustomer",
      //       });
      //       window.open(href, "_blank");
      this.$router.push("/aboutUsCustomer");
    },
    aboutUsDesigner(){
      // const { href } = this.$router.resolve({
      //       path: "/aboutUsDesigner",
      //     });
      //     window.open(href, "_blank");
      this.$router.push("/aboutUsDesigner");
    },
    submitHome() {
      this.$router.push("/homePage");
    }
  },

};
</script>

<style lang="less" scoped>
.p-body {
  width: 100%;
  min-height: 100%;
  background: #272727;
  color: #fff;
  text-align: center; 
  .fist-page {
    width: 100%; 
    text-align: center;
    overflow: hidden;
    .main-brand{
      width: 100%;
      padding-top: 1.25rem /* 20/16 */;
      text-align: center;
      .our-logo{
        position: absolute;
        top: .8125rem /* 13/16 */;
        left: 2rem /* 32/16 */;
        line-height: 1.875rem /* 30/16 */;
        text-align: left;
        font-size: 1.25rem /* 20/16 */;
        color: #fff;
        cursor: pointer;
        img{
          vertical-align: -30%;
          height: 2.25rem /* 36/16 */;
          margin-right: 1rem /* 16/16 */;
        }
      }
      .main{
        margin-top: 2.1875rem /* 35/16 */;
        .brand{
          color: #fff;
          display: inline-block;
          // font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 2.25rem /* 36/16 */;
          line-height: 1;
          .text-dot {
            color: #c5a47e;
          }
        }
      }
      .description {
        line-height: 1.7;
        font-size: 1em;
        margin-top: 1.25rem /* 20/16 */;
        margin-left: auto;
        margin-right: auto;
        color: rgba(255,255,255,0.6);
        p{
          margin-bottom: 1.2em;
        }
      }
    }
    .demo-version {
      margin: 1.25rem /* 20/16 */ 0 .625rem /* 10/16 */;
      text-align: center;
      h3{
        margin-top: .9375rem /* 15/16 */;
        margin-bottom: 1.5625rem /* 25/16 */;
      // font-family: oswald,sans-serif;
       font-weight: 400;
      font-size: .9em;
      letter-spacing: .32em;
      text-transform: uppercase;
     }
     figure{
       position:relative;
       .img-responsive{
         display: block;
         width:100%;
       }
     }
     .btn{//font-family:montserratsemibold;
     position:relative;display:inline-block;border-radius:30px;padding:1em 2.1em;font-size:.8em;color:#fff;letter-spacing:.12em;text-transform:uppercase;text-decoration:none;border:.2em solid #fff;-webkit-transition:all .3s ease-out!important;transition:all .3s ease-out!important}
    .btn:hover,.btn:focus{color:#fff;-webkit-box-shadow:none;box-shadow:none;outline:none!important}
     figcaption{position:absolute;top:0;left:0;width:100%;height:100%;
                 background-color:rgba(197,164,126,.9);opacity:0;-webkit-transition:all .5s;-o-transition:all .5s;transition:all .5s}
     }
    figcaption .inner{
      position:absolute;top:50%;width:100%;text-align:center;-webkit-transform:translateY(-50%);
      -ms-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%)
    }
    figure:hover figcaption{
      opacity:1
    }
  }
  @media (min-height: 800px) {
    .fist-page{
      .main{
        padding-top: 6.875rem /* 110/16 */;
        .description{
          margin-top: 3.125rem /* 50/16 */;
        }
      }
      .demo-version{
        margin: 3.75rem /* 60/16 */ 0 1.875rem /* 30/16 */;
      }
    }
  }
  @media (max-width: 750px) {
    .fist-page{
      .main{
        width: 100%;
      }
    }
  }
}
</style>