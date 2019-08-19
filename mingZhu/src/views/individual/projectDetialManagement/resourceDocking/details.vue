<template>
  <mdb-container class="mingzhu-main px-0">
    <mdb-row class="mb-4">
      <mdb-col md="5">
        <div class="date-box">
          <label  class="label-date" :class="disabled?'disabled':''">开标日期</label> 
          <mdb-date-picker
            class="w-100"
            :date="openDate"
            :option="option"
            @getValue="getPickerValue"
            :limit="limit"
            :class="disabled?'disabled':''"
          ></mdb-date-picker>
        </div>
        <div class="tip-error mt-2" v-if="beginTimeError">{{beginTimeError}}</div>
      </mdb-col>
      <mdb-col md="5">
        <div class="date-box">
          <label class="label-date" :class="disabled?'disabled':''">开标时间</label>
          <div id="time">
              <mdb-time-picker
                :value="openTime"
                id="openTime"
                :placeholder="openTime.time"
                :hoursFormat="24"
                @getValue="getPickerTime"
                :class="disabled?'disabled':''"
              />
          </div>
          <div class="tip-error mt-2" v-if="beginHMSError">{{beginHMSError}}</div>
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row  class="mb-4">
      <mdb-col md="5">
         <div class="outline-input">
            <mdb-input
              type="text"
              size="lg"
              label="开标地点"
              :disabled="disabled"
               @change="checkOpenArea"
              v-model="openingDetails.openArea"
              outline
            />
          </div>
          <div class="tip-error mt-2" v-if="openAreaFlagError">{{openAreaFlagError}}</div>
      </mdb-col>
      <mdb-col  md="5">
        <div class="outline-input">
          <mdb-input
            type="text"
            size="lg"
            label="拟参与开标人数（仅1人有投票权）"
            :disabled="disabled"
            v-model="openingDetails.openingNumber"
            @change="checkeDopeningNumber"
            outline
          />
        </div>
        <div class="tip-error mt-2" v-if="openingNumberError">{{openingNumberError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row  class="mb-4"  v-if="collectProgramType!=3">
      <mdb-col md="5" v-if="collectProgramType !=1">
        <div class="outline-input">
            <mdb-input
              type="text"
              size="lg"
              label="拟邀请建筑师数量"
              disabled
              v-model="openingDetails.designerNum"
              outline
            />
          </div>
          <div class="tip-error mt-2" v-if="designerNumError">{{designerNumError}}</div>
      </mdb-col>
      <mdb-col md="5">
        <div class="outline-input">
            <mdb-input
              type="text"
              size="lg"
              label="入围方案数量"
              disabled
              v-model="openingDetails.incircleRecomNum"
              outline
            />
        </div>
        <div class="tip-error mt-2" v-if="incircleRecomNumError">{{incircleRecomNumError}}</div>
      </mdb-col>
    </mdb-row>
    <!-- 中标方案选出方式 -->
    <mdb-row class="mb-4"  v-if="collectProgramType!=3">
      <mdb-col md="12">
        <p class="text-0">中标方案选出方式</p>
      </mdb-col>
      <mdb-col md="5">
        <div class="form-check pl-0" >
            <input
              type="radio"
              id="option6-1"
              name="option6"
              value="1"
              class="form-check-input"
              v-model="openingDetails.selectionMethod"
              @change="checkSelectionMethod"
              :disabled="disabled"
            >
            <label class="form-check-label" for="option6-1">专家评审直接确定顺序和中标方案</label>
          </div>
      </mdb-col>
      <mdb-col md="5">
        <div class="form-check pl-0">
          <input
            type="radio"
            id="option6-2"
            name="option6"
            value="2"
            class="form-check-input"
            v-model="openingDetails.selectionMethod"
            @change="checkSelectionMethod"
            :disabled="disabled"
          >
          <label class="form-check-label" for="option6-2">专家评审给出顺序，客户确定中标方案</label>
        </div>
      </mdb-col>
      <mdb-col md="12" class="tip-error mt-2" v-if="selectionMethodError">{{selectionMethodError}}</mdb-col>
    </mdb-row>
    <!-- 直播评审方式 -->
    <mdb-row class="mb-4">
      <mdb-col md="12"><p class="text-0">直播评审方式</p></mdb-col>
      <mdb-col md="5">
        <div class="form-check pl-0" >
          <input 
            type="radio" 
            class="form-check-input" 
            name="liveToAll"
            id="liveToAll1"
            v-model="openingDetails.liveToAll"
            value="2"
            @change="checkliveToAll"
            :disabled="disabled"
          >
          <label class="form-check-label" for="liveToAll1">面向客户和建筑师直播</label>
        </div>
      </mdb-col>
      <mdb-col md="5">
        <div class="form-check pl-0">
          <input 
            type="radio" 
            class="form-check-input" 
            name="liveToAll"
            id="liveToAll2"
            v-model="openingDetails.liveToAll"
            value="1"
            @change="checkliveToAll"
            :disabled="disabled"
          >
          <label class="form-check-label" for="liveToAll2">面向全网直播</label>
        </div>
      </mdb-col>
      <mdb-col md="12" class="tip-error mt-2" v-if="liveToAllError">{{liveToAllError}}</mdb-col>
    </mdb-row>
    <!-- 《招投标细则》 -->
    <mdb-row class="mb-4">
      <mdb-col>
        <div class="bidsRules">
          <input
            type="checkbox"
            class="form-check-input"
            name="projectType"
            value="true"
            v-model="read"
            id="mustCheckType"
            :disabled="disabled"
            @change="checkread"
          >
          <label class="form-check-label" for="mustCheckType">
            我已阅读
            <a  @click="close" style="display:inline;">《招投标细则》</a>
          </label>
        </div>
        <div class="tip-error mt-2" v-if="readError" style="text-align:center;">{{readError}}</div>
      </mdb-col>
    </mdb-row>
    <TenderDetialAgreement :showModal = "dialogVisible" @agreementClick = "agreementClick"></TenderDetialAgreement>
  </mdb-container>
</template>
<script>
import TenderDetialAgreement from '@/components/agreement/tenderDetial'
export default {
  props: ["res"],
  components:{TenderDetialAgreement},
  data() {
    return {
      openTime:{
        time:""
      },
      collectProgramType:null,
      disabled:false,
      limit: [
        {
          type: "weekday",
          available: [1, 2, 3, 4, 5, 6, 0]
        },
        {
          type: "fromto",
          from: new Date() - 3600 * 1000 * 24,
          to: ""
        }
      ],
      option: {
        type: "day",
        week: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        month: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        format: "YYYY/MM/DD",
        placeholder: "",
        inputStyle: {
          width: "100%",
          display: "inline-block",
          padding: "6px 0.725rem",
          "line-height": "1.375rem",
          "font-size": "0.875rem",
          border: "0.125rem solid #fff",
          "box-shadow": "0 1px 3px 0 rgba(0, 0, 0, 0.2)",
          "border-radius": "0.25rem",
          color: "#333"
        },
        color: {
          header: "primary",
          headerText: "white",
          checkedDay: "primary"
        },
        buttons: {
          ok: "确定",
          cancel: "取消"
        }
      },
      openDate: {
        time: ""
      },
      dialogVisible: false,
      formInline: {
        proince: null,
        city: null,
        area: null
      },
      openingDetails: {
        openAreaFlag: 1, // 是否有开标地点 1需求方提供 2平台提供
        openArea: "",// 开标地点
        openDate: null,// 开标时间
        openTime:null,//开标时间
        liveToAll: null,// 面向全网直播
        openingNumber: "",
        liveToParticipant: 1,
        projectId: this.$route.query.id,
        id: null,
        designerNum:"",
        incircleRecomNum:"",
        selectionMethod:"",
      },
      read:null,
      beginTimeError: null,
      beginHMSError:null,
      openingNumberError:null,
      openAreaFlagError:null,
      liveToAllError:null,
      liveToParticipantError:null,
      readError:null,
      selectionMethodError:null,
      incircleRecomNumError:null,
      designerNumError:null,
    };
  },
  methods: {
    agreementClick(val){
      this.read = val
      this.dialogVisible = false;
    },
    close(){
      this.dialogVisible = !this.dialogVisible;
    },
    getPickerTime(value){
      this.openingDetails.openTime = value
      if(!this.openingDetails.openTime){
        this.beginHMSError = "请选择开标时间";
      }else{
        this.beginHMSError = null
      }
    },
 
    checkIncircleRecomNum(value){
      if(event&&event.type=="message"){
        let reg =  /^[1-9][0-9]*$/;
        if(value){
          this.openingDetails.incircleRecomNum = value.replace( /[^0-9]/g,'')
        }
        if (!this.openingDetails.incircleRecomNum) {
          this.incircleRecomNumError = "请输入入围方案数量";
        } else if (!reg.test(this.openingDetails.incircleRecomNum)) {
          this.incircleRecomNumError = "您输入的格式有误";
        } else if(this.openingDetails.incircleRecomNum>=100){
            this.incircleRecomNumError ="您输入的长度有误"
        } else if(this.openingDetails.designerNum && this.openingDetails.designerNum<this.openingDetails.incircleRecomNum){
          this.incircleRecomNumError = "邀请设计师数量必须大于入围方案数量";
          this.designerNumError = null;
        }else {
          this.incircleRecomNumError = "";
        }
      }
    },
    checkDesignerNum(value){
      if(event&&event.type=="message"){
        let reg =  /^[1-9][0-9]*$/;
        if(value){
            this.openingDetails.designerNum = value.replace( /[^0-9]/g,'')
        }
        if (!this.openingDetails.designerNum) {
          this.designerNumError = "请输入拟委托设计师数量";
        } else if (!reg.test(this.openingDetails.designerNum)) {
          this.designerNumError = "您输入的格式有误";
        } else if(this.openingDetails.designerNum>=100){
          this.designerNumError ="您输入的长度有误"
        } else if(this.openingDetails.incircleRecomNum && this.openingDetails.incircleRecomNum > this.openingDetails.designerNum){
          this.designerNumError = "入围方案数量不能大于邀请设计师数量";
          this.incircleRecomNumError = null;
        }else {
          this.designerNumError = "";
        }
      }
    },
    checkSelectionMethod(){
      if (!this.openingDetails.selectionMethod) {
        this.selectionMethodError = "请选择中标方案选出方式";
      } else {
        this.selectionMethodError = "";
      }
    },
    checkread(){
      if(!this.read){
        this.readError ="请阅读招标细则"
      }else{
        this.readError =""
      }
    },
    checkOpenAreaFlag(){
      // if(!this.openingDetails.openAreaFlag){
      //   this.openAreaFlagError ="请选择是否有开标地点"
      // }else{
      //   this.openAreaFlagError =""
      // }
    },
    checkOpenArea(){
      if(!this.openingDetails.openArea){
        this.openAreaFlagError ="请输入开标地点"
      }else if(this.openingDetails.openArea.length>50){
        this.openAreaFlagError ="您输入的长度有误"
      }else{
        this.openAreaFlagError =""
      }
    },
    checkliveToAll(){
      if(!this.openingDetails.liveToAll){
        this.liveToAllError="请选择请选择直播评审方式"
      }else{
        this.liveToAllError=""
      }
    },
    checkLiveToParticipant(){
      if(!this.openingDetails.liveToParticipant){
        this.liveToParticipantError="请选择是否面向方案征集参与方直播"
      }else{
        this.liveToParticipantError=""
      }
    },
    getPickerValue(value) {
      this.openingDetails.openDate = value;
      this.beginTimeError = "请选择时间";
      let beginTime = Number(new Date(this.openingDetails.openDate));
      let nowData = Number(new Date());
      if (beginTime === 0) {
        this.beginTimeError = "请选择时间";
      } else if (beginTime < nowData) {
        this.beginTimeError = "开始时间应晚于当前时间";
      } else {
        this.beginTimeError = null;
      }
    },
    checkeDopeningNumber(value){
      if(event&&event.type=="message"){
        let reg = /^[1-9][0-9]*$/;
        if(value){
          this.openingDetails.openingNumber = value.replace( /[^0-9]/g,'')
        }
        if(!this.openingDetails.openingNumber){
          this.openingNumberError ="请输入贵方拟参与开标人数"
        } else if(!reg.test(this.openingDetails.openingNumber)){
          this.openingNumberError ="您输入的格式有误"
        } else if(Number(this.openingDetails.openingNumber)>=100){
          this.openingNumberError ="您输入的长度有误"
        }else{
          this.openingNumberError =""
        }
      }
    },
    accept() {
      this.dialogVisible = false;
    },
    emptyError(){
      // this.openAreaFlagError = null;
      // this.liveToParticipantError = null;
      this.liveToAllError = null;
      this.selectionMethodError = null;
    },
    checkLen(){
      let isCheckPass = true
      this.emptyError()
      if(this.openingDetails.openDate&&this.beginTimeError){
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.beginTimeError = null
      }
      if(this.openingDetails.openTime&&this.beginHMSError){
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.beginHMSError = null
      }
      // if(this.openingDetails.openAreaFlag==1){
      // if(this.openingDetails.openArea.length>50){
      //   this.openAreaFlagError ="您输入的长度有误"
      //   document.documentElement.scrollTop = 200;
      //   isCheckPass = false;
      // }
      // }

      if(this.openingDetails.openArea&&this.openAreaFlagError){
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.openAreaFlagError = null;
      }
      if(this.openingDetails.openingNumber&&this.openingNumberError){
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.openingNumberError = null;
      }
      // if(this.openingDetails.incircleRecomNum&&this.incircleRecomNumError){
      //   document.documentElement.scrollTop = 200;
      //   isCheckPass = false;
      // }else{
      //   this.incircleRecomNumError = null;
      // }
      // if(this.collectProgramType !=1){
      //   if(this.openingDetails.designerNum&&this.designerNumError){
      //     document.documentElement.scrollTop = 200;
      //     isCheckPass = false;
      //   }else{
      //     this.designerNumError = null;
      //   }
      // }
      return isCheckPass
    },
    temporarilySave() {
      let isCheckPass = this.checkLen();
      if(isCheckPass){
        this.openingDetails.projectId = this.$route.query.id;
        this.openingDetails.type = 1
        if(this.openingDetails.liveToParticipant){
          this.openingDetails.liveToParticipant = 1
        }else{
          this.openingDetails.liveToParticipant =2
        }
        this.api.openingDetailsUpdate(this.openingDetails).then(res => {
          if (res.code == 0) {
            this.$message("已保存,若需填写下一页,请提交!");
            this.openingDetails.id = res.data;
          } else {
            this.$message(res.msg);
          }
        });
      }
      return isCheckPass
    },
    checkForm() {
      let isCheckPass = true;
      if (!this.openingDetails.openDate||this.beginTimeError) {
        this.beginTimeError ="请选择开标日期"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(!this.openingDetails.openTime||this.beginHMSError){
        this.beginHMSError ="请选择开标时间"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(!this.openingDetails.openingNumber||this.openingNumberError){
        this.openingNumberError ="请输入贵方拟参与开标人数"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(!this.openingDetails.openArea||this.openAreaFlagError){
        this.openAreaFlagError ="请输入开标地点"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      // if(!this.openingDetails.openAreaFlag||this.openAreaFlagError){
      //   this.openAreaFlagError ="请选择是否有开标地点"
      //    document.documentElement.scrollTop = 200;
      //   isCheckPass = false;
      // }else{
      //   if(this.openingDetails.openAreaFlag==1){
      //     if(!this.openingDetails.openArea||this.openAreaFlagError){
      //       this.openAreaFlagError ="请输入开标地点"
      //       document.documentElement.scrollTop = 200;
      //       isCheckPass = false;
      //     }
      //   }else if(this.openingDetails.openAreaFlag==2){
      //     this.openingDetails.openArea=""
      //   }
      // }

      if(!this.openingDetails.liveToAll||this.liveToAllError){
        this.liveToAllError="请选择直播评审方式"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      // if(!this.openingDetails.liveToParticipant||this.liveToParticipantError){
      //   this.liveToParticipantError="请选择是否面向方案征集参与方直播"
      //   document.documentElement.scrollTop = 200;
      //   isCheckPass = false;
      // }
      // if (!this.openingDetails.incircleRecomNum||this.incircleRecomNumError) {
      //   this.incircleRecomNumError = "请输入入围方案数量";
      //   document.documentElement.scrollTop = 200;
      //   isCheckPass = false;
      // }
      // if (this.collectProgramType !=1&&(!this.openingDetails.designerNum||this.designerNumError)) {
      //   this.designerNumError = "请输入拟委托设计师数量";
      //   document.documentElement.scrollTop = 200;
      //   isCheckPass = false;
      // }
      if (!this.openingDetails.selectionMethod||this.selectionMethodError) {
        this.selectionMethodError = "请选择中标方案选出方式";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      return isCheckPass;
    },
    submit() {
      if(!this.read){
         this.$message("请阅读招标细则");
         return;
      }
      let isCheckPass = this.checkForm();
      if (isCheckPass) {
        this.openingDetails.projectId = this.$route.query.id;
        this.openingDetails.type = 1
        if(this.openingDetails.liveToParticipant){
          this.openingDetails.liveToParticipant = 1
        }
        this.api.openingDetailsSubmit(this.openingDetails).then(res => {
          if (res.code == 0) {
            this.$message("操作成功");
            this.openingDetails.id = res.data;
          } else {
            this.$message(res.msg);
          }
        });
      }
      return isCheckPass;
    }
  },
  created() {
    this.api.required(this.$route.query.id).then(res => {
      if(res.code==0){
        this.collectProgramType = res.data.projectDO.collectProgramType;
        this.openingDetails.designerNum = res.data.projectDO.designerNum;
        this.openingDetails.incircleRecomNum = res.data.projectDO.incircleRecomNum;
        this.openingDetails.selectionMethod = res.data.projectDO.selectionMethod;
        this.expertAdviceFlag = res.data.projectDO.expertAdviceFlag;
        if (res.data.requiredOpenBidDO != null) {
          this.openingDetails.id = res.data.requiredOpenBidDO.id;
          this.openingDetails.openAreaFlag = res.data.requiredOpenBidDO.openAreaFlag;
          this.openingDetails.openArea = res.data.requiredOpenBidDO.openArea;
          this.openingDetails.openDate = 
            res.data.requiredOpenBidDO.openDate?res.data.requiredOpenBidDO.openDate.split(" ")[0]:"";
          this.openingDetails.openTime = res.data.requiredOpenBidDO.openTime
          this.openingDetails.liveToAll = res.data.requiredOpenBidDO.liveToAll;
          this.openingDetails.openingNumber = 
            res.data.requiredOpenBidDO.openingNumber?res.data.requiredOpenBidDO.openingNumber:"";
          if(res.data.requiredOpenBidDO.liveToParticipant==1){
            this.openingDetails.liveToParticipant = 1;
          }
          this.openDate.time = this.openingDetails.openDate;
          this.openTime.time = this.openingDetails.openTime;
          if(res.data.requiredOpenBidDO.nonEditable==0){
            this.disabled=true
            this.read = true
          }
        }
        if(res.data.projectDO&&res.data.projectDO.auditState==5||
        (res.data.requiredOpenBidDO&&res.data.requiredOpenBidDO.auditState&&res.data.requiredOpenBidDO.auditState!=3)
        ){
          this.disabled=true
          this.read = true
        }
      }
    });
  }
};
</script>
<style lang="less" scoped>
.mingzhu-main {
  font-size: 0.875rem;
  .text-0{
    margin-bottom:0.875rem; 
    color: #333;
  }
  .tip-error{
    color:red;
  }
  .bidsRules{
    text-align: center;
    font-size: 1rem;
  }        
}
</style>
<style lang="less">
.mingzhu-main {
  .cov-vue-date{
    input{
      width: 100% !important;
      height: 3.125rem;
    }
  }
  .week ul li{
    height: 3.125rem !important;
    min-height: 3.125rem !important;
  }
 .week ul li::after{
    height: 0;
    display: none;
  }
  .datepickbox{
    input{
      box-shadow: none !important;
      border: 0.0625rem solid #dadce0  !important;
      border-radius: 0.25rem  !important;
    }
  }
  #time {
    .md-form {
      margin-top: 0 !important;
      margin-bottom:0 !important;
      input {
        width: 20.9375rem;
        padding: 0.375rem;
        line-height: 2.1875rem;
        font-size: 1rem;
        box-shadow: none !important;
        border: 1px solid #dadce0  !important;
        border-radius: 0.25rem  !important;
        color: rgb(95, 95, 95);
        margin-bottom: 0;
      }
    }
  }
  #time .form-control.timepicker {
    margin-right: 0 !important;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>

