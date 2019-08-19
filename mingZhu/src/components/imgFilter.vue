<template>
  <div class="headImgDialog">
    <mdb-modal v-if="imgDataObj.modal==true">
      <mdb-flipping-card :flipped="flipped" style="width:43.75rem;">
        <mdb-card class="face front" :class="flipped==true?'displayCard':''">
          <mdb-modal-header class="title">
            <mdb-modal-title>Your Profile Photo</mdb-modal-title>
          </mdb-modal-header>
          <mdb-card-body>
            <h6>Upload a new image</h6>
            <mdb-container>
              <mdb-row>
                <mdb-col style="border:1px solid #ccc;height:18.75rem;padding:0;overflow:hidden">
                  <div class="headPoto">
                    <img :src="headPhoto" v-if="headPhoto" style="width:100%">
                    <img
                      :src="imgDataObj.head"
                      style="width:100%"
                      v-else
                      :class="[filter==1?'chalkboard-effect':'',filter==2?'airbrush-effect':'',filter==3?'colored-chalkboard-effect':'',filter==4?'hallucination-effect':'']"
                    >
                  </div>
                </mdb-col>
                <mdb-col
                  style="border:1px solid #ccc;margin-left:0.95rem;height:18.75rem;padding:0"
                >
                  <el-upload
                    class="avatar loadavatar filterWrap"
                    :show-file-list="false"
                    :action="api.upload()"
                    :before-upload="beforeAvatarUpload"
                    :on-success="successUpLoadAvatar"
                    accept=".jpg, .jpeg, .png, .JPG, .JPEG, .bmp"
                  >
                    <i
                      class="el-icon-plus avatar-uploader-icon"
                      style="font-size:6.125rem;color:#ccc;font-weight:300;
                   margin: 2.70rem 3.06rem;"
                    ></i>
                  </el-upload>
                </mdb-col>
              </mdb-row>
            </mdb-container>
            <p style="text-align:right;cursor:pointer" @click="chooseFilter">挑选滤镜</p>
          </mdb-card-body>
          <mdb-modal-footer>
            <mdb-btn @click.native="closeChoose">关闭</mdb-btn>
            <mdb-btn color="primary" @click.native="changeHeadImg">保存</mdb-btn>
          </mdb-modal-footer>
        </mdb-card>

        <mdb-card
          class="face back"
          style="margin-top:20px;"
          :class="flipped==false?'displayCard':''"
        >
          <mdb-modal-header style="background-color:#ccc;" class="title">
            <div
              style="width:12.5rem;height:12.5rem;margin:0 auto;overflow:hidden"
              :style="backgroundDiv"
            >
              <img
                class="card-img-top"
                :src="headPhoto"
                v-if="headPhoto"
                alt="a photo of a house facade"
                :class="[select==1?'chalkboard-effect':'',select==2?'airbrush-effect':'',select==3?'colored-chalkboard-effect':'',select==4?'hallucination-effect':'']"
              >
              <img
                class="card-img-top"
                :src="imgDataObj.head"
                alt="a photo of a house facade"
                v-else
                :class="[select==1?'chalkboard-effect':'',select==2?'airbrush-effect':'',select==3?'colored-chalkboard-effect':'',select==4?'hallucination-effect':'']"
              >
            </div>
          </mdb-modal-header>

          <mdb-card-body>
            <ul class="list-inline py-2">
              <li class="list-inline-item" @click="selectFilterOne(0)">
                <a class="fa-lg fb-ic border-style">
                  <img :src="headPhoto" v-if="headPhoto" 
                    :class="!select?'active':''"
                    style="width:100%">
                  <img
                    :src="imgDataObj.head"
                    style="width:100%"
                    v-else
                    :class="[!select?'active':'',filter==1?'chalkboard-effect':'',filter==2?'airbrush-effect':'',filter==3?'colored-chalkboard-effect':'',filter==4?'hallucination-effect':'']"
                  >
                </a>
                <p class="effectName">原图</p>
              </li>

              <li v-for="(item,index) in selectFilter" :key="index" 
                class="list-inline-item" 
                @click="selectFilterOne(index+1)">
                <a class="fa-lg fb-ic border-style preview" 
                  :class="[item.cla,index+1==select?'active':'']">
                  <img src="@/assets/images/bg-project-05.jpg">
                </a>
                <p class="effectName">{{item.name}}</p>
              </li>
            </ul>
          </mdb-card-body>
          <mdb-modal-footer>
            <mdb-btn @click.native="closeModal">关闭</mdb-btn>
            <mdb-btn color="primary" @click.native="changeHeadImg">保存</mdb-btn>
            <mdb-btn color="primary" @click.native="flipped=false">换张图片？</mdb-btn>
          </mdb-modal-footer>
        </mdb-card>
      </mdb-flipping-card>
    </mdb-modal>
  </div>
</template>

