<template>
  <mdb-container fluid>
   <!-- @close="closeChangeModel" -->
    <mdb-modal 
      size="md" 
      v-if="bindPhoneEmailObj.changeEmail" 
      class="modalwrapper" 
      info
      @close="closeChangeModel"
    >
      <mdb-modal-header class="text-center" :close="false">
        <p class="heading w-100">绑定邮箱</p>
        <!-- <a class="close1"  @click="closeChangeModel">×</a> -->
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-container>
          <div v-if="bindPhoneEmailObj.step==1">
            <p>验证码将发送到{{bindPhoneEmailObj.email}}邮箱</p>
            <div class="inputWrapper">
              <!-- <mdb-input class="mb-5" label="填写验证码" v-model="validateCode"/> -->
              <div class="outline-input mt-3 mb-5">
                <mdb-input
                type="text"
                size="lg" 
                label="填写验证码"
                v-model.trim="validateCode"
                outline />
              </div>
              <div class="feedback" v-if="verifiCodeErrors">{{verifiCodeErrors}}</div>
              <span class="tag" @click="sendCodeToEmailOrPhone(bindPhoneEmailObj.email)">
                <span v-text="btnText">获取验证码</span>
              </span>
            </div>
          </div>
          <div v-else-if="bindPhoneEmailObj.step==2">
            <div class="inputWrapper">
              <!-- <mdb-input class="mb-5" label="填写新邮箱"
                @input="checkEmail"
               v-model="newEmail"/> -->
              <div class="outline-input mt-3 mb-5">
                <mdb-input
                type="text"
                size="lg" 
                @input="checkEmail"
                label="填写新邮箱"
                v-model.trim="newEmail"
                outline />
              </div>
               <div class="feedback" style="top: 3.4rem;" v-if="rightNum">{{rightNum}}</div>
              <div class="feedback" v-if="verifiCodeErrors">{{verifiCodeErrors}}</div>
              <span class="tag" @click="sendCodeToEmailOrPhone(newEmail)">
                <span v-text="btnText">获取验证码</span>
              </span>
              <!-- <mdb-input class="mb-5" label="填写验证码" v-model="validateCode"/> -->
              <div class="outline-input mt-3 mb-5">
                <mdb-input
                type="text"
                size="lg" 
                label="填写验证码"
                v-model.trim="validateCode"
                outline />
              </div>
            </div>
          </div>
        </mdb-container>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn v-if="bindPhoneEmailObj.step!=2" color="primary" @click.native="goNextStep">下一步</mdb-btn>
        <mdb-btn v-else color="primary" @click.native="bindPhoneOrEmail">确定</mdb-btn>
        <mdb-btn outline="primary" @click="closeChangeModel">取消</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <mdb-modal 
      size="md" 
      v-if="bindPhoneEmailObj.changePhone" 
      class="modalwrapper" 
      info
      @close="closeChangeModel"
      >
      <mdb-modal-header class="text-center" :close="false">
        <p class="heading w-100">绑定手机号</p>
        <!-- <a class="close1"  @click="closeChangeModel">×</a> -->
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-container>
          <div v-if="bindPhoneEmailObj.step==1">
            <p>验证码将发送到手机：{{bindPhoneEmailObj.phoneNumber}}</p>
            <div class="inputWrapper">
              <!-- <mdb-input class="mb-5" label="填写验证码" v-model="validateCode"/> -->
              <div class="outline-input mt-3 mb-5">
                <mdb-input
                type="text"
                size="lg" 
                label="填写验证码"
                v-model.trim="validateCode"
                outline />
              </div>
              <div class="feedback" v-if="verifiCodeErrors">{{verifiCodeErrors}}</div>
              <span class="tag" @click="sendCodeToEmailOrPhone(bindPhoneEmailObj.phoneNumber)">
                <span v-text="btnText">获取验证码</span>
              </span>
            </div>
          </div>
          <div v-else-if="bindPhoneEmailObj.step==2">
            <div class="inputWrapper">
              <!-- <mdb-input class="mb-5" label="填写新手机" 
              @input="checkEmail"
              v-model="newPhoneNumber"/> -->
              <div class="outline-input mt-3 mb-5">
                <mdb-input
                type="text"
                size="lg" 
                @input="checkEmail"
                label="填写新手机"
                v-model.trim="newPhoneNumber"
                outline />
              </div>
              <div class="feedback" style="top: 3.4rem;" v-if="rightNum">{{rightNum}}</div>
              <div class="feedback" v-if="verifiCodeErrors">{{verifiCodeErrors}}</div>
              <span class="tag" @click="sendCodeToEmailOrPhone(newPhoneNumber)">
                <span v-text="btnText">获取验证码</span>
              </span>
              <!-- <mdb-input class="mb-5" label="填写验证码" v-model="validateCode"/> -->
              <div class="outline-input mt-3 mb-5">
                <mdb-input
                type="text"
                size="lg" 
                label="填写验证码"
                v-model.trim="validateCode"
                outline />
              </div>
            </div>
          </div>
        </mdb-container>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn v-if="bindPhoneEmailObj.step!=2" color="primary" @click.native="goNextStep">下一步</mdb-btn>
        <mdb-btn v-else color="primary" @click.native="bindPhoneOrEmail">确定</mdb-btn>
        <mdb-btn outline="primary" @click="closeChangeModel">取消</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </mdb-container>
</template>

