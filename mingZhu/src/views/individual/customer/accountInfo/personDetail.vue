<template>
  <mdb-container class="personDetail">
    <h5 class="font-weight-bold mt-3 mb-3 h5">
        <strong>个人履历</strong>
    </h5>
    <mdb-tab tabs color="primary" justify>
      <mdb-tab-item :active="pillsActive==0" @click.native.prevent="pillsActive=0">学习经历</mdb-tab-item>
      <mdb-tab-item :active="pillsActive==1" @click.native.prevent="pillsActive=1">个人荣誉</mdb-tab-item>
      <mdb-tab-item :active="pillsActive==2" @click.native.prevent="pillsActive=2">专业资历</mdb-tab-item>
    </mdb-tab>
    <mdb-tab-content>
      <mdb-tab-pane class="fade" key="show1" v-if="pillsActive==0">
        <mdb-row>
          <mdb-col col="11">
            <tbl bordered class="text-center">
              <tbl-head>
                <tr>
                  <th>学校名称</th>
                  <th>入学时间</th>
                  <th>毕业时间</th>
                  <th>取得学位</th> 
                  <th>学位证书附件</th>
                  <th>操作</th>
                </tr>
              </tbl-head>
              <tbl-body>
                <tr v-for="(item, index) in learningExperienceList" :key="item.id">
                  <th scope="row">{{item.school}}</th>
                  <td>{{item.timeOfEnrollment}}</td>
                  <td>{{item.graduationDate}}</td>
                  <td>{{item.major}}</td>
                  <td><img width="30" height="30" v-if="item.photoUrl" :src="item.photoUrl" alt=""></td>
                  <td><mdb-btn color="danger" size="sm" @click.native="deleteLearn(index,item.id)">删除</mdb-btn></td>
                </tr>
              </tbl-body>
            </tbl>
          </mdb-col>
          <mdb-col col="1">
            <span class="table-add float-right mt-2 mr-4" @click="modalLearn = true">
              <a href="#" class="text-success"><i class="fas fa-plus fa-2x" aria-hidden="true"></i></a>
            </span>
          </mdb-col>
        </mdb-row>
      </mdb-tab-pane>
      <mdb-tab-pane class="fade" key="show2" v-if="pillsActive==1">
        <mdb-row>
          <mdb-col col="11">
            <tbl bordered class="text-center">
              <tbl-head>
                <tr>
                  <th>荣誉名称</th>
                  <th>荣誉级别</th>
                  <th>授予机构</th>
                  <th>相关证明文件</th>
                  <th>操作</th>
                </tr>
              </tbl-head>
              <tbl-body>
                <tr v-for="(item, index) in personalHonorList" :key="item.id">
                  <th scope="row">{{item.honorName}}</th>
                  <td>{{item.honorLevel}}</td>
                  <td>{{item.issuingAuthority}}</td>
                  <td><img width="30" height="30" v-if="item.photoUrl" :src="item.photoUrl" alt=""></td>
                  <td><mdb-btn color="danger" size="sm" @click.native="deleteHonor(index,item.id)">删除</mdb-btn></td>
                </tr>
              </tbl-body>
            </tbl>
          </mdb-col>
          <mdb-col col="1">
            <span class="table-add float-right mt-2 mr-4" @click="modalHonor = true">
              <a href="#" class="text-success"><i class="fas fa-plus fa-2x" aria-hidden="true"></i></a>
            </span>
          </mdb-col>
        </mdb-row>
      </mdb-tab-pane>
      <mdb-tab-pane class="fade" key="show3" v-if="pillsActive==2">
        <mdb-row>
          <mdb-col col="6">
            <mdb-select @getValue="getSelectValue1" v-if="workLifes" :options="workLifes" />
            <label>工作年限</label>
          </mdb-col>
          <mdb-col col="6"></mdb-col>
        </mdb-row>
        <mdb-row>
          <mdb-col col="6">
            <mdb-select @getValue="getSelectValue2" v-if="qualifications" :options="qualifications" />
            <label>执业资格</label>
          </mdb-col>
          <mdb-col col="6">
            <div class="upbox">
              <span class="upimg fl" v-for="(item,index) in qualificationPhotoAdressList" :key="index">
                <img
                  :src="item"
                  alt>
              </span>
              <el-upload
                class="fl"
                :show-file-list="false"
                :before-upload="beforeFileUploadQualification"
                :action="api.upload()"
                :on-success="fileUploadSuccessQualification"
                accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
              >
                <i class="el-icon-document"></i>
              </el-upload>
              <span class="fl">上传文件</span>
            </div>
          </mdb-col>
        </mdb-row>
        <mdb-row>
          <mdb-col col="6">
            <mdb-select @getValue="getSelectValue3" v-if="qualificationTitles" :options="qualificationTitles" />
            <label>专业职称</label>
          </mdb-col>
          <mdb-col col="6">
            <div class="upbox">
              <span class="upimg fl" v-for="(item,index) in titlePhotoAdressList" :key="index">
                <img :src="item" alt>
              </span>
              <el-upload
                class="fl"
                :show-file-list="false"
                :before-upload="beforeFileUploadProfessionalTitle"
                :action="api.upload()"
                :on-success="fileUploadSuccessProfessionalTitle"
                accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
              >
                <i class="el-icon-document"></i>
              </el-upload>
              <span class="fl">上传文件</span>
            </div>
          </mdb-col>
        </mdb-row>
      </mdb-tab-pane>
    </mdb-tab-content>

    <h5 class="font-weight-bold mt-5 mb-5 h5">
      <strong>工作模式</strong>
    </h5>
    <mdb-container>
      <mdb-input
        type="radio"
        id="materialGroupExample01"
        name="materialGroupExample3"
        value="1"
        label="独立建筑师"
        v-if="teamType"
        :checked="teamType == '1'"
        @input="handleWorkModeChange"
      />
      <mdb-row v-if="teamType == '1'">
        <mdb-col col="4" class="px-5">
          <mdb-select color="primary" @getValue="getSelectValue" :options="scaleOptions" />
          <label>团队人员数量</label>
        </mdb-col>
        <mdb-col col="8">
          <div class="relfile">
            <div>相关证明文件附件（团队成员身份证、手机号码）</div>
            <div>
            <img
              v-for="(item,index) in filesAddress"
              :key="index"
              :src="item" alt>
            </div>
            <div>
            <el-upload
              class="fl"
              :show-file-list="false"
              :before-upload="beforeFileUploadAloneDesin"
              :action="api.upload()"
              :on-success="fileUploadSuccessAloneDesin"
              accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
            >
              <mdb-btn tag="a" color="success" floating icon="plus" iconLeft></mdb-btn>
            </el-upload>
            </div>
          </div>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <mdb-container>
      <mdb-input type="radio"
        id="materialGroupExample02"
        name="materialGroupExample3"
        value="2"
        label="建筑事务所或工作室"
        v-if="teamType"
        :checked="teamType == '2'"
        @input="handleWorkModeChange"
      />
      <mdb-row v-if="teamType == '2'">
        <mdb-col col="5" class="px-5">
          <!-- <mdb-select color="primary" @getValue="getSelectValue" :options="scaleOptions" /> -->
          <label for="bb">请填写您的建筑事务所或工作室名称</label>
          <mdb-input id="bb" v-model="teamScale"></mdb-input>
        </mdb-col>
        <mdb-col col="7">
          <div class="relfile">
            <div>相关证明文件附件（团队成员身份证、手机号码）</div>
            <div>
            <img
              v-for="(item,index) in filesAddress"
              :key="index"
              :src="item" alt>
            </div>
            <div>
            <el-upload
              class="fl"
              :show-file-list="false"
              :before-upload="beforeFileUploadAloneDesin"
              :action="api.upload()"
              :on-success="fileUploadSuccessAloneDesin"
              accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
            >
              <mdb-btn tag="a" color="success" floating icon="plus" iconLeft></mdb-btn>
            </el-upload>
            </div>
          </div>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <mdb-container>
      <mdb-input type="radio"
        id="materialGroupExample03"
        name="materialGroupExample3"
        value="3"
        label="院企设计团队"
        v-if="teamType"
        :checked="teamType == '3'"
        @input="handleWorkModeChange"
      />
      <mdb-row v-if="teamType == '3'">
        <mdb-col col="5" class="px-5">
          <!-- <mdb-select color="primary" @getValue="getSelectValue" :options="scaleOptions" />
          <label>团队人员数量</label> -->
          <label for="aa">请填写您的工作单位及所在部门名称</label>
          <mdb-input id="aa" v-model="teamScale"></mdb-input>
        </mdb-col>
        <mdb-col col="7">
          <div class="relfile">
            <div>相关证明文件附件（团队成员身份证、手机号码）</div>
            <div>
            <img
              v-for="(item,index) in filesAddress"
              :key="index"
              :src="item" alt>
            </div>
            <div>
            <el-upload
              class="fl"
              :show-file-list="false"
              :before-upload="beforeFileUploadAloneDesin"
              :action="api.upload()"
              :on-success="fileUploadSuccessAloneDesin"
              accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
            >
              <mdb-btn tag="a" color="success" floating icon="plus" iconLeft></mdb-btn>
            </el-upload>
            </div>
          </div>
        </mdb-col>
      </mdb-row>

      <mdb-row>
        <mdb-col md="4" offsetMd="4">
          <mdb-btn color="primary" @click="update">更 新</mdb-btn>
        </mdb-col>
      </mdb-row>
    </mdb-container>

    <mdb-modal size="md" v-if="modalLearn" @close="closeModalLearn">
      <mdb-modal-header class="text-center">
        <mdb-modal-title tag="h4" bold class="w-100">新增学习经历</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-container>
          <label for="school">学校名称</label>
          <input type="text" id="school" class="form-control" v-model="tempLearn.school">
          <br>
          <label for="inputPassword6">入学时间</label>
          <mdb-date-picker id="inputPassword6" :date="startDate" :option="option" @getValue="getPickerValue1"></mdb-date-picker>
          <br>
          <label for="inputPassword67">毕业时间</label>
          <mdb-date-picker id="inputPassword67" :date="startDate" :option="option" @getValue="getPickerValue2"></mdb-date-picker>
          <br>
          <label for="major">取得学位</label>
          <input type="text" id="major" class="form-control" v-model="tempLearn.major">
          <br>
          <label>学位证书附件</label>
          <el-upload
            class="upload-demo"
            :action="api.upload()"
            :before-upload="beforeUpload"
            :on-success="successUpLoad"
            accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
            :limit="1">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </mdb-container>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn color="secondary" @click.native="closeModalLearn">取消</mdb-btn>
        <mdb-btn color="primary" @click.native="addLearn">确定</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <mdb-modal size="md" v-if="modalHonor" @close="closeModalHonor">
      <mdb-modal-header class="text-center">
        <mdb-modal-title tag="h4" bold class="w-100">新增个人荣誉</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-container>
          <label for="honorName">荣誉名称</label>
          <input type="text" id="honorName" class="form-control" v-model="tempHonor.honorName">
          <br>
          <label for="inputPassword6">荣誉级别</label>
          <select class="browser-default custom-select" v-model="tempHonor.honorLevel">
            <option selected>请选择</option>
            <option value="国家级及以上">国家级及以上</option>
            <option value="地区及市一级">地区及市一级</option>
            <option value="其他">其他</option>
          </select>
          <br>
          <label for="issuingAuthority">授予机构</label>
          <input type="text" id="issuingAuthority" class="form-control" v-model="tempHonor.issuingAuthority">
          <br>
          <label>相关证明文件</label>
          <el-upload
            class="upload-demo"
            :action="api.upload()"
            :before-upload="beforeUpload"
            :on-success="successUpLoadHonor"
            accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
            :limit="1">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </mdb-container>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn color="secondary" @click.native="closeModalHonor">取消</mdb-btn>
        <mdb-btn color="primary" @click.native="addHonor">确定</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </mdb-container>
