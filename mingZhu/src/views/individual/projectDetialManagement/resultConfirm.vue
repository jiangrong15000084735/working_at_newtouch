<template>
  <mdb-container class="px-0 result-confirm-warp">
    <mdb-stepper simpleV v-if="isviewShow==1">
      <li
        class="completed"
        :class="[item.status==2?'warning':'',item.status==3?'endstep':'']"
        slot="simple"
        v-for="(item , index) in requireSocking"
        :key="item.id"
        style="width:100%;box-sizing:border-box;"
      >
        <a @click="viewshow(item.id,item.componentName)">
          <span class="circle" v-if="item.status==3" style="background-color: #07D8AE !important;">
            <mdb-icon icon="check"/>
          </span>
          <span class="circle" v-if="item.status==2">
            <mdb-icon icon="exclamation-triangle"/>
          </span>
          <span class="circle" v-if="item.status==1">{{index+1}}</span>
          <span class="label">{{item.name}}</span>
        </a>
        <div
          class="step-content project-detial-body"
          v-if="currentId==item.id"
        >
          <component ref="view" v-bind:is="currentComponent" v-if="currentId==item.id" @switchPage="switchPage"></component>
          <mdb-btn class="btn110_40" color="primary" @click="stepSwitch(index,1)" v-if="(item.id==1&&confirmed!=1)||(item.id==2&&item.status!=3)">{{item.btnContent}}</mdb-btn>
          <mdb-btn :class="item.id!=3?'btnBack110_40':'btn110_40'" color="primary" @click="stepSwitch(index,-1)" v-if="item.id!=1&&item.status!=3">返回</mdb-btn>
        </div>
      </li>
    </mdb-stepper>
    <div class="downlod-warp" v-if="isviewShow==0">
      <mdb-row style="width:100%;">
        <mdb-col md="4" v-for="(item,index) in additionalFileList" :key="item.id">
          <mdb-card class="file-list">
          <mdb-card-body>
          <div class="folder">
              <img class="folder-img" src="@/assets/images/folder.png">
            </div>
            <div class="file-text">
              <span 
                class="file-name" 
                @mouseover="showCurrentDesigner=item.id" 
                @mouseout="showCurrentDesigner=-1">
                {{item.DesignerSerial}}●{{item.fileName}}
              </span>
              <a
              :href="`${origin}/Mingzhu/common/sysFile/download/${item.filePath}/${item.fileName}`"
              :download="item.fileName"
              class="download-img"><mdb-icon icon="download"/></a>
              <ViewDesigner v-if="showCurrentDesigner==item.id" :designerName="item.DesignerSerial" :fileName="item.fileName"></ViewDesigner>
            </div>
            <div class="confirm-btn">
              <!-- 2同意，3驳回，null -->
              <mdb-btn v-if="!item.state" color="primary" @click="confirm(item.designerId,item.id)">确认最终成果</mdb-btn>
              <span style="color:#4285f4;" v-if="item.state==2">已确认</span>
              <span style="color:red;" v-if="item.state==3">已驳回</span>
            </div>
             </mdb-card-body>
        </mdb-card>
        </mdb-col>
      </mdb-row>
    </div>
    <mdb-row class="text-center">
      <mdb-col col="12">
        <mdb-btn style="margin-right:5.625rem !important;" :disabled="status<7" class="btn212_60" color="primary" @click="next">下一步</mdb-btn>
        <mdb-btn class="btnBack212_60" color="primary" @click="pre">返回</mdb-btn>
      </mdb-col>
    </mdb-row>
    <mdb-modal v-if="modal" @close="modal = false" info>
      <mdb-modal-header center :close="false">
        <p class="heading">最终成果确认</p>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-row>
          <mdb-col col="6">
            <div class="form-check">
              <input 
              type="radio" 
              class="form-check-input" 
              name="radio2-1" 
              id="materialUnchecked2"
              v-model="isagree"
              value="1"
              @change="checkAgree"
              >
              <label class="form-check-label" for="materialUnchecked2">同意</label>
            </div>
          </mdb-col>
           <mdb-col col="6">
            <div class="form-check">
              <input type="radio" 
              class="form-check-input" 
              name="radio2-1" 
              id="materialUnchecked1"
              v-model="isagree"
              value="2"
              @change="checkAgree">
              <label class="form-check-label" for="materialUnchecked1">拒绝</label>
            </div>
          </mdb-col>
        </mdb-row>
        <div v-if="isagree==2">
         <el-upload
            class="upload-demo"
            :action="api.upload()"
            :on-success="manuscriptupload"
            :show-file-list="false">
            <el-button class="opption-button">上传反馈文件</el-button>
          </el-upload>
          <span v-if="fileName">{{fileName}}</span>
        </div>
        <div class="tip-error" v-if="agreeError">{{agreeError}}</div>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn color="primary" @click.native="agree">确认</mdb-btn>
        <mdb-btn outline="primary" @click.native="modal = false">取消</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </mdb-container>
