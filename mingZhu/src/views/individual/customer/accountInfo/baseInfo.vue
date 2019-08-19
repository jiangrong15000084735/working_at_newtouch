<template>
  <mdb-container fluid class="base-info-c">
    <mdb-row class="mx-0">
      <mdb-col md="6" style="padding:0.5rem 0 1.375rem;font-size: 1rem; color:#333;">
        个人信息
      </mdb-col>
      <mdb-col md="6" class="text-right" v-show="auditStateNum<3">
          <mdb-btn @click="toAuthentication('submit')" color="primary" class="mx-0 my-0">会员认证</mdb-btn>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="9">
        <!-- 昵称 -->
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
              v-model.trim="email"
              outline />
            </div>
          </mdb-col>
          <mdb-col md="3" class="inputWrapper">
            <button
              type="button"
              class="btn btn-outline-info waves-effect mx-0 my-0"
              v-if="email"
              @click="hasBindEmail">更改绑定</button>
            <button
              type="button"
              class="btn btn-outline-info waves-effect mx-0 my-0"
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
                v-model.trim="phoneNumber"
                outline />
            </div>
          </mdb-col>
          <mdb-col col="3" class="inputWrapper">
            <button
              type="button"
              class="btn btn-outline-info waves-effect mx-0 my-0"
              v-if="phoneNumber"
              @click="hasBindPhone">更改绑定</button>
            <button
              type="button"
              class="btn btn-outline-info waves-effect mx-0 my-0"
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
        <mdb-row class="mb-4">
          <mdb-col md="9">
            <div class="company">
              <span style="margin-right:1.875rem;">是否升级为公司（机构）会员：</span>
              <div class="form-check form-check-inline" style="margin-right:7.5rem;">
                <input
                  type="radio"
                  name="radioInline"
                  v-model="ruleForm.isCompany"
                  class="form-check-input"
                  value="Y"
                  id="defaultInline1"
                >
                <label class="form-check-label" for="defaultInline1">是</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  type="radio"
                  name="radioInline"
                  value="N"
                  v-model="ruleForm.isCompany"
                  class="form-check-input"
                  id="defaultInline2"
                >
                <label class="form-check-label" for="defaultInline2">否</label>
              </div>
            </div>
          </mdb-col>
        </mdb-row>
      </mdb-col>
      <mdb-col md="3">
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
        </el-upload>
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
            v-if="namePictureUrl"
            :src="namePictureUrl"
            alt=''
            class="idCardName"
          >
          <i
            class="el-icon-circle-plus-outline"
            v-if="!namePictureUrl"
          >
          </i>
          <div
            v-if="!namePictureUrl"
            class="el-upload__text"
          >身份证扫描件（反面）</div>
          <div
            class="el-upload__tip"
            slot="tip"
          >只能上传jpg/png文件，且不超过{{$isLt10M}}Mb</div>
        </el-upload>
      </mdb-col>
    </mdb-row>
    <mdb-row v-show="ruleForm.isCompany=='Y'" class="mt-4">
      <mdb-col md="9">
        <mdb-row class="mb-4">
          <mdb-col md="9">
            <div class="outline-input ">
              <mdb-input
              type="text"
              size="lg"
              label="公司名称"
              v-model.trim="ruleForm.company"
              outline />
            </div>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-4">
          <mdb-col md="9">
            <div class="outline-input ">
              <mdb-input
              type="text"
              size="lg"
              label="公司地址"
              v-model.trim="ruleForm.address"
              outline />
            </div>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-4">
          <mdb-col md="9">
            <div class="outline-input ">
              <mdb-input
              type="text"
              size="lg"
              label="公司电话"
              v-model.trim="ruleForm.companyPhone"
              outline />
            </div>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-4">
          <mdb-col md="9">
            <div class="outline-input ">
              <mdb-input
              type="text"
              size="lg"
              label="部门及职务"
              v-model.trim="ruleForm.department"
              outline />
            </div>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-4">
          <mdb-col md="9">
            <div class="outline-input ">
              <mdb-input
              type="text"
              size="lg"
              label="公司传真"
              v-model.trim="ruleForm.companyFax"
              @change="isChangeFax"
              outline />
            </div>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-4">
          <mdb-col md="9">
            <div class="outline-input ">
              <mdb-input
              type="text"
              size="lg"
              label="公司邮箱"
              v-model.trim="ruleForm.companyEmail"
              outline />
            </div>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-4">
          <mdb-col md="9">
            <div class="outline-input ">
              <mdb-input
              type="text"
              size="lg"
              label="网站地址"
              v-model.trim="ruleForm.website"
              outline />
            </div>
          </mdb-col>
        </mdb-row>
      </mdb-col>
      <mdb-col md="3" class="inputWrapper">
        <el-upload
          class="upload-demo uploagwar"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
          drag
          multiple
          :action="api.upload()"
        >
          <img v-if="licenseUrl" :src="licenseUrl" class="demo-img">
          <div v-else style="margin-top:1.2813rem;">
            <p style="font-size:1.875rem;color:#4285f4;"><mdb-icon icon="plus-circle" /></p>
            <span class="uploadIDCardTips" style="color:#999999;font-size:0.875rem;">
              营业执照或组织机
              构代码扫描附件
            </span>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过{{$isLt10M}}Mb</div>
        </el-upload>
      </mdb-col>
    </mdb-row>
    <mdb-row style="padding-top:3.75rem !important;">
      <mdb-col md="12" class="text-left">
          <mdb-btn color="primary" class="btn212_60" @click="update">更 新</mdb-btn>
      </mdb-col>
    </mdb-row>
    <bindPhoneEmail :bindPhoneEmailObj="bindPhoneEmailObj" @bindBack="bindBack"></bindPhoneEmail>
  </mdb-container>
