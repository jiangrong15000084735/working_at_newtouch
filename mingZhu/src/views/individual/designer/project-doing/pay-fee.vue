<template>
  <div class="p-body payFee" v-loading.fullscreenLoading="loading">
    <div class="body-detail">
      <div class="head-title">
        <h3>{{projectName}}</h3>
        <div @click="deleteBtn" class="backBtn"><img src="@/assets/images/backIcon.png"/>返回上一页</div>
      </div>
      <div class="step-wrapper">
        <div class="payFeeTitle">
          <h3>
            支付  
            <br/>
            费用
          </h3>
        </div>
        <div class="aqLeft px-0">
          <div class="noRuWei" v-if="!Incircle">
            <div class="noRuWeiBox">
              <mdb-icon class="frownIcon" far icon="frown" />
              <span class="spanT">您未入围，感谢您的参与！</span>
            </div>
          </div>
          <mdb-stepper v-else style="background:#fff;" simpleV class="progress-stepper" :class="{origin: activeIndex === -1}">
            <li style="width:100%" :class="{stepOver:additionalFileList.length>0}" slot="simple">
              <a class="stepA"  @click="go(0)">
                <span v-if="landLimitfileList.length==0" class="circle">1</span>
                <span v-else class="circle circleCheck">
                  <mdb-icon class="check" icon="check" />
                </span>
                <span class="label">{{steppers[0].title}}</span>
              </a>
              <div class="step-view step-content px-0 py-0" style="text-align: left;" v-show="activeIndex==0">
                <div class="addressBox">
                  <span class="addressTitle">公司地址：</span>
                  <span class="address">上海市 静安区 静安区</span>
                </div>
                <div class="addressBox">
                  <span class="addressTitle">财务地址：</span>
                  <span class="address">上海市 静安区 静安区</span>
                </div>
                <p class="contentP">发票相关文案发票相关文案发票相关文案发票相关文案发票相关文案发票相关文案发票相关文案发票相关文案发票相关文案发票相关文案发票相关文案发票相关文案发票相关文案发票相关文案</p>
                <div class="uploadDiv">
                  <UpLoad 
                  :list="landLimitfileList"
                  :isShow="showBtn" 
                  :saveProjectMoney="landLimitInfoUpload"
                  :accept="'.jpg, .jpeg, .png, .JPG, .JPEG, .bmp, .pdf'"
                  :btnName="'上传发票'"
                  ></UpLoad>
                </div>
              </div> 
            </li>
            <li style="width:100%" slot="simple">
              <a class="stepA"  @click="go(1)">
                <span v-if="additionalFileList.length==0" class="circle">2</span>
                <span v-else class="circle circleCheck">
                  <mdb-icon class="check" icon="check" />
                </span>
                <span class="label">{{steppers[1].title}}</span>
              </a>
              <div class="step-view step-content manuContent" style="text-align:left;" v-show="activeIndex==1">
                <div>
                  <div class="process-detail pro-wrapper">
                    <div style="display:inline-block;text-align:left;" 
                      v-for="(item,index) in additionalFileList"
                      :key="index">
                      <ImgCom  :fileName="item.fileName" :filePath="item.filePath"></ImgCom>
                  </div>
                  </div>
                </div>
              </div> 
            </li>
          </mdb-stepper>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UpLoad from "@/components/upLoad"
