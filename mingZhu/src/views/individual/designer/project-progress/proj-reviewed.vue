<template>
  <div class="p-body">
    <div class="body-detail">
      <div class="head-title">
        <h3>专家评审</h3>
        <button type="button" class="close delete" aria-label="Close" @click="deleteBtn">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div v-if="agendaList && agendaList.url">
        <div class="process-detail pro-wrapper">
        <div class="detail-img">
        <img src="@/assets/images/assinment-icon2.png">
        <!-- <div class="img-name">{{item.filePath}}</div> -->
        <div class="download">
            <!-- <a @click="hanelPlay">播放</a> -->
            <a @click="hanelPlay">播放</a>
        </div>
        </div>
    </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      agendaList: {
        url:''
      },
    };
  },
  created() {
    this.origin = location.origin;
  },
  methods: {
    deleteBtn() {
      this.$router.go(-1)
    },
    getAgenda() {
      this.api.getAgenda({projectid: this.$route.query.id}).then(res => {
          this.agendaList = res.date
      })
    },
    hanelPlay() {
        window.open(this.agendaList.url)
    }
  },
  mounted() {
    this.getAgenda()
  }
};
</script>
<style lang='less' scoped>
@media only screen and (min-width: 1600px) {
  .body-detail {
    max-width: 1200px;
    // margin: 5.25rem auto 1.25rem !important;
  }
}
.p-body {
  background-color: #f5f5f5;
  overflow: hidden;
  text-align: center;
  height: 100%;
  .body-detail {
    background-color: #fff;
    overflow: hidden;
    // margin: 5.25rem 10% 1.25rem;
    height: 100%;
    padding: 2% 5%;
    .head-title {
      position: relative;
      margin: 3.125rem 0 1.25rem 0;
      text-align: left;
      h3 {
        padding-bottom: 1.25rem;
        font-size: 1.75rem;
        color: #000000;
        border-bottom: 1px solid #e0e0e0;
      }
      .delete {
        cursor: pointer;
        position: absolute;
        right: 0.625rem;
        top: 0.625rem;
        // color: #c3c3c3;
        font-size: 1.875rem;
      }
    }
    .process-name {
      text-align: left;
      padding: 1.25rem 0;
      font-size: 1.75rem;
      color: #333333;
      border-bottom: 0.5px solid #e0e0e0;
    }
    .process-detail {
      width: 100%;
      overflow: hidden;
      text-align: left;
      margin-top: 2.5rem;
      margin-bottom: 5rem;
      .detail-img {
        margin: 1.25rem;
        display: inline-block;
        text-align: center;
        position: relative;
      }
      .detail-img img {
        width: 3.75rem;
        height: 3.75rem;
      }
    }
    .radio {
      text-align: left;
      margin-bottom: 1.25rem;
      span {
        margin-right: 1.25rem;
      }
    }
    .input {
      margin-bottom: 1.25rem;
    }
  }
  .upload-demo {
    text-align: left;
    line-height: 2.5rem;
    position: relative;
    font-size: 0.875rem;
  }
}
.hasSigning {
  padding: 2.5rem 0;
  text-align: center;
  .info1 {
    font-size: 1.25rem;
    font-weight: 700;
  }
  .info2 {
    font-size: 1.25rem;
    margin-top: 1.25rem;
    span {
      display: inline-block;
      width: 10%;
      height: 2.5rem;
      line-height: 2.5rem;
      border-radius: 1.25rem;
      background: #f2cf8d;
      cursor: pointer;
      color: #333333;
    }
    a {
      color: #ffffff;
      text-decoration: none;
      // display: inline-block;
      // width: 10%;
      // height: 2.5rem;
      // line-height: 2.5rem;
      // border-radius: 1.25rem;
      // background: #f2cf8d;
      cursor: pointer;
    }
  }
}
</style>
<style lang="less">
.step-wrapper{
  .progress-stepper{
      padding-bottom: 0!important;
    .row{
      margin-top: 0!important;
    }
  }
}
.pro-wrapper{
  .detail-img {
    cursor: pointer;
    margin: 1.25rem;
    /* display: inline-block; */
    float: left;
    text-align: center;
    position: relative;
  }
  .img-name {
    cursor: pointer;
    font-size: 0.875rem;
  }
  .download a{
    padding: 1rem!important;
  }
}
</style>