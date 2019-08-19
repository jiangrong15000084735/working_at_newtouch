<template>
  <mdb-container class="region-c">
    <mdb-row style="padding:0.9375rem 0;font-size: 1rem; color:#333;margin-bottom：0.875rem;">
      <mdb-col md="7" >
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
          v-model.trim="youbian"
          @change="isNumChange"
          outline />
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row style="padding-top:2.25rem !important;">
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
        nation: null,
        province: null,
        country:'',
        youbian: '',
        options1: [{ text: '请选择', value: null, disabled: true, selected: true }],  
        options2: [{ text: '请选择', value: null, disabled: true, selected: true }],
        state: ''
      }
    },
    mounted() {
      this.id = localStorage.getItem("userId") || sessionStorage.getItem("userId")
      this.getNation()
      // this.queryWorkAddressByBossId()
      
    },
    methods: {
      isNumChange(value) {
        if(value){
          this.youbian = value.replace( /[^0-9]/g,'')
        }
      },
      queryWorkAddressByBossId(){
        this.api.queryWorkAddressByBossId(this.id).then(res => {
          this.city = res.data[0].city
          this.youbian = res.data[0].postcode
          this.state = res.data[0].state
          let option = this.options1
          let _this = this
          option.forEach((item,index)=>{
            if( item.text == res.data[0].country ){
              _this.$set(option[index],"selected",true)
            } else {
              _this.$set(option[index],"selected",false)
            }
          })
        })
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
        if(!this.youbian){
          this.$message.error("请输入邮编")
          return
        }
        let reg = /^[0-9]*$/
        if(!reg.test(this.youbian)){
          this.$message.error("邮编只限数字")
          return
        }
        if(this.youbian.length>50){
          this.$message.error("邮编最长50个字")
          return
        }
        let params = {
          bossId: this.id,
          country: this.nation,
          state: this.province,
          city: this.city,
          postcode:this.youbian

        }
        this.api.saveBossWorkCity(params).then(res => {
          if(res.code===0){
            this.$message.info("更新成功");
          }else{
             this.$message.error(res.msg);
          }
        })
      },
      async getNation() {
        let resdata = await this.api.queryWorkAddressByBossId(this.id)
        if(resdata.code===1){
          // this.$message.error(resdata.msg)
          // return
        }else{
          this.city = resdata.data[0].city
          this.youbian = resdata.data[0].postcode
          this.state = resdata.data[0].state
          this.country = resdata.data[0].country
        }
        this.api.getNation().then(res => {
          this.options1= JSON.parse(JSON.stringify(res.data).replace(/label/g,"text"))
          let option = this.options1
          let _this = this
          option.forEach((item,index)=>{
            if( item.text ==  this.country){
              _this.$set(option[index],"selected",true)
            } else {
              _this.$set(option[index],"selected",false)
            }
          })
        })
      },
      getProvince(value) {
        if(!value){
          return
        }
        this.nation = value
        this.api.getProvince(value).then(res => {
          this.options2 = JSON.parse(JSON.stringify(res.data).replace(/label/g,"text"))
          let option2 = this.options2
          let _this = this
          option2.forEach((item,index)=>{
            if( item.text == this.state ){
              _this.$set(option2[index],"selected",true)
            } else {
              _this.$set(option2[index],"selected",false)
            }
          })
        })
      },
      getSelectValue(value){
        this.province = value
      },
      getSelProvince(value) {
      }
    }
  }
</script>

<style scoped>
/* .w522{
  width: 522px;
}
.mb24{
  margin-bottom: 24px;
} */
</style>