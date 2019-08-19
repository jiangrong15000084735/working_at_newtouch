<template>
  <mdb-container class="designer-docking-warp px-0">
    <mdb-row>
      <mdb-col md="9">
        <div v-if="finallyDesigner&&finallyDesigner.length>0">
          <mdb-row>
            <mdb-col>
              <div style="margin-bottom:28px;">对接成功的建筑师</div>
              <div 
              class="designer-img" 
              v-for="(item,index) in finallyDesigner" 
              :key="index"
              @click="goDesigner(item.designerId)"
              >
                <img :src="item.head" style="cursor:pointer;">
                <div class="designer-id">{{item.designerSerial}}</div>
              </div>
            </mdb-col>
          </mdb-row>
          <mdb-row class="mx-0">
            <mdb-col class="pl-0" style="border-bottom:1px dashed #e6e6e6;margin: 0 0 22px;">
            </mdb-col>
          </mdb-row>
        </div>
        <div v-if="invitationList&&invitationList.length>0">
          <div v-for="(item,index) in invitationList" :key="item.id">
            <div class="process-name" v-if="lunNum.indexOf('二')==-1&&invitationList.length==1&&item.round=='一'">邀请建筑师</div>
            <div class="process-name" v-if="lunNum.indexOf('二')==-1&&invitationList.length>1&&item.round=='一'">第{{item.times}}次邀请建筑师</div>
            <div class="process-name" v-if="lunNum.indexOf('二')!=-1">第{{item.round}}轮第{{item.times}}次邀请建筑师</div>
            <!-- <div class="process-name">第{{item.round}}轮第{{item.times}}次邀请设计师</div> -->
            <div class="process-detail">
              <mdb-row v-if="item.designerInvitationStatus.length==0">
                <mdb-col>
                  <div class="detail-img">您还没有提交本轮次的拟邀请建筑师名单</div>
                </mdb-col>
              </mdb-row>
              <mdb-row v-else>
                <mdb-col>
                  <div
                    class="designer-img"
                    v-for="item2 in item.designerInvitationStatus"
                    :key="item2.id"
                    @click="goDesigner(item2.designerId)"
                  >
                    <img :src="item2.head" style="cursor:pointer;">
                    <div class="designer-id">{{item2.designerSerial}}</div>
                    <div class="designer-id" :class="item2.joinRefuse=='已拒绝'?'jujueColor':item2.joinRefuse=='已接受'?'jieshouColor':''">{{item2.joinRefuse}}</div>
                  </div>
                </mdb-col>
              </mdb-row>
            </div>
            <mdb-row class="mx-0" v-if="index!=(invitationList.length-1)">
              <mdb-col class="pl-0" style="border-bottom:1px dashed #e6e6e6;margin: 0 0 1.375rem;">
              </mdb-col>
            </mdb-row>
          </div>
          <mdb-row class="mb-4" v-if="status==0">
            <mdb-col>
              <mdb-btn class="btn110_30" color="primary" @click="submit()">提交</mdb-btn>
            </mdb-col>
          </mdb-row>
        </div>
        <div v-else>
          <div class="tip">您现在可以邀请建筑师</div>
        </div>
      </mdb-col>
      <mdb-col md="3" class="clearfix">
        <div class="button-list fr">
          <div class="designer-button" @click="addpage('RecommendDesign',1)">查看推荐设计资源</div>
          <div class="designer-button" @click="addpage('SearchDesigners')">从建筑师库推选</div>
          <div class="designer-button" @click="addpage('checkCase')">查看作品案例</div>
          <div class="designer-button" @click="addpage('customerConcernDesigner')">从收藏的设计资源挑选</div>
          <div class="triangle-right0"></div>
          <div class="triangle-right1"></div>
        </div>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>
