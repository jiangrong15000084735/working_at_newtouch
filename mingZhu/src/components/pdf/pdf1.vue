
<template>
  <div id="container-pdf">
    <!-- <div class='pdf-page'> -->
    <canvas id="the-canvas"></canvas>
    <div class="foot" v-if="pdfDoc&&totalPage>1">
     <mdb-btn color="primary"  class="left" @click="onPrevPage">上一页</mdb-btn>
     <mdb-btn color="primary" class="right"  @click="onNextPage">下一页</mdb-btn>
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
import PDFJS from "pdfjs-dist";

export default {
  name: "pdf",
  props: ["pdfUrl","dac"],
  data() {
    return {
      pdfDoc: null,
      pageNum: 1,
      pageRendering: false,
      pageNumPending: null,
      // scale: 1,
      w:0,
      totalPage:0,
    };
  },
  methods: {
    showPDF(url) {
      let _this = this;
      PDFJS.getDocument(url).then(function(pdf) {
        _this.pdfDoc = pdf;
        _this.renderPage(1);
      });
    },
    renderPage(num) {
      this.pageRendering = true;
      let _this = this;
      this.pdfDoc.getPage(num).then(function(page) { 
        _this.totalPage = _this.pdfDoc.numPages
        // var viewport = page.getViewport(_this.scale);
        let canvas = document.getElementById("the-canvas");
        let ctx = canvas.getContext("2d");
        var viewport = page.getViewport(
          _this.w / page.getViewport(1).width
        );
        let dpr = window.devicePixelRatio || 1;
        let bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1;
        let ratio = dpr / bsr;
        // canvas.height = viewport.height
        // canvas.width = viewport.width

        canvas.width = viewport.width * ratio;
        canvas.height = viewport.height;
        canvas.style.width = viewport.width + "px";
        canvas.style.height = viewport.height + "px";
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);

        // Wait for rendering to finish
        renderTask.promise.then(function() {
          _this.pageRendering = false;
          if (_this.pageNumPending !== null) {
            // New page rendering is pending
            this.renderPage(_this.pageNumPending);
            _this.pageNumPending = null;
          }
        });
      });
    },
    queueRenderPage(num) {
      if (this.pageRendering) {
        this.pageNumPending = num;
      } else {
        this.renderPage(num);
      }
    },
    onPrevPage() {
      if (this.pageNum <= 1) {
        return;
      }
      this.pageNum--;
      this.queueRenderPage(this.pageNum);
    },
    onNextPage() {
      if (this.pageNum >= this.pdfDoc.numPages) {
        return;
      }
      this.pageNum++;
      this.queueRenderPage(this.pageNum);
    }
  },
  mounted() {
    let url = Base64.decode(this.pdfUrl);
    this.w = this.dac.offsetWidth
    this.showPDF(url);
  }
};
</script>
 
<style scoped>
#container-pdf {
  /* background-color: rgba(0,0,0,0.75); */
  /* position:fixed; */
  position:relative;
  width: 100%;
  height: 100%;
  /* top: 0;
  left: 0; */
  text-align: center;
  padding: 5px;
}

.pdf-page {
}

.foot {
  position: absolute;
  transform: translate(-50%, 0);
  bottom: 0;
  left: 50%;
}
</style>
