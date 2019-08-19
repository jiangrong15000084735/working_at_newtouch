<template>
  <div class="login">
    <!-- 登陆注册 -->
    <mdb-modal centered v-if="tabs == 1 || tabs==2">
      <!-- 翻转 -->
      <mdb-flipping-card :flipped="flipped" id="flippedBox">
        <mdb-card class="face front" v-if="tabs== 1">
          <!-- 登录头部 -->
          <div class="modal-c-tabs header" v-if="tabs==1">
            <ul class="nav nav-tabs md-tabs tabs-2 light-blue darken-3" role="tablist">
              <li
                class="nav-item waves-effect waves-light"
                :class="loginType==1?'active':''"
                @click.prevent="accountLogin"
              >
                <a
                  class="nav-link show"
                  data-toggle="tab"
                  href="#"
                  role="tab"
                  aria-selected="false"
                >
                  <i class="fa fa-user mr-1"></i>登录
                </a>
              </li>
              <li
                class="nav-item waves-effect waves-light"
                :class="loginType==2?'active':''"
                @click.prevent="weixinLogin"
              >
                <a
                  class="nav-link show"
                  data-toggle="tab"
                  href="#"
                  role="tab"
                  aria-selected="false"
                >
                  <i class="fa fa-user mr-1"></i>微信登录
                </a>
              </li>
            </ul>
          </div>
          <div class="tip-error" v-if="tipError">{{tipError}}，请检查用户名和密码，再次尝试</div>
          <!-- 内容 -->
          <!-- 微信登录二维码 -->
          <mdb-modal-body v-show="flag==false">
            <div id="qrcode" ref="qrcode" class="mb-5" style="text-align:center;"></div>
          </mdb-modal-body>

          <mdb-modal-body
            class="mb-1"
            v-if="tabs==1&&flag==true"
            style="padding: 2.7rem 2rem 1rem 2rem;"
          >
            <div class="mb-5" style="margin-top:1.5rem;height:3.75rem">
              <mdb-input
                v-if="tabs==1&&flag==true"
                type="text"
                name="userAccount"
                label="手机号/邮箱"
                icon="envelope"
                required
                aria-describedby="inputGroupPrepend"
                v-model.trim="loginForm.accountNum"
                @change="loginAccount"
                class="normal"
                :class="telErrors?'wrong':''|| checked1==2?'right':''"
              />
              <div class="invalid-feedback" v-if="telErrors">{{telErrors}}</div>
            </div>
            <div class="mb-5" style="margin-top:1.5rem;height:3.75rem">
              <mdb-input
                v-if="tabs==1&&flag==true"
                name="password"
                label="密码"
                icon="lock"
                type="password"
                v-model="loginForm.secret"
                @change="loginPassword"
                @keyup.enter.native="loginBtn"
                required
                class="normal"
                :class="passwordErrors?'wrong':''|| checked2==1?'right':''"
              />
              <div class="invalid-feedback" v-if="passwordErrors">{{passwordErrors}}</div>
            </div>

            <div class="mt-2 text-center" style="margin-bottom:2rem">
              <mdb-btn
                name="submit"
                @click="loginBtn"
                color="info"
                icon="sign-in"
                class="text-center"
                style=" font-size: 1rem !important;"
              >登录&nbsp;</mdb-btn>
            </div>
          </mdb-modal-body>

          <mdb-modal-footer center>
            <div class="options text-right text-md-right">
              <p>
                没有账号?
                <a href="#" @click="register">注册</a>
              </p>
              <p>
                忘记
                <a href="#" @click="findSecret">密码</a>
              </p>
            </div>
            <mdb-btn outline="info" class="ml-auto" @click="closeFn">关 闭</mdb-btn>
          </mdb-modal-footer>
        </mdb-card>
        <!-- 注册 -->
        <mdb-card class="face back">
          <mdb-tab tabs justify class="light-blue darken-3" v-if="tabs == 2">
            <mdb-tab-item @click.native="toRegister">
              <mdb-icon icon="user-plus" class="mr-1"/>注册
            </mdb-tab-item>
          </mdb-tab>
          <mdb-modal-body class="mx-3 registerBox" v-if="tabs==2">
            <div class="register-tip-error" v-if="tipError">{{tipError}}</div>
            <div style="height:3.2rem;" v-if="tabs==2">
              <mdb-input
                label="手机号/邮箱"
                icon="envelope"
                required
                aria-describedby="inputGroupPrepend"
                v-model="registerForm.accountNum"
                ref="accountNum"
                @change="registerAccount"
                class="normal"
                :class="registerForm.telErrors?'wrong':''|| checked4==1?'right':''"
              />
              <div class="invalid-feedback" v-if="registerForm.telErrors">{{registerForm.telErrors}}</div>
              <div class="invalid-feedback" v-if="telMsg">
                该账号已注册
                <a @click="toLogin" style="color:#4285F4 !important">· 直接登录</a>
              </div>
            </div>
            <div style="height:3.2rem">
              <mdb-input
                label="验证码"
                icon="lock"
                v-model="registerForm.verifyCode"
                @change="checkVerifyCode "
                ref="verifiCode"
                required
                class="normal"
                :class="verifiCodeErrors?'wrong':''|| checked5==1?'right':''"
              />
              <div class="invalid-feedback" v-if="verifiCodeErrors">{{verifiCodeErrors}}</div>
              <span
                :class="verifiCodeErrors?'verActive':''"
                class="verifyCodeBtn align-bottom"
                @click="sendVerifyCode(registerForm.accountNum)"
                :disabled="isDisabled"
              >{{buttonName}}</span>
            </div>
            <div style="height:3.2rem">
              <mdb-input
                label="密码"
                icon="lock"
                type="password"
                v-model="registerForm.secret"
                @change="registerPassword"
                ref="password"
                @keyup.enter="loginBtn"
                required
                class="normal"
                :class="registerForm.passwordErrors?'wrong':''|| checked6==1?'right':''"
              />
              <div
                class="invalid-feedback"
                v-if="registerForm.passwordErrors"
              >{{registerForm.passwordErrors}}</div>
            </div>
            <div style="height:3.2rem">
              <mdb-input
                label="再次输入密码"
                icon="lock"
                type="password"
                v-model="registerForm.confirmSecret"
                @change="registerConfirmPass"
                ref="password"
                @keyup.enter="loginBtn"
                required
                class="normal"
                :class="registerForm.confirmPassErrors?'wrong':''|| checked12==1?'right':''"
              />
              <div
                class="invalid-feedback"
                v-if="registerForm.confirmPassErrors"
              >{{registerForm.confirmPassErrors}}</div>
            </div>
            <mdb-container
              icon="user"
              style="margin-left:1.5rem"
              :class="selectErrors?'wrong':''|| checked5==1?'right':''"
            >
              <mdb-select @getValue="getSelectValue" :options="basicOptions"/>
            </mdb-container>
            <div class="invalid-feedback" v-if="selectErrors">{{selectErrors}}</div>
            <mdb-col class="mx-0 px-0 text-center">
              <!-- <mdb-input
                ref="checkbox"
                type="checkbox"
                id="checkbox1"
                label="我已阅读并接受"
                labelClass="font-small"
                wrapperClass="pl-0"
                v-model="isChecked"
                style="margin-left:2.6rem"
                v-on:change="handleCheckboxChange"
              > -->
              <!-- <mdb-input
                ref="checkbox"
                type="checkbox"
                id="checkbox1"
                label="我已阅读并接受"
                labelClass="font-small"
                wrapperClass="pl-0"
                v-model="isChecked"
                v-on:change="handleCheckboxChange"
              >
                <a
                  href="#"
                  @click="showNegotiate"
                  class="font-weight-bold font-small"
                  style="display: inline-block;
                    height: 1.5625rem;
                    line-height: 1.5625rem;
                    margin-left: -3rem;
                    top: 0.65rem;
                    position: absolute;"
                >《用户协议》</a>
              </mdb-input> -->
              <div>
                <div class="form-check" style="display: inline-block;vertical-align: middle;">
                  <input 
                    type="checkbox" 
                    class="form-check-input" 
                    id="checkbox1"
                    v-model="isChecked"
                    value="1"
                    @change.native="handleCheckboxChange"
                    >
                  <label class="form-check-label" for="checkbox1"></label>
                </div><a class="argeement"
                  @click="showNegotiate"
                  style="display: inline-block;height: 1.5625rem;line-height: 1.5625rem;text-decoration:underline;"
                  >我已阅读并接受《用户协议》</a>
              </div>
              <div
                class="invalid-feedback text-center mx-0"
                v-if="userNegotiate"
                style="margin-top:0.1rem"
              >{{userNegotiate}}</div>
            </mdb-col>
            <div class="mt-2 text-center">
              <!-- basicOptions -->
              <mdb-btn @click="registerBtn" color="info" :disabled="isRegisterSuccess">注册</mdb-btn>
            </div>
          </mdb-modal-body>

          <mdb-modal-footer center v-if="tabs==2">
            <div class="options text-center text-md-right registerFooter">
              <p style="text-align:left">
                已有帐号?
                <a href="#" @click="toLogin">登陆</a>
              </p>
            </div>
            <mdb-btn outline="info" class="ml-auto" @click="closeFn">关 闭</mdb-btn>
          </mdb-modal-footer>
        </mdb-card>
      </mdb-flipping-card>
    </mdb-modal>

    <!-- 忘记密码 -->
    <mdb-modal centered v-if="tabs == 3" class="forgetPassword">
      <mdb-tab tabs justify class="light-blue darken-3">
        <mdb-tab-item v-if="tabs == 3">
          <mdb-icon icon="user-plus" class="mr-1"/>忘记密码
        </mdb-tab-item>
      </mdb-tab>

      <mdb-modal-body class="mx-3" v-if="tabs==3" style="margin-top:1.5rem">
        <div class="mb-5" style="height:3.75rem">
          <mdb-input
            label="手机号/邮箱"
            icon="envelope"
            required
            aria-describedby="inputGroupPrepend"
            v-model="resetSercet.accountNum"
            ref="accountNum"
            @change="resetSercetAccount"
            class="normal"
            :class="resetSercet.telErrors?'wrong':''|| checked7==1?'right':''"
          />
          <div class="invalid-feedback" v-if="resetSercet.telErrors">{{resetSercet.telErrors}}</div>
        </div>
        <div class="mb-5" style="height:3.75rem">
          <mdb-input
            label="验证码"
            icon="lock"
            v-model="resetSercet.verifyCode"
            @change="checkVerifyCode "
            ref="verifiCode"
            required
            class="normal"
            :class="verifiCodeErrors?'wrong':''|| checked8==1?'right':''"
          />
          <div class="invalid-feedback" v-if="verifiCodeErrors">{{verifiCodeErrors}}</div>
          <span
            class="verifyCodeBtn align-bottom"
            :class="verifiCodeErrors?'verActive':'reset-verifyCondeBtn'"
            @click="sendVerifyCode(resetSercet.accountNum)"
            :disabled="isDisabled"
          >{{buttonName}}</span>
        </div>
        <div class="mt-2 text-center" style="margin-bottom:2rem">
          <mdb-btn color="info" icon="sign-in" iconClass="ml-1" @click="nextStep">下一步</mdb-btn>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <div class="options text-center text-md-right">
          <p style="text-align:left">
            已有帐号?
            <a href="#" @click="toLogin">登陆</a>
          </p>
          <p>
            没有账号?
            <a href="#" @click="register">注册</a>
          </p>
        </div>
        <mdb-btn outline="info" class="ml-auto" @click="closeFn">关 闭</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <!-- 重置密码 -->
    <mdb-modal centered class="resetPassword" v-if="tabs == 4">
      <mdb-tab tabs justify class="light-blue darken-3">
        <mdb-tab-item v-if="tabs == 4">
          <mdb-icon icon="user-plus" class="mr-1"/>找回密码
        </mdb-tab-item>
      </mdb-tab>
      <mdb-modal-body v-if="tabs==4" style="margin-top:1.5rem">
        <div class="mb-5" style="height:3.75rem">
          <mdb-input
            label="输入新密码"
            icon="lock"
            type="password"
            v-model="resetSercet.secret"
            @change="resetPassword"
            required
            class="normal"
            :class="resetSercet.passwordErrors?'wrong':''|| checked9==1?'right':''"
          />
          <div
            class="invalid-feedback"
            v-if="resetSercet.passwordErrors"
          >{{resetSercet.passwordErrors}}</div>
        </div>
        <div class="mb-5" style="height:3.75rem">
          <mdb-input
            label="输入新密码"
            icon="lock"
            type="password"
            v-model="resetSercet.checknewPass"
            @change="checknewPass"
            required
            class="normal"
            :class="checknewPassErrors?'wrong':''|| checked10==1?'right':''"
          />
          <div class="invalid-feedback" v-if="checknewPassErrors">{{checknewPassErrors}}</div>
        </div>
        <div class="mt-2 text-center" style="margin-bottom:2rem">
          <mdb-btn color="info" icon="sign-in" iconClass="ml-1" @click="submit">确定</mdb-btn>
          <mdb-btn color="info" icon="sign-in" iconClass="ml-1" @click="cancel">取消</mdb-btn>
        </div>
      </mdb-modal-body>
    </mdb-modal>

    <!-- 密码输错超过5次 -->
    <mdb-modal centered v-if="tabs == 5" class="passwordTimes">
      <mdb-tab tabs justify class="light-blue darken-3">
        <mdb-tab-item v-if="tabs == 5">
          <mdb-icon icon="user-plus" class="mr-1"/>合筑
        </mdb-tab-item>
      </mdb-tab>

      <mdb-modal-body class="mx-3" v-if="tabs==5" style="margin-top:1.5rem">
        <!-- 第一步 -->
        <div class="first-tep" v-if="passwordIndex == 0">
          <div class="help-title">密码帮助</div>
          <div class="help">输入与您的合筑账户相关联的电子邮件地址或手机号码。</div>
          <div class="mb-5" style="height:3.75rem">
            <mdb-input
              label="手机号/邮箱"
              icon="envelope"
              required
              aria-describedby="inputGroupPrepend"
              v-model.trim="resetSercet.accountNum"
              ref="accountNum"
              @change="resetSercetAccount"
              class="normal"
              :class="resetSercet.telErrors?'wrong':''|| checked7==1?'right':''"
            />
            <div class="invalid-feedback" v-if="resetSercet.telErrors">{{resetSercet.telErrors}}</div>
          </div>
          <div class="mt-2 text-center" style="margin-bottom:2rem">
            <mdb-btn color="info" icon="sign-in" iconClass="ml-1" @click="_firstStep">继续</mdb-btn>
          </div>
          <div class="desc1">您是否修改过邮箱地址或手机号码？</div>
          <div class="desc2">如果您不再使用与您的 合筑 账户相关联的电子邮件地址，您可以联系客户服务部，帮助您恢复账户访问。</div>
        </div>
        <!-- 第二步 -->
        <div class="second-step" v-if="passwordIndex == 1">
          <div class="help2">您希望怎样登录？</div>
          <div class="mt-5 mb-5" style="height:3.75rem">
            <div class="help-options">
              <div class="custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="tempLogin1" v-model="tempLogin" value="1" name="groupOfDefaultRadios" checked>
                <label class="custom-control-label" for="tempLogin1">设置新密码</label>
              </div>
              <div class="custom-control custom-radio">
                <input type="radio" class="custom-control-input" id="tempLogin2" v-model="tempLogin" value="2" name="groupOfDefaultRadios">
                <label class="custom-control-label" for="tempLogin2">使用临时代码登录。跳过重置密码步骤。</label>
              </div>
            </div>
          </div>
          <div class="mt-2 text-center" style="margin-bottom:2rem">
            <mdb-btn color="info" icon="sign-in" iconClass="ml-1" @click="_secondStep">继续</mdb-btn>
          </div>
        </div>
        <!-- 第三步 -->
        <div class="third-step" v-if="passwordIndex == 2">
          <div class="help-title">正在验证您的身份</div>
          <div class="help">为了您的安全，我们需要验证您的身份。 我们已向 <span v-if="accountType == 1">手机号码</span><span v-if="accountType == 2">邮箱</span> <span>{{resetSercet.accountNum}}</span> 发送了验证码。 请在下面输入。</div>
          <div class="mt-5 mb-5" style="height:3.75rem">
            <mdb-input
              label="验证码"
              icon="lock"
              v-model="resetSercet.verifyCode"
              @change="checkVerifyCode "
              ref="verifiCode"
              required
              class="normal"
              :class="verifiCodeErrors?'wrong':''|| checked8==1?'right':''"
            />
            <div class="invalid-feedback" v-if="verifiCodeErrors">{{verifiCodeErrors}}</div>
            <span
              class="verifyCodeBtn align-bottom"
              :class="verifiCodeErrors?'verActive':'reset-verifyCondeBtn'"
              @click="sendVerifyCode(resetSercet.accountNum)"
              :disabled="isDisabled"
            >{{buttonName}}</span>
          </div>
          <div class="mt-2 text-center" style="margin-bottom:2rem">
            <mdb-btn color="info" icon="sign-in" iconClass="ml-1" @click="_thirdStep">继续</mdb-btn>
          </div>
        </div>
        <!-- 第四步 -->
        <div class="fourth-step" v-if="passwordIndex == 3">
          <div class="help-title">感谢您</div>
          <div class="help3">我们还有一个安全问题。</div>
          <div class="help4">请输入与您账户关联的用户名</div>
          <div class="mt-5 mb-5" style="height:3.75rem">
            <mdb-input
              label="用户名"
              icon="user"
              required
              aria-describedby="inputGroupPrepend"
              v-model.trim="resetSercet.userName"
              ref="userName"
              @change="resetSercetUserName"
              class="normal"
              :class="resetSercet.telErrors?'wrong':''|| checked7==1?'right':''"
            />
            <div class="invalid-feedback" v-if="resetSercet.telErrors">{{resetSercet.telErrors}}</div>
          </div>
          <div class="mt-2 text-center" style="margin-bottom:2rem">
            <mdb-btn color="info" icon="sign-in" iconClass="ml-1" @click="_fourthStep">继续</mdb-btn>
          </div>
          <div class="contact">
            <div class="contact1" @click="contact = !contact"><mdb-icon icon="caret-right" :class="{'arrow': contact == true}" /><span>不知道答案？</span></div>
            <div class="contact2" v-show="contact">联系方式 <a href="#/onlineService">合筑客户服务</a></div>
          </div>
        </div>
        <!-- 第五步 -->
        <div class="fifth-step" v-if="passwordIndex == 4">
          <div class="help-title">创建新密码</div>
          <div class="help">您在每次登录时，都需要提供此密码。</div>
          <div class="mb-2" style="height:3.75rem">
            <mdb-input
              label="输入新密码"
              icon="lock"
              type="password"
              v-model.trim="resetSercet.secret"
              @change="resetPassword"
              required
              class="normal"
              :class="resetSercet.passwordErrors?'wrong':''|| checked9==1?'right':''"
            />
            <div
              class="invalid-feedback"
              v-if="resetSercet.passwordErrors"
            >{{resetSercet.passwordErrors}}</div>
          </div>
          <div class="mb-2" style="height:3.75rem">
            <mdb-input
              label="再次输入新密码"
              icon="lock"
              type="password"
              v-model.trim="resetSercet.checknewPass"
              autocomplete="off"
              @change="checknewPass"
              required
              class="normal"
              :class="checknewPassErrors?'wrong':''|| checked10==1?'right':''"
            />
            <div class="invalid-feedback" v-if="checknewPassErrors">{{checknewPassErrors}}</div>
          </div>
          <div class="mt-2 text-center" style="margin-bottom:1rem">
            <mdb-btn color="info" icon="sign-in" iconClass="ml-1" @click="_fifthStep">保存更改</mdb-btn>
            <mdb-btn color="info" icon="sign-in" iconClass="ml-1" @click="_skipSecret">跳过</mdb-btn>
          </div>
        </div>
      </mdb-modal-body>
      
      <mdb-modal-footer center>
        <mdb-btn outline="info" class="ml-auto" @click="closeFn">关 闭</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <!-- 用户协议 -->
    <mdb-modal centered v-if="showModal14" @close="showModal14 = false" info>
      <mdb-modal-header center>
        <p class="heading" style="width:100%;text-align:center;">用户协议</p>
      </mdb-modal-header>
      <mdb-modal-body style="background:#fff;">
        <UserAgreementC v-if="activeType == 0"></UserAgreementC>
        <UserAgreementR v-if="activeType == 1"></UserAgreementR>
      </mdb-modal-body>
      <mdb-modal-footer style="background:#fff;" center>
        <mdb-btn color="primary" @click.native="accept">我已阅读并接受</mdb-btn>
        <mdb-btn outline="primary" @click.native="noAccept">不接受</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <registerSuccess :isShowmodal="isShowmodal" @modalClose="modalClose"></registerSuccess>
  </div>
