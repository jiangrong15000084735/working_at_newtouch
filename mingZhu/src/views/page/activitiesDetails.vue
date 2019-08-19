<template>
  <div class="activitiesDetails">
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
            <div class="card  pd-5 mx-md-3">
              <div class="card-body">
                <div class="container">
                  <h1 class="text-center h1 pt-4 mb-3">
                    <strong>{{details.viewPointTitle}}</strong>
                  </h1>
                  <div class="container-text text-center pt-5" v-html="activityContent"></div>
                  <hr>
                  <div class="latest-news text-left mt-4">
                    <h4 class="font-weight-bold mt-5 mb-3" style='font-size: 1.5rem;'>
                      <strong>| 更多竞赛信息</strong>
                    </h4>
                    <mdb-container class="mt-5">
                      <mdb-carousel v-if="preview && preview.length > 0" :interval="8000" showIndicators multi slide>
                        <mdb-carousel-item
                          v-for="(items, index) in preview"
                          :key="index"
                        >
                          <mdb-row>
                            <mdb-col md="4"
                              v-for='(item,childIndex) in items' 
                              :key="childIndex"
                            >
                              <mdb-card class="mb-2">
                                <mdb-card-image
                                  :src="item.thumbnailPic"
                                  alt="Card image cap"
                                  waves
                                ></mdb-card-image>
                               <mdb-card-body>
                                  <mdb-card-title>
                                    <h4 style='font-size:1.5rem;font-weight: bolder;height:1.75rem;overflow:hidden;'>
                                      <strong>{{item.title}}</strong></h4></mdb-card-title>
                                      <hr>
                                      <p class='font-small font-weight-bold
                                       dark-grey-text mb-1'>
                                       <i class='far fa-clock-o'></i>
                                       {{item.releaseTime}}
                                       </p>
                                       <p class='font-small grey-text mb-0'>
                                         {{item.author}}
                                       </p>
                                    <p class='text-right mb-0 font-small font-weight-bold'>
                                      <a @click="more(item.id)">
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

  </div>
</template>
<script>
export default {
  name: "activitiesDetails",
  data() {
    return {
      id: "",
      details: "",
      activityContent: "",
      preview: ""
    };
  },
  methods: {
    getParams() {
      this.id = this.$route.query.activityId;
      if (this.$route.path == "/activitiesDetails") {
        this.activityDetails(this.id);
      } else {
        this.contestDetail(this.id);
      }
    },
    activityDetails(id) {
      this.api.activityDetails({ id: id }).then(res => {
        this.activityContent = ""
        if(res.data && res.data.content){
          this.details = res.data;
          this.activityContent = res.data.content;
        }
      });
    },
    contestDetail(id) {
      this.api.contestDetail({ id: id }).then(res => {
        this.details = res.data;
        this.activityContent = res.data.content;
      });
    },
    contestPreview(id) {
      this.api.contestPreview({id: id}).then(res => {
        this.preview = res.data
      })
    },
    returnList() {
      if (this.$route.path == "/activitiesDetails") {
        this.$router.push({
          name: "activities"
        });
      } else {
        this.$router.push({
          name: "competition"
        });
      }
    },
    more(id) {
       this.$router.push({
          name: "activitiesDetails",
          query: {
            activityId: id
          }
        });
    }
  },
  mounted() {
    this.getParams();
    this.contestPreview(this.id)
  },
  watch: {
    '$route'(to, from) {
      this.getParams()
      this.contestPreview(this.id)
    }
  }
};
</script>
<style lang="less" scoped>
.activityContent {
  margin: 0.3rem 16%;
  position: relative;
  .activityTitle {
    font: 0.28rem/0.31rem "PingFangHK-Medium";
    color: #333333;
  }
  .time {
    //font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999999;
  }
  .style {
    margin: 0.7rem 0 0.3rem 0 ;
    height: 0.3rem;
    span {
      font-size:0.12rem;
     // font:0.12rem 'PingFangSC-Regular';
      background: #f6f6f6;
      color: #999999;
      letter-spacing: 0.13px;
      border-radius: 5px;
     padding: 0.07rem 0.15rem;
    }
  }
  .activityInfo {
    margin-top: 0.5rem;
    font: 0.16rem/0.3rem;
    color: #666666;
    letter-spacing: 0.18px;
  }
  .return {
    width: 100%;
    text-align: center;
    vertical-align: middle;
  }
  .addMore {
    font-size:0.16rem;
   // font:0.16rem 'PingFangHK-Medium';
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