<script>
  import { setTimeout, clearTimeout } from "timers";

  export default {
    props:[
        'bindPhoneEmailObj'
    ],
    data() {
      return {
        validateCode: '',
        verifiCodeErrors: '',
        // hasSendCodeToEmail: false,
        // hasSendCodeToPhone: false,
        btnText: '获取验证码',
        timer: null,
        newPhoneNumber:'',
        rightNum:'',
        newEmail:'',
        type:'',
        // bindPhoneEmailObj:{
        //   email: "",
        //   step: 1,
        //   changeEmail: false,
        //   changePhone: false,
        //   phoneNumber:  '',
        // }
      }
    },
    mounted() {
      this.id = localStorage.getItem("userId") || sessionStorage.getItem("userId")
      this.type = localStorage.getItem("role") || sessionStorage.getItem("role")
    },
    methods: {
      // 邮箱校验
      checkEmail(value) {
        if(!value){
          this.rightNum = ''
          return
        }
        let val = this.bindPhoneEmailObj.changeEmail?this.newEmail:this.newPhoneNumber
        let label = this.bindPhoneEmailObj.changeEmail?"请输入邮箱":"请输入手机号"
        let labelRight = this.bindPhoneEmailObj.changeEmail?"请输入正确的邮箱":"请输入正确的手机号"
        let telReg = /^1[3|4|5|7|8][0-9]\d{8}$/
        let emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        let reg = this.bindPhoneEmailObj.changeEmail?emailReg:telReg
        if(!reg.test(val)){
          this.rightNum = labelRight
        }else{
          this.rightNum = ''
        }
      },
      // // 更改绑定邮箱
      // hasBindEmail(){
      //   this.bindPhoneEmailObj.changeEmail = true
      //   this.bindPhoneEmailObj.email = this.email
      //   this.bindPhoneEmailObj.step = 1
      // },
      // // 绑定邮箱
      // noBindEmail(){
      //   this.bindPhoneEmailObj.changeEmail = true
      //   this.bindPhoneEmailObj.step = 2
      // },
      // // 更改绑定手机号
      // hasBindPhone(){
      //   this.bindPhoneEmailObj.changePhone = true
      //   this.bindPhoneEmailObj.phoneNumber = this.phoneNumber
      //   this.bindPhoneEmailObj.step = 1
      // },
      // // 绑定手机号
      // noBindPhone(){
      //   this.bindPhoneEmailObj.changePhone = true
      //   this.bindPhoneEmailObj.step = 2
      // },
      // // 绑定成功后的回调
      // bindBack(backItem,boole){
      //   console.log(backItem,boole)
      //   if(boole){
      //     this.email = backItem.email
      //   }else{
      //     this.phoneNumber = backItem.phoneNumber
      //   }
      // },
      closeChangeModel() {
        this.bindPhoneEmailObj.changeEmail = false
        this.bindPhoneEmailObj.changePhone = false
        this.bindPhoneEmailObj.step = 1
        clearTimeout(this.timer)
        this.btnText = "获取验证码"
        this.validateCode = ''
        this.verifiCodeErrors = ''
        this.rightNum = ''
      },
      sendCodeToEmailOrPhone(emailOrPhone) {
        if(this.rightNum){
          return
        }
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
          phoneNum: this.bindPhoneEmailObj.changeEmail?this.bindPhoneEmailObj.email:this.bindPhoneEmailObj.phoneNumber,
          verificationCode: this.validateCode
        }).then(res=>{
          if (res.code == 0) {
            this.bindPhoneEmailObj.step = 2
            this.validateCode = ''
            this.btnText = "获取验证码"
            this.verifiCodeErrors = ''
          } else {
            this.verifiCodeErrors = res.msg;
          }
        })
      },
      bindPhoneOrEmail() {
        let val = this.bindPhoneEmailObj.changeEmail?this.newEmail:this.newPhoneNumber
        let label = this.bindPhoneEmailObj.changeEmail?"请输入邮箱":"请输入手机号"
        if(!val){
          this.rightNum = label
          return
        }
        if(!this.validateCode){
          this.verifiCodeErrors = "请输入验证码"
          return
        }
        this.api.bindPhoneOrEmail({
          phoneNum: val,
          verificationCode: this.validateCode,
          type: this.type,
          id: this.id
        }).then(res=>{
          if (res.code !== 0) {
            this.verifiCodeErrors = res.msg
            return
          }
          this.$message(res.msg)
          let isEmail = true
          if(this.bindPhoneEmailObj.changeEmail){
            this.bindPhoneEmailObj.email = this.newEmail
            isEmail = true
          }else{
            this.bindPhoneEmailObj.phoneNumber = this.newPhoneNumber
            isEmail = false
          }
          this.$emit('bindBack',this.bindPhoneEmailObj,isEmail)
          this.closeChangeModel()
        //   this.getDesignerInfo();
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
.inputWrapper{
  position: relative;
  .tag{
    position: absolute;
    right: 1.875rem;
    bottom: 1rem;
    font-size: .875rem;
    color: #057aff;
    text-align: right;
    z-index: 1;
    cursor: pointer;
    font-weight: 400;
    transition: .2s ease-out;
    width: auto;
  }
  .feedback {
    position: absolute;
    bottom: -1.2rem;
    color: #f44336;
    font-size: .75rem
  }
}
.modalwrapper .close1{
  padding:1rem;
  display: inline-block!important;
  margin: -1rem -1rem -1rem auto;
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: .5;
}

</style>
<style lang="less">
.modalwrapper {
  .modal-dialog {
    background:#fff; 
  }
}
</style>
