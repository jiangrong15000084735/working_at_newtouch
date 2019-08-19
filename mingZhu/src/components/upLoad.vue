<template>
  <div class="upLoad">
    <div v-show="isShow" style="display:inline-block;vertical-align:baseline;margin-right:1.25rem;">
      <el-upload 
      class="upload-demo"
      :action="api.upload()"
      :on-success="saveProjectMoney"
      :before-upload="beforeAvatarUpload" 
      :accept="accept"
      :show-file-list="false">
        <mdb-btn color="primary" class="my-0 mx-0 btn110_30">{{name}}</mdb-btn>
      </el-upload>
    </div>
    <div style="display:inline-block;vertical-align:middle;" v-if="list&&list.length>0">
      <div v-for="(item,index) in list" :key="index" style="display:inline-block">
        <div class="download">
          <a
            class="py-0 px-0"
            style="color:#333;font-size:1rem;"
            :href="origin+'/Mingzhu/common/sysFile/download/'+item.url+'/'+item.name"
            :download="item.name"
          >{{item.name}}</a>
        </div>
      </div>
    </div>
      <div style="display:inline-block;vertical-align:middle;" v-if="isShow&&(!list||list.length==0)">
      <div style="font-size:1rem;color:#999;">
        请{{name}}
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props:["list","isShow","accept","btnName","saveProjectMoney"],
  data() {
    return {
      origin:location.origin,
      name:"上传文件"
    }
  },
  mounted(){
    this.name = this.btnName
  },
  methods:{
    // 上传前验证
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf('.')+1).toLowerCase();
      let accept = this.accept?this.accept.toLowerCase():"";
      let boole = false
      if(accept){
        boole = accept.includes(testmsg)
        if(!boole) {
          this.$message.error(`上传文件只能是${accept}格式!`);
        }
      }else{
        boole = true
      }
      const isLt3M = file.size / 1024 / 1024 < this.$isLt10M;
      if (!isLt3M) {
        this.$message.error(`上传文件大小不能超过 ${this.$isLt10M}MB!`);
      }
      return boole&&isLt3M;
    }
  }
}
</script>

<style lang="less" scoped>
// .upLoad{
//   .nextBtnSm{
//     width: 110px;
//     height: 30px;
//     line-height: 30px;
//     padding: 0;
//   }
// }
</style>