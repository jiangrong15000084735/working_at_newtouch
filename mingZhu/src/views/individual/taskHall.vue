<template>
    <mdb-container fluid class="taskHall" :class="{'isMobile': isMobile}">
      <mdb-row class="mdb-search pt-5">
        <mdb-col col="2"></mdb-col>
        <mdb-col col="6" class="px-0" style="padding-top:2rem">
          <div class="grid-content bg-purple searchBox">
            <i class="el-icon-search"></i>
            <input
              type="text"
              name="uname"
              placeholder="输入您想搜的内容"
              v-model="taskList.searchContent"
              onfocus="this.placeholder=''"
              onblur="this.placeholder='输入您想搜的内容' "
            >
          </div>
        </mdb-col>
        <mdb-col col="2">
          <div class="submit" @click="search()">搜索</div>
        </mdb-col>
        <mdb-col col="1"></mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col md="2"></mdb-col>
        <mdb-col md="10" class="mb-1"><span @click="resetCaseList()" style="color:#333;font-size:1.25rem;font-weight:600;">所有项目</span></mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col md="2">
          <div style="background: #fff;padding: 0;border:0.0625rem solid #dee2e6;border-bottom:none;margin-bottom:10rem;">
            <p class="cat mb-2">客户类型</p>
            <div class="left-filter pb-3" v-if="bossInfoList.length>0" >
              <div class="form-check pl-0" v-for="item in bossInfoList" :key="item.id">
                <input 
                  type="radio" 
                  class="form-check-input" 
                  :value="item.value" 
                  name="bossInfotype" 
                  :checked="taskList.bossInfo"
                  :id="`${item.text}`+1"
                  v-model="bossInfotype">
                  <label class="form-check-label" :for="`${item.text}`+1">{{item.text}}</label>
              </div>
            </div>
            <p class="cat mb-2">征集方式</p>
            <div class="left-filter pb-3" v-if="collectProgramTypeList.length>0">
              <div class="form-check pl-0" v-for="item in collectProgramTypeList" :key="item.id">
                <input 
                  type="radio" 
                  class="form-check-input" 
                  :value="item.value" 
                  name="collectProgramType" 
                  :checked="taskList.collectProgramType"
                  :id="`${item.text}`+2"
                  v-model="collectProgramType"
                  >
                  <label class="form-check-label" :for="`${item.text}`+2">{{item.text}}</label>
              </div>
            </div>
            <p class="cat mb-2">设计周期</p>
            <div class="left-filter pb-3" v-if="biddingCycleList.length>0">
              <div class="form-check pl-0" v-for="item in biddingCycleList" :key="item.id">
                  <input 
                    type="radio" 
                    class="form-check-input" 
                    :value="item.value" 
                    :checked="taskList.biddingCycle"
                    name="biddingCycle" 
                    :id="`${item.text}`+3"
                    v-model="biddingCycle">
                    <label class="form-check-label" :for="`${item.text}`+3">{{item.text}}</label>
                </div>
            </div>
            <p class="cat mb-2">设计深度</p>
            <div class="left-filter pb-3" v-if="collectDepthList.length>0">
              <div class="form-check pl-0" v-for="item in collectDepthList" :key="item.id">
                  <input 
                    type="radio" 
                    class="form-check-input" 
                    :value="item.value" 
                    name="collectDepth" 
                    :checked="taskList.collectDepth"
                    :id="`${item.text}`+4"
                    v-model="collectDepth">
                    <label class="form-check-label" :for="`${item.text}`+4">{{item.text}}</label>
                </div>
            </div>
            <p class="cat mb-2">状态</p>
            <div class="left-filter pb-3"  v-if="statusList.length>0">
              <div class="form-check pl-0" v-for="item in statusList" :key="item.id">
                  <input 
                    type="radio" 
                    class="form-check-input" 
                    :value="item.value" 
                    name="status" 
                    :checked="taskList.status"
                    :id="`${item.text}`+5"
                    v-model="taskStatus">
                    <label class="form-check-label" :for="`${item.text}`+5">{{item.text}}</label>
                </div>
            </div>
            <p class="cat">项目类别</p>
            <div class="left-filter">
              <mdb-container v-if="buildingTypeList.length>0" class="px-0">
                <mdb-select btnSavePlaceholder="确认" class="text-center" multiple :options="buildingTypeList" @getValue="handleGetValue1" />
                <label></label>
              </mdb-container>
            </div>
          </div>
        </mdb-col>
        <mdb-col md="10">
           <div class="table-wrapper">
              <mdb-tbl class="table table-hover mb-0">
                  <mdb-tbl-head>
                      <tr>
                        <th v-for="(item,index) in tableHeader" :key="item.id">
                          <span v-if="!item.isSort">{{item.name}}</span>
                          <a v-else @click="sortSearch('price','asc',index)">{{item.name}}
                              <!-- <i class="fas fa-sort ml-1" style="color:#d9d9d9;"></i> -->
                              <img src="@/assets/images/default-sort.png" v-if="!item.sort" class="ml-1 align-middle">
                              <img src="@/assets/images/desc.png" v-else-if="item.sort=='desc'" class="ml-1 align-middle">
                              <img src="@/assets/images/esc.png" v-else-if="item.sort=='asc'" class="ml-1 align-middle">
                          </a>
                        </th>
                      </tr>
                    </mdb-tbl-head>
                    <mdb-tbl-body>
                      <tr v-for="item in allList" :key="item.id" class="">
                          <td class="align-middle">
                            <p style="cursor: pointer;" @click="toProjectDetail(item.projectId)">{{item.projectName}}</p>
                            <p style="margin-top:0.3125rem;">
                              <span 
                                style="color:#fff;background:#85b0f8;padding:0.125rem 0.25rem; margin-right:0.3125rem;border-radius:0.1875rem;"
                                v-for="pt in item.projectType" 
                                :key="pt">{{pt}}</span>
                            </p>
                          </td>
                          <td class="align-middle">
                            <span style="cursor: pointer;color: #4285f4;position: relative;" @mouseover="qryCaculator(item.projectId)" @mouseout="qryCaculatorOut">
                              {{item.price}}
                              <DesignFree :list = "caculatorList" v-if="caculatorList&&currentId==item.projectId"></DesignFree>
                            </span>
                          </td>
                          <td class="align-middle">
                            <p>{{item.mode}}</p>
                          </td>
                          <td class="align-middle">
                            <p>{{item.publishDate | formatDate}}</p>
                          </td>
                          <td class="align-middle">
                            <p>{{item.signUpDuration}}</p>
                          </td>
                          <td class="align-middle">
                             <p>{{item.concernCount}}</p>
                          </td>
                          <td class="align-middle">
                            <p>{{item.participantsNum}}</p>
                          </td>
                           <td class="align-middle">
                            <span v-if="item.reportStatus=='未开始'"> {{item.reportStatus}}</span>
                            <span v-if="item.reportStatus=='报名中'" style="color:#ec830b;"> {{item.reportStatus}}</span>
                          </td> 
                          <td class="align-middle">
                            <p><mdb-btn size="sm" outline="primary" @click="watchUp(item.projectId,item.concernStatus,$event)">{{item.concernStatus | formatConern}}</mdb-btn></p>
                            <p><mdb-btn size="sm" outline="primary" @click="signUp(item.projectId)">{{item.designerReportStatus==1?"已报名":"报名"}}</mdb-btn></p>
                          </td>
                      </tr>
                  </mdb-tbl-body>
              </mdb-tbl>
          </div>
          <!-- 分页 -->
          <mdb-row v-if="totalCount !=0">
            <mdb-col md="12">
              <pagination :total="totalCount" :pageSize="pageSize" @changePage="handleCurrentChange" v-if="totalCount !=0"></pagination>
            </mdb-col>
          </mdb-row>
        </mdb-col>
      </mdb-row>
    </mdb-container>
