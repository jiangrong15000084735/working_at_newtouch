<template>
  <mdb-container>
    <mdb-row v-if="caseDetail.length==0" class="no-designer justify-content-md-center">
      <mdb-col md="12" class="text-center">
        <p class="h2" style="color:#999;">您还没有喜欢的作品</p>
        <div class="no-button">
          <mdb-btn color="primary" @click="go()">查看作品</mdb-btn>
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="justify-content-md-center" v-if="caseDetail.length > 0">
      <mdb-col md="10">
        <mdb-row>
          <mdb-col md="6" class="mb-4 text-center" v-for="(item,index) of caseDetail" :key="item.id">
            <div class="img-wrap ripple-parent waves-effect waves-light"  style="height:22.513rem;overflow:hidden">
              <img class="img-fluid" :src="item.pictureUrls" @click="geDetail(item.id)" alt="案例图片">
            </div>
            <h6 class="mb-3 mt-3 font-weight-bold">
              <span class="teal-text text-center text-uppercase font-small">{{item.designerSerial}}</span>
              <span class="grey-text font-small"> - {{item.finishTime}}</span>
            </h6>
            <div class="mb-3">
              <h4 class="title">{{item.caseName}}</h4>
            </div>
            <p  class="text-justify description">{{item.caseDetail}}</p>
            <hr class="pb-0 mb-0">
            <a class="nav-link backTipParent"
              @mouseover="hoverIndex = index" 
              @mouseout="hoverIndex = -1"
            > 
              <mdb-icon far icon="thumbs-up" @click.native='praise(item)' v-show='item.praisedStatus==0'/>
              <mdb-icon icon="thumbs-up"  @click.native='cancelPraise(item)' v-show='item.praisedStatus==1'/>
              <small>{{item.praiseCount}}</small>
              <div class="backTip2" v-if="hoverIndex == index">点赞</div>
            </a>
            <a class="nav-link backTipParent"
              @mouseover="shareHoverIndex = index"
              @mouseout="shareHoverIndex = -1"
            >
              <mdb-icon v-show="item.concernState == 0"
                        @click.native="cancelConcernCase(item)" far icon="heart"></mdb-icon>
              <mdb-icon v-show="item.concernState == 1"
                        @click.native="cancelConcernCase(item)" icon="heart" style="color:#F44444;"></mdb-icon>
              <div class="backTip" v-if="shareHoverIndex == index">关注</div>
            </a>
            <hr class="pb-0 mt-0">
          </mdb-col>
        </mdb-row>
      </mdb-col>
    </mdb-row>
    <mdb-row v-if="total!=0">
      <mdb-col md="12">
        <pagination :total="total" :pageSize="pageSize" @changePage="handleCurrentChange" ></pagination>
      </mdb-col>
    </mdb-row>
  </mdb-container>
  <!-- <div class="p-body" v-loading="loading">
    <div class="body-detail">
      <div v-if="caseDetail.length==0" class="no-designer">
        <div>您还没有喜欢的作品</div>
        <div class="no-button">
          <mdb-btn color="primary" @click="go()">查看作品</mdb-btn>
        </div>
      </div>
      <div class="card col-lg-10">
          <div class="listMenu">
            <section class="section text-center">
              <div class="row pt-3 text-center" v-if="caseDetail.length > 0">
                <div class="col-md-6 mb-4" v-for="(item,index) of caseDetail" :key="item.id">
                  <div class="img-wrap ripple-parent waves-effect waves-light"  style="height:22.513rem;overflow:hidden">
                    <img class="img-fluid" :src="item.pictureUrls" @click="geDetail(item.id)" alt="案例图片">
                  </div>
                  <h6 class="mb-3 mt-3 font-weight-bold">
                    <span class="teal-text text-center text-uppercase font-small">{{item.designerSerial}}</span>
                    <span class="grey-text font-small"> - {{item.finishTime}}</span>
                  </h6>
                  <div class="mb-3">
                    <h4 class="title">{{item.caseName}}</h4>
                  </div>
                  <p  class="text-justify description">{{item.caseDetail}}</p>
                  <hr class="pb-0 mb-0">
                  <a class="nav-link backTipParent"
                    @mouseover="hoverIndex = index" 
                    @mouseout="hoverIndex = -1"
                  > 
                    <mdb-icon far icon="thumbs-up" @click.native='praise(item)' v-show='item.praisedStatus==0'/>
                    <mdb-icon icon="thumbs-up"  @click.native='cancelPraise(item)' v-show='item.praisedStatus==1'/>
                    <small>{{item.praiseCount}}</small>
                    <div class="backTip2" v-if="hoverIndex == index">点赞</div>
                  </a>
                  <a class="nav-link backTipParent"
                    @mouseover="shareHoverIndex = index"
                    @mouseout="shareHoverIndex = -1"
                  >
                    <mdb-icon v-show="item.concernState == 0"
                              @click.native="cancelConcernCase(item)" far icon="heart"></mdb-icon>
                    <mdb-icon v-show="item.concernState == 1"
                              @click.native="cancelConcernCase(item)" icon="heart" style="color:#F44444;"></mdb-icon>
                    <div class="backTip" v-if="shareHoverIndex == index">关注</div>
                  </a>
                  <hr class="pb-0 mt-0">
                </div>
              </div>
            </section>
          </div>
      </div>
      <div class="block" v-if="total!=0">
        <pagination :total="total" :pageSize="pageSize" @changePage="handleCurrentChange" ></pagination>
      </div>
    </div>
  </div> -->
