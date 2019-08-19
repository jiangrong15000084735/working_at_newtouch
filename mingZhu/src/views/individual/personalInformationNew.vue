<template>
  <div class="designer body designerBox">
    <div class="designer-submit-info">
      <h3 class="main-title">建筑师验证资料填写</h3>
      <p
        class="main-title-text text-center"
      >请填写相关验证信息进行设计身份验证，您填写的身份、工作、履历等信息仅供平台身份验证使用，相关信息不会显示在任何网络页面上</p>
      <Stepper :activeIndex="activeIndex" :landMarkList="progressStep"/>
      <bindPhoneEmail :bindPhoneEmailObj="bindPhoneEmailObj" @bindBack="bindBack"></bindPhoneEmail>
      <div class="form">
        <div class="personal-info">
          <div class="title">
            个人基本信息
            <span>（带*号为必填项）</span>
          </div>
          <div class="avatar-uploader avatar-block" @click="openFilter">
            <div
              style="height:6.25rem;width:6.25rem; margin: 0 auto;
      position: relative;cursor:pointer;"
            >
              <img
                v-if="head"
                :src="headImg"
                class="avatar"
                :class="[filter==1?'chalkboard':'',filter==2?'airbrush-effect':'',filter==3?'colored-chalkboard-effect':'',filter==4?'hallucination-effect':'']"
              >
              <img v-else src="@/assets/images/header.png" class="avatar">
            </div>
          </div>
          <!-- <div class="headImgDialog"> -->
          <mdb-modal v-if="modal==true" info>
            <mdb-modal-header class="text-center" :close="false">
              <p class="heading" style="width:100%">你的头像照片</p>
            </mdb-modal-header>
            <mdb-modal-body  style="background:#fff;">
              <h6>上传新头像</h6>
              <mdb-row>
                <mdb-col style="border:1px solid #ccc;height:13.75rem;padding:0;overflow:hidden">
                  <div style="height:100%;width:100%;overflow:hidden;">
                    <img
                      :src="headPhoto"
                      v-if="headPhoto"
                      style="width:100%;margin-top:0;height:100%;"
                      class="avatar"
                    >
                    <img
                      :src="headImg"
                      style="width:100%;margin-top:0;height:100%;"
                      v-else
                      class="avatar"
                      :class="[filter==1?'chalkboard':'',filter==2?'airbrush-effect':'',filter==3?'colored-chalkboard-effect':'',filter==4?'hallucination-effect':'']"
                    >
                  </div>
                </mdb-col>
                <mdb-col
                  style="border:1px solid #ccc;margin-left:0.95rem;height:13.75rem;padding:0"
                >
                  <el-upload
                    class="elUpload"
                    list-type="picture-card"
                    :show-file-list="false"
                    :action="api.upload()"
                    :before-upload="beforeAvatarUpload"
                    :on-success="upLoadHeadSuccess"
                    accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
                  >
                    <i
                      class="el-icon-plus avatar-uploader-icon"
                      style="font-size:6.125rem;color:#ccc;font-weight:300;
                      margin:4.375rem 3.06rem 2.70rem 3.06rem;"
                    ></i>
                  </el-upload>
                </mdb-col>
              </mdb-row>
            </mdb-modal-body>
            <mdb-modal-footer center style="background:#fff;">
              <mdb-btn color="primary" @click.native="changeHeadImg">保存</mdb-btn>
              <mdb-btn outline="primary" @click.native="closeChoose">关闭</mdb-btn>
            </mdb-modal-footer>
          </mdb-modal>
          <!-- </div> -->
          <el-form
            :model="designerLogin"
            :rules="rules"
            ref="designerLogin"
            label-width="2rem"
            :disabled="disabled"
          >
            <mdb-row type="flex" justify="space-around" class="mt-4">
              <mdb-col :span="11">
                <mdb-row>
                  <mdb-col md="3" class="textAlignRight">昵称</mdb-col>
                  <mdb-col md="9">
                    <div class="outline-input mb-3">
                      <mdb-input
                        type="text"
                        size="lg"
                        label="昵称"
                        :disabled="disabled"
                        v-model="userName"
                        outline
                      />
                    </div>
                  </mdb-col>
                </mdb-row>
                <mdb-row>
                  <mdb-col md="3" class="textAlignRight">
                    真实姓名
                    <span class="addRedCricle"></span>
                  </mdb-col>
                  <mdb-col md="9">
                    <div class="outline-input mb-3">
                      <mdb-input
                        type="text"
                        size="lg"
                        label="真实姓名"
                        :disabled="disabled"
                        v-model="designerLogin.realName"
                        outline
                      />
                    </div>
                  </mdb-col>
                </mdb-row>

                <mdb-row>
                  <mdb-col md="3" class="textAlignRight">
                    身份证号码
                    <span class="addRedCricle"></span>
                  </mdb-col>
                  <mdb-col md="9">
                    <div class="outline-input mb-3">
                      <mdb-input
                        type="text"
                        size="lg"
                        label="身份证号码"
                        :disabled="disabled"
                        @change="idCardChange"
                        v-model="designerLogin.idCard"
                        outline
                      />
                    </div>
                  </mdb-col>
                </mdb-row>

                <mdb-row>
                  <mdb-col md="3" class="textAlignRight">邮箱</mdb-col>
                  <mdb-col :md="designerLogin.email?'9':'6'">
                    <div class="outline-input mb-3">
                      <mdb-input
                        type="text"
                        size="lg"
                        label="邮箱"
                        disabled
                        v-model="designerLogin.email"
                        outline
                      />
                    </div>
                  </mdb-col>
                  <mdb-col md="3" v-if="!designerLogin.email">
                    <span class="tagtip" @click="noBindEmail">绑定邮箱</span>
                  </mdb-col>
                </mdb-row>
                <mdb-row>
                  <mdb-col md="3" class="textAlignRight">手机号</mdb-col>
                  <mdb-col :md="phoneNumber?'9':'6'">
                    <div class="outline-input mb-3">
                      <mdb-input
                        type="text"
                        size="lg"
                        label="手机号"
                        disabled
                        v-model="phoneNumber"
                        outline
                      />
                    </div>
                  </mdb-col>
                  <mdb-col md="3" v-if="!phoneNumber">
                    <span class="tagtip" @click="noBindPhone">绑定手机号</span>
                  </mdb-col>
                </mdb-row>
                <mdb-row>
                  <mdb-col md="3" class="textAlignRight">
                    城市
                    <span class="addRedCricle"></span>
                  </mdb-col>
                  <mdb-col md="9">
                    <div class="outline-input mb-3">
                      <mdb-input
                        type="text"
                        size="lg"
                        label="城市"
                        :disabled="disabled"
                        v-model="designerCity"
                        outline
                      />
                    </div>
                  </mdb-col>
                </mdb-row>

                <mdb-row class="mb-3">
                  <mdb-col md="3" class="textAlignRight">
                    地区
                    <span class="addRedCricle"></span>
                  </mdb-col>
                  <mdb-col md="5">
                    <div class="md-outline-select">
                      <label class="label active" :class="disabled?'disabled':''">国家</label>
                      <mdb-select
                        class="mb-3 mt-0"
                        :disabled="disabled"
                        @getValue="getProvinceByNative"
                        :options="options1"
                      />
                    </div>
                  </mdb-col>
                  <mdb-col md="4">
                    <div class="md-outline-select">
                      <label class="label active" :class="disabled?'disabled':''">城市</label>
                      <mdb-select
                        class="mb-3 mt-0"
                        :disabled="disabled||hasProvinceCity"
                        @getValue="getSelectValuePro"
                        :options="options2"
                      />
                    </div>
                  </mdb-col>
                </mdb-row>
                <mdb-row>
                  <mdb-col md="3" class="textAlignRight">
                    邮编
                    <span class="addRedCricle"></span>
                  </mdb-col>
                  <mdb-col md="9">
                    <div class="outline-input mb-3">
                      <mdb-input
                        type="text"
                        size="lg"
                        label="邮编"
                        :disabled="disabled"
                        @change="isNumChange"
                        v-model="workPostcode"
                        outline
                      />
                    </div>
                  </mdb-col>
                </mdb-row>
                <mdb-row style="margin-top:10px">
                  <mdb-col md="4"></mdb-col>
                  <mdb-col md="8">
                    <mdb-input
                      basic
                      max="50"
                      v-if="designerLogin.showOtherCity"
                      v-model="designerLogin.otherCity"
                    ></mdb-input>
                  </mdb-col>
                </mdb-row>
              </mdb-col>
              <mdb-col>
                <span class="tag">*</span>
                <mdb-row class="card-img">
                  <mdb-col col="12">
                    <el-upload
                      class="upload-demo"
                      :action="api.upload()"
                      :before-upload="beforeIDcardUpload"
                      :on-success="cardIDhandleSuccess"
                      accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
                      :show-file-list="false"
                      drag
                    >
                      <img width="100%" v-if="idName" :src="idName" alt class="idCardphoto">
                      <i class="el-icon-circle-plus-outline" v-if="!idName"></i>
                      <div v-if="!idName" class="el-upload__text">身份证扫描件（正面）</div>
                      <div class="el-upload__tip" slot="tip">只能上传jpg/png/jpeg文件，且不超过{{$isLt10M}}Mb</div>
                    </el-upload>
                  </mdb-col>
                  <mdb-col col="12">
                    <el-upload
                      class="upload-demo"
                      :action="api.upload()"
                      :before-upload="beforeIDcardUpload"
                      :on-success="cardIDhandleSuccess0"
                      accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
                      :show-file-list="false"
                      drag
                    >
                      <img width="100%" v-if="idName0" :src="idName0" alt class="idCardphoto">
                      <i class="el-icon-circle-plus-outline" v-if="!idName0"></i>
                      <div v-if="!idName0" class="el-upload__text">身份证扫描件（反面）</div>
                      <div class="el-upload__tip" slot="tip">只能上传jpg/png/jpeg文件，且不超过{{$isLt10M}}Mb</div>
                    </el-upload>
                  </mdb-col>
                </mdb-row>
              </mdb-col>
            </mdb-row>
          </el-form>
        </div>
        <div class="project-case">
          <div class="title">项目作品</div>
          <p class="info">项目作品是建筑师等级认证重要依据,也是客户会员通过作品找到建筑师的重要途径。请上传3个以上作品</p>
          <mdb-row class="clearfix uploadCases">
            <ul class="upLoadCaseImgs fl">
              <li v-for="(item,index) in showCasePictrue" :key="index">
                <div class="imgBox" @click="editCase(item.id)">
                  <img :src="item.url" alt>
                </div>
                <span class="removeIcon" v-if="!disabled" @click="removeCase(item.id)">&times;</span>
              </li>
              <li @click="uploadCase" v-if="!disabled">
                <el-upload
                  class="uploadCase fl"
                  list-type="picture-card"
                  :action="api.upload()"
                  :before-upload="beforeCaseUpload"
                  :disabled="true"
                >
                  <i class="el-icon-circle-plus-outline">
                    <span class="uploadIDCardTips">项目作品上传</span>
                  </i>
                </el-upload>
              </li>
            </ul>
          </mdb-row>
          <mdb-modal size="lg" v-if="upLoadCasedialog" class="modalwrapper modalwrapperLg">
            <mdb-modal-header style="border:none">
              <mdb-modal-title style="width: 100%;">
                <p class="upAloneCase" v-if="!isUpdating">上传个人作品</p>
                <p class="upAloneCase" v-else>更新个人作品</p>
              </mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body>
              <el-form
                ref="upLoadCase"
                :disabled="disabled"
                :rules="upLoadCaseRules"
                :model="desginerCase"
                label-position="top"
                :hide-required-asterisk="false"
              >
                <mdb-row>
                  <mdb-col :span="7">
                    <div class="outline-input mb-3">
                      <mdb-input
                        type="text"
                        size="lg"
                        label="作品名称"
                        :disabled="disabled"
                        v-model="desginerCase.caseName"
                        outline
                      />
                    </div>
                  </mdb-col>
                  <mdb-col :span="11">
                    <mdb-select
                      class="my-2"
                      :disabled="disabled"
                      @getValue="handleChangeBuild"
                      :options="buildingTypesOptions"
                    />
                    <!-- </el-form-item> -->
                  </mdb-col>
                </mdb-row>
                <mdb-row>
                  <mdb-col :span="7">
                    <div class="outline-input mb-3">
                      <mdb-input
                        type="text"
                        size="lg"
                        label="建筑面积（平方米）"
                        :disabled="disabled"
                        v-model="desginerCase.coveredArea"
                        @change="isNumChange2"
                        outline
                      />
                    </div>
                  </mdb-col>
                  <mdb-col class="mt-2" :span="11">
                    <div class="finishTime-wrapper">
                      <mdb-date-picker
                        class="timeWrapper"
                        style="width:100%;"
                        v-model="desginerCase.finishTime"
                        :date="finishDate"
                        :disabled="disabled"
                        :class="disabled?'disabled':''"
                        :limit="limit"
                        @getValue="getPickersValueFinishTime"
                        :option="datePickerOption2"
                      ></mdb-date-picker>
                    </div>
                  </mdb-col>
                </mdb-row>
                <mdb-row>
                  <mdb-col :span="11">
                    <mdb-row>
                      <mdb-col :span="12">
                        <mdb-row>
                          <mdb-col md="6">
                            <mdb-select
                              class="my-2"
                              @getValue="handleCaseLocationChange"
                              :disabled="disabled"
                              :options="cityBuildOptions"
                            />
                          </mdb-col>
                          <mdb-col md="6">
                            <mdb-select
                              :disabled="disabled||hsaTownBuild"
                              class="my-2"
                              @getValue="handleChangeTownOptions"
                              :options="TownOptions"
                            />
                          </mdb-col>
                        </mdb-row>
                      </mdb-col>
                      <mdb-col :span="11">
                        <div class="outline-input mb-3">
                          <mdb-input
                            type="text"
                            size="lg"
                            label="请输入地址"
                            :disabled="disabled"
                            v-if="desginerCase.showCaseLocationOther"
                            v-model="desginerCase.caseLocationOther"
                            outline
                          />
                        </div>
                      </mdb-col>
                    </mdb-row>
                  </mdb-col>
                </mdb-row>
                <mdb-row>
                  <mdb-col :span="23">
                    <div class="finishTime_label mt-3">
                      上传图片
                      <span class="addRedCricle"></span>
                    </div>
                    <p class="info">请上传至少3张项目效果图</p>
                    <ul class="clearfix upCaseImg">
                      <li
                        class="fl"
                        style="height:auto;"
                        v-for="(item,index) in upLoadCaseImg"
                        :key="index"
                      >
                        <div class="imgBox" style="width:9.875rem;height:9.875rem;">
                          <img width="100%" :src="item.url" alt>
                        </div>
                        <mdb-btn
                          @click="imgNameDiaolg(item,index,0)"
                          type="button"
                          color="primary"
                          style="padding:0.5rem"
                          size="sm"
                        >图片名称</mdb-btn>
                        <mdb-btn
                          @click="imgNameDiaolg(item,index,1)"
                          type="button"
                          color="primary"
                          style="padding:0.5rem"
                          size="sm"
                        >图片描述</mdb-btn>
                        <span
                          class="removeIcon"
                          v-if="!disabled"
                          @click="removeCaseImg(item)"
                        >&times;</span>
                      </li>
                      <li class="fl">
                        <el-upload
                          v-show="!disabled"
                          class="uploadIdCard upwrapper upCase fl"
                          list-type="picture-card"
                          :action="api.upload()"
                          :show-file-list="false"
                          :before-upload="beforeCaseUpload"
                          :on-success="upLoadCaseSuccess"
                          accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
                          ref="upload"
                        >
                          <i class="el-icon-circle-plus-outline">
                            <span class="uploadTip">上传图片</span>
                          </i>
                        </el-upload>
                      </li>
                    </ul>
                  </mdb-col>
                </mdb-row>
                <mdb-row>
                  <mdb-col :span="23">
                    <div class="hotLabel">
                      作品介绍
                      <span class="addRedCricle"></span>
                    </div>
                    <div class="outline-input my-3">
                      <mdb-input
                        type="textarea"
                        label="请输入内容"
                        :rows="5"
                        :disabled="disabled"
                        v-model="desginerCase.caseDetail"
                        outline
                      />
                    </div>
                  </mdb-col>
                </mdb-row>
                <mdb-row>
                  <mdb-col md="12">
                    <div class="hotLabel">
                      建筑风格
                      <span class="addRedCricle"></span>
                    </div>
                  </mdb-col>
                </mdb-row>
                <mdb-row style="padding:0 44px;">
                  <mdb-col md="4" v-for="item in hotTags" :key="item.value">
                    <form-inline>
                      <div class="checkbox-teal">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          name="projectType"
                          :id="item.id"
                          :value="item.id"
                          :checked="hotLabels.indexOf(item.value)!=-1"
                          @change="getCheckType(item.value,item.name)"
                          required
                          :disabled="disabled"
                        >
                        <label class="form-check-label" :for="item.id">{{item.name}}</label>
                      </div>
                    </form-inline>
                  </mdb-col>
                </mdb-row>
              </el-form>
              <div class="submit-btn" v-if="disabled">
                <mdb-btn type="primary" color="primary" @click="cancelUpLoadCase">取 消</mdb-btn>
              </div>
              <div class="submit-btn" v-if="!disabled">
                <mdb-btn type="primary" color="primary" v-if="isUpdating" @click="updateCase">确 定</mdb-btn>
                <mdb-btn type="primary" color="primary" v-else @click="sucessUpLoadCase">确 定</mdb-btn>
                <mdb-btn type="primary" color="primary" @click="cancelUpLoadCase">取 消</mdb-btn>
              </div>
            </mdb-modal-body>
          </mdb-modal>
          <imgdialog
            ref="dialog"
            :type="imgType"
            :disabled="disabled"
            :isshow="titlehide"
            :dialogItem="dialogItem"
            @saveDialog="saveDialog"
            @hideDialog="hideDialog"
          ></imgdialog>
          <!-- </el-dialog> -->
        </div>
        <div class="personal-resume">
          <div class="title">
            个人履历
            <span v-if="missPrFile">（*请上传相关证明文件）</span>
          </div>
          <p class="info">学习经历、个人荣誉、专业资料是建筑师等级认证的重要依据，也是客户会员筛选建筑师的重要筛选项，请完整如实填写相关信息并上传证明材料。</p>

          <div>
            <mdb-tab tabs color="primary" class="mx-0" justify v-model="activeName">
              <mdb-tab-item :active="pillsActive==0" @click.native.prevent="pillsActive=0">学习经历</mdb-tab-item>
              <mdb-tab-item :active="pillsActive==1" @click.native.prevent="pillsActive=1">个人荣誉</mdb-tab-item>
              <mdb-tab-item :active="pillsActive==2" @click.native.prevent="pillsActive=2">专业资历</mdb-tab-item>
            </mdb-tab>
            <mdb-tab-content>
              <mdb-tab-pane key="show1" v-if="pillsActive==0">
                <div>
                  <mdb-row>
                    <mdb-col md="11">
                      <template>
                        <tbl bordered>
                          <tbl-head>
                            <tr style="text-align:center">
                              <th>学校名称</th>
                              <th>入学时间</th>
                              <th>毕业时间</th>
                              <th>取得学位</th>
                              <th>学位证书附件</th>
                              <th>操作</th>
                            </tr>
                          </tbl-head>
                          <tbl-body>
                            <tr v-for="(item,idx) in learningExperienceList" :key="idx">
                              <td>
                                <div class="outline-input">
                                  <mdb-input
                                    type="text"
                                    class="pi-input"
                                    size="lg"
                                    label="学校名称"
                                    :disabled="disabled"
                                    v-model="item.school"
                                    outline
                                  />
                                </div>
                              </td>
                              <td class="text-center">
                                <mdb-date-picker
                                  class="marginTop mt-0 pi-input timeWrapper"
                                  v-model="item.timeOfEnrollment"
                                  @getValue="getPickersValueStart(item)"
                                  :disabled="disabled"
                                  :class="disabled?'disabled':''"
                                  :date="item.startDt"
                                  :option="datePickerOption"
                                ></mdb-date-picker>
                              </td>
                              <td class="text-center">
                                <mdb-date-picker
                                  class="marginTop mt-0 pi-input timeWrapper"
                                  v-model="item.graduationDate"
                                  :disabled="disabled"
                                  :class="disabled?'disabled':''"
                                  :date="item.endDt"
                                  @getValue="getPickersValueEnd(item)"
                                  :option="datePickerOption"
                                ></mdb-date-picker>
                              </td>
                              <td>
                                <div class="outline-input">
                                  <mdb-input
                                    type="text"
                                    class="pi-input"
                                    size="lg"
                                    label="学位名称"
                                    :disabled="disabled"
                                    v-model="item.major"
                                    outline
                                  />
                                </div>
                              </td>
                              <td>
                                <el-upload
                                  :disabled="disabled"
                                  class="academic_Certificate uploadeacademic"
                                  :show-file-list="false"
                                  :before-upload="beforeAvatarUpload"
                                  :action="api.upload()"
                                  :on-success="enclosureUploadSuccess"
                                  accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
                                  @click.native="upLoadExprence(idx,item.id)"
                                >
                                  <div v-if="item.pic">已上传</div>
                                  <div v-else>
                                    <i class="el-icon-plus"></i>
                                    <p>传相关证明文件</p>
                                  </div>
                                </el-upload>
                              </td>
                              <td class="text-center">
                                <mdb-btn
                                  :disabled="disabled"
                                  color="primary"
                                  size="sm"
                                  plain
                                  round
                                  @click="handleDelete(idx, item)"
                                >删除</mdb-btn>
                              </td>
                            </tr>
                          </tbl-body>
                        </tbl>
                      </template>
                    </mdb-col>
                    <mdb-col md="1">
                      <mdb-btn
                        style="margin-top:0.8rem"
                        class="designerInfo"
                        color="primary"
                        @click="addLearningExperience()"
                        v-if="!disabled"
                      >
                        <i class="el-icon-plus"></i>
                      </mdb-btn>
                    </mdb-col>
                  </mdb-row>
                </div>
              </mdb-tab-pane>
              <mdb-tab-pane key="show2" v-if="pillsActive==1">
                <div>
                  <mdb-row>
                    <mdb-col md="11">
                      <tbl bordered>
                        <tbl-head>
                          <tr style="text-align:center">
                            <th>荣誉名称</th>
                            <th>荣誉级别</th>
                            <th>授予机构</th>
                            <th>相关证明文件</th>
                            <th>操作</th>
                          </tr>
                        </tbl-head>
                        <tbl-body>
                          <tr v-for="(item,idx) in personalHonorList" :key="idx">
                            <td>
                              <div class="outline-input">
                                <mdb-input
                                  type="text"
                                  class="pi-input"
                                  size="lg"
                                  label="荣誉名称"
                                  :disabled="disabled"
                                  v-model="item.honorName"
                                  outline
                                />
                              </div>
                            </td>
                            <td>
                              <div class="md-outline-select">
                                <!-- <label class="label active"></label> -->
                                <div class="my-0 pi-input select-wrapper md-form">
                                  <span class="caret">▼</span>
                                  <input
                                    type="text"
                                    readonly
                                    v-model="item.honorLevel"
                                    @click="showHonor(idx)"
                                    class="select-dropdown"
                                  >
                                  <ul
                                    v-show="item.showHonorUl"
                                    class="collapse-item dropdown-content select-dropdown"
                                    style="opacity: 1;display:inline-block!important;top:0;width:100%;left:0;"
                                  >
                                    <li class="disabled">
                                      <span class="filtrable">请选择</span>
                                    </li>
                                    <template v-for="(optItem,optIndex) in options">
                                      <li
                                        :key="optIndex"
                                        @click="honorItemClick(idx,optItem.value)"
                                        :class="optItem.value==item.honorLevel?'active':''"
                                      >
                                        <span class="filtrable">{{optItem.value}}</span>
                                      </li>
                                    </template>
                                  </ul>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div class="outline-input">
                                <mdb-input
                                  type="text"
                                  class="pi-input"
                                  size="lg"
                                  label="授予机构"
                                  :disabled="disabled"
                                  v-model="item.issuingAuthority"
                                  outline
                                />
                              </div>
                            </td>
                            <td>
                              <el-upload
                                :disabled="disabled"
                                class="academic_Certificate uploadeacademic"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload"
                                :action="api.upload()"
                                :on-success="honorUploadSuccess"
                                accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
                                @click.native="upLoadExprence(idx,item.id)"
                              >
                                <img
                                  width="100%"
                                  v-if="item.pic"
                                  :src="item.pic"
                                  class="avatar"
                                  alt
                                >
                                <div v-else>
                                  <i class="el-icon-plus"></i>
                                  <p>传相关证明文件</p>
                                </div>
                              </el-upload>
                            </td>
                            <td class="text-center">
                              <mdb-btn
                                :disabled="disabled"
                                color="primary"
                                size="sm"
                                plain
                                round
                                @click="honorDelete(item)"
                              >删除</mdb-btn>
                            </td>
                          </tr>
                        </tbl-body>
                      </tbl>
                    </mdb-col>
                    <mdb-col md="1">
                      <mdb-btn
                        style="margin-top:0.8rem"
                        class="designerInfo"
                        color="primary"
                        v-if="!disabled"
                        @click="addHonor()"
                      >
                        <i class="el-icon-plus"></i>
                      </mdb-btn>
                    </mdb-col>
                  </mdb-row>
                </div>
              </mdb-tab-pane>

              <mdb-tab-pane class key="show3" v-if="pillsActive==2">
                <el-form :model="ruleForm" class="demo-form-inline" :disabled="disabled">
                  <mdb-row>
                    <mdb-col md="6" :span="8" class="mb-3 mt-3">
                      <!-- <label class="item__label">工作年限</label> -->
                      <div class="md-outline-select">
                        <label class="label active">工作年限</label>
                        <mdb-select
                          class="my-0"
                          :disabled="disabled"
                          style="width: 50%;display: inline-block;"
                          @getValue="getSelectValue1"
                          v-if="workLifes"
                          :options="workLifes"
                        />
                      </div>
                    </mdb-col>
                    <mdb-col md="6" :span="8"></mdb-col>
                  </mdb-row>
                  <mdb-row>
                    <mdb-col md="6" :span="8" class="mb-3">
                      <!-- <label class="item__label">执业资格</label> -->
                      <div class="md-outline-select">
                        <label class="label active">执业资格</label>
                        <mdb-select
                          class="my-0"
                          :disabled="disabled"
                          style="width: 50%;display: inline-block;"
                          @getValue="getSelectValue2"
                          v-if="qualifications"
                          :options="qualifications"
                        />
                      </div>
                    </mdb-col>
                    <mdb-col md="6" :span="12">
                      <label class="item__label">上传文件</label>
                      <div class="duty">
                        <ul class="fileUploadAloneDesin fl">
                          <li
                            class="fl flImg"
                            v-for="(item,index) in qualificationPhotoAdressList"
                            :key="index"
                          >
                            <img width="100%" height="100%" :src="item" class="avatar" alt>
                            <div
                              v-if="!disabled"
                              class="updelImg"
                              @click="delImgFun2(item,index,0)"
                            >x</div>
                          </li>
                        </ul>
                        <el-upload
                          v-if="!disabled"
                          class="fl"
                          :show-file-list="false"
                          :before-upload="beforeFileUploadQualification"
                          :action="api.upload()"
                          :on-success="fileUploadSuccessQualification"
                          accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
                        >
                          <mdb-icon far icon="file-alt" style="font-size:20px;color:#4285f4;"/>
                        </el-upload>
                      </div>
                    </mdb-col>
                  </mdb-row>
                  <mdb-row>
                    <mdb-col md="6" :span="8">
                      <!-- <label class="item__label">专业职称</label> -->
                      <div class="md-outline-select">
                        <label class="label active">专业职称</label>
                        <mdb-select
                          class="my-0"
                          :disabled="disabled"
                          style="width: 50%;display: inline-block;"
                          @getValue="getSelectValue3"
                          v-if="qualificationTitles"
                          :options="qualificationTitles"
                        />
                      </div>
                    </mdb-col>
                    <mdb-col md="6" :span="12">
                      <label class="item__label">上传文件</label>
                      <div class="duty">
                        <ul class="fileUploadAloneDesin fl dutyf">
                          <li
                            class="fl flImg"
                            v-for="(item,index) in titlePhotoAdressList"
                            :key="index"
                          >
                            <img width="100%" height="100%" :src="item" class="avatar" alt>
                            <div
                              v-if="!disabled"
                              class="updelImg"
                              @click="delImgFun2(item,index,1)"
                            >x</div>
                          </li>
                        </ul>
                        <el-upload
                          v-if="!disabled"
                          class="fl"
                          :show-file-list="false"
                          :before-upload="beforeFileUploadProfessionalTitle"
                          :action="api.upload()"
                          :on-success="fileUploadSuccessProfessionalTitle"
                          accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
                        >
                          <mdb-icon far icon="file-alt" style="font-size:20px;color:#4285f4;"/>
                        </el-upload>
                      </div>
                    </mdb-col>
                  </mdb-row>
                </el-form>
              </mdb-tab-pane>
            </mdb-tab-content>
          </div>
        </div>

        <div class="team-members">
          <div class="title">
            工作模式
          </div>
          <form :model="workMode" class="team-form-inline mt-5" :disabled="disabled">
            <ul class="chooseWorkingMode">
              <li>
                <mdb-input
                  :disabled="disabled"
                  type="radio"
                  id="workModeTeamTypeRadio1"
                  name="workModeTeamTypeRadioGroup"
                  value="1"
                  label="独立建筑师"
                  @input="chooseWorkingMode"
                  v-if="workMode.teamType"
                  :checked="workMode.teamType==1"
                />
                <mdb-row v-if="workMode.teamType==1" class="marginBottomRow">
                  <mdb-col>
                    <!-- <label class="item__label">团队人员数量</label> -->
                    <div class="md-outline-select">
                      <label class="label active">团队人员数量</label>
                      <mdb-select
                        class="my-0"
                        style="width: 50%;display: inline-block;"
                        color="primary"
                        @getValue="getSelectValue"
                        :options="teamNumbers"
                      />
                    </div>
                  </mdb-col>
                  <mdb-col :span="14">
                    <div class="clearfix AloneDesign">
                      <p class="fl">相关证明文件附件（团队成员身份证、手机号码）</p>
                      <ul class="fileUploadAloneDesin fl">
                        <li
                          class="fl flImg"
                          v-for="(item,index) in workMode.aloneArchitectAdressList"
                          :key="index"
                        >
                          <img width="100%" height="100%" :src="item" class="avatar" alt>
                          <div v-if="!disabled" class="updelImg" @click="delImgFun(item,index,0)">x</div>
                        </li>
                      </ul>
                      <el-upload
                        class="fl"
                        :show-file-list="false"
                        :before-upload="beforeFileUploadAloneDesin"
                        :action="api.upload()"
                        :on-success="fileUploadSuccessAloneDesin"
                        accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
                      >
                        <mdb-icon far icon="file-alt" style="font-size:20px;color:#4285f4;"/>
                      </el-upload>
                    </div>
                  </mdb-col>
                </mdb-row>
              </li>
              <li>
                <mdb-input
                  :disabled="disabled"
                  type="radio"
                  id="workModeTeamTypeRadio2"
                  name="workModeTeamTypeRadioGroup"
                  value="2"
                  label="建筑事务所或工作室"
                  @input="chooseWorkingMode"
                  v-if="workMode.teamType"
                  :checked="workMode.teamType==2"
                />
                <mdb-row v-if="workMode.teamType==2" class="marginBottomRow">
                  <mdb-col>
                    <div class="outline-input">
                      <mdb-input
                        style="width: 50%;display: inline-block;"
                        type="text"
                        size="lg"
                        label="建筑事务所或工作室名称"
                        :disabled="disabled"
                        v-model="workMode.scale"
                        outline
                      />
                    </div>
                  </mdb-col>
                  <mdb-col :span="14">
                    <div class="clearfix AloneDesign">
                      <p class="fl">相关证明文件附件（公司营业执照、法人身份证）</p>
                      <ul class="fileUploadAloneDesin fl">
                        <li
                          class="fl flImg"
                          v-for="(item,index) in workMode.studioAdressList"
                          @click="downLoadeStudio(index)"
                          :key="index"
                        >
                          <img width="100%" height="100%" :src="item" class="avatar" alt>
                          <div v-if="!disabled" class="updelImg" @click="delImgFun(item,index,1)">x</div>
                        </li>
                      </ul>
                      <el-upload
                        :disabled="disabled"
                        class="fl"
                        :show-file-list="false"
                        :before-upload="beforeFileUploadStudio"
                        :action="api.upload()"
                        :on-success="fileUploadSuccessStudio"
                      >
                        <mdb-icon far icon="file-alt" style="font-size:20px;color:#4285f4;"/>
                      </el-upload>
                    </div>
                  </mdb-col>
                </mdb-row>
              </li>
              <li>
                <mdb-input
                  :disabled="disabled"
                  type="radio"
                  id="workModeTeamTypeRadio3"
                  name="workModeTeamTypeRadioGroup"
                  value="3"
                  label="院企设计团队"
                  @input="chooseWorkingMode"
                  v-if="workMode.teamType"
                  :checked="workMode.teamType==3"
                />
                <mdb-row v-if="workMode.teamType==3" class="marginBottomRow">
                  <mdb-col>
                    <div class="outline-input">
                      <mdb-input
                        style="width: 50%;display: inline-block;"
                        type="text"
                        size="lg"
                        label="工作单位及所在部门名称"
                        :disabled="disabled"
                        v-model="workMode.enterpriseTeamNumber"
                        outline
                      />
                    </div>
                  </mdb-col>
                  <mdb-col :span="14">
                    <div class="clearfix AloneDesign">
                      <span class="fl">相关证明文件附件（公司营业执照、相关成员工作证复印件、手机号码）</span>
                      <ul class="fileUploadAloneDesin fl">
                        <li
                          class="fl flImg"
                          v-for="(item,index) in workMode.enterpriseAdressList"
                          :key="index"
                        >
                          <img width="100%" height="100%" :src="item" class="avatar" alt>
                          <div v-if="!disabled" class="updelImg" @click="delImgFun(item,index,2)">x</div>
                        </li>
                      </ul>
                      <el-upload
                        :disabled="disabled"
                        class="fl"
                        :show-file-list="false"
                        :before-upload="beforeFileUploadenterpriseTeam"
                        :action="api.upload()"
                        :on-success="fileUploadSuccessenterpriseTeam"
                      >
                        <mdb-icon far icon="file-alt" style="font-size:20px;color:#4285f4;"/>
                      </el-upload>
                    </div>
                  </mdb-col>
                </mdb-row>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div class="submit-btn" v-if="!disabled">
        <mdb-btn type="primary" color="primary" @click="resetForm('ruleForm')">暂存</mdb-btn>
        <mdb-btn type="primary" color="primary" @click="submitForm('ruleForm')">提交审核</mdb-btn>
      </div>
      <div class="submit-btn" v-else>
        <mdb-btn type="primary" color="primary" v-if="disabled" @click="disabled=false">编辑</mdb-btn>
      </div>
      <mdb-modal
        size="lg"
        centered
        v-if="centerDialogVisible"
        @hide="handleClose"
        @close="centerDialogVisible = false"
        info
      >
        <mdb-modal-header :close="false" class="text-center">
          <p  class="heading" style="width: 100%;">提示</p>
        </mdb-modal-header>
        <mdb-modal-body>
          <div class="icon-text">
            <div class="operation">已成功提交审核资料，请等待审核结果。</div>
            <div>您可以关注公众号绑定微信号，第一时间掌握合筑最新资讯。</div>
          </div>
          <div class="middle">
            <div class="wechat-img">
              <img src="@/assets/images/publicAddress.png">
            </div>
            <div class="detail">合筑空间公众号</div>
          </div>
        </mdb-modal-body>
      </mdb-modal>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import Stepper from "@/components/Stepper";
