<template>
  <div class="excellentProjectDetails">
    <div class="banner-image">
      <img
        src="https://mdbootstrap.com/img/Photos/Others/city7.jpg"
        style="height:100%;width:100%;"
      >
    </div>
    <main>
      <div class="container-fluid md-5">
        <div class="row" style="margin-top:-100px;">
          <div class="col-md-12">
            <div class="card hoverable pd-5 mx-md-3">
              <div class="card-body">
                <div class="container">
                  <h1 class="text-center h1 pt-4 mb-3">
                    <strong>{{details.title}}</strong>
                  </h1>
                  <div class="container-text text-left pt-5" v-html="details.context"></div>
                  <hr>
                  <div class="latest-news text-left mt-4">
                    <h4 class="font-weight-bold mt-5 mb-3">
                      <strong>| 最新视界消息</strong>
                    </h4>
                    <mdb-container class="mt-5" v-if=" lists && lists.length>0">
                      <mdb-carousel :interval="8000" showIndicators multi slide>
                        <mdb-carousel-item v-for="latestNotifyLists in lists"  :key="latestNotifyLists.id">
                          <mdb-row>
                            <mdb-col md="4" v-for="lnitem in latestNotifyLists"  :key="lnitem.id" >
                              <mdb-card class="mb-2">
                                <mdb-card-image
                                style="height:14.6rem;overflow:hidden"
                                  :src="lnitem.url"
                                  alt="Card image cap"
                                  waves
                                ></mdb-card-image>
                               <mdb-card-body>
                                  <mdb-card-title>
                                    <h4 style='font-size:1.5rem;height:1.75rem;overflow:hidden'>
                                      <strong> {{lnitem.title}}</strong></h4></mdb-card-title>
                                      <hr>
                                      <p class='font-small font-weight-bold
                                       dark-grey-text mb-1'>
                                       <!-- <i class='far fa-clock-o'></i> -->
                                       {{lnitem.createTime.split(" ")[0]}}
                                       </p>
                                       <p class='font-small grey-text mb-0'>
                                        {{lnitem.subTitle}}
                                       </p>
                                    <p class='text-right mb-0 font-small font-weight-bold'>
                                      <span @click="readMore(`${lnitem.id}`)" class="read-more">
                                         read more
                                        <i class='fas fa-angle-right'></i>
                                      </span>
                                    </p>
                                </mdb-card-body>
                              </mdb-card>
                            </mdb-col>
                          </mdb-row>
                        </mdb-carousel-item>
                      </mdb-carousel>
                    </mdb-container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  name: "excellentProjectDetails",
  data() {
    return {
      id: "",
      details: "",
      lists:null    //最新合筑视界消息
    };
  },
  methods: {
    
    getParmas() {
      this.id = this.$route.query.id;
    },
    getViewPointDetail() {
      this.api.viewPointDetail({ id: this.id }).then(res => {
        this.details = res.data;
      });
    },
    getviewPointLatestNotify(){
       this.api.viewPointLatestNotify({ id: this.id, limit: 3 }).then(res => {
         this.lists = res.data
       })
    },
    readMore(id){
      this.id = id
      if(this.id){
        this.$router.push({
          path: "/excellentProjectDetails",
          query:{id:this.id}
        });
      }
    },
    returnViewsList() {
      this.$router.push({
        path: "/excellentProject"
      });
    }
  },
  mounted() {
    this.getParmas();
    this.getViewPointDetail();
    this.getviewPointLatestNotify()

  },
  updated() {
    let imgs = document.getElementsByTagName('img');
    for(let i = 1; i < imgs.length-1; i++){
      imgs[i].style.width = '100%'
      imgs[i].parentNode.parentNode.style['text-indent']='0'
    }
  },
  watch:{
    $route(to,from){
      this.details = ""
      this.getParmas();
      this.getViewPointDetail();
      this.getviewPointLatestNotify()
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  padding-top: 0;
}
@media only screen and (min-width: 1600px) {
  .excellentProjectDetails {
    max-width: 1200px;
    margin: auto !important;
  }
}
.excellentProjectDetails {
  h4 {
    font-size: 1.5rem;
  }

  .details-content {
    margin: 0.3rem 16%;
    position: relative;
    .details-tips {
      margin: 0.3rem 0;
      height: 0.3rem;
      span {
        font: 0.12rem "PingFangSC-Regular";
        background: #f6f6f6;
        color: #999999;
        letter-spacing: 0.13px;
        margin-right: 0.23rem;
        border-radius: 5px;
        padding: 0.1rem;
      }
    }
    .details-title {
      font: 0.28rem "PingFangHK-Medium";
      color: #333333;
      letter-spacing: 0.31px;
      margin-bottom: 0.4rem;
    }
    .details-context {
      font: 0.16rem "PingFangHK-Regular";
      margin: 0.2rem 0;
      color: #666666;
      letter-spacing: 0.18px;
    }
    .return {
      width: 100%;
      text-align: center;
      vertical-align: middle;
    }
    .return-list {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background-image: linear-gradient(-95deg, #fe7e59 0%, #f5594c 100%);
      color: #ffffff;
      border: 1px solid #fff;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin: 0.2rem auto;
      -webkit-transition: 0.1s;
      transition: 0.1s;
      font-weight: 500;
      font-size: 0.14rem;
      border-radius: 20px;
      padding: 0.12rem 0.23rem;
    }
    .return-list:hover {
      background-image: linear-gradient(-90deg, #f3daa4 6%, #f2cd89 98%);
      color: #333333;
    }
  }
}
.read-more{
  cursor: pointer;
}
</style>


