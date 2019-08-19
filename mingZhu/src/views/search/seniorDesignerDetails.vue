<template>
  <div class="designMasterDetails"  style="overflow:hidden; padding-top: 5.5rem">
    <section>
        <div class="container-fluid">
          <br>
          <h1 class="text-center dark-grey-text pb-3" style="font-size: 40px;margin-bottom: .5rem">
            <strong>{{infoByDesigner.realName}}</strong>
          </h1>
          <p class="text-center mb-4 text-uppercase spacing">个人简介</p>
          <mdb-row class="flex-center">
            <mdb-col class="col-md-10 col-xl-5">
              <p class="text-center">
                  {{infoByDesigner.desc}}
              </p>
              <p></p>
            </mdb-col>
          </mdb-row>
        </div>
    </section>
    <section>
        <div class="container-fluid grey lighten-4">
            <hr class="my-5">
            <mdb-container>
                <mdb-row class="mt-5 pt-3 ml-4" :class="{'desingerDsecHide':!designerType}">
                    <div class="col-lg-3 col-12 mt-1">
                      <mdb-card class="promoting-card">
                        <mdb-view hover>
                          <a>
                            <img class="card-img-top" v-if="infoByDesigner.head" :src="infoByDesigner.head" alt="Card image cap">
                            <mdb-mask fex-center waves overlay="white-slight"></mdb-mask>
                          </a>
                        </mdb-view>
                        <mdb-card-body>
                          <h5 class="card-title dark-grey-text text-center grey lighten-4 py-2">
                            <strong style="font-size:14.4px">{{!designerType ? infoByDesigner.designerSerial : infoByDesigner.realName}}</strong>
                          </h5>
                          <!-- card-text d-inline-block collapse -->
                          <div class="collapse-content">
                            <p
                              class="card-text d-inline-block collapse"
                              :class="show?'show':'' || !isOpen?'heightAuto':''"
                              id="collapseContent"
                              ref="collContent"
                              style="font-size: 14.4px"
                            >
                              <strong>建筑师职称</strong>
                              <br>
                              {{infoByDesigner.titleDesc}}
                              <br>
                              <strong>擅长风格</strong>
                              <br>
                              {{infoByDesigner.adeptType}}
                              <br>
                              <strong>服务地区</strong>
                              <br>
                              {{locaTion}}
                              <br>
                              <br>
                              {{infoByDesigner.description}}
                            </p>
                            <a
                              v-show="isOpen"
                              class="btn btn-flat red-text p-1 my-1 mr-0 mml-1 waves-effect waves-effect"
                              data-toggle="collapse"
                              href="#seniorDesignerDetails"
                              :aria-expanded="show"
                              :class="show?'':'collapsed'"
                              aria-controls="collapseContent"
                              @click="show = !show"
                            ></a>
                            <br>
                            <a
                              type="button"
                              class="btn-floating btn-sm grey lighten-2 ml-4 waves-effect waves-light"
                              @click="concernDesigner"
                            >
                              <i class="far fa-heart" :class="{'statusActive':concernStatus}" data-toggle="tooltip" data-placement="top" title="关注"></i>
                            </a>
                            <a
                              type="button"
                              class="btn-floating btn-sm grey lighten-2 waves-effect waves-light"
                              @click="sendInvite"
                            >
                              <i class="fas fa-plus" data-toggle="tooltip" :class="{'statusActive': isInvited=='Y'}" data-placement="top" title="邀请"></i>
                            </a>
                            <a type="button" class="btn-floating btn-sm grey lighten-2 waves-effect waves-light">
                              <i class="fas fa-share-alt" data-toggle="tooltip" data-placement="top" title="分享"></i>
                            </a>
                          </div>
                          <!-- <a
                            class="btn btn-flat p-1 my-1 mr-0 mml-1 waves-effect waves-effect collapsed"
                            data-toggle="collapse"
                            href="#collapseContent"
                            aria-controls="collapseContent"
                          >展开</a>-->
                        </mdb-card-body>
                      </mdb-card>
                      <mdb-card class="section widget-content mt-5">
                        <mdb-card-body class="pb-0">
                          <h5 class="card-title dark-grey-text text-center grey lighten-4 py-2 mb-4">
                            <strong>获奖经历</strong>
                          </h5>
                          <div class="single-post" style="margin-top:1rem;" v-if="honorsList.length>0">
                            <mdb-row class="mb-4" v-for="(item) in honorsList" :key="item.id">
                              <mdb-col col="5">
                                <mdb-view :src="item.honorPhoto" hover>
                                  <mdb-mask overlay="white-slight" waves/>
                                </mdb-view>
                              </mdb-col>
                              <mdb-col col="7">
                                <h6 class="mt-2 mb-2">
                                  <strong style="font-weight: 300;font-size: 16px;cursor: pointer;">{{item.honorLevel}}</strong>
                                </h6>
                              </mdb-col>
                            </mdb-row>
                          </div>
                        </mdb-card-body>
                      </mdb-card>
                      <mdb-card class="section widget-content mt-5">
                        <mdb-card-body>
                          <h5 class="card-title dark-grey-text text-center grey lighten-4 py-2">
                            <strong style="font-size: 16px">个人动态</strong>
                          </h5>
                          <mdb-col col="12" class="px-0 mb-3" v-if="dynamincList.length>0">
                            <p style="font-size: 16px" class="mb-1 text-hover font-smallr dark-grey-text" v-for="item in dynamincList" :key="item.id">
                              {{item.content}}
                            </p>
                          </mdb-col>
                        </mdb-card-body>
                      </mdb-card>
                      <mdb-card style="margin-top:2rem;" v-if="succseedCaseListFrist.length>0">
                        <mdb-carousel :interval="8000" style="height:10rem;" showIndicators role="listbox">
                          <mdb-carousel-item
                            v-for="item in succseedCaseListFrist" :key="item.id"
                            img
                            :src="item.url"
                            alt="First slide"
                            mask="black-light"
                            class="succeed-wrapper "
                          >
                            <div
                              @click.native="newsDetails(item.id)"
                              style="cursor: pointer"
                              class="carousel-caption animated fadeInDown animatedSelf"
                            >
                            <h5 class="h4-responsive font-weight-bold">{{item.title}}</h5>
                            <p>{{item.subTitle}}</p>
                            </div>
                          </mdb-carousel-item>
                        </mdb-carousel>
                        <div v-if = "succseedCaseListSec.length>0" class="pb-3">
                          <div v-for="item in succseedCaseListSec" :key="item.id" class="single-post" style="margin-top:1rem; padding:0rem 1rem;">
                            <mdb-row @click.native="newsDetails(item.id)">
                              <mdb-col col="4">
                                <mdb-view class="succeed-img"
                                  :src="item.url"
                                  hover
                                >
                                  <mdb-mask overlay="white-slight" waves/>
                                </mdb-view>
                              </mdb-col>
                              <mdb-col col="8">
                                <h6 class="mt-0 mb-2">
                                  <strong class="succeed-title" :title="item.title">
                                    {{item.title}}
                                  </strong>
                                </h6>
                                <div style="font-size:16px" class="post-data">{{item.createTime.split(' ')[0]}}</div>
                              </mdb-col>
                            </mdb-row>
                          </div>
                        </div>
                        <div style="font-size: 16px" class="more text-center mb-3" @click="goExcellent" v-if="succseedCaseListSec.length==5">
                            查看更多
                          </div>
                      </mdb-card>
                      <mdb-card class="section widget-content mt-5">
                        <mdb-card-body>
                          <h5 class="card-title dark-grey-text text-center grey lighten-4 py-2">
                            <strong>作品类型</strong>
                          </h5>
                          <mdb-list-group  v-if = "caseList.length>0">
                            <mdb-list-group-item class="type" :action="true" tag="div" v-for="(item,index) in caseList" :key="index">
                              <div @click="caseQuery(index,item.value)" style="width:100%;" :style="{color:caseIndex===index?'#007bff':''}">
                                {{item.name}}
                                <badge class="badge-primary" style="float:right;" :class="caseIndex===index?'font-small':''" pill>{{item.num}}</badge>
                              </div>
                            </mdb-list-group-item>
                          </mdb-list-group>
                        </mdb-card-body>
                      </mdb-card>
                      <mdb-card class="section widget-content my-5">
                        <mdb-card-body>
                          <h5 class="dark-grey-text text-center grey lighten-4 py-2">
                            <strong>
                              <!-- 所属事务所 -->
                              {{workTypeArr.workType || '所属事务所'}}
                            </strong>
                          </h5>
                          <mdb-col col="12" class="px-0 mb-3 mt-4 "  v-show="workTypeArr.workType">
                            <!-- <p class="text-center text-dark">
                              {{workTypeArr.workType}}
                            </p> -->
                            <p class="text-center text-dark mb-3">
                              {{workTypeArr.scaleName}}:
                              {{workTypeArr.scaleValue}}
                            </p>
                            <div  v-if="workTypeArr.uploadFiles.length>0">
                              <mdb-view class="pt-1" hover v-for="(item,index) in workTypeArr.uploadFiles" :key="index">
                                <mdb-card-image class="succeed-wrapper" :src="item" alt="Card image cap"></mdb-card-image>
                                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                              </mdb-view>
                            </div>
                          </mdb-col>
                        </mdb-card-body>
                      </mdb-card>
                    </div>
                    <div class="col-lg-8 col-12 mt-1 mx-lg-4" style="padding-left: -15px" v-if="designerQuery.length>0">
                        <mdb-card v-for="item in designerQuery" :key="item.id" style="margin-bottom:2rem;" class="card hoverable">
                            <mdb-view hover>
                              <img class="card-img-top" :src="item.pictureUrls" alt>
                              <a>
                                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                              </a>
                            </mdb-view>
                            <mdb-card-body class="mx-4">
                              <mdb-card-title style="font-size: 24px;font-weight: bolder;">{{item.caseName}}</mdb-card-title>
                              <hr>
                              <mdb-card-text style="font-size: 16px" class="textContent">{{item.caseDetail}}</mdb-card-text>
                              <br/>
                              <p style="font-size: 14.4px" class="font-small font-weight-bold blue-grey-text mb-1">
                                {{item.finishTime}}
                              </p>
                              <a style="font-size: 16px" class="black-text d-flex justify-content-end" @click="caseDetail(item)">
                                <h5>更多
                                  <mdb-icon icon="fas fa-angle-right" class="pl-1"/>
                                </h5>
                              </a>
                            </mdb-card-body>
                        </mdb-card>
                    </div>
                    <div class="custom-pagination">
                        <!-- 分页插件 传入总页数和请求数据的方法 -->
                        <pagination
                          v-if="paginationPage.total>0"
                          :total="paginationPage.total"
                          :pageSize="paginationPage.pageSize"
                          @changePage="changepaginationPage"
                        ></pagination>
                    </div>
                    <!-- <mdb-col></mdb-col>
                    <mdb-col></mdb-col>-->
                </mdb-row>
            </mdb-container>
        </div>
    </section>
    <!-- 合筑消息 -->
     <section>
      <div class="container-fluid white mb-0 pb-0">
        <hr class="mt-0">
        <div class="container">
          <!--Grid row-->
          <div class="row">
            <!--Grid column-->
            <div class="col-lg-4 col-md-12">
              <h6 class="font-weight-bold mt-5 mb-3">竞赛消息</h6>
              <hr class="mb-5">
              <mdb-view hover rounded class="z-depth-1-half contentInfo" @click.native="$router.push('/competitionDetail?activityId=' + contestList.id);">
                <img
                  class="img-fluid z-depth-1"
                  :src="contestList.picture"
                  alt="Sample image"
                  style="width:100%"
                >
                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
              </mdb-view>
              <p class="mt-4 mb-5">
                {{contestList.describe}}
              </p>

            </div>
            <!--Grid column-->
            <!--Grid column-->
            <div class="col-lg-4 col-md-6">
              <h6 class="font-weight-bold mt-5 mb-3">合筑新闻</h6>
              <hr class="mb-5" v-if="newsList && newsList.length>0">
              <!--Grid row-->
              <!-- <div class="row mt-4" v-for="(item,index) in newsList" :key="index"> -->
                <div class="row" v-for="(item,index) in newsList" :key="index" style="height:5.5rem;">
                <!--Grid column-->
                <div class="col-4"  @click.prevent="$router.push('/newsDetails?id=' + item.id);">
                  <!--Image-->
                  <mdb-view hover  class="z-depth-1-half" style="height:100%;">
                <img
                  class="img-fluid imgPaved"
                  :src="item.thumbnailPic"
                  alt="Sample image"
                >
                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
              </mdb-view>
                </div>
                <!--Grid column-->
                <!--Second column-->
                <div class="col-8 mb-1"  @click.prevent="$router.push('/newsDetails?id=' + item.id);">
                  <!--Post data-->
                  <div class>
                    <p class="mb-1 new-saml-title">
                      <a href="#!" class="text-hover font-weight-bold">
                        {{item.newsTitle}}
                      </a>
                    </p>
                    <p class="font-small" style="font-size:0.9rem;font-style:italic">
                      <em>{{item.newsTime | formatDate}}</em>
                    </p>
                  </div>
                </div>
                <!--Second column-->
              </div>
              <!--Grid row-->
            </div>
            <!--Grid column-->
            <!--Grid column-->
            <div class="col-lg-4 col-md-6">
              <h6 class="font-weight-bold mt-5 mb-3">项目信息</h6>
              <hr class="mb-5">
              <!--Grid row-->
              <div class="row" v-for="(item,index) in pointList" :key="index" style="height:5.5rem;" >
                <!--Grid column-->
                <div class="col-4" @click.prevent="goProjectDetial(item.id)">
                  <mdb-view hover  class="z-depth-1-half" style="height:100%;">

                <img
                  class="img-fluid imgPaved"
                  :src="item.cover"
                  alt="Sample image"
                >
                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
              </mdb-view>
                  <!--Image-->

                </div>
                <!--Grid column-->
                <!--Second column-->
                <div class="col-8 mb-1" @click.prevent="goProjectDetial(item.id)">
                  <!--Post data-->
                  <div class>
                    <p class="mb-1 new-saml-title">
                      <a href="#!" class="text-hover font-weight-bold">
                        {{item.viewPointTitle}}
                      </a>
                    </p>
                    <p class="font-small" style="font-size:0.9rem;font-style:italic">
                      <em>{{item.createTime | formatDate}}</em>
                    </p>
                  </div>
                </div>
                <!--Second column-->
              </div>
              <!--Grid row-->
            </div>
            <!--Grid column-->
          </div>
          <!--Grid row-->
        </div>
      </div>
    </section>
    <mdb-modal size="lg" v-if="centerDialogVisible" @close="centerDialogVisible=false" info>
      <mdb-modal-header center :close="false">
        <p class="heading" style="font-size: 1.25rem">请选择合适的项目发送邀请</p>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-container>
            <form-inline>
              <div class="row">
                  <div style="font-size: 0.9rem;text-align: left;height: 6.25rem" class="col-lg-4 col-md-6" v-for="item in projectList" :key="item.projectId">
                      <input
                        type="radio"
                        class="form-check-input"
                        name="projectType"
                        :id="item.projectId"
                        @change="getProjectId(item)"
                      />
                      <label style="line-height: 1.875rem" class="form-check-label" :for="item.projectId">{{item.projectName}}</label>
                  </div>
              </div>
          </form-inline>
        </mdb-container>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn color="primary" @click="invited()">确认</mdb-btn>
        <mdb-btn outline="primary" @click="centerDialogVisible = false">取消</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>
