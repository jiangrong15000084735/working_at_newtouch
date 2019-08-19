<template>
  <mdb-container class="px-0 agency-fee-warp text-center">
    <div class="text-1">
      {{collectProgramType==1?"支付托管费用":"支付代理费用"}}
    </div>
    <div class="text-2">
      合筑账号：65241387646565
    </div>
    <div class="text-2">
      {{collectProgramType==1?"请线下支付托管费用并上传支付凭证。":"请线下支付代理费用并上传支付凭证。"}}
    </div>
    <mdb-row style="margin-bottom:4.9375rem;">
      <mdb-col>
        <upLoadVoucher 
          :list="fileList" 
          :isShow="state" 
          :btnName="'上传凭证'" 
          :saveProjectMoney="saveProjectMoney"
          :accept="'.jpg, .jpeg, .png, .JPG, .JPEG, .bmp'"
          >上传凭证</upLoadVoucher>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col>
        <mdb-btn class="btn212_60" :disabled="status<4" color="primary" @click="next" style="margin-right:3.125rem;">下一步</mdb-btn>
        <mdb-btn class="btnBack212_60" color="primary" @click="pre">返回</mdb-btn>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>
<script>
import upLoadVoucher from "@/components/upLoad"
export default {
  name: "agencyFee",
  components:{upLoadVoucher},
  data() {
    return {
      actives: 1,
      collectProgramType:null,
      fileList:[],
      state:true,
      status:null,
    };
  },
  created(){
    this.seekTaskBaseInfo();
    this.listProjectMoney();
    this.getProjectStatus();
  },
  methods:{
    getProjectStatus() {
      this.api.getProjectStatus({ id: this.$route.query.id }).then(res => {
        if (res.code == 0) {
          this.status = res.data.status
        }
      });
    },
     seekTaskBaseInfo(){
      this.api.seekTaskBaseInfo(this.$route.query.id).then(res => {
        this.collectProgramType = res.data.projectDO.collectProgramType;
      })
    },
    next(){
      this.$emit("viewSwitch",4)
    },
    pre(){
       this.$emit("viewSwitch",2)
    },
    saveProjectMoney(res, file) {
      this.api
        .saveProjectMoney({
          projectId: this.$route.query.id,
          type: this.actives,
          title: file.name,
          content: res.msg
        })
        .then(res => {
          this.$message(res.msg);
          if (res.code == 0) {
            this.getProjectStatus();
            this.listProjectMoney();
          }
        });
    },
    listProjectMoney() {
      this.fileList = [];
      this.api.listProjectMoney({
        projectId: this.$route.query.id,
        type: this.actives
      }).then(res => {
        if (res.code == 0&&res.fileList.length>0) {
          let file = {
            name:res.fileList[0].title,
            url:res.fileList[0].content
          }
          this.fileList.push(file)
          this.state = res.fileList[0].state
          if(res.fileList[0].state==2){
            this.state = false
          }else{
            this.state = true
          }
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.agency-fee-warp {
  padding-top: 4.875rem;
  padding-bottom: 5.5625rem;
  .text-1{
    margin-bottom: 1.3125rem;
    font-size: 1rem;
    color: #333333;
  }
  .text-2{
    margin-bottom: 2.125rem;
    font-size: 0.875rem;
    color: #707070;
    font-weight: 600;
  }
}
</style>
<style lang="less">
.agency-fee-warp {
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
