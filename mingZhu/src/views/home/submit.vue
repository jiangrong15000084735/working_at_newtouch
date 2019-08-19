<template>
  <div class="designer-submit-warp custom">
    <div class="designer-submit-info">
      <div class="designer-title">会员资料验证填写</div>
      <div
        class="desc"
        style="padding: 1.25rem 0 1.5625rem 0;"
      >请填写相关验证信息进行会员身份验证，您填写的身份、工作、履历等信息仅供平台身份验证使用，相关信息不会显示在任何网络页面上</div>
      <Stepper :activeIndex="activeIndex" :landMarkList="progressStep"/>
      <bindPhoneEmail :bindPhoneEmailObj="bindPhoneEmailObj" @bindBack="bindBack"></bindPhoneEmail>
      <div class="form">
        <form
          :model="ruleForm"
          ref="ruleForm"
          label-width="2rem"
          class="needs-validation"
          novalidate
        >
          <div class="personal-info">
            <div class="conpang-title">
              个人基本信息
              <span>（带*号为必填项）</span>
            </div>
            <mdb-row style="margin-bottom:1.25rem;">
              <mdb-col text-center>
                <div class="avatar" style="height: 6.25rem; width: 6.25rem; margin: 0px auto; position: relative;cursor: pointer;" @click="openFilter">
                  <img
                    style="display:block;width:100%;height:100%;"
                    v-if="head"
                    :src="head"
                    :class="[filter==1?'chalkboard':'',filter==2?'airbrush-effect':'',filter==3?'colored-chalkboard-effect':'',filter==4?'hallucination-effect':'']"
                  >
                  <img style="display:block;width:100%;height:100%;" v-else src="@/assets/images/header.png">
                </div>
              </mdb-col>
              <!-- 弹出框 -->
                <mdb-modal v-if="modal==true" info >
                    <mdb-modal-header class="text-center" :close="false">
                        <p class="heading" style="width:100%;text-align:center">你的头像照片</p>
                    </mdb-modal-header>
                <mdb-modal-body>
                    <h6 style="text-align:left;">上传新头像</h6>
                    <mdb-row>
                    <mdb-col style="border:1px solid #ccc;height:13.75rem;padding:0;overflow:hidden">
                        <div class="headPoto">
                            <img :src="headPhoto" v-if="headPhoto" style="width:100%">
                            <img
                                :src="head"
                                style="width:100%"
                                v-else
                                :class="[filter==1?'chalkboard':'',filter==2?'airbrush-effect':'',filter==3?'colored-chalkboard-effect':'',filter==4?'hallucination-effect':'']"
                            >
                        </div>
                    </mdb-col>
                    <mdb-col style="border:1px solid #ccc;margin-left:0.95rem;height:13.75rem;padding:0">
                        <el-upload
                            class="avatar2 loadavatar"
                            :show-file-list="false"
                            :action="api.upload()"
                            :before-upload="beforeAvatarUpload"
                            :on-success="successUpLoadAvatar"
                            accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
                            >
                        <i class="el-icon-plus avatar-uploader-icon2"
                            style="font-size:6.125rem;color:#ccc;font-weight:300;
                margin: 4.375rem 3.06rem 2.70rem 3.06rem;"
                        ></i>
                        </el-upload>
                    </mdb-col>
                    </mdb-row>
                </mdb-modal-body>
                <mdb-modal-footer center>
                    <mdb-btn color="primary" @click.prevent.native="changeHeadImg">保存</mdb-btn>
                    <mdb-btn outline="primary" @click.prevent.native="modal = false">关闭</mdb-btn>
                </mdb-modal-footer>
               </mdb-modal>
            </mdb-row>
            <mdb-row class="mt-4">
              <mdb-col col="6">
                <div class="info-pb">
                  <mdb-row>
                    <mdb-col md="3" class="px-0 textAlignRight">昵称</mdb-col>
                    <mdb-col md="9">
                      <!-- <mdb-input basic v-model="ruleForm.userName" :disabled="disabled"></mdb-input> -->
                      <div class="outline-input">
                        <mdb-input 
                        type="text"
                        size="lg" 
                        label="昵称" 
                        :disabled="disabled"
                        v-model="ruleForm.userName"
                        outline />
                        </div>
                      <!-- <div class="zerror" v-if="ErealName">{{ErealName}} </div> -->
                    </mdb-col>
                  </mdb-row>
                </div>
                <div class="info-pb">
                  <mdb-row>
                    <mdb-col md="3" class="px-0 textAlignRight">
                      会员ID
                      <span class="addRedCricle"></span>
                    </mdb-col>
                    <mdb-col md="9">
                      <!-- <mdb-input basic v-model="ruleForm.bossSerial" disabled></mdb-input> -->
                      <div class="outline-input">
                        <mdb-input 
                        type="text"
                        size="lg" 
                        label="会员ID" 
                        disabled
                        v-model="ruleForm.bossSerial"
                        outline />
                        </div>
                      <!-- <div class="zerror" v-if="ErealName">{{ErealName}} </div> -->
                    </mdb-col>
                  </mdb-row>
                  <!-- <span class="col col-3 span-input">
                    <label class="span-tag">*</label>会员ID
                  </span>
                  <input class="form-control" v-model="ruleForm.bossSerial" :disabled="disabled">
                  <div class="zerror" v-if="EbossSerial">{{EbossSerial}} </div>-->
                </div>
                <div class="info-pb">
                  <mdb-row>
                    <mdb-col md="3" class="px-0 textAlignRight">登录手机号</mdb-col>
                    <mdb-col :md="ruleForm.phoneNumber?'9':'6'">
                      <!-- <mdb-input basic v-model="ruleForm.phoneNumber" :disabled="true"></mdb-input> -->
                      <div class="outline-input">
                        <mdb-input 
                        type="text"
                        size="lg" 
                        label="登录手机号" 
                        :disabled="true"
                        v-model="ruleForm.phoneNumber"
                        outline />
                        </div>
                    </mdb-col>
                    <mdb-col md="3" v-if="!ruleForm.phoneNumber">
                      <span class="tagtip" @click="noBindPhone">绑定手机号</span>
                    </mdb-col>
                  </mdb-row>

                  <!-- <span class="col col-3 span-input">
                    <label class="span-tag">*</label>登录手机号
                  </span>
                  <input class="form-control" v-model="ruleForm.phoneNumber" :disabled="ruleForm.phoneNumber">
                  <div class="zerror" v-if="EphoneNumber">{{EphoneNumber}} </div>-->
                </div>
                <div class="info-pb">
                  <mdb-row>
                    <mdb-col md="3" class="px-0 textAlignRight">
                      真实姓名&nbsp;
                      <span class="addRedCricle"></span>
                    </mdb-col>
                    <mdb-col md="9">
                      <!-- <mdb-input
                        basic
                        v-model="ruleForm.realName"
                        :disabled="disabled"
                        @change="checkRealName"
                      ></mdb-input> -->
                      <div class="outline-input">
                        <mdb-input 
                        type="text"
                        size="lg" 
                        label="真实姓名" 
                        :disabled="disabled"
                        v-model="ruleForm.realName"
                        outline />
                        </div>
                      <!-- <div class="zerror" v-if="ErealName">{{ErealName}} </div> -->
                    </mdb-col>
                  </mdb-row>
                </div>
                <div class="info-pb">
                  <mdb-row>
                    <mdb-col md="3" class="px-0 textAlignRight">联系邮箱</mdb-col>
                    <mdb-col :md="ruleForm.email?'9':'6'">
                      <!-- <mdb-input
                        basic
                        v-model="ruleForm.email"
                        :disabled="true"
                        @change="checkEmail"
                      ></mdb-input> -->
                      <div class="outline-input">
                        <mdb-input 
                        type="text"
                        size="lg" 
                        label="联系邮箱" 
                        :disabled="true"
                        v-model="ruleForm.email"
                        outline />
                        </div>
                      <!-- <div class="zerror" v-if="Eemail">{{Eemail}} </div> -->
                    </mdb-col>
                    <mdb-col md="3" v-if="!ruleForm.email">
                      <span class="tagtip" @click="noBindEmail">绑定邮箱</span>
                    </mdb-col>
                  </mdb-row>
                </div>
                <div class="company">
                  <span>是否升级为公司（机构）会员：</span>
                  <div class="form-check form-check-inline">
                    <input
                      type="radio"
                      name="radioInline"
                      v-model="ruleForm.isCompany"
                      :checked="ruleForm.isCompany=='Y'"
                      class="form-check-input"
                      value="Y"
                      id="defaultInline1"
                      :disabled="disabled"
                    >
                    <label class="form-check-label" for="defaultInline1">是</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      type="radio"
                      name="radioInline"
                      value="N"
                      v-model="ruleForm.isCompany"
                      :checked="ruleForm.isCompany=='N'"
                      class="form-check-input"
                      id="defaultInline2"
                      :disabled="disabled"
                    >
                    <label class="form-check-label" for="defaultInline2">否</label>
                  </div>
                </div>
              </mdb-col>
              <mdb-col col="6" class="card-img">
                <span class="tag">*</span>
                <mdb-row>
                  <mdb-col col="12">
                    <el-upload
                      class="upload-demo"
                      :show-file-list="false"
                      :on-success="handleNameCardSuccess"
                      :before-upload="beforeUpload"
                      accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
                      :action="api.upload()"
                      drag
                      multiple
                      v-if="!disabled"
                    >
                      <img v-if="nameCardUrl" :src="nameCardUrl" class="demo-img">
                      <i v-else class="el-icon-circle-plus-outline">
                        <span class="uploadIDCardTips">身份证扫描件（正面）</span>
                      </i>
                      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过{{$isLt10M}}Mb</div>
                    </el-upload>
                     <div v-if="disabled" class="license-img">
                      <img v-if="nameCardUrl" :src="nameCardUrl" class="demo-img">
                    </div>
                  </mdb-col>
                  <mdb-col col="12">
                    <el-upload
                      class="upload-demo"
                      :show-file-list="false"
                      :on-success="handleNameCardSuccess0"
                      :before-upload="beforeUpload"
                      accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
                      :action="api.upload()"
                      drag
                      multiple
                      v-if="!disabled"
                    >
                      <img v-if="namePicture" :src="namePicture" class="demo-img">
                      <i v-else class="el-icon-circle-plus-outline">
                        <span class="uploadIDCardTips">身份证扫描件（反面）</span>
                      </i>
                      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过{{$isLt10M}}Mb</div>
                    </el-upload>
                    <div v-if="disabled" class="license-img">
                      <img v-if="namePicture" :src="namePicture" class="demo-img">
                    </div>
                  </mdb-col>
                </mdb-row>
                
               
              </mdb-col>
            </mdb-row>
          </div>
          <div
            class="personal-info"
            style="border-top: 0.5px solid #e0e0e0;padding:0;"
            v-if="ruleForm.isCompany=='Y'"
          >
            <div class="conpang-title">
              公司信息
              <span>（带*号为必填项）</span>
            </div>
            <mdb-row>
              <mdb-col col="6">
                <div class="info-pb">
                  <span class="col col-3 span-input">
                    公司名称&nbsp;
                    <label class="span-tag">*</label>
                  </span>
                  <!-- <input
                    class="form-control"
                    v-model="ruleForm.company"
                    :disabled="disabled"
                    @change="checkCompany"
                  > -->
                  <div class="outline-input" style="width:70%;display: inline-block;">
                    <mdb-input 
                    type="text"
                    size="lg" 
                    label="公司名称" 
                    :disabled="disabled"
                    v-model="ruleForm.company"
                    @change="checkCompany"
                    outline />
                  </div>
                  <!-- <div class="zerror" v-if="Ecompany">{{Ecompany}} </div> -->
                </div>
                <div class="info-pb">
                  <span class="col col-3 span-input">
                    公司地址&nbsp;
                    <label class="span-tag">*</label>
                  </span>
                  <!-- <input
                    class="form-control"
                    v-model="ruleForm.address"
                    :disabled="disabled"
                    @change="checkAddress"
                  > -->
                  <div class="outline-input" style="width:70%;display: inline-block;">
                    <mdb-input 
                    type="text"
                    size="lg" 
                    label="公司地址" 
                    :disabled="disabled"
                    v-model="ruleForm.address"
                    @change="checkAddress"
                    outline />
                  </div>
                  <!-- <div class="zerror" v-if="Eaddress">{{Eaddress}} </div> -->
                </div>
                <div class="info-pb">
                  <span class="col col-3 span-input">
                    公司电话&nbsp;
                    <label class="span-tag">*</label>
                  </span>
                  <!-- <input
                    class="form-control"
                    v-model="ruleForm.companyPhone"
                    :disabled="disabled"
                    @change="checkCompanyPhone"
                  > -->
                  <div class="outline-input" style="width:70%;display: inline-block;">
                    <mdb-input 
                    type="text"
                    size="lg" 
                    label="公司电话" 
                    :disabled="disabled"
                    v-model="ruleForm.companyPhone"
                    @change="checkCompanyPhone"
                    outline />
                  </div>
                  <!-- <div class="zerror" v-if="EcompanyPhone">{{EcompanyPhone}} </div> -->
                </div>
                <div class="info-pb">
                  <span class="col col-3 span-input">
                    部门及职务&nbsp;
                    <label class="span-tag">*</label>
                  </span>
                  <!-- <input
                    class="form-control"
                    v-model="ruleForm.department"
                    :disabled="disabled"
                    @change="checkDepartment"
                  > -->
                  <div class="outline-input" style="width:70%;display: inline-block;">
                    <mdb-input 
                    type="text"
                    size="lg" 
                    label="部门及职务" 
                    :disabled="disabled"
                    v-model="ruleForm.department"
                    @change="checkDepartment"
                    outline />
                  </div>
                  <!-- <div class="zerror" v-if="Edepartment">{{Edepartment}} </div> -->
                </div>
                <div class="info-pb">
                  <span class="col col-3 span-input">公司传真</span>
                  <!-- <input class="form-control" v-model="ruleForm.companyFax" :disabled="disabled"> -->
                  <div class="outline-input" style="width:70%;display: inline-block;">
                    <mdb-input 
                    type="text"
                    size="lg" 
                    label="公司传真" 
                    :disabled="disabled"
                    v-model="ruleForm.companyFax"
                    outline />
                  </div>
                </div>
                <div class="info-pb">
                  <span class="col col-3 span-input">公司邮箱</span>
                  <!-- <input class="form-control" v-model="ruleForm.companyEmail" :disabled="disabled"> -->
                  <div class="outline-input" style="width:70%;display: inline-block;">
                    <mdb-input 
                    type="text"
                    size="lg" 
                    label="公司邮箱" 
                    :disabled="disabled"
                    v-model="ruleForm.companyEmail"
                    outline />
                  </div>
                </div>
                <div class="info-pb">
                  <span class="col col-3 span-input">网站地址</span>
                  <!-- <input class="form-control" v-model="ruleForm.website" :disabled="disabled"> -->
                  <div class="outline-input" style="width:70%;display: inline-block;">
                    <mdb-input 
                    type="text"
                    size="lg" 
                    label="网站地址" 
                    :disabled="disabled"
                    v-model="ruleForm.website"
                    outline />
                  </div>
                </div>
              </mdb-col>
              <mdb-col col="5" offsetMD="2">
                <span class="tag">*</span>
                <el-upload
                  class="upload-demo"
                  :show-file-list="false"
                  :on-success="handleSuccess"
                  :before-upload="beforeUpload"
                  accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
                  drag
                  multiple
                  v-if="!disabled"
                  :action="api.upload()"
                >
                  <img v-if="licenseUrl" :src="licenseUrl" class="demo-img">
                  <i v-else class="el-icon-circle-plus-outline">
                    <span class="uploadIDCardTips">营业执照或组织机构代码扫描附件</span>
                  </i>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过{{$isLt10M}}Mb</div>
                </el-upload>
                <div v-if="disabled" class="license-img">
                  <img :src="licenseUrl" class="demo-img">
                </div>
              </mdb-col>
            </mdb-row>
          </div>
          <div style="text-align:center;">
            <span
              @click="edit()"
              v-if="disabled==true&&ruleForm.auditState< 2"
              class="edit-button"
              rounded
            >编辑</span>
            <span @click="update('ruleForm')" v-if="disabled==false" class="edit-button">提交审核</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Stepper from "@/components/Stepper";
