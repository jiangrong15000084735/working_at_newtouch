<template>
  <mdb-container class="pay-voucher1-warp px-0">
      <p style="margin-bottom:1.25rem;color:#333;">合筑账号：65241387646565</p>
      <div class="mb-5">
        <upLoadVoucher 
        :list="fileList" 
        :isShow="state" 
        :btnName="'上传凭证'" 
        :saveProjectMoney="saveProjectMoney"
        :accept="'.jpg, .jpeg, .png, .JPG, .JPEG, .bmp'"
        >上传凭证</upLoadVoucher>
      </div>
  </mdb-container>
</template>
<script>
import upLoadVoucher from "@/components/upLoad"
export default {
  name: "payVoucher1",
  components: { upLoadVoucher },
  data() {
    return {
      actives: 3,
      fileList:[],
      state:true,
    };
  },
  created(){
    this.listProjectMoney();
  },
  methods:{
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
            this.listProjectMoney();
          }
        });
    },
    listProjectMoney() {
      this.fileList =[]
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
  }
};
</script>
<style lang="less" scoped>
.pay-voucher1-warp {
}
</style>