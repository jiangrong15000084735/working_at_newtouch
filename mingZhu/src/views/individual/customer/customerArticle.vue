<template>
  <mdb-container class="c-myarticle">
  <!-- <div class="c-myarticle">
    <div class="no-article"> -->
      <mdb-row class="text-center contentWrapper">
        <mdb-col  md="4" class="mb-4 artbox article-card artHover" v-for="(item ,index) in NewsList" :key="index">
          <mdb-view class="overlay rounded z-depth-1 artViewBox" style="overflow:visible;">
              <img :src="item.url" alt="sample photo" class="img-fluid" style="height:100%;width:100%;"/>
              <a>
              <mdb-mask waves overlay="white-slight" style="height:100%"/>
              </a>
              <div class="ellipWrapper">
                <img class="dotted" src="@/assets/images/dotted.png"/>
                <div class="tipWrapper text-left">
                  <mdb-view class="overlay rounded z-depth-1 tipbox" style="overflow:visible;">
                    <div class="border-up-empty">
                      <span></span>
                    </div>
                    <div class="tipItem">
                      <a class="dark-grey-text backTipParent"
                      >
                        <mdb-icon class="pl-3 tipIcon" icon="share-alt"/>
                        <span>分享</span>
                      </a>
                    </div>
                    <div class="tipItem"  @click="concernDesigner(item,index)">
                      <a class="dark-grey-text backTipParent"
                      >
                        <mdb-icon class="pl-3 tipIcon" far icon="trash-alt" />
                        <span>删除</span>
                      </a>
                    </div>
                </mdb-view>
                </div>
              </div>
          </mdb-view>
          <mdb-card-body class="px-0 py-0 artCardBody">
              <h4 class="font-weight-bold">{{item.title}}</h4>
              <div class="textWrapper">
                  <p>
                      作者:
                      {{item.subTitle}}
                  </p>
                  <p  class="grey-text comment-num">
                      {{item.createTime.split(" ")[0]}}
                  </p>
              </div>
              <p class="grey-text artTitle" style="">{{item.describe}}</p>
              <mdb-btn outline="primary" class="mx-0 my-0 readMore"  @click="goDetail(item.id)">了解更多</mdb-btn>
          </mdb-card-body>
        </mdb-col>
        <mdb-col md="4" class="text-center mb-4 artbox article-card"  v-if="NewsList.length!=0">
          <mdb-view class="overlay rounded z-depth-1 artViewBox">
              <div class="upAtrWrapper">
                  <img src="@/assets/images/serchArt.png" style="margin-bottom:1.25rem;"/>
                  <mdb-btn size="sm" class="mx-0 my-0 upLoadBtnSm" color="primary" @click="go()">
                      去查找文章
                  </mdb-btn>
              </div>
          </mdb-view>
        </mdb-col>
        <mdb-col md="12" class="text-center noarticle article-card"  v-if="NewsList.length==0">
          <div class="upAtrWrapper">
              <p><mdb-icon class="icon-circle" icon="exclamation-circle" />您还没有收藏任何文章</p>
              <img src="@/assets/images/serchArt.png" style="margin-bottom:1.25rem;"/>
              <mdb-btn class="mx-0 my-0 btn212_60" color="primary" @click="go()">
                  去查找文章
              </mdb-btn>
          </div>
        </mdb-col>
      </mdb-row>
      <mdb-row v-if="total !=0">
        <mdb-col>
          <pagination
            :total="total"
            :pageSize="pageSize"
            @changePage="handleCurrentChange"
            v-if="total !=0"
          ></pagination>
        </mdb-col>
      </mdb-row>
    <!-- </div>
  </div> -->
  </mdb-container>
</template>

<script>
export default {
  name: "cArticle",
  data() {
    return {
      NewsList: [],
      pageSize: 5,
      total: 0,
      currentPage: 1,
      hoverIndex:-1,
      shareHoverIndex:-1
    };
  },
  updated() {
    let tx = document.getElementsByClassName('artTitle');
    for(let jj=0; jj<tx.length; jj++){
      while(tx[jj].offsetHeight < tx[jj].scrollHeight){
        let ss = tx[jj].innerText;
        tx[jj].innerText = ss.substr(0,ss.length-5);
        tx[jj].innerText += `...`;
      }
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        name: "excellentProjectDetails",
        query: {
          id: id
        }
      });
    },
    getCollectedArticles() {
      this.api
        .getCollectedArticles({
          page: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          this.total = res.total;
          this.NewsList = res.rows;
          console.log(res.rows)
        });
    },
    go() {
      const { href } = this.$router.resolve({
        path: "/excellentProject"
      });
      window.open(href, "_blank");
    },
    //分页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getCollectedArticles();
    },
     //关注
    concernDesigner(newsItem,index){
      let params = {
        typeId: newsItem.id
      }
      let isCollect = newsItem.collectedStatus==1?"cancel":"collect"
      this.api.getCollection("article",isCollect,params).then(res => {
        this.getCollectedArticles();
      })
    },
  },
  mounted() {
    this.getCollectedArticles();
  }
};
</script>

