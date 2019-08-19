<template>
    <mdb-card class="designer-free">
        <mdb-card-body>
            <mdb-card-title class="text-center c-title">奖金说明</mdb-card-title>
            <div style="position:relative;">
                <span class="left-icon"><mdb-icon icon="caret-left" /></span>
                <mdb-row v-if="list.number1" class="py-2 font-size">
                    <mdb-col md="6" class="text-left title">第一名</mdb-col>
                    <mdb-col md="6" class="text-right" style="color:#d92804;font-weight: 600;">{{list.number1}}&nbsp;&nbsp;<span style="font-size:0.875rem;">RMB</span></mdb-col>
                </mdb-row>
                <mdb-row v-if="list.number2" class="py-2 font-size">
                    <mdb-col md="6" class="text-left title">第二名</mdb-col>
                    <mdb-col md="6" class="text-right price">{{list.number2}}&nbsp;&nbsp;<span style="font-size:0.875rem;">RMB</span></mdb-col>
                </mdb-row>
                <mdb-row v-if="list.number3" class="py-2 font-size">
                    <mdb-col md="6" class="text-left title">第三名</mdb-col>
                    <mdb-col md="6" class="text-right price">{{list.number3}}&nbsp;&nbsp;<span style="font-size:0.875rem;">RMB</span></mdb-col>
                </mdb-row>
            </div>
        </mdb-card-body>
    </mdb-card>
</template>
<script>
export default {
    props:["list"]
}
</script>
<style lang="less" scoped>
.designer-free{
    font-family:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
    width: 23.8125rem;
    position: absolute;
    top: -5.45rem;
    right: -24.8125rem;
    z-index: 10;
}
.c-title{
    font-weight: 600 !important;
    font-size:1rem;
    color:#333;
    border-bottom:0.0625rem dashed #dcdcdc;
    padding-bottom:1.25rem;
}
.font-size{
    font-size:1.125rem;
}
.title{
    font-weight: 600;
    color: #333;
}
.left-icon{
    font-size: 2.25rem;
    display: block;
    position: absolute;
    top: 0;
    left:-1.9rem;
    color: #ffffff;
    z-index: 12;
}
.price{
    color:#999;
    font-weight: 600;
}
</style>
<style lang="less">
.designer-free .card {
    box-shadow: 0 0.125rem 1.0625rem 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    border: 0;
    // font-weight: 400;
}
.designer-free .card-body{
    overflow-y: visible;
}
</style>
