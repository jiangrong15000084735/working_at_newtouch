<template>
  <div class="p-body projPro" v-loading.fullscreenLoading="loading">
    <div class="body-detail">
      <div class="head-title">
        <h3>{{projectName}}</h3>
        <div @click="deleteBtn" class="backBtn"><img src="@/assets/images/backIcon.png"/>返回上一页</div>
      </div>
      <div class="step-wrapper">
        <mdb-row class="mx-0 boxDiv">
          <mdb-col class="aqLeft px-0">
            <mdb-stepper  style="background:#fff;" simpleV class="progress-stepper" :class="{origin: activeIndex === -1}">
              <li style="width:100%" :class="{stepOver:additionalFileList.length>0}" slot="simple">
                <a class="stepA"  @click="go(0)">
                  <span v-if="aQLnegth==0" class="circle">1</span>
                  <span v-else class="circle circleCheck">
                    <mdb-icon class="check" icon="check" />
                  </span>
                  <span class="label">{{steppers[0].title}}</span>
                </a>
                <div class="step-view step-content px-0 py-0" v-show="activeIndex==0">
                  <answerQuestion @queryBack="queryBack" @jumpToEnd="jumpToEnd"></answerQuestion>
                </div> 
              </li>

              <li style="width:100%" :class="{stepOver:extendFileList.length>0}" slot="simple">
                <a class="stepA"  @click="go(1)">
                  <span v-if="extendFileList.length==0" class="circle">2</span>
                  <span v-else class="circle circleCheck">
                    <mdb-icon class="check" icon="check" />
                  </span>
                  <span class="label">{{steppers[1].title}}</span>
                </a>
                <div class="step-view step-content px-0 py-0" style="text-align:left;" v-show="activeIndex==1">
                  <div v-if="extendFileList.length>0">
                    <div style="display:inline-block;" 
                      v-for="(item,index) in extendFileList"
                      :key="index">
                      <ImgCom  :fileName="item.fileName" :filePath="item.filePath"></ImgCom>
                    </div>
                  </div>
                  <div v-else class="nodata">
                    暂无数据
                  </div>
                </div> 
              </li>

              <li style="width:100%" slot="simple">
                <a class="stepA"  @click="go(2)">
                  <span v-if="additionalFileList.length==0" class="circle">3</span>
                  <span v-else class="circle circleCheck">
                    <mdb-icon class="check" icon="check" />
                  </span>
                  <span class="label">{{steppers[2].title}}</span>
                </a>
                <div class="step-view step-content manuContent" v-show="activeIndex==2">
                  <div>
                    <div class="process-detail pro-wrapper" style="text-align: left;" v-show="!upLoadManu">
                      <!-- <div class="detail-img"
                          v-for="item in additionalFileList"
                          :key="item.id">
                          <div class="detailImgItem">
                            <img src="@/assets/images/assinment-icon2.png">
                            <img class="imgDelete" @click="removeManuFile(item.id)" src="@/assets/images/imgDel.png"/>
                          </div>
                        <div class="img-name">
                          <div class="nameDiv">
                            {{item.name}}
                          </div>
                        </div>
                        <div class="download">
                          <a class="delDiv" :href="origin+'/Mingzhu/common/sysFile/download/'+item.path+'/'+item.name"
                            >下载</a>
                        </div>
                      </div> -->
                       <div style="display:inline-block;text-align:left;" 
                          v-for="item in additionalFileList"
                          :key="item.id">
                          <ImgCom  :fileName="item.name" :filePath="item.path" marginStr="0 26px 26px 0"></ImgCom>
                       </div>
                      <div 
                        v-if="additionalFileNum==0"
                        class="detail-img" 
                        style="width:100px;display:inline-block;float: none;" 
                        @click="openUpLoad">
                        <img src="@/assets/images/big-add.png">
                        <p class="delDiv paddingTop">上传成果</p>
                      </div>
                    </div>
                    <div v-show="upLoadManu">
                      <mdb-row>
                        <mdb-col md="3" class="mt-2">
                          选择上传成果的类型
                        </mdb-col>
                        <mdb-col md="3">
                          <mdb-select class="my-0" basic 
                          @getValue="getSelectVal"
                          :options="manuType" />
                        </mdb-col>
                        
                        <mdb-col md="5">
                          <div class="detail-img" style="display:inline-block;width:164px;"
                              v-if="fileName">
                            <img width="30" src="@/assets/images/assinment-icon2.png">
                            <div class="img-name">{{fileName}}</div>
                          </div>
                          <div class="detail-img" style="display:inline-block;">
                            <el-upload :action="api.upload()"
                                      :on-success="enclosureUploadSuccess"
                                      :before-upload="beforeAvatarUpload"
                                      :accept="accept"
                                      :on-error="uploadError"
                                      :show-file-list="false">
                              <img width="30" src="@/assets/images/big-add.png">
                              <div class="img-name delDiv">上传成果文件</div>
                            </el-upload>
                          </div>
                        </mdb-col>
                      </mdb-row>
                      <mdb-row>
                        <mdb-col md="12" class="my-1">
                          <mdb-btn color="primary" class="btn110_30" @click="cancel">确定</mdb-btn>
                          <mdb-btn color="primary" class="btnBack110_30" @click="upLoadManu=false">取消</mdb-btn>
                        </mdb-col>
                      </mdb-row>
                    </div>
                  </div>
                </div> 
              </li>
            </mdb-stepper>
            <!-- <mdb-row  style="background:#fff;margin:0;">
              <mdb-col md="12" class="py-3 px-5" style="text-align:left;">
                <div style="display:inline-block;" @click="openProject=!openProject">
                  <h3 class="h3-label" style="padding-left: 10px;">项目描述</h3>
                  <i class="fas fa-angle-down rotate-icon openIcon" :class="openProject?'open':''"></i>
                </div>
              </mdb-col>
              <mdb-col md="12" v-show="openProject" style="text-align:left;">
                <projectDetail :proId="id" :isShowBack="false"></projectDetail>
              </mdb-col>
            </mdb-row> -->
            <!-- <mdb-row style="background:#fff;margin:0;">
              <mdb-col md="12" class="py-3 px-5" style="text-align:left;">
                <div style="display:inline-block;" @click="openDownload = !openDownload">
                  <h3 class="h3-label"  style="padding-left: 10px;">设计任务书下载</h3>
                  <i class="fas fa-angle-down rotate-icon openIcon" :class="openDownload?'open':''"></i>
                </div>
              </mdb-col>
              <mdb-col md="12" v-show="openDownload" style="text-align:left;padding:0 5%;">
                <div class="process-detail pro-wrapper" v-if="taskFileList.length>0">
                  <div class="detail-img"
                      v-for="(item,index) in taskFileList"
                      :key="index">
                    <img src="@/assets/images/assinment-icon2.png">
                    <div class="img-name">{{item.orgfileName}}</div>
                    <div class="download">
                      <a :href="origin+'/Mingzhu/common/sysFile/download/'+item.filePath+'/'+item.orgfileName"
                        :download="item.name">下载</a>
                    </div>
                  </div>
                </div>
                <div style="text-align:center;" v-else>暂无设计任务书下载</div>
              </mdb-col>
            </mdb-row> -->
          </mdb-col>
          <mdb-col class="progress-wrapper">
            <div class="text-left">
             <h3 
             class="rightTip"
             style="padding-top:0;"
             >答疑进度</h3>
            </div>
            <mdb-col class="text-center cirqueWrapper">
              <div class="cirqueBox" id="cirqueBox">
              </div>
              <div class="cirqueTip">
                <div class="cirqueNum">
                  {{resoleQueObj.resolvedQuestion}}/{{resoleQueObj.question}}
                </div>
                <!-- <div style="font-size:12px;line-height:16px;color:#777;">
                  答疑进度
                </div> -->
              </div>
            </mdb-col>
            <div class="text-left">
             <h3 
             class="rightTip"
             >项目进程</h3>
            </div>
            <div class="range-wrapper">
              <mdb-progress class="range-pro" :class="projectStep<10?'colorBlack':''" :height="30" :value="projectStep">{{projectStep}}%</mdb-progress>
              <input type="range" @mouseup="mouseupSave" v-model="rangeNum" class="range-input" min="0" max="100">
              <div class="tip-wrapper animated fadeIn" :style="{ left:projectStep/2 + '%' }">
                <div class="tip-title">
                  项目完成{{projectStep}}%
                </div>
                <div class="tip-arrow">
                </div>
              </div>
            </div>
            <div class="time-rang-wrapper">
              <mdb-progress class="range-pro" :class="timePrent<10?'colorBlack':''" :height="30" :value="timePrent" color="blue">{{timePrent}}%</mdb-progress>
              <div class="tip-wrapper animated fadeIn" :style="{ left:timePrent/2 + '%' }">
                <div class="tip-title">
                  时间完成{{timePrent}}%
                </div>
                <div class="tip-arrow">
                </div>
              </div>
            </div>
            <mdb-row class="text-left">
              <mdb-col md="6">
                <div style="
                text-transform: uppercase;
                color: #999;
                letter-spacing: 1px;
                font-size: 12px;
                margin: 1px 0 0;
                line-height: 16px;">
                开始时间</div>
                <div style="font-size: 12px;color: #999;">
                  {{beginTime | formatDate}}
                </div>
                </mdb-col>
              <mdb-col md="6">
                <div style="
                text-transform: uppercase;
                color: #999;
                letter-spacing: 1px;
                font-size: 12px;
                margin: 1px 0 0;
                line-height: 16px;">
                结束时间</div>
                <div style="font-size: 12px;color: #999;">
                  {{endTime | formatDate}}
                </div>
                </mdb-col>
            </mdb-row>
            <div class="text-left">
             <h3 
             class="rightTip"
             >项目描述</h3>
            </div>
            <mdb-col class="px-0">
              <projectDetail :proId="id" :isShowBack="false"></projectDetail>
            </mdb-col>
            <div class="text-left">
             <h3 
             class="rightTip"
             >设计任务书下载</h3>
            </div>
            <mdb-col md="12" v-show="openDownload" style="text-align:left;padding:0;">
              <div class="process-detail pro-wrapper" v-if="taskFileList.length>0">
                <!-- <div class="detail-img"
                    style="margin-top:0;margin-bottom:26px;"
                    v-for="(item,index) in taskFileList"
                    :key="index">
                  <img src="@/assets/images/assinment-icon2.png">
                  <div class="img-name">
                    <div class="nameDiv">
                 ]     {{item.orgfileName}}
                    </div>
                  </div>

                  <div class="download">
                    <a class="delDiv" :href="origin+'/Mingzhu/common/sysFile/download/'+item.filePath+'/'+item.orgfileName"
                      :download="item.name">下载</a>
                  </div>
                </div> -->
                <div style="display:inline-block;text-align:left;" 
                    v-for="(item,index) in taskFileList"
                    :key="index">
                    <ImgCom  :fileName="item.orgfileName" :filePath="item.filePath" marginStr="0 10px 35px 0"></ImgCom>
                </div>
              </div>
              <div style="text-align:center;" v-else>暂无设计任务书下载</div>
            </mdb-col>
          </mdb-col>
        </mdb-row>
      </div>
    </div>
    <mdb-modal v-if="isConformSubmit" @close="isConformSubmit = false" class="text-center" info>
      <mdb-modal-header center :close="false">
        <p class="heading">提示</p>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-icon icon="bell" size="4x" class="animated rotateIn mb-4"/>
        <p>{{tipCon}}</p>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn color="primary" @click="upLodeachievemen" tag="a" >确认</mdb-btn>
        <mdb-btn outline="primary" @click="cancel">取消</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>
