<template>
  <mdb-container class="px-0 mt-5 pt-5 personal-center" :class="{'isMobile': isMobile}">
      <div class="border-bottom mx-0 mb-4 position-relative" style="border-color:rgb(243, 243, 243);height:15.125rem;">
        <div class="pc-top"></div>
        <mdb-row class="position-absolute w-100 mx-0" style="bottom:0;">
          <mdb-col md="2">
            <div class="avatar" @click='modal = isMobile ? false: true' >
              <img :src="head" 
              :class="[filter==1?'chalkboard':'',filter==2?'airbrush-effect':'',filter==3?'colored-chalkboard-effect':'',filter==4?'hallucination-effect':'']"/>
          </div>
          </mdb-col>
          <mdb-col md="10" class="align-self-end" style="min-height:6.25rem;">
            <mdb-row class="align-items-end">
              <!-- <mdb-col md="12" class="userNameWrapper">{{userInfo.userName}}</mdb-col> -->
              <mdb-col md="12" class="userNameWrapper" :class="userInfo.userName?'':'invisible'">
                {{userInfo.userName?userInfo.userName:'hhh'}}
              </mdb-col>
              <mdb-col md="12" class="px-0">
                <div class="pc-tab">
                  <router-link
                    v-for="(item,index) in links"
                    :key="index"
                    :to='item.path'
                  >
                    {{item.text}}
                  </router-link>
                </div>
              </mdb-col>
            </mdb-row>
          </mdb-col>
        </mdb-row>
      </div>
      <mdb-row>
        <mdb-col md="12" class="px-0">
          <div class="pc-content">
            <router-view></router-view>
          </div>
        </mdb-col>
      </mdb-row>
      <mdb-modal v-if='modal==true' info>
        <mdb-modal-header class="text-center" :close="false">
          <p class="heading w-100">你的头像照片</p>
        </mdb-modal-header>
        <mdb-modal-body>    
          <h6>上传新头像</h6>
          <mdb-container>
            <mdb-row>
              <mdb-col style="border:1px solid #ccc;height:13.75rem;padding:0;overflow:hidden">
                <div class='headPoto'>
                <img :src="headPhoto" v-if='headPhoto' class="w-100  h-100"/>
                <img :src='head' class="w-100  h-100" v-else
                :class="[filter==1?'chalkboard':'',filter==2?'airbrush-effect':'',filter==3?'colored-chalkboard-effect':'',filter==4?'hallucination-effect':'']"/>
                </div>
              </mdb-col>
              <mdb-col style="border:1px solid #ccc;margin-left:0.95rem;height:13.75rem;padding:0" >
                <el-upload
                  class="w-100  h-100"
                  :show-file-list="false"
                  :action="api.upload()"
                  :before-upload="beforeAvatarUpload"
                  :on-success="successUpLoadAvatar"
                  accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
                >
                  <i class="el-icon-plus avatar-uploader-icon" 
                      style="font-size:6.125rem;color:#ccc;font-weight:300;
                          margin:4.375rem 3.06rem 2.70rem 3.06rem;"></i>
                </el-upload>
              </mdb-col>
            </mdb-row>
          </mdb-container>    
        </mdb-modal-body>
        <mdb-modal-footer center>
          <mdb-btn color="primary" @click.native='changeHeadImg'>保存</mdb-btn>
          <mdb-btn  outline="primary" @click.native="closeChoose">关闭</mdb-btn>
        </mdb-modal-footer>
      </mdb-modal>
  </mdb-container>
