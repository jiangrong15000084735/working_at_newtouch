<template>
  <div class="tipRank">
    <div class="tipWrapper text-left">
      <mdb-view class="overlay rounded z-depth-1 tipbox" style="overflow:visible;">
        <div class="border-up-empty">
          <span></span>
        </div>
        <div class="tipItem">
          <a class="dark-grey-text backTipParent">
            <mdb-icon class="pl-3 tipIcon" far icon="user" />
            <span>{{designerSerial}}</span>
          </a>
        </div>
        <div class="tipItem" v-if="processState!=1&&processState<11">
          <a class="dark-grey-text backTipParent" @click.stop="deleteItem">
            <mdb-icon class="pl-3 tipIcon" far icon="trash-alt"/>
            <span>删除</span>
          </a>
        </div>
      </mdb-view>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props:["designerSerial","deleteItem","processState"],
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.tipRank {
  .tipWrapper {
    display: block;
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 100%;
    transform: translate(-50%,10px);
    .tipbox {
      background: #fff;
      padding: 0.75rem 0;
      width: 7.25rem;
      // height: 120px;
      .tipItem {
        line-height: 2.75rem;
        .backTipParent {
          display: inline-block;
          position: relative;
          padding: 0 !important;
        }
        .tipIcon {
          font-size: 1.125rem;
          margin-right: 0.625rem;
          vertical-align: text-top;
          color: #666;
        }
        span {
          font-size: 0.875rem;
          color: #666;
        }
      }
      .tipItem:hover {
        background: #f2f2f2;
        .tipIcon {
          color: #4285f4;
        }
        span {
          color: #4285f4;
        }
      }
      .border-up-empty {
        width: 0;
        height: 0;
        border-left: 0.625rem solid transparent;
        border-right: 0.625rem solid transparent;
        // border-bottom: 10px solid #d9d9d9;
        top: -0.5625rem;
        left: 3.125rem;
        position: absolute;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
          0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
      }
      .border-up-empty span {
        display: block;
        width: 0;
        height: 0;
        border-left: 0.5rem solid transparent;
        border-right: 0.5rem solid transparent;
        border-bottom: 0.5rem solid #fff;
        position: absolute;
        left: -0.5rem;
        top: 0.125rem;
      }
    }
  }
}
</style>