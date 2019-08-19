<template>
  <mdb-pagination color="dark" class="flex-center" style="height: auto;margin: 2.5rem 0" v-if="count>1">
    <mdb-page-item @click.native="toOnePage()">
      <mdb-icon icon="step-backward" />
    </mdb-page-item>
    <mdb-page-item @click.native="pageReduce()" :class="currentPage==1?'itemDisable':''"><mdb-icon icon="angle-double-left" /></mdb-page-item>
    <mdb-page-item v-for="i in btnNumList" :active="currentPage==i" :key="i" @click.native="changePage(i)" style="text-align: center;">{{i}}</mdb-page-item>
    <mdb-page-item @click.native="pageAdd()" :class="currentPage==count?'itemDisable':''"><mdb-icon icon="angle-double-right" /></mdb-page-item>
    <mdb-page-item @click.native="toLastPage()" v-show="lastBtn">
      <mdb-icon icon="step-forward" />
    </mdb-page-item>
  </mdb-pagination>
</template>

<script>

export default {
  name: 'pagination',
  // props: ["total", "pageSize"], //总页数
  props: {
    total: Number,
    pageSize: Number,
    curPage: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      btnNum: 11,      //分页按钮数
      count: 0,
      btnNumList: [],  //分页按钮数字列表
      // currentPage: 1,   //当前页
      lastBtn: false //默认不显示跳到末页按钮
    }
  },
  watch: {
    total (curVal, oldVal) {
      console.log('重置')
      this.resetList('reset')
    }
  },
  methods: {
    resetList (val) {
      if (val === 'reset') this.currentPage = this.curPage
      this.count = Math.ceil(this.total / this.pageSize)
      this.$emit('changePage', this.currentPage)
      this.btnNumList = []
      let minNum = '' //分页起始值
      let maxNum = '' //分页结束值
      if (this.count < this.btnNum) {
        minNum = 1
        maxNum = this.count + 1
      } else {
        let len = parseInt(this.btnNum / 2) + 1 //分页中间值到起始的长度
        if (this.currentPage + len > this.count) {
          maxNum = this.count + 1
        } else if (this.currentPage + len < this.btnNum) {
          maxNum = this.btnNum
        } else {
          maxNum = this.currentPage + len
        }
        minNum = maxNum - this.btnNum + 1
      }
      // console.log(this.currentPage)
      // console.log(this.count)
      // 如果点击到最后一页，隐藏跳到最后一页按钮
      // if (this.currentPage == this.count) {
      //   this.lastBtn = false;
      // } else {
      //   this.lastBtn = true;
      // }
      for (let index = minNum; index < maxNum; index++) {
        this.btnNumList.push(index)
      }
    },
    changePage (pageNum) {
      this.currentPage = pageNum
      this.resetList()
    },
    pageReduce () {
      this.currentPage--
      this.resetList()
    },
    pageAdd () {
      this.currentPage++
      this.resetList()
    },
    toOnePage () {
      this.currentPage = 1
      this.resetList()
    },
    toLastPage() {
      this.currentPage = this.count
      this.resetList()
    }
  },
  created () {
    this.currentPage = this.curPage
  },
  mounted () {
    this.resetList()
  }
}
</script>
<style lang='less' scope>
.itemDisable {
  pointer-events: none;
  color: #aaa !important;
}
// .page-item {
//   width: 2.5rem;
// }

// .item-li:first-child{
//     padding: 6px 0 !important;
// }
</style>

