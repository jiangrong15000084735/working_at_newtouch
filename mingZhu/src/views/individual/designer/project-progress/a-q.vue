<template>
    <div class="a-q px-0 py-0 aQWrapper">
      <p class="aQTip">
        请在此提出您的疑问，若无疑问请点击
        <a @click.stop="jump()" class="px-0 py-0 cancelBtn">
          跳过
        </a> 
      </p>
      <!-- <mdb-btn color="primary" type="button" size="sm" @click.stop.native="jump()">跳过</mdb-btn> -->
      <!-- <div class="table-add float-right" @click="add">
      </div> -->
      <mdb-btn color="primary" class="table-add aQAdd" rounded @click="add">
        <span>
          <a class="py-1 px-0"><i class="fas fa-plus fa-2x" aria-hidden="true"></i></a>
        </span>
        <span>添加</span>
      </mdb-btn>
      <!-- <mdb-btn color="primary" size="sm" @click.native="add"><mdb-icon icon="add" class="mr-1" />新增</mdb-btn> -->
      <tbl class="tblWrapper text-center" v-show="indexNum!=1">
        <tbl-head>
          <tr>
            <th width="60">序号</th>
            <th width="100">提出时间</th>
            <th width="100">解决时间</th>
            <th width="100">提问文件</th>
            <th width="100">答疑文件</th>
            <th width="60">状态</th>
            <th width="60">操作</th>
          </tr>
        </tbl-head>
        <tbl-body>
          <tr class="tblTr" :class="index%2==0?'bgGray':''" v-for='(record, index) in records' :key="index">
            <td><span class="tblSpan">{{index+1}}</span></td>
            <td v-html="record.createTime.replace( /\ /g,'<br>')"></td>
            <td v-if="record.answer" v-html="record.answer.createTime.replace( /\ /g,'<br>')">
              <!-- {{record.answer.createTime}} -->
            </td>
            <td v-else>--</td>
            <td v-if="record.content">
              <mdb-btn class="clear-margin colorGray" tag="a" 
              style="margin: 0.375rem 0;display: inline-block;"
              role="button" outline="primary"
              :href= "origin+'/Mingzhu/common/sysFile/download/'+record.content+'/'+record.fileName" 
              size="sm" 
              :download='record.content'>附件下载</mdb-btn>
            </td>
            <td v-else>--</td>
            <td v-if="record.answer">
              <mdb-btn class="clear-margin colorGray" tag="a" 
              style="margin: 0.375rem 0;display: inline-block;"
              role="button" outline="primary"
              :href= "origin+'/Mingzhu/common/sysFile/download/'+record.answer.content+'/'+record.answer.fileName" 
              size="sm" 
              :download='record.answer.content'>附件下载</mdb-btn>
            </td>
            <td v-else>--</td>
            <td :class="'state'+record.state">{{recordState(record.state)}}</td>
            <td>
              <div class="delDiv" @click="deleteRecord(record)">
                删除
              </div>
              <!-- <mdb-btn color="primary" size="sm" style="white-space: nowrap;" @click.native="deleteRecord(record)">删除</mdb-btn> -->
            </td>
          </tr>
        </tbl-body>
      </tbl>
      <!-- <mdb-tbl class="table-wrapper" style="text-align:center;" bordered>
        <mdb-tbl-head>
          <tr>
            <th width="60">序号</th>
            <th width="100">提出时间</th>
            <th width="100">解决时间</th>
            <th width="100">提问文件</th>
            <th width="100">答疑文件</th>
            <th width="60">状态</th>
            <th width="60">操作</th>
          </tr>
        </mdb-tbl-head>
        <mdb-tbl-body v-if="records.length>0">
          <tr v-for='(record, index) in records' :key="index">
            <td>{{index + 1}}</td>
            <td>{{record.createTime}}</td>
            <td v-if="record.answer">
              {{record.answer.createTime}}
            </td>
            <td v-else></td>
            <td v-if="record.content">
              <mdb-btn class="clear-margin px-3" tag="a" 
              style="margin: 0.375rem 0;display: inline-block;"
              role="button" color="primary" 
              :href= "origin+'/Mingzhu/common/sysFile/download/'+record.content+'/'+record.fileName" 
              size="sm" 
              :download='record.content'>附件下载</mdb-btn>
            </td>
            <td v-else></td>
            <td v-if="record.answer">
              <mdb-btn class="clear-margin px-3" tag="a" 
              style="margin: 0.375rem 0;display: inline-block;"
              role="button" color="primary" 
              :href= "origin+'/Mingzhu/common/sysFile/download/'+record.answer.content+'/'+record.answer.fileName" 
              size="sm" 
              :download='record.answer.content'>附件下载</mdb-btn>
            </td>
            <td v-else></td>
            <td>{{recordState(record.state)}}</td>
            <td>
              <mdb-btn color="primary" size="sm" style="white-space: nowrap;" @click.native="deleteRecord(record)">删除</mdb-btn>
            </td>
          </tr>
        </mdb-tbl-body>
      </mdb-tbl> -->

      <mdb-modal centered class="quesModal" v-if="showModal15" @close="showModal15 = false">
        <mdb-modal-header class="quesHeader" :close="false">
          <mdb-modal-title>提问</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body style="padding:1rem 1.875rem;">
          <div>
            <!-- <mdb-input :disabled="isDetail" class="mb-0" label="标题" @change="changeTitle" v-model="submitParams.title"/> -->
            <div class="form-group mb-0 mt-3">
              <label>标题</label>
              <input type="text" 
              :disabled="isDetail"
              @change="changeTitle"
              v-model="submitParams.title"
              class="form-control mb-0">
            </div>
            <div class="invalid-feedback" v-if="hasTitle"> {{hasTitle}} </div>
            <!-- <mdb-input :disabled="isDetail" class="mb-0" label="描述" @change="changeDescription" v-model="submitParams.description"/> -->
            <div class="form-group mb-0 mt-3">
              <label>描述</label>
              <input type="text" 
              :disabled="isDetail"
              @change="changeDescription"
              v-model="submitParams.description"
              class="form-control mb-0">
            </div>
            <div class="invalid-feedback" v-if="hasDesctiption"> {{hasDesctiption}} </div>
            <!-- <mdb-textarea :disabled="isDetail" class="mb-0" label="问题详情" @change="changeDetail" v-model="submitParams.detail" :rows="5"/> -->
            <div class="form-group mb-0 mt-3">
                <label>问题详情</label>
                <textarea class="form-control mb-0" 
                :disabled="isDetail"
                @change="changeDetail"
                v-model="submitParams.detail"
                rows="5"></textarea>
              </div>
            <div class="invalid-feedback" v-if="hasDetail"> {{hasDetail}} </div>
            <div class="mt-3">上传文件</div>
            <el-upload
              ref="uploadDemo"
              v-show="!isDetail"
              class="upload-demo"
              :action="api.upload()"
              :on-success="upLoadCaseSuccess"
              :before-upload="beforeCaseUpload"
              :limit="1"
              :on-exceed="handleExceed"
              >
              <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
            <div v-show="isDetail">
              <div style="text-align:left;">文件</div>
              <!-- <a :href="origin+'/Mingzhu/common/sysFile/download/'+filePath"
              >{{filePath}}</a> -->
              <mdb-btn class="clear-margin" tag="a" 
              style="display:inline-block;"
              role="button" color="primary" 
              :href= "origin+'/Mingzhu/common/sysFile/download/'+filePath" 
              size="sm" 
              :download='filePath'>附件下载</mdb-btn>
            </div>
          </div>
        </mdb-modal-body>
        <mdb-modal-footer center style="border-top:0!important;background: #fafafa;">
          <!-- <mdb-btn color="primary" @click.native="showModal15 = false">取消</mdb-btn> -->
          <mdb-btn color="primary" class="my-0 btnWrapper" v-show="!isDetail" size="sm" @click.native="submitQuestion">提交疑问</mdb-btn>
          <a class="px-0 py-0 cancelBtn" @click="showModal15 = false">取消</a>
        </mdb-modal-footer>
      </mdb-modal>

      <!-- 确认信息 -->
      <!-- <mdb-modal v-if="modalShow" @close="modalShow = false">
        <mdb-modal-header>
          <mdb-modal-title>提示信息</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body> -->
      <mdb-modal centered class="quesModal" v-if="modalShow" @close="modalShow = false">
        <mdb-modal-header class="quesHeader" :close="false">
          <mdb-modal-title>提示信息</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body style="padding:1rem 1.875rem;text-align:center;">
          确实删除该答疑记录吗
        </mdb-modal-body>
        <mdb-modal-footer center style="border-top:0!important;background: #fafafa;">
          <!-- <mdb-btn color="primary" @click.native="modalShow = false">取消</mdb-btn> -->
          <mdb-btn color="primary" size="sm" class="my-0 btnWrapper" @click="confirmDelete">确定</mdb-btn>
          <a class="px-0 py-0 cancelBtn" @click="modalShow = false">取消</a>
        </mdb-modal-footer>
      </mdb-modal>

    </div>
