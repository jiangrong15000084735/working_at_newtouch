<template>
  <mdb-container fluid class="account-info">
    <mdb-row style="padding:0.5rem 0 1.375rem;font-size: 1rem; color:#333;">
      <mdb-col md="6">
        个人信息
      </mdb-col>
      <mdb-col md="6" class="text-right" v-show="auditStateNum<3">
        <router-link to="/personalInformationNew">
          <mdb-btn color="primary" class="mx-0 my-0">会员认证</mdb-btn>
        </router-link>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="9">
        <mdb-row class="mb-4">
          <mdb-col md="9">
            <div class="outline-input ">
              <mdb-input 
                type="text"
                size="lg" 
                label="昵称"
                v-model.trim="userName"
                outline />
            </div>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-4">
          <mdb-col md="9">
            <div class="outline-input">
              <mdb-input 
                type="text"
                size="lg" 
                label="邮箱"
                disabled 
                v-model="email"
                outline />
              </div>
          </mdb-col>
          <mdb-col col="3" class="inputWrapper">
            <button 
              type="button" 
              class="btn btn-outline-info waves-effect my-0 px-2" 
              v-if="email" 
              @click="hasBindEmail">更改绑定</button>
            <button 
              type="button" 
              class="btn btn-outline-info waves-effect my-0 px-3" 
              v-else 
              @click="noBindEmail"
              >修改</button>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-4">
          <mdb-col md="9">
            <div class="outline-input ">
              <mdb-input 
                type="text"
                size="lg" 
                label="真实姓名"
                v-model.trim="realName"
                outline />
            </div>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-4">
          <mdb-col md="9">
          <div class="outline-input">
              <mdb-input 
                type="text"
                size="lg" 
                label="联系电话"
                disabled 
                v-model="phoneNumber"
                outline />
            </div>
          </mdb-col>
          <mdb-col md="3" class="inputWrapper">
            <button 
              type="button" 
              class="btn btn-outline-info waves-effect my-0 px-2" 
              v-if="phoneNumber" 
              @click="hasBindPhone">更改绑定</button>
            <button 
              type="button" 
              class="btn btn-outline-info waves-effect  my-0 px-3" 
              v-else 
              @click="noBindPhone"
              >修改</button>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-4">
          <mdb-col md="9">
            <div class="outline-input ">
              <mdb-input 
                type="text"
                size="lg" 
                label="会员ID"
                disabled
                v-model.trim="designerSerial"
                outline />
            </div>
          </mdb-col>
        </mdb-row>
        <!-- <mdb-row style="padding-top:36px !important;">
          <mdb-col md="12" class="text-left">
              <mdb-btn color="primary" class="btn212_60" @click="update">更 新</mdb-btn>
          </mdb-col>
        </mdb-row> -->
      </mdb-col>
      <mdb-col md="3">
        <mdb-row>
          <mdb-col md="12">
            <el-upload
                class="upload-demo"
                :action="api.upload()"
                :before-upload="beforeIDcardUpload"
                :on-success="cardIDhandleSuccess"
                accept=".jpg,.jpeg,.png,.JPG,.JPEG,.bmp"
                :show-file-list="false"
                drag
              >
                <img
                  width="100%"
                  height="100%"
                  v-if="idCardPhotoUrl"
                  :src="idCardPhotoUrl"
                  alt=''
                  class="idCardName"
                >
                <i
                  class="el-icon-circle-plus-outline"
                  v-if="!idCardPhotoUrl"
                >
                </i>
                <div
                  v-if="!idCardPhotoUrl"
                  class="el-upload__text"
                >身份证扫描件(正面)</div>
                <!-- <div
                  class="el-upload__tip"
                  slot="tip"
                >只能上传jpg/png文件，且不超过{{$isLt10M}}Mb</div> -->
              </el-upload>
          </mdb-col>
        </mdb-row>
        <mdb-row>
          <mdb-col md="12">
            <el-upload
                class="upload-demo mt-2"
                :action="api.upload()"
                :before-upload="beforeIDcardUpload"
                :on-success="cardIDhandleSuccess1"
                accept=".jpg,.jpeg,.png,.JPG,.JPEG,.bmp"
                :show-file-list="false"
                drag
              >
                <img
                  width="100%"
                  height="100%"
                  v-if="idCardPictureUrl"
                  :src="idCardPictureUrl"
                  alt=''
                  class="idCardName"
                >
                <i
                  class="el-icon-circle-plus-outline"
                  v-if="!idCardPictureUrl"
                >
                </i>
                <div
                  v-if="!idCardPictureUrl"
                  class="el-upload__text"
                >身份证扫描件(反面)</div>
                <div
                  class="el-upload__tip"
                  slot="tip"
                >只能上传jpg/png文件，且不超过{{$isLt10M}}Mb</div>
              </el-upload>
          </mdb-col>
        </mdb-row>
      </mdb-col>
    </mdb-row>
    <mdb-row style="padding-top:2.25rem !important;">
      <mdb-col md="12" class="text-left">
          <mdb-btn color="primary" class="btn212_60" @click="update">更 新</mdb-btn>
      </mdb-col>
    </mdb-row>
    <bindPhoneEmail :bindPhoneEmailObj="bindPhoneEmailObj" @bindBack="bindBack"></bindPhoneEmail>
  </mdb-container>
