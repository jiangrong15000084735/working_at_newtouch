<template>
  <div class="detail">
   <projectDetail :proId="$route.params.id" :isShowBack="true"></projectDetail>
  </div>
</template>
<script>
import projectDetail from  "@/components/projDetail/projDetail"
export default {
  components: {
    projectDetail
  }
}
</script>
<style lang="less" scoped>
</style>
