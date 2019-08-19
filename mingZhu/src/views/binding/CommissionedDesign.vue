<template>
<div>
  <mdb-container>
  <!-- <div class="CommissionedDesign"> -->
    <headerPart></headerPart>
    <mdb-row class="py-5 CommissionedDesign">
      <mdb-col md="3">
        <div class="border-left border-dark" style="border-width:5px !important;padding-left:15px">
          <h3 class="h2" style="color:#333;">请告诉我们<br>您的需求</h3>
        </div>
        <div class="commissionedDesign-con" style="padding-left:20px;">请提交您项目的基本信息,基本信息成功提交后，合筑空间将为您进行项目立项，并由专职项目经理为您提供进一步服务，开始您的合筑设计之旅。</div>
      </mdb-col>
      <mdb-col md="9">
        <mdb-row class="mb-3">
          <mdb-col>
            填写项目基本信息
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-4">
          <mdb-col md="6" class="check-required position-relative">
            <div class="outline-input position-relative">
              <mdb-input
                type="text"
                size="lg"
                label="项目名称"
                :disabled="disabled||isSelectAddValueService"
                v-model="formLabelAlign.projectName"
                @change="checkProjectName"
                outline
              />
              <span 
              class="position-absolute" 
              style="line-height:3.125rem;top:0;right:0.725rem"
              @click="getAllToBePaid" 
               v-if="allToBePaidList&&allToBePaidList.length>0"><mdb-icon icon="caret-down" /></span>
               <div class="position-absolute w-100" v-if="isAddValueService" style="background:#fff;z-index:13;border: 1px solid #dadce0;border-radius:4px;">
                <mdb-row 
                    class="mx-0"
                    v-for="apl in allToBePaidList"
                    :key="apl.id">
                    <mdb-col md="12" class="addValueService">
                      <span style="display:block;" class="w-100 h-100" @click="addValueServiceClick(apl)">{{apl.projectName}}</span>
                    </mdb-col>
                  </mdb-row>
              </div>
           </div>
           <div class="tip-error mt-1" v-if="projectNameError">{{projectNameError}}</div>
          </mdb-col>
          <mdb-col md="6" class="check-required">
            <div class="outline-input">
              <mdb-input
                type="text"
                size="lg"
                label="建设地点"
                v-model="formLabelAlign.adress"
                @change="checkAdress"
                :disabled="disabled||isSelectAddValueService"
                outline
              />
              <div class="tip-error mt-1" v-if="adressError">{{adressError}}</div>
            </div>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-2">
          <mdb-col md="12">客户类型</mdb-col>
        </mdb-row>
        <mdb-row class="mb-4 check-required">
          <mdb-col md="3">
            <div class="form-check pl-0">
              <input 
                type="radio" 
                class="form-check-input" 
                name="materialGroupExample3" 
                value="个人" 
                v-model="formLabelAlign.employerInfo"
                id="materialGroupExample01"
                :disabled="isSelectAddValueService"
                @change="checkEmployerInfo"
              >
              <label class="form-check-label" for="materialGroupExample01">个人</label>
            </div>
          </mdb-col>
          <mdb-col md="3">
            <div class="form-check pl-0">
              <input 
                type="radio" 
                class="form-check-input" 
                name="materialGroupExample3" 
                value="企业"
                v-model="formLabelAlign.employerInfo"
                id="materialGroupExample02"
                :disabled="isSelectAddValueService"
                @change="checkEmployerInfo"
              >
              <label class="form-check-label" for="materialGroupExample02">企业</label>
            </div>
          </mdb-col>
          <mdb-col md="3">
            <div class="form-check pl-0">
              <input 
                type="radio" 
                class="form-check-input" 
                name="materialGroupExample3" 
                value="政府机构"
                v-model="formLabelAlign.employerInfo"
                id="materialGroupExample03"
                :disabled="isSelectAddValueService"
                @change="checkEmployerInfo"
              >
              <label class="form-check-label" for="materialGroupExample03">政府机构</label>
            </div>
          </mdb-col>
          <mdb-col md="3">
            <div class="form-check pl-0">
              <input 
                type="radio" 
                class="form-check-input" 
                name="materialGroupExample3" 
                value="其它"
                v-model="formLabelAlign.employerInfo"
                id="materialGroupExample04"
                :disabled="isSelectAddValueService"
                @change="checkEmployerInfo"
              >
              <label class="form-check-label" for="materialGroupExample04">其它</label>
            </div>
          </mdb-col>
          <mdb-col md="12" v-if="employerInfoError" class="mt-1">
             <div class="tip-error">{{employerInfoError}}</div>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-2">
          <mdb-col md="12">征集深度
            <span class="handleTip position-relative" @mouseover="showTip3=1" @mouseout="showTip3=null">
              <mdb-icon icon="exclamation-circle"/>&nbsp;&nbsp;建筑方案与概念方案说明
              <Description :show="showTip3" v-if="showTip3==1"></Description>
            </span>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-4 check-required">
          <!-- <mdb-col md="12">
             <div id="collectDepth">
              <lxx-radio-group
                vertical
                v-model="collectDepthChecked"
                :options="collectDepthList"
                label-name="name"
                value-name="id"
              ></lxx-radio-group>
             </div>
          </mdb-col> -->
          <mdb-col md="6">
            <div class="form-check pl-0">
              <input 
                type="radio" 
                class="form-check-input" 
                name="collectDepth" 
                value="概念方案"
                v-model="formLabelAlign.collectDepth"
                id="collectDepth1"
                :disabled="disabled"
                @change="checkCollectDepth"
              >
              <label class="form-check-label" for="collectDepth1">概念方案</label>
            </div>
          </mdb-col>
          <mdb-col md="6">
            <div class="form-check pl-0">
              <input 
                type="radio" 
                class="form-check-input" 
                name="collectDepth" 
                value="建筑方案"
                v-model="formLabelAlign.collectDepth"
                id="collectDepth2"
                :disabled="disabled"
                @change="checkCollectDepth"
              >
              <label class="form-check-label" for="collectDepth2">建筑方案</label>
            </div>
          </mdb-col>
          <mdb-col md="12" v-if="collectDepthError" class="mt-1">
            <div class="tip-error" >{{collectDepthError}}</div>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-2">
          <mdb-col>方案征集方式<span class="handleTip" @click="godetail('/CommissionedInvitation')"><mdb-icon icon="exclamation-circle"/>&nbsp;&nbsp;了解流程</span></mdb-col>
        </mdb-row>
        <mdb-row class="mb-4">
          <mdb-col md="12" class="mb-3">
            <div class="form-check pl-0">
              <input 
                type="radio" 
                class="form-check-input" 
                name="collectProgramType" 
                v-model="formLabelAlign.collectProgramType"
                @change="changeType(3)"
                value="3"
                id="Commission"
              >
              <label class="form-check-label" for="Commission"> 委托设计</label>
            </div>
            <mdb-row class="mt-3 check-required" v-if="formLabelAlign.collectProgramType==3">
              <mdb-col md="6">
                <div class="outline-input">
                  <mdb-input
                    type="text"
                    size="lg"
                    label="拟委托建筑师数量"
                    v-model="formLabelAlign.designerNum"
                     @change="checkDesignerNum"
                    :disabled="disabled"
                    outline
                  />
                  <div class="tip-error mt-1" v-if="designerNumError">{{designerNumError}}</div>
                </div>
              </mdb-col>
            </mdb-row>
          </mdb-col>
          <mdb-col md="12" class="mb-3">
            <div class="form-check pl-0">
              <input 
                type="radio" 
                class="form-check-input" 
                name="collectProgramType" 
                v-model="formLabelAlign.collectProgramType"
                @change="changeType(1)"
                value="1"
                id="public"
              >
              <label class="form-check-label" for="public">公开招标</label>
            </div>
            <mdb-row class="mt-3 check-required" v-if="formLabelAlign.collectProgramType==1">
              <mdb-col md="6">
                <div class="outline-input">
                  <mdb-input
                    type="text"
                    size="lg"
                    label="入围方案数量"
                    v-model="formLabelAlign.incircleRecomNum"
                    @change="checkIncircleRecomNum"
                    :disabled="disabled"
                    outline
                  />
                  <div class="tip-error mt-1" v-if="incircleRecomNumError">{{incircleRecomNumError}}</div>
                </div>
              </mdb-col>
            </mdb-row>
          </mdb-col>
          <mdb-col md="12" class="mb-3">
            <div class="form-check pl-0">
              <input 
                type="radio" 
                class="form-check-input" 
                name="collectProgramType" 
                v-model="formLabelAlign.collectProgramType"
                @change="changeType(2)"
                value="2"
                id="invite"
              >
              <label class="form-check-label" for="invite">邀请招标</label>
            </div>
            <mdb-row class="mt-3 check-required" v-if="formLabelAlign.collectProgramType==2">
              <mdb-col md="6">
                <div class="outline-input">
                  <mdb-input
                    type="text"
                    size="lg"
                    label="拟邀请设计师数量"
                    v-model="formLabelAlign.designerNum"
                    @change="checkDesignerNum"
                    :disabled="disabled"
                    outline
                  />
                  <div class="tip-error mt-1" v-if="designerNumError">{{designerNumError}}</div>
                </div>
              </mdb-col>
              <mdb-col md="6">
                 <div class="outline-input">
                  <mdb-input
                    type="text"
                    size="lg"
                    label="入围方案数量"
                    v-model="formLabelAlign.incircleRecomNum"
                    @change="checkIncircleRecomNum"
                    :disabled="disabled"
                    outline
                  />
                  <div class="tip-error mt-1" v-if="incircleRecomNumError">{{incircleRecomNumError}}</div>
                </div>
              </mdb-col>
            </mdb-row>
          </mdb-col>
          <mdb-col md="12">
            <div class="form-check pl-0">
              <input 
                type="radio" 
                class="form-check-input" 
                name="collectProgramType" 
                v-model="formLabelAlign.collectProgramType"
                @change="changeType(4)"
                value="4"
                id="inviteAndPublic"
              >
              <label class="form-check-label" for="inviteAndPublic">邀请+公开招标</label>
            </div>
            <mdb-row class="mt-3 check-required" v-if="formLabelAlign.collectProgramType==4">
                <mdb-col md="6">
                  <div class="outline-input">
                  <mdb-input
                    type="text"
                    size="lg"
                    label="拟邀请设计师数量"
                    v-model="formLabelAlign.designerNum"
                    @change="checkDesignerNum"
                    :disabled="disabled"
                    outline
                  />
                  <div class="tip-error mt-1" v-if="designerNumError">{{designerNumError}}</div>
                </div>
                </mdb-col>
                <mdb-col md="6">
                  <div class="outline-input">
                    <mdb-input
                      type="text"
                      size="lg"
                      label="入围方案数量"
                      v-model="formLabelAlign.incircleRecomNum"
                      @change="checkIncircleRecomNum"
                      :disabled="disabled"
                      outline
                    />
                    <div class="tip-error mt-1" v-if="incircleRecomNumError">{{incircleRecomNumError}}</div>
                  </div>
                </mdb-col>
              </mdb-row>
          </mdb-col>
        </mdb-row>
        <mdb-row class="mb-2">
          <mdb-col md="12">任务书</mdb-col>
        </mdb-row>
        <mdb-row class="mb-4 check-required">
          <mdb-col md="4">
            <div class="form-check pl-0">
              <input 
                type="radio" 
                class="form-check-input" 
                name="hasTaskFile" 
                value="1"
                v-model="formLabelAlign.hasTaskFile"
                id="hasTaskFile01"
                :disabled="isDidSelectBook"
                @change="checkHasTaskFile"
              >
              <label class="form-check-label" for="hasTaskFile01">有任务书</label>
            </div>
          </mdb-col>
          <mdb-col md="4">
            <div class="form-check pl-0">
              <input 
                type="radio" 
                class="form-check-input" 
                name="hasTaskFile" 
                value="2"
                v-model="formLabelAlign.hasTaskFile"
                id="hasTaskFile02"
                :disabled="isDidSelectBook"
                  @change="checkHasTaskFile"
              >
              <label class="form-check-label" for="hasTaskFile02">无任务书</label>
            </div>
          </mdb-col>
          <mdb-col md="4">
            <div class="form-check pl-0">
              <input 
                type="radio" 
                class="form-check-input" 
                name="hasTaskFile" 
                value="3"
                v-model="formLabelAlign.hasTaskFile"
                id="hasTaskFile03"
                  @change="checkHasTaskFile"
              >
              <label class="form-check-label" for="hasTaskFile03">代写任务书（增值服务）</label>
            </div>
          </mdb-col>
          <mdb-col v-if="hasTaskFileError" class="mt-1">
            <div class="tip-error">{{hasTaskFileError}}</div>
          </mdb-col>
        </mdb-row>
        <!-- 有任务书 -->
        <mdb-row class="mb-4" v-if="formLabelAlign.hasTaskFile==1">
          <mdb-col md="12">
            <el-upload 
              class="upload-demo"
              style="display:inline-block;"
              :action="api.upload()"
              :on-success="handleSuccess"
              :before-upload="beforeFileUpload"
              :show-file-list="false">
              <mdb-btn color="primary" class="py-1 px-2" style="border-radius:4px">请上传任务书</mdb-btn>
            </el-upload>
            <div v-if="fileList&&fileList.length>0" style="display:inline-block;">
              <p
                v-for="(item,index) in fileList"
                :key="index"
                style="line-height:1rem;color: #606266;"
              >{{item.fileName}}
                <span@click="deleteFile(item,index)" style="margin-left:0.5rem;"><mdb-icon icon="times"/></span>
              </p>
            </div>
          </mdb-col>
        </mdb-row>
        <!-- 无任务书 -->
        <mdb-row class="mb-4" v-if="formLabelAlign.hasTaskFile==2">
          <mdb-col md="12">
            <mdb-row class="mb-3">
              <mdb-col md="12">
                项目设计需求
                <span class="handleTip position-relative" @mouseover="showTip2=2" @mouseout="showTip2=null">
                  <mdb-icon icon="exclamation-circle"/>&nbsp;&nbsp;增值服务说明
                  <Description :show="2" v-if="showTip2==2"></Description>
                </span>
              </mdb-col>
            </mdb-row>
            <mdb-row class="mb-3">
              <mdb-col md="6">
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
                <div class="tip-error mt-1" v-if="ydModelError">{{ydModelError}}</div>
              </mdb-col>
              <mdb-col md="6">
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
                <div class="tip-error mt-1" v-if="arcModelError">{{arcModelError}}</div>
              </mdb-col>
            </mdb-row>
            <mdb-row class="mb-3">
              <mdb-col mb="12">
                项目类别（根据项目情况可多选）
              </mdb-col>
            </mdb-row>
            <mdb-row class="mb-4">
              <mdb-col md="3" v-for="item in projectTypeList":key="item.value" class="pr-0">
                <div class="form-check pl-0 mb-1">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    name="projectType"
                    :id="item.id"
                    :value="item.id"
                    :checked="selectedProjectType.indexOf(item.name)!=-1"
                    @change="getType(item.id,item.name)"
                    :disabled="disabled"
                  >
                  <label class="form-check-label" :for="item.id">{{item.name}}</label>
                </div>
              </mdb-col>
            </mdb-row>
            <mdb-row class="mb-3" v-show="parentidList.length>0">
              <mdb-col mb="12">
                您选择的项目类型如下，请从中点选或在下方输入项目包含的功能内容
              </mdb-col>
            </mdb-row>
            <mdb-row v-show="parentidList.length>0">
              <mdb-col md="12" class="mb-3" v-for="(valueList,key) in buildList" :key="key">
                <p class="mb-2">{{valueList.key}}</p>
                <!-- <div id="projectTs"> -->
                  <mdb-row>
                    <mdb-col md="3" v-for="value in valueList.name":key="value.name">
                      <div class="form-check pl-0">
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
                        <label class="form-check-label" :for="value.name">{{value.name}}</label>
                      </div>
                    </mdb-col>
                  </mdb-row>
                <!-- </div> -->
              </mdb-col>
              <mdb-col md="12" class="mt-1">
                <div v-if="isProjectError" class="tip-error">{{isProjectError}}</div>
              </mdb-col>
              <mdb-col md="12" v-if="(detailList&&detailList.length>0)||selectedProjectType.indexOf('其他')>0">
                <mdb-row class="mb-3">
                  <mdb-col>所选功能内容</mdb-col>
                </mdb-row>
                <mdb-row class="mb-4" v-for="(item,index) in detailList" :key="item.value" id="choosedOP">
                  <mdb-col md="6" class="info-pb">
                     <div class="outline-input">
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
                    <div class="tip-error mt-1" v-if="!item.display&&item.msg">{{item.msg}}</div>
                  </mdb-col>
                  <mdb-col md="6" class="info-pb">
                    <div class="outline-input">
                        <mdb-input
                          type="text"
                          size="lg"
                          label="建设规模（平方米）"
                          :disabled="disabled"
                          v-model="item.buildSize"
                          @change="checkBuildSize(item.buildSize,index)"
                          outline
                        />
                    </div>
                    <div class="tip-error mt-1" v-if="item.error">{{item.error}}</div>
                  </mdb-col>
                  <mdb-col md="6" v-if="!item.display">
                    <span @click="deleteOrther(index)">
                      <mdb-icon far icon="trash-alt"/>
                    </span>
                  </mdb-col>
                </mdb-row>
              </mdb-col>
              <mdb-col md="12"v-if="selectedProjectType.length>0&&selectedProjectType.indexOf('其他')!=-1">
                <div class="tip-error mt-1" v-if="addError">{{addError}}</div>
                <mdb-btn color="primary" @click="add" class="px-2 py-1">
                  <mdb-icon icon="plus" class="mr-1"/>自行填写功能
                </mdb-btn>
              </mdb-col>
            </mdb-row>
            <mdb-row class="mb-4">
              <mdb-col md="12">
                <div class="outline-input">
                  <mdb-input
                    type="textarea"
                    label="设计需求详细描述"
                    outline
                     v-model="formLabelAlign.designDescribe"
                    :disabled="disabled"
                    @input="handleTextarea"
                    :rows="3"
                  />
                </div>
              </mdb-col>
              <mdb-col md="12" class="mt-1"  v-if="textareaError">
                <div class="tip-error">{{textareaError}}</div>
              </mdb-col>
            </mdb-row>
            <mdb-row class="mb-3">
              <mdb-col>
                预期项目周期
              </mdb-col>
            </mdb-row>
            <mdb-row class="mb-4">
              <mdb-col md="6">
                <div class="date-box w-100">
                  <label for="projectName"  class="label-date">开始日期</label>
                    <mdb-date-picker
                      class="w-100"
                      :date="startDate"
                      :option="option"
                      @getValue="getPickerStartValue"
                      :disabled="disabled"
                      :limit="limit"
                    ></mdb-date-picker>
                  <div class="tip-error mt-1" v-if="beginTimeError">{{beginTimeError}}</div>
               </div>
              </mdb-col>
              <mdb-col md="6">
                <div class="date-box w-100">
                <label for="adress" class="label-date">结束日期</label>
                  <mdb-date-picker
                    class="w-100"
                    :date="endDate"
                    :option="option"
                    @getValue="getPickerEndValue"
                    :disabled="disabled"
                    :limit="limit"
                  ></mdb-date-picker>
                  <div class="tip-error mt-1" v-if="endTimeError">{{endTimeError}}</div>
                </div>
              </mdb-col>
            </mdb-row>
            <mdb-row class="mb-3" 
                v-if="formLabelAlign.ydModel&&
                formLabelAlign.arcModel&&
                formLabelAlign.beginTime&&
                formLabelAlign.endTime&&
                selectedProjectType&&
                selectedProjectType.length>0">
              <mdb-col>
                设计费预算
                 <span class="handleTip position-relative" @mouseover="showTip5=3" @mouseout="showTip5=null">
                  <mdb-icon icon="exclamation-circle"/>&nbsp;&nbsp;设计费预估算说明？
                  <Description :show="3" v-if="showTip5==3"></Description>
                </span>
              </mdb-col>
            </mdb-row>
            <mdb-row class="mb-4" 
                  v-if="formLabelAlign.ydModel&&
                  formLabelAlign.arcModel&&
                  formLabelAlign.beginTime&&
                  formLabelAlign.endTime&&
                  selectedProjectType&&
                  selectedProjectType.length>0">
              <mdb-col md="6">
                <div class="outline-input">
                  <mdb-input
                    type="text"
                    size="lg"
                    label="设计费总预算(元)"
                    :disabled="disabled"
                    v-model="formLabelAlign.designFeeBudget"
                    @change="checkDesignFeeBudget"
                    outline
                  />
                </div>
                <div class="tip-error mt-1" v-if="designFeeBudgetError">{{designFeeBudgetError}}</div>
              </mdb-col>
            </mdb-row>
          </mdb-col>
        </mdb-row>
        <mdb-row style="padding-top:36px !important;">
          <mdb-col md="12" class="text-left">
            <mdb-btn color="primary" class="btn212_60" @click="endConfirm">提交</mdb-btn>
          </mdb-col>
        </mdb-row>
      </mdb-col>
    </mdb-row>
    <mdb-modal v-if="centerDialogVisible" @close="centerDialogVisible = false" info>
      <mdb-modal-header class="text-center"  :close="false">
        <p class="heading" style="width:100%;">提示</p>
      </mdb-modal-header>
      <mdb-modal-body>
        <p class="text-center">
          <span>您填写的设计费预算过低，可能无法完成方案征集，是否调整设计费预算。</span>
        </p>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn color="primary" @click.native="goOn()">调整预算</mdb-btn>
        <mdb-btn outline="primary" @click.native="submit('formLabelAlign')">继续提交</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    <DialogBox :isDisabled="isDisabled" :dialogObj="dialogObj" @dialogConfirm="dialogConfirm" @dialogCancal="dialogCancal"></DialogBox>
  <!-- </div> -->
  </mdb-container>
   <footerPart></footerPart>