</template>

<script>
  import { setTimeout, clearTimeout } from "timers";
  import bindPhoneEmail from '@/components/bindPhoneEmail'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    components:{
      bindPhoneEmail
    },
    data() {
      return {
        userName: '',
        email: '',
        newEmail: '',
        realName: '',
        phoneNumber:  '',
        newPhoneNumber: '',
        designerSerial: '',
        idCardPhoto: '',
        idCardPicture:'',

        idCardPhotoUrl: '',
        idCardPictureUrl:'',
        validateCode: '',
        verifiCodeErrors: '',
        hasSendCodeToEmail: false,
        hasSendCodeToPhone: false,
        step: 1,
        changeEmail: false,
        changePhone: false,
        btnText: '获取验证码',
        timer: null,
        bindPhoneEmailObj:{
          email: "",
          step: 1,
          changeEmail: false,
          changePhone: false,
          phoneNumber:  '',
        },
        auditStateNum:3
      }
    },
    mounted() {
      this.id = localStorage.getItem("userId") || sessionStorage.getItem("userId");
      this.getDesignerInfo();
    },
    computed:{
      ...mapGetters([
        "userInfo"
      ])
    },
    methods: {
      ...mapMutations(["setUser"]),
      // 更改绑定邮箱
      hasBindEmail(){
        this.bindPhoneEmailObj.changeEmail = true
        this.bindPhoneEmailObj.email = this.email
        this.bindPhoneEmailObj.step = 1
      },
      // 更改绑定手机号
      hasBindPhone(){
        this.bindPhoneEmailObj.changePhone = true
        this.bindPhoneEmailObj.phoneNumber = this.phoneNumber
        this.bindPhoneEmailObj.step = 1
      },
      // 绑定手机号
      noBindPhone(){
      this.bindPhoneEmailObj.changePhone = true
      this.bindPhoneEmailObj.step = 2
      },
      // 绑定邮箱
      noBindEmail(){
        this.bindPhoneEmailObj.changeEmail = true
        this.bindPhoneEmailObj.step = 2
      },
      // 绑定成功后的回调
      bindBack(backItem,boole){
        if(boole){
          this.email = backItem.email
        }else{
          this.phoneNumber = backItem.phoneNumber
        }
        // this.getCustomerInfo()
      },
      // 邮箱校验
      checkEmail(val) {
        // let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        // if(!reg.test(val) && val){
        //   this.$message("请输入正确的公司邮箱");
        //   return
        // }
      },
      bindEmail(){
        this.changeEmail = true
        this.verifiCodeErrors = ""
      },
      bindPhone(){
        this.changePhone = true
        this.verifiCodeErrors = ""
      },
      getDesignerInfo() {
        this.api.getInfoByDesignerIdNew({ id: this.id }).then(res => {
          if (res.code !== 0) {
            return
          }
          this.userName = res.data.userName?res.data.userName:"";
          this.email = res.data.email?res.data.email:"";
          this.realName = res.data.realName?res.data.realName:"";
          this.phoneNumber =  res.data.phoneNumber
          this.designerSerial =  res.data.designerSerial
          this.idCardPhotoUrl = res.data.idCardPhoto;
          this.idCardPictureUrl = res.data.idCardPicture;
          this.$store.commit("setAvatar", res.data.head);
          this.auditStateNum = res.data.auditState
          // 更改认证信息存储
          let userInfoLocal = sessionStorage.getItem("userInfo") || localStorage.getItem("userInfo");
          userInfoLocal=JSON.parse(userInfoLocal)
          userInfoLocal.auditState = this.auditStateNum
          localStorage.setItem("userInfo", JSON.stringify(userInfoLocal))
          this.$store.commit("SetAuditState", this.auditStateNum);
        })
      },
      closeChangeModel() {
        this.changeEmail = false
        this.changePhone = false
        this.step = 1
        clearTimeout(this.timer)
        this.btnText = "获取验证码"
        this.validateCode = ''
      },
      sendCodeToEmailOrPhone(emailOrPhone) {
        if(this.btnText == '获取验证码' || this.btnText == '重新获取'){
          this.api.getVerificationCode({ phoneNum: emailOrPhone }).then(res => {
            if (res.code == 0) {
              this.timeInvertval(60)
              return
            }
            this.$message.info(res.msg)
          });
        }
      },
      goNextStep(){
        clearTimeout(this.timer)
        if (this.validateCode.length==0) {
          this.verifiCodeErrors = "请输入验证码";
          return
        } 
        if (!/^\d{6}$/.test(this.validateCode)) {
          this.verifiCodeErrors = "验证码错误";
          return
        }
        this.api.verifyPhoneOrEmail({
          phoneNum: this.changeEmail?this.email:this.phoneNumber,
          verificationCode: this.validateCode
        }).then(res=>{
          if (res.code == 0) {
            this.step = 2
            this.validateCode = ''
            this.btnText = "获取验证码"
            this.verifiCodeErrors = ''
          } else {
            this.verifiCodeErrors = res.msg;
          }
        })
      },
      // 上传身份证前的验证
      beforeIDcardUpload (file) {
        const isLt2M = file.size / 1024 / 1024 < this.$isLt10M
        if (!isLt2M) {
          this.$message.error(`上传图片大小不能超过 ${this.$isLt10M}MB!`)
        }
        return isLt2M
      },
      // 身份证上传成功事件(正面)
      cardIDhandleSuccess (res, file) {
        this.idCardPhoto = res.msg
        this.api.getUrl({ fileName: res.msg }).then(res => {
          this.idCardPhotoUrl = res.msg
        })
      },
       // 身份证上传成功事件（反面）
      cardIDhandleSuccess1 (res, file) {
        this.idCardPicture = res.msg
        this.api.getUrl({ fileName: res.msg }).then(res => {
          this.idCardPictureUrl = res.msg
        })
      },
      update() {
        // if(!this.userName){
        //   this.$message.error("请输入昵称")
        //   return
        // }
        if(!this.realName){
          this.$message.error("请输入真实姓名")
          return
        }
        let params = {
          id: this.id,
          type:3,
          // updateType:1,
          userName: this.userName,
          realName: this.realName,
          idCardPhoto: this.idCardPhoto?this.idCardPhoto:null,
          idCardPicture:this.idCardPicture?this.idCardPicture:null,
        }
        this.api.getDesignerInfoUpdateNew(params,1).then(res => {
          if (res.code !== 0) {
            this.$message.info(res.msg);
            return
          }
          let info = this.userInfo
          info.userName = this.userName
          // 更新mutations中的userName
          this.setUser(info)
          this.$message.info('更新成功');
        })
      },
      bindPhoneOrEmail() {
        let val = this.changeEmail?this.newEmail:this.newPhoneNumber
        let label = this.changeEmail?"请输入邮箱":"请输入手机号"
        if(!val){
          this.verifiCodeErrors = label
          return
        }
        if(!this.validateCode){
          this.verifiCodeErrors = label
          return
        }
        this.api.bindPhoneOrEmail({
          phoneNum: val,
          verificationCode: this.validateCode,
          type: 1,
          id: this.id
        }).then(res=>{
          if (res.code !== 0) {
            this.verifiCodeErrors = res.msg
            return
          }
          this.$message(res.msg)
          this.closeChangeModel()
          this.getDesignerInfo();
        })
      },
      timeInvertval(value) {
        let v = value - 1
        if(v <= 0){
          this.btnText = "重新获取"
          return
        } else {
          this.btnText = v + "s后重新获取"
        }
        this.timer=setTimeout(()=>{
          this.timeInvertval(v)
        },1000)
      },
    }
  }
