<template>
    <mdb-container class="body">
      <mdb-row class="content">
        <mdb-col class="left col-md-3">
          <p class="law">常见问题</p>
          <ul class="statement">
            <li v-for="item in questionList"
                :key="item.id"
                @click="getAnswer(item.id)"
            >
              <p v-show="item.title">{{item.title}}</p>
            </li>
          </ul>
        </mdb-col>
        <mdb-col class="right col-md-8">

          <h3 class="title">{{title}}</h3>
          <div class="statement">
            <p v-html="content"></p>
          </div>
        </mdb-col>
      </mdb-row>
    </mdb-container>
</template>
<script>
  export default {
    data() {
      return {
        questionList: [],
        title: '',
        content: ''
      }
    },
    methods: {
      getAnswer(id) {
        let _params = {id: id, auditstatus: 5}
        this.api.commonQuestionAns(_params).then(res => {
          if (res.code === 0) {
            this.title = res.data.title
            this.content = res.data.content
          }
        })
      }
    },
    mounted() {
      this.api.commonQuestionList().then(res => {
        if (res.code === 0) {
          this.questionList = res.data
          this.title = this.questionList[0].title
          this.content = this.questionList[0].content
        }
      })
    }
  }
</script>
<style lang="less" scoped>
.body {
 // max-width: 1920px;
  max-width: 1200px;
  // padding-top: 3.75rem;
   padding-top: 6rem;
  min-height: 50rem;
  margin: 0 auto;
  .content {
    width: 75%;
    margin: 0 auto;
    box-sizing: border-box;
    padding-bottom: 3rem;
    .left {

      box-sizing: border-box;
      .law {
      //  font-family: PingFangHK-Medium;
        font-size: 18px;
        color: #333333;
        letter-spacing: 0;
        margin-bottom: 30px;
        padding-left: 1.5rem;
      }
      .statement {
        li {
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: 0;
          }
          p {
          //  font-family: PingFangHK-Regular;
            font-size: 0.88rem;
            color: #999999;
            letter-spacing: 0;
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: left;
          }
        }
      }
      .careful {
      //  font-family: PingFangHK-Medium;
        font-size: 18px;
        color: #333333;
        letter-spacing: 0;
        margin-top: 70px;
        margin-bottom: 28px;
      }
      .clause {
      //  font-family: PingFangHK-Regular;
        font-size: 14px;
        color: #999999;
        letter-spacing: 0;
        line-height: 24px;
        ul {
          li {
            &:first-child {
            //  font-family: PingFangHK-Regular;
              font-size: 14px;
              color: #333333;
              letter-spacing: 0;
            }
          }
        }
      }
    }
    .right {
      padding-left: 8%;
      box-sizing: border-box;
    //  font-family: PingFangHK-Regular;
      font-size: 14px;
      color: #999999;
      letter-spacing: 0;
      line-height: 24px;
      .title {
      //  font-family: PingFangHK-Medium;
        font-size: 28px;
        color: #333333;
        letter-spacing: 0;
        margin-bottom: 60px;
      }
      .statement {
        p {
        //  font-family: PingFangHK-Regular;
          font-size: 16px;
          color: #666666;
          letter-spacing: 0;
          line-height: 30px;
        }
      }
    }
  }
  @media (max-width: 990px){
    .content{
      width: 100% !important;
    }
    .right{
      padding-top: 2rem;
    }
  }
  @media (max-width: 750px) {
    .content{
      .left{
        padding: 0;
      }
    }
  }
}
</style>
<style>
.body{
  flex: 1;
}
</style>