</template>
<script>
import ViewDesigner from "@/views/individual/projectDetialManagement/components/viewDesigner.vue";
import EndFile from "@/views/individual/projectDetialManagement/components/endFile";
import ReviewAgenda from "@/views/individual/projectDetialManagement/resultConfirm/reviewAgenda"; //评审议程
// import ReviewLive from "@/views/individual/projectDetialManagement/resultConfirm/reviewLive"; //评审直播
import ZjResultConfirm from "@/views/individual/projectDetialManagement/resultConfirm/zjResultConfirm"; //征集结果确认
export default {
  name: "resultConfirm",
  components: { ReviewAgenda, ZjResultConfirm,EndFile,ViewDesigner },
  data() {
    return {
     
      showCurrentDesigner:-1,
      additionalFileList: [],
      isviewShow:null,
      confirmed:null,
      selectionMethod:null,
      processState:null,
      currentId: null,
      currentComponent: null,
      requireSocking: [
        {
            id: 1,
            name: "评审议程",
            status: 1,
            componentName: "ReviewAgenda",
            btnContent:"确认",
          },
       {
            id: 2,
            name: "评审直播",
            status: 1,
            componentName: "ReviewLive",
            btnContent:"查看直播",
          },
        {
          id: 3,
          name: "征集结果确认",
          status: 1,
          componentName: "ZjResultConfirm",
          btnContent:"下一步",
        }
      ],
      filePath:"",
      fileName:"",
      id:null,
      isagree:null,
      modal:false,
      origin: "",
      agreeError:null,
      status:null,
      livingStatus:null,
    };
  },
  methods: {
    switchPage(){
      this.getProjectStatus()
    },
    pre(){
      this.$emit("viewSwitch", 5);
    },
    next(){
      this.$emit("viewSwitch", 7);
    },
    getProjectStatus() {
      this.api.getProjectStatus({ id: this.$route.query.id }).then(res => {
        if (res.code == 0) {
          this.status = res.data.status
        }
      });
    },
    confirm(designerId,id){
      this.isagree=null
      this.designerId = designerId;
      this.id = id;
      this.modal = true;
    },
    checkAgree(){
      if(!this.isagree){
        this.agreeError = "请选择是否同意"
        return
      }else{
        this.agreeError = ""
      }
    },
    agree(){
       if(!this.isagree){
        this.agreeError = "请选择是否同意"
        return
      }else{
        if(this.isagree==1){
          this.filePath="";
          this.fileName="";
        }else if(this.isagree==2){
           if(!this.fileName&&!this.filePath){
              this.agreeError = "如果拒绝，请选择反馈文件。"
              return
            }
        }
        this.api.feedBackUpload({
          file: this.filePath,
          projectId: this.$route.query.id,
          type: 4,
          name: this.fileName,
          designerId: this.designerId,
          id:this.id
        })
        .then(res => {
          this.$message(res.msg)
          this.modal = false;
          this.qryLastResult();
        });
      }
    },
    manuscriptupload(res, file) {
      this.filePath=res.msg;
      this.fileName= file.name;
      if(this.fileName&&this.filePath){
        this.$message("操作成功。")
        this.agreeError=""
      }else{
        this.$message("上传文件失败。")
        this.agreeError = "如果拒绝，请选择反馈文件。"
      }
    },
    viewshow(id, component) {
      if(id==2&&this.confirmed!=1){
        this.$message("请确认评审议程。")
        return
      }
      if(id==3&&this.livingStatus!=3){
        this.$message("请等待直播完成。")
        return
      }
      if(this.currentId == id&&this.currentComponent==component){
        this.currentId = null;
        this.currentComponent = null;
      }else{
        this.currentId = id;
        this.currentComponent = component;
      }
    },
    // 生成随机数
    generateMixed(n) {
      var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
       'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
       'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
       '!', '@', '#', '$', '%', '^', '&', '*', '?'];
      var a = "";
      for (var i = 0; i < n; i++) {
        a += chars[Math.ceil(Math.random() * (chars.length - 1) )];
      }
      return a;
    },
    async stepSwitch(index, step) {
      if (index == 0 && step < 0) {
        // this.$emit("viewSwitch", 5);
      } else if (index == this.requireSocking.length - 1 && step > 0) {
        // this.$emit("viewSwitch", 7);
      } else if(index == 1&&step > 0){
        // let userInfo = this.$store.state.userInfo
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        let clientId = ''
        if (userInfo) {
          // 客户
          if (userInfo.bossSerial) clientId = userInfo.bossSerial
          // 设计师
          if (userInfo.designerSerial) clientId = userInfo.designerSerial
        }
        // client-798626
        // coolarch-674790
        let num1 = Math.floor(Math.random()*10000)>1000?Math.floor(Math.random()*10000):Math.floor(Math.random()*10000)+1000;
        let num2 = Math.floor(Math.random()*1000)>100?Math.floor(Math.random()*1000):Math.floor(Math.random()*1000)+100;
        clientId = this.generateMixed(9) + num1 + clientId.split('-')[1] + num2 + this.generateMixed(7)
        const { href } = this.$router.resolve({
          path: "/review",
          query: {
            id:this.$route.query.id,
            BDRCVFR: encodeURI(clientId),
            tuid: 'u2493175_0',
            client_ip: Date.parse(new Date())
          }
        });
        window.open(href, "_blank");
      }else {
        if(index == 0&&step > 0){
         this.api.updateAgedaStatus({
              projectId: this.$route.query.id
          }).then(res => {
            if (res.code == 0) {
              this.qryAgedaStatus(false)
            } else {
              this.$message(res.msg);
            }
          });
        }else{
          this.currentId = this.requireSocking[index + step].id;
          this.currentComponent = this.requireSocking[index + step].componentName;
        }
      }
    },
    qryLastResult() {
      this.api.qryLastResult({ projectId: this.$route.query.id }).then(res => {
        this.additionalFileList = res.data;
      });
    },
    getDesignerInterList() {
      //模拟请求数据
      this.api.manageInCircleDesignerList({ projectId: this.$route.query.id }).then(res => {
        this.selectionMethod = res.selectionMethod;
        this.processState = parseInt(res.processState);
      });
    },
    qryAgedaStatus(s){
      this.api.qryAgedaStatus({
        projectId:this.$route.query.id
      }).then(res=>{
        this.confirmed = res.data.confirmed;
        if(this.confirmed == 1){
          this.requireSocking[0].status = 3
        }
        this.livingStatus = res.data.livingStatus
        if(this.livingStatus == 3){
          this.requireSocking[1].status = 3
        }
        if(s){
          if(this.$route.query.step>=7){
            this.currentId = null;
            this.currentComponent = null;
          }else{
            // this.currentId = 1;
            // this.currentComponent = "ReviewAgenda";
            for(let k=0;k<this.requireSocking.length;k++){
              if(this.requireSocking[k].status!=3){
                this.currentId = this.requireSocking[k].id;
                this.currentComponent =this.requireSocking[k].componentName;
                break;
              }
            }
          }
        }else{
          this.currentId = 2;
          this.currentComponent = "ReviewLive";
        }
      })
    },
    init(){
      this.api.seekTaskBaseInfo(this.$route.query.id).then(res => {
        if(res.data.projectDO.collectProgramType!=3 ){
          this.isviewShow = 1
          if ((res.data.projectDO.processState>=11&&res.data.projectDO.processState!=14)||
              res.data.projectDO.processState==1) {
            this.requireSocking[2].status = 3;
          }
          this.qryAgedaStatus(true);
          this.getDesignerInterList();
        }else{
          this.isviewShow = 0;
          this.qryLastResult();
        }
      })
    }
  },
  created() {
    this.origin = location.origin;
    this.init();
    this.getProjectStatus();
  }
};
</script>
<style lang="less" scoped>
.result-confirm-warp {
  padding-bottom: 3.8125rem;
  .downlod-warp{
    padding: 3.8125rem 0;
    margin: 0 5.625rem;
  }
  .file-list{
    // width:14.375rem;
    height:12rem;
    padding-top: 1.5rem;
    margin-bottom: 2.75rem;
  }
  .folder{
    text-align: center;
    color: #333;
    margin-bottom:0.5rem;
    .folder-img{
      width:3.75rem;
      height:3.75rem
    }
  }
  .file-text{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .file-name{
    cursor: pointer;
    font-size: 0.875rem;
    color: #333;
    flex:1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis; 
    white-space:nowrap;
  }
  .download-img{
    display:inline-block;
    vertical-align: middle;
    width: 1rem;
    font-size: 1rem;
    margin-left: 14px;
    color:#d9d9d9;
    flex:0 0 auto;
  }
  .project-end-text{
    font-size: 0.875rem;
    color:#999;
  }
  .confirm-btn{
    text-align: center;
    padding-top: 1rem;
    button{
      width:6.875rem;
      height:1.875rem;
      padding:0;
      margin:0;
      font-size:0.875rem;
    }
  }
  .tip-error{
    color: red;
  }
}
</style>
<style lang="less">
.result-confirm-warp{
  .btn-primary.disabled, .btn-primary:disabled {
      color: #fff;
      background: #D9D9D9 !important;
      cursor: not-allowed !important;
  }
  .disabled, :disabled {
    cursor: not-allowed !important;
  }
  .btn-outline-primary {
    border: 2px solid #4285f4!important;
    background-color: transparent!important;
    color: #4285f4!important;
  }
}
</style>
