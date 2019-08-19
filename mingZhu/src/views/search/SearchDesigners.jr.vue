<template>
  <div class="designers" >
    <div class="SelectCheckBox" v-loading.fullscreen.lock="fullscreenLoading">
      <mdb-row  class="content">
        <mdb-row style="width:100%">
          <div class="grid-content" style="width:100%">
            <mdb-row class="search-wrap">
              <mdb-col lg="2">
              </mdb-col>
              <mdb-col lg="10" style="padding: 0px 8px;">
                <mdb-row class="mdb-search" v-if="index==0">
                  <mdb-col col="6" class="serach-box">
                    <div class="grid-content bg-purple searchBox" :class="{'active': searchBox}">
                      <i class="el-icon-search"></i>
                      <input
                        type="text"
                        name="uname"
                        placeholder="输入您想搜的内容"
                        v-model="resourcesForm.caseName"
                        @focus="searchFocus"
                        @blur="searchBlur"
                        ref="searchBox"
                      >
                    </div>
                  </mdb-col>
                  <mdb-col col='1' style="padding-left:0; max-width:max-content; padding-right:0">
                    <div style="margin-left:0!important" class="submit" @click="search()">搜索</div>
                  </mdb-col>
                </mdb-row>
              </mdb-col>
            </mdb-row>
            <mdb-row>
              <mdb-col col="1"></mdb-col>
              <mdb-col  col="10">
                <div class="select-conditions" v-if="conditions != null && index==0">
                  <ul>
                    <li v-for="item in conditions" :label="item.name" :key="item.value">
                      <button @click="close(item)">
                        <i class="el-icon-close"></i>
                      </button>
                      <a>{{item.name}}</a>
                    </li>
                  </ul>
                </div>
              </mdb-col>
              <mdb-col col="1"></mdb-col>
            </mdb-row>
            <mdb-row>
              <mdb-col  col="12">
                <ul class="title-tabs">
                      <li>
                        <p class="h4" style="color:#333;font-weight:600;">所有建筑师资源</p>
                    </li>
                  </ul>
              </mdb-col>
            </mdb-row>
            <!-- 更改form表单为左右结构start -->
            <!-- v-if="index==0&&!fullscreenLoading" -->
            <div class="container-filter row" style="padding: 0 .5rem" >
              <div class="col-lg-2 mb-4" style="padding: 0 0.5rem;">
                <div v-if="index==0" class="filter-header card">
                  <mdb-row>
                    <mdb-col lg="12" md="3" col="6">
                      <p class="title text-left">建筑师类型</p>
                      <div class="left-filter" v-if="searchDesigner.length>0">
                        <div class="form-check pl-0" v-for="item in searchDesigner" :key="item.id">
                          <input
                            type="radio"
                            class="form-check-input"
                            :value="item.id"
                            name="architecture"
                            :checked="architectureChecked"
                            :id="`${item.name}`+1"
                            v-model="architectureChecked">
                          <label class="form-check-label" :for="`${item.name}`+1">{{item.name}}</label>
                        </div>
                      </div>
                    </mdb-col>
                    <mdb-col lg="12" md="3" col="6">
                      <p class="title text-left">工作模式</p>
                      <div class="left-filter">
                        <div class="form-check pl-0" v-for="item in teamNumberList" :key="item.id">
                          <input
                            type="radio"
                            class="form-check-input"
                            :value="item.value"
                            name="teamChecked"
                            :checked="teamChecked"
                            :id="`${item.name}`+2"
                            v-model="teamChecked">
                          <label class="form-check-label" :for="`${item.name}`+2">{{item.name}}</label>
                        </div>
                      </div>
                    </mdb-col>
                    <mdb-col lg="12" md="3" col="6">
                      <p class="title text-left">工作年限</p>
                      <div class="left-filter">
                        <div class="form-check pl-0" v-for="item in workLifeList" :key="item.id">
                          <input
                            type="radio"
                            class="form-check-input"
                            :value="item.value"
                            name="workLifeChecked"
                            :checked="workLifeChecked"
                            :id="`${item.name}`+3"
                            v-model="workLifeChecked">
                          <label class="form-check-label" :for="`${item.name}`+3">{{item.name}}</label>
                        </div>
                      </div>
                    </mdb-col>
                    <mdb-col lg="12" md="3" col="6">
                      <p class="text-left title">执业资格</p>
                      <div class="left-filter">
                        <div class="form-check pl-0" v-for="item in qualificationList" :key="item.id">
                          <input
                            type="radio"
                            class="form-check-input"
                            :value="item.value"
                            name="certificateChecked"
                            :checked="certificateChecked"
                            :id="`${item.name}`+4"
                            v-model="certificateChecked">
                          <label class="form-check-label" :for="`${item.name}`+4">{{item.name}}</label>
                        </div>
                      </div>
                    </mdb-col>
                    <mdb-col lg="12" md="3" col="6">
                      <p class="title">擅长类型</p>
                      <div class="left-filter">
                        <mdb-container class="px-0">
                          <mdb-select  v-if="buildingTypeList.length>0" btnSavePlaceholder="确认" class="text-left my-0" multiple :options="buildingTypeList" @getValue="handleGetValue1" />
                        </mdb-container>
                      </div>
                    </mdb-col>
                    <mdb-col lg="12" md="3" col="6">
                      <p class="title">工作地点</p>
                      <div class="left-filter">
                        <mdb-container  class="px-0 ">
                          <mdb-select v-if="buildingTypeList.length>0" btnSavePlaceholder="确认" class="text-left my-0" multiple :options="workplaceList" @getValue="getWorkplace" />
                        </mdb-container>
                      </div>
                    </mdb-col>
                  </mdb-row>
                </div>
              </div>
              <div class="col-lg-10" style="padding: 0 8px; background-color: transparent;">
                <div class="card">
                  <!-- 排序方式 -->
                  <div class="sort" v-if="index==0">
                    <label>排序方式</label>:
                    <span
                      class="sortMethods"
                      v-for="(item,index) in sortMethods"
                      :key="index"
                      @click="selectSort(item.name,index)"
                      :class="index==clickIndex?'active':''"
                    >{{item.name}}</span>
                  </div>
                  <!-- 排序方式 -->
                  <div class="listMenu" v-if="index==0">
                    <mdb-col col="6" style="text-align:center" v-if="this.totalCount==0">
                      <div class="noCase">暂无符合要求的建筑师请更换搜索条件重试</div>
                    </mdb-col>
                    <mdb-row  v-for="(item,index1) in designerList" :key="index1" class="right-pic">
                      <div class="imgBox" style="position: relative;height: 13rem;cursor :pointer;">
                        <img src="../../assets/images/mingzhujianzhu.jpg" alt="" style="width:100%;height: 100%" class="pic-swirter" v-if="item.desginerCases.length==0">
                        <img :src="pictureUrls[index1]" alt="" style="width:100%;height: 100%" class="pic-swirter" v-else>
                        <div @click="checkDetails(listItem.id)"
                             :style="{width:item.desginerCases.length>0 ? 100/item.desginerCases.length + '%' : '100%'}"
                             v-for="(listItem,index) in item.desginerCases"
                             :key="listItem.id" class="opcityDiv" @mouseover="designerListChild(item, listItem,index1,index)"></div>
                      </div>
                      <div class="designerBox">
                        <mdb-row>
                          <!-- <mdb-col md="12"> -->
                            <div class="headPhotoBox">
                              <div class="headPhoto" @click="designerDetails(item)">
                                <img :src="item.head">
                              </div>
                            </div>
                            <div>
                              <p v-if="item.designerSerial&&item.designerSerial!='null'"
                                class="designerName"
                                @click="designerDetails(item)"
                              >{{item.designerSerial}}</p>
                              <div class="city" v-if="item.description1&&item.description1!='null'">
                                <span>{{item.description1}}</span>
                              </div>
                            </div>
                          <!-- </mdb-col> -->
                        </mdb-row>
                        <div class="designer-message">
                            <div class="brief" style="-webkit-box-orient: vertical;">{{item.desc}}</div>
                            <div class="readMore" @click="designerDetails(item)">了解更多<mdb-icon icon="angle-right" /></div>
                        </div>
                        <p class="clearfix infoIcon">
                          <span class="attentionNum" style="margin-right:2.5rem;">
                            <img src="@/assets/images/end-project-icon.png" class="align-middle mr-1">
                           关注
                            <span>{{item.attention}}</span>
                          </span>
                            <span class="projectNum">
                             <img src="@/assets/images/attention.png" class="align-middle mr-1">
                            已完成项目
                            <span>{{item.cooperativeProject}}</span>
                          </span>
                        </p>
                        <div class="btnTeam">
                          <mdb-row>
                            <mdb-col col="6">
                                <div class="addConcern" @click="addConcern(item)">
                                    <span v-if="item.concernStatus == 0">关注</span>
                                    <span v-if="item.concernStatus == 1">已关注</span>
                                  </div>
                            </mdb-col>
                            <mdb-col col="6">
                                <div class="sendInvite" v-if="item.isInvited != 'Y'" @click="sendInvite(item)">
                                    <span>邀请</span>
                                  </div>
                                  <div class="sendInvite lg=12 col=6" v-else>
                                    <span>已邀请</span>
                                  </div>
                            </mdb-col>
                          </mdb-row>
                        </div>
                      </div>
                    </mdb-row>
                  </div>
                </div>
              </div>
            </div>
            <div class="block" v-if="index==0&&totalCount !=0">
              <pagination :total="totalCount" :pageSize="pageSize" :curPage="pageNumber" @changePage="handleCurrentChange" v-if="totalCount !=0"></pagination>
            </div>
          </div>
        </mdb-row>
      </mdb-row>
     <div class='invite-dialog'>
      <el-dialog title="项目列表" :visible.sync="centerDialogVisible" width="30%" center>
        <span>
          <el-checkbox-group v-model="projectId" :max="1">
            <el-checkbox
              style="display:block;"
              v-for="item in projectList"
              :key="item.projectId"
              :true-label="item.projectId"
              false-label
              :checked="item.checked"
              @change="getProjectId(item.id,item.projectId)"
            >{{item.projectName}}</el-checkbox>
          </el-checkbox-group>
        </span>
      </el-dialog>
     </div>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mdbInput, mdbSelect, mdbContainer } from 'mdbvue';
