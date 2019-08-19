<template>
    <mdb-container class="px-0 item-information-warp">
      <mdb-row>
        <mdb-col class="item-information-left" md="2">
          <mdb-card testimonial class="mt-1">
            <mdb-card-body>
              <mdb-row style="color: #4285f4;" class="mb-2 mx-0">
                <mdb-col md="12" class="text-left px-0">项目概况</mdb-col>
              </mdb-row>
              <mdb-row style="color: #999999;" class="mb-2 mx-0">
                <mdb-col md="6" class="text-left px-0">招标方式</mdb-col>
                <mdb-col md="6" class="text-right px-0">{{collectProgramType}}</mdb-col>
              </mdb-row>
              <mdb-row style="color: #999999;" class="mb-2 mx-0">
                <mdb-col md="6" class="text-left px-0">项目名称</mdb-col>
                <mdb-col md="6" class="text-right px-0">{{projetDetial.projectName}}</mdb-col>
              </mdb-row>
              <mdb-row style="color: #999999;" class="mb-2 mx-0">
                <mdb-col md="6" class="text-left px-0">建设地址</mdb-col>
                <mdb-col md="6" class="text-right px-0">{{projetDetial.adress}}</mdb-col>
              </mdb-row>
              <mdb-row style="color: #999999;" class="mb-2 mx-0">
                <mdb-col md="8" class="text-left px-0">成果提交日期</mdb-col>
                <mdb-col md="4" class="text-right px-0">{{projetDetial.signUpDeadLine}}</mdb-col>
              </mdb-row>
              <mdb-row style="color: #999999;" class="mb-2 mx-0">
                <mdb-col md="7" class="text-left px-0">拟开标日期</mdb-col>
                <mdb-col md="5" class="text-right px-0">{{projetDetial.openDate}}</mdb-col>
              </mdb-row>
            </mdb-card-body>
          </mdb-card>
          <mdb-card testimonial class="mt-4" v-if="(notifyList&&notifyList.length>0)||(projetDetial.collectProgramType&&projetDetial.collectProgramType!=1)">
            <mdb-card-body class="pt-0">
              <div class="peopleProportion-warp" v-if="projetDetial.collectProgramType&&projetDetial.collectProgramType != 1">
                <mdb-row  class="mx-0" style="color: #999999;">
                  <mdb-col md="10" class="text-left px-0">
                    已确认建筑师人数:
                  </mdb-col>
                  <mdb-col md="2" class="text-right px-0">
                    {{joinDesignerArr.length}}
                  </mdb-col>
                </mdb-row>
                <mdb-row class="mx-0">
                  <mdb-col md="12" class="chart-box px-0">
                    <div class="peopleProportion" id="peopleProportion"></div>
                    <div class="chart-num-tip">{{joinDesignerArr.length}}/{{designerArr.length}}</div>
                  </mdb-col>
                </mdb-row>
                <mdb-row class="mx-0">
                  <mdb-col class="px-0">
                    <a style="color: #4285f4;font-size:0.75rem;" @mouseover="confirmDesigner(1)" @mouseleave="cancolDesigner(1)">
                      已确认建筑师
                      <tipTool :designerArr="joinDesignerArr" v-if="joinDesignerArr.length>0&&isjoinDesignerShow"></tipTool>
                    </a>/<a style="color: #4285f4;font-size:0.75rem;" @mouseover="confirmDesigner(2)" @mouseleave="cancolDesigner(2)">
                      {{collectProgramTypeText}}
                      <tipTool :designerArr="designerArr" v-if="designerArr.length>0&&isdesignerShow"></tipTool>
                    </a>
                  </mdb-col>
                </mdb-row>
              </div>
              <hr v-if="notifyList&&notifyList.length>0&&projetDetial.collectProgramType&&projetDetial.collectProgramType !=1" style="margin:0;border:1px dashed #f7f7f7;width:100%;">
              <div v-if="notifyList&&notifyList.length>0" style="padding-top:1.25rem;">
                <mdb-row style="color: #4285f4;" class="mb-3 mx-0">
                  <mdb-col md="12" class="text-left px-0">项目消息</mdb-col>
                </mdb-row>
                <mdb-row class="mt-0 mx-0">
                  <mdb-col
                    md="12"
                    v-for="(item,index) in notifyList"
                    :key="index"
                    class="notify text-left px-0 mb-2"
                    @click.prevent.native="setContact(item)"
                  >
                    <span>{{index+1}}.</span>
                    {{item.title}}
                  </mdb-col>
                </mdb-row>
              </div>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
        <mdb-col class="item-information-right" md="10">
          <mdb-row class="item-infomation-top mx-0">
            <mdb-col md="8" class="pl-0">
              <mdb-card class="mt-1">
                <mdb-card-body>
                  <mdb-row style="color: #4285f4;" class="mb-2 mx-0">
                    <mdb-col md="12" class="text-left px-0">目前状态</mdb-col>
                  </mdb-row>
                  <mdb-row style="color: #4285f4;" class="mb-2 mx-0" v-if="currentCollect">
                    <mdb-col md="12" class="text-left px-0">{{currentCollect}}</mdb-col>
                  </mdb-row>
                  <mdb-row class="mb-2 mx-0">
                    <mdb-col md="12" class="text-left px-0"><a class="currentStatus">{{projectStatus.description}}</a></mdb-col>
                  </mdb-row>
                </mdb-card-body>
              </mdb-card>
            </mdb-col>
            <mdb-col md="4" class="px-0">
              <mdb-card class="mt-1">
                <mdb-card-body>
                  <mdb-row style="color: #4285f4;" class="mb-2 mx-0">
                    <mdb-col md="12" class="text-left px-0">完整示例文件下载</mdb-col>
                  </mdb-row>
                  <mdb-row class="mb-2 mx-0">
                    <mdb-col md="12" class="text-left px-0 download">
                      <a :href="fileUrl1">公开</a>
                      <a :href="fileUrl2">邀请</a>
                      <a :href="fileUrl3">委托</a>
                      <a :href="fileUrl4">公开+邀请</a>
                    </mdb-col>
                  </mdb-row>
                </mdb-card-body>
              </mdb-card>
            </mdb-col>
          </mdb-row>
          <mdb-container class="btn-box mt-4 mb-4">
            <div v-for="(item,index) in viewBtnArr" :key="item.id">
              <div class="btn-box-into" :class="step<index?'disabled-btn':''">
                <div class="dottedWrapper" v-show="index<viewBtnArr.length-1">
                  <img v-if="item.iscmplete" src="@/assets/images/dottedActive.png"/>
                  <img v-else src="@/assets/images/dottedDefault.png"/>
                </div>
                <mdb-btn
                  wavesDark
                  transparent
                  size="sm"
                  outline="primary"
                  :disabled="step<index"
                  class="view-btn waves-effect"
                  :class="[item.iscmplete?'active-btn':'',currentIndex == item.id?'currentShowbtn':'']"
                  @click="viewcontent(item.componentName,index)"
                >{{item.id}}.{{item.name}}
                </mdb-btn>
                
                <i class="line" v-if="currentIndex == item.id"></i>
              </div>
            </div>
          </mdb-container>
          <mdb-row class="mx-0">
            <mdb-col col="12" class="pb-0 project-step px-0">
              <mdb-card>
                <mdb-card-body>
                  <component v-bind:is="currentTabComponent" @viewSwitch="viewSwitch"></component>
                </mdb-card-body>
              </mdb-card>
            </mdb-col>
          </mdb-row>
        </mdb-col>
      </mdb-row>
       <layerProblem
        ref="layPro"
        :message-notify="messageNotify"
        :layer-title="layerTitle"
        :message-type="1"
      ></layerProblem>
    </mdb-container>
