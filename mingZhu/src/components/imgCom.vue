<template>
  <div class="imgCom">
    <div>
      <div class="detailImg"
      :style="{margin:marginStr}"
      >
          <div class="detailImgItem">
            <img src="@/assets/images/assinment-icon2.png">
            <!-- <img class="imgDelete" @click="removeManuFile(item.id)" src="@/assets/images/imgDel.png"/> -->
          </div>
        <div class="img-name">
          <div class="nameDiv">
            {{fileName}}
          </div>
        </div>
        <div class="download">
          <a class="delDiv" :href="origin+'/Mingzhu/common/sysFile/download/'+filePath+'/'+fileName"
            >下载</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  // props:["list"],
  props: {
    // listItem:{
    //   type:Object,
    //   default:{}
    // },
    fileName:{
      type:String,
      default:''
    },
    filePath:{
      type:String,
      default:''
    },
    marginStr:{
      type:String,
      default:'0 42px 42px 0'
    }
  },
  data() {
    return {
      origin:location.origin
    }
  },
  mounted(){
    this.name = this.btnName
  },
  methods:{
  }
}
</script>

<style lang="less" scoped>
.imgCom{
  text-align: left;
  .nodata{
    color: #999;
    font-size: 24px;
    margin-top: 30px;
    margin-bottom: 42px;
  }
  .detailImg{
    text-align: center;
    width: 146px;
    height: 160px;
    border: 1px solid #efefef;
    border-radius: 4px;
    display: inline-block;
    // margin: 0 42px 42px 0;
    .detailImgItem{
      padding-top: 10px;
    }
    .nameDiv{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #999;
      font-size: 14px;
      padding: 0 10px;
    }
    .delDiv{
      padding: 7px 0 15px!important;
      display: inherit;
      color: #4285f4;
      font-size: 14px;
    }
    .delDiv:hover{
      text-decoration: underline;
    }
  }
}
</style>