<script>
import tabReset from "@/assets/css/elementReset.css";
export default {
  components: {},
  data() {
    return {
      designerId: '',
      bossId: '',
      roleId: '',
      isOpen:false,
      show: false,
      centerDialogVisible: false,
      projectList: [], //项目列表
      infoByDesigner: "",
      concernStatus: "", //关注
      isInvited: null, // 邀请
      caseIndex: '',
      caseType: '',
      honorsList: [],
      newsList: [],
      pointList: [],
      contestList: [],
      caseList:[],
      designerQuery:[],
      paginationPage: {
        page: 1,
        total: 1,
        limit: 1,
        pageSize: 4
      },
      dynamincList: [], // 个人动态
      succseedCaseListFrist: [], // 成功案例
      succseedCaseListSec: [],
      workTypeArr:{
        workType: '',
        scaleValue: '',
        scaleName: '',
        uploadFiles: []
      },
      locaTion:''
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
    // 获取服务区域
    getLocation(){
      this.api.getLocation(this.designerId).then(res => {
        this.locaTion =res.data[0].country+','+res.data[0].state+','+res.data[0].city
        })
    },
    //竞赛消息
     gerContest() {
       this.api.homePageContest({}).then(res => {
        this.contestList = res.indexContest[0];
      });
    },
    //新闻
     gerNews() {
       this.api.homePageNews({}).then(res => {
        this.newsList = res.indexNews;
      });
    },
     //推荐项目
     gerPoint() {
       this.api.homePagePoint({}).then(res => {
        this.pointList = res.indexViewPoints;
      });
    },
    //分页
    changepaginationPage(val) {
      this.paginationPage.page = val;
      this.queryListByDesignerId();
    },
    changePage(val) {
      this.paginationPage.page = val;
    },
    getseniorDesignerDetail() {
      let params = {
        designerid: this.designerid,
        bossId: this.bossId,
        page: this.currentPage,
        pageSize: this.pageSize
      };
      this.api.seniorDesignerDetail(params).then(res => {
        this.details = res.data;
        if (this.$route.query.projectId != null) {
          this.isInvited = res.data.isInvited;
        }
        this.homePage = this.details.homePage;
        this.allList = this.details.desginerCaseList;
        this.totalCount = this.details.caseTotal;
        this.data = this.details.data;
        this.collection = this.details.collection;
        this.creationProcess = this.details.creationProcess;
      });
    },
    // 关注设计师
    concernDesigner() {

      if (!this.bossId) {
        this.$message({
          showClose: true,
          message: "请先登录",
          type: "failed"
        });
        return;
      }
      if (this.concernStatus == 1) {
        this.api
          .cancelConcernDesigner({
            bossID: this.bossId,
            designerID: this.designerId
          })
          .then(res => {
            if (res.code == 0) {
              this.concernStatus = 0;
              this.$message(res.msg);
            } else {
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
              this.concernStatus = 1;
              this.$message(res.msg);
            } else {
              this.$message(res.msg);
            }
          });
      }
    },
    //关注案例
    cancelConcernCase(item) {
      if (this.bossId == null) {
        this.$message({
          showClose: true,
          message: "请先登录",
          type: "failed"
        });
        return;
      }
      // let flag = item.concernState == 1 ? "0" : "1";
      if (item.concernState == 1) {
        this.api
          .cancelConcernCase({
            bossID: this.bossId,
            caseID: item.id
          })
          .then(res => {
            if (res.code == 0) {
              this.$message(res.msg);
              item.concernState = 0;
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
              this.$message(res.msg);
              item.concernState = 1;
            } else {
              this.$message(res.msg);
            }
          });
      }
    },
    getParams() {
      // this.designerid = this.$route.query.seniorId;
      // this.concernStatus = this.$route.query.concernStatus;
      this.bossId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
      this.roleId = localStorage.getItem("role") || sessionStorage.getItem("role");
      this.designerId = this.$route.query.seniorId || this.$route.query.id;
      // this.projectIdList = this.$route.query.projectId;
      // this.designerId = localStorage.getItem("userId") || sessionStorage.getItem("userId")
    },
    sendInvite() {
      if(this.roleId === "1"){
        this.$message.error("只有客户才能发出邀请");
        return;
      }
      if (this.isInvited == 'Y') {
        this.$message.error("该设计师在本轮次中已经邀请了1次");
        return;
      } else {
        this.getProjectArr();
      }
    },
    getProjectArr() {
      this.projectId = null;
      this.api.goingProject({ bossId: this.bossId }).then(res => {
        if (res.code == 1) {
          this.$message(res.msg);
          return;
        }
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
          _arr.forEach(function(item) {
            item.checked = false;
          });
          this.projectList = _arr;
          this.centerDialogVisible = true;
        }
      });
    },
    getProjectId(item) {
      this.projectIdList = item.projectId;
    },
    invited() {
      let id = this.projectIdList
      this.api
        .saveInviteList({
          designerId: this.designerId,
          projectId: id
        })
        .then(res => {
          if (res.code == 0 || res.code == 1) {
            this.$message(res.msg);
            if (this.$route.query.projectId != null) {
              this.isInvited = "Y";
            }
          } else {
            this.$message(res.msg);
          }
        });
      if (this.$route.query.projectId == null) {
        this.projectIdList = null;
      }
      this.centerDialogVisible = false;
    },
    handleClick(tab, event) {
      this.index = tab.index;
    },
    handleSizeChange(val) {
      if (val == undefined || val == 0) {
        this.pageSize = 12;
      } else {
        this.pageSize = val;
      }
      this.getseniorDesignerDetail();
    },
    handleCurrentChange(val) {
      if (val == null || val == 0) {
        this.currentPage = 1;
      } else {
        this.currentPage = val;
      }
      this.getseniorDesignerDetail();
    },
    caseDetail(id) {
      const { href } = this.$router.resolve({
        path: "/CaseDetails",
        query: {
          caseId: id,
          projectId: this.projectIdList
        }
      });
      window.open(href, "_blank");
    },
    getInfoByDesignerId() {
      this.api.getInfoByDesignerId({ id: this.designerId }).then(res => {
        this.infoByDesigner = res.data;
        this.concernStatus = res.data.concernStatus;
        this.isInvited = res.data.isInvited;
        if(this.infoByDesigner.description && this.infoByDesigner.description.length > 70){
          this.isOpen = true;
        }
      });
    },
    queryListByDesignerId() {
      let params = {
        buildingType: this.caseType,
        auditState: 5,
        designerId: this.designerId,
        page: this.paginationPage.page,
        pageSize: this.paginationPage.pageSize
      }
      this.api.queryListByDesignerId(params).then(res => {
        this.designerQuery = res.desginerCases
        this.paginationPage.total = res.total
      });
    },
    caseQuery(index,type) {
      this.caseIndex = index
      this.caseType = type
      this.paginationPage.total = 1
      this.designerQuery = []
      this.queryListByDesignerId()
    },//奖励经历
    queryHonors() {
      this.api.getHonors({ designerId: this.designerId }).then(res => {
        this.honorsList = res.data
      })
    },//作品类型
    queryCaseClassification() {
      this.api.getCaseClassification({ designerId: this.designerId }).then(res => {
        this.caseList = res.data
      })
    },
    //个人动态
    queryDynamic() {
      this.api.getDesigerDynamic({ designerId: this.designerId }).then(res => {
        this.dynamincList = res.rows
      })
    },
    // 文章
    queryExcellentList() {
      let params ={
        subTitle: this.designerId,
        page: 1,
        limit: 10
      }
      this.api.getexcellentList(params).then(res => {
        console.log('xxx')
        if(res.data.length > 0) {
          for (let index = 0; index < res.data.length; index++) {
            if(index<5){
              this.succseedCaseListFrist.push(res.data[index])
            }else{
              this.succseedCaseListSec.push(res.data[index])
            }
          }
        }
      })
    },
    // 文章点击
    newsDetails(id) {
      this.$router.push({
        name: 'excellentProjectDetails',
        query: {
          id: id
        }
      })
    },
    //合筑视界列表
    goExcellent(){
      this.$router.push({path:"excellentProject"});
    },
    //案例更多
    caseDetail(item) {
      this.$router.push({
        name:'CaseDetails',
        query:{
          caseId:item.id
        }
      })
    },
    //事务所
    queryWorkType() {
      this.api.getDesigerWorkType(null , this.designerId).then(res => {
        if(res.data){
          this.workTypeArr = res.data
        }
      })
    },
    goProjectDetial(id){
      console.log(id)
      this.$router.push(`/projectDetail/${id}`);
    },

  },
  mounted() {
    this.getParams();
    // 获取服务区域
    this.getLocation()
    this.getInfoByDesignerId();
    this.queryListByDesignerId();
    // this.getseniorDesignerDetail();
    // 奖励经历
    this.queryHonors()
    //竞赛消息
     this.gerContest()
     this.gerNews()  //新闻消息
    this.gerPoint() //推荐项目
    this.queryCaseClassification() //作品类型
    this.queryDynamic() //个人动态
    this.queryExcellentList() // 文章
    this.queryWorkType() //事务所
  },
  updated() {
    let el = document.getElementsByClassName('new-saml-title');
    if(el.length == 6){
      for(let j=0; j<el.length; j++){
        let n = el[j].offsetheight;
        while(el[j].offsetHeight < el[j].scrollHeight){
          let s = el[j].children[0].innerText;
          el[j].children[0].innerText = s.substr(0,s.length-7);
          el[j].children[0].innerText += '...';
        }
      }
    }
    let tx = document.getElementsByClassName('textContent');
    for(let jj=0; jj<tx.length; jj++){
      let nn = tx[jj].offsetheight;
      while(tx[jj].offsetHeight < tx[jj].scrollHeight){
        let ss = tx[jj].innerText;
        tx[jj].innerText = ss.substr(0,ss.length-4);
        tx[jj].innerText += '...';
      }
    }
  },
  computed: {
    designerType() {
      return (this.infoByDesigner.seniorDesign == 1 || this.infoByDesigner.seniorDesign == 2) ? true : false
    }
  }
};
</script>
<style lang="less" scoped>
@media only screen and (min-width: 1600px) {
  .max-width,
  .el-main {
    max-width: 1200px;
    margin: auto;
  }
}
@media only screen and (min-width: 1200px) {
  .container{
    max-width: 1140px;
  }
}

