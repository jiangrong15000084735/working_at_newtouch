<template>
    <div class="weixinScale">
        <div class="content">
            <img src="@/assets/images/weixinQR.png"/>
        </div>
     
    </div>
</template>
<script>
export default {
    name:"weixinScale",
}
</script>
<style lang="less" scoped>
 .weixinScale{
      width:100%;
      height:100vh;
      background:black;
      text-align:center;
      img{
          position:absolute;
          top:0;
          left:0;
          bottom:0;
          right:0;
          margin:auto;
      }
    
 }
</style>


