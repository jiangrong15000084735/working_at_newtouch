<template>
    <div class="loginRegisterBg">
      <img src="@/assets/images/logRegBg.png" alt="����ͼ">
    </div> 
</template>
<script>
  export default {
      name:'loginRegisterBg',
  }
</script>
<style lang="less" scoped>
 .loginRegisterBg{
   z-index:-1;
   width:100%;
   height:100vh;
   position: relative;
   img{
     width:100%;
     height:100vh;
     top:0;
     left:0;
     
   }
 }
  
</style>