<template>
 <mdb-container class="px-0 designer-phase-warp text-center">
    <!-- 非委托 -->
    <div class="designer-doing"  v-if="!manuscriptList||manuscriptList.length<=0">
      <img src="@/assets/images/doing.png"/>
       <p>建筑师正在努力创作中...</p>
    </div>
    <!-- 委托 -->
    <div v-if="manuscriptList&&manuscriptList.length>0&&collectProgramType==3" class="downlod-warp">
      <mdb-row>
        <mdb-col v-for="item in manuscriptList" :key="item.id" md="4">
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
                {{item.seniorDesign==0?item.designerSerial:item.realName}}●{{item.fileName}}
              </span>
              <a
              :href="`${origin}/Mingzhu/common/sysFile/download/${item.filePath}/${item.fileName}`"
              :download="item.fileName"
              class="download-img"><mdb-icon icon="download"/></a>
              <ViewDesigner v-if="showCurrentDesigner==item.id" :designerName="item.seniorDesign==0?item.designerSerial:item.realName" :fileName="item.fileName"></ViewDesigner>
            </div>
            <div class="confirm-btn">
              <mdb-btn v-if="!item.state" color="primary" @click="confirm(item.designerId,item.id)">确认中间成果</mdb-btn>
              <span style="color:#4285f4;" v-if="item.state==2">已确认</span>
              <span style="color:red;" v-if="item.state==3">已驳回</span>
            </div>
          </mdb-card-body>
        </mdb-card>
        </mdb-col>
      </mdb-row>
    </div>
    <!-- 补充文件 -->
    <div style="margin:0 5.625rem 1.9375rem;" class="text-center">
      <UpLoad 
      :list="documentSubmissionList" 
      :isShow="disabled" 
      :saveProjectMoney="saveProjectMoney"
      :accept="accept"
      :btnName="'上传补充文件'"
      ></UpLoad>
    </div>
    <mdb-row class="text-center">
      <mdb-col col="12">
        <mdb-btn style="margin-right:5.625rem !important;" class="btn212_60" v-if="collectProgramType&&collectProgramType==3" color="primary" @click="next()">下一步</mdb-btn>
        <mdb-btn :class="collectProgramType&&collectProgramType!=3?'btn212_60':'btnBack212_60'" color="primary" @click="pre()">返回</mdb-btn>
      </mdb-col>
    </mdb-row>

     <mdb-modal v-if="modal" @close="modal = false" info>
      <mdb-modal-header center :close="false">
        <p class="heading">中期成果确认</p>
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
import UpLoad from "@/components/addFileUpload"
import ViewDesigner from "@/views/individual/projectDetialManagement/components/viewDesigner.vue";
export default {
  name: "designPhase",
  components:{ViewDesigner,UpLoad},
  data() {
    return {
      accept:".bmp,.zip, .rar",
      documentSubmissionList:[],
      showCurrentDesigner:-1,
      origin: "",
      designer: null,
      manuscriptList: [],
      modal:false,
      designerId:"",
      filePath:"",
      fileName:"",
      isagree:null,
      agreeError:"",
      id:null,
      collectProgramType:null,
      disabled:true,
      documentSubmissionEndData:""
    };
  },
  created() {
    this.origin = location.origin;
    this.getlist();
    this.seekTaskBaseInfo();
   
  },
  methods: {
    saveProjectMoney(file, fileList){
      // let fileObj = {
      //   name:fileList.name,
      //   url:file.msg
      // }
      this.api.updatePrjExtendFile({
        fileName:fileList.name,
        filePath:file.msg,
        projectId:this.$route.query.id
      }).then(res=>{
        if(res.code==0){
          this.getPrjExtendFile()
        }
      })
    },
    getPrjExtendFile(){
      this.documentSubmissionList =[];
      this.api.getPrjExtendFile({
         projectId:this.$route.query.id
      }).then(res=>{
        if(res.code==0){
          for(let i=0;i<res.data.length;i++){
            let fileObj={
              name:res.data[i].fileName,
              url:res.data[i].filePath
            }
            this.documentSubmissionList.push(fileObj);
            if(this.collectProgramType!=3){
              this.required();
            }
          }
        }
      })
    },
    seekTaskBaseInfo(){
      this.api.seekTaskBaseInfo(this.$route.query.id).then(res => {
        if( res.data.projectDO ){
          this.collectProgramType = res.data.projectDO.collectProgramType;
          this.getPrjExtendFile();
        }
      })
    },
    required(){
      this.api.required(this.$route.query.id).then(res => {
        if (res.code == 0) {
          let addFileEndDate = res.data.requiredDateDO.addFileEndDate?res.data.requiredDateDO.addFileEndDate.split(" ")[0]:"";
          let addFileEndTime = res.data.requiredDateDO.addFileEndTime?res.data.requiredDateDO.addFileEndTime:"";
          if(addFileEndDate&&addFileEndTime){
            this.documentSubmissionEndData = addFileEndDate +" "+addFileEndTime;
          }
          if(Number(new Date(this.documentSubmissionEndData))<=Number(new Date())){
            this.disabled = false
          }
        }
      })
    },
    next() {
      this.$emit("viewSwitch", 6);
    },
    pre() {
      this.$emit("viewSwitch", 4);
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
          type: 3,
          name: this.fileName,
          designerId: this.designerId,
          id:this.id
        })
        .then(res => {
          this.$message(res.msg)
          this.modal = false;
          this.getlist()
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
    getlist() {
      this.manuscriptList=[];
      this.api.getManuscript({
          projectId: this.$route.query.id
      }).then(res => {
          this.designer = res.designerList;
          for(let i=0;i<this.designer.length;i++){
            for(let j=0;j<this.designer[i].manuscriptDOS.length;j++){
              let item = {
                fileName:this.designer[i].manuscriptDOS[j].name,
                filePath:this.designer[i].manuscriptDOS[j].path,
                head:this.designer[i].head,
                realName:this.designer[i].realName,
                designerSerial:this.designer[i].designerSerial,
                seniorDesign:this.designer[i].seniorDesign,
                id:this.designer[i].manuscriptDOS[j].id,
                designerId:this.designer[i].id,
                state:this.designer[i].manuscriptDOS[j].state
              }
              this.manuscriptList.push(item)
            }
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.designer-phase-warp {
  padding-top: 3.8125rem;
  padding-bottom: 3.8125rem;
  .designer-doing{
    margin-bottom: 1.625rem;
    text-align: center;
    font-size: 0.875rem;
    color:#999;
    img{
      width:4.75rem;
      height: 4.75rem;
      margin-bottom: 0.75rem;
    }
  }
   .downlod-warp{
    margin:0 5.625rem 1.625rem;
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
    margin-left: 0.875rem;
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
    color:red;
  }
  .btn-outline-primary {
    border: 0.125rem solid #4285f4!important;
    background-color: transparent!important;
    color: #4285f4!important;
  }
}
</style>
