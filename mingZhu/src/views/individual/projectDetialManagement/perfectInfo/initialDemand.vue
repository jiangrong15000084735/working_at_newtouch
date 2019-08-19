<template>
  <mdb-container class="initial-demand-warp px-0">
    <!-- 项目基本信息 -->
    <mdb-row>
      <mdb-col>
        <div class="title text-1">项目基本信息</div>
      </mdb-col>
    </mdb-row>
    <!-- 项目名称,建设地点 -->
    <mdb-row class="form-mdb-row">
      <mdb-col md="12" class="clearfix">
        <div class="outline-input w-347 fl" style="margin-right:24px;">
          <mdb-input
            type="text"
            size="lg"
            label="项目名称"
            :disabled="disabled"
            v-model="formLabelAlign.projectName"
            outline
          />
        </div>
        <div class="outline-input w-347 fl">
          <mdb-input
            type="text"
            size="lg"
            label="建设地点"
            :disabled="disabled"
            v-model="formLabelAlign.adress" 
            outline
          />
        </div>
      </mdb-col>
    </mdb-row>
   
    <!-- 客户类型 -->
    <mdb-row class="form-mdb-row">
      <mdb-col>
        <div class="text-2">客户类型</div>
        <div id="employerInfo">
          <div class="form-check">
              <input 
                type="radio" 
                class="form-check-input" 
                name="materialGroupExample3" 
                value="个人" 
                v-model="formLabelAlign.employerInfo"
                id="materialGroupExample01"
                :disabled="disabled"
              >
              <label class="form-check-label" for="materialGroupExample01">个人</label>
            </div>
            <div class="form-check">
              <input 
                type="radio" 
                class="form-check-input" 
                name="materialGroupExample3" 
                value="企业"
                v-model="formLabelAlign.employerInfo"
                id="materialGroupExample02"
                :disabled="disabled"
              >
              <label class="form-check-label" for="materialGroupExample02">企业</label>
            </div>
            <div class="form-check">
              <input 
                type="radio" 
                class="form-check-input" 
                name="materialGroupExample3" 
                value="政府机构"
                v-model="formLabelAlign.employerInfo"
                id="materialGroupExample03"
                :disabled="disabled"
              >
              <label class="form-check-label" for="materialGroupExample03">政府机构</label>
            </div>
            <div class="form-check">
              <input 
                type="radio" 
                class="form-check-input" 
                name="materialGroupExample3" 
                value="其它"
                v-model="formLabelAlign.employerInfo"
                id="materialGroupExample04"
                :disabled="disabled"
              >
              <label class="form-check-label" for="materialGroupExample04">其它</label>
            </div>
        </div>
      </mdb-col>
    </mdb-row>
    <!-- 征集深度 -->
    <mdb-row class="form-mdb-row">
      <mdb-col md="8">
        <div class="text-2">征集设计深度</div>
        <div id="collectDepth">
          <div class="form-check">
            <input 
              type="radio" 
              class="form-check-input" 
              name="collectDepth" 
              value="概念方案"
              v-model="formLabelAlign.collectDepth"
              id="collectDepth1"
              :disabled="disabled"
            >
            <label class="form-check-label" for="collectDepth1">概念方案</label>
          </div>
          <div class="form-check">
            <input 
              type="radio" 
              class="form-check-input" 
              name="collectDepth" 
              value="建筑方案"
              v-model="formLabelAlign.collectDepth"
              id="collectDepth2"
              :disabled="disabled"
            >
            <label class="form-check-label" for="collectDepth2">建筑方案</label>
          </div>
        </div>
      </mdb-col>
    </mdb-row>
    <!-- 方案征集方式 -->
    <mdb-row class="form-mdb-row">
      <mdb-col >
        <div class="text-2">方案征集方式</div>
        <div id="collectProgram">
          <div class="form-check">
            <input 
              type="radio" 
              class="form-check-input" 
              name="collectProgramType" 
              v-model="formLabelAlign.collectProgramType"
              value="3"
              id="Commission"
              :disabled="disabled"
            >
            <label class="form-check-label" for="Commission">委托设计</label>
          </div>
          <div class="form-check">
            <input 
              type="radio" 
              class="form-check-input" 
              name="collectProgramType" 
              v-model="formLabelAlign.collectProgramType"
              value="1"
              id="public"
              :disabled="disabled"
            >
            <label class="form-check-label" for="public">公开招标</label>
          </div>
          <div class="form-check">
            <input 
              type="radio" 
              class="form-check-input" 
              name="collectProgramType" 
              v-model="formLabelAlign.collectProgramType"
              value="2"
              id="invite"
              :disabled="disabled"
            >
            <label class="form-check-label" for="invite">邀请招标</label>
          </div>
          <div class="form-check">
            <input 
              type="radio" 
              class="form-check-input" 
              name="collectProgramType" 
              v-model="formLabelAlign.collectProgramType"
              value="4"
              :disabled="disabled"
              id="inviteAndPublic"
            >
            <label class="form-check-label" for="inviteAndPublic">邀请+公开招标 </label>
          </div>
        </div>
        <mdb-row  style="margin-top:24px;">
          <mdb-col  md="12" class="clearfix">
           <div class="outline-input w-347 fl" style="margin-right:24px;" v-if="formLabelAlign.collectProgramType!=1">
              <mdb-input
                type="text"
                size="lg"
                label="拟邀请建筑师师数量"
                :disabled="disabled"
                v-model="formLabelAlign.designerNum"
                outline
              />
            </div>
            <div class="outline-input w-347 fl"  v-if="formLabelAlign.collectProgramType!=3">
              <mdb-input
                type="text"
                size="lg"
                label="入围方案数量"
                :disabled="disabled"
                v-model="formLabelAlign.incircleRecomNum"
                outline
              />
            </div>
          </mdb-col>
        </mdb-row>
      </mdb-col>
    </mdb-row>
     <!-- 项目设计需求部分 -->
    <mdb-row class="form-mdb-row">
      <mdb-col>
        <div class="text-2">设计任务书</div>
        <div id="hasTaskFileArr">
          <div class="form-check">
            <input 
              type="radio" 
              class="form-check-input" 
              name="hasTaskFile" 
              value="1"
              v-model="formLabelAlign.hasTaskFile"
              id="hasTaskFile01"
              :disabled="disabled"
            >
            <label class="form-check-label" for="hasTaskFile01">有任务书</label>
          </div>
          <div class="form-check">
            <input 
              type="radio" 
              class="form-check-input" 
              name="hasTaskFile" 
              value="2"
              v-model="formLabelAlign.hasTaskFile"
              id="hasTaskFile02"
              :disabled="disabled"
            >
            <label class="form-check-label" for="hasTaskFile02">无任务书</label>
          </div>
          <div class="form-check">
            <input 
              type="radio" 
              class="form-check-input" 
              name="hasTaskFile" 
              value="3"
              v-model="formLabelAlign.hasTaskFile"
              id="hasTaskFile03"
              :disabled="disabled"
            >
            <label class="form-check-label" for="hasTaskFile03">代写任务书（增值服务）</label>
          </div>
        </div>
      </mdb-col>
    </mdb-row>
    <!-- 任务书 -->
    <mdb-row class="form-mdb-row" v-if="formLabelAlign.hasTaskFile==1">
      <mdb-col>
        <p style="line-height:1rem;color: #606266;" v-if="formLabelAlign.taskFileList&&formLabelAlign.taskFileList.length>0&&formLabelAlign.taskFileList[0].orgfileName">{{formLabelAlign.taskFileList[0].orgfileName}}</p>
      </mdb-col>
    </mdb-row>
    <!-- 无任务书 -->
    <mdb-row class="form-mdb-row" v-if="formLabelAlign.hasTaskFile==2">
      <mdb-col>
        <mdb-row>
          <mdb-col md="12">
             <div class="text-2">项目设计需求</div>
          </mdb-col>
        </mdb-row>
        <mdb-row class="form-mdb-row" style="margin-top:24px;">
          <mdb-col md="12" class="clearfix">
            <div class="outline-input w-347 fl mr24">
              <mdb-input
                type="text"
                size="lg"
                label="用地规模（平方米）"
                :disabled="disabled"
                v-model="formLabelAlign.ydModel"
                outline
              />
            </div>
             <div class="outline-input w-347 fl">
              <mdb-input
                type="text"
                size="lg"
                label="建设规模（平方米）"
                :disabled="disabled"
                v-model="formLabelAlign.arcModel"
                outline
              />
            </div>
          </mdb-col>
        </mdb-row>
        <mdb-row class="form-mdb-row">
          <mdb-col>
            <div class="text-2">项目类别</div>
            <div id="projectType" class="mt12">
              <div
                class="form-check checkbox-teal"
                v-for="item in projectTypeList"
                :key="item.value"
              >
                <input
                  type="checkbox"
                  class="form-check-input"
                  name="projectType"
                  :id="item.id"
                  :value="item.id"
                  :disabled="disabled"
                  :checked="selectedProjectType.indexOf(item.name)!=-1"
                >
                <label class="form-check-label" :for="item.id">{{item.name}}</label>
              </div>
            </div>
          </mdb-col>
        </mdb-row>
        <mdb-row>
          <mdb-col md="12">
            <p class="text-0" style="color:#999999;"><mdb-icon icon="exclamation-circle" />项目包含的功能内容</p>
            <div>{{formLabelAlign.buildDetail}}</div>
            <!-- <mdb-row class="form-mdb-row">
              <mdb-col md="10" v-for="(valueList,key) in buildList" :key="key">
                <label for="projectTs" class="form-label">{{valueList.key}}</label>
                <div id="projectTs">
                  <div
                    class="form-check checkbox-teal"
                    v-for="value in valueList.name"
                    :key="value.name"
                  >
                    <input
                      type="checkbox"
                      class="form-check-input"
                      name="projectTs"
                      :id="value.name"
                      :value="value.name"
                      :disabled="disabled"
                    >
                    <label class="form-check-label" :for="value.name">{{value.name}}</label>
                  </div>
                </div>
              </mdb-col>
            </mdb-row>-->
          </mdb-col>
          <mdb-col md="12">
            <div class="text-2">所选功能内容</div>
            <mdb-row
              class="form-mdb-row"
              style="margin-top:24px;"
              v-for="item in detailList"
              :key="item.value"
              id="choosedOP"
            >
              <mdb-col md="12" class="clearfix">
                <div class="outline-input w-347 fl mr24">
                  <mdb-input
                    type="text"
                    size="lg"
                    label="内容"
                    :disabled="disabled"
                    v-model="item.buildDetail"
                    outline
                  />
                </div>
                <div class="outline-input w-347 fl">
                  <mdb-input
                    type="text"
                    size="lg"
                    label="建设规模（平方米）"
                    :disabled="disabled"
                    v-model="item.buildSize"
                    outline
                  />
                </div>
              </mdb-col>
            </mdb-row>
          </mdb-col>
        </mdb-row>
        <mdb-row class="form-mdb-row" style="margin-top:32px;">
          <mdb-col>
            <div class="outline-input w712">
              <mdb-input
                type="textarea"
                label="设计需求详细描述"
                outline
                v-model="formLabelAlign.designDescribe"
                :disabled="disabled"
                :rows="3"
              />
            </div>
          </mdb-col>
        </mdb-row>
        <mdb-row class="form-mdb-row">
          <mdb-col md="12">
            <div class="text-2">预期项目周期</div>
          </mdb-col>
          <mdb-col md="12" class="clearfix" style="margin-top:24px;">
            <div class="fl mr24 w-347">
             <div class="date-box">
                <label class="label-date" :class="disabled?'disabled':''">开始日期</label>
                <mdb-date-picker
                  class="w-347"
                  :date="startDate" 
                  :option="option"
                  :class="disabled?'disabled':''"
                ></mdb-date-picker>
              </div>
            </div>
            <div class="fl w-347">
             <div class="date-box">
                <label class="label-date" :class="disabled?'disabled':''">结束日期</label>
                <mdb-date-picker
                  class="w-347"
                  :date="endDate" 
                  :option="option"
                  :class="disabled?'disabled':''"
                ></mdb-date-picker>
              </div>
            </div>
          </mdb-col>
        </mdb-row>
        <mdb-row style="margin-top:32px;">
          <mdb-col md="12">
            <div class="outline-input w712">
              <mdb-input
                type="text"
                size="lg"
                label="设计费预算"
                :disabled="disabled"
                v-model="formLabelAlign.designFeeBudget"
                outline
              />
            </div>
          </mdb-col>
        </mdb-row>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>
