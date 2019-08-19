<template>
  <mdb-container class="px-0">
    <div class="sign-contract" ref="dac">
      <div v-if="pdfUrl">
        <p class="text-center text-2">签署电子合同</p>
        <mdb-card testimonial>
          <mdb-card-body class="px-0 py-0">
            <PdfShow :pdfUrl="pdfUrl" :dac="dac"></PdfShow>
            <div class="col-bottom text-right">
              <mdb-btn
                color="primary"
                v-if="!signState"
                class="btn110_40"
                @click="handleRadio('1')"
              >同意</mdb-btn>
              <mdb-btn
                color="primary"
                v-if="!signState"
                class="btnBack110_40"
                @click="handleRadio('2')"
              >不同意</mdb-btn>
              <mdb-btn v-if="signState==1" color="primary" class="download btnBack110_40">已同意</mdb-btn>
              <mdb-btn v-if="signState==2" color="primary" class="download btnBack110_40" style="color:red !important;">不同意</mdb-btn>
              <mdb-btn color="primary" class="download btnBack110_40">
                <a
                  :href="`${origin}/Mingzhu/common/sysFile/download/${contractList.content}/${contractList.fileName}`"
                  :download="contractList.name"
                >
                  下载
                  <mdb-icon icon="download"/>
                </a>
              </mdb-btn>
            </div>
          </mdb-card-body>
        </mdb-card>
        <p class="text-1 text-right">
          <span style="color:#d9d9d9;margin-right:0.5625rem;" ><mdb-icon icon="exclamation-circle"/></span>若有疑问请<a class="link-text" style="text-decoration: underline;">联系项目经理</a>或<a class="link-text">客服</a>
        </p>
      </div>
    </div>
    <div v-if="!pdfUrl" class="text-center">
      <img src="@/assets/images/contract0.png" style="margin-bottom:1.25rem; margin-top:2.625rem;">
      <p style="color：#999;font-size:1.125rem;margin-bottom:3.75rem;">暂无合同哦！</p>
    </div>
    <TipBox :tipObj="tipObj" @cancel="cancel" @confirm="confirm"></TipBox>
  </mdb-container>
</template>
<script>
import PdfShow from "@/components/pdf/pdf.vue";
import TipBox from "./tipbox.vue";
export default {
  props: ["contratName", "isShow"],
  components: { PdfShow, TipBox },
  data() {
    return {
      tipObj: {
        //弹框
        dialogCon: "是否确认签署合同",
        dialogshow: false,
        isAgree: null
      },
      dac: null,
      pdfUrl: "",
      content: "",
      radio7: "",
      signDetail: "",
      contractList: {},
      signState: null,  // 1同意 2不同意
      origin: "",
      reason: "",
      lists: "",
      projectid: "",
      isAgree: null,
      fileList: []
    };
  },
  created() {
    this.origin = location.origin;
  },

  methods: {
    //最后取消确认
    cancel() {
      this.tipObj.dialogshow = false;
    },
    //弹框提示
    confirm(data) {
      this.tipObj.dialogshow = false;
      this.radio7 = data.isAgree;
      this.reason = data.disAgreeReason;
      this.queryContractSign();
    },
    // getProjectStatus() {
    //   this.api.getProjectStatus({ id: this.$route.query.id }).then(res => {
    //     if (res.code == 0) {
    //       this.$router.push({
    //         path: "/projectDetial",
    //         query: {
    //           id: this.$route.query.id,
    //           step: res.data.status,
    //           t: "s"
    //         }
    //       });
    //     }
    //   });
    // },
    handleRadio(val) {
      this.tipObj.isAgree = val;
      this.tipObj.dialogshow = true;
    },
    queryContractSign() {
      if (!this.radio7) {
        this.$message("请选择是否签署代理合同。");
        return;
      } else if (this.radio7 == 2 && this.reason == "") {
        this.$message("请输入拒绝原因！");
      } else if (this.radio7 == 2 || this.radio7 == 1) {
        this.api
          .queryContractSign({
            contractId: this.projectid,
            status: this.radio7,
            content: this.reason
          })
          .then(res => {
            this.$message(res.msg);
            if (res.code == 0) {
              this.$emit("viewSwitch", 3);
              if(this.radio7==1){
                this.$emit("getStatus")
              }
              // this.getProjectStatus();
              this.queryContractList();
            }
          });
      }
    },
    go(id) {
      this.projectid = id;
    },
    queryContractList() {
      this.api
        .queryContractList({
          projectid: this.$route.query.id,
          name: this.contratName
        })
        .then(res => {
          if (res.code == 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.signState = res.data[i].status;
              this.projectid = res.data[i].id;
            }
          }
        });
    },
    // 预览
    previewContract() {
      this.api
        .queryContractList({
          projectid: this.$route.query.id,
          name: this.contratName
        })
        .then(res => {
          if (res.code == 0) {
            for (let i = 0; i < res.data.length; i++) {
              this.signState = res.data[i].status;
              this.projectid = res.data[i].id;
              this.api
                .queryContractDetail({
                  contractId: res.data[i].id
                })
                .then(res => {
                  if (res.code === 0) {
                    this.contractList = res.data.ContractDetail;
                    this.pdfUrl = Base64.encode(
                      this.origin +
                        "/Mingzhu/common/sysFile/download/" +
                        this.contractList.content
                    );
                    return;
                  }
                });
            }
          }
        });
    }
  },
  mounted() {
    this.dac = this.$refs.dac;
    this.previewContract();
  }
};
</script>
<style lang='less'>
.sign-contract {
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
    color: #4285f4 !important;
    display: inline-block;
    padding-right: 0;
  }
  .download{
    display: inline-block;
    text-align: center;
    a {
      padding: 0 !important;
      display: flex;
      justify-content: center;
      text-align: center!important;
      i{
        line-height: 2.5rem;
      }
    }
  } 
  .col-bottom {
    height: 4.125rem;
    padding: 0.8125rem 2.125rem 0.8125rem 0;
    background: #f2f2f2;
  }
}
</style>