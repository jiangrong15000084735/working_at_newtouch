<template>
    <mdb-container class="caseDetails" style="width:100%; padding: 3.7rem 0;background-color:#fff;" 
  v-loading.fullscreen.lock="fullscreenLoading">
      <mdb-row>
        <div class="col-md-2" v-show="designId==bossId"></div>
        <div class="col-md-8">
          <div class="grid-content bg-purple">
            <div class="caseContent">
              <h1 class="caseTitle">{{details.caseName}}/{{details.designerSerial}}</h1>
              <div v-if="picture.length>0" class="case-img-warp" :class="casePicLen>4?'startLeft':''">
                <mdb-carousel :interval="8000" showControls showIndicators thumbnails>
                  <mdb-carousel-item
                    rounded
                    @click.native="toPicturePage(item.name)"
                    img
                    :src="item.img"
                    :thumbnail="item.img"
                    v-for="(item,index) in picture"
                    :key="index"
                  >
                  </mdb-carousel-item>
                </mdb-carousel>
                <div class="add-pic" v-if="casePicLen>4">
                  <div class="add-pic-mask" @click="goCasePic">
                    <img :src="addPic">
                    <div>+{{casePicLen-4}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="detailmsg" style="margin-top:1.5rem">
            <p>
              <span class="name">建筑师</span>
              <b>:</b>
              <span class="con">{{details.designerSerial}}</span>
            </p>
            <p>
              <span class="name">地点</span>
              <b>:</b>
              <span class="con">{{details.constructionSite}}</span>
            </p>
            <p>
              <span class="name">类别</span>
              <b>:</b>
              <span class="con">{{details.buildingType}}</span>
            </p>
            <p>
              <span class="name">建筑面积</span>
              <b>:</b>
              <span class="con">{{details.coveredArea}}m²</span>
            </p>
            <p>
              <span class="name">建筑时间</span>
              <b>:</b>
              <span class="con">{{details.finishTime}}</span>
            </p>
            <p class="text-justify">
              <span class="name">作品描述</span>
              <b>:</b>
              <span class="con">{{details.caseDetail}}</span>
            </p>
          </div>

          <!-- 案例图片文字 -->
          <div class="case-img-box" style="margin-top:1.5rem" v-show="details.isRichText!=1">
            <div v-for="(item,index) in caseDetialPic" :key="index">
              <div>
                <img :src="item.img" style="width:100%;">
              </div>
              <div class="case-con">
                {{item.pictureDetail}}
              </div>
            </div>
          </div>
          <div class="case-img-box" style="margin-top:1.5rem"  v-show="details.isRichText==1">
            <div class="richTextWrapper" v-html="details.richText"></div>
          </div>
          <!-- 热门案例 -->
          <div class="remen-case" v-show="designId!=bossId" style="margin-top:2rem;">
            <h2 class="afd-title-widget remen-case-title">热门案例</h2>
            <mdb-container>
              <mdb-row>
                <mdb-col
                  col="4"
                  style="padding-left:0;padding-right:3%;"
                  @click.native="viewCase(`${item.id}`)"
                  v-for="(item,index) in hotpropDesign"
                  :key="index"
                >
                  <figure class="figure hot-case-warp">
                    <img
                      :src="item.hotthumbnails"
                      class="figure-img img-fluid z-depth-1"
                      alt="..."
                      style="width:100%;height:12.5rem;"
                    >
                    <figcaption class="figure-caption hot-case-name">{{item.hotcaseName}}</figcaption>
                  </figure>
                </mdb-col>
              </mdb-row>
            </mdb-container>
            <div class="more-houses" style="padding-right:3%;">
              <span @click.stop="goCaseListPage">更多»</span>
            </div>
          </div>
        </div>

        <div class="col-md-4" v-show="designId!=bossId" style="padding-top:2.5rem">
          <!-- 相似案例 -->
          <div class="like-case">
            <h2 class="mytit mb-0">相似案例</h2>
            <div>
              <div
                @click.stop="viewCase(`${item.id}`)"
                class="propDesign picturetitle clearfix"
                v-for="(item,index) in propDesign"
                :key="index"
              >
                <img
                  :src="item.thumbnails"
                  style="width:100px;height:100px;margin-right:1rem;"
                  class="thumbnailsimg fl"
                >
                <div class="lefttit">
                  <h3>{{item.caseName}}</h3>
                </div>
              </div>
            </div>
            <div class="more-houses">
              <span @click.stop="goCaseListPage">更多»</span>
            </div>
          </div>
        </div>
      </mdb-row>
      <!-- <div class="invite-dialog">
        <el-dialog title="项目列表" :visible.sync="centerDialogVisible" width="30%" center>
          <span>
            <el-checkbox-group v-model="projectId" :max="1">
              <el-checkbox
                v-for="item in projectList"
                :key="item.projectId"
                :true-label="item.projectId"
                false-label
                :checked="item.checked"
                @change="getProjectId(item)"
              >{{item.projectName}}</el-checkbox>
            </el-checkbox-group>
          </span>
        </el-dialog>
      </div> -->
    </mdb-container>
</template>
<script>
import {
  mdbCarousel,
  mdbCarouselItem,
  mdbCarouselCaption,
  mdbRow,
  mdbIcon,
  mdbBtn,
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbCol,
  mdbBadge
} from "mdbvue";
export default {
  name: "ThumbnailsCarouselPage",
  components: {
    mdbCarousel,
    mdbCarouselItem,
    mdbCarouselCaption,
    mdbRow,
    mdbIcon,
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbCol,
    mdbBadge
  },
  data() {
    return {
      hide: false,
      centerDialogVisible: false,
      id: "",
      bossId: "",
      details: "",
      picture: [],
      caseDetialPic: [],
      isShow: false,
      originImg: "",
      headImg: "",
      projectId: "",
      projectIdList: "",
      isInvited: "",
      projectList: [],
      propDesign: [],
      hotpropDesign: [],
      hotDesginerCaseDOList: [],
      //thumbnails:"",
      //thumbnails:true

      addPic: "",
      addPicName: "",
      casePicLen: 0,
      designId:'',

      fullscreenLoading: false
    };
  },
  methods: {
    goCaseListPage() {
      this.$router.push({
        path: "/checkCase",
        query: {
          caseId: this.$route.query.caseId // 项目id
        }
      });
    },
    goCasePic() {
      this.toPicturePage(this.addPicName);
    },
    toPicturePage(name) {
      const { href } = this.$router.resolve({
        path: "/casePicture",
        query: {
          name: name, // 案例名称
          id: this.$route.query.caseId // 项目id
        }
      });
      window.open(href, "_blank");
    },

    getpropDesigner() {
      let id = this.$route.query.caseId;
      this.api.getpropDesignerCaseDOList({
          id: id
          // bossId: this.bossId
        })
        .then(res => {
          let propDesign = res.data.propDesignerCaseDOList;
          let hotpropDesign = res.data.hotDesginerCaseDOList;

          for (var j = 0; j < propDesign.length; j++) {
            var obj = {};

            obj.thumbnails = propDesign[j].thumbnails;
            obj.caseName = propDesign[j].caseName;
            obj.pictureUrls = propDesign[j].pictureUrls;
            obj.id = propDesign[j].id;
            this.propDesign.push(obj);
          }
          for (var m = 0; m < hotpropDesign.length; m++) {
            var hotobj = {};

            hotobj.hotthumbnails = hotpropDesign[m].thumbnails;
            hotobj.hotcaseName = hotpropDesign[m].caseName;
            hotobj.pictureUrls = hotpropDesign[m].pictureUrls;
            hotobj.id = hotpropDesign[m].id;
            this.hotpropDesign.push(hotobj);
          }
        });
    },

    getCaseDetails() {
      this.fullscreenLoading = true
      let id = this.$route.query.caseId;
      this.api
        .getCaseDetails({
          id: id,
          bossId: this.bossId
        })
        .then(res => {
          if(res.code==0){
            this.details = res.data.desginerCase;
            this.designId = res.data.desginerCase.designerId
            this.headImg = res.data.head;
          if (this.$route.query.projectId == null) {
            this.isInvited = "N";
          } else {
            this.isInvited = res.data.isInvited;
          }
          let name = this.details.pictureName.split(",");
          let img = this.details.thumbnails.split(",");
          let pictureDetail=[];
          if (this.details.pictureDetail) {
            pictureDetail = this.details.pictureDetail.split("|");
          }
          let originImg = this.details.pictureUrls.split(",");
          if(img.length>0&&originImg.length>0){
            img.pop();
            this.addPic = img[4];
            this.casePicLen = img.length;
            this.addPicName = name[5];
            for (var i = 0; i < img.length; i++) {
              var obj = {};
              obj.name = name[i];
              obj.img = img[i];
              obj.originImg = originImg[i];
              if(pictureDetail &&pictureDetail.length>0){
                 obj.pictureDetail = pictureDetail[i];
              }
              if (i < 4) {
                this.picture.push(obj);
              }
              this.caseDetialPic.push(obj);
            }
          }
          
          this.fullscreenLoading = false
          }else{
            this.$message(res.msg)
            this.$router.go(-1)
          }
          
        });
    },
    open(index) {
      this.originImg = this.picture[index].originImg;
      this.isShow = !this.isShow;
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("move", mo, false);
    },
    close() {
      this.isShow = false;
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "";
      document.removeEventListener("move", mo, false);
    },
    concernCase(details) {
      if (details.concernState == 0) {
        this.api
          .concernCase({
            bossID: this.bossId,
            caseID: this.$route.query.caseId
          })
          .then(res => {
            if (res.code == 0) {
              this.$message(res.msg);
              details.concernState = 1;
            } else {
              this.$message(res.msg);
            }
          });
      } else {
        this.api
          .cancelConcernCase({
            bossID: this.bossId,
            caseID: this.$route.query.caseId
          })
          .then(res => {
            if (res.code == 0) {
              this.$message(res.msg);
              details.concernState = 0;
            }
          });
      }
    },
    sendInvite(details) {
      this.designerId = details.designerId;
      if (this.projectIdList != null) {
        this.invite(this.designerId);
      } else {
        this.getProjectArr();
      }
    },
    invite(id) {
      this.api
        .saveInviteList({
          designerId: id,
          projectId: this.projectIdList,
          bossId: this.bossId
        })
        .then(res => {
          if (res.code == 0 || res.code == 1) {
            this.$message(res.msg);
            if (this.$route.query.projectId != null) {
              this.isInvited = "Y";
            }
            this.$message(res.msg);
          } else {
            this.$message(res.msg);
          }
        });
      if (this.$route.query.projectId == null) {
        this.projectIdList = null;
      }
    },
    getProjectArr() {
      this.projectId = null;
      this.api.goingProject({ bossId: this.bossId }).then(res => {
        if (res.code == 0) {
          if (res.projectList.length == 0) {
            this.$message({
              showClose: true,
              message: "未查找到项目，请发布项目"
            });
          } else {
            let _arr = res.projectList;
            _arr.forEach(function(item) {
              item.checked = false;
            });
            this.projectList = _arr;
            this.centerDialogVisible = true;
          }
        } else {
          this.$message(res.msg);
        }
      });
    },
    getProjectId(item) {
      this.projectIdList = item.projectId;
      this.invite(this.designerId);
    },
    getParmas() {
      let type = sessionStorage.getItem("loginType");
      this.bossId =
        type == 1
          ? localStorage.getItem("userId")
          : sessionStorage.getItem("userId");
      this.projectIdList = this.$route.query.projectId;
    },
    //宋
    viewCase(id) {
      this.$router.push({
        path: "/CaseDetails",
        query: { caseId: id }
      });
    }
  },
  mounted() {
    this.getParmas();
    this.getCaseDetails();
    this.getpropDesigner();
  },
  watch: {
    $route(to, from) {
      this.picture=[]
      this.caseDetialPic = []
      this.propDesign = [];
      this.hotpropDesign = [];
      this.getParmas();
      this.getCaseDetails();
      this.getpropDesigner();
    }
  }
};
</script>
<style lang="less" scoped>
@media only screen and (min-width: 1600px) {
  .caseDetails {
    max-width: 1200px;
    margin: auto;
  }
}

.caseDetails {
  margin-top: 0.77rem;
  padding: 0 10%;
}
.caseContent {
  margin: auto;
  position: relative;
  .caseStyle > span {
    background: #f6f6f6;
    font: 0.12rem "PingFangSC-Regular";
    color: #999999;
    letter-spacing: 0.0081rem;
    margin-right: 0.36rem;
    border-radius: 0.1875rem;
    padding: 0.07rem 0.13rem;
  }
  .caseTitle {
    margin: 0.3rem 0 1.5625rem 0;
    // font: 1.56rem "PingFangHK-Medium";
    color: #333333;
    letter-spacing: 0.0194rem;
    font: 1.5625rem "PingFangHK-Medium";
    font-weight: 600;
  }
  .headImg {
    height: 0.39rem;
    width: 0.39rem;
    overflow: hidden;
    img {
      width: 100%;
      vertical-align: middle;
      height: 100%;
      border-radius: 100px;
      -webkit-border-radius: 100px;
      -moz-border-radius: 100px;
    }
  }
  .caseInfo {
    margin: 0.57rem 0 0.2rem 0;
    p {
      font: 0.16rem "PingFangHK-Regular";
      color: #666666;
      letter-spacing: 0.0112rem;
    }
    .designerWords {
      margin: 0.25rem 0;
    }
    .caseTime {
      margin-bottom: 0.4rem;
    }
  }
  .casePicture div {
    overflow: hidden;
    margin-bottom: 0.4rem;
    img {
      width: 100%;
      cursor: pointer;
    }
  }
  .btnTeam {
    margin: 0.81rem auto;
    display: flex;
    justify-content: center;
    height: 0.8rem;
    .collection,
    .invited,
    .collection1 {
      border-radius: 3.125rem;
      background-color: #ffffff;
      text-align: center;
      border: none;
      outline: none;
      overflow: hidden;
      width: 1.57rem;
      cursor: pointer;
      border: 0.0625rem solid black;
      img {
        width: 0.24rem;
        height: 0.24rem;
      }
    }
    .collection1 {
      background-image: linear-gradient(-95deg, #fe7e59 0%, #f5594c 100%);
      border: 0.0625rem solid #ffffff;
      margin: 0 0.4rem;
    }
    .invited {
      margin-left: 0.4rem;
    }
    .invited:hover,
    .collection:hover {
      background-image: none;
      background: #333333;
    }
  }
}
.mytit {
  width: auto;
  font-size: 1.0625rem;
  font-weight: 600;
}

.mask {
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  text-align: center;
  vertical-align: middle;
  z-index: 99999;
  .originImg {
    width: 60%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  img {
    width: 80%;
    min-height: 100%;
    cursor: default !important;
  }
  .el-icon-close {
    color: #ffffff;
    font-size: 1.5rem;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
  .mask1 {
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    height: 100%;
    color: #ffffff;
  }
}

.mytit {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.3rem;
  margin-bottom: 1.3rem;
  padding-bottom: 0.0187rem;
  text-transform: uppercase;
}
.picturetitle {
  margin-top: 1rem;
}
.thumbnailsimg {
  display: block;
}
.detailmsg {
  display: inline-block;
  font-size: 1rem;
  position: relative;
  width: 100%;
  height: auto;
  p {
    // height: 3rem;
    color: #303030;
    display: flex;
    align-items: flex-start;
    .name {
      display: inline-block;
      font-size: 1rem;
      font-weight: 600;
      // line-height: inherit;
      margin: 0 2.5% 0 0;
      width: 27.5%;
      vertical-align: middle;
      line-height: 3rem;
    }
    b{
       display: inline-block;
       vertical-align: middle;
       line-height: 3rem;
    }
    .con{
      line-height: 3rem;
      vertical-align: middle;
      width: 68%;
      // margin-right: 1%;
      display: inline-block;
      overflow: hidden;
      word-break: break-all;
      text-align: justify;
    }
  }
}
.lefttit {
  margin-left: 1rem;
  color: #303030;
  font-size: 1rem;
}
.detailmsg {
  // border: 1px solid #E1E1E1;
  padding-bottom: 0.4rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
.case-con {
  margin: 1rem 0 1.5rem 0;
  font-size: 1rem;
}
.carousel-control-prev {
  left: -10rem !important;
}
.carousel-control-next {
  right: -10rem !important;
}
.more-houses {
  margin-top: 10px;
  cursor: pointer;
  font-size: 15px;
  text-align: right;
  color: #026cb6;
}
.add-pic {
  width: 18%;
  height: 7.125rem;
  position: absolute;
  bottom: -8.0rem;
  // left: 36.5rem;
  right:0;
  z-index: 16;
  cursor: pointer;
  .add-pic-mask {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
    div {
      cursor: pointer;
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 16;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-size: 2.5em;
      font-weight: 600;
    }
  }
}
.remen-case-title {
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.25rem;
  margin-bottom: 1.25rem;
  color: #303030;
}
.hot-case-warp {
  cursor: pointer;

  .hot-case-name {
    color: #303030;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5em;
    max-height: 3.125rem;
    overflow: hidden;
    width: 100%;
  }
}
</style>



<style lang="less">
.caseDetails {
  .case-img-warp {
    position: relative;
    .carousel-fade .carousel-item {
      // width: 435px;
      height: 26.625rem;
      // left: 50%;
      // margin-left: -212.5px;
      .view {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }
    }
    .carousel-thumbnails {
      margin-bottom: 8rem;
      .carousel-indicators {
        width: 100%;
        margin-bottom: -9.25rem;
        margin-left: 0;
        margin-right: 0;
        // justify-content: flex-start;
        justify-content: center;
        div {
          // width: 7.125rem;
          height: 7.125rem;
          // margin-right: 0.9375rem;
          margin: 0 2.5% 2.5% 0%;
         width: 18%;
        //  min-height: 17.5%;
          li {
            max-width: 100%;
            width: 100%;
            height: 100%;
            img {
              max-width: 100%;
              width: 100%;
              height: 100%;
            }
          }
          .active {
            opacity: 1;
          }
        }
      }
    }
  }
  .startLeft{
    .carousel-thumbnails {
      .carousel-indicators {
        justify-content: flex-start;
        li:first-child{
          margin-left: 0;
        }
      }
    }
  }
  .hotpropDesign,
  .propDesign {
    cursor: pointer;
  }
}
@media (max-width: 690px){
  .caseDetails .case-img-warp .carousel-fade .carousel-item{
    height: 18.75rem !important;
  }
  .caseDetails .case-img-warp .carousel-thumbnails .carousel-indicators div{
    height: 4.8rem !important;
  }
  .add-pic{ 
    height: 4.8rem !important;
    bottom: -8.6rem !important;
  }
}
.richTextWrapper{
  width: 100%;
  img{
    max-width: 100%;
  }
}
</style>
