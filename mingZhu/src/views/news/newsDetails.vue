<template>
  <div class="newsDetails">
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
            <div class="card  pd-5 mx-md-3" > 
              <!-- hoverable -->
              <div class="card-body">
                <div class="container">
                  <h1 class="text-center h1 pt-4 mb-3">
                    <strong>{{details.newsTitle}}</strong>
                  </h1>
                  <div class="container-text text-center pt-5" style="text-align: left !important;" v-html="newsDetails"></div>
                  <hr>
                  <div class="latest-news text-left mt-4">
                    <h4 class="font-weight-bold mt-5 mb-3" v-if='newsList.length>0'>
                      <strong>| 您也许会喜欢这些</strong>
                    </h4>
                    <mdb-carousel :interval="8000" showIndicators multi slide v-if="newsList.length>0">
                      <mdb-carousel-item v-for='(items,index) in newsList' :key='index'>
                        <mdb-row>
                          <mdb-col md="4" v-for='item in items' :key="item.id">
                            <mdb-card class="mb-2">
                              <mdb-card-image
                              class="imgHeight"
                              :src='item.thumbnailPic'
                                alt="Card image cap"
                                waves
                                @click="newsDetail(item.id)"
                              ></mdb-card-image>
                              <mdb-card-body>
                                <mdb-card-title>
                                  <h4 style='font-size:1.5rem;height:1.75rem;overflow:hidden;'>
                                    <strong>{{item.newsTitle}}</strong></h4>
                                    </mdb-card-title>
                                    <hr>
                                    <p class='font-small font-weight-bold
                                      dark-grey-text mb-1'>
                                      {{item.newsTime |formatDate }}
                                      </p>
                                      <p class='font-small grey-text mb-0'>
                                      {{item.newsAuthor}}
                                      </p>
                                  <p class='text-right mb-0 font-small font-weight-bold'
                                    @click="newsDetail(item.id)">
                                    <a>
                                      read more
                                      <i class='fas fa-angle-right'></i>
                                    </a>
                                  </p>
                              </mdb-card-body>
                            </mdb-card>
                          </mdb-col>
                        </mdb-row>
                      </mdb-carousel-item>
                    </mdb-carousel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  </div>
</template>
 
<script>
export default {
  components: {},
  data() {
    return {
      newsId: "",
      details: "",
      newsDetails: "",
      picture: [],
      newsList:[],
    };
  },
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
    getParams() {
      this.newsId = this.$route.query.id;
      this.getNewsDetail(this.newsId);
    },
    getNewsDetail(id) {
      this.api.newsDetail({ id }).then(res => {
        this.details = res.data;
        this.newsDetails = res.data.newsDetails;
      });
    },
    newsDetail(id){
      this.$router.push({
        name:'newsDetails',
        query:{
          id:id
        }
      })
    },
    getLastNews(){
      this.api.getLastNews({id: this.newsId}).then(res=>{
        this.newsList=res.data
    })
     }
  },
  mounted() {
    this.getParams();
    this.getLastNews(); 
  },
  updated() {
    let imgs = document.getElementsByTagName('img');
    for(let i = 1; i < imgs.length-1; i++){
      imgs[i].style.width = '100%'
      imgs[i].parentNode.parentNode.style['text-indent']='0'
    }
  },
  watch: {
    $route(to,from){
      this.details = "";
      this.getParams();
      this.getLastNews();
    }
  }
};
</script>
<style lang="less" scoped>
 @media only screen and (min-width: 1600px) {
  .newsDetails{
   max-width:1200px;
   margin:2% auto !important;
  }
  }
.newsContent {
  margin: 0.3rem 16%;
  position: relative;
  .newsTitle {
    font: 0.28rem/0.31rem "PingFangHK-Medium";
    color: #333333;
  }
  .time {
    font:0.12rem 'PingFangSC-Regular';
    color: #999999;
  }
  .newsStyle {
      margin: 0.7rem 0 0.3rem 0 ;
    height: 0.3rem;
    span {
    font:0.12rem 'PingFangSC-Regular';
      background: #f6f6f6;
      color: #999999;
      letter-spacing: 0.13px;
      border-radius: 5px;
     padding: 0.07rem 0.15rem;
    }
  }
  .newsInfo {
    margin-top: 0.5rem;
    font: 0.16rem/0.3rem "PingFangHK-Regular";
    color: #666666;
    letter-spacing: 0.18px;
  }
  .return {
    width: 100%;
    text-align: center;
    vertical-align: middle;
  }
  .return-list {
    font:0.16rem 'PingFangHK-Medium';
    width:1.9rem;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
   background-image: linear-gradient(-136deg, #FF7034 0%, #FF3D3D 100%);
    color: #ffffff;
    border: 1px solid #fff;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin:1.2rem auto;
    border-radius: 20px;
    padding: 0.2rem 0.8rem;
  }
}
</style>
<style lang="less">
.newsDetails{
  .imgHeight{
    img{
      height: 246px;
    }
  }
}
</style>


