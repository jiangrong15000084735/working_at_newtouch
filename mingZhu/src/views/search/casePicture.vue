<template>
  <mdb-container fluid class="casePicture mx-0 px-0" style='height:100%;overflow:hidden;'>
    <div class="row" style='height:100%'>
      <!-- 大图 -->
      <div class="col-md-9 case" style='
        overflow:hidden;
        position:relative;
        height:100%;
        background:#000;
        margin:0;
        padding:0;
        '>
          <div class="top">
            <div class="top-view" style=" padding: 20px 30px;">
              <h1>{{caseInfo.imageName}}</h1>
            </div>
          </div>
          <div class="case-left" @mouseover="leftOver" @mouseout="leftOver">
            <i @click="pre" class="btn btn-left" :class="isLeftBtnOver===true?'active-left':'noactive-left'"></i>
          </div>
          <mdb-row style="height:100%;">
            <mdb-col col="12" class="case-warp-img align-self-center" style="overflow:hidden;height:100%;">
              <div class="case-img-warp" style="width:100%; height:100%;">
                <div class="box"> 
                  <div class="case-img-inner"  v-for='(item,index) in information' :key="index">
                       <img class="case-img" :class="isBigImg?'zoomImg':'smallImg'" :src='item.imageUrl' alt="First slide" v-show="currentId ===index">
                  </div>
                </div>
              </div>
            </mdb-col>
          </mdb-row>
          <div class="case-right" @mouseover="rightOver" @mouseout="rightOver">
              <i @click="next" class="btn btn-right" :class="isRightBtnOver===true?'active-right':'noactive-right'"></i>
          </div>
          <div class="bottom">
            <div class="bottom-view clearfix" style=" padding: 20px 30px;">
              <div class="fl bottom-view-left">
                <span>{{currentId+1}}/{{information.length}}</span>
                <span @click="zoomImg"><span class="zoom-icon"><mdb-icon icon="search-plus" /></span>放大</span>
                <span>|</span>
                <span><a :href="caseInfo.imageUrl" target="_blank" style="color:#ffffff;">原始尺寸 </a></span>
              </div>
              <div class="fr bottom-view-right">
                <span @click="saveImg"><span class="save-icon"><mdb-icon icon="camera" /></span>保存图片</span>
              </div>
            </div>
          </div>
      </div>
      <!-- 列表 -->
      <div class="col-md-3"  style="height:100%;margin-top:1rem;padding-bottom:1rem;overflow-y:auto;">
          <div class="propDesign picturetitle clearfix"  style="margin-bottom:1rem;margin-right:1rem;"  v-for='(item,index) in information' :key="index" @click="viewCaseDetials(`${item.id}`)">
              <img :src='item.imageUrl' style="width:100px;height:100px;" class="thumbnailsimg fl"/>
              <div class="lefttit" style="margin-left:100px;">
                <p class="case-con">{{item.imageName}}</p>
              </div>
          </div> 
      </div>
    </div>
  </mdb-container>