import { mapGetters } from 'vuex';
const searchDesigner = [
  { name: "不限",value:null, id: null },
  { name: "知名建筑师",value:"知名建筑师", id: "1" },
  { name: "合筑建筑师",value:"合筑建筑师", id: "0" },
  { name: "境外建筑师",value: "境外建筑师", id: "2" }
];
const sortMethods = [{ name: "工作年限" }, { name: "关注数量" }, { name: "完成项目数" }];
export default {
  components: {
    swiper,
    swiperSlide,
    mdbInput,
    mdbSelect,
    mdbContainer
  },
  computed: {
    // 获取登陆状态
    ...mapGetters([
      'getIsLogin'
    ])
  },
  data() {
    return {
      pictureUrls: [],
      picIndex: 0, // 初始图片显示第一张
      clicked: 0,
      centerDialogVisible: false,
      clickIndex: -1,
      flag:0,
      fullscreenLoading: false,
      paginationShow: true,
      searchDesigner: searchDesigner,
      sortMethods: sortMethods,
      conditions: [],
      teamNumberList: [],
      workplaceList: [],
      qualificationList: [],
      buildingTypeList: [],
      workLifeList: [],
      designerList: [],
      projectList: [],
      projectId: "",
      // workPlaceChecked: [],
      // bulidTypeChecked: [],
      workLifeChecked: null,
      certificateChecked: null,
      teamChecked: null,  //工作模式
      architectureChecked: null, //建筑类型
      resourcesForm: {
        searchDesigner: 0,
        caseName: [],
        bulidType: [],
        workLife: [],
        workPlace: [],
        certificate: [],
        team: [],
        sort: "",
        pageNumber: 1,
        pageSize: 8,
        projectId: "",
        projectList: []
      },
      selectedFoem: {
        workPlace: [],
        bulidType:[],
      },
      value: "",
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 20,
        slidesPerGroup: 1,
        freeMode: true,
        simulateTouch: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      pageSize: 8,
      pageNumber: 1,
      totalCount: 0,
      allList: [],
      page: "",
      isShow: false,
      userId: "",
      allDate: [],
      checked: false,
      index: 0,
      isInvited:'N',
      designerTypeIndex:0,
      searchBox: false,
      // 是否是头部调用
      loginPage: 2
    };
  },
  methods: {
    //擅长类型
    handleGetValue1(v){
      this.resourcesForm.bulidType = v;
      // this.search();
    },
    //工作地点
    getWorkplace(v){
      this.resourcesForm.workPlace = v;
      // this.search();
    },
    // 搜索框focus
    searchFocus () {
      this.searchBox = true;
      this.$refs.searchBox.placeholder = '';
    },
    // 搜索框blur
    searchBlur () {
      this.searchBox = false;
      this.$refs.searchBox.placeholder = '输入您想搜的内容';
    },
    // 鼠标划入当前条
    designerListChild(item, listItem,index1,index) {
      // console.log(item, listItem,index1,index)
      this.$set(this.pictureUrls, index1, item.desginerCases[index].pictureUrls)
    },
    // 建筑师条件搜索
    searchDesigners(item) {
      this.designerTypeIndex=item.id
      this.resourcesForm.searchDesigner = item.id;
      this.getDesignerList(this.resourcesForm)

      // this.clicked = item.index;
      // if (this.index == 0) {
      //   this.resetCaseList();
      // }
    },
    resetCaseList() {
      this.resourcesForm.pageSize = 8;
      this.resourcesForm.bulidType = [];
      this.resourcesForm.workLife = [];
      this.resourcesForm.workPlace = [];
      this.resourcesForm.team = [];
      this.resourcesForm.sort = [];
      this.resourcesForm.pageNumber = 1;
      this.resourcesForm.caseName = [];
      this.conditions = [];
      this.getDesignerList(this.resourcesForm);
      this.pageSize = 8;
      this.pageNumber = 1;
      this.index = 0;
    },
    getbuildingType() {
      //擅长类型
      this.api.buildingType("building_type").then(res => {
        this.buildingTypeList = res.data;
        this.buildingTypeList.map(item => {
          item.text = item.name;
          item.value = item.name;
        })
        this.buildingTypeList.unshift({text:'不限',value:null,selected: true })
        // this.bulidTypeChecked.push('不限')
      });
      //执业资格
      this.api.buildingType("qualification").then(res => {
        this.qualificationList = res.data;
        this.qualificationList.map(item => {
          item.text = item.name;
          item.value = item.name;
        })
        this.qualificationList.unshift({ name: "不限",value:null, id: null })
      });
      //工作地点
      this.api.buildingType("workplace").then(res => {
        this.workplaceList = res.data;
        this.workplaceList.map(item => {
          item.text = item.name;
          item.value = item.name;
        })
        this.workplaceList.unshift({text:'不限',value:null,selected: true })
        // this.workPlaceChecked.push('不限')
        // this.workplaceList.splice(0, 1)
      });
      //工作模式
      this.api.buildingType("designer_work_style").then(res => {
        this.teamNumberList = res.data;
        this.teamNumberList.map(item=>{
          item.name = item.name;
          item.value = item.name;
        })
        this.teamNumberList.unshift({ name: "不限",value:null, id: null })
      });
      //工作年限
      this.api.buildingType("work_life").then(res => {
        this.workLifeList = res.data;
        this.workLifeList.map(item=>{
          item.name = item.name;
          item.value = item.name;
        })
        this.workLifeList.unshift({ name: "不限",value:null, id: null })
      });
    },
    getDesignerList(resourcesForm) {

      this.fullscreenLoading = true;
      let parmas = {
        // adeptType: resourcesForm.bulidType.toString(),
        adeptType: resourcesForm.bulidType?resourcesForm.bulidType.toString():"",
        workLife: resourcesForm.workLife?resourcesForm.workLife.toString():"",
        // workplace: resourcesForm.workPlace.toString(),
        workplace: resourcesForm.workPlace?resourcesForm.workPlace.toString():"",
        qualification: resourcesForm.certificate?resourcesForm.certificate.toString():"",
        designerWorkStyle: resourcesForm.team?resourcesForm.team.toString():"",
        page: resourcesForm.pageNumber,
        recommendDescription: resourcesForm.caseName?resourcesForm.caseName.toString():"",
        projectId: resourcesForm.projectId,
        sort: resourcesForm.sort,
        userId: this.userId,
        limit: resourcesForm.pageSize,
        seniorDesigner:resourcesForm.searchDesigner,
        order:"desc"
      };
      this.api.getDesignerList(parmas).then(res => {
        if(res.code == 0){
        this.totalCount = res.data.pageUtils.total;
        this.designerList = res.data.pageUtils.rows;
        this.pictureUrls = []
        this.designerList.map(item => {
          if(item.desginerCases.length>0) {
            this.pictureUrls.push(item.desginerCases[0].pictureUrls)
          }
        })
        this.allList = this.designerList;
        // for(var i in this.designerList){
        //   var arr=[]
        //   arr.push(this.designerList[i].attention)
        //   console.log(arr)
        // }
        //this.attention=this.designerList
        }
        this.fullscreenLoading = false;
      });
    },
    // 清除下拉的空项
    removeSelected () {
      this.conditions = this.conditions.filter(item => {
        return item.value
      })
    },
    // 擅长类型下拉多选筛选事件
    // getTypeSelectGood (value) {
    //   this.selectedFoem.bulidType = value
    //   let _this = this
    //   if (document.getElementsByClassName('btn-save')[0]) {
    //     document.getElementsByClassName('btn-save')[0].addEventListener('click', function() {
    //       _this.resourcesForm.pageNumber = 1;
    //       _this.getDesignerList(_this.resourcesForm);
    //     },false)
    //   }
    // },
    // 工作地点下拉多选的筛选事件
    // getTypeSelectAddress (value) {
    //   this.selectedFoem.workPlace = value
    //   let _this = this
    //   if (document.getElementsByClassName('btn-save')[0]) {
    //     document.getElementsByClassName('btn-save')[0].addEventListener('click', function() {
    //       _this.resourcesForm.pageNumber = 1;
    //       _this.getDesignerList(_this.resourcesForm);
    //     },false)
    //   }
    // },
    // getType(item) {
    //   let hasChecked = false;
    //   for (var j = 0; j < this.conditions.length; j++) {
    //     if (this.conditions[j].name == item.name) {
    //       hasChecked = true;
    //       this.conditions.splice(j, 1);
    //     }
    //   }
    //   if (!hasChecked) {
    //     this.conditionsItem(item);
    //   }
    //   this.resourcesForm.pageNumber = 1;
    //   this.getDesignerList(this.resourcesForm);
    // },
    //关注
    conditionsItem(item) {
      var conditionsObj = {};
      conditionsObj.name = item.name;
      conditionsObj.value = item.value;
      this.conditions.push(conditionsObj);
    },
    //取消关注
    removeConditionsItem(item) {
      for (var j = 0; j < this.conditions.length; j++) {
        if (item.name == this.conditions[j].name) {
          var index1 = this.conditions.indexOf(this.conditions[j]);
          if (index1 > -1) {
            this.conditions.splice(index1, 1);
          }
        }
      }
    },
    close(item) {
      for (var j = 0; j < this.conditions.length; j++) {
        if (item.name == this.conditions[j].name) {
          var index1 = this.conditions.indexOf(this.conditions[j]);
          if (index1 > -1) {
            this.conditions.splice(index1, 1);
          }
        }
      }
      for (var i = 0; i < this.resourcesForm.bulidType.length; i++) {
        if (item.name == this.resourcesForm.bulidType[i]) {
          var index = this.resourcesForm.bulidType.indexOf(
            this.resourcesForm.bulidType[i]
          );
          if (index > -1) {
            this.resourcesForm.bulidType.splice(index, 1);
          }
        }
      }
      for (var i = 0; i < this.resourcesForm.workLife.length; i++) {
        if (item.name == this.resourcesForm.workLife[i]) {
          var index = this.resourcesForm.workLife.indexOf(
            this.resourcesForm.workLife[i]
          );
          if (index > -1) {
            this.resourcesForm.workLife.splice(index, 1);
          }
        }
      }
      for (var i = 0; i < this.resourcesForm.workPlace.length; i++) {
        if (item.name == this.resourcesForm.workPlace[i]) {
          var index = this.resourcesForm.workPlace.indexOf(
            this.resourcesForm.workPlace[i]
          );
          if (index > -1) {
            this.resourcesForm.workPlace.splice(index, 1);
          }
        }
      }
      for (var i = 0; i < this.resourcesForm.certificate.length; i++) {
        if (item.name == this.resourcesForm.certificate[i]) {
          var index = this.resourcesForm.certificate.indexOf(
            this.resourcesForm.certificate[i]
          );
          if (index > -1) {
            this.resourcesForm.certificate.splice(index, 1);
          }
        }
      }
      this.removeConditionsItem(item);
      this.getDesignerList(this.resourcesForm);
    },
    selectSort(name, index) {
      this.resourcesForm.sort = name;
      this.clickIndex = index;
      this.getDesignerList(this.resourcesForm);
    },
    handleCurrentChange(val) {
      if (val == null || val == 0) {
        this.pageNumber = 1;
      } else {
        this.pageNumber = val;
      }
      this.resourcesForm.pageNumber = this.pageNumber;
    },
    search() {
      this.getDesignerList(this.resourcesForm);
    },
    designerDetails(item) {
      const { href } = this.$router.resolve({
        path: "/seniorDesignerDetails",
        query: {
          id: item.id
        }
      });
      window.open(href, "_blank");
    },
    // 发送邀请
    sendInvite(item) {
      if (!this.getIsLogin) {
        // 未登陆处理
        this.loginHandle();
        return false;
      }
      if (this.resourcesForm.projectId != null) {
        this.invited(item.id);
      } else {
        this.getProjectArr(item.id);
      }
    },
    invited(id) {
      let projectId = this.resourcesForm.projectId;
      this.api
        .saveInviteList({
          designerId: id,
          projectId: projectId
        })
        .then(res => {
          if (res.code == 0 || res.code == 1) {
            this.$message(res.msg);
          } else {
            this.$message(res.msg);
          }
        });
        if(this.$route.query.id == null){
          this.resourcesForm.projectId=null
        }
    },
    getProjectArr(id) {
      this.resourcesForm.projectId=null;
      this.projectId = null;
      this.api.goingProject({ bossId: this.userId }).then(res => {
          if(res.code == 1){
            this.$message(res.msg)
            return
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
            item.id = id;
          });
          this.projectList = _arr;
          this.centerDialogVisible = true;
        }
      });

    },
    checkDetails(id) {
      let projectId = this.resourcesForm.projectId;
      const { href } = this.$router.resolve({
        path: "/CaseDetails",
        query: {
          caseId: id,
          projectId: projectId
        }
      });
      window.open(href, "_blank");
    },
    // 关注
    addConcern(item) {
      if (!this.getIsLogin) {
        // 未登陆处理
        this.loginHandle();
        return false;
      }
      if (item.concernStatus == 0) {
        this.api
          .concernDesigner({
            bossID: this.userId,
            designerID: item.id
          })
          .then(res => {
            if (res.code == 0) {
              this.$message(res.msg);
              item.attention+=1
              item.concernStatus = 1;
            } else {
              this.$message(res.msg);
              item.concernStatus = 0;
            }
          });
      } else {
        this.api
          .cancelConcernDesigner({
            bossID: this.userId,
            designerID: item.id
          })
          .then(res => {
            if (res.code == 0) {
              this.$message(res.msg);
              item.concernStatus = 0;
               item.attention-=1;
            } else {
              this.$message(res.msg);
            }
          });
      }
    },
    // 未登陆处理
    loginHandle() {
      Bus.$emit("loginBox",'');
      // 调用登陆框
      // this.$refs.login.tabs = 1;
      // this.$refs.login.flag = true;
      // this.$refs.login.loginType = 1
    },
    getParmas() {
      // let type = sessionStorage.getItem("loginType");
      // this.userId =
      //   type == 1
      //     ? localStorage.getItem("userId")
      //     : sessionStorage.getItem("userId");
      this.userId = localStorage.getItem("userId");
          this.resourcesForm.projectId = this.$route.query.id
    },
    getProjectId(id, val) {
      this.resourcesForm.projectId = val;
      this.invited(id);
    },
    setFormData() {

    }
  },
  mounted() {
    this.resourcesForm.caseName = this.$route.query.case;
    this.getbuildingType()
    this.getParmas()
    this.search()
  },
  watch: {
    //工作年限
    workLifeChecked (v) {
      this.resourcesForm.workLife = v;
      this.search()
    },
    //职业资格
    certificateChecked (v) {
      this.resourcesForm.certificate = v
      this.search()
    },
    //工作模式
    teamChecked (v) {
      this.resourcesForm.team = v
      this.search()
    },
    // 建筑师类型
    architectureChecked (v) {
      this.resourcesForm.searchDesigner = v
      this.search()
    },
    // 当前页码
    pageNumber(v) {
      this.resourcesForm.pageNumber = v
      this.search()
    }
  }
};
</script>
<style lang="less" scoped>
  @media only screen and (min-width: 1600px) {
  .designers{
      max-width:1200px;
      margin:auto;
    }
  }

  .card{
    padding: 1rem;
    padding-top: 0;
    border-radius: 3px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.25);
    background-color: #fff;
  }
  .block{
    padding:0.625rem;
  }

