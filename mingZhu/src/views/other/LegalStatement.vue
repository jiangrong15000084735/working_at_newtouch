<template>
  <div class="body">
    <div class="content clearfix">
      <div class="left fl">
        <p class="law">法律声明</p>
        <ul class="statement">
          <li>
            <p>知识产权声明</p>
          </li>
          <li>
            <p>免责声明</p>
          </li>
          <li>
            <p>相关法规</p>
          </li>
        </ul>
        <p class="careful">注意</p>
        <div class="clause">
          <p>免责条款免责条款免责</p>
          <p>
            条款免责条款</p>
        </div>
      </div>
      <div class="right fr">

        <h3 class="title">合筑条款</h3>
        <div class="statement">
          <ul>
            <li>
              <p>名筑建筑设计有限公司（以下简称“本公司”）独立拥有或与相关内容提供者共同拥有马良行平台（以下简称“本平台”）内相关内容（包括但不限于文字、图片、音频、视频资料、广告、域名、程序、专栏目录与名称、内容分类标准及页面设计、编排、软件等）的著作权、商标权和/或其他相关知识产权。 除非中国法律另有规定，未经本公司书面许可，对于本公司拥有著作权、商标权和/或其他知识产权的任何内容，任何人不得复制或者在非本公司所属的服务器上做镜像或者以其他任何方式进行使用（包括但不限于：复制、传播、展示、镜像、上载、下载等）。

              </p>
            </li>
            <li>
              <p>本平台的商标属于本平台所有，未经许可，任何人不得使用。</p>
            </li>
            <li>
              <p>本平台合作者或者用户的商标属于本平台合作者或者用户，未经许可，任何人不得擅自使用。</p>
            </li>
            <li>
              <p>对于通过本平台发布的作品，本平台受著作权人委托禁止任何媒体、网站或者个人在未经书面授权的情况下进行网络传播。</p>
            </li>
            <li>
              <p>违反上述声明者，本公司将依法追究其法律责任。</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.body {
  max-width: 1920px;
  padding-top: 60px;

  .content {
    width: 75%;

    margin: 0 auto;

    box-sizing: border-box;
    .left {
      height: 100%;
      width: 9.7222%;

      box-sizing: border-box;
      text-align: center;
      .law {
      //  font-family: PingFangHK-Medium;
        font-size: 18px;
        color: #333333;
        letter-spacing: 0;
        margin-bottom: 30px;
      }
      .statement {
        li {
          margin-bottom: 10px;
          &:last-child {
            margin-bottom: none;
          }
          p {
          //  font-family: PingFangHK-Regular;
            font-size: 14px;
            color: #999999;
            letter-spacing: 0;
          }
          &:first-child {
            p {
            //  font-family: PingFangHK-Regular;
              font-size: 14px;
              color: #333333;
              letter-spacing: 0;
            }
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
      }
    }
    .right {
      //margin-left: 8.3333%;

      width: 83.33333%;
      height: 100%;
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
        margin-bottom: 45px;
      }
      .statement {
        ul {
          li {
            margin-bottom: 25px;
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
    }
  }
}
</style>
<style>
.body{
  flex: 1;
}
</style>
