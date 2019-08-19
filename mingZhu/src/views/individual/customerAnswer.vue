<template>
  <div class="p-body">
    <div class="body-detail">
      <div class="head-title">
        <h3>项目答疑</h3>
        <div
          class="delete"
          @click="deleteBtn"
        >×</div>
      </div>
      <div class="process-name">设计师疑问</div>
      <div class="process-detail">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="detail-img">
              <img src="@/assets/images/my-project-black.png">
              <div class="designer-status">{{questionList.title}}</div>
              <div class="download">
                <a
                  :href="origin+'/Mingzhu/common/sysFile/download/'+questionList.content"
                  :download="questionList.title"
                >下载</a>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="process-name">答复</div>
      <div class="process-detail">
        <el-row :gutter="20">
          <el-col
            :span="6"
            v-for="item in answersList"
            :key="item.id"
          >
            <div class="detail-img">
              <img src="@/assets/images/my-project-black.png">
              <div class="designer-status">{{item.title}}</div>
              <div
                class="delete-icon"
                @click="deleteBossAnswer(item.id)"
              ><i class="el-icon-close"></i></div>
              <div class="download">
                <a
                  :href="origin+'/Mingzhu/common/sysFile/download/'+item.content"
                  :download="item.title"
                >下载</a>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="detail-img">
              <el-upload
                :action="api.upload()"
                :on-success="handleSuccess"
                :show-file-list="false"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <div class="designer-status">上传相关文件</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      answersList: [],
      origin: "",
      questionList: {}
    };
  },
  created() {
    this.origin = location.origin;
  },
  methods: {
    bossReceiveQuestionDetail() {
      this.api
        .bossReceiveQuestionDetail({
          questionId: this.$route.query.actives
        })
        .then(res => {
          this.answersList = res.data.answers;
          this.questionList = res.data.question;
          console.log("0", this.questionList);
        });
    },
    deleteBtn() {
      this.$router.push({
        name: "itemInformation",
        query: {
          id: this.$route.query.id
        }
      });
    },
    handleSuccess(res, file) {
      this.loading = true;
      this.api
        .bossAnswer({
          questionId: this.$route.query.actives,
          title: file.name,
          content: res.msg
        })
        .then(res => {
          this.bossReceiveQuestionDetail();
          this.loading = false;
        });
    },
    deleteBossAnswer(val) {
      this.api
        .deleteBossAnswer({
          answerId: val
        })
        .then(res => {
          this.bossReceiveQuestionDetail();
        });
    }
  },
  mounted() {
    this.bossReceiveQuestionDetail();
  }
};
</script>
<style lang='less' scoped>
@media only screen and (min-width: 1600px) {
  .body-detail{
   max-width:1200px;
   margin:0.2rem auto !important;
  }
  }
.p-body {
  background-color: #f5f5f5;
  overflow: hidden;
  text-align: center;
  .body-detail {
    background-color: #fff;
    overflow: hidden;
    margin: 0.2rem 10%;
    padding: 2% 5%;
    .head-title {
      position: relative;
      margin: 0.5rem 0 0.2rem 0;
      text-align: left;
      h3 {
        padding-bottom: 0.2rem;
        font-size: 0.28rem;
        color: #000000;
        border-bottom: 0.01rem solid #e0e0e0;
      }
      .delete {
        cursor: pointer;
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        color: #c3c3c3;
        font-size: 0.28rem;
      }
    }
    .process-name {
      text-align: left;
      padding: 0.2rem 0;
      font-size: 0.2rem;
      color: #333333;
      padding-left: 0.8rem;
      // border-bottom: 0.005rem solid #e0e0e0;
    }
    .process-detail {
      width: 100%;
      overflow: hidden;
      text-align: center;
      margin-top: 0.4rem;
      margin-bottom: 0.8rem;
      .detail-img {
        margin: 0.2rem;
        display: inline-block;
        text-align: center;
        position: relative;
      }
      .delete-icon {
        position: absolute;
        top: -0.15rem;
        color: #ababab;
        right: -0.15rem;
        font-size: 0.2rem;
        font-weight: bold;
      }
      .el-icon-plus {
        font-size: 0.6rem;
      }
      .detail-img img {
        width: 0.6rem;
        height: 0.6rem;
      }
    }
  }
}
</style>