</template>

<script>
  // import { mdbTableEditor } from 'mdb-table-editor'
  export default {
    props:["indexNum"],
    name: 'a-q',
    /*components: {
      mdbTableEditor
    },*/
    data () {
      return {
        showModal15: false,
        modalShow: false,
        submitParams: {
          "title":"",
          "filename":"",
          "projectid":parseInt(this.$route.query.id),
          "description": "",
          "detail":"",
          "OSSFileName":"",
          "srcFileName":""
        },
        filePath: '',
        records: [],
        isDetail: false,
        deleteId: '',
        origin : location.origin,
        hasTitle: "",
        hasDesctiption: "",
        hasDetail: ""
      }
    },
    computed:{
      recordState() {
        return function (state) {
          let type = ""
          if(state==2){
            type = "已解答"
          }else{
            type = "已提交"
          }
          // switch (state) {
          //   case "1":
          //     type = "已提交"
          //     break;
          //   case "2":
          //     type = "已解答"
          //     break;
          // case "3":
          //   type = "已解答";
          //   break;
          //   default:
          //     break;
          // }
          return type
        }
      }
    },
    methods: {
      beforeCaseUpload(file) {
        const isLt5M = file.size / 1024 / 1024 < this.$isLt10M;
        if (!isLt5M) {
          this.$message.error(`上传文件大小不能超过 ${this.$isLt10M}MB!`);
        }
        return isLt5M;
      },
      handleExceed(files, fileList) {
        this.$message.error("只能上传一个文件");
        return
      },
      jump(){
        this.$emit("jumpToEnd")
      },
      upLoadCaseSuccess(res, file) {
        let fileName = res.msg;
        this.submitParams.srcFileName = file.name
        this.submitParams.OSSFileName = fileName
        this.api.getUrl({fileName: fileName}).then(res => {
        });
      },
      changeTitle(value){
        if(value){
          this.hasTitle = ""
        }
      },
      changeDescription(value){
        if(value){
          this.hasDesctiption = ""
        }
      },
      changeDetail(value){
        if(value){
          this.hasDetail = ""
        }
      },
      // 提问题
      submitQuestion() {
        if(!this.submitParams.title){
          this.hasTitle = "请输入此项"
          this.$message.error("请填写标题")
          return
        }
        if(!this.submitParams.description){
          this.hasDesctiption = "请输入此项"
          this.$message.error("请填写描述")
          return
        }
        if(!this.submitParams.detail){
          this.hasDetail = "请输入此项"
          this.$message.error("请填写问题详情")
          return
        }
        let params = {
          ...this.submitParams
        }
        this.api.submitQuestion(params).then(res => {
          this.$message(res.msg)
          this.questionList()
          this.showModal15 = false
        })
      },
      clearFrom(){
        this.hasTitle = ""
        this.hasDesctiption = ""
        this.hasDetail = ""
        this.submitParams.title = ""
        this.submitParams.description = ""
        this.submitParams.detail = ""
      },
      // 查询问题
      questionList() {
        this.api.getAnsewQuestion({projectid: this.$route.query.id}).then(res => {
          this.records = res.data
          this.$emit("queryBack",this.records)
        })
      },
      detailRecord(item) {
        this.clearFrom()
        this.api.getDesigerAnser({questionid: item.id}).then(res => {
          this.isDetail = true
          this.showModal15 = true
          this.submitParams.title = res.data.title
          this.submitParams.description = res.data.description
          this.submitParams.detail = res.data.detail
          this.filePath = res.data.content
        })
      },
      add () {
        this.showModal15 = true
        this.clearFrom()
        this.isDetail = false
      },
      updateRecord (record) {
        this.showModal15 = true
      },
      deleteRecord (record) {
        this.deleteId = record.id
        this.modalShow = true
      },
      confirmDelete () {
        this.api.deleteQuestion({questionid: this.deleteId}).then(res => {
          this.questionList()
          this.$message(res.msg);
          // 调用删除
          this.modalShow = false
        })
      }
    },
    mounted() {
      this.questionList()
    }
  }
