<template>
  <mdb-container class="resource-docking-warp px-0">
    <mdb-stepper simpleV>
      <li
        class="completed"
        :class="[item.status==2||item.status==4?'warning':'',item.status==5||item.status==3?'endstep':'']"
        slot="simple"
        v-for="(item , index) in requireSocking"
        :key="item.id"
        style="width:100%;box-sizing:border-box;"
      >
        <a @click="viewshow(item.id,item.componentName,index)">
          <span class="circle" v-if="item.status==5||item.status==3" style="background-color: #07D8AE !important;">
            <mdb-icon icon="check"/>
          </span>
          <span class="circle" v-if="item.status==2||item.status==4">
            <mdb-icon icon="exclamation-triangle"/>
          </span>
          <span class="circle" v-if="item.status==1">{{index+1}}</span>
          <span class="label">{{item.name}}</span>
        </a>
        <div
          class="step-content project-detial-body"
          v-if="currentId==item.id"
        >
          <component ref="viewCom" v-bind:is="currentComponent" v-if="currentId==item.id" @showView="showView"></component>
          <mdb-btn 
            class="btn110_40 mr-4"
            color="primary"
            @click="zcSave(index)"
            v-if="(item.componentName=='CommissionInfo'
            ||item.componentName=='Depth'
            ||item.componentName=='Cycle'
            ||item.componentName=='Detials')&&item.nonEditable!=0&&item.status!=3&&item.status!=5">暂存</mdb-btn>
          <mdb-btn
            class="btn110_40"
            color="primary"
            :disabled="item.componentName=='DesignerDocking'&&(!finallyDesigner||finallyDesigner.length==0)"
            @click="stepSwitch(index,1)"
          >下一步</mdb-btn>
          <mdb-btn
            class="btnBack110_40"
            color="primary"
            @click="stepSwitch(index,-1)"
          >返回</mdb-btn>
        </div>
      </li>
    </mdb-stepper>
  </mdb-container>
