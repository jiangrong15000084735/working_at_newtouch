<template>
  <div class="projectManageWrapper">
    <mdb-container>
    <mdb-row>
      <mdb-col md="2" class="px-0">
        <mdb-tab pills color="primary" vertical>
          <mdb-tab-item
            :active="getActiveTab==index"
            @click.native.prevent="tabClick(index)"
            v-for="(item,index) in tabs"
            :key="index"
          >{{item.title}}</mdb-tab-item>
        </mdb-tab>
      </mdb-col>
      <mdb-col md="10">
        <mdb-tab-content vertical class="px-0 pb-0">
          <mdb-tab-pane key="pills1" v-if="getActiveTab==0">
            <mdb-container class="itemBox" style="margin-top:0.6rem;">
              <mdb-row class="mx-0">
                <mdb-col md="4" class="itemWrapper px-0 py-0" v-for="(item,index) in invitedProjectList" :key="index">
                  <mdb-card >
                    <mdb-card-body class="cardWrapper">
                      <mdb-card-title><a class="title-one" @click="toProjectDetail(item.id)">{{item.projectName || '匿名项目'}}</a></mdb-card-title>
                      <div class="textWrapper">
                        <mdb-card-text class="textP">
                          {{item.desc}}
                        </mdb-card-text>
                        <span class="textSpan"  @click="toProjectDetail(item.id)">了解详情<mdb-icon class="rightI" icon="chevron-right" /></span>
                      </div>

                      <div class="btnWrapper">
                        <div v-if="item.joinRefuse==2">
                          <mdb-btn class="mx-0 my-0 px-0 py-0" style="box-shadow: none;" color="primary"  @click.native="reject(item.id)">再想想</mdb-btn>
                          <mdb-btn class="mx-0 my-0 px-0 py-0" style="box-shadow: none;" color="primary" @click.native="accept(item.id)">接受</mdb-btn>
                        </div>
                        <div class="result" v-else>
                          <span v-if="item.joinRefuse ==1" class="accept">已接受</span>
                          <span v-else class="refuse" >已拒绝</span>
                        </div>
                      </div>
                    </mdb-card-body>
                  </mdb-card>
                </mdb-col>
              </mdb-row>
              <mdb-row v-if="totalCount1 !=0">
                <mdb-col>
                  <pagination
                    :total="totalCount1"
                    :pageSize="pageSize1"
                    @changePage="handleCurrentChange1"
                    v-if="totalCount1 !=0"
                  ></pagination>
                </mdb-col>
              </mdb-row>
            </mdb-container>
          </mdb-tab-pane>
          <mdb-tab-pane key="pills2" v-if="getActiveTab==1">
            <mdb-container class="itemBox" style="margin-top:0.6rem;">
              <mdb-row class="mx-0">
                <mdb-col md="4" class="itemWrapper px-0 py-0" v-for="(item,index) in enrolmentProjectList" :key="index">
                  <mdb-card >
                    <mdb-card-body class="cardWrapper">
                      <mdb-card-title><a class="title-one" @click="toProjectDetail(item.id)">{{item.projectName || '匿名项目'}}</a></mdb-card-title>
                      <div class="textWrapper">
                        <mdb-card-text class="textP">
                          {{item.desc}}
                        </mdb-card-text>
                        <span class="textSpan"  @click="toProjectDetail(item.id)">了解详情<mdb-icon class="rightI" icon="chevron-right" /></span>
                      </div>
                      <div class="btnWrapper">
                        <div class="result">
                          <span class="accept">{{item.enrolmentStatus=="同意"?'已同意':item.enrolmentStatus}}</span>
                        </div>
                      </div>
                    </mdb-card-body>
                  </mdb-card>
                </mdb-col>
              </mdb-row>
              <mdb-row v-if="totalCount2 !=0">
                <mdb-col>
                  <pagination
                    :total="totalCount2"
                    :pageSize="pageSize2"
                    @changePage="handleCurrentChange2"
                    v-if="totalCount2 !=0"
                  ></pagination>
                </mdb-col>
              </mdb-row>
            </mdb-container>
          </mdb-tab-pane>
          <mdb-tab-pane key="pills3" v-if="getActiveTab==2">
            <mdb-container>
                <tbl striped class="text-center">
                    <tbl-body>
                      <tr v-for="item in doingProjectList" :key="item.id">
                        <mdb-row>
                          <mdb-col md="12" class="name-wrapper" >
                            <div  @click="stepperClick(stepperArr[1].path,item,1)">
                              {{item.projectName || '匿名项目'}}
                            </div>
                          </mdb-col>
                          <mdb-col md="12" class="stepper-wrapper">
                            <mdb-stepper simpleH style="padding:0!important">
                              <li
                                class="completed"
                                v-for="(itemStep,index) in stepperArr"
                                :class="{
                                  succces:item.status >= index+1,
                                  active: (item.status >= index+1&&currentId==item.id&&
                                    (index==0&&contractList)||
                                    (index==1&&contractList&&contractList.length>0&&sigeStatus==1)||
                                    (index==2&&(item.livingStatus==2||item.livingStatus==3))||
                                    (index==3&&item.status >= index+1)
                                  ),
                                  removeLastLine:item.status == index,
                                  disabled:item.status < index
                                }"
                                :key="index" slot="simple"
                                @click="stepperClick(itemStep.path,item,index)"
                                >
                                <a @mouseover="getStatus(item,index)">
                                  <span class="circle" v-if="index==3 && item.status==4">
                                    <mdb-icon icon="check"/>
                                  </span>
                                  <span class="circle" style="background-color:red!important;" v-else-if="index==3 && item.status!=4">
                                    <i class="fas fa-exclamation"></i>
                                  </span>
                                  <span class="label" v-if="item.collectProgramType!=3">{{itemStep.name}}</span>
                                  <span class="label" v-if="item.collectProgramType==3&&index!=2">{{itemStep.name}}</span>
                                  <span class="label" v-if="item.collectProgramType==3&&index==2">{{item.expertAdviceFlag=="Y"?"专家意见":"客户意见"}}</span>
                                </a>
                              </li>
                            </mdb-stepper>
                          </mdb-col>
                        </mdb-row>
                      </tr>
                    </tbl-body>
                </tbl>
                <mdb-row v-if="totalCount3 !=0">
                  <mdb-col>
                    <pagination
                      :total="totalCount3"
                      :pageSize="pageSize"
                      @changePage="handleCurrentChange3"
                      v-if="totalCount3 !=0"
                    ></pagination>
                  </mdb-col>
                </mdb-row>
            </mdb-container>
          </mdb-tab-pane>
          <mdb-tab-pane key="pills4" v-if="getActiveTab==3">
            <mdb-container>
                <tbl striped class="text-center">
                    <tbl-body>
                        <tr v-for="item in overProjectList" :key="item.id">
                          <mdb-row>
                            <mdb-col md="12" class="name-wrapper" >
                              <div  @click="stepperClick(stepperArr[1].path,item,1)">
                                {{item.projectName || '匿名项目'}}
                              </div>
                            </mdb-col>
                            <mdb-col md="12" class="stepper-wrapper">
                              <mdb-stepper simpleH style="padding:0!important">
                               <li
                                class="completed"
                                v-for="(itemStep,index) in stepperArr"
                                :class="{
                                  succces:item.status >= index+1,
                                  active:item.status >= index+1,
                                  removeLastLine:item.status == index
                                  }"
                                :key="index"
                                slot="simple"
                                @click="stepperClick(itemStep.path,item,index)">
                                  <a>
                                    <span class="circle" v-if="index==3 && item.status==4">
                                      <mdb-icon icon="check"/>
                                    </span>
                                    <span class="circle" style="background-color:red!important;" v-else-if="index==3 && item.status!=4">
                                      <i class="fas fa-exclamation"></i>
                                    </span>
                                    <span class="label" v-if="item.collectProgramType!=3">{{itemStep.name}}</span>
                                    <span class="label" v-if="item.collectProgramType==3&&index!=2">{{itemStep.name}}</span>
                                    <span class="label" v-if="item.collectProgramType==3&&index==2">{{item.expertAdviceFlag=="Y"?"专家意见":"客户意见"}}</span>
                                  </a>
                                </li>
                              </mdb-stepper>
                            </mdb-col>
                          </mdb-row>
                        </tr>
                    </tbl-body>
                </tbl>
                <mdb-row>
                  <mdb-col>
                    <pagination
                      :total="totalCount4"
                      :pageSize="pageSize"
                      @changePage="handleCurrentChange4"
                      v-if="totalCount4 !=0"
                    ></pagination>
                  </mdb-col>
                </mdb-row>
            </mdb-container>
          </mdb-tab-pane>
        </mdb-tab-content>
      </mdb-col>
    </mdb-row>
    <!-- 对话框 -->
    <mdb-modal v-if="modalShow" @close="modalShow = false" info>
      <mdb-modal-header center>
        <p class="heading">提示信息</p>
      </mdb-modal-header>
      <mdb-modal-body>
        <div v-if="!isReject">
          {{msg}}
        </div>
        <div class="outline-input" v-else >
          <mdb-input
          type="textarea"
          label="拒绝理由"
          :rows="3"
          v-model="rejectReason"
          outline
          />
        </div>
        <!-- <mdb-textarea v-else label="拒绝理由" v-model="rejectReason" :rows="3"/> -->
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn color="primary" @click="confirm">确定</mdb-btn>
        <mdb-btn outline="primary" @click.native="modalShow = false">取消</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    </mdb-container>
