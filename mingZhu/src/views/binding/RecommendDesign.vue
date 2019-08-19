<template>
  <div class="recommend" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="recommedDesignContent">
      <div class="recommedDesignContentDetails">
        <div class="contentHeader">
          <h2>推荐设计师列表</h2>
          <router-link :to="{path:'/ProcurementPlan',query:{id:projectId}}" v-if="isShow">
            <span>跳过此步骤</span>
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </div>

        <mdb-row v-for="(item,id) in allList" :key="id" class="designer-list align-items-center">
          <mdb-col col="3">
            <img :src="item.head?item.head:headImg" class="header-img">
          </mdb-col>
          <mdb-col col="4">
            <div class="grid-content bg-purple content">
              <p class="designerName" @click="toDesignerDetails(item.id)">{{item.designerSerial}}</p>
              <div class="city">
                <span>{{item.nativePlace}}</span>
                <span class="title">建筑设计师</span>
              </div>
              <span class="describe">{{item.description}}</span>

              <div class="btnTeam clearFiex">
                <div
                  class="addConcern fl"
                  @click="concernDesigner(item)"
                  style="margin-right:0.5rem;"
                >
                  <img src="@/assets/images/attentionBtn.png" v-if="item.concernStatus==0">
                  <img src="@/assets/images/attentedBtn.png" v-else-if="item.concernStatus==1">
                </div>

                <div class="sendInvite fl">
                  <img
                    src="@/assets/images/sendInvite.png"
                    v-if="item.isInvited == 'N'"
                    @click="sendInvite(item)"
                  >
                  <img
                    src="@/assets/images/hasInvited.png"
                    v-if="item.isInvited == 'Y'"
                    @click="sendInvite(item)"
                  >
                </div>
              </div>
              <!-- <span class="skill">{{item.tag}}</span> -->
            </div>
          </mdb-col>
          <mdb-col col="5">
            <mdb-carousel
              :interval="8000"
              showControls
              style="height:10rem;width:15rem;"
              v-if="item.desginerCaseList&&item.desginerCaseList.length>0"
            >
              <mdb-carousel-item
                v-for="(images,index) in item.desginerCaseList"
                :key="index"
                img
                :src="images.pictureUrls"
                @click.native="checkDetails(images)"
                mask="black-light"
                alt="First slide"
              ></mdb-carousel-item>
            </mdb-carousel>
            <!-- <div>
              <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(images,index) in item.desginerCaseList" :key="index">
                  <img :src="images.pictureUrls" @click="checkDetails(images)">
                </swiper-slide>
                <div class="swiper-button-prev swiper-button-white" slot="button-prev">
                  <span class="toLeft"></span>
                </div>
                <div class="swiper-button-next swiper-button-white" slot="button-next">
                  <span class="toRight"></span>
                </div>
              </swiper>
            </div>-->
          </mdb-col>
        </mdb-row>
        <div class="custom-pagination">
          <pagination
            :total="totalCount"
            :pageSize="pageSize"
            @changePage="handleCurrentChange"
            v-if="totalCount !=0"
          ></pagination>
        </div>
        <mdb-row class="selected" v-if="isShow">
          <mdb-col>
            <!-- <router-link class="selectedBtn" :to="{path:'/ProcurementPlan',query:{id:projectId}}">挑选好了,进入下一步</router-link> -->
            <mdb-btn color="primary" block @click="toProcurement">挑选好了,进入下一步</mdb-btn>
          </mdb-col>
        </mdb-row>
        <div class="selecteDesignerMethods">
          <h3 style="font-weight:600;margin-bottom:1rem;">您也可以执行以下操作</h3>
          <mdb-row class="pb-5 justify-content-center">
            <mdb-col col="4">
              <div class="grid-content bg-purple">
                <p>从案例入手查找设计师</p>
                <router-link :to="{path:'/checkCase',query:{id:projectId}}">查看项目案例</router-link>
              </div>
            </mdb-col>
            <mdb-col col="4">
              <div class="grid-content bg-purple-light">
                <p>按照需要的条件筛选设计师</p>
                <router-link :to="{path:'/SearchDesigners',query:{id:projectId}}">查找设计资源</router-link>
              </div>
            </mdb-col>
            <mdb-col col="4">
              <div class="grid-content bg-purple">
                <p>从已关注的设计师中挑选设计师参与项目</p>
                <router-link :to="'/customerConcernDesigner'">我的关注</router-link>
              </div>
            </mdb-col>
          </mdb-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import headImg from "@/assets/images/logo.png";