import bindPhoneEmail from "@/components/bindPhoneEmail";
export default {
  data() {
    return {
      progressStep: [
        { id: "1", name: "注册完成" },
        { id: "2", name: "填写验证资料" },
        { id: "3", name: "提交验证" },
        { id: "4", name: "通过验证" }
      ],
      userId: "",
      disabled: false,
      EbossSerial: "",
      EphoneNumber: "",
      ErealName: "",
      Eemail: "",
      Edepartment: "",
      Ecompany: "",
      Eaddress: "",
      EcompanyPhone: "",
      ruleForm: {
        auditState: 1,
        head: "",
        nameCard: "",
        license: "",
        bossSerial: "",
        phoneNumber: "",
        realName: "",
        email: "",
        department: "",
        company: "N",
        address: "",
        companyPhone: "",
        userName:"",
        namePicture:""
      },
      imageUrl: "",
      nameCardUrl: "",
      namePicture: "",
      licenseUrl: "",
      // validateCode: '',
      // hasSendCodeToEmail: false,
      // hasSendCodeToPhone: false,
      // hasSendCodeToEmail: false,
      // hasSendCodeToPhone: false,
      // step: 1,
      // changeEmail: false,
      // changePhone: false,
      // btnText: '获取验证码',
      // timer: null,
      // newPhoneNumber: '',
      // newEmail: '',
      // formInline: {},
      bindPhoneEmailObj: {
        email: "",
        step: 1,
        changeEmail: false,
        changePhone: false,
        phoneNumber: ""
      },
      activeName: "second",
      backgroundDiv: {
        backgroundImage: "url(" + this.head + ")"
      },
      headPhoto: null,
      headPhotoName: null,
      select: 0,
      filter: 0,
      flipped: false,
      modal: false,
      head: "",
      auditStateNum: 3
    };
  },
  components: {
    Stepper,
    bindPhoneEmail
  },
  computed: {
    activeIndex() {
      return this.ruleForm.auditState ? this.ruleForm.auditState + 1 : 2;
    }
  },
  methods: {
    openFilter() {
      if(this.disabled){
        return
      }
      this.modal = true
    },
    noBindPhone() {
      this.bindPhoneEmailObj.changePhone = true;
      this.bindPhoneEmailObj.step = 2;
    },
    noBindEmail() {
      this.bindPhoneEmailObj.changeEmail = true;
      this.bindPhoneEmailObj.step = 2;
    },
    // 绑定成功后的回调
    bindBack(backItem, boole) {
      console.log(backItem, boole);
      if (boole) {
        this.ruleForm.email = backItem.email;
      } else {
        this.ruleForm.phoneNumber = backItem.phoneNumber;
      }
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.head = res.msg;
      this.api.getUrl({ fileName: this.ruleForm.head }).then(res => {
        this.imageUrl = res.msg;
      });
    },
    //正面
    handleNameCardSuccess(res, file) {
      this.ruleForm.nameCard = res.msg;
      this.api.getUrl({ fileName: this.ruleForm.nameCard }).then(res => {
        this.nameCardUrl = res.msg;
      });
    },
    //反面
    handleNameCardSuccess0(res, file) {
      this.ruleForm.namePicture = res.msg;
      this.api.getUrl({ fileName: this.ruleForm.namePicture }).then(res => {
        this.namePicture = res.msg;
      });
    },
    handleSuccess(res, file) {
      this.ruleForm.license = res.msg;
      this.api.getUrl({ fileName: this.ruleForm.license }).then(res => {
        this.licenseUrl = res.msg;
      });
    },
    // handleCardSuccess(res, file) {
    //   this.ruleForm.license = res.msg;
    //   this.api.getUrl({ fileName: this.ruleForm.license }).then(res => {
    //     this.cardImageUrl = res.msg;
    //   });
    // },
    selected() {
      this.ruleForm.isCompany = "Y";
    },
    edit() {
      this.disabled = false;
    },
    checkRealName(value) {
      if (this.ruleForm.realName) {
        this.ErealName = "";
      }
    },
    checkphoneNumber(value) {
      if (this.ruleForm.phoneNumber) {
        this.EphoneNumber = "";
      }
    },
    checkEmail(value) {
      if (this.ruleForm.email) {
        this.Eemail = "";
      }
    },
    checkCompany(value) {
      if (this.ruleForm.company) {
        this.Ecompany = "";
      }
    },
    checkCompanyPhone(value) {
      if (this.ruleForm.companyPhone) {
        this.EcompanyPhone = "";
      }
    },
    checkAddress(value) {
      if (this.ruleForm.address) {
        this.Eaddress = "";
      }
    },
    checkDepartment(value) {
      if (this.ruleForm.department) {
        this.Edepartment = "";
      }
    },
    update(ruleForm) {
      if (!this.ruleForm.head) {
        this.$message("请上传头像！");
        return;
      }
      // if( !this.ruleForm.userName){
      //   // this.EbossSerial = '请输入会员ID';
      //   this.$message("请输入昵称");
      //   return
      // }
      if (!this.ruleForm.bossSerial) {
        this.EbossSerial = "请输入会员ID";
        this.$message("请输入会员ID");
        return;
      }
      // if( this.ruleForm.phoneNumber === "" ||this.ruleForm.phoneNumber===null){
      //   this.EphoneNumber = '请输入手机号';
      //   this.$message("请输入手机号");
      //   return
      // }
      if (this.ruleForm.realName === "" || this.ruleForm.realName === null) {
        this.ErealName = "请输入真实姓名";
        this.$message("请输入真实姓名");
        return;
      }
      // if( this.ruleForm.email === "" || this.ruleForm.email === null){
      //   this.Eemail = '请输入邮箱';
      //   this.$message("请输入邮箱");
      //   return
      // }
      if (this.ruleForm.nameCard == "" || this.ruleForm.nameCard === null) {
        this.$message("请上传身份证扫描件！");
        this.$message("请上传身份证扫描件！");
        return;
      }
      if (this.ruleForm.namePicture == "" || this.ruleForm.namePicture === null) {
        this.$message("请上传身份证扫描件！");
        this.$message("请上传身份证扫描件！");
        return;
      }
      if (this.ruleForm.isCompany == "Y") {
        if (this.ruleForm.company === "" || this.ruleForm.company === null) {
          this.Ecompany = "请输入公司名称";
          this.$message("请输入公司名称");
          return;
        }
        if (this.ruleForm.address === "" || this.ruleForm.address === null) {
          this.Eaddress = "请输入公司地址";
          this.$message("请输入公司地址");
          return;
        }
        if (
          this.ruleForm.companyPhone === "" ||
          this.ruleForm.companyPhone === null
        ) {
          this.EcompanyPhone = "请输入公司电话";
          this.$message("请输入公司电话");
          return;
        } else {
          let regexp = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
          if (
            !regexp.test(this.ruleForm.companyPhone) &&
            this.ruleForm.companyPhone
          ) {
            this.$message("请输入正确的公司电话");
            return;
          }
        }
        if (
          this.ruleForm.department === "" ||
          this.ruleForm.department === null
        ) {
          this.Edepartment = "请输入部门及职务";
          this.$message("请输入部门及职务");
          return;
        }
        if (!this.ruleForm.license) {
          this.$message("请上传公司营业执照扫描件！");
          this.$message("请上传公司营业执照扫描件！");
          return;
        }
        let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (
          !reg.test(this.ruleForm.companyEmail) &&
          this.ruleForm.companyEmail
        ) {
          this.$message("请输入正确的公司邮箱");
          return;
        }
      }
      let params = {
        id: this.userId,
        userName: this.ruleForm.userName,
        // head: this.ruleForm.head,
        phoneNumber: this.ruleForm.phoneNumber,
        realName: this.ruleForm.realName,
        email: this.ruleForm.email,
        department: this.ruleForm.department,
        company: this.ruleForm.company,
        address: this.ruleForm.address,
        companyPhone: this.ruleForm.companyPhone,
        companyFax: this.ruleForm.companyFax,
        companyEmail: this.ruleForm.companyEmail,
        website: this.ruleForm.website,
        license: this.ruleForm.license,
        nameCard: this.ruleForm.nameCard,
        namePicture: this.ruleForm.namePicture,
        isCompany: this.ruleForm.isCompany
      };
      this.api.customerInformationUpdate(params).then(res => {
        if (res.code == 1) {
          this.$message(res.msg);
        } else {
          this.$message(res.msg);
          this.$store.commit("SetAuditState", this.auditState + 1);
          this.$router.push({
            path: "/designerSubmitInfoSuccess",
            query: {
              actives: 3
            }
          });
        }
      });
    },
    getList() {
      this.api.companyDetail({ id: this.userId }).then(res => {
        if (res.data) {
          this.ruleForm = res.data;
          for (let item in this.ruleForm) {
            if(this.ruleForm[item] == null){
              this.ruleForm[item] = ""
            }
          }
          this.$store.commit("SetAuditState", this.ruleForm.auditState);
          if (this.ruleForm.isCompany != "Y") {
            this.ruleForm.isCompany = "N";
          }
          this.disabled = res.data.auditState > 1;
          this.imageUrl = res.data.imageUrl;
          this.licenseUrl = res.data.licenseUrl;
          this.nameCardUrl = res.data.nameCardUrl;
          this.namePicture = res.data.namePictureUrl;
        }
      });
    },
    beforeAvatarUpload(file) {
      const isLt3M = file.size / 1024 / 1024 < this.$isLt10M;
      if (!isLt3M) {
        this.$message.error(`上传头像图片大小不能超过 ${this.$isLt10M}MB!`);
      }
      return isLt3M;
    },
    beforeUpload(file) {
      const isLt3M = file.size / 1024 / 1024 < this.$isLt10M;
      if (!isLt3M) {
        this.$message.error(`上传图片大小不能超过 ${this.$isLt10M}MB!`);
      }
      return isLt3M;
    },
    selectFilterOne(val) {
      var img = "";
      // img=this.$refs.imgOne.src

      // console.log(img)
      if (val === 0 && !this.headPhotoName) {
        this.select = this.filter;
      } else {
        this.select = val;
      }
    },
    // 上传头像成功
    successUpLoadAvatar(res, file) {
      this.headPhotoName = res.msg;
      let head = res.msg;
      this.api.getUrl({ fileName: head }).then(res => {
        if (res.code !== 0) {
          return;
        }
        this.headPhoto = res.msg;
        this.ruleForm.head = res.msg;
        this.imageUrl = res.msg;
      });
    },
    getDesignerInfo() {
      this.api.companyDetailNew({ id: this.id }).then(res => {
        if (res.code !== 0) {
          return;
        }
        if (res.data.imageUrl == null) {
          this.head = require('@/assets/images/header.png');
        } else {
          this.head = res.data.imageUrl;
          this.filter = res.data.filter;
          this.select = res.data.filter;
        }
        this.auditStateNum = res.data.auditState;
      });
    },
    // 保存
    changeHeadImg() {
      if (this.headPhoto == null) {
        this.headPhoto = this.head;
      }
      this.api
        .updateCompanyDetailNew(
          {
            id: this.id,
            head: this.headPhotoName,
            filter: this.select,
            auditState: this.auditStateNum
          },
          "head"
        )
        .then(res => {
          if (res.code !== 0) {
            this.$message.info(res.msg);
          } else {
            this.$message.info(res.msg);
            this.modal = false;
            this.getDesignerInfo();
          }
        });
    },
    closeModal() {
      this.flipped = false;
      this.modal = false;
      this.select = 0;
      this.headPhoto = null;
    }
    // submitForm(ruleForm) {
    //   let params = this.ruleForm;
    //   if (this.ruleForm.head == "") {
    //     this.$message("请上传头像！");
    //   } else if (this.ruleForm.nameCard == "") {
    //     this.$message("请上传身份证扫描件！");
    //   } else if (
    //     this.ruleForm.license == "" &&
    //     this.ruleForm.isCompany == "Y"
    //   ) {
    //     this.$message("请上传公司营业执照扫描件！");
    //   } else {
    //     this.$refs[ruleForm].validate(valid => {
    //       if (valid) {
    //         this.api.customerInformationUpdate(params).then(res => {
    //           if (res.code == 1) {
    //             this.$message(res.msg);
    //           } else {
    //             this.$message(res.msg);
    //             this.$router.push({
    //               path: "/designerSubmitInfoSuccess",
    //               query: {
    //                 actives: 3
    //               }
    //             });
    //           }
    //         });
    //       } else {
    //         return false;
    //       }
    //     });
    //   }
    // },
    // resetForm(ruleForm) {
    //   let params = this.ruleForm;
    //   this.api.updateCompanyDetail(params).then(res => {
    //       this.$message(res.msg);
    //       console.log(res)
    //   });
    // }
  },
  mounted() {
    this.id =
      localStorage.getItem("userId") || sessionStorage.getItem("userId");
    this.getDesignerInfo();
    this.userId = localStorage.getItem("userId");
    this.ruleForm.bossSerial = this.$store.state.user.bossSerial;
    this.ruleForm.phoneNumber = this.$store.state.user.phoneNumber;
    this.getList();
  }
};
</script>

