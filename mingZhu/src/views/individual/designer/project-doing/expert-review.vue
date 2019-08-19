<template>
  <div class="p-body expertReview" v-loading.fullscreenLoading="loading">
    <div class="body-detail">
      <div class="head-title">
        <h3>{{projectName}}</h3>
        <div @click="deleteBtn" class="backBtn"><img src="@/assets/images/backIcon.png"/>返回上一页</div>
      </div>
      <div class="rank-wrapper" v-if="rankFirst.length>0">
        <div class="expertReviewTitle">
          <h3>
            专家  
            <br/>
            评审结果
          </h3>
        </div>
        <div class="aqLeft px-0">
          <div class="rankBox">
            <div class="rankIconDiv">
              <mdb-icon class="rankIcon" icon="award" />
              <span class="rankNum">1</span>
            </div>
            <span class="rankTitle">第一名</span>
            <div class="rankList">
              <span class="rangItem" 
              v-for="(item,index) in rankFirst" 
              :key="index"
              >
              {{item.seniorDesign=="2"||item.seniorDesign=="1"?item.realName:item.designerSerial}}
              </span>
            </div>
          </div>
          <div class="rankLine" v-if="rankSec.length>0"></div>
          <div class="rankBox" v-if="rankSec.length>0">
            <div class="rankIconDiv">
              <mdb-icon class="rankIcon" icon="award" />
              <span class="rankNum">2</span>
            </div>
            <span class="rankTitle">第二名</span>
            <div class="rankList">
              <span class="rangItem" 
                v-for="(item,index) in rankSec" 
                :key="index"
                >
                {{item.seniorDesign=="2"||item.seniorDesign=="1"?item.realName:item.designerSerial}}
                </span>
            </div>
          </div>
          <div class="rankLine" v-if="rankTher.length>0"></div>
          <div class="rankBox" v-if="rankTher.length>0">
            <div class="rankIconDiv">
              <mdb-icon class="rankIcon" icon="award" />
              <span class="rankNum">3</span>
            </div>
            <span class="rankTitle">第三名</span>
            <div class="rankList">
              <span class="rangItem" 
                v-for="(item,index) in rankTher" 
                :key="index"
                >
                {{item.seniorDesign=="2"||item.seniorDesign=="1"?item.realName:item.designerSerial}}
                </span>
            </div>
          </div>
        </div>
      </div>
      <div class="rank-wrapper" v-if="bossRankFirst.length>0">
        <div class="expertReviewTitle">
          <h3>
            最终  
            <br/>
            评审结果
          </h3>
        </div>
        <div class="aqLeft px-0">
          <div class="rankBox">
            <div class="rankIconDiv">
              <mdb-icon class="rankIcon" icon="award" />
              <span class="rankNum">1</span>
            </div>
            <span class="rankTitle">第一名</span>
            <div class="rankList">
              <span class="rangItem" 
              v-for="(item,index) in bossRankFirst" 
              :key="index"
              >
              {{item.seniorDesign=="2"||item.seniorDesign=="1"?item.realName:item.designerSerial}}
              </span>
            </div>
          </div>
          <div class="rankLine" v-if="bossRankSec.length>0"></div>
          <div class="rankBox" v-if="bossRankSec.length>0">
            <div class="rankIconDiv">
              <mdb-icon class="rankIcon" icon="award" />
              <span class="rankNum">2</span>
            </div>
            <span class="rankTitle">第二名</span>
            <div class="rankList">
              <span class="rangItem" 
                v-for="(item,index) in bossRankSec" 
                :key="index"
                >
                {{item.seniorDesign=="2"||item.seniorDesign=="1"?item.realName:item.designerSerial}}
                </span>
            </div>
          </div>
          <div class="rankLine" v-if="bossRankTher.length>0"></div>
          <div class="rankBox" v-if="bossRankTher.length>0">
            <div class="rankIconDiv">
              <mdb-icon class="rankIcon" icon="award" />
              <span class="rankNum">3</span>
            </div>
            <span class="rankTitle">第三名</span>
            <div class="rankList">
              <span class="rangItem" 
                v-for="(item,index) in bossRankTher" 
                :key="index"
                >
                {{item.seniorDesign=="2"||item.seniorDesign=="1"?item.realName:item.designerSerial}}
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
      rankFirst:[],//专家一
      rankSec:[],//专家二
      rankTher:[],//专家三
      bossRankFirst:[],//最终一
      bossRankSec:[],//最终二
      bossRankTher:[],//最终三
    };
  },
  methods: {
    landLimitInfoUpload(file, fileList) {
      this.landLimitfileList = [{
      name:fileList.name,
      url:file.msg
      }]
      let params = {
        projectId: this.$route.query.id,
        designerId: this.userId,
        fileName: fileList.name,
        filePath:file.msg
      }
      this.api.addDesignerPaymentVoucher(params).then(res => {
        this.message.info(res.msg)
      })
    },
    deleteBtn() {
      this.$router.go(-1)
    },
    go (index) {
      this.activeIndex = index
    },
    // 查询排名
    manageInCircleDesignerList() {
      this.api
        .manageInCircleDesignerList({
          projectId: this.$route.query.id
        })
        .then(res => {
          this.rankFirst = res.inCircleDesigner.filter(item => item.rank==1)
          this.rankSec = res.inCircleDesigner.filter(item => item.rank==2)
          this.rankTher = res.inCircleDesigner.filter(item => item.rank==3)
          this.bossRankFirst = res.inCircleDesigner.filter(item => item.bossRank==1)
          this.bossRankSec = res.inCircleDesigner.filter(item => item.bossRank==2)
          this.bossRankTher = res.inCircleDesigner.filter(item => item.bossRank==3)
        });
    }

  },
  mounted() {
    this.projectName = Base64.decode(this.$route.query.pro)
    this.userId = sessionStorage.getItem("userId") | localStorage.getItem("userId")
    // 排名
    this.manageInCircleDesignerList()
  }
};
</script>
<style lang='less' scoped>
@media only screen and (min-width: 1600px) {
  .expertReview{
    .body-detail {
      width: 1500px!important;
      // margin: 5.25rem 0 1.25rem !important;
    }
  }
}
.p-body.expertReview {
  // background-color: #f5f5f5;
  overflow: hidden;
  text-align: center;
  margin-bottom: 18rem;
  .expertReviewTitle{
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
    overflow: hidden;
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
  .rank-wrapper{
    display: flex;
    padding-bottom: 45px;
    margin-bottom: 45px;
    border-bottom: 1px dotted #efefef;
    .aqLeft{
      text-align: left;
      flex: 1;
      .rankLine{
        margin-bottom: 40px;
        margin-top: 40px;
        border-bottom: 1px dotted #efefef;
      }
      .rankBox{
        font-size: 0;
        display: flex;
        align-items: center;
        .rankIconDiv{
          position: relative;
          .rankIcon{
            font-size: 30px;
            color: #999;
            margin-right: 15px;
          }
          .rankNum{
            position: absolute;
            color: #000;
            font-size: 12px;
            transform:scale(0.9);
            top: 1px;
            left: 7px;
          }
        }
        .rankTitle{
          color: #333;
          font-size: 30px;
          font-weight: 600;
        }
        .rankList{
          flex: 1;
          .rangItem{
            margin-left: 20px;
            font-size: 14px;
            color: #333;
          }
        }
      }
    }
  }
}
</style>

