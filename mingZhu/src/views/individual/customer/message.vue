<template>
  <div class="customerMessageManage">
    <mdb-container>
      <mdb-row>
        <mdb-col md="2" class="px-0">
          <mdb-tab pills color="primary" vertical>
            <mdb-tab-item
              :active="verticalWithin==index"
              @click.native.prevent="tabItem(item.mailType,index,item.title)"
              v-for="(item,index) in tabs"
              :key="index"
            >{{item.title}}</mdb-tab-item>
          </mdb-tab>
        </mdb-col>
        <mdb-col md="10">
            <mdb-tbl>
                <mdb-tbl>
                  <mdb-tbl-head>
                    <tr>
                      <th v-if="verticalWithin==0||verticalWithin==1">项目名称</th>
                      <th>标题</th>
                      <th>内容</th>
                      <th>创建时间</th>
                      <th>操作</th>
                    </tr>
                  </mdb-tbl-head>
                  <mdb-tbl-body>
                    <tr  v-for="(item,index) in personalNotify" :key="index">
                      <td v-if="verticalWithin==0||verticalWithin==1">{{item.projectName}}</td>
                      <td>{{item.title}}</td>
                      <td>{{item.content}}</td>
                      <td>{{item.createTime}}</td>
                      <td style="white-space: nowrap;">
                        <span @click="setContact(item)" style="margin-right:0.5rem;" class="view"><mdb-icon far icon="eye" /><span>查看</span></span>
                        <span class="delete" @click.stop="deleteInfo(item.id)"><mdb-icon far icon="trash-alt"/><span>删除</span></span>
                      </td>
                    </tr>
                  </mdb-tbl-body>
                </mdb-tbl>
                <pagination :total="totalCount" :pageSize="pageSize" @changePage="handleCurrentChange" v-if="totalCount !=0"></pagination>
          </mdb-tbl>
        </mdb-col>
      </mdb-row>
    </mdb-container>

    <DialogBox :dialogObj="dialogObj" @dialogConfirm="dialogConfirm" @dialogCancal="dialogCancal"></DialogBox>
    <layerProblem ref="layPro" :message-notify='messageNotify' :layer-title='layerTitle' :message-type='1'></layerProblem>
  </div>
</template>

<script>
import DialogBox from "@/components/dialog.vue";
import layerProblem from "@/components/layerProblem.vue";
  export default {
      name: 'accountInfo',
      components: { 
        layerProblem,
        DialogBox
       },
      data() {
        return {
          dialogObj: {
            //弹框
            titleCon: "提示",
            dialogCon: "确认删除吗",
            dialogshow: false,
            dialogBtnname: "确定"
          },
          tabs: [
            {
              name:'',
              title:'项目信息',
              mailType:1
            },
            {
              name:'',
              title:'答疑信息',
              mailType:2
            },
            {
              name:'',
              title:'收到关注',
              mailType:3
            },
            {
              name:'',
              title:'系统信息',
              mailType:5
            }],
          pillsActive: 0,
          verticalWithin: 0,

          mailType:1,
          personalNotify:[],

          currentPage:1,
          page:1,
          pageSize:10,
          totalCount:0,
          contacts: false,
          messageNotify:{},
          layerTitle:'项目信息',
        }
      },
      mounted(){
        this.getPersonalNotify()
      },
      methods:{
        getPersonalNotify(){
          this.personalNotify = [];
          let params = {
            mailType:this.mailType,
            page:this.currentPage,
            pageSize:this.pageSize,
          };
          if(this.mailType == 2){
            this.api.getAnswerNotifyList(params).then(res=>{
              this.totalCount= res.total
              this.personalNotify = res.data
              this.messageNotify = res.data[0]
            });
            return;
          }
          this.api.getPersonalNotify(params).then(res=>{
            if(res.data.length>0){
              this.totalCount= res.total
              this.personalNotify = res.data
              this.messageNotify = res.data[0]
            }
          });
        },
        tabItem(mailType,index,title){
          this.layerTitle = title
          this.page = 1
          this.currentPage = 1
          this.verticalWithin = index
          this.mailType = mailType
          this.getPersonalNotify()
        },
         //分页
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
            this.getPersonalNotify()
        },
        viewInfo(id){
          this.api.viewNotify(id).then(res=>{
            if(res.code==0){
              this.viewNotify = res.data;
            }
          })
        },
        deleteInfo(id){
          this.dialogObj.dialogshow = !this.dialogObj.dialogshow;
          this.currentId = id
        },
         dialogCancal() {
            this.dialogObj.dialogshow = !this.dialogObj.dialogshow;
        },
        //弹框提示
        dialogConfirm() {
          this.api.removeNotify({id:this.currentId}).then(res=>{
            if(res.code==0){
              this.dialogObj.dialogshow = false
              this.getPersonalNotify()
            }
          })
        },
        //显示查看问题弹层
        setContact(notify){
          this.messageNotify = {};
          this.api.returnNewsId({id:notify.id}).then(res=>{
          })
          this.messageNotify = notify;
          this.$refs.layPro.contact = true;
        }
      }
  }
</script>

<style scoped>
.view,.delete{
 cursor: pointer;
}
.view:hover,.delete:hover{
 color:#4285f4;
}
</style>
<!-- ui样式覆盖 --> 
<style lang="less">
  .customerMessageManage{
    // .leftTab{
    //   width: 196px;
    //   max-width: 196px;
    //   .md-pills li{
    //     margin-left: 18px;
    //     padding:8px 0;
    //   }
    //   .nav-link{
    //     width: 178px;
    //     font-size: 14px;
    //     height: 40px;
    //     line-height: 40px;
    //     padding: 0;
    //   }
    // }
  }
</style>