</div>
</template>
<script>
import EmptyState from '@/views/individual/emptyState'
import { mapMutations, mapGetters } from 'vuex'
let Base64=require('js-base64').Base64
export default {
  name: 'projectManage',
  data () {
    return {
      sigeStatus:null,
      currentId:null,
      contractList:null,
      tabs: [
        {
          name:'',
          title:'项目邀请'
        },
        {
          name:'',
          title:'项目报名'
        },
        {
          name:'',
          title:'进行中项目'
        },
        {
          name:'',
          title:'已完成项目'
        }
      ],
      verticalWithin: 0,
      totalCount1:1,
      totalCount2:1,
      totalCount3:1,
      totalCount4:1,
      nowPage1:1,
      pageSize1:99,
      pageSize2:99,
      pageSize:5,
      msg: '',
      modalShow: false,
      invitedProjectList: [], // 显示5条邀请项目
      invitedProjectListAll:[], // 所有邀请项目
      doingProjectList: [], // 5进行中的项目
      doingProjectListAll: [], // 所有进行中的项目
      overProjectList: [],
      overProjectListAll: [], // 所有完成的项目
      enrolmentProjectList: [], //报名中
      enrolmentProjectListAll: [], //报名中
      isReject: false,
      projectId: '',
      rejectReason: '', // 拒绝理由
      stepperArr: [
        {step: 1,name: "签订合同",path:"sign-contract"},
        {step: 2,name: "项目进程",path:"proj-progress"},
        // {step: 3,name: "专家评审",path:"expert-review"}, // 查看入围排序，新增
        {step: 3,name: "专家评审",path:"review"},// 进入直播页面
        {step: 4,name: "支付设计费用",path:"pay-fee"},
      ],
      activeIndex: -1,
    }
  },
  created () {
    this.getcurrentProjectStatus()
  },
  computed: {
    emptyState () {
      return this.invitedProjectList.length === 0 && this.doingProjectList.length === 0 && this.overProjectList.length === 0
    },
    ...mapGetters(["getActiveTab"])
  },
  beforeRouteLeave (to, from, next) {
    // if(to.name == "projDetail" || to.name == "signContract" || to.name == "projProgress" || to.name == "projReviewed"){
    if(to.name == "projDetail"
    || to.name == "signContract"
    || to.name == "projProgress"
    || to.name == "review"
    || to.name == "payFee"
    || to.name == "expertReview"){
    }else{
       this.tabClick(0)
    }
    next()
  },
  methods: {
    ...mapMutations(["setActiveTab"]),
    tabClick(index) {
      this.setActiveTab(index)
    },
    handleCurrentChange1(currentPage){
      if(event && event.type == "click"){
        this.nowPage1 = currentPage
      }
      let sliceStart = (currentPage-1) * this.pageSize1
      // sliceStart = sliceStart == 0? 0: sliceStart
      this.invitedProjectList = this.invitedProjectListAll.slice(sliceStart,sliceStart+this.pageSize1)
    },
    handleCurrentChange2(currentPage){
      let sliceStart = (currentPage-1) * this.pageSize2
      // sliceStart = sliceStart == 0? 0: sliceStart-1
      this.enrolmentProjectList = this.enrolmentProjectListAll.slice(sliceStart,sliceStart+this.pageSize2)
    },
    handleCurrentChange3(currentPage){
      let sliceStart = (currentPage-1) * this.pageSize
      // sliceStart = sliceStart == 0? 0: sliceStart-1
      this.doingProjectList = this.doingProjectListAll.slice(sliceStart,sliceStart+this.pageSize)
    },
    handleCurrentChange4(currentPage){
      let sliceStart = (currentPage-1) * this.pageSize
      // sliceStart = sliceStart == 0? 0: sliceStart-1
      this.overProjectList = this.overProjectListAll.slice(sliceStart,sliceStart+this.pageSize)
    },
    toProjectDetail (id) {
      this.$router.push(`/proj-detail/${id}`)
    },

    getcurrentProjectStatus () {
      this.loading = true
      this.api.projectIndexPage(null).then(res => {
        if (res.code === 0) {
          // this.invitedProjectList = res.data.invitedProjectList
          this.invitedProjectListAll = res.data.invitedProjectList
          let sliceStart1 = (this.nowPage1-1) * this.pageSize1
          this.invitedProjectList = this.invitedProjectListAll.slice(sliceStart1,sliceStart1+this.pageSize1)
          // this.enrolmentProjectList = res.data.enrolmentProjectList
          this.enrolmentProjectListAll = res.data.enrolmentProjectList
          this.enrolmentProjectList = this.enrolmentProjectListAll.slice(0,this.pageSize2)
          // this.doingProjectList = res.data.doingProjectList
          this.doingProjectListAll = res.data.doingProjectList
          // for (let index = 0; index < this.doingProjectListAll.length; index++) {
          //   this.qryProjectStatus(this.doingProjectListAll[index])
          // }
          this.doingProjectList = this.doingProjectListAll.slice(0,this.pageSize)

          // this.overProjectList = res.data.overProjectList
          this.overProjectListAll = res.data.overProjectList
          // for (let index = 0; index < this.overProjectListAll.length; index++) {
          //   this.$set(this.overProjectListAll[index],"projectStatus",4)
          // }

          this.overProjectList = this.overProjectListAll.slice(0,this.pageSize)
          this.totalCount1 = res.data.invitedProjectList.length
          this.totalCount2 = res.data.enrolmentProjectList.length
          this.totalCount3 = res.data.doingProjectList.length
          this.totalCount4 = res.data.overProjectList.length
          this.loading = false
        }
      })
    },
    // 查询项目进度
    qryProjectStatus(item){
      this.api.qryProjectStatus({id:item.id}).then(res => {
        // item.projectStatus = res.data.status
        this.$set(item,"projectStatus",res.data.status)
      })
    },
    // 点击新项目邀请列表进入单个项目管理页面
    toprojectInformation (id) {
      this.$router.push(`/SingleInvitationProject/${id}`)
    },
    // 点击正在进行的项目列表进入单个项目管理页面
    todoingAloneProject (id) {
      this.$router.push(`/doingAloneProject/${id}`)
    },
    accept (id) {
      this.projectId = id
      this.modalShow = true
      this.msg = '是否接受该项目邀请'
      this.isReject = false
    },
    reject (id) {
      this.projectId = id
      this.modalShow = true
      this.msg = '是否拒绝该项目邀请'
      this.isReject = true
      this.rejectReason = ''
    },
    confirm () {
      let params = {"projectId":this.projectId,"joinRefuse":this.isReject?0:1}
      if(this.isReject){
        params.otherReason = this.rejectReason
      }
      if(!this.rejectReason && this.isReject){
        this.$message.error("请填写拒绝理由")
        return
      }
      this.api.reponseInvitation(params).then(res => {
        if(res.code == 0){
          this.$message("操作成功")
          this.getcurrentProjectStatus()
        }
       this.modalShow = false
      })
    },
    getStatus(item,index){
      this.currentId = item.id;

      //  if(index<2){
      this.api.queryContractList({
        projectid: this.currentId,
        name:1
      }).then(res => {
        this.contractList = res.data
        if(this.contractList&&this.contractList.length>0){
          this.sigeStatus = res.data[0].status
        }
      })
      //  }
    },
    stepperClick(pathName,item,index) {
      // this.activeIndex = index
      this.currentId = item.id
      if(!pathName){
        return
      }
      // if(item.collectProgramType==3&&index==2) {
        // this.$message.error("委托模式下无专家评审！")
        // return
      // }
      this.api.queryContractList({
        projectid: item.id,
        name:1
      }).then(res => {
        this.contractList = res.data
        if(this.contractList&&this.contractList.length>0){
          this.sigeStatus = res.data[0].status
        }
        if(pathName=='sign-contract'){
          // this.api.queryContractList({
          //   projectid: item.id,
          //   name:1
          // }).then(res => {
          //   this.contractList = res.data

            if(this.contractList&&this.contractList.length>0){
              this.$router.push({
                path: pathName,
                query: {
                  id: item.id,
                  actives: item.id,
                  collectProgramType:item.collectProgramType,
                  pro:Base64.encode(item.projectName)
                }
              })
            }else{
              return
            }
          // });
        }else if(pathName=='proj-progress'){
          //  this.api.queryContractList({
          //   projectid: item.id,
          //   name:1
          // }).then(res => {
            if(this.contractList&&this.contractList.length>0&&this.contractList[0].status==1){
              this.sigeStatus = res.data[0].status
              this.$router.push({
                path: pathName,
                query: {
                  id: item.id,
                  actives: item.id,
                  collectProgramType:item.collectProgramType,
                  pro:Base64.encode(item.projectName)
                }
              })
            }else{
              return
            }
          // })
        }else if(pathName=='pay-fee') {
          // 评审进度
          // this.api.qryAgedaStatus({id:item.id}).then(res => {
          //   if(res.data.confirmed==1) {
          //     this.$router.push({
          //       path: pathName,
          //       query: {
          //         id: item.id,
          //         actives: item.id,
          //         collectProgramType:item.collectProgramType,
          //         pro:Base64.encode(item.projectName)
          //       }
          //     })
          //   }else{
          //     // this.$message.error("专家评审还未结束！")
          //     return
          //   }
          // })
          this.api.qryProjectStatus({projectId:item.id}).then(res=>{
            if(res.data.status==1){
              this.$router.push({
                path: pathName,
                query: {
                  id: item.id,
                  actives: item.id,
                  collectProgramType:item.collectProgramType,
                  pro:Base64.encode(item.projectName)
                }
              })
            }else{
              return
            }
          });
        }else if(pathName=='review'){
          if(item.livingStatus==2){
            // let userInfo = this.$store.state.userInfo
            let userInfo = JSON.parse(localStorage.getItem('userInfo'))
            let clientId = ''
            if (userInfo) {
            // 客户
            if (userInfo.bossSerial) clientId = userInfo.bossSerial
            // 设计师
            if (userInfo.designerSerial) clientId = userInfo.designerSerial
            }
            // client-798626
            // coolarch-674790
            let num1 = Math.floor(Math.random()*10000)>1000?Math.floor(Math.random()*10000):Math.floor(Math.random()*10000)+1000;
            let num2 = Math.floor(Math.random()*1000)>100?Math.floor(Math.random()*1000):Math.floor(Math.random()*1000)+100;
            clientId = this.generateMixed(9) + num1 + clientId.split('-')[1] + num2 + this.generateMixed(7)
            console.log(clientId)
            // 直播
            this.$router.push({
              path: 'review',
              query: {
                id: item.id,
                actives: item.id,
                BDRCVFR: encodeURI(clientId),
                tuid: 'u2493175_0',
                client_ip: Date.parse(new Date()),
                collectProgramType:item.collectProgramType,
                pro:Base64.encode(item.projectName)
              }
            })
          }else if(item.livingStatus==3){
              // 评审
            this.$router.push({
              path: 'expert-review',
              query: {
                id: item.id,
                actives: item.id,
                collectProgramType:item.collectProgramType,
                pro:Base64.encode(item.projectName)
              }
            })
          }else{
            return
          }
        }
      })
    },
    getMore(index){
    },
    generateMixed(n) {
      var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      '!', '@', '#', '$', '%', '^', '&', '*', '?'];
      var a = "";
      for (var i = 0; i < n; i++) {
      a += chars[Math.ceil(Math.random() * (chars.length - 1) )];
      }
      return a;
    }
  },
  mounted() {
  },
  updated() {
    let tx = document.getElementsByClassName('textP');
    for(let jj=0; jj<tx.length; jj++){
      let s = tx[jj].innerText
      let codeLen = 0,lenghtI=0
      for (var i=0; i<s.length; i++) {
        if (s.charCodeAt(i)>127 || s.charCodeAt(i)==94) {
            codeLen += 2
        } else {
            codeLen ++
        }
        if(codeLen>30){
          lenghtI = i
          break
        }
      }
      if(lenghtI>0){
        tx[jj].innerText = s.substr(0,lenghtI+1)
        tx[jj].innerText += `...`
      }else{
         tx[jj].innerText = s
      }
      // while(tx[jj].offsetHeight < tx[jj].scrollHeight){
      //   let ss = tx[jj].innerText;
      //   tx[jj].innerText = ss.substr(0,ss.length-20);
      //   tx[jj].innerText += `...`;
      // }
    }
  },
}
</script>
<style scoped lang="stylus">
  .m-b
    padding 19.2px 35.2px
    margin-right 9.6px
  .text-center th
    font-weight bold