</template>
 

<script>
import weixinLogin from "@/views/home/weiXinLogin.vue";
import { setInterval, clearInterval, setTimeout, clearTimeout } from "timers";
import { mdbFlippingCard, mdbCard, waves } from "mdbvue";
import { outside } from "semver";
import { required } from "vuelidate/lib/validators";
//import QRCode from "qrcode";
import registerSuccess from "./registerSuccessNew.vue";
import QRCode from "qrcodejs2";
import { qrcanvas } from "qrcanvas";
import { encode } from "punycode";
import { mapMutations, mapGetters } from "vuex";
import UserAgreementC from '@/components/agreement/userAgreementC'
import UserAgreementR from '@/components/agreement/userAgreementR'
export default {
  name: "login",
  mixins: [waves],
  components: {
    weixinLogin,
    mdbCard,
    mdbFlippingCard,
    registerSuccess,
    QRCode: QRCode,
    UserAgreementC,
    UserAgreementR
  },
  computed: {
    ...mapGetters([
      // 获取登陆状态
      "getIsLogin",
      // 获取是否需要刷新页面
      "getIsRefresh"
    ])
  },
  // props:{
  //   // 是否是头部调用
  //   loginPage:{
  //     type: Number,
  //     default: 1
  //   }
  // },
  data() {
    return {
      tipError: "",
      codes: "",
      url:
        "https://open.weixin.qq.com/connect/qrconnect?appid=wxe19e3e2415e89353&redirect_uri=https://www.coolarch.net/Mingzhu/wechat/callBack&response_type=code&scope=snsapi_login&state=1211111&connect_redirect=1#wechat_redirect",
      isShowmodal: false,
      isRegisterSuccess: false,
      userDetial: null,
      checkVal: 0,
      loginType: 1,
      checked1: 0,
      checked2: 0,
      checked4: 0,
      checked5: 0,
      checked6: 0,
      checked7: 0,
      checked8: 0,
      checked9: 0,
      checked10: 0,
      checked11: 0,
      checked12: 0,
      interval: null,
      state: null,
      userNegotiate: "",
      selectErrors: "",
      activeType: "",
      telMsg: "",
      showModal14: false,
      buttonName: "获取验证码",
      isDisabled: false,
      time: 60,
      flipped: false,
      tabs: 0,
      isChecked: 0,
      checked: false,
      flag: true,
      telErrors: "",
      passwordErrors: "",
      verifiCodeErrors: "",
      checknewPassErrors: "",
      loginForm: {
        //登陆
        accountNum: "",
        secret: ""
      },
      registerForm: {
        //注册
        accountNum: "",
        secret: "",
        confirmSecret: "",
        verifyCode: "",
        telErrors: "",
        passwordErrors: "",
        confirmPassErrors: "",
        userName: ""
      },
      resetSercet: {
        //忘记密码
        accountNum: "",
        secret: "",
        verifyCode: "",
        checknewPass: "",
        telErrors: "",
        passwordErrors: "",
        newPassErrors: ""
      },
      userInfo: {},
      accountNum: "",
      verificationCod: "",
      noShadow: false,
      basicOptions: [
        { text: "选择身份", value: null, disabled: true, selected: true },
        { text: "我是客户", value: "0" },
        { text: "我是建筑师", value: "1" }
      ],

      openId: "",
      // 密码帮助索引
      passwordIndex: 0,
      // 选择密码1 或者 临时登陆2
      tempLogin: 1,
      // 账户类型1、电话号码 2、邮箱
      accountType: 1,
      // 联系方式
      contact: false,
      // 混淆字符串长度
      passLength: 15
    };
  },
  // watch:{
  //   checked(value){
  //     this.checked = value;
  //   }
  // },
  methods: {
    // 设置登陆状态
    ...mapMutations(["setIsLogin"]),
    accountLogin() {
      this.loginType = 1;
      this.flag = true;
    },

    weixinLogin() {
      this.loginType = 2;
      this.flag = false;
      this.getQart();
      // var scope = "snsapi_base";
      // var auth_url =
      //   "https://open.weixin.qq.com/connect/qrconnect?appid=" +
      //   "wxe19e3e2415e89353" +
      //   "&redirect_uri=" +
      //   "http://www.coolarch.net/Mingzhu/wechat/callBack" +
      //   "&response_type=code&scope=" +
      //   "snsapi_login" +
      //   "&state=1211111" +
      //   "&connect_redirect=1#wechat_redirect";
      // encodeURIComponent(auth_url);
      // window.location.href = auth_url;
    },
    toRegister() {
      this.tabs = 2;
      this.checkedAccount = 3;
      localStorage.clear();
      sessionStorage.clear();
    },
    checkForm(event) {
      event.preventDefault();
      event.target.classList.add("was-validated");
    },
    getSelectValue(val) {
      this.activeType = val;
      if(this.activeType){
        this.tipError = "";
      }
      this.$store.commit("setActiveType", this.activeType);
      this.selectErrors = "";
      this.checked11 = 1;
    },
    register() {
      // 解决登陆框模糊问题，模糊问题是由于css3属性造成的
      let flippedBox = document.getElementById('flippedBox');
      if (flippedBox) {
        flippedBox.classList.add('active');
        let timerId = setTimeout(() => {
          flippedBox.classList.remove('active');
          clearTimeout(timerId);
        }, 500);
      }
      this.flipped = true;
      this.tabs = 2;
      if (this.interval) {
        window.clearInterval(this.interval);
        this.buttonName = "获取验证码";
        this.time = 60;
      }
    },
    closeFn() {
      this.flipped = false;
      this.tabs = 0;
      this.selectErrors = null;
      this.userNegotiate = null;
      this.verifiCodeErrors = null;
      this.telErrors = null;
      this.tipError = '';
      this.passwordErrors = null;
      this.registerForm.accountNum = "";
      this.registerForm.telErrors = null;
      this.registerForm.passwordErrors = null;
      this.registerForm.verifyCode = "";
      this.registerForm.secret = ""; 
      this.registerForm.confirmSecret = "";

      this.loginForm.accountNum = "";
      this.loginForm.secret = "";

      this.resetSercet.accountNum = "";
      this.resetSercet.telErrors = null;
      this.resetSercet.userName = "";
      this.resetSercet.verifyCode = "";
      this.resetSercet.secret = "";
      this.resetSercet.checknewPass = "";
      this.resetSercet.passwordErrors = "";
      this.checknewPassErrors = "";
      this.passwordIndex = 0;
      this.tempLogin = 1;
      //返回401 重新登陆
      // this.$store.commit("setReLogin",-1);
    },
    toLogin() {
      // 解决登陆框模糊问题，模糊问题是由于css3属性造成的
      let flippedBox = document.getElementById('flippedBox');
      if (flippedBox) {
        flippedBox.classList.add('active');
        let timerId = setTimeout(() => {
          flippedBox.classList.remove('active');
          clearTimeout(timerId);
        }, 500);
      }
      this.flipped = false;
      this.tabs = 1;
      this.selectErrors = null;
      this.userNegotiate = null;
      this.verifiCodeErrors = null;
      this.flag = true;
      this.loginType = 1;
      this.tipError = null;
    },
    // 查看用户协议
    showNegotiate() {
      if(this.activeType){
        this.showModal14 = true;
      }else{
        this.tipError = "请选择身份"
      }
    },
    accept() {
      // this.$refs.checkbox.innerChecked = true;
      this.showModal14 = false;
      this.checked = true;
      this.isChecked = 1;
    },
    noAccept() {
      // this.$refs.checkbox.innerChecked = false;
      this.showModal14 = false;
      this.checked = false;
      this.isChecked = 0;
    },
    handleCheckboxChange(value) {
     
      if (this.isChecked==1) {
        this.accept();
      } else {
        this.noAccept();
      }
    },
    findSecret() {
      this.tabs = 3;
      this.tipError = null;
      if (this.interval) {
        window.clearInterval(this.interval);
        this.buttonName = "获取验证码";
        this.time = 60;
      }
    },
    //  登录验证
    loginBtn() {
      if (this.loginForm.accountNum.length == 0) {
        this.telErrors = "请输入账号";
        return;
      }
      if (
        !/^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,16})$/.test(
          this.loginForm.secret.trim()
        )
      ) {
        this.passwordErrors = "请输入正确密码";
        return;
      }
      this.login();
      this.checked1 = 3;

      console.log("enter");
    },
    //获取密码&账号 自动登录
    autoLogin() {
      // 混淆字符串长度
      let passLength = this.passLength;
      if (
        !sessionStorage.getItem("isLogin") &&
        localStorage.getItem("uk_unique") &&
        localStorage.getItem("accountNum")
      ) {
        // 获取存储的账户名
        this.loginForm.accountNum = localStorage.getItem("accountNum");
        // 获取存储混淆的密码
        let uk_unique = JSON.parse(localStorage.getItem("uk_unique"));
        // 获取加密密码字符串
        let saveSecret = "";
        saveSecret = uk_unique.client_ip + uk_unique.server + uk_unique.card_import + uk_unique.debug + uk_unique.tip_message;
        // 获取真实密码
        let loginFormSecret = saveSecret.substring(passLength, saveSecret.length);
        this.loginForm.secret = loginFormSecret;
        // 打开浏览器自动登陆
        this.login(true);
      }
    },
    // 登录
    login(flag) {
      let _this = this;
      let passWord = "";
      // flag为true，密码已经加密过了
      if (flag) {
        passWord = this.loginForm.secret;
        } else {
        passWord = this.$md5(this.loginForm.secret);
      }
      this.api
        .login({
          phoneNumber: this.loginForm.accountNum,
          // passWord: this.$md5(this.loginForm.secret),
          passWord: passWord,
          openId: this.openId
        })
        .then(res => {
          if (res.code == 1) {
            // this.$message({
            //   showClose: true,
            //   message: res.msg
            // });
            // 错误清空密码
            this.loginForm.secret = "";
            this.tipError = res.msg;
            // 输错5次直接去重置密码
            if (res.msg == '该账号密码错误超过5次') {
              this.tabs = 5;
              // 用户名赋值给重置密码页面
              this.resetSercet.accountNum = this.loginForm.accountNum;
            }
          } else if (res.code == 2) {
            this.tabs = 1;
            // this.$message("第一次绑定微信，请注册或者登陆");
            this.tipError = "第一次绑定微信，请注册或者登陆";
          } else {
            this.tipError = '';
            let userId = res.data.userId;
            let role = res.data.role;
            this.quaryData(userId, role, flag);
          }
        });
    },
    // 验证码登录
    codeLogin() {
      this.api
        .loginCode({
          phoneNumber: this.resetSercet.accountNum.trim(),
          code: this.resetSercet.verifyCode.trim()
        })
        .then(res => {
          if (res.code == 1) {
            this.tipError = res.msg;
            // 输错5次直接去重置密码
            if (res.msg == '该账号密码错误超过5次') {
              this.tabs = 5;
            }
          } else if (res.code == 2) {
            this.tabs = 1;
            // this.$message("第一次绑定微信，请注册或者登陆");
            this.tipError = "第一次绑定微信，请注册或者登陆";
          } else if (res.code == 0){
            this.tipError = '';
            let userId = res.data.userId;
            let role = res.data.role;
            this.quaryData(userId, role);
          }
        });
    },
    //根据userId 去查用户信息
    quaryData(userId, role, flag) {
      let _this = this;
      if (role == "0") {
        //需求方登录
        this.api
          .bossloginInfo({
            id: userId
          })
          .then(res => {
            if (res.code == 1) return;
            this.userInfo = res.data;
            // 需求方头像用 imageUrl
            this.userInfo.head = res.data.imageUrl;
            // 设置登陆状态
            this.setIsLogin(true);
            this.save(userId, role, flag);
            // 关闭登陆框
            this.closeFn();
            // 获取是否需要刷新页面
            if (this.getIsRefresh) {
              this.$router.go(0);
            } else {
              // 向父组件header传值
              this.$emit('loginVisible', false);
            }

            // this.$store.commit("setReLogin",-1);
            // this.$router.push({ path: "/homePage" })
            // 超时登出登录&直接登录跳转的页面
            // if (this.$route.query.redirect == location.hostname) {
            //   this.$router.go(-1);
            // } else {
            //   this.$router.go(0);
            // }
          });
      } else {
        // 设计师登录
        this.api
          .designerloginInfo({
            designerid: userId
          })
          .then(res => {
            if (res.code == 1) return;
            this.userInfo = res.data;
            // 设置登陆状态
            this.setIsLogin(true);
            this.save(userId, role, flag);
            // 关闭登陆框
            this.closeFn();
            // 获取是否需要刷新页面
            if (this.getIsRefresh) {
              this.$router.go(0);
            } else {
              // 向父组件header传值
              this.$emit('loginVisible', false);
            }

            // if (this.$route.query.redirect == location.hostname) {
            //   this.$router.go(-1);
            // } else {
            //   this.$router.go(0);
            // }
          });
      }
    },
    // 注册
    registerBtn() {
      if (this.registerForm.accountNum.length == 0) {
        this.registerForm.telErrors = "请输入账号";
        return;
      }

      if (this.registerForm.verifyCode.length == 0) {
        this.verifiCodeErrors = "请输入验证码";
        return;
      }
      if (!/^\d{6}$/.test(this.registerForm.verifyCode)) {
        this.verifiCodeErrors = "验证码错误";
        return;
      }

      if (this.registerForm.secret.length == 0) {
        this.registerForm.passwordErrors = "请输入密码";
        return;
      }

      if (this.registerForm.confirmSecret.length == 0) {
        this.registerForm.confirmPassErrors = "请再次输入密码";
        return;
      }

      if (
        !/^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,16})$/.test(this.registerForm.secret)
      ) {
        this.registerForm.passwordErrors = "请输入正确密码";
        this.registerForm.passwordErrors = "8到16位数字与字母组合";
        return;
      }

      if (
        !/^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,16})$/.test(this.registerForm.confirmSecret)
      ) {
        this.registerForm.confirmPassErrors = "请输入正确密码";
        this.registerForm.confirmPassErrors = "8到16位数字与字母组合";
        return;
      }

      if (this.registerForm.secret !== this.registerForm.confirmSecret) {
        this.registerForm.confirmPassErrors = "两次输入的密码不一致";
        return false;
      }


      for (var i in this.basicOptions) {
        if (this.basicOptions[0].selected == true) {
          this.selectErrors = "请选择注册身份";
          return;
        }
      }

      // if (this.$refs.checkbox.innerChecked != true) {
      //   this.userNegotiate = "请确认接受用户协议";
      //   return;
      // }
      if ( this.isChecked != 1) {
        this.userNegotiate = "请确认接受用户协议";
        return;
      }
      
      this.selectType();
      this.isRegisterSuccess = true;
      // 客户是0，设计师是1
      if (this.$store.state.activeType == 0) {
        this.api
          .customerRegister({
            phoneNum: this.registerForm.accountNum,
            password: this.$md5(this.registerForm.secret),
            verificationCode: this.registerForm.verifyCode,
            openId: this.openId
          })
          .then(res => {
            switch (res.code) {
              case 1:
                this.telMsg = res.msg;
                // this.$message(res.msg);
                this.tipError = res.msg;
                break;
              case 2:
                this.verifiCodeErrors = res.msg;
                // this.$message(res.msg);
                this.tipError = res.msg;
                break;
              case 0:
                // 设置登陆状态
                this.setIsLogin(true);
                // this.$message(res.msg);
                this.tipError = res.msg;
                this.userDetial = res.data;
                this.resetInfo(this.userDetial);
                this.tabs = 0;
                this.isShowmodal = true;
                // this.$router.push("/registerSuccess");
                break;
            }
            this.isRegisterSuccess = false;
          });
        return;
      } else {
        this.api
          .designerRegister({
            phoneNum: this.registerForm.accountNum,
            password: this.$md5(this.registerForm.secret),
            verificationCode: this.registerForm.verifyCode,
            openId: this.openId
          })
          .then(res => {
            switch (res.code) {
              case 1:
                this.telMsg = res.msg;
                // this.$message(res.msg);
                this.tipError = res.msg;
                break;
              case 2:
                this.verifiCodeErrors = res.msg;
                // this.$message(res.msg);
                this.tipError = res.msg;
                break;
              case 0:
                // 设置登陆状态
                this.setIsLogin(true);
                // this.resetInfo(res.data);
                // this.$router.push("/registerSuccess");
                // this.$message(res.msg);
                this.tipError = res.msg;
                this.userDetial = res.data;
                this.resetInfo(this.userDetial);
                this.tabs = 0;
                this.isShowmodal = true;
                break;
            }
            this.isRegisterSuccess = false;
          });
      }
    },
    resetInfo(data) {
      //注册后就算是登录成功，保存注册信息
      let userInfo = {};
      if (data.bossSerial) {
        userInfo.bossSerial = data.bossSerial;
      }
      if (data.designerSerial) {
        userInfo.designerSerial = data.designerSerial;
      }
      userInfo.id = data.userId;
      userInfo.phoneNumber = this.loginForm.accountNum;
      userInfo.auditState = data.auditState
      this.$store.commit("SetAuditState",userInfo.auditState?userInfo.auditState:0) // 记录登陆状态
      //先清除
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem("accountNum", this.loginForm.accountNum);
      // localStorage.setItem("uk_unique", this.loginForm.secret);
      // 加密密码并存储
      this.encryption();
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // 存储登陆状态
      localStorage.setItem("isLogin", this.getIsLogin);
      localStorage.setItem("userId", userInfo.id);
      localStorage.setItem("role", data.role);
      localStorage.setItem("loginType", 1);
      sessionStorage.setItem("loginType", 1);

      //存储 userInfo和role
      this.$store.commit("setUser", userInfo);
      this.$store.commit("setRole", data.role);

      // 获取是否需要刷新页面
      if (this.getIsRefresh) {
        this.$router.go(0);
      } else {
        // 向父组件header传值
        this.$emit('loginVisible', false);
      }
    },
    // 找回密码
    nextStep() {
      if (this.resetSercet.accountNum.length == 0) {
        this.resetSercet.telErrors = "请输入账号";
        return;
      }
      this.api
        .validateVeriCode({
          phoneNum: this.resetSercet.accountNum.trim(),
          verificationCode: this.resetSercet.verifyCode.trim()
        })
        .then(res => {
          if (res.code == 0) {
            this.tabs = 4;
            this.resetSercet.passwordErrors = "";
            this.verificationCod = this.resetSercet.verifyCode.trim();
            this.accountNum = this.resetSercet.accountNum.trim();
          } else if (res.code == 2) {
            this.resetSercet.telErrors = res.msg;
          } else {
            this.verifiCodeErrors = res.msg;
          }
        });
    },
    // 密码帮助第一步
    _firstStep() {
      let account = this.resetSercet.accountNum;
      if (account.length == 0) {
        this.resetSercet.telErrors = "请输入账号";
        // this.checkTel(this.resetSercet.accountNum);
        return;
      }
      var telReg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      var emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

      if (!account) {
        this.telErrors = "请输入账号";
        return false;
      } else if (!telReg.test(account) && !emailReg.test(String(account))) {
        // this.telErrors = "请输入正确账号";
        this.telErrors = "请输入正确手机号码或电子邮箱地址";
        return false;
      } else {
        this.telErrors = null;
      }

      this.passwordIndex = 1;
    },
    // 密码帮助第二步
    _secondStep() {
      let account = this.resetSercet.accountNum;
      if (account.indexOf("@") > -1) {
        this.accountType = 2;
      } else {
        this.accountType = 1;
      }
      console.log(this.tempLogin)
      // 发送验证码
      this.sendVerifyCode(this.resetSercet.accountNum);
      this.passwordIndex = 2;
    },
    // 密码帮助第三步
    _thirdStep() {
      if (!this.resetSercet.verifyCode) {
        this.verifiCodeErrors = "请输入验证码";
        return false;
      }
      // 校验验证码
      this.api
        .validateVeriCode({
          phoneNum: this.resetSercet.accountNum.trim(),
          verificationCode: this.resetSercet.verifyCode.trim()
        })
        .then(res => {
          if (res.code == 0) {
            // 成功后到下一步
            this.passwordIndex = 3;
            // this.resetSercet.passwordErrors = "";
            // this.verificationCod = this.resetSercet.verifyCode.trim();
            // this.accountNum = this.resetSercet.accountNum.trim();
          } else if (res.code == 2) {
            // this.resetSercet.telErrors = res.msg;
            this.verifiCodeErrors = res.msg;
          } else {
            this.verifiCodeErrors = res.msg;
          }
        });
    },
    // 密码帮助第四步
    _fourthStep() {
      if (!this.resetSercet.userName) {
        this.resetSercet.telErrors = "请输入关联用户名";
        return false;
      }
      this.resetSercet.telErrors = "";
      // 关联账号
      // this._relateAccount();
      // 不校验关联用户名直接下一步
      if (this.tempLogin == 1) { // 设置密码
        this.passwordIndex = 4;
        console.log('checknewPass', this.resetSercet.checknewPass);
      } else { 
        // 验证码直接登陆
        this.codeLogin()
      }
    },
    // 密码帮助第五步
    _fifthStep() {
      // 重置密码
      if (this.resetSercet.secret.length == 0) {
        this.resetSercet.passwordErrors = "请输入密码";
        return false;
      }
      if (this.resetSercet.checknewPass.length == 0) {
        this.checknewPassErrors = "请再次输入密码";
        return false;
      }
      if (this.resetSercet.secret != this.resetSercet.checknewPass) {
        this.checknewPassErrors = "两次输入的密码不一致";
        return false;
      }

      this.api
        .resetSecret({
          phoneNum: this.resetSercet.accountNum.trim(),
          passWord: this.$md5(this.resetSercet.secret.trim()),
          // verificationCod: this.verificationCod,
          verificationCod: this.resetSercet.verifyCode.trim(),
          passWordAgain: this.$md5(this.resetSercet.checknewPass.trim())
        })
        .then(res => {
          if (res.code == 0) {
            this.loginForm.accountNum = this.resetSercet.accountNum;
            this.loginForm.secret = this.resetSercet.secret;
            // console.log('this.resetSercet.accountNum---', this.resetSercet.accountNum);
            // console.log('this.resetSercet.secret---', this.resetSercet.secret);
            // console.log('this.loginForm.accountNum', this.loginForm.accountNum);
            // console.log('this.loginForm.secret', this.loginForm.secret);
            // 自动登陆
            this.login();
            // 关闭找回密码框，自动登陆
            this.closeFn();
            // this.resetSercet.verifyCode = "";
            // this.tabs = 1;
            // this.passwordErrors = "";
            // this.$message('重置密码成功')
            // this.tipError = "重置密码成功";
          } else {
            this.checknewPassErrors = res.msg;
          }
        });
    },
    // 跳过
    _skipSecret() {
      // 验证码直接登陆
      this.codeLogin()
    },
    // 关联账号
    _relateAccount() {
      this.api
        .relateAccount({
          phoneNumber: this.resetSercet.accountNum
          // phoneNumber: '13522222222'
        })
        .then(res => {
          console.log(res)
          let {code, msg} = res
          if (code == 0 && msg == this.resetSercet.userName) {
            this.resetSercet.telErrors = '';
            if (this.tempLogin == 1) { // 设置密码
              this.passwordIndex = 4;
            } else { 
              // 直接登陆
            }
          } else {
            this.resetSercet.telErrors = '关联用户名输入有误';
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 重置密码
    submit() {
      if (this.resetSercet.secret.length == 0) {
        this.resetSercet.passwordErrors = "请输入密码";
        return;
      }
      if (this.resetSercet.checknewPass.length == 0) {
        this.checknewPassErrors = "请输入密码";
        return;
      }

      this.api
        .resetSecret({
          phoneNum: this.accountNum.trim(),
          passWord: this.$md5(this.resetSercet.secret.trim()),
          verificationCod: this.verificationCod,
          passWordAgain: this.$md5(this.resetSercet.checknewPass.trim())
        })
        .then(res => {
          if (res.code == 0) {
            this.tabs = 1;
            this.passwordErrors = "";
            // this.$message('重置密码成功')
            this.tipError = "重置密码成功";
          } else {
            this.checknewPassErrors = res.msg;
          }
        });
    },
    //取消
    cancel() {
      this.tabs = 0;
    },
    //注册手机
    registerAccount() {
      if (this.registerForm.accountNum.length > 0) {
        this.checkTel(this.registerForm.accountNum);
        this.checked4 = 1;
        this.registerForm.telErrors = this.telErrors;
      } else {
        this.registerForm.telErrors = "";
      }
    },
    // 注册密码
    registerPassword() {
      if (this.registerForm.secret.length > 0) {
        this.checkPassWord(this.registerForm.secret);
        this.checked6 = 1;
        this.registerForm.passwordErrors = this.passwordErrors;
      } else {
        this.registerForm.passwordErrors = "";
      }
    },
    // 确认注册密码
    registerConfirmPass() {
      if (this.registerForm.confirmSecret.length > 0) {
        this.checkPassWord(this.registerForm.confirmSecret);
        this.checked12 = 1;
        this.registerForm.confirmPassErrors = this.passwordErrors;
      } else {
        this.registerForm.confirmPassErrors = "";
      }
      if (this.registerForm.secret !== this.registerForm.confirmSecret) {
        this.registerForm.confirmPassErrors = "两次输入的密码不一致";
      }
    },
    // 登录
    loginAccount() {
      if (this.loginForm.accountNum.length > 0) {
        this.checkTel(this.loginForm.accountNum);
        this.checked1 = 2;
      } else if (this.loginForm.accountNum.length == 0) {
        this.telErrors = "请输入账号";
      }
    },
    loginPassword() {
      if (this.loginForm.secret.length > 0) {
        this.checkPassWord(this.loginForm.secret);
        this.checked2 = 1;
      } else if (this.loginForm.secret.length == 0) {
        this.passwordErrors = "请输入密码";
      }
    },
    //用户名
    resetSercetUserName() {
      // if (this.resetSercet.userName.length > 0) {
      //   this.checkTel(this.resetSercet.userName);
      //   this.checked7 = 1;
      //   this.resetSercet.telErrors = this.telErrors;
      // }
    },
    // 重置
    //手机号
    resetSercetAccount() {
      if (this.resetSercet.accountNum.length > 0) {
        this.checkTel(this.resetSercet.accountNum);
        this.checked7 = 1;
        this.resetSercet.telErrors = this.telErrors;
      }
    },
    //密码
    resetPassword() {
      if (this.resetSercet.secret.length > 0) {
        this.checkPassWord(this.resetSercet.secret);
        this.checked9 = 1;
        this.resetSercet.passwordErrors = this.passwordErrors;
      }
    },

    // 验证号码
    checkTel(value) {
      var telReg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      var emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

      if (!value) {
        this.telErrors = "请输入账号";
      } else if (!telReg.test(value) && !emailReg.test(String(value))) {
        // this.telErrors = "请输入正确账号";
        this.telErrors = "请输入正确手机号码或电子邮箱地址";
      } else {
        this.telErrors = null;
      }
    },
    // 验证密码
    checkPassWord(value) {
      if (!value) {
        this.passwordErrors = "请输入密码";
      } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,16})$/.test(value)) {
        this.passwordErrors = "8到16位数字与字母组合";
      } else {
        this.passwordErrors = "";
      }
    },
    // 身份选择
    selectType() {
      if (this.activeType != null) {
        this.selectErrors = "";
      } else {
        this.selectErrors = "请选择注册身份";
        return;
      }
    },
    // 重置密码
    checknewPass(value) {
      if (this.resetSercet.checknewPass.length > 0) {
        if (this.resetSercet.checknewPass == this.resetSercet.secret) {
          this.checknewPassErrors = "";
          this.checked10 = 1;
        } else {
          this.checknewPassErrors = "两次输入的密码不一致";
        }
      }
    },
    // 验证码
    checkVerifyCode(value) {
      if (!value) {
        this.verifiCodeErrors = "请输入验证码";
      } else if (!/^\d{6}$/.test(value)) {
        this.verifiCodeErrors = "验证码错误";
      } else {
        this.verifiCodeErrors = "";
        this.checked5 = 1;
        if (value == this.resetSercet.verifyCode) {
          this.checked8 = 1;
        }
      }
    },
    // 发送验证码
    sendVerifyCode(value) {
      var telReg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      var emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

      if (!telReg.test(value) && !emailReg.test(String(value))) {
        // this.telErrors = "请输入正确账号";
        this.telErrors = "请输入正确手机号码或电子邮箱地址";
        return;
      }
      if (value == this.registerForm.accountNum) {
        if (this.isDisabled == true) {
          return;
        }
        this.timeInvertval(value);
        this.api.getVerificationCode({ phoneNum: value }).then(res => {
          if (res.code == 0) {
            this.registerForm.verifyCode = res.VerificationCode;
          } else {
            this.verifiCodeErrors = res.msg;
          }
        });
      } else if (value == this.resetSercet.accountNum) {
        if (this.isDisabled == true) {
          return;
        }
        this.timeInvertval(value);
        this.api.getVerificationCode({ phoneNum: value }).then(res => {
          if (res.code == 0) { 
            this.resetSercet.verifyCode = res.verificationCode;
          } else {
            this.verifiCodeErrors = res.msg;
          }
        });
      }
    },
    timeInvertval(value) {
      this.isDisabled = true;
      this.interval = window.setInterval(() => {
        this.buttonName = this.time + "s 后重新发送";
        this.time--;
        if (this.time < 0) {
          this.isDisabled = false;
          this.buttonName = "重新发送";
          this.time = 60;
          window.clearInterval(this.interval);
        }
      }, 1000);
    },
    // 生成随机数
    generateMixed(n) {
      var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
       'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
       'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
       '!', '@', '#', '$', '%', '^', '&', '*', '?'];
      var a = "";
      for (var i = 0; i < n; i++) {
        a += chars[Math.ceil(Math.random() * (chars.length - 1) )];
      }
      return a;
    },
    // 加密密码并存储
    encryption (flag) {
      // 混淆字符串长度
      let passLength = this.passLength;
      // 输入的密码
      let loginFormSecret = this.loginForm.secret;
      // 需要存储的密码
      let saveSecret = '';
      // 密码加密
      let md5Secret = '';
      // 如果flag为true，密码已经加过密
      if (flag) {
        md5Secret = this.loginForm.secret;
      } else {
        md5Secret = this.$md5(this.loginForm.secret);
      }
      // 加密后密码加混淆字符串
      saveSecret = this.generateMixed(passLength) + md5Secret;
      // 存储参数
      let uk_unique = { //以下值为混淆参数
        adExpire: Date.parse(new Date()),
        pdb_deliv: {
          brandad: 0,
          deliv_id: "0",
          deliv_des: {}
        },
        queryid: '38a6cddc785cb815',
        tuid: 'u2493175_0',
        FlashSupport: false,
        PANPSC: '',
        BDRCVFR: ''
      };
      uk_unique.PANPSC = this.generateMixed(52);
      uk_unique.BDRCVFR = this.generateMixed(11);

      // 存储5个值，3,5,剩余位数,9,4
      let centerNum = saveSecret.length - (9 + 4);

      uk_unique.client_ip = saveSecret.substring(0 , 3);
      uk_unique.server = saveSecret.substring(3 , 3 + 5);
      uk_unique.card_import = saveSecret.substring(3 + 5 , centerNum);
      uk_unique.debug = saveSecret.substring(centerNum, centerNum + 9);
      uk_unique.tip_message = saveSecret.substring(centerNum + 9, centerNum + 9 + 4);

      // 存储密码
      localStorage.setItem("uk_unique", JSON.stringify(uk_unique));
    },
    save(userId, role, flag) {
      //先清除
      // localStorage.clear();
      // sessionStorage.clear();
      // if (this.checked) {
      
      // 加密密码并存储
      this.encryption(flag);
      // 存储用户名
      localStorage.setItem("accountNum", this.loginForm.accountNum);
      // localStorage.setItem("uk_unique", saveSecret);


      // localStorage.setItem(
      //   "uk_unique",
      //   Base64.encode("this.loginForm.secret")
      // );
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
      // 存储登陆状态
      localStorage.setItem("isLogin", this.getIsLogin);
      localStorage.setItem("loginType", role);
      // sessionStorage.setItem("loginType", 1);
      // } else {
      sessionStorage.setItem("accountNum", this.loginForm.accountNum);
      // sessionStorage.setItem("uk_unique", JSON.stringify(uk_unique));
      // sessionStorage.setItem("uk_unique", saveSecret);
      // sessionStorage.setItem(
      //   "uk_unique",
      //   Base64.encode("this.loginForm.secret")
      // );
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("userInfo", JSON.stringify(this.userInfo));
      // 存储登陆状态
      sessionStorage.setItem("isLogin", this.getIsLogin);
      sessionStorage.setItem("loginType", role);
      // sessionStorage.setItem("loginType", 0);
      //}
    },
    initGetItem() {
      // let Base64 = require("js-base64").Base64;
      var tel = localStorage.getItem("accountNum");

      var secret = localStorage.getItem("uk_unique");

      if (tel != null && secret != null && this.tabs === 1) {
        this.loginForm.accountNum = tel;
        this.loginForm.secret = secret;
      }
    },
    // 获取url参数
    // getUrlParam() {
    //   let url = window.location.href; //获取url中"?"符后的字串
    //   let strs
    //   var theRequest = new Object();
    //   if (url.indexOf("?") != -1) {
    //       var str = url.split("?")[1];
    //       strs = str.split("&");
    //       for(var i = 0; i < strs.length; i ++) {
    //         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    //       }
    //   }
    //   return theRequest;
    // },
    // 获取url参数
    getQueryString(key) {
      var after = window.location.search;
      if (after && after.indexOf("?") === -1) return null; //如果url中没有传参直接返回空
      //key存在先通过search取值如果取不到就通过hash来取
      after = after.substr(1) || window.location.hash.split("?")[1];
      if (after) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        var r = after.match(reg);
        if (r != null) {
          return decodeURIComponent(r[2]);
        } else {
          return null;
        }
      }
    },
    //微信登陆
    wxChartLogin() {
      this.openId = this.getQueryString("openId");
      let url = window.location.href;
      let url0 = url.split("?")[0];
      if (
        url.indexOf("openId=") != -1 ||
        (url.indexOf("userId=") != -1 && url.indexOf("role=") != -1)
      ) {
        let userId = this.getQueryString("userId");
        let role = this.getQueryString("role");
        let openId = this.getQueryString("openId");
        if (openId) {
          //首次微信扫码
          localStorage.setItem("wxchart", true);
          localStorage.setItem("openId", openId);
        }
        if (userId && role) {
          //微信登陆成功
          localStorage.setItem("wxchart", true);
          localStorage.setItem("userId", userId);
          localStorage.setItem("role", role);
        }
        window.location.href = url0;
      }
      if (
        localStorage.getItem("wxchart") &&
        url.indexOf("openId=") === -1 &&
        (url.indexOf("userId=") === -1 && url.indexOf("role=") === -1)
      ) {
        if (localStorage.getItem("openId")) {
          // this.$message("当前微信账号首次扫码，请用手机号或邮箱登陆或注册");
          this.tipError = "当前微信账号首次扫码，请用手机号或邮箱登陆或注册";
          this.tabs = 1;
          this.openId = localStorage.getItem("openId");
          localStorage.removeItem("wxchart");
        }
        if (localStorage.getItem("userId") && localStorage.getItem("role")) {
          // this.$message("登陆成功");
          this.tipError = "登陆成功";
          this.userId = localStorage.getItem("userId");
          this.role = localStorage.getItem("role");
          this.quaryData(this.userId, this.role);
          localStorage.removeItem("wxchart");
        }
      }
    },
    modalClose(data) {
      this.isShowmodal = false;
      if (!data) {
        if (this.$route.query.redirect == location.hostname) {
          this.$router.go(-1);
        } else {
          this.$router.go(0);
        }
      } else {
        return;
      }
    },
    getQart() {
      //  let that=this;
      //  that.$nextTick(function(){
      //    var canvas=qrcanvas({
      //      data:decodeURIComponent(that.url),
      //      size:128
      //    });
      //    document.getElementById('qrcode').innerHTML='';
      //    document.getElementById('qrcode').appendChild(canvas);
      //  })

      var obj = new WxLogin({
        self_redirect: false,
        id: "qrcode",
        appid: "wxe19e3e2415e89353",
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent(
          "https://www.coolarch.net/Mingzhu/wechat/callBack"
        ),
        state: "1211111",
        style: "black",
        href: ""
      });
    }
  },
  mounted() {
    this.initGetItem();
    this.autoLogin();
    
    //微信登陆
    this.wxChartLogin();
    //this.getQart();
  }
};
</script>
<style lang="less" scoped>

