
<template>
  <mdb-container class="value-added-services-warp px-0">
    <mdb-row  class="mb-3">
      <mdb-col><p style="color:#333;">合筑空间提供多种增值服务，让您更加省心省力</p></mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="8">
         <tbl striped class="table-vas">
          <tbl-head>
            <tr>
              <th></th>
              <th>服务</th>
              <th>价格（单位：元）</th>
            </tr>
          </tbl-head>
          <tbl-body>
            <tr v-for="vas in optional" :key="vas.id">
              <td>
                <div class="checkbox-teal">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    name="valueAddedService"
                    :id="vas.id"
                    :value="vas.id"
                    v-model="vas.checked"
                    :disabled="disabled"
                    @change="selectAddValueService(vas.checked)"
                  >
                  <label class="form-check-label" :for="vas.id"></label>
                </div>
              </td>
              <td>{{vas.name}}</td>
              <td>{{vas.price?vas.price:"--"}}</td>
            </tr>
          </tbl-body>
        </tbl>
      </mdb-col>
    </mdb-row>
   
    <mdb-row class="mt-4">
      <mdb-col>
        <div class="checkbox-teal text-left" style="display:inline-block;vertical-align: middle;">
          <input
            type="checkbox"
            class="form-check-input"
            name="agreement"
            id="check1"
            :value="isagreement"
            v-model="isagreement"
            :disabled="disabled"
            @change="agreementClick(isagreement)"
          >
          <label class="form-check-label" for="check1"></label>
        </div><a @click.prevent="close" class="agreement">我同意合筑增值服务协议</a>
      </mdb-col>
    </mdb-row>
    <AddServiceAgreement :showModal="showModal" @agreementClick = "agreementClick"></AddServiceAgreement>
  </mdb-container>
</template>
<script>
import AddServiceAgreement from '@/components/agreement/addService'
export default {
  name: "valueAddedServices",
  components:{AddServiceAgreement},
  data() {
    return {
      showModal:false,
      isagreement: false,
      Unpaid: [],
      optional: [],
      selectServiceList: [],
      disabled:false,
    };
  },
  methods: {
    close(){
      this.showModal = !this.showModal;
    },
    selectAddValueService(val){

    },
    agreementClick(val){
      // this.isagreement = !this.isagreement
      this.isagreement=val;
      this.showModal = false;
    },
    submit() {
      let isCheckEd = true;
      this.selectServiceList=[];
      this.optional.forEach(item=>{
        this.selectServiceList.push(item.checked);
      });
      if (this.selectServiceList.length !=this.optional.length) {
        isCheckEd = false
        this.$message("请联系项目经理，确认增值服务。");
      } else if(!this.isagreement) {
        isCheckEd = false
        this.$message("请确认增值服务协议。");
      }
      return isCheckEd
    },
    queryChoiceList() {
      this.api.queryChoiceList({projectId:this.$route.query.id}).then(res => {
        if (res.code == 0) {
          this.optional = res.data
          this.optional.forEach(item=>{
             item.checked = true;
            if(res.data[0].status==3){
              // item.checked = true;
              this.disabled = true;
              this.isagreement = true;
            }
            // else{
            //   item.checked = false;
            // }
          })
        }
      });
    },
  },
  created() {
    this.queryChoiceList()
  }
};
</script>
<style lang="less" scoped>
.agreement{
  display:inline-block;
  vertical-align: middle;
  height: 1.5625rem;
  line-height: 1.5625rem;
  text-decoration:underline !important;
}
.agreement:hover{
  color: #4285f4 !important;
}
</style>

<style lang="less">
.value-added-services-warp {
  .table-vas{
    margin-bottom:1.625rem;
    border: 0.0625rem solid #dee2e6;
    border-radius: 0.25rem;
    // width:40.625rem;
    table{
      margin-bottom: 0 !important;
      th,td{
        width: 33.333333%;
        text-align: center;
      }
      th{
        color:#333;
        font-size:1rem;
      }
      td{
        font-size:0.875rem;
      }
    }
  }
  .btn-outline-primary {
    border: 0.125rem solid #4285f4 !important;
    background-color: transparent !important;
    color: #4285f4 !important;
  }
}
</style>
