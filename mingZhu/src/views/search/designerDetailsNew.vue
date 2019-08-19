<template>
  <div class="designerInfo" v-loading.fullscreen.lock="fullscreenLoading" style="overflow: hidden; padding-top: 5.5rem">
    <section>
      <div class="container-fluid">
        <br>
        <h1 class="py-3 text-center" style="font-size:40px;margin-bottom: .5rem">
          <strong>{{infoByDesigner.designerSerial}}</strong>
        </h1>
        <p class="edit-icon">
          <span @click.stop="isEditPersonalIntroductions">
            <mdb-icon far :icon="!isEditPI?'edit':'save'" />{{!isEditPI?"编辑":"提交"}}
          </span>
          <span v-if="isEditPI" @click.stop="goBackEditPI">
            <mdb-icon icon="undo-alt" />返回
          </span>
        </p>
        <p class="mb-4 text-center text-uppercase spacing">个人简介</p>
        <mdb-row class="flex-center">
          <mdb-col class="col-md-10 col-xl-5">
            <div v-if="isEditPI">
              <mdb-textarea label="编辑个人简介" :value="desc" @input="personalIntroductionsInput($event)" :rows="5"
                ref="PI" />
            </div>
            <div v-else>
              {{desc}}
            </div>
          </mdb-col>
        </mdb-row>
      </div>
    </section>
    <section>
      <div class="container-fluid grey lighten-4">
        <hr class="my-5">
        <mdb-container>
          <mdb-row class="mt-5 pt-3 ml-4">
            <div class="col-lg-3 col-12 mt-1">
              <!-- 设计师个人介绍 -->
              <mdb-card class="promoting-card">
                <mdb-view hover>
                  <a>
                    <img class="card-img-top" v-if="infoByDesigner" :src="infoByDesigner.head"
                      alt="Card image cap"></img>
                    <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                  </a>
                </mdb-view>
                <mdb-card-body>
                  <h5 class="card-title dark-grey-text text-center grey lighten-4 py-2">
                    <strong style="font-size:14.4px">{{infoByDesigner.designerSerial}}</strong>
                  </h5>
                  <p class="card-text d-inline-block" style="font-size:14.4px">
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
                  </p>
                  <P class="card-text">
                    <span @click.stop="isEditPersonalInfo" style="cursor: pointer;">
                      <mdb-icon far :icon="!isEditInfo?'edit':'save'" />{{!isEditInfo?'编辑':'提交'}}
                    </span>
                    <span v-if="isEditInfo" @click.stop="goBackEditInfo" style="cursor: pointer;">
                      <mdb-icon icon="undo-alt" />返回
                    </span>
                  </p>
                  <div v-if="isEditInfo">
                    <mdb-textarea class="d-inline-block edit-icon" style="overflow-y:auto;" label="编辑个人信息"
                      :value="description" @input="personalInfoInput($event)" :rows="5" ref="Pf" />
                  </div>
                  <div v-if="!isEditInfo" class="collapse-content">
                    <p class="card-text d-inline-block collapse" :class="show?'show':''" id="collapseContent"
                      style="width:100%;">
                      {{infoByDesigner.description}}
                    </p>
                    <a v-if="infoByDesigner.description&&infoByDesigner.description.length>70"
                      class="btn btn-flat red-text p-1 my-1 mr-0 mml-1 waves-effect waves-effect" data-toggle="collapse"
                      href="#DesignerDetails" :aria-expanded="show" :class="show?'':'collapsed'"
                      aria-controls="collapseContent" @click="show = !show"></a>
                    <br>
                  </div>
                  <!-- <div class="fun-btn">
                        <a type="button" class="btn-floating btn-sm grey lighten-2 ml-4 waves-effect waves-light" @click="concernDesigner">
                          <i class="far fa-heart" :class="isfocus===true?'red-text':''" data-toggle="tooltip" data-placement="top" title="关注"></i>
                        </a>
                        <a type="button" class="btn-floating btn-sm grey lighten-2 waves-effect waves-light">
                          <i class="fas fa-plus" data-toggle="tooltip" data-placement="top" title="邀请"></i>
                        </a>
                        <a type="button" class="btn-floating btn-sm grey lighten-2 waves-effect waves-light">
                          <i class="fas fa-share-alt" data-toggle="tooltip" data-placement="top" title="分享"></i>
                        </a>
                      </div> -->
                </mdb-card-body>
              </mdb-card>
              <!-- 获奖经历 -->
              <mdb-card class="section widget-content mt-5" v-if="honors&&honors.length>0">
                <mdb-card-body class="pb-0">
                  <h5 class="card-title dark-grey-text text-center grey lighten-4 py-2 mb-4">
                    <strong>获奖经历</strong>
                  </h5>
                  <div class="single-post" style="margin-top:1rem;">
                    <mdb-row v-for="item in honors" :key="item.id" class="mb-4">
                      <mdb-col col="5">
                        <mdb-view :src="item.honorPhoto" hover>
                          <mdb-mask overlay="white-slight" waves />
                        </mdb-view>
                      </mdb-col>
                      <mdb-col col="7">
                        <h6 class="mt-2 mb-2">
                          {{item.honorLevel}}
                        </h6>
                      </mdb-col>
                    </mdb-row>
                  </div>
                </mdb-card-body>
              </mdb-card>
              <!-- 个人动态 -->
              <mdb-card class="section widget-content mt-5">
                <mdb-card-body>
                  <h5 class="card-title dark-grey-text text-center grey lighten-4 py-2">
                    <strong style="font-size: 16px">个人动态</strong>
                  </h5>
                  <div class="personal-dynamic">
                    <P class="card-text d-inline-block edit-icon" style="margin:0.5rem 0;">
                      <span @click="newDesignerDynamic">
                        <mdb-icon far :icon="!isEditPD?'edit':'save'" />{{!isEditPD?'新增':'提交'}}
                      </span>
                      <span v-if="isEditPD" @click.stop="goBackEditPD">
                        <mdb-icon icon="undo-alt" />返回
                      </span>
                    </p>
                    <div v-if="isEditPD">
                      <mdb-textarea label="编辑个人动态" :value="personalDynamicCon" @input="personalDynamicInput($event)"
                        :rows="5" ref="pD" />
                    </div>
                    <mdb-col col="12" class="px-0 mb-3" v-if="!isEditPD && dynamincList&&dynamincList.length>0">
                      <p style="font-size: 16px" class="mb-1 text-hover font-smallr dark-grey-text"
                        v-for="item in dynamincList" :key="item.id">
                        {{item.content}}
                      </p>
                    </mdb-col>
                  </div>
                </mdb-card-body>
              </mdb-card>
              <!-- 合筑视界文章 -->
              <mdb-card style="margin-top:2rem" v-if="excellentList1.length>0">
                <mdb-carousel :interval="8000" showIndicators role="listbox">
                  <mdb-carousel-item img :src="item.url" :alt="item.title"
                    class="mask flex-center rgba-black-light waves-effect waves-light"
                    v-for="(item,index) in excellentList1" :key="index" @click.native="goExcellentDetial(item.id)">
                    <div @click.native="newsDetails(item.id)" style="cursor: pointer"
                      class="carousel-caption animated fadeInDown animatedSelf">
                      <h5 class="h4-responsive font-weight-bold">{{item.title}}</h5>
                      <p>{{item.subTitle}}</p>
                    </div>
                  </mdb-carousel-item>
                </mdb-carousel>
                <div class="single-post" style="margin-top:1rem; padding:0rem 1rem;"
                  v-if="excellentList2&&excellentList2.length>0">
                  <mdb-row v-for="(item,index) in excellentList2" :key="index" class="mb-3" style="cursor: pointer;"
                    @click.native="goExcellentDetial(item.id)">
                    <mdb-col md="4">
                      <mdb-view :src="item.url" hover>
                        <mdb-mask overlay="white-slight" waves />
                      </mdb-view>
                    </mdb-col>
                    <mdb-col md="8">
                      <h6 class="mt-0 mb-2 excellent-title">
                        <strong>{{item.title}}</strong>
                      </h6>
                      <div class="post-data">{{item.createTime.split(" ")[0]}}</div>
                    </mdb-col>
                  </mdb-row>
                </div>
                <div class="more text-center mb-3" @click="goExcellent" v-if="excellentListLen>10">
                  查看更多
                </div>
              </mdb-card>
              <!-- 作品类型 -->
              <mdb-card class="section widget-content mt-5">
                <mdb-card-body>
                  <h5 class="card-title dark-grey-text text-center grey lighten-4 py-2">
                    <strong>作品类型</strong>
                  </h5>
                  <mdb-list-group>
                    <mdb-list-group-item class="work-detials" v-for="item in caseClasses" :key="item.id">
                      <div @click="getCaseClass(`${item.value}`)" class="clearfix" style="width:100%;">
                        {{item.name}}
                        <badge class="badge-primary fr" pill>{{item.num}}</badge>
                      </div>
                    </mdb-list-group-item>
                  </mdb-list-group>
                </mdb-card-body>
              </mdb-card>
              <!-- 所属事务所 -->
              <mdb-card class="section widget-content my-5">
                <mdb-card-body>
                  <h5 class="card-title dark-grey-text text-center grey lighten-4 py-2">
                    <strong>{{desigerWorkInfo.workType || '所属事务所'}}</strong>
                  </h5>
                  <div class="belong-business">
                    <div class="business-info">
                      <!-- <P  class="edit-icon" style="margin:0.5rem 0;">
                            <span @click="isEditBusinessInfo">
                              <mdb-icon far :icon="!isEditBI?'edit':'save'" />{{!isEditBI?'编辑':'提交'}}
                            </span>
                          </p> -->
                      <!-- <div v-if="isEditBI">
                            <mdb-textarea label="编辑所属事务所" value="欧蒂娜·戴克工作室，事务所招聘结构设计师" @input="businessInfoInput" :rows="5"/>
                          </div> -->
                      <div v-if="!isEditBI">
                        <!-- <p class="text-center text-dark">
                              {{desigerWorkInfo.workType}}
                            </p> -->
                        <p class="text-center text-dark mb-3">
                          <!-- {{desigerWorkInfo.scaleValue}} -->
                          {{desigerWorkInfo.scaleName}}:
                          {{desigerWorkInfo.scaleValue}}
                        </p>
                        <!-- <mdb-view hover v-if="desigerWorkInfo&&desigerWorkInfo.uploadFiles&&desigerWorkInfo.uploadFiles.length>0">
                              <mdb-card-image class="succeed-wrapper" :src="desigerWorkInfo.uploadFiles[0]" alt="Card image cap"></mdb-card-image>
                              <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                            </mdb-view> -->
                        <div v-if="desigerWorkInfo.uploadFiles&&desigerWorkInfo.uploadFiles.length>0">
                          <mdb-view class="pt-1" hover v-for="(item,index) in desigerWorkInfo.uploadFiles" :key="index">
                            <mdb-card-image class="succeed-wrapper" :src="item" alt="Card image cap"></mdb-card-image>
                            <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                          </mdb-view>
                        </div>
                      </div>
                    </div>
                  </div>
                </mdb-card-body>
              </mdb-card>
            </div>
            <div class="col-lg-8 col-12 mt-1 mx-lg-4" style="padding-left: -15px">
              <mdb-card style="margin-bottom:2rem;" class="card hoverable" v-for="item in caseList" :key="item.id">
                <mdb-view hover>
                  <mdb-card-image :src="item.pictureUrls" alt="Card image cap"></mdb-card-image>
                  <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                </mdb-view>
                <mdb-card-body class="mx-4">
                  <mdb-card-title style="font-size: 24px;font-weight: bolder;">{{item.caseName}}</mdb-card-title>
                  <hr>
                  <mdb-card-text style="font-size: 16px" class="textContent">{{item.caseDetail}}</mdb-card-text>
                  <br />
                  <p style="font-size: 14.4px" class="font-small font-weight-bold blue-grey-text mb-1">
                    <i class="far fa-clock-o"></i> {{item.finishTime}}
                  </p>
                  <a style="font-size: 16px" class="black-text d-flex justify-content-end" @click="caseDetail(item)">
                    <h5>更多
                      <mdb-icon icon="angle-right" class="pl-1" />
                    </h5>
                  </a>
                </mdb-card-body>
              </mdb-card>
              <pagination :total="paginationPage.totalCount" :pageSize="paginationPage.pageSize"
                @changePage="handleCurrentChange" v-if="paginationPage.totalCount !=0"></pagination>
            </div>
          </mdb-row>
        </mdb-container>
      </div>
    </section>
    <!-- 合筑消息 -->
    <section style="margin-top:3rem;">
      <div class="container-fluid white mb-0 pb-0">
        <hr class="mt-0">
        <div class="container">
          <!--Grid row-->
          <div class="row">
            <!--Grid column-->
            <div class="col-lg-4 col-md-12">
              <h6 class="font-weight-bold mt-5 mb-3">竞赛消息</h6>
              <hr class="mb-5">
              <mdb-view hover rounded class="z-depth-1-half contentInfo"
                @click.native="$router.push('/competitionDetail?activityId=' + contestList.id);">
                <img class="img-fluid z-depth-1" :src="contestList.picture" alt="Sample image" style="width:100%">
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
                <div class="col-4" @click="$router.push('/newsDetails?id=' + item.id);">
                  <!--Image-->
                  <mdb-view hover class="z-depth-1-half" style="height:100%;">
                    <img class="img-fluid imgPaved" :src="item.thumbnailPic" alt="Sample image">
                    <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                  </mdb-view>
                </div>
                <!--Grid column-->
                <!--Second column-->
                <div class="col-8 mb-1" @click="$router.push('/newsDetails?id=' + item.id);">
                  <!--Post data-->
                  <div class>
                    <p class="mb-1 new-saml-title">
                      <a href="#!" class="text-hover font-weight-bold">
                        {{item.newsTitle}}
                      </a>
                    </p>
                    <p class="font-small" style="font-size:0.9rem;font-style:italic">
                      <!-- <em>{{item.newsTime | formatDate}}</em> -->
                      <em>{{item.newsTime}}</em>
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
              <div class="row" v-for="(item,index) in pointList" :key="index" style="height:5.5rem;">
                <!--Grid column-->
                <div class="col-4" @click.prevent="goProjectDetial(item.id)">
                  <mdb-view hover class="z-depth-1-half" style="height:100%;">

                    <img class="img-fluid imgPaved" :src="item.cover" alt="Sample image">
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
                      <!-- <em>{{item.createTime | formatDate}}</em> -->
                      <em>{{item.createTime}}</em>
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
    <!-- </div> -->
  </div>
