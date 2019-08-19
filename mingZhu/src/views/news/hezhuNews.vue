<template>
  <div class="hezhuNews">
    <div class="body">
      <mdb-row style="width:100%;padding:2% 5% 0;">
        <mdb-col md="8">
          <div class="news">
            <h4 class="font-weight-bold title">头条新闻</h4>
            <hr class="red title-hr">
            <mdb-carousel :interval="8000" showControls showIndicators v-if="topNews.length>0" style="margin-top:1rem;height:22rem">
              <mdb-carousel-item
                img
                v-for="item in topNews"
                :key="item.id"
                :src="item.thumbnailPic"
                mask="black-slight"
                :alt="item.newsSubtitle"
                @click.native="newsDetails(item.id)"
                style="cursor: pointer;"
              >
                <mdb-carousel-caption
                  :title="item.newsTitle"
                  :text="item.newsSubtitle"
                ></mdb-carousel-caption>
              </mdb-carousel-item>
            </mdb-carousel>
            <h4 class="font-weight-bold title">合筑相关</h4>
            <hr class="red title-hr">
            <mdb-row v-show="aboutHezhu.length>0" style="max-height:495px;">
              <mdb-col sm="6" v-for="(item,index) in aboutHezhu" :key="item.id" style="margin-top:0;">
                <mdb-card>
                  <mdb-view hover>
                    <mdb-card-image class="aboutHezhu-warpper" :src="item.thumbnailPic" :alt="item.newsTitle"></mdb-card-image>
                    <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                  </mdb-view>
                  <mdb-btn
                    tag="a"
                    floating
                    action
                    class="ml-auto mr-4 mdb-color lighten-3"
                    @click="newsDetails(item.id)"
                  >
                    <mdb-icon icon="chevron-right" class="pl-1"/>
                  </mdb-btn>
                  <mdb-card-body>
                    <mdb-card-title
                      style="font-weight: bolder;font-size: 1.5rem; 
                              white-space: nowrap;
                              overflow: hidden;
                              text-overflow: ellipsis;
                              height:1.75rem;"
                    >{{item.newsTitle}}</mdb-card-title>
                    <hr>
                    <p class="font-small grey-dark-text mb-0 subtitle no-wrap" style="height:2.625rem !important;font-size:0.9rem;">{{item.newsSubtitle}}</p>
                  </mdb-card-body>
                  <mdb-card-footer color="mdb-color" class="lighten-3 p-0 text-center">
                    <ul class="list-unstyled list-inline font-small mt-3">
                      <li class="list-inline-item pr-2 white-text">
                        <mdb-icon far icon="clock" class="pr-1"/>
                        {{item.newsTime.split(" ")[0]}}
                      </li>
                      <!-- lee -->
                      <li class="list-inline-item pr-2">
                        <a class="backTipParent" 
                        @click="cancelNews($event,item)" 
                        @mouseover="hoverIndex = index"
                        @mouseout="hoverIndex = -1">
                          <mdb-icon
                            far
                            icon="heart"
                            class="pr-1"
                            style="color:#fff;"
                            v-if="item.praisedStatus==1"
                          />
                          <mdb-icon
                            icon="heart"
                            class="pr-1 red-text"
                            v-if="item.praisedStatus==0"
                          />{{item.praiseNumber}}
                          <div class="backTip" v-if="hoverIndex == index">点赞</div>
                        </a>
                      </li>
                      <li class="list-inline-item pr-2">
                        <a href="#" class="white-text backTipParent" 
                        @mouseover="shareHoverIndex = index"
                        @mouseout="shareHoverIndex = -1">
                          <mdb-icon icon="share" class="pr-1"/>
                          <div class="backTip" v-if="shareHoverIndex == index">分享</div>
                        </a>
                      </li>
                    </ul>
                  </mdb-card-footer>
                </mdb-card>
              </mdb-col>
            </mdb-row>
            <!-- <div style="width:100%; text-align: center;"> -->
            <pagination
              :total="aboutHezhuPage.total"
              :pageSize="aboutHezhuPage.limit"
              @changePage="changePageAboutHezhuPage"
            ></pagination>
            <!-- </div> -->
            <h4 class="font-weight-bold title">业界动态</h4>
            <hr class="red title-hr">
            <mdb-carousel :interval="8000" showControls showIndicators v-if="dynamicBig.length>0" style="margin-top:1rem;">
              <mdb-carousel-item
                img
                v-for="item in dynamicBig"
                :key="item.id"
                :src="item.thumbnailPic"
                mask="black-slight"
                alt="Third slide"
              >
                <mdb-carousel-caption
                  :title="item.newsTitle"
                  :text="item.newsSubtitle"
                  style="cursor: pointer;"
                  @click.native="newsDetails(item.id)"
                ></mdb-carousel-caption>
              </mdb-carousel-item>
            </mdb-carousel>
            <mdb-row style="min-height:900px;" v-if="dynamic.length>0">
              <mdb-col sm="6" v-for="(item,index) in dynamic" :key="item.id" style="margin-top:2.5rem;">
                <mdb-card>
                  <mdb-view hover>
                    <mdb-card-image  class="aboutHezhu-warpper"  :src="item.thumbnailPic" :alt="item.newsTitle"></mdb-card-image>
                    <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                  </mdb-view>
                  <mdb-btn
                    tag="a"
                    floating
                    action
                    class="ml-auto mr-4 mdb-color lighten-3"
                    @click="newsDetails(item.id)"
                  >
                    <mdb-icon icon="chevron-right" class="pl-1"/>
                  </mdb-btn>
                  <mdb-card-body>
                    <mdb-card-title style="font-weight: bolder;font-size: 1rem;">{{item.newsTitle}}</mdb-card-title>
                    <hr>
                    <p class="font-small grey-dark-text mb-0">{{item.newsSubtitle}}</p>
                  </mdb-card-body>
                  <mdb-card-footer color="mdb-color" class="lighten-3 p-0 text-center">
                    <ul class="list-unstyled list-inline font-small mt-3">
                      <li class="list-inline-item pr-2 white-text">
                        <mdb-icon far icon="clock" class="pr-1"/>
                        {{item.newsTime.split(" ")[0]}}
                      </li>
                      <!-- lee -->
                      <li class="list-inline-item pr-2">
                        <a class="backTipParent" 
                        @click="cancelNews($event,item)" 
                        @mouseover="hoverIndex2 = index"
                        @mouseout="hoverIndex2 = -1">
                          <!-- <mdb-icon :far="item.praisedStatus==1?false:true"  icon="heart" class="pr-1"/> -->
                           <mdb-icon
                            far
                            icon="heart"
                            class="pr-1"
                            style="color:#fff;"
                            v-if="item.praisedStatus==1"
                          />
                          <mdb-icon
                            icon="heart"
                            class="pr-1 red-text"
                            v-else
                          />
                          {{item.praiseNumber}}
                          <div class="backTip" v-if="hoverIndex2 == index">点赞</div>
                        </a>
                      </li>
                      <li class="list-inline-item pr-2">
                        <a href="#" class="white-text backTipParent"  
                        @mouseover="shareHoverIndex2 = index"
                        @mouseout="shareHoverIndex2 = -1">
                          <mdb-icon icon="share" class=" pr-1"/>
                           <div class="backTip" v-if="shareHoverIndex2 == index">分享</div>
                        </a>
                      </li>
                    </ul>
                  </mdb-card-footer>
                </mdb-card>
              </mdb-col>
            </mdb-row>
            <div class="pagemb">
              <pagination
                :total="dynamicPage.total"
                :pageSize="dynamicPage.limit"
                @changePage="changePageDynamicPage"
              ></pagination>
            </div>
          </div>
        </mdb-col>
        <mdb-col md="4">
          <div class="news">
            <h4 class="font-weight-bold title">合筑人物</h4>
            <hr class="red title-hr">
            <mdb-row class="mdb-lightbox" v-if="hezhuPerson.length>0" style="margin-top:1rem;">
              <mdb-col
                class="px-1 py-0"
                md="4"
                @click.native="newsDetails(item.id)"
                v-for="item in hezhuPerson"
                :key="item.id"
              >
                <figure>
                  <img :src="item.thumbnailPic" class="img-fluid" alt>
                </figure>
              </mdb-col>
            </mdb-row>
            <!-- <mdb-lightbox
              :visible="visible"
              :imgs="hezhuPersonList"
              :index="index"
              @hide="handleHide"
            ></mdb-lightbox> -->
            <h4 class="font-weight-bold title">媒体报道</h4>
            <hr class="red title-hr">
            <div class="card card-body lastMb-0 pb-0" v-if="mediaCoverage.length>0">
              <template v-for="(item, index) in mediaCoverage">
                <div class="single-post" :key="item.id" v-if="index < 6">
                  <mdb-row>
                    <mdb-col col="4">
                      <mdb-view :src="item.thumbnailPic" hover>
                        <mdb-mask overlay="white-slight" waves/>
                      </mdb-view>
                    </mdb-col>
                    <mdb-col col="8">
                      <h6 class="mt-0 mb-3">
                        <strong
                          style="font-weight: bolder;font-size: 1rem;cursor: pointer;"
                          @click="newsDetails(item.id)"
                        >{{item.newsTitle}}</strong>
                      </h6>
                      <div class="post-data post-data-grey">{{item.newsTime.split(" ")[0]}}</div>
                    </mdb-col>
                  </mdb-row>
                </div>
              </template>
            </div>
            <h4 class="font-weight-bold title">合筑活动</h4>
            <hr class="red title-hr">
            <div class="card card-body lastMb-0 pb-0" v-if="hezhuActivity.length>0">
              <div class="single-post" v-for="item in hezhuActivity" :key="item.id">
                <mdb-row>
                  <mdb-col col="4">
                    <mdb-view :src="item.thumbnailPic" hover>
                      <mdb-mask overlay="white-slight" waves/>
                    </mdb-view>
                  </mdb-col>
                  <mdb-col col="8">
                    <h6 class="mt-0 mb-3">
                      <strong
                        style="font-weight: bolder;font-size: 1rem;cursor: pointer;"
                        @click="newsDetails(item.id)"
                      >{{item.newsTitle}}</strong>
                    </h6>
                    <div class="post-data post-data-grey">{{item.newsTime.split(" ")[0]}}</div>
                  </mdb-col>
                </mdb-row>
              </div>
            </div>
          </div>
        </mdb-col>
      </mdb-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // hezhuPersonList: [],
      isConcern: true,
      count: 100,
      visible: false,
      hoverIndex:-1,
      shareHoverIndex:-1,
      hoverIndex2:-1,
      shareHoverIndex2:-1,
      index: 1,
      hezhuPerson: [],
      aboutHezhu: [],
      topNews: [],
      dynamicBig: [],
      dynamic: [],
      hezhuActivity: [],
      mediaCoverage: [],
      // bannerImgList: [],
      // newsList: [],
      // isMore: false,
      // total: "",
      aboutHezhuPage: {
        total: "",
        page: 1,
        limit: 2
        // btnNum:1
      },
      dynamicPage: {
        total: "",
        page: 1,
        limit: 4
        // btnNum:1
      }
    };
  },
  methods: {
    cancelNews(event,item){
      console.log(item)
      if(Array.from(event.target.classList).indexOf('far') != -1){
        this.api.watchNews("praise", {id: item.id }).then(res => {
          if(res.code==0){
            event.target.classList.remove('far')
            event.target.classList.add('fas')
            item.praiseNumber+=1;
            this.$message('点赞成功')
          }else{
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      }else{
        this.api.watchNews("cancel", {id: item.id }).then(res => {
          if(res.code==0){
            event.target.classList.remove('fas')
            event.target.classList.add('far')
            item.praiseNumber-=1;
            this.$message('取消成功')
          }else{
            this.$message({
              message: res.msg,
              type: 'warning'
            });
          }
        });
      }
    },
    show(index) {
      console.log(index);
      this.index = index;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
    getAboutHezhuPage() {
      let parmas = {
        page: this.aboutHezhuPage.page,
        limit: this.aboutHezhuPage.limit,
        type: 2
      };
      this.api.newsList(parmas).then(res => {
        console.log(res.news)
        this.aboutHezhu = res.news;
        this.aboutHezhuPage.total = res.total;
      });
    },
    getdynamicPage() {
      let parmas = {
        page: this.dynamicPage.page,
        limit: this.dynamicPage.limit,
        type: 6,
        typeBigPhoto: 0
      };
      this.api.newsList(parmas).then(res => {
        this.dynamic = res.news;
        this.dynamicPage.total = res.total;
      });
    },
    getdynamicBigPage() {
      let parmas = {
        page: this.dynamicPage.page,
        limit: this.dynamicPage.limit,
        type: 6,
        typeBigPhoto: 1
      };
      this.api.newsList(parmas).then(res => {
        this.dynamicBig = res.news;
        // this.dynamicPage.total = res.total;
      });
    },
    getNewsList(val) {
      this.topNews = [];
      let parmas = {
        page: 1,
        limit: 9,
        type: val
      };
      this.api.newsList(parmas).then(res => {
        switch (val) {
          case 1:
            this.topNews = res.news;
            break;
          case 3:
            this.hezhuPerson = res.news;
            // console.log(this.hezhuPersonList);
            break;
          case 4:
            this.mediaCoverage = res.news;
            break;
          case 5:
            this.hezhuActivity = res.news.slice(0,6);
            break;
        }
        // this.total = res.total;
        // if (this.total > this.total) {
        //   this.isMore = true;
        // }
      });
    },
    changePageAboutHezhuPage(val) { 
      this.aboutHezhuPage.page = val;
      this.getAboutHezhuPage();
    },
    changePageDynamicPage(val) {
      this.dynamicPage.page = val;
      this.getdynamicPage();
    },
    newsDetails(id) {
      console.log(id)
     const { href } = this.$router.resolve({
            path: "/newsDetails",
            query: {
              id: id
            }
          });
          window.open(href, "_blank");
    }
  },
  mounted() {
    this.getNewsList(1);
    // this.getAboutHezhuPage();
    this.getNewsList(3);
    this.getNewsList(4);
    this.getNewsList(5);
    this.getNewsList(6);
    this.getdynamicBigPage();
  }
};
</script>
<style lang="less" scoped>

.hezhuNews{
  background: #f7f7f7;
}
.post-data-grey{
  color: grey;
}
.news {
  padding: 1rem 1rem 0 1rem;
  // height: 5rem;
  // background: #f5f5f5;
  .title {
    margin-top: 2rem;
    font-size: 1.5rem;
  }
  hr {
    border-top: 2px solid rgba(0, 0, 0, 0.1);
  }
  ul {
    margin-bottom: 1rem;
  }
  .subtitle {
    height: 1.5rem;
    overflow: hidden;
  }
  .pagination {
    margin-top: 1rem;
  }
  .single-post {
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
  }
  .carousel-inner {
    height: 500px;
  }
  strong {
    font-weight: bolder;
    font-size: 1.5rem;
  }
}
.carousel-fade .carousel-item {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 22rem;
    display: block !important;
    opacity: 0;
    z-index: 0;
    -webkit-transition: opacity 0.8s ease-out, -webkit-transform 0ms ease-in-out;
    transition: opacity 0.8s ease-out, -webkit-transform 0ms ease-in-out;
    transition: transform 0ms ease-in-out, opacity 0.8s ease-out;
    transition: transform 0ms ease-in-out, opacity 0.8s ease-out, -webkit-transform 0ms ease-in-out;
}
.news .single-post:last-child {
  border: none;
}
.mdb-lightbox figure img {
    // cursor: -webkit-zoom-in;
    cursor: pointer;}
.lastMb-0 .single-post:last-child{
  margin-bottom: 0;
}
.no-wrap{ 
  overflow: hidden; 
  -webkit-line-clamp:2;
  display: -webkit-box;
  -webkit-box-orient:vertical;
}
.red-text{
  color: red;
}
</style>
<style lang="less">
.carousel-item .view{
  height: 100% !important;
  img{
    height: 100%;
  }
}
  .aboutHezhu-warpper {
    width: 100%!important;
    height: 15rem!important;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .backTipParent{
  display: inline-block;
  position: relative;
}
.backTip{
  background: rgba(0, 0, 0);
  color: #fff;
  padding: 0.25rem;
  font-size: 0.75rem;
  border-radius: 3px;
  position: absolute;
  left: 0%;
  transform: translateX(-40%);
  width: 2.5rem;
  display: inline;
  text-align: center;
  z-index: 10;
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
  .hezhuNews{
    .carousel-fade{
      .carousel-item.active {
        position: relative!important;
        z-index: 1!important;
        opacity: 1!important;
      }
      .carousel-item{
        .carousel-caption{
          .h3-responsive{
            // text-overflow: ellipsis;
            // display: -webkit-box;
            // -webkit-line-clamp: 2;
            // -webkit-box-orient: vertical;
            max-height: 4rem;
            overflow: hidden;
          }
          p{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }

</style>

