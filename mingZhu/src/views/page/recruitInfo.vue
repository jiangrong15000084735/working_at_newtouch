<template>
<div class='recruit-container'>
  <headerPart></headerPart>
    <div class="main">
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="about-us">
                    <h3 class="title">招聘信息</h3>
                    <div class="sub-title">java工程师</div>
                    <div class="sub-title">新媒体运营</div>
                    <div class="sub-detail">我们的优势</div>
                    <div class="sub-detail">大数据工程师</div>
                    <div class="sub-detail">我们的使用</div>
                </div>
                <div class="attention">
                    <h3 class="title">注意</h3>
                    <div class="sub-title">关于我们</div>
                    <div class="sub-title">我们是谁</div>
                    <div class="sub-title">我们做什么</div>
                    <div class="sub-detail">我们的优势</div>
                    <div class="sub-detail">我们的保障</div>
                    <div class="sub-detail">我们的使用</div>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="content-title">java工程师</div>
                <p class="content-detail">
                    岗位职责:
                    1、负责公司系统平台前端开发，包括网站web前端开发；
                    2、负责公司系统跨平台的数据对接交互。并能抽象封装到现有框架中；
                    3、负责公司系统平台前端开发，包括网站web前端开发；
                    4、负责公司系统跨平台的数据对接交互。并能抽象封装到现有框架中；
                    5、负责公司系统平台前端开发，包括网站web前端开发；
                    6、负责公司系统跨平台的数据对接交互。并能抽象封装到现有框架中；
                </p>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script>
import headerPart from "@/components/header.vue";
export default {
  components: {
    headerPart
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
@media only screen and (min-width: 1600px) {
  .main{
   max-width:1200px;
   margin:0.8rem auto !important;
  }
  }

.sub-title {
  color: #000;
  font-size: 14px;
  padding: 10px 0;
}
.sub-detail {
  color: #b5b5b5;
}
.content-title {
  color: #000;
  font-size: 16px;
  padding: 10px 0;
  text-align: left;
}
.content-detail {
  color: #b5b5b5;
  font-size: 14px;
  text-align: left;
}
</style>