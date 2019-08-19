<template>
  <mdb-container class="perfect-info-warp px-0">
      <mdb-stepper simpleV class="mt-0">
        <li
          class="completed"
          :class="[item.status==2||item.status==4?'warning':'',item.status==3||item.status==5?'endstep':'']"
          slot="simple"
          v-for="(item , index) in perfectInfo"
          :key="item.id"
          style="width:100%;box-sizing:border-box;"
        >
          <a @click="viewshow(item.id,item.componentName,index)">
            <span class="circle endstep" v-if="item.status==3||item.status==5" style="background-color: #07D8AE !important;">
              <mdb-icon icon="check"/>
            </span>
            <span class="circle" v-if="item.status==2||item.status==4">
              <mdb-icon icon="exclamation-triangle"/>
            </span>
            <span class="circle" v-if="item.status==1">{{item.id}}</span>
            <span class="label">{{item.name}}</span>
          </a>
          <div
            class="step-content project-detial-body"
            v-if="currentId==item.id"
          >
            <component v-bind:is="currentComponent" v-if="currentId==item.id" ref="pI" @feeEstimate="feeEstimate"></component>
            <mdb-btn class="btn110_40" color="primary" v-if="item.id!=1&&(!disabled&&item.status!=5&&item.status!=3)" @click="zcSave(index)">暂存</mdb-btn>
            <mdb-btn 
              class="btn110_40" 
              style="margin-left: 2rem;" 
              color="primary" 
              v-if="item.id!=1&&(!disabled&&item.status!=5&&item.status!=3)" 
              @click="stepSwitch(index,1)"
              >
              {{item.id!=6?(item.status==4?"更新":"下一步"):(item.status==4?"更新":"提交")}}
              </mdb-btn>
            <mdb-btn class="btnBack110_40" color="primary" v-if="item.id!=1&&(!disabled&&item.status!=5&&item.status!=3)" @click="stepSwitch(index,-1)">返回</mdb-btn>
          </div>
        </li>
      </mdb-stepper>
  </mdb-container>
