
<template>
<mdb-container class="pay-voucher-warp px-0">
    <mdb-row class="mb-2" style="color:#333;">
      <mdb-col>
        合筑账号：65241387646565
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-3" style="color:#666;">
      <mdb-col md="12">
        合筑工作人员将会立即与您沟通，请尽快在线下完成支付!
      </mdb-col>
      <mdb-col md="12">
        完成后请点击下方按钮上传支付凭证
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col>
        <upLoadVoucher 
          :list="fileList" 
          :isShow="addValueServiceStatus" 
          :btnName="'上传凭证'" 
          :saveProjectMoney="updateVoucher"
          :accept="'.jpg, .jpeg, .png, .JPG, .JPEG, .bmp'"
          >上传凭证</upLoadVoucher>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>
<script>
import upLoadVoucher from "@/components/upLoad"
export default {
  name: "payVoucher",
  components: { upLoadVoucher },
  data() {
    return {
      actives: 2,
      fileList: [],
      addValueServiceId: "",
      addValueServiceStatus: true,
    };
  },
  created() {
    this.origin = location.origin;
  },
  methods: {
    updateVoucher(res, file) {
      this.api.updateVoucher({
        voucher: res.msg,
        voucherName: file.name,
        projectId: this.$route.query.id
      }).then(res => {
        if (res.code == 0) {
          this.queryChoiceList();
          this.$emit("getStatus");
        }
        this.$message(res.msg);
      });
    },
    getFileUrl() {
      this.fileList =[]
      this.api.getFileUrl({
        id: this.addValueServiceId
      }).then(res => {
        let file = {
          name:res.data.name,
          url:res.data.voucher
        }
        this.fileList.push(file)
      });
    },
    queryChoiceList() {
      this.api.queryChoiceList({ projectId: this.$route.query.id }).then(res => {
        if (res.code == 0&&res.data&&res.data.length>0) {
          this.addValueServiceId = res.data[0].id;
          if(res.data[0].status<=1){
            this.addValueServiceStatus = true;
          }else{
            this.addValueServiceStatus = false;
          }
          this.getFileUrl();
        }
      });
    }
  },
  mounted() {
    this.queryChoiceList();
  }
};
</script>
<style lang="less" scoped>
.pay-voucher-warp {
  
}
</style>