</template>

<script>
  export default {
    name: 'personDetail',
    data() {
      return {
        learningExperienceList: [], // 学习经历列表
        personalHonorList: [], //个人荣誉列表
        workLife: '1', // 工作年限
        qualification: '1', // 执业资格
        title: '1', // 专业职称
        teamType: '', // 团队类型
        teamScale: '', // 团队规模
        files: [], // 相关文件
        filesAddress: [], // 相关文件地址

        tempLearn: {
          school: '',
          timeOfEnrollment: '',
          graduationDate: '',
          major: '',
          quaPhoto: '',
          pic: ''
        },
        tempHonor: {
          honorLevel: "", // 荣誉级别
          honorName: "", // 荣誉名称
          issuingAuthority: "", // 授予机构
          honorPhoto: "", // 荣誉证书附件
          pic: "",  // 荣誉证书附件地址
        },
        workLifes: null, // 工作年限下拉
        qualifications: null, // 执业资格下拉
        qualificationTitles: null, //专业职称下拉
        qualificationPhotoList: [], // 职业资格上传相关证明文件名称
        qualificationPhotoAdressList: [], // 职业资格上传相关证明文件地址
        titlePhotoList: [], // 专业职称上传相关证明文件名称
        titlePhotoAdressList: [], // 专业职称上传相关证明文件地址
        pillsActive: 0, // 个人履历tab
        modalLearn: false,
        modalHonor: false,
        scaleOptions: [
          { text: "3", value: 1 , selected: true },
          { text: "5", value: 2 },
          { text: "8", value: 3 }
        ],//团队规模下拉

        startDate: {
          date: ''
        },
        option: {
          type: 'day',
          week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
          month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          format: 'YYYY-MM-DD',
          placeholder: '入学时间',
          inputStyle: {
            'width': '100%',
            'display': 'block',
            'padding': '6px',
            'line-height': '22px',
            'font-size': '16px',
            'border': '1px solid #ced4da',
            'color': '#5F5F5F',
            'border-radius': '.25rem'
          },
          color: {
            header: 'primary',
            headerText: 'white',
            checkedDay: 'primary'
          },
          buttons: {
            ok: '确定',
            cancel: '取消'
          }
        }
      };
    },
    mounted() {
      this.id = localStorage.getItem("userId") || sessionStorage.getItem("userId");
      this.getDesignerInfo()
    },
    methods: {
      getDesignerInfo() {
        this.api.getInfoByDesignerId({ id: this.id }).then(res => {
          if (res.code !== 0) {
            return
          }
          this.designerInfo = res.data
          this.learningExperienceList = res.data.learningExperienceList
          this.personalHonorList = res.data.personalHonorList
          this.workLife = res.data.workLife
          this.qualification = res.data.qualification
          this.title = res.data.title
          
          this.teamType = res.data.teamType
          
          if(this.teamType==1){
            this.teamScale = this.designerInfo.teamScale
            this.files = res.data.aloneArchitectFile.split(",")
          }
          if(this.teamType==2){
            this.teamScale = this.designerInfo.scale
            this.files = res.data.studioUploadFile.split(",")
          }
          if(this.teamType==3){
            this.teamScale = this.designerInfo.enterpriseTeamNumber
            this.files = res.data.enterpriseuploadFile.split(",")
          }
          
          this.chooseWorkLife();
          this.chooseQualification();
          this.chooseQualificationTitle();
        })
      },
      closeModalLearn(){
        this.modalLearn = false
        this.tempLearn = {
          school: '',
          timeOfEnrollment: '',
          graduationDate: '',
          major: '',
          quaPhoto: '',
          pic: ''
        }
      },
      closeModalHonor(){
        this.modalHonor = false
        this.tempHonor = {
          honorLevel: "", // 荣誉级别
          honorName: "", // 荣誉名称
          issuingAuthority: "", // 授予机构
          honorPhoto: "", // 荣誉证书附件
          pic: "",  // 荣誉证书附件地址
        }
      },
      // 点击工作年限的下拉框时从数据字典获取数据初始化工作年限
      chooseWorkLife() {
        this.api.getWorkLife(null).then(res => {
          if (res.code === 0) {
            let workLifes = res.data
            workLifes.map(item=>{
              item.text=item.name
              if(item.value == this.workLife){
                item.selected = true
              }
            });
            this.workLifes = workLifes
          }
        });
      },
      // 点击职业资格的下拉框时从数据字典获取数据初始化职业资格
      chooseQualification() {
        this.api.getQualification(null).then(res => {
          if (res.code === 0) {
            let qualifications = res.data
            qualifications.map(item=>{
              item.text=item.name
              if(item.value == this.qualification){
                item.selected = true
              }
            });
            this.qualifications = qualifications
          }
        });
      },
      // 点击专业职称的下拉框时从数据字典获取数据初始化职专业职称
      chooseQualificationTitle() {
        this.api.getQualificationTitle(null).then(res => {
          if (res.code === 0) {
            let qualificationTitles = res.data
            qualificationTitles.map(item=>{
              item.text=item.name
              if(item.value == this.title){
                item.selected = true
              }
            });
            this.qualificationTitles = qualificationTitles
          }
        });
      },
      getSelectValue1(value) {
        this.workLife = value
      },
      getSelectValue2(value) {
        this.qualification = value
      },
      getSelectValue3(value) {
        this.title = value
      },
      // 删除
      deleteLearn (index, id) {
        this.learningExperienceList.splice(index, 1)
      },
      deleteHonor (index, id) {
        this.personalHonorList.splice(index, 1)
      },
      // 工作模式
      handleWorkModeChange(value) {
        this.teamType = value
        this.files = []
        this.filesAddress = []
        let options = [
          { text: "3", value: 1, selected: true },
          { text: "5", value: 2 },
          { text: "8", value: 3 }
        ]
        if(this.designerInfo.teamType == this.teamType){
          if(this.teamType == 1){
            this.teamScale = this.designerInfo.teamScale
            this.files = this.designerInfo.aloneArchitectFile?this.designerInfo.aloneArchitectFile.split(","):[]
          }
          if(this.teamType == 2){
            this.teamScale = this.designerInfo.scale
            this.files = this.designerInfo.studioUploadFile?this.designerInfo.studioUploadFile.split(","):[]
          }
          if(this.teamType == 3){
            this.teamScale = this.designerInfo.enterpriseTeamNumber
            this.files = this.designerInfo.enterpriseuploadFile?this.designerInfo.enterpriseuploadFile.split(","):[]
          }
          this.filesAddress = this.designerInfo.teamfiles
          options.map(item=>{
            if(item.value == this.teamScale){
              item.selected = true
            }else{
              item.selected = false
            }
          })
        }else{
          this.teamScale = ""
        }
        this.scaleOptions = options
      },
      getSelectValue(value){
        this.teamScale = value
      },
      getPickerValue1(value) {
        this.tempLearn.timeOfEnrollment = value
      },
      getPickerValue2(value) {
        this.tempLearn.graduationDate = value
      },
      addLearn() {
        if(!this.tempLearn.school || !this.tempLearn.timeOfEnrollment || !this.tempLearn.graduationDate || !this.tempLearn.major || !this.tempLearn.quaPhoto){
          this.$message.info("信息不完整!");
          return
        }
        this.learningExperienceList.push({
          designerId: this.id,
          ...this.tempLearn
        })
        this.modalLearn = false
      },
      addHonor() {
        if(!this.tempHonor.honorName || !this.tempHonor.honorLevel || !this.tempHonor.issuingAuthority || !this.tempHonor.honorPhoto){
          this.$message.info("信息不完整!");
          return
        }
        this.personalHonorList.push({
          designerId: this.id,
          ...this.tempHonor
        })
        this.modalHonor = false
      },
      // 上传前验证
      beforeUpload(file) {
        const isLt3M = file.size / 1024 / 1024 < 3;
        if (!isLt3M) {
          this.$message.error("上传图片大小不能超过 3MB!");
        }
        return isLt3M;
      },
      // 上传成功
      successUpLoad(res, file) {
        this.tempLearn.quaPhoto = res.msg;
        this.api.getUrl({ fileName: res.msg }).then(res => {
          if (res.code !== 0) {
            return;
          }
          this.tempLearn.photoUrl = res.msg;
        });
      },
      // 上传成功
      successUpLoadHonor(res, file) {
        this.tempHonor.honorPhoto = res.msg;
        this.api.getUrl({ fileName: res.msg }).then(res => {
          if (res.code !== 0) {
            return;
          }
          this.tempHonor.photoUrl = res.msg;
        });
      },
      // 上传职业资格相关证件图片前的验证
      beforeFileUploadQualification(file) {
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          this.$message.error("上传头像图片大小不能超过 10MB!");
        }
        return isLt10M;
      },
      // 上传职业资格相关证件图片前的验证
      fileUploadSuccessQualification(res, file) {
        this.qualificationPhotoList.push(res.msg);

        this.api.getUrl({ fileName: res.msg }).then(res => {
          this.qualificationPhotoAdressList.push(res.msg);
        });
      },
      // 上传专业职称相关证件图片前的验证
      beforeFileUploadProfessionalTitle(file) {
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          this.$message.error("上传头像图片大小不能超过 10MB!");
        }
        return isLt10M;
      },
      // 上传专业职称相关证件图片前的验证
      fileUploadSuccessProfessionalTitle(res, file) {
        this.titlePhotoList.push(res.msg);

        this.api.getUrl({ fileName: res.msg }).then(res => {
          this.titlePhotoAdressList.push(res.msg);
        });
      },
      // 独立建筑师上传文件前的验证
      beforeFileUploadAloneDesin(file) {
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          this.$message.error("上传图片大小不能超过 5MB!");
        }
        return isLt5M;
      },
      // 独立建筑师上传图片成功
      fileUploadSuccessAloneDesin(res, file) {
        this.files.push(res.msg);
        this.api.getUrl({ fileName: res.msg }).then(res => {console.log(this.filesAddress)
          this.filesAddress.push(res.msg);
        });
      },
      update() {
        let params = {
          id: this.id,
          learningExperienceList: this.learningExperienceList,
          personalHonorList: this.personalHonorList,
          workLife: this.workLife,
          qualification: this.qualification,
          title: this.title,
          qualificationPhoto: this.qualificationPhotoList.join(","),
          titlePhoto: this.titlePhotoList.join(","),
          teamType: this.teamType,
          scale: this.teamScale,
          studioUploadFile: this.files.join(",")
        }
        this.api.getDesignerInfoUpdate(params).then(res => {
          if (res.code !== 0) {
            this.$message.info( res.msg);
            return
          }
          this.getDesignerInfo()
          this.$message.info( res.msg);
        })
      },
    }
  };
</script>

<!-- Styles are used for tab animation, which is open for customization and optional -->
<style lang="less" scoped>
  .personDetail{
    text-align: left;
  }
  .slide-toggle-enter-active {
    transition: .3s ease-in;
    opacity: 1;
    max-height: 500px;
  }

  .slide-toggle-enter,
  .slide-toggle-leave-active {
    opacity: 0;
    max-height: 0;
  }

  .slide-toggle-leave {
    opacity: 1;
    max-height: 500px;
  }
  #inputPassword6{
    display: block
  }
  #inputPassword67{
    display: block
  }
  .upbox {
    margin-top: 2.2rem;
  }
  .upimg {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .relfile{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img{
      width: 2rem;
      height: 2rem;
      margin: 0 0.2rem;
      vertical-align: middle;
    }
  }
  .tab-pane {
    height: auto!important;
  }
</style>