<template>
  <div class="bodys">
    <headerPart></headerPart>
    <div class="body">
        <div class="step-box">
          <Stepper :activeIndex="auditStateNum" :landMarkList="progressStep"/>
        </div>
      <!-- <div class="step-box">
          <ul class="step-img">
            <li class="round round1 on" v-if="auditState > 0 || auditState === 0 ">
              <span ><img src="@/assets/images/icon-ok.png"></span>
            </li>
            <li class="round round1" v-else>
              <span >1</span>
            </li>
            <li v-if="auditState > 1 || auditState === 1 " class="line-on"></li>
            <li v-else></li>
            <li class="round round2 on" v-if="auditState > 1 || auditState === 1 ">
              <span ><img src="@/assets/images/icon-ok.png"></span>
            </li>
            <li class="round round2" v-else>
              <span >2</span>
            </li>
            <li v-if="auditState > 2 || auditState === 2 " class="line-on"></li>
            <li v-else></li>
            <li class="round round3 on" v-if="auditState > 2 || auditState === 2 ">
              <span ><img src="@/assets/images/icon-ok.png"></span>
            </li>
            <li class="round round3" v-else>
              <span >3</span>
            </li>
            <li v-if="auditState > 3 || auditState === 3 " class="line-on"></li>
            <li v-else></li>
            <li class="round round4 on" v-if="auditState > 3 || auditState === 3 ">
              <span ><img src="@/assets/images/icon-ok.png"></span>
            </li>
            <li class="round round4" v-else>
              <span >4</span>
            </li>
          </ul>
          <ul class="text-box">
            <li class="text">注册成功</li>
            <li class="text">填写验证资料</li>
            <li class="text">提交验证</li>
            <li class="text">验证成功</li>
          </ul>
        </div> -->
      <!-- <div class="progress">
        <el-steps
          :active="auditState"
          align-center
          finish-status="success"
        >
          <el-step title="注册成功"></el-step>
          <el-step title="填写验证资料"></el-step>
          <el-step title="提交验证"></el-step>
          <el-step title="验证成功"></el-step>
        </el-steps>
      </div> -->
      <div class="icon-text">
        <div class="operation">已成功提交审核资料，请等待审核结果</div>
        <!-- <div>您可以关注公众号绑定微信号，第一时间掌握合筑最新资讯</div> -->
        <div>关注合筑空间微信公众号，第一时间获取最新资讯与消息提醒</div>
        </div>
      <div class="middle">
        <div class="wechat-img">
          <img src="@/assets/images/publicAddress.png">
        </div>
        <div class="detail">合筑空间公众号</div>
      </div>
      <div class="bottom">
        <div class="operation">现在您可以进行如下操作</div>
        <div
          class="operation-designer justify-content-md-center"
          v-if="type==1"
        >
          <!-- <div class="operation-box">
            <div class="box-img"  @click="go('taskHall')">
              <img src="@/assets/images/big-add (8).png">
            </div>
            <div
              class="box-detail"
              @click="go('taskHall')"
            >查看、关注平台项目</div>
          </div> -->
          <!-- <div class="operation-box">
            <div class="box-img" @click="go('designerData')">
              <img src="@/assets/images/big-add (7).png">
            </div>
            <div
              class="box-detail"
              @click="go('designerData')"
            >进入项目中心</div>
          </div> -->
          <div class="operation-box" @click="go('CommonProblem')">
            <div class="box-img">
              <img src="@/assets/images/big-add (5).png">
            </div>
            <div
              class="box-detail"
            >查看常见问题</div>
          </div>
        </div>
        <div
          class="operation-customer justify-content-md-center"
          style="display:flex;"
          v-if="type==0"
        >
          <!-- <div class="operation-box">
            <div class="box-img"  @click="go('CommissionedDesign')">
              <img src="@/assets/images/big-add (8).png">
            </div>
            <div
              class="box-detail"
              @click="go('CommissionedDesign')"
            >提交项目需求</div>
          </div> -->
          <!-- <div class="operation-box">
            <div class="box-img" @click="go('customerData')">
              <img src="@/assets/images/big-add (7).png">
            </div>
            <div
              class="box-detail"
              @click="go('customerData')"
            >进入项目中心</div>
          </div> -->
          <div class="operation-box"  @click="go('SearchDesigners')">
            <div class="box-img">
              <img src="@/assets/images/big-add (5).png">
            </div>
            <div
              class="box-detail"
            >查找建筑师</div>
          </div>
          <div class="operation-box"  @click="go('CheckCase')">
            <div class="box-img">
              <img src="@/assets/images/select-project.png">
            </div>
            <div
              class="box-detail"
            >查看作品</div>
          </div>
          <div class="operation-box" @click="go('CommonProblem')">
            <div class="box-img">
              <img src="@/assets/images/big-add (4).png">
            </div>
            <div
              class="box-detail"
            >查看常见问题</div>
          </div>
        </div>
      </div>
      <div class="clentPhone">
        <p>客服邮箱：sur@coolarch.net / 客服热线：400-088-0000</p>
        <p>Copyright © 2000-2018 COOLARCH.All Rights Reserved.ICP备100000000号-2</p>
      </div>
    </div>
  </div>