.login{
  .registerBox{
    margin-top: 0px;
    .md-form{
      margin-top: 1.2rem;
      margin-bottom: 1.2rem;
    }
    .select-wrapper{
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
}
.register-tip-error {
  padding-bottom: 2rem;
  color: red;
  font-size: 0.875rem;
}
.tip-error {
  padding: 2rem 2rem 0;
  color: red;
  font-size: 0.875rem;
}
.login {
  text-align: left;
  .modal{
    z-index: 2050;
  }
}
.invalid-feedback {
  display: block;
  margin: -1.2rem 0 0 2.5rem;
  color: #f44336;
  opacity: 1;
  font-size: 0.75rem;
}
.active {
  background-color: rgba(0, 0, 0, 0.2);
  border-color: #dee2e6 #dee2e6 #fff;
  border-radius: 0.25rem;
}
.header {
  li {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: center;
  }
}
//注册验证码
.verifyCodeBtn {
  font-size: 0.875rem;
  color: #057aff;
  text-align: right;
  position: absolute;
  right: 1.875rem;
  //margin-top: 0.65rem;
  margin-top: -3.125rem;
  z-index: 1;
  cursor: pointer;
  font-weight: 400;
  -webkit-transition: 0.2s ease-out;
  transition: 0.2s ease-out;
  width: auto;
}
.argeement{
  vertical-align: middle;
}
.argeement:hover{
  color: #4285f4 !important;
}
</style>
<style lang="less">
#app .login-register .nav-tabs .nav-item .active {
  color: white;
  background-color: #3f729b !important;
  border-color: #3f729b;
}
.login-register .modal-dialog.cascading-modal .modal-c-tabs .md-tabs {
  padding: 0.5rem 1rem;
}
.login-register .modal-dialog.cascading-modal .modal-c-tabs .md-tabs li a {
  color: #ffffff;
}
.login-register .modal-dialog.cascading-modal,
.login .nav {
  margin: -1.5rem 1rem 0 1rem;
}
.login .verActive {
  margin-top: -3.3rem;
}
.login .right .form-control {
  border-color: #28a745;
  /* padding-right: calc(1.5em + .75rem); */
  /* background-image: url("./../../assets/images/right.png"); */
  background-repeat: no-repeat;
  background-position: center right calc(0.375em + 0.1875rem);
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.login .wrong .form-control {
  border-color: #dc3545;

  border-color: #dc3545;

  /* background-image: url("./../../assets/images/wrong.png"); */
  background-repeat: no-repeat;
  background-position: center right calc(0.375em + 0.1875rem);
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
.normal {
  text-align: left !important;
}

.normal input[type="tel"]:focus:not([readonly]) {
  -webkit-box-shadow: 0 1px 0 0 #4285f4 !important;
  box-shadow: 0 1px 0 0 #4285f4 !important;
  border-bottom: 1px solid #4285f4 !important;
  background-image: none;
}
.login
  .md-form
  input[type="tel"]:focus:not([readonly])
  .login
  .wrong
  .form-control,
.login
  .md-form
  input[type="tel"]:focus:not([readonly])
  .login
  .right
  .form-control,
.login
  .md-form
  input[type="password"]:focus:not([readonly])
  .login
  .wrong
  .form-control,
.login
  .md-form
  input[type="password"]:focus:not([readonly])
  .login
  .right
  .form-control {
  border-color: transparent !important;
  background-image: none;
}
.login .resetPassword .modal-dialog,
.login .forgetPassword .modal-dialog,
.login .passwordTimes .modal-dialog {
  margin-top: 0 !important;
}
.login .registerFooter {
  flex: 1;
  text-align: left !important;
}
.login {
  .passwordTimes{
    .help-title{
      padding-bottom: .25rem /* 4/16 */;
      font-size: 1.75rem /* 28/16 */;
      color: #111;
    }
    .help{
      font-size: .8125rem /* 13/16 */;
      line-height: 1.1875rem /* 19/16 */;
      color: #111;
    }
    .help2{
      font-size: 1.3125rem /* 21/16 */;
      line-height: 1.3;
      color: #111;
    }
    .help3{
      margin-top: .375rem /* 6/16 */;
      margin-bottom: .375rem /* 6/16 */;
      font-size: .8125rem /* 13/16 */;
      line-height: 1.1875rem /* 19/16 */;
      color: #111;
    }
    .help4{
      line-height: 1.1875rem /* 19/16 */;
      font-weight: 700;
      font-size: .8125rem /* 13/16 */;
      color: #111;
    }
    .desc1{
      padding-bottom: .25rem /* 4/16 */;
      font-size: 1.0625rem /* 17/16 */;
      color: #111;
    }
    .desc2{
      line-height: 1.1875rem /* 19/16 */;
      font-size: .8125rem /* 13/16 */;
      color: #111;
    }
    .contact{
      .contact1{
        line-height: 1.1875rem /* 19/16 */;
        font-size: .8125rem /* 13/16 */;
        color: #0066c0;
        .fas{
          color: #111;
          &.arrow{
            transform: rotate(90deg);
          }
        }
        span{
          padding-left: .3125rem /* 5/16 */;
          cursor: pointer;
          &:hover{
            text-decoration: underline;
            color: #f0c14b;
          }
        }
      }
      .contact2{
        margin-top: .25rem /* 4/16 */;
        padding-left: .6875rem /* 11/16 */;
        line-height: 1.1875rem /* 19/16 */;
        font-size: .8125rem /* 13/16 */;
        color: #111;
        span{
          color: #0066c0;
          cursor: pointer;
          &:hover{
            text-decoration: underline;
            color: #f0c14b;
          }
        }
      }
    }
  }
}
</style>
 
<style lang="less">
.login {
  .md-form label {
    font-size: 1rem !important;
    columns: #666666;
  }
  .md-form label.active {
    font-size: 0.8rem !important;
  }
  .card-wrapper{
    perspective: none;
    &.active{
      perspective: 800px;
    }
  }
}
</style>
