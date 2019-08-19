<template>
  <div class="header">
    <!--Navbar-->
    <mdb-navbar dark color="elegant" position="top" scrolling transparent>
      <mdb-navbar-brand href="#">
        <img class="logo" src="../assets/images/logo.png" alt>
      </mdb-navbar-brand>
      <mdb-navbar-brand href="#">合筑空间</mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav>
          <mdb-nav-item href="#/homePage" waves-fixed @click.native="submitHome">首页</mdb-nav-item>
          <mdb-nav-item href="#" waves-fixed @click.native="goUnderstandCoop">了解合筑</mdb-nav-item>
          <!-- Dropdown -->
          <mdb-dropdown tag="li" class="nav-item" v-for="(val,index) in navMenuList" :key="index">
            <template v-for="(v,k) in val">
              <mdb-dropdown-toggle :key="k" slot="toggle" tag="a" href="#" navLink waves-fixed>{{k}}</mdb-dropdown-toggle>
              <mdb-dropdown-menu :key="k">
                <mdb-dropdown-item
                  v-for="vv in v"
                  :key="vv.id"
                  @click.prevent.native="navMenuLink(vv.link,vv.name)"
                >{{vv.name}}</mdb-dropdown-item>
              </mdb-dropdown-menu>
            </template>
          </mdb-dropdown>
          <!-- <mdb-nav-item><el-input v-model="input" size="mini" placeholder="请输入内容"></el-input></mdb-nav-item> -->
        </mdb-navbar-nav>

        <mdb-navbar-nav right>
          <mdb-form-inline class="active-cyan-4" style="position: relative;">
            <input
              class="form-control"
              type="text"
              placeholder="输入您想搜索的内容"
              aria-label="Search"
              v-model="searchCont"
              @input="showAssSearch"
              @focus="showAssSearch"
            >
            <!-- <mdb-btn color="mdb-color" size="sm" class="mr-auto" outline="white">搜索</mdb-btn> -->
            <mdb-btn-group vertical class="ass-search" v-show="isAss">
              <mdb-btn @click="skipSearch(1)" color="white" class="mb-0">
                <mdb-icon icon="user" class="mr-1"/>
                {{searchCont}} in 建筑资源
              </mdb-btn>
              <mdb-btn @click="skipSearch(2)" color="white" class="mb-0">
                <mdb-icon icon="user" class="mr-1"/>
                {{searchCont}} in 作品案例
              </mdb-btn>
            </mdb-btn-group>
          </mdb-form-inline>
        </mdb-navbar-nav>
        <!-- 搜索 -->
        <!-- <mdb-navbar-nav right>
        <form class="form-inline active-cyan-4">
          <input class="form-control" type="text" placeholder="输入您想搜索的内容" aria-label="Search">
          <mdb-btn size="sm" type="submit" class="mr-auto">搜索</mdb-btn>
        </form>
        </mdb-navbar-nav>-->

        <!-- 未登录 手机上不显示去登陆按钮 -->
        <mdb-navbar-nav class="nav-margin" right v-if="unloginVisible && !inWeixin">
          <mdb-nav-item href="javascript:;" waves-fixed @click.native="showLogin">登录</mdb-nav-item>
          <mdb-nav-item class="hidden-item" href="javascript:;" waves-fixed>|</mdb-nav-item>
          <mdb-nav-item href="javascript:;" waves-fixed @click.native="showReg">注册</mdb-nav-item>
        </mdb-navbar-nav>
        <!-- 已登录 手机上不显示个人中心 -->
        <mdb-navbar-nav class="nav-margin" right v-if="!unloginVisible && !inWeixin">
          <mdb-nav-item href="#" waves-fixed @click.prevent.native="toMessage" class="item-padding" v-if="!isMobile">
            <!-- <span v-if="newsTotal>0" style="background:red;padding:0 2px;font-size:12px;">{{newsTotal}}</span> -->
            <mdb-badge v-if="newsTotal>0" color="danger" class="ml-2">{{newsTotal}}</mdb-badge>
            <span v-else>{{newsTotal}}</span>
            <mdb-icon icon="envelope" class="grey-text mr-2"/>
          </mdb-nav-item>
          <!-- <mdb-nav-item href="#" waves-fixed v-if="noticeArr.length==0">
          <mdb-icon icon="envelope" class="grey-text mr-2" />{{newsTotal}}
        </mdb-nav-item>
        <mdb-dropdown tag="li" class="nav-item" v-else>
          <mdb-dropdown-toggle slot="toggle" tag="a" href="#" navLink waves-fixed>
            <mdb-icon icon="envelope" class="grey-text mr-2" />{{newsTotal}}
          </mdb-dropdown-toggle>
          <mdb-dropdown-menu>
            <mdb-dropdown-item
              v-for="item in noticeArr"
              :key="item.id"
              @click.native="noticeHandler(item)"
            >{{item.title}}</mdb-dropdown-item>
          </mdb-dropdown-menu>
          </mdb-dropdown>-->

          <mdb-nav-item class="item-padding" @click.native="openLineService" waves-fixed v-if="!isMobile">
            <!-- <mdb-icon icon="phone" class="grey-text mr-2"/> -->
            <mdb-icon icon="comments" class="grey-text mr-2"/>
          </mdb-nav-item>

          <!-- Dropdown -->
          <mdb-dropdown tag="li" class="nav-item item-padding">
            <mdb-dropdown-toggle slot="toggle" tag="a" href="#" navLink waves-fixed>
              <mdb-icon icon="user" class="grey-text mr-2"/>
            </mdb-dropdown-toggle>
            <mdb-dropdown-menu right>
              <template v-for="(item,index) in roleList" v-if="!isMobile">
                <mdb-dropdown-item
                  :key="index"
                  @click.native.prevent="go(item.path)"
                >{{item.name}}</mdb-dropdown-item>
              </template>
              <mdb-dropdown-item @click.native.prevent="logout('b')">退出</mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
          <!-- <mdb-nav-item @click.native="enterBuildings" v-show="this.role == 1  && this.audit >= 3" waves-fixed ><mdb-icon icon="store" class="grey-text mr-2" />任务大厅</mdb-nav-item> -->
          <mdb-nav-item
            @click.native="enterBuildings"
            v-show="role == 1  && isAuditState==1"
            waves-fixed
            v-if="!isMobile"
          >
            <mdb-icon icon="store" class="grey-text mr-2"/>入驻合筑
          </mdb-nav-item>
          <!-- <mdb-nav-item @click.native="projectRelease" v-show="this.role == 0 && this.auditStateNum == 3" waves-fixed ><mdb-icon icon="store" class="grey-text mr-2" />发布项目</mdb-nav-item> -->
          <mdb-nav-item
            @click.native="toRenzheng"
            v-show="role == 0 && isAuditState==1"
            waves-fixed
            v-if="!isMobile"
          >
           <mdb-icon icon="store" class="grey-text mr-2"/>会员认证
          </mdb-nav-item>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>

    <login ref="login" @loginVisible="loginVisible" v-show="!inWeixin"/>

    <mdb-modal v-if="modal" @close="modal = false" info>
      <mdb-modal-header class="text-center">
        <p class="heading" style="width:100%">提示</p>
      </mdb-modal-header>
      <mdb-modal-body>{{message}}</mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="primary" v-if="auditStateNum<=1" @click.native="toRenzheng">去认证</mdb-btn>
        <mdb-btn outline="primary" v-else @click.native="modal = false">关闭</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>

