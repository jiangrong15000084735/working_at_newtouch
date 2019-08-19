<template>
  <mdb-container class="main question">
    
    <div class="wrap">
      <h4>问题反馈</h4>
      <p>选择标签</p>
      <div style="text-align: left" class="row">
        <!-- <div v-for="(item, index) in tags" :key="index" class="col-md-3">
          <div class="tag"
              @click="choiceTag(index)"
              :class="item.boo?'on':''"
          >{{item.name}}
          </div>
        </div> -->
        <mdb-btn v-for="(item, index) in tags" 
          :key="index" 
          outline="primary" 
          darkWaves 
          rounded
          @click="choiceTag(index)"
          class="mr-5">{{item.name}}</mdb-btn>
      </div>
      <p>标题</p>
      <div class="input-wrap">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>

      <p>正文</p>
      <div id="editor-container">
        <quill-editor
            ref="myTextEditor"
            v-model="content"
            :options="editorOption"
        >
        </quill-editor>
      </div>

       <mdb-btn color="primary"  class="submit "
           @click="submit"  v-loading.fullscreen.lock="fullscreenLoading">发送</mdb-btn>

      <!-- <div class="submit "
           @click="submit"
           v-loading.fullscreen.lock="fullscreenLoading"
      >发送
      </div> -->
    </div>

  </mdb-container>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import {quillEditor} from 'vue-quill-editor'
  import { mapGetters } from 'vuex';
export default {
  components: {
    quillEditor
  },
  computed: {
    // 获取登陆状态
    ...mapGetters([
      'getIsLogin'
    ])
  },
  data() {
    return {
      fullscreenLoading: false,
      selectLabel: '',
      type: 3,
      input: '',
      tags: [],
      content: ``,
      editorOption: {
        placeholder: '从这里开始',
        modules: {
          toolbar: [
            ['bold' , 'italic', 'underline'],
            ['code-block'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'color': []}],
            [{'align': []}],
            ['link', 'image']
          ]
        }
      }
    }
  },
  methods: {
    choiceTag(index) {
      for(let i = 0; i<this.tags.length;i++){
        if(i == index){
          this.tags[i].boo = true;
        }else{
          this.tags[i].boo = false;
        }
      }
      
    },
    filterTag() {
      this.selectLabel = ''
      let _this = this
      this.tags.forEach(function (item) {
        if (item.boo) {
          _this.selectLabel += item.name + ','
        }
      })
    },
    submit() {
      if (!this.getIsLogin) {
        // 未登陆处理
        this.loginHandle();
        return false;
      }
      this.filterTag();
      if(this.selectLabel == ''){
        this.$message('请选择标签')
        return;
      }
      if(this.input == ''){
        this.$message('请输入标题')
        return;
      }
      if(this.content == ''){
        this.$message('请输入内容')
        return;
      }
      // this.filterTag()
      let params = {
        type: this.type,
        selectLabel: this.selectLabel,
        title: this.input,
        text: this.content
      }
      this.fullscreenLoading = true
      this.api.contactSave(params).then(res => {
        this.fullscreenLoading = false
        if (res.code === 0) {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
        }
      }, error => {
        console.log(error)
        this.fullscreenLoading = false
      }).catch(error => {
        console.log(error)
        this.fullscreenLoading = false
      })
    },
    // 未登陆处理
    loginHandle() {
      // 调用登陆框
      Bus.$emit("loginBox",'');
    }
  },
  mounted() {
    this.type = 2
    this.api.buildingType('contact_us').then(res => {
      if (res.code == 0) {
        let _tags = []
        _tags = res.data
        _tags.forEach(function (item) {
          item.boo = false
        })
        this.tags = _tags
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .main {
    width: 100%;
    text-align: center;
    margin: 8.2rem auto;
    margin-bottom: 0;
    max-width: 65rem !important;

    .wrap {
      margin: 0 auto;
      background: #fff;
      padding: 1rem 5rem 3.75rem 5rem;
      p {
        font-size: 1rem;
        color: #999;
        text-align: left;
        margin: 0.5rem 0 0.5rem;
      }

      .tag {
        border: 1px solid #999999;
        border-radius: 2.13rem;
        padding: 0.56rem 2.13rem;
        display: inline-block;
        cursor: pointer;
        margin: 0 1.25rem 0 0;
      }
      .on {
        border: 1px solid #4285f4;
        background-color: #4285f4;
        color: #fff;
      }
      .input-wrap {
        width: 25rem;
      }
      .submit {
        // background-image: linear-gradient(-90deg, #F3DAA4 6%, #F2CD89 98%);
        width: percentage(889/1420);
        height: 2.88rem;
        // line-height: 2.88rem;
        text-align: center;
        margin: 1.2rem auto;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
      }
    }
    
    h3, h4 {
      font: 35px PingFangSC-Medium;
      color: #000;
      position: relative;
      text-align: center;
      display: inline-block;
      margin-bottom: 1rem;
    }
    h3::before {
      content: "Contact";
      color: #000;
      position: absolute;
      left: -35%;
      top: -222%;
      opacity: .05;
      font-size: 4.06rem;
    }
    h4::before {
      content: "Question";
      color: #000;
      position: absolute;
      left: -35%;
      top: -222%;
      opacity: .05;
      font-size: 4.06rem;
    }
  }

  .quill-editor{
    height: 8rem;
  }
  // .ql-toolbar .ql-snow{
  //   height: 54%;
  // }

@media (max-width:690px) {
  .wrap{
    padding-left:2rem !important;
    padding-right: 2rem !important;
  }
  .tag{
    margin-bottom: 1rem !important;
  }
  .quill-editor{
    height: 16rem !important;
  }
}
</style>
<style lang="less" >
  .ql-toolbar.ql-snow{
    height: 33%;
  }
  .ql-container.ql-snow{
    height: 67%;
  }
  .question{
    .btn-outline-primary {
      border: 2px solid #999 !important;
      background-color: transparent !important;
      color: #999 !important;
    }
  }
  
</style>