</template>
<script>
  import tabReset from "@/assets/css/elementReset.css";
  export default {
    components: {},
    data() {
      return {
        fullscreenLoading: false,
        show: false,   //个人信息是否全部显示

        isEditPI: false,  //是否编辑个人简介  false:显示；true：编辑
        isEditInfo: false, //是否编辑个人信息   false:显示；true：编辑
        isEditPD: false,  //是否编辑个人动态   false:显示；true：编辑
        isEditBI: false, //是否编辑个人动态   false:显示；true：编辑

        infoByDesigner: "", //个人详情
        honors: "",  //获奖经历
        dynamincList: "",  //个人动态
        personalDynamicCon: "", //动态内容
        caseClasses: "", //作品类型
        caseList: "",  //所有作品、分类作品
        caseType: "",  //设计师作品：作品类型
        excellentList1: [], //合筑视界 轮播图
        excellentList2: [], //合筑视界 列表
        excellentListLen: 0,  //文章长度
        desigerWorkInfo: "",  //所属事务所

        paginationPage: {    //分页
          pageSize: 4,
          page: 1,
          totalCount: 0,
        },

        contestList: "",   //合筑竞赛消息
        newsList: "",  //合筑新闻
        pointList: "",   //项目信息

        bossId: 152, //
        designerId: 0,  //设计师Id
        designerName: "",  //

        isfocus: false,  //关注
        role: "",  //角色

        desc: "",   //个人简介1
        description: "",   //个人简介2
        locaTion: ""
      }
    },
    mounted() {
      if ((localStorage.getItem("userId") || sessionStorage.getItem("userId")) &&
        (localStorage.getItem("userId") || sessionStorage.getItem("userId"))) {
        this.designerId = sessionStorage.getItem("userId");
        this.designerId = localStorage.getItem("userId");
        this.role = sessionStorage.getItem("role");
        this.role = localStorage.getItem("role");
        this.init();
      } else {

      }
    },
    updated() {
      let el = document.getElementsByClassName('new-saml-title');
      if (el.length == 6) {
        for (let j = 0; j < el.length; j++) {
          let n = el[j].offsetheight;
          while (el[j].offsetHeight < el[j].scrollHeight) {
            let s = el[j].children[0].innerText;
            el[j].children[0].innerText = s.substr(0, s.length - 7);
            el[j].children[0].innerText += '...';
          }
        }
      };
      let tx = document.getElementsByClassName('textContent');
      for (let jj = 0; jj < tx.length; jj++) {
        let nn = tx[jj].offsetheight;
        while (tx[jj].offsetHeight < tx[jj].scrollHeight) {
          let ss = tx[jj].innerText;
          tx[jj].innerText = ss.substr(0, ss.length - 4);
          tx[jj].innerText += '...';
        }
      }
    },
    watch: {
      description(val) {
        this.description = val
      },
      desc(val) {
        this.desc = val
      }
    },
    methods: {
      goProjectDetial(id) {
        console.log(id)
        this.$router.push(`/projectDetail/${id}`);
      },
      // 获取服务区域
      getLocation() {
        this.api.getLocation(this.designerId).then(res => {
          this.locaTion = res.data[0].country + ',' + res.data[0].state + ',' + res.data[0].city
        })
      },
      //初始化
      init() {
        this.getInfoByDesigner();   //设计师基本信息
        this.getHonor(); //设计师奖励经历
        this.getCaseClassification()  //作品类型
        this.getCaseListByDesigner()  //作品列表
        this.getDesigerDynamic()   //设计师个人动态
        this.getExcellentList()  //合筑视界文章
        this.getDesigerWorkType()  //所属事务所
        this.gerContest()  //竞赛消息
        this.gerNews()  //合筑新闻
        this.gerPoint()   //推荐项目

        this.getLocation()
      },
      //更新设计师简介
      designerUpdate(desc, description) {
        this.designerId = localStorage.getItem("userId");
        this.api.getDesignerInfoUpdateNew({
          description: description,
          desc: desc,
          id: this.designerId,
          type: 1
        }, 4).then(res => {
          if (res.code === 0) {
            this.$message(res.msg)
            this.getInfoByDesigner()
          } else {
            this.$message(res.msg)
            this.getInfoByDesigner()
          }
        })
      },
      //合筑视界列表
      goExcellent() {
        this.$router.push({ path: "excellentProject" });
      },
      // 合筑视界详情
      goExcellentDetial(id) {
        this.$router.push({
          name: "excellentProjectDetails",
          query: {
            id: id
          }
        });
      },
      //合筑视界文章list
      getExcellentList() {
        this.api.getexcellentList({
          subTitle: this.designerId,
          page: 1,
          limit: 10,
        }).then(res => {
          let list = res.data
          if (list.length > 0) {
            this.excellentListLen = res.total
            if (this.excellentListLen < 5) {
              this.excellentList1 = list.slice(0, list.length);
            } else {
              this.excellentList1 = list.slice(0, 5);
              this.excellentList2 = list.slice(5, 10);
            }
          }

        })
      },
      //设计师基本信息
      getInfoByDesigner() {
        // this.fullscreenLoading = true;
        this.api.getInfoByDesignerId({ id: this.designerId }).then(res => {
          this.infoByDesigner = res.data,
            this.designerName = this.infoByDesigner.realName
          this.description = this.infoByDesigner.description
          this.desc = this.infoByDesigner.desc
          if (!this.desc) {
            this.isEditPI = true
            setTimeout(() => {
              this.$refs.PI.focus()
            }, 0)
          } else {
            this.isEditPI = false
          }
          if (!this.description) {
            this.isEditInfo = false
            setTimeout(() => {
              this.$refs.Pf.focus()
            }, 0)
          } else {
            this.isEditInfo = false
          }
          // this.fullscreenLoading = false;
        })
      },
      //设计师奖励经历
      getHonor() {
        this.api.getHonors({ designerId: this.designerId }).then(res => {
          this.honors = res.data
        })
      },
      //作品类型
      getCaseClassification() {
        this.api.getCaseClassification({ designerId: this.designerId }).then(res => {
          this.caseClasses = res.data
        })
      },
      // 作品
      getCaseListByDesigner() {
        this.fullscreenLoading = true;
        let params = {
          buildingType: this.caseType,
          designerId: this.designerId,
          page: this.paginationPage.page,
          pageSize: this.paginationPage.pageSize
        }
        this.api.queryListByDesignerId(params).then(res => {
          if (res.desginerCases) {
            this.caseList = res.desginerCases
            this.paginationPage.totalCount = res.total
          }
          this.fullscreenLoading = false;
        })
      },
      //作品类型列表
      getCaseClass(caseType) {
        this.caseType = caseType
        this.getCaseListByDesigner();
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
      //关注
      // concernDesigner(){
      //   if(this.designerId && this.role==1){
      //     if(!this.isfocus){
      //       this.api.concernDesigner({
      //         bossId:this.designerId,
      //         designerId:this.bossId,
      //       }).then(res=>{
      //         if(res.code == 1)
      //         this.isfocus = true
      //       })
      //     }else{
      //       this.api.cancelConcernDesigner({
      //         bossId:this.designerId,
      //         designerId:this.bossId,
      //       }).then(res=>{
      //         console.log(res)
      //         this.isfocus = false
      //       })
      //     }
      //   }else{
      //   if(this.role==1){
      //     this.$message("角色不匹配，不能执行此操作")
      //   }
      //    if(!this.designerId){
      //     this.$message("请先登陆，执行此操作")
      //    }
      //   }
      // },
      //返回
      goBackEditPI() {
        this.isEditPI = false
      },
      //输入个人简介
      personalIntroductionsInput(e) {
        this.desc = e
      },
      //是否编辑个人简介
      isEditPersonalIntroductions() {
        this.isEditPI = !this.isEditPI
        if (!this.isEditPI) {
          this.designerUpdate(this.desc, this.description)
        } else {
          setTimeout(() => {
            this.$refs.PI.focus()
          }, 0)
        }
      },
      //返回个人信息
      goBackEditInfo() {
        this.isEditInfo = false
      },
      // 输入个人信息
      personalInfoInput(e) {
        this.description = e
      },
      //是否编辑个人信息
      isEditPersonalInfo() {
        this.isEditInfo = !this.isEditInfo
        if (!this.isEditInfo) {
          this.designerUpdate(this.desc, this.description)
        } else {
          setTimeout(() => {
            this.$refs.Pf.focus()
          }, 0)
        }
      },
      //返回个人动态
      goBackEditPD() {
        this.isEditPD = false
      },
      // 编辑个人动态
      personalDynamicInput(e) {
        this.personalDynamicCon = e;
      },
      // 查询设计师个人动态
      getDesigerDynamic() {
        this.api.getDesigerDynamic({ designerId: this.designerId }).then(res => {
          this.dynamincList = res.rows
          // if(this.dynamincList&&this.dynamincList.length>0){
          //   this.isEditPD = false
          // }else{
          //   this.isEditPD = true
          //   setTimeout(()=>{
          //     this.$refs.pD.focus()
          //   },0)
          // }
        })
      },
      // 新增个人动态
      newDesignerDynamic() {
        this.isEditPD = !this.isEditPD
        if (this.isEditPD) {
          setTimeout(() => {
            this.$refs.pD.focus()
          }, 0)
        } else {
          this.api.newDesignerDynamic({
            designerId: this.designerId,
            designerName: this.designerName,
            content: this.personalDynamicCon
          }).then(res => {
            if (res.code == 0) {
              this.$message("提交成功，审核中，请等待。")
              this.getDesigerDynamic()
            } else {
              this.$message(res.msg)
            }
          })
        }
      },
      //编辑所属事务所
      businessInfoInput() {

      },
      //查询所属事务所
      getDesigerWorkType() {
        this.api.getDesigerWorkType(null, this.designerId).then(res => {
          this.desigerWorkInfo = res.data;
        })
      },
      //是否编辑所属事务所
      isEditBusinessInfo() {
        this.isEditBI = !this.isEditBI
      },
      //分页
      handleCurrentChange(currentPage) {
        this.paginationPage.page = currentPage;
        this.getCaseListByDesigner();
      },
      caseDetail(item) {
        this.$router.push({
          name: 'CaseDetails',
          query: {
            caseId: item.id
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @media only screen and (min-width: 1600px) {
    .designer-information {
      max-width: 1200px;
      margin: auto;
    }
  }

  .designerInfo {
    width: 100%;

    .card-image {
      width: 100%;
      padding: 6rem 0 3rem;
      color: #4f4f4f;
    }

    strong {
      font-weight: bolder;
    }

    .edit-icon {
      text-align: right;
      margin-right: 12.5rem;

      span {
        cursor: pointer;
      }
    }
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
    height: 7.25rem !important;
    -webkit-line-clamp: 18 !important;
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

  .work-detials {
    cursor: pointer;
  }

  .excellent-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1rem;
    cursor: pointer;
  }

  .more {
    cursor: pointer;
  }

  .animatedSelf {
    position: absolute;
    top: 0;
    transition: top 0.5s;
    -webkit-transition: top 0.5s;
  }

  .active>.animatedSelf {
    position: absolute;
    top: 20px;
  }

  .new-saml-title {
    // color: #333 !important;
    // text-overflow:ellipsis;
    overflow: hidden;
    // display: -webkit-box;
    // -webkit-line-clamp: 2;
    // -webkit-box-orient: vertical;
    height: 48px;
    line-height: 24px;
  }

  .textContent {
    line-height: 1.5rem;
    height: 4.5rem;
    overflow: hidden;
    position: relative;
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
  .imgPaved {
    width: 100%;
    height: 4rem;
  }

  .text-hover {
    color: #424242;
    transition: .4s;
  }

  .text-hover:hover {
    color: #0056b3 !important;
  }
</style>
<style lang="less">
  .designerInfo {
    .h3-responsive {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .carousel-inner div.carousel-caption.caption-bottom {
      bottom: 20% !important;
      // animation:myfirst 5s;
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      -webkit-animation-name: fadeInDown;
      animation-name: fadeInDown;
    }

    .carousel-inner .view {
      height: 100%;
      width: 100%;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .single-post {
      .overlay {
        img {
          height: 3.125rem;
        }
      }
    }
  }
</style>