<style lang="less" scoped>
.backTipParent{
  display: inline-block;
  position: relative;
}
.backTip{
  background: rgba(0, 0, 0);
  color: #fff;
  padding: 4px;
  font-size: 12px;
  border-radius: 3px;
  position: absolute;
  left: -50%;
  transform: translateX(50%);
  width: 40px;
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
.c-myarticle {
  overflow: hidden;
  background: #ffffff;
  // min-height: 31.25rem;
  min-height: 250px;
  // padding: 10px 18px 0;
  padding-top: 10px;
  
}
.no-article {
    text-align: center;
    font-size: 2.5rem;
    color: #999999;
  }
.post-data {
  border-top: 1px solid #e0e0e0;
}
.post-data.borderTopNone {
  display: none;
}
.jumbotron-right {
  .jumbotron {
    margin-bottom: 4rem;
    box-shadow: none;
    // border-bottom: 1px solid #e0e0e0;
    // margin-bottom: 2rem;
    padding: 0;
    border-radius: 0;
    .card-body {
      padding: 0 20px 20px 20px;
    }
    .card-text {
      text-align: left;
    }
    .overlay {
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
        0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
    }
    .jumbotron-btn {
      background: #fff !important;
      color: #4f4f4f !important;
    }
  }
}
.imgwidth {
  height: 450px;
}

.nav-link {
  display: inline-block;
  cursor: pointer;
  vertical-align: sub;
  img {
    width: 17px;
    height: 17px;
  }
}
.c-myarticle{
  .upAtrWrapper{
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height:100%;
      width: 100%;
      p{
          color:#999;
          font-size:18px;
          line-height:25px;
          padding-bottom:30px;
          .icon-circle{
              font-size:20px;
              color:#e9e9e9!important;
              padding-right:10px;
          }
      }
      .searchBtn{
        width: 212px;
        height: 40px;
        font-size: 18px;
        color: #fff;
        margin-bottom: 32px!important;
      }
    .upLoadBtn{
      margin-top: 10px!important;
      width:212px;
      height:60px;
      line-height:1;
      padding:0!important;
      font-size:18px!important;
      color:#fff!important;
    }
    .upLoadBtnSm{
      margin-top: 10px!important;
      width:110px;
      height:30px;
      line-height:1;
      padding:0!important;
      font-size:18px!important;
      color:#fff!important;
      border-radius: 4px;
    }
  }
  .noarticle{
    margin-bottom:0!important;
    transform: translateY(20%);
    // transform: translateY(70%);//无图片时
  }
  .artbox{
      width: 354px;
      height:458px;
      max-width: 354px;
      box-sizing: content-box;
      padding: 0 16px;
      margin-bottom: 44px!important;
  }
  .artHover:hover{
    .artViewBox{
      transform: translateY(-10px);
      transition: all .3s;
    }
    .ellipWrapper{
      display: inline-block;
    }
  }
  .article-card{
    margin-bottom: 48px !important;
    h4{
        font-size: 24px;
    }
    .read-more{
        width: auto;
        font-size: 12px;
        padding-top: 16px;
        span{
            cursor: pointer;
        }
    }
    .comment-num{
        font-size: 16px;
        i{
            margin: 0 4px 0 8px;
        }
    }
  }
  .artViewBox{
    width: 354px;
    height:238px;
    position: relative;
    .ellipWrapper{
      padding-bottom: 30px;
      display: none;
      position: absolute;
      right: 15px;
      top: 20px;
      font-size: 14px;
      .dotted{
        cursor: pointer;
      }
      .ellipsis-h{
        width: 26px;
        height: 6px;
        line-height: 6px;
        font-size: 25px;
        color: #fff;
      }
      .tipWrapper{
        display: none;
        position: absolute;
        left: -48px;
        top: 23px;
        .tipbox{
          background: #fff;
          padding: 12px 0;
          width: 116px;
          // height: 120px;
          .tipItem{
            line-height: 44px;
            .tipIcon{
              font-size:18px;
              margin-right:10px;
              vertical-align: text-top;
              color: #666;
            }
            span{
              font-size: 14px;
              color: #666;
            }
          }
          .tipItem:hover{
            background: #f2f2f2;
            .tipIcon{
              color:#4285f4;
            }
            span{
              color:#4285f4;
            }
          }
          .border-up-empty{
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            // border-bottom: 10px solid #d9d9d9;
            top: -9px;
            left: 50px;
            position: absolute;
            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
          }
          .border-up-empty span{
            display: block;
            width: 0;height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid #fff;
            position: absolute;
            left: -8px;
            top: 2px;
          }

        }
      }
    }
    .ellipWrapper:hover{
      .tipWrapper{
        display: inline-block;
      }
    }
  }
  .artCardBody{
        overflow-y: visible;
        font-size:14px;
        h4.font-weight-bold{
            color:#333;
            font-size:18px;
            // line-height: 18px;
            padding: 23px 0 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            letter-spacing:1px;
        }
        .textWrapper{
            padding-bottom:28px;
            line-height: 14px;
            font-size: 14px;
            p{
                display:inline-block;
                font-size: 14px;
                // line-height: 14px;
                color:#999!important;
                padding: 0 5px;
                .eye{
                    padding-right: 2px;
                }
            }
        }
        .comment-num{
            font-size: 14px;
            height: 14px;
            color:#999!important;
        }
        .artTitle{
            line-height: 24px;
            font-size: 14px;
            color: #666;
            text-align: justify;
            letter-spacing:1px;
            height:68px;
            word-break: break-all;
            // -webkit-line-clamp: 3; 
            // display: -webkit-box;  
            // -webkit-box-orient: vertical; 
            // overflow: hidden;
            // word-break: break-all;
        }
        .readMore{
            margin-top: 22px!important;
            width:110px;
            height: 30px;
            padding: 0;
            line-height: 30px;
            text-align: center;
            border: none!important;
            font-size: 16px;
            border-radius: 2px;
        }
    }
}
</style>
<style lang="less">
.c-myarticle {
  .imgwidth .img-fluid {
    width: 100%;
    height: 28.125rem;
  }
}
</style>
