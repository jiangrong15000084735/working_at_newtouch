<template>
  <mdb-container class="success">
      <mdb-col>
        <div id='obj' class="succ-bg" v-html="obj.context"></div>
        <!-- <img :src="obj.url"/> -->
        <div class="return">
          <mdb-btn color="primary"
            @click="$router.push('/homePage')"
          >返回</mdb-btn>
        </div>
      </mdb-col>
  </mdb-container>

</template>

<script>
export default {
  name: "success",
  data () {
    return {
      obj: {}
    }
  },
  methods: {
    init() {
      this.api.succeedCase({id: this.$route.query.id}).then(res => {
        if(!res.code){
          this.obj = res.data
        }
      })
    }
  },
  mounted () {
    this.init()
  },
  updated() {
    let imgs = document.getElementsByTagName('img')
    console.log(imgs)
    for(let i = 1; i<imgs.length-1; i++){
      imgs[i].style.width = '100%'
    }
  },
}
</script>

<style scoped lang="less">
  .success {
    margin-top: 5rem;
  }
  .return{
    width:100%;
    text-align: center;
    vertical-align: middle;
  }
 
  // .addMore{
  //   display: inline-block;
  //   line-height: 1;
  //   white-space: nowrap;
  //   cursor: pointer;
  //   background-image: linear-gradient(-95deg, #fe7e59 0%, #f5594c 100%);
  //   color: #ffffff;
  //   border:1px solid #fff;
  //   -webkit-appearance: none;
  //   text-align: center;
  //   -webkit-box-sizing: border-box;
  //   box-sizing: border-box;
  //   margin:20px auto;
  //   -webkit-transition: 0.1s;
  //   transition: 0.1s;
  //   font-weight: 500;
  //   font-size: 14px;
  //   border-radius: 20px;
  //   padding: 12px 23px
  // }
</style>
<style>
 .succ-bg p span{
        background-color: rgba(255, 255 ,255,0)!important;
  }
</style>