</template>
<script>
  import {mapGetters, mapMutations } from "vuex";
  export default {
    name: 'personalCenter',
    data() {
      return {
        filter:0,
         backgroundDiv: {
            backgroundImage: 'url(' + this.head + ')'
        },
        headImg:[
          {
            path:require('@/assets/images/head1.jpeg'),id:1
          },
          {
            path:require('@/assets/images/head2.jpeg'),id:2
          },
          {
            path:require('@/assets/images/head3.jpeg'),id:3
          },
          {
            path:require('@/assets/images/head4.jpg'),id:4
          },
          {
            path:require('@/assets/images/head5.jpg'),id:5
          },
          {
            path:require('@/assets/images/head6.jpg'),id:6
          },
          {
            path:require('@/assets/images/head7.jpg'),id:7
          },
          {
            path:require('@/assets/images/head8.jpg'),id:8
          },
          {
            path:require('@/assets/images/head9.jpg'),id:9
          },
          {
            path:require('@/assets/images/head10.jpg'),id:10
          },
        ],
        headPhoto:null, 
        headPhotoName:null,
        select:0,
        flipped: false,
        modal:false,
        head: '',
        links:[
          { path: '/accountInfo', text: '账户信息' },
          { path: '/projectManage', text: '项目管理' },
          // { path: '/taskHall', text: '招标信息' },
          { path: '/myArticle', text: '我的文章' },
          { path: '/message', text: '站内信' }],
      };
    },
    computed:{
      ...mapGetters(["userInfo"])
    },
    mounted() {
      // 设置登陆成功后需要刷新页面
      this.setIsRefresh(true);
      this.id = localStorage.getItem("userId") || sessionStorage.getItem("userId");
      this.getDesignerInfo()
    },
    methods: {
      // 设置登陆成功后需要刷新页面
      ...mapMutations(["setIsRefresh","setUser"]),
      selectFilterOne(val){
        var img='';
       // img=this.$refs.imgOne.src
        
       // console.log(img)
        this.select=val
      },
      chooseFilter(){
        this.flipped=true; 
        if(this.headPhoto==null){
          this.headPhoto=this.head
        }
      },
      closeChoose(){
        this.headPhoto=null;
        this.modal = false
      },
      updateHeadImg(){
        this.modal =true
      },
      getDesignerInfo() {
        this.api.getInfoByDesignerIdNew({ id: this.id }).then(res => {
          if (res.code !== 0) {
            return
          }
           if(res.data.head == null){
            this.getHeadImg()
          }else{
            this.head = res.data.head
            this.filter=res.data.filter
            this.select = res.data.filter
            let info = this.userInfo
            info.userName = res.data.userName
            // 更新mutations中的userName
            this.setUser(info)
          } 
        })
      },
      changeHeadImg(){
        if(this.headPhoto==null){
          this.headPhoto=this.head
        }
       this.api.getDesignerInfoUpdateNew({
          id: this.id,
          // updateType:3,
          head:this.headPhotoName,
          type:3,
          filter:this.select
        },3).then(res => {
          if (res.code !== 0) {
            this.$message.error(res.msg)
          }else{
            this.$message.info(res.msg)
            this.closeModal()
            this.getDesignerInfo()
          }
        })
      },
      // 上传前验证
      beforeAvatarUpload(file) {
        const isLt3M = file.size / 1024 / 1024 < this.$isLt10M;
        if (!isLt3M) {
          this.$message.error(`上传图片大小不能超过 ${this.$isLt10M}MB!`);
        }
        return isLt3M;
      },
      // 上传头像成功
      successUpLoadAvatar(res, file) {
        this.headPhotoName=res.msg
        this.select = 0
        let head = res.msg;
        this.api.getUrl({ fileName: head }).then(res => {
          if (res.code !== 0) {
            return;
          }
          this.headPhoto = res.msg;
        });
       
      },
       // 随机获取头像
      getHeadImg(){
       var _Index=Math.floor(Math.random()*10)
       this.head=this.headImg[_Index].path;
      },
      closeModal(){
        this.flipped=false;
        this.modal=false;
        this.select=0;
        this.headPhoto=null;
      }, 
    },
    // 页面销毁之前
    beforeDestroy () {
      // 设置登陆成功后不需要刷新页面
      this.setIsRefresh(false);
    }
  };
</script>
<style lang="less" scoped>
// banner图
.pc-top {
  position: relative;
  height: 12rem;
  background: url("../../../assets/images/cooperation1.png") center center no-repeat;
  background-size: cover;
}
// 头像上传
.avatar {
  width: 11.125rem;
  height: 11.25rem;
  // border: 1px solid #ccc;
  margin-bottom: 0.625rem;
  border-radius: 0.3125rem;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
.userNameWrapper{
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: #fff;
}
// tab切换
.pc-tab {
  a {
    display: inline-block;
    color: #000;
    padding: 0.5rem 1rem;
  }
  .router-link-active {
    border-bottom: 2px solid #4285f4;
    color: #4285f4;
  }
}
// 内容
.pc-content {
  margin-bottom: 6rem;
}

</style>

<!-- ui样式覆盖 --> 
<style lang="less" scoped>
@media only screen and (min-width: 1600px){
  .personal-center{
     width: 1500px!important;
  }
}
.personal-center.isMobile{
  width: 100%;
  .container-fluid{
    .leftTab{
      .avatar{
        top: -180px;
      }
    }
  }
}
</style>