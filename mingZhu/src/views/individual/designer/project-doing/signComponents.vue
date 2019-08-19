<template>
  <div class="deplog-agency-contract mb-3" ref="dac">
    <div v-if="pdfUrl">
      <mdb-card testimonial>
        <mdb-card-body class="px-0 py-0">
          <PdfShow :pdfUrl="pdfUrl" :dac="dac"></PdfShow>
          <mdb-row class="mx-0">
            <mdb-col col="12" class="col-bottom" style="text-align:right;">
              <!-- <mdb-col col="6" style="text-align:right;" v-if="signState!=1"> -->
              <mdb-btn v-if="signState!=1" class="btn110_40" color="primary" @click="handleRadio('1')">同意</mdb-btn>
              <mdb-btn v-if="signState!=1" class="btnBack110_40" color="primary" @click="handleRadio('2')">取消</mdb-btn>
              <mdb-btn color="primary" class="download btnBack110_40">
                <a
                  :href="origin+'/Mingzhu/common/sysFile/download/'+contractList.content+'/'+ contractList.fileName"
                  :download="contractList.name"
                >下载
                  <mdb-icon icon="download" />
                </a>
              </mdb-btn>
            </mdb-col>
          </mdb-row>
        </mdb-card-body>
      </mdb-card>
    </div>
    <div v-else class="my-3">暂无合同</div>
    <TipBox :tipObj="tipObj" @cancel="cancel" @confirm="confirm"></TipBox>
  </div>
</template>
<script>
import PdfShow from "@/components/pdf/pdf.vue";
import TipBox from "./tipBox.vue";
export default {
  props:["contratName","isShow"],
  components: { PdfShow , TipBox },
  data() {
    return {
      tipObj: {
        //弹框
        dialogCon: "是否确认签署合同",
        dialogshow: false,
        isAgree:null,
      },
      dac: null,
      pdfUrl: "",
      content: "",
      radio7: "",
      signDetail: "",
      contractList: {},
      signState: null,
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
      this.queryContractSign()
    },
    handleRadio(val) {
      this.tipObj.isAgree = val
     this.tipObj.dialogshow = true;
    },
    queryContractSign() {
      if (!this.radio7) {
        this.$message("请选择是否签署代理合同。");
        return;
      } else if (this.radio7 == 2 && this.reason == "") {
        this.$message("请输入拒绝原因！");
      } else if (this.radio7 == 2 || this.radio7 == 1) {
        this.api.queryContractSign({
            contractId: this.projectid,
            status: this.radio7,
            content: this.reason
          })
          .then(res => {
            if(res.code != 0){
                this.$message.error(res.msg);
                return
            }
            if(this.radio7==2){
                this.pdfUrl = ""
            }else{
                this.signState=1
                 this.$message(res.msg);
                this.$router.push({
                  path: "proj-progress",
                  query: {
                    id:this.$route.query.id,
                    actives:this.$route.query.actives,
                    collectProgramType:this.$route.query.collectProgramType
                  }
                })
            }
            // this.$emit("successBack")
          });
      }
    },
    go(id) {
      this.projectid = id;
    },
    // 预览
    previewContract() {
      this.api.queryContractList({
          projectid: this.$route.query.id,
          name:this.contratName
        }).then(res => {
          if (res.code == 0) {
            for (let i = 0; i < res.data.length; i++) {
              // if (res.data[i].name == this.contratName) {
                this.signState = res.data[i].status;
                this.projectid = res.data[i].id;
                this.api.queryContractDetail({
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
              // }
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
.deplog-agency-contract {
 .download a{
    padding: 0 !important;
 }
 .col-bottom{
   height: 66px;
   padding: 13px 34px 13px 0;
   background: #f2f2f2;
 }
}
</style>