<template>
  <mdb-container class="require-docking px-0">
    <mdb-stepper simpleV>
      <li
        class="completed"
        :class="[item.status==2?'warning':'',item.status==3?'endstep':'']"
        slot="simple"
        v-for="(item , index) in requireSocking"
        :key="item.id"
        style="width:100%;box-sizing:border-box;"
      >
        <a @click="viewshow(item.id,item.componentName,index)">
          <span class="circle" v-if="item.status==3" style="background-color: #07D8AE !important;">
            <mdb-icon icon="check"/>
          </span>
          <span class="circle" v-if="item.status==2">
            <mdb-icon icon="exclamation-triangle"/>
          </span>
          <span class="circle" v-if="item.status==1">{{item.id}}</span>
          <span class="label">{{item.name}}</span>
        </a>
        <div
          class="step-content project-detial-body"
          v-if="currentId==item.id"
        >
          <component ref="viewCom" v-bind:is="currentComponent" v-if="currentId==item.id" @getStatus="getStatus"></component>
          <mdb-btn class="btn110_40" v-if="(item.id==2||item.id==3)&&item.status!=3" color="primary" @click="stepSwitch(index,1)">下一步</mdb-btn>
          <mdb-btn :class="item.id==3?'btnBack110_40':'btn110_40'" v-if="(item.id==4||item.id==3)&&item.status!=3" color="primary" @click="stepSwitch(index,-1)">返回</mdb-btn>
        </div>
      </li>
    </mdb-stepper>
    <mdb-row class="text-center" style="margin:2.0625rem 0 4.1875rem;">
      <mdb-col>
        <mdb-btn class="btn212_60" :disabled="status<2" color="primary" @click="next()" style="margin-right:3.125rem;">下一步</mdb-btn>
        <mdb-btn class="btnBack212_60" color="primary" @click="pre()">返回</mdb-btn>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>
