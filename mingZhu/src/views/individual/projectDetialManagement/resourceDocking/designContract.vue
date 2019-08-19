<template>
  <mdb-container class="designer-contract-warp px-0 mb-4">
    <SignContract :contratName="contratName" ref="contract"></SignContract>
  </mdb-container>
</template>
<script>
import SignContract from "@/views/individual/projectDetialManagement/components/signContract";
export default {
  name: "designerContract",
  components: { SignContract },
  data() {
    return {
      contratName: 1,
      // signState:null,
    };
  },
  methods: {
    
  },
  created() {
  }
};
</script>
<style lang="less" scoped>
.designer-contract-warp {
  
}
</style>