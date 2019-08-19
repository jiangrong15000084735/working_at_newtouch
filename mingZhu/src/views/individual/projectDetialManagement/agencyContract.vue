<template>
  <mdb-container class="px-0" style="padding-bottom: 5.25rem;">
    <div class="deplog-agency-contract" ref="dac">
      <SignContract ref="contract" :contratName="contratName" @getStatus="getStatus"></SignContract>
    </div>
    <mdb-row class="text-center">
      <mdb-col>
        <mdb-btn class="btn212_60" :disabled="status<3" color="primary" @click="next()" style="margin-right:3.125rem;">下一步</mdb-btn>
        <mdb-btn class="btnBack212_60" color="primary" @click="pre()">返回</mdb-btn>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>
<script>
import SignContract from "@/views/individual/projectDetialManagement/components/signContract";
export default {
  components: { SignContract },
  data() {
    return {
      contratName: 2,
      status:null,
    };
  },
  mounted(){
    this.getProjectStatus();
  },
  methods: {
    getStatus(){
      this.getProjectStatus()
    },
    next() {
      this.$emit("viewSwitch", 3);
    },
    pre() {
      this.$emit("viewSwitch", 1);
    },
    getProjectStatus() {
      this.api.getProjectStatus({ id: this.$route.query.id }).then(res => {
        if (res.code == 0) {
          this.status = res.data.status
        }
      });
    },
  }
};
</script>
<style lang='less' scoped>
.deplog-agency-contract {
  padding-top: 3rem;
  .text-2{
    margin-bottom: 1.875rem;
    color: #505050;
  }
  .text-1{
    margin-top: 2.125rem;
    margin-bottom:3rem;
    padding: 0 1.75rem;
    color: #707070;
  }
  .link-text{
    color: #4285f4;
  }

}
</style>
<style lang="less">
.deplog-agency-contract {
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
