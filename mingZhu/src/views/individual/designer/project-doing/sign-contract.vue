<template>
  <!-- <div class="p-body">
    <div class="body-detail">
      <DeployAgencyContract :isuploadFile="isuploadFile"></DeployAgencyContract> -->
      <!-- <div class="head-title">
        <h3>客户合同签署页</h3>
        <button type="button" class="close delete" aria-label="Close" @click="deleteBtn">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div v-if="signState==2">
        <div class="process-detail">
          <mdb-row>
            <mdb-col col="sm">
              <div class="detail-img">
                <img src="@/assets/images/my-project-black.png">
                <div class="designer-status">{{contractList.name}}</div>
                <div class="download">
                  <a
                    :href="origin+'/Mingzhu/common/sysFile/download/'+contractList.content"
                    :download="contractList.name"
                  >下载</a>
                </div>
                <div class="download">
                  <a
                  style="color: #007bff;"
                  @click="previewContract"
                  >预览</a>
                </div>
              </div>
            </mdb-col>
          </mdb-row>
        </div>
        <div class="radio">
          <span>是否同意</span>
          <form-inline style="margin-top:1rem;">
            <mdb-input type="radio" id="yes" name="yes" value="1" label="是" @input="handleRadio('1')"/>
            <mdb-input type="radio" id="no" name="yes" value="2" label="否" @input="handleRadio('2')"/>
          </form-inline>
        </div>
        <mdb-input label="您的意见:" placeholder="请输入您的意见内容" v-model="reason" v-if="radio7==2"/>
        <mdb-btn color="primary" @click="queryContractSign()">电子签署</mdb-btn>
        <P>若有疑问请联系客服</P>
      </div>
      <div class="hasSigning" v-if="signState=='1'">
        <p class="info1">您已签约</p>
        <p class="info2">请点击
          <mdb-btn @click="deleteBtn()" color="primary">返回</mdb-btn>返回客户单个项目管理页
        </p>
        <p class="info2">点击
          <mdb-btn color="primary">
            <a
              :href="origin+'/Mingzhu/common/sysFile/download/'+contractList.content"
              :download="contractList.name"
            >下载</a>
          </mdb-btn>下载合同
        </p>
      </div> -->
    <!-- </div>
  </div> -->
  <div class="p-body signContract" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="body-detail">
    <!-- <div class="head-title">
      <h3>合同签署</h3>
      <button type="button" class="close delete" aria-label="Close" @click="deleteBtn">
        <span aria-hidden="true">×</span>
      </button>
    </div> -->
    <div class="head-title">
      <h3>{{projectName}}合同签署</h3>
      <div @click="deleteBtn" class="backBtn"><img src="@/assets/images/backIcon.png"/>返回上一页</div>
    </div>
    <div class="contractBox">
       <SignContract  ref="contract" :contratName ="contratName"></SignContract>
    </div>
    <!-- <div class="deplog-agency-contract-detail">
      <div v-if="signState==2">
        <div class="process-detail">
          <mdb-row>
            <mdb-col col="sm">
              <div class="detail-img">
                <img src="@/assets/images/my-project-black.png">
                <div class="designer-status">{{contractList.name}}</div>
                <div class="download">
                  <a
                    :href="origin+'/Mingzhu/common/sysFile/download/'+contractList.content"
                    :download="contractList.name"
                  >下载</a>
                  <span class="preview-contract" @click.stop="previewContract">预览</span>
                </div>
              </div>
            </mdb-col>
          </mdb-row>
        </div>
        <div class="radio">
          <span>是否同意</span>
          <form-inline style="margin-top:1rem;">
            <mdb-input
              type="radio"
              id="yes"
              name="yes"
              value="1"
              label="是"
              @change="handleRadio('1')"
            />
            <mdb-input
              type="radio"
              id="no"
              name="yes"
              value="2"
              label="否"
              @change="handleRadio('2')"
            />
          </form-inline>
        </div>
        <mdb-input label="您的意见:" placeholder="请输入您的意见内容" v-model="reason" v-if="radio7==2"/>
        <mdb-btn color="primary" @click="queryContractSign()">电子签署</mdb-btn>
      </div>
      <div class="hasSigning" v-if="signState=='1'&&isAgree!=null">
        <p class="info1" v-if="isAgree==1">您已签约</p>
        <p class="info1" v-if="isAgree==2">您已拒绝签约</p>
        <p class="info2">
          请点击
          <mdb-btn color="primary" @click="signState=false">返回</mdb-btn>合同列表
        </p>
        <p class="info2">
          点击
          <mdb-btn color="primary">
            <a
              :href="origin+'/Mingzhu/common/sysFile/download/'+contractList.content"
              :download="contractList.name"
            >下载</a>
          </mdb-btn>下载合同
          <mdb-btn color="primary" @click="previewContract">预览</mdb-btn>查看合同
        </p>
      </div>
      <div v-if="!signState" class="clearfix">
        <div v-if="lists&&lists.length>0">
          <div
            class="detail-img contract fl px-3"
            v-for="item in lists"
            :key="item.id"
            @click="go(item.id)"
          >
            <img src="@/assets/images/assinment-icon2.png">
            <div class="img-name">{{item.name}}</div>
          </div>
        </div>
        <div v-else class="process-title" style="font-weight:600;">暂无合同</div>
        
      </div>
    </div> -->
  </div>