<script>
export default {
  name: "designerDocking",
  data() {
    return {
      invitationList: [],
      status: 1,
      size: "",
      modifyRequirements: 0,
      fileList: [],
      finallyDesigner: [],
      lunNum:[],
    };
  },
  methods: {
    goDesigner(id){
      let { href } = this.$router.resolve({
        name:'seniorDesignerDetails',
        query: {
          id:id
        }
      })
      window.open(href, "_blank");
    },
    qryFinallyDesigner() {
      this.api
        .qryFinallyDesigner({ projectId: this.$route.query.id })
        .then(res => {
          if (res.code == 0) {
            this.finallyDesigner = res.data;
          }
        });
    },
    getProjectStatus() {
      this.api.getProjectStatus({ id: this.$route.query.id }).then(res => {
        if (res.code == 0) {
          this.$router.push({
            path: "/projectDetial",
            query: {
              id: this.$route.query.id,
              step: res.data.status,
              t: "s"
            }
          });
        }
      });
    },
    open2() {
      this.$confirm("此操作将结束此项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.refuseAdjust();
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    refuseAdjust() {
      this.api.refuseAdjust({ projectId: this.$route.query.id }).then(res => {
        if (res.code == 1) {
          this.$message(res.msg);
        } else {
          this.go("itemInformation");
        }
      });
    },
    invitationDetail() {
      this.lunNum=[];
      this.api
        .invitationDetail({ projectId: this.$route.query.id })
        .then(res => {
          this.status = res.data.status;
          this.modifyRequirements = res.data.modifyRequirements;
          this.invitationList = res.data.invitationDetail;
          for(let i=0;i<this.invitationList.length;i++){
            this.lunNum.push(this.invitationList[i].round)
          }
          this.size = res.data.size;
        });
    },
    submit() {
      this.api
        .submitInviteList({ projectid: this.$route.query.id })
        .then(res => {
          this.$message(res.msg);
          if (res.code == 0) {
            this.invitationDetail();
            this.getProjectStatus();
          }
        });
    },
    //新开页面
    addpage(val, index) {
      let name = val;
      let num = index;
      if (index) {
        const { href } = this.$router.resolve({
          name: name,
          query: {
            id: this.$route.query.id,
            actives: num
          }
        });
        window.open(href, "_blank");
      } else {
        const { href } = this.$router.resolve({
          name: name
        });
        window.open(href, "_blank");
      }
    },
    //路由跳转
    go(val, index) {
      let name = val;
      let num = index;
      if (index) {
        this.$router.push({
          name: name,
          query: {
            id: this.$route.query.id,
            actives: num
          }
        });
      } else {
        this.$router.push({
          name: name,
          query: {
            id: this.$route.query.id
          }
        });
      }
    }
  },
  created() {
    this.invitationDetail();
    this.qryFinallyDesigner();
  }
};
</script>
<style lang="less" scoped>
.designer-docking-warp {
  
  .tip {
    padding-top: 2rem;
    font-size: 1rem;
    color: #666666;
    min-height: 4rem;
    font-weight: 600;
  }
  .process-name {
    text-align: left;
    padding: 0 0 18px;
    color: #333333;
  }
  .process-detail {
    width: 100%;
    overflow: hidden;
    text-align: left;
    margin-bottom: 0.8rem;
    .update-button {
      margin-top: 0.29rem;
      height: 1.76rem;
      width: 100%;
      border: 0.01rem solid #333333;
      display: flex;
      font-size: 0.16rem;
      align-items: center;
      justify-content: center;
      border-radius: 0.04rem;
      box-sizing: border-box;
      .update-img {
        text-align: center;
      }
    }
    .special {
      border: 0px;
      background-image: linear-gradient(-90deg, #f3daa4 6%, #f2cd89 98%);
    }
    .update-detail {
      margin-top: 0.32rem;
      font-size: 0.14rem;
      color: #ff6e0d;
    }
    .detail-img {
      cursor: pointer;
      float: left;
      text-align: center;
      position: relative;
      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }
      .designer-id {
        font-size: 0.24rem;
      }
     
      .designer-status {
        font-size: 0.14rem;
      }
    }
    .explain-title {
      font-weight: bold;
    }
    .explain-detail {
      color: #ababab;
    }
  }
  .footer-button {
    text-align: left;
    margin-top: 0.2rem;
  }
}
.button-list {
  text-align: center;
  border: 1px solid #dddddd;
  width: 10.25rem;
  margin-top: -1.875rem;
  position: relative;
  margin-right: 1.0625rem;
  .triangle-right0{
    position: absolute;
    right:-1rem;
    top: 50%;
    z-index: 5;
    transform: translateY(-50%);
    width:0;
    height:0;
    border-top: 1.0625rem solid transparent;
    border-left: 1.0625rem solid #dddddd;
    border-bottom: 1.0625rem solid transparent;
  }
  .triangle-right1{
    position: absolute;
    right:-1rem;
    top: 50%;
    z-index: 6;
    transform: translateY(-50%);
    width:0;
    height:0;
    border-top: 0.9375rem solid transparent;
    border-left: 1.0625rem solid #ffffff;
    border-bottom: 0.9375rem solid transparent;
  }
}
.designer-button {
  cursor: pointer;
  width: 100%;
  height:2.75rem;
  line-height: 2.75rem;
  text-align: center;
  font-size: 0.875rem;
}
.designer-button:hover{
  background: #f2f2f2;
  color:#5b94f4;
}
.designer-img {
  margin-right: 3.4375rem;
  margin-bottom: 1.75rem;
  display: inline-block;
  text-align: center;
  min-height: 3.75rem;
}

.designer-img img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}
.designer-id {
  font-size: 0.875rem;
}
.jujueColor{
  color:#d92804 !important;
}
.jieshouColor{
  color: #4285f4 !important;
}
</style>
