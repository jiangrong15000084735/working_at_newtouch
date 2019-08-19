<template>
    <div class="my-article">
            <section class="text-center mb-3">
                <mdb-row class="text-center contentWrapper">
                    <mdb-col lg="4" md="12" class="mb-lg-0 mb-4 artbox article-card" v-for="(item ,index) in articleList" :key="index">
                        <mdb-view class="overlay rounded z-depth-1 artViewBox">
                            <img :src="item.url" alt="sample photo" class="img-fluid" style="height:100%"/>
                            <a>
                            <mdb-mask waves overlay="white-slight" style="height:100%"/>
                            </a>
                        </mdb-view>
                        <mdb-card-body class="px-0 py-0 artCardBody">
                            <h4 class="font-weight-bold">{{item.title}}</h4>
                            <div class="textWrapper">
                                <p  class="grey-text comment-num">
                                    {{item.createTime.split(" ")[0]}}
                                    <!-- {{item.createTime.split(" ")[0].replace(/\//g,".")}} -->
                                    <!-- <i class="far fa-comment-dots"></i>6 Comments -->
                                </p>
                                <p>
                                    <mdb-icon far icon="eye" class="eye"/>
                                    {{item.collectedCount}}
                                </p>
                            </div>
                            <p class="grey-text artTitle" style="">{{item.describe}}</p>
                            <mdb-btn outline="primary" class="mx-0 my-0 readMore"  @click="viewArticle(`${item.id}`)">了解更多</mdb-btn>
                            <!-- <p class="read-more">
                                <span class="font-weight-bold" @click="viewArticle(`${item.id}`)">READ MORE</span>
                            </p>
                            <hr class="mt-1" style="max-width: 90px; margin: 0 auto;" > -->
                        </mdb-card-body>
                    </mdb-col>
                    <mdb-col md="12" class="text-center noarticle article-card"  v-if="articleList.length==0">
                        <el-upload
                        class="upload-demo"
                        list-type="picture-card"
                        :action="api.upload()"
                        :show-file-list="false"
                        accept=".doc,.docx,.txt,.rar,.zip"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        >
                        <div class="upAtrWrapper">
                            <p><mdb-icon class="icon-circle" icon="exclamation-circle" />您还没有上传任何文章</p>
                            <img src="@/assets/images/artUpLoad.png" style="margin-bottom:10px;" />
                            <mdb-btn class="mx-0 my-0 btn212_60" color="primary">
                                去上传文章
                            </mdb-btn>
                        </div>
                        </el-upload>
                    </mdb-col>
                    <mdb-col lg="4" md="12" class="text-center mb-lg-0 mb-4 artbox article-card"  v-if="isArticleShow&&articleList.length!=0">
                        <!-- <el-upload
                            class="avatar-uploader"
                            list-type="picture-card"
                            :action="api.upload()"
                            :show-file-list="false"
                            accept=".doc,.docx,.txt,.rar,.zip"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                        >
                            <i class="el-icon-plus">
                                <p style="font-size: 16px;line-height: 1.5;">上传文章</p>
                            </i>
                        </el-upload> -->
                        <mdb-view class="overlay rounded z-depth-1 artViewBox">
                            <el-upload
                            class="upload-demo"
                            list-type="picture-card"
                            :action="api.upload()"
                            :show-file-list="false"
                            accept=".doc,.docx,.txt,.rar,.zip"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            >
                            <div class="upAtrWrapper">
                                <img src="@/assets/images/artUpLoad.png" />
                                <mdb-btn size="sm" class="mx-0 my-0 upLoadBtnSm" color="primary">
                                    去上传文章
                                </mdb-btn>
                            </div>
                            </el-upload>
                        </mdb-view>
                        <!-- <p v-if="fileArr.length>0" class="fl">
                            <span v-for="(item,index) in fileArr" :key="index" style="margin-right:0.5rem;">{{item}}</span>
                        </p> -->
                    </mdb-col>
                </mdb-row>
                 <mdb-row class="text-center">
                    <mdb-col lg="12" md="12" class="mb-lg-0">
                        <div class="custom-pagination">
                            <pagination :total="totalCount" :pageSize="pageSize" @changePage="handleCurrentChange" v-if="totalCount !=0"></pagination>
                        </div> 
                    </mdb-col>
                 </mdb-row>
            </section>
    </div>
</template>
<script>
export default {
   name:'MyArticle',
   data(){
       return {
        pageSize: 9,
        totalCount: 0,
        currentPage:1,

        articleList:"",  //我的文章list
        articleText:"", //上传文章
        isArticleShow:false,

        userId:"",  //用户id
        role:"", //1:设计师

        fileName:"",
        
        }
   },
   mounted(){
    this.getArticleList()
   },
   methods:{
       //获取我的文章list
        getArticleList(){
            this.api.getMyArticle({
                page:this.currentPage,
                limit:this.pageSize 
            }).then(res=>{
            if(res.data.length>0){
                this.articleList = res.data
                this.totalCount = res.total
                if(this.currentPage===Math.ceil(this.totalCount/this.pageSize)){
                    this.isArticleShow = true
                }else{
                    this.isArticleShow = false
                }
            }else{
                this.isArticleShow = true
            }
        })
        },
        //查看文章详情
        viewArticle(id){
           this.$router.push({
                name: "excellentProjectDetails",
                query: {
                    id: id
                }
           })
        },
        handleAvatarSuccess(res, file) {
            this.fileName = file.name;
            this.file = res.msg;
            this.upload()
        },
        beforeAvatarUpload(file) {
            const isLt3M = file.size / 1024 / 1024 < this.$isLt10M;
            if (!isLt3M) {
                this.$message.error(`上传文件大小不能超过 ${this.$isLt10M}MB!`);
            }
            return isLt3M;
        },
        upload(){
            this.userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
            this.role = localStorage.getItem("role") || sessionStorage.getItem("role");
            if(this.userId&&this.role==1){
                this.api.upLoadArticle({
                    file:this.file,
                    fileName:this.fileName
                }).then(res=>{
                    this.$message(res.msg);
                    this.getArticleList();
                })
            }else{
                if(!this.userId){
                    this.$message("没有登陆，不能上传文章");
                }
                if(this.role!=1){
                    this.$message("不是设计师，不能上传文章");
                }
            }
        },
        //分页
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
            this.getArticleList()
        },
   },
   updated() {
    let tx = document.getElementsByClassName('artTitle');
    for(let jj=0; jj<tx.length; jj++){
      while(tx[jj].offsetHeight < tx[jj].scrollHeight){
        let ss = tx[jj].innerText;
        tx[jj].innerText = ss.substr(0,ss.length-5);
        tx[jj].innerText += `...`;
      }
    }
  },

}
</script>
<style lang="less" scoped>
.my-article{
    //font-family: Roboto,sans-serif;
    // margin-right: -15px;
    margin-left: 18px;
    .carousel-half{
        height: 50vh;
        width: 100%;
    }
    .article-card{
        margin-bottom: 48px !important;
        h4{
            font-size: 24px;
        }
        .read-more{
            width: auto;
            font-size: 12px;
            padding-top: 16px;
            span{
                cursor: pointer;
            }
        }
        .comment-num{
            font-size: 16px;
            i{
                margin: 0 4px 0 8px;
            }
        }
    }
    .el-icon-circle-plus-outline {
        transform: translateY(50%);
        .uploadIDCardTips {
        display: block;
       // font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #333333;
        margin-top: 10px;
        }
    }
    .avatar-uploader .el-upload {
        border: 0.16px dashed #d9d9d9;
        border-radius: 0.96px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        }

        .avatar-uploader .el-upload:hover {
        border-color: #409eff;
        }
        .avatar-uploader-icon {
        font-size: 4.48px;
        color: #8c939d;
        width: 28.48px;
        height: 28.48px;
        line-height: 28.48px;
        text-align: center;
        }
}
// ui样式覆盖
.my-article{
    margin-top: 10px;
    // .contentWrapper{
    //     width: 1158px;
    //     margin: auto;
    // }
    .upAtrWrapper{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height:100%;
        width: 100%;
        p{
            color:#999;
            font-size:18px;
            line-height:25px;
            padding-bottom:20px;
            .icon-circle{
                font-size:20px;
                color:#d9d9d9!important;
                padding-right:10px;
            }
        }
    }
    .noarticle{
        margin-bottom:0!important;
        transform: translateY(20px);
    }
    .artbox{
        width: 354px;
        height:458px;
        max-width: 354px;
        box-sizing: content-box;
        padding: 0 16px;
        margin-bottom: 44px!important;
    }
    .artViewBox{
        width: 354px;
        height:238px;
    }
    .artCardBody{
        overflow-y: visible;
        h4.font-weight-bold{
            color:#333;
            font-size:18px;
            // line-height: 18px;
            padding: 23px 0 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            letter-spacing:1px;
        }
        .textWrapper{
            padding-bottom:28px;
            line-height: 14px;
            p{
                display:inline-block;
                font-size: 14px;
                // line-height: 14px;
                color:#999!important;
                padding: 0 10px;
                .eye{
                    padding-right: 2px;
                }
            }
        }
        .comment-num{
            font-size: 14px;
            height: 14px;
            color:#999!important;
        }
        .artTitle{
            line-height: 24px;
            font-size: 14px;
            color: #666;
            text-align: justify;
            letter-spacing:1px;
            height:68px;
            word-break: break-all;
            // -webkit-line-clamp: 3; 
            // display: -webkit-box;  
            // -webkit-box-orient: vertical; 
            // overflow: hidden;
            // word-break: break-all;
        }
        .readMore{
            margin-top: 22px!important;
            width:110px;
            height: 30px;
            padding: 0;
            line-height: 30px;
            text-align: center;
            border: none!important;
            font-size: 16px;
            border-radius: 2px;
        }
    }
}
</style>
<style lang="less">
.my-article{
    .el-upload.el-upload--picture-card {
        background: #fff !important;
        // background: #e9e9e9 !important;
        width:354px;
        height:238px;
        border:none;
    }
    .upLoadBtn{
        margin-top: 10px!important;
        width:212px;
        height:60px;
        line-height:1;
        padding:0!important;
        font-size:18px!important;
        color:#fff!important;
    }
    .upLoadBtnSm{
        margin-top: 10px!important;
        width:110px;
        height:30px;
        line-height:1;
        padding:0!important;
        font-size:18px!important;
        color:#fff!important;
        border-radius: 4px;
    }
}

</style>