</template>
<script>
  import bindPhoneEmail from "@/components/bindPhoneEmail"
  import { mapGetters, mapMutations } from "vuex"

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
        namePicture:'',
        idCardPhotoUrl: '',
        namePictureUrl:'',
        // validateCode: '',
        // verifiCodeErrors: '',
        // hasSendCodeToEmail: false,
        // hasSendCodeToPhone: false,
        // step: 1,
        // changeEmail: false,
        // changePhone: false,
        // btnText: '获取验证码',
        // timer: null,
        disabled: true,
        licenseUrl:'',
        ruleForm: {
          head: "",
          nameCard: "",
          license: "",
          bossSerial: "",
          phoneNumber: "",
          realName: "",
          email: "",
          department: "",
          company: "",
          address: "",
          companyPhone: ""
        },
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
    computed:{
      ...mapGetters(["userInfo"])
    },
    mounted() {
      this.id = localStorage.getItem("userId") || sessionStorage.getItem("userId");
      this.getCustomerInfo();
    },
    methods: {
      isChangeFax(value){
        if(value){
          this.ruleForm.companyFax = value.replace( /[^((0\d{2,3}-\d{7,8}))]/g,'')
        }
      },
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
        // console.log(backItem,boole)
        if(boole){
          this.email = backItem.email
        }else{
          this.phoneNumber = backItem.phoneNumber
        }
        // this.getCustomerInfo()
      },
      handleSuccess(res, file) {
        this.ruleForm.license = res.msg;
        this.api.getUrl({ fileName: this.ruleForm.license }).then(res => {
          this.licenseUrl = res.msg;
        });
      },
      beforeUpload(file) {
        const isLt3M = file.size / 1024 / 1024 < this.$isLt10M;
        if (!isLt3M) {
          this.$message.error(`上传图片大小不能超过 ${this.$isLt10M}MB!`);
        }
        return isLt3M;
      },
      getCustomerInfo() {
        this.api.companyDetailNew({ id: this.id }).then(res => {
          if (res.code !== 0) {
            return
          }
          this.ruleForm.company = res.data.company?res.data.company:"";
          this.ruleForm.address = res.data.address?res.data.address:"";
          this.ruleForm.companyPhone = res.data.companyPhone?res.data.companyPhone:"";
          this.ruleForm.department = res.data.department?res.data.department:"";
          this.ruleForm.companyFax = res.data.companyFax?res.data.companyFax:"";
          this.ruleForm.companyEmail = res.data.companyEmail?res.data.companyEmail:"";
          this.ruleForm.website = res.data.website?res.data.website:"";

          this.licenseUrl = res.data.licenseUrl
          this.userName = res.data.userName?res.data.userName:"";
          this.email = res.data.email?res.data.email:"";
          this.realName = res.data.realName?res.data.realName:"";
          this.phoneNumber =  res.data.phoneNumber?res.data.phoneNumber:"";
          this.designerSerial =  res.data.bossSerial
          this.idCardPhoto = res.data.nameCard
          this.idCardPhotoUrl = res.data.nameCardUrl
          this.namePicture = res.data.namePicture
          this.namePictureUrl = res.data.namePictureUrl
          this.$store.commit("setAvatar", res.data.imageUrl);
          this.auditStateNum = res.data.auditState
          // 更改认证信息存储
          let userInfoLocal = sessionStorage.getItem("userInfo") || localStorage.getItem("userInfo");
          userInfoLocal=JSON.parse(userInfoLocal)
          userInfoLocal.auditState = this.auditStateNum
          localStorage.setItem("userInfo", JSON.stringify(userInfoLocal))
          this.$store.commit("SetAuditState", this.auditStateNum);
          let info = this.userInfo
          info.userName = this.userName
          // 更新mutations中的userName
          this.setUser(info)
        })
      },
      // closeChangeModel() {
      //   this.changeEmail = false
      //   this.changePhone = false
      //   this.step = 1
      //   this.btnText = "获取验证码"
      //   this.validateCode = ''
      //   this.verifiCodeErrors = ""
      // },
      // sendCodeToEmailOrPhone(emailOrPhone) {
      //   if(this.btnText == '获取验证码' || this.btnText == '重新获取'){
      //     this.api.getVerificationCode({ phoneNum: emailOrPhone }).then(res => {
      //       if (res.code == 0) {
      //         this.timeInvertval(60)
      //         return
      //       }
      //       this.$message.info(res.msg)
      //     });
      //   }
      // },
      // goNextStep(){
      //   clearTimeout(this.timer)
      //   if (this.validateCode.length==0) {
      //     this.verifiCodeErrors = "请输入验证码";
      //     return
      //   }
      //   if (!/^\d{6}$/.test(this.validateCode)) {
      //     this.verifiCodeErrors = "验证码错误";
      //     return
      //   }
      //   this.api.verifyPhoneOrEmail({
      //     phoneNum: this.changeEmail?this.email:this.phoneNumber,
      //     verificationCode: this.validateCode
      //   }).then(res=>{
      //     if (res.code == 0) {
      //       this.step = 2
      //       this.validateCode = ''
      //       this.btnText = "获取验证码"
      //       this.verifiCodeErrors = ''
      //     } else {
      //       this.verifiCodeErrors = res.msg;
      //     }
      //   })
      // },
      // 上传身份证前的验证
      beforeIDcardUpload (file) {
        const isLt2M = file.size / 1024 / 1024 < 5
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 5MB!')
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
      // 身份证上传成功事件(反面)
       cardIDhandleSuccess1 (res, file) {
        this.namePicture = res.msg
        this.api.getUrl({ fileName: res.msg }).then(res => {
          this.namePictureUrl = res.msg
        })
      },
      // update() {
      //   let params = {
      //     id: this.id,
      //     userName: this.userName,
      //     realName: this.realName,
      //     nameCard: this.idCardPhoto
      //   }
      //   this.api.updateCompanyDetail(params).then(res => {
      //     if (res.code !== 0) {
      //       return
      //     }
      //     this.$notify.info({message: '更新成功', position: 'top center', timeOut: 1000});
      //   })
      // },
      update() {
        // if(!this.userName){
        //   this.$message.error('请输入昵称');
        //   return
        // }
        if(!this.realName){
          this.$message.error('请输入真实姓名');
          return
        }
        if(!this.idCardPhoto){
          this.$message.error('请上传身份证件');
          return
        }
         if(!this.namePicture){
          this.$message.error('请上传身份证件');
          return
        }
        if(!this.ruleForm.isCompany){
          this.$message.error('请选择是否升级为公司（机构）会员');
          return
        }
        if (this.ruleForm.isCompany == "Y" )
        {
          if( this.ruleForm.company === "" || this.ruleForm.company === null){
          this.$message.error('请输入公司名称');
          return
          }else if( this.ruleForm.address === "" || this.ruleForm.address === null){
            this.$message.error('请输入公司地址');
            return
          }else if( this.ruleForm.companyPhone === "" || this.ruleForm.companyPhone === null){
             this.$message.error('请输入公司电话');
            return
          }else if( this.ruleForm.department === "" || this.ruleForm.department === null){
            this.$message.error('请输入部门及职务');
            return
          }else if(!this.ruleForm.license){
            this.$message.error("请上传公司营业执照扫描件！");
            return
          }
          let regexp=  /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
          if(!regexp.test(this.ruleForm.companyPhone)&&this.ruleForm.companyPhone){
            this.$message.error("请输入正确的公司电话");
            return
          }
          let regFax = /^((0\d{2,3}-\d{7,8}))$/
          if(!regFax.test(this.ruleForm.companyFax)&&this.ruleForm.companyFax){
            this.$message.error("请输入正确的公司传真");
            return
          }
          let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if(!reg.test(this.ruleForm.companyEmail)&&this.ruleForm.companyEmail){
            this.$message.error("请输入正确的公司邮箱");
            return
          }
        }else{
          this.ruleForm.company = ""
          this.ruleForm.address = ""
          this.ruleForm.companyPhone = ""
          this.ruleForm.department = ""
          this.ruleForm.license = ""
          this.ruleForm.companyFax = ""
          this.ruleForm.companyEmail = ""
          this.ruleForm.website = ""
        }
        let params = {
          id: this.id,
          auditState:this.auditStateNum,
          userName: this.userName,
          realName: this.realName,
          department: this.ruleForm.department,
          company: this.ruleForm.company,
          address: this.ruleForm.address,
          companyPhone: this.ruleForm.companyPhone,
          companyFax: this.ruleForm.companyFax,
          companyEmail: this.ruleForm.companyEmail,
          website: this.ruleForm.website,
          license: this.ruleForm.license,
          nameCard: this.idCardPhoto,
          namePicture: this.namePicture,
          isCompany: this.ruleForm.isCompany,
        };
        this.api.updateCompanyDetailNew(params,"info").then(res => {
          if (res.code !== 0) {
            this.$message.error(res.msg);
            return
          }
          this.$message.info('更新成功');
          this.getCustomerInfo()
        });

      },
      toAuthentication(path){
        // this.api.authentication(this.id).then(res => {
        //   if(res.code == 0){
            this.$router.push(path)
        //   }else{
        //     this.$message.error(res.msg);
        //     return
        //   }
        // })
        // console.log(path)
      },
      // bindPhoneOrEmail() {
      //   this.api.bindPhoneOrEmail({
      //     phoneNum: this.changeEmail?this.newEmail:this.newPhoneNumber,
      //     verificationCode: this.validateCode,
      //     type: 0,
      //     id: this.id
      //   }).then(res=>{
      //     if (res.code !== 0) {
      //       this.verifiCodeErrors = res.msg
      //       return
      //     }
      //     this.$message.info(res.msg)
      //     this.closeChangeModel()
      //     this.getCustomerInfo()
      //   })
      // },
      // timeInvertval(value) {
      //   let v = value - 1
      //   if(v <= 0){
      //     this.btnText = "重新获取"
      //     return
      //   } else {
      //     this.btnText = v + "s后重新获取"
      //   }
      //   this.timer=setTimeout(()=>{
      //     this.timeInvertval(v)
      //   },1000)
      // },
    }
  }
