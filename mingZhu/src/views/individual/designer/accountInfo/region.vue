<template>
  <mdb-container class="region">
    <mdb-row style="padding:0.9375rem 0;font-size: 1rem; color:#333;margin-bottom：0.875rem;">
      <mdb-col md="7">
        区域国家
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="7">
        <div class="outline-input">
          <mdb-input 
          type="text"
          size="lg" 
          label="城市"
          v-model.trim="city"
          outline />
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="7">
        <div class="md-outline-select">
          <label class="label active">国家&nbsp;<span style="color:red;">*</span></label>
          <mdb-select 
            outline 
            class="mb-0 mt-0"
            @getValue="getProvince" 
            :options="options1"
          />
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="7">
        <div class="md-outline-select">
            <label class="label active" >州省&nbsp;<span style="color:red;">*</span></label>
            <mdb-select 
              outline 
              class="mb-0 mt-0"
              @getValue="getSelectValue" 
              :options="options2"
            />
          </div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="7">
        <div class="outline-input">
          <mdb-input 
          type="text"
          size="lg" 
          label="邮编"
          v-model.trim="postcode"
          @change="isNumChange"
          outline />
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row style="padding-top:2.25rem !important;padding-bottom:2.25rem;">
      <mdb-col md="12" class="text-left">
          <mdb-btn color="primary" class="btn212_60" @click.native="update">更 新</mdb-btn>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        city: '',
        nation: '',
        province: '',
        postcode: '',
        options1: [
          { text: '请选择', value: null, disabled: true, selected: true }
        ],  
        options2: [
          { text: '请选择', value: null, disabled: true, selected: true }
        ]
      }
    },
    mounted() {
      this.id = localStorage.getItem("userId") || sessionStorage.getItem("userId")
      this.getNation()
    },
    methods: {
      isNumChange(value) {
        if(value){
          this.postcode = value.replace( /[^0-9]/g,'')
        }
      },
      update() {
        if(!this.city){
          this.$message.error("请输入城市")
          return
        }
        let regu = /^[a-zA-Z\u4e00-\u9fa5]+$/
        if(!regu.test(this.city)){
          this.$message.error("城市只能是英文或汉字")
          return
        }
        if(this.city.length>50){
          this.$message.error("城市最长50个字")
          return
        }
        if(!this.postcode){
          this.$message.error("请输入邮编")
          return
        }
        let reg = /^[0-9]*$/
        if(!reg.test(this.postcode)){
          this.$message.error("邮编只限数字")
          return
        }
        if(this.postcode.length>50){
          this.$message.error("邮编最长50个字")
          return
        }
        let params = {
          designerId: this.id,
          country: this.nation,
          state: this.province,
          city: this.city,
          postcode: this.postcode
        }
        this.api.updateLocation(params).then(res=>{
          if(res.code == 0){
            this.$message.info("更新成功");
          }
        })
      },
      getNation() {
        this.api.getLocation(this.id).then(res=>{
          if(res.code==0){
            this.city = res.data[0].city
            this.nation = res.data[0].country
            this.province = res.data[0].state
            this.postcode = res.data[0].postcode
          }
        }).then(res=>{
          this.api.getNation().then(res => {
            let options = res.data
            options.map(item=>{
              item.text=item.label
              if(item.label == this.nation){
                item.selected = true
              }
            });
            this.options1= options
          })
        })
      },
      getProvince(value) {
        if(!value){
          return
        }
        this.nation = value;
        this.api.getProvince(value).then(res => {
          let options = res.data
          options.map(item=>{
            item.text=item.label
            if(item.label == this.province){
              item.selected = true
            }
          });
          this.options2= options
        })
      },
      getSelectValue(value){
        this.province = value
      }
    }
  }
</script>

<style lang="less" scoped>
.region{
  .w522{
    width: 522px;
  }
  .mb24{
    margin-bottom: 24px;
  }
}

</style>