.designMasterDetails {
  // margin-top: 6rem;
  width: 100%;
  .card-image {
    width: 100%;
    padding:5rem 0 3rem 0;
    color: #4f4f4f;
    box-shadow: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  strong {
    font-weight: bolder;
  }
}
.desingerDsecHide{
  padding-top: 6.5rem!important;
}
.carousel-fade .carousel-item {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 10rem;
  display: block !important;
  opacity: 0;
  z-index: 0;
  -webkit-transition: opacity 0.8s ease-out, -webkit-transform 0ms ease-in-out;
  transition: opacity 0.8s ease-out, -webkit-transform 0ms ease-in-out;
  transition: transform 0ms ease-in-out, opacity 0.8s ease-out;
  transition: transform 0ms ease-in-out, opacity 0.8s ease-out,
    -webkit-transform 0ms ease-in-out;
}
.badge-primary {
  background-color: #4285f4 !important;
}
.collapse-content p.collapse:not(.show),
.collapse-content table.collapse:not(.show) {
  height: 17.65rem !important;
  -webkit-line-clamp: 18 !important;
}
.collapse-content p.collapse.heightAuto{
    height: auto !important;
}
.collapse-content p.collapse:not(.show),
.collapse-content table.collapse:not(.show) {
  height: 2.65rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.collapse:not(.show) {
  display: none;
}
.collapsed:after {
  content: "展开" !important;
  color: grey !important;
  font-weight: 500;
}
.collapse-content a:not(.collapsed):after {
  content: "合起" !important;
  color: grey !important;
  font-weight: 500;
}
.type {
  cursor: pointer;
  padding: 0;
}
.statusActive{
  background: #dc3545;
}
.case-title{
  line-height: 1.5rem;
  border-bottom: 3px solid #000;
  font-size: 1.125rem;
}
.type>div {
  padding: .75rem 1.25rem;
}
.type:hover {
  color: #4285f4;
}
.succeed-title{
  width:8.75rem;
  display:inline-block;
  font-weight: bolder;
  font-size: 1rem;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.animatedSelf{
   position:absolute;
   top:0;
   transition:top 0.5s;
   -webkit-transition:top 0.5s;
  }
.active>.animatedSelf{
  position:absolute;
   top:1.25rem;
}
.textContent{
    line-height:1.5rem;
    height:4.5rem;
    overflow: hidden;
    position:relative;
    text-align: justify;
  }
  // .textContent::after {
  //   content:"...";
  //   font-weight: bold;
  //   position: absolute;
  //   bottom: 0;
  //   right: 0;
  //   padding:0 7px 1px 0px;
  //   background: #fff;
  //   // background: linear-gradient(to right, rgba(255,255,255,0),rgba(255,255,255,1));
  // }
  .imgPaved{
    width: 100%;
    height: 4rem;
  }
  .designMasterDetails .new-saml-title {
    color: #333 !important;
    overflow: hidden;
    height: 3rem;
    line-height: 1.5rem;
  }
  .text-hover {
    color: #424242;
    transition: .4s;
  }
  .text-hover:hover{
    color: #0056b3 !important;
  }
</style>
<style lang="less">
.imgWrapper > img{
  width: 100%;
  // height: 100%;
}
.succeed-wrapper .carousel-caption.caption-bottom[data-v-ddcdff6e] {
  bottom: 20% !important;
}
.succeed-wrapper img{
  height: 10.125rem;
  width: 15.0625rem;
}
.succeed-img img{
  height: 3.125rem;
}
.succeed-wrapper .carousel-caption.caption-bottom[data-v-ddcdff6e]>h3 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
<style lang="less">
.animatedSelf h3.h3-responsive{
  margin-bottom:0.5rem;
}
@media (min-width: 1200px) {
  .animatedSelf h3.h3-responsive{
    font-size:140%;
  }
}
@media (min-width:992px){
  .animatedSelf h3.h3-responsive{
    font-size:125%;
  }
}
@media (min-width:768px){
  .animatedSelf h3.h3-responsive{
    font-size:125%;
  }
}
@media (min-width:576px){
  .animatedSelf h3.h3-responsive{
    font-size:125%;
  }
}
</style>