</script>

<style lang="less" scoped>

.upload-demo{
  text-align: center;
  .el-upload__text{
    font-size: 1.125rem;
    margin-top: 0.625rem;
  }
}
.el-icon-circle-plus-outline {
  font-size: 1.75rem;
  margin-top: 20%;
  color: #333;
}
.inputWrapper{
  // position: relative;
  // .tag{
  //   position: absolute;
  //   right: 1.875rem;
  //   bottom: 1rem;
  //   font-size: .875rem;
  //   color: #057aff;
  //   text-align: right;
  //   z-index: 1;
  //   cursor: pointer;
  //   font-weight: 400;
  //   transition: .2s ease-out;
  //   width: auto;
  // }
  button{
    height: 50px !important;
    box-sizing: border-box !important;
    margin: 0 !important;
    margin-left: 20px !important;
    border: 1px solid #999 !important;
    background:#fafafa !important;
    color: #999 !important;
    padding-left: 15px;
    padding-right: 15px;
  }
  button:hover{
    border: 1px solid #4285f4 !important;
    background:#4285f4 !important;
    color: #fff !important;
  }
  .feedback {
    position: absolute;
    bottom: -1.2rem;
    color: #f44336;
    font-size: .75rem
  }
}
// .mb24{
//   margin-bottom:24px;
// } 
// .w522{
//   width:522px;
// }
// .mr188{
//   margin-right: 188px;
// }
</style>
<style lang="less">
.modalwrapper .close{
  display: none;
}
.modalwrapper .close1{
  padding:1rem;
  margin: -1rem -1rem -1rem auto;
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: .5;
}
.account-info{
  .upload-demo {
    width:100%;
  }
  .el-upload{
    width:100%;
    .el-upload-dragger{
    // width: 224px !important;
    width:100% !important;
    height: 10.25rem !important;
  }
  }
  .el-upload__tip{
    color: #c5c5c5;
  }
}

</style>