</template>
<script>
import DesignFree from "@/components/designFree"
export default {
  components:{DesignFree},
  data () {
    return {
      biddingCycle:null, // 设计周期
      bossInfotype:null, // 客户类型
      collectProgramType:null, //征集方式
      taskStatus:null, // 任务状态
      collectDepth:null,//设计深度
      tableHeader:[{
        id:0,
        name:"项目名称",
        sort:"",
        isSort:false
      },{
        id:1,
        name:"设计费（元）",
        sort:"",
        isSort:true
      },{
        id:2,
        name:"征集方式",
        sort:"",
        isSort:false
      },{
        id:3,
        name:"发布时间",
        sort:"",
        isSort:true
      },{
        id:4,
        name:"设计周期",
        sort:"",
        isSort:true
      },{
        id:5,
        name:"关注",
        sort:"",
        isSort:false
      },{
        id:6,
        name:"参与",
        sort:"",
        isSort:false
      },{
        id:7,
        name:"状态",
        sort:"",
        isSort:false
      },{
        id:8,
        name:"操作",
        sort:"",
        isSort:false
      }],
      currentId:null,
      push:false,
      loading: "",
      clickIndex: -1,
      projectId: -1,
      buildingTypeList: [],
      collectProgramTypeList: [],
      biddingCycleList: [],
      bossInfoList: [],
      statusList: [],
      collectDepthList: [],
      taskList: {
        projectType: [], // 项目类别
        status: null, // 状态分类
        collectProgramType: null, // 征集方式
        biddingCycle: null, // 竞标周期
        bossInfo: null, // 客户类型
        collectDepth: null, // 任务深度
        searchContent: '',
        page: 1,
        pageSize: '',
        sort: '',
        order:''
      },
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      allList: [],
      sortMethods: [
        { text: '请选择',value:null,disabled: true,selected: true },
        { text: '奖金数量', value: '1' },
        { text: '竞标周期', value: '2' }
      ],
      caculatorList:null,
    }
  },
  filters:{
    formatDate (arg) {
      return arg && arg.split(' ')[0]
    },
    formatConern(status) {
      let concern = ''
      if(status == 0){
        return concern = '关注'
      }else{
        return concern = '取消关注'
      }
    }
  },
  watch:{
    biddingCycle(value){
      this.taskList.biddingCycle = value
      this.search()
    },
    bossInfotype(value){
      this.taskList.bossInfo = value
      this.search()
    },
    collectProgramType(value){
      this.taskList.collectProgramType = value
      this.search()
    },
    taskStatus(value){
      this.taskList.status = value
      this.search()
    },
    collectDepth(value){
      this.taskList.collectDepth = value
      this.search()
    }
  },
  methods: {
    sortSearch(value,order,index){
      this.taskList.sort = value;
      if(!this.taskList.order){
        this.taskList.order = "asc"
      }else if(this.taskList.order == "asc"){
        this.taskList.order = "desc"
      }else if(this.taskList.order == "desc"){
        this.taskList.order = "asc"
      }
      this.tableHeader[index].sort = this.taskList.order
      this.projectList1(this.taskList);
    },
    qryCaculatorOut(){
      this.currentId =null;
      this.caculatorList = null;
    },
    handleGetValue1 (value) {
      this.taskList.projectType = value
      // if(event && event.type == "click"){
        this.search()
      // }
    },
    // handleGetValue2 (value) {
      // this.taskList.collectProgramType = value
      // if(event && event.type == "click"){
      // this.search()
      // }
    // },
    // handleGetValue3 (value) {
      // this.taskList.status = value
      // if(event && event.type == "click"){
        // this.search()
      // }
    // },
    // handleGetValue4 (value) {
    //   this.taskList.biddingCycle = value
      // if(event && event.type == "click"){
        // this.search()
      // }
    // },
    // handleGetValue5 (value) {
      // this.taskList.bossInfo = value
      // if(event && event.type == "click"){
        // this.search()
      // }
    // },
    // handleGetValue6 (value) {
    //   this.taskList.collectDepth = value
      // if(event && event.type == "click"){
        // this.search()
      // }
    // },
    handleGetValue7 (value) {
      this.taskList.sort = value
      this.search()
    },
    toProjectDetail (id) {
      let rout = this.$router.resolve(`/projectDetail/${id}?type=1`)
      window.open(rout.href,'_blank')
    },
    getTypeList () {
      this.api.buildingType('building_type').then(res => {
        this.buildingTypeList = res.data
        this.hotTagList = res.data

        this.buildingTypeList.map(item => {
          item.text = item.name
          item.value = item.name
        })
        this.buildingTypeList.unshift({text:'不限',value:null,selected: true })
      })
      this.api.rebuildingType('collect_prog_type').then(res => {
        this.collectProgramTypeList = res.data
        this.collectProgramTypeList.map(item => {
          item.text = item.name
          item.value = item.name
        })
        this.collectProgramTypeList.unshift({text:'不限',value:null,checked: true })
      })
      this.api.buildingType('search_prj_state').then(res => {
        this.statusList = res.data
        this.statusList.map(item => {
          item.text = item.name
          item.value = item.name
        })
        this.statusList.unshift({text:'不限',value:null,checked: true })
      })
      this.api.buildingType('search_bid_circle').then(res => {
        this.biddingCycleList = res.data
        this.biddingCycleList.map(item => {
          item.text = item.name
          item.value = item.name
        })
        this.biddingCycleList.unshift({text:'不限',value:null,checked: true })
      })
      this.api.buildingType('search_col_depth').then(res => {
        this.collectDepthList = res.data
        this.collectDepthList.map(item => {
          item.text = item.name
          item.value = item.name
        })
        this.collectDepthList.unshift({text:'不限',value:null,checked: true })
      })
      //客户类型
      this.api.buildingType('search_emp_info').then(res => {
        this.bossInfoList = res.data
        this.bossInfoList.map(item => {
          item.text = item.name
          item.value = item.name
        })
        this.bossInfoList.unshift({text:'不限',value:null,checked: true })
      })
    },
    projectList1 (projectList) {
      this.loading = true;
      let params = {
        searchContent: projectList.searchContent,
        projectType: projectList.projectType.toString(),
        collectProgramType: projectList.collectProgramType,
        status: projectList.status,
        biddingCycle: projectList.biddingCycle,
        bossInfo: projectList.bossInfo,
        collectDepth: projectList.collectDepth,
        page: projectList.page,
        pageSize: projectList.pageSize,
        orderType: projectList.sort,
        order:projectList.order
      }
      this.api.projectList1(params).then(res => {
        this.totalCount = res.total
        this.allList = res.rows
        this.allList.forEach(item=>{
          item.projectType = item.projectType.split("&");
        })
        this.loading = false
      })
    },
    search () {
      this.projectList1(this.taskList)
    },
    
    resetCaseList () {
      this.taskList.pageSize = 10
      this.taskList.page = 1
      this.taskList.searchContent = ''
      this.taskList.collectProgramType = ''
      this.taskList.projectType = ''
      this.taskList.status = ''
      this.taskList.sort = ''
      this.taskList.collectDepth = ''
      this.taskList.bossInfo = ''
      this.taskList.biddingCycle = ''
      this.projectList1(this.taskList)
      this.pageSize = 10
      this.page = 1
    },
    handleSizeChange (val) {
      if (val === undefined || val === 0) {
        this.pageSize = 10
      } else {
        this.pageSize = val
      }
      this.taskList.pageSize = this.pageSize
      this.projectList1(this.taskList)
    },
    handleCurrentChange (val) {
      if (val == null || val === 0) {
        this.currentPage = 1
      } else {
        this.currentPage = val
      }
      this.taskList.page = this.currentPage
      this.projectList1(this.taskList)
    },
    sort (val, index) {
      this.clickIndex = index
      this.taskList.sort = val
      this.projectList1(this.taskList)
    },
    watchUp (projectId,concernStatus,event) {
      if(event.target.innerText == '关注'){
        this.api.watchUp({projectId:projectId},'concern').then(res => {
          if(res.code == 0){
            this.$message('关注成功')
            event.target.innerText = '取消关注'
          }
          if(res.code == 1){
            this.$message({
              showClose: true,
              message: '关注失败',
              type: 'error'
            })
          }
          this.projectList1(this.taskList)
        })
      }else{
        this.api.watchUp({projectId:projectId},'cancel').then(res => {
          if(res.code == 0){
            this.$message('已取消关注')
            event.target.innerText = '关注'
          }
          if(res.code == 1){
            this.$message({
              showClose: true,
              message: '取消关注失败',
              type: 'error'
            })
          }
          this.projectList1(this.taskList)
        })
      }
    },
    signUp (projectId) {
      this.api.signUp({projectId: projectId}).then(res => {
        if(res.code == 0){
          this.$message('报名成功')
          this.projectList1(this.taskList)
        }
        if(res.code == 1){
          this.$message(res.msg)
        }
      })
    },
    qryCaculator(id){
      this.projectId = id
      this.currentId = id
      this.api.qryCaculator({projectId:id}).then(res=>{
        if(res.data.length>0){
          this.push = true
          this.caculatorList = res.data[0];
        }else{
           this.push = false
        }
      })
    }
  },
  mounted () {
    this.projectId = this.$route.params.id
    this.getTypeList()
    this.handleCurrentChange()
    this.handleSizeChange()
  }
}
</script>
<style lang='less' scoped>
@media only screen and (min-width: 1600px) {
  .taskHall{
    max-width:1500px;
    margin:4rem auto 0px !important;
  }
}