import ImgCom from "@/components/imgCom"
let Base64=require('js-base64').Base64
export default {
  data() {
    return {
      accept:".rar,.zip",
      isConformSubmit:false,
      manuType:[
        // { text: '中间成果', value: '1', selected: true },
        { text: '最终成果', value: '2', selected: true}
      ],
      landLimitfileList: [],
      showBtn:true,
      id: this.$route.query.id,
      upLoadManu: false,
      steppers: [{
        title: '请上传真实有效的发票扫描件并按以下信息邮寄到本平台',
        path: ''
      },
      {
        title: '支付完成',
        path: ''
      }],
      activeIndex: 0,
      projectName:'',
      beginTime: '',
      endTime: '',
      timePrent: 0,
      additionalFileList: [],
      taskFileList: [],
      rangeNum: 0,
      projectStep: 0,
      openProject: true,
      openDownload: true,
      type:1,
      file: '', // 上传成果的文件
      fileAdress: '',
      fileName: '', // 文件名称
      userId:"",
      resoleQueObj:{
        question:0,
        resolvedQuestion:0
      },
      collectProgramType:'',
      loading:false,
      aQLnegth:0,
      Incircle: false

    };
  },
  components: {
    UpLoad,
    ImgCom
  },
  created() {
    this.origin = location.origin;
  },
  methods: {
    landLimitInfoUpload(file, fileList) {
      // this.landLimitfileList = [{
      // name:fileList.name,
      // url:file.msg
      // }]
      let params = {
        projectId: this.$route.query.id,
        designerId: this.userId,
        fileName: fileList.name,
        filePath:file.msg
      }
      this.api.addDesignerPaymentVoucher(params).then(res => {
        if(res.code==0){
          this.getDesignerPaymentVoucher()
          // this.activeIndex = 1;
        }
        this.$message.info(res.msg)
      })
    },
    deleteBtn() {
      this.$router.go(-1)
    },
    go (index) {
      if(index==1&&this.additionalFileList.length==0){
        return
      }
      this.activeIndex = index

    },
    // 查询凭证
    getDesignerPaymentVoucher() {
      this.api
        .getDesignerPaymentVoucher({
          projectId: this.$route.query.id,
          designerId: this.userId
        })
        .then(res => {
          this.additionalFileList = res.data.hzList
          
          if(res.data.designerList&&res.data.designerList.length>0){
          //   this.showBtn = false
            this.landLimitfileList = [{
              name:res.data.designerList[0].fileName,
              url:res.data.designerList[0].filePath
            }]
          }
          if(this.additionalFileList&&this.additionalFileList.length>0){
            this.activeIndex = 1
          }else{
            this.activeIndex = 0
          }
         // else{
          //   this.showBtn = true
          // }
        });
    },
    // 是否入围
    isIncircle() {
      this.api.isIncircle({projectId: this.$route.query.id}).then(res => {
        this.Incircle = res.data
      })
    }

  },
  mounted() {
    this.projectName = Base64.decode(this.$route.query.pro)
    this.userId = sessionStorage.getItem("userId") | localStorage.getItem("userId")
    // 是否入围
    this.isIncircle()
    // 查询凭证
    this.getDesignerPaymentVoucher()
  }
};
</script>
<style lang='less' scoped>
@media only screen and (min-width: 1600px) {
  .payFee{
    .body-detail {
      width: 1500px!important;
      // margin: 5.25rem 0 1.25rem !important;
    }
  }
}
.p-body.payFee {
  // background-color: #f5f5f5;
  overflow: hidden;
  text-align: center;
  margin-bottom: 25rem;
  .payFeeTitle{
    // width: 370px;
    max-width: 372px;
    box-sizing: border-box;
    text-align: left;
    padding: 0;
    h3 {
      padding-top: 1.875rem;
      padding-bottom: 1.875rem;
      padding-left: 1.375rem;
      padding-right: 6rem;
      font-size: 2.75rem;
      color: #333;
      font-weight: 700;
      display: inline-block;
      border-left: 0.625rem solid #333;
    }
  }
  .body-detail {
    // background-color: #f1f2f7;
    overflow: hidden;
    // margin: 5.25rem 0 2.5rem;
    // padding: 2% 1.875rem;
    width: 1278px;
    margin: auto;
    .head-title {
      position: relative;
      margin: 84px 0 35px 0;
      text-align: left;
      border-bottom: 1px dotted #efefef;
      h3 {
        padding-bottom: 28px;
        font-size: 16px;
        color: #000000;
        font-weight:bold;
        display: inline-block;
      }
      .backBtn {
        cursor: pointer;
        color: #4285f4;
        font-size: 14px;
        display: inline-block;
        margin-left: 28px;
        img{
          vertical-align: middle;
          margin-right: 3px;
        }
      }
    }
  }
  .range-wrapper{
    position: relative;
    .range-input{
      position: absolute;
      top: 0;
      display: inline-block;
      width: 100%;
      height:30px;
      left: 0;
      opacity: 0;
      cursor: pointer;
    }
  }
  .range-pro{
    border-radius: 0!important;
    margin-bottom:10px;
  }
  .h3-label{
    font-weight: 600;
    cursor: pointer;
    display: inline-block;
    padding-right: 2rem;
  }
  .openIcon{
    transition:transform 0.5s linear;
  }
  .open{
    transform:rotate(180deg);
  }
  .download{
    .delDiv{
      display: inline-block;
    }
  }
  .delDiv{
    text-align: center;
    padding: 7px 0 26px!important;
    color: #4285f4;
    font-size: 14px;
    cursor: pointer;
  }
  .delDiv:hover{
    text-decoration: underline;
  }
  .paddingTop{
    padding-top: 13px!important;
  }
  .cirqueWrapper{
    position: relative;
    // display: inline-block;
    .cirqueBox{
      vertical-align:middle;
      margin: auto;
      width:90px;
      height:90px;
      display:inline-block;
    }
    .cirqueTip{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .cirqueNum{
        font-size:14px;
        color:#999;
        font-weight: normal;
      }
    }
  }
  .manuContent{
    // padding: 26px 26px 0 26px!important;
    padding: 0!important;
  }
  .pro-wrapper{
    .detail-img {
      cursor: pointer;
      margin: 0 5px 0 0px;
      width: 146px;
      /* display: inline-block; */
      float: left;
      text-align: center;
      position: relative;
      .img-name{
        font-size: 14px;
        color: #999;
        position: relative;
        .nameDiv{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .nameTip{
          display: none;
        }
      }
      .img-name:hover{
        .nameTip{
          display: inline;
        }
      }
    }
    .delete {
      cursor: pointer;
      position: absolute;
      top: -0.625rem;
      color: #ababab;
      right: -0.625rem;
      font-size: 1.8rem;
      font-weight: bold;
    }
    .img-name {
      cursor: pointer;
      font-size: 0.875rem;
    }
    .detailImgItem{
      display: inline-block;
      position: relative;
      .imgDelete{
        position: absolute;
        top: -10px;
        right: -15px;
      }
    }
  }
  .range-wrapper:hover{
    .tip-wrapper{
      display:inline-block;
      margin-left: -45px;
    }
  }
  .time-rang-wrapper{
    position: relative;
  }
  .time-rang-wrapper:hover{
    .tip-wrapper{
      display:inline-block;
      margin-left: -45px;
    }
  }
  .tip-wrapper{
    display:none;
    top:-35px;
    position: absolute;
    margin-bottom: 5px;
    .tip-title{
      background:#000;
      color: #fff;
      padding:5px 10px;
      font-size: 12px;
    }
    .tip-arrow{
      position: absolute;
      bottom: -10px;
      left: 50%;
      margin-left: -2.5px;
      width: 0;
      height: 0;
      border-width: 5px;
      border-style: solid;
      border-color:#000 transparent transparent transparent;
    }
  }
}
</style>
<style lang="less">
.payFee{

  .step-wrapper{
    display: flex;
    .aqLeft{
      // width: 909px;
      // max-width: 909px;
      // margin-right: 48px;
      flex: 1;
      .addressBox{
        font-size: 0;
        width: 600px;
        span{
          font-size: 12px;
          color: #333;
        }
        .address{
          padding-top: 12px;
          font-weight: 600;
        }
      }
      .contentP{
        font-size: 14px;
        padding-top: 16px;
        color: #333;
        width: 600px;
      }
      .uploadDiv{
        padding: 30px 0 36px;
      }
      .noRuWei{
        .noRuWeiBox{
          display: flex;
          flex-direction: column ;
          width: 300px;
          .frownIcon{
            color: #999;
            font-size: 60px;
            margin-bottom: 38px;
            margin-top: 20px;
          }
          .spanT{
            color: #999;
            font-size: 24px;
          }
        }
      }
    }
    .step-content{
      border-bottom: 1px dotted #efefef;
      margin-bottom: 35px;
    }
    .stepA{
      padding:0 0 5px 0;
      .circle{
        width: 30px;
        height: 30px;
        display: inline-block;
        text-align: center;
        line-height: 30px;
        margin-right: 15px;
        background: #4285f4;
      }
      .label{
        font-size: 16px;
        color: #333!important;
        font-weight: normal!important;
      }
    }
    .stepper-vertical li{
      min-height: 84px;
    }
    .stepper-vertical li:not(:last-child):after {
      height: 100%;
      top: 30px;
      left: 15px;
      width: 2px;
      height: calc(100% - 30px);
    }
    .stepper-vertical li.stepOver:after {
      background-color: #1fdbb6;
    }
    .circleCheck{
      background-color: #1fdbb6!important;
      color: #fff;
    }
    .stepper-vertical{
      .step-view{
        // padding-left: 45px!important;
        margin-left: 45px!important;
        box-sizing: border-box;
        width: calc(100% - 45px);
      }
    }
    .progress-stepper{
        padding-bottom: 0!important;
      .row{
        margin-top: 0!important;
      }
    }
    .stepper-vertical{
      margin-top: 0;
      margin-bottom: 0;
      padding-top: 0;
      padding-bottom: 0;
    }
  }
  .progress-wrapper{
    padding: 0;
    width: 318px;
    max-width: 318px;
    .rightTip{
      font-size:16px;
      color: #333333;
      padding:36px 0 18px;
      // font-weight: bold;
    }
    .progress-bar{
      height: 100%!important;
      background-color: #6886ff!important;
    }
    .md-progress{
      background-color: #f2f2f2!important;
    }
  }
  .time-rang-wrapper{
    .progress-bar{
      height: 100%!important;
      background-color: #07d8ae!important;
    }
    .md-progress{
      background-color: #f2f2f2!important;
    }
  }
  .colorBlack .progress-bar{
    color: #000;
  }
  .payFee{
   .dropdown-content li{
      min-height:2.1875rem !important;
    }
    .dropdown-content li::after{
      height: 0;
      display: none;
    }
  }
}
 
</style>