<script type="text/javascript">
export default {
  props:[
    "imgDataObj" //"head","filter","modal"
  ],
  data() {
    return {
      selectFilter:[
        {"cla":"chalkboard-effect","name":"Sketch2"},
        {"cla":"airbrush-effect","name":"Magic Cube"},
        {"cla":"colored-chalkboard-effect","name":"滤镜3"},
        {"cla":"hallucination-effect","name":"滤镜4"},
      ],
      backgroundDiv: {
        backgroundImage: 'url(' + this.imgDataObj.head + ')'
      },
      flipped: false,
      headPhoto: "",
      select: this.imgDataObj.filter,
      headPhotoName: null
    };
  },
  methods: {
    selectFilterOne(val) {
      if(val===0&&!this.headPhotoName){
        this.select = this.filter
      }else{
        this.select=val
      }
    },
    chooseFilter() {
      this.flipped = true;
      if (this.headPhoto == null) {
        this.headPhoto = this.imgDataObj.head;
      }
    },
    closeChoose() {
      this.headPhoto = null;
      this.imgDataObj.modal = false;
    },
    closeModal() {
      this.flipped = false;
      this.imgDataObj.modal = false;
      this.select = 0;
      this.headPhoto = null;
    },
    // 上传前验证
    beforeAvatarUpload(file) {
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        this.$message.error("上传图片大小不能超过 3MB!");
      }
      return isLt3M;
    },
    // 上传头像成功
    successUpLoadAvatar(res, file) {
      this.headPhotoName = res.msg;
      let head = res.msg;
      this.api.getUrl({ fileName: head }).then(res => {
        if (res.code !== 0) {
          return;
        }
        this.headPhoto = res.msg;
      });
    },
    changeHeadImg() {
      let backObj = {
        head:this.imgDataObj.head,
        headPhoto:this.headPhoto,
        headPhotoName: this.headPhotoName,
        select:this.select,
        filter:this.imgDataObj.filter
      }
      this.closeModal()
      this.$emit("changeHeadBack",backObj)
      console.log(backObj)
    }
  }
};
</script>

<style lang="less" scoped>
.displayCard {
  display: none;
}
.border-style {
  position: relative;
  display: flex;
  overflow: hidden;
  // top: 0;
  // left: 8px;
  width: 5rem;
  height: 5rem;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.15);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
  img {
    width: 100%;
  }
}
.effectName {
  text-align: center;
  line-height: 1.875rem;
  height: 1.875rem;
  font-size: 1rem;
  color: #505050;
}
// 滤镜1
.chalkboard-effect {
  background-image: url("/assets/images/bg-project-05.jpg");
  background-size: cover;
  background-position: center;
}
@supports (filter: grayscale(100%)) and (background-blend-mode: difference) {
  .chalkboard-effect {
    background-image: url(/assets/images/bg-project-05.jpg),
      url(/assets/images/bg-project-05.jpg);
    background-blend-mode: difference;
    background-position: calc(50% - 1px) calc(50% - 1px),
      calc(50% + 1px) calc(50% + 1px);
    filter: brightness(9) grayscale(100%) saturate(5);
  }
}
// 滤镜2
.airbrush-effect {
  background-image: url(/assets/images/bg-project-05.jpg);
  background-size: cover;
  background-position: center;
}

@supports (filter: blur(5px) contrast(5)) and (mix-blend-mode: multiply) {
  .airbrush-effect {
    background: inherit;
    filter: brightness(1) saturate(2.5) contrast(4) invert(0.1) sepia(0.1)
      hue-rotate(5deg) blur(0.5px);
    mix-blend-mode: multiply;
  }
}
// 滤镜3
.colored-chalkboard-effect {
  background-image: url(/assets/images/bg-project-05.jpg);
  background-size: cover;
  background-position: center;
}

@supports (filter: brightness(1.6)) and
  (background-blend-mode: color, difference, overlay) {
  .colored-chalkboard-effect {
    background-image: url(/assets/images/bg-project-05.jpg),
      url(/assets/images/bg-project-05.jpg),
      url(/assets/images/bg-project-05.jpg);
    background-size: cover;
    background-position: calc(50% - 1px) calc(50% - 1px),
      calc(50% + 1px) calc(50% + 1px), center;
    background-blend-mode: color, difference, overlay;
    filter: brightness(0.9) blur(1px) contrast(5) sepia(0.6) saturate(3)
      invert(0.2);
  }
}
// 滤镜4
.hallucination-effect {
  background-image: url(/assets/images/bg-project-05.jpg);
  background-size: cover;
  background-position: center;
}

@supports (filter: blur(2px)) and (mix-blend-mode: multiply) {
  .hallucination-effect {
    position: relative;
    overflow: hidden;
    background-size: cover;
    background-blend-mode: screen, difference;
    background-position: calc(50%-1px) calc(50%-1px),
      calc(50%+1px) calc(50px+1px);
    filter: brightness(2) blur(1.1px) contrast(3.9) saturate(1);
    box-shadow: inset 0 0 0 1px black;
    mix-blend-mode: multiply;
  }
}
.filterWrap{
  margin-top: 60px!important;
  width: 100%!important;
}
.list-inline-item .active{
  border:2px solid #4285f4;
}
</style>