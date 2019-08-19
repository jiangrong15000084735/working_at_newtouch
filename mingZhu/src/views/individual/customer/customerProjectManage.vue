<template>
  <div class="customerProjectManage">
    <mdb-container>
      <mdb-row>
        <mdb-col md="2" class="px-0">
          <mdb-tab pills color="primary" vertical>
            <mdb-tab-item
              :active="verticalWithin==index"
              @click.native.prevent="tabItem(item.peojectType,index)"
              v-for="(item,index) in projectTabs"
              :key="index"
            >{{item.text}}</mdb-tab-item>
          </mdb-tab>
        </mdb-col>
        <mdb-col md="10" class="pr-0 pt-2" v-if="uesrInfo.auditState==3">
          <!-- <div class="numTip" v-if="verticalWithin==0&&projectlist&&projectlist.length>0">{{projectlist.length}}个</div> -->
          <tbl class="tblWrapper text-left" v-if="verticalWithin==0&&projectlist&&projectlist.length>0">
            <tbl-head>
              <tr>
                <th style="width:362px;" class="text-center">项目名称</th>
                <th class="text-center">建筑地点</th>
                <th style="width:330px;" class="text-center">操作</th>
              </tr>
            </tbl-head>
            <tbl-body>
              <tr class="tblTr" :class="index%2==1?'bgGray':''" v-for="(item,index) in projectlist" :key="index">
                <td style="width:362px;padding-left:122px;">
                  <mdb-row class="px-0 py-0 mx-0 my-0">
                    <mdb-col class="px-0 py-0 mx-0 my-0" style="width:34px;max-width:34px;">
                      <span class="tblSpan">{{index+1}}</span>
                    </mdb-col>
                    <mdb-col class="px-0 py-0 mx-0 my-0">
                      {{item.name}}
                    </mdb-col>
                  </mdb-row>
                </td>
                <td class="text-center">{{item.address?item.address:'- -'}}</td>
                <td style="width:330px;" class="text-center">
                  <mdb-btn class="btn110_30 px-0 py-0 colorGray" @click="go(item.id)" outline="primary">查看</mdb-btn>
                </td>
              </tr>
            </tbl-body>
          </tbl>
           <!-- <ul v-if="verticalWithin==0&&projectlist&&projectlist.length>0" class="peoject-item">
             <li v-for="(item,index) in projectlist" :key="index">
               <span  @click.stop="go(item.id)">{{index+1}}&nbsp;&nbsp;{{item.name}}</span>
              </li>
           </ul> -->
           <!-- <div class="numTip" v-if="verticalWithin==1&&project&&project.length>0">{{project.length}}个</div> -->
           <tbl class="tblWrapper text-left" v-if="verticalWithin==1&&project&&project.length>0">
            <tbl-head>
              <tr>
                <th style="width:362px;" class="text-center">项目名称</th>
                <th class="text-center">建筑地点</th>
                <th style="width:330px;" class="text-center">操作</th>
              </tr>
            </tbl-head>
            <tbl-body>
              <tr class="tblTr" :class="index%2==1?'bgGray':''" v-for="(item,index) in project" :key="index">
                <td style="width:362px;padding-left:122px;">
                  <!-- <span class="tblSpan">{{index+1}}</span>
                  {{item.name}} -->
                  <mdb-row class="px-0 py-0 mx-0 my-0">
                    <mdb-col class="px-0 py-0 mx-0 my-0" style="width:34px;max-width:34px;">
                      <span class="tblSpan">{{index+1}}</span>
                    </mdb-col>
                    <mdb-col class="px-0 py-0 mx-0 my-0">
                      {{item.name}}
                    </mdb-col>
                  </mdb-row>
                </td>
                <td class="text-center">{{item.address?item.address:'- -'}}</td>
                <td style="width:330px;" class="text-center">
                  <mdb-btn class="btn110_30 px-0 py-0 colorGray" @click="go(item.id)" outline="primary">查看</mdb-btn>
                </td>
              </tr>
            </tbl-body>
          </tbl>
           <!-- <ul v-if="verticalWithin==1&&project&&project.length>0" class="peoject-item">
             <li v-for="(item,index) in project" :key="index" >
               <span @click.stop="go(item.id)">{{index+1}}&nbsp;&nbsp;{{item.name}}</span>
              </li>
           </ul> -->
           <tbl class="tblWrapper text-left" v-if="verticalWithin==2">
            <tbl-head>
              <tr>
                <th style="width:100px;">项目名称</th>
                <th style="width:100px;">建设地点</th>
                <th style="width:100px;">客户类型</th>
                <th style="width:120px;">增值服务内容</th>
                <th style="width:100px;">创建时间</th>
                <th style="width:100px;" class="text-center">价格（元）</th>
                <th style="width:100px;" class="text-center">凭证上传</th>
              </tr>
            </tbl-head>
            <tbl-body>
              <tr  class="tblTr" :class="index%2==1?'bgGray':''" v-for="(item,index) in packageList" :key="index">
                <td style="width:100px;">{{item.projectName}}</td>
                <td style="width:100px;">{{item.adress}}</td>
                <td style="width:100px;">{{employerInfoList[item.employerInfo].name}}</td>
                <td style="width:100px;">
                  <template v-for="(dos,dosidx) in item.serviceDOS">
                    <div style="display:inline-block;" :key="dosidx">{{dos.name}}</div>
                    <div style="display:inline-block;" v-show="dosidx<item.serviceDOS.length-1">/</div>
                  </template>
                </td>
                <td style="width:100px;" v-html="item.createTime.replace(/\ /g,'<br>')"></td>
                <td style="width:100px;" class="text-center">{{item.cost?item.cost:"-"}}</td>
                <td style="width:100px;" class="text-center">
                  <div v-if="item.statues==0">
                    <mdb-btn @click="goPackage(item)" class="mx-0 my-0 btn110_30" color="primary">未上传</mdb-btn>
                  </div>
                  <div v-else>
                    <mdb-btn @click="goPackage(item)" class="mx-0 my-0 btn110_30" color="primary">已上传</mdb-btn>
                  </div>
                </td>
              </tr>
            </tbl-body>
          </tbl>
            <!-- <mdb-tbl v-if="verticalWithin==2">
              <mdb-tbl-head>
                <tr>
                  <th style="width:100px;">项目名称</th>
                  <th style="width:100px;">建设地点</th>
                  <th style="width:100px;">客户类型</th>
                  <th style="width:100px;">增值服务类型</th>
                  <th style="width:100px;">创建时间</th>
                  <th style="width:100px;" class="text-center">价格（元）</th>
                  <th style="width:100px;">凭证上传</th>
                </tr>
              </mdb-tbl-head>
              <mdb-tbl-body>
                <tr  v-for="(item,index) in packageList" :key="index">
                  <td style="width:100px;">{{item.projectName}}</td>
                  <td style="width:100px;">{{item.adress}}</td>
                  <td style="width:100px;">{{employerInfoList[item.employerInfo].name}}</td>
                  <td style="width:100px;">
                    <template v-for="(dos,dosidx) in item.serviceDOS">
                      <div style="display:inline-block;" :key="dosidx">{{dos.name}}</div>
                      <div style="display:inline-block;" v-show="dosidx<item.serviceDOS.length-1">/</div>
                    </template>
                  </td>
                  <td style="width:100px;">{{item.createTime}}</td>
                  <td style="width:100px;" class="text-center">{{item.cost?item.cost:"-"}}</td>
                  <td style="width:100px;">
                    
                    <div v-if="item.statues==0">
                      <mdb-btn size="sm" @click="goPackage(item)" class="mx-0 my-0" color="primary">未上传</mdb-btn>
                    </div>
                    <div v-else>
                      <mdb-btn size="sm" @click="goPackage(item)" class="mx-0 my-0" color="primary">已上传</mdb-btn>
                    </div>
                  </td>
                </tr>
              </mdb-tbl-body>
            </mdb-tbl> -->
        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      projectlist:[],
      project:[],
      verticalWithin:0,
      projectTabs:[
        {
          text:"进行中项目",
          peojectType:0
        },
        {
          text:"已完结项目",
          peojectType:1
        },
        {
          text:"增值服务",
          peojectType:2
        }
      ],
      employerInfoList: [
        {
          id: 0,
          name: "个人"
        },
        {
          id: 1,
          name: "企业"
        },
        {
          id: 2,
          name: "政府机构"
        },
        {
          id: 3,
          name: "其它"
        }
      ],
      step:0,
      uesrId:'',
      uesrInfo:"",
      packageList:[]
    }
  },
  methods:{
    tabItem(value,index){
      this.verticalWithin = index;
      if(index==2) {
        this.getAllByBossId()
      }
    },
    getProjectList() {
      this.loading = true;
      this.api.qryCurrentUserProjectProcessNew({}).then(res => {
        this.projectlist = res.data.doingList;
        this.project = res.data.overList;
      });
    },
    go(id){
      this.api.getProjectStatus({id: id}).then(res=>{
        if(res.code==0){
          const { href } = this.$router.resolve({
            path: "/projectDetial",
            query: {
              id: id,
              step:res.data.status,
              t:"s"
            }
          });
          window.open(href, "_blank");
        }
      })
    },
    getAllByBossId() {
      this.api.getAllByBossId(this.uesrId).then(res => {
        if(res.code !=0){
          this.$message.error(res.msg)
          return
        }
        if(res.data){
          this.packageList = res.data
        }
      })
    },
    goPackage(item) {
      const { href } = this.$router.resolve({
        path:"addService",
        query:{
          id:item.id,
          actives:"s"
        }
      })
      window.open(href,"_blank")
    }
  },
  mounted(){
    this.uesrId = localStorage.getItem("userId") || sessionStorage.getItem("userId")
    this.uesrInfo = localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo") 
    this.uesrInfo = JSON.parse(this.uesrInfo)
    this.getProjectList()
  },
}
</script>

