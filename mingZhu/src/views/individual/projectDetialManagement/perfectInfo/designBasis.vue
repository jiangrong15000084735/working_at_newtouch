<template>
  <mdb-container class="design-basis-warp px-0 mb-5">
    <!-- 用地地形图（CAD文件） -->
    <mdb-row class="mb-2">
      <mdb-col>
        <h3 class="detail-title" style="font-weight:600;">用地地形图（CAD文件）</h3>
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
            v-model="dependForm.landLimitInfo"
            value="1"
            :disabled="disabled"
            @change="changeLandLimitInfo"
          >
          <label class="form-check-label" for="defaultUnchecked" >有CAD文件</label>
        </div>
      </mdb-col>
      <mdb-col md="6">
        <div class="form-check pl-0">
          <input 
            type="radio" 
            class="form-check-input" 
            name="radio1"
            id="defaultUnchecked2"
            v-model="dependForm.landLimitInfo"
            value="2"
            @change="changeLandLimitInfo"
            :disabled="disabled"
          >
          <label class="form-check-label" for="defaultUnchecked2">无CAD文件</label>
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row v-if="dependForm.landLimitInfo == '1'" class="mb-2">
      <mdb-col>
        <UpLoad 
          :list="landLimitfileList" 
          :isShow="!disabled" 
          :saveProjectMoney="landLimitInfoUpload"
          :accept="'.dwg, .dxf, .Zip, .Rar'"
          :btnName="'上传文件'"
        ></UpLoad>
      </mdb-col>
    </mdb-row>
    <mdb-row v-if="landLimitInfoFlagError">
      <mdb-col>
        <div class="tip-error">{{landLimitInfoFlagError}}</div>
      </mdb-col>
    </mdb-row>
    <!-- 与地形图对应的用地红线图（CAD文件） -->
    <mdb-row class="mb-2">
      <mdb-col>
        <h3 class="detail-title" style="font-weight:600;">与地形图对应的用地红线图（CAD文件）</h3>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-2">
      <mdb-col md="6">
        <div class="form-check pl-0">
          <input 
            type="radio" 
            class="form-check-input" 
            name="radio2"
            id="defaultUnchecked3"
            v-model="dependForm.redLine"
            value="1"
            @change="changeFullRedLineFlag"
            :disabled="disabled"
          >
          <label class="form-check-label" for="defaultUnchecked3">有CAD文件</label>
        </div>
      </mdb-col>
      <mdb-col md="6">
        <div class="form-check pl-0">
          <input 
            type="radio" 
            class="form-check-input" 
            name="radio2"
            id="defaultUnchecked4"
            v-model="dependForm.redLine"
            value="2"
            @change="changeFullRedLineFlag"
            :disabled="disabled"
          >
          <label class="form-check-label" for="defaultUnchecked4">无CAD文件</label>
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row v-if="dependForm.redLine==1" class="mb-2">
      <mdb-col>
        <UpLoad 
          :list="redLineCADFList" 
          :isShow="!disabled" 
          :saveProjectMoney="RedLineCADUpload"
          :accept="'.dwg, .dxf, .zip, .rar'"
          :btnName="'上传文件'"
        ></UpLoad>
      </mdb-col>
    </mdb-row>
    <mdb-row v-if="redLineCADFlagError">
      <mdb-col>
          <div class="tip-error">{{redLineCADFlagError}}</div>
      </mdb-col>
    </mdb-row>
    <!-- 规划控制指标 -->
    <mdb-row class="mb-2">
      <mdb-col>
        <h3 class="detail-title" style="font-weight:600;">规划控制指标</h3>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-2">
      <mdb-col md="6">
        <div class="form-check pl-0">
          <input 
            type="radio" 
            class="form-check-input" 
              name="radio3"
            id="defaultUnchecked5"
            v-model="dependForm.currentLandPic"
            value="1"
            @change="changeLimitFileFlag"
            :disabled="disabled"
          >
          <label class="form-check-label" for="defaultUnchecked5">有相关文件</label>
        </div>
      </mdb-col>
      <mdb-col md="6">
        <div class="form-check pl-0">
          <input 
            type="radio" 
            class="form-check-input" 
            name="radio3"
            id="defaultUnchecked6"
            v-model="dependForm.currentLandPic"
            value="2"
            @change="changeLimitFileFlag"
            :disabled="disabled"
            autocomplete="off"
          >
          <label class="form-check-label" for="defaultUnchecked6">无文件，自行填写</label>
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row v-if="dependForm.currentLandPic==1"  style="mb-2">
      <mdb-col>
        <UpLoad 
          :list="limitFileList" 
          :isShow="!disabled" 
          :saveProjectMoney="LimitFileUploade"
          :btnName="'上传文件'"
        ></UpLoad>
      </mdb-col>
    </mdb-row>
    <mdb-row v-if="LimitFileFlagError">
      <mdb-col>
        <div class="tip-error">{{LimitFileFlagError}}</div>
      </mdb-col>
    </mdb-row>
    <!-- 无规划控制指标 -->
    <mdb-container v-if="dependForm.currentLandPic=='2'" class="px-0">
      <mdb-row class="mt-3 mb-4">
        <mdb-col md="6">
          <div class="multiselect">
            <label class="multiselect-text">规划用地性质</label>
            <lxx-multiselect
              labelMode
              :max-height="24"
              placeholder="请选择"
              label-name="name"
              value-name="id"
              :options="govLimitList"
              v-model="areaType"
              :disabled="disabled"
            ></lxx-multiselect>
          </div>
          <div class="tip-error mt-2" v-if="areaTypeError">{{areaTypeError}}</div>
        </mdb-col>
        <mdb-col md="6">
          <div class="outline-input">
            <mdb-input 
              type="text"
              size="lg" 
              label="建设用地面积（平方米）"  
              :disabled="disabled"
              v-model="dependForm.buildArea"
              @change="checkBuildArea"
              outline />
          </div>
          <div class="tip-error mt-2" v-if="buildAreaError">{{buildAreaError}}</div>
        </mdb-col>
      </mdb-row>
      <mdb-row class="mb-4">
        <mdb-col md="6">
          <div class="outline-input">
            <mdb-input 
              type="text"
              size="lg" 
              label="综合容积率不小于（%）"  
              :disabled="disabled"
              v-model="dependForm.plotRatioCondFirst"
              @change="checkMinVolume"
              outline />
          </div>
          <div class="tip-error mt-2" v-if="minVolumeErrorTip">{{minVolumeErrorTip}}</div>
        </mdb-col>
        <mdb-col md="6">
          <div class="outline-input">
            <mdb-input 
              type="text"
              size="lg" 
              label="综合容积率不大于（%）"  
              :disabled="disabled"
              v-model="dependForm.plotRatioCondSec"
              @change="checkMaxVolume"
              outline />
          </div>
          <div class="tip-error mt-2" v-if="maxVolumeErrorTip">{{maxVolumeErrorTip}}</div>
        </mdb-col>
      </mdb-row>
      <mdb-row class="mb-4">
        <mdb-col md="6">
          <div class="outline-input">
            <mdb-input 
              type="text"
              size="lg" 
              label="建筑限高（米）"  
              :disabled="disabled"
              v-model="dependForm.buildingHeight"
              @change="checkBuildingHeight"
              outline />
          </div>
          <div class="tip-error mt-2" v-if="buildingHeightError">{{buildingHeightError}}</div>
        </mdb-col>
        <mdb-col md="6">
          <div class="outline-input">
            <mdb-input 
              type="text"
              size="lg" 
              label="建筑密度（%）"  
              :disabled="disabled"
              v-model="dependForm.buildingDensity"
              @change="checkBuildingDensity"
              outline />
          </div>
          <div class="tip-error mt-2" v-if="buildingDensityError">{{buildingDensityError}}</div>
        </mdb-col>
      </mdb-row>
      <mdb-row class="mb-4">
        <mdb-col md="6">
          <div class="outline-input">
            <mdb-input 
              type="text"
              size="lg" 
              label="（非）机动车停车数量要求"  
              :disabled="disabled"
              v-model="dependForm.parkingRequired"
              @change="chekcParkingRequired"
              outline />
          </div>
          <div class="tip-error mt-2" v-if="parkingRequiredError">{{parkingRequiredError}}</div>
        </mdb-col>
        <mdb-col md="6">
          <div class="outline-input">
            <mdb-input 
              type="text"
              size="lg" 
              label="建筑面宽、建筑间距及日照控制"  
              :disabled="disabled"
              v-model="dependForm.buildingRequired"
              @change="checkBuildingRequired"
              outline />
          </div>
          <div class="tip-error mt-2" v-if="buildingRequiredError">{{buildingRequiredError}}</div>
        </mdb-col>
      </mdb-row>
      <mdb-row class="mb-4">
        <mdb-col md="6">
          <div class="outline-input">
            <mdb-input 
              type="text"
              size="lg" 
              label="建筑退让道路红线、地界控制"  
              :disabled="disabled"
              v-model="dependForm.limitRequired"
              @change="checkLimitRequired"
              outline />
          </div>
          <div class="tip-error mt-2" v-if="limitRequiredError">{{limitRequiredError}}</div>
        </mdb-col>
        <mdb-col md="6">
          <div class="outline-input">
            <mdb-input 
              type="text"
              size="lg" 
              label="建筑层高要求"  
              :disabled="disabled"
              v-model="dependForm.storeyHeight"
              @change="checkStoreyHeight"
              outline />
          </div>
          <div class="tip-error mt-2" v-if="storeyHeightError">{{storeyHeightError}}</div>
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </mdb-container>
</template>
<script>
import UpLoad from "@/components/upLoad"
export default {
  name: "designBasis",
  components:{UpLoad},
  data() {
    return {
      landLimitfileList:[],
      redLineCADFList:[],
      limitFileList:[],

      disabled: false,
      isPay: false,
      origin: null,
      active3: 2,
      valuename: "请选择，多选 ",
      govLimitList: [],
      limitFileFlag: null,
      redLineCADFlag: null,
      fullRedLineFlag: null,
      landLimitInfoFlag: null,

      maxVolumeErrorTip: "",
      minVolumeErrorTip: "",
      landLimitInfoFlagError: "",
      redLineCADFlagError: "",
      LimitFileFlagError: "",
      areaTypeError: "",
      buildAreaError: "",
      buildingHeightError: "",
      buildingDensityError: "",
      parkingRequiredError: "",
      buildingRequiredError: "",
      limitRequiredError: "",
      storeyHeightError: null,

      dependForm: {
        id: null,
        plotRatioCondFType: "不大于",
        plotRatioCondSType: "不小于",
        taskId: null,
        redLine: null,
        areaType: [],
        buildArea: "",
        buildingHeight: "",
        buildingDensity: "",
        limitRequired: "",
        parkingRequired: "",
        plotRatioCondFirst:"",
        plotRatioCondSec:"",
        storeyHeight: "",
        LandLimitInfo: null,
        RedLineCAD: null,
        FullRedLine: null,
        LimitFile: null,
        LandLimitInfoName: null,
        RedLineCADName: null,
        FullRedLineName: null,
        LimitFileName: null,
        landLimitInfoFlag: false,
        redLineCADFlag: false,
        fullRedLineFlag: false,
        limitFileFlag: false,

        landLimitInfo:null,
        redLine:null,
        currentLandPic:null,
      },
      areaType: [],
      limitPlaceholder: "",
      step: null
    };
  },
  watch: {
    areaType(v) {
      if (v) {
        this.areaTypeError = "";
      } else {
        this.areaTypeError = "请选择规划用地性质";
      }
      this.areaType = v;
      this.dependForm.areaType = [];
      for (let i = 0; i < this.govLimitList.length; i++) {
        if (this.areaType.indexOf(this.govLimitList[i].name) != -1) {
          this.dependForm.areaType.push(this.govLimitList[i].value);
        }
      }
    },
    $route() {
      this.step = this.$route.query.step;
    }
  },
  methods: {
    errorTipInit() {
      this.areaTypeError = "";
      this.buildAreaError = "";
      this.buildingHeightError = "";
      this.buildingDensityError = "";
      this.parkingRequiredError = "";
      this.buildingRequiredError = "";
      this.limitRequiredError = "";
      this.storeyHeightError = "";
      this.maxVolumeErrorTip = "";
      this.minVolumeErrorTip = "";
    },
    checkBuildArea(value) {
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if(value){
        this.dependForm.buildArea = value.replace( /[^0-9\.]/g,'')
      }
      if (!this.dependForm.buildArea) {
        this.buildAreaError = "请输入建设用地面积";
      } else if (!reg.test(this.dependForm.buildArea)) {
        this.buildAreaError = "您输入的格式有误";
      } else if(this.dependForm.buildArea<=0){
        this.buildAreaError = "建设用地面积必须大于0";
      } else if(this.dependForm.buildArea.split(".")[0].length>10){
        this.buildAreaError = "您输入的长度有误";
      } else {
        this.buildAreaError = "";
      }
    },
    checkMinVolume(value) {
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if(value){
        this.dependForm.plotRatioCondFirst = value.replace( /[^0-9\.]/g,'')
      }
      let plotRatioCondSec = this.dependForm.plotRatioCondSec; //容积率不小于
      if (!this.dependForm.plotRatioCondFirst) {
        this.minVolumeErrorTip = "请输入最小容积率";
      } else if (!reg.test(this.dependForm.plotRatioCondFirst)) {
        this.minVolumeErrorTip = "您输入的格式有误";
      }else if(this.dependForm.plotRatioCondFirst<=0){
        this.minVolumeErrorTip = "最小容积率必须大于0";
      }else if(this.dependForm.plotRatioCondFirst>100){
        this.minVolumeErrorTip = "最小容积率必须小于100";
      }else if(plotRatioCondSec&&this.dependForm.plotRatioCondFirst>plotRatioCondSec){
        this.minVolumeErrorTip = "容积率最小值不能大于最大值";
        this.maxVolumeErrorTip = "";
      } else {
        this.minVolumeErrorTip = "";
        this.maxVolumeErrorTip = "";
      }
    },
    checkMaxVolume(value) {
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if(value){
        this.dependForm.plotRatioCondSec = value.replace( /[^0-9\.]/g,'')
      }
      let plotRatioCondFirst = this.dependForm.plotRatioCondFirst; //容积率不大于
      if (!this.dependForm.plotRatioCondSec) {
        this.maxVolumeErrorTip = "请输入最大容积率";
      } else if (!reg.test(this.dependForm.plotRatioCondSec)) {
        this.maxVolumeErrorTip = "您输入的格式有误";
      }else if(this.dependForm.plotRatioCondSec<=0){
        this.maxVolumeErrorTip = "最大容积率必须大于0";
      }else if(plotRatioCondFirst&&this.dependForm.plotRatioCondSec<plotRatioCondFirst){
        this.maxVolumeErrorTip = "容积率最大值必须大于最小值";
        this.minVolumeErrorTip = "";
      }else if(this.dependForm.plotRatioCondSec>100){
        this.maxVolumeErrorTip = "最大容积率必须小于100";
      } else {
        this.maxVolumeErrorTip = "";
        this.minVolumeErrorTip = "";
      }
    },
    checkBuildingHeight(value) {
      let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if(value){
        this.dependForm.buildingHeight = value.replace( /[^0-9\.]/g,'')
      }
      if (!this.dependForm.buildingHeight) {
        this.buildingHeightError = "请输入建筑限高";
      } else if (!reg.test(this.dependForm.buildingHeight)) {
        this.buildingHeightError = "您输入的格式有误";
      } else if(this.dependForm.buildingHeight<=0){
        this.buildingHeightError = "建筑限高必须大于0";
      } else if(this.dependForm.buildingHeight.split(".")[0].length>10){
        this.buildingHeightError = "您输入的长度有误";
      } else {
        this.buildingHeightError = "";
      }
    },
    checkBuildingDensity(value) {
      let reg =  /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if(value){
        this.dependForm.buildingDensity = value.replace( /[^0-9\.]/g,'')
      }
      if (!this.dependForm.buildingDensity) {
        this.buildingDensityError = "请输入建筑密度";
      } else if (!reg.test(this.dependForm.buildingDensity)) {
        this.buildingDensityError = "请输入建筑密度的正确格式";
      } else if(this.dependForm.buildingDensity<=0){
        this.buildingDensityError = "建筑密度必须大于0";
      } else if(this.dependForm.buildingDensity>100){
        this.buildingDensityError = "您输入的长度有误";
      } else {
        this.buildingDensityError = "";
      }
    },
    chekcParkingRequired() {
      if (!this.dependForm.parkingRequired) {
        this.parkingRequiredError = "请输入（非）机动车停车数量";
      } else if (this.dependForm.parkingRequired.length>50) {
        this.parkingRequiredError = "您输入的长度有误";
      } else {
        this.parkingRequiredError = "";
      }
    },
    checkBuildingRequired() {
      if (!this.dependForm.buildingRequired) {
        this.buildingRequiredError = "请输入建筑面宽、建筑间距及日照控制";
      } else if (this.dependForm.buildingRequired.length>50) {
        this.buildingRequiredError = "您输入的长度有误";
      } else {
        this.buildingRequiredError = "";
      }
    },
    checkLimitRequired() {
      if (!this.dependForm.limitRequired) {
        this.limitRequiredError = "请输入建筑退让道路红线、地界控制";
      } else if (this.dependForm.limitRequired.length>50) {
        this.limitRequiredError = "您输入的长度有误";
      } else {
        this.limitRequiredError = "";
      }
    },
    checkStoreyHeight() {
      if (!this.dependForm.storeyHeight) {
        this.storeyHeightError = "请输入建筑层高要求";
      } else if (this.dependForm.storeyHeight.length>50) {
        this.storeyHeightError = "您输入的长度有误";
      } else {
        this.storeyHeightError = "";
      }
    },
    butLink() {
      this.isPay = !this.isPay;
    },
    //用地地形图上传
    landLimitInfoUpload(file, fileList) {
      this.dependForm.LandLimitInfo = file.msg;
      this.dependForm.LandLimitInfoName = fileList.name;
      
      this.landLimitfileList = [{
        name:fileList.name,
        url:file.msg
      }]

      this.landLimitInfoFlagError = null;
      this.dependForm.landLimitInfoFlag = true;
    },
    //选择是否有用地地形图
    changeLandLimitInfo() {
      this.landLimitInfoFlagError = null;
      // console.log("选择是否有用地地形图",this.dependForm.landLimitInfo)
      if(this.dependForm.landLimitInfo==1){
        this.dependForm.landLimitInfoFlag = true;
      }else{
        this.dependForm.landLimitInfoFlag = false;
      }
    },
    //与地形图对应的用地红线图上传
    RedLineCADUpload(file, fileList) {
      this.dependForm.RedLineCAD = file.msg;
      this.dependForm.RedLineCADName = fileList.name;

      this.redLineCADFList = [{
        name:fileList.name,
        url:file.msg
      }]

      this.redLineCADFlagError = null;
      this.dependForm.redLineCADFlag = true;
    },
    //选择是否有与地形图对应的用地红线图
    changeFullRedLineFlag() {
      this.redLineCADFlagError = null;
      // console.log("选择是否有与地形图对应的用地红线图",this.dependForm.redLine)
      if(this.dependForm.redLine==1){
        this.dependForm.redLineCADFlag = true;
      }else{
        this.dependForm.redLineCADFlag = false;
      }
    },
    //规划控制指标
    LimitFileUploade(file, fileList) {
      this.dependForm.LimitFile = file.msg;
      this.dependForm.LimitFileName = fileList.name;
      this.limitFileList = [{
        name:fileList.name,
        url:file.msg
      }]
      this.LimitFileFlagError = null;
      this.dependForm.limitFileFlag = true;
    },
    //无规划控制指标
    changeLimitFileFlag() {
      this.errorTipInit();
      this.LimitFileFlagError = null;
      // console.log("无规划控制指标",this.dependForm.currentLandPic)
      if(this.dependForm.currentLandPic==1){
        this.dependForm.limitFileFlag = true;
      }else{
        this.dependForm.limitFileFlag = false;
      }
    },
    //表单验证
    checkForm() {
      let isCheckPass = true;
      //用地地形图（CAD文件）
      if (!this.dependForm.landLimitInfo) {
        this.landLimitInfoFlagError = "请选择是否有用地地形图（CAD文件）";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (this.dependForm.landLimitInfo == 1 && !this.dependForm.LandLimitInfo) {
        this.landLimitInfoFlagError =
          "如果有用地地形图（CAD文件）,请上传后提交。";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (this.dependForm.landLimitInfo == 2) {
      }
      //地形图对应的用地红线图（CAD文件）
      if (!this.dependForm.redLine) {
        this.redLineCADFlagError =
          "请选择是否有地形图对应的用地红线图（CAD文件）";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (this.dependForm.redLine == 1 && !this.dependForm.RedLineCAD) {
        this.redLineCADFlagError =
          "如果有与地形图对应的用地红线图（CAD文件），请上传后提交。";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (this.dependForm.redLine == 2) {
      }
      //规划控制指标有关文件
      if (!this.dependForm.currentLandPic) {
        this.LimitFileFlagError = "请选择是否有与规划控制指标有关文件";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (this.dependForm.currentLandPic == 1 && !this.dependForm.LimitFile) {
        this.LimitFileFlagError =
          "如果有与规划控制指标有关文件，请上传后提交。";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (this.dependForm.currentLandPic == 2) {
        if (this.dependForm.areaType.length <= 0) {
          this.areaTypeError = "请选择规划用地性质";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (!this.dependForm.buildArea || this.buildAreaError) {
          this.buildAreaError = "请输入建设用地面";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (!this.dependForm.plotRatioCondFirst ||this.minVolumeErrorTip) {
          this.minVolumeErrorTip = "请输入综合容积率";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (!this.dependForm.plotRatioCondSec || this.maxVolumeErrorTip) {
          this.maxVolumeErrorTip = "请输入综合容积率";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (!this.dependForm.buildingHeight || this.buildingHeightError) {
          this.buildingHeightError = "请输入建筑高度";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (!this.dependForm.buildingDensity || this.buildingDensityError) {
          this.buildingDensityError = "请输入建筑密度(%)";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (!this.dependForm.parkingRequired || this.parkingRequiredError) {
          this.parkingRequiredError = "请输入（非）机动车停车数量要求";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (!this.dependForm.buildingRequired || this.buildingRequiredError) {
          this.buildingRequiredError = "请输入建筑面宽、建筑间距及日照控制";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (!this.dependForm.limitRequired || this.limitRequiredError) {
          this.limitRequiredError = "请输入建筑退让道路红线、地界控制";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (!this.dependForm.storeyHeight || this.storeyHeightError) {
          this.storeyHeightError = "请输入建筑层高要求";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
      }
      return isCheckPass;
    },
    checkLen(){
      let isCheckPass = true;
       if (this.dependForm.currentLandPic == 2) {
         if(this.dependForm.buildArea&&this.buildAreaError){
           document.documentElement.scrollTop = 200;
           isCheckPass = false;
         }else{
           this.buildAreaError = null;
         }
        
        if(this.dependForm.plotRatioCondFirst&&this.minVolumeErrorTip){
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }else{
          this.minVolumeErrorTip = null
        }
        
        if(this.dependForm.plotRatioCondSec&&this.maxVolumeErrorTip){
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }else{
          this.maxVolumeErrorTip = null
        }

        if(this.dependForm.buildingHeight&&this.buildingHeightError){
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }else{
          this.buildingHeightError = null
        }

        if(this.dependForm.buildingDensity&&this.buildingDensityError){
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }else{
          this.buildingDensityError = null
        }
        
        if(this.dependForm.parkingRequired&&this.parkingRequiredError){
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }else{
            this.parkingRequiredError = null
        }
        
        if(this.dependForm.buildingRequired&&this.buildingRequiredError){
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }else{
            this.buildingRequiredError = null
        }
        
        if(this.dependForm.limitRequired&&this.limitRequiredError){
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }else{
            this.limitRequiredError = null
        }
        
        if(this.dependForm.storeyHeight&&this.storeyHeightError){
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }else{
          this.storeyHeightError = null
        }
      }
      return isCheckPass
    },
    //暂存
    temporarilySave() {
      let isCheckPass = this.checkLen()
      if(isCheckPass){
        this.dependForm.projectId = this.$route.query.id;
        this.dependForm.type = 1;
        let dependFormCopy = JSON.parse(JSON.stringify(this.dependForm));
        dependFormCopy.areaType = this.dependForm.areaType.toString();
        this.api.updateTaskDepend(dependFormCopy).then(res => {
          if (res.code == 0) {
            this.dependForm.id = res.data;
            this.$message("已保存,若需填写下一页,请点击设计需求1!");
          } else {
            this.$message(res.msg);
          }
        });
      }
      return isCheckPass
    },
    //提交
    submit() {
      let isCheckPass = this.checkForm();
      if (isCheckPass) {
        this.dependForm.projectId = this.$route.query.id;
        this.dependForm.type = 1;
        let dependFormCopy = JSON.parse(JSON.stringify(this.dependForm));
        dependFormCopy.areaType = this.dependForm.areaType.toString();
        this.api.submitTaskDepend(dependFormCopy).then(res => {
          if (res.code == 0) {
            this.$message("操作成功");
            this.dependForm.id = res.data;
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
    // 数字字典接口buildingType
    this.api.buildingType("PLANNING_LAND").then(res => {
      if (res.data && res.data.length > 0) {
        let landUse = "";
        let landUseArr = res.data;
        for (let i = 0; i < landUseArr.length; i++) {
          landUse = {
            name: landUseArr[i].name,
            value: landUseArr[i].value
          };
          this.govLimitList.push(landUse);
        }
      }
    });
    this.api.seekTaskBaseInfo(this.$route.query.id).then(res => {
      if (res.data.projectDO.hasTaskFile == 3||
        (res.data.tbTaskDO&&res.data.tbTaskDO.auditState==5)||
        (res.data.taskDependDO&&res.data.taskDependDO.auditState&&res.data.taskDependDO.auditState!=3)) {
        this.disabled = true;
      }
      if (res.data.taskDependDO) {
        this.dependForm = res.data.taskDependDO;
        this.dependForm.buildArea = res.data.taskDependDO.buildArea?res.data.taskDependDO.buildArea:"";
        this.dependForm.plotRatioCondFirst = res.data.taskDependDO.plotRatioCondFirst?res.data.taskDependDO.plotRatioCondFirst:"";
        this.dependForm.plotRatioCondSec = res.data.taskDependDO.plotRatioCondSec?res.data.taskDependDO.plotRatioCondSec:"";
        this.dependForm.buildingDensity = res.data.taskDependDO.buildingDensity?res.data.taskDependDO.buildingDensity:"";
        if (this.dependForm.areaType) {
          this.dependForm.areaType = this.dependForm.areaType.split(",");
          for (let i = 0; i < this.dependForm.areaType.length; i++) {
            for (let j = 0; j < this.govLimitList.length; j++) {
              if (this.govLimitList[j].value == this.dependForm.areaType[i]) {
                this.areaType.push(this.govLimitList[j].name);
                break;
              }
            }
          }
        } else {
          this.dependForm.areaType = [];
        }
        // 处理文件
        if (res.data.taskFileDOList) {
          for (var i = 0; i < res.data.taskFileDOList.length; i++) {
            if (res.data.taskFileDOList[i].type == "RedLineCAD") {
              this.dependForm.RedLineCAD = res.data.taskFileDOList[i].filePath;
              this.dependForm.RedLineCADName = res.data.taskFileDOList[i].orgfileName;
              this.redLineCADFList = [{
                name:res.data.taskFileDOList[i].orgfileName,
                url:res.data.taskFileDOList[i].filePath
              }]
            }
            if (res.data.taskFileDOList[i].type == "LandLimitInfo") {
              this.dependForm.LandLimitInfo = res.data.taskFileDOList[i].filePath;
              this.dependForm.LandLimitInfoName = res.data.taskFileDOList[i].orgfileName;
              this.landLimitfileList = [{
                name:res.data.taskFileDOList[i].orgfileName,
                url:res.data.taskFileDOList[i].filePath
              }]
            }
            if (res.data.taskFileDOList[i].type == "LimitFile") {
              this.dependForm.LimitFile = res.data.taskFileDOList[i].filePath;
              this.dependForm.LimitFileName = res.data.taskFileDOList[i].orgfileName;
              this.limitFileList = [{
                name:res.data.taskFileDOList[i].orgfileName,
                url:res.data.taskFileDOList[i].filePath
              }]
            }
          }
        }
      }
    });
  }
};
</script>
<style lang="less" scoped>
.design-basis-warp {
  .tip-error {
    color: red;
  }
  .multiselect{
    position: relative;
    .multiselect-text{
      position: absolute;
      padding-left: 0.3125rem;
      padding-right: 0.3125rem;
      left: 0.5rem;
      top: 0px;
      font-weight: 500;
      background: #ffffff;
      font-size: 0.75rem !important;
      box-sizing: border-box;
      transform: translateY(-50%);
      z-index: 2;
      color: #999;
    }
  }
}
</style>
<style lang="less">
.design-basis-warp {
  .lxx-multiselect .menu-footer {
    border-top: none !important;
    text-align: left !important;
  }
  .menu-content ul li{
    min-height:1.875rem !important;
    padding: 0.625rem 0;
  }
  .menu-content ul li::after{
    height: 0;
    display: none;
  }
  .lxx-dropdown {
    border: 0.0625rem solid #dadce0 !important;
    height: 3.125rem;
    border-radius: 0.25rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    .dropdown-box{
      height: 3.125rem !important;
    }
    .dropdown-box span.head{
      height: 3.125rem !important;
      font-size: 0.875rem;
      line-height: 3.125rem;
      color: #999 !important;
    }
    .lxx-dropdown .dropdown-box[data-v-babf1cea]:after {
       height: 3.125rem !important;
    }
    .menu-head{
      height: 3.125rem;
      line-height:2.1875rem;
    }
  }
}
</style>