</template>
<script>
import InitialDemand from "@/views/individual/projectDetialManagement/perfectInfo/initialDemand"; //初步项目需求
import DetialInfoPerfect from "@/views/individual/projectDetialManagement/perfectInfo/detialInfoPerfect"; //完善信息
import DesignBasis from "@/views/individual/projectDetialManagement/perfectInfo/designBasis"; //设计依据
import DesignDemand1 from "@/views/individual/projectDetialManagement/perfectInfo/designDemand1"; //设计需求1
import DesignDemand2 from "@/views/individual/projectDetialManagement/perfectInfo/designDemand2"; //设计需求2
import DesignFeeEstimate from "@/views/individual/projectDetialManagement/perfectInfo/designFeeEstimate"; //设计费预估
export default {
  name: "perfectInfo",
  components: {
    InitialDemand,
    DetialInfoPerfect,
    DesignBasis,
    DesignDemand1,
    DesignDemand2,
    DesignFeeEstimate
  },
  data() {
    return {
      auditState:null,
      hasTaskFile:null,
      disabled:false,
      currentId: null,
      currentComponent: null,
      perfectInfo: [    // 1默认状态 2 校验 3提交 4驳回 5二审通过
        {
          id: 1,
          name: "初步需求",
          status: 3,
          componentName: "InitialDemand"
        },
        {
          id: 2,
          name: "完善信息",
          status: 1,   
          componentName: "DetialInfoPerfect"
        },
        {
          id: 3,
          name: "设计依据",
          status: 1,
          componentName: "DesignBasis"
        },
        {
          id: 4,
          name: "设计需求1",
          status: 1,
          componentName: "DesignDemand1"
        },
        {
          id: 5,
          name: "设计需求2",
          status: 1,
          componentName: "DesignDemand2"
        },
        {
          id: 6,
          name: "设计费预算",
          status: 1,
          componentName: "DesignFeeEstimate"
        }
      ]
    };
  },
  methods: {
    getProjectStatus( type ) {
      this.api.getProjectStatus({ id: this.$route.query.id }).then(res => {
        if (res.code == 0) {
          if (type) {
            if (res.data.status >= 1) {
              this.currentId = null;
              this.currentComponent = null;
            } 
            // else {
            //   this.currentId = 2;
            //   this.currentComponent = "DetialInfoPerfect";
            // }
          } else {
            this.$router.push({
              path: "/projectDetial",
              query: {
                id: this.$route.query.id,
                step: res.data.status,
                t: this.currentId
              }
            });
          }
        }
      });
    },
    viewshow(id, component, index) {
      if (this.hasTaskFile == 3&&index!=0&&this.perfectInfo[index].status!=5) {
        return
      }else{
        if(this.currentComponent==component){
          this.currentId = null;
          this.currentComponent = null;
        }else{
          this.currentId = id;
          this.currentComponent = component;
        }
        if (this.perfectInfo[index].status == 2) {
          this.perfectInfo[index].status = 1;
        }
      }
    },
    stepSwitch(index, step) {
      if (step < 0 && index == 0) {
        return;
      }
      if (step > 0) {
        if (index != 0) {
          let checkForm = this.$refs.pI[0].submit();
          if (checkForm==true) {
            // if (index == 5) {
            // this.$emit("viewSwitch", 1);
            // } else 
            if(index!= 5){
              if(this.perfectInfo[index].status!=4) {
                this.currentId = this.perfectInfo[index + step].id;
                this.currentComponent = this.perfectInfo[index + step].componentName;
              }
              this.perfectInfo[index].status =3;
              this.getProjectStatus(false);
            }
          } else {
            if(index!= 5||checkForm=="fee"){
              this.perfectInfo[index].status = 2;
            }
          }
        }
      } else {
        this.currentId = this.perfectInfo[index + step].id;
        this.currentComponent = this.perfectInfo[index + step].componentName;
      }
    },
    feeEstimate(){
      this.perfectInfo[5].status =3;
      //  this.api.seekTaskBaseInfo(this.$route.query.id).then(res => {
      //    if(res.data.taskBaseInfoDO&&
      //       res.data.taskDependDO&&
      //       res.data.taskDesignRequiredDO&&
      //       res.data.taskArchRequiredDO){
      this.$emit("viewSwitch", 1);
      this.$message(" 平台正在为您审核设计任务书，客户经理将与您及时线下对接。")
      //    }
      //  })
    },
    zcSave(index) {
      let isCheckPass = this.$refs.pI[0].temporarilySave()
      if(!isCheckPass){
        this.perfectInfo[index].status = 2;
      }else{
        this.perfectInfo[index].status = 3;
      }
    },
    seekTaskBaseInfo(){
      let showView = [1]
      this.api.seekTaskBaseInfo(this.$route.query.id).then(res => {
        if (res.code == 0) {
          this.hasTaskFile = res.data.projectDO.hasTaskFile;
          this.auditState = res.data.projectDO.auditState;
          if (res.data.projectDO.hasTaskFile == 3) {
              this.disabled = true;
          }
          if(res.data.tbTaskDO&&res.data.tbTaskDO.auditState==5){
            this.perfectInfo[1].status = 5;
            this.perfectInfo[2].status = 5;
            this.perfectInfo[3].status = 5;
            this.perfectInfo[4].status = 5;
            showView = [1,1,1,1,1]
          }else{
            // 第二步 完善信息 //auditState  1提交没审 2 一审通过 3一审驳回 4提交二审 5审核通过 6二审驳回（3）
            if(res.data.taskBaseInfoDO){
              if(res.data.taskBaseInfoDO.auditState==3){
                this.perfectInfo[1].status = 4;
                showView.push(0)
              }else if(res.data.taskBaseInfoDO.auditState==1||
                res.data.taskBaseInfoDO.auditState==2||
                res.data.taskBaseInfoDO.auditState==4){
                this.perfectInfo[1].status = 3;
                showView.push(1)
              }
            }else{
              showView.push(0)
            }
            // 第三步 设计依据
            if(res.data.taskDependDO){
              if(res.data.taskDependDO.auditState==3){
                this.perfectInfo[2].status = 4;
                showView.push(0)
              }else if(res.data.taskDependDO.auditState==1||
                res.data.taskDependDO.auditState==2||
                res.data.taskDependDO.auditState==4){
                this.perfectInfo[2].status = 3;
                showView.push(1)
              }
            }else{
              showView.push(0)
            }
            // 第四步 设计需求1
            if(res.data.taskDesignRequiredDO){
              if(res.data.taskDesignRequiredDO.auditState==3){
                this.perfectInfo[3].status = 4;
                showView.push(0)
              }else if(res.data.taskDesignRequiredDO.auditState==1||
                res.data.taskDesignRequiredDO.auditState==2||
                res.data.taskDesignRequiredDO.auditState==4){
                this.perfectInfo[3].status = 3;
                showView.push(1)
              }
            }else{
              showView.push(0)
            }
            // 第五步 设计需求2
            if (res.data.taskArchRequiredDO){
              if(res.data.taskArchRequiredDO.auditState==3){
                this.perfectInfo[4].status = 4;
                showView.push(0)
              }else if(res.data.taskArchRequiredDO.auditState==1||
                res.data.taskArchRequiredDO.auditState==2||
                res.data.taskArchRequiredDO.auditState==4){
                this.perfectInfo[4].status = 3;
                showView.push(1)
              }
            }else{
              showView.push(0)
            }
          }
          // 第六步 设计费 
          if (res.data.projectDO.budgetAuditState) {
            if(res.data.projectDO.budgetAuditState==3||res.data.projectDO.budgetAuditState==6){
              this.perfectInfo[5].status = 4;
              showView.push(0)
            }else if(res.data.projectDO.budgetAuditState==5){
              showView.push(1)
              this.perfectInfo[5].status = 5;
            }else if(res.data.projectDO.budgetAuditState==1||
              res.data.projectDO.budgetAuditState==2||
              res.data.projectDO.budgetAuditState==4) {
              this.perfectInfo[5].status = 3;
              showView.push(1)
            }
          }else{
            showView.push(0)
          }
          if(this.hasTaskFile != 3&&this.auditState!=5){
            for(let i=0;i<showView.length;i++){
              if(showView[i]==0){
                this.currentId = this.perfectInfo[i].id;
                this.currentComponent = this.perfectInfo[i].componentName;
                return
              }
            }
          }
        }
      });
    },
    init() {
      this.getProjectStatus(true)
      this.seekTaskBaseInfo()
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.perfect-info-warp { 
  
}
</style>
<style lang="less">
.perfect-info-warp {
  // .mt-5 {
  //   margin-top: 0 !important;
  // }
}
</style>