</template>
<script>
export default {
    name:'casePicture',
    data(){
        return{
         caseId:'',
         name:'',
         information:[],
         modal:true,
         currentId:0,
         caseInfo:"",
         isLeftBtnOver:false,
         isRightBtnOver:false,
         isBigImg:false,
         userId:"",
         role:"",
        }
    },
    methods:{
      leftOver(){
        this.isRightBtnOver = !this.isRightBtnOver
      },
      rightOver(){
        this.isLeftBtnOver = !this.isLeftBtnOver
      },
      zoomImg(){
        this.isBigImg = !this.isBigImg
      },
      saveImg(){
        this.userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
        this.role = localStorage.getItem("role") || sessionStorage.getItem("role");
        if(this.userId&&this.role==0){
          let filePath= this.caseInfo.fileName
          console.log('/Mingzhu/common/sysFile/download/' + filePath)
          location.href = '/Mingzhu/common/sysFile/download/' + filePath
        }else{
            if(!this.userId){
                this.$message("没有登陆，不能下载图片");
            }
            if(this.role!=0){
                this.$message("不是客户，不能下载图片");
            }
        }
      },
      getPicture(){
       this.api.getCasePic({id:this.caseId,pictureName:this.name}).then(res=>{
            if(res.code==0){
              this.information=res.data
              for(let i=0;i<this.information.length;i++){
                if(this.information[i].type==="1"){
                  this.currentId=i
                  this.caseInfo = this.information[i]
                  break;
                }
              }
            }
        })
      },  
      getParmas(){
        this.caseId=this.$route.query.id;
        this.name=this.$route.query.name;
      },
      pre(){
        if(this.currentId<=0){
          this.currentId = this.information.length-1
        }else{
          this.currentId=this.currentId-1
        }
        this.caseInfo = this.information[this.currentId]
      },
      next(){
        if(this.currentId>=this.information.length-1){
          this.currentId=0
        }else{
          this.currentId= this.currentId+1
        }
        this.caseInfo = this.information[this.currentId]
      },
      viewCaseDetials(id){
        this.$router.push({
          path: "/CaseDetails",
          query:{caseId:id}
        });
      }
    },
    mounted(){
        this.getParmas();
        this.getPicture();
    },
    
    beforeDestroy(){
      clearInterval(this.time)
    }
}
</script>
<style lang="less" scoped>
.top,.bottom{
  display: none;
  height: 20%;
  width: 100%;
  position: absolute;
  left: 0;
  z-index: 10;
  color: white;
  font-size: 15px;
  line-height: 1.4em;
  .top-view,.bottom-view{
   
  }
}
.top{
  top: 0;
  background:  linear-gradient( top,rgba(0,0,0,1) 0%,rgba(255,255,255,0));
  background:  -moz-linear-gradient( top,rgba(0,0,0,1) 0%,rgba(255,255,255,0));
  background:  -webkit-linear-gradient( top,rgba(0,0,0,1) 0%,rgba(255,255,255,0));
  background:  -o-linear-gradient( top,rgba(0,0,0,1) 0%,rgba(255,255,255,0));
  .top-view{
    font-size:1.5rem;
    font-weight: 600;
  }
}
.bottom{
  bottom: 0;
  background:  linear-gradient( bottom,rgba(0,0,0,1) 0%,rgba(255,255,255,0));
  background:  -moz-linear-gradient( bottom,rgba(0,0,0,1) 0%,rgba(255,255,255,0));
  background:  -webkit-linear-gradient( bottom,rgba(0,0,0,1) 0%,rgba(255,255,255,0));
  background:  -o-linear-gradient( bottom,rgba(0,0,0,1) 0%,rgba(255,255,255,0));
  .bottom-view{
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .bottom-view-left{
    width: 50%;
    cursor: pointer;
    span{
      margin-right: 15px;
      .zoom-icon{
        margin-right: 5px;
      }
    }
  }
  .bottom-view-right{
    text-align: right;
      width: 50%;
     cursor: pointer;
    .save-icon{
      margin-right: 5px;
    }
  }
}

.case:hover .top,.case:hover .bottom{
  display: block;
}

.case-right,.case-left{
  position: absolute;
  top: 0;
  z-index: 5;
  width: 30%;
  height: calc(100% - 100px);
  
  .btn{
    display: block;
    background: url("../../assets/images/case-icon.png") no-repeat;
    height: 5.8125rem;
    width: 2.75rem;
    position: absolute;
    top: 50%;
    margin-top: -1.4375rem;
  }
  .btn-left{
    left:0;
    
  }
  .btn-right{
    right: 0;
   
  }
  
}

.noactive-left{
  background-position: 26px -279px !important;
}
.active-left{
  background-position: 26px -186px !important;
}

.noactive-right{
  background-position: 17px -79px !important;
}
.active-right{
  background-position: 17px 13px !important;
}
.case-right{
  padding-left: 20px;
  text-align: right;
  right: 0;
}
.case-left{
  padding-right: 20px;
  text-align: left;
  left: 0;
}

.case-img-warp{
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  .box{
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    transition: left 0.5s;
    .case-img-inner{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
     
      img{
        margin: 0 auto;
        vertical-align: middle;
        transition: all 2s;
      }
      .smallImg{
        max-width: 65%;
        max-height: 100%;
      }
      .zoomImg{
        height: 100%;
        width: 100%
      }
    }
  }
}
.btn{
  display: block;
  height: 5.8125rem;
  width: 2.75rem;
  cursor: pointer;
}

.thumbnailsimg{
  margin-right:1rem;
}
.case-con{
  word-break:break-all;
}
.propDesign{
  cursor: pointer;
}
</style>