.SelectCheckBox {
   background-color:#f5f6f8;
 // background: #fff;
  position: relative;
  /*overflow: hidden;*/
  color: #333333;
}
.noCase {
  padding: 2.5rem 0;
  font-size: 1rem;
}
.select-conditions {
  ul {
    display: flex;
    li {
      margin: 0 3.125rem 1.25rem 0;
      button {
        outline: none;
        border: none;
      }
      i{cursor: pointer;}
      i,
      a {
        text-decoration: none;
        font-size: 1rem;
        color: #666666;
        text-align: left;
        line-height: 1.125rem;
        margin-left: 0.625rem;
      }
    }
  }
}
.title-tabs {
  display: flex;
}
  .title-tabs li {
  margin-right: 1.125rem;
}
.liActive {
  border-bottom: 2px solid #000000;
}
h3 {
  font-weight: 700;
  color: #182642;
  // font-size: 28px;
  font-size: 1.75rem /* 28/16 */;
  // padding: 1.125rem 0;
  line-height: 1.2;
  cursor: pointer;
}

.listMenu > .mdb-row {
  border-top: 1px solid #e0e0e0;
  padding: 2.5rem 0;
  cursor: default;
  min-height: 14.125rem;
}
.listMenu > .mdb-row:nth-last-of-type(1) {
  border-bottom: 1px solid #e0e0e0;
}
.sort {
  padding: 12px 0;
  border-bottom:1px solid #d8d8d8;
  label {
    font-size: 0.875rem  /* 12/16 */;
    line-height: 0.18rem;
    color: #333;
    margin-right:0.5rem;
   // font: 0.18rem/0.18rem "PingFangHK-Medium";
    text-align: left !important;
  }
  .sortMethods {
    font-size: 0.875rem /* 12/16 */;
    line-height: 0.18rem;
    //font: 0.16rem/0.18rem "PingFangSC-Regular";
    color: #999;
    // color: #09a0db;
    text-align: left;
    // margin-left: 0.625rem;
    margin-left: .5rem /* 8/16 */;
    padding-right: .5rem /* 8/16 */;
    border-right: 1px solid #aaa;
    &:last-child{
      border-right: none;
    }
    cursor: pointer;
    &:hover{
      // text-decoration: underline;
      color: #4285f4;
    }
  }
}
.active {
  color: #09a0db!important;
  font-weight: 700;
  text-decoration: none;
}
.types {
  border-top: 1px solid #e0e0e0;
  padding-top: 3.125rem;
}
.el-checkbox-group {
  border-bottom: 1px solid #e0e0e0;
}
.el-checkbox {
  margin: 0 3.125rem 1.125rem 0 !important;
}
.designerBox{
  flex: 1;
  position: relative;
  // padding-left: 15%;
  padding-left: .8125rem /* 13/16 */;
  padding-right: 8.125rem /* 130/16 */;
  .infoIcon{
    position: absolute;
    bottom: 0;
    margin-top: 0;
    /* margin-bottom: 0; */
  }
}
@media (max-width: 576px){
  .designerBox{
    padding-left: 1rem;
    padding-top: 1rem;
    padding-right: 0;
    .btnTeam{
      position: static;
      padding-top: 1rem;
    }
  }
}
.headPhotoBox{
  margin-right: .625rem /* 10/16 */;
}
.headPhoto {
  // margin: 0 auto;
  // height: 5.625rem;
  // width:5.625rem;
  width: 2.5rem /* 40/16 */;
  height: 2.5rem /* 40/16 */;
  overflow: hidden;
  border-radius: 100px;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  cursor: pointer;
  img {
    width: 100%;
    min-height: 100%;
  }
}
.btnTeam {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 1rem;
  // display: flex;
  // flex-wrap: nowrap;
  img {
    cursor: pointer;
    width: 100%;
  }
  .addConcern {
    width: 6.4rem;
    height: 2.4rem;
    margin-right: 1rem;
    margin-bottom: 20px;
    // padding: 7px 16px;
    line-height: 2.4rem;
    padding: 0;
    text-align: center;
    border-radius: 4px;
    font-size: 1rem /* 16/16 */;
    // font-weight: bold;
    border: 1px solid #666;
    color: #666;
    cursor: pointer;
    &:hover{
      // border-color: #09a0db;
      color: #4285f4;
      // background-color: #09a0db;
    }
  }
  .sendInvite{
    width: 6.4rem;
    height: 2.4rem;
    line-height: 2.4rem;
    // padding: 7px 16px;
    // padding: 7px 0;
    text-align: center;
    border-radius: 4px;
    font-size: 1rem /* 16/16 */;
    // font-weight: bold;
    border: 1px solid #666;
    color: #666;
    cursor: pointer;
    &:hover{
      // border-color: #09a0db;
      color: #4285f4;
      // background-color: #09a0db;
    }
  }
}
.el-button + .el-button {
  margin-left: 0;
}
.designerName {
  font-size: 1rem /* 18/16 */;
  color: #333;
  cursor: pointer;
}
.designer-message{
  margin-top: 1rem /* 16/16 */;
  .brief{
    margin-bottom: .125rem /* 2/16 */;
    color: #999;
    line-height: 1.2;
    font-size: 0.875rem /* 14/16 */;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .readMore{
    font-size: .875rem /* 14/16 */;
    // font-weight: bold;
    color: #09a0db;
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
    .fas{
      margin-left: .3125rem /* 5/16 */;
      // vertical-align: -12%;
      font-size: .875rem /* 14/16 */;
    }
  }
}
.city,.hotTags {
  color: #999999;
  // color: #666666;
  display: block;
  height:1rem;
  line-height: 1rem;
  font-size:0.875rem;
  // height: 0.53rem;
  overflow: hidden;
}
.city{
  span{
    font-size: .875rem /* 14/16 */;
    color: #222;
  }
}
.describe {
  color: #2b2727;
  display: block;
  height:1rem;
  line-height: 1rem;
  font-size: 0.8rem;
 // height: 0.53rem;
  overflow: hidden;
}
// .skill {
//   color: #999999;
// }
.clearfix {
  margin: 0.5rem 0 1rem 0;
  position: relative;
  .attentionNum,
  .projectNum {
    font-size: 0.82rem;
    color: #666666;
    span {
      font: 0.875rem "PingFangHK-Medium";
    }
  }
  .projectNum {
    text-align: right;
  }
}
.swiper-slide {
  display: block;
  overflow: hidden;
  height:10.56rem;
 // height:2.26rem;
  img {
    width: 100%;
    height: 100%;
   // height: 2.26rem;
    cursor: pointer;
  }
}
.hiddenBtn {
  background: rgba(0, 0, 0, 0);
}
.swiper-button-prev,
.swiper-button-next {
  height: 74px;
  width: 46px;
  background-image: none;
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  top: 50%;
  margin-top: -37px;
  background-size: 14px 10px;
  color: #fff;
  display: block;
}
.swiper-button-prev {
  left: 1px;
  .toLeft {
    position: absolute;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #d8d8d8;
    border-left: 2px solid #d8d8d8;
    transform: rotate(45deg);
    margin: 32px 18px;
    display: none;
  }
}
.swiper-button-next {
  right: 1px;
  .toRight {
    position: absolute;
    width: 10px;
    height: 10px;
    border-top: 2px solid #d8d8d8;
    border-right: 2px solid #d8d8d8;
    transform: rotate(45deg);
    margin: 32px 18px;
    display: none;
  }
}
.swiper-button-next:hover {
  background-color: rgba(0, 0, 0, 0.6);
}
.swiper-button-prev:hover {
  background-color: rgba(0, 0, 0, 0.6);
}
.swiper-button-prev:hover .toLeft {
  display: block;
}
.swiper-button-next:hover .toRight {
  display: block;
}
.el-pagination {
  margin: 60px auto;
  text-align: center;
}
.mask {
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  height: 100%;
  color: #ffffff;
}
.left-filter{
  font-size: 0.875rem;
}
</style>
<style lang="less">
  .designers{
    .mdb-search .searchBox{
      background: #fff !important;
    }
    .container-filter .left-filter .checkClass .mr-5{
      margin-right: 0 !important;
    }
    .container-filter .left-filter .checkClass label{
      font-size: 0.8rem !important;
    }
    .container-filter .btn-save{
      /*display: none;*/
    }
    .container-filter .form-check{
      padding-left: 0;
    }
    .mask > .el-checkbox-group {
      border-bottom: none;
    }
    .designers .swiper-container {
      /* min-height: 2.26rem; */
      overflow: hidden;
      min-height:10.56rem;
    }
    .filter-header{
      .lxx-multiselect{
        margin-left: 1.4rem!important;
        margin-right: 1.4rem!important;
        .lxx-dropdown{
          .dropdown-box{
            // padding-left: 1.4rem;
          }
        }
      }
    }
    .lxx-radio-group .lxx-radio{
      font-size: .8125rem /* 13/16 */;
    }
  }
</style>
<style lang="less" scoped>
.form-elegant .font-small {
font-size: 0.8rem; }

.form-elegant .z-depth-1a {
-webkit-box-shadow: 0 2px 5px 0 rgba(55, 161, 255, 0.26), 0 4px 12px 0 rgba(121, 155, 254, 0.25);
box-shadow: 0 2px 5px 0 rgba(55, 161, 255, 0.26), 0 4px 12px 0 rgba(121, 155, 254, 0.25); }

.form-elegant .z-depth-1-half,
.form-elegant .btn:hover {
-webkit-box-shadow: 0 5px 11px 0 rgba(85, 182, 255, 0.28), 0 4px 15px 0 rgba(36, 133, 255, 0.15);
box-shadow: 0 5px 11px 0 rgba(85, 182, 255, 0.28), 0 4px 15px 0 rgba(36, 133, 255, 0.15); }
.container-filter{
  margin-top:1rem;
}
.container-filter .left-filter{
  // padding:1rem 0;
  // border-bottom:1px solid #aaa;
  margin: 0;
  padding:1rem 1.4rem;
  border-bottom:1px solid #f1f1f1;
}
.container-filter .left-filter .checkClass{
  padding-left: 0;
}

.designers .row{
  margin-right: 0;
  margin-left: 0;
}
.designers {
  .search-wrap{
    padding: 0px 0.5rem;
    .mdb-search{
      .serach-box{
        padding-left: 0;
        padding-right:0;
      }
    }
  }
}
.filter-header {
  background:#fff;
  /* background: rgb(221, 221, 221); */
  // padding: 0 1rem;
  padding: 0;
}
.filter-header .title {
  color:#333;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: .8rem;
  padding-left: 0.7rem;
}
.filter-header .h4{
  font-weight:700;
  font-size: 1rem /* 16/16 */;
  color: #182642;
}
.filter-header .filter-ul{
  font-size:0.9rem;
}
.designers .right-pic{
  padding: 1rem 0;
  // padding-left: 0;
  border-bottom:1px solid #f1f1f1;
  .imgBox{
    width: 21.375rem /* 342/16 */;
    padding: 0;
  }
}
.filter-header .custom-control-label::before{
  top:0.18rem;
  background:#fff;
  /* background: #ddd; */
}
.filter-header .custom-control{
  min-height: 1.8rem;
}
.pic-swirter {
}
  .opcityDiv{
    display:inline-block;
    height: 100%;
    position: absolute;
    top: 0;
    /*z-index: 10;*/
  }
.opcityDiv:nth-child(1) {
  left: 0;
}
.opcityDiv:nth-child(2) {
  left: 33.3%;
}
.opcityDiv:nth-child(3) {
  left: 66.6%;
}

</style>
<style lang="less">
.designers{
.lxx-multiselect .menu-footer {
  text-align: left !important;
}
}
.lxx-dropdown{
  border: 1px solid #ced4da !important;
  padding:0 0.625rem;
  border-radius: 2px;

}
.designers{
 .select-dropdown{
    border: 0.0625rem solid #ced4da !important;
    border-radius: 0.125rem !important;
    padding-left: 0.625rem !important;
    padding-right: 0.625rem !important;
    box-sizing: border-box !important;
    font-size: 0.875rem !important;
    color: #333333 !important;
  }
  .select-wrapper .caret{
    right: 0.625rem;
  }
}

</style>

