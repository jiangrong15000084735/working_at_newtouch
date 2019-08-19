<template>
<mdb-container>
  <div class="body taskInforatiom">
    <div class="body-detail"  :class="isShowBack?'':'ispage'">
      <div class="head-title" v-show="isShowBack">
        <h3>项目基本信息</h3>
        <div
          class="delete"
          @click="goBack"
        >×</div>
    </div>

      <mdb-row v-if="projectInfomation.projectName!=null">
        <mdb-col col="2">
          <p class="common1">项目名称</p>
        </mdb-col>
        <mdb-col col="10">
          <p class="arss">{{projectInfomation.projectName}}</p>
        </mdb-col>
      </mdb-row>

      <mdb-row v-if="projectTypeList.length!=0">
        <mdb-col md="2">
          <p class="common1">项目地点</p>
        </mdb-col>
        <mdb-col md="10">
          <p class="arss">{{projectInfomation.adress}}</p>
        </mdb-col>
      </mdb-row>

      <mdb-row v-if="projectTypeList.length!=0">
        <mdb-col md="2">
          <p class="common1">项目类型</p>
        </mdb-col>
        <mdb-col md="10">
          <!-- <form-inline>
            <mdb-input
              type="checkbox"
              v-for="(city,index) in projectTypeList"
              :label="city"
              :key="index"
              checked
              disabled />
          </form-inline> -->
          <div style="display:inline-block;" class="form-check px-0" 
          v-for="(city,index) in projectTypeList"
          :key="index"
          >
              <input type="checkbox" class="form-check-input" id="materialCheckedDisabled" checked="" disabled="">
              <label class="form-check-label disabled" for="materialCheckedDisabled"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{city}}</font></font></label>
            </div>
        </mdb-col>
      </mdb-row>

      <mdb-row v-if="buildTypeList.length!=0">
        <mdb-col md="2">
          <p class="common1">建筑类型</p>
        </mdb-col>
        <mdb-col md="10">
          <!-- <form-inline>
            <mdb-input
              type="checkbox"
              v-for="(city,index) in buildTypeList"
              :label="city"
              :key="index"
              checked
              disabled />
          </form-inline> -->
            <div style="display:inline-block;" class="form-check px-0" v-for="(city,index) in buildTypeList" :key="index">
              <input type="checkbox" class="form-check-input" id="materialCheckedDisabled" checked="" disabled="">
              <label class="form-check-label disabled" for="materialCheckedDisabled"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{city}}</font></font></label>
            </div>
        </mdb-col>
      </mdb-row>

      <mdb-row v-if="projectInfomation.buildSize!=null">
        <mdb-col col="2">
          <p class="common1">建设规模</p>
        </mdb-col>
        <mdb-col col="10">
          <div style="display:inline-block;" class="form-check px-0" v-for="(city,index) in projectInfomation.buildSize" :key="index">
            <input type="checkbox" class="form-check-input" id="materialCheckedDisabled" checked="" disabled="">
            <label class="form-check-label disabled" for="materialCheckedDisabled"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{city}}平方米</font></font></label>
          </div>
          <!-- <p class="arss" v-html="projectInfomation.buildSize"></p> -->
        </mdb-col>
      </mdb-row>

      <mdb-row v-if="projectInfomation.designDescribe!=null">
        <mdb-col col="2">
          <p class="common1">项目描述</p>
        </mdb-col>
        <mdb-col col="10">
          <p class="arss">{{projectInfomation.desc}}</p>
        </mdb-col>
      </mdb-row>

      <mdb-row v-if="projectInfomation.jiananInvest!=null">
        <mdb-col col="2">
          <p class="common1">建安投资</p>
        </mdb-col>
        <mdb-col col="10">
          <p class="arss">{{ projectInfomation.jiananInvest}}</p>
        </mdb-col>
      </mdb-row>

      <mdb-row v-show="isShowBack" class="justify-content-around">
        <mdb-col md='12' class="text-center">
          <mdb-btn color="primary" class="btn212_60" @click="goBack">返 回</mdb-btn>
        </mdb-col>
      </mdb-row>
    </div>
  </div>
</mdb-container>
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
  .body.taskInforatiom{
    max-width:1200px;
    // margin:20px auto !important;
  }
}
.body.taskInforatiom {
  // background-color: #f5f5f5;
  overflow: hidden;
  // width:1200px;
  min-height: 680px;
  margin: auto;
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
.taskInforatiom{
  .form-check{
    padding-right: 30px!important;
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
