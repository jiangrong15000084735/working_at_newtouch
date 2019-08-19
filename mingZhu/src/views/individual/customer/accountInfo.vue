<template>
  <div>
    <mdb-container class="accountInforWrapper">
      <mdb-row>
        <mdb-col md="2" class="px-0">
          <mdb-tab pills color="primary" vertical>
            <mdb-tab-item
              :active="verticalWithin==item.id"
              @click.native.prevent="tabClick(item.id)"
              v-for="(item,index) in tabs"
              :key="index"
            >{{item.title}}</mdb-tab-item>
          </mdb-tab>
        </mdb-col>
        <mdb-col md="10">
          <mdb-tab-content vertical class="px-0">
            <mdb-tab-pane class="fade" key="pills1" v-if="verticalWithin==0">
              <baseInfo/>
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
    </mdb-container>
    <login ref="login"/>
  </div>
</template>

<script>
  import baseInfo from '@/views/individual/customer/accountInfo/baseInfo'
  import region from '@/views/individual/customer/accountInfo/region'
  import password from '@/views/individual/designer/accountInfo/password'
  import setting from '@/views/individual/customer/accountInfo/setting'
  import login from "@/views/home/login.vue"
  import { mapMutations } from "vuex"
  export default {
    name: 'accountInfo',
    components: { baseInfo, region, password, setting, login },
    data() {
      return {
        tabs: [
          {
            id: 0,
            name:'',
            title:'基本信息'
          },
          {
            id: 3,
            name:'',
            title:'区域国家'
          },
          {
            id: 4,
            name:'',
            title:'密码'
          },
          {
            id: 5,
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
        if(index == 4){
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

<style scoped>
.collapse-item {
  height: auto!important;
}
</style>
<style lang="less">
// .accountInforWrapper{
//   .collapse-item {
//     height: auto!important;
//   }
//   .select-wrapper .dropdown-content{
//     max-height: 200px!important;
//   }
// }
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