</template>

<script>
import headerPart from '@/components/header.vue'
import Stepper from "@/components/Stepper"
import { mapMutations } from "vuex";
export default {
  components: {
    headerPart,
    Stepper
  },
  computed: {
    auditStateNum() {
      return this.$store.getters.getAuditState+1;
    }
  },
  data () {
    return {
      progressStep: [
        { id: "1", name: "注册完成" },
        { id: "2", name: "填写验证资料" },
        { id: "3", name: "提交验证" },
        { id: "4", name: "通过验证" }
      ],
      // auditState: this.auditStateNum,
      type: this.$store.state.role
    }
  },
  methods: {
    go (val) {
      this.$router.push(val)
    },
    // 通过设计师id货物设计师认证状态
    getDesingerDetailByDesignerId(id) {
      this.api.getDesingerDtailByDesinerId(id).then(res => {
        this.$nextTick(() => {
          if (res.code !== 0) {
            return;
          }
          let { auditState } = res.data.designerDO;
          // 更改认证信息存储
          let userInfoLocal = sessionStorage.getItem("userInfo") || localStorage.getItem("userInfo");
          userInfoLocal=JSON.parse(userInfoLocal)
          userInfoLocal.auditState = auditState
          localStorage.setItem("userInfo", JSON.stringify(userInfoLocal))
          this.$store.commit("SetAuditState", auditState ? auditState : 0);
        });
      });
    },
    //通过客户id货物客户认证状态
    getBossInfo(id) {
      this.api.companyDetail(id).then(res => {
        if (res.code !== 0) {
          return;
        }
        let { auditState } = res.data;
        // 更改认证信息存储
        let userInfoLocal = sessionStorage.getItem("userInfo") || localStorage.getItem("userInfo");
        userInfoLocal=JSON.parse(userInfoLocal)
        userInfoLocal.auditState = auditState
        localStorage.setItem("userInfo", JSON.stringify(userInfoLocal))
        this.$store.commit("SetAuditState", auditState ? auditState : 0);
      });
    },
    // goSubmit() {
    //   //1需求2设计师
    //   if (this.type == 1) {
    //     this.$router.push("/submit");
    //   } else {
    //     this.$router.push("/designerSubmitInfo");
    //   }
    // }
  },
  mounted () {
    this.type = this.$store.state.role
    this.$store.commit('setNavScroll', true)
    let id = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    this.role = localStorage.getItem("role") || sessionStorage.getItem("role");
    if (this.role == 1) {
      this.getDesingerDetailByDesignerId({ id: id });
    } else {
      this.getBossInfo({ id: id });
    }
  }
}
</script>

