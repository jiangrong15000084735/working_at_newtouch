<template>
  <mdb-modal v-if="tipObj.dialogshow" @close="cancal" info class="tip-box">
    <mdb-modal-header  center :close="false">
      <p class="heading">提示</p>
    </mdb-modal-header>
    <mdb-modal-body v-if="tipObj.isAgree==1">您确认同意此合同</mdb-modal-body>
    <mdb-modal-body v-if="tipObj.isAgree==2">
      <div class="outline-input">
        <mdb-input 
        type="textarea" 
        label="请输入不同意原因" 
        :rows="3" 
         v-model="disAgreeReason" 
        @change="checkDisAgreeReason"
        outline 
        />
      </div>
      <div v-if="disAgreeReasonError" style="color:red;">{{disAgreeReasonError}}</div>
    </mdb-modal-body>
    <mdb-modal-footer center v-if="tipObj.isAgree==1">
      <mdb-btn color="primary" @click="confirm">确认</mdb-btn>
      <mdb-btn outline="primary" @click="cancal">取消</mdb-btn>
    </mdb-modal-footer>
    <mdb-modal-footer center v-if="tipObj.isAgree==2">
      <mdb-btn color="primary" @click="confirm">提交</mdb-btn>
      <mdb-btn outline="primary" @click="cancal">取消</mdb-btn>
    </mdb-modal-footer>
  </mdb-modal>
</template>
<script>
export default {
  name: "tipbox",
  props: ["tipObj"],
  data() {
    return {
      disAgreeReason:"",
      disAgreeReasonError:null,
    };
  },
  methods: {
    cancal() {
      this.$emit("cancel",null);
    },
    confirm() {
      if(this.tipObj.isAgree==2&&!this.disAgreeReason){
        this.disAgreeReasonError = "请输入不同意原因"
        return 
      }
      this.$emit("confirm",{isAgree:this.tipObj.isAgree,disAgreeReason:this.disAgreeReason});
    },
    checkDisAgreeReason(){
      if(!this.disAgreeReason){
        this.disAgreeReasonError = "请输入不同意原因"
      }else{
        this.disAgreeReasonError = ""
      }
    }
  }
};
</script>
<style lang="less">
.tip-box .btn-outline-primary {
    border: 2px solid #4285f4 !important;
    background-color: transparent !important;
    color: #4285f4 !important;
    box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);
}
</style>

