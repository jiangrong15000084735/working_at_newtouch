<template>
  <div>
    <div class="register-title" style="font-size: 14px;word-break: break-all;">{{curHref}}</div>
    <div class="register-title" style="font-size: 14px;word-break: break-all;">{{code}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    // 获取地址栏参数
    getQueryString (key) {
      // let after = window.location.hash.split("?")[1];
      // if (after){
      //   let reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
      //   let r = after.match(reg);
      //   if (r != null) {
      //     return  decodeURIComponent(r[2]);
      //   } else {
      //     return null;
      //   }
      // }
      let after = window.location.search;
      if (after && after.indexOf("?") === -1) return null; //如果url中没有传参直接返回空
      //key存在先通过search取值如果取不到就通过hash来取
      after = after.substr(1) || window.location.hash.split("?")[1];
      if (after) {
        let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        let r = after.match(reg);
        if (r != null) {
          return decodeURIComponent(r[2]);
        } else {
          return null;
        }
      }
    },
    handleScroll (e) {
      console.log(e)
    }
  },
  created () {
    // 获取当前地址
    this.curHref = window.location.href
    // 获取地址栏参数
    this.code = this.getQueryString('code');
  },
  mounted () {
    window.addEventListener('mousewheel',this.handleScroll,false);
  }
}
</script>

