<template>
  <mdb-container class="commission-info-warp px-0">
    <mdb-row class="mb-3">
      <mdb-col md="5">
        <div class="outline-input">
            <mdb-input
              type="text"
              size="lg"
              label="拟委托建筑师数量"
              disabled
              v-model="requireData.designerNum"
              @change="checkDesignerNum"
              outline
            />
          </div>
        <div class="tip-error" v-if="designerNumError">{{designerNumError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="12" class="mb-3">是否需要专家评审意见</mdb-col>
      <mdb-col md="5">
          <div class="form-check pl-0">
            <input
              type="radio"
              class="form-check-input"
              name="option7"
              id="option7-1"
              value="Y"
              @input="handleFlag"
              :disabled="disabled"
              v-model="requireData.expertAdviceFlag"
            >
            <label class="form-check-label" for="option7-1">是</label>
          </div>
      </mdb-col>
      <mdb-col md="5">
        <div class="form-check pl-0">
            <input
              type="radio"
              class="form-check-input"
              name="option7"
              id="option7-2"
              value="N"
              @input="handleFlag"
              :disabled="disabled"
              v-model="requireData.expertAdviceFlag"
            >
            <label class="form-check-label" for="option7-2">否</label>
          </div>
      </mdb-col>
      <mdb-col md="12" class="tip-error mt-2" v-if="expertAdviceFlagError">{{expertAdviceFlagError}}</mdb-col>
    </mdb-row>
  </mdb-container>
</template>
<script>
import { truncate } from 'fs';
export default {
  name: "commissionInfo",
  data() {
    return {
      disabled: false,
      designerNumError: null,
      expertAdviceFlagError:null,
      requireData: {
        designerNum: "",
        expertAdviceFlag: "",
        collectProgramType:"",
      }
    };
  },
  methods: {
    checkDesignerNum(value) {
      if(event&&event.type=="message"){
        let numberReg = /^[1-9][0-9]*$/;
        if(value){
          this.requireData.designerNum = value.replace( /[^0-9]/g,'')
        }
        if (!this.requireData.designerNum) {
          this.designerNumError = "请输入入围方案数量";
        } else if (!numberReg.test(this.requireData.designerNum)) {
          this.designerNumError = "您输入的格式有误";
        } else if(Number(this.requireData.designerNum)>=100){
          this.designerNumError = "您输入的长度有误";
        }else {
          this.designerNumError = "";
        }
      }
    },
    handleFlag(value) {
      this.requireData.expertAdviceFlag = value;
      this.expertAdviceFlagError = null;
    },
    checkLen(){
      let isCheckPass =true
      this.expertAdviceFlagError = null;
      // if(this.requireData.designerNum&&this.designerNumError){
      //   document.documentElement.scrollTop = 200;
      //   isCheckPass = false;
      // }else{
        // this.designerNumError = null;
      // }
      return isCheckPass
    },
    temporarilySave() {
      let isCheckPass = this.checkLen()
      if(isCheckPass){
        this.requireData.type = 1;
        this.requireData.id = this.$route.query.id;
        this.api.requireUpdate(this.requireData).then(res => {
          if (res.code == 0) {
            this.$message("已保存,若需填写下一页,请提交!");
          } else {
            this.$message(res.msg);
          }
        });
      }
      return isCheckPass
    },
    checkForm() {
      let isCheckPass = true;
      // if (!this.requireData.designerNum || this.designerNumError) {
      //   this.designerNumError = "请输入入围方案数量";
      //   document.documentElement.scrollTop = 200;
      //   isCheckPass = false;
      // }
      if (!this.requireData.expertAdviceFlag) {
        this.expertAdviceFlagError = "请选择是否需要专家评审意见";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      return isCheckPass;
    },
    submit() {
      let checkForm = this.checkForm();
      if (checkForm){
        this.requireData.type = 1;
        this.requireData.id = this.$route.query.id;
        this.api.requireSave(this.requireData).then(res => {
          if (res.code == 0) {
            this.$message("操作成功");
          } else {
            this.$message(res.msg);
          }
        });
      }
      return checkForm;
    },
    getRequire() {
      this.api.required(this.$route.query.id).then(res => {
        if (res.data.projectDO != null) {
          // this.requireData.expertAdviceFlag = res.data.projectDO.expertAdviceFlag;
          // if(res.data.projectDO.expertAdviceFlag){
          //   this.requireData.expertAdviceFlag ="Y"
          // }else{
          //   this.requireData.expertAdviceFlag ="N"            
          // }
          if(res.data.projectDO.expertAdviceFlag){
            this.requireData.expertAdviceFlag = res.data.projectDO.expertAdviceFlag
          }
          this.requireData.designerNum =  !res.data.projectDO.designerNum?"":res.data.projectDO.designerNum;
          this.requireData.collectProgramType =  res.data.projectDO.collectProgramType
          if(res.data.projectDO.nonEditable==0||res.data.projectDO.auditState==5){
            this.disabled = true
          }
        }
      });
    },
    // submit(){
    //   return this.$refs.method.submit()
    // }
  },
  mounted(){
    this.getRequire();
  }
};
</script>
<style lang="less" scoped>
.commission-info-warp {
  .tip-error {
    color: red;
  }
}
</style>