<style lang="less" scoped>

</style>

<style lang="less">
  .customerProjectManage{
    margin-bottom: 9.5rem;//防止footer下面出现百边
    // .numTip{
    //   font-size: 14px;
    //   color: #4285f4;
    //   margin-bottom: 20px;
    // }
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
    /*表格*/
    .tblWrapper{
      // width: 986px;
      border: 1px solid #d9d9d9;
      border-radius: 0.25rem;
      .table{
        margin: 0;
      }
      thead{
        tr{
          box-shadow: 0 0.125rem 0.3125rem 0 #d9d9d9, 0 0.125rem 0.625rem 0 #d9d9d9;
          height: 3.75rem;
          th{
            font-size: 1rem;
            color: #333;
            border: none;
            padding: 0.625rem 1.25rem;
            box-sizing: border-box;
            vertical-align: middle;
          }
        }
      }
      tbody{
        .tblTr{
          height: 3.75rem;
          td{
            font-size: 0.875rem;
            word-break: break-all;
            padding: 0.625rem 1.25rem;
            box-sizing: border-box;
            color: #999;
            border: none;
            vertical-align: middle;
          }
          .tblSpan{
            min-width: 1.5rem;
            height: 1.5rem;
            border-radius: 0.75rem;
            text-align: center;
            line-height: 1.5rem;
            display: inline-block;
            background: #cac4ce;
            color:#fff;
            margin-right: 0.625rem;
          }
          // .tblSpan:hover{
          //   background: #b4d0ff;
          // }
          .colorGray{
            border-color: #666!important;
            border-width: 1px!important;
            color: #666!important;
            font-size: 0.875rem;
          }
          .colorGray:hover{
            border-color: #4285f4!important;
            color: #4285f4!important;
          }
        }
        .bgGray{
          background: #f5f5f5;
          .tblSpan{
            background: #b4d0ff;
          }
        }
      }
    }
  }
</style>