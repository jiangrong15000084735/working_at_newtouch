<template>
  <mdb-container>
    <mdb-row style="padding:15px 0;font-size: 1rem; color:#333;margin-bottom：0.875rem;">
      <mdb-col md="7" >
        更改密码
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="7">
        <div class="outline-input">
          <mdb-input 
          type="text"
          size="lg" 
          label="昵称" 
          disabled
          v-model="username"
          outline />
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="7">
        <input type="password" style="display:none;" disabled class="form-control" autocomplete="off">
        <div class="outline-input">
          <mdb-input 
          type="password"
          size="lg" 
          label="请设置新密码"
          v-model="pwd" 
          v-on:change="checkPassword"
          outline />
        </div>
        <p class="mb-2"v-if="pwdError" style="color:red;">*{{pwdError}}</p>
        <p class="mt-4" style="font-size: 0.875rem;color:red;">*请使用8到16位数字与字母组合</p>
      </mdb-col>
    </mdb-row>
     <mdb-row class="mb-4">
      <mdb-col md="7">
        <div class="outline-input">
          <mdb-input 
            type="password"
            size="lg" 
            label="确认新密码"
            v-model="repeatPwd" 
            v-on:change="comfirePassword"
            outline />
        </div>
        <p v-if="cpwdError" style="color:red;">*{{cpwdError}}</p>
      </mdb-col>
    </mdb-row>
     <mdb-row style="padding-top:2.25rem !important;">
      <mdb-col md="12" class="text-left">
          <mdb-btn color="primary" class="btn212_60" @click.native="update">更 新</mdb-btn>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        oldPwd: '',
        pwd: '',
        repeatPwd: '',
        pwdError:'',
        cpwdError:'',
        role:""
      }
    },
    mounted() {
      // this.username = this.$store.getters.userInfo.userName
      // 查询昵称
      let id = localStorage.getItem("userId") || sessionStorage.getItem("userId");
      this.role = localStorage.getItem("role") || sessionStorage.getItem("role")
      if (this.role == 1) {
        this.getDesingerDetailByDesignerId({ id: id });
      } else {
        this.getBossInfo({ id: id });
      }
    },
    methods: {
      // 通过设计师id货物设计师详情
      getDesingerDetailByDesignerId(id) {
        this.api.getInfoByDesignerIdNew(id).then(res => {
          this.$nextTick(() => {
            if (res.code !== 0) {
              return;
            }
            let { userName } = res.data
            this.username = userName?userName:"";
          });
        });
      },
      //通过客户id获取名称详情
      getBossInfo(id) {
        this.api.companyDetailNew(id).then(res => {
          if (res.code !== 0) {
            return;
          }
          let { userName } = res.data
          this.username = userName?userName:""
        });
      },
      //密码验证
      checkPassword(value){
        let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
        if(!value){
          this.pwdError = "请输入新密码"
        }else if(!pwdReg.test(value)){
          this.pwdError = "8到16位数字与字母组合"
        }else{
          this.pwdError = ""
        }
      },
      //确认
      comfirePassword(value){
        if(value.toString() !=this.pwd.toString()){
          this.cpwdError = "与新输入的密码不匹配"
        }else if(!value){
          this.cpwdError = "请确认密码"
        }else{
          this.cpwdError = ""
        }
      },
      update() {
        if(!this.pwd){
          this.$message.info("请输入新密码");
          this.pwdError = "请输入新密码"
          return
        }
        if(!this.repeatPwd){
          this.$message.info("请确认密码");
          this.cpwdError = "请确认密码"
          return
        }
        if(this.cpwdError){
          this.$message.info("请确认密码");
          this.cpwdError = "请确认密码"
          return
        }else if(this.pwdError){
          this.$message.info("请输入新密码");
          this.pwdError = "请输入新密码"
          return
        }else{
          // this.api
          // .userChgPwd({
          //   // oldPwd: this.$md5(this.oldPwd),
          //   pwd: this.$md5(this.pwd),
          //   repeatPwd: this.$md5(this.repeatPwd),
          // }).then(res => {
          //   if (res && res.msg) {
          //     this.$message.info(res.msg);
          //     // this.$notify.info({message: res.msg, globalPosition: 'top', timeOut: 100000});
          //   } else {
          //     this.$message.info("操作未完成");
          //     // this.$notify.info({message: "操作未完成", position: 'top right', timeOut: 1000});
          //   }
          // });
          this.api
          .updPassword({
            passWord: this.$md5(this.repeatPwd),
          }).then(res => {
            if (res && res.msg) {
              this.$message.info(res.msg);
            } else {
              this.$message.info("操作未完成");
            }
          });
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.mb24{
  margin-bottom: 24px;
}
.w522{
  width:522px;
}
</style>