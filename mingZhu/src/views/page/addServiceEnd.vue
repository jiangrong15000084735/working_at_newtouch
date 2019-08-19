<template>
  <div class="addServiceEnd">
      <mdb-container>
        <mdb-row class="form-mdb-row" style="margin-top: 4.5rem;">
          <mdb-col md="5">
            <mdb-input label="项目名称" disabled v-model="servicebox.projectName" placeholder=" "/>
          </mdb-col>
          <mdb-col md="5" offsetMd="2">
            <mdb-input label="建设地点" disabled v-model="servicebox.adress" placeholder=" " />
          </mdb-col>
        </mdb-row>
        <mdb-row class="form-mdb-row">
          <mdb-col md="8">
            <label for="employerInfo" class="form-label">客户类型
            </label>
            <div id="employerInfo">
              <div style="width:6.875rem;" class="form-check form-check-inline" v-for="(item,index) in employerInfoList" :key="index">
                <input type="radio" 
               :checked="item.id==servicebox.employerInfo"
                name="inlineMaterialRadio" 
                class="form-check-input" 
                disabled
                :id="'item'+item.id">
                <label class="form-check-label" :for="'item'+item.id">
                  <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">{{item.name}}</font>
                  </font>
                </label>
              </div>
            </div>
          </mdb-col>
        </mdb-row>
      
       <mdb-container class="px-0" v-if="listService.length>0">
        <mdb-row class="mx-0 addServiceContent pb-4 mt-4" v-for="(item, index) in listService" :key="index">
          <mdb-col md="10" class="px-0">
            <h4>
              {{item.name}}  
            </h4>
            <p>
              {{item.intro}}

            </p>
          </mdb-col>
          <mdb-col md="2">
            <div class="form-check form-check-inline">
              <input type="checkbox"
              class="form-check-input" 
              :value="index"
              :id="item.id"
              disabled
              checked
              >
              <label class="form-check-label" :for="item.id">
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;"></font>
                </font>
              </label>
            </div>
          </mdb-col>
        </mdb-row>
       </mdb-container>
      <mdb-row class="my-4">
        <mdb-col class="text-left">
          
          <div class="downLoad-warp">

            <div style="display:inline-block;height:120px;vertical-align:top;">
              <div class="detail-img" v-for="(item,index) in fileList" :key="index">
                <img src="@/assets/images/my-project-black.png">
                <div class="img-name">{{item.name}}</div>
                <div class="download">
                  <a
                    :href="origin+'/Mingzhu/common/sysFile/download/'+item.voucher+'/'+item.name"
                    :download="item.name"
                  >下载</a>
                </div>
              </div>
            </div>
            <div style="display:inline-block;height:120px;vertical-align:baseline;">
              <!-- <div class="detail-img" 
                @click="canUpLoad"
                v-if="servicebox.auditState!=5">
                <i class="el-icon-plus"></i>
                <div class="img-name">上传凭证</div>
              </div> -->
              <div class="detail-img" v-if="servicebox.statues<2">
                <el-upload :action="api.upload()" :on-success="saveProjectMoney" :show-file-list="false">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <div class="img-name">上传凭证</div>
              </div>
            </div>
          </div>


        </mdb-col>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
        listService:[],
        servicebox:{},
        fileList:[],
        id:'',
        origin:location.origin,
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
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.getServicesByPackageId()
    this.getPackgeUrl()
  },
  methods:{
    canUpLoad(){
      if(this.servicebox.auditState!=5){
        this.$message.error("审核尚未通过，暂时不能上传凭证")
        return
      }
      // if(this.servicebox.statues==1){
      //   this.$message.error("凭证认证中，请勿修改")
      //   return
      // }
    },
      getServicesByPackageId(){
        this.api.getServicesByPackageId(this.id).then(res => {
          if(res.code!=0){
            this.$message.error(res.msg)
            return
          }
          this.listService = res.data.valueaddedServiceDOS
          this.servicebox = res.data.valueaddedPackageDO
        })
      },
      saveProjectMoney(res, file) {
        //file.name原名
        let params = {
          id: this.id,
          voucher: res.msg,
          voucherName: file.name
        }
        this.api.packageUpdate(params).then(res => {
          console.log(res)
          if(res.code!=0){
            this.$message.error(res.msg)
            return
          }
          this.getPackgeUrl()
          // this.getServicesByPackageId()
        })
      // this.api.saveProjectMoney({
      //   // projectId: this.$route.query.id,
      //   // type: this.actives,
      //   title: file.name,
      //   content: res.msg
      // })
      // .then(res => {
      //   this.$message(res.msg);
      //   if (res.code == 0) {
      //     // this.listProjectMoney();
      //   }
      // });
    },
    getPackgeUrl() {
      let params = {
          id: this.id,
        }
        this.api.getPackgeUrl(params).then(res => {
          if(res.data.name){
            this.fileList= [
              {
                name:res.data.name,
                voucher:res.data.voucher
              }
            ]
          }else{
             this.fileList= []
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.addServiceEnd{
  // margin-top: 3.375rem;
  min-height: 100%;
  width:75rem;
  margin: 3.375rem auto 0;
  .addServiceTitle{
    border-bottom: 1px solid #e0e0e0;
    padding-top: 1.25rem;
    h4 {
      padding-bottom: .5rem;
      font-size: 1.5rem;
      color: #000000;
    }
  }
  .addServiceContent{
    border-bottom: 1px solid #e0e0e0;
    h4{
      font-size: 1.5rem;
      color: #333;
      padding-bottom: 0.3125rem;
    }
    p{
      text-align: justify;
    }
  }
  .downLoad-warp {
    .upLoad-title {
      margin-bottom: 2rem;
      font-weight: 600;
    }
    .detail-img {
      margin: 0.2rem;
      display: inline-block;
      text-align: center;
      position: relative;
      .el-icon-plus {
        font-size: 3.75rem;
      }
      .delete-icon {
        position: absolute;
        top: -0.1rem;
        color: #ababab;
        right: -0.1rem;
        font-size: 0.2rem;
        font-weight: bold;
      }
    }
    .detail-img img {
      width: 3.75rem;
      height: 3.75rem;
    }
  }
}
</style>
<style lang="less">
.employerInfoSelect .lxx-radio{
  flex:0 0 6rem!important;
}
</style>
