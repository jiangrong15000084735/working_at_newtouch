<template>
  <mdb-container class="demand-docking-warp px-0">
      <mdb-row class="mb-3">
          <mdb-col>
              <p v-if="confirmRequireDocking==3"></p>
              <p v-else class="require-docking-con">项目经理将会立刻与您对接，请您保持电话畅通。</p>
          </mdb-col>
      </mdb-row>
  </mdb-container>
</template>
<script>
export default {
  name: "demandDocking",
  data() {
    return {
        confirmRequireDocking:null,
    };
  },
  created(){
    this.api.seekTaskBaseInfo(this.$route.query.id).then(res => {
      if(res.data.projectDO){
        this.confirmRequireDocking = res.data.projectDO.processState
      }
    })
  }
};
</script>
<style lang="less" scoped>
.demand-docking-warp {
    .require-docking-con{
        font-size: 1rem;
    }
}
</style>
