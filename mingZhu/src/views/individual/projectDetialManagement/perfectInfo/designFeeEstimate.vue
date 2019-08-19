<template>
  <mdb-container class="design-fee-estimate-warp px-0">
    <mdb-row class="mb-4">
      <mdb-col md="6">
         <div class="outline-input">
            <mdb-input 
              type="text" 
              size="lg" 
              label="设计费预算（元）"  
              :disabled="disabled"
               v-model="designFeeBudget"
              @change="checkDesignFeeBudget" 
              outline />
          </div>
        <div class="error-tip" v-if="designFeeBudgetError">{{designFeeBudgetError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-modal v-if="centerDialogVisible" @close="centerDialogVisible = false" info>
      <mdb-modal-header class="text-center" :close="false">
        <p class="heading" style="width:100%">提示</p>
      </mdb-modal-header>
      <mdb-modal-body>
        <p class="text-center">
          <span>您填写的设计费预算过低，可能无法完成方案征集，是否调整设计费预算</span>
        </p>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn color="primary" @click.native="goOn">调整预算</mdb-btn>
        <mdb-btn outline="primary" @click.native="dialogConfirm">继续提交</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <DialogBox :isDisabled="isDisabled" :dialogObj="dialogObj" @dialogConfirm="dialogConfirm" @dialogCancal="dialogCancal"></DialogBox>
  </mdb-container>
</template>
<script>
import DialogBox from "@/components/dialog.vue";
export default {
  name: "designFeeEstimate",
  components:{DialogBox},
  data() {
    return {
      isDisabled:false,
      dialogObj: {
        //弹框
        titleCon: "提示",
        dialogCon: "是否确认提交",
        dialogshow: false,
        dialogBtnname: "确定"
      },
      centerDialogVisible:false,
      disabled: false,
      designFeeBudget: "",
      designFeeBudgetError: null,
      formLabelAlign:null,
      estimateMoney:null,
    };
  },
  methods: {
    // 设计费校验
    checkDesignFeeBudget(val) {
      if (event && event.type == "message") {
        let reg =  /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if(val){
          this.designFeeBudget = val.replace( /[^0-9\.]/g,'')
        }
        if (!val) {
          this.designFeeBudgetError = "请输入设计费报价";
        }else if(!reg.test(val)){
          this.designFeeBudgetError = "您输入的格式有误";
        }else if(val<=0){
          this.designFeeBudgetError = "设计费报价必须大于0";
        }else if(val.split(".")[0].length>12){
          this.designFeeBudgetError = "您输入的长度有误";
        }else {
          this.designFeeBudgetError = "";
        }
      }
    },
    // 暂存
    temporarilySave() {
      let isCheckPass = true;
      if(this.designFeeBudget&&this.designFeeBudgetError){
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        if(!this.designFeeBudget){
          this.designFeeBudgetError = null;
        }
        let param = {
          projectId: this.$route.query.id,
          designFeeBudget: this.designFeeBudget
        };
        this.api.saveBudget(param).then(res => {
          if (res.code == 0) {
            this.$message("已保存,请等待审核之后，进行下一步。");
          } else {
            this.$message(res.msg);
          }
        });
        }
      return isCheckPass;
    },
    // 提交
    submit() {
      let isCheckPass = true;
      if (!this.designFeeBudget || this.designFeeBudgetError) {
        this.designFeeBudgetError = "请输入设计费报价";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
        return "fee"
      } else {
        // let param = {
        //   projectId: this.$route.query.id,
        //   designFeeBudget: this.designFeeBudget
        // };

        // this.api.getProjectStatus({ id: this.$route.query.id }).then(res => {
          // if(res.data.status<1){
          //   this.api.submitBudget(param).then(res => {
          //     this.$message(res.msg);
          //   });
            if(
              this.formLabelAlign&&
              this.formLabelAlign.projectBuildTypes&&
              this.formLabelAlign.buildSize&&
              this.formLabelAlign.buildDetail
            ){
              this.getMoney();
            }else{
              this.dialogObj.dialogshow = !this.dialogObj.dialogshow;
            }
          // }else{
            //  this.$emit("feeEstimate");
          // }
        // })
      }
    },
    //弹框提示
    dialogConfirm() {
      // this.api.getProjectStatus({ id: this.$route.query.id }).then(res => {
      //   if(res.data.status<1){
          let param = {
            projectId: this.$route.query.id,
            designFeeBudget: this.designFeeBudget
          };
          this.isDisabled = true;
          this.api.submitBudget(param).then(res => {
            this.isDisabled = false;
            this.centerDialogVisible = false;
            this.dialogObj.dialogshow = false;
            this.$emit("feeEstimate");
            // this.$message(res.msg);
          });
      //   }else{
      //     this.$emit("feeEstimate");
      //   }
      // })
    },
    goOn() {
      this.centerDialogVisible = false;
    },
    //最后取消确认
    dialogCancal() {
      this.dialogObj.dialogshow = !this.dialogObj.dialogshow;
    },
    // 设计费用预估
    getMoney() {
      let idList = [];
      let parentidList = [];
      let buildDetail = this.formLabelAlign.buildDetail.replace(/[&]/g, ",").split(",");
      let buildSize_arr = this.formLabelAlign.buildSize.replace(/[&]/g, ",");
      let detailList = this.formLabelAlign.projectBuildTypes;
      for (let key in detailList) {
        parentidList.push(key.split("|")[1]);
        for(let i = 0 ;i<detailList[key].length; i++){
          for(let j=0;j<buildDetail.length;j++){
            if(buildDetail[j]==detailList[key][i].name){
              idList.push(detailList[key][i].id)
              break;
            }
          }
        }
      }
      let params = {
        modelId: parentidList.toString(),
        buildId: idList.toString(),
        buildSize: buildSize_arr.toString(),
        incircleRecomNum: this.formLabelAlign.collectProgramType !== 3 ? this.formLabelAlign.incircleRecomNum : this.formLabelAlign.designerNum
      };
      let flag = this.formLabelAlign.collectProgramType !== 3 ? "0" : "1";
      this.api.estimateMoney(flag, params).then(res => {
        this.estimateMoney = res.data;
        if ( this.designFeeBudget / this.estimateMoney < 0.9) {
          this.centerDialogVisible = true;
        } else {
          this.dialogObj.dialogshow = !this.dialogObj.dialogshow;
        }
      });
    },
  },
  created() {
    // 回显设计费
    this.api.seekTaskBaseInfo(this.$route.query.id).then(res => {
      if (res.code == 0) {
        if (res.data.projectDO) {
          this.formLabelAlign = res.data.projectDO;
          // if(res.data.projectDO.assessmentCost){
          //   this.designFeeBudget = res.data.projectDO.assessmentCost
          // }else if(res.data.projectDO.designFeeBudget){
          this.designFeeBudget = res.data.projectDO.designFeeBudget
          // }else{
          //   this.designFeeBudget = "";
          // }

          // 1当前状态判断 hasTaskFile == 3有任务书 
          // 2budgetAuditState状态 1提交没审 2 一审通过 3一审驳回 4提交二审 5审核通过 6二审驳回（3）
          if (res.data.projectDO.hasTaskFile == 3||
            (res.data.projectDO.budgetAuditState && res.data.projectDO.budgetAuditState!=3)
            ) {
            this.disabled = true;
          }
        }
      }
    });
  }
};
</script>
<style lang="less" scoped>
.design-fee-estimate-warp {
  .error-tip {
    margin-top: 1rem;
    color: red;
  }
}
</style>
<style lang="less">
.design-fee-estimate-warp {
  .check-error-tip {
    .form-control {
      border: 0.0625rem solid red !important;
    }
  }
  .btn-outline-primary {
    border: 2px solid #4285f4!important;
    background-color: transparent!important;
    color: #4285f4!important;
  }
}
</style>

