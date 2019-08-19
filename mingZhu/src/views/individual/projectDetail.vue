<template>
  <div class="body">
    <mdb-row v-if="type!=1">
      <mdb-col col="12">
        <h3>{{projectDetial.viewPointTitle}}</h3>
        <p>项目类型 {{projectDetial.buildingType}}</p>
        <div v-html="projectDetial.context"></div>
      </mdb-col>
    </mdb-row>
    <mdb-container v-else>  
      <div class="intrudce">
        <h3 class="title">{{projectInfomation.projectName}}</h3>
        <p class="introduce">{{projectInfomation.buildDetail}}</p>
      </div>
      
      <div class="taskInforatiom">
        <div class="base">
          <h3 class="baseInfo">项目基本信息</h3>
          <mdb-row v-if="projectInfomation.adress!=null">
            <mdb-col col="2">
              <p class="adrees common1">建设地点</p>
            </mdb-col>
            <mdb-col col="10">
              <p class="arss">{{projectInfomation.adress}}</p>
            </mdb-col>
          </mdb-row>

          <mdb-row v-if="employerInfoList.length!=0">
            <mdb-col col="2">
              <p class="common1">雇主信息</p>
            </mdb-col>
            <mdb-col col="10">
              <mdb-input
                type="checkbox"
                v-for="(city,index) in employerInfoList"
                :label="city"
                :key="index"
                checked
                disabled />
            </mdb-col>
          </mdb-row>

          <h3 class="baseInfo">项目设计需求</h3>
          <mdb-row v-if="projectTypeList.length!=0">
            <mdb-col col="2">
              <p class="common1">项目类型</p>
            </mdb-col>
            <mdb-col col="10">
              <form-inline>
                <mdb-input
                  type="checkbox"
                  v-for="(city,index) in projectTypeList"
                  :label="city"
                  :key="index"
                  checked
                  disabled />
              </form-inline>
            </mdb-col>
          </mdb-row>
          <mdb-row v-if="buildTypeList.length!=0">
            <mdb-col col="2">
              <p class="common1">建筑类型</p>
            </mdb-col>
            <mdb-col col="10">
              <form-inline>
                <mdb-input
                  type="checkbox"
                  v-for="(city,index) in buildTypeList"
                  :label="city"
                  :key="index"
                  checked
                  disabled />
              </form-inline>
            </mdb-col>
          </mdb-row>
          <mdb-row v-if="buildDetailList.length!=0">
            <mdb-col col="2">
              <p class="common1">建设内容</p>
            </mdb-col>
            <mdb-col col="10">
              <form-inline>
                <mdb-input
                  type="checkbox"
                  v-for="(city,index) in buildDetailList"
                  :label="city"
                  :key="index"
                  checked
                  disabled />
              </form-inline>
            </mdb-col>
          </mdb-row>
          <mdb-row v-if="buildSizeList.length!=0">
            <mdb-col col="2">
              <p class="common1">建设规模</p>
            </mdb-col>
            <mdb-col col="10">
              <form-inline>
                <mdb-input
                  type="checkbox"
                  v-for="(city,index) in buildSizeList"
                  :label="city"
                  :key="index"
                  checked
                  disabled />
              </form-inline>
            </mdb-col>
          </mdb-row>
          <mdb-row v-if="jiananInvestList.length!=0">
            <mdb-col col="2">
              <p class="common1">建设投资</p>
            </mdb-col>
            <mdb-col col="10">
              <form-inline>
                <mdb-input
                  type="checkbox"
                  v-for="(city,index) in jiananInvestList"
                  :label="city"
                  :key="index"
                  checked
                  disabled />
              </form-inline>
            </mdb-col>
          </mdb-row>
          <mdb-row v-if="collectDepthList.length!=0">
            <mdb-col col="2">
              <p class="common1">征集深度</p>
            </mdb-col>
            <mdb-col col="10">
              <form-inline>
                <mdb-input
                  type="checkbox"
                  v-for="(city,index) in collectDepthList"
                  :label="city"
                  :key="index"
                  checked
                  disabled />
              </form-inline>
            </mdb-col>
          </mdb-row>
        </div>
        
        <div
          class="demand"
          v-if="collectProgramTypeList.length!=0"
        >
          <h3 class="baseInfo">方案征集方式</h3>
          <mdb-row>
            <mdb-col col="2">
              <p class="common1">征集方式</p>
            </mdb-col>
            <mdb-col col="10">
              <form-inline>
                <mdb-input
                  type="checkbox"
                  v-for="(city,index) in collectProgramTypeList"
                  :label="city"
                  :key="index"
                  checked
                  disabled />
              </form-inline>
            </mdb-col>
          </mdb-row>
        </div>
        <div
          class="demand reason"
          v-if="projectInfomation.endTime"
        >
          <h3 class="baseInfo">项目周期</h3>
          <mdb-row
            v-if="projectInfomation.applicationDeadLine"
            class="time"
          >
            <mdb-col col="2">
              <p class="common1">报名截止日期</p>
            </mdb-col>
            <mdb-col col="10">
              <p class="arss">{{projectInfomation.applicationDeadLine}}</P>
            </mdb-col>
          </mdb-row>
          <mdb-row
            v-if="projectInfomation.signUpDeadLine"
            class="time"
          >
            <mdb-col col="2">
              <p class="common1">成果提交日期</p>
            </mdb-col>
            <mdb-col col="10">
              <p class="arss">{{projectInfomation.signUpDeadLine}}</p>
            </mdb-col>
          </mdb-row>

          <mdb-row class="justify-content-around">
            <mdb-col col="3">
              <mdb-btn color="primary" rounded @click="signUp()">我要报名</mdb-btn>
            </mdb-col>
          </mdb-row>
        </div>
      </div>
    </mdb-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      projectDetial:"",
      isfalse:true, // 是否禁用
      projectId: -1,
      checkedCities1: [],
      cities: ['上海', '北京'],
      projectInfomation: {}, // 项目信息
      // 雇主信息
      employerInfo: [],
      employerInfoList: [],

      // 项目类型
      projectType: [],
      projectTypeList: [],
      // 建筑类型
      buildType: [],
      buildTypeList: [],
      // 建筑内容
      buildDetail: [],
      buildDetailList: [],
      // 建设规模
      buildSize: [],
      buildSizeList: [],
      // 建安投资
      jiananInvest: [],
      jiananInvestList: [],
      // 征集深度
      collectDepth: [],
      collectDepthList: [],
      // 征集方式
      collectProgramType: [],
      collectProgramTypeList: [],
      type:0
    };
  },
  created () {
    this.projectId = this.$route.params.id
    this.type = this.$route.query.type
    if(this.type==1){
      this.getProjectInfomation();
    }else{
      this.getProjectDetail();
    }
    
    // this.projectInfomation = {
    //   adress: '上海',
    //   employerInfo: '个人',
    //   projectType: '医院,教育',
    //   buildType: '单栋,群体',
    //   buildDetail: '20层',
    //   buildSize: '20000平方米',
    //   jiananInvest: '3000万',
    //   collectDepth: '初审',
    //   collectProgramType: '3',
    //   endTime: '2018-01-13 '
    // };
    // this.getrer();
  },
  methods: {
    getProjectDetail(){
      this.api.getProjectDetail({ id: this.projectId }).then(res=>{
        if(res.code==0){
          console.log(res)
          this.projectDetial = res.data
        }
      })
    },
    // 获取项目信息
    getProjectInfomation () {
      this.api.getInformation({ id: this.projectId }).then(res => {
        if (res.code === 0) {
          this.projectInfomation = res.data
          this.getrer()
        }
      })
    },
    // 赋值
    getrer () {
      // this.projectInfomation.jiananInvest

      // console.log(this.projectInfomation);
      if (this.projectInfomation.employerInfo == null) {
        this.employerInfo = [];
        this.employerInfoList = [];
      } else {
        this.employerInfo = this.projectInfomation.employerInfo.split(',')
        this.employerInfoList = this.projectInfomation.employerInfo.split(',')
      }

      if (this.projectInfomation.projectType == null) {
        this.projectType = [];
        this.projectTypeList = [];
      } else {
        this.projectType = this.projectInfomation.projectType.split(',')
        this.projectTypeList = this.projectInfomation.projectType.split(',')
      }

      if (this.projectInfomation.buildType == null) {
        this.buildType = [];
        this.buildTypeList = [];
      } else {
        this.buildType = this.projectInfomation.buildType.split(',')
        this.buildTypeList = this.projectInfomation.buildType.split(',')
      }

      if (this.projectInfomation.buildDetail == null) {
        this.buildDetail = [];
        this.buildDetailList = [];
      } else {
        this.buildDetail = this.projectInfomation.buildDetail.split(',')
        this.buildDetailList = this.projectInfomation.buildDetail.split(',')
      }

      if (this.projectInfomation.buildSize == null) {
        this.buildSize = [];
        this.buildSizeList = [];
      } else {
        this.buildSize = this.projectInfomation.buildSize.split(',')
        this.buildSizeList = this.projectInfomation.buildSize.split(',')
      }

      if (this.projectInfomation.jiananInvest == null) {
        this.jiananInvest = [];
        this.jiananInvestList = [];
      } else {
        this.jiananInvest = this.projectInfomation.jiananInvest.split(',')
        this.jiananInvestList = this.projectInfomation.jiananInvest.split(',')
      }

      if (this.projectInfomation.collectDepth == null) {
        this.collectDepth = [];
        this.collectDepthList = [];
      } else {
        this.collectDepth = this.projectInfomation.collectDepth.split(',')
        this.collectDepthList = this.projectInfomation.collectDepth.split(',')
      }

      // 征集方式
      if (this.projectInfomation.collectProgramType == null) {
        this.collectProgramType = []
        this.collectProgramTypeList = []
      } else {
        if (this.projectInfomation.collectProgramType == '1') {
          this.projectInfomation.collectProgramType = '公开';
        } else if (this.projectInfomation.collectProgramType == '2') {
          this.projectInfomation.collectProgramType = '邀请';
        } else if (this.projectInfomation.collectProgramType == '3') {
          this.projectInfomation.collectProgramType = '委托';
        } else if (this.projectInfomation.collectProgramType == '4') {
          this.projectInfomation.collectProgramType = '邀请+公开';
        }
        this.collectProgramType = this.projectInfomation.collectProgramType.split(',')
        this.collectProgramTypeList = this.projectInfomation.collectProgramType.split(',')
      }
    },
    // 我要报名
    signUp () {
      this.api.signUp({projectId: this.projectId}).then(res => {
        if (res.code === 0) {
          this.$router.push('/taskHall')
        } else {
          this.$message(res.msg)
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
.body {
  overflow: hidden;
  margin: 4.25rem 10%;
  padding: 2% 5%;
  background: #ffffff;
  .searchBox {
    margin: 3.125rem 5%;
    margin-bottom: 5rem;
    position: relative;
    overflow: hidden;
    .form {
      width: 75%;
      padding: 0.625rem;
      border-radius: 1.5625rem;
      background: #f8f8f8;
      border: 0.0625rem solid black;
      display: flex;
      margin-right: 1.25rem;
      float: left;
    }
    input {
      flex: 1;
      border: none;
      outline: none;
      background: #f8f8f8;
    }
    i {
      width: 1.25rem;
      height: 1.25rem;
    }
    .submit {
      width: 10%;
      padding: 0.625rem 1.25rem;
      background-image: linear-gradient(-90deg, #f3daa4 6%, #f2cd89 98%);
      clear: both;
      text-align: center;
      vertical-align: center;
      font-size: 1.25rem;
      color: #000000;
      border-radius: 1.5625rem;
      letter-spacing: 0.0138rem;
    }
  }
  .arss {
    font-family: PingFangSC-Regular;
    font-size: 1rem;
    color: #666666;
    letter-spacing: 0;
    text-align: left;
    line-height: 1.125rem;
    margin: 1.65rem 0 1rem;
  }
  .sign {
    width: 8.125rem;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    background-image: linear-gradient(-90deg, #f3daa4 6%, #f2cd89 98%);
    border-radius: 1.25rem;
    margin: 0 auto;
    cursor: pointer;
  }
  .intrudce {
    .title {
      font-family: PingFangSC-Medium;
      font-size: 2.5rem;
      color: #000000;
      margin-top: 2.5rem;
    }
    .introduce {
      font-family: PingFangSC-Regular;
      font-size: 0.875rem;
      color: #333333;
      margin-top: 1.25rem;
    }
  }
  .baseInfo {
    font-family: PingFangSC-Medium;
    font-size: 1.75rem;
    color: #000000;
    margin-top: 5rem;
    padding-bottom: 1.25rem;
    margin-bottom: 2.5rem;
    border-bottom: 0.0625rem solid #ccc;
  }
  .common1 {
    font-family: PingFangHK-Medium;
    font-size: 1.125rem;
    color: #333333;
    letter-spacing: 0;
    line-height: 1.125rem;
    margin: 1.65rem 0 1rem;
  }
  .common2 {
    height: 2.5rem;
    line-height: 2.5rem;
  }
}
</style>