</script>
<style lang="less" scoped>
// .mb24{
//   margin-bottom: 24px;
// }
// .w522{
//   width: 522px;
// }
// .mr188{
//   margin-right: 188px;
// }
.company{
  color:#999;
  font-size: 14px;
}
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
.uploagwar .el-icon-circle-plus-outline {
  font-size: 1.75rem;
  color: #8c939d;
  transform: translateY(25%);
  .uploadIDCardTips {
    display: block;
    text-align: center;
    font-size: 1.125rem;
    margin-top: 0.6251rem;
    color: #333;
  }
}

</style>
<style lang='less'>
  .base-info-c{
    // .modalwrapper .close{
    //   display: none;
    // }
    // .modalwrapper .close1{
    //   padding:1rem;
    //   margin: -1rem -1rem -1rem auto;
    //   float: right;
    //   font-size: 1.5rem;
    //   font-weight: 700;
    //   line-height: 1;
    //   color: #000;
    //   text-shadow: 0 1px 0 #fff;
    //   opacity: .5;
    // }
    // .el-upload-dragger {
    //   // width: 21.4rem !important;
    //   // height: 13.5rem !important;
    //   background:#f5f5f5!important;
    //   border:none !important;
    //   img{
    //     height: 100%;
    //   }
    // }
    .upload-demo .el-upload-dragger{
      width:100% !important;
      height: 8.25rem !important;
      background:#f5f5f5!important;
      border:none !important;
      img{
        height: 100%;
        width:100%;
      }
    }
    .el-upload{
      width:100% !important;
    }
    .el-upload__tip{
      color: #c5c5c5;
    }
    .form-check-label{
      color: #999999;
    }
    .form-check-input[type="radio"]:not(:checked) + label:before,
    .form-check-input[type="radio"]:not(:checked) + label:after,
    label.btn input[type="radio"]:not(:checked) + label:before,
    label.btn input[type="radio"]:not(:checked) + label:after {
      border: 2px solid #999999;
    }
  }
</style>
