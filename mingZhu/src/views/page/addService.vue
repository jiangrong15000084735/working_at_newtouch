<template>
  <mdb-container class="addService" >
    <mdb-container class="px-0 mx-0" v-show="panelIndex==0&&type!=1" :class="{'isMobile': isMobile}">
      <mdb-row class="mx-0">
        <mdb-col md="2" class="px-0">
          <div class="border border-top-0 border-bottom-0 border-right-0 border-dark" style="border-width: 10px !important;">
            <h2 class="h2 ml-3 font-weight">
              合筑
              <br/>
              增值服务  
            </h2>
          </div>
        </mdb-col>
        <mdb-col md="10" class="px-0">
          <mdb-row class="mx-0" v-for="(item, index) in idList" :key="index">
            <mdb-col md="11" sm="11" class="addServiceContent px-0" :class="index==0?'firstItem':''">
              <h4 class="h4 font-weight">
                <span :class="'service'+index%3"></span>
                {{item.name}}  
              </h4>
              <p>
                {{item.intro}}
              </p>
            </mdb-col>
            <mdb-col md="1" sm="1" class="text-right px-0 inputWrapper">
              <div class="form-check form-check-inline ">
                <input type="checkbox" class="form-check-input" 
                  v-model="item.checked"
                  :disabled="disabled"
                  :id="item.id">
                <label class="form-check-label" :for="item.id">
                  <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;"></font>
                  </font>
                </label>
              </div>
            </mdb-col>
          </mdb-row>

          <mdb-row class="isCheckWrapper">
            <mdb-col md="11" class="text-center">
              <div>
                <div class="form-check" style="padding-left:0.9375rem;display: inline-block;vertical-align: middle;">
                  <input 
                    type="checkbox"
                    class="form-check-input" 
                    name="agreement"
                    :value="true"
                    :disabled="disabled"
                    v-model="isChecked"
                    @change="agreementClick(isChecked)"
                    id="materialChecked2">
                  <label class="form-check-label" for="materialChecked2"></label>
                </div><a @click.prevent="close" style="text-decoration:underline;" class="agreement">我同意合筑增值服务协议</a>
              </div>
            </mdb-col>
          </mdb-row>
          <mdb-row>
            <mdb-col  md="11" class="text-center mb-5">
              <mdb-btn color="primary" class="my-0 btn212_60" @click="submit(1)">下一步</mdb-btn>
            </mdb-col>
          </mdb-row>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <mdb-container v-show="panelIndex==1">
      <mdb-row>
        <mdb-col md="2">
          <div class="border border-top-0 border-bottom-0 border-right-0 border-dark" style="border-width: 10px !important;">
            <h2 class="h2 ml-3 font-weight">
              完成  
              <br/>
              购买
            </h2>
          </div>
        </mdb-col>
        <mdb-col md="10" class="px-0">
          <mdb-stepper simpleV class="stepWrapper">
            <li class="completed" slot="simple"  :class="[disabled?'stepOne':'']">
              <a class="stepNum" @click="showSlideOne">
                <span v-if="!disabled" class="circle">1</span>
                <span v-else class="circle circleCheck">
                  <mdb-icon class="check" icon="check" />
                </span>
                <span class="label">填写项目基本信息</span>
              </a>
              <div class="step-content" v-if="!noPay">
                <mdb-container class="px-0">
                  <mdb-row class="mx-0">
                    <mdb-col md="10" class="px-0" style="position:relative;margin-top:12px;">
                      <div class="outline-input">
                        <mdb-input label="项目名称" :disabled= "disabled" v-model.trim="projectName" size="lg" outline/>
                      </div>
                    </mdb-col>
                  </mdb-row>
                  <mdb-row class="mx-0">
                    <mdb-col md="10" class="px-0" style="position:relative;margin-top:32px;">
                      <div class="outline-input">
                        <mdb-input label="建设地点" :disabled= "disabled" v-model.trim="adress" />
                      </div>
                    </mdb-col>
                  </mdb-row>
                  <mdb-row class="mx-0">
                    <mdb-col md="10" class="px-0">
                      <label for="employerInfo" style="font-size:12px;" class="form-label marginTop">客户类型
                      </label>
                      <div id="employerInfo" class="employerInfo">
                        <div class="form-check form-check-inline" v-for="(item,index) in employerInfoList" :key="index">
                            <input type="radio" 
                            name="inlineMaterialRadio" 
                            class="form-check-input"
                            :disabled= "disabled"
                            :checked="item.id==employerInfo"
                            @change="getValue(item.id)"
                            :id="'item'+item.id">
                            <label class="form-check-label" :for="'item'+item.id">
                              <font style="vertical-align: inherit;">
                                <font style="vertical-align: inherit;">{{item.name}}</font>
                              </font>
                            </label>
                          </div>
                      </div>
                    </mdb-col>
                  </mdb-row>
                  <mdb-row class="mx-0"  v-show="!disabled">
                    <mdb-col md="10" class="text-left px-0 btns">
                      <mdb-btn color="primary" :disabled= "disabledBtn" class="my-0 mx-0 btn110_30" @click="submit(2)">确认</mdb-btn>
                      <!-- <mdb-btn color="primary" class="my-0 nextBtnSm btnBack110_30" @click="backStep1(0)">返回</mdb-btn> -->
                    </mdb-col>
                  </mdb-row>
                  <mdb-row class="mx-0">
                    <mdb-col class="px-0">
                      <div class="lineDotted"></div>
                    </mdb-col>
                  </mdb-row>
                </mdb-container>
              </div>
              <div class="step-content" v-else>
                <mdb-col class="px-0">
                  <p style="font-size:12px;color:#999;margin-bottom:38px;">已提交</p>
                </mdb-col>
              </div>
            </li>
            <li class="completed" slot="simple">
              <a class="stepNum">
                <span v-if="Selservicebox.statues>=2" class="circle circleCheck">
                  <mdb-icon class="check" icon="check" />
                </span>
                <span v-else class="circle">2</span>
                <span class="label">完成您的支付</span>
              </a>
              <div class="step-content" v-if="showSlide">
                <mdb-container class="px-0">
                  <mdb-row class="mx-0">
                    <mdb-col class="px-0 idWrapper">
                      <p>合筑账号：<span style="font-weight:700;">65241387646565</span></p>
                    </mdb-col>
                  </mdb-row>
                  <mdb-row class="mx-0">
                    <mdb-col class="px-0" v-for="(item,index) in SellistService" :key="index">
                      <p class="idWrapper">您所选的增值服务：{{item.name}}</p>
                      <p class="info" >{{item.intro}}</p>
                    </mdb-col>
                  </mdb-row>
                  <mdb-row class="mx-0">
                    <mdb-col class="px-0 texWrapper">
                      <p>合筑工作人员将会立即与您沟通，请尽快完成支付！</p>
                      <p>完成后请点击下方按钮上传支付凭证</p>
                    </mdb-col>
                  </mdb-row>
                  <mdb-row class="mx-0">
                    <mdb-col class="text-left px-0">
                      <div class="downLoad-warp">
                        <div style="display:inline-block;vertical-align:baseline;">
                          <div v-if="Selservicebox.statues<2" style="margin-right:20px;">
                            <el-upload 
                            class="upload-demo"
                            :action="api.upload()"
                            :on-success="saveProjectMoney"
                            :before-upload="beforeAvatarUpload" 
                            :show-file-list="false">
                              <mdb-btn color="primary" class="my-0 mx-0 btn110_30">上传凭证</mdb-btn>
                            </el-upload>
                          </div>
                        </div>
                        <div style="display:inline-block;vertical-align:top;" v-if="fileList.length>0">
                          <div v-for="(item,index) in fileList" :key="index">
                            <div class="download">
                              <a
                                class="py-0 px-0"
                                style="color:#333;font-size:16px;"
                                :href="origin+'/Mingzhu/common/sysFile/download/'+item.voucher+'/'+item.name"
                                :download="item.name"
                              >{{item.name}}</a>
                            </div>
                          </div>
                        </div>
                        <div style="display:inline-block;vertical-align:top;" v-else>
                          <div class="detail-img" style="font-size:16px;color:#999;">
                            请上传凭证
                          </div>
                        </div>
                      </div>
                    </mdb-col>
                  </mdb-row>
                  <mdb-row class="mx-0">
                    <mdb-col class="px-0">
                      <div style="margin-top:42px;border-bottom:1px dotted #f2f2f2;"></div>
                    </mdb-col>
                  </mdb-row>
                  <!-- <mdb-col class="text-center" style="margin:24px 0;">
                    <mdb-btn color="primary" class="my-0 nextBtn">完成</mdb-btn>
                    <mdb-btn color="primary" class="my-0 nextBtn nextBtnSmBack">返回</mdb-btn>
                  </mdb-col> -->
                </mdb-container>
              </div>
            </li>
          </mdb-stepper>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <AddServiceAgreement :showModal="showModal" @agreementClick = "agreementClick"></AddServiceAgreement>
  </mdb-container>