<script>
import answerQuestion from "../project-progress/a-q";
import projectDetail from  "@/components/projDetail/projDetailUserProgress"
import nameLenTip from  "@/components/nameLenTip"
import ImgCom from "@/components/imgCom"
export default {
  data() {
    return {
      additionalFileNum:0,
      tipCon:"",
      accept:".rar,.zip",
      isConformSubmit:false,
      manuType:[
        // { text: '中间成果', value: '1', selected: true },
        { text: '最终成果', value: '2', selected: true}
      ],
      id: this.$route.query.id,
      upLoadManu: false,
      steppers: [{
        title: '答疑',
        path: '/a-q'
      },
      {
        title: '补充文件',
        path: '/a-q'
      },
      {
        title: '成果上传',
        path: '/c-result'
      }],
      activeIndex: 0,
      projectName:'',
      beginTime: '',
      endTime: '',
      timePrent: 0,
      additionalFileList: [],
      taskFileList: [],
      rangeNum: 0,
      projectStep: 0,
      openProject: true,
      openDownload: true,
      type:1,
      file: '', // 上传成果的文件
      fileAdress: '',
      fileName: '', // 文件名称
      userId:"",
      resoleQueObj:{
        question:0,
        resolvedQuestion:0
      },
      collectProgramType:'',
      loading:false,
      aQLnegth:0,
      extendFileList: [] // 补充文件
    };
  },
  filters:{
    formatDate:function(val){
      if(val && val.length>0){
        return val.split(" ")[0]
      } else {
        return ""
      }
      
    }
  },
  components: {
    answerQuestion,
    projectDetail,
    nameLenTip,
    ImgCom
  },
  computed: {
    // projectStep() {
    //   return parseInt(((this.$route.query.step - 1) / 13 * 100).toFixed(1))
    // }
  },
  created() {
    this.origin = location.origin;
  },
  methods: {
    cancel(){
      this.isConformSubmit = !this.isConformSubmit;
      if(this.isConformSubmit){
        if(this.type==2){
          this.tipCon = "最终成果仅可上传一次，请确认无误后再上传文件"
        }else if(this.type==1){
          this.tipCon = "是否确认上传？"
        }
      }
    },
    drawLine() {
      let params = {
        projectId: this.$route.query.id,
        userId:this.userId
      }
      this.api.qryCurrentUserResolvedQuestion(params).then( res => {
        this.resoleQueObj = res.data
        let resolveQue = 0
        let UnResolveQue = 1
        if(res.data){
          resolveQue = res.data.question>0? res.data.resolvedQuestion/res.data.question:0
          UnResolveQue = UnResolveQue - resolveQue
        }
        let myChart = this.$echarts.init(document.getElementById('cirqueBox'))
        let option = {
          series: [
            {
              name:'答疑',
              type:'pie',
              radius: ['100%', '85%'],
              hoverAnimation:false,
              color:['#07d8ae', '#6886ff'],
              label: {
                normal: {
                    show: false,
                },
              },
              labelLine: {
                  normal: {
                      show: false
                  }
              },
              data:[
                  {value:resolveQue, name:''},
                  {value:UnResolveQue, name:''}
              ]
            }
          ]
        };
        myChart.setOption(option)
      })
    },
    deleteBtn() {
      this.$router.go(-1)
    },
    jumpToEnd() {
      this.activeIndex = 1
    },
    queryBack(data){
      this.aQLnegth = data.length
    },
    go (index) {
      this.activeIndex = index
    },
    getProject() {
      this.api.getProject({id:this.$route.query.id}).then(res => {
        this.projectName = res.data.projectName
        this.beginTime = res.data.beginTime
        this.endTime = res.data.endTime
        let begT = new Date(this.beginTime).getTime()
        let endT = new Date(this.endTime).getTime()
        let nowT = new Date().getTime()
        if(begT&&endT){
          if(nowT<begT){
            this.timePrent = 0
          }else if(nowT > endT){
            this.timePrent = 100
          }else{
            this.timePrent =parseInt(((nowT-begT) / (endT - begT) *100).toFixed(1))
          }
        }
        if(this.timePrent>100){
          this.timePrent = 100
        }
      })
    },
    getSelectVal(val){
      this.type = val
    },
    // 上传前验证
    beforeAvatarUpload (file) {
      this.loading = true
      // this.fileName = file.name
      var testmsg = file.name.substring(file.name.lastIndexOf('.')+1).toLowerCase();
      let accept = this.accept?this.accept.toLowerCase():"";
      let boole = false
      if(accept){
        boole = accept.includes(testmsg)
        if(!boole) {
          this.$message.error(`上传文件只能是${accept}格式!`);
        }
      }else{
        boole = true
      }
      const isLt2M = file.size / 1024 / 1024 < this.$isLt500M
      if (!isLt2M) {
        this.loading = false
        this.$message.error(`上传文件大小不能超过 ${this.$isLt500M}MB!`)
      }
      return boole&&isLt2M;
    },
    uploadError(err, file, fileList) {
      this.loading = false
      this.$message.error(err)
    },
    enclosureUploadSuccess (res, file) {
      this.loading = false
      this.file = res.msg
      this.fileName = file.name
      this.api
        .getUrl({
          fileName: this.file
        })
        .then(res => {
          if (res.code !== 0) {
            return
          }
          this.fileAdress = res.msg
        })
    },
    openUpLoad(){
      this.upLoadManu = true
      this.file = ''
      this.fileName = ''
      this.type = 1
      // 判读项目类型
      this.projectType()
    },
    // 确认上传
    upLodeachievemen () {
      if (this.file === '') {
        this.$message('请上传成果文件')
        return
      }
      const obj = {
        file: this.file,
        projectId: this.$route.query.id,
        type: this.type,
        name: this.fileName
      }
      this.api.manuscriptupload(obj).then(res => {
        if (res.code === 0) {
          this.activeIndex = 2
          this.finalResultList()
          this.upLoadManu = false
          // if(this.type==2){
          //   this.tipCon = "最终成果仅可上传一次，请确认无误后再上传文件"
          // }else if(this.type==1){
          //   this.tipCon = "是否确认上传？"
          // }
          // this.$router.push(`/doingAloneProject/${this.projectId}`)
        } else {
          this.$message(res.msg)
        }
        this.isConformSubmit=false;
      })
    },
    // 上传成果
    manuscriptupload(res, file) {
      this.api
        .manuscriptupload({
          file: res.msg,
          projectId: this.$route.query.id,
          type: 2,
          name: file.name
        })
        .then(res => {
          this.activeIndex = 2
          this.finalResultList()
        });
    },
    // 查询成果
    finalResultList() {
      this.additionalFileNum = 0
      this.api
        .getManuscriptList({
          projectId: this.$route.query.id,
          // designerId: localStorage.getItem("userId") || sessionStorage.getItem("userId")
        })
        .then(res => {
          this.additionalFileList = res.data
          for(let i=0;i<this.additionalFileList.length;i++){
            if(this.additionalFileList[i].type == "最终设计成果"){
              this.additionalFileNum +=1;
              return
            }
          }
        });
    },
    // 删除成果
    removeManuFile(id) {
      this.api
        .deletemanuscript({
          manuscripId: id
        })
        .then(res => {
          this.activeIndex = 2
          this.finalResultList()
          this.$message(res.msg)
        });
    },
    // 项目百分比保存
    mouseupSave() {
      this.api
        .updateCompletePct({
          projectId: this.$route.query.id,
          designerId: localStorage.getItem("userId") || sessionStorage.getItem("userId"),
          completePct: this.rangeNum
        })
        .then(res => {
          
        });
    },
    // 查询项目百分比
    queryPct() {
      this.api
        .seachCompletePct({
          projectId: this.$route.query.id,
          designerId: localStorage.getItem("userId") || sessionStorage.getItem("userId")
        })
        .then(res => {
          if(res.data.completePct){
            this.rangeNum = res.data.completePct
          }
        });
    },
    // 查询任务书
    seekTaskBaseInfo() {
      this.api.getRequiredTaskFileDesigner({projectId:this.$route.query.id}).then(res=>{
        this.taskFileList = res.data
      })
      // this.api.getTask({projectId:this.$route.query.id}).then(res => {
      //   // this.taskFileList = res.data.taskFileDOList.filter(item => item.type==="TaskFile")
      //   this.taskFileList = res.rows
      // })
    },
    projectType() {
      this.collectProgramType = this.$route.query.collectProgramType
      if(this.collectProgramType == 3){
        this.manuType = [
          { text: '中间成果', value: '1', selected: true },
          { text: '最终成果', value: '2' }
        ]
      }else{
        this.manuType = [
          { text: '最终成果', value: '2' , selected: true}
        ]
      }
    },
    // 补充文件
    getPrjExtendFileList() {
      this.api.getPrjExtendFileList({projectId:this.$route.query.id}).then(res => {
        this.extendFileList = res.data
      })
    }
  },
  mounted() {
    this.userId = sessionStorage.getItem("userId") | localStorage.getItem("userId")
    // 判读项目类型
    this.projectType()
    this.getProject()
    // 查询成果
    this.finalResultList()
    // 查询项目百分比
    this.queryPct()
    // 查询任务书
    this.seekTaskBaseInfo()
    this.drawLine()
    // 补充文件
    this.getPrjExtendFileList()
  },
  watch: {
    rangeNum(val) {
      this.projectStep = parseInt(val)
    }
  }
};
</script>
<style lang='less' scoped>
@media only screen and (min-width: 1600px) {
  .projPro{
    .body-detail {
      width: 1500px!important;
      // margin: 5.25rem 0 1.25rem !important;
      // .aqLeft{
      //   width: 1131px!important;
      //   max-width: 1131px!important;
      // }
    }
  }
}
.p-body.projPro {
  // background-color: #f5f5f5;
  overflow: hidden;
  text-align: center;
  .nodata{
    color: #999;
    font-size: 14px;
    margin-top: 30px;
    margin-bottom: 42px;
  }
  .body-detail {
    // background-color: #f1f2f7;
    overflow: hidden;
    // margin: 5.25rem 0 2.5rem;
    // padding: 2% 1.875rem;
    width: 1278px;
    margin: auto;
    .head-title {
      position: relative;
      margin: 84px 0 35px 0;
      text-align: left;
      border-bottom: 1px dotted #efefef;
      h3 {
        padding-bottom: 28px;
        font-size: 16px;
        color: #000000;
        font-weight:bold;
        display: inline-block;
      }
      .backBtn {
        cursor: pointer;
        color: #4285f4;
        font-size: 14px;
        display: inline-block;
        margin-left: 28px;
        img{
          vertical-align: middle;
          margin-right: 3px;
        }
      }
    }
  }
  .range-wrapper{
    position: relative;
    .range-input{
      position: absolute;
      top: 0;
      display: inline-block;
      width: 100%;
      height:30px;
      left: 0;
      opacity: 0;
      cursor: pointer;
    }
  }
  .range-pro{
    border-radius: 0!important;
    margin-bottom:10px;
  }
  .h3-label{
    font-weight: 600;
    cursor: pointer;
    display: inline-block;
    padding-right: 2rem;
  }
  .openIcon{
    transition:transform 0.5s linear;
  }
  .open{
    transform:rotate(180deg);
  }
  .download{
    .delDiv{
      display: inline-block;
    }
  }
  .delDiv{
    text-align: center;
    padding: 7px 0 26px!important;
    color: #4285f4;
    font-size: 14px;
    cursor: pointer;
  }
  .delDiv:hover{
    text-decoration: underline;
  }
  .paddingTop{
    padding-top: 13px!important;
  }
  .cirqueWrapper{
    position: relative;
    // display: inline-block;
    .cirqueBox{
      vertical-align:middle;
      margin: auto;
      width:90px;
      height:90px;
      display:inline-block;
    }
    .cirqueTip{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .cirqueNum{
        font-size:14px;
        color:#999;
        font-weight: normal;
      }
    }
  }
  .manuContent{
    // padding: 26px 26px 0 26px!important;
    padding: 0!important;
  }
  .pro-wrapper{
    .detail-img {
      cursor: pointer;
      margin: 0 5px 0 0px;
      width: 146px;
      /* display: inline-block; */
      float: left;
      text-align: center;
      position: relative;
      .img-name{
        font-size: 14px;
        color: #999;
        position: relative;
        .nameDiv{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .nameTip{
          display: none;
        }
      }
      .img-name:hover{
        .nameTip{
          display: inline;
        }
      }
    }
    .delete {
      cursor: pointer;
      position: absolute;
      top: -0.625rem;
      color: #ababab;
      right: -0.625rem;
      font-size: 1.8rem;
      font-weight: bold;
    }
    .img-name {
      cursor: pointer;
      font-size: 0.875rem;
    }
    .detailImgItem{
      display: inline-block;
      position: relative;
      .imgDelete{
        position: absolute;
        top: -10px;
        right: -15px;
      }
    }
    // .download{
    //   .delDiv{
    //     text-align: center;
    //     padding: 7px 0 26px!important;
    //     display: inline-block;
    //     color: #4285f4;
    //     font-size: 14px;
    //     cursor: pointer;
    //   }
    //   .delDiv:hover{
    //     text-decoration: underline;
    //   }
    // }
  }
  .range-wrapper:hover{
    .tip-wrapper{
      display:inline-block;
      margin-left: -45px;
    }
  }
  .time-rang-wrapper{
    position: relative;
  }
  .time-rang-wrapper:hover{
    .tip-wrapper{
      display:inline-block;
      margin-left: -45px;
    }
  }
  .tip-wrapper{
    display:none;
    top:-35px;
    position: absolute;
    margin-bottom: 5px;
    .tip-title{
      background:#000;
      color: #fff;
      padding:5px 10px;
      font-size: 12px;
    }
    .tip-arrow{
      position: absolute;
      bottom: -10px;
      left: 50%;
      margin-left: -2.5px;
      width: 0;
      height: 0;
      border-width: 5px;
      border-style: solid;
      border-color:#000 transparent transparent transparent;
    }
  }
}
</style>
<style lang="less">
// .projPro{

  .step-wrapper{
    .aqLeft{
      // width: 909px;
      // max-width: 909px;
      margin-right: 48px;
      flex: 1;
    }
    .boxDiv{
      display: flex;
    }
    .stepA{
      padding:0 0 5px 0;
      .circle{
        width: 30px;
        height: 30px;
        display: inline-block;
        text-align: center;
        line-height: 30px;
        margin-right: 15px;
        background: #4285f4;
      }
      .label{
        font-size: 16px;
        color: #333!important;
        font-weight: normal!important;
      }
    }
    .stepper-vertical li{
      min-height: 84px;
    }
    .stepper-vertical li:not(:last-child):after {
      height: 100%;
      top: 30px;
      left: 15px;
      width: 2px;
      height: calc(100% - 30px);
    }
    .stepper-vertical li.stepOver:after {
      background-color: #1fdbb6;
    }
    .circleCheck{
      background-color: #1fdbb6!important;
      color: #fff;
    }
    .stepper-vertical{
      .step-view{
        // padding-left: 45px!important;
        margin-left: 45px!important;
        box-sizing: border-box;
        width: calc(100% - 45px);
      }
    }
    .progress-stepper{
        padding-bottom: 0!important;
      .row{
        margin-top: 0!important;
      }
    }
    .stepper-vertical{
      margin-top: 0;
      margin-bottom: 0;
      padding-top: 0;
      padding-bottom: 0;
    }
  }
  .progress-wrapper{
    padding: 0;
    width: 318px;
    max-width: 318px;
    .rightTip{
      font-size:16px;
      color: #333333;
      padding:36px 0 18px;
      // font-weight: bold;
    }
    .progress-bar{
      height: 100%!important;
      background-color: #6886ff!important;
    }
    .md-progress{
      background-color: #f2f2f2!important;
    }
  }
  .time-rang-wrapper{
    .progress-bar{
      height: 100%!important;
      background-color: #07d8ae!important;
    }
    .md-progress{
      background-color: #f2f2f2!important;
    }
  }
  .colorBlack .progress-bar{
    color: #000;
  }
  .projPro{
   .dropdown-content li{
      min-height:2.1875rem !important;
    }
    .dropdown-content li::after{
      height: 0;
      display: none;
    }
  }
// }
 
</style>

