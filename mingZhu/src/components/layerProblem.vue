<template>
  <mdb-container class="layerWrapper">
    <!-- modal trigger button -->
    <!-- <mdb-btn color="default" @click="contact = true">launch modal</mdb-btn> -->
    <!-- simple login modal -->
    <mdb-modal v-if="contact" @close="contact = false" info>
      <mdb-modal-header class="text-center" :close = "false">
        <p class="heading w-100">{{layerTitle}}</p>
      </mdb-modal-header>
      <mdb-modal-body class="mx-3 grey-text">
        <form v-if="messageNotify.mailType == 2" autocomplete="off" @submit.prevent="onSubmit">
          <!-- <label for="defaultFormContactNameEx" class="grey-text">标题</label>
          <input type="text" id="defaultFormContactNameEx" class="form-control" v-model='messageNotify.title' disabled> -->
          <div class="outline-input">
            <mdb-input 
            type="text" 
            label="标题" 
            v-model="messageNotify.title"
            disabled
            outline 
            />
          </div>
          <br/>
          <!-- <label for="defaultFormContactNameEx" class="grey-text">描述</label>
          <input type="text" id="defaultFormContactNameEx" class="form-control" v-model="messageNotify.questionDO.description" disabled> -->
          <div class="outline-input">
            <mdb-input 
            type="text" 
            label="描述" 
            v-model="messageNotify.questionDO.description"
            disabled
            outline 
            />
          </div>
          <br/>
          <!-- <label for="defaultFormContactNameEx" class="grey-text">问题详情</label>
          <textarea id="defaultFormContactNameEx" class="form-control" v-model="messageNotify.questionDO.detail" readonly ></textarea> -->
          <div class="outline-input">
            <mdb-input 
            type="textarea" 
            label="问题详情" 
            :rows="3" 
            v-model="messageNotify.questionDO.detail"
            disabled
            outline 
            />
          </div>
          <mdb-btn class="clear-margin" tag="a" role="button" color="primary" :href= "origin+'/Mingzhu/common/sysFile/download/'+messageNotify.questionDO.content+'/'+messageNotify.questionDO.fileName" size="sm" :download='messageNotify.questionDO.content'>附件下载</mdb-btn>
          <br/>
          <br/>
          <label for="defaultFormContactNameEx" class="label-center grey-text">问题回复</label>
          <!-- <textarea v-if="messageType == 0" id="defaultFormContactNameEx" class="form-control" v-model="messageNotify.questionDO.answer.detail" readonly></textarea>
          <textarea v-if="messageType == 1" id="defaultFormContactNameEx" class="form-control" v-model="ansDetail"></textarea> -->
          <div class="outline-input">
            <mdb-input 
            type="textarea" 
            label="问题回复" 
            :rows="3" 
            v-if="messageType == 0"
            v-model="messageNotify.questionDO.answer.detail"
            disabled
            outline 
            />
          </div>
          <div class="outline-input">
            <mdb-input 
            type="textarea" 
            label="问题回复" 
            :rows="3" 
            v-if="messageType == 1"
            v-model="ansDetail"
            outline 
            />
          </div>
          <mdb-btn v-if="messageType == 0" class="clear-margin" tag="a" role="button" color="primary" :href="origin+'/Mingzhu/common/sysFile/download/'+messageNotify.questionDO.answer.content" size="sm" :download='messageNotify.questionDO.answer.content'>附件下载</mdb-btn>
          <el-upload v-if="messageType == 1"
            class="upload-demo"
            ref="upload"
            :on-success="handleSuccess"
            :action="api.upload()"
            :before-upload="beforeAvatarUpload" 
            :show-file-list="true">
            <el-button size="small" type="primary">附件上传</el-button>
          </el-upload>
          <!-- <mdb-btn @click="contact = false" color="unique" icon="paper-plane-o" iconClass="ml-1">提交</mdb-btn> -->
          <br/>
          <div class="text-center mt-4" v-if="messageType == 1">
            <mdb-btn @click="upAss" type="button" color="primary">确定</mdb-btn>
            <mdb-btn @click="contact = false" color="primary">取消</mdb-btn>
          </div>
        </form>
        <form v-if="messageNotify.mailType != 2">
          <!-- <label for="defaultFormContactNameEx" class="grey-text">标题</label>
          <input type="text" id="defaultFormContactNameEx" class="form-control" v-model='messageNotify.title' disabled> -->
          <div class="outline-input">
            <mdb-input 
            type="text" 
            label="标题"
            v-model="messageNotify.title"
            disabled
            outline 
            />
          </div>
          <br/>
          <!-- <label for="defaultFormContactNameEx" class="grey-text">内容</label>
          <textarea id="defaultFormContactNameEx" class="form-control" v-model="messageNotify.content" readonly ></textarea> -->
          <div class="outline-input">
            <mdb-input 
            type="textarea" 
            label="内容" 
            :rows="3" 
            v-model="messageNotify.content"
            disabled
            outline 
            />
          </div>
          <br/>
          <!-- <label for="defaultFormContactNameEx" class="grey-text">创建时间</label>
          <input type="text" id="defaultFormContactNameEx" class="form-control" v-model="messageNotify.createTime" disabled> -->
          <div class="outline-input">
            <mdb-input 
            type="text" 
            label="创建时间" 
            v-model="messageNotify.createTime"
            disabled
            outline 
            />
          </div>
          <br/>
        </form>
      </mdb-modal-body>
    </mdb-modal>
  </mdb-container>
</template>
<script>
  export default {
    props:['messageNotify','layerTitle','messageType'],
    mounted() {
      this.origin = location.origin
    },
    data() {
      return {
        origin:'',
        contact: false,
        ansDetail: '',
        EnclosureUrl:'',
        srcFileName:''
      }
    },
    methods: {
      // 上传前验证
      beforeAvatarUpload(file) {
        const isLt3M = file.size / 1024 / 1024 < this.$isLt10M;
        if (!isLt3M) {
          this.$message.error(`上传文件大小不能超过 ${this.$isLt10M}MB!`);
        }
        return isLt3M;
      },
      upAss() {
        // this.$refs.upload.submit();
        let parmas = {
          title: this.messageNotify.title,
          questionId: this.messageNotify.businessId,
          description: this.messageNotify.questionDO.description,
          detail: this.ansDetail,
          content: this.EnclosureUrl,
          srcFileName:this.srcFileName
        }
        console.log(parmas)
        this.api.bossAnswer(parmas).then(res=>{
          this.$message(res.msg);
          if(res.code == 0){
            this.contact = false;
            // this.$message("问题回复成功");
          }
          // else{
          //   this.$message("问题回复失败");
          // }
        })
      },
      handleSuccess(resFile, file, fileList) {
        this.api.getUrl({ fileName: resFile.msg }).then(res => {
          this.EnclosureUrl = resFile.msg;
          this.srcFileName = file.name
        });
      },
      onSubmit() {
        return false;
      },
    },
  }
</script>
<style lang="less" scoped>
.layerWrapper{
  textarea[readonly]:focus{
    box-shadow:none;
    background-color: #e9ecef;
  }
}
    .label-center{
        display: block;
        text-align: center;
    }
    .clear-margin{
        margin: 0;
    }
</style>