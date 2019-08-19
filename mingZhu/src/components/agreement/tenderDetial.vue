<template>
    <div>
        <div>
        <!-- 招标细则 -->
        <mdb-modal centered v-if="showModal" @close="close" info>
        <mdb-modal-header center :close="false">
            <p class="heading" style="width:100%;text-align:center;">招标细则</p>
        </mdb-modal-header>
        <mdb-modal-body>
            <TenderDetialAgreement></TenderDetialAgreement>
        </mdb-modal-body>
        <mdb-modal-footer center>
            <mdb-btn color="primary" @click.native="accept">我已阅读并接受</mdb-btn>
            <mdb-btn outline="primary" @click.native="noAccept">不接受</mdb-btn>
        </mdb-modal-footer>
        </mdb-modal>
    </div>
    </div>
</template>
<script>
import TenderDetialAgreement from '@/components/agreement/tenderDetialAgreement'
export default {
    props:["showModal"],
    components:{TenderDetialAgreement},
    methods:{
        close(){
            this.$emit("close");
        },
        accept(){
            this.$emit("agreementClick",true)
        },
        noAccept(){
            this.$emit("agreementClick",false)
        }
    }
}
</script>
<style lang="less" scoped>

</style>