<script>
import login from "@/views/home/login.vue";
import { setTimeout } from "timers";
import { mapMutations } from "vuex";
export default {
  components: { login },
  data() {
    return {
      isAuditState:null,
      isAss: false, //联想搜索状态
      searchCont: "", //输入的搜索内容
      modal: false,
      message: "",
      showLog: false,
      hasNews: false,
      newsTotal: 0,
      activeIndex: "1",
      unloginVisible: true,
      navMenuActiveIndex: null,
      navMenuList: [],
      showMobileChildMenu: false,
      // role: localStorage.getItem("role") || sessionStorage.getItem("role"),
      // 默认设置1
      role: 1,
      noticeArr: [],
      audit: -1,
      roleList: [],
      role1List: [
        // 设计师
        {
          name: "个人中心",
          path: "/personalCenter"
        },
        {
          name: "个人主页",
          path: "/designerDetails"
        },
        {
          name: "我的项目",
          path: "/projectManage"
        }
      ],
      role0List: [
        // 需求方
        // {
        //   name: "会员信息",
        //   path: "/companyInformation"
        // },
        // {
        //   name: "项目管理",
        //   path: "/customerData"
        // },
        // {
        //   name: "喜欢方案",
        //   path: "/favoriteCase"
        // },
        // {
        //   name: "关注设计师",
        //   path: "/collection"
        // }
        {
          name: "个人中心",
          path: "/customerCenter"
        },
        {
          name: "关注建筑师",
          path: "/customerConcernDesigner"
        },
        {
          name: "关注作品",
          path: "/customerFavoriteCase"
        },
         {
          name: "项目管理",
          path: "/customerProjectManage"
        }
      ]
    };
  },
  methods: {
    // 设置登陆状态
    ...mapMutations(["setIsLogin"]),
    // 设置角色信息、个人中心、个人主页信息
    setPresonMessage() {
      // 导航
      this.getNavMenu();
      let userInfo =
        sessionStorage.getItem("userInfo") || localStorage.getItem("userInfo");
        // sessionStorage.getItem("userInfo");
      if (userInfo) {
        this.getNotifyNum(); // 消息数量
        this.$store.commit("setUser", JSON.parse(userInfo));
        this.$store.commit(
          "setRole",
          localStorage.getItem("role") || sessionStorage.getItem("role")
          // sessionStorage.getItem("role")
        );
        let id =
          localStorage.getItem("userId") || sessionStorage.getItem("userId");
          // sessionStorage.getItem("userId");
        // 获取角色信息
        this.role =
          localStorage.getItem("role") || sessionStorage.getItem("role");
          // sessionStorage.getItem("role");
        // if (this.role == 1) {
        //   this.getDesingerDetailByDesignerId({ id: id });
        // } else {
        //   this.getBossInfo({ id: id });
        // }
        this.unloginVisible = false;
        let _audit = this.$store.getters.userInfo.auditState;
        // 存储auditState判断是否显示入住合筑
        this.$store.commit("SetAuditState", _audit>=0 ? _audit : 3);
        if (_audit) {
          this.audit = _audit;
        }
        this.roleList = this.role == 1 ? this.role1List : this.role0List;
        this.checkIsAudit()
      } else {
        // 如果在微信端没有登陆
        // if (this.inWeixin) {
        //   Bus.$emit('wechatLogin');
        // }
        this.unloginVisible = true;
      }
      console.log('unloginVisible', this.unloginVisible);
    },
    // 接收子组件login传值
    loginVisible(value) {
      // 设置角色信息、个人中心、个人主页信息
      this.setPresonMessage();
    },
    // 通过设计师id货物设计师详情
    getDesingerDetailByDesignerId(id) {
      this.api.getDesingerDtailByDesinerId(id).then(res => {
        this.$nextTick(() => {
          if (res.code !== 0) {
            return;
          }
          let { auditState } = res.data.designerDO;
          this.$store.commit("SetAuditState", auditState ? auditState : -1);
        });
      });
    },
    //通过客户id货物设计师详情
    getBossInfo(id) {
      this.api.companyDetail(id).then(res => {
        if (res.code !== 0) {
          return;
        }
        let { auditState } = res.data;
        this.$store.commit("SetAuditState", auditState ? auditState : -1);
      });
    },
    checkIsAudit(){
      let userInfo = sessionStorage.getItem("userInfo") || localStorage.getItem("userInfo");
      let userId = sessionStorage.getItem("userId") || localStorage.getItem("userId");
      let role = sessionStorage.getItem("role") || localStorage.getItem("role");
      if(userInfo&&(JSON.parse(userInfo).auditState||JSON.parse(userInfo).auditState!=3)){
        this.api.checkIsAudit({
          role:role,
          roleId:userId
        }).then(res=>{
          console.log("rrr")
          this.isAuditState = res.code
          // 0 认证通过 1未通过
        })
      }
    },
    go(path) {
      // if (this.auditStateNum <= 1) {
      //   this.message = "请先认证";
      //   this.modal = true;
      //   return;
      // } else if (this.auditStateNum == 2) {
      //   this.message = "审核中，请耐心等待.....";
      //   this.modal = true;
      //   return;
      // }
      this.checkIsAudit();
      this.$router.push(path);
    },
    toRenzheng() {
      if (this.role == 0) {
        this.$router.push("/submit");
      } else {
        this.$router.push("/personalInformationNew");
      }
      this.modal = false;
    },
    showLogin() {
      if (this.inWeixin) {
        this.$message('账号未注册或登录');
      } else {
        // this.$refs.login.tabs = 5;
        this.$refs.login.tabs = 1;
        this.$refs.login.flag = true;
        this.$refs.login.loginType = 1;
        this.checkIsAudit()
      }
    },
    showReg() {
      this.showLog = true;
      setTimeout(() => {
        this.$refs.login.register();
      }, 0);
    },
    subMenuHandler(url) {
      window.location.href = url;
    },
    submitHome() {
      this.$router.push("/homePage");
    },
    // 发布项目
    projectRelease() {
      this.$router.push("/CommissionedDesign");
    },
    enterBuildings() {
      if (this.auditStateNum >= 3) {
        this.$router.push("/taskHall");
      } else {
        this.$router.push("/personalInformationNew");
      }
    },
    // 菜单进入
    navMenuTabEnter(index) {
      this.navMenuActiveIndex = index;
    },
    navMenuTabLeave(index) {
      this.navMenuActiveIndex = null;
    },
    navMenuLink(link, name) {
      let userInfo = sessionStorage.getItem("userInfo") || localStorage.getItem("userInfo");
      // let userId = sessionStorage.getItem("userId") || localStorage.getItem("userId");
      // let role = sessionStorage.getItem("role") || localStorage.getItem("role");
      if (name == "发布项目") {
        if (userInfo) {
          window.location.href = link;
          this.getNavMenu();
        } else {
          this.showLogin();
        }
      } else if (name == "招标信息") {
        if (userInfo) {
          window.location.href = link;
          this.getNavMenu();
        } else {
          this.showLogin();
        }
      }else if (name == "增值服务") {
        if (userInfo) {
          // window.location.href =link;
          let id = localStorage.getItem("userId") || sessionStorage.getItem("userId");
          this.api.getAllToBeConfirmed(id).then(res => {
            if (res.code !== 0) {
              this.$router.push({
                name:"addService"
              })
              return;
            }
            if(res.data){
              this.$router.push({
                  name:"addService",
                  query:{
                    id: res.data[0].id
                  }
                })
            }else{
              this.$router.push({
                name:"addService"
              })
            }
          });
          this.getNavMenu();
        } else {
          // this.$router.push({
          //   name:"addService"
          // })
          this.showLogin();
        }
      }else if(name == "在线客服"){
        window.open(link, "_blank");
      } else {
        window.location.href = link;
      }
      // if(userInfo&&(JSON.parse(userInfo).auditState||JSON.parse(userInfo).auditState!=3)){
      //   this.api.checkIsAudit({
      //     role:role,
      //     roleId:userId
      //   }).then(res=>{
      //     console.log(res)
      //     this.isAuditState = res.code
      //     // 0 认证通过 1未通过
      //   })
      // }
      this.checkIsAudit()
    },
    // 导航栏
    getNavMenu() {
      this.api.navMenu({}).then(res => {
        let _arr = res.data;
        _arr.forEach(function(item, index) {
          // console.log(Object.values(item))
          if (Object.values(item)) {
            let childArr = Object.values(item);
            childArr.forEach(function(item, index) {
              // console.log('=====',item)
              let sonArr = item;
              sonArr.forEach(function(item, inde) {
                item.show = false;
              });
            });
          }
        });
        this.navMenuList = _arr;
        console.log(this.navMenuList);
      });
    },

    // 消息数量
    getNotifyNum() {
      let _this = this;
      this.api
        .notifyNum("1", {
          isRead: 0,
          type: 0,
          offset: 0,
          limit: 99
        })
        .then(res => {
          this.hasNews = !this.hasNews;
          if (res.total > 0) {
            this.newsTotal = res.total;
          } else {
            this.newsTotal = 0;
          }
          if (res.rows && res.rows.length > 0) {
            this.noticeArr = res.rows;
          } else {
            this.noticeArr = [];
          }
        });
    },
    // 退出
    logout(command) {
      if (command === "b") {
        this.api.logout({}).then(res => {
          if (res.code == "0") {
            localStorage.clear();
            sessionStorage.clear();
            // 设置登陆状态
            this.setIsLogin(false);
            this.unloginVisible = true;
            this.$store.commit("setUser", {});
            this.$store.commit("setRole", "");
            this.getNavMenu();
            // 登出跳回首页
            this.$router.push("/homePage");
          } else {
            this.unloginVisible = false;
          }
        });
      } else if (command === "c") {
        this.unloginVisible = true;
        this.getNavMenu();
        this.setIsLogin(false);
      } else {
        this.$router.push(command);
      }
    },
    showMenu() {
      this.showMobileChildMenu = !this.showMobileChildMenu;
    },
    noticeHandler(item) {
      //this.removeNews(item)
      let id = item.projectId;
      if ("1" == this.role) {
        //设计师
        this.$router.push("/designerData/");
      } else {
        this.$router.push({
          //客户
          path: "/itemInformation",
          query: { id: id }
        });
      }
    },
    removeNews(item) {
      let newsId = item.id;
      this.api.returnNewsId({ id: newsId }).then(res => {
        if (res.code == 0) {
          this.newsTotal = this.newsTotal - 1;
          // for(var i=0;i<=this.noticeArr.length-1;i++){
          //   if(this.noticeArr[i].id==item.id){
          //      this.noticeArr.splice(i,1);
          //      --i;
          //   }
          // }
          this.noticeArr = this.noticeArr.filter(newsitem => {
            return newsitem.id != newsId;
          });
          // return this.noticeArr
        }
      });
    },
    //去了解合筑页面
    goUnderstandCoop() {
      const { href } = this.$router.resolve({
        path: "/understandCoop"
      });
      window.open(href, "_blank");
    },
    openLineService() {
      // const s = document.createElement("script");
      // s.type = "text/javascript";
      // s.src = "https://hm.baidu.com/hm.js?391f646231decf9304749ced3f775fff";
      // s.id = "hello";
      // var s1 = document.getElementsByTagName("script")[0];
      // s1.parentNode.insertBefore(s, s1);
      // document.head.appendChild(s);
      window.open("https://cschat-ccs.aliyun.com/index.htm?tntInstId=_1I7tqYq&scene=SCE00004459#/", "_blank");
    },
    toMessage() {
      if (this.role == 1) {
        // 设计师
        this.$router.push("/message");
      } else {
        // 客户
        // alert("开发中")
        this.$router.push("/customerMessage");
      }
    },
    //显示联想搜索框
    showAssSearch() {
      if (this.searchCont) {
        this.isAss = true;
      } else {
        this.isAss = false;
      }
    },
    //关闭联想
    hiddenAss() {
      this.isAss = false;
    },
    //跳转搜索
    skipSearch(val) {
      this.hiddenAss();
      if (val == 1) {
        this.$router.push({
          path: "SearchDesigners",
          query: { case: this.searchCont }
        });
      } else if (val == 2) {
        this.$router.push({
          path: "CheckCase",
          query: { case: this.searchCont }
        });
      }
    }
  },
  computed: {
    auditStateNum() {
      return this.$store.getters.getAuditState;
    }
  },
  created() {
    // 监听兄弟组件
    let self = this;
    // 绑定之前先解绑事件，以免造成事件多次触发
    Bus.$off("loginBox");
    Bus.$on("loginBox", function(msg) {
      // 调用登陆框
      self.showLogin();
      self.logout("c");
    });
    // 刷新头部
    Bus.$off("refreshHeader");
    Bus.$on("refreshHeader", function(msg) {
      // 设置角色信息、个人中心、个人主页信息
      self.setPresonMessage();
    });
  },
  mounted() {
    // 设置角色信息、个人中心、个人主页信息
    let userInfo = sessionStorage.getItem("userInfo") || localStorage.getItem("userInfo");
    //3认证通过 2未认证
    // if(userInfo){
    //   this.isAuditState=1
    // }else
    // 0 认证通过 1未通过
     if(userInfo&&JSON.parse(userInfo).auditState!=3){
      this.isAuditState=1
    } else if(userInfo&&JSON.parse(userInfo).auditState==3){
      this.isAuditState=0
    }else {
      this.isAuditState=0
    }
    this.setPresonMessage();
  }
};
</script>

<style lang="less" scoped>
.logo {
  height: 2.2rem;
  vertical-align: middle;
  margin-top: -8px;
  margin-left: 1rem;
}
.navbar {
  background: #23242a;
}
.home-page .navbar {
  background: transparent;
}
.ass-search {
  position: absolute;
  top: 3rem;
  left: 0;
  z-index: 100;
  button {
    margin: 0;
    border: 1px solid #e6e6e6;
    color: #aaaaaa !important;
    white-space: nowrap;
    padding-left: 0;
    i {
      padding-left: 0.8rem;
      padding-right: 0.8rem;
      font-size: 1.2rem;
    }
  }
}
</style>
<style lang="less">
.header .navbar:not(.top-nav-collapse) {
  box-shadow: none;
}
.item-padding {
  a {
    padding-right: 0 !important;
  }
}
.nav-margin {
  margin-left: 2rem !important;
}
@media (max-width: 990px) {
  .nav-margin {
    margin-left: auto !important;
  }
  .hidden-item {
    display: none;
  }
}
.header{
 .danger, .badge-danger {
      background-color: #ff3547!important;
      color: #fff!important;
  }
}

</style>
