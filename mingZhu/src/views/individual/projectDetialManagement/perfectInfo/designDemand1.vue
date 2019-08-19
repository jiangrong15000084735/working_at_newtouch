<template>
  <mdb-container class="design-demand1-warp px-0">
    <mdb-row class="mb-2">
      <mdb-col>
        <h3 class="detail-title" style="font-weight:600;">项目方案设计要求</h3>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-2">
      <mdb-col md="6">
        <div class="form-check pl-0">
          <input 
            type="radio" 
            class="form-check-input" 
            name="radio1"
            id="defaultUnchecked"
            v-model="taskFileFlag"
            value="1"
            @change="changeTaskFileFlag"
            :disabled="disabled"
          >
          <label class="form-check-label" for="defaultUnchecked">有设计任务书</label>
        </div>
      </mdb-col>
      <mdb-col md="6">
        <div class="form-check pl-0">
          <input 
            type="radio" 
            class="form-check-input" 
            name="radio1"
            id="defaultUnchecked1"
            v-model="taskFileFlag"
            value="2"
            @change="changeTaskFileFlag"
            :disabled="disabled"
          >
          <label class="form-check-label" for="defaultUnchecked1">无设计任务书（请填写以下内容）</label>
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row v-if="taskFileFlag==1" class="mb-2">
      <mdb-col>
        <UpLoad 
          :list="taskFileList" 
          :isShow="!disabled" 
          :saveProjectMoney="handleSuccess"
          :btnName="'上传文件'"
        ></UpLoad>
      </mdb-col>
    </mdb-row>
    <mdb-row v-if="taskFileFlagError" class="mb-2">
      <mdb-col> 
        <div class="error-tip">{{taskFileFlagError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mt-2 mb-4">
      <mdb-col>以下内容，无设计任务书必填，有设计任务书选填</mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="10">
        <div class="outline-input">
          <mdb-input 
            type="textarea" 
            label="项目定位及总体目标" 
            :rows="3" 
            v-model="dasigRequirementForm.general"
            @change="checkGeneral"
            :disabled="disabled"
            outline 
          />
          </div>
        <div class="tip-error mt-2" v-if="generalError">{{generalError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="10">
        <div class="outline-input">
          <mdb-input 
            type="textarea" 
            label="功能及形态布局要求" 
            :rows="3" 
            v-model="dasigRequirementForm.layout"
            @change="checkLayout"
            :disabled="disabled"
            outline 
          />
          </div>
        <div class="tip-error mt-2" v-if="layoutError">{{layoutError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row  class="mb-4">
      <mdb-col md="10">
         <div class="outline-input">
          <mdb-input 
            type="textarea" 
            label="道路交通规划要求" 
            :rows="3" 
            v-model="dasigRequirementForm.trafficPlan"
            @change="checkTrafficPlan"
            :disabled="disabled"
            outline 
          />
          </div>
        <div class="tip-error mt-2" v-if="trafficPlanError">{{trafficPlanError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="10">
        <div class="outline-input">
          <mdb-input 
            type="textarea" 
            label="景观绿化设计要求" 
            :rows="3" 
            v-model="dasigRequirementForm.greenLandspace"
            @change="checkGreenLandspace"
            :disabled="disabled"
            outline 
          />
          </div>
        <div class="tip-error mt-2" v-if="greenLandspaceError">{{greenLandspaceError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="10">
        <div class="outline-input">
          <mdb-input 
            type="textarea" 
            label="其他设计要求" 
            :rows="3" 
            v-model="dasigRequirementForm.other"
            @change="checkOther"
            :disabled="disabled"
            outline 
          />
          </div>
        <div class="tip-error mt-2" v-if="otherError">{{otherError}}</div>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>
<script>
import UpLoad from "@/components/upLoad"
export default {
  name: "designDemand1",
  components:{UpLoad},
  data() {
    return {
      disabled: false,
      origin: null,
      actives: 4,
      taskFileFlag: null,
      // taskFilename: null,
      dasigRequirementForm: {
        id: null,
        taskId: null,
        general: "", // 项目定位及总体目标
        layout: "", // 功能及形态布局要求
        trafficPlan: "", // 道路交通规划要求
        greenLandspace: "", // 绿化景观
        other: "",
        taskFile: null,
        taskFileName: null,
        projectId: this.$route.query.id,
        step: null,
        taskFileFlag: null,
        type: 1
      },

      taskFileFlagError: null,
      generalError: null,
      layoutError: null,
      trafficPlanError: null,
      greenLandspaceError: null,
      otherError: null,

      taskFileList:[],
    };
  },
  watch: {
    $route() {
      this.step = this.$route.query.step;
    }
  },
  methods: {
    checkGeneral(val) {
      if (this.taskFileFlag == 2&&!this.dasigRequirementForm.general) {
        this.generalError = "请输入项目定位及总体目标";
      } else if(this.dasigRequirementForm.general.length>500){
        this.generalError = "您输入的长度有误";
      }else {
        this.generalError = "";
      }
    },
    checkLayout(val) {
      if (this.taskFileFlag == 2&&!this.dasigRequirementForm.layout) {
        this.layoutError = "请输入功能及形态布局要求";
      }else if(this.dasigRequirementForm.layout.length>500){
        this.layoutError = "您输入的长度有误";
      } else {
        this.layoutError = "";
      }
    },
    checkTrafficPlan(val) {
      if (this.taskFileFlag == 2&&!this.dasigRequirementForm.trafficPlan) {
        this.trafficPlanError = "请输入道路交通规划要求";
      }else if(this.dasigRequirementForm.trafficPlan.length>500){
        this.trafficPlanError = "您输入的长度有误";
      } else {
        this.trafficPlanError = "";
      }
    },
    checkGreenLandspace(val) {
      if (this.taskFileFlag == 2&&!this.dasigRequirementForm.greenLandspace) {
        this.greenLandspaceError = "请输入景观绿化设计要求";
      }else if(this.dasigRequirementForm.greenLandspace.length>500){
        this.greenLandspaceError = "您输入的长度有误";
      } else {
        this.greenLandspaceError = "";
      }
    },
    checkOther(val) {
      if (this.taskFileFlag == 2&&!this.dasigRequirementForm.other) {
        this.otherError = "请输入其他设计要求";
      }else if(this.dasigRequirementForm.greenLandspace.length>500){
        this.otherError = "您输入的长度有误";
      } else {
        this.otherError = "";
      }
    },
    emptyError(){
      this.generalError=null;
      this.layoutError=null;
      this.trafficPlanError=null;
      this.greenLandspaceError=null;
      this.otherError=null;
    },
    changeTaskFileFlag() {
      this.taskFileFlagError = null;
      if (this.taskFileFlag == 1) {
        this.dasigRequirementForm.taskFileFlag = true;
        this.emptyError();
      } else if (this.taskFileFlag == 2) {
        this.dasigRequirementForm.taskFileFlag = false;
      }
    },
    // 文件上传
    handleSuccess(file, fileList) {
      this.taskFileFlagError = null;
      this.dasigRequirementForm.taskFile = file.msg;
      this.dasigRequirementForm.taskFileName = fileList.name;
      this.taskFileList = [{
        name:fileList.name,
        url:file.msg
      }]
      if(this.dasigRequirementForm.taskFile&&this.dasigRequirementForm.taskFileName){
        this.$message("操作成功。")
      }else{
        this.$message("上传文件失败。请重新上传。")
      }
    },
    temporarilySave() {
      this.emptyError();
      let isCheckPass = this.checkLen()
      if(isCheckPass){
        this.dasigRequirementForm.type = 1;
        this.dasigRequirementForm.projectId = this.$route.query.id;
        this.api.updateTaskDesignRequired(this.dasigRequirementForm).then(res => {
          if (res.code == 0) {
            this.dasigRequirementForm.taskId = res.data;
            this.$message("已保存,若需填写下一页,请点击设计需求2!");
          } else {
            this.$message(res.msg);
          }
        });
      }
      return isCheckPass
    },
    checkLen(){
      let isCheckPass = true
      if (this.dasigRequirementForm.general.length>500) {
          this.generalError = "您输入的长度有误";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (this.dasigRequirementForm.layout.length>500) {
          this.layoutError = "您输入的长度有误";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (this.dasigRequirementForm.trafficPlan.length>500) {
          this.trafficPlanError = "您输入的长度有误";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (this.dasigRequirementForm.greenLandspace.length>500) {
          this.greenLandspaceError = "您输入的长度有误";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (this.dasigRequirementForm.other.length>500) {
          this.otherError = "您输入的长度有误";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
      return isCheckPass
    },
    checkForm() {
      let isCheckPass = true;
      if (this.taskFileFlag == 2) {
        if (!this.dasigRequirementForm.general || this.generalError) {
          this.generalError = "请输入项目定位及总体目标";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (!this.dasigRequirementForm.layout || this.layoutError) {
          this.layoutError = "请输入功能及形态布局要求";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (!this.dasigRequirementForm.trafficPlan || this.trafficPlanError) {
          this.trafficPlanError = "请输入道路交通规划要求";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (
          !this.dasigRequirementForm.greenLandspace ||
          this.greenLandspaceError
        ) {
          this.greenLandspaceError = "请输入景观绿化设计要求";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }

        if (!this.dasigRequirementForm.other || this.otherError) {
          this.otherError = "请输入其他设计要求";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
      } else if (this.taskFileFlag == 1) {
        if (!this.dasigRequirementForm.taskFile) {
          this.taskFileFlagError = "有设计任务书请上传任务书";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if(!this.checkLen()){
          isCheckPass = this.checkLen();
        }
      } else {
        this.taskFileFlagError = "请选择是否有设计任务书";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      return isCheckPass;
    },
    submit() {
      let isCheckPass = this.checkForm();
      if (isCheckPass) {
        this.dasigRequirementForm.type = 1;
        this.dasigRequirementForm.projectId = this.$route.query.id;
        this.api
          .submitTaskDesignRequired(this.dasigRequirementForm)
          .then(res => {
            if (res.code == 0) {
              this.$message("操作成功");
              this.dasigRequirementForm.taskId = res.data;
            } else {
              this.$message(res.msg);
            }
          });
      }
      return isCheckPass;
    }
  },
  created() {
    this.step = this.$route.query.step;
    this.origin = location.origin;
    this.api.seekTaskBaseInfo(this.$route.query.id).then(res => {
      // 1 代写任务书
      // 2 二审通过
      // 3 提交
      if (res.data.projectDO.hasTaskFile == 3||
      (res.data.tbTaskDO&&res.data.tbTaskDO.auditState==5)||
      (res.data.taskDesignRequiredDO&&res.data.taskDesignRequiredDO.auditState&&res.data.taskDesignRequiredDO.auditState!=3)
      ) {
        this.disabled = true;
      }
      if (res.data.taskDesignRequiredDO) {
        this.dasigRequirementForm.taskFileFlag = res.data.taskFileFlag;
        this.dasigRequirementForm.general =
          res.data.taskDesignRequiredDO.general;
        this.dasigRequirementForm.id = res.data.taskDesignRequiredDO.id;
        this.dasigRequirementForm.taskId = res.data.taskDesignRequiredDO.taskId;
        this.dasigRequirementForm.layout = res.data.taskDesignRequiredDO.layout;
        this.dasigRequirementForm.trafficPlan = res.data.taskDesignRequiredDO.trafficPlan;
        this.dasigRequirementForm.greenLandspace =
          res.data.taskDesignRequiredDO.greenLandspace;
        this.dasigRequirementForm.other = res.data.taskDesignRequiredDO.other;
        this.dasigRequirementForm.taskFile =
          res.data.taskDesignRequiredDO.taskFile;
       
      }
       if (res.data.taskFileFlag) {
        this.taskFileFlag = "1";
        this.dasigRequirementForm.taskFileFlag = res.data.taskFileFlag;
        
        for (var i = 0; i < res.data.taskFileDOList.length; i++) {
          if (res.data.taskFileDOList[i].type == "TaskFile") {
            this.dasigRequirementForm.taskFile = res.data.taskFileDOList[i].filePath;
            this.dasigRequirementForm.taskFileName = res.data.taskFileDOList[i].orgfileName;
            this.taskFileList = [{
              name:res.data.taskFileDOList[i].orgfileName,
              url:res.data.taskFileDOList[i].filePath
            }]
          }
        }
      } else {
        this.taskFileFlag = "2";
        this.dasigRequirementForm.taskFileFlag = false;
      }
    });
  }
};
</script>
<style lang="less" scoped>
.design-demand1-warp {
  .tip-error {
    color: red;
  }
}
</style>
