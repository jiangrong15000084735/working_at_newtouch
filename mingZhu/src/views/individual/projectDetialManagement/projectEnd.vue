<template>
  <mdb-container class="px-0 project-end-warp">
    <div class="downlod-warp">
      <mdb-row style="width:100%;">
        <mdb-col md="4" v-for="(item,index) in additionalFileList" :key="item.id">
          <EndFile :endFile="item"></EndFile>
        </mdb-col>
      </mdb-row>
    </div>
    <p class="text-center project-end-text">
      感谢您对本平台的使用，期待与您的下次合作。
      <mdb-icon far icon="grin-alt"/>
    </p>
  </mdb-container>
</template>
<script>
import EndFile from "@/views/individual/projectDetialManagement/components/endFile";
export default {
  name: "projectEnd",
  components:{EndFile},
  data() {
    return {
      additionalFileList: [],
      // origin: location.origin,
      collectProgramType:null,
    };
  },
  methods: {
    qryLastResult() {
      this.api.qryLastResult({ projectId: this.$route.query.id }).then(res => {
        this.additionalFileList = res.data;
      });
    },
    stepSwitch() {
      this.$emit("viewSwitch", 7);
    },
    init(){
      this.api.seekTaskBaseInfo(this.$route.query.id).then(res => {
        if(res.data.projectDO.collectProgramType!=3 ){
          this.qryLastResult();
        }
      })
    }
  },
  mounted() {
    this.init()
  }
};
</script>
<style lang="less" scoped>
.project-end-warp {
  padding-top: 1.25rem;
  margin-bottom: 9.625rem;
  .downlod-warp {
    padding-top:3.8125rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 5.625rem 3.75rem;
  }
  .project-end-text {
    font-size: 0.875rem;
    color: #999;
  }
}
</style>