<script>
import DemandDocking from "@/views/individual/projectDetialManagement/requireDocking/demandDocking"; //需求对接
import ViewAssignmentBook from "@/views/individual/projectDetialManagement/requireDocking/viewAssignmentBook";
import ValueAddedServices from "@/views/individual/projectDetialManagement/requireDocking/valueAddedServices"; //增值服务
import PayVoucher from "@/views/individual/projectDetialManagement/requireDocking/payVoucher"; //支付凭证
export default {
  components: { DemandDocking, ViewAssignmentBook, ValueAddedServices, PayVoucher },
  data() {
    return {
      requiredTaskFileBoss:[],
      fileList: [],
      Unpaid: [],
      currentId: 1,
      currentComponent: "DemandDocking",
      requireSocking: [
        {
          id: 1,
          name: "需求对接",
          status: 1,
          componentName: "DemandDocking"
        },{
          id:2,
          name:"查看任务书",
          status: 1,
          componentName: "ViewAssignmentBook"
        }
      ],
      processState:"",
      status:"",
    };
  },
  methods: {
    // 下一步
    next(){
      this.$emit("viewSwitch", 2);
      this.getProjectStatus(false);
    },
    // 上一步
    pre(){
      this.$emit("viewSwitch", 0);
    },
    // 确认任务书
    confirm() {
      this.$refs.viewCom[0].submit();
      if (this.requireSocking.length > 1) {
        this.requireSocking[1].status = 3;
      }
    },
    // 全局状态查询
    getStatus(){
      this.getProjectStatus(true);
    },
    getProjectStatus(type) {
      this.api.getProjectStatus({ id: this.$route.query.id }).then(res => {
        if (res.code == 0) {
          this.status = res.data.status
          // 上传增值服务 支付凭证
          if(type){
            this.requireSocking[2].status = "3"
            this.requireSocking[3].status = "3"
          }else{
            // 初始化
            // status >= 2 对接完成
            if (res.data.status >= 2) {
              this.currentId = null;
              this.currentComponent = null;
              for(let i=0;i< this.requireSocking.length;i++){
                this.requireSocking[i].status = 3
              }
            }else{
              // 1 <status < 2 对接中
              for(let i=0;i<this.requireSocking.length;i++){
                if(this.requireSocking[i].status != 3){
                  this.currentId = this.requireSocking[i].id;
                  this.currentComponent = this.requireSocking[i].componentName;
                  break;
                }
              }
            }
          }
        }
      });
    },
    // id = 1需求对接显示 id= 2 确认任务书 id = 3 增值服务 id = 4 上传凭证
    viewshow(id, component,index) {
      if(index==0&&this.requireSocking[index].status==3){
        return
      }else if(index==1&&this.requireSocking[index].status!=3){
         this.api.getRequiredTaskFileBoss({projectId:this.$route.query.id}).then(res=>{
          if(res.code==0){
            if(!res.data||res.data.length<=0){
              this.$message("请等待上传客户任务书")
            }else{
              this.currentId = this.requireSocking[index].id;
              this.currentComponent = this.requireSocking[index].componentName;
            }
          }
        })
      } else if (this.requireSocking[0].status!=3&&(index==2||index==3)){
        this.$message("请与项目经理进行沟通，再进行操作。")
      } else {
        if(this.currentId == id&&this.currentComponent == component){
          this.currentId = null;
          this.currentComponent = null;
        }else{
          this.currentId = id;
          this.currentComponent = component;
        }
      }
    },
    // 下一步按钮
    stepSwitch(index, step) {
      if(this.currentComponent == "ValueAddedServices"&&step>0){
        let ischeck = this.$refs.viewCom[0].submit();
        if(!ischeck){
          return
        }
      }
      if(this.currentComponent == "ViewAssignmentBook"){
        this.api.requiredTaskFileBossUpdStatus({projectId:this.$route.query.id}).then(res=>{
            this.$message(res.msg);
            if(res.code==0){
              this.getRequiredTaskFileBoss(true,index);
              this.getProjectStatus(false);
              return
            }
        });
      }
      // if (index == 0 && step < 0) {
        // this.$emit("viewSwitch", 0);
      // } else if (index == this.requireSocking.length - 1 && step > 0) {
        // this.$emit("viewSwitch", 2);
        // this.getProjectStatus(false);
      // } else 
      if(this.requireSocking.length>2){
        if((index==1&&this.requireSocking[0].status==3)||index!=1){
          this.currentId = this.requireSocking[index + step].id;
          this.currentComponent = this.requireSocking[index + step].componentName;
        }
      }
    },
    // 查询 初始化
    seekTaskBaseInfo() {
      this.api.seekTaskBaseInfo(this.$route.query.id).then(res => {
        if ( res.data.projectDO && 
        (parseInt( res.data.projectDO.processState ) >= 3 || res.data.projectDO.processState == 1 )){
          this.processState = res.data.projectDO.processState;
          this.requireSocking[0].status = 3;
        }
        this.getRequiredTaskFileBoss(false,null);
      });
    },
    // 初始化增值服务
    queryChoiceList() {
      this.api.queryChoiceList({projectId:this.$route.query.id}).then(res => {
        if (res.code == 0) {
          this.Unpaid = res.data
          if(this.Unpaid.length>0){
              let view1 = {
                id: 3,
                name: "增值服务",
                status: 1,
                componentName: "ValueAddedServices"
              };
              
              let view2 = {
                id: 4,
                name: "完成您的支付",
                status: 1,
                componentName: "PayVoucher"
              };
              // if(res.data[0].status==3){
              //   view1.status=3
              //   view2.status=3
              // }
              this.requireSocking.push(view1);
              this.requireSocking.push(view2);
          }
        }
      });
    },
    // 任务书查询
    getRequiredTaskFileBoss(type,index){
      this.api.getRequiredTaskFileBoss({projectId:this.$route.query.id}).then(res=>{
        if(res.code==0){
          this.requiredTaskFileBoss = res.data
          if(this.requiredTaskFileBoss&&this.requiredTaskFileBoss.length>0&&this.requiredTaskFileBoss[0].status==1){
            this.requireSocking[1].status=3;
          }
          if(type){
            if(this.requireSocking[0].status==3&&this.requireSocking.length>2){
              this.currentId = this.requireSocking[index+1].id;
              this.currentComponent = this.requireSocking[index+1].componentName;
            }else{
              this.currentId = this.requireSocking[index].id;
              this.currentComponent = this.requireSocking[index].componentName;
              this.$message("请与项目经理进行沟通，再进行操作。")
            }
          } else {
            //初始化
            this.getProjectStatus(false); // 状态
            // for(let i=0;i<this.requireSocking.length;i++){
            //   if(this.requireSocking[i].status != 3){
            //     this.currentId = this.requireSocking[i].id;
            //     this.currentComponent = this.requireSocking[i].componentName;
            //     break;
            //   }
            // }
          }
        }
      })
    },
    init() {
      this.seekTaskBaseInfo();  // 初始化
      this.queryChoiceList();   // 3增值服务4凭证
    }
  },
  mounted() {
    this.init(); 
  }
};
</script>
<style lang="less" scoped>
.require-docking{
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