<style lang="less" scoped>
@media only screen and (min-width: 1600px) {
  .designer-submit-info {
    max-width: 1200px;
    margin: 0.2rem auto !important;
  }
}
.headImgDialog{
  .modal{
    overflow: hidden;
  }
}
.headPoto {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.card-body {
  h6{
    text-align: left;
  }
  .avatar2 {
    top: 0;
    left: 0;
    margin: 0.9375rem 1rem;
    text-align: center;
    border: 1px dashed #ccc;
    height: 90%;
    width: 90%;
  }
}
.designer-submit-warp {
  background-color: #f5f5f5;
  // overflow: hidden;
  text-align: center;
}
.designer-submit-info {
  overflow: hidden;
  background-color: #fff;
  margin: 1.25rem 10%;
  padding: 2% 5%;
  .designer-title {
    text-align: center;
    font-weight: 700;
    font-size: 1.5625rem;
    padding: 3.125rem 0;
    padding-bottom: 1.5rem;
  }
}
.desc {
  font-size: 0.9rem;
  line-height: 1.5rem;
  text-align: center;
}

.step-box {
  width: 43rem;
  height: 6.25rem;
  margin: auto;
  margin-top: 1.875rem;
}
.round span {
  font-size: 1rem;
  display: inline-block;
  line-height: 3.125rem;
  overflow: hidden;
}
.step-box ul.step-img {
  position: relative;
  list-style-type: none;
  margin: 0 1.875rem;
  padding: 0 0;
  width: 37.3125rem;
  height: 3.3125rem;
  background-image: url(../../assets/images/bg-gray.png);
  background-repeat: repeat-x;
  background-position: center;
}
.step-box ul li.round {
  position: absolute;
  top: 0;
  width: 3.125rem;
  height: 3.125rem;
  line-height: 3.125rem;
  background-color: #d5d5d5;
  border: 3px solid #fff;
  border-radius: 50%;
  color: #666;
  // font-family: Arial;
  text-align: center;
  font-size: 2.4rem;
}
.step-box ul li.round1 {
  left: -5px;
}
.step-box ul li.round2 {
  left: 11.75rem;
}
.step-box ul li.round3 {
  left: 23.8125rem;
}
.step-box ul li.round4 {
  left: 35.9375rem;
}
.step-box ul li.round5 {
  left: 47.875rem;
}
.step-box ul li.on {
  background-color: #4285f4;
  color: #fff;
}
.step-box ul li.on span {
  display: block;
  line-height: 3.2rem;
}
.step-box ul li.line,
.step-box ul li.line-on {
  float: left;
  width: 9.5rem;
  height: 3.3125rem;
  margin-left: 2.6rem;
}
.step-box ul li.line-on {
  background-image: url(../../assets/images/bg-loading.png);
  background-repeat: repeat-x;
  background-position: center;
}

/*---------------文字区域------------------*/
.step-box ul.text-box {
  list-style-type: none;
  margin: 0 auto;
  padding: 0 0;
  width: 43rem;
  height: 3.3125rem;
}
.step-box ul li.text {
  float: left;
  width: 6.25rem;
  // font-family: 'Microsoft YaHei';
  color: #666;
  font-size: 1rem;
  /*margin-right:95px;	*/
  margin-top: 1.25rem;
  margin: 1.25rem 2.875rem 0 2.875rem;
}
.step-box ul li.text:first-child {
  margin-left: 0.375rem;
}
.step-box ul li.text:last-child {
  margin-right: 0;
}
.personal-info {
  padding: 1.25rem;
}
.conpang-title {
  text-align: left;
  font-size: 0.875rem;
  height: 0.875rem;
  line-height: 0.875rem;
  border-left: 0.125rem solid #4285f4;
  padding-left: 0.3125rem;
  margin-top: 3.75rem;
  margin-bottom: 0.625rem;
  span {
    color: red;
  }
}
.form {
  margin-top: 0.3125rem;
  .nick-name {
    padding-bottom: 1.875rem;
  }
  p {
    text-align: left;
    color: #ccc;
  }

  .avatar-uploader .el-upload {
    border: 0.01rem dashed #d9d9d9;
    border-radius: 0.06rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 0.28rem;
    color: #8c939d;
    width: 1.78rem;
    height: 1.78rem;
    line-height: 1.78rem;
    text-align: center;
  }
  .avatar {
    // border-radius: 50%;
    width: 6.25rem;
    height: 6.25rem;
    display: block;
    margin: 0 auto;
  }
  .info-pb {
    margin-bottom: 1.375rem;
  }
  .span-input {
    display: inline-block !important;
    text-align: right;
    padding-right: 0.5rem;
    box-sizing: border-box;
    padding-left: 0 !important;
    text-align: left;
  }
  .span-tag {
    color: red;
    margin-right: 0.2rem;
  }
  .form-control {
    display: inline-block !important;
    width: 70% !important;
  }
  .zerror {
    width: 70%;
    margin: 0.25rem 0.8rem 0 0.8rem;
    font-size: 80%;
    color: #dc3545;
  }
}
.tag {
  color: red;
  float: left;
  margin-left: 0.2rem;
}
.tagtip {
  color: #057aff;
  text-align: right;
  cursor: pointer;
  font-size: 0.8rem;
  margin-top: 15px;
  display: inline-block;
}
.inputWrapper {
  position: relative;
  .tag {
    position: absolute;
    right: 1.875rem;
    bottom: 1rem;
    font-size: 0.875rem;
    color: #057aff;
    text-align: right;
    z-index: 1;
    cursor: pointer;
    font-weight: 400;
    transition: 0.2s ease-out;
    width: auto;
  }
  .feedback {
    position: absolute;
    bottom: -1.2rem;
    color: #f44336;
    font-size: 0.75rem;
  }
}
.demo-img {
  height: 100%;
}
.custom .el-icon-circle-plus-outline {
  font-size: 1.75rem;
  color: #8c939d;
  transform: translateY(130%);
  .uploadIDCardTips {
    display: block;
    text-align: center;
    font-size: 1.125rem;
    margin-top: 0.6251rem;
    color: #333;
  }
}
.license-img {
  background-color: #fff;
  border: 0.01rem dashed #d9d9d9;
  border-radius: 0.06rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 21.4rem;
  height: 13.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
}
.personal-info {
  padding: 1.25rem;
}
.edit-button {
  cursor: pointer;
  border: 0px;
  background: #4285f4;
  padding: 0.75rem 1.875rem;
  color: #fff;
  border-radius: 0.125rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}
.textAlignRight {
  text-align: left;
  line-height: 35px;
}
.addRedCricle:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>
<style lang="less">
.avatar-block .el-upload.el-upload--picture-card {
  width: 6.25rem;
  height: 6.25rem;
  display: block;
  margin: 0 auto;
  border-radius: 0 !important;
  .avatar {
    width: 100%;
    height: 100%;
  }
}
.card-img{
//   .upload-demo{
//     width:100% !important;
//     .el-upload{
//       width: 100% !important;
//       height: 12.5rem !important;
//     }
//     .el-upload-dragger{
//       width: 100% !important;
//       height: 100% !important;
//     }
//   }
}
</style>

