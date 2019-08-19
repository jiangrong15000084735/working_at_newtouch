<template>
    <div class="description">
        <mdb-card>
            <mdb-card-body>
                <mdb-card-title style="font-size:1rem;color:#333;border-bottom:1px dashed #dcdcdc;padding-bottom:1.25rem;font-weight:600;">
                    <span v-if="show==1">方案设计与概念设计</span>
                    <span v-if="show==2">增值服务</span>
                    <span v-if="show==3">设计费预估算</span>
                </mdb-card-title>
                <div style="position:relative;">
                    <span class="left-icon"><mdb-icon icon="caret-left" /></span>
                    <div style="font-size:0.875rem;color:#333;text-align:justify;" v-if="show==1">
                        <p>方案设计包含效果图、分析图、总平面等传达设计概念的表达性图纸，及完整总平面、平面、立面、剖面等技术性图纸和建筑设计说明等。</p>
                        <p>概念设计偏重于设计理念及构思，主要图纸包括效果图、分析图、总平面等概念图纸，及主要或典型的平面、立面、剖面图。</p>
                        <p>方案设计深度大于概念设计，相应的设计费用和周期也大于概念设计。</p>
                    </div>
                    <div style="font-size:0.875rem;color:#333;text-align:justify;" v-if="show==2">
                        <p>清晰详实的任务书是保障设计质量的核心文档，基本信息提交后合筑空间将指派专属项目经理，为您提供免费的任务书及招标文件对接服务，以及包括项目策划、代写任务书等在内的增值服务，如您需要增值服务，可以在项目信息成功提交后在项目中心内进行选择。</p>
                    </div>
                    <div style="font-size:0.875rem;color:#333;text-align:justify;" v-if="show==3">
                        <p>低费用满足优质工程设计方案需求是合筑空间的核心宗旨。方案阶段与技术阶段(报批、施工图等)分离，专业人做专业事，是确保这一宗旨实现的手段之一。查看合筑模式与传统模式⽅方案征集方式比较。合筑空间对您设计报价的评估是在方案、技术折离的前提下，基于市场整体价格，结合您的设计需求做出的。目的是以合理的价格完寻找最佳方案，控制工程项目总体设计费用。</p>
                    </div>
                </div>
            </mdb-card-body>
        </mdb-card>
    </div>
</template>
<script>
export default {
    props:["show"]
}
</script>
<style lang="less" scoped>
.description{
    width: 33rem;
    position: absolute;
    top: -5.5rem;
    right: -35rem;
    z-index: 10;
}
.left-icon{
    font-size: 36px;
    display: block;
    position: absolute;
    top: 0;
    left:-1.9rem;
    color: #ffffff;
    z-index: 12;
}
</style>
<style lang="less">
.description .card {
    box-shadow: 0 2px 17px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    border: 0;
    font-weight: 400;
}
.description .card-body{
    overflow-y: visible;
}
</style>