</template>
<script>
export default {
  data() {
    return {
      bossId:'',
      pageSize: 8,
      total: 0,
      currentPage: 1,
      loading: false,
      caseDetail: [],
      seniorInfo: {
        page: 1,
        pageSize: 8
      },
      hoverIndex:-1,
      shareHoverIndex:-1
    };
  },
  methods: {
    praise(item){ 
      item.praisedStatus=1
      // 点赞
       this.api.getAddPraise({
         id:item.id 
         }).then(res=>{
         if(res.code==0){
           item.praiseCount+=1
           item.praisedStatus=1
           this.$message(res.msg)
         }else{
           item.praisedStatus=0
            this.$message(res.msg)
         }
       }) 
    },
    // 取消点赞
    cancelPraise(item){ 
      item.praisedStatus=0
       this.api.cancelAddPraise({
         id:item.id
       }).then(res=>{
         if(res.code==0){ 
              item.praiseCount-=1
              item.praisedStatus=0
              this.$message(res.msg)
         }else{
           item.praisedStatus=1
             this.$message(res.msg)
           }
       })
    },
    handleSizeChange(val) {
      if (val == undefined || val == 0) {
        this.pageSize = 12;
      } else {
        this.pageSize = val;
      }
      this.seniorInfo.pageSize = this.pageSize;
      this.getCaseList();
    },
    handleCurrentChange(val) {
      if (val == null || val == 0) {
        this.currentPage = 1;
      } else {
        this.currentPage = val;
      }
      this.seniorInfo.page = this.currentPage;
      this.getCaseList();
    },
    go() {
      const { href } = this.$router.resolve({
        path: "/CheckCase"
      });
      window.open(href, "_blank");
    },
    geDetail(val) {
      const { href } = this.$router.resolve({
        path: "/CaseDetails",
        query: {
          caseId: val
        }
      });
      window.open(href, "_blank");
    },
    cancelConcernCase(item) { 
        let flag = item.concernState == 1 ? "0" : "1";
        if (item.concernState == 1) {
          this.api
            .cancelConcernCase({
              bossID: this.bossId,
              caseID: item.id
            })
            .then(res => {
              if (res.code == 0) {
                item.concernState = flag;
                this.getCaseList();
                this.$message(res.msg)
              }else{
                this.$message(res.msg)
              }
            });
        } else {
          this.api
            .concernCase({
              bossID: this.bossId,
              caseID: item.id
            })
            .then(res => {
              if (res.code == 0) {
                item.concernState = flag;
                this.$message(res.msg)
              }else{
                this.$message(res.msg)
              }
            });
        }
      },
    getCaseList() {
      // this.loading = true;
      this.api
        .caseList({
          page: this.seniorInfo.page,
          pageSize: this.seniorInfo.pageSize
        })
        .then(res => {
          this.caseDetail = res.data;
          this.total = res.total;
          // this.loading = false;
        });
    },
    getParmas(){
      this.bossId?sessionStorage.getItem("userId"):localStorage.getItem("userId")
    }
  },

  mounted() {
    this.getParmas();
    this.getCaseList();
  }
};
</script>
<style lang='less' scoped>
// @media only screen and (min-width: 1600px) {
//   .body-detail {
//     max-width: 1200px;
//     margin: 1.25rem auto !important;
//   }
// }
.p-body {
  background-color: #f5f5f5;
  overflow: hidden;
  
  .body-detail {
    overflow: hidden;
    margin: 1.25rem 10%;
    min-height: 31.25rem;
    .nav-link{
      display:inline-block;
     cursor :pointer;
    }
    .description{
    font-size: 0.87rem;
    line-height: 1.5rem;
    font-weight: 400;
    color: #4f4f4f;
    /* margin-bottom: 4rem; */
    height: 6rem;
    overflow:hidden;
    }
                
  }
  .no-designer {
    text-align: center;
    font-size: 2.5rem;
    color: #999999;
    .no-button {
      height: 10rem;
    }
  }
}
.designer-card {
  text-align: left;
  cursor: pointer;
  // margin: 20px;
  // width: 80%;
  margin-top: 0.625rem;
  min-height: 18.75rem;
  background: #fff;
  border-radius: 0.3125rem;
}
.case-img {
  border-top-left-radius: 0.3125rem;
  border-top-right-radius: 0.3125rem;
  width: 100%;
  height: 12.8125rem;
  overflow: hidden;
}
.case-img img {
  border-top-left-radius: 0.3125rem;
  border-top-right-radius: 0.3125rem;
  width: 100%;
  height: 100%;
}
.case-name {
  height: 1.25rem;
  margin-top: 1rem;
  margin-left: 0.625rem;
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
}
.case-type {
  height: 1.25rem;
  margin-top: 0.3125rem;
  margin-left: 0.625rem;
  text-align: left;
  font-size: 0.75rem;
  color: #ababab;
}
.case-button {
  height: 1rem;
  line-height: 1rem;
  font-size: 0.75rem;
  color: #999999;
  margin-top: 0.625rem;
  margin-bottom: 1.25rem;
  margin-left: 0.625rem;
  padding: 0;
  img {
    width: 0.75rem;
  }
  // span {
  //   font-size: 0.12rem;
  // }
}
.designer-detail {
  padding: 1rem 0;
  font-size: 0.75rem;
  padding-left: 0.625rem;
  overflow: hidden;
  height: 1.875rem;
  text-align: left;
  border-top: 0.005rem solid #e0e0e0;
}
.designer-detail img {
  vertical-align: middle;
  display: inline-block;
  width: 1.875rem;
  height: 1.875rem;
  border-radius: 100%;
}
.designer-name {
  vertical-align: middle;
  display: inline-block;
}
.designer-time {
  color: #ababab;
  text-align: right;
  vertical-align: middle;
  display: inline-block;
}
.block {
  margin-top: 3.75rem;
}
.edit-button {
  margin: 15.625rem auto;
  border: 0px;
  background-image: linear-gradient(-90deg, #f3daa4 6%, #f2cd89 98%);
  border-radius: 2.25rem;
  padding: 0.75rem 1.875rem;
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
  transform: translateX(70%);
  width: 2.5rem;
  display: inline;
  text-align: center;
  z-index: 10;
}
.backTip2{
  background: rgba(0, 0, 0);
  color: #fff;
  padding: 0.25rem;
  font-size: 0.75rem;
  border-radius: 3px;
  position: absolute;
  left: -50%;
  transform: translateX(90%);
  width: 2.5rem;
  display: inline;
  text-align: center;
  z-index: 10;
}
	.backTip:before,.backTip2:before{
    content: ' ';
    border-bottom: 5px solid rgba(0, 0, 0);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>