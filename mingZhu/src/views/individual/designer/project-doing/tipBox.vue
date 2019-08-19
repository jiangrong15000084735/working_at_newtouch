<template>
  <mdb-modal v-if="tipObj.dialogshow" @close="cancal" info>
    <mdb-modal-header class="text-center">
      <p class="heading" style="width:100%;">提示</p>
    </mdb-modal-header>
    <mdb-modal-body v-if="tipObj.isAgree==1"  class="text-center">
      <mdb-icon icon="bell" size="4x" class="animated rotateIn mb-4"/>
      <p>您确认同意此合同</p>
      </mdb-modal-body>
    <mdb-modal-body v-if="tipObj.isAgree==2">
      <!-- <div class="form-group">
        <label for="example1">不同意原因 <span style="color:red;margin-left:0.5rem;">*</span></label>
        <input 
        type="text" 
        id="example1" 
        class="form-control" 
        v-model="disAgreeReason" 
        autocomplete="off"
        @input="checkDisAgreeReason"/>
      </div> -->
      <div class="outline-input">
        <mdb-input 
        type="textarea" 
        label="不同意原因" 
        :rows="3" 
        v-model="disAgreeReason"
        @change="checkDisAgreeReason"
        outline 
        />
        </div>
      <div v-if="disAgreeReasonError" style="color:red;">{{disAgreeReasonError}}</div>
    </mdb-modal-body>
    <mdb-modal-footer v-if="tipObj.isAgree==1" center>
      <mdb-btn color="primary" @click="confirm">确认</mdb-btn>
      <mdb-btn outline="primary" @click="cancal">取消</mdb-btn>
    </mdb-modal-footer>
    <mdb-modal-footer v-if="tipObj.isAgree==2" center>
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
<style lang="less" scoped>
</style>

