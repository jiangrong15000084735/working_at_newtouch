<template>
    <div class="stepper">
        <div class="step-item" v-for="(item,index) in landMarkList" :key="item.id" @click="handleClick(item.name)">
            <div class="step-item-top">
                <div class="step-item-top-text" v-bind:class="{ istext: index < activeIndex }">
                    {{index+1}}
                </div>
                <div v-if="index+1!==landMarkList.length" class="step-item-top-line" v-bind:class="{ isline: index+1 < activeIndex }"></div>
            </div>
            <div class="step-item-bottom">{{item.name}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['activeIndex','landMarkList'],
        data () {
            return {}
        },
        methods: {
            handleClick (v) {
                console.log(v)
            }
        }
    }
</script>

<style lang="less" scoped>
    .stepper {
        display: flex;
        font-family: PingFangSC-Medium;
        .step-item {
            flex: 1;
            text-align: center;
             position: relative;
            .step-item-top {
                position: relative;
                margin-bottom: 6.225rem;
                .step-item-top-text {
                   position: absolute;
                    left: 0;
                    right: 0;
                    margin: auto;
                    z-index:999;
                    width: 4rem;
                    height: 4rem;
                    border: 3px solid white;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.4rem;
                    box-sizing: border-box;
                    border-radius: 50%;
                    // box-shadow: 0 0 5px 2px rgba(0, 0, 0, .3);
                    background-color: #d5d5d5;
                }
                .istext {
                    background: #4285f4 url(../assets/images/icon-ok.png) no-repeat center center;
                    text-indent: 9999px;
                     position:absolute;
                    left:0;
                    right:0;
                    margin:auto;
                    z-index:999;
                }
                .step-item-top-line {
                    position: absolute;
                    height: 3.125rem;
                    left: 50%;
                    right: -50%;
                    top: 0.525rem;
                    margin: 0 1.75rem !important;                 
                    background-image: url(../assets/images/bg-gray.png);
                    background-repeat: repeat-x;
                    background-position: center;
                }
                .isline {
                    background-image: url(../assets/images/bg-loading1.png);
                    background-repeat: repeat-x;
                    background-position: center; 
                }
            }
            .step-item-bottom{
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
             }
            
        }
    }
    
</style>