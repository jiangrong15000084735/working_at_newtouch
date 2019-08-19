<template>
  <mdb-container class="zj-result-confirm-warp">
    <div class="zj-result-confirm">
      <div class="left">
        <div class="text-center title-auto">
          <h3 class="title">{{selectionMethod==2?'挑选作品':'专家指定排名'}}</h3>
          <img src="@/assets/images/line-icon-1.png">
        </div>
        <div v-for="(item,index) in orderList" :key="item.id" class="order-auto">
          <div class="order-text">{{item.name}}</div>
          <div class="order-into">
            <div
              class="order-head"
              v-for="(hl,num) in item.headlist"
              :key="hl.id"
              @click="selectHead(hl,index,num,item.id)"
              @mouseover="showTipRank(1,item,num,index)"
              @mouseout="showTipRank(0,item,num,index)"
            >
              <span
                v-if="!hl.currrentHead"
                :class="currrentId==hl.id&&orderId==index?'activeText':''"
              >{{num+1}}</span>
              <img
                v-if="!hl.currrentHead"
                :src="currrentId==hl.id&&orderId==index?hl.headBg2:hl.headBg1"
                class="head-bg"
              >
              <img v-if="hl.currrentHead" :src="hl.currrentHead.head" class="head-bg header-0">
              <TipRank
                v-if="hl.currrentHead&&showId==hl.id&&showOrderId==item.id"
                :deleteItem="deleteItem"
                :designerSerial="designerSerial"
                :processState="processState"
              ></TipRank>
            </div>
          </div>
        </div>
      </div>
      <div class="right" v-if="selectionMethod==2">
        <div class="text-center title-auto">
          <h3 class="title">入围作品</h3>
          <img src="@/assets/images/line-icon-2.png">
        </div>
        <mdb-row v-if="designerInterList&&designerInterList.length>0">
          <mdb-col
            md="4"
            v-for="item in designerInterList"
            :key="item.id"
            class="designer-auto my-0 px-0"
            :class="[orderHeadId==item.designerId?'activeHead':'', designerids&&designerids.indexOf(item.designerId)!=-1?'disabledHead':'']"
          >
            <img :src="item.head" class="head-img" @click="headOrder(item)">
            <div class="designer-name">{{item.designerSerial}}</div>
          </mdb-col>
        </mdb-row>
      </div>
    </div>
    <div class="btn-auto" v-if="selectionMethod==2&&processState!=1&&processState<11">
      <mdb-btn class="btn110_30" color="primary" @click="orderByBoss">确定排名</mdb-btn>
    </div>
  </mdb-container>