<style lang="less" scoped>
.body {
  width: 70%;
  text-align: center;
  margin: auto;
  overflow: hidden;
  margin-top: 7rem;
  .progress {
    padding: 1rem 10% 0.4rem 10%;
    text-align: left;
  }
  .icon-text {
    border-top: 0.005rem solid #e0e0e0;
    padding: 1.8753rem 0;
    font-size: 1.5rem;
    color: #000000;
    .operation{
      margin-bottom: 1.25rem;
      font-size: 1.25rem;
      color: #333333;
    }
  }
  .middle {
    padding-bottom: 1.875rem;
    border-bottom: 0.005rem solid #e0e0e0;
    .wechat-img {
      margin: 0 auto 1.25rem auto;
      width: 8.25rem;
      height: 8.25rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .detail {
      font-size: 0.875rem;
      color: #666666;
    }
  }
  .bottom {
    margin-top: 1.875rem;
    overflow: hidden;
    .operation {
      margin-bottom: 1.25rem;
      font-size: 1.25rem;
      color: #333333;
    }
    .operation-designer {
      width: 100%;
      display: flex;
      // margin: 0 20%;
    }
    .operation-box {
      height: 10rem;
      width: 20%;
      float: left;
      font-size: 0.875rem;
      color: #333333;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin-bottom: 3.75rem;
      .box-img {
        cursor: pointer;
        margin: 4.16rem auto 0.75rem auto;
        height: 2.5rem;
        width: 2.5rem;
        img {
          width: 100%;
        }
      }
      .box-detail {
        cursor: pointer;
      }
    }
  }
  .operation-box:hover {
    background: #fdfdfd;
    border: 0.01rem solid #f2cd89;
  }
  .clentPhone {
    margin: 0 auto 1rem auto;
    width: 32.75rem;
    height: 2.5rem;
    //font-family: PingFangSC-Regular;
    font-size: 0.875rem;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
  }
 .step-box {
	width:43rem;
  height:6.25rem;
  margin:auto;
	margin-top:1.875rem;
}
.round span{
  font-size:1rem;
  display: inline-block;
  line-height: 3.125rem;
  overflow: hidden;
  }
.step-box ul.step-img {
	position: relative;
	list-style-type: none;
	margin:0 1.875rem;
	padding:0 0;
	width:37.3125rem;
	height:3.3125rem;
	background-image: url(../../assets/images/bg-gray.png);
	background-repeat: repeat-x;
	background-position: center;
}
.step-box ul li.round {
	position: absolute;
	top:0;
	width:3.125rem;
	height:3.125rem;
	line-height:3.125rem;
	background-color:#d5d5d5;
	border:3px solid #fff;
	border-radius: 50%;
	color:#666;
	//font-family: Arial;
	text-align: center;
	font-size:2.4rem;
}
.step-box ul li.round1 {
	left:-5px;
}
.step-box ul li.round2 {
	left:11.75rem;
}
.step-box ul li.round3 {
	left:23.8125rem;
}
.step-box ul li.round4 {
	left:35.9375rem;
}
.step-box ul li.round5 {
	left:47.875rem;
}
.step-box ul li.on {
	background-color:#4285f4;
	color:#fff;
}
.step-box ul li.on span {
	display:block;
	line-height:3.2rem;
}
.step-box ul li.line,
.step-box ul li.line-on {
	float:left;
	width: 9.5rem;
  height: 3.3125rem;
  margin-left: 2.6rem;
}
.step-box ul li.line-on {
	background-image: url(../../assets/images/bg-loading.png);
	background-repeat: repeat-x;
	background-position: center;
}

/*---------------文字区域------------------*/
.step-box ul.text-box {
	list-style-type: none;
	margin:0 auto;
	padding:0 0;
	width:43rem;
	height:3.3125rem;
}
.step-box ul li.text {
	float:left;
	width:6.25rem;
	//font-family: 'Microsoft YaHei';
	color:#666;
	font-size:1rem;
	/*margin-right:95px;	*/
	margin-top:1.25rem;
	margin:1.25rem 2.875rem 0 2.875rem;
}
.step-box ul li.text:first-child{
	margin-left:0.375rem;
}
.step-box ul li.text:last-child {
	margin-right:0;
}
}
</style>
