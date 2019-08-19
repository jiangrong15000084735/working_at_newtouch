<template>
    <div class="view-designer">
        <mdb-card>
            <mdb-card-body class="designer">
                <div class="up-tab">
                    <div class="triangle_border_up">
                        <span></span>
                    </div>
                </div>
                <div class="designer-text">
                   <p>{{designerName}}</p>
                   <p>{{fileName}}</p>
                </div>
            </mdb-card-body>
        </mdb-card>
    </div>
</template>
<script>
export default {
    name:"viewDesigner",
    props:["designerName","fileName"],
    data(){
        return{

        }
    }
}
</script>
<style lang="less" scoped>
.view-designer{
    width:90%;
    // overflow: hidden;
    position: absolute;
    top: 100%;
    left: 50%;
    z-index: 5;
    margin-bottom: 0.3125rem;
    // margin-top:20px;
    transform: translate(-50%,10px);
    background: #fff;
    .designer{
        position: relative;
        .up-tab {
            position: absolute;
            left: 50%;
            top: -0.75rem;
            z-index: 10;
            transform: translateX(-50%);
        }
        .triangle_border_up {
            width: 0;
            height: 0;
            border-width: 0 0.8125rem 0.8125rem;
            border-style: solid;
            border-color: transparent transparent rgba(0, 0, 0, 0.05);
            position: relative;
        }
        .triangle_border_up span {
            display: block;
            width: 0;
            height: 0;
            border-width: 0 0.75rem 0.75rem;
            border-style: solid;
            border-color: transparent transparent #fff;
            position: absolute;
            top: 0.125rem;
            left: -0.75rem;
        }
        .designer-text{
            padding-bottom: 0.625rem;
            p{
                margin-top: 0.625rem;
                width: auto;
                // white-space:nowrap;
                word-break: break-all;
            }
        }
    }

}
</style>