</template>
<script>
import TipRank from "@/views/individual/projectDetialManagement/components/tipRank";
export default {
  name: "zjResultConfirm",
  components: { TipRank },
  data() {
    return {
      showId: -1,
      showOrderId: -1,
      designerSerial: null,
      designerIndex: null,
      orderIndex: null,
      orderList: [
        {
          id: 1,
          name: "中标作品",
          headlist: []
        },
        {
          id: 2,
          name: "二等奖",
          headlist: []
        },
        {
          id: 3,
          name: "三等奖 ",
          headlist: []
        }
      ],
      designerInterList: null,
      outCircleDesigner: null,
      selectionMethod: null,  //1专家排名 //2客户排名
      // enterNum: null,
      processState: null,
      origin: "",
      designerArr: [],
      designer: null,

      currrentId: null,
      orderId: null,
      currentIndex: null,
      orderHead: null,
      orderHeadId: null,
      designerids: [],
      ranks: [],
      rankNumList: []
    };
  },
  methods: {
    deleteItem() {
      for (let i = 0; i < this.designerids.length; i++) {
        if (
          this.designerids[i] ==
          this.orderList[this.orderIndex].headlist[this.designerIndex]
            .currrentHead.designerId
        ) {
          this.designerids.splice(i, 1);
          this.ranks.splice(i, 1);
          this.orderList[this.orderIndex].headlist[
            this.designerIndex
          ].currrentHead = null;
          this.currrentId = null;
          this.orderId = null;
          return;
        }
      }
    },
    showTipRank(mark, item, num, index) {
      if (mark == 1) {
        this.orderIndex = index;
        this.designerIndex = num;
        this.showId = item.headlist[num].id;
        this.showOrderId = item.id;
        if (item.headlist[num].currrentHead) {
          this.designerSerial = item.headlist[num].currrentHead.designerSerial;
        }
      } else {
        this.showId = -1;
        this.showOrderId = -1;
        this.designerSerial = null;
      }
    },
    getDesignerInterList() {
      //模拟请求数据
      this.api.manageInCircleDesignerList({ projectId: this.$route.query.id }).then(res => {
          let index = 0;
          this.designerInterList = res.inCircleDesigner;
          this.outCircleDesigner = res.outCircleDesigner;
          this.selectionMethod = res.selectionMethod;
          if (this.designerInterList&&this.designerInterList[0].bossRank) {
            this.orderList[0].headlist = [];
            this.orderList[1].headlist = [];
            this.orderList[2].headlist = [];
            for (let k = 0; k < this.designerInterList.length; k++) {
              let item = {
                id: k + 1,
                headimg: "",
                select: false,
                headBg1: require("@/assets/images/head-bg-1.png"),
                headBg2: require("@/assets/images/head-bg-2.png"),
                currrentHead: this.designerInterList[k]
              };
              if(this.designerInterList[k].bossRank){
                this.designerids.push(this.designerInterList[k].designerId)
                if (this.designerInterList[k].bossRank == 1) {
                  this.orderList[0].headlist.push(item);
                }
                if (this.designerInterList[k].bossRank == 2) {
                  this.orderList[1].headlist.push(item);
                }
                if (this.designerInterList[k].bossRank == 3) {
                  this.orderList[2].headlist.push(item);
                }
              }
            }
          }else if(this.selectionMethod==1){
            this.orderList[0].headlist = [];
            this.orderList[1].headlist = [];
            this.orderList[2].headlist = [];
            for (let k = 0; k < this.designerInterList.length; k++) {
              let item = {
                id: k + 1,
                headimg: "",
                select: false,
                headBg1: require("@/assets/images/head-bg-1.png"),
                headBg2: require("@/assets/images/head-bg-2.png"),
                currrentHead: this.designerInterList[k]
              };
              // this.designerids.push(this.designerInterList[k].designerId)
              if (this.designerInterList[k].rank == 1) {
                this.orderList[0].headlist.push(item);
              }
              if (this.designerInterList[k].rank == 2) {
                this.orderList[1].headlist.push(item);
              }
              if (this.designerInterList[k].rank == 3) {
                this.orderList[2].headlist.push(item);
              }
            }
            console.log(this.orderList)
          }else{
            this.getRankNum();
          }
        });
    },
    selectHead(item, index, num, orderId) {
      if (this.orderHead || item.currrentHead) {
        if (item.currrentHead) {
          this.orderHead = item;
          this.orderHeadId = item.designerId;
        } else {
          this.currrentId = item.id;
          this.orderId = index;
          this.currentIndex = num;
          item.currrentHead = this.orderHead;
          this.designerids.push(this.orderHead.designerId);
          this.ranks.push(orderId);
          this.orderHead = null;
          this.orderHeadId = null;
        }
      } else {
        this.$message("请先选择设计师");
      }
    },
    headOrder(item) {
      if(this.selectionMethod==1){
        this.$message("专家已经指定排名。")
        return
      }
      if (this.processState != 1 && this.processState >= 11) {
        return;
      }
      for (let i = 0; i < this.orderList.length; i++) {
        for (let j = 0; j < this.orderList[i].headlist.length; j++) {
          if (
            this.orderList[i].headlist[j].currrentHead &&
            this.orderList[i].headlist[j].currrentHead.id == item.id
          ) {
            this.$message("该设计师已经排过，请重新选择。");
            return;
          }
        }
      }
      this.orderHead = item;
      this.orderHeadId = item.designerId;
      this.currrentId = null;
      this.orderId = null;
      this.currentIndex = null;
    },
    orderByBoss() {
      if(this.rankNumList.length<=0){
        this.$message("请等待项目经理设置入围人数")
        return
      }
      let one = [];
      let two = [];
      let three = [];
      for (let i = 0; i < this.ranks.length; i++) {
        if (this.ranks[i] == 1) {
          one.push(this.ranks[i]);
        } else if (this.ranks[i] == 2) {
          two.push(this.ranks[i]);
        } else if (this.ranks[i] == 3) {
          three.push(this.ranks[i]);
        }
      }
      if (one.length <= 0&&two.length > 0) {
        this.$message("请选择中标作品");
        return;
      }
      
      if (three.length>0 && two.length <= 0 ) {
        this.$message("请选择二等奖");
        return;
      }
      this.api.orderByBoss({
        projectid: this.$route.query.id,
        designerids: this.designerids.toString(),
        ranks: this.ranks.toString()
      }).then(res => {
        this.$message(res.msg);
        if (res.code == 0) {
          this.getDesignerInterList();
          this.seekTaskBaseInfo();
          this.$emit("switchPage")
        }
      });
    },
    getRankNum() {
      this.api.getRankNum({ projectId: this.$route.query.id }).then(res => {
        if (res.code == 0) {
          this.rankNumList = res.data;
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].rank == this.orderList[i].id) {
              for (let j = 0; j < res.data[i].rankNum; j++) {
                let item = {
                  id: j + 1,
                  headimg: "",
                  select: false,
                  headBg1: require("@/assets/images/head-bg-1.png"),
                  headBg2: require("@/assets/images/head-bg-2.png"),
                  currrentHead: null
                };
                this.orderList[i].headlist.push(item);
              }
            }
          }
        }
      });
    },
    seekTaskBaseInfo() {
      this.api.seekTaskBaseInfo(this.$route.query.id).then(res => {
        if (res.data.projectDO) {
          this.processState = res.data.projectDO.processState;
          this.getDesignerInterList();
          // if (this.processState != 1 && this.processState >= 11) {
          // } else {
          //   this.getRankNum();
          // }
        }
      });
    }
  },

  created() {
    this.origin = location.origin;
    this.seekTaskBaseInfo();
  }
};
</script>
<style lang="less" scoped>
.zj-result-confirm-warp {
  .w100 {
    width: 100%;
    margin-bottom: 1.75rem;
  }
  .zj-result-confirm {
    display: flex;
    .left {
      width: 22.1875rem;
      margin-right: 2.25rem;
      flex: 0 0 auto;
    }
    .right {
      flex: 1 0 auto;
      width: 28.5rem;
    }
  }
  .order-auto {
    min-height: 3rem;
    border: 1px solid #707070;
    margin-bottom: 1.25rem;
    padding-left: 0.9375rem;
    border-radius: 0.25rem;
    display: flex;
    justify-content: flex-start;
    .order-text {
      line-height: 3rem;
      width: 5rem;
      flex: 0 0 auto;
    }
    .order-into {
      display: flex;
      flex-wrap: wrap;
      width: 15rem;
      flex: 1 0 auto;
      .order-head {
        width: 2.5rem;
        height: 2.5rem;
        margin: 0.25rem 0.5rem 0.25rem 0;
        position: relative;
        cursor: pointer;
        span {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          line-height: 2.5rem;
          text-align: center;
          color: #a7b8d4;
          font-size: 1rem;
        }
        .activeText {
          color: #ffffff;
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
  }

  .title-auto {
    font-size: 0;
    margin-bottom: 1.5rem;
  }
  .title {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    color: #333333;
  }
  .head-bg {
    cursor: pointer;
    margin-right: 0.5rem;
  }
  .header-0{
    border: 0.125rem solid #4285f4;
  }
  .btn-auto {
    margin-bottom: 2.5rem;
  }
  .designer-auto {
    position: relative;
    margin-bottom: 1.25rem !important;
    height: 3.125rem;
    .head-img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 0.125rem solid #000000;
      position: absolute;
      bottom: 0.3125rem;
      cursor: pointer;
    }
    .designer-name {
      border: 0.125rem solid #4589f9;
      width: 8.125rem;
      height: 1.875rem;
      border-radius: 0.9375rem;
      background: #244e94;
      color: #fff;
      margin-left: 0.5rem;
      margin-top: 0.9375rem;
      padding-left: 1.25rem;
    }
  }
  .activeHead {
    .head-img {
      border: 0.125rem solid #4589f9;
    }
    .designer-name {
      background: #8bb7ff;
    }
  }
  .disabledHead {
    .head-img {
      border: 0.125rem solid #000000;
    }
    .designer-name {
      border: 0.125rem solid #000000;
      background: #525252;
      color: #797979;
    }
  }
}
</style>
