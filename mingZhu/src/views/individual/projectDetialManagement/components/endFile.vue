<template>
    <mdb-card class="file-list">
        <mdb-card-body>
            <div class="folder">
            <img class="folder-img" src="@/assets/images/folder.png">
            </div>
            <div class="file-text">
              <span class="file-name"
                  @mouseover="shareHoverIndex = endFile.designerId"
                  @mouseout="shareHoverIndex = -1">
                {{endFile.DesignerSerial}}●{{endFile.fileName}}
                
              </span>
            <a
                :href="`${origin}/Mingzhu/common/sysFile/download/${endFile.filePath}/${endFile.fileName}`"
                :download="endFile.fileName"
                class="download-img"
            >
                <mdb-icon icon="download"/>
            </a>
            <ViewDesigner v-if="shareHoverIndex==endFile.designerId" :designerName="endFile.DesignerSerial" :fileName="endFile.fileName"></ViewDesigner>
            </div>
        </mdb-card-body>
    </mdb-card>
</template>
<script>
import ViewDesigner from "@/views/individual/projectDetialManagement/components/viewDesigner.vue";
export default {
    name:"endFile",
    components:{ViewDesigner},
    props:["endFile"],
    data(){
        return{
            origin: location.origin,
            shareHoverIndex:-1,
        }
    },
    mounted(){
      console.log(this.endFile)
    }
}
</script>
<style lang="less" scoped>
 .file-list {
    width: 14.375rem;
    height: 12rem;
    padding-top: 1.875rem;
    padding-bottom: 3.625rem;
    margin-bottom: 2.75rem;
  }
  .folder {
    text-align: center;
    color: #333;
    margin-bottom: 1rem;
    .folder-img {
      width: 3.75rem;
      height: 3.75rem;
    }
  }
  .file-text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    cursor: pointer;
  }
  .file-name {
    font-size: 0.875rem;
    color: #333;
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
  }
  .download-img {
    display: inline-block;
    vertical-align: middle;
    width: 1rem;
    font-size: 1rem;
    margin-left: 0.875rem;
    color: #d9d9d9;
    flex: 0 0 auto;
    
  }
   .backTip{
    background: rgba(0, 0, 0);
    color: #fff;
    padding: 0.25rem;
    font-size: 0.75rem;
    border-radius: 0.1875rem;
    position: absolute;
    left: -50%;
    transform: translateX(50%);
    // width: 2.5rem;
    display: inline;
    text-align: center;
    z-index: 10;
  }
  .backTip:before{
    content: ' ';
    border-bottom: 0.3125rem solid rgba(0, 0, 0);
    border-left: 0.3125rem solid transparent;
    border-right: 0.3125rem solid transparent;
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
