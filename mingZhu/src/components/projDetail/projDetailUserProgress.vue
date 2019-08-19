<template>
  <div class="taskInforatiomNew">
    <div :class="isShowBack?'':'ispage'">
      <mdb-row v-if="projectInfomation.projectName!=null">
        <mdb-col class="LeftTitle">
          <p class="common1">项目名称:</p>
        </mdb-col>
        <mdb-col class="rightContent">
          <p class="arss">{{projectInfomation.projectName}}</p>
        </mdb-col>
      </mdb-row>

      <mdb-row v-if="projectTypeList.length!=0">
        <mdb-col class="LeftTitle">
          <p class="common1">项目地点:</p>
        </mdb-col>
        <mdb-col class="rightContent">
          <p class="arss">{{projectInfomation.adress}}</p>
        </mdb-col>
      </mdb-row>

      <mdb-row v-if="projectTypeList.length!=0">
        <mdb-col class="LeftTitle">
          <p class="common1">项目类型:</p>
        </mdb-col>
        <mdb-col class="rightContent">
          <!-- <form-inline>
            <mdb-input
              type="checkbox"
              v-for="(city,index) in projectTypeList"
              :label="city"
              :key="index"
              checked
              disabled />
          </form-inline> -->
          <p class="arss">{{projectTypeList.join(",")}}</p>
          <!-- <div style="display:inline-block;" class="form-check px-0" 
          v-for="(city,index) in projectTypeList"
          :key="index"
          >
              <input type="checkbox" class="form-check-input" id="materialCheckedDisabled" checked="" disabled="">
              <label class="form-check-label disabled" for="materialCheckedDisabled"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{city}}</font></font></label>
            </div> -->
        </mdb-col>
      </mdb-row>

      <mdb-row v-if="buildTypeList.length!=0">
        <mdb-col class="LeftTitle">
          <p class="common1">建筑类型:</p>
        </mdb-col>
        <mdb-col class="rightContent">
          <!-- <form-inline>
            <mdb-input
              type="checkbox"
              v-for="(city,index) in buildTypeList"
              :label="city"
              :key="index"
              checked
              disabled />
          </form-inline> -->
          <p class="arss">{{buildTypeList.join(",")}}</p>
            <!-- <div style="display:inline-block;" class="form-check px-0" v-for="(city,index) in buildTypeList" :key="index">
              <input type="checkbox" class="form-check-input" id="materialCheckedDisabled" checked="" disabled="">
              <label class="form-check-label disabled" for="materialCheckedDisabled"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{city}}</font></font></label>
            </div> -->
        </mdb-col>
      </mdb-row>

      <mdb-row v-if="projectInfomation.buildSize!=null">
        <mdb-col class="LeftTitle">
          <p class="common1">建设规模:</p>
        </mdb-col>
        <mdb-col class="rightContent">
          <div style="display:inline-block;" class="form-check px-0" v-for="(city,index) in projectInfomation.buildSize" :key="index">
            {{city}}平方米<span v-if="index<projectInfomation.buildSize.length-1">,</span>
            <!-- <input type="checkbox" class="form-check-input" id="materialCheckedDisabled" checked="" disabled="">
            <label class="form-check-label disabled" for="materialCheckedDisabled"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{city}}平方米</font></font></label> -->
          </div>
          <!-- <p class="arss" v-html="projectInfomation.buildSize"></p> -->
        </mdb-col>
      </mdb-row>

      <mdb-row v-if="projectInfomation.designDescribe!=null">
        <mdb-col class="LeftTitle">
          <p class="common1">项目描述:</p>
        </mdb-col>
        <mdb-col class="rightContent">
          <p class="arss">{{projectInfomation.desc}}</p>
        </mdb-col>
      </mdb-row>

      <mdb-row v-if="projectInfomation.jiananInvest!=null">
        <mdb-col class="LeftTitle">
          <p class="common1">建安投资:</p>
        </mdb-col>
        <mdb-col class="rightContent">
          <p class="arss">{{ projectInfomation.jiananInvest}}</p>
        </mdb-col>
      </mdb-row>

      <mdb-row v-show="isShowBack" class="justify-content-around">
        <mdb-col md='12' class="text-center">
          <mdb-btn color="primary nextBtn" @click="goBack">返 回</mdb-btn>
        </mdb-col>
      </mdb-row>
    </div>
  </div>
