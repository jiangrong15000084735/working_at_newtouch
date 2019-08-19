<template>
  <div class="home" :class="this.path.indexOf(this.$route.path)>-1?'bg1':''" ref="element">
  <headerPart></headerPart>
  <router-view></router-view>
  <footerPart></footerPart>
</div>
</template>

<script>
  import headerPart from '@/components/header.vue'
  import footerPart from '@/components/footer.vue'

  export default {
    components: {
      footerPart,
      headerPart
    },
    data() {
      return {
        activeIndex: '1',
        unloginVisible: true,
        navMenuActiveIndex: null,
        navMenuList: [],
        path: ['/contactUs', '/question']
      }
    },
    methods: {
      submitHome() {
        this.$router.push('/homePage')
      },
      // 发布项目
      projectRelease() {
        console.log('发布项目')
      },
      enterBuildings() {
        console.log('入驻合筑')
      },
      // 菜单进入
      navMenuTabEnter(index) {
        this.navMenuActiveIndex = index
      },
      navMenuTabLeave(index) {
        this.navMenuActiveIndex = null
      },
      navMenuLink(link) {
        window.location.href = link
      },
      // 导航栏
      getNavMenu() {
        this.api.navMenu({}).then(res => {
          this.navMenuList = res.data
        })
      },
      // 消息数量
      getNotifyNum() {
        this.api.notifyNum('1', {
          isRead: 0,
          type: 0,
          offset: 0,
          limit: 10
        }).then(res => {

        })
      },
      // 退出
      logout() {
        this.api.logout({}).then(res => {
          if (res.code == '0') {
            this.unloginVisible = true
          } else {
            this.unloginVisible = false
          }
        })
      }
    },
    mounted() {
      console.log('123')
      this.$store.commit('setNavScroll', true)
      // this.getNavMenu(); //导航
      // this.getNotifyNum(); //消息数量
      if (this.$store.state.user.userName == null || this.$store.state.user == '') {
        this.unloginVisible = true
      } else {
        this.unloginVisible = false
      }
    },
  }
</script>

<style lang="less" scoped>
  .home{
    padding-top: .6rem;
    height: 100%;
  }

  .bg1 {
    background: #f9f9f9;
  }
</style>
