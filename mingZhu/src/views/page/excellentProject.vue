<template>
  <div class="excellentProject">
    <mdb-row class="justify-content-center">
      <mdb-col md="11" class="mx-1 mb-3" style="color:#333333;font-size:20px;font-weight:600;">
        合筑视界
      </mdb-col>
      <mdb-col md="2" class="mx-1">
        <mdb-card class="card-body card-left px-0 py-0" style="margin-top: 1rem;">
          <!-- <mdb-card-title>合筑视界</mdb-card-title> -->
          <mdb-list-group>
            <mdb-list-group-item
            style="border-bottom:2px solid #f2f2f2;"
              class="text-left"
              :class="newsType==='0'?'listActive':''"
              @click.native="searchNews('0')"
            >全部</mdb-list-group-item>
            <mdb-list-group-item
              class="text-left"
              :class="newsType=== item.value?'listActive':''"
              @click.native.prevent="searchNews(item.value)"
              v-for="item in typeList"
              :key="item.id"
            >{{item.name}}</mdb-list-group-item>
          </mdb-list-group>
        </mdb-card>
      </mdb-col>
      <mdb-col md="9" class="mt-1 mx-1 ml-4 jumbotron-right" style="margin:0!important;">
        <mdb-jumbotron class="mb-0" v-for="(news,index) in NewsList" :key="news.id">
          <mdb-view class="overlay imgwidth" :src="news.url" alt>
            <mdb-mask waves overlay="white-slight"/>
          </mdb-view>
          <mdb-card-body class="text-center px-0">
            <h3 class="card-title h3 mt-4">
              <strong class="news-title">{{news.title}}</strong>
            </h3>
            <p class="text-center">{{news.updateTime}}</p>
            <p class="card-text py-3" style="font-size:0.875rem;font-weight:400;color:#999;">{{news.describe}}</p>
            <mdb-btn
              size="sm"
              class="jumbotron-btn font-weight-bold"
              rounded
              @click="goDetail(news.id)"
            >了解更多</mdb-btn>
          </mdb-card-body>
          <div class="post-data pb-4 pt-4 grey-text" style="border-top:1px dashed #d9d9d9;" :class="index===0?'borderTopNone':''">
            <h6 style="color: #616161;font-weight: 400;">
              <!-- By
              <a :href="`#/seniorDesignerDetails?id=${news.designerId}`" style="color: #be9656;">{{news.subTitle}}</a> on {{news.updateTime}} -->
             
             
             <mdb-row>
               <mdb-col md="6" class="text-left">
                 发表人:<a :href="`#/seniorDesignerDetails?id=${news.designerId}`" style="color: #4285f4;">{{news.subTitle}}</a>
               </mdb-col>
               <mdb-col md="6" class="text-right">
                  <a class="pl-3 pr-0 py-0 backTipParent"
                    @click="concernDesigner(news)"
                    @mouseover="hoverIndex = index"
                    @mouseout="hoverIndex = -1">
                  <!-- <img
                    v-if="news.collectedStatus!=1"
                    src="@/assets/images/attend.png"
                    @click="concernDesigner(news)"
                    @mouseover="hoverIndex = index"
                    @mouseout="hoverIndex = -1"
                  > -->
                  <mdb-icon far icon="heart" v-if="news.collectedStatus!=1" />
                  <mdb-icon icon="heart" v-else style="color:red;"/>
                  <!-- <img
                    v-else
                    src="@/assets/images/attended.png"
                    @click="concernDesigner(news)"
                    @mouseover="hoverIndex = index"
                    @mouseout="hoverIndex = -1"
                  > -->
                    <div class="backTip" v-if="hoverIndex == index">关注</div>
                </a>
                <a class="dark-grey-text backTipParent"  @mouseover="shareHoverIndex = index"
                    @mouseout="shareHoverIndex = -1">
                  <mdb-icon class="pl-3"  icon="share-alt" />
                  <div class="backTip" v-if="shareHoverIndex == index">分享</div>
                </a>
               </mdb-col>
             </mdb-row>
             

            </h6>
          </div>
        </mdb-jumbotron>
        <!-- 分页插件 传入总页数和请求数据的方法 -->
        <div style="margin-top:2.5rem;">
          <pagination
            v-if="paginationPage.total>0"
            :total="paginationPage.total"
            :pageSize="paginationPage.limit"
            @changePage="changepaginationPage"
          ></pagination>
        </div>
      </mdb-col>
    </mdb-row>
  </div>
