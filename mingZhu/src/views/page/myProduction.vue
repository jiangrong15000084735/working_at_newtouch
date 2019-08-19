<template>
  <div  class="myProduction" v-loading.fullscreen.lock="fullscreenLoading">
    <mdb-container>
      <!-- <mdb-row v-if="list.length>0">
        <mdb-col md="4">
          <h5 class="font-weight-bold mt-3 mb-3 h5">
            <strong>{{list.length}}个作品</strong>
          </h5>
        </mdb-col>
      </mdb-row> -->
      <mdb-row style="padding-top:0.9375rem;">
        <template v-if="list.length>0">
          <mdb-col md="4" v-for="(item,index) in list" :key="index" 
          >
            <div @click="caseDetails(item.id)"
            class="boxWrapper"
              
            >
              <mdb-card personal class="img-wrapper">
                <div 
                class="img-item" 
                :style="{backgroundImage: 'url(' + item.pictureUrls + ')'}">
                  <div class="marker-wrapper">
                    <a class="card-meta title"><span><mdb-icon icon="map-marker-alt" class="icon-marker" />{{item.constructionSite}}</span></a>
                  </div>
                </div>
                <mdb-card-body class="title-wrapper">
                  <p class="card-meta cardTitle">{{item.caseName}}</p>
                  <mdb-card-text class="cardTitle">{{item.photoNum}}张照片</mdb-card-text>
                </mdb-card-body>
                <mdb-icon 
                v-show="(item.auditState!=5||statusNum>3) && list.length>3"
                @click.native.stop="deleteProject(item)"
                class="times-circle"  far icon="trash-alt" />
              </mdb-card>
              <div class="mask" v-show="item.auditState!=5"></div>
            </div>
          </mdb-col>
        </template>
        <mdb-col md="4" class="upload-parent">
          <div @click="showModal" class="text-center w-100 border z-depth-1">
            <mdb-row class="align-items-center"  style="height: 15.3125rem;">
              <mdb-col md="12">
                <img src="@/assets/images/artUpLoad.png"/>
                <div>
                  <mdb-btn size="sm" class="mx-0 my-0 upLoadBtnSm" color="primary">
                    上传作品
                  </mdb-btn>
                </div>
              </mdb-col>
            </mdb-row>
            
            
          <!-- <el-upload
              class="uploadCase upload-wrapper"
              list-type="picture-card"
              :action="api.upload()"
              :disabled="true"
              >
              <i class="el-icon-circle-plus-outline">
                  <span class="uploadIDCardTips"
                  >上传作品</span>
              </i>
          </el-upload> -->
          </div>
        </mdb-col>
      </mdb-row>
      <mdb-row class="text-center">
        </mdb-row>
    </mdb-container>


    <!-- 项目作品上传弹出框 -->
    <!-- Central Modal Medium Success -->
    <mdb-modal size="lg" v-if="show" class="modalwrapper modalwrapperLg" info @close="clearForm">
      <mdb-modal-header :close="false" class="text-center">
        <p class="heading" style="width: 100%;">上传作品</p>
        <!-- <a class="close1"  @click="clearForm">×</a> -->
      </mdb-modal-header>
      <mdb-modal-body  class="text-center px-5">
        <form >
          <mdb-row>
            <mdb-col md="6" class="pr-4">
              <!-- <p class="caseName addRedCricle" style="text-align:left;">作品名称</p> -->
              <!-- <input type="text" class="form-control" id="validationCustomUsername" placeholder="Username" aria-describedby="inputGroupPrepend" required> -->
              <!-- <mdb-input required v-model.trim="desginerCase.caseName" class="mb-3" basic></mdb-input> -->
              <!-- Material input -->
              <!-- <mdb-input class="my-3" label="作品名称" v-model.trim="desginerCase.caseName"/> -->
              <div class="outline-input mb-4">
                <mdb-input
                type="text"
                size="lg" 
                label="作品名称"
                v-model.trim="desginerCase.caseName"
                outline />
                </div>
              <!-- <el-form-item label="作品名称" prop="caseName">
                <el-input v-model="desginerCase.caseName"></el-input>
              </el-form-item>-->
            </mdb-col>
            <mdb-col md="6" class="pl-4">
              <!-- <p class="caseName addRedCricle" style="text-align:left;">项目类型</p>
              <select
                class="browser-default custom-select"
                id="buildingType_label"
                v-model="desginerCase.buildingType"
              >
                <option
                  v-for="item in buildingTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value"
                >{{item.name}}</option>
              </select> -->
               <div class="md-outline-select">
                  <label class="label active">项目类型</label>
                  <mdb-select class="my-2" @getValue="handleChangeBuild" :options="buildingTypesOptions" />
               </div>
            </mdb-col>
          </mdb-row>

          <mdb-row>
            <mdb-col md="6" class="pr-4">
              <!-- <p class="addRedCricle" style="text-align:left;">建筑面积</p>
              <mdb-input type="number" :min="0" class="mb-3" basic v-model.trim="desginerCase.coveredArea"></mdb-input> -->
              <!-- <mdb-input class="my-3" label="建筑面积(平方米)" v-model.trim="desginerCase.coveredArea"/> -->
              <div class="outline-input mb-3">
                <mdb-input
                  type="text"
                  size="lg" 
                  label="建筑面积(平方米)"
                  v-model.trim="desginerCase.coveredArea"
                  @change="isNumChange"
                  outline />
                  </div>
              </mdb-col>
            <!-- <mdb-col md="2">
              <p class="mt-2" style="text-align:left;">平方米</p>
            </mdb-col> -->
            <mdb-col md="6" class="pl-4">
              <!-- <p class="addRedCricle" style="text-align:left;">完成时间</p> -->
              <!-- <div style="width:100%;" class="my-2"> -->
                 <div class="date-box">
                  <label class="label-date">完成时间</label>
                  <mdb-date-picker :limit="limit"  style="width:100%;" :date="finishTime" :option="option" @getValue="getPickerValue"></mdb-date-picker>
                 </div>
              <!-- </div> -->
            </mdb-col>
          </mdb-row>

          <mdb-row>
            <mdb-col md="6" class="pr-4">
               <div class="md-outline-select">
                  <label class="label active">建筑地点</label>
                  <mdb-select class="my-3" @getValue="handleChange" :options="cityBuildOptions" />
               </div>
              <!-- <mdb-row>
                <mdb-col md="6"> -->
                  <!-- <p class="addRedCricle" style="text-align:left;">建筑地点</p> -->
                  <!-- <select
                    v-model="getProvinceCity"
                    @change="handleChange(getProvinceCity)"
                    class="browser-default custom-select"
                  >
                    <option
                      v-for="(item,idx) in locations"
                      :key="idx"
                      :label="item.label"
                      v-bind:value="item.value"
                    ></option>
                  </select> -->
                  <!-- <mdb-select class="my-3" @getValue="handleChange" :options="cityBuildOptions" />
                </mdb-col>
                <mdb-col md="6">
                  <div> -->
                    <!-- <select
                      v-model="getProvinceTown"
                      class="browser-default custom-select"
                        >
                      <option
                        v-for="(item,idx) in getProvinceTownList"
                        :key="idx"
                        :label="item.label"
                        :value="item.value"
                      ></option>
                    </select> -->
                    <!-- <mdb-select :disabled="toenDisabled" class="my-3" @getValue="handleChangeTownOptions" :options="TownOptions" />
                  </div>
                </mdb-col>
              </mdb-row> -->
            </mdb-col>
            <mdb-col col="6">
              <div class="md-outline-select">
                  <label class="label active">建筑地点</label>
                  <mdb-select :disabled="toenDisabled" class="my-3" @getValue="handleChangeTownOptions" :options="TownOptions" />
              </div>
            </mdb-col>
          </mdb-row>

          <mdb-row>
            <mdb-col md="12" class="mt-2">
              <p class="" style="text-align:left;">上传图片&nbsp;<span class="addRedCricle"></span></p>
              <ul class="clearfix upCaseImg">
                    <li class="fl imgWrapper" v-for="(item,index) in upLoadCaseImg" :key="index">
                      <div class="imgBox">
                        <img width="100%" height="100%" :src="item.url" alt>
                      </div>
                      <mdb-btn @click="imgNameDiaolg(item,index,0)" type="button" color="primary" style="padding:0.5rem" size="sm">图片名称</mdb-btn>
                      <mdb-btn @click="imgNameDiaolg(item,index,1)" type="button" color="primary" style="padding:0.5rem" size="sm">图片描述</mdb-btn>
                      <!-- <mdb-input label="名字" v-model="item.pictureName" @input="handleInput"></mdb-input>
                      <mdb-input label="描述" v-model="item.description" @input="handleInputDesc" /> -->
                      <span class="removeIcon" @click="removeCaseImg(item)">&times;</span>
                    </li>
                    <li class="fl">
                      <el-upload
                        class="uploadIdCard fl"
                        list-type="picture-card"
                        :action="api.upload()"
                        :show-file-list="false"
                        :before-upload="beforeCaseUpload"
                        :on-success="upLoadCaseSuccess"
                        accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
                        ref="upload"
                      >
                        <i class="el-icon-circle-plus-outline">
                            <span class="uploadIDCardTips"
                            >上传图片</span>
                        </i>
                      </el-upload>
                    </li>
                  </ul>
            </mdb-col>
          </mdb-row>

          <mdb-row>
            <mdb-col md="12" class="mt-2">
              <p class="" style="text-align:left;">作品介绍&nbsp;<span class="addRedCricle"></span></p>
            </mdb-col>
          </mdb-row>
          <mdb-row>
            <mdb-col md="12">
              <!-- <mdb-textarea :rows="5" v-model="desginerCase.caseDetail" label="请输入内容"></mdb-textarea> -->
              <div class="outline-input my-3">
                <mdb-input 
                type="textarea" 
                label="请输入内容" 
                :rows="5" 
                v-model="desginerCase.caseDetail"
                outline 
                />
              </div>
            </mdb-col>
          </mdb-row>
          <mdb-row>
            <mdb-col md="12" class="my-2">
              <p class="" style="text-align:left;">建筑风格&nbsp;<span class="addRedCricle"></span></p>
            </mdb-col>
          </mdb-row>
          <mdb-row style="padding:0 44px;">
            <mdb-col md="4"  v-for="item in hotTags" :key="item.value">
              <form-inline>
                <div class="checkbox-teal">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    name="projectType"
                    :id="item.id"
                    :value="item.id"
                    @change="getCheckType(item.value,item.name)"
                    required
                  />
                  <label class="form-check-label" :for="item.id">{{item.name}}</label>
                </div>
              </form-inline>
            </mdb-col>
          </mdb-row>
        </form>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <!-- <div class="submit-btn"> -->
          <mdb-btn color="primary" @click="sucessUpLoadCase">确 定</mdb-btn>
          <mdb-btn outline="primary" @click="cancelUpLoadCase">取 消</mdb-btn>
        <!-- </div> -->
      </mdb-modal-footer>
    </mdb-modal>
     <imgdialog ref="dialog" :type="imgType" :disabled="false" :isshow="titlehide" :dialogItem="dialogItem" @saveDialog="saveDialog" @hideDialog="hideDialog"></imgdialog>

    <mdb-modal size="md" v-if="isDelete" @close="isDelete=false" info>
      <mdb-modal-header class="text-center">
        <p class="heading w-100">提示</p>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-container center>
          <mdb-icon icon="bell" size="4x" class="animated rotateIn mb-4"/>
          <p>
            确认要删除该作品吗？
          </p>
        </mdb-container>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn @click="endDelete" color="primary">确定</mdb-btn>
        <mdb-btn @click="isDelete=false" outline="primary">取消</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>

