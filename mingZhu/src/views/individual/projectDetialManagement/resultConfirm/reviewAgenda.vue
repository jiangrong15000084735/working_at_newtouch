<template>
 <mdb-container class="px-0">
  <div class="review-agenda-warp" ref="dac">
    <mdb-card testimonial v-if="reviewAgenda&&pdfUrl" class="mb-4">
      <mdb-card-body class="px-0 py-0">
        <PdfShow :pdfUrl="pdfUrl" :dac="dac"></PdfShow>
        <div class="col-bottom text-right">
            <mdb-btn color="primary" class="download btnBack110_40">
              <a
                :href="`${origin}/Mingzhu/common/sysFile/download/${reviewAgenda.content}/${reviewAgenda.fileName}`"
                :download="reviewAgenda.fileName"
              >
                下载
                <mdb-icon icon="download"/>
              </a>
            </mdb-btn>
          </div>
        </mdb-card-body>
      </mdb-card>
      </mdb-card-body>
    </mdb-card>
  </div>
</mdb-container>
</template>
<script>
import PdfShow from "@/components/pdf/pdf.vue";
import TipBox from "@/views/individual/projectDetialManagement/components/tipbox.vue";
export default {
  name: "reviewAgenda",
  components: { PdfShow, TipBox },
  data() {
    return {
      confirmed: null,
      reviewAgenda: {
        content:"",
        fileName:"",
        confirmed:null
      },
      dac: null,
      pdfUrl: "",
      origin: location.origin,
    };
  },
  mounted() {
    this.dac = this.$refs.dac;
    this.qryAgedaStatus();
  },
  methods: {
    qryAgedaStatus() {
      this.api.qryAgedaStatus({
          projectId: this.$route.query.id
        })
        .then(res => {
          this.reviewAgenda = res.data;
          this.pdfUrl =  Base64.encode(
            this.origin +
            "/Mingzhu/common/sysFile/download/" + 
            this.reviewAgenda.content
          );
          console.log(this.pdfUrl)
          this.confirmed = res.data.confirmed;
        });
    },
    // submit() {
    //   this.api.updateAgedaStatus({
    //       projectId: this.$route.query.id
    //   }).then(res => {
    //     if (res.code == 0) {
    //       return true;
    //     } else {
    //       this.$message(res.msg);
    //       return false;
    //     }
    //   });
    // }
  },
};
</script>
<style lang="less" scoped>
.review-agenda-warp {
  .col-bottom {
    height: 4.125rem;
    padding: 0.8125rem 2.125rem 0.8125rem 0;
    background: #f2f2f2;
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
}
</style>
