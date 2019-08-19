<template>
  <mdb-container class="mingzhu-depth px-0">
    <!-- 设计深度要求 -->
    <mdb-row>
      <mdb-col>
        <p class="text-1">设计深度要求</p>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="5">
        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            name="radio1"
            id="option2"
            v-model="requireData.solutionType"
            value="2"
            @change="checksolutionType"
            :disabled="disabled"
          >
          <label class="form-check-label" for="option2">概念方案</label>
        </div>
      </mdb-col>
      <mdb-col md="5">
        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            name="radio1"
            id="option1"
            v-model="requireData.solutionType"
            value="1"
            @change="checksolutionType"
            :disabled="disabled"
          >
          <label class="form-check-label" for="option1">建筑方案</label>
        </div>
      </mdb-col>
      <mdb-col md="12"  class="tip-error mt-2" v-if="solutionTypeError">{{solutionTypeError}}</mdb-col>
    </mdb-row>

    <mdb-row>
      <mdb-col>
        <p class="text-1">设计成果要求</p>
      </mdb-col>
    </mdb-row>
    <!-- 设计成果要求/平面图要求 -->
    <mdb-row class="mb-4">
      <mdb-col md="5">
        <div class="outline-input">
          <mdb-input
            type="textarea"
            :rows="3"
            label="总图要求"
            :disabled="disabled"
            v-model="requireData.generalRequired"
            @change="checkgeneralRequired"
            outline
          />
        </div>
        <div class="tip-error mt-2" v-if="generalRequiredError">{{generalRequiredError}}</div>
      </mdb-col>
      <mdb-col md="5">
        <div class="outline-input">
          <mdb-input
            type="textarea"
            :rows="3"
            label="平面图要求"
            :disabled="disabled"
            v-model="requireData.planeRequired"
            @change="checkplaneRequired"
            outline
          />
        </div>
        <div class="tip-error mt-2" v-if="planeRequiredError">{{planeRequiredError}}</div>
      </mdb-col>
    </mdb-row>
    <!-- 立面图要求/剖面图要求 -->
    <mdb-row class="mb-4">
      <mdb-col md="5">
        <div class="outline-input">
          <mdb-input
            type="textarea"
            :rows="3"
            label="立面图要求"
            :disabled="disabled"
            v-model="requireData.facadeRequired"
            @change="checkfacadeRequired"
            outline
          />
        </div>
        <div class="tip-error mt-2" v-if="facadeRequiredError">{{facadeRequiredError}}</div>
      </mdb-col>
      <mdb-col md="5">
        <div class="outline-input">
          <mdb-input
            type="textarea"
            :rows="3"
            label="剖面图要求"
            :disabled="disabled"
            v-model="requireData.profileRequired"
            @change="checkprofileRequired"
            outline
          />
        </div>
        <div class="tip-error mt-2" v-if="profileRequiredError">{{profileRequiredError}}</div>
      </mdb-col>
    </mdb-row>
    <!-- 分析图要求/效果图要求 -->
    <mdb-row class="mb-4">
      <mdb-col md="5">
        <div class="outline-input">
          <mdb-input
            type="textarea"
            :rows="3"
            label="分析图要求"
            :disabled="disabled"
            v-model="requireData.analysisRequired"
            @change="checkanalysisRequired"
            outline
          />
        </div>
        <div class="tip-error mt-2" v-if="analysisRequiredError">{{analysisRequiredError}}</div>
      </mdb-col>
      <mdb-col md="5">
        <div class="outline-input">
          <mdb-input
            type="textarea"
            :rows="3"
            label="效果图要求"
            :disabled="disabled"
            v-model="requireData.designSketchRequired"
            @change="checkdesignSketchRequired"
            outline
          />
        </div>
        <div class="tip-error mt-2" v-if="designSketchRequiredError">{{designSketchRequiredError}}</div>
      </mdb-col>
    </mdb-row>
    <!-- 演示文件要求 -->
    <mdb-row class="mb-4">
      <mdb-col md="10" >
        <mdb-row>
          <mdb-col md="3">
            <p class="text-0">演示文件要求</p>
          </mdb-col>
          <mdb-col md="9">
            <mdb-row>
              <mdb-col md="6">
                <div class="form-check pl-0">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="radioY"
                    id="option3"
                    v-model="requireData.demonstrationFlag"
                    value="Y"
                    @change="checkdemonstrationFlag"
                    :disabled="disabled"
                  >
                  <label class="form-check-label" for="option3">是</label>
                </div>
              </mdb-col>
              <mdb-col md="6">
                <div class="form-check pl-0">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="radioY"
                    id="option4"
                    v-model="requireData.demonstrationFlag"
                    value="N"
                    @change="checkdemonstrationFlag"
                    :disabled="disabled"
                  >
                  <label class="form-check-label" for="option4">否</label>
                </div>
              </mdb-col>
              <mdb-col md="12"  class="tip-error" v-if="demonstrationFlagError">{{demonstrationFlagError}}</mdb-col>
            </mdb-row>
            <mdb-row v-if="requireData.demonstrationFlag == 'Y'" >
              <mdb-col md="6" class="my-3">
                <div class="outline-input">
                  <mdb-input
                    type="text"
                    size="lg"
                    label="时长要求不低于（分钟）"
                    :disabled="disabled"
                    v-model="requireData.minDemonstrationDuration"
                    @change="checkedMinDD"
                    outline
                  />
                </div>
                <div class="tip-error mt-2" v-if="minDDError">{{minDDError}}</div>
              </mdb-col>
              <mdb-col md="6" class="my-3">
                <div class="outline-input">
                  <mdb-input
                    type="text"
                    size="lg"
                    label="时长要求不高于（分钟）"
                    :disabled="disabled"
                    v-model="requireData.maxDemonstrationDuration"
                    @change="checkedMaxDD"
                    outline
                  />
                </div>
                <div class="tip-error mt-2" v-if="maxDDError">{{maxDDError}}</div>
              </mdb-col>
              <mdb-col md="12">
                <div class="outline-input">
                  <mdb-input
                    type="text"
                    size="lg"
                    label="其他要求"
                    :disabled="disabled"
                    v-model="requireData.demonstrationRequire"
                    @change="checkdemonstrationRequire"
                    outline
                  />
                </div>
                <div
                  class="tip-error mt-2"
                  v-if="demonstrationRequireError"
                >{{demonstrationRequireError}}</div>
              </mdb-col>
            </mdb-row>
          </mdb-col>
        </mdb-row>
      </mdb-col>
    </mdb-row>
    <!-- 动画要求 -->
    <mdb-row class="mb-4">
      <mdb-col md="10">
        <mdb-row>
          <mdb-col md="3">
            <p class="text-0">动画要求</p>
          </mdb-col>
          <mdb-col md="9">
            <mdb-row>
              <mdb-col md="6">
                <div class="form-check pl-0">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="radioVideo"
                    id="option5"
                    v-model="requireData.videoFlag"
                    value="Y"
                    @change="checkvideoFlag"
                    :disabled="disabled"
                  >
                  <label class="form-check-label" for="option5">是</label>
                </div>
              </mdb-col>
              <mdb-col md="6">
                <div class="form-check pl-0">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="radioVideo"
                    id="option6"
                    v-model="requireData.videoFlag"
                    value="N"
                    @change="checkvideoFlag"
                    :disabled="disabled"
                  >
                  <label class="form-check-label" for="option6">否</label>
                </div>
              </mdb-col>
              <mdb-col md="12"  class="tip-error mt-2" v-if="videoFlagError">{{videoFlagError}}</mdb-col>
            </mdb-row>
            <mdb-row v-if="requireData.videoFlag == 'Y'" >
              <mdb-col md="6" class="my-3">
                  <div class="outline-input">
                    <mdb-input
                      type="text"
                      size="lg"
                      label="时长要求不低于（分钟）"
                      :disabled="disabled"
                      v-model="requireData.minVideoDuration"
                      @change="checkedMinVD"
                      outline
                    />
                  </div>
                  <div class="tip-error mt-2" v-if="minVDError">{{minVDError}}</div>
              </mdb-col>
              <mdb-col md="6" class="my-3">
                <div class="outline-input">
                  <mdb-input
                    type="text"
                    size="lg"
                    label="时长要求不高于（分钟）"
                    :disabled="disabled"
                    v-model="requireData.maxVideoDuration"
                    @change="checkedMaxVD"
                    outline
                  />
                </div>
                <div class="tip-error mt-2" v-if="maxVDError">{{maxVDError}}</div>
              </mdb-col>
              <mdb-col md="12">
                <div class="outline-input">
                  <mdb-input
                    type="text"
                    size="lg"
                    label="其他要求"
                    :disabled="disabled"
                    v-model="requireData.videoRequire"
                    @change="checkvideoRequire"
                    outline
                  />
                </div>
                <div class="tip-error mt-2" v-if="videoRequireError">{{videoRequireError}}</div>
              </mdb-col>
            </mdb-row>
          </mdb-col>
        </mdb-row>
      </mdb-col>
    </mdb-row>
    <!-- 设计说明要求 -->
    <mdb-row class="mb-4">
      <mdb-col md="10">
        <mdb-row>
          <mdb-col md="3">
            <p class="text-0">设计说明要求</p>
          </mdb-col>
          <mdb-col md="9">
            <mdb-row>
              <mdb-col md="6">
                <div class="form-check pl-0">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="designFlag"
                    id="option9"
                    v-model="requireData.designFlag"
                    value="Y"
                    @change="checkdesignFlag"
                    :disabled="disabled"
                  >
                  <label class="form-check-label" for="option9">是</label>
                </div>
              </mdb-col>
              <mdb-col md="6">
                <div class="form-check pl-0">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="designFlag"
                    id="option10"
                    v-model="requireData.designFlag"
                    value="N"
                    @change="checkdesignFlag"
                    :disabled="disabled"
                  >
                  <label class="form-check-label" for="option10">否</label>
                </div>
              </mdb-col>
              <mdb-col md="12" class="tip-error" v-if="designFlagError">{{designFlagError}}</mdb-col>
            </mdb-row>
            <mdb-row v-if="requireData.designFlag == 'Y'">
              <mdb-col md="12">
                <p class="text-0 mb-2 mt-3">专业要求</p>
                <div id="majorRequirementId" class="mb-3" >
                  <div class="form-check" v-for="item in majorRequirement":key="item.value">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      name="projectType"
                      :id="item.value"
                      :value="item.value"
                      :checked="designRequiredType.indexOf(item.value)!=-1"
                      @change="getMajorValue(item)"
                      :disabled="disabled"
                    >
                    <label class="form-check-label" :for="item.value">{{item.name}}</label>
                  </div>
                </div>
              </mdb-col>
              <mdb-col md="12" v-if="designRequiredType.indexOf('6')!=-1">
                <div class="outline-input">
                  <mdb-input
                    type="text"
                    size="lg"
                    label="请输入内容"
                    :disabled="disabled"
                    v-model="requireData.designRequired"
                    @change="checkdesignRequired"
                    outline
                  />
                </div>
              </mdb-col>
            </mdb-row>
          </mdb-col>
        </mdb-row>
      </mdb-col>
      
    </mdb-row>
    <!-- 其他要求 -->
    <mdb-row class="mb-4">
      <mdb-col md="10">
        <mdb-row>
          <mdb-col md="3">
              <p class="text-0">其他要求</p>
          </mdb-col>
          <mdb-col md="9">
            <mdb-row class="mb-3">
              <mdb-col md="6">
                <div class="form-check pl-0">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="isOtherRequest"
                    id="option7"
                    v-model="requireData.isOtherRequest"
                    value="Y"
                    @change="checkisOtherRequest"
                    :disabled="disabled"
                  >
                  <label class="form-check-label" for="option7">是</label>
                </div>
              </mdb-col>
              <mdb-col md="6">
                <div class="form-check pl-0">
                  <input
                    type="radio"
                    class="form-check-input"
                    name="isOtherRequest"
                    id="option8"
                    v-model="requireData.isOtherRequest"
                    value="N"
                    @change="checkisOtherRequest"
                    :disabled="disabled"
                  >
                  <label class="form-check-label" for="option8">否</label>
                </div>
              </mdb-col>
              <mdb-col md="12" class="tip-error mt-2" v-if="isOtherRequestError">{{isOtherRequestError}}</mdb-col>
            </mdb-row>
            <mdb-row v-if="requireData.isOtherRequest == 'Y'">
              <mdb-col md="12">
                <div class="outline-input">
                  <mdb-input 
                    type="textarea" 
                    label="请输入其他要求" 
                    :rows="3" 
                    v-model="requireData.introduction"
                    @change="checkintroduction"
                    :disabled="disabled"
                    outline 
                  />
                  </div>
                <div class="tip-error mt-2" v-if="introductionError">{{introductionError}}</div>
              </mdb-col>
            </mdb-row>
          </mdb-col>
        </mdb-row>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>