<script>
import imgdialog from '@/components/imgdialog'
export default {
  components:{
    imgdialog
  },
  computed:{
    toenDisabled:function() {
      if(this.getProvinceCity&&this.getProvinceCity!='830000'){
        return false
      }else{
        return true
      }
    }
  },
  data() {
    return {
      limit: [{
          type: 'weekday',
          available: [1, 2, 3, 4, 5, 6, 0]
        },
        {
          type: 'fromto',
          from: '', 
          to: new Date()
      }],
      fullscreenLoading: false,
      imgType:0,
      imgIndex:"",
      dialogItem:"",
      titlehide:false,
      show: false,
      isDelete:false,
      deleteId:'',
      id: '',
      list: [],
      caseType: '',
      option: { 
        type: 'day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY/MM/DD',
        placeholder: '完成时间',
        inputStyle: {
          'width': '100%',
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '16px',
          'border': '2px solid #fff',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '2px',
          'color': '#5F5F5F'
        },
        color: {
          header: 'primary',
          headerText: 'white',
          checkedDay: 'primary'
        },
        buttons: {
          ok: '确定',
          cancel: '取消',
          today:'Today',
        }
      },
      getProvinceCity: "",
      getProvinceTown: "",
      getProvinceTownList: [],
      getProvinceCityBuild: "",
      getProvinceTownBuild: "",
      getProvinceTownListBuild: [],
      locations: [],
      buildingTypes: [], // 建筑类型集合（自己定义的）
      designerSerial: "", // 设计师平台编号
      desginerCase: {
        // 上传项目作品的数据
        caseLocation: [], // 建筑地点
        // caseLocationOther: "", // 建筑地点(其他)
        // showCaseLocationOther: false,
        auditState: 1,
        buildingType: '', // 建筑类型int类型
        caseDetail: "", // 作品详情
        caseName: "", // 作品名称
        caseType: [], // 作品类型（0代表设计机构作品，1代表设计师作品）
        coveredArea: "", // 建筑面积
        designerId: null, // 设计师id
        designerSerial: "", // 设计师平台编号
        finishTime: null, // 完成时间
        hotLabel: "", // 热标签
        // id: 0,
        pictureArray: [], // 图片路径
        pictureName: "", // 上传的图片名称
        desginerCase: "" // 上传的图片名称
      },
      finishTime: {
        date: ''
      },
      upLoadCaseImg: [], // 图片名称地址（自己定义的）
      hotTags: [], //热门标签
      hotLabels: [], //热门标签（自己定义的）
      paginationPage: {
        page: 1,
        total: 2,
        limit: 1,
        pageSize: 999
      },
      cityBuildOptions: [
        { text: '请选择建筑地点', value: null, disabled: true, selected: true },
      ],
      TownOptions: [
        { text: '请选择建筑地点', value: null, disabled: true, selected: true },
      ],
      buildingTypesOptions: [
        { text: '请选择项目类型', value: null, disabled: true, selected: true }
      ],
      statusNum:0
    }
  },
  methods: {
    isNumChange(value) {
      if(value){
        this.desginerCase.coveredArea = value.replace( /[^0-9\.]/g,'')
      }
    },
    // 图片弹框
    imgNameDiaolg(item,index,type) {
      this.titlehide = true
      this.dialogItem = item
      this.imgIndex = index
      this.imgType = type
      this.$refs.dialog.upDateVal(item,type)
    },
    hideDialog(){
       this.titlehide = false
    },
    saveDialog(item){
      this.upLoadCaseImg[this.imgIndex] = item
       this.titlehide = false
    },
    getProductionList(id) {
      let params = {
        buildingType: '',
        // auditState:'',
        designerId: id,
        page: this.paginationPage.page,
        pageSize: this.paginationPage.pageSize
      }
      this.api.queryListByDesignerId(params).then(res => {
        this.list = res.desginerCases
        this.statusNum=0
        this.list.map((item) => {
          if(item.auditState==5){
            this.statusNum++
          }
        })
      })
    },
    caseDetails(id) {
      let { href } = this.$router.resolve({
        name:"CaseDetails",
        query:{
          caseId: id
        }
      })
      window.open(href, "_blank");
      // this.$router.push({
      //     name: "CaseDetails",
      //     query: {
      //       caseId: id
      //     }
      //   });
    },
    showModal() {
      this.show =true
      document.querySelector('body').setAttribute('style', 'overflow-y:hidden;font-size:16px;')
    },
    handleChangeBuild(value) {
      this.desginerCase.buildingType = value
    },
    handleChangeCityBuild(value) {
      this.getProvinceCity = value
    },
    handleChangeTownOptions(value){
      this.getProvinceTown = value
    },
    // 项目类型
    getBuildingTypes() {
      this.api.getBuildingTypes().then(res => {
        if (res.code !== 0) {
          return;
        }
        this.buildingTypes = res.data;
        let selpotions = [{ text: '请选择项目类型', value: null, disabled: true, selected: true }]
        if(res.data){
          res.data.map((item) => {
            selpotions.push({
              text:item.name,
              value:item.value,
              selected:false
            })
          })
        }
        this.buildingTypesOptions = selpotions
      });
    },
    // 获得省
    getProvince() {
      this.api.projectGetProvince().then(res => {
        if (res.code === 0) {
          this.locations = res.data;
          let selpotions = [{ text: '请选择建筑地点', value: null, disabled: true, selected: true }]
          if(res.data){
            res.data.map((item) => {
              selpotions.push({
                text:item.label,
                value:item.value,
                selected:false
              })
            })
          }
          this.cityBuildOptions = selpotions
        }
      });
    },
    handleChange(value) {
      this.getProvinceCity = value
      this.getProvinceTown = '';
      this.handleChangeTown(value);
    },
    handleChangeTown(value) {
      if (value == "830000") {
        this.getProvinceTownList = [];
      } else {
        this.locations.forEach(item => {
          if (item.value == value) {
            this.getProvinceTownList = item.children;
            let selpotions = [{ text: '请选择建筑地点', value: null, disabled: true, selected: true }]
            if(item.children){
              item.children.map((item) => {
                selpotions.push({
                  text:item.label,
                  value:item.value,
                  selected:false
                })
              })
            }
            this.TownOptions = selpotions
          }
        });
      }
    },
    getPickerValue (value) {
      this.desginerCase.finishTime = value
    },
    // ==========================上传项目作品 ===============
    handleInput(value) {
      if(value.indexOf(',') !=-1){
        this.$message.error("图片名字不允许特殊字符“,”");
      }
    },
    handleInputDesc(value) {
      if(value.indexOf('|') !=-1){
        this.$message.error("图片名字不允许特殊字符“|”");
      }
    },
    // 项目作品图片上传钱的验证
    beforeCaseUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < this.$isLt10M;
      if (!isLt5M) {
        this.$message.error(`上传图片大小不能超过 ${this.$isLt10M}MB!`);
      }
      return isLt5M;
    },
    // 项目作品图片上传成功

    upLoadCaseSuccess(res, file) {
      let fileName = res.msg;
      this.desginerCase.pictureArray.push(fileName);
      let name = file.name.slice(0, file.name.lastIndexOf("."));
      this.desginerCase.pictureName =
        this.desginerCase.pictureName +
        (this.desginerCase.pictureName === "" ? name : "," + name);

      this.api
        .getUrl({
          fileName: fileName
        })
        .then(res => {
          if (res.code !== 0) {
            return;
          }
          this.upLoadCaseImg.push({
            name: fileName,
            pictureName: name,
            url: res.msg,
            description: ''
          });
        });
    },
    removeCaseImg(obj) {
      this.desginerCase.pictureArray = this.desginerCase.pictureArray.filter(
        function(item) {
          return item !== obj.name;
        }
      );
      this.upLoadCaseImg = this.upLoadCaseImg.filter(function(item) {
        return item.name !== obj.name;
      });
      this.desginerCase.pictureName = this.desginerCase.pictureName
        .split(",")
        .filter(function(item) {
          return item !== obj.pictureName;
        })
        .join(",");
    },
    // 热门标签
    getHotLabel() {
      this.api.getHotLabel().then(res => {
        if (res.code !== 0) {
          return;
        }
        this.hotTags = res.data;
       
      });
    },
    getCheckType(val, name) {
      let hotArr = this.hotLabels;
      let removeIdx = null;
      for (let index = 0; index < hotArr.length; index++) {
        if(hotArr[index] == val) {
          removeIdx = index;
        }
      }
      if(removeIdx!=null){
        this.hotLabels.splice(removeIdx,1);
      }else{
        this.hotLabels.push( val );
      }
    },
    // 点击模太框确定按钮上传项目作品完成
    sucessUpLoadCase() {
      console.log(this.desginerCase)
      
      if(!this.desginerCase.caseName){
         this.$message.error("请输入作品名称");
        return;
      }
      if(!this.desginerCase.buildingType){
         this.$message.error("请选择项目类型");
        return;
      }
      if(!this.desginerCase.coveredArea){
         this.$message.error("请输入建筑面积");
        return;
      }
      
      let regNum=/^[0-9\.]*$/
      if(this.desginerCase.coveredArea>0){
      }else{
        this.$message.error("建筑面积只能是数字");
        return;
      }
      // if(!regNum.test(this.desginerCase.coveredArea)){
      //   this.$message.error("建筑面积只能数数字");
      //   return;
      // }
      if(!this.desginerCase.finishTime){
        this.$message.error("请选择完成时间");
        return;
      }
      if(this.getProvinceCity=="830000"){
        // if(!this.desginerCase.caseLocationOther){
        //   this.$message.error("请输入建筑地址");
        //   return;
        // }
      }
      else if(!this.getProvinceCity||!this.getProvinceTown){
        this.$message.error("请选择建筑地址");
        return;
      }
      let picUrlArr = [],
          picName = [],
          picDesc = [];
      this.upLoadCaseImg.map((item) => {
         picUrlArr.push(item.name);
         picName.push(item.pictureName);
         picDesc.push(item.description);
      })
      let hasComma = false;
      let hasPipeSymbol = false;
      for (let index = 0; index < picName.length; index++) {
        if(picName[index].indexOf(',') !=-1 || picName[index] ==""){
          hasComma = true;
          break;
        }
        if(picDesc[index].indexOf('|') !=-1){
          hasPipeSymbol = true;
          break;
        }
      }
      if(hasComma){
          this.$message.error("图片名字不允许特殊字符“,”或者为空");
          return;
      }
      if(hasPipeSymbol){
        this.$message.error("图片描述不允许特殊字符“|”");
        return;
      }
      this.desginerCase.designerId = this.id;
      this.desginerCase.pictureArray = picUrlArr;
      this.desginerCase.pictureName = picName.join(',');
      this.desginerCase.pictureDetail = picDesc.join('|');
      if(this.getProvinceCity){
        this.desginerCase.caseLocation = [this.getProvinceCity,this.getProvinceTown];
      }
      if ( this.desginerCase.pictureArray.length < 3 ) {
        this.$message.error("项目图片至少3张，请调整上传内容");
        return;
      }
      if ( !this.desginerCase.caseDetail ) {
        this.$message.error("请输入作品介绍");
        return;
      }
      if ( this.desginerCase.caseDetail.length<500 ) {
          this.$message.error("作品介绍至少500个字");
        return;
      }
      if ( !this.hotLabels.join(",") ) {
          this.$message.error("请选择热门标签");
        return;
      }

      let params = {
        ...this.desginerCase,
        hotLabel: this.hotLabels.join(","),
        designerSerial: this.designerSerial,
        constructionCity: (this.desginerCase.caseLocation[0] == "830000"
          ? [
              '830000'
            ]
          : this.desginerCase.caseLocation
        ).join(",")
      };
      this.fullscreenLoading = true
      // 如果通过验证 to do...
      this.api.addCase(params).then(res => {
        if (res.code === 0) {
          this.$message("项目作品上传完成");
          this.getProductionList(this.id)
          this.clearForm();
        }
        this.fullscreenLoading = false
      });
    },
    // 取消作品上传
    cancelUpLoadCase() {
      this.clearForm();
    },
    clearForm() {
      document.querySelector('body').setAttribute('style', 'font-size:16px;')
      this.$refs.upload.clearFiles();
      this.upLoadCaseImg = [];
      this.show = false;
      this.finishTime.time = '';
      this.getProvinceCity = '';
      this.getProvinceTown = '';
      this.getProvinceTown = '';
      this.buildingTypesOptions.map((item) => {
        if(item.value == null){
          item.selected = true
        }else{
          item.selected = false
        }
      })
      this.cityBuildOptions.map((item) => {
        if(item.value == null){
          item.selected = true
        }else{
          item.selected = false
        }
      })
      let selpotions = [{ text: '请选择建筑地点', value: null, disabled: true, selected: true }]
      this.TownOptions = selpotions
      this.hotLabels = [];
      this.desginerCase = {
        // 上传项目作品的数据
        caseLocation: [], // 建筑地点
        // caseLocationOther: "", // 建筑地点(其他)
        // showCaseLocationOther: false,
        auditState: 1,
        buildingType: "", // 建筑类型int类型
        caseDetail: "", // 作品详情
        caseName: "", // 作品名称
        caseType: [], // 作品类型（0代表设计机构作品，1代表设计师作品）
        coveredArea: "", // 建筑面积
        designerId: null, // 设计师id
        designerSerial: "", // 设计师平台编号
        finishTime: null, // 完成时间
        hotLabel: "", // 热标签
        // id: 0,
        pictureArray: [], // 图片路径
        pictureName: "", // 上传的图片名称
        desginerCase: "" // 上传的图片名称
      }
    },
    getParams() {
      this.designerSerial =JSON.parse(localStorage.getItem("userInfo")).designerSerial 
                          ||
                          JSON.parse(sessionStorage.getItem("userInfo")).designerSerial
      this.id = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    },
    // 删除作品
    deleteProject(item) {
      this.deleteId = item.id
      this.isDelete = true
    },
    endDelete(){
      this.api.removeCase({id: this.deleteId}).then(res => {
        if(res.code != 0){
          this.$message.error(res.msg)
          return
        }
        this.isDelete = false
        this.$message("删除成功")
        this.getProductionList(this.id)
      })
    }
  },
  mounted() {
    this.getParams();
    this.getProductionList(this.id)
    // 项目类型
    this.getBuildingTypes()
    // 获得省
    this.getProvince()
    // 热门标签
    this.getHotLabel()
  }
};
</script>
<style lang="less" scoped>
  .myProduction{
    .boxWrapper{
      position:relative;
      display: flex;
      justify-content: center;
    }
    .mask{
      position: absolute;
      top:0;
      // width: 19.25rem;
      width: 100%;
      height: 15.4375rem;
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
  .product-num{
    width: 19.25rem;
    margin: auto;
    font-size: 1.875rem;
    font-weight: 300;
  }
  .img-wrapper{
    margin: auto;
    margin-bottom: 1.5625rem;
    height: 19.25rem;
    // width: 19.25rem;
    width: 100%;
    cursor: pointer;
    box-shadow: none;
    // border: 1px solid #d6d6d6;
    border-radius: 0;
    position: relative;
    .img-item{
      position: relative;
      background-size:100% 100%;
      background-repeat: no-repeat;
      width: 100%;
      height: 15.3125rem;
      font-size: 0;
    }
    .times-circle{
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 0.9375rem 0.625rem 0.625rem;
      color: #4285f4;
      font-size: 1.2rem;
    }
  }
  .img-wrapper:hover{
    box-shadow: 0 0 2px #ccc;
  }
  .img-wrapper:hover .cardTitle{
    color: #2d9b00;
  }
  .marker-wrapper{
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0.3125rem 0.9375rem 0.3125rem 0.9375rem;
    background-color: rgba(0,0,0,0.4);
    font-weight: bold;
    font-size: 0.86rem;
  }
  .icon-marker{
    margin-right: 0.5rem;
  }
  .title{
    color: #fff!important;
  }
  .card-body{
    padding: 0.9375rem 0.625rem 0.625rem;
    background: rgba(255,255,255,0.96)
  }
  .title-wrapper{
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .cardTitle{
    line-height: 1.1875rem;
    color: #333;
    font-size: 0.8125rem;
  }
  .cardTitle:nth-child(1){
    color: #333;
    font-weight: bold;
    font-size: 0.875rem;
  }
  .upLoadCaseWarpper{
    justify-content: center;
    display: flex;
  }
  .upLoadCaseImgs{
    display: inline-block;
    height: 19.25rem;
    width: 19.25rem;
  }
  .el-icon-circle-plus-outline {
    transform: translateY(50%);
    .uploadIDCardTips {
      display: block;
    //  font-family: PingFangSC-Regular;
      font-size: 1.125rem;
      color: #333333;
      margin-top: 0.625rem;
    }
  }
  .upAloneCase {
  //  font-family: PingFangHK-Medium;
    font-size: 1.75rem;
    color: #606266;
    letter-spacing: 0;
    text-align: center;
  }
  .el-date-editor.el-input {
    width: 100%!important;
  }
  .imgWrapper{
    position: relative;
    .removeIcon{
    //  font-family: Arial, Helvetica, sans-serif;
      font-size: 1.875rem;
      position: absolute;
      width: 1.25rem;
      height: 1.25rem;
      text-align: center;
      line-height: 1.25rem;
      right: 0rem;
      top: -0.625rem;
      cursor: pointer;
    }
  }
  .imgBox{
    width: 148px;
    height: 148px;
  }
  .addRedCricle:before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
</style>
<style lang="less">
.upload-parent>div{
  text-align: center;
}
.upload-wrapper,.upload-wrapper .el-upload--picture-card{
  height: 19.25rem!important;
  width: 100%;
  max-width: 19.25rem!important;
  display: inline-block;
}
.upload-wrapper .el-icon-circle-plus-outline {
  margin-top: 5.625rem;
}
.modalwrapper .close{
  display: none;
}
.modalwrapper .close1{
  display: inline-block!important;
  padding:1rem;
  margin: -1rem -1rem -1rem auto;
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: .5;
}
.myProduction {
  .modalwrapperLg .modal-lg{
    background: #fff;
  }
  // .md-form label {
  // font-size: 1rem !important;
  // columns: #666666;
  // }
  // .md-form label.active {
  // font-size: 0.8rem !important;
  // }
  .day:not(.unavailable):hover {
      cursor: pointer;
      color: #000;
      font-weight: 500;
      background-color: #eee;
      border-radius:50%;
  }
  .button-box span:hover {
    background: #eee;
    color: #000;
  }
  // .md-form label{
  //   color:#000;
  // }
  .outline-input{
    .form-control{
      margin-bottom: 0;
    }
  }
}
.myProduction{
 .datepickbox{
    input{
      box-shadow: none !important;
      border: 0.0625rem solid #dadce0  !important;
      border-radius: 0.25rem  !important;
      height: 3rem !important;
    }
  }
}

</style>

