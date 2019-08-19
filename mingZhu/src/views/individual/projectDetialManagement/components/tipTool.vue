<template>
  <div class="view-box">
    <mdb-card>
      <mdb-card-body class="view-pointer">
        <div class="up-tab">
          <div class="triangle_border_up">
            <span></span>
          </div>
        </div>
        <mdb-row>
          <mdb-col
            col="4"
            v-for="item in designerArr"
            :key="item.id"
            @click.native="goDesigner(item.id)"
          >
            <img :src="item.head" class="header-img">
            <p class="designer-text">{{item.seniorDesign=="2"||item.seniorDesign=="1"?item.realName:item.designerSerial}}</p>
          </mdb-col>
        </mdb-row>
        <div style="color:#d9d9d9;margin-top:12px;">共邀请{{designerArr.length}}位建筑师</div>
      </mdb-card-body>
    </mdb-card>
  </div>
</template>
<script>
export default {
  props: ["designerArr"],
  methods: {
    goDesigner(id) {
      let { href } = this.$router.resolve({
        name: "seniorDesignerDetails",
        query: {
          id: id
        }
      });
      window.open(href, "_blank");
    }
  }
};
</script>
<style lang="less" scoped>
.view-box {
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 0;
  transform: translateY(100%);
  padding-top: 0.625rem;
  min-width: 14.375rem;
  .header-img {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
  }
  .designer-text {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #666;
  }
  .view-pointer {
    position: relative;
    /*向上*/
    .up-tab {
      position: absolute;
      left: 10%;
      top: -0.75rem;
      z-index: 10;
    }
    .triangle_border_up {
      width: 0;
      height: 0;
      border-width: 0 0.8125rem 0.8125rem;
      border-style: solid;
      border-color: transparent transparent rgba(0, 0, 0, 0.05);
      position: relative;
    }
    .triangle_border_up span {
      display: block;
      width: 0;
      height: 0;
      border-width: 0 0.75rem 0.75rem;
      border-style: solid;
      border-color: transparent transparent #fff;
      position: absolute;
      top: 0.125rem;
      left: -0.75rem;
    }
  }
}
</style>
