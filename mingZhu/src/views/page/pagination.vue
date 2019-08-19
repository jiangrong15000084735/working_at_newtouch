<template>
  <mdb-pagination class="flex-center" style="height: auto">
    <mdb-page-item @click.native="toOnePage()">
      <mdb-icon icon="step-backward" />
    </mdb-page-item>
    <mdb-page-nav prev @click.native="pageReduce()" :class="currentPage==1?'itemDisable':''"></mdb-page-nav>
    <mdb-page-item v-for="i in btnNumList" :active="currentPage==i" :key="i" @click.native="changePage(i)">{{i}}</mdb-page-item>
    <mdb-page-nav next @click.native="pageAdd()" :class="currentPage==count?'itemDisable':''"></mdb-page-nav>
  </mdb-pagination>
</template>

<script>

export default {
  name: 'pagination',
  props: ["count"], //总页数
  data () {
    return {
      btnNum: 11,      //分页按钮数
      btnNumList: [],  //分页按钮数字列表
      currentPage: 1   //当前页
    }
  },
  methods: {
    resetList () {
      this.$emit('changePage', this.currentPage)
      this.btnNumList = []
      let maxNum = ''
      let minNum = ''
      let len = parseInt(this.btnNum / 2) + 1
      if (this.currentPage + len > this.count) {
        maxNum = this.count + 1
      } else if (this.currentPage + len < this.btnNum) {
        maxNum = this.btnNum
      } else {
        maxNum = this.currentPage + len
      }
      minNum = maxNum - this.btnNum + 1
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
    }
  },
  mounted () {
    this.resetList()
  }
}
</script>
<style lang='less' scoped>
.itemDisable {
  pointer-events: none;
  color: #aaa !important;
}
.page-item {
  width: 2.5rem;
}
</style>