</template>

<script>
// import pagination from './pagination'
import { mapGetters } from 'vuex';
export default {
  name: "excellentProject",
  // components: { pagination },
  data() {
    return {
      newsType: 0,
      count: 100, //分页总数
      currentPage: 1, //当前页
      hoverIndex:-1,
      shareHoverIndex:-1,
      typeList: [],
      NewsList: [],
      paginationPage: {
        total: "",
        page: 1,
        limit: 3
      },
      allNewsList: [
        // { id: 'a1gx8gqwe1', type: '10', image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(137).jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'a246718sx2', type: '4', image: 'https://mdbootstrap.com/img/Others/documentation/img%20(1)2-mini.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'd1fgq23we3', type: '2', image: 'https://mdbootstrap.com/img/Others/documentation/3.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'et12238sx4', type: '6', image: 'https://mdbootstrap.com/img/Others/documentation/4.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'f4f456d2d5', type: '2', image: 'https://mdbootstrap.com/img/Photos/Others/gradient1.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'g31dd23as6', type: '1', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/8-col/img%20%28122%29.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: '7jjert34f7', type: '6', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/8-col/img%20%28122%29.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'j8ihh6hkj8', type: '8', image: 'https://mdbootstrap.com/img/Others/documentation/img%20(7)-mini.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'n5dfh45th9', type: '10', image: 'https://mdbootstrap.com/img/Photos/Others/forest2.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'mr5wfse310', type: '10', image: 'https://mdbootstrap.com/img/Others/documentation/img%20(136)-mini.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'vw32fsrg11', type: '2', image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'et12238s12', type: '6', image: 'https://mdbootstrap.com/img/Others/documentation/4.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'f4f456d213', type: '2', image: 'https://mdbootstrap.com/img/Photos/Others/gradient1.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'g31dd23a14', type: '1', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/8-col/img%20%28122%29.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: '7jjert3415', type: '6', image: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/8-col/img%20%28122%29.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'j8ihh6hk16', type: '8', image: 'https://mdbootstrap.com/img/Others/documentation/img%20(7)-mini.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'n5dfh45t17', type: '10', image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(137).jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'mr5wfse318', type: '10', image: 'https://mdbootstrap.com/img/Others/documentation/img%20(136)-mini.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'vw32fsrg19', type: '2', image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: '234hget420', type: '3', image: 'https://mdbootstrap.com/img/Photos/Horizontal/City/8-col/img%20%2848%29.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: '234hget420', type: '9', image: 'https://mdbootstrap.com/img/Photos/Horizontal/City/8-col/img%20%2848%29.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'fw32ger421', type: '5', image: 'https://mdbootstrap.com/img/Photos/Others/gradient1.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'f32et23f22', type: '7', image: 'https://mdbootstrap.com/img/Others/documentation/img%20(141)-mini.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' },
        // { id: 'yh5jdsg423', type: '1', image: 'https://mdbootstrap.com/img/Others/documentation/img%20(137)-mini.jpg', title: 'This is title of the news', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' }
      ]
    };
  },
  computed: {
    // 获取登陆状态
    ...mapGetters([
      'getIsLogin'
    ])
  },
  watch: {},
  methods: {
        // 未登陆处理
    loginHandle() { 
      Bus.$emit("loginBox",'');
      // 调用登陆框
      // this.$refs.login.tabs = 1;
      // this.$refs.login.flag = true;
      // this.$refs.login.loginType = 1
    },
    goDetail(id) {
      this.$router.push({
        name: "excellentProjectDetails",
        query: {
          id: id
        }
      });
    },
    //分页
    changepaginationPage(val) {
      this.paginationPage.page = val;
      this.getexcellentList(this.newsType);
    },
    //获取列表
    getexcellentList(type) {
      this.api
        .getexcellentList({
          buildType: type,
          page: this.paginationPage.page,
          limit: this.paginationPage.limit
        })
        .then(res => {
          console.log(res.data)
          this.NewsList = res.data;
          this.paginationPage.total = res.total;
        });
    },
    //获取title
    getexcellentTypeList() {
      this.api.getexcellentTypeList().then(res => {
        this.typeList = res.data;
      });
    },
    searchNews(type) {
      this.newsType = type;
      this.NewsList = [];
      this.paginationPage.total = 0;
      this.paginationPage.page = 1;
      this.getexcellentList(type);
    },
    //关注
    concernDesigner(newsItem){
      if (!this.getIsLogin) {
        // 未登陆处理
        this.loginHandle();
        return false;
      }
      let params = {
        typeId: newsItem.id
      }
      let isCollect = newsItem.collectedStatus==1?"cancel":"collect"
      this.api.getCollection("article",isCollect,params).then(res => {
        if(res.code == 0){
          newsItem.collectedStatus = newsItem.collectedStatus==0?1:0
        }else{
          this.$message.error(res.msg)
          
        }
      })
    // let flag = item.concernState == 1 ? "0" : "1";
    //   if (item.concernState == 1) {
    //     this.api
    //       .cancelConcernCase({
    //         bossID: this.caseForm.bossId,
    //         caseID: item.id
    //       })
    //       .then(res => {
    //         if (res.code == 0) {
    //           item.concernState = flag;
    //           this.$message(res.msg)
    //         }else{
    //           this.$message(res.msg)
    //         }
    //       });
    //   } else {
    //     this.api
    //       .concernCase({
    //         bossID: this.caseForm.bossId,
    //         caseID: item.id
    //       })
    //       .then(res => {
    //         if (res.code == 0) {
    //           item.concernState = flag;
    //           this.$message(res.msg)
    //         }else{
    //           this.$message(res.msg)
    //         }
    //       });
    //   }
    },
  },
  mounted() {
    // this.NewsList = this.allNewsList
    this.newsType = 0;
    this.getexcellentList(0);
    this.getexcellentTypeList();
  }
};
</script>
<style lang='less' scoped>
.excellentProject {
  padding: 0 6%;
  padding-top: 8rem;
  background: #f5f6f8;
  // background: #fff;
  .card-left {
    margin-top: 0 !important;
    .card-title {
      text-align: center;
      font-weight: 600;
    }
    .list-group-item {
      // justify-content: center!important;
      border: none;
      cursor: pointer;
      // padding: 0.4rem 0;
      font-size: 0.875rem;
    }
    .listActive {
      color: #4699ff;
    }
  }
  .post-data {
    // border-top: 1px solid #e0e0e0;
    // padding-top: 0!important;
  }
  .post-data.borderTopNone {
    // display: none;
  }
  .text-center{
    .card-title{
      .news-title{
        // font-weight:bolder;
        font-size: 1.625rem /* 24/16 */;
      }
    }
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
        padding: 0 1.25rem 1.25rem 1.25rem;
      }
      .card-text {
        text-align: left;
      }
      .overlay {
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
          0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
      }
      .jumbotron-btn {
        padding: .5rem /* 8/16 */ 2.25rem /* 36/16 */;
        background: #fff !important;
        color: #4f4f4f !important;
      }
    }
  }
  .imgwidth{
    height: 49.0625rem;
  }
}
.nav-link{
  display: inline-block;
  cursor: pointer;
  vertical-align: sub;
  img{
    width: 1.0625rem;
    height: 1.0625rem;
  }


}
</style>
<style lang="less">
.excellentProject{
  .jumbotron{
    background: transparent !important;
  }
  .imgwidth .img-fluid{
    width: 100%;
    // height: 28.125rem;
    height: 49.0625rem;
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
    left: -50%;
    transform: translateX(50%);
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
  @media (max-width: 750px) {
    .imgwidth{
      height: auto!important;
      .img-fluid{
        height: auto;
      }
    }
  }
}
</style>