import { computeArr } from "@/common/computeArr.js";
export default {
  name: "RecommendDesign",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      isShow: true,
      show: false,
      fullscreenLoading: false,
      bossId: "",
      tag: "",
      projectId: "",
      pageSize: 5,
      currentPage: 1,
      totalCount: 0,
      listPage: [],
      allList: [],
      headImg: headImg,
      swiperOption: {
        slidesPerView: 2.6,
        spaceBetween: 20,
        slidesPerGroup: 1,
        freeMode: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  methods: {
    getRecommedDesignnerList() {
      this.fullscreenLoading = true;
      this.api
        .recommendDesignerlist({
          bossId: this.bossId,
          projectId: this.projectId,
          tag: this.tag,
          page: this.currentPage,
          pageSize: 5
        })
        .then(res => {
          if (res.code == 0) {
            console.log(res.total);
            if (res.total != 0) {
              // this.totalCount = res.data.length;
              // this.listPage = computeArr(
              //   this.totalCount,
              //   this.pageSize,
              //   res.data
              // );
              // this.allList = this.listPage[0];
              this.totalCount = res.total;
              this.allList = res.data;
              this.show = true;
            } else {
              this.show = false;
            }
          }
          this.fullscreenLoading = false;
        });
    },
    checkDetails(item) {
      const { href } = this.$router.resolve({
        path: "/CaseDetails",
        query: {
          caseName: item.caseName,
          caseId: item.id
        }
      });
      window.open(href, "_blank");
    },
    toDesignerDetails(id) {
      const { href } = this.$router.resolve({
        path: "/DesignerDetails",
        query: {
          designerId: id
        }
      });
      window.open(href, "_blank");
    },
    concernDesigner(item) {
      this.designerId = item.id;
      let flag = item.concernStatus == 1 ? "0" : "1";
      if (item.concernStatus == 1) {
        this.api
          .cancelConcernDesigner({
            bossID: this.bossId,
            designerID: this.designerId
          })
          .then(res => {
            if (res.code == 0) {
              item.concernStatus = flag;
              this.$message(res.msg);
            }
          });
      } else {
        this.api
          .concernDesigner({
            bossID: this.bossId,
            designerID: this.designerId
          })
          .then(res => {
            if (res.code == 0) {
              item.concernStatus = flag;
              this.$message(res.msg);
            }
          });
      }
    },

    sendInvite(item) {
      let id = item.id;
      if (this.projectId != null) {
        this.invited(item);
      } else {
        this.getProjectArr(id);
      }
    },
    invited(item) {
      this.api
        .saveInviteList({
          designerId: item.id,
          projectId: this.projectId
        })
        .then(res => {
          if (res.code == 0 || res.code == 1) {
            this.$message(res.msg);
            item.isInvited = "Y";
          } else {
            this.$message(res.msg);
          }
        });
    },
    getProjectArr(id) {
      this.projectId = null;
      this.api.goingProject({ bossId: this.userId }).then(res => {
        if (res.projectList.length == 0) {
          this.$confirm("未查找到进行中的项目, 是否需要发布项目?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            center: true
          }).then(() => {
            this.$router.push({ path: "/CommissionedDesign" });
          });
        } else {
          let _arr = res.projectList;
          for (let i = 0; i < _arr.length; i++) {
            _arr[i].checked = false;
            _arr.id = id;
          }
          // _arr.forEach(function(item) {
          //   item.checked = false;
          //   item.id = id;
          // });
          this.projectList = _arr;
          this.centerDialogVisible = true;
        }
      });
    },
    getParams() {
      let type = sessionStorage.getItem("loginType");
      this.bossId =
        type == 1
          ? localStorage.getItem("userId")
          : sessionStorage.getItem("userId");
      // this.tag = this.$route.query.tag;
      this.projectId = this.$route.query.id;

      if (this.$route.query.actives) {
        this.isShow = false;
      }
    },
    // handleCurrentChange: function(currentPage) {
    //   this.allList = this.listPage[currentPage - 1];
    // },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getRecommedDesignnerList();
    },

    toProcurement() {
      this.$router.push({
        path: "/ProcurementPlan",
        query: { id: this.projectId }
      });
    }
  },
  mounted() {
    this.getParams();
    this.getRecommedDesignnerList();
  }
};
</script>
<style lang="less" scoped>
@media only screen and (min-width: 1600px) {
  .recommedDesignContent {
    max-width: 1200px;
    margin: 0.2rem auto !important;
  }
}
.recommend {
  background: #eeeeee;
  overflow: hidden;
  padding-bottom: 3rem;
  .recommedDesignContent {
    background: #fff;
    margin: 0 percentage(250/1920);
    margin-top: 3rem;
    padding: 0 2rem;
    .contentHeader {
      display: flex;
      justify-content: space-between;
      padding: 1rem 0;
    }
    .designer-list {
      border-top: 1px solid #f1f1f1;
      padding: 2rem 0;
      .header-img {
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
      }
    }
    .selecteDesignerMethods {
      margin-top: 2rem;
    }
  }
}
// .recommend {
//   background: #eeeeee;
//   overflow: hidden;
//   padding-bottom:3rem;
//   .recommedDesignContent {
//     background: #fff;
//     margin: 0 percentage(250/1920);
//     margin-top: 3rem;
//     position: relative;
//     top: 0.2rem;
//     overflow: hidden;
//     margin-bottom:0.2rem;
//     .recommedDesignContentDetails {
//       margin: 0 0.8rem;
//       .contentHeader {
//         display: flex;
//         justify-content: space-between;
//         border-bottom: 1px solid #e0e0e0;
//         padding: 0.67rem 0 0.2rem 0;
//         font: 0.28rem "PingFangHK-Medium";
//         color: #333333;
//         position: relative;
//         a {
//           position: relative;
//           color: #f43530;
//           text-decoration: none;
//           display: flex;
//           font: 0.16rem "PingFangHK-Regular";
//           vertical-align: middle;
//           text-align: center;
//           .el-icon-arrow-right {
//             vertical-align: middle;
//             margin-top: 0.05rem;
//           }
//         }
//       }
//       // .mdb-row {
//       //   border-bottom: 1px solid #e0e0e0;
//       //   padding: 0.4rem 0 0.52rem 0;
//       // }
//       .mdb-col-3 {
//         padding-left: 0 !important;
//       }
//       .headPhoto {
//         margin: 0 auto;
//         width: 0.9rem;
//         height: 0.9rem;
//         overflow: hidden;
//         img {
//           width: 100%;
//           display: block;
//           height:100%;
//           border-radius: 100%;
//         }
//       }
//       .designerName {
//         font: 0.2rem "PingFangHK-Medium";
//         color: #333333;
//         cursor: pointer;
//       }
//       .city span,
//       .skill {
//         font: 0.12rem "PingFangHK-Regular";
//         color: #999999;
//       }
//       .title {
//         border-left: 1px solid #e0e0e0;
//         padding-left: 0.06rem;
//       }
//       .describe {
//         display: block;
//         height: 0.53rem;
//         overflow: hidden;
//         font: 0.12rem "PingFangHK-Regular";
//       }
//       .skill {
//         display: block;
//         height: 0.53rem;
//         text-overflow: hidden;
//       }
//       .content {
//         width: 2.22rem !important;
//       }
//       .btnTeam {
//         display: flex;
//         flex-wrap: nowrap;
//         img {
//           cursor: pointer;
//           width: 100%;
//         }
//         .addConcern {
//           margin-right: 0.1rem;
//         }
//       }
//       .swiper-container {
//         // height: 2.26rem;
//         overflow: hidden;
//         height: 1.4rem;
//       }
//       .swiper-slide {
//         display: block;
//         //width: 1.5rem;
//         height: 1.4rem;
//         overflow: hidden;
//         img {
//           width: 100%;
//           height: 100%;
//           cursor: pointer;
//         }
//       }
//       .hiddenBtn {
//         background: rgba(0, 0, 0, 0);
//       }
//       .swiper-button-prev,
//       .swiper-button-next {
//         //height:100%;
//          height: 0.75rem;
//         width: 0.45rem;
//         background-image: none;
//         background-color: rgba(0, 0, 0, 0);
//         position: absolute;
//         top: 50%;
//         margin-top: -0.37rem;
//         background-size: 0.14rem 0.1rem;
//         color: #fff;
//         display: block;
//         span {
//           position: absolute;
//           width: 0.1rem;
//           height: 0.1rem;
//           transform: rotate(45deg);
//           margin: 0.32rem 0.18rem;
//           display: none;
//         }
//       }
//       .swiper-button-prev {
//         left: 1px;
//         .toLeft {
//           border-bottom: 2px solid #d8d8d8;
//           border-left: 2px solid #d8d8d8;
//         }
//       }
//       .swiper-button-next {
//         right: 1px;
//         .toRight {
//           border-top: 2px solid #d8d8d8;
//           border-right: 2px solid #d8d8d8;
//         }
//       }
//       .swiper-button-next:hover,
//       .swiper-button-prev:hover {
//         background-color: rgba(0, 0, 0, 0.6);
//       }
//       .swiper-button-prev:hover .toLeft,
//       .swiper-button-next:hover .toRight {
//         display: block;
//       }