</template>
<script>
export default {
  props: ["proId","isShowBack"],
//   props: {
//     proId: String,
//     isShowBack: {
//       type: Boolean,
//       default: true
//     },
//   },
  data () {
    return {
      projectId: -1,
      isFalse: true, // 只读
      projectInfomation: {}, // 项目信息
      projectType: [], // 项目类型
      projectTypeList: [],
      buildType: [], // 建筑类型
      buildTypeList: []
    }
  },
  created () {
    this.projectId = this.proId
    this.getProjectInfomation()
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    // 获取项目信息
    getProjectInfomation () {
      this.api.getInformation({ id: this.projectId }).then(res => {
        if (res.code === 0 ) {
          this.projectInfomation = res.data
          this.projectInfomation.buildSize = this.projectInfomation.buildSize.replace(/\&/g,',').split(',')
          this.getrer()
        }
      })
    },
    // 赋值
    getrer () {
      if (!this.projectInfomation.projectType) {
        this.projectType = []
        this.projectTypeList = []
      } else {
        this.projectType = this.projectInfomation.projectType.split(',')
        this.projectTypeList = this.projectInfomation.projectType.replace(/\&/g,',').split(',')
      }

      if (!this.projectInfomation.buildType) {
        this.buildType = []
        this.buildTypeList = []
      } else {
        this.buildType = this.projectInfomation.buildType.split(',')
        this.buildTypeList = this.projectInfomation.buildType.replace(/\&/g,',').split(',')
      }
    }
  }
}
</script>
<style lang="less" scoped>
@media only screen and (min-width: 1600px) {
  .body.taskInforatiomNew{
    max-width:1200px;
    // margin:20px auto !important;
  }
}
.body.taskInforatiomNew {
  background-color: #f5f5f5;
  overflow: hidden;
  .ispage{
    margin: 0!important;
    padding-top: 0%!important;
    padding-bottom: 0%!important;
  }
  .body-detail {
    background-color: #fff;
    overflow: hidden;
    // margin: 5.25rem 10% 1.25rem;
    padding: 2% 5%;
    .head-title {
      position: relative;
      margin: 3.125rem 0 1.25rem 0;
      text-align: left;
      h3 {
        padding-bottom: 1.25rem;
        font-size: 1.75rem;
        color: #000000;
        border-bottom: 0.16px solid #e0e0e0;
      }
      .delete {
        cursor: pointer;
        position: absolute;
        width: 2rem;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        right: 0.625rem;
        top: 0.625rem;
        color: #c3c3c3;
        font-size: 1.875rem;
      }
    }
    .common1 {
      font-family: PingFangHK-Medium;
      font-size: 1.125rem;
      color: #333333;
      letter-spacing: 0;
      line-height: 1.125rem;
      margin: 0.5rem 0 1rem;
    }
    .arss {
      margin: 0.5rem 0 1rem;
    }
  }
}
.taskInforatiomNew{
  .form-check{
    // padding-right: 30px!important;
  }
  .form-check-input[type="checkbox"] + label{
    padding-left: 25px!important;
  }
  .nextBtn{
    width: 212px;
    height: 60px;
    font-size: 18px;
    color: #fff;
  }
}
</style>
<style lang="less">
.taskInforatiomNew{
  .row{
    margin: 0;
    padding: 0 0 5px 0;
  }
  .row:last-child{
    padding: 0;
  }
  .LeftTitle{
    width: 80px;
    max-width: 80px;
    padding: 0;
    font-size: 14px;
    color: #999;
    text-align: left;
  }
  .rightContent{
    width: calc(100% - 80px);
    max-width: calc(100% - 80px);
    padding: 0;
    font-size: 14px;
    color: #999;
    text-align: right;
  }
}
</style>