<script>
export default {
  name: "initialDemand",
  data() {
    return {
      selectedProjectType:[],
      projectTypeList: [],
      disabled: true,
      buildList: [],
      detailList: [],
      formLabelAlign: {
        type:1,
        orgfileName: "",
        filePath: "",
        hasTaskFile: "",
        projectType: [],
        buildType: [],
        buildDetail: [],
        buildSize: [],
        employerInfoElse: "",
        source: 1,
        projectName: "",
        employerInfo: "",
        ydModel: "",
        arcModel: "",
        collectDepth: "",
        designDescribe: "",
        collectProgramType: "",
        designerNum: "",
        beginTime: "",
        endTime: "",
        designFeeBudget: "",
        expectProgramNum: 1,
        incircleRecomNum: "",
        starDesignerNum: "",
        valueAddArr: []
      },
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
        placeholder: " ",
        inputStyle: {
          display: "inline-block",
          padding: "6px",
          "line-height": "22px",
          "font-size": "16px",
          border: "2px solid #fff",
          "box-shadow": "0 1px 3px 0 rgba(0, 0, 0, 0.2)",
          "border-radius": "2px",
          color: "#5F5F5F"
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
      startDate: {
        time: ""
      },
      endDate: {
        time: ""
      }
    };
  },
  methods: {
    //查建筑类型
    getDict() {
      this.api.buildingType("building_type").then(res => {
        this.projectTypeList = res.data;
      });
    },
    //初始需求
    queryOriginRequired() {
      this.api.queryOriginRequired({ projectId: this.$route.query.id, type:1, })
        .then(res => {
          if (res.code == 0) {
            this.formLabelAlign = res.data;
            if (!this.formLabelAlign.collectDepth) {
              this.formLabelAlign.collectDepth = "1";
            }
            this.startDate.time = this.formLabelAlign.beginTime;
            this.endDate.time = this.formLabelAlign.endTime;
            this.selectedProjectType = this.formLabelAlign.projectType.replace(/[&]/g, ",").split(",");
            let buildSize = this.formLabelAlign.buildSize.split("&");
            let buildDetail = this.formLabelAlign.buildDetail.split("&");
            if (buildSize &&buildDetail) {
              for (let i = 0; i < buildSize.length; i++) {
                let build_arr = {
                  buildDetail: buildDetail[i],
                  buildSize: buildSize[i]
                };
                this.detailList.push(build_arr);
              }
            }
          }
        });
    }
  },
  created() {
    this.getDict();
    this.queryOriginRequired();
  }
};
</script>
<style lang="less" scoped>
.initial-demand-warp {
  .text-0{
    color: #333333;
  }
  .text-1{
    margin-bottom: 1.375rem;
    color: #333333;
  }
  .w-347{
    width: 21.6875rem;
  }
  .w712{
    width: 44.5rem;
  }
  .mr24{
    margin-right: 1.5rem;
  }
  .mt12{
    margin-top: 0.75rem;
  }
  #employerInfo {
    .form-check {
      display: inline-block;
      padding-bottom: 0;
      margin-top: 0.75rem;
      margin-right: 8.3125rem !important;
      padding-left: 0;
      margin-bottom: 0 !important;
    }
    .form-check:last-child{
      margin-right: 0 !important;
    }
  }
  #hasTaskFileArr {
    .form-check {
      display: inline-block;
      padding-bottom: 0;
      margin-top: 0.75rem;
      margin-right: 6.5rem !important;
      padding-left: 0;
      margin-bottom: 0 !important;
    }
    .form-check:last-child{
      margin-right: 0 !important;
    }
  }
  #collectDepth {
    .form-check {
      display: inline-block;
      padding-bottom: 0;
      margin-top: 0.75rem;
      margin-right: 6.625rem !important;
      padding-left: 0;
      margin-bottom: 0 !important;
    }
    .form-check:last-child{
      margin-right: 0 !important;
    }
  }
  #collectProgram{
    .form-check {
      display: inline-block;
      padding-bottom: 0;
      margin-top: 0.75rem;
      margin-right: 6.625rem !important;
      padding-left: 0;
      margin-bottom: 0 !important;
    }
    .form-check:last-child{
      margin-right: 0 !important;
    }
  }
  .tip-a {
    font-size: 0.75rem;
    color: #4699ff;
    border-bottom: 0.0625rem solid #4699ff;
    cursor: pointer;
  }
  #projectType {
    display: flex;
    align-items: center;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow: hidden;
    font-size: 0.875rem;
    .form-check {
      width: 16.66666667%;
      margin-right: 0;
      padding-left: 0;
      margin-bottom: 1.875rem;
      flex: 0 0 1 !important;
      color: #999999;
    }
    .form-check:nth-child(6n+1){
       width: 14.66666667%;
    }
    .form-check:nth-child(6n){
      width: 18.66666667%;
    }
  }
  #projectTs {
    display: flex;
    align-items: center;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow: hidden;
    .form-check {
      width: 33%;
      margin-right: 0;
      flex: 0 0 1 !important;
    }
  }
  .info-pb .form-control {
    display: inline-block !important;
    width: 60% !important;
  }
  .info-pb .span-input {
    display: inline-block !important;
    font-size: 0.875rem;
    text-align: right;
    padding-right: 0.5rem;
    box-sizing: border-box;
    padding-left: 0 !important;
  }
  .info-pb {
    margin-bottom: 1.375rem;
  }
  .info-pb input {
    border-color: #f5f7fa !important;
    background: #f5f7fa !important;
    color: #c0c4cc;
  }
}
</style>
<style lang="less">
.initial-demand-warp{
  .datepickbox{
    input{
      box-shadow: none !important;
      border: 1px solid #dadce0  !important;
      border-radius: 0.25rem  !important;
    }
  }
  .cov-vue-date{
    input{
      width: 100% !important;
      height: 3.125rem;
    }
  }
}
</style>