</script>
<style lang="less" scoped>
.quesHeader{
  background: #3299BB !important;
  color: #fff;
  padding: 20px !important;
  font-weight: normal;
  font-size: 24px;
  h5{
    text-align: center;
    width: 100%;
  }
}
.btnWrapper{
  font-size: 12px!important;
  letter-spacing: 1px;
}
.cancelBtn{
  font-size: 12px;
  line-height:33px;
  letter-spacing: 1px;
  text-decoration: underline!important;
}
.cancelBtn:hover{
  text-decoration: none!important;
}
</style>

<style scoped lang="less">
.table-wrapper td{
  word-break: break-all;
  vertical-align:middle;
}
.invalid-feedback{
  text-align: left;
  display: block;
}
.aQWrapper{
  text-align:left;
  background:#fff;
  .aQTip{
    color:#999;
    font-size:14px;
    text-align:left;
    a{
      display:inline-block;
      line-height:15px;
      color:#4285F4;
    }
  }
  .aQAdd{
    width: 110px;
    height: 32px;
    padding: 0;
    line-height: 32px;
    text-align: center;
    margin:22px 0 28px;
    a{
      display:inline-block;
      padding: 0!important;
      i{
        font-size:14px!important;
      }
    }
  }
}

</style>
<style lang="less">
@media (min-width:576px){
  .quesModal .modal-dialog {
    max-width: 600px!important;
  }
}