.taskHall {
  font-size: 0.875rem;
  .search{
    padding: 5rem 0;
  }
}
.left-filter{
  padding:0 1rem 0 1.4rem;
  border-bottom:0.0625rem solid #dee2e6;
}
.cat{
  font-size: 0.875rem;
  color: #333333;
  padding:1.5rem 1rem 0 1rem;
  font-weight: 600;
}
.grid-content {
  width: 100%;
  margin: 0;
}
.mdb-search {
  margin: 0 0 4rem;
}
// 手机端样式
.taskHall.isMobile{
  .project-title{
    margin-top: 1rem;
    margin-bottom: 1rem!important;
  }
}
button{
  border: 0.125rem solid #707070 !important;
  border-radius: 0.25rem;
  color: #333333 !important;
}
button:hover{
  border: 0.125rem solid #707070 !important;
}
</style>
<style lang="less">
.taskHall{
  background: #f5f6f8;
  .mdb-search{
    .searchBox{
      margin-top:0 !important;
      background: #ffffff;
    }
  }
  .table-wrapper{
    background: #ffffff;
    border:0.0625rem solid #dee2e6;
    tr td{
      color: #999999;
    }
  }
  .select-dropdown{
    border: 0.0625rem solid #ced4da !important;
    border-radius: 0.125rem !important;
    padding-left: 0.625rem !important;
    padding-right: 0.625rem !important;
    box-sizing: border-box !important;
    font-size: 0.875rem !important;
    color: #333333 !important;
  }
  .select-wrapper .caret{
    right: 0.625rem;
  }
}
// 手机端样式
.taskHall.isMobile{
  .mdb-search{
    .submit{
      margin-left: 0!important;
    }
  }
}
.taskHall{
  .left-filter{
    .btn{
      float: left;
    }
  }
  .table{
    margin-bottom: 0 !important;
  }
}
</style>

