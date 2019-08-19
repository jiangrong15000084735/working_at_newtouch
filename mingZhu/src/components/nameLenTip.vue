<template>
    <div class="nameLenTip">
        <mdb-card>
            <mdb-card-body class="designer px-2 py-2">
                <div class="up-tab">
                    <div class="triangle_border_up">
                        <span></span>
                    </div>
                </div>
                <div class="designer-text">
                   <p>{{fileName}}</p>
                </div>
            </mdb-card-body>
        </mdb-card>
    </div>
</template>
<script>
export default {
    name:"nameLenTip",
    props:["fileName"],
    data(){
        return{

        }
    }
}
</script>
<style lang="less" scoped>
.nameLenTip{
    position: absolute;
    top: 100%;
    width: 100%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%,10px);
    background: #fff;
    .designer{
        position: relative;
        .up-tab {
            position: absolute;
            left: 50%;
            top: -12px;
            z-index: 10;
            transform: translateX(-50%);
        }
        .triangle_border_up {
            width: 0;
            height: 0;
            border-width: 0 13px 13px;
            border-style: solid;
            border-color: transparent transparent rgba(0, 0, 0, 0.05);
            position: relative;
        }
        .triangle_border_up span {
            display: block;
            width: 0;
            height: 0;
            border-width: 0 12px 12px;
            border-style: solid;
            border-color: transparent transparent #fff;
            position: absolute;
            top: 2px;
            left: -12px;
        }
        .designer-text{
            // padding-bottom: 10px;
            p{
                // margin-top: 10px;
                width: auto;
                // text-align: left;
                word-break: break-all;
                // white-space:nowrap;
            }
        }
    }

}
</style>
