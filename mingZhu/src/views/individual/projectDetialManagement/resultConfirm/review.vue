<template>
 <mdb-container fluid class="review px-0">
    <div class="text-center">
      <div class="prism-player" id="player-con"></div>
    </div>
    <mdb-row class="titleWrapper mx-0 px-0">
        <mdb-col md="12" class="px-0 projectWrapper">
            <h3>{{content.projectName}}</h3>
        </mdb-col>
        <mdb-col md="12" class="px-0">
          <div class="dottedWrapper"></div>
        </mdb-col>
        <mdb-col md="12" class="px-0 detWrapper">
            <pre>
              {{content.desc}}
            </pre>
        </mdb-col>
    </mdb-row>
</mdb-container>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      projectId: this.$route.query.id,
      content:{},
      isLogin:null,
    }
  },
  mounted() {
    let BDRCVFR = decodeURI(this.$route.query.BDRCVFR)
    let length = BDRCVFR.length - (9 + 4 + 3 + 7)
    let clientId = BDRCVFR.substring(9 + 4, length + 9 + 4)
    let clientId1 = 'client-' + clientId
    let clientId2 = 'coolarch-' + clientId
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    // 客户
    let bossSerial = ''
    // 设计师
    let designerSerial = '' 
    
    if (userInfo) {
      if (userInfo.bossSerial) bossSerial = userInfo.bossSerial
      if (userInfo.designerSerial) designerSerial = userInfo.designerSerial
    }
    if (
      (clientId1 == bossSerial || clientId1 == designerSerial) || 
      clientId2 == bossSerial || clientId2 == designerSerial) {
      this.getVedio()
    }else if(
      clientId&&clientId!="undefined" &&
      ((clientId1 != bossSerial || clientId1 != designerSerial) || 
      (clientId2 != bossSerial || clientId2 != designerSerial))
      ){
      console.log("loginHandle")
      this.loginHandle();
    }
    // http://localhost:443/#/review?id=606&card_import=123&tip_message=1559383068000
    // 不需要登陆
    let card_import = this.$route.query.card_import
    if (card_import) {
      this.getVedio()
    }
  // this.initVideo()
  },
  methods: {
    loginHandle() {
      Bus.$emit("loginBox",'');
    },
    initVideo(url) {
        // var player = new Aliplayer({
        //     "id": "player-con",
        //     "source": url,
        //     "width": "100%",
        //     "height": "500px",
        //     "autoplay": true,
        //     "isLive": true,
        //     "rePlay": false,
        //     "playsinline": true,
        //     "preload": true,
        //     "controlBarVisibility": "hover",
        //     "useH5Prism": true
        //     }, function (player) {
        //         player._switchLevel = 0;
        //         console.log("播放器创建了。");
        //     }
        // );
        var player = new Aliplayer({
        id: 'player-con',
        width: '100%',
        "height": "500px",
        autoplay: true,
        //支持播放地址播放,此播放优先级最高
        source : url,
        //播放方式二：点播用户推荐
        vid : '1e067a2831b641db90d570b6480fbc40',
        playauth : 'ddd',
        // cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png',            
        //播放方式三：仅MPS用户使用
        vid : '1e067a2831b641db90d570b6480fbc40',
        accId: 'dd',
        accSecret: 'dd',
        stsToken: 'dd',
        domainRegion: 'dd',
        authInfo: 'dd',
        //播放方式四：使用STS方式播放
        vid : '1e067a2831b641db90d570b6480fbc40',
        accessKeyId: 'dd',
        securityToken: 'dd',
        accessKeySecret: 'dd',
          region:'cn-shanghai',//eu-central-1,ap-southeast-1
        },function(player){
            console.log('播放器创建好了。')
        });
    },
    getVedio() {
      let params = {
        projectId:this.projectId
      }
      this.api.getVedio(params).then(res => {
        if(res.code!=0){
          this.$message.error(res.msg);
          return
        }
        this.content = res.date
        this.initVideo(this.content.url)
        // this.initVideo("http://coolarch.net/app/stream.m3u8?auth_key=1558806826-0-0-fdb268af213029bfb623d90ad2bf2f46")
      })
    }
  }
}
</script>

<style lang="less" scoped>
.review{
    // width: 1210px;
    margin: 3.4rem auto 0;
    // overflow:hidden;
    .titleWrapper{
      padding-left: 6rem!important;
      padding-right: 6rem!important;
      margin-bottom: 3rem;
      .projectWrapper{
        h3{
          padding: 1.125rem 0 0;
          font-size: 1.125rem;
          color: #222;
          font-weight: 600;
        }
        p{
          font-size: 1rem;
          padding-top: 0.75rem;
          color: #666;
        }
      }
      .dottedWrapper{
        border: 0.0625rem dotted #f2f2f2;
        margin: 1.25rem 0;
      }
      .detWrapper{
        font-size: 0.875rem;
        color: #222;
      }
    }
    @media (min-width: 120rem){
      .prism-player{
        height: 49.0625rem!important;
      }
    }
    pre {
      white-space: pre-wrap;       /* css-3 */
      white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
      white-space: -pre-wrap;      /* Opera 4-6 */
      white-space: -o-pre-wrap;    /* Opera 7 */
      word-wrap: break-word;       /* Internet Explorer 5.5+ */
      word-break:break-all;
      overflow:hidden;
      }
}
</style>