</template>

<script type="text/javascript">
import AddServiceAgreement from '@/components/agreement/addService'
import { mapGetters } from "vuex"
export default {
  components:{AddServiceAgreement},
  data() {
    return {
      showModal:false,
      tip1:false,
      panelIndex: 0,
      fileList: [],
      origin: "",
      isChecked:false,
      projectName: '',
      adress: '',
      projectType: '',
      idList: [],
      employerInfo:null,
      employerInfoList: [
        {
          id: 0,
          name: "个人"
        },
        {
          id: 1,
          name: "企业"
        },
        {
          id: 2,
          name: "政府机构"
        },
        {
          id: 3,
          name: "其它"
        }
      ],
      createUser:'',
      listService:[],
      type:'',
      payListService:[],
      id:'',
      SellistService:[],
      Selservicebox:{},
      disabled:false,
      disabledBtn:false,
      noPay:false,// 判断第一步显示隐藏
      showSlide:false,// 判断第二步显示隐藏
      auditState:null,
    }
  },
  computed:{
    ...mapGetters(['getIsLogin']),
    hasPay(){
      return this.Selservicebox.statues<2
    },
    // noPay(){
    //   return this.Selservicebox.statues<2
    // }
  },
  created() {
    this.origin = location.origin;
  },
  mounted() {
    this.id = this.$route.query.id
    if(this.id){
      this.getServicesByPackageId()
      // 查询增值服务支付凭证
      this.getPackgeUrl()
    }
    this.type = this.$route.query.type
    // if(this.type){
    //   this.panelIndex = this.type
    // }
    this.createUser = localStorage.getItem("userId") || sessionStorage.getItem("userId")
    // if(!this.id){
      // 查询增值包
    if(!this.$route.query.actives){
      this.getAllToBePaid()
    }
    // }
    this.valueaddedServiceList()
    
  },
  methods: {
    close(){
      this.showModal = !this.showModal;
    },
    agreementClick(val){
      console.log(val)
      this.isChecked=val;
      this.showModal = false;
    },
    showSlideOne() {
      if(this.disabled){
        this.noPay = !this.noPay
      }
    },
    showSlidePay(){
      if(this.disabled){
        this.showSlide = !this.showSlide
      }
    },
    getServicesByPackageId(){ // 获取保存的增值服务信息
      this.api.getServicesByPackageId(this.id).then(res => {
        if(res.code!=0){
          this.$message.error(res.msg)
          return
        }
        this.disabled = true
        this.isChecked = true
        this.panelIndex = 1
        this.SellistService = res.data.valueaddedServiceDOS
        // this.idList = res.data.valueaddedServiceDOS
        for (let index = 0; index < this.idList.length; index++) {
          this.idList[index].checked = true
        }
        this.Selservicebox = res.data.valueaddedPackageDO
        // this.noPay=this.Selservicebox.statues<2?true:false
        this.auditState = this.Selservicebox.auditState;  // 4提交二审 5二审通过
        if(this.Selservicebox.auditState<5){
          this.noPay = false
        }else if(this.Selservicebox.auditState==5){
          this.noPay = true
        }
        // if(this.disabled){
        //   this.showSlide = true
        // }else{
          // this.showSlide=this.Selservicebox.statues<2?false:true
          this.showSlide = this.Selservicebox.auditState==5?true:false;
        // }
        this.projectName = res.data.valueaddedPackageDO.projectName
        this.adress = res.data.valueaddedPackageDO.adress
        this.employerInfo =res.data.valueaddedPackageDO.employerInfo
      })
    },
    getValue (val) {
      this.employerInfo = val
    },
    getAllToBePaid() {
      this.api.getAllToBeConfirmed(this.createUser).then(res => {
        if (res.code !== 0) {
          return;
        }
       
        if(res.data){
          this.$router.push({
            path:"addService",
            query:{
              id:res.data[0].id
            }
          })
        }else{
          this.$router.push({
            path:"addService"
          })
        }
        // this.payListService =res.data
        // this.id = res.data[0].id
        // this.getServicesByPackageId()
        
      });
    },
    submit(index) {
      if (!this.getIsLogin) {
        // 未登陆处理
        this.loginHandle();
        return false;
      }
      if(index == 1){
        let hasSel = this.idList.filter(item => {
          return item.checked == true
        })
        if(hasSel.length===0){
          this.$message.error("请选择合筑增值服务")
          return
        }
        if(!this.isChecked){
          this.$message.error("请同意合筑增值服务协议")
          return
        }
        this.panelIndex = index
        document.documentElement.scrollTop = 0
      }else{
        if(!this.projectName){
          this.$message.error("请输入项目名称")
          return
        }
        if(this.projectName.length>20){
          this.$message.error("项目名称长度必须小于20")
          return
        }
        if(!this.adress){
          this.$message.error("请输入建筑地点")
          return
        }
        if(this.adress.length>50){
          this.$message.error("建设地点长度必须小于50")
          return
        }
        if(this.employerInfo === "" || this.employerInfo ==null){
          this.$message.error("请选择客户类型")
          return
        }
        this.valueaddedPackage()
        // this.panelIndex = index

      }
    },
    backStep1(index){
      this.panelIndex = index
    },
    valueaddedServiceList() {
      this.api.valueaddedServiceList({limit:99}).then(res => {
        if(res.code!=0){
          this.$message.error(res.code)
          return
        }
        this.idList = res.data.rows?res.data.rows:[]
      })
    },
    valueaddedPackage() {
      this.disabledBtn = true
      let params = {
        createUser:this.createUser,
        projectName:this.projectName,
        adress:this.adress,
        employerInfo: this.employerInfo
      }
      let valuesArr = this.idList.filter(item => {
        return item.checked == true
      })
      let valueIds = valuesArr.map(item => {
        return item.id
      })
      params.valueIds = valueIds
      this.api.valueaddedPackage(params).then(res => {
        if(res.code ==0){
          this.disabled = true
          this.$message.info(res.msg)
          this.id = res.data
          this.getServicesByPackageId()
          // this.$router.push({
          //   path:"addServiceEnd",
          //   query:{
          //     id: res.data
          //   }
          // })
        }else{
          this.$message.error(res.msg)
        }
        this.disabledBtn = false
      })
    },
    gopack(id){
      this.$router.push({
        path:"addServiceEnd",
        query:{
          id:id
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
    // 上传成功

     saveProjectMoney(res, file) {
        //file.name原名
        let params = {
          id: this.id,
          voucher: res.msg,
          voucherName: file.name
        }
        this.api.packageUpdate(params).then(res => {
          if(res.code!=0){
            this.$message.error(res.msg)
            if(res.msg.indexOf("增值包已失效")!=-1){
              this.$router.push({
                path:"addService"
              })
            }
            return
          }
          this.$message(res.msg)
          // 查询增值服务支付凭证
          this.getPackgeUrl()
        })
    },
    getPackgeUrl() {
      let params = {
          id: this.id,
        }
        this.api.getPackgeUrl(params).then(res => {
          if(res.data.name){
            this.fileList= [
              {
                name:res.data.name,
                voucher:res.data.voucher
              }
            ]
          }else{
             this.fileList= []
          }
        })
    },
    remove(val) {
      this.api.removeProjectMoney({
        id: val
      })
      .then(res => {
        this.listProjectMoney();
      });
    },
    // 未登陆处理
    loginHandle() {
      // 调用登陆框
      Bus.$emit("loginBox",'');
    }
  },
  watch:{
    $route(to,from) {
      // this.type = this.$route.query.type
      // if(this.type == 1){
      //   this.getAllToBePaid()
      // }
      // this.valueaddedServiceList()
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
.agreement{
  display:inline-block;
  vertical-align: middle;
  height: 1.5625rem;
  line-height: 1.5625rem;
  text-decoration:underline;
}
.agreement:visited{
  
}
.agreement:hover{
  color: #4285f4 !important;
}
.font-weight{
  font-weight: 600;
}
.addService{
  // margin-top: 3.375rem;
  min-height: 100%;
  // width:1253px;
  margin: 10rem auto 0;
  .addServiceTitle{
    // width: 370px;
    max-width: 372px;
    box-sizing: border-box;
    padding: 0;
    h3 {
      padding-top: 30px;
      padding-bottom: 30px;
      padding-left: 22px;
      padding-right: 164px;
      font-size: 44px;
      color: #333;
      font-weight: 700;
      display: inline-block;
      border-left: 10px solid #333;
    }
  }
  .serContent{
    width: 881px;
    max-width: 881px;
  }
  .addServiceContent{
    // width: 758px;
    // max-width: 758px;
    border-bottom: 1px solid #e0e0e0;
    margin-top: 1.875rem;
    padding-bottom: 4.0625rem;
    // h4{
    //   font-size: 30px;
    //   color: #333;
    //   padding-bottom: 5px;
    //   display: inline-block;
    //   font-weight: 600;
    // }
    .service0{
      display: inline-block;
      width: 1.5625rem;
      height: 1.75rem;
      margin-right: 0.875rem;
      vertical-align:sub;
      background-size: 100%;
      background: url('./../../assets/images/ser0.png') no-repeat;
    }
    .service1{
      display: inline-block;
      width: 1.625rem;
      height: 1.5rem;
      margin-right: 0.75rem;
      vertical-align:sub;
      background-size: 100%;
      background: url('./../../assets/images/ser1.png') no-repeat;
    }
    .service2{
      display: inline-block;
      width: 1.625rem;
      height: 1.75rem;
      margin-right: 0.75rem;
      vertical-align: sub;
      background-size: 100%;
      background: url('./../../assets/images/ser2.png') no-repeat;
    }
    p{
      text-align: justify;
      font-size:1rem;
      color:#999;
    }
  }
  .firstItem{
    margin-top: 0px;
  }
  .downLoad-warp {
    .upLoad-title {
      margin-bottom: 32px;
      font-weight: 600;
    }
    .detail-img {
      margin: 3.2px;
      display: inline-block;
      text-align: center;
      position: relative;
      .el-icon-plus {
        font-size: 60px;
      }
      .delete-icon {
        position: absolute;
        top: -1.6px;
        color: #ababab;
        right: -1.6px;
        font-size: 3.2px;
        font-weight: bold;
      }
    }
    .detail-img img {
      width: 60px;
      height: 60px;
    }
  }
  #employerInfo {
    .form-check {
      display: inline-block;
      padding-bottom: 0;
      padding-top: 16px;
      margin-right: 0;
      padding-left: 0;
      font-size: 16px;
    }
  }
  .handleTip {
    cursor: pointer;
    font-size: 14px;
    color: #4699ff;
    margin: 48px 8px 32px;
  }
  .isCheckWrapper{
    padding: 45px 0 60px;
    .isagreen{
      font-size: 18px;
      padding-bottom: 2px;
      border-bottom: 1px solid #666;
      color: #666;
    }
  }
  .nextBtn{
    width: 212px;
    height: 60px;
  }
  .btns{
    margin: 31px 0 42px;
  }
  .nextBtnSm{
    width: 110px;
    height: 30px;
    line-height: 30px;
    padding: 0;
  }
  .nextBtnSmBack{
    background-color: #f2f2f2!important;
    color: #4285f4!important;
    margin-left: 38px;
  }
  .nextBtnSmBack:hover{
    background-color: #f5f5f5!important;
  }
  .itemWrapper{
    margin-top: 30px;
    padding-bottom: 65px;
  }
  .inputWrapper{
    // width: 123px;
    // max-width: 123px;
    .form-check-inline{
      height: 100%;
      margin: 0;
    }
    .form-check-label{
      padding-left: 20px!important;
    }
  }
  .stepWrapper{
    // width: 731px;
    width:100%;
    .stepper-vertical{
      padding: 0;
      margin: 0;
    }
    .stepNum{
      padding:0 0 3px;
      .label{
        color: #333;
        font-size: 16px;
        font-weight: normal;
      }
      .circle{
        // background-color: #fff!important;
        // color: #1fdbb6;
        // border: 2px solid #1fdbb6;
        font-weight: 700;
        box-sizing: border-box;
        margin-right: 15px;
        width: 30px;
        height: 30px;
        line-height: 30px;
      }
      .circleCheck{
         background-color: #1fdbb6!important;
         color: #fff;
      }
    }
    .step-content{
      // width: 686px;
      width:100%;
      padding: 0;
      margin-left: 45px;
      .marginTop{
        margin-top: 20px;
      }
      .info{
        margin-bottom:24px;
        font-size:12px;
        color:#999;
      }
    }
    .stepper-vertical li:not(:last-child):after {
      height: 100%;
      top: 28px;
      left: 13px;
      width: 2px;
    }
    .stepper-vertical li.stepOne:after {
      background-color: #1fdbb6;
    }
    .employerInfo{
      display: flex;
      justify-content: space-between;
    }
    .idWrapper{
      margin: 10px 0 12px;
      p{
        font-size: 12px;
        color: #333;
      }
    }
    .texWrapper{
      height: 45px;
      margin-bottom: 32px;
      p{
        font-size: 14px;
        color: #666;
      }
    }
  }
  .nextContent{
    width: 1020px;
    margin: auto;
  }
  .lineDotted{
    margin-top: 42px;
    margin-bottom: 28px;
    border-bottom: 1px dotted #f2f2f2;
  }
}
// 手机端样式
.addService.isMobile{
  width: 100%;
  margin-top: 3.125rem /* 50/16 */;
  .nextContent{
    width: 100%;
  }
  .serContent{
    width: 100%;
    .serList{
      padding-left: .625rem /* 10/16 */;
      padding-right: .625rem /* 10/16 */;
    }
  }
  .stepWrapper{
    width: 100%;
    .step-content{
      width: 100%;
      margin-left: 0;
      padding-left: 2.5rem /* 40/16 */;
      padding-right: 2.5rem /* 40/16 */;
    }
  }
}
</style>
<style lang="less">
.employerInfoSelect .lxx-radio{
  flex:0 0 6rem!important;
}
.addService{
  .stepWrapper>.row{
    margin: 0!important;
  }
  .stepWrapper>.row>.col-md-12{
    margin: 0;
    padding: 0;
  }
  .stepWrapper{
    .stepper-vertical{
      padding: 0;
      margin: 0;
    }
    .step-content .form-control{
      margin-bottom:0; 
      height: 50px;
      font-size: 14px;
      color: #333;
    }
    .step-content{
      label{
        font-size: 14px!important;
        color: #999;
      }
      .outline-input{
        label{
          top:15px;
        }
        label.active{
          top:10px;
        }
      }
      label.active{
        font-size: 12px!important;
      }
    }
  }
}
</style>