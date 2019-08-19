<template>
  <div>
    <mdb-container v-if="tabs == 3" class="forgetPassword">
      <mdb-modal>
        <mdb-tab tabs justify class="light-blue darken-3">
          <mdb-tab-item v-if="tabs == 3">
            <mdb-icon icon="user-plus" class="mr-1"/>忘记密码
          </mdb-tab-item>
        </mdb-tab>

        <mdb-modal-body class="mx-3" v-if="tabs==3">
          <mdb-input
            class="mb-5"
            label="手机号"
            icon="envelope"
            required
            aria-describedby="inputGroupPrepend"
            v-model="resetSercet.accountNum"
            ref="accountNum"
            @change="checkTel"
          />
          <div class="invalid-feedback" v-if="telErrors">{{telErrors}}</div>
          <mdb-input
            class="mb-5"
            label="验证码"
            icon="lock"
            v-model="resetSercet.verifyCode"
            @change="checkVerifyCode "
            ref="verifiCode"
            required
          />
          <div class="invalid-feedback" v-if="verifiCodeErrors">{{verifiCodeErrors}}</div>
          <span
            class="verifyCodeBtn align-bottom"
            :class="verifiCodeErrors?'verActive':'reset-verifyCondeBtn'"
            @click="sendVerifyCode(resetSercet.accountNum)"
            :disabled="isDisabled"
          >{{buttonName}}</span>
          <div class="mt-2 text-center">
            <mdb-btn color="info" icon="sign-in" iconClass="ml-1" @click="nextStep">下一步</mdb-btn>
          </div>
        </mdb-modal-body>
      </mdb-modal>
    </mdb-container>
  </div>
</template>
<script>
export default {
  name: "forgetSecret",
  components: {},
  data() {
    return {
      resetSercet: {
        accountNum: "",
        secret: "",
        verifyCode: "",
        checknewPass: ""
      }
    };
  },
  methods: {
    // 找回密码
    nextStep() {
      this.api
        .validateVeriCode({
          phoneNum: this.resetSercet.accountNum.trim(),
          verificationCode: this.resetSercet.verifyCode.trim()
        })
        .then(res => {
          if (res.code == 0) {
            this.$emit("forgetSecret", 3);
            // this.tabs = 4;
            this.verificationCod = this.resetSercet.verifyCode.trim();
            this.accountNum = this.resetSercet.accountNum.trim();
          } else if (res.code == 2) {
            this.telErrors = res.msg;
          } else {
            this.verifiCodeErrors = res.msg;
          }
        });
    },
    checkVerifyCode(value) {
      if (!value) {
        this.verifiCodeErrors = "请输入验证码";
      } else if (!/^\d{6}$/.test(value)) {
        this.verifiCodeErrors = "验证码错误";
      } else {
        this.verifiCodeErrors = "";
      }
    },
    // 验证号码
    checkTel(value) {
      if (!value) {
        this.telErrors = "请输入手机号";
      } else if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(value)) {
        this.telErrors = "请输入正确11位手机号";
      } else {
        this.telErrors = null;
      }
    },
    // 发送验证码
    sendVerifyCode(value) {
      this.isDisabled = true;
      this.interval = setInterval(() => {
        this.buttonName = this.time + "s 后重新发送";
        this.time--;
        if (this.time <= 0) {
          this.isDisabled = false;
          this.buttonName = "重新发送";
          this.time = 60;
          windown.clearInterval(this.interval);
        }
      }, 1000);

      if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(value.trim())) {
        this.telErrors = "请输入正确11位手机号";
        windown.clearInterval(interval);
        return;
      } else {
        this.api.getVerificationCode({ phoneNum: value }).then(res => {
          if (res.code == "0") {
            if (value == this.loginForm.verifyCode) {
              this.loginForm.verifyCode = res.VerificationCode;
            } else if (value == this.resetSercet.verifyCode) {
              this.resetSercet.verifyCode = res.verificationCode;
            }
          }
        });
      }
    }
  },
  mounted() {
    this.$emit("forgetSecret", this.tabs);
  }
};
</script>