</div>
</template>
<script>
    import SignContract from "@/views/individual/designer/project-doing/signComponents"
    let Base64=require('js-base64').Base64
// import DeployAgencyContract from "@/views/individual/projectManagement/deployAgencyContract"; //签署代理合同
export default {
  // components:{
  //   DeployAgencyContract
  // },
  components: { SignContract },
  data() {
    return {
      content: "",
      radio7: "",
      signDetail: "",
      contractList: {},
      signState: null,
      origin: "",
      reason: "",
      lists: "",
      projectid: "",
      isAgree: null,
      fileList: [],
      actives: 1,
      contentShow:"请上传招标代理服务支付凭证",
      contratName:1,
      fullscreenLoading:false,
      projectName:''
    };
  },
  created() {
    this.origin = location.origin;
  },
  methods: {
    deleteBtn() {
      this.$router.go(-1);
    },
    handleRadio(val) {
      this.radio7 = val;
    },
    queryContractDetail() {
      this.api
        .queryContractDetail({
          contractId: this.projectid
        })
        .then(res => {
          if (res.code === 0) {
            this.contractList = res.data.ContractDetail;
            this.signState = res.data.signState;
            if (res.data.signDetail) {
              this.isAgree = res.data.signDetail.status;
              
            }
          }
        });
    },
    queryContractSign() {
      if (!this.radio7) {
        this.$message("请选择是否签署合同。");
        return;
      } else if (this.radio7 == 2 && this.reason == "") {
        this.$message("请输入拒绝原因！");
      } else if (this.radio7 == 2 || this.radio7 == 1) {
        this.api
          .queryContractSign({
            contractId: this.projectid,
            status: this.radio7,
            content: this.reason
          })
          .then(res => {
            this.$message(res.msg);
            if (res.code == 0) {
              this.queryContractDetail();
            }
          });
      }
    },
    //合同列表
    queryContractList() {
      this.fullscreenLoading = true
      this.api
        .queryContractList({
          projectid: this.$route.query.id,
          name:1

        })
        .then(res => {
          this.fullscreenLoading = false
          this.lists = res.data;
        });
    },
    go(id) {
      this.projectid = id;
      this.queryContractDetail();
    },
    // 预览
    previewContract() {
      const { href } = this.$router.resolve({
        name: "pdf",
        query: {
          url: Base64.encode(
            this.origin +
              "/Mingzhu/common/sysFile/download/" +
              this.contractList.content
          )
        }
      });
      window.open(href, "_blank");
    },
    successBack() {
      this.queryContractList();
    }
  },

  mounted() {
    // this.queryContractList();
    this.projectName = Base64.decode(this.$route.query.pro)
  }
};
</script>
<style lang='less' scoped>
@media only screen and (min-width: 1600px) {
  .signContract {
    width: 1500px!important;
    // margin: 5.25rem auto 1.25rem !important;
  }
}
.p-body.signContract {
  width: 1000px;
  background-color: #f5f5f5;
  margin: auto;
  // min-height: 400px;
  // overflow: hidden;
  text-align: center;
  .contractBox{
    width: 90%;
    margin: auto;
  }
  .body-detail {
    background-color: #fff;
    overflow: hidden;
    min-height: 25rem;
    // margin: 5.25rem 0 1.25rem;
    padding: 5px;
    .head-title {
      position: relative;
      margin: 84px 0 35px 0;
      text-align: left;
      border-bottom: 1px dotted #efefef;
      h3 {
        padding-bottom: 28px;
        font-size: 16px;
        color: #000000;
        font-weight:bold;
        display: inline-block;
      }
      .backBtn {
        cursor: pointer;
        color: #4285f4;
        font-size: 14px;
        display: inline-block;
        margin-left: 28px;
        img{
          vertical-align: middle;
          margin-right: 3px;
        }
      }
    }
    .process-name {
      text-align: left;
      padding: 1.25rem 0;
      font-size: 1.75rem;
      color: #333333;
      border-bottom: 0.5px solid #e0e0e0;
    }
    .process-detail {
      width: 100%;
      overflow: hidden;
      text-align: left;
      margin-top: 2.5rem;
      margin-bottom: 5rem;
      .detail-img {
        margin: 1.25rem;
        display: inline-block;
        text-align: center;
        position: relative;
      }
      .detail-img img {
        width: 3.75rem;
        height: 3.75rem;
      }
    }
    .radio {
      text-align: left;
      margin-bottom: 1.25rem;
      span {
        margin-right: 1.25rem;
      }
    }
    .input {
      margin-bottom: 1.25rem;
    }
  }
  .upload-demo {
    text-align: left;
    line-height: 2.5rem;
    position: relative;
    font-size: 0.875rem;
  }
}
.hasSigning {
  padding: 2.5rem 0;
  text-align: center;
  .info1 {
    font-size: 1.25rem;
    font-weight: 700;
  }
  .info2 {
    font-size: 1.25rem;
    margin-top: 1.25rem;
    span {
      display: inline-block;
      width: 10%;
      height: 2.5rem;
      line-height: 2.5rem;
      border-radius: 1.25rem;
      background: #f2cf8d;
      cursor: pointer;
      color: #333333;
    }
    a {
      color: #ffffff;
      text-decoration: none;
      // display: inline-block;
      // width: 10%;
      // height: 2.5rem;
      // line-height: 2.5rem;
      // border-radius: 1.25rem;
      // background: #f2cf8d;
      cursor: pointer;
    }
  }
}
</style>