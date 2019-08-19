<template>
  <mdb-container class="detial-info-warp px-0">
    <mdb-row class="form-mdb-row">
      <mdb-col md="10">
        <div class="outline-input">
          <mdb-input
            type="text"
            size="lg"
            label="项目名称"
            :disabled="disabled"
            v-model="baseForm.projectName"
            @change="checkProjectName"
            outline
          />
        </div>
        <div class="tip-error mt-2" v-if="projectNameError">{{projectNameError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="form-mdb-row">
      <mdb-col md="4">
            <div class="md-outline-select">
              <label class="label active" :class="disabled?'disabled':''">建设地址</label>
              <mdb-select 
                outline 
                :disabled="disabled" 
                v-if="address1Options.length>0" 
                :options="address1Options" 
                @getValue="clear"
              />
          </div>
      </mdb-col>
      <mdb-col  md="4"> 
          <div class="md-outline-select">
            <mdb-select
              outline 
              v-if="address2Options"
              :options="address2Options"
              @getValue="clearCounty"
              :disabled="disabled"
            />
          </div>
      </mdb-col>
      <mdb-col  md="4">
          <div class="md-outline-select">
            <mdb-select 
              outline  
              v-if="address3Options" 
              :options="address3Options" 
              @getValue="clearqu" 
              :disabled="disabled"
            />
          </div>
      </mdb-col>
      <mdb-col md="12" v-if="address1Error" class="mt-2">
          <div class="tip-error" >{{address1Error}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="12">
        <p class="text-1">四至</p>
      </mdb-col>
    </mdb-row>
    <mdb-row class="form-mdb-row">
      <mdb-col md="3">
        <div class="outline-input">
            <mdb-input
              type="text"
              size="lg"
              label="东"
              :disabled="disabled"
              v-model="baseForm.east"
              @change="checkEast"
              outline
            />
          </div>
          <div class="tip-error mt-2" v-if="eastError">{{eastError}}</div>
      </mdb-col>
      <mdb-col md="3">
        <div class="outline-input">
          <mdb-input
            type="text"
            size="lg"
            label="西"
            :disabled="disabled"
            v-model="baseForm.west"
            @change="checkWest"
            outline
          />
        </div>
        <div class="tip-error mt-2" v-if="westError">{{westError}}</div>
      </mdb-col>
      <mdb-col md="3">
        <div class="outline-input">
          <mdb-input
            type="text"
            size="lg"
            label="南"
            :disabled="disabled"
            v-model="baseForm.south"
            @change="checkSouth"
            outline
          />
        </div>
        <div class="tip-error mt-2" v-if="southError">{{southError}}</div>
      </mdb-col>
      <mdb-col md="3">
        <div class="outline-input">
          <mdb-input
            type="text"
            size="lg"
            label="北"
            :disabled="disabled"
            v-model="baseForm.north"
            @change="checkNorth"
            outline
          />
        </div>
        <div class="tip-error mt-2" v-if="northError">{{northError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="form-mdb-row">
      <mdb-col md="5">
        <div class="md-outline-select">
          <label class="label active" :class="disabled?'disabled':''">地形条件</label>
          <mdb-select v-if="landDescOptions&&landDescOptions.length>0" :options="landDescOptions" @getValue="checkLD" :disabled="disabled"/>
        </div>
        <div class="tip-error mt-2" v-if="landDescError">{{landDescError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="form-mdb-row">
      <mdb-col md="5">
         <div class="outline-input">
          <mdb-input
            type="text"
            size="lg"
            label="用地规模（平方米）"
            :disabled="disabled"
            v-model="formLabelAlign.ydModel"
            @change="checkYdModel"
            outline
          />
        </div>
        <div class="tip-error mt-2" v-if="ydModelError">{{ydModelError}}</div>
      </mdb-col>
      <mdb-col md="5">
        <div class="outline-input">
          <mdb-input
            type="text"
            size="lg"
            label="建设规模（平方米）"
            :disabled="disabled"
            v-model="formLabelAlign.arcModel"
            @change="checkArcModel"
            outline
          />
        </div>
        <div class="tip-error mt-2" v-if="arcModelError">{{arcModelError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="12">
        <p class="text-1">项目类别<span style="color:#999999;">（根据项目情况可多选）</span></p>
        <div id="projectType">
          <div class="form-check checkbox-teal" v-for="item in projectTypeList" :key="item.value">
            <input
              type="checkbox"
              class="form-check-input"
              name="projectType"
              :id="item.id"
              :value="item.id"
              :checked="selectedProjectType.indexOf(item.name)!=-1"
              @change="getType(item.id,item.name)"
              :disabled="disabled||(selectDisabled&&item.id ==currentId)"
            >
            <label class="form-check-label" :for="item.id">{{item.name}}</label>
          </div>
        </div>
      </mdb-col>
      <mdb-col md="12">
        <div class="tip-error" v-if="projectTypeError">{{projectTypeError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="form-mdb-row" v-show="selectedProjectType.length>0">
      <mdb-col md="12">
        <p class="text-1" style="color:#999999;">
          <mdb-icon icon="exclamation-circle" />
          您选择的项目类型如下，请从中点选或在下方输入项目包含的功能内容
        </p>
        <mdb-row class="form-mdb-row">
          <mdb-col md="12" v-for="(valueList,key) in buildList" :key="key">
            <div class="project-type">
              {{valueList.key}}
            </div>
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
                  :checked="selectedBuildType.indexOf(value.name)!=-1"
                  @change="getDetail(value.name,value.id,valueList.key)"
                  :disabled="disabled"
                >
                <label class="form-check-label" :class="selectedBuildType.indexOf(value.name)!=-1?'select-build-type':''" :for="value.name">{{value.name}}</label>
              </div>
            </div>
          </mdb-col>
        </mdb-row>
        <div v-if="isProjectError" class="tip-error">{{isProjectError}}</div>
      </mdb-col>

      <mdb-col md="12" v-if="(detailList&&detailList.length>0)||selectedProjectType.indexOf('其他')>0">
        <p class="text-1" style="margin-bottom:0;">所选功能内容</p>
        <mdb-row v-for="(item,index) in detailList" :key="item.value" id="choosedOP">
          <mdb-col md="5" class="info-pb mt-4">
            <div class="outline-input ">
              <mdb-input
                type="text"
                size="lg"
                label="内容"
                :disabled="item.display||disabled "
                v-model="item.buildDetail"
                @change="checkBuildCon(item.buildDetail,index)"
                outline
              />
            </div>
            <div class="tip-error mt-2" v-if="!item.display&&item.msg">{{item.msg}}</div>
          </mdb-col>
          <mdb-col md="5" class="info-pb mt-4">
              <div class="outline-input ">
                <mdb-input
                  type="text"
                  size="lg"
                  label="建设规模(平方米)"
                  :disabled="disabled"
                  v-model="item.buildSize"
                  @change="checkBuildSize(item.buildSize,index)"
                  outline
                />
              </div>
              <div class="tip-error mt-2" v-if="item.error">{{item.error}}</div>
          </mdb-col>
          <mdb-col md="2" v-if="!item.display" class="mt-4">
            <span @click="deleteOrther(index)">
              <mdb-icon far icon="trash-alt"/>
            </span>
          </mdb-col>
        </mdb-row>
      </mdb-col>
      <mdb-col md="12" v-if="selectedProjectType.length>0&&selectedProjectType.indexOf('其他')!=-1">
        <div class="tip-error my-2" v-if="addError">{{addError}}</div>
        <mdb-row>
          <mdb-col md="5">
            <mdb-btn color="primary" @click="add">
              <mdb-icon icon="plus" class="mr-1"/>自行填写功能
            </mdb-btn>
          </mdb-col>
        </mdb-row>
      </mdb-col>
    </mdb-row>
    <mdb-row class="form-mdb-row">
      <mdb-col md="10">
        <div class="outline-input">
          <mdb-input
            type="textarea"
            label="设计需求详细描述"
            outline
            v-model="formLabelAlign.designDescribe"
            :disabled="disabled"
            @change="handleTextarea"
            :rows="3"
          />
        </div>
        <div v-if="textareaError" class="tip-error mt-2">{{textareaError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="form-mdb-row">
      <mdb-col md="10">
        <div class="outline-input">
          <mdb-input
            type="textarea"
            label="项目简介（该简介将展示给建筑师）"
            outline
            v-model="formLabelAlign.desc"
            :disabled="disabled"
            @change="handleProjectTextarea"
            :rows="3"
          />
        </div>
        <div v-if="projectTextareaError" class="tip-error mt-2">{{projectTextareaError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row>
       <mdb-col md="12">
         <p class="text-1">预期项目周期</p>
      </mdb-col>
    </mdb-row>
    <mdb-row class="form-mdb-row">
      <mdb-col md="5">
        <div class="date-box">
          <label class="label-date" :class="disabled?'disabled':''">开始日期</label>
          <mdb-date-picker
            class="w-100"
            :date="startDate"
            :option="option"
            @getValue="getPickerStartValue"
            :limit="limit"
            :class="disabled?'disabled':''"
          ></mdb-date-picker>
        </div>
        <div class="tip-error mt-2" v-if="beginTimeError">{{beginTimeError}}</div>
      </mdb-col>
      <mdb-col md="5">
        <div class="date-box">
          <label class="label-date" :class="disabled?'disabled':''">结束日期</label>
          <mdb-date-picker
            class="w-100"
            :date="endDate"
            :option="option"
            @getValue="getPickerEndValue"
            :class="disabled?'disabled':''"
            :limit="limit"
          ></mdb-date-picker>
        </div>
        <div class="tip-error mt-2" v-if="endTimeError">{{endTimeError}}</div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="form-mdb-row" v-if="formLabelAlign.collectProgramType!=3">
      <mdb-col md="5">
        <div class="date-box">
          <label class="label-date" :class="disabled?'disabled':''">项目发布日期</label>
          <mdb-date-picker
            class="w-100"
            :date="projectDate"
            :option="option"
            @getValue="getPickerProjectValue"
            :class="disabled?'disabled':''"
            :limit="limit"
          ></mdb-date-picker>
        </div>
        <div class="tip-error mt-2" v-if="projectDateError">{{projectDateError}}</div>
      </mdb-col>
      <mdb-col md="5">
        <div class="w-100 date-box">
          <label class="label-date" :class="disabled?'disabled':''">项目发布时间</label>
          <div id="time" class="w-100">
              <mdb-time-picker
                class="w-100 mr-0"
                :value="releaseTime"
                id="projectTime"
                :placeholder="releaseTime.time"
                :hoursFormat="24"
                @getValue="getPickerProjectTimeValue"
                :class="disabled?'disabled':''"
              />
          </div>
          <div class="tip-error mt-2" v-if="projectTimeError">{{projectTimeError}}</div>
        </div>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>
<script>
import { constants } from 'zlib';
export default {
  name: "detialInfoPerfect",
  data() {
    return {
      landDescOptions: [ ],
      address1Options: [{ text: "请选择", value: null, selected: true }],
      address2Options: [{ text: "请选择", value: null, selected: true }],
      address3Options: [{ text: "请选择", value: null, selected: true }],
      selectDisabled: false,
      currentId: null,
      disabled: false,
      actives: 0,
      provinceList: [],
      cityList: [],
      districtList: [],
      baseForm: {
        address1: "",
        address2: "",
        address3: "",
        auditState: 0,
        east: "",
        id: null,
        landDesc: "",
        projectName: "",
        region: "",
        north: "",
        west: "",
        south: "",
        taskId: null
      },
      startDate: {
        time: ""
      },
      endDate: {
        time: ""
      },
      projectDate: {
        time: ""
      },
      releaseTime: {
        time: ""
      },
      limit: [
        {
          type: "weekday",
          available: [1, 2, 3, 4, 5, 6, 0]
        },
        {
          type: "fromto",
          from: new Date() - 3600 * 1000 * 24,
          to: ""
        }
      ],
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
        placeholder: "",
        inputStyle: {
          width: "100%",
          display: "inline-block",
          padding: "6px 0.725rem",
          "line-height": "1.375rem",
          "font-size": "0.875rem",
          border: "0.125rem solid #fff",
          "box-shadow": "0 1px 3px 0 rgba(0, 0, 0, 0.2)",
          "border-radius": "0.25rem",
          color: "#333"
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
      formLabelAlign: {
        beginTime: "",
        endTime: "",
        arcModel: "",
        ydModel: "",
        releaseTime: "",
        releaseDate: "",
        designDescribe: "",
        buildType: "",
        buildSize: "",
        buildDetail: "",
        projectType: "",
        collectDepth:"",
        desc: "",
        collectProgramType:""
      },

      projectNameError: null,
      address1Error: null,
      eastError: null,
      westError: null,
      southError: null,
      northError: null,
      landDescError: null,
      beginTimeError: null,
      endTimeError: null,
      projectTimeError: null,
      textareaError: null,
      projectTextareaError: null,
      isProjectError: null,
      ydModelError: null,
      arcModelError: null,
      projectDateError: null,
      projectTypeError: null,
      addError: null,

      buildingTypeList: [], //所有项目类别
      selectedProjectType: [], //name
      parentidList: [], //id
      buildList: [], //子类map
      detailList: [], //包含内容
      selectedBuildType: [], //子类内容name

      projectTypeList: [] //所有的项目类别
    };
  },
  methods: {
    // 删除项目类型
    deleteOrther(index) {
      this.detailList.splice(index, 1);
    },
    //项目名称  必填
    checkProjectName(val) {
      // if(event && event.type == "input"){
      if (!this.baseForm.projectName) {
        this.projectNameError = "请输入项目名称";
      } else if(this.baseForm.projectName.length>20){
        this.projectNameError = "您输入的长度有误";
      }else {
        this.projectNameError = null;
      }
      // }
    },
    //方位 东
    checkEast(val) {
      if (!this.baseForm.east) {
        this.eastError = "请输入位置";
      }else if(val.length>50){
        this.eastError = "您输入的长度有误";
      } else {
        this.eastError = "";        
      }
    },
    //方位 西
    checkWest(val) {
      if (!this.baseForm.west) {
        this.westError = "请输入位置";
      }else if(this.baseForm.west.length>50){
        this.westError = "您输入的长度有误";
      } else {
        this.westError = "";
      }
    },
    //方位 南
    checkSouth(val) {
      if (!this.baseForm.south) {
        this.southError = "请输入位置";
      }else if(val.length>50){
        this.southError = "您输入的长度有误";
      } else {
        this.southError = "";
      }
    },
    //方位 北
    checkNorth(val) {
      if (!this.baseForm.north) {
        this.northError = "请输入位置";
      }else if(val.length>50){
        this.northError = "您输入的长度有误";
      } else {
        this.northError = "";
      }
    },
    checkLD(value, text) {
      if (event && event.type == "click") {
        this.baseForm.landDesc = value;
        if (!value) {
          this.landDescError = "请选择地形条件";
        } else {
          this.landDescError = "";
        }
      }
    },
    //用地规模  必填
    checkYdModel(value) {
      let numberReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if(value){
        this.formLabelAlign.ydModel = value.replace( /[^0-9\.]/g,'')
      }
      if (!this.formLabelAlign.ydModel) {
        this.ydModelError = "请输入用地规模";
      } else if (!numberReg.test(this.formLabelAlign.ydModel)) {
        this.ydModelError = "请输入用地规模正确格式";
      } else if (this.formLabelAlign.ydModel <= 0) {
        this.ydModelError = "用地规模必须大于0";
      } else if(this.formLabelAlign.ydModel.split(".")[0].length>10){
        this.ydModelError = "您输入的长度有误";
      } else {
        this.ydModelError = null;
      }
    },
    // 建筑规模 非必填
    checkArcModel(value) {
      let buildSizeAll = 0;
      this.detailList.map((item,index)=>{
        buildSizeAll += Number(item.buildSize);
        item.error=null;
      })
      let numberReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if(value){
        this.formLabelAlign.arcModel = value.replace( /[^0-9\.]/g,'')
      }
      if (!this.formLabelAlign.arcModel) {
        this.arcModelError = "请输入建设规模";
      } else if (!numberReg.test(this.formLabelAlign.arcModel)) {
        this.arcModelError = "请输入建设规模正确格式";
      } else if (this.formLabelAlign.arcModel <= 0) {
        this.arcModelError = "建设规模必须大于0";
      } else if(this.formLabelAlign.arcModel.split(".")[0].length>10){
        this.arcModelError = "您输入的长度有误";
      } else if(this.formLabelAlign.arcModel<buildSizeAll){
        this.arcModelError = "请输入正确的建设规模";
      } else {
        this.arcModelError = null;
      }
    },
    //项目类别
    checkProjectType() {
      if (this.selectedProjectType && this.selectedProjectType.length > 0) {
        this.projectTypeError = "";
      } else {
        this.projectTypeError = "请选择项目类别";
      }
    },
    // 项目类型选择
    getType(val, name) {
      let buildList = [];
      let len = 0;
      this.currentId = val;
      // 当选中时 则异步加载数据
      if (this.buildingTypeList[name] === undefined) {
        let param = "building_type_" + val;
        this.selectDisabled = true;
        this.currentId = val;
        this.api.buildingType(param).then(res => {
          this.$set(this.buildingTypeList, name, res.data);
          for (let key in this.buildingTypeList) {
            let build_item = {};
            build_item.name = this.buildingTypeList[key];
            build_item.key = key;
            buildList.unshift(build_item);
          }
          this.buildList = buildList; //包含内容Map
          this.selectDisabled = false;
        });
        this.parentidList.push(val); //list=>建筑类型id
        this.selectedProjectType.push(name); //list=>建筑类别name
        if (this.selectedProjectType.indexOf("其他") != -1) {
          this.addError = "请单击自行填写功能，填写具体能内容和规模。";
        }
      } else {
        this.parentidList.splice(this.parentidList.indexOf(val), 1); //删除当前选中id
        this.selectedProjectType.splice(
          this.selectedProjectType.indexOf(name),
          1
        ); //删除当前选中name
        if (this.selectedProjectType.indexOf("其他") == -1) {
          this.addError = "";
        }
        for (let i = 0; i < this.detailList.length; i++) {
          if (name === this.detailList[i].parent) {
            len = this.selectedBuildType.indexOf(
              this.detailList[i].buildDetail
            );
            this.detailList.splice(i, 1); //删除对应项目类型的所有子类型
            this.selectedBuildType.splice(len, 1); //删除对应项目类型的所有子类型name
            i--;
          }
        }
        for (let i = 0; i < this.buildingTypeList[name].length; i++) {
          let idx = this.formLabelAlign.buildType.indexOf(
            this.buildingTypeList[name][i].name
          );
          if (idx > -1) {
            this.formLabelAlign.buildType.splice(idx, 1);
          }
        }
        delete this.buildingTypeList[name];
        for (let j = 0; j < this.buildList.length; j++) {
          if (this.buildList[j].key == name) {
            this.buildList.splice(j, 1);
          }
        }

        this.isProjectError = null;
      }
      this.checkProjectType();
    },
    // 项目类型包含内容
    getDetail(val, id, key) {
      let hasChecked = false;
      let datial_arr;
      for (let i = 0; i < this.detailList.length; i++) {
        let item = this.detailList[i];
        if (item.buildDetail === val) {
          hasChecked = true;
          this.detailList.splice(i, 1);
          this.selectedBuildType.splice(i, 1);
        }
      }
      if (!hasChecked) {
        this.detailList.push({
          id: id,
          parent: key,
          buildDetail: val,
          buildSize: "",
          display: true,
          error: "",
          msg: ""
        });
        if (this.selectedBuildType.indexOf(val) === -1) {
          this.selectedBuildType.push(val);
        }
        this.isProjectError = null;
      }
    },
    // 自行填写功能
    add() {
      this.addError = "";
      let item = {
        id: -1,
        parent: "其他",
        buildDetail: "",
        buildSize: "",
        display: false,
        error: "",
        msg: ""
      };
      this.detailList.push(item);
    },
    // 输入用地规模
    checkBuildSize(value, index) {
      let numberReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if(value){
        this.detailList[index].buildSize = value.replace( /[^0-9\.]/g,'')
      }
      let buildSizeAll = 0;
      this.detailList.map((item,index)=>{
        buildSizeAll += Number(item.buildSize);
      })
      this.arcModelError = null;
      if (!value) {
        this.detailList[index].error = "请输入建设规模";
      } else if (!numberReg.test(value)) {
        this.detailList[index].error = "您输入的格式有误";
      } else if (value <= 0) {
        this.detailList[index].error = "用地规模大于0";
      } else if(value.split(".")[0].length>10){
        this.detailList[index].error = "您输入的长度有误";
      } else if(this.formLabelAlign.arcModel<buildSizeAll){
        this.detailList[index].error = "请输入正确的建设规模";
      }  else {
        this.detailList[index].error = null;
      }
    },
    //输入类型
    checkBuildCon(value, index) {
      if (!value) {
        this.detailList[index].msg = "请填写内容";
      } else {
        this.detailList[index].msg = null;
      }
    },
    // 设计需求详细描述
    handleTextarea(val) {
      if (!this.formLabelAlign.designDescribe) {
        this.textareaError = "请输入设计需求详细描述";
      } else if (this.formLabelAlign.designDescribe.length > 500) {
        this.textareaError = "设计需求详细描述必须小于500字";
      } else {
        this.textareaError = null;
      }
    },
    // 项目简介
    handleProjectTextarea(val) {
      if (!this.formLabelAlign.desc) {
        this.projectTextareaError = "请输入项目简介";
      } else if (this.formLabelAlign.desc.length > 500) {
        this.projectTextareaError = "项目简介必须小于500字";
      } else {
        this.projectTextareaError = null;
      }
    },
    // 开始时间
    getPickerStartValue(value) {
      this.formLabelAlign.beginTime = value;
      this.beginTimeError = "请选择日期";
      let beginTime = Number(new Date(this.formLabelAlign.beginTime));
      let endTime = Number(new Date(this.formLabelAlign.endTime));
      let releaseDate = Number(new Date(this.formLabelAlign.releaseDate)); //项目发布日期
      let nowData = Number(new Date());
      if( beginTime > 0 &&
          endTime !== 0 && 
          endTime < beginTime+86400000
      ){
        this.beginTimeError = "开始时间必须小于结束时间";
        this.endTimeError = null;
      }else if (
        this.formLabelAlign.collectProgramType!=3&&
        beginTime > 0 && 
        releaseDate != 0 && 
        releaseDate > beginTime
      ) {
        this.beginTimeError = "项目发布日期必须小于等于项目周期开始日期";
        this.projectDateError = null;
      }
      // else if (
      //   this.formLabelAlign.collectDepth=="方案设计"&&
      //   beginTime > 0 && 
      //   endTime !== 0 && 
      //   endTime <= beginTime + 1209600000
      //   ) {
      //   this.beginTimeError =
      //     "项目周期必须大于两周";
      //   this.endTimeError = null;
      // }
       else {
        this.beginTimeError = null;
        this.projectDateError = null;
      }
    },
    // 结束时间
    getPickerEndValue(value) {
      this.formLabelAlign.endTime = value;
      let beginTime = Number(new Date(this.formLabelAlign.beginTime)); //开始时间
      let endTime = Number(new Date(this.formLabelAlign.endTime)); //结束时间
      let nowData = Number(new Date()); //当前时间
      if( endTime > 0 &&
          beginTime !== 0 && 
          endTime < beginTime+86400000
      ){
        this.endTimeError = "结束时间必须大于开始时间";
        this.beginTimeError = null;
      }
      // else if (
      //   this.formLabelAlign.collectDepth=="方案设计"&&
      //   endTime > 0 && 
      //   beginTime != 0 && 
      //   endTime <= beginTime + 1209600000
      // ) {
      //   this.endTimeError = "项目周期必须大于两周";
      //   this.beginTimeError = null;
      // }
       else {
        this.endTimeError = null;
      }
    },
    //项目日期
    getPickerProjectValue(value) {
      this.beginTimeError = null;
      this.formLabelAlign.releaseDate = value;
      let beginTime = Number(new Date(this.formLabelAlign.beginTime)); //开始时间
      let releaseDate = Number(new Date(this.formLabelAlign.releaseDate)); //项目发布日期
      let nowData = Number(new Date());
      if (!this.formLabelAlign.releaseDate) {
        this.projectDateError = "请选择项目发布日期";
      } else if (
        this.formLabelAlign.collectProgramType!=3&&
        beginTime > 0 && 
        releaseDate != 0 && 
        releaseDate > beginTime
      ) {
        this.projectDateError = "项目发布日期必须小于等于项目周期开始日期";
        this.beginTimeError = null;
      } else {
        this.projectDateError = "";
        this.beginTimeError = null;
      }
    },
    //项目时间
    getPickerProjectTimeValue(value) {
      this.formLabelAlign.releaseTime = value;
      if (!this.formLabelAlign.releaseTime) {
        this.projectTimeError = "请选择项目时间";
      } else {
        this.projectTimeError = "";
      }
    },

    // sheng
    clear(value, text) {
      if (event && event.type == "click") {
        this.baseForm.address2 = "";
        this.address2Options = [{ text: "请选择", value: null, selected: true }]
        this.baseForm.address3 = "";
        this.address3Options = [{ text: "请选择", value: null, selected: true }]
        if (value) {
          this.baseForm.address1 = value;
          for (let i = 0; i < this.address1Options.length; i++) {
            if (this.address1Options[i].value == value) {
              this.address1Options[i].selected = true;
            } else {
              this.address1Options[i].selected = false;
            }
          }
          this.getCity(value);
          this.address1Error = "";
        } else {
          this.districtList = [];
          this.cityList = [];
          this.address1Error = "请选择地址";
        }
      }
    },
    //shi
    getCity(value) {
      if (value) {
       this.address2Options=[{ text: "请选择", value: null, selected: true }]
        this.api.getCity(value).then(res => {
          if (res.code == 0) {
            this.cityList = res.data;
            for (let i = 0; i < this.cityList.length; i++) {
              let cl = {
                value: this.cityList[i].value,
                text: this.cityList[i].label,
                selected: false
              };
              if (this.baseForm.address2 == this.cityList[i].value) {
                cl.selected = true;
                this.address2Options[0].selected = false;
              }
              this.address2Options.push(cl);
            }
          } else {
            this.$message(res.msg);
          }
        });
      }
    },
    // shixuanze
    clearCounty(value, text) {
      if (event && event.type == "click") {
        this.baseForm.address3 = "";
        this.address3Options =[{ text: "请选择", value: null, selected: true }]
        if (value) {
          for (let i = 0; i < this.address2Options.length; i++) {
            if (this.address2Options[i].value == value) {
              this.address2Options[i].selected = true;
            } else {
              this.address2Options[i].selected = false;
            }
          }
          this.baseForm.address2 = value;
          this.getCounty(value);
          this.address1Error = "";
        } else {
          this.districtList = [];
          this.address1Error = "请选择地址";
        }
      }
    },
    //qu
    getCounty(value) {
      if (value) {
        this.api.getCounty(value).then(res => {
          if (res.code == 0) {
            this.districtList = res.data;
            this.address3Options = [{ text: "请选择", value: null, selected: true }]
            for (let i = 0; i < this.districtList.length; i++) {
              let dl = {
                value: this.districtList[i].value,
                text: this.districtList[i].label,
                selected: false
              };
              if (this.baseForm.address3 == this.districtList[i].value) {
                dl.selected = true;
                this.address3Options[0].selected = false;
              }
              this.address3Options.push(dl);
            }
          } else {
            this.$message(res.msg);
          }
        });
      }
    },
    //qu
    clearqu(value, text) {
      if (event && event.type == "click") {
        if (value) {
          this.address1Error = "";
          this.baseForm.address3 = value;
          for (let i = 0; i < this.address3Options.length; i++) {
            if (this.address3Options[i].value == value) {
              this.address3Options[i].selected = true;
            } else {
              this.address3Options[i].selected = false;
            }
          }
        } else {
          this.address1Error = "请选择地址";
        }
      }
    },

    //表单校验
    checkForm() {
      let isCheckPass = true;
      if (!this.baseForm.projectName || this.projectNameError) {
        this.projectNameError = "请输入项目名称";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (!this.baseForm.address1||
        !this.baseForm.address2||
        !this.baseForm.address3||
        this.address1Error) {
        this.address1Error = "请选择地址";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      //dong
      if (!this.baseForm.east ||this.eastError) {
        this.eastError = "请输入位置";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      //bei
      if (!this.baseForm.north ||this.northError) {
        this.northError = "请输入位置";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      //xi
      if (!this.baseForm.west ||this.westError) {
        this.westError = "请输入位置";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      //nan
      if ( !this.baseForm.south||this.southError ) {
        this.southError = "请输入位置";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (
        !this.baseForm.landDesc ||
        this.baseForm.landDesc == "请选择地形条件" ||
        this.landDescError
      ) {
        this.landDescError = "请选择地形条件";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (!this.formLabelAlign.arcModel || this.ydModelError) {
        this.ydModelError = "请输入用地规模";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (!this.formLabelAlign.arcModel || this.arcModelError !== null) {
        this.arcModelError = "请输入建筑规模";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (this.selectedProjectType.length <= 0 || this.projectTypeError) {
        this.projectTypeError = "请选择项目类别";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      } else {
        let buildSizeError;
        let projectType_arr = [];
        for (let j = 0; j < this.selectedProjectType.length; j++) {
          for (let k = 0; k < this.detailList.length; k++) {
            if (this.selectedProjectType[j] == this.detailList[k].parent) {
              projectType_arr.push(true);
              break;
            }
          }
        }

        let num = 0;
        let count = 0;
        for (let i = 0; i < this.detailList.length; i++) {
          if (!this.detailList[i].buildDetail||this.detailList[i].msg) {
            this.detailList[i].msg = "请输入内容";
            count++;
          }
          // else if(this.detailList[i].buildDetail.length>10){
          //   this.detailList[i].msg = "您输入的长度有误";
          //   count++;
          // }
           else {
            this.detailList[i].msg = null;
          }
          let numberReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          if (!this.detailList[i].buildSize) {
            this.detailList[i].error = "请输入用地规模";
            num++;
          } else if (!numberReg.test(this.detailList[i].buildSize)) {
            this.detailList[i].error = "请输入用地规模正确格式";
            num++;
          }else if(this.detailList[i].buildSize.split(".")[0].length>10){
            this.detailList[i].error = "您输入的长度有误";
            num++;
          } else {
            this.detailList[i].error = null;
          }
        }
        if (num != 0 || count != 0) {
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
        if (this.selectedProjectType.indexOf("其他") != -1) {
          if (this.addError) {
            this.addError = "请单击自行填写功能，填写具体能内容和规模。";
            document.documentElement.scrollTop = 200;
            isCheckPass = false;
          }
        } else {
          if (projectType_arr.length != this.selectedProjectType.length) {
            this.isProjectError = "请选择项目包含的功能";
            document.documentElement.scrollTop = 200;
            isCheckPass = false;
          }
        }
      }
      if (!this.formLabelAlign.designDescribe || this.textareaError) {
        this.textareaError = "请输入设计需求详细描述";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(!this.formLabelAlign.desc || this.projectTextareaError){
        this.projectTextareaError = "请输入项目简介";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (!this.formLabelAlign.beginTime || this.beginTimeError) {
        this.beginTimeError = "请输入开始日期";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (!this.formLabelAlign.endTime || this.endTimeError) {
        this.endTimeError = "请输入结束日期";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (this.formLabelAlign.collectProgramType!=3&&
         (!this.formLabelAlign.releaseDate || this.projectDateError)
      ) {
        this.projectDateError = "请输入项目发布日期";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (this.formLabelAlign.collectProgramType!=3&&
         (!this.formLabelAlign.releaseTime || this.projectTimeError)
      ) {
        this.projectTimeError = "请输入项目发布时间";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      return isCheckPass;
    },
    getParam() {
      let buildType = [];
      let buildSize = [];
      let buildDetail = [];
      let projectType = [];
      this.baseForm.projectId = this.$route.query.id;
      this.detailList.map((item, index) => {
        if (projectType.indexOf(item.parent) === -1) {
          projectType.push(item.parent);
        }
      });
      let buildDetail_str = "";
      let buildSize_str = "";
      for (let i = 0; i < projectType.length; i++) {
        let buildDetail_arr = [];
        let buildSize_arr = [];
        buildDetail_str = "";
        buildSize_str = "";
        for (let j = 0; j < this.detailList.length; j++) {
          if (this.detailList[j].parent == projectType[i]) {
            buildDetail_arr.push(this.detailList[j].buildDetail);
            buildSize_arr.push(this.detailList[j].buildSize);
          }
        }
        buildDetail_str = buildDetail_arr.join(",");
        buildSize_str = buildSize_arr.join(",");
        if (buildDetail_str) {
          buildDetail.push(buildDetail_str);
          buildSize.push(buildSize_str);
        }
      }
      this.formLabelAlign.buildType = buildDetail.join("&"); //项目包含的功能内容
      this.formLabelAlign.buildSize = buildSize.join("&"); // 项目包含的功能规模
      this.formLabelAlign.buildDetail = buildDetail.join("&"); //项目包含的功能内容
      this.formLabelAlign.projectType = projectType.join("&"); //项目类别
    },
    emptyError(){
      //选择地址
      this.address1Error = null;
      //地形条件
      this.landDescError = null;
      // 四至
      this.eastError = null;
      this.northError = null;
      this.westError = null;
      this.southError = null;
      //详细描述
      this.textareaError = null;
      //项目简介
      this.projectTextareaError = null;
      //项目类别
      this.projectTypeError = null;
      this.isProjectError = null;
      this.addError = null;
    },
    checkLen(){
      let isCheckPass = true
      this.emptyError()
      //项目名称
      if(this.baseForm.projectName&&this.projectNameError){
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.projectNameError = null
      }
      //四至
      //dong
      if (this.baseForm.east.length>50) {
        this.eastError = "您输入的长度有误";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      //bei
      if (this.baseForm.north.length>50) {
        this.northError = "您输入的长度有误";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      //xi
      if (this.baseForm.west.length>50) {
        this.westError = "您输入的长度有误";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      //nan
      if (this.baseForm.south.length>50) {
        this.southError = "您输入的长度有误";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      //用地规模
      if(this.formLabelAlign.arcModel && this.ydModelError){
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.ydModelError = null;
      }
      //建筑规模
      if(this.formLabelAlign.arcModel && this.arcModelError){
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
         this.arcModelError = null;
      }
      //设计需求详细描述
      if(this.formLabelAlign.designDescribe.length>500){
        this.textareaError = "您输入的长度有误"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      
      //项目简介
      if(this.formLabelAlign.desc.length>500 ){
        this.projectTextareaError = "您输入的长度有误"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      //开始日期
      if (this.formLabelAlign.beginTime&& this.beginTimeError) {
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.beginTimeError = null;
      }
      //结束日期
      if (this.formLabelAlign.endTime&&this.endTimeError) {
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.endTimeError = null;
      }
      //发布日期
      if (this.formLabelAlign.collectProgramType!=3&&this.formLabelAlign.releaseDate&&this.projectDateError) {
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.projectDateError = null;
      }
      //发布时间
      if (this.formLabelAlign.collectProgramType!=3&&this.formLabelAlign.releaseTime&&this.projectTimeError) {
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.projectTimeError = null;
      }
      //项目类别
      for (let i = 0; i < this.detailList.length; i++) {
        if (!this.detailList[i].buildDetail||this.detailList[i].msg) {
          this.detailList[i].msg = "请输入内容";
          count++;
        }
        // if (this.detailList[i].buildDetail&&this.detailList[i].buildDetail.length>10) {
        //   this.detailList[i].msg = "您输入的长度有误";
        //   isCheckPass = false;
        // }
         else {
          this.detailList[i].msg = null;
        }

        if(this.detailList[i].buildSize&&this.detailList[i].error){
          isCheckPass = false;
        }else{
          this.detailList[i].error = null;
        }
      }
      return isCheckPass
    },
    temporarilySave() { // 暂存
      let isCheckPass = this.checkLen()
      if(isCheckPass){
        this.getParam();
        this.api.updateTaskBaseInfo({
            projectDO: this.formLabelAlign,
            taskBaseInfoDO: this.baseForm,
            taskFileArr: [],
            type: "1"
          })
          .then(res => {
            if (res.code == 0) {
              this.baseForm.taskId = res.data;
              this.$message("已保存,若需填写下一页,请点击设计依据!");
            } else {
              this.$message(res.msg);
            }
          });
      }
      return isCheckPass
    },
    // 提交
    submit() {
      let checkForm = this.checkForm();
      this.baseForm.projectId = this.$route.query.id;
      if (checkForm) {
        this.getParam();
        this.api
          .submitTaskBaseInfo({
            projectDO: this.formLabelAlign,
            taskBaseInfoDO: this.baseForm,
            taskFileArr: [],
            type: "1"
          })
          .then(res => {
            if (res.code == 0) {
              this.$message("操作成功");
              this.baseForm.taskId = res.data;
            } else {
              this.$message(res.msg);
            }
          });
      }
      return checkForm;
    },
    //查建筑类型
    getDict() {
      this.api.buildingType("building_type").then(res => {
        this.projectTypeList = res.data;
      });
    },
    getTProvince(value){
      // 获取地址
      if(value){
        this.address1Options[0].selected=false
      }
      this.api.getTProvince().then(res => {
        this.provinceList = res.data;
        for (let i = 0; i < this.provinceList.length; i++) {
           let pl = {
              text: this.provinceList[i].label,
              value: this.provinceList[i].value,
            };
          if(value==this.provinceList[i].value){
            pl.selected = true
          }else{
            pl.selected = false
          }
          this.address1Options.push(pl);
        }
      });
    },
    init() {
      //获取建筑类型
      this.getDict();
      
      this.api.seekTaskBaseInfo(this.$route.query.id).then(res => {
        if (res.code == 0) {
           // 1 代写任务书
            // 2 二审通过
            // 3 提交
          if (res.data.projectDO.hasTaskFile == 3||
          (res.data.tbTaskDO&&res.data.tbTaskDO.auditState==5)||
          (res.data.taskBaseInfoDO&&res.data.taskBaseInfoDO.auditState&&res.data.taskBaseInfoDO.auditState!=3)) {
            this.disabled = true;
          }
          let tbTaskDO = res.data.tbTaskDO;
          this.formLabelAlign = res.data.projectDO;
          this.formLabelAlign.arcModel = res.data.projectDO.arcModel?res.data.projectDO.arcModel:"";
          this.formLabelAlign.ydModel = res.data.projectDO.ydModel?res.data.projectDO.ydModel:"";
          this.formLabelAlign.desc = res.data.projectDO.desc?res.data.projectDO.desc:"";
          this.formLabelAlign.designDescribe= res.data.projectDO.designDescribe?res.data.projectDO.designDescribe:"";
          this.formLabelAlign.desc = !this.formLabelAlign.desc? "": this.formLabelAlign.desc;
          this.baseForm.projectName = !res.data.projectDO.projectName?"":res.data.projectDO.projectName;
          this.startDate.time = res.data.projectDO.beginTime;
          this.endDate.time = res.data.projectDO.endTime;
          this.projectDate.time = res.data.projectDO.releaseDate;
          this.releaseTime.time = res.data.projectDO.releaseTime;
          let buildList = [];
          let projectBuildType = [];
          for (let key in this.formLabelAlign.projectBuildTypes) {
            projectBuildType = key.split("|");
            this.selectedProjectType.push(projectBuildType[0]);
            let build_item = {};
            this.parentidList.push(projectBuildType[1]);
            build_item.name = this.formLabelAlign.projectBuildTypes[key];
            build_item.key = projectBuildType[0];
            buildList.push(build_item);
            this.$set(
              this.buildingTypeList,
              projectBuildType[0],
              this.formLabelAlign.projectBuildTypes[key]
            );
          }
          this.buildList = buildList; //包含内容Map
          if(this.formLabelAlign.buildDetail){
            this.selectedBuildType = this.formLabelAlign.buildDetail.replace(/[&]/g, ",").split(",");
          }
          this.detailList = [];
          if(this.formLabelAlign.buildDetail){
            let buildDetail = this.formLabelAlign.buildDetail.split("&");
            let buildSize = this.formLabelAlign.buildSize.split("&");
            for (let j = 0; j < this.selectedProjectType.length; j++) {
              let buildDetail2 = buildDetail[j].split(",");
              let buildSize2 = buildSize[j].split(",");
              for (let k = 0; k < buildDetail2.length; k++) {
                let param = {
                  id: this.parentidList[j],
                  parent: this.selectedProjectType[j],
                  buildDetail: buildDetail2[k],
                  buildSize: buildSize2[k],
                  display: true,
                  error: "",
                  msg: ""
                };
                this.detailList.push(param);
              }
            }
          }
          if(this.formLabelAlign.buildType){
            this.formLabelAlign.buildType = this.formLabelAlign.buildType.replace(/[&]/g, ",").split(",");
          }
          if (res.data.taskBaseInfoDO) {
            this.baseForm = res.data.taskBaseInfoDO;
            this.baseForm.east = res.data.taskBaseInfoDO.east?res.data.taskBaseInfoDO.east:"";
            this.baseForm.west = res.data.taskBaseInfoDO.west?res.data.taskBaseInfoDO.west:"";
            this.baseForm.south = res.data.taskBaseInfoDO.south?res.data.taskBaseInfoDO.south:"";
            this.baseForm.north = res.data.taskBaseInfoDO.north?res.data.taskBaseInfoDO.north:"";
            this.baseForm.projectName = !res.data.projectDO.projectName?"":res.data.projectDO.projectName;
            this.landDescOptions =  [
                  { text: "请选择地形条件", value: null,disabled:true, selected: true },
                  { text: "平地", value: "平地", selected: false },
                  { text: "坡地", value: "坡地", selected: false },
                  { text: "山地", value: "山地", selected: false }
              ]
            this.landDescOptions.forEach((item, index) => {
              if ( item.value == this.baseForm.landDesc ) {
                this.$set(this.landDescOptions[index],"selected",true)
              } else {
                this.$set(this.landDescOptions[index],"selected",false)
              }
            });
            let dependFormCopy = JSON.parse(JSON.stringify(this.baseForm));
            this.getTProvince(dependFormCopy.address1)
            this.getCity(dependFormCopy.address1);
            this.getCounty(dependFormCopy.address2);
          } else {
            this.landDescOptions =  [
                { text: "请选择地形条件", value: null,disabled:true, selected: true },
                { text: "平地", value: "平地", selected: false },
                { text: "坡地", value: "坡地", selected: false },
                { text: "山地", value: "山地", selected: false }
            ]
            this.getTProvince("")
          }
        }
      });
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.detial-info-warp {
  .w712{
    width: 44.5rem;
  }
  .w347{
    width: 21.6875rem;
  }
  .w161{
    width: 10.0625rem;
  }
  .pr48{
    margin-right:3rem; 
  }
  .pr20{
    margin-right: 1.25rem;
  }
  .form-mdb-row {
    margin-bottom: 2rem;
  }
  .project-type{
    cursor: pointer;
    width: auto;
    display:inline-block;
    padding: 0.375rem 1rem;
    // height: 32px;
    border-radius: 1rem;
    border:1px solid #4285f4;
    color: #4285f4;
    text-align: center;
    margin-bottom: 1.25rem;
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
    .form-check-label:hover{
      background: #f2f2f2;
    }
  }
  #projectTs {
    display: flex;
    align-items: center;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow: hidden;
    .form-check-label:before{
      display: none;
    }
   
    .form-check {
      margin-right: 0;
      margin-bottom: 1.25rem;
      padding-left: 0;
      padding-right: 1.375rem;
      flex: 0 0 1 !important;
      .form-check-label{
        padding-left: 0 !important;
        border: 1px solid #d9d9d9;
        padding: 0.5rem 1.25rem !important;
        border-radius: 0.25rem;
        height: auto;
      }
      .select-build-type{
        border:1px solid #4285f4;
      }
    }
  }
  .tip-error {
    color: red;
  }
  .date-box{
    position: relative;
    .label-date{
      z-index: 5;
      position: absolute;
      color: #999;
      padding-left: 0.3125rem;
      padding-right: 0.3125rem;
      left: 0.5rem;
      top: 0.625rem;
      font-weight: 500;
      background: #ffffff;
      font-size: 0.75rem !important;
      transform: translateY(-100%);
    }
  }
}
</style>
<style lang="less">
.detial-info-warp {
  #time {
    .md-form {
      margin-top: 0 !important;
      margin-bottom:0 !important;
      input {
        width: 20.9375rem;
        padding: 0.375rem;
        line-height: 2.1875rem;
        font-size: 1rem;
        box-shadow: none !important;
        border: 1px solid #dadce0  !important;
        border-radius: 0.25rem  !important;
        color: rgb(95, 95, 95);
        margin-bottom: 0;
      }
    }
  }
  .select-wrapper input.select-dropdown{
    font-size: 0.875rem;
    margin-bottom: 0;
  }
  .select-wrapper {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
  ul.select-dropdown li:after{
    min-height: 0 !important;
    display: none;
  }
  .cov-vue-date{
    input{
      width: 100% !important;
      height: 3.125rem;
    }
  }
   .week ul li{
     min-height: 14.2% !important;
   }
  .week ul li::after{
    height: 0;
    display: none;
  }
  .datepickbox{
    input{
      box-shadow: none !important;
      border: 0.0625rem solid #dadce0  !important;
      border-radius: 0.25rem  !important;
    }
  }
  .dropdown-content li{
    min-height:2.1875rem !important;
  }
  .dropdown-content li::after{
    height: 0;
    display: none;
  }
  #time .form-control.timepicker {
    margin-right: 0 !important;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>