<script>
import { setTimeout, clearTimeout } from "timers";
export default {
  data() {
    return {
      disabled: false,
      type: [],
      isShow: false,
      majorRequirement: [],
      designRequiredType: [],
      requireData: {
        id: null,
        solutionType: null,
        introduction: "",
        planeRequired: "",
        facadeRequired: "",
        profileRequired: "",
        analysisRequired: "",
        designSketchRequired: "",
        isOtherRequest: null,
        videoFlag: null,
        minVideoDuration: "",
        maxVideoDuration: "",
        videoRequire: "",
        demonstrationFlag: null,
        minDemonstrationDuration: "",
        maxDemonstrationDuration: "",
        demonstrationRequire: "",
        designFlag: null,
        designRequired: "",
        designRequiredType: [],
        generalRequired: "", // 总图
        projectId: this.$route.query.id
      },
      solutionTypeError: null,
      generalRequiredError: null,
      planeRequiredError: null,
      facadeRequiredError: null,
      profileRequiredError: null,
      analysisRequiredError: null,
      designSketchRequiredError: null,
      demonstrationFlagError: null,
      videoFlagError: null,
      isOtherRequestError: null,
      designFlagError: null,

      minDDError: null,
      maxDDError: null,
      demonstrationRequireError: null,
      minVDError: null,
      maxVDError: null,
      videoRequireError: null,
      introductionError: null
    };
  },
  methods: {
    checksolutionType() {
      if (!this.requireData.solutionType) {
        this.solutionTypeError = "请选择设计深度要求";
      } else {
        this.solutionTypeError = "";
      }
    },
    checkgeneralRequired() {
      if (!this.requireData.generalRequired) {
        this.generalRequiredError = "请输入总图要求";
      } else if (this.requireData.generalRequired.length>500) {
        this.generalRequiredError = "您输入的长度有误";
      } else {
        this.generalRequiredError = "";
      }
    },
    checkplaneRequired() {
      if (!this.requireData.planeRequired) {
        this.planeRequiredError = "请输入平面图要求";
      } else if ( this.requireData.planeRequired.length>500 ) {
        this.planeRequiredError = "您输入的长度有误";
      } else {
        this.planeRequiredError = "";
      }
    },
    checkfacadeRequired() {
      if (!this.requireData.facadeRequired) {
        this.facadeRequiredError = "请输入立面图要求";
      } else if ( this.requireData.facadeRequired.length>500 ) {
        this.facadeRequiredError = "您输入的长度有误";
      } else {
        this.facadeRequiredError = "";
      }
    },
    checkprofileRequired() {
      if (!this.requireData.profileRequired) {
        this.profileRequiredError = "请输入剖面图要求";
      } else if ( this.requireData.profileRequired.length>500 ) {
        this.profileRequiredError = "您输入的长度有误";
      } else {
        this.profileRequiredError = "";
      }
    },
    checkanalysisRequired() {
      if (!this.requireData.analysisRequired) {
        this.analysisRequiredError = "请输入分析图要求";
      } else if ( this.requireData.analysisRequired.length>500) {
        this.analysisRequiredError = "您输入的长度有误";
      } else {
        this.analysisRequiredError = "";
      }
    },
    checkdesignSketchRequired() {
      if (!this.requireData.designSketchRequired) {
        this.designSketchRequiredError = "请输入效果图要求";
      } else if (this.requireData.designSketchRequired.length>500) {
        this.designSketchRequiredError = "您输入的长度有误";
      } else {
        this.designSketchRequiredError = "";
      }
    },
    checkdemonstrationFlag() {
      if (!this.requireData.demonstrationFlag) {
        this.demonstrationFlagError = "请选择是否有演示文件要求";
      } else {
        this.demonstrationFlagError = "";
      }
    },
    checkvideoFlag() {
      if (!this.requireData.videoFlag) {
        this.videoFlagError = "请选择是否有动画要求";
      } else {
        this.videoFlagError = "";
      }
    },
    checkisOtherRequest() {
      if (!this.requireData.isOtherRequest) {
        this.isOtherRequestError = "请选择是否有其他要求";
      } else {
        this.isOtherRequestError = "";
      }
    },
    checkdesignFlag() {
      if (!this.requireData.designFlag) {
        this.designFlagError = "设计说明要求";
      } else {
        this.designFlagError = "";
      }
    },
    checkedMinDD(value) {
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if(value){
        this.requireData.minDemonstrationDuration = value.replace( /[^0-9\.]/g,'')
      }
      this.maxDDError = null;
      let maxDemonstrationDuration = Number(this.requireData.maxDemonstrationDuration);
      value = Number(value)
      if (!value) {
        this.minDDError = "演示文件要求时长最低值不能为空";
      } else if (!reg.test(value)) {
        this.minDDError = "您输入的格式有误";
      } else if (value>1000){
        this.minDDError = "您输入的长度有误";
      }else if (maxDemonstrationDuration && value > maxDemonstrationDuration) {
        this.minDDError = "演示文件要求时长最低值不能大于最大值";
      } else {
        this.minDDError = null;
      }
    },
    checkedMaxDD(value) {
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if(value){
        this.requireData.maxDemonstrationDuration = value.replace( /[^0-9\.]/g,'')
      }
      this.minDDError = null;
      let minDemonstrationDuration = Number(this.requireData.minDemonstrationDuration);
      value = Number(value)
      if (!value) {
        this.maxDDError = "演示文件要求时长最大值不能为空";
      } else if (!reg.test(value)) {
        this.maxDDError = "您输入的格式有误";
      } else if(value>1000){
        this.maxDDError = "您输入的长度有误";
      } else if (minDemonstrationDuration && value < minDemonstrationDuration) {
        this.maxDDError = "演示文件要求时长最大值不能低于最低值";
      } else {
        this.maxDDError = null;
      }
    },
    checkdemonstrationRequire() {
      // if (!this.requireData.demonstrationRequire) {
      //   this.demonstrationRequireError = "请输入其他要求";
      // } else
       if (this.requireData.demonstrationRequire.length>50) {
        this.demonstrationRequireError = "您输入的长度有误";
      } else {
        this.demonstrationRequireError = "";
      }
    },
    checkedMinVD(value) {
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if(value){
        this.requireData.minVideoDuration = value.replace( /[^0-9\.]/g,'')
      }
      this.maxVDError = null;
      let maxVideoDuration = Number(this.requireData.maxVideoDuration);
      value = Number(value)
      if (!value) {
        this.minVDError = "动画要求时长最低值不能为空";
      } else if (!reg.test(value)) {
        this.minVDError = "您输入的格式有误";
      } else if (parseInt(value)>1000) {
        this.minVDError = "您输入的长度有误";
      } else if (maxVideoDuration && value > maxVideoDuration) {
        this.minVDError = "动画要求时长最低值不能大于最大值";
      } else {
        this.minVDError = null;
      }
    },
    checkedMaxVD(value) {
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if(value){
        this.requireData.maxVideoDuration = value.replace( /[^0-9\.]/g,'')
      }
      this.minVDError = null;
      let minVideoDuration = Number(this.requireData.minVideoDuration);
      value = Number(value)
      if (!value) {
        this.maxVDError = "动画要求时长最大值不能为空";
      } else if (!reg.test(value)) {
        this.maxVDError = "您输入的格式有误";
      } else if(value>1000){
        this.maxVDError = "您输入的长度有误";
      }else if (minVideoDuration && value < minVideoDuration) {
        this.maxVDError = "动画要求时长最大值不能低于最低值";
      } else {
        this.maxVDError = null;
      }
    },
    checkvideoRequire() {
      // if (!this.requireData.videoRequire) {
      //   this.videoRequireError = "请输入其他要求";
      // } else
       if (this.requireData.videoRequire.length>50) {
        this.videoRequireError = "您输入的长度有误";
      } else {
        this.videoRequireError = "";
      }
    },
    checkintroduction() {
      if (!this.requireData.introduction) {
        this.introductionError = "请输入其他要求";
      }else if(this.requireData.introduction.length>500){
        this.introductionError = "您输入的长度有误";
      } else {
        this.introductionError = "";
      }
    },
    getMajorValue(item) {
      let hasChecked = false;
      for (let i = 0; i < this.designRequiredType.length; i++) {
        let val = this.designRequiredType[i];
        if (val === item.value) {
          hasChecked = true;
          this.designRequiredType.splice(i, 1);
        }
      }
      if (!hasChecked) {
        this.designRequiredType.push(item.value);
      }
      if (item.value == 6) {
        this.isShow = !this.isShow;
      }
      if (this.designRequiredType.length <= 0) {
        this.designFlagError = "请选择专业要求";
      } else {
        this.designFlagError = "";
      }
    },
    checkdesignRequired() {
      if (!this.requireData.designRequired) {
        this.designFlagError = "请输入其他专业要求";
      } else if ( this.requireData.designRequired.length>50) {
        this.designFlagError = "您输入的长度有误";
      } else {
        this.designFlagError = "";
      }
    },
    emptyError(){
      this.solutionTypeError= null;
      this.generalRequiredError= null;
      this.planeRequiredError= null;
      this.facadeRequiredError= null;
      this.profileRequiredError= null;
      this.analysisRequiredError= null;
      this.designSketchRequiredError= null;
      this.demonstrationFlagError= null;
      this.videoFlagError=null;
      this.isOtherRequestError= null;
      this.designFlagError= null;
      this.introductionError=null;
      this.designFlagError=null;
    },
    checkLen(){
      let isCheckPass = true
      this.emptyError();
      if (this.requireData.generalRequired.length>50) {
        this.generalRequiredError = "您输入的长度有误";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(this.requireData.planeRequired.length>50){
        this.planeRequiredError = "您输入的长度有误";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(this.requireData.facadeRequired.length>50){
        this.facadeRequiredError = "您输入的长度有误";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(this.requireData.profileRequired.length>50){
        this.profileRequiredError = "您输入的长度有误";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(this.requireData.analysisRequired.length>50){
        this.analysisRequiredError = "您输入的长度有误";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(this.requireData.designSketchRequired.length>50){
        this.designSketchRequiredError = "您输入的长度有误";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (this.requireData.demonstrationFlag == "Y") {
        if (this.requireData.maxDemonstrationDuration &&this.maxDDError) {
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }else{
          this.maxDDError = null;
        }
        if (this.requireData.minDemonstrationDuration&&this.minDDError) {
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }else{
          this.minDDError = null;
        }
        if (this.demonstrationRequireError) {
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
      }

      if (this.requireData.videoFlag == "Y") {
          if (this.requireData.minVideoDuration && this.minVDError) {
            document.documentElement.scrollTop = 200;
            isCheckPass = false;
          }else{
            this.minVDError = null;
          }
          if (this.requireData.maxVideoDuration&&this.maxVDError) {
            document.documentElement.scrollTop = 200;
            isCheckPass = false;
          }else{
            this.maxVDError = null;
          }
          if (this.videoRequireError) {
            document.documentElement.scrollTop = 200;
            isCheckPass = false;
          }
        }
        if (this.requireData.isOtherRequest == "Y") {
          if (this.requireData.introduction.length>500) {
            this.introductionError = "您输入的长度有误";
            document.documentElement.scrollTop = 200;
            isCheckPass = false;
          }
        }
        if (this.requireData.designFlag == "Y") {
          if (this.requireData.designRequired&&this.requireData.designRequired.length>50) {
            this.designFlagError = "您输入的长度有误";
            document.documentElement.scrollTop = 200;
            isCheckPass = false;
          }else{
            this.designFlagError = null;
          }
        }
      return isCheckPass
    },
    temporarilySave() {
      let isCheckPass = this.checkLen();
      if(isCheckPass){
        this.requireData.type = 1;
        this.requireData.projectId = this.$route.query.id;
        if (this.requireData.isOtherRequest == "N") {
          this.requireData.introduction = null;
        }
        this.requireData.designRequiredType = this.designRequiredType.join(",");
        this.api.saveOrUpdate(this.requireData).then(res => {
          if (res.code == 0) {
            this.$message("已保存,若需填写下一页,请提交!");
            this.requireData.id = res.data;
          } else {
            this.$message(res.msg);
          }
        });
      }
      return isCheckPass
    },
    checkForm() {
      let isCheckPass = true;
      if (!this.requireData.solutionType || this.solutionTypeError) {
        this.solutionTypeError = "请选择设计深度要求";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (!this.requireData.generalRequired || this.generalRequiredError) {
        this.generalRequiredError = "请输入总图要求";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (!this.requireData.planeRequired || this.planeRequiredError) {
        this.planeRequiredError = "请输入平面要求";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (!this.requireData.facadeRequired || this.facadeRequiredError) {
        this.facadeRequiredError = "请输入立面要求";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (!this.requireData.profileRequired || this.profileRequiredError) {
        this.profileRequiredError = "请输入剖面要求";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (!this.requireData.analysisRequired || this.analysisRequiredError) {
        this.analysisRequiredError = "请输入分析图要求";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (!this.requireData.designSketchRequired || this.designSketchRequiredError ) {
        this.designSketchRequiredError = "请输入效果图要求";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (!this.requireData.demonstrationFlag || this.demonstrationFlagError) {
        this.demonstrationFlagError = "请选择是否有演示文件要求";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      } else {
        if (this.requireData.demonstrationFlag == "Y") {
          if (!this.requireData.maxDemonstrationDuration || this.maxDDError) {
            this.maxDDError = "请输入时长要求(分钟)最大值";
            document.documentElement.scrollTop = 200;
            isCheckPass = false;
          }
          if (!this.requireData.minDemonstrationDuration || this.minDDError) {
            this.minDDError = "请输入时长要求(分钟)最小值";
            document.documentElement.scrollTop = 200;
            isCheckPass = false;
          }
          if (this.demonstrationRequireError) {
            document.documentElement.scrollTop = 200;
            isCheckPass = false;
          }
        }
      }
      if (!this.requireData.videoFlag || this.videoFlagError) {
        this.videoFlagError = "请选择是否有动画要求";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      } else {
        //动画要求
        if (this.requireData.videoFlag == "Y") {
          if (!this.requireData.minVideoDuration || this.minVDError) {
            this.minVDError = "请输入时长要求(分钟)最小值";
            document.documentElement.scrollTop = 200;
            isCheckPass = false;
          }
          if (!this.requireData.maxVideoDuration || this.maxVDError) {
            this.maxVDError = "请输入时长要求(分钟)最大值";
            document.documentElement.scrollTop = 200;
            isCheckPass = false;
          }
          if ( this.videoRequireError) {
            document.documentElement.scrollTop = 200;
            isCheckPass = false;
          }
        }
      }
      if (!this.requireData.isOtherRequest || this.isOtherRequestError) {
        this.isOtherRequestError = "请选择是否有其他要求";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      } else {
        //其他要求
        if (this.requireData.isOtherRequest == "Y") {
          if (!this.requireData.introduction||this.introductionError) {
            this.introductionError = "请输入其他要求";
            document.documentElement.scrollTop = 200;
            isCheckPass = false;
          }
        }
      }
      //设计说明要求
      if (!this.requireData.designFlag || this.designFlagError) {
        this.designFlagError = "设计说明要求";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      } else {
        if (this.requireData.designFlag == "Y") {
          if (this.designRequiredType.length <= 0) {
            this.designFlagError = "请选择专业要求";
            document.documentElement.scrollTop = 200;
            isCheckPass = false;
          } else {
            if (
              this.designRequiredType.indexOf("6") != -1 &&
              !this.requireData.designRequired
            ) {
              this.designFlagError = "请输入其他专业要求";
              document.documentElement.scrollTop = 200;
              isCheckPass = false;
            }
          }
        }
      }
      return isCheckPass;
    },
    submit() {
      let isCheckPass = this.checkForm();
      if (isCheckPass) {
        this.requireData.type = 1;
        this.requireData.projectId = this.$route.query.id;
        if (this.requireData.isOtherRequest == "N") {
          this.requireData.introduction = null;
        }
        this.requireData.designRequiredType = this.designRequiredType.join(",");
        this.api.requiredResultSubmit(this.requireData).then(res => {
          if (res.code == 0) {
            this.$message("操作成功");
            this.requireData.id = res.data;
          } else {
            this.$message(res.msg);
          }
        });
      }
      return isCheckPass;
    },
    getMajorRequirement() {
      this.api.majorRequirement({}).then(res => {
        this.majorRequirement = res.data;
      });
    },
    handleCheckedChange(value) {
      if (value == 6) {
        this.isShow = !this.isShow;
      }
    }
  },
  mounted() {
    this.getMajorRequirement();
  },
  created() {
    this.api.required(this.$route.query.id).then(res => {
      if(res.code==0){
        if (res.data.requiredResultDO != null) {
          this.requireData.id = res.data.requiredResultDO.id;
          this.requireData.solutionType = res.data.requiredResultDO.solutionType;
          this.requireData.introduction = res.data.requiredResultDO.introduction;

          if (this.requireData.introduction.length == 0) {
            this.requireData.isOtherRequest = "N";
          } else {
            this.requireData.isOtherRequest = "Y";
          }

          this.requireData.generalRequired =
            res.data.requiredResultDO.generalRequired;
          this.requireData.planeRequired =
            res.data.requiredResultDO.planeRequired;
          this.requireData.facadeRequired =
            res.data.requiredResultDO.facadeRequired;
          this.requireData.profileRequired =
            res.data.requiredResultDO.profileRequired;
          this.requireData.analysisRequired =
            res.data.requiredResultDO.analysisRequired;
          this.requireData.designSketchRequired =
            res.data.requiredResultDO.designSketchRequired;
          this.requireData.videoFlag = res.data.requiredResultDO.videoFlag;
          this.requireData.maxDemonstrationDuration = 
          res.data.requiredResultDO.maxDemonstrationDuration?res.data.requiredResultDO.maxDemonstrationDuration:"";
          this.requireData.minDemonstrationDuration = 
          res.data.requiredResultDO.minDemonstrationDuration?res.data.requiredResultDO.minDemonstrationDuration:"";
          this.requireData.minVideoDuration =
            res.data.requiredResultDO.minVideoDuration;
          this.requireData.maxVideoDuration =
            res.data.requiredResultDO.maxVideoDuration;
          this.requireData.videoRequire = res.data.requiredResultDO.videoRequire;
          this.requireData.demonstrationFlag =
            res.data.requiredResultDO.demonstrationFlag;
          this.requireData.minDemonstrationDuration =
            res.data.requiredResultDO.minDemonstrationDuration;
          this.requireData.maxDemonstrationDuration =
            res.data.requiredResultDO.maxDemonstrationDuration;
          this.requireData.demonstrationRequire =
            res.data.requiredResultDO.demonstrationRequire;
          this.requireData.designFlag = res.data.requiredResultDO.designFlag;
          this.requireData.designRequired =
            res.data.requiredResultDO.designRequired;
          this.requireData.designRequiredType = res.data.requiredResultDO
            .designRequiredType
            ? res.data.requiredResultDO.designRequiredType.split(",")
            : [];
          // if (res.data.requiredResultDO.nonEditable == 1) {
          //   this.disabled = true;
          // }
          if (res.data.requiredResultDO.nonEditable == 0) {
            this.disabled = true;
          }
          this.designRequiredType = this.requireData.designRequiredType;
          for (var i in this.designRequiredType) {
            if (this.designRequiredType[i] == 6) {
              this.isShow = true;
            }
          }
        }
        if(res.data.projectDO&&res.data.projectDO.auditState==5||
          (res.data.requiredResultDO&&res.data.requiredResultDO.auditState&&res.data.requiredResultDO.auditState!=3)
        ){
          this.disabled=true
        }
      }
    });
  }
};
</script>
<style lang="less" scoped>
.mingzhu-depth {
  .text-0{
    color: #333333;
  }
  .tip-error {
    color: red;
  }
  #majorRequirementId{
    display: flex;
    .form-check{
      margin-right: 1.5rem;
    }
  }
}
</style>