</template>
<script>
import tipTool from "@/views/individual/projectDetialManagement/components/tipTool.vue";
import PerfectInfo from "@/views/individual/projectDetialManagement/perfectInfo"; //1.完善信息
import RequireDocking from "@/views/individual/projectDetialManagement/requireDocking"; //2.需求对接
import AgencyContract from "@/views/individual/projectDetialManagement/agencyContract"; //3.签署合同/代理合同
import AgencyFee from "@/views/individual/projectDetialManagement/agencyFee"; //4.代理费用/托管费用
import ResourceDocking from "@/views/individual/projectDetialManagement/resourceDocking"; //5.资源对接
import DesignPhase from "@/views/individual/projectDetialManagement/designPhase"; //6.设计阶段
import ResultConfirm from "@/views/individual/projectDetialManagement/resultConfirm"; //7.结果确认
import PayTail from "@/views/individual/projectDetialManagement/payTail"; //8.支付尾款
import ProjectEnd from "@/views/individual/projectDetialManagement/projectEnd"; //9.项目完成
import layerProblem from "@/components/layerProblem.vue";
import { constants } from 'os';
export default {
  components: {
    tipTool,
    PerfectInfo,
    RequireDocking,
    AgencyContract,
    AgencyFee,
    ResourceDocking,
    DesignPhase,
    ResultConfirm,
    PayTail,
    ProjectEnd,
    layerProblem
  },
  data() {
    return {
      viewBtnArr: [
        {
          id: 1,
          name: "完善信息",
          componentName: "PerfectInfo",
          iscmplete: false
        },
        {
          id: 2,
          name: "需求对接",
          componentName: "RequireDocking",
          iscmplete: false
        },
        {
          id: 3,
          name: "代理合同",
          componentName: "AgencyContract",
          iscmplete: false
        },
        {
          id: 4,
          name: "代理费用",
          componentName: "AgencyFee",
          iscmplete: false
        },
        {
          id: 5,
          name: "资源对接",
          componentName: "ResourceDocking",
          iscmplete: false
        },
        {
          id: 6,
          name: "设计阶段",
          componentName: "DesignPhase",
          iscmplete: false
        },
        {
          id: 7,
          name: "结果确认",
          componentName: "ResultConfirm",
          iscmplete: false
        },
        {
          id: 8,
          name: "支付尾款",
          componentName: "PayTail",
          iscmplete: false
        },
        {
          id: 9,
          name: "项目完成",
          componentName: "ProjectEnd",
          iscmplete: false
        }
      ],
      messageNotify: {},
      layerTitle: "项目信息",
      viewNotify: null,

      isuploadFile: true,
      currentTabComponent: "PerfectInfo",
      currentTabComponentName: "完善信息",
      currentIndex: 1,

      projetDetial: "",
      notifyList: "",
      projectStatus: "",
      fileUrl1: "",
      fileUrl2: "",
      fileUrl3: "",
      fileUrl4: "",
      flowList: "",
      notifyDetail: "",
      overviewForm: "",
      role: "",
      designerProportion: 0,
      step: 0,
      designerArr:[],
      joinDesignerArr:[],
      isdesignerShow:false,
      isjoinDesignerShow:false,
      collectProgramType:null,
      collectProgramTypeText:null,
      currentCollect:null,
    };
  },
  methods: {
    confirmDesigner(mark){
      if(mark==2){
        this.isdesignerShow = true;
      }else{
        this.isjoinDesignerShow = true;
      }
    },
    cancolDesigner(mark){
      if(mark==2){
        this.isdesignerShow = false;
      }else{
        this.isjoinDesignerShow = false
      } 
    },
    viewSwitch(data) {
      this.getProjectStatus(()=>{
        if(this.step>=data){
          this.currentTabComponent = this.viewBtnArr[data].componentName;
          this.currentTabComponentName = this.viewBtnArr[data].name;
          this.currentIndex = this.viewBtnArr[data].id;
          //  this.$message(" 平台正在为您审核设计任务书，客户经理将与您及时线下对接。")
        }else{
          this.$message("项目经理审核中，请等待……")
        }
      })
    },
    //显示查看问题弹层
    setContact(notify) {
      this.messageNotify = {};
      this.api.returnNewsId({ id: notify.id }).then(res => {});
      this.messageNotify = notify;
      this.$refs.layPro.contact = true;
    },
    qryDesignerProportion() {
      this.api.qryDesignerProportion({ projectId: this.$route.query.id }).then(res => {
        if (res.code == 0) {
          this.designerArr = res.data.totalDesigners
          this.joinDesignerArr = res.data.acceptedDesigners
          if ( this.joinDesignerArr.length >this.designerArr.length) {
            this.designerProportion = 1;
          } else {
            if(this.designerArr.length!=0){
              this.designerProportion = this.joinDesignerArr.length / this.designerArr.length;
            }
          }
          this.drawLine();
        }
      });
    },

    drawLine() {
      let myChart = this.$echarts.init(
        document.getElementById("peopleProportion")
      );
      let option = {
        series: [
          {
            name: "答疑",
            type: "pie",
            radius: ["50%", "70%"],
            hoverAnimation: false,
            color: ["#cccccc", "#4285f4"],
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 1 - this.designerProportion, name: "直接访问" },
              { value: this.designerProportion, name: "邮件营销" }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },

    viewcontent(componentName, index) {
      // this.getProjectStatus(()=>{
      //   if(this.step>=index||index<0){
          this.currentTabComponent = this.viewBtnArr[index].componentName;
          this.currentTabComponentName = this.viewBtnArr[index].name;
          this.currentIndex = index + 1;
        // }else{
        //   this.$message("请完善上一步骤，再进行该操作。")
        // }
      // })
    },
    queryProjectInfo(){
      this.api.queryProjectInfo({projectId:this.$route.query.id}).then(res=>{
        this.projetDetial = res.data;
        if (this.projetDetial.signUpDeadLine) {
          this.projetDetial.signUpDeadLine = this.projetDetial.signUpDeadLine.split( " " )[0];
        } else {
          this.projetDetial.signUpDeadLine = "--";
        }
        if (this.projetDetial.openDate) {
          this.projetDetial.openDate = this.projetDetial.openDate.split( " " )[0];
        } else {
          this.projetDetial.openDate = "--";
        }
        // 1:公开 2:邀请 3委托 4 邀请+公开'
        if (this.projetDetial.collectProgramType == 1) {
          this.viewBtnArr[2].name = "签署合同";
          this.viewBtnArr[3].name = "托管费用";
          this.viewBtnArr[4].name = "招标细节";
          this.collectProgramType = "公开"
        }else if(this.projetDetial.collectProgramType == 2){
          this.collectProgramType = "邀请"
          this.collectProgramTypeText = "邀请建筑师总数"
          this.qryDesignerProportion();
        }else if(this.projetDetial.collectProgramType == 3){
          this.collectProgramType = "委托"
          this.collectProgramTypeText = "委托建筑师总数"
          this.qryDesignerProportion();
        }else if(this.projetDetial.collectProgramType == 4){
          this.collectProgramType = "邀请+公开"
          this.collectProgramTypeText = "邀请建筑师总数"
          this.qryDesignerProportion();
        }else{
          this.collectProgramType = "--"
        }
      })
    },
    getNotify() {
      this.api.getNotify({
        projectId: this.$route.query.id,
        type: this.role
      }).then(res => {
        if (res.code == 0) {
          this.notifyList = res.notifyDOS;
        }
      });
    },
    getProjectStatus(callback) {
      this.api.getProjectStatus({ id: this.$route.query.id }).then(res => {
        if (res.code == 0) {
          if(res.data.currentCollect){
            this.currentCollect = res.data.currentCollect
          }
          this.projectStatus = res.data;
          this.$router.push({
            path: "/projectDetial",
            query:{
              id:this.$route.query.id,
              step:this.projectStatus.status,
              t:"s"
            }
          });
          this.step=parseInt(this.projectStatus.status);
          callback&&callback()
        }
      });
    },
    downLoad() {
      this.fileUrl1 = this.api.exampleDownload(1);
      this.fileUrl2 = this.api.exampleDownload(2);
      this.fileUrl3 = this.api.exampleDownload(3);
      this.fileUrl4 = this.api.exampleDownload(4);
    },
    //项目详细信息
    getProjectInfomation() {
      this.api.getProjectInfomation({
        id: this.$route.query.id
      }).then(res => {
        this.overviewForm = res.data;
      });
    },
    init() {
      this.getProjectStatus(()=>{
        this.role = localStorage.getItem("role");
        let step = this.$route.query.step;
        if (step > 0) {
          for (let j = 0; j < parseInt(step); j++) {
            this.viewBtnArr[j].iscmplete = true;
          }
          if(step==1){
            this.api.seekTaskBaseInfo(this.$route.query.id).then(res=>{
              if(
                res.data.taskBaseInfoDO.auditState==3||
                res.data.taskDependDO.auditState==3||
                res.data.taskDesignRequiredDO.auditState==3||
                res.data.taskArchRequiredDO.auditState==3||
                res.data.projectDO.budgetAuditState==3||
                res.data.projectDO.budgetAuditState==6
              ){
                this.currentTabComponent = this.viewBtnArr[0].componentName;
                this.currentIndex = this.viewBtnArr[0].id;
                this.currentTabComponentName = this.viewBtnArr[0].name;
                return 
              }
              this.currentTabComponent = this.viewBtnArr[1].componentName;
              this.currentIndex = this.viewBtnArr[1].id;
              this.currentTabComponentName = this.viewBtnArr[1].name;
            })
          }else{
           
            for (let i = 0; i < this.viewBtnArr.length; i++) {
              if (this.viewBtnArr[i].id == step && i + 1 < this.viewBtnArr.length) {
                this.currentTabComponent = this.viewBtnArr[i + 1].componentName;
                this.currentIndex = this.viewBtnArr[i + 1].id;
                this.currentTabComponentName = this.viewBtnArr[i + 1].name;
                break;
              }
            }
         }
        }
      }); //项目状态更新
      this.getProjectInfomation(); //项目详细信息
      this.queryProjectInfo() 
      this.getNotify(); //站内信
      this.downLoad(); //下载
      // this.qryDesignerProportion();  //设计师比例
    }
  },
  mounted() {
    // let _this = this
    // Bus.$off("Refresh");
    // Bus.$on("Refresh", ()=> {
    //   _this.getProjectStatus();
    // });
    this.init();
  },
  watch: {
    $route() {
      this.getProjectStatus(()=>{
        this.step = this.$route.query.step;
        for (let i = 0; i < this.step; i++) {
          this.viewBtnArr[i].iscmplete = true;
        }
      });
      this.getProjectInfomation(); //项目详细信息
      this.queryProjectInfo();
      this.getNotify();
      this.downLoad();
      // this.qryDesignerProportion();
    }
  }
};
</script>
<style lang="less" scoped>
.item-information-warp {
  font-size: 0.875rem;
  padding: 5rem 3rem;
  .project-desc {
    color: #4285f4 !important;
    margin-bottom: 0.75rem;
    text-align: left;
  }
  .item-information-left {
    .personal-info {
      text-align: left !important;
      color: #999999;
      margin-bottom: 0.75rem;
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      .personal-info-title {
        flex-shrink: 0;
      }
      .personal-info-text{
        flex-shrink: 1;
        text-align: right;
        word-wrap: break-word;
        display: inline-block;
        word-break: normal;word-wrap:break-word;
      }
    }
    .personal-info:last-child {
      margin-bottom: 1rem;
    }
    .peopleProportion-warp{
      padding-top: 1.25rem;
      padding-bottom: 1.25rem;
    }
    .peopleProportion{
        vertical-align:middle;
        margin: auto;
        width:6.25rem;
        height:6.25rem;
    }
    .peopleProportion-text{
      display: flex;
      justify-content: space-between;
      color: #999999;
    }
    .peopleProportion-text-1{
      color:#b1b1b1;
      text-align: center;
      font-size: 0.5rem;
      a{
        position: relative;
        color: #4285f4;
        display: inline-block;
        height: 1.125rem;
      }
    }
    .chart-box{
      position: relative;
    }
    .chart-num-tip{
      width:100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
    }
    .notify {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
    .notify:hover {
      color: #4285f4;
    }
  }
  .item-information-right {
    .currentStatus {
      color: #999999;
    }
    .currentStatus:hover {
      color: #4285f4;
    }
    .download {
      a {
        cursor: pointer;
        color: #b1b1b1;
        background: #f1f1f1;
        margin-right: 0.5rem;
        padding: 0 0.25rem;
      }
      a:hover {
        background: #ffffff;
        color: #4285f4;
      }
    }
    .current-tab-name {
      margin-bottom: 2rem;
    }
  }
  .btn-box {
    background: #f6f6f6;
    border: 1px solid #f4f4f4;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    .btn-box-into {
      position: relative;
      .dottedWrapper{
        position: absolute;
        display:inline-block;
        right: -1.5625rem;
        top: 0.8125rem;
        z-index: 1;
      }
      .line {
        position: absolute;
        bottom: -0.4375rem;
        left: 50%;
        height: 0.125rem;
        width: 3rem;
        background: #4285f4;
        transform: translateX(-50%);
      }
    }
    .view-btn {
      flex: 1 1 auto;
      font-size: 0.875rem;
      padding: 0.625rem;
      margin-left: 0;
      margin-right: 0;
      z-index: 20;
    }
    .view-btn:hover{
      color: #4285f4 !important;
    }
    .view-btn.btn-outline-primary:not([disabled]):not(.disabled):active{
      background-color: #f6f6f6!important;
    }
  }
  .bg-white {
    background: white;
  }
  .font-weight {
    font-weight: 600;
  }
  .item {
    flex-basis: auto !important;
    flex-grow: 0 !important;
  }
}
</style>
<style lang="less">
.item-information-warp {
  .text-1{
    color: #333333;
    margin-bottom: 0.75rem;
  }
  .text-2{
    color: #333333;
    margin-top:2rem; 
  }
  .pb-5 {
    padding-bottom: 0 !important;
  }
  .project-step .card-body {
    padding: 0 1.25rem;
  }
  ul.stepper li a {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0;
  }
  ul.stepper li{
    min-height: 5.25rem;
  }
  .stepper-vertical li:not(:last-child):after {
    min-height: 5.25rem;
    width: 0.125rem;
    top: 1.875rem;
    left:0.875rem;;
    height: calc(100% - 20px);
  }
  .endstep:after{
    background: #07D8AE !important;
  }
  .stepper {
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-top: 3rem !important;
    margin-bottom:2.4375rem !important;
    padding: 0 !important;
    width: 100% !important;
  }
  ul.stepper li a .circle{
    width: 1.875rem;
    height: 1.875rem;
    margin-right: 1.25rem;
    line-height: 1.875rem;
    text-align: center;
  }
  .stepper-vertical li.completed a .label {
    line-height: 1.875rem;
    font-size: 1rem;
    font-weight: 100 !important;
    color: #333;
  }
  .step-content{
    margin-left: 3.125rem !important;
    margin-top: 0.8125rem;
    padding: 0 !important;
    box-sizing: border-box !important;
    width: calc(100% - 50px) !important;
    background:#fff !important;
  }
  .btn-outline-primary {
    color: #333 !important;
    border: none !important;
    box-shadow: none;
  }
  .btn-box-into .active-btn {
    background: #fff !important;
    border-radius: 0.3125rem;
    box-shadow: 0 0.3125rem 0.6875rem 0 rgba(0, 0, 0, 0.18) , 0 4px 0.9375rem 0 rgba(0, 0, 0, 0.15) ;
  }
  .btn-box-into .currentShowbtn {
    background: #fff !important;
    color: #4285f4 !important;
    border-radius: 0.3125rem;
    box-shadow: 0 0.3125rem 0.6875rem 0 rgba(0, 0, 0, 0.18) , 0 4px 0.9375rem 0 rgba(0, 0, 0, 0.15) ;
  }
  .item-information-left{
    .card-body{
      overflow-y: visible;
    }
  }
  .mt-5 {
    margin-top: 0 !important;
  }
  .project-detial-body{
    margin-top: 0.8125rem !important;
    margin-bottom: 2.375rem;
    background: #fff !important;
  }
}
</style>

