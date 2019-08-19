<template>
  <!-- <div> -->
    <mdb-container class="accountInforWrapper">
      <mdb-row>
        <mdb-col md="2" class="px-0">
          <mdb-tab pills color="primary" vertical>
            <mdb-tab-item
              :active="verticalWithin==index"
              @click.native.prevent="tabClick(index)"
              v-for="(item,index) in tabs"
              :key="index"
            >{{item.title}}</mdb-tab-item>
          </mdb-tab>
        </mdb-col>
        <mdb-col md="10" class="px-0">
          <mdb-tab-content vertical>
            <mdb-tab-pane class="fade" key="pills1" v-if="verticalWithin==0">
              <baseInfo/>
            </mdb-tab-pane>
            <mdb-tab-pane class="fade" key="pills2" v-if="verticalWithin==1">
              <personDetail/>
            </mdb-tab-pane>
            <mdb-tab-pane class="fade" key="pills3" v-if="verticalWithin==2">
              <myProduction/>
            </mdb-tab-pane>
            <mdb-tab-pane class="fade" key="pills4" v-if="verticalWithin==3">
              <region/>
            </mdb-tab-pane>
            <mdb-tab-pane class="fade" key="pills5" v-if="verticalWithin==4">
              <password/>
            </mdb-tab-pane>
            <mdb-tab-pane class="fade" key="pills6" v-if="verticalWithin==5">
              <setting/>
            </mdb-tab-pane>
          </mdb-tab-content>
        </mdb-col>
      </mdb-row>
       <login ref="login"/>
    </mdb-container>
   
  <!-- </div> -->
</template>
<script>
  import baseInfo from '@/views/individual/designer/accountInfo/baseInfo'
  import personDetail from '@/views/individual/designer/accountInfo/personDetail'
  import myProduction from '@/views/page/myProduction'
  import region from '@/views/individual/designer/accountInfo/region'
  import password from '@/views/individual/designer/accountInfo/password'
  import setting from '@/views/individual/designer/accountInfo/setting'
  import login from "@/views/home/login.vue"
  import { mapMutations } from "vuex";
  export default {
    name: 'accountInfo',
    components: { baseInfo, personDetail, myProduction, region, password, setting ,login},
    data() {
      return {
        tabs: [
          {
            name:'',
            title:'基本信息'
          },
          {
            name:'',
            title:'个人详情'
          },
          {
            name:'',
            title:'我的作品'
          },
          {
            name:'',
            title:'区域国家'
          },
          {
            name:'',
            title:'密码管理'
          },
          {
            name:'',
            title:'高级设置'
          }],
        pillsActive: 0,
        verticalWithin: 0,
        designerInfo: {}
      }
    },
    mounted () {
      
    },
    methods: {
      ...mapMutations(["setIsRefresh"]),
      tabClick(index) {
        if(this.tabs[index].title == "密码"){
          this.updPasswordNeedLogin(index)
        }else{
          this.verticalWithin = index
        }
      },
      updPasswordNeedLogin(index) {
        this.api.updPasswordNeedLogin({}).then(res => {
          if(res.code == 0){
            this.verticalWithin = index
          }else{
            this.$refs.login.tabs = 1
            this.$refs.login.flag = true
            this.$refs.login.loginType=1
            this.setIsRefresh(false)
          }
        })
      }
    }
  }
</script>

<style lang="less">
.accountInforWrapper{
  .collapse-item {
    height: auto!important;
  }
  .select-wrapper .dropdown-content{
    max-height: 200px!important;
  }
}
</style>

<!-- ui样式覆盖 --> 
<style lang="less">
  .accountInforWrapper{
    .leftTab{
      width: 196px;
      max-width: 196px;
      .md-pills li{
        margin-left: 18px;
        padding:8px 0;
      }
      .nav-link{
        width: 178px;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        padding: 0;
      }
    }
  }
</style>