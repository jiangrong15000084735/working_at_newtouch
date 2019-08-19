<template>
    <mdb-modal v-if="this.dialogObj.dialogshow" @show="handleShow" @close="close" info>
        <mdb-modal-header v-if="dialogObj.titleCon" class="text-center"  :close="false">
            <p class="heading" style="width:100%;">{{dialogObj.titleCon}}</p>
        </mdb-modal-header>
        <mdb-modal-body  class="text-center">
            <mdb-icon icon="bell" size="4x" class="animated rotateIn mb-4"/>
            <p>{{dialogObj.dialogCon}}</p>
        </mdb-modal-body>
        <mdb-modal-footer center>
            <mdb-btn color="primary" @click="confirm" :disabled="isDisabled">
                {{dialogObj.dialogBtnname}}
            </mdb-btn>
            <mdb-btn outline="primary" @click="cancal">取消</mdb-btn>
        </mdb-modal-footer>
    </mdb-modal>
</template>
<script>
    export default {
        name:"dialogBox",
        props:["dialogObj","isDisabled"],
        data(){
            return{
                
            }
        },
        mounted(){
            
        },
        methods:{
            close(){
                this.cancal()
            },
            cancal(){
                this.$emit("dialogCancal")
            },
            handleShow() {
            
            },
            confirm(){
                this.show = false
                this.$emit("dialogConfirm")
            }
        }
    }
</script>
<style lang="less" scoped>

</style>

