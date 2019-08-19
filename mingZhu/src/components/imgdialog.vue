<template>
  <div class>
    <mdb-modal v-show="isshow" class="modalwrapper" info  @close="hideDialog">
      <mdb-modal-header center>
        <p class="heading text-center" style="width:100%;">{{imgType}}</p>
        <!-- <a class="close1" @click="hideDialog">×</a> -->
      </mdb-modal-header>
      <mdb-modal-body>
        <div v-if="dialogItem">
          <!-- <div class="hotLabel">{{imgType}}</div>
          <mdb-textarea :rows="3" basic placeholder="请输入内容" 
          :disabled="disabled"
          v-model="dataval"></mdb-textarea> -->
          <div class="outline-input">
            <mdb-input 
            type="textarea" 
            :label="`${imgType}`" 
            :rows="3" 
            v-model="dataval"
            :disabled="disabled"
            outline 
            />
          </div>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn color="primary" @click="saveDialog">确 定</mdb-btn>
         <mdb-btn outline="primary" @click="hideDialog">取 消</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>

<script type="text/javascript">
export default {
  props: ['isshow','dialogItem','type','disabled'],
  data() {
    return {
      dataval:''
    };
  },
  methods: {
    upDateVal(item,index) {
      if(index==0){
        this.dataval = item.pictureName
      }else{
        this.dataval=item.description
      }
    },
    hideDialog() {
      this.$emit("hideDialog")
    },
    saveDialog() {
      if(this.type==0 && this.dataval.indexOf(',')!=-1){
        this.$message.error("图片名字不允许特殊字符“,”");
        return;
      }
      if(this.type==1 &&  this.dataval.indexOf('|')!=-1){
        this.$message.error("图片名字不允许特殊字符“|”");
        return;
      }
      if(this.type==0){
        this.dialogItem.pictureName=this.dataval
      }else{
        this.dialogItem.description=this.dataval
      }
      this.$emit("saveDialog",this.dialogItem)
    }
  },
  computed: {
    imgType() {
      return this.type==1?'图片描述':'图片名称'
    }
  }
};
</script>

<style lang="less" scoped>
</style>
<style lang="less">
.modalwrapper .close {
  display: none;
}
.modalwrapper .close1 {
  padding:1rem;
  margin:-1rem -1rem auto;
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
}
</style>