.aQWrapper{
  /*表格*/
  .tblWrapper{
    width: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    margin-bottom: 38px;
    .table{
      margin: 0;
    }
    thead{
      tr{
        // box-shadow: 0 2px 5px 0 #d9d9d9, 0 2px 10px 0 #d9d9d9;
        height: 70px;
        th{
          font-size: 16px;
          color: #333;
          border: none;
          padding: 0;
          vertical-align: middle;
        }
      }
    }
    tbody{
      .tblTr{
        height: 70px;
        td{
          font-size: 14px;
          word-break: break-all;
          color: #999;
          border: none;
          vertical-align: middle;
          padding: 0;
        }
        .tblSpan{
          min-width: 24px;
          height: 24px;
          border-radius: 12px;
          text-align: center;
          line-height: 24px;
          display: inline-block;
          // background: #cac4ce;
          background: #b4d0ff;
          color:#fff;
        }
        // .tblSpan:hover{
        //   background: #b4d0ff;
        // }
        .colorGray{
          border-color: #666!important;
          border-width: 1px!important;
          color: #666!important;
          font-size: 14px;
          height: 30px;
          padding: 0;
          line-height: 30px;
          width: 86px;
          margin: 0!important;
          border-radius: 4px;
          white-space: nowrap;
        }
        .colorGray:hover{
          border-color: #4285f4!important;
          color: #4285f4!important;
        }
        .delDiv{
          color: #4285f4;
          font-size: 14px;
          cursor: pointer;
        }
        .delDiv:hover{
          text-decoration: underline;
        }
        .state1{
          color: #999;
        }
        .state2{
          color: #d92804;
        }
        .state3{
          color: #07d8ae;
        }
      }
      .bgGray{
        background: #f5f5f5;
        .tblSpan{
          background: #cac4ce;
        }
      }
    }
  }
}
</style>

