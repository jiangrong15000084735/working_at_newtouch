<template>
  <mdb-container class="personDetail">
    <!-- <h5 class="mt-3 mb-3 h5">
        个人履历
    </h5> -->
    <mdb-row style="padding:0.9375rem 0 1.5625rem;font-size: 1rem; color:#333;">
      <mdb-col md="7">
        个人履历
      </mdb-col>
    </mdb-row>
    <mdb-tab tabs color="primary" class="mx-0 tab-btn">
      <mdb-tab-item :active="pillsActive==0" @click.native.prevent="pillsActive=0">学习经历</mdb-tab-item>
      <mdb-tab-item :active="pillsActive==1" @click.native.prevent="pillsActive=1">个人荣誉</mdb-tab-item>
      <mdb-tab-item :active="pillsActive==2" @click.native.prevent="pillsActive=2">专业资历</mdb-tab-item>
      <mdb-tab-item class="addbtn" v-if="pillsActive==0" @click.native.prevent="modalLearn = true">+添加</mdb-tab-item>
      <mdb-tab-item class="addbtn" v-if="pillsActive==1" @click.native.prevent="modalHonor = true">+添加</mdb-tab-item>
    </mdb-tab>
    <mdb-tab-content class="px-0 mb32">
      <mdb-tab-pane key="show1" v-if="pillsActive==0">
        <mdb-row>
          <mdb-col col="12">
            <tbl striped class="text-center" style="border: 1px solid #dee2e6;">
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
                  <td>{{item.school}}</td>
                  <td>{{item.timeOfEnrollment}}</td>
                  <td>{{item.graduationDate}}</td>
                  <td>{{item.major}}</td>
                  <td>
                    <!-- <img width="30" height="30" v-if="item.photoUrl" :src="item.photoUrl" alt=""> -->
                    已上传
                  </td>
                  <td class="delete">
                    <!-- <mdb-btn  class="delete" color="danger" size="sm" @click.native="deleteLearn(index,item.id)">删除</mdb-btn> -->
                    <span @click.native="deleteLearn(index,item.id)">删除</span>
                  </td>
                </tr>
              </tbl-body>
            </tbl>
          </mdb-col>
          <!-- <mdb-col col="1">
            <span class="table-add float-right mt-2 mr-4" @click="modalLearn = true">
              <a class="text-success"><i class="fas fa-plus fa-2x" aria-hidden="true"></i></a>
            </span>
          </mdb-col> -->
        </mdb-row>
      </mdb-tab-pane>
      <mdb-tab-pane key="show2" v-if="pillsActive==1">
        <mdb-row>
          <mdb-col col="12">
            <tbl striped class="text-center" style="border: 1px solid #dee2e6;">
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
                  <td scope="row">{{item.honorName}}</td>
                  <td>{{item.honorLevel}}</td>
                  <td>{{item.issuingAuthority}}</td>
                  <td><img width="30" height="30" v-if="item.honorPhotoUrl" :src="item.honorPhotoUrl" alt=""></td>
                  <td class="delete">
                    <!-- <mdb-btn color="danger" size="sm" @click.native="deleteHonor(index,item.id)">删除</mdb-btn> -->
                    <span @click.native="deleteHonor(index,item.id)">删除</span>
                    </td>
                </tr>
              </tbl-body>
            </tbl>
          </mdb-col>
          <!-- <mdb-col col="1">
            <span class="table-add float-right mt-2 mr-4" @click="modalHonor = true">
              <a class="text-success"><i class="fas fa-plus fa-2x" aria-hidden="true"></i></a>
            </span>
          </mdb-col> -->
        </mdb-row>
      </mdb-tab-pane>
       <!-- class="fade" -->
      <mdb-tab-pane key="show3" v-if="pillsActive==2">
        <mdb-row class="" style="margin-top:30px;">
          <mdb-col>
            <!-- <mdb-select @getValue="getSelectValue1" v-if="workLifes" :options="workLifes" />
            <label>工作年限</label> -->
            <div class="md-outline-select w522">
              <label class="label active">工作年限</label>
              <mdb-select 
                outline 
                class="mb-0 mt-0"
                @getValue="getSelectValue1" 
                v-if="workLifes" 
                :options="workLifes"
              />
            </div>
          </mdb-col>
        </mdb-row>
        <mdb-row  style="margin-top:24px;">
          <mdb-col class="clearfix">
            <!-- <mdb-select @getValue="getSelectValue2" v-if="qualifications" :options="qualifications" />
            <label>执业资格</label> -->
            <div class="md-outline-select w522 fl">
              <label class="label active">执业资格</label>
              <mdb-select 
                outline 
                class="mb-0 mt-0"
               @getValue="getSelectValue2" 
               v-if="qualifications" 
               :options="qualifications"
              />
            </div>
            <div class="fl ml20">
              <div class="clearfix">
                <el-upload
                  class="upload-demo fl"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :before-upload="beforeFileUploadQualification"
                  :action="api.upload()"
                  :on-success="fileUploadSuccessQualification"
                  accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">上传文件</div>
                </el-upload>
                <div class="upimg fl" v-for="(item,index) in qualificationPhotoAdressList" :key="index">
                  <img
                    :src="item"
                    alt>
                  <div class="updelImg" @click="delImgFun2(item,index,0)">x</div>
                </div>
              </div>
            </div>
          </mdb-col>
          <!-- <mdb-col col="6">
            <div class="upbox">
              <span class="upimg fl" v-for="(item,index) in qualificationPhotoAdressList" :key="index">
                <img
                  :src="item"
                  alt>
                <div class="updelImg" @click="delImgFun2(item,index,0)">x</div>
              </span>
              <el-upload
                class="fl"
                :show-file-list="false"
                :before-upload="beforeFileUploadQualification"
                :action="api.upload()"
                :on-success="fileUploadSuccessQualification"
                accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
              >
                <mdb-icon far icon="file-alt" style="font-size:25px;color:#4285f4;"/>
              </el-upload>
              <span class="fl">上传文件</span>
            </div>
          </mdb-col> -->
        </mdb-row>
        <mdb-row style="margin-top:24px;">
          <mdb-col class="clearfix">
            <!-- <mdb-select @getValue="getSelectValue3" v-if="qualificationTitles" :options="qualificationTitles" />
            <label>专业职称</label> -->
            <div class="md-outline-select w522 fl">
              <label class="label active">执业资格</label>
              <mdb-select 
                outline 
                class="mb-0 mt-0"
               @getValue="getSelectValue3" 
               v-if="qualificationTitles" 
               :options="qualificationTitles"
              />
            </div>
            <div class="fl ml20">
              <div class="clearfix">
                <el-upload
                  class="upload-demo fl"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :before-upload="beforeFileUploadProfessionalTitle"
                  :action="api.upload()"
                  :on-success="fileUploadSuccessProfessionalTitle"
                  accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">上传文件</div>
                </el-upload>
                <div class="upimg fl" v-for="(item,index) in titlePhotoAdressList" :key="index">
                  <img :src="item" alt>
                  <div class="updelImg" @click="delImgFun2(item,index,1)">x</div>
                </div>
              </div>
            </div>
          </mdb-col>
          <!-- <mdb-col col="6">
            <div class="upbox">
              <span class="upimg fl" v-for="(item,index) in titlePhotoAdressList" :key="index">
                <img :src="item" alt>
                <div class="updelImg" @click="delImgFun2(item,index,1)">x</div>
              </span>
              <el-upload
                class="fl"
                :show-file-list="false"
                :before-upload="beforeFileUploadProfessionalTitle"
                :action="api.upload()"
                :on-success="fileUploadSuccessProfessionalTitle"
                accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
              >
                <mdb-icon far icon="file-alt" style="font-size:25px;color:#4285f4;"/>
              </el-upload>
              <span class="fl">上传文件</span>
            </div>
          </mdb-col> -->
        </mdb-row>
      </mdb-tab-pane>
    </mdb-tab-content>

    <p class="mb26 h0 fw600">工作模式</p>
    <mdb-container class="pl-0 mb32">
      <!-- <mdb-input
        type="radio"
        id="materialGroupExample01"
        name="materialGroupExample3"
        value="1"
        label="独立建筑师"
        v-if="teamType"
        :checked="teamType == '1'"
        @change="handleWorkModeChange"
      /> -->
      <div class="form-check pl-0">
          <input 
            class="form-check-input"
            type="radio"
            id="materialGroupExample01"
            name="materialGroupExample"
            value="1"
            :checked="teamType == '1'"
            v-model="teamType"
           @change="handleWorkModeChange(teamType)">
          <label class="form-check-label" for="materialGroupExample01">独立建筑师</label>
        </div>
      <mdb-row v-if="teamType == '1'">
        <mdb-col col="12" class="clearfix"  style="margin-top:20px;">
          <!-- <mdb-select color="primary" @getValue="getSelectValue" :options="scaleOptions" />
          <label>团队人员数量</label> -->
          <div class="w522 fl">
            <div class="md-outline-select">
              <label class="label active">团队人员数量</label>
              <mdb-select 
                outline 
                class="mb-0 mt-0"
                @getValue="getSelectValue" 
                :options="scaleOptions"
              />
            </div>
            <div class="h00">相关证明文件附件（团队成员身份证、手机号码）</div>
          </div>
          <div class="fl">
            <div class="clearfix">
              <el-upload
                class="uploadbtn fl"
                :show-file-list="false"
                :before-upload="beforeFileUploadAloneDesin"
                :action="api.upload()"
                :on-success="fileUploadSuccessAloneDesin"
                accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
              >
                <!-- <mdb-btn 
                    type="button" 
                    class="btn btn-outline-info waves-effect" >附件上传</mdb-btn> -->
                    <mdb-btn outline="primary">附件上传</mdb-btn>
              </el-upload>
              <div class="width118 fl" v-if="filesAddress&&filesAddress.length>0">
                <div class="imgItem" v-for="(item,index) in filesAddress"
                    :key="index">
                  <img :src="item" alt>
                  <div class="delImg" @click="delImgFun(item,index)">x</div>
                </div>
              </div>
            </div>
          </div>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <mdb-container class="pl-0 mb32">
      <!-- <mdb-input type="radio"
        id="materialGroupExample02"
        name="materialGroupExample3"
        value="2"
        label="建筑事务所或工作室"
        v-if="teamType"
        :checked="teamType == '2'"
        @change="handleWorkModeChange"
      /> -->
      <div class="form-check pl-0">
        <input 
          class="form-check-input"
          type="radio"
          id="materialGroupExample02"
          name="materialGroupExample"
          value="2"
          :checked="teamType == '2'"
          v-model="teamType"
          @change="handleWorkModeChange(teamType)">
        <label class="form-check-label" for="materialGroupExample02">建筑事务所或工作室</label>
      </div>
      <mdb-row v-if="teamType == '2'" style="margin-top:20px;">
        <mdb-col class="clearfix">
          <!-- <mdb-select color="primary" @getValue="getSelectValue" :options="scaleOptions" /> -->
          <!-- <label for="bb">请填写您的建筑事务所或工作室名称</label>
          <mdb-input id="bb" v-model="teamScale"></mdb-input> -->
          <div class="w522 fl">
            <div class="outline-input w522">
              <mdb-input 
              type="text"
              size="lg" 
              label="请填写您的建筑事务所或工作室名称"
               v-model.trim="teamScale"
              outline />
            </div>
            <p class="h00">相关证明文件附件（团队成员身份证、手机号码）</p>
          </div>
          <div class="fl">
             <div class="clearfix">
                <el-upload
                class="uploadbtn fl"
                :show-file-list="false"
                :before-upload="beforeFileUploadAloneDesin"
                :action="api.upload()"
                :on-success="fileUploadSuccessAloneDesin"
                accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
              >
                <!-- <mdb-btn 
                    type="button" 
                    class="btn btn-outline-info waves-effect" >附件上传</mdb-btn> -->
                    <mdb-btn outline="primary">附件上传</mdb-btn>
              </el-upload>
              <div class="width118 fl" v-if="filesAddress.length>0">
                <div class="imgItem" v-for="(item,index) in filesAddress"
                  :key="index">
                <img
                  :src="item" alt>
                  <div class="delImg" @click="delImgFun(item,index)">x</div>
                </div>
              </div>
            </div>
          </div>
        </mdb-col>
        <!-- <mdb-col col="7">
          <div class="relfile">
            <div>相关证明文件附件（团队成员身份证、手机号码）</div>
            <div class="width118" v-if="filesAddress.length>0">
              <div class="imgItem" v-for="(item,index) in filesAddress"
                :key="index">
              <img
                :src="item" alt>
                <div class="delImg" @click="delImgFun(item,index)">x</div>
              </div>
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
        </mdb-col> -->
      </mdb-row>
    </mdb-container>
    <mdb-container class="pl-0" style="margin-bottom:24px;">
      <!-- <mdb-input type="radio"
        id="materialGroupExample03"
        name="materialGroupExample3"
        value="3"
        label="院企设计团队"
        v-if="teamType"
        :checked="teamType == '3'"
        @change="handleWorkModeChange"
      /> -->
      <div class="form-check pl-0">
        <input 
          class="form-check-input"
          type="radio"
          id="materialGroupExample03"
          name="materialGroupExample"
          value="3"
          :checked="teamType == '3'"
          v-model="teamType"
          @change="handleWorkModeChange(teamType)">
        <label class="form-check-label" for="materialGroupExample03">院企设计团队</label>
      </div>
      <mdb-row v-if="teamType == '3'" class="mb32"  style="margin-top:20px;">
        <mdb-col class="clearfix">
          <!-- <mdb-select color="primary" @getValue="getSelectValue" :options="scaleOptions" />
          <label>团队人员数量</label> -->
          <!-- <label  >请填写您的工作单位及所在部门名称</label>
          <mdb-input  v-model="teamScale"></mdb-input> -->
          <div class="fl w522">
            <div class="outline-input w522">
              <mdb-input 
              type="text"
              size="lg" 
              label="请填写您的工作单位及所在部门名称"
               v-model.trim="teamScale"
              outline />
            </div>
             <p class="h00">相关证明文件附件（团队成员身份证、手机号码）</p>
          </div>
          <div class="fl">
            <div class="clearfix">
              <el-upload
                  class="uploadbtn fl"
                  :show-file-list="false"
                  :before-upload="beforeFileUploadAloneDesin"
                  :action="api.upload()"
                  :on-success="fileUploadSuccessAloneDesin"
                  accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
                >
                <!-- <mdb-btn 
                    type="button" 
                    class="btn btn-outline-primary waves-effect" >附件上传</mdb-btn> -->
                    <mdb-btn outline="primary">附件上传</mdb-btn>
              </el-upload>
              <div class="width118 fl" v-if="filesAddress&&filesAddress.length>0">
                <div class="imgItem" v-for="(item,index) in filesAddress"
                    :key="index">
                  <img
                    :src="item" alt>
                    <div class="delImg" @click="delImgFun(item,index)">x</div>
                </div>
              </div>
            </div>
          </div>
        </mdb-col>
        <!-- <mdb-col col="7">
          <div class="relfile">
            <div>相关证明文件附件（团队成员身份证、手机号码）</div>
            <div class="width118">
              <div class="imgItem" v-for="(item,index) in filesAddress"
                  :key="index">
                <img
                  :src="item" alt>
                  <div class="delImg" @click="delImgFun(item,index)">x</div>
              </div>
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
        </mdb-col> -->
      </mdb-row>

      <!-- <mdb-row>
        <mdb-col md="4" offsetMd="4">
          <mdb-btn color="primary" @click="update">更 新</mdb-btn>
        </mdb-col>
      </mdb-row> -->
     
    </mdb-container>
    <mdb-row style="padding-top:2.25rem !important;">
      <mdb-col md="12" class="text-left">
          <mdb-btn color="primary" class="btn212_60" @click.native="update">更 新</mdb-btn>
      </mdb-col>
    </mdb-row>
    <mdb-modal size="md" v-if="modalLearn" @close="closeModalLearn" info>
      <mdb-modal-header class="text-center">
        <p class="heading w-100">新增学习经历</p>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-container>
          <p style="color:red;font-size:0.9rem;">{{checkError}}</p>
          <!-- <label for="school">学校名称</label> -->
          <!-- <input type="text" id="school" class="form-control" v-model.trim="tempLearn.school"> -->
          <div class="mt-3">
            <div class="outline-input ">
              <mdb-input 
              type="text"
              size="lg" 
              label="学校名称"
               v-model.trim="tempLearn.school"
              outline />
            </div>
          </div>
          <br>
          <!-- <label for="inputPassword6">入学时间</label> -->
          <mdb-date-picker 
            class="height50" 
            id="inputPassword6" 
            :date="startDate" 
            :option="option" 
            @getValue="getPickerValue1"
          ></mdb-date-picker>
          <br>
          <!-- <label for="inputPassword67">毕业时间</label> -->
          <mdb-date-picker class="height50" id="inputPassword67" :date="endDate" :option="option2" @getValue="getPickerValue2"></mdb-date-picker>
          <br>
          <!-- <label for="major">取得学位</label>
          <input type="text" id="major" class="form-control" v-model.trim="tempLearn.major"> -->
          <div>
            <div class="outline-input ">
              <mdb-input 
              type="text"
              size="lg" 
              label="取得学位"
              v-model.trim="tempLearn.major"
              outline />
            </div>
          </div>
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
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </mdb-container>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn color="primary" @click.native="addLearn">确定</mdb-btn>
        <mdb-btn outline="primary" @click.native="closeModalLearn">取消</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <mdb-modal size="md" v-if="modalHonor" @close="closeModalHonor" info>
      <mdb-modal-header class="text-center">
        <mdb-modal-title tag="h4" bold class="w-100">新增个人荣誉</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-container>
          <p style="color:red;font-size:0.9rem;">{{checkError}}</p>
          <!-- <label for="honorName">荣誉名称</label>
          <input type="text"  class="form-control" v-model.trim="tempHonor.honorName"> -->
          <div class="mt-3">
            <div class="outline-input ">
              <mdb-input 
              type="text"
              size="lg" 
              label="荣誉名称"
              v-model.trim="tempHonor.honorName"
              outline />
            </div>
          </div>
          <br>
          <!-- <label for="inputPassword6">荣誉级别</label>
          <select class="browser-default custom-select" v-model="tempHonor.honorLevel">
            <option selected>请选择</option>
            <option value="国家级及以上">国家级及以上</option>
            <option value="地区及市一级">地区及市一级</option>
            <option value="其他">其他</option>
          </select> -->
          <!-- <label>荣誉级别</label> -->
           <div class="md-outline-select">
            <label class="label active">荣誉级别</label>
            <mdb-select class="my-0 selteMb0" @getValue="getSelectValueHonor" v-if="honorLevels" :options="honorLevels" />
          </div>
          <br>
          <!-- <label for="issuingAuthority">授予机构</label>
          <input type="text" id="issuingAuthority" class="form-control" v-model.trim="tempHonor.issuingAuthority"> -->
          <div>
            <div class="outline-input ">
              <mdb-input 
              type="text"
              size="lg" 
              label="授予机构"
              v-model.trim="tempHonor.issuingAuthority"
              outline />
            </div>
          </div>
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
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </mdb-container>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn color="primary" @click.native="addHonor">确定</mdb-btn>
        <mdb-btn outline="primary" @click.native="closeModalHonor">取消</mdb-btn>
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
        honorLevels: [
            { text: '请选择荣誉级别', value: null, disabled: true, selected: true },
            { text: '国家级及以上', value: '国家级及以上', selected: false },
            { text: '地区及市一级', value: '地区及市一级', selected: false },
            { text: '其他', value: '其他', selected: false }
        ],
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
          { text: '请选择', value: null, disabled: true, selected: true }
        ],//团队规模下拉

        startDate: {
          date: ''
        },
        endDate: {
          date: ''
        },
        option: {
          type: 'day',
          week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
          month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          format: 'YYYY/MM/DD',
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
        },
        option2: {
          type: 'day',
          week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
          month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          format: 'YYYY/MM/DD',
          placeholder: '毕业时间',
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
        },
        checkError:''
      };
    },
    mounted() {
      this.id = localStorage.getItem("userId") || sessionStorage.getItem("userId");
      this.chooseTeamNumber()
      this.getDesignerInfo()
    },
    methods: {
      getDesignerInfo() {
        this.api.getInfoByDesignerIdNew({ id: this.id }).then(res => {
          if(res.data.qualificationPhoto)
          this.qualificationPhotoList=res.data.qualificationPhoto.split(",")
          this.qualificationPhotoAdressList = res.data.qualificationPhotos
          if(res.data.titlePhoto)
          this.titlePhotoList = res.data.titlePhoto.split(",")
          this.titlePhotoAdressList = res.data.titlePhotos
          if (res.code !== 0) {
            return
          }
          console.log(res.datas)
          this.designerInfo = res.data
          this.learningExperienceList = res.data.learningExperienceList
          this.personalHonorList = res.data.personalHonorList
          this.workLife = res.data.workLife
          this.qualification = res.data.qualification
          this.title = res.data.title
          this.teamType = res.data.teamType?res.data.teamType:-1
          this.filesAddress = this.designerInfo.teamfiles
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
          this.scaleOptions.map(item=>{
            if(item.value == this.teamScale){
              item.selected = true
            }else{
              item.selected = false
            }
          })
          this.chooseWorkLife();
          this.chooseQualification();
          this.chooseQualificationTitle();
        })
      },
      closeModalLearn(){
        this.checkError=""
        this.modalLearn = false
        this.tempLearn = {
          school: '',
          timeOfEnrollment: '',
          graduationDate: '',
          major: '',
          quaPhoto: '',
          pic: ''
        }
        this.startDate = {
          date: ''
        }
        this.endDate = {
          date: ''
        }
      },
      closeModalHonor(){
        this.checkError=""
        this.modalHonor = false
        this.tempHonor = {
          honorLevel: "", // 荣誉级别
          honorName: "", // 荣誉名称
          issuingAuthority: "", // 授予机构
          honorPhoto: "", // 荣誉证书附件
          pic: "",  // 荣誉证书附件地址
        }
        this.honorLevels = [
            { text: '请选择荣誉级别', value: null, disabled: true, selected: true },
            { text: '国家级及以上', value: '国家级及以上', selected: false },
            { text: '地区及市一级', value: '地区及市一级', selected: false },
            { text: '其他', value: '其他', selected: false }
        ]
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
      // 点击团队类型的下拉框时从数据字典获取数据初始化团队人数
      chooseTeamNumber() {
        this.api.getTeamNumber(null).then(res => {
          if (res.code === 0) {
            this.scaleOptions= JSON.parse(JSON.stringify(res.data).replace(/name/g,"text"))
          }
        });
      },
      getSelectValueHonor(value) {
        this.tempHonor.honorLevel = value
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
          this.scaleOptions.map(item=>{
            if(item.value == this.teamScale){
              item.selected = true
            }else{
              item.selected = false
            }
          })
        }else{
          this.teamScale = ""
        }
        // this.scaleOptions = options
      },
      // 删除图片工作模式
      delImgFun(item,index) {
        this.files.splice(index, 1)
        this.filesAddress.splice(index, 1)
      },
      // 删除图片专业资质
      delImgFun2(item,index,type) {
        if(type==1){
          this.titlePhotoList.splice(index, 1)
          this.titlePhotoAdressList.splice(index, 1)
        }else{
          this.qualificationPhotoList.splice(index, 1)
          this.qualificationPhotoAdressList.splice(index, 1)
        }
      },
      getSelectValue(value){
        console.log(value)
        this.teamScale = value
      },
      getPickerValue1(value) {
        this.tempLearn.timeOfEnrollment = value
      },
      getPickerValue2(value) {
        this.tempLearn.graduationDate = value
      },
      addLearn() {
        if(!this.tempLearn.school){
          this.checkError="请输入学校名称"
          return
        }
        if(!this.tempLearn.timeOfEnrollment){
          this.checkError="请选择入学时间"
          return
        }
        if(!this.tempLearn.graduationDate){
          this.checkError="请选择毕业时间"
          return
        }
        if(!this.tempLearn.major){
          this.checkError="请输入取得学位"
          return
        }
        if(!this.tempLearn.quaPhoto){
          this.checkError="请上传学位证书附件"
          return
        }
        // if(!this.tempLearn.school || !this.tempLearn.timeOfEnrollment || !this.tempLearn.graduationDate || !this.tempLearn.major || !this.tempLearn.quaPhoto){
        //   this.$message.info("信息不完整!");
        //   return
        // }
        this.learningExperienceList.push({
          designerId: this.id,
          ...this.tempLearn
        })
        this.modalLearn = false
        this.closeModalLearn()
      },
      addHonor() {
        if(!this.tempHonor.honorName){
          this.checkError="请输入荣誉名称"
          return
        }
        if(!this.tempHonor.honorLevel){
          this.checkError="请选择荣誉级别"
          return
        }
        if(!this.tempHonor.issuingAuthority){
          this.checkError="请输入授予机构"
          return
        }
        if(!this.tempHonor.honorPhoto){
          this.checkError="请上传相关证明文件"
          return
        }
        // if(!this.tempHonor.honorName || 
        // !this.tempHonor.honorLevel || 
        // !this.tempHonor.issuingAuthority || 
        // !this.tempHonor.honorPhoto){
        //   this.$message.info("信息不完整!");
        //   return
        // }
        this.personalHonorList.push({
          designerId: this.id,
          ...this.tempHonor
        })
        this.modalHonor = false
        this.closeModalHonor()
      },
      // 上传前验证
      beforeUpload(file) {
        const isLt3M = file.size / 1024 / 1024 < this.$isLt10M;
        if (!isLt3M) {
          this.$message.error(`上传图片大小不能超过 ${this.$isLt10M}MB!`);
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
          this.tempHonor.honorPhotoUrl = res.msg;
        });
      },
      // 上传职业资格相关证件图片前的验证
      beforeFileUploadQualification(file) {
        const isLt10M = file.size / 1024 / 1024 < this.$isLt10M;
        if (!isLt10M) {
          this.$message.error(`上传图片大小不能超过 ${this.$isLt10M}MB!`);
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
        const isLt10M = file.size / 1024 / 1024 < this.$isLt10M;
        if (!isLt10M) {
          this.$message.error(`上传图片大小不能超过 ${this.$isLt10M}MB!`);
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
        const isLt5M = file.size / 1024 / 1024 < this.$isLt10M;
        if (!isLt5M) {
          this.$message.error(`上传图片大小不能超过 ${this.$isLt10M}MB!`);
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
        if(!this.teamType){
          this.$message.error("请选择工作模式")
          return
        }
        if(!this.teamScale){
          this.$message.error("请填写完整的工作模式")
          return
        }
        // if(this.files.length==0){
        //   this.$message.error("请上传工作模式相关证明文件附件")
        //   return
        // }
        let params = {
          id: this.id,
          type:3,
          // updateType:2,
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
        this.api.getDesignerInfoUpdateNew(params,2).then(res => {
          if (res.code !== 0) {
            this.$message.error(res.msg)
            return
          }
          this.getDesignerInfo()
          this.$message.info(res.msg);
        })
      },
    }
  };
</script>

<!-- Styles are used for tab animation, which is open for customization and optional -->
<style lang="less" scoped>
.w522{
  width: 522px;
}
.mb32{
  margin-bottom: 32px;
}
.mb26{
  margin-bottom: 26px;
}
.h0{
  color: #505050;
}
.fw600{
  font-weight: 600;
}
.h00{
  margin-top: 20px;
  color: #999999;
}
.ml20{
  margin-left: 20px;
}
.delete{
  span{
    color: #4285f4;
    text-decoration: underline;
  }
}
.uploadbtn button{
  height: 50px !important;
  box-sizing: border-box !important;
  margin: 0 !important;
  margin-left: 20px !important;
  margin-right: 20px !important;
  border: 1px solid #4285f4 !important;
  background:#fff !important;
  color: #4285f4 !important;
  padding-left:15px;
  padding-right: 15px; 
}
  .personDetail{
    font-size: 14px !important;
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
    position: relative;
    display: inline-block;
    width: 50px;
    height: 50px;
    margin:0 5px;
    .updelImg{
      position: absolute;
      top: -10px;
      right: -5px;
      cursor: pointer;
    }
    img{
      width: 100%;
      height: 100%;
    }
  }
  // .relfile{
  //   display: flex;
  //   justify-content: flex-start;
  //   align-items: center;
    .width118{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      // width: 128px;
      .imgItem{
       position: relative;
       display: inline-block;
        .delImg{
          position: absolute;
          top: -10px;
          right: -0px;
          cursor: pointer;
        }
      }
    }
    img{
      width: 50px;
      height: 50px;
      margin: 0.2rem 0.2rem;
      vertical-align: middle;
    }
  // }
  .tab-pane {
    height: auto!important;
  }
  .text-center{
    th{
      font-weight: bold;
    }
    td{
      color: #212529!important;
      padding:0.75rem!important;
      vertical-align:middle;
      font-weight: normal;
      img{
        display: block;
        margin: auto;
      }
    }
  }
</style>
<style lang="less">
.personDetail{
  .modal-dialog .modal-content {
    background-color: #fff;
  }
  .height50{
    .cov-datepicker{
      height: 50px;
      font-size: 14px;
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
      color: #999;
      font-size: 0.875rem;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #999;
      font-size: 0.875rem;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
      color: #999;
      font-size: 0.875rem;
    } 
  }
  .selteMb0{
    .select-dropdown{
      margin-bottom: 0;
    }
  }
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
  .tab-content {
      padding: 1rem;
      padding-top: 1.5rem;
  }
  .table td, .table th {
    border-top: none;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 50px;
    height: 50px;
  }
  .table td{
    color: #999999 !important;
  }
  .table thead th {
    border-bottom: none;
    color: #333333 !important;
    font-weight: 200 !important;
  }
  .table {
    margin-bottom: 0;
  }
  .form-check-input[type="radio"] + label:before, 
  .form-check-input[type="radio"] + label:after, 
  label.btn input[type="radio"] + label:before,
  label.btn input[type="radio"] + label:after{
    margin: 0 !important;
  }
  .form-check-label{
    color: #999999;
  }
  .form-check-input[type="radio"]:not(:checked) + label:before,
   .form-check-input[type="radio"]:not(:checked) + label:after, 
   label.btn input[type="radio"]:not(:checked) + label:before,
   label.btn input[type="radio"]:not(:checked) + label:after {
    border: 2px solid #999999;
   }
  .tab-btn{
    padding: 0;
    padding-left: 54px;
    background: #6886ff !important;
    height: 64px;
    border-bottom-right-radius: none !important;
    border-bottom-left-radius:none !important;
    li{
      line-height: 64px;
    }
    li:not(:last-child){
      margin-right: 138px;
    }
    
    a{
      background: transparent !important;
      color: rgba(255, 255, 255, 0.42);
      width: 120px;
      padding: 0;
      text-align: center;
      position: relative;
    }
    li .active::after{
      content: "";
      height:2px;
      position: absolute;
      bottom: 0;
      left:0;
      width: 120px;
      background: #07d8ae;
    }
    .active{
      color: rgba(255, 255, 255, 1);
    }
    .addbtn{
      a{
      background: transparent !important;
      color: rgba(255, 255, 255, 1);
      padding: 0;
    }
    }
  }
}
</style>