</style>
<style lang="less">
.name-wrapper{
  line-height: 53px;
  vertical-align: center!important;
  cursor:pointer;
  color:#4285f4;width:200px;
}
.stepper-wrapper{
  padding-top:0!important;
  padding-bottom: 0!important;
  vertical-align: middle;
  .stepper-horizontal{
    padding: 0!important;
    margin: 0!important;
  }
  .stepper-horizontal li:not(:first-child):before{
    flex:0!important;
  }
  .stepper-horizontal li:last-child {
    flex:0 0 183px;
  }
  .stepper-horizontal li:last-child a {
    flex:0 0 184px;
  }
  .stepper-horizontal li:hover {
      background-color: transparent;
  }
  .stepper-horizontal a{
    cursor:default;
  }
  // .stepper-horizontal a:hover {
  //     background-color: rgba(0,0,0,0.06);
  // }
  // .completed.active:after{
  //   background-color: #4285f4!important;
  // }
  // .completed.active:before{
  //   background-color: #4285f4!important;
  // }
.completed.active a:hover{
   background-color: rgba(0,0,0,0.06) !important;
   cursor:pointer;
}
.completed.succces:after{
  background-color: #4285f4!important;
}
.completed.succces:before{
  background-color: #4285f4!important;
}





  .completed:before,.completed:after{
    margin-top: -0rem!important;
  }
  a{
    padding: 12.8px 24px!important;
    .label{
      margin-top:0!important;
    }
  }
}
.projectManageWrapper{
  .itemBox{
    max-width: 1230px;
  }
  .collapse-item {
    height: auto!important;
    // overflow: visible!important;
  }
  .select-wrapper .dropdown-content{
    max-height: 200px!important;
  }
}
</style>

<!-- ui样式覆盖 -->
<style lang="less">
  .projectManageWrapper{
    .leftTab{
      width: 196px;
      max-width: 196px;
      .md-pills li{
        margin-left: 18px;
        padding:8px 0;
      }
      .nav-link{
        width: 178px;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        padding: 0;
      }
    }
    .itemWrapper{
      width: 264px;
      max-width: 264px;
      height:172px;
      margin-right: 32px;
      // margin-top: 3px;
      margin-bottom: 44px;
      .title-one{
        color: #333;
        font-size: 14px;
        letter-spacing: 1px;
      }
      .cardWrapper{
        padding: 22px 10px 0px 10px;
        height:172px;
      }
      .textWrapper{
        position: relative;
        .textP{
          font-size: 12px;
          color: #666;
          height: 36px;
          overflow: hidden;
          letter-spacing: 1px;
          text-align: justify;
          word-break: break-all;
        }
        .textSpan{
          position: absolute;
          bottom: 0;
          right: 0;
          color: #4285f4;
          font-size: 12px;
          line-height: 18px;
          background: #fff;
          cursor: pointer;
          .rightI{
            margin-left: 3px;
          }
        }
      }
      .btnWrapper{
        height: 64px;
        padding-top: 10px;
        padding-bottom: 10px;
        box-sizing: border-box;
        margin-top: 20px;
        border-top: 2px dotted #f2f2f2;
        button{
          font-size: 18px;
          height: 40px;
          line-height: 40px;
          width: 108px;
          text-align: center;
          border-radius: 4px;
        }
        button:first-child{
          float: left;
          background-color: #f2f2f2 !important;
          color: #666 !important;
        }
        button:first-child:hover{
          background-color: #f5f5f5 !important;
        }
        button:last-child{
          float: right;
          background-color: #4285f4 !important;
        }
        button:last-child:hover{
          background-color: #5991f0 !important;
        }
        .result{
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          span{
            font-size: 18px;
          }
          .accept{
            color: #4285f4;
          }
          .refuse{
            color: #d92804;
          }
        }
      }
    }
    .pageMargin0 .pagination{
      margin: 0!important;
    }
  }
</style>