</div>
</template>
<script>
import DialogBox from "@/components/dialog.vue";
import headerPart from "@/components/header.vue";
import footerPart from '@/components/footer.vue'
import { constants } from "zlib";
import Description from '@/components/description'
export default {
  components: {
    headerPart,
    DialogBox,
    footerPart,
    Description
  },
  data() {
    return {
      showTip3:null,
      showTip2:null,
      showTip5:null,
      isDisabled:false,
      collectDepthChecked: null,
      collectDepthList: [
        {
          id: 1,
          name: "概念方案"
        },
        {
          id: 2,
          name: "建筑方案"
        }
      ],
      // hasTaskFileArr: [
      //   {
      //     id: 1,
      //     name: "有任务书"
      //   },
      //   {
      //     id: 2,
      //     name: "无任务书"
      //   },
      //   {
      //     id: 3,
      //     name: "代写任务书（增值服务）"
      //   }
      // ],
      // hasTaskFileChecked: null,
      hasTaskFileError: null,
      selectedBuildType: [],
      selectedProjectType: [],
      functionNum: false,
      // employerInfoChecked: null,
      // employerInfoList: [
      //   {
      //     id: 0,
      //     name: "个人"
      //   },
      //   {
      //     id: 1,
      //     name: "企业"
      //   },
      //   {
      //     id: 2,
      //     name: "政府机构"
      //   },
      //   {
      //     id: 3,
      //     name: "其它"
      //   }
      // ],
      open: false,
      cheap: false,
      centerDialogVisible: false,
      selectedContent: [],
      tip1: false,
      tip2: false,
      tip3: false,
      tip4: false,
      tip5: false,
      disabled: false,
      type: false,
      emplyerInfo: true,
      tel: true,
      radio: "2",
      parentidList: [],
      buildingTypeList: {},
      projectTypeList: [],
      cardImageUrl: "", //初步项目需求书
      projectTypeElse: "",
      formLabelAlign: {
        packageId:null,
        // srcFileName:[],
        hasTaskFile: "",
        projectType: [],
        buildType: [],
        // fileName: [],
        // taskFile:{},
        orgfileName: "",
        filePath: "",
        buildDetail: [],
        buildSize: [],
        employerInfoElse: "",
        // resource: "",employerInfo
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
      estimateMoney: "",
      fileList: [],
      detailList: [],
      startDate: {
        date: ""
      },
      endDate: {
        date: ""
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
        format: "YYYY-MM-DD",
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
      projectNameError: "",
      adressError: "",
      employerInfoError: "",
      ydModelError: "",
      arcModelError: "",
      buildDetailError: "",
      buildSizeError: "",
      designerNumError: "",
      incircleRecomNumError: "",
      designFeeBudgetError: "",
      collectDepthError: "",
      collectProgramTypeError: "",
      beginTimeError: "",
      endTimeError: "",
      dialogObj: {
        //弹框
        titleCon: "提示",
        dialogCon: "是否确认提交",
        dialogshow: false,
        dialogBtnname: "确定"
      },
      reason: "",
      fileName: "",

      sourceError: null,
      textareaError: null,
      isProjectError: null,
      uploadFileError: null,
      addError: null,
      buildList: [],
      allToBePaidList: [],

      isAddValueService: false,
      isSelectAddValueService: false,
      isDidSelectBook: false,
      toBePaidListDisableed:false
    };
  },
  watch: {
    collectDepthChecked(v) {
      let beginTime = Number(new Date(this.formLabelAlign.beginTime));
      let endTime = Number(new Date(this.formLabelAlign.endTime));
      if (v) {
        this.collectDepthError = null;
      }
      for (let i = 0; i < this.collectDepthList.length; i++) {
        if (this.collectDepthList[i].id == v) {
          this.formLabelAlign.collectDepth = this.collectDepthList[i].name;
          // if (
          //     this.formLabelAlign.collectDepth=="方案设计"&&
          //     beginTime > 0 &&
          //     endTime > 0 && 
          //     endTime <= beginTime + 1209600000
          //   ) {
          //     this.endTimeError = "项目周期必须大于两周";
          //     this.beginTimeError = null;
          //   }
          break;
        }
      }
    },
    //客户类型
    // employerInfoChecked(v) {
    //   if (v) {
    //     this.employerInfoError = null;
    //   }
    //   for (let i = 0; i < this.employerInfoList.length; i++) {
    //     if (this.employerInfoList[i].id === v) {
    //       this.formLabelAlign.employerInfo = this.employerInfoList[i].name;
    //       break;
    //     }
    //   }
    // },
    // 是否有任务书
    // hasTaskFileChecked(v) {
    //   if (v) {
    //     this.hasTaskFileError = null;
    //   }
    //   for (let i = 0; i < this.hasTaskFileArr.length; i++) {
    //     if (this.hasTaskFileArr[i].id === v) {
    //       this.formLabelAlign.hasTaskFile = this.hasTaskFileArr[i].id;
    //     }
    //   }
    // }
  },
  methods: {
    checkEmployerInfo(val){
      if(val){
         this.employerInfoError = null;
      }
    },
    checkCollectDepth(val){
      if(val){
        this.collectDepthError = null;
      }
    },
    checkHasTaskFile(val){
      if(val){
        this.hasTaskFileError = null;
      }
    },
    getAllToBePaid() {
      if(this.toBePaidListDisableed){
        return
      }
      this.isAddValueService = !this.isAddValueService;
      this.projectNameError = null;
      this.getAllToBePaidList()
    },
    getAllToBePaidList(){
      this.allToBePaidList = [];
      this.toBePaidListDisableed = true
      this.api.getAllByBossId(localStorage.getItem("userId")).then(res => {
        if (res.code == 0) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].statues == 2) {
              this.allToBePaidList.push(res.data[i]);
            }
          }
          if (this.allToBePaidList.length > 0) {
            this.allToBePaidList.unshift({id:-1,projectName:"自行填写"})
          }
        } else {
          this.$message(res.msg);
        }
        this.toBePaidListDisableed = false
      });
    },
    addValueServiceClick(item) {
       console.log(item)
      if(item.id==-1){
        this.isAddValueService = false;
        this.isSelectAddValueService = false;
        this.isDidSelectBook = false;
        this.formLabelAlign.projectName = null;
        this.formLabelAlign.adress = null;
        // this.employerInfoChecked = null;
        this.formLabelAlign.employerInfo = null;
        this.formLabelAlign.hasTaskFile = null;
        // this.hasTaskFileChecked = null;
        this.formLabelAlign.packageId=null;
      }else {
         if (item.isUse != 1) {
            this.isAddValueService = false;
            this.isSelectAddValueService = true;
            this.formLabelAlign.projectName = item.projectName;
            this.formLabelAlign.adress = item.adress;
            this.formLabelAlign.packageId=item.id;
            if(item.employerInfo==0){
              this.formLabelAlign.employerInfo = "个人";
            }
            if(item.employerInfo==1){
              this.formLabelAlign.employerInfo = "企业";
            }
            if(item.employerInfo==2){
              this.formLabelAlign.employerInfo = "政府机构";
            }
            if(item.employerInfo==3){
              this.formLabelAlign.employerInfo = "其它";
            }
            // this.employerInfoChecked = parseInt(item.employerInfo);
            // for (let i = 0; i < this.employerInfoList.length; i++) {
            //   if (this.employerInfoList[i].id === item.employerInfo) {
            //     this.formLabelAlign.employerInfo = this.employerInfoList[i].name;
            //     break;
            //   }
            // }
            if (item.assignmentBook == 1) {
              this.formLabelAlign.hasTaskFile = 3;
              // this.hasTaskFileChecked = 3;
              this.isDidSelectBook = true;
            }else{
              this.formLabelAlign.hasTaskFile = null;
              this.isDidSelectBook = false;
            }
          } else {
            this.$message("该项目已经存在。");
          }
      }
    },
    // 时间格式化
    format(date) {
      let d = new Date(date);
      return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    },
    // 删除文件
    deleteFile(item) {
      let len;
      let file = item.file;
      // let index = this.formLabelAlign.fileName.indexOf(file);
      if (len != -1) {
        // this.formLabelAlign.fileName.splice(len, 1);
        for (let i = 0; i < this.fileList.length; i++) {
          if (this.fileList[i].file == file) {
            this.fileList.splice(i, 1);
            break;
          }
        }
      }
    },
    // 删除项目类型
    deleteOrther(index) {
      this.detailList.splice(index, 1);
    },
    //  项目名称 必填
    checkProjectName(value) {
      if (!value) {
        this.projectNameError = "请输入项目名称";
      }else if(value.length>20){
        this.projectNameError = "项目名称长度必须小于20";
      } else {
        this.projectNameError = null;
      }
    },
    // 建设地点 必填
    checkAdress(value) {
      if (!value) {
        this.adressError = "请输入建设地点";
      }else if(value.length>50){
        this.adressError = "建设地点长度必须小于50";
      } else {
        this.adressError = null;
      }
    },

    // 请输入其他客户类型  必填
    // checkEmployerInfoElse(value) {
    //   if (!value) {
    //     this.employerInfoError = "请输入其他客户类型";
    //   } else {
    //     this.employerInfoError = null;
    //   }
    // },

    //用地规模  非必填
    checkYdModel(value) {
      let numberReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if (value && !numberReg.test(value)) {
        this.ydModelError = "请输入用地规模的正确格式";
      }else if(value.split(".")[0].length>10){
        this.ydModelError = "用地规模不能大于10位";
      }else{
        this.ydModelError = null;
      }
    },
    // 建筑规模 非必填
    checkArcModel(value) {
      let numberReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if (value && !numberReg.test(value)) {
        this.arcModelError = "您输入的格式有误";
      } else if(value.split(".")[0].length>10){
        this.arcModelError = "您输入的长度有误";
      } else {
        this.arcModelError = null;
      }
    },
    // 征集深度  必填
    // handleCollectDepth(val) {
    //   this.formLabelAlign.collectDepth = val;
    //   this.collectDepthError = null;
    // },
    // 设计需求详细描述
    handleTextarea(val) {
      if (val.length > 500) {
        this.textareaError = "设计需求详细描述不能超过500个字请修改";
      } else {
        this.textareaError = null;
      }
      this.formLabelAlign.designDescribe = val;
    },
    // 选择方案征集方式 必填
    changeType(val) {
      this.incircleRecomNumError = null;
      this.designerNumError = null;
      this.sourceError = null;
      if (this.formLabelAlign.collectProgramType === val) {
        this.formLabelAlign.collectProgramType = "";
      } else {
        this.formLabelAlign.collectProgramType = val;
      }
      if (val === 2 || val === 4) {
        this.formLabelAlign.incircleRecomNum = "";
        this.formLabelAlign.starDesignerNum = "";
        this.formLabelAlign.designerNum = "";
      }
      if (val === 1) {
        this.formLabelAlign.incircleRecomNum = "";
      }
      if (val === 3) {
        this.formLabelAlign.designerNum = "";
      } else {
      }
    },
    //请填写设计师数量
    checkDesignerNum(value) {
      let incircleRecomNum = this.formLabelAlign.incircleRecomNum; //入围数量
      let designerNum = this.formLabelAlign.designerNum; //拟邀请设计师数量
      let numberReg = /^\+?[1-9]\d*$/;
      if (!value) {
        this.designerNumError = "请填写设计师数量";
        this.functionNum = true;
      }else if(value>100){
        this.designerNumError = "设计师数量不能大于100";
        this.functionNum = true;
      } else if (!numberReg.test(value)) {
        this.designerNumError = "请输入整数并且大于0";
        this.functionNum = true;
      } else if (!incircleRecomNum && incircleRecomNum > designerNum) {
        this.designerNumError = "入围方案数量不能大于邀请设计师数量";
        this.incircleRecomNumError = null;
        this.functionNum = true;
      } else {
        this.designerNumError = null;
        this.incircleRecomNumError = null;
        this.functionNum = false;
      }
    },
    // 请填写入围方案数量
    checkIncircleRecomNum(value) {
      let incircleRecomNum = this.formLabelAlign.incircleRecomNum; //入围数量
      let designerNum = this.formLabelAlign.designerNum; //拟邀请设计师数量
      let numberReg = /^\+?[1-9]\d*$/;
      if (!value) {
        this.incircleRecomNumError = "请填写入围方案数量";
        this.functionNum = true;
      }else if(value>100){
        this.incircleRecomNumError = "入围方案数量不能大于100";
        this.functionNum = true;
      } else if (!numberReg.test(value)) {
        this.incircleRecomNumError = "请输入整数并且大于0";
        this.functionNum = true;
      } else if (designerNum && incircleRecomNum > designerNum) {
        this.incircleRecomNumError = "入围方案数量不能大于邀请设计师数量";
        this.designerNumError = null;
        this.functionNum = true;
      } else {
        this.incircleRecomNumError = null;
        this.designerNumError = null;
        this.functionNum = false;
      }
    },

    // 开始时间
    getPickerStartValue(value) {
      this.formLabelAlign.beginTime = value;
      this.beginTimeError = "请选择时间";
      let beginTime = Number(new Date(this.formLabelAlign.beginTime));
      let endTime = Number(new Date(this.formLabelAlign.endTime));
      let nowData = Number(new Date());
      if( beginTime > 0 &&
          endTime !== 0 && 
          endTime < beginTime+86400000
      ){
        this.beginTimeError = "开始时间必须小于结束时间";
        this.endTimeError = null;
      }
      // else if (
      //   this.formLabelAlign.collectDepth=="方案设计"&&
      //   beginTime > 0 &&
      //   endTime !== 0 && 
      //   endTime <= beginTime + 1209600000
      //  ) {
      //   this.beginTimeError = "项目周期必须大于两周";
      //   this.endTimeError = null;
      // }
       else {
        this.beginTimeError = null;
        this.endTimeError = null;
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
      //   ) {
      //   this.endTimeError = "项目周期必须大于两周";
      //   this.beginTimeError = null;
      // }
       else {
        this.endTimeError = null;
        this.beginTimeError = null;
      }
    },
    // 设计费总预算
    checkDesignFeeBudget(value) {
      let numberReg =  /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if (value && !numberReg.test(value)) {
        this.designFeeBudgetError = "您输入的格式有误";
      }else if(value.split(".")[0].length>12){
        this.designFeeBudgetError = "您输入的长度有误";
      } else {
        this.designFeeBudgetError = null;
      }
    },
    // 输入用地规模
    checkBuildSize(value, index) {
      let numberReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      if (!value) {
        this.detailList[index].error = "请输入用地规模";
      } else if (!numberReg.test(value)) {
        this.detailList[index].error = "您输入的格式有误";
      }else if(value.split(".")[0].length>10){
        this.detailList[index].error = "您输入的长度有误";
      } else {
        this.detailList[index].error = null;
      }
    },
    //输入类型
    checkBuildCon(value, index) {
      let reg = /[,|&]/;
      if (!value) {
        this.detailList[index].msg = "请填写内容";
      } else if (reg.test(value)) {
        this.detailList[index].msg = "不能输入特殊字符，请正确填写内容";
      } else if (value.length > 10) {
        this.detailList[index].msg = "填写内容最大长度不能超过10";
      } else {
        this.detailList[index].msg = null;
      }
    },

    checkForm() {
      let isCheckPass = true;
      if (!this.formLabelAlign.projectName || this.projectNameError !== null) {
        //项目名称 必填校验 必填
        this.projectNameError = "请输入项目名称";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (!this.formLabelAlign.adress || this.adressError !== null) {
        // 建设地点 必填校验 必填
        this.adressError = "请输入建设地点";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if (this.formLabelAlign.employerInfo === "" || this.employerInfoError) {
        // 客户类型 必填校验 必填
        this.employerInfoError = "请选择客户类型";
        document.documentElement.scrollTop = 250;
        isCheckPass = false;
      }
      // else if (
      //   this.formLabelAlign.employerInfo == "其它" &&
      //   !this.formLabelAlign.employerInfoElse
      // ) {
      //   // 选择其他客户类型 必填客户类型
      //   this.employerInfoError = "请选择输入其他客户类型";
      //   document.documentElement.scrollTop = 250;
      //   isCheckPass = false;
      // }
      if (!this.formLabelAlign.collectDepth) {
        this.collectDepthError = "请选择征集深度";
        document.documentElement.scrollTop = 250;
        isCheckPass = false;
      }
      // 方案征集方式选择
      if (
        this.formLabelAlign.collectProgramType == 2 ||
        this.formLabelAlign.collectProgramType == 4
      ) {
        // 邀请招标，邀请+公开
        if (this.incircleRecomNumError) {
          isCheckPass = false;
        } else if (!this.formLabelAlign.incircleRecomNum) {
          this.incircleRecomNumError = "请填写入围方案数量";
          isCheckPass = false;
        }

        if (this.designerNumError) {
          isCheckPass = false;
        } else if (!this.formLabelAlign.designerNum) {
          this.designerNumError = "请填写设计师数量";
          isCheckPass = false;
        }
      } else if (this.formLabelAlign.collectProgramType == 1) {
        //公开招标
        if (this.incircleRecomNumError) {
          isCheckPass = false;
        } else if (!this.formLabelAlign.incircleRecomNum) {
          this.incircleRecomNumError = "请填写入围方案数量";
          isCheckPass = false;
        }
      } else if (this.formLabelAlign.collectProgramType == 3) {
        //委托设计
        if (this.designerNumError) {
          isCheckPass = false;
        } else if (!this.formLabelAlign.designerNum) {
          this.designerNumError = "请填写设计师数量";
          isCheckPass = false;
        }
      } else {
        //未选择征集方案
      }

      if (this.formLabelAlign.hasTaskFile == 1) {
        // 有任务书
        if (!this.cardImageUrl) {
          // 上传相关文件
          this.uploadFileError = "请上传任务书";
          document.documentElement.scrollTop = 250;
          isCheckPass = false;
        }
      } else if (this.formLabelAlign.hasTaskFile == 2) {
        // 无任务书
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
          if (!this.detailList[i].buildDetail) {
            this.detailList[i].msg = "请输入内容";
            count++;
          } else {
            this.detailList[i].msg = null;
          }
          let numberReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
          if (!this.detailList[i].buildSize) {
            this.detailList[i].error = "请输入用地规模";
            num++;
          } else if (!numberReg.test(this.detailList[i].buildSize)) {
            this.detailList[i].error = "您输入的格式有误";
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
          // if (projectType_arr.length != this.selectedProjectType.length - 1) {
          //   this.isProjectError = "请选择项目包含的功能";
          //   document.documentElement.scrollTop = 200;
          //   isCheckPass = false;
          // }
        } else {
          if (projectType_arr.length != this.selectedProjectType.length) {
            this.isProjectError = "请选择项目包含的功能";
            document.documentElement.scrollTop = 200;
            isCheckPass = false;
          }
        }

        if (this.textareaError) {
          // 设计需求详细描述
          this.textareaError = "设计需求详细描述不能太长请修改";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        } else if (this.formLabelAlign.designDescribe.length > 500) {
          // 设计需求详细描述
          this.textareaError = "设计需求详细描述不能太长请修改";
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        } else {
          // 未填写设计需求详细描述
        }
      } else if (this.formLabelAlign.hasTaskFile == 3) {
        // 增值服务
      } else {
        //未选择是否有任务书或者代写任务书
        this.hasTaskFileError = "请选择是否有任务书或者代写任务书";
        document.documentElement.scrollTop = 250;
        isCheckPass = false;
      }
      return isCheckPass;
    },
    //文件上传
    handleSuccess(res, file, fileList) {
      let item = {
        file: res.msg,
        fileName: file.name
      };
      this.fileList.push(item);
      this.api.getUrl({ fileName: res.msg }).then(res => {
        if (res.code == 0) {
          this.$message("操作成功");
          this.cardImageUrl = res.msg;
          this.uploadFileError = null;
        }
      });
    },
    beforeFileUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 10MB!");
      }
      return isLt2M;
    },
    // showTip1() {
    //   if (this.tip1) {
    //     this.tip1 = false;
    //   } else {
    //     this.tip1 = true;
    //   }
    // },
    // showTip2() {
    //   if (this.tip2) {
    //     this.tip2 = false;
    //   } else {
    //     this.tip2 = true;
    //   }
    // },
    // showTip3() {
    //   if (this.tip3) {
    //     this.tip3 = false;
    //   } else {
    //     this.tip3 = true;
    //   }
    // },
    // showTip4() {
    //   if (this.tip4) {
    //     this.tip4 = false;
    //   } else {
    //     this.tip4 = true;
    //   }
    // },
    // showTip5() {
    //   if (this.tip5) {
    //     this.tip5 = false;
    //   } else {
    //     this.tip5 = true;
    //   }
    // },
    // 项目类型选择
    getType(val, name) {
      let buildList = [];
      let len = 0;
      // 当选中时 则异步加载数据
      if (this.buildingTypeList[name] === undefined) {
        //选中
        let param = "building_type_" + val; //val ==== item.id
        this.api.buildingType(param).then(res => {
          // 查询建筑类型下面的子类型
          this.$set(this.buildingTypeList, name, res.data); //map[{key:居住建筑； value：所有子类型}]
          for (let key in this.buildingTypeList) {
            let build_item = {};
            build_item.name = this.buildingTypeList[key];
            build_item.key = key;
            buildList.unshift(build_item);
          }
          this.buildList = buildList;
        });
        this.parentidList.push(val); //list=>建筑类型id
        this.selectedProjectType.push(name);
        if (this.selectedProjectType.indexOf("其他") != -1) {
          this.addError = "请单击自行填写功能，填写具体能内容和规模。";
        }
      } else {
        this.parentidList.splice(this.parentidList.indexOf(val), 1); //删除当前选中
        this.selectedProjectType.splice(
          this.selectedProjectType.indexOf(name),
          1
        );
        if (this.selectedProjectType.indexOf("其他") == -1) {
          this.addError = "";
        }
        for (let i = 0; i < this.detailList.length; i++) {
          if (name === this.detailList[i].parent) {
            len = this.selectedBuildType.indexOf(
              this.detailList[i].buildDetail
            );
            this.detailList.splice(i, 1); //删除对应项目类型的所有子类型
            this.selectedBuildType.splice(len, 1);
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
    //查建筑类型
    getDict() {
      this.api.buildingType("building_type").then(res => {
        this.projectTypeList = res.data;
      });
    },
    // 计算设计费预算
    getMoney(formLabelAlign) {
      let idList = [];
      let buildSize_arr = [];
      // this.formLabelAlign.buildSize = [];
      this.detailList.map(item => {
        // this.formLabelAlign.buildSize.push(item.buildSize);
        buildSize_arr.push(item.buildSize);
        idList.push(item.id);
      });
      let params = {
        modelId: this.parentidList.toString(),
        buildId: idList.toString(),
        buildSize: buildSize_arr.toString(),
        incircleRecomNum: this.formLabelAlign.designerNum
      };
      let flag = this.formLabelAlign.collectProgramType !== 3 ? "0" : "1";
      params.incircleRecomNum =
        this.formLabelAlign.collectProgramType !== 3
          ? this.formLabelAlign.incircleRecomNum
          : this.formLabelAlign.designerNum;
      this.api.estimateMoney(flag, params).then(res => {
        this.estimateMoney = res.data;
        if (
          this.formLabelAlign.designFeeBudget / this.estimateMoney < 0.9 &&
          this.$route.path === "/CommissionedDesign"
        ) {
          this.centerDialogVisible = true;
          this.disabled = false;
          return;
        } else {
          this.dialogObj.dialogshow = !this.dialogObj.dialogshow;
        }
      });
    },
    //调整预算
    goOn() {
      this.cheap = !this.cheap;
      this.centerDialogVisible = false;
    },
    //提交
    submit(formName) {
      this.save();
    },
    save() {
      let buildDetail = [];
      let buildSize = [];
      let projectType = [];
      this.disabled = true;
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
      for (let i = 0; i < this.fileList.length; i++) {
        this.formLabelAlign.orgfileName = this.fileList[i].fileName; //文件yuan名称
        this.formLabelAlign.filePath = this.fileList[i].file; // 文件名
      }
      this.formLabelAlign.buildType = buildDetail.join("&"); //项目包含的功能内容
      this.formLabelAlign.buildSize = buildSize.join("&"); // 项目包含的功能规模
      this.formLabelAlign.buildDetail = buildDetail.join("&"); //项目包含的功能内容
      this.formLabelAlign.projectType = projectType.join("&"); //项目类别
      this.formLabelAlign.valueAddArr = this.formLabelAlign.valueAddArr.toString();
      this.formLabelAlign.ydModel = this.formLabelAlign.ydModel; //用地规模
      this.formLabelAlign.arcModel = this.formLabelAlign.arcModel; //建筑规模
      this.formLabelAlign.source = this.formLabelAlign.source;
      this.formLabelAlign.designFeeBudget = this.formLabelAlign.designFeeBudget; //预算
      this.formLabelAlign.beginTime = this.formLabelAlign.beginTime; //开始时间
      this.formLabelAlign.endTime = this.formLabelAlign.endTime; //结束时间

      let params = this.formLabelAlign;
      this.isDisabled = true;
      this.api.savePublicSolicition(params).then(res => {
        this.$message(res.msg);
        if (res.code === 0) {
          this.disabled = false;
          this.isDisabled = false;
          this.$router.push({
            path: "/ProcurementPlan",
            query: {
              bossId: res.data.bossId,
              id: res.data.id,
              tag: res.data.tagName
            }
          });
        }
        this.isDisabled = false;
      });
    },
    //四种模式了解流程查看
    godetail(val) {
      const { href } = this.$router.resolve({
        path: val
      });
      window.open(href, "_blank");
    },
    //最后确认
    endConfirm() {
      let checkFormResault = this.checkForm();
      if (checkFormResault) {
        if (
          this.formLabelAlign.designFeeBudget ||
          this.formLabelAlign.designFeeBudget > 0
        ) {
          this.getMoney();
        } else {
          this.dialogObj.dialogshow = !this.dialogObj.dialogshow;
        }
        return;
      } else {
        this.$message("项目信息输入有误");
      }
    },
    //最后取消确认
    dialogCancal() {
      this.dialogObj.dialogshow = !this.dialogObj.dialogshow;
    },
    //弹框提示
    dialogConfirm() {
      this.save();
    }
  },
  mounted() {
    this.getDict();
    this.getAllToBePaidList();
    this.$store.commit("setNavScroll", true);
  }
};
</script>
<style lang='less' scoped>
.tip-error{
  color: red;
}
.CommissionedDesign {
  font-size: 0.875rem;
  overflow: hidden;
  text-align: left;
  margin-top: 3.75rem;
  .commissionedDesign-con{
    color: #666;
  }
}
.handleTip {
  cursor: pointer;
  font-size: 0.875rem;
  color: #4699ff;
  margin: 3rem 0.5rem 2rem 0.5rem;
}

.info-pb {
  margin-bottom: 1.375rem;
}
// .info-pb input {
//   border-color: #f5f7fa !important;
//   background: #f5f7fa !important;
//   color: #c0c4cc;
// }

.date-box{
  width: 100%;
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
.addValueService{
  line-height:3.125rem;
  padding-left:0.725rem;
  padding-right:0.725rem;
  color:#666;
  cursor: pointer;
}
.addValueService:hover{
  background: #f2f2f2;
  color: #4285f4;
}
</style>
<style lang="less">
.CommissionedDesign {
  .datepickbox{
    height:3.125rem;
    input{
      height:100%;
      width: 100%;
      border: 1px solid #dadce0 !important;
      box-shadow: none !important;
    }
  }
  // .form-check-input[type="checkbox"] + label {
  //   height: auto;
  // }
  .day:not(.unavailable):hover {
    cursor: pointer;
    color: #000;
    font-weight: 500;
    background-color: #eee;
    border-radius: 50%;
  }
  .check-required .mr-5 {
    margin-right: 0 !important;
  }
}
</style>
