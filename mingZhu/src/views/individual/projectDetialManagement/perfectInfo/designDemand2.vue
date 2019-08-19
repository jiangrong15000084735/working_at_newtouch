<template>
  <mdb-container class="design-demand2-warp px-0">
    <mdb-row class="mb-3">
      <mdb-col>
        <h3 class="detail-title" style="font-weight:600;">建筑设计要求</h3>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-3">
      <mdb-col>以下内容，无设计任务书必填，有设计任务书选填</mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="10">
         <div class="outline-input">
          <mdb-input 
            type="textarea" 
            label="功能名称及面积要求" 
            :rows="3" 
            v-model="designForm.function"
            @change="checkfunction"
            :disabled="disabled"
            outline 
          />
          </div>
        <div class="tip-error mt-2" v-if="functionError">{{functionError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="10">
        <div class="outline-input">
          <mdb-input 
            type="textarea" 
            label="立面设计要求" 
            :rows="3" 
            v-model="designForm.facade"
            @change="checkfacade"
            :disabled="disabled"
            outline 
          />
          </div>
        <div class="tip-error mt-2" v-if="facadeError">{{facadeError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="10">
        <div class="outline-input">
          <mdb-input 
            type="textarea" 
            label="详细要求" 
            :rows="3" 
            v-model="designForm.houseType"
            @change="checkhouseType"
            :disabled="disabled"
            outline 
          />
          </div>
        <div class="tip-error mt-2" v-if="houseTypeError">{{houseTypeError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="10">
         <div class="outline-input">
          <mdb-input 
            type="textarea" 
            label="相关专业设计要求" 
            :rows="3" 
            v-model="designForm.structure"
            @change="checkstructure"
            :disabled="disabled"
            outline 
          />
          </div>
        <div class="tip-error mt-2" v-if="structureError">{{structureError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="10">
         <div class="outline-input">
          <mdb-input 
            type="textarea" 
            label="设计/建设标准要求" 
            :rows="3" 
            v-model="designForm.required"
            @change="checkrequired"
            :disabled="disabled"
            outline 
          />
          </div>
        <div class="tip-error mt-2" v-if="requiredError">{{requiredError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="10">
         <div class="outline-input">
          <mdb-input 
            type="textarea" 
            label="其他" 
            :rows="3" 
            v-model="designForm.other"
            @change="checkother"
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
export default {
  name: "designDemand2",
  data() {
    return {
      disabled: false,
      functionError: null,
      facadeError: null,
      houseTypeError: null,
      structureError: null,
      requiredError: null,
      otherError: null,

      origin: null,
      actives: 0,
      taskFileFlag: false,
      taskFile: "",
      taskFileName:"",
      designForm: {
        id: null,
        taskId: null,
        function: "", //功能名称及面积要求
        facade: "", // 立面设计
        houseType: "", // 详细要求
        structure: "", // 相关设计要求
        required: "", // 设计/建设标准要求
        other: "", // 其他
        projectId: this.$route.query.id,
        step: null,
        type: 1
      }
    };
  },
  watch: {
    $route() {
      this.step = this.$route.query.step;
    }
  },
  methods: {
    checkfunction() {
      if (!this.taskFileFlag&&!this.designForm.function) {
        this.functionError = "请输入功能名称及面积要求";
      } else if(this.designForm.function.length>500){
        this.functionError = "您输入的长度有误";
      } else {
        this.functionError = "";
      }
    },
    checkfacade() {
      if (!this.taskFileFlag&&!this.designForm.facade) {
        this.facadeError = "请输入立面设计要求";
      } else if(this.designForm.facade.length>500){
        this.facadeError = "您输入的长度有误";
      }else {
        this.facadeError = "";
      }
    },
    checkhouseType() {
      if (!this.taskFileFlag&&!this.designForm.houseType) {
        this.houseTypeError = "请输入详细要求";
      } else if(this.designForm.houseType.length>500){
        this.houseTypeError = "您输入的长度有误";
      } else {
        this.houseTypeError = "";
      }
    },
    checkstructure() {
      if (!this.taskFileFlag&&!this.designForm.structure) {
        this.structureError = "请输入相关专业设计要求";
      } else if(this.designForm.structure.length>500){
        this.structureError = "您输入的长度有误";
      } else {
        this.structureError = "";
      }
    },
    checkrequired() {
      if (!this.taskFileFlag&&!this.designForm.required) {
        this.requiredError = "请输入设计/建设标准要求";
      }else if(this.designForm.required.length>500){
        this.requiredError = "您输入的长度有误";
      } else {
        this.requiredError = "";
      }
    },
    checkother() {
      if (!this.taskFileFlag&&!this.designForm.other) {
        this.otherError = "请输入其他建筑设计要求";
      } else if(this.designForm.other.length>500){
        this.otherError = "您输入的长度有误";
      } else {
        this.otherError = "";
      }
    },
    emptyError(){
      this.functionError= null;
      this.facadeError=null;
      this.houseTypeError=null;
      this.structureError= null;
      this.requiredError= null;
      this.otherError= null;
    },
    temporarilySave() {
      this.emptyError()
      let isCheckPass = this.checkLen()
      if(isCheckPass){
        this.designForm.type = 1;
        this.designForm.projectId = this.$route.query.id;
        this.api.updateTaskArchRequired(this.designForm).then(res => {
          if (res.code == 0) {
            this.$message("已保存,若需填写下一页,请点击设计费预估");
            this.designForm.id = res.data;
            return true
          } else {
            this.$message(res.msg);
          }
        });
      }
      return isCheckPass
    },
    checkLen(){
      let isCheckPass = true
        if (this.designForm.function.length>500) {
          this.functionError = "您输入的长度有误";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (this.designForm.facade.length>500) {
          this.facadeError = "您输入的长度有误";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (this.designForm.houseType.length>500) {
          this.houseTypeError = "您输入的长度有误";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (this.designForm.structure.length>500) {
          this.structureError = "您输入的长度有误";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (this.designForm.required.length>500) {
          this.requiredError = "您输入的长度有误";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (this.designForm.other.length>500) {
          this.otherError = "您输入的长度有误";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        return isCheckPass
    },
    checkForm() {
      let isCheckPass = true;
      if (!this.taskFileFlag) {
        if (!this.designForm.function || this.functionError) {
          this.functionError = "请输入功能名称及面积要求";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (!this.designForm.facade || this.facadeError) {
          this.facadeError = "请输入立面设计要求";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (!this.designForm.houseType || this.houseTypeError) {
          this.houseTypeError = "请输入详细要求";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (!this.designForm.structure || this.structureError) {
          this.structureError = "请输入相关专业设计要求";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (!this.designForm.required || this.requiredError) {
          this.requiredError = "请输入设计/建设标准要求";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (!this.designForm.other || this.otherError) {
          this.otherError = "请输入其他建筑设计要求";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
      } else if (this.taskFileFlag) {
        isCheckPass = this.checkLen()
      }
      return isCheckPass;
    },
    submit() {
      let isCheckPass = this.checkForm();
      if (isCheckPass) {
        this.designForm.type = 1;
        this.designForm.projectId = this.$route.query.id;
        this.api.submitTaskArchRequired(this.designForm).then(res => {
          if (res.code == 0) {
            this.designForm.id = res.data;
            this.$message("操作成功");
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
      (res.data.taskArchRequiredDO&&res.data.taskArchRequiredDO.auditState&&res.data.taskArchRequiredDO.auditState!=3)
      ) {
        this.disabled = true;
      }
      if (res.data.taskArchRequiredDO) {
        this.designForm.id = res.data.taskArchRequiredDO.id;
        this.designForm.other = res.data.taskArchRequiredDO.other;
        this.designForm.taskId = res.data.taskArchRequiredDO.taskId;
        this.designForm.facade = res.data.taskArchRequiredDO.facade;
        this.designForm.function = res.data.taskArchRequiredDO.function;
        this.designForm.required = res.data.taskArchRequiredDO.required;
        this.designForm.houseType = res.data.taskArchRequiredDO.houseType;
        this.designForm.structure = res.data.taskArchRequiredDO.structure;
      }
      if (res.data.taskFileFlag) {
        this.taskFileFlag = res.data.taskFileFlag;
        if (res.data.taskFileDOList) {
          for (var i = 0; i < res.data.taskFileDOList.length; i++) {
            if (res.data.taskFileDOList[i].type == "TaskFile") {
              this.taskFile = res.data.taskFileDOList[i].filePath;
              this.taskFileName = res.data.taskFileDOList[i].orgfileName;
            }
          }
        }
      }
    });
  }
};
</script>
<style lang="less" scoped>
.design-demand2-warp {
  .tip-error {
    color: red;
  }
}
</style>