//       .selected {
//         // margin-bottom: 0.7rem;
//         border-bottom: none;
//       }
//       .selectedBtn {
//         width: 100%;
//         font: 0.16rem "PingFangHK-Medium";
//         color: #333333;
//         background-image: linear-gradient(-90deg, #f3daa4 6%, #f2cd89 98%);
//         border-radius: 4px;
//         outline: none;
//         border: 0;
//       }
//       .selectedBtn:hover {
//         background-image: linear-gradient(-95deg, #fe7e59 0%, #f5594c 100%);
//       }
//       h3 {
//         font: 0.28rem "PingFangHK-Medium";
//         color: #333333;
//         padding: 0.2rem 0;
//         border-bottom: 1px solid #e0e0e0;
//       }
//       .selecteDesignerMethods {
//         border-bottom: none;
//         overflow: hidden;
//         margin: 0 !important;
//         // .el-col-8 {
//         //   border: 1px solid #e0e0e0;
//         //   border-right: none;
//         //   height: 1.75rem;
//         //   padding: 0.45rem 0;
//         //   p {
//         //     font: 0.2rem "PingFangHK-Medium";
//         //     color: #333333;
//         //     margin-bottom: 0.22rem;
//         //   }
//         //   a {
//         //     background-image: linear-gradient(-90deg, #f3daa4 6%, #f2cd89 98%);
//         //     box-shadow: 0 3px 12px 0 rgba(196, 167, 92, 0.46);
//         //     border-radius: 16.5px;
//         //     font: 0.12rem "PingFangHK-Medium";
//         //     color: #333333;
//         //     text-decoration: none;
//         //     padding: 0.08rem 0.2rem;
//         //   }
//         //   a:hover {
//         //     background-image: linear-gradient(-95deg, #fe7e59 0%, #f5594c 100%);
//         //     color: #ffffff;
//         //   }
//         // }
//         // .el-col-8:nth-child(3) {
//         //   border-right: 1px solid #e0e0e0;
//         // }
//       }
//     }
//     .el-pagination {
//       margin: 0.2rem auto !important;
//       text-align: center;
//     }
//   }
// }
</style>
<style lang="less">
.recommend {
  .carousel-item {
    .view img {
      height: 10rem;
    }
  }
}
</style>