import imgdialog from "@/components/imgdialog";
import bindPhoneEmail from "@/components/bindPhoneEmail";
export default {
  data() {
    return {
      backgroundDiv: {
        backgroundImage: "url(" + this.head + ")"
      },
      flipped: false,
      headPhoto: null,
      headPhotoName: null,
      modal: false,
      filter: 0,
      select: 0,
      min: 0,
      changePhone: false,
      imgType: 0,
      imgIndex: "",
      dialogItem: "",
      titlehide: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      designerCity: "", //城市
      workPostcode: "", //邮编
      getProvinceCity: "",
      getProvinceTown: "",
      getProvinceTownList: [],
      getProvinceCityBuild: "",
      getProvinceTownBuild: "",
      getProvinceTownListBuild: [],
      limit: [
        {
          type: "weekday",
          available: [1, 2, 3, 4, 5, 6, 0]
        },
        {
          type: "fromto",
          from: "",
          to: new Date()
        }
      ],
      finishDate: {
        time: ""
      },
      startDate1: {
        time: "2019-04-26"
      },
      startDate2: {
        date: ""
      },
      datePickerOption2: {
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
        placeholder: "完成时间",
        inputStyle: {
          width: "100%",
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
      datePickerOption: {
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
        placeholder: "请选择时间",
        inputStyle: {
          width: "100%",
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

      progressStep: [
        { id: "1", name: "注册完成" },
        { id: "2", name: "填写验证资料" },
        { id: "3", name: "提交验证" },
        { id: "4", name: "通过验证" }
      ],
      pillsActive: 0,
      locations: [],
      centerDialogVisible: false,
      isUpdating: false,
      missPrFile: false,
      missWmFile: false,
      options: [
        // { text: '请选择', value: null, disabled: true, selected: true },
        {
          value: "国家级及以上",
          text: "国家级及以上"
        },
        {
          value: "地区及市一级",
          text: "地区及市一级"
        },
        {
          value: "其他",
          text: "其他"
        }
      ],
      type: "", // 提交或保存
      disabled: false,
      currentExprenceUploadIndex: -1,
      currentDesignerId: -1, // 当前设计师学习经历的id
      isShowUpload: false, // 是否显示上传文件的按钮
      isbuttnShow: true, // 上传作品的按钮是否显示
      upLoadCasedialog: false, // 上传作品弹出框
      issubmitAxamine: false, // 是否可以提交审核（false不可以；true可以）
      learanceID: 0, // 学习经历id(自定义)
      realName: "", // 真实姓名
      idCard: " ", // 身份证号
      email: " ", // 邮箱
      openId: "", // 微信号
      belong: -1,
      designerLogin: {
        realName: "", // 真实姓名
        idCard: " ", // 身份证号
        email: " ", // 邮箱
        openId: "", // 微信号
        defaultlocation: [],
        otherCity: "",
        showOtherCity: false
      },
      rules: {
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 2, max: 16, message: "长度在 2 到 16 个字符", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        idCard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          {
            pattern: /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/,
            message: "身份号码格式不对",
            trigger: "blur"
          }
        ],
        defaultlocation: [
          {
            required: true,
            message: "请选择工作地点",
            trigger: ["blur", "change"]
          }
        ]
      }, // 个人基本信息验证规则
      adeptType: "0", // int类型；是否拥有设计公司、事务所或工作室的团队（0是，1否）
      auditState: 0, // 审核状态 1:完善信息 2:已提交 3:已验证
      collection: "", // 收藏
      concernNumber: 0, // 关注数
      count: 0,
      createTime: "",
      creationProcess: "", // 创作历程
      data: "", // 资料
      buildingTypes: [], // 建筑类型集合（自己定义的）
      hotTags: [],
      desginerCase: {
        // 上传项目作品的数据
        caseLocation: [], // 建筑地点
        caseLocationOther: "", // 建筑地点(其他)
        showCaseLocationOther: false,

        buildingType: [], // 建筑类型int类型
        caseDetail: " ", // 作品详情
        caseName: " ", // 作品名称
        caseType: [], // 作品类型（0代表设计机构作品，1代表设计师作品）
        coveredArea: "", // 建筑面积
        designerId: null, // 设计师id
        designerSerial: "", // 设计师平台编号
        finishTime: null, // 完成时间
        hotLabel: "", // 热标签
        id: 0,
        pictureArray: [], // 图片路径
        pictureName: "" // 上传的图片名称
      },
      upLoadCaseRules: {
        caseName: [
          { required: true, message: "请输入作品名称", trigger: "blur" },
          { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
        ],
        buildingType: [
          { required: true, message: "请选择建筑类型", trigger: "blur" }
        ],
        coveredArea: [
          { required: true, message: "请输入建设面积", trigger: "blur" },
          {
            pattern: /^[0-9]*$/,
            message: "必须全部是数字",
            trigger: "blur"
          }
        ],
        finishTime: [
          { required: true, message: "请选择完成时间", trigger: "blur" }
        ],
        caseLocation: [
          { required: true, message: "请选择建筑地点", trigger: "blur" }
        ]
      },
      // 项目列表
      desginerCaseList: [],
      upLoadCaseImg: [], // 图片名称地址（自己定义的）
      showCasePictrue: [], // 展示作品列表图片
      designerHonor: "", // 设计师荣誉
      designerSerial: "", // 设计师平台编号
      head: "", // 设计师头像
      headImg: "", // 设计师头像地址（自定义字段）
      homePage: "", // // 首页
      id: 17,
      // idCard: 'string', // 身份证号码
      idName: "", // 身份证名称(----------------自己写------------------)
      idCardPhoto: "", // 身份证图片地址
      idCardPicture: "", // 反面
      idName0: "",
      learningExperience: {}, // 学习经历（表单中使用）
      learningExperienceList: [],
      nativePlace: "", // 籍贯
      passWord: "", // 密码
      designerPersonHonor: {}, // 个人荣誉（=======自己定义=======）
      personalHonorList: [],
      quaPhoto: "", // 证书附件
      quaPhotoList: [], // 自己定义附件证书集合
      proveUrl: [], // 相关证明文件附件的名称（====自己定义的======）
      Enclosure: {}, // 附件名称（=====自己定义的===）
      qualification: "", // 资格证书
      recommend: "", // 推荐
      recommendDescription: "", // 设计师自荐描述,用来主要做搜索的
      seniorDesign: 1, // 是否是设计大咖
      status: 0,
      tag: "", // 标签
      teamNumber: 0, // 团队成员数量
      teamNumbers: [
        { text: "请选择", value: null, disabled: true, selected: true }
      ], // 从数据字典获取的团队人数的数据（===自己定义===）
      teamPhoto: "", // 团队照片地址
      teamType: 1, // // 团队类型： 0.个人/团队  1.设计公司
      teamTypes: [], // 从数据字典获取的团队类型的数据（===自己定义===）
      workLifes: [], // 从数据字典获取的工作年限的数据（===自己定义===）
      qualifications: [], // 从数据字典获取的职业资格的数据（===自己定义===）
      qualificationTitles: [], // 从数据字典获取的专业职称的数据（===自己定义===）

      title: "", // 职称
      updateTime: "", // 修改信息时间
      userName: "", // 用户名
      phoneNumber: "", //手机号
      workLife: "", // 工作年限
      workplace: "", // 工作地点
      FileUploadAloneDesinList: [], // 独立建筑师上传团队成员身份证、手机号码
      qualificationPhoto: "", // 职业资格上传相关证明文件名称
      qualificationPhotoList: [], // 职业资格上传相关证明文件名称
      qualificationPhotoAdressList: [], // 职业资格上传相关证明文件地址

      titlePhoto: "", // 专业职称上传相关证明文件名称
      titlePhotoList: [], // 专业职称上传相关证明文件名称
      titlePhotoAdressList: [], // 专业职称上传相关证明文件地址
      checked: true,
      radio: "1",
      radio2: "1",
      imageUrl: "",
      amount: "",
      cardIDdialogImageUrl: "",
      cardIDdialogVisible: false,
      fileList: [],
      ruleForm: {},
      workMode: {
        teamType: "",
        aloneArchitect: true, // 是否是独立建筑师
        teamScale: "", // 独立建筑师的团队数量
        aloneArchitectFile: "", // 相关证明文件附件（团队成员身份证、手机 号）
        aloneArchitectList: [], // 独立建筑师上传相关证明文件名称
        aloneArchitectAdressList: [], // 独立建筑师上传相关证明文件地址

        studio: 0, // 建筑事务所或工作室
        scale: "", // 公司规模
        studioUploadFile: "", // 建筑事务所或工作室上传附件（公司营业照、法人身份证）
        studioList: [], // 建筑事务所或工作室上传相关证明文件名称
        studioAdressList: [], // 建筑事务所或工作室上传相关证明文件地址

        hospitalEnterprise: 0, // 院企设计团队
        enterpriseTeamNumber: "", // 团队规模
        enterpriseuploadFile: "", // 上传附件(公司营业照、相关成员工作证福硬件、手机号)
        enterpriseList: [], // 建院企设计团队上传相关证明文件名称
        enterpriseAdressList: [] // 建院企设计团队上传相关证明文件地址
      },
      hotLabels: [], // 建筑风格
      activeName: "first", // 个人履历tab栏切换类
      options1: [
        { text: "请选择", value: null, disabled: true, selected: true }
      ], //工作地址
      options2: [
        { text: "请选择", value: null, disabled: true, selected: true }
      ],
      // validateCode: '',
      // verifiCodeErrors: '',
      // hasSendCodeToEmail: false,
      // hasSendCodeToPhone: false,
      // hasSendCodeToEmail: false,
      // hasSendCodeToPhone: false,
      // step: 1,
      // changeEmail: false,
      // changePhone: false,
      // btnText: '获取验证码',
      // timer: null,
      // newPhoneNumber: '',
      // newEmail: '',
      bindPhoneEmailObj: {
        email: "",
        step: 1,
        changeEmail: false,
        changePhone: false,
        phoneNumber: ""
      },
      cityBuildOptions: [
        { text: "请选择建筑地点", value: null, disabled: true, selected: true }
      ],
      TownOptions: [
        { text: "请选择建筑地点", value: null, disabled: true, selected: true }
      ],
      buildingTypesOptions: [
        { text: "请选择项目类型", value: null, disabled: true, selected: true }
      ]
    };
  },
  computed: {
    activeIndex() {
      return this.auditState ? this.auditState + 1 : 2;
    },
    hasProvinceCity: function() {
      if (this.getProvinceCity) {
        return false;
      } else {
        return true;
      }
    },
    hsaTownBuild: function() {
      if (this.getProvinceCityBuild && this.getProvinceCityBuild != "830000") {
        return false;
      } else {
        return true;
      }
    }
  },
  mounted() {
    // this.id = this.$route.params.id - 0
    this.id =
      localStorage.getItem("userId") || sessionStorage.getItem("userId");
    // 从数据字典获取相关数据
    this.getProvince();
    this.chooseTeamNumber();
    this.chooseWorkLife();
    this.chooseQualification();
    this.chooseQualificationTitle();
    this.getBuildingTypes();
    this.getHotLabel();
    this.getDesingerDetailByDesignerId({ id: this.id });
    this.getNation(); // 地区
  },
  methods: {
    // 删除图片工作模式
    delImgFun(item, index, type) {
      if (type == 0) {
        this.workMode.aloneArchitectList.splice(index, 1);
        this.workMode.aloneArchitectFile = this.workMode.aloneArchitectList.join(
          ","
        );
        this.workMode.aloneArchitectAdressList.splice(index, 1);
      } else if (type == 1) {
        this.workMode.studioList.splice(index, 1);
        this.workMode.studioUploadFile = this.workMode.studioList.join(",");
        this.workMode.studioAdressList.splice(index, 1);
      } else {
        this.workMode.enterpriseList.splice(index, 1);
        this.workMode.enterpriseuploadFile = this.workMode.enterpriseList.join(
          ","
        );
        this.workMode.enterpriseAdressList.splice(index, 1);
      }
    },
    // 删除图片专业资质
    delImgFun2(item, index, type) {
      if (type == 1) {
        this.titlePhotoList.splice(index, 1);
        this.titlePhotoAdressList.splice(index, 1);
        this.titlePhoto = this.titlePhotoList.join(",");
      } else {
        this.qualificationPhotoList.splice(index, 1);
        this.qualificationPhotoAdressList.splice(index, 1);
        this.qualificationPhoto = this.qualificationPhotoList.join(",");
      }
    },
    // 荣誉证书
    getSelectValueHonor(item) {
      console.log(item);
    },
    showHonor(index) {
      if (this.disabled) {
        return;
      }
      this.personalHonorList.map((item, i) => {
        if (i == index) {
          this.$set(item, "showHonorUl", true);
        } else {
          this.$set(item, "showHonorUl", false);
        }
      });
    },
    // 荣誉级别选择
    honorItemClick(index, value) {
      this.personalHonorList[index].honorLevel = value;
      this.$set(this.personalHonorList[index], "showHonorUl", false);
    },
    // 专业资质
    getSelectValue1(value) {
      this.workLife = value;
    },
    getSelectValue2(value) {
      this.qualification = value;
    },
    getSelectValue3(value) {
      this.title = value;
    },
    getSelectValue(value) {
      this.workMode.teamScale = value;
    },
    // 添加作品下拉框
    handleChangeBuild(value) {
      this.desginerCase.buildingType = value;
    },
    handleChangeCityBuild(value) {
      this.getProvinceCity = value;
    },
    handleChangeTownOptions(value) {
      this.getProvinceTownBuild = value;
    },
    openFilter() {
      if (this.disabled) {
        return;
      }
      this.modal = true;
    },
    selectFilterOne(val) {
      var img = "";
      // img=this.$refs.imgOne.src
      this.select = val;
    },
    chooseFilter() {
      this.flipped = true;
      this.select = 0;
      // if(this.headPhoto==null){
      //   this.headPhoto=this.head
      // }
    },
    closeChoose() {
      this.headPhoto = null;
      this.modal = false;
    },
    // updateHeadImg(){
    //   this.modal =true
    // },
    changeHeadImg() {
      // if(this.headPhoto==null){
      //   this.headPhoto=this.headImg
      // }
      this.api
        .getDesignerInfoUpdateNew(
          {
            id: this.id,
            // updateType:3,
            head: this.headPhotoName,
            type: 3,
            filter: this.select
          },
          3
        )
        .then(res => {
          if (res.code !== 0) {
            this.$message.error(res.msg);
            // this.$notify.info({message: res.msg, position: 'top center', timeOut: 1000});
          } else {
            this.$message.info(res.msg);
            this.modal = false;
            this.filter = this.select;
            // this.getDesignerInfo()
          }
        });
    },
    noBindPhone() {
      this.bindPhoneEmailObj.changePhone = true;
      this.bindPhoneEmailObj.step = 2;
    },
    noBindEmail() {
      this.bindPhoneEmailObj.changeEmail = true;
      this.bindPhoneEmailObj.step = 2;
    },
    // 绑定成功后的回调
    bindBack(backItem, boole) {
      if (boole) {
        this.designerLogin.email = backItem.email;
      } else {
        this.phoneNumber = backItem.phoneNumber;
      }
      // this.getCustomerInfo()
    },
    getNation() {
      this.api.getNation().then(res => {
        // this.options1= res.data
        // let options = res.data
        // options.map(item=>{
        //   item.text=item.label
        //   if(item.label == this.getProvinceCity){
        //     item.selected = true
        //   }
        // });
        // this.options1= options
        let selpotions = [
          { text: "请选择", value: null, disabled: true, selected: true }
        ];
        res.data.map(item => {
          selpotions.push({
            text: item.label,
            value: item.value,
            selected: false
          });
        });
        selpotions.map(item => {
          if (item.value == this.getProvinceCity) {
            item.selected = true;
          } else {
            item.selected = false;
          }
        });
        this.options1 = selpotions;
      });
    },
    getProvinceByNative(value) {
      if (!value) {
        return;
      }
      this.getProvinceCity = value;
      this.api.getProvince(value).then(res => {
        // this.options2 = res.data
        // let options = res.data
        // options.map(item=>{
        //   item.text=item.label
        //   if(item.label == this.getProvinceTown){
        //     item.selected = true
        //   }
        // });
        // this.options2= options
        let selpotions = [
          { text: "请选择", value: null, disabled: true, selected: true }
        ];
        res.data.map(item => {
          selpotions.push({
            text: item.label,
            value: item.value,
            selected: false
          });
        });
        selpotions.map(item => {
          if (item.value == this.getProvinceTown) {
            item.selected = true;
          } else {
            item.selected = false;
          }
        });
        this.options2 = selpotions;
      });
    },
    getSelectValuePro(value) {
      this.getProvinceTown = value;
    },
    // 图片弹框
    imgNameDiaolg(item, index, type) {
      this.titlehide = true;
      this.dialogItem = item;
      this.imgIndex = index;
      this.imgType = type;
      this.$refs.dialog.upDateVal(item, type);
    },
    hideDialog() {
      this.titlehide = false;
    },
    saveDialog(item) {
      this.upLoadCaseImg[this.imgIndex] = item;
      this.titlehide = false;
    },
    getPickersValue(value) {},
    getPickersValueFinishTime() {
      this.desginerCase.finishTime = this.finishDate.time;
    },
    getPickersValueStart(item) {
      item.timeOfEnrollment = item.startDt.time;
    },
    getPickersValueEnd(item) {
      item.graduationDate = item.endDt.time;
    },

    getProvince() {
      this.api.projectGetProvince().then(res => {
        if (res.code === 0) {
          this.locations = res.data;
          let selpotions = [
            {
              text: "请选择建筑地点",
              value: null,
              disabled: true,
              selected: true
            }
          ];
          if (res.data) {
            res.data.map(item => {
              selpotions.push({
                text: item.label,
                value: item.value,
                selected: false
              });
            });
          }
          this.cityBuildOptions = selpotions;
        }
      });
    },
    handleChange(value) {
      if (value == "830000") {
        this.designerLogin.showOtherCity = true;
      } else {
        this.designerLogin.showOtherCity = false;
      }
      this.handleChangeTown(value);
    },
    handleChangeTown(value) {
      if (value == "830000") {
        this.getProvinceTownList = [];
      } else {
        this.locations.forEach(item => {
          if (item.value == value) {
            this.getProvinceTownList = item.children;
          }
        });
      }
    },
    handleCaseLocationChange(value) {
      if (value == "830000") {
        this.desginerCase.showCaseLocationOther = true;
      } else {
        this.desginerCase.showCaseLocationOther = false;
      }
      this.getProvinceCityBuild = value;
      this.handleCaseLocationChangeBuild(value);
    },
    handleCaseLocationChangeBuild(value) {
      if (value == "830000") {
        this.getProvinceTownListBuild = [];
      } else {
        this.locations.forEach(item => {
          if (item.value == value) {
            this.getProvinceTownListBuild = item.children;
            let selpotions = [
              {
                text: "请选择建筑地点",
                value: null,
                disabled: true,
                selected: true
              }
            ];
            if (item.children) {
              item.children.map(item => {
                selpotions.push({
                  text: item.label,
                  value: item.value,
                  selected: false
                });
              });
            }
            selpotions.map(item => {
              if (item.value == this.getProvinceTownBuild) {
                item.selected = true;
              } else {
                item.selected = false;
              }
            });
            this.TownOptions = selpotions;
          }
        });
      }
    },
    getCheckType(val, name) {
      let hotArr = this.hotLabels;
      let removeIdx = null;
      for (let index = 0; index < hotArr.length; index++) {
        if (hotArr[index] == val) {
          removeIdx = index;
        }
      }
      if (removeIdx != null) {
        this.hotLabels.splice(removeIdx, 1);
      } else {
        this.hotLabels.push(val);
      }
    },
    // 从数据字典获取相关数据
    getBuildingTypes() {
      this.api.getBuildingTypes().then(res => {
        if (res.code !== 0) {
          return;
        }

        this.buildingTypes = res.data;
        let selpotions = [
          {
            text: "请选择项目类型",
            value: null,
            disabled: true,
            selected: true
          }
        ];
        if (res.data) {
          res.data.map(item => {
            selpotions.push({
              text: item.name,
              value: item.value,
              selected: false
            });
          });
        }
        this.buildingTypesOptions = selpotions;
      });
    },
    // 从数据字典获取相关数据
    getHotLabel() {
      this.api.getHotLabel().then(res => {
        if (res.code !== 0) {
          return;
        }
        this.hotTags = res.data;
      });
    },
    // 点击团队类型的下拉框时从数据字典获取数据初始化团队人数
    chooseTeamNumber() {
      this.api.getTeamNumber(null).then(res => {
        if (res.code === 0) {
          this.teamNumbers = JSON.parse(
            JSON.stringify(res.data).replace(/name/g, "text")
          );
        }
      });
    },
    // 点击工作年限的下拉框时从数据字典获取数据初始化工作年限
    chooseWorkLife() {
      this.api.getWorkLife(null).then(res => {
        if (res.code === 0) {
          // this.workLifes = res.data;
          // let workLifes = res.data
          // workLifes.map(item=>{
          //   item.text=item.name
          //   if(item.value == this.workLife){
          //     item.selected = true
          //   }
          // });
          // this.workLifes = workLifes
          let selpotions = [
            { text: "工作年限", value: null, disabled: true, selected: true }
          ];
          if (res.data) {
            res.data.map(item => {
              selpotions.push({
                text: item.name,
                value: item.value,
                selected: false
              });
            });
          }
          selpotions.map(item => {
            if (item.value == this.workLife) {
              item.selected = true;
            } else {
              item.selected = false;
            }
          });
          this.workLifes = selpotions;
        }
      });
    },
    // 点击职业资格的下拉框时从数据字典获取数据初始化职业资格
    chooseQualification() {
      this.api.getQualification(null).then(res => {
        if (res.code === 0) {
          // let qualifications = res.data
          // qualifications.map(item=>{
          //   item.text=item.name
          //   if(item.value == this.qualification){
          //     item.selected = true
          //   }
          // });
          // this.qualifications = qualifications
          let selpotions = [
            { text: "执业资格", value: null, disabled: true, selected: true }
          ];
          if (res.data) {
            res.data.map(item => {
              selpotions.push({
                text: item.name,
                value: item.value,
                selected: false
              });
            });
          }
          selpotions.map(item => {
            if (item.value == this.qualification) {
              item.selected = true;
            } else {
              item.selected = false;
            }
          });
          this.qualifications = selpotions;
        }
      });
    },
    // 点击专业职称的下拉框时从数据字典获取数据初始化职专业职称
    chooseQualificationTitle() {
      this.api.getQualificationTitle(null).then(res => {
        if (res.code === 0) {
          // let qualificationTitles = res.data
          // qualificationTitles.map(item=>{
          //   item.text=item.name
          //   if(item.value == this.title){
          //     item.selected = true
          //   }
          // });
          // this.qualificationTitles = qualificationTitles
          let selpotions = [
            { text: "专业职称", value: null, disabled: true, selected: true }
          ];
          if (res.data) {
            res.data.map(item => {
              selpotions.push({
                text: item.name,
                value: item.value,
                selected: false
              });
            });
          }
          selpotions.map(item => {
            if (item.value == this.title) {
              item.selected = true;
            } else {
              item.selected = false;
            }
          });
          this.qualificationTitles = selpotions;
        }
      });
    },
    // 通过设计师id货物设计师详情
    getDesingerDetailByDesignerId(id) {
      this.api.getDesingerDtailByDesinerId(id).then(res => {
        if (res.msg === "此设计师不存在！") {
          this.$message("此设计师不存在");
          return;
        }
        this.$nextTick(() => {
          if (res.code !== 0) {
            return;
          }
          for (let item in res.data.designerDO) {
            if (res.data.designerDO[item] == null) {
              res.data.designerDO[item] = "";
            }
          }
          let {
            adeptType,
            auditState,
            belong,
            collection,
            concernNumber,
            concernStatus,
            count,
            createTime,
            creationProcess,
            data,
            // desginerCaseList,
            designerHonor,
            designerSerial,
            email,
            head,
            homePage,
            id,
            idCard,
            idCardPhoto,
            idCardPicture,
            learningExperienceList,
            mark,
            nativePlace,
            openId,
            passTime,
            passWord,
            personalHonorList,
            quaPhoto,
            qualification,
            realName,
            recommend,
            recommendDescription,
            seniorDesign,
            status,
            tag,
            phoneNumber,
            teamNumber,
            workPostcode,
            teamPhoto,
            teamType,
            title,
            updateTime,
            userName,
            workLife,
            qualificationPhoto,
            titlePhoto,
            aloneArchitect,
            aloneArchitectFile,
            teamScale,
            scale,
            studio,
            studioUploadFile,
            enterpriseuploadFile,
            hospitalEnterprise,
            enterpriseTeamNumber,
            workCity,
            workplace,
            filter
          } = res.data.designerDO;
          if (workCity) {
            let temWorkCity = workCity.split(",");

            if (temWorkCity[0] == "830000") {
              this.designerLogin.defaultlocation = ["830000"];
              this.designerLogin.otherCity = temWorkCity[1];
              this.designerLogin.showOtherCity = true;
            } else {
              this.designerLogin.defaultlocation = temWorkCity;
              // this.handleChangeTown(temWorkCity[0]);
              this.getProvinceCity = temWorkCity[0];
              this.options1.map(item => {
                if (item.value == this.getProvinceCity) {
                  item.selected = true;
                } else {
                  item.selected = false;
                }
              });
              this.getProvinceByNative(this.getProvinceCity);
              this.getProvinceTown = temWorkCity[1];
              this.designerCity = temWorkCity[2];
            }
          }

          this.adeptType = adeptType + "";
          // adeptType: null
          this.auditState = auditState;
          this.$store.commit("SetAuditState", this.auditState);
          this.disabled = auditState > 1;
          // auditState: 2
          this.belong = belong;
          // belong: 1
          this.collection = collection;
          // collection: null
          this.concernNumber = concernNumber;
          // concernNumber: 0
          this.concernStatus = concernStatus;
          // concernStatus: null
          this.count = count;
          // count: null
          this.createTime = createTime;
          this.filter = filter;
          this.select = filter;
          // createTime: null
          this.creationProcess = creationProcess;
          // creationProcess: null
          this.data = data;
          // data: null
          // this.desginerCaseList = desginerCaseList || []
          // desginerCaseList: null
          this.designerHonor = designerHonor;
          this.workPostcode = workPostcode;
          // designerHonor: null
          this.designerSerial = designerSerial;
          // designerSerial: 'coolarch001006'
          this.designerLogin.email = email;
          // email: null
          this.head = head;
          // head: null
          this.homePage = homePage;
          // homePage: null
          this.id = id;
          // id: 17
          this.designerLogin.idCard = idCard;
          // idCard: '123142'
          this.idCardPhoto = idCardPhoto;
          this.idCardPicture = idCardPicture;
          // idCardPhoto: null
          this.learningExperienceList = learningExperienceList || [
            {
              createTime: "", // 设计师注册时间
              designerId: this.id, // this.desId
              id: this.learanceID++,
              graduationDate: "", // 毕业时间
              timeOfEnrollment: "", // 入学时间
              quaPhoto: "", // 学位证书附件名称
              major: "", // 专业
              school: "",
              time: "",
              pic: "", // 自定义====学位证书附件地址
              updatePersonId: 0,
              updateTime: "",
              isdisabledlearnExprence: false // 是否禁止学习经历编辑
            }
          ];
          for (
            let index = 0;
            index < this.learningExperienceList.length;
            index++
          ) {
            this.learningExperienceList[index].startDt = {
              time: this.learningExperienceList[index].timeOfEnrollment
            };
            this.learningExperienceList[index].endDt = {
              time: this.learningExperienceList[index].graduationDate
            };
          }
          // learningExperienceList: null
          this.mark = mark;
          // mark: 99
          this.nativePlace = nativePlace;
          // nativePlace: null
          this.designerLogin.openId = openId;
          // openId: null
          this.passTime = passTime;
          // passTime: null
          this.passWord = passWord;
          // passWord: '123456'
          this.personalHonorList = personalHonorList || [
            {
              createPersonId: 0,
              createTime: "",
              designerId: this.id, // this.desId
              honorLevel: "", // 荣誉级别
              honorName: "", // 荣誉名称
              id: this.learanceID++,
              issuingAuthority: "", // 授予机构
              honorPhoto: "", // 荣誉证书附件
              pic: "",
              time: "",
              updatePersonId: 0,
              updateTime: "",
              isHonorDisabled: false
            }
          ];
          // personalHonorList: null
          this.quaPhoto = quaPhoto;
          // quaPhoto: null
          this.qualification = qualification ? qualification + "" : "";
          this.qualifications.map(item => {
            if (item.value == qualification) {
              item.selected = true;
            } else {
              item.selected = false;
            }
          });
          // qualification: null
          this.designerLogin.realName = realName;
          // realName: '小红'
          this.recommend = recommend;
          // recommend: null
          this.recommendDescription = recommendDescription;
          // recommendDescription: '建筑师，是指受过专业教育或训练，以建筑设计为主要职业的人。建筑师通过与工程投资方（即通常所说的甲方）和施工方的合作，在技术、经济、功能和造型上实现建筑物的营造。'
          this.seniorDesign = seniorDesign;
          // seniorDesign: 0
          this.status = status;
          // status: null
          this.tag = tag;
          // tag: 's'
          this.teamNumber = teamNumber + "";
          // teamNumber: null
          this.teamPhoto = teamPhoto;
          // teamPhoto: null
          this.workMode.teamType = teamType ? teamType + "" : "1";
          // teamType: 1
          this.title = title ? title + "" : "";
          this.qualificationTitles.map(item => {
            if (item.value == title) {
              item.selected = true;
            } else {
              item.selected = false;
            }
          });
          // title: null
          this.updateTime = updateTime;
          // updateTime: null
          this.userName = userName;
          this.phoneNumber = phoneNumber;
          // userName: 'xiaobao'
          this.workLife = workLife ? workLife + "" : "";
          this.workLifes.map(item => {
            if (item.value == workLife) {
              item.selected = true;
            } else {
              item.selected = false;
            }
          });
          // workLife: null
          this.workplace = workplace;
          this.qualificationPhoto = qualificationPhoto;
          this.titlePhoto = titlePhoto;

          if (teamType == 1) {
            // this.workMode.teamType = '1'
            this.workMode.aloneArchitect = true;
            this.workMode.teamScale = teamScale;
            this.teamNumbers.map(item => {
              if (item.value == teamScale) {
                item.selected = true;
              } else {
                item.selected = false;
              }
            });

            this.workMode.aloneArchitectFile = aloneArchitectFile || "";
          } else if (teamType == 2) {
            // this.workMode.teamType = '2'
            this.workMode.studio = true;
            this.workMode.scale = scale;
            this.workMode.studioUploadFile = studioUploadFile;
          } else if (teamType == 3) {
            // this.workMode.teamType = '3'
            this.workMode.hospitalEnterprise = true;
            this.workMode.enterpriseTeamNumber = enterpriseTeamNumber;
            this.workMode.enterpriseuploadFile = enterpriseuploadFile;
          }
          this.learningExperienceList.forEach(item => {
            // 给个人经历所有列表设置为禁用状态
            this.$set(item, "isdisabledlearnExprence", true);
            this.$set(item, "pic", "");
            // 获取图片地址
            if (item.quaPhoto) {
              this.api.getUrl({ fileName: item.quaPhoto }).then(res => {
                if (res.code !== 0) {
                  return;
                }
                item.pic = res.msg;
              });
            }
          });
          // 给个人荣耀所有列表设置为禁用状态
          this.personalHonorList.forEach(item => {
            this.$set(item, "isHonorDisabled", true);
            this.$set(item, "pic", "");
            // 获取图片地址
            if (item.honorPhoto) {
              this.api.getUrl({ fileName: item.honorPhoto }).then(res => {
                if (res.code !== 0) {
                  return;
                }
                item.pic = res.msg;
              });
            }
          });
          // 获取图片地址
          this.api.getUrl({ fileName: this.head }).then(res => {
            if (res.code !== 0) {
              return;
            }
            this.headImg = res.msg;
            if (!this.head) {
              this.headImg = require("@/assets/images/header.png");
            }
          });
          // 获取身份证图片地址
          if (this.idCardPhoto) {
            this.api.getUrl({ fileName: this.idCardPhoto }).then(res => {
              if (res.code !== 0) {
                return;
              }
              this.idName = res.msg;
            });
          }
          // 获取身份证图片地址
          if (this.idCardPicture) {
            this.api.getUrl({ fileName: this.idCardPicture }).then(res => {
              if (res.code !== 0) {
                return;
              }
              this.idName0 = res.msg;
            });
          }
          // 获取相关证明文件附件
          this.api.getUrl({ fileName: this.quaPhoto }).then(res => {
            if (res.code !== 0) {
              return;
            }
            this.proveUrl.push(res.msg);
          });

          // 获取职业资格相关证明文件附件
          if (this.qualificationPhoto == null) {
            this.qualificationPhoto = "";
          }
          let qualiList = this.qualificationPhoto.split(",");
          qualiList.forEach((item, index) => {
            if (item === "") {
              qualiList.splice(index, 1);
            }
          });
          if (qualiList != null) {
            qualiList.forEach(item => {
              this.qualificationPhotoList.push(item);
              this.api.getUrl({ fileName: item }).then(res => {
                if (res.code !== 0) {
                  return;
                }

                this.qualificationPhotoAdressList.push(res.msg);
              });
            });
          }
          if (this.titlePhoto == null) {
            this.titlePhoto = "";
          }
          let titlePhotoArrayList = this.titlePhoto.split(",");
          titlePhotoArrayList.forEach((item, index) => {
            if (item === "") {
              titlePhotoArrayList.splice(index, 1);
            }
          });
          if (titlePhotoArrayList != null) {
            titlePhotoArrayList.forEach(item => {
              this.titlePhotoList.push(item);
              this.api.getUrl({ fileName: item }).then(res => {
                if (res.code !== 0) {
                  return;
                }

                this.titlePhotoAdressList.push(res.msg);
              });
            });
          }

          // 获取独立建筑师相关证件的图片地址
          let aloneArchitectArrayList = this.workMode.aloneArchitectFile.split(
            ","
          );
          aloneArchitectArrayList.forEach((item, index) => {
            if (item === "") {
              aloneArchitectArrayList.splice(index, 1);
            }
          });

          if (aloneArchitectArrayList != null) {
            aloneArchitectArrayList.forEach(item => {
              this.workMode.aloneArchitectList.push(item);
              this.api.getUrl({ fileName: item }).then(res => {
                if (res.code !== 0) {
                  return;
                }
                this.workMode.aloneArchitectAdressList.push(res.msg);
              });
            });
          }
          // 获取建筑事务所或者工作室的相关证件的图片地址
          if (this.workMode.studioUploadFile == null) {
            this.workMode.studioUploadFile = "";
          }
          let studioArrayList = this.workMode.studioUploadFile.split(",");
          studioArrayList.forEach((item, index) => {
            if (item === "") {
              studioArrayList.splice(index, 1);
            }
          });
          studioArrayList.forEach((item, index) => {
            if (item === "") {
              studioArrayList.splice(index, 1);
            }
          });
          if (studioArrayList != null) {
            studioArrayList.forEach(item => {
              this.workMode.studioList.push(item);
              this.api.getUrl({ fileName: item }).then(res => {
                if (res.code !== 0) {
                  return;
                }
                this.workMode.studioAdressList.push(res.msg);
              });
            });
          }

          // 获取院企的相关证件的图片地址
          if (this.workMode.enterpriseuploadFile == null) {
            this.workMode.enterpriseuploadFile = "";
          }

          let enterpriseArrayList = this.workMode.enterpriseuploadFile.split(
            ","
          );
          enterpriseArrayList.forEach((item, index) => {
            if (item === "") {
              enterpriseArrayList.splice(index, 1);
            }
          });
          if (enterpriseArrayList != null) {
            enterpriseArrayList.forEach(item => {
              this.workMode.enterpriseList.push(item);
              this.api.getUrl({ fileName: item }).then(res => {
                if (res.code !== 0) {
                  return;
                }
                this.workMode.enterpriseAdressList.push(res.msg);
              });
            });
          }
          this.getCaseList({ designerSerial: this.designerSerial });
        });
      });
    },
    // 获取作品列表

    getCaseList(id) {
      this.api.getDesigerCaseList(id).then(res => {
        if (res.code !== 0) {
          return;
        }
        if (res.msg === "该设计师作品不存在！") {
          return;
        }
        if (res.data && res.data.list && res.data.list.length > 0) {
          this.desginerCaseList = res.data.list;
        } else {
          this.desginerCaseList = [];
        }
        if (this.desginerCaseList.length > 0) {
          // 如果在添加作品时作品列表的图片需要清空掉
          if (this.showCasePictrue.length > 0) {
            this.showCasePictrue = [];
          }
          this.desginerCaseList.forEach((item, index) => {
            this.showCasePictrue.push({
              id: item.id,
              url: ""
            });
            // 获取作品图片地址
            this.api
              .getUrl({ fileName: item.pictureUrls.split(",")[0] })
              .then(res => {
                if (res.code !== 0) {
                  return;
                }
                this.showCasePictrue[index].url = res.msg;
                // this.showCasePictrue.push({
                //   id: item.id,
                //   url: res.msg
                // })
              });
          });
        }
      });
    },

    // ========================学习经历======================
    // 点击添加学习经历
    addLearningExperience() {
      if (this.learningExperienceList == null) {
        this.learningExperienceList = [];
      }
      let res = this.learningExperienceList[
        this.learningExperienceList.length - 1
      ];
      let index1 = this.learningExperienceList.findIndex(
        item => item.id === res.id
      );
      let res2 = this.learningExperienceList.filter(
        (item, index) => index <= index1
      );

      res2.forEach(item => (item.isdisabledlearnExprence = true));
      this.learningExperienceList.push({
        createTime: "", // 设计师注册时间
        designerId: this.id, // this.desId
        id: this.learanceID++,
        graduationDate: "", // 毕业时间
        timeOfEnrollment: "", // 入学时间
        quaPhoto: "", // 学位证书附件名称
        major: "", // 专业
        school: "",
        time: "",
        pic: "", // 自定义====学位证书附件地址
        updatePersonId: 0,
        updateTime: "",
        isdisabledlearnExprence: false, // 是否禁止学习经历编辑
        startDt: {
          time: ""
        },
        endDt: {
          time: ""
        }
      });
    },
    // 编辑个人学习经历
    editLearningExperience(index, data) {
      let res = this.learningExperienceList.find(item => item.id === data.id);

      res.isdisabledlearnExprence = false;
      // 点击编辑按钮除了当前行的表单元素可编辑，其余行的表单元素都禁用
      let res2 = this.learningExperienceList.filter(
        item => item.id !== data.id
      );
      res2.forEach(item => (item.isdisabledlearnExprence = true));
    },
    upLoadExprence(index, id) {
      this.currentExprenceUploadIndex = id;
    },
    // 上传学位证书附件
    enclosureUploadSuccess(res, file) {
      const id = this.currentExprenceUploadIndex;
      const currentLearrence = this.learningExperienceList.find(
        item => item.id === id
      );
      currentLearrence.quaPhoto = res.msg;

      this.api
        .getUrl({
          fileName: currentLearrence.quaPhoto
        })
        .then(res => {
          if (res.code !== 0) {
            return;
          }
          currentLearrence.pic = res.msg;
          this.isShowUpload = false;
        });
    },
    // 点击按钮显示上传学位证书的按钮
    showUploadButton(id) {
      this.isShowUpload = true;
      this.currentDesignerId = id;
    },

    // ======================修改头像=======================
    // 上传头像成功之后调用该函数
    upLoadHeadSuccess(res, file) {
      this.head = res.msg;
      this.headPhotoName = res.msg;
      this.api.getUrl({ fileName: this.head }).then(res => {
        if (res.code !== 0) {
          return;
        }
        this.select = 0;
        this.headPhoto = res.msg;
        this.headImg = res.msg;
      });
    },

    // ==========================上传项目作品 ===============
    // 项目作品图片上传钱的验证
    beforeCaseUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < this.$isLt10M;

      // let caseLength = this.desginerCase.pictureArray.length < 7;

      if (!isLt5M) {
        this.$message.error(`上传图片大小不能超过 ${this.$isLt10M}MB!`);
      }
      // if (!caseLength) {
      //   this.$message.error("最至少上传七张的作品的照片");
      // }
      // return isLt5M && caseLength;
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
            description: ""
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
    // 点击按钮打开上传项目作品的模太框
    uploadCase() {
      this.upLoadCasedialog = true;
      this.isUpdating = false;
      this.desginerCase.caseName = "";
      this.desginerCase.buildingType = "";
      this.desginerCase.coveredArea = "";
      this.desginerCase.finishTime = "";
      this.desginerCase.pictureArray = [];
      this.desginerCase.pictureName = "";
      this.desginerCase.caseDetail = "";
      this.hotLabels = [];
      this.upLoadCaseImg = [];
      this.desginerCase.caseLocation = [];
    },
    editCase(id) {
      this.upLoadCasedialog = true;
      this.isUpdating = true;
      for (let i in this.desginerCaseList) {
        if (this.desginerCaseList[i].id === id) {
          this.desginerCase.caseName = this.desginerCaseList[i].caseName; // 作品名称
          this.desginerCase.buildingType = this.desginerCaseList[
            i
          ].buildingType; // 建筑类型
          this.buildingTypesOptions.map(item => {
            if (item.value == this.desginerCase.buildingType) {
              item.selected = true;
            } else {
              item.selected = false;
            }
          });
          this.desginerCase.coveredArea = this.desginerCaseList[i].coveredArea; // 建筑面积
          this.desginerCase.finishTime = this.desginerCaseList[i].finishTime; // 完成时间
          this.desginerCase.pictureArray = this.desginerCaseList[i].pictureUrls
            .split(",")
            .filter(function(item) {
              return item !== "";
            }); // 图片存储名称
          this.desginerCase.pictureName = this.desginerCaseList[i].pictureName; // 图片名称
          this.desginerCase.pictureDetail = this.desginerCaseList[
            i
          ].pictureDetail; // 图片描述
          this.desginerCase.caseDetail = this.desginerCaseList[i].caseDetail; // 作品详情
          this.finishDate = {
            time: this.desginerCaseList[i].finishTime // 完成时间
          };
          this.hotLabels = this.desginerCaseList[i].hotLabel
            ? this.desginerCaseList[i].hotLabel.split(",")
            : [];

          this.desginerCase.id = this.desginerCaseList[i].id;
          this.desginerCase.designerId = this.desginerCaseList[i].designerId;
          this.upLoadCaseImg = [];

          if (this.desginerCaseList[i].constructionCity) {
            let temConstructionCity = this.desginerCaseList[
              i
            ].constructionCity.split(",");
            if (temConstructionCity[0] == "830000") {
              this.desginerCase.caseLocation = ["830000"];
              this.getProvinceCityBuild = temConstructionCity[0];
              this.desginerCase.caseLocationOther = temConstructionCity[1];
              this.desginerCase.showCaseLocationOther = true;
            } else {
              this.desginerCase.caseLocation = temConstructionCity;

              this.handleCaseLocationChangeBuild(temConstructionCity[0]);
              this.getProvinceCityBuild = temConstructionCity[0];
              this.getProvinceTownBuild = temConstructionCity[1];
            }
            this.cityBuildOptions.map(item => {
              if (item.value == this.getProvinceCityBuild) {
                item.selected = true;
              } else {
                item.selected = false;
              }
            });
            this.TownOptions.map(item => {
              if (item.value == this.getProvinceTownBuild) {
                item.selected = true;
              } else {
                item.selected = false;
              }
            });
          } else {
            this.desginerCase.caseLocation = [];
            this.desginerCase.showCaseLocationOther = false;
          }
          for (let j in this.desginerCase.pictureArray) {
            let desc = "";
            if (this.desginerCaseList[i].pictureDetail) {
              desc = this.desginerCaseList[i].pictureDetail.split("|")[j];
            }
            this.upLoadCaseImg.push({
              name: this.desginerCase.pictureArray[j],
              pictureName: this.desginerCaseList[i].pictureName.split(",")[j],
              description: desc,
              url: ""
            });
            this.api
              .getUrl({
                fileName: this.desginerCase.pictureArray[j]
              })
              .then(res => {
                if (res.code !== 0) {
                  return;
                }
                this.upLoadCaseImg[j].url = res.msg;
                // this.upLoadCaseImg.push({
                //   name: this.desginerCase.pictureArray[j],
                //   pictureName: this.desginerCaseList[i].pictureName.split(',')[j],
                //   url: res.msg
                // })
              });
          }
        }
      }
    },
    removeCase(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.api
            .removeCase({
              id: id
            })
            .then(res => {
              this.getCaseList({ designerSerial: this.designerSerial });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    isNumChange2(value) {
      if (value) {
        this.desginerCase.coveredArea = value.replace(/[^0-9\.]/g, "");
      }
    },
    updateCase() {
      if (!this.desginerCase.caseName) {
        this.$message.error("请输入作品名称");
        return;
      }
      if (!this.desginerCase.buildingType) {
        this.$message.error("请选择项目类型");
        return;
      }
      if (!this.desginerCase.coveredArea) {
        this.$message.error("请输入建筑面积");
        return;
      }
      let regNum = /^[0-9\.]*$/;
      if (this.desginerCase.coveredArea > 0) {
      } else {
        this.$message.error("建筑面积只能是数字");
        return;
      }
      // if(!regNum.test(this.desginerCase.coveredArea)){
      //   this.$message.error("建筑面积只能是数字");
      //   return;
      // }
      if (!this.desginerCase.finishTime) {
        this.$message.error("请选择完成时间");
        return;
      }
      if (this.getProvinceCityBuild == "830000") {
        if (!this.desginerCase.caseLocationOther) {
          this.$message.error("请输入建筑地址");
          return;
        }
      } else if (
        this.getProvinceCityBuild == "" ||
        this.getProvinceTownBuild == ""
      ) {
        this.$message.error("请选择建筑地址");
        return;
      }
      if (this.desginerCase.pictureArray.length < 3) {
        this.$message.error("项目图片至少3张，请调整上传内容");
        return;
      }
      let picName = [],
        picDesc = [];
      this.upLoadCaseImg.map(item => {
        picName.push(item.pictureName);
        picDesc.push(item.description);
      });
      let hasComma = false;
      let hasCommaNum = -1;
      let hasPipeSymbol = false;
      let hasPipeSymbolNum = -1;
      for (let index = 0; index < picName.length; index++) {
        if (picName[index].indexOf(",") != -1 || picName[index] == "") {
          hasComma = true;
          hasCommaNum = index + 1;
          break;
        }
        if (picDesc[index].indexOf("|") != -1) {
          hasPipeSymbolNum = index + 1;
          hasPipeSymbol = true;
          break;
        }
      }
      if (hasComma) {
        this.$message.error(
          `第${hasCommaNum}张图片名字不允许特殊字符“,”或者为空`
        );
        return;
      }
      if (hasPipeSymbol) {
        this.$message.error(`第${hasPipeSymbolNum}张图片描述不允许特殊字符“|”`);
        return;
      }
      if (!this.desginerCase.caseDetail) {
        this.$message.error("请输入作品介绍");
        return;
      }
      if (this.desginerCase.caseDetail.length < 500) {
        this.$message.error("作品介绍至少500个字");
        return;
      }
      if (!this.hotLabels.join(",")) {
        this.$message.error("请选择建筑风格");
        return;
      }
      this.desginerCase.pictureName = picName.join(",");
      this.desginerCase.pictureDetail = picDesc.join("|");
      let arrTemp = [];
      this.upLoadCaseImg.forEach(function(item) {
        arrTemp.push(item.pictureName);
      });
      // if(this.getProvinceCityBuild != "830000"){
      //   this.desginerCase.caseLocationOther = ""
      // }
      let params = {
        ...this.desginerCase,
        pictureUrls: this.desginerCase.pictureArray.join(","),
        pictureName: arrTemp.join(","),
        hotLabel: this.hotLabels.join(","),
        designerSerial: this.designerSerial,
        constructionCity: (this.getProvinceCityBuild == "830000"
          ? ["830000", this.desginerCase.caseLocationOther]
          : [this.getProvinceCityBuild, this.getProvinceTownBuild]
        ).join(",")
      };
      this.$refs["upLoadCase"].validate(valid => {
        if (valid) {
          // 如果通过验证 to do...
          this.api.updateCase(params).then(res => {
            if (res.code === 0) {
              this.$message("项目作品更新完成");
              this.getCaseList({ designerSerial: this.designerSerial });
              // this.$refs.upload.clearFiles();
              this.upLoadCaseImg = [];
              this.cancelUpLoadCase();
            }
          });
          this.upLoadCasedialog = false;
        } else {
          this.$message("请按要求填写");
          return false;
        }
      });
    },
    // 点击模太框确定按钮上传项目作品完成
    sucessUpLoadCase() {
      if (!this.desginerCase.caseName) {
        this.$message.error("请输入作品名称");
        return;
      }
      if (!this.desginerCase.buildingType) {
        this.$message.error("请选择项目类型");
        return;
      }
      if (!this.desginerCase.coveredArea) {
        this.$message.error("请输入建筑面积");
        return;
      }
      let regNum = /^[0-9\.]*$/;
      if (this.desginerCase.coveredArea > 0) {
      } else {
        this.$message.error("建筑面积只能是数字");
        return;
      }
      // if(!regNum.test(this.desginerCase.coveredArea)){
      //   this.$message.error("建筑面积只能是数字");
      //   return;
      // }
      if (!this.desginerCase.coveredArea) {
        this.$message.error("请输入建筑面积");
        return;
      }
      if (!this.desginerCase.finishTime) {
        this.$message.error("请选择完成时间");
        return;
      }

      if (this.getProvinceCityBuild == "830000") {
        if (!this.desginerCase.caseLocationOther) {
          this.$message.error("请输入建筑地址");
          return;
        }
      } else if (
        this.getProvinceCityBuild == "" ||
        this.getProvinceTownBuild == ""
      ) {
        this.$message.error("请选择建筑地址");
        return;
      }
      if (this.desginerCase.pictureArray.length < 3) {
        this.$message.error("项目图片至少3张，请调整上传内容");
        return;
      }
      let picName = [],
        picDesc = [];
      this.upLoadCaseImg.map(item => {
        picName.push(item.pictureName);
        picDesc.push(item.description);
      });
      let hasComma = false;
      let hasCommaNum = -1;
      let hasPipeSymbol = false;
      let hasPipeSymbolNum = -1;
      for (let index = 0; index < picName.length; index++) {
        if (picName[index].indexOf(",") != -1 || picName[index] == "") {
          hasComma = true;
          hasCommaNum = index + 1;
          break;
        }
        if (picDesc[index].indexOf("|") != -1) {
          hasPipeSymbolNum = index + 1;
          hasPipeSymbol = true;
          break;
        }
      }
      if (hasComma) {
        this.$message.error(
          `第${hasCommaNum}张图片名字不允许特殊字符“,”或者为空`
        );
        return;
      }
      if (hasPipeSymbol) {
        this.$message.error(`第${hasPipeSymbolNum}张图片描述不允许特殊字符“|”`);
        return;
      }
      if (!this.desginerCase.caseDetail) {
        this.$message.error("请输入作品介绍");
        return;
      }
      if (this.desginerCase.caseDetail.length < 500) {
        this.$message.error("作品介绍至少500个字");
        return;
      }
      if (!this.hotLabels.join(",")) {
        this.$message.error("请选择建筑风格");
        return;
      }
      this.desginerCase.pictureName = picName.join(",");
      this.desginerCase.pictureDetail = picDesc.join("|");
      let params = {
        ...this.desginerCase,
        hotLabel: this.hotLabels.join(","),
        designerSerial: this.designerSerial,
        constructionCity: (this.getProvinceCityBuild == "830000"
          ? ["830000", this.desginerCase.caseLocationOther]
          : [this.getProvinceCityBuild, this.getProvinceTownBuild]
        ).join(",")
      };
      this.$refs["upLoadCase"].validate(valid => {
        if (valid) {
          // 如果通过验证 to do...
          this.api.addCase(params).then(res => {
            if (res.code === 0) {
              this.$message("项目作品上传完成");
              this.getCaseList({ designerSerial: this.designerSerial });
              // this.$refs["upLoadCase"].resetFields();
              // this.$refs.upload.clearFiles();
              this.upLoadCaseImg = [];
              this.cancelUpLoadCase();
            }
          });
          this.upLoadCasedialog = false;
        } else {
          this.$message("请按要求填写");
          return false;
        }
      });
    },
    // 取消作品上传
    cancelUpLoadCase() {
      // this.$refs["upLoadCase"].resetFields();
      // this.$refs.upload.clearFiles();
      this.upLoadCaseImg = [];
      this.upLoadCasedialog = false;
      this.finishDate.time = "";
      this.getProvinceCityBuild = "";
      this.getProvinceTownBuild = "";
      this.buildingTypesOptions.map(item => {
        if (item.value == null) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
      this.cityBuildOptions.map(item => {
        if (item.value == null) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
      let selpotions = [
        { text: "请选择建筑地点", value: null, disabled: true, selected: true }
      ];
      this.TownOptions = selpotions;
    },
    // 删除
    handleDelete(index, scope) {
      this.api.deleteLearning({ id: scope.id }).then(res => {});
      this.learningExperienceList.splice(index, 1);
    },
    // ======================个人荣耀==================================
    // 添加个人荣耀资料
    addHonor() {
      // 点击添加按钮当前行几以前行的表单元素都禁用
      let res = this.personalHonorList[this.personalHonorList.length - 1];
      let index1 = this.personalHonorList.findIndex(item => item.id === res.id);
      let res2 = this.personalHonorList.filter(
        (item, index) => index <= index1
      );
      res2.forEach(item => (item.isHonorDisabled = true));
      // 添加表单元素
      this.personalHonorList.push({
        createPersonId: 0,
        createTime: "",
        designerId: this.id, // this.desId
        honorLevel: "", // 荣誉级别
        honorName: "", // 荣誉名称
        id: this.learanceID++,
        issuingAuthority: "", // 授予机构
        honorPhoto: "", // 荣誉证书附件
        pic: "",
        time: "",
        updatePersonId: 0,
        updateTime: "",
        isHonorDisabled: false
      });
      this.personalHonorList.map(item => {
        this.$set(item, "showHonorUl", false);
      });
    },
    // 删除当前行的个人荣耀
    honorDelete(data) {
      this.api.deletePersonalHonor({ id: data.id }).then(res => {});
      let index = this.personalHonorList.findIndex(item => item.id === data.id);
      this.personalHonorList.splice(index, 1);
    },
    // 编辑个人荣耀信息
    honorEdit(data) {
      let res = this.personalHonorList.find(item => item.id === data.id);
      res.isHonorDisabled = false;
      // 点击编辑按钮除了当前行的表单元素可编辑，其余行的表单元素都禁用
      let res2 = this.personalHonorList.filter(item => item.id !== data.id);
      res2.forEach(item => (item.isHonorDisabled = true));
    },
    // 上传相关证件成功后
    honorUploadSuccess(res, file) {
      const id = this.currentExprenceUploadIndex;
      const currentLearrence = this.personalHonorList.find(
        item => item.id === id
      );
      currentLearrence.honorPhoto = res.msg;

      this.api
        .getUrl({
          fileName: currentLearrence.honorPhoto
        })
        .then(res => {
          if (res.code !== 0) {
            return;
          }
          currentLearrence.pic = res.msg;
          this.isShowUpload = false;
        });
    },
    // ===========================专业资历======================
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

      this.qualificationPhoto = this.qualificationPhotoList.join(",");
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

      this.titlePhoto = this.titlePhotoList.join(",");
      this.api.getUrl({ fileName: res.msg }).then(res => {
        this.titlePhotoAdressList.push(res.msg);
      });
    },

    // ====================工作模式=============================
    // 上传文件
    // 上传文件成功

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
      this.workMode.aloneArchitectList.push(res.msg);
      this.workMode.aloneArchitectFile = this.workMode.aloneArchitectList.join(
        ","
      );
      this.api.getUrl({ fileName: res.msg }).then(res => {
        this.workMode.aloneArchitectAdressList.push(res.msg);
      });
    },
    // 建筑事务所工作室上传文件前的验证
    beforeFileUploadStudio(file) {
      const isLt5M = file.size / 1024 / 1024 < this.$isLt10M;
      if (!isLt5M) {
        this.$message.error(`上传图片大小不能超过 ${this.$isLt10M}MB!`);
      }
      return isLt5M;
    },
    // 建筑事务所上传图片成功
    fileUploadSuccessStudio(res, file) {
      this.workMode.studioList.push(res.msg);
      this.workMode.studioUploadFile = this.workMode.studioList.join(",");

      this.api.getUrl({ fileName: res.msg }).then(res => {
        this.workMode.studioAdressList.push(res.msg);
      });
    },
    // 院企设计团队上传文件前的验证
    beforeFileUploadenterpriseTeam(file) {
      const isLt5M = file.size / 1024 / 1024 < this.$isLt10M;
      if (!isLt5M) {
        this.$message.error(`上传图片大小不能超过 ${this.$isLt10M}MB!`);
      }
      return isLt5M;
    },
    // 院企设计团队上传图片成功
    fileUploadSuccessenterpriseTeam(res, file) {
      this.workMode.enterpriseList.push(res.msg);
      this.workMode.enterpriseuploadFile = this.workMode.enterpriseList.join(
        ","
      );

      this.api.getUrl({ fileName: res.msg }).then(res => {
        this.workMode.enterpriseAdressList.push(res.msg);
      });
    },
    // 下载建筑事务所或工作室上传的附件
    downLoadeStudio(item) {},
    // 点击其中一个工作模式时，另外两种是禁用转台
    chooseWorkingMode(num) {
      this.workMode.teamType = num;
      if (num === 1) {
        this.workMode.aloneArchitect = true;
        this.workMode.studio = 0;
        this.workMode.scale = "";
        this.workMode.studioUploadFile = "";
        this.workMode.studioList = [];
        this.workMode.studioAdressList = [];

        this.workMode.hospitalEnterprise = 0;
        this.workMode.enterpriseTeamNumber = "";
        this.workMode.enterpriseuploadFile = "";
        this.workMode.enterpriseList = [];
        this.workMode.enterpriseAdressList = [];
      }
      if (num === 2) {
        this.workMode.studio = true;
        this.workMode.aloneArchitect = 0;
        this.workMode.teamScale = "";
        this.workMode.aloneArchitectFile = "";
        this.workMode.aloneArchitectList = [];
        this.workMode.aloneArchitectAdressList = [];

        this.workMode.hospitalEnterprise = 0;
        this.workMode.enterpriseTeamNumber = "";
        this.workMode.enterpriseuploadFile = "";
        this.workMode.enterpriseList = [];
        this.workMode.enterpriseAdressList = [];
      }
      if (num === 3) {
        this.workMode.hospitalEnterprise = true;
        this.workMode.aloneArchitect = 0;
        this.workMode.teamScale = "";
        this.workMode.aloneArchitectFile = "";
        this.workMode.aloneArchitectList = [];
        this.workMode.aloneArchitectAdressList = [];

        this.workMode.studio = 0;
        this.workMode.scale = "";
        this.workMode.studioUploadFile = "";
        this.workMode.studioList = [];
        this.workMode.studioAdressList = [];
      }
    },
    // =======================================================
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // // 图片上传成功事件
    // cardIDhandleAvatarSuccess(res, file) {
    //   this.idName = res.msg;
    //   this.api.getUrl({ fileName: this.idName }).then(res => {
    //     // this.idCardPhoto.push(res.msg)
    //   });
    // },
    // =======================上传身份证===========================
    // 上传身份证前的验证
    beforeIDcardUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < this.$isLt10M;
      if (!isLt2M) {
        this.$message.error(`上传图片大小不能超过 ${this.$isLt10M}MB!`);
      }
      return isLt2M;
    },
    // 身份证上传成功事件
    cardIDhandleSuccess(res, file) {
      this.idCardPhoto = res.msg;
      this.api.getUrl({ fileName: this.idCardPhoto }).then(res => {
        this.idName = res.msg;
      });
    },
    // 身份证上传成功事件
    cardIDhandleSuccess0(res, file) {
      this.idCardPicture = res.msg;
      this.api.getUrl({ fileName: this.idCardPicture }).then(res => {
        this.idName0 = res.msg;
      });
    },
    // ================================================================
    // 附件删除事件
    cardIDhandleAvatarRemove(file, fileList) {
      this.fileList = fileList;
    },

    // 上传前验证
    beforeAvatarUpload(file) {
      const isLt3M = file.size / 1024 / 1024 < this.$isLt10M;
      if (!isLt3M) {
        this.$message.error(`上传图片大小不能超过 ${this.$isLt10M}MB!`);
      }
      return isLt3M;
    },
    idCardChange(value) {
      if (value) {
        this.designerLogin.idCard = value.replace(/[^0-9xX]/g, "");
      }
    },
    // 提交审核
    submitForm(formName) {
      if (!this.head) {
        this.$message("请上传头像！");
        return;
      }
      if (!this.idCardPhoto) {
        this.$message("请上传身份证");
        return;
      }
      if (!this.idCardPicture) {
        this.$message("请上传身份证");
        return;
      }
      // if(!this.userName){
      //   this.$message("请输入昵称");
      //   return;
      // }
      if (!this.designerLogin.realName) {
        this.$message("请输入真实姓名");
        return;
      }
      // if(!this.designerLogin.email){
      //   this.$message("请输入邮箱");
      //   return;
      // }
      // if(!this.phoneNumber){
      //   this.$message("请输入手机号");
      //   return;
      // }
      if (!this.designerLogin.idCard) {
        this.$message("请输入身份证号");
        return;
      }
      // let reg=/^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/
      let reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
      if (!reg.test(this.designerLogin.idCard)) {
        this.$message("请输入正确的身份证号");
        return;
      }
      if (!this.designerCity) {
        this.$message("请输入城市");
        return;
      }

      let regu = /^[a-zA-Z\u4e00-\u9fa5]+$/;
      if (!regu.test(this.designerCity)) {
        this.$message.error("城市只能是英文或汉字");
        return;
      }
      if (this.designerCity.length > 50) {
        this.$message.error("城市最长50个字");
        return;
      }

      if (!this.workPostcode) {
        this.$message("请输入邮编");
        return;
      }
      let regCode = /^[0-9]*$/;
      if (!regCode.test(this.workPostcode)) {
        this.$message.error("邮编只限数字");
        return;
      }
      if (this.workPostcode.length > 50) {
        this.$message.error("邮编最长50个字");
        return;
      }
      if (!this.getProvinceCity || !this.getProvinceTown) {
        this.$message("请选择工作地点");
        return;
      }
      // 个人作品
      if (this.desginerCaseList.length < 3) {
        this.$message("请上传3个以上作品");
        return;
      }

      // 学习经历
      if (this.learningExperienceList.length == 0) {
        this.$message("请填写学习经历");
        return;
      }
      // 学习经历
      if (this.learningExperienceList.length != 0) {
        // 学校名称不能为空
        let bSchool = this.learningExperienceList.some(item => {
          return item.school == "";
        });
        if (bSchool) {
          this.$message("请填写自本科以上的学习经历");
          return;
        }
        // 入学与毕业时间不能为空
        let bTime = this.learningExperienceList.some(item => {
          return item.timeOfEnrollment == "" || item.graduationDate == "";
        });
        if (bTime) {
          this.$message("请将入学与毕业时间填写完整");
          return;
        }
        // 入学时间不能大于毕业时间
        let bTime2 = this.learningExperienceList.some(item => {
          return (
            new Date(item.timeOfEnrollment).getTime() >=
            new Date(item.graduationDate).getTime()
          );
        });
        if (bTime2) {
          this.$message("入学时间不能大于毕业时间");
          return;
        }
        // 证明文件不能为空
        let bPhoto = this.learningExperienceList.some(item => {
          return item.quaPhoto == "";
        });
        if (bPhoto) {
          this.missPrFile = true;
          this.$message("上传相关证明文件");
          return;
        }
      }

      // 个人荣誉
      if (this.personalHonorList.length != 0) {
        // 荣誉名称不能为空
        let bHonorName = this.personalHonorList.some(item => {
          return item.honorName == "";
        });
        if (bHonorName) {
          this.$message("请填写荣誉名称");
          return;
        }
        // 个人荣誉相关证明文件不能为空
        let bHonorPhoto = this.personalHonorList.some(item => {
          return item.honorPhoto == "";
        });
        if (bHonorPhoto) {
          this.missPrFile = true;
          this.$message("上传个人荣誉相关证明文件");
          return;
        }
      }
      // 专业资历
      if (
        !this.workLife ||
        !this.qualification ||
        (this.qualification != "3" && !this.qualificationPhoto) ||
        !this.title ||
        !this.titlePhoto
      ) {
        this.$message("请正确填写专业资历");
        return;
      }

      // 工作模式
      if (
        !(
          (this.workMode.teamType == 1 &&
            this.workMode.teamScale &&
            this.workMode.aloneArchitectFile) ||
          (this.workMode.teamType == 2 &&
            this.workMode.scale &&
            this.workMode.studioUploadFile) ||
          (this.workMode.teamType == 3 &&
            this.workMode.enterpriseTeamNumber &&
            this.workMode.enterpriseuploadFile)
        )
      ) {
        // let map = {
        //   "1": this.workMode.aloneArchitectFile,
        //   "2": this.workMode.studioUploadFile,
        //   "3": this.workMode.enterpriseuploadFile
        // };
        // this.missWmFile = !map[this.workMode.teamType];
        // this.$message("请正确填写工作模式");
        // return;
      }

      this.type = "2";
      let workFile = "";
      let team_ype = this.workMode.teamType;
      if (team_ype == 1) {
        workFile = this.workMode.aloneArchitectFile;
      } else if (team_ype == 2) {
        workFile = this.workMode.studioUploadFile;
      } else {
        workFile = this.workMode.enterpriseuploadFile;
      }
      let workFScale = "";
      if (team_ype == 1) {
        workFScale = this.workMode.teamScale;
      } else if (team_ype == 2) {
        workFScale = this.workMode.scale;
      } else {
        workFScale = this.workMode.enterpriseTeamNumber;
      }
      this.$refs["designerLogin"].validate(valid => {
        if (valid) {
          let designerDO = {
            type: this.type,
            id: this.id, // 设计师表Id编号
            designerSerial: this.designerSerial, // 设计师平台标号
            auditState: this.auditState, // 审核状态
            belong: this.belong,
            homePage: this.homePage,
            userName: this.userName, // 用户名
            phoneNumber: this.phoneNumber,
            head: this.head, // 头像
            workCity:
              this.getProvinceCity +
              "," +
              this.getProvinceTown +
              "," +
              this.designerCity,
            workPostcode: this.workPostcode,
            realName: this.designerLogin.realName, // 真实姓名
            idCard: this.designerLogin.idCard, // 身份证号
            email: this.designerLogin.email, // 邮箱
            openId: this.designerLogin.openId, // 微信号
            seniorDesign: this.seniorDesign,
            idCardPhoto: this.idCardPhoto, // 身份证照片
            idCardPicture: this.idCardPicture, // 身份证照片
            desginerCaseList: this.desginerCaseList, // 项目作品列表
            personalHonorList: this.personalHonorList, // 个人荣耀
            workLife: this.workLife - 0, // 工作年限
            qualification: this.qualification - 0, // 职业资格
            title: this.title - 0, // 专业职称
            adeptType: this.adeptType - 0, // 是否拥有设计公司、事务所或工作室的团队
            teamType: this.workMode.teamType - 0, // 团队类型
            teamNumber: this.teamNumber - 0, // 团队成员数量
            quaPhoto: this.quaPhoto, // 相关证明文件附件
            designerHonor: this.designerHonor,
            qualificationPhoto: this.qualificationPhoto,
            titlePhoto: this.titlePhoto,
            teamScale: this.workMode.teamScale,
            aloneArchitect: this.workMode.aloneArchitect === true ? 1 : 0,
            studio: this.workMode.studio === true ? 1 : 0,
            scale: workFScale,
            // studioUploadFile: this.workMode.studioUploadFile,
            studioUploadFile: workFile,
            aloneArchitectFile: this.workMode.aloneArchitectFile,
            enterpriseuploadFile: this.workMode.enterpriseuploadFile,
            hospitalEnterprise:
              this.workMode.hospitalEnterprise === true ? 1 : 0,
            enterpriseTeamNumber: this.workMode.enterpriseTeamNumber,
            learningExperienceList: this.learningExperienceList
          };
          this.api.designerInformationUpdate(designerDO).then(res => {
            if (res.code !== 0) {
              this.$message(res.msg);
              return;
            }
            this.$store.commit("SetAuditState", this.auditState + 1);
            this.$message(res.msg);
            // this.centerDialogVisible = true;
            this.issubmitAxamine = true;
            this.$router.push({
              path: "/designerSubmitInfoSuccess",
              query: {
                actives: 3
              }
            });
          });
        } else {
          this.$message("请按要求填写");
        }
      });
    },
    // 暂存
    resetForm(formName) {
      let reg = /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/;
      this.type = 1;
      let { realName, idCard, email, openId } = this.designerLogin;
      // if(!realName){
      //   this.$message.error("请输入真实姓名")
      //   return
      // }else if(realName.length<2||realName.length>16){
      //    this.$message.error("真实姓名长度在 2 到 16 个字符")
      //   return
      // }
      // if(!reg.test(idCard)){
      //   this.$message.error("身份号码格式不对")
      //   return
      // }
      let workFile = "";
      let team_ype = this.workMode.teamType;
      if (team_ype == 1) {
        workFile = this.workMode.aloneArchitectFile;
      } else if (team_ype == 2) {
        workFile = this.workMode.studioUploadFile;
      } else {
        workFile = this.workMode.enterpriseuploadFile;
      }
      let workFScale = "";
      if (team_ype == 1) {
        workFScale = this.workMode.teamScale;
      } else if (team_ype == 2) {
        workFScale = this.workMode.scale;
      } else {
        workFScale = this.workMode.enterpriseTeamNumber;
      }
      let designerDO = {
        type: this.type,
        id: this.id, // 设计师表Id编号
        designerSerial: this.designerSerial, // 设计师平台标号
        auditState: this.auditState, // 审核状态
        belong: this.belong,
        homePage: this.homePage,
        userName: this.userName, // 用户名
        phoneNumber: this.phoneNumber,
        head: this.head, // 头像
        workCity:
          this.getProvinceCity +
          "," +
          this.getProvinceTown +
          "," +
          this.designerCity,
        workPostcode: this.workPostcode,
        realName: this.designerLogin.realName, // 真实姓名
        idCard: this.designerLogin.idCard, // 身份证号
        email: this.designerLogin.email, // 邮箱
        openId: this.designerLogin.openId, // 微信号
        seniorDesign: this.seniorDesign,
        idCardPhoto: this.idCardPhoto, // 身份证照片
        idCardPicture: this.idCardPicture, // 身份证照片
        desginerCaseList: this.desginerCaseList, // 项目作品列表
        personalHonorList: this.personalHonorList, // 个人荣耀
        workLife: this.workLife - 0, // 工作年限
        qualification: this.qualification - 0, // 职业资格
        title: this.title - 0, // 专业职称
        adeptType: this.adeptType - 0, // 是否拥有设计公司、事务所或工作室的团队
        teamType: this.workMode.teamType - 0, // 团队类型
        teamNumber: this.teamNumber - 0, // 团队成员数量
        quaPhoto: this.quaPhoto, // 相关证明文件附件
        designerHonor: this.designerHonor,
        qualificationPhoto: this.qualificationPhoto,
        titlePhoto: this.titlePhoto,
        teamScale: this.workMode.teamScale,
        aloneArchitect: this.workMode.aloneArchitect === true ? 1 : 0,
        studio: this.workMode.studio === true ? 1 : 0,
        scale: workFScale,
        // studioUploadFile: this.workMode.studioUploadFile,
        studioUploadFile: workFile,
        aloneArchitectFile: this.workMode.aloneArchitectFile,
        enterpriseuploadFile: this.workMode.enterpriseuploadFile,
        hospitalEnterprise: this.workMode.hospitalEnterprise === true ? 1 : 0,
        enterpriseTeamNumber: this.workMode.enterpriseTeamNumber,
        learningExperienceList: this.learningExperienceList
      };

      this.api.designerInformationUpdate(designerDO).then(res => {
        if (res.code === 0) {
          this.$message(res.msg);
        } else {
          this.$message(res.msg);
        }
      });
    },
    toCaseDetail(caseid) {
      this.$router.push(`CaseDetails?caseId=${caseid}`);
    },
    handleClose(done) {
      done();
      this.$router.push("taskHall");
    },
    closeModal() {
      this.flipped = false;
      this.modal = false;
      this.select = 0;
      this.headPhoto = null;
    },
    isNumChange(value) {
      if (value) {
        this.workPostcode = value.replace(/[^0-9]/g, "");
      }
    }
  },
  components: {
    Header,
    Stepper,
    imgdialog,
    bindPhoneEmail
  }
};
</script>

<style lang="less" scoped>
.marginBottomRow {
  padding-left: 1.25rem;
  margin-left: 1.25rem;
  margin-bottom: 25px;
  margin-top: -15px;
}
.tab-content > .active {
  height: 100% !important;
}
.marginTop {
  margin-top: 20px;
}
.form-check {
  display: inline-block;
  margin-right: 1.5rem;
  font-size: 1rem;
  margin-bottom: 0.8rem !important;
}
.form-check-block {
  display: block;
  padding: 1rem 0;
  margin-right: 1.5rem;
  font-size: 1rem;
}
.textAlignRight {
  text-align: left;
  line-height: 35px;
}
.select_width {
  width: 50%;
}
.item__label {
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.item__content {
  line-height: 40px;
  position: relative;
  font-size: 14px;
}
.input-group-text {
  background-color: white;
  border: none;
}

.addRedCricle:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}

.designer {
  // overflow-x: hidden;
  margin: 1.25rem 10%;
  background-color: #fff;
  .designer-submit-info {
    overflow: hidden;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 0.25rem;
    .progress {
      .desinStep {
        width: 80%;
        margin: 0 auto;
        .el-step__icon.is-text {
          width: 13.33;
          height: 13.33;
          color: #000;
        }
        .el-step__title {
          //  font-family: PingFangSC-Regular;
          font-size: 1rem;
          color: #000000;
          text-align: left;
          line-height: 1.5rem;
        }
      }
      .el-step__title.is-success {
        color: #000;
      }
    }
    .main-title {
      text-align: center;
      font-weight: 700;
      font-size: 1.5625rem;
      // padding: 8px 0;
      padding-top: 3.125rem;
    }
    .main-title-text {
      padding: 1.25rem 0 1.5625rem 0;
    }
    .form {
      .title {
        text-align: left;
        font-size: 0.875rem;
        height: 0.875rem;
        line-height: 0.875rem;
        border-left: 0.125rem solid #4285f4;
        padding-left: 0.3125rem;
        margin-top: 3.75rem;
        margin-bottom: 0.625rem;
        span {
          color: red;
        }
      }
      // 个人基本信息
      .personal-info {
        .nick-name {
          padding-top: 1rem;
          padding-bottom: 1.875rem;
          //  font-family: PingFangSC-Regular;
          color: #000000;
          text-align: center;
        }
        .idCardphoto {
          width: auto;
          height: 100%;
        }
      }
      // 项目作品
      .project-case {
        .info {
          //  font-family: PingFangSC-Regular;
          font-size: 1rem;
          color: #999999;
          margin-bottom: 1.25rem;
        }
        .upAloneCase {
          //  font-family: PingFangHK-Medium;
          font-size: 1.75rem;
          color: #606266;
          letter-spacing: 0;
          text-align: center;
        }
        .upCase {
          width: 10rem;
          height: 10rem;
          i {
            margin-top: 0;
          }
        }
        .upLoadCaseImgs {
          width: 100%;
          li {
            float: left;
            width: 12.5rem;
            height: 12.5rem;
            background: #efefef;
            margin: 0.625rem 1.25%;
            box-sizing: border-box;
            position: relative;
            .imgBox {
              overflow: hidden;
              height: 100%;
            }
            img {
              width: auto;
              height: 100%;
              position: relative;
              left: 50%;
              transform: translateX(-50%);
            }
            .removeIcon {
              //  font-family: Arial, Helvetica, sans-serif;
              font-size: 1.875rem;
              position: absolute;
              width: 1.25rem;
              height: 1.25rem;
              text-align: center;
              line-height: 1.25rem;
              right: -0.625rem;
              top: -0.625rem;
              cursor: pointer;
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
            .uploadCase {
              padding: 1px;
              height: 100%;
            }
          }
        }
        .upCaseImg {
          li {
            width: 10rem;
            height: 10rem;
            margin-right: 1.25rem;
            margin-bottom: 1.25rem;
            position: relative;
            .imgBox {
              width: 12.5rem;
              height: 12.5rem;
              background: #eee;
              overflow: hidden;
              margin-bottom: 0.625rem;
            }
            .el-input {
              border: 1px solid #ccc;
            }
            img {
              width: auto;
              height: 100%;
              position: relative;
              left: 50%;
              transform: translateX(-50%);
            }
            .removeIcon {
              //  font-family: Arial, Helvetica, sans-serif;
              font-size: 1.875rem;
              position: absolute;
              width: 1.25rem;
              height: 1.25rem;
              text-align: center;
              line-height: 1.25rem;
              right: -0.625rem;
              top: -0.625rem;
              cursor: pointer;
            }
            .uploadTip {
              font-size: 1.125rem;
              display: block;
              margin-top: 0.625rem;
            }
          }
        }
      }
      // 个人履历
      .personal-resume {
        td {
          vertical-align: middle;
        }
        .info {
          //  font-family: PingFangSC-Regular;
          font-size: 1rem;
          color: #999999;
          margin-bottom: 1.25rem;
        }
        .alnoePerson {
          margin-top: 1.25rem;
        }
        .uploadeacademic {
          // cursor: pointer;
          // position: relative;
          // overflow: hidden;
          // width: 0.8rem;
          // height: 0.45rem;
          // line-height: 0.45rem;
          // margin: 0 auto;
          text-align: center;
          .avatar {
            display: inline-block;
            height: 2.8125rem;
            width: auto;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .designerInfo {
          margin: 4.375rem 0 0 0.3125rem;
          padding: 0;
          width: 1.875rem;
          height: 1.875rem;
          border-radius: 50%;
          position: relative;
        }
      }
    }
    .submit-btn {
      //  font-family: PingFangHK-Regular;
      font-size: 14px;
      color: #ffffff;
      text-align: center;
      margin: 50px 0;
      .examine {
        width: 7.5rem;
        height: 2.875rem;
        background: #057aff;
        border-radius: 6.25rem;
      }
      .examine2 {
        // width: 1.20rem;
        // height: 0.46rem;
        border-radius: 2.25rem;
        // font:0.14rem;
        color: #000;
        border: none;
        background-image: linear-gradient(-90deg, #f3daa4 6%, #f2cd89 98%);
      }
    }
  }
}

.Architectural_type li {
  width: 20%;
  float: left;
}

.case-desp {
  width: 15.625rem;
  border: 0.0625rem solid #ccc;
}

.avatar-uploader {
  padding: 1.875rem 0 0;
  border: none;
  background: transparent;
  text-align: center;
  border-radius: 100%;
  img {
    width: 100%;
    height: 100%;
    // border-radius: 100%;
  }
  .el-upload {
    border: 1 dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: #409eff;
    }
    .tip {
      font-size: 1rem;
      line-height: 1.5;
    }
    .avatar {
      border-radius: 0;
      width: auto;
      height: 100%;
      display: block;
      margin: 0 auto;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.el-dialog__footer {
  margin: 0 0 3.125rem;
}

.el-form-item.operationItem {
  margin-bottom: 0;
}
.team-members {
  .info {
    margin-left: 1%;
    margin-top: 1.875rem;
  }
}
.team-form-inline {
  margin-left: 1%;
}
.fileIcon {
  font-size: 1.5rem;
  color: red;
}
.fileUploadAloneDesin {
  li {
    width: 1.875rem;
    height: 1.875rem;
    margin-right: 0.625rem;
    span {
      display: block;
      width: 100%;
      height: 100%;
      background: url("../../assets/images/file.png") center center no-repeat;
    }
  }
}
.hotLabel .el-checkbox {
  margin-left: 1.875rem;
}
.tag {
  color: red;
  float: left;
  margin-left: 1.25rem;
}
.upload-demo {
  text-align: center;
  .el-upload__text {
    font-size: 1.125rem;
    margin-top: 0.625rem;
  }

  .el-upload-dragger {
    width: 34.24rem !important;
    height: 21.6rem !important;
  }
}
.el-icon-circle-plus-outline {
  font-size: 1.75rem;
  margin-top: 20%;
  color: #333;
}
.dtpicker {
  width: 100%;
}
i.el-icon-document {
  font-size: 1.5625rem;
  color: #f2d79f;
}
.icon-text {
  text-align: center;
  // border-top: 0.005rem solid #e0e0e0;
  padding: 1.875rem 0;
  font-size: 1.5rem;
  color: #000000;
  .operation {
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    color: #333333;
  }
}
.middle {
  text-align: center;
  padding-bottom: 1.875rem;
  // border-bottom: 0.005rem solid #e0e0e0;
  .wechat-img {
    margin: 0 auto 1.25rem auto;
    width: 8.25rem;
    height: 8.25rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .detail {
    font-size: 0.875rem;
    color: #666666;
  }
}
.pi-input {
  width: 8.625rem;
  margin: auto;
}
.upCase .el-upload--picture-card {
  width: 10rem;
  height: 10rem;
}
.tagtip {
  color: #057aff;
  text-align: right;
  cursor: pointer;
  font-size: 0.8rem;
  margin-top: 15px;
  display: inline-block;
}
.inputWrapper {
  position: relative;
  .tag {
    position: absolute;
    right: 1.875rem;
    bottom: 1rem;
    font-size: 0.875rem;
    color: #057aff;
    text-align: right;
    z-index: 1;
    cursor: pointer;
    font-weight: 400;
    transition: 0.2s ease-out;
    width: auto;
  }
  .feedback {
    position: absolute;
    bottom: -1.2rem;
    color: #f44336;
    font-size: 0.75rem;
  }
}
</style>
<style lang="less">
.displayCard {
  display: none;
}
.modalwrapper .close {
  display: none;
}
.modalwrapper .close1 {
  padding: 1rem;
  margin: -1rem -1rem -1rem auto;
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
}
.upwrapper .el-upload.el-upload--picture-card {
  height: 100%;
  width: 100%;
}
.avatar-block .el-upload.el-upload--picture-card {
  border-radius: 0 !important;
}
.finishTime-wrapper .cov-date-body {
  top: 32% !important;
}
.timeWrapper {
  .day:not(.unavailable):hover {
    cursor: pointer;
    color: #000;
    font-weight: 500;
    background-color: #eee;
    border-radius: 50%;
  }
  .button-box span:hover {
    background: #eee;
    color: #000;
  }
}

.effectName {
  text-align: center;
  line-height: 1.875rem;
  height: 1.875rem;
  font-size: 1rem;
  color: #505050;
}
// 滤镜1
.chalkboard {
  background-image: url("/assets/images/bg-project-05.jpg");
  background-size: cover;
  background-position: center;
}
@supports (filter: grayscale(100%)) and (background-blend-mode: difference) {
  .chalkboard {
    background-image: url(/assets/images/bg-project-05.jpg),
      url(/assets/images/bg-project-05.jpg);
    background-blend-mode: difference;
    background-position: calc(50% - 1px) calc(50% - 1px),
      calc(50% + 1px) calc(50% + 1px);
    filter: brightness(9) grayscale(100%) saturate(5);
  }
}
// 滤镜2
.airbrush-effect {
  background-image: url(/assets/images/bg-project-05.jpg);
  background-size: cover;
  background-position: center;
}

@supports (filter: blur(5px) contrast(5)) and (mix-blend-mode: multiply) {
  .airbrush-effect {
    background: inherit;
    filter: brightness(1) saturate(2.5) contrast(4) invert(0.1) sepia(0.1)
      hue-rotate(5deg) blur(0.5px);
    mix-blend-mode: multiply;
  }
}
// 滤镜3
.colored-chalkboard-effect {
  background-image: url(/assets/images/bg-project-05.jpg);
  background-size: cover;
  background-position: center;
}

@supports (filter: brightness(1.6)) and
  (background-blend-mode: color, difference, overlay) {
  .colored-chalkboard-effect {
    background-image: url(/assets/images/bg-project-05.jpg),
      url(/assets/images/bg-project-05.jpg),
      url(/assets/images/bg-project-05.jpg);
    background-size: cover;
    background-position: calc(50% - 1px) calc(50% - 1px),
      calc(50% + 1px) calc(50% + 1px), center;
    background-blend-mode: color, difference, overlay;
    filter: brightness(0.9) blur(1px) contrast(5) sepia(0.6) saturate(3)
      invert(0.2);
  }
}
// 滤镜4
.hallucination-effect {
  background-image: url(/assets/images/bg-project-05.jpg);
  background-size: cover;
  background-position: center;
}

@supports (filter: blur(2px)) and (mix-blend-mode: multiply) {
  .hallucination-effect {
    position: relative;
    overflow: hidden;
    background-size: cover;
    background-blend-mode: screen, difference;
    background-position: calc(50%-1px) calc(50%-1px),
      calc(50%+1px) calc(50px+1px);
    filter: brightness(2) blur(1.1px) contrast(3.9) saturate(1);
    box-shadow: inset 0 0 0 1px black;
    mix-blend-mode: multiply;
  }
}
.card-body {
  overflow-y: hidden;
  .avatar {
    top: 0;
    left: 0;
    //  margin:0.9375rem 1rem;
    text-align: center;
    //  border:1px dashed #ccc;
    height: 90%;
    width: 90%;
  }
}
.border-style {
  position: relative;
  display: flex;
  overflow: hidden;
  // top: 0;
  // left: 8px;
  width: 5rem;
  height: 5rem;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.15);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
  img {
    width: 100%;
  }
}
.lv-item {
  text-align: right;
  cursor: pointer;
  height: 48px;
  line-height: 48px;
}
.designerBox {
  .tab-content .collapse-item {
    overflow: visible !important;
  }
  .select-wrapper .dropdown-content {
    max-height: 200px !important;
  }
}
.flImg {
  position: relative;
  .updelImg {
    position: absolute;
    top: -10px;
    right: -5px;
    cursor: pointer;
  }
}
.card-img {
  .upload-demo {
    // width: 100% !important;
    // .el-upload {
    //   width: 100% !important;
    //   height: 12.5rem !important;
    // }
    // .el-upload-dragger {
    //   width: 100% !important;
    //   height: 100% !important;
    // }
  }
}
</style>