</template>
<script>
import DesignerDocking from "@/views/individual/projectDetialManagement/resourceDocking/designerDocking"; //对接设计师
import CommissionInfo from "@/views/individual/projectDetialManagement/resourceDocking/commissionInfo"; //委托信息
import DesignContract from "@/views/individual/projectDetialManagement/resourceDocking/designContract"; //设计合同
import PayVoucher from "@/views/individual/projectDetialManagement/resourceDocking/payVoucher1"; //支付凭证
import Depth from "@/views/individual/projectDetialManagement/resourceDocking/depth"; //设计深度及成果要求
import Cycle from "@/views/individual/projectDetialManagement/resourceDocking/cycle"; //服务周期及时间节点
import Detials from "@/views/individual/projectDetialManagement/resourceDocking/details"; //开标细节
export default {
  name: "resourceDocking",
  components: {
    DesignerDocking,
    CommissionInfo,
    Depth, 
    Cycle, 
    Detials,
    DesignContract,
    PayVoucher,
  },
  data() {
    return {
      disabled:false,
      currentId: null,
      currentComponent: "",
      requireSocking0: [      // 邀请，邀请+公开
        {
          id: 1,
          name: "设计深度及成果要求",
          status: 1,
          componentName: "Depth",
          nonEditable:1,
        },
        {
          id: 2,
          name: "服务周期及时间节点",
          status: 1,
          componentName: "Cycle",
          nonEditable:1,
        },
        {
          id: 3,
          name: "开标细节",
          status: 1,
          componentName: "Detials",
          nonEditable:1,
        },
        {
          id: 4,
          name: "对接建筑师",
          status: 1,
          componentName: "DesignerDocking",
          nonEditable:1,
        },
        {
          id: 5,
          name: "签署合同",
          status: 1,
          componentName: "DesignContract",
          nonEditable:1,
        },
        {
          id: 6,
          name: "完成您的支付",
          status: 1,
          componentName: "PayVoucher",
          nonEditable:1,
        }
      ],
      requireSocking1: [   //委托
        {
          id: 1,
          name: "委托信息",
          status: 1,
          componentName: "CommissionInfo",
          nonEditable:1,
        },
        {
          id: 2,
          name: "对接建筑师",
          status: 1,
          componentName: "DesignerDocking",
          nonEditable:1,
        },
        {
          id: 3,
          name: "签署合同",
          status: 1,
          componentName: "DesignContract",
          nonEditable:1,
        },
        {
          id: 4,
          name: "完成您的支付",
          status: 1,
          componentName: "PayVoucher",
          nonEditable:1,
        }
      ],
      requireSocking2: [  // 公开
         {
          id: 2,
          name: "设计深度及成果要求",
          status: 1,
          componentName: "Depth",
          nonEditable:1,
        },
        {
          id: 3,
          name: "服务周期及时间节点",
          status: 1,
          componentName: "Cycle",
          nonEditable:1,
        },
        {
          id: 4,
          name: "开标细节",
          status: 1,
          componentName: "Detials",
          nonEditable:1,
        },
      ],
      requireSocking: [],
      signState:null,
      invitationList:null,
      finallyDesigner:null
    };
  },
  watch: {
   
  },
  methods: {
    qryFinallyDesigner(s,index) {
      let that = this
      this.api.qryFinallyDesigner({ projectId: this.$route.query.id }).then(res => {
        if (res.code == 0) {
          this.finallyDesigner = res.data;
          if(s==2){
            if(this.finallyDesigner.length<=0){
              this.$message("平台正在与建筑师对接中，对接完成将立刻与您联系。");
              return
            }else{
              this.view(that.requireSocking[index].id, that.requireSocking[index].componentName)
            }
          }
        }
      });
    },
    view(id, component){
      if(this.currentId==id&&this.currentComponent == component){
        this.currentId = null;
        this.currentComponent = null;
      }else{
        this.currentId = id;
        this.currentComponent = component;
      }
    },
    viewshow(id, component,index) {
      if(this.requireSocking[index].componentName=="DesignContract"){
        this.qryFinallyDesigner(2,index)
        // for(let i=0;i<index;i++){
        //  if(this.requireSocking[i].status!=5){
        //     this.$message("平台正在与建筑师对接中，对接完成将立刻与您联系。");
        //     return;
        //  }
        // }
      }else if(this.requireSocking[index].componentName=="PayVoucher"){
        // if(this.requireSocking[index].componentName=="PayVoucher" && this.signState!=1){
        //   this.$message("请先签署合同，再上传凭证。");
        //   return;
        // }
        this.getContract(1,index);
      }else {
        this.view(id, component)
      }
    },
    stepSwitch(index, step) {
      if(step>0&&
        this.requireSocking[index].nonEditable!=0&&
        this.requireSocking[index].status!=3&&
        this.requireSocking[index].status!=5){

        if(this.currentComponent == "CommissionInfo"
          ||this.currentComponent=='Depth'
          ||this.currentComponent=='Cycle'
          ||this.currentComponent=='Detials'){
          let ischeck = this.$refs.viewCom[0].submit();
          if(!ischeck){
            this.requireSocking[index].status = 2;
            return
          }else{
            if(this.requireSocking[index].status == 4){
              this.requireSocking[index].status = 3;
            }else{
              this.requireSocking[index].status = 3;
            }
          }
        }
        if(this.requireSocking[index].componentName=="DesignerDocking"){
          this.qryFinallyDesigner(1,null);
        }
      }
      if (index == 0 && step < 0) {
        this.$emit("viewSwitch", 3);
      } else if (index == this.requireSocking.length - 1 && step > 0) {
        this.$emit("viewSwitch", 5);
      } else {
        if(step>0){
          if(this.requireSocking[index+1].componentName=="DesignContract"){
            this.qryFinallyDesigner(2,index+1);
          }
          // if(this.requireSocking[index].status!=5&&this.requireSocking[index+1].componentName=="DesignContract"){
          //   this.$message("平台正在与建筑师对接中，对接完成将立刻与您联系。");
          //   return;
          // }
         else if(this.requireSocking[index].componentName=="DesignContract"){
            this.getContract(1,index+1)
          }
          // if(this.requireSocking[index].componentName=="DesignContract" && this.signState!=1){
          //   this.$message("请先签署合同，再上传凭证。");
          //   return;
          // }
         else {
          this.currentId = this.requireSocking[index + step].id;
          this.currentComponent = this.requireSocking[index + step].componentName;
         }
        }
        // else{
        //   this.currentId = this.requireSocking[index + step].id;
        //   this.currentComponent = this.requireSocking[index + step].componentName;
        // }
      }
    },
    showView(data) {
      if (data < 0) {
        if (this.requireSocking.length == 4) {
          this.currentId = this.requireSocking[0].id;
          this.currentComponent = this.requireSocking[0].componentName;
        } else if (this.requireSocking.length < 4) {
          this.$emit("viewSwitch", 3);
        }
      } else if (data > 0) {
        if (this.requireSocking.length == 4) {
          for (let i = 0; i < this.requireSocking.length; i++) {
            if (this.requireSocking[i].componentName == "DesignContract") {
              this.currentId = this.requireSocking[i].id;
              this.currentComponent = this.requireSocking[i].componentName;
              return;
            }
          }
        } else if (this.requireSocking.length < 4) {
          this.$emit("viewSwitch", 5);
        }
      }
    },
    zcSave(index) {
      let ischeck = this.$refs.viewCom[0].temporarilySave();
      if(!ischeck){
        this.requireSocking[index].status = 2;
      }else{
        this.requireSocking[index].status = 1;
      }
    },
    listProjectMoney(s) {
      this.api.listProjectMoney({
        projectId: this.$route.query.id,
        type: 3
      }).then(res => {
        if (res.code == 0 && res.fileList.length>0 && res.fileList[0].state==2) {
          for (let i = 0; i < this.requireSocking.length; i++) {
            if(this.requireSocking[i].componentName == "PayVoucher"){
              this.requireSocking[i].status = 5;
              break;
            }
          }
        }
        if(s==0){
          for(let k=0;k<this.requireSocking.length;k++){
            if(this.requireSocking[k].status==1||this.requireSocking[k].status==4){
              this.currentId = this.requireSocking[k].id;
              this.currentComponent = this.requireSocking[k].componentName;
              break;
            }
          }
        }
      });
    },
    getContract(s,index) {
      let that = this
      this.api.queryContractList({
          projectid: this.$route.query.id,
          name:1
      }).then(res => {
        if(res.code == 0){
          this.signState = res.data[0].status;
          if (res.data.length>0&&res.data[0].status==1) {
            for (let i = 0; i < this.requireSocking.length; i++) {
              if(this.requireSocking[i].componentName == "DesignContract"){
                this.requireSocking[i].status = 5;
                break;
              }
            }
          }
        }
        if(s==0){
          this.listProjectMoney(s);  //支付费用
        }else if(s==1){
          if(this.signState ==1){
            this.view(that.requireSocking[index].id, that.requireSocking[index].componentName)
          }else{
            this.$message("请先签署合同，再上传凭证。");
            return
          }
        }
      });
    },
    required(s){
      this.api.required(this.$route.query.id).then(res => {
        if(res.code==0){
           if (res.data.projectDO) {
            //  1:公开 2:邀请 3委托 4 邀请+公开'
            if (res.data.projectDO.collectProgramType == 1) {  //公开 无设计合同和支付凭证
              this.requireSocking = this.requireSocking2;
            } else if (res.data.projectDO.collectProgramType == 3) {   //委托 委托信息
              this.requireSocking = this.requireSocking1;
              if(res.data.projectDO.nonEditable==0){   //nonEditable==0 高级编辑
                this.requireSocking[0].nonEditable = 0;
              }
              if (res.data.projectDO.buttStatus == 5) {  // 对接完成
                this.requireSocking[1].status = 5;
              }
            } else {       //邀请  邀请+公开'  招标细节
              this.requireSocking = this.requireSocking0;
              if (res.data.projectDO.buttStatus == 5) {
                this.requireSocking[3].status = 5;
              }
            }
          }
          // auditState == 5 二审通过 不可以修改
          if(res.data.projectDO.auditState==5){
            for (let i = 0; i < this.requireSocking.length; i++) {
              if(this.requireSocking[i].componentName == "CommissionInfo"||
                  this.requireSocking[i].componentName =="Depth"||
                  this.requireSocking[i].componentName =="Cycle"||
                  this.requireSocking[i].componentName =="Detials"){
                this.requireSocking[i].status = 5;
                this.requireSocking[i].nonEditable = 0;
              }
            }
          }else{
            if(res.data.projectDO.collectProgramType !=3){  // 非委托
               //设计深度及成果要求
              if(res.data.requiredResultDO){
                if(res.data.requiredResultDO.nonEditable==0){ // nonEditable = 0 高级编辑
                  this.requireSocking[0].nonEditable = 0;
                }
                if(res.data.requiredResultDO.auditState == 3){
                  this.requireSocking[0].status = 4; // auditState == 3 一审驳回
                }else if(res.data.requiredResultDO.auditState == 1||
                  res.data.requiredResultDO.auditState == 2||
                  res.data.requiredResultDO.auditState == 4){
                  this.requireSocking[0].status = 3;
                }
              }
              //服务周期及时间节点
              if(res.data.requiredDateDO){
                if(res.data.requiredDateDO.nonEditable==0){ // nonEditable = 0 高级编辑
                  this.requireSocking[1].nonEditable = 0;
                }
                if(res.data.requiredDateDO.auditState == 3){
                  this.requireSocking[1].status = 4; // auditState == 3 一审驳回
                }else if(res.data.requiredDateDO.auditState == 1||
                  res.data.requiredDateDO.auditState == 2||
                  res.data.requiredDateDO.auditState == 4){
                  this.requireSocking[1].status = 3;
                }
              }
              //开标细节
              if(res.data.requiredOpenBidDO){ 
                if(res.data.requiredOpenBidDO.nonEditable==0){ // nonEditable = 0 高级编辑
                  this.requireSocking[2].nonEditable = 0;
                }
                if(res.data.requiredOpenBidDO.auditState == 3){
                  this.requireSocking[2].status = 4;   // auditState == 3 一审驳回
                }else if(res.data.requiredOpenBidDO.auditState == 1||
                  res.data.requiredOpenBidDO.auditState == 2||
                  res.data.requiredOpenBidDO.auditState == 4){  
                  this.requireSocking[2].status = 3;
                }
              }
            }else{        //委托
              if(res.data.projectDO.auditState==3){
                this.requireSocking[0].status =4;
              }else if(res.data.projectDO.auditState==1||
                res.data.projectDO.auditState==2||
                res.data.projectDO.auditState==4){
                this.requireSocking[0].status =3;
              }
            }
          }
          if(res.data.projectDO.collectProgramType!=1){   // 非公开
            this.getContract(s,null);  //设计合同
          }else if(res.data.projectDO.collectProgramType==1){   // 公开   
            if(s==0){
              for(let k=0;k<this.requireSocking.length;k++){
                if(this.requireSocking[k].status==1||this.requireSocking[k].status==4){
                  this.currentId = this.requireSocking[k].id;
                  this.currentComponent = this.requireSocking[k].componentName;
                  break;
                }
              }
            }
          }

        }
      })
    }
  },
  created() {
    this.required(0);  // 初始化
    this.qryFinallyDesigner(0,null);  // 查询对接成功的设计师
  }
};
</script>
<style lang="less">
.resource-docking-warp {
   .btn-primary.disabled, .btn-primary:disabled {
      color: #fff;
      background: #D9D9D9 !important;
      cursor: not-allowed !important;
  }
  .disabled, :disabled {
    cursor: not-allowed !important;
  }
}
</style>
