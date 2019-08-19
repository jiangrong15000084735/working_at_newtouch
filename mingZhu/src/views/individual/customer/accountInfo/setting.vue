<template>
  <mdb-container class="setting-c">
    <mdb-row style="padding:0.9375rem 0;font-size: 1rem; color:#333;margin-bottom：0.875rem;">
      <mdb-col md="6">
        高级设置
      </mdb-col>
    </mdb-row>
    <mdb-row>
      <mdb-col md="7">
        <p class="h0">邮件偏好</p>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="7">
        <div class="form-check">
          <input type="radio" 
            class="form-check-input" 
            name="emailSetting" 
            id="emailSetting1"
            :checked="settings.emailSetting=='1'"
            value="1"
            v-model="settings.emailSetting"
            @change="handleRadio(settings.emailSetting)"
            >
          <label class="form-check-label" for="emailSetting1">只接收账户，项目，平台信息</label>
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col mb="7">
        <div class="form-check">
          <input type="radio" 
            class="form-check-input" 
            name="emailSetting" 
            id="emailSetting2"
            :checked="settings.emailSetting=='2'"
            value="2"
            v-model="settings.emailSetting"
            @change="handleRadio(settings.emailSetting)"
            >
          <label class="form-check-label" for="emailSetting2">在下方自定义邮件</label>
        </div>
      </mdb-col>
    </mdb-row>
    <div v-if="settings.emailSetting=='2'">
      <mdb-row class="mx-0">
        <mdb-col md="7" class="pl-0" style="border-bottom:1px dashed #e6e6e6;margin: 14px 0 12px;">
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col md="7">
          <p class="h0">推送内容<span style="color:#999;margin-left:5px;">(可多选)</span></p>
        </mdb-col>
      </mdb-row>
      <mdb-row v-if="settings.receiveType">
        <mdb-col md="7">
          <mdb-row>
            <mdb-col md="4">
              <div class="form-check">
                <input 
                type="checkbox" 
                id="checkbox1"
                class="form-check-input"
                :checked="settings.receiveType.includes('1')" 
                @change="handleCheckboxChange1">
                <label class="form-check-label" for="checkbox1">合筑文章</label>
              </div>
            </mdb-col>
            <mdb-col md="4">
              <div class="form-check">
                <input 
                type="checkbox" 
                id="checkbox2"
                class="form-check-input"
                :checked="settings.receiveType.includes('2')" 
                @change="handleCheckboxChange2">
                <label class="form-check-label" for="checkbox2">招标信息</label>
              </div>
            </mdb-col>
            <mdb-col md="4">
              <div class="form-check">
                <input 
                type="checkbox" 
                id="checkbox3"
                class="form-check-input"
                :checked="settings.receiveType.includes('3')" 
                @change="handleCheckboxChange3">
                <label class="form-check-label" for="checkbox3">来自朋友的优惠券</label>
              </div>
            </mdb-col>
          </mdb-row>
        </mdb-col>
      </mdb-row>
    </div>
    <mdb-row class="mx-0">
      <mdb-col md="7" class="pl-0" style="border-bottom:1px dashed #e6e6e6;margin: 1.5rem 0 1.375rem;"></mdb-col>
    </mdb-row>
    <mdb-row >
      <mdb-col md="7">
        <p class="h0" style="margin-bottom:1.375rem;">邮件发送设置</p>
      </mdb-col>
    </mdb-row>
    <mdb-row >
      <mdb-col md="7">
        <p style="color:#999; margin-bottom:1.25rem;">当发生以下情况时为我发送邮件</p>
      </mdb-col>
    </mdb-row>
    
    <mdb-row class="mb-4">
      <mdb-col md="7">
        <div class="md-outline-select">
          <label class="label active">账户发生问题</label>
          <mdb-select 
            outline 
            class="mb-0 mt-0"
            @getValue="getSelectValue1" 
            :options="options1"
          />
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="7">
        <div class="md-outline-select">
          <label class="label active">有人接受了邀请</label>
          <mdb-select 
            outline 
            class="mb-0 mt-0"
            @getValue="getSelectValue2" 
            :options="options2" 
          />
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="7">
        <div class="md-outline-select">
          <label class="label active">有人关注了我的招标信息（无短信）</label>
          <mdb-select 
            outline 
            class="mb-0 mt-0"
            @getValue="getSelectValue3" 
            :options="options3" 
          />
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mb-4">
      <mdb-col md="7">
        <div class="md-outline-select">
          <label class="label active">平台有新进展（如项目进入设计阶段，确认中标作品等）</label>
          <mdb-select 
            outline 
            class="mb-0 mt-0"
            @getValue="getSelectValue4" 
            :options="options4" 
          />
        </div>
      </mdb-col>
    </mdb-row>
    <mdb-row style="padding-top:3.75rem !important;">
      <mdb-col md="12" class="text-left">
          <mdb-btn color="primary" class="btn212_60" @click="update">更 新</mdb-btn>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>
<script>
  export default {
    data() {
      return {
        options1: [
            { text: '请选择', value: null, disabled: true, selected: true },
            { text: '每次', value: '1', selected: false },
            { text: '从不', value: '2', selected: false }
        ],
        options2: [
            { text: '请选择', value: null, disabled: true, selected: true },
            { text: '每次', value: '1', selected: false },
            { text: '每天至多2封', value: '2', selected: false },
            { text: '从不', value: '3', selected: false }
        ],
        options3: [
            { text: '请选择', value: null, disabled: true, selected: true },
            { text: '每次', value: '1', selected: false },
            { text: '每天至多2封', value: '2', selected: false },
            { text: '从不', value: '3', selected: false }
        ],
        options4: [
            { text: '请选择', value: null, disabled: true, selected: true },
            { text: '每次', value: '1', selected: false },
            { text: '从不', value: '3', selected: false }
        ],
        settings: {
          designerId: localStorage.getItem("userId") || sessionStorage.getItem("userId"),
          emailSetting: '',
          receiveType: null,
          accountSafe: "",
          acptInvit: "",
          conRequired: "",
          makeProgress: ""
        }
      }
    },
    methods: {
      // 邮件偏好
      handleRadio(value) {
        this.settings.emailSetting = value
        if(value==2){
          this.setSelected('options1', 1,1)
          this.setSelected('options2', 2,1)
          this.setSelected('options3', 2,2)
          this.setSelected('options4', 2,1)
        }else{
          this.setSelected('options1', 1,0)
          this.setSelected('options2', 2,0)
          this.setSelected('options3', 2,0)
          this.setSelected('options4', 2,0)
        }
      },
      handleCheckboxChange1(value){
        let num = '1'
        if(value){
          if(!this.settings.receiveType.includes(num)){
            this.settings.receiveType.push(num)
          }
        }else{
          if(this.settings.receiveType.includes(num)){
           this.settings.receiveType =  this.settings.receiveType.filter(item=>{
              return item != num
            })
          }
        }
      },
      handleCheckboxChange2(value){
        let num = '2'
        if(value){
          if(!this.settings.receiveType.includes(num)){
            this.settings.receiveType.push(num)
          }
        }else{
          if(this.settings.receiveType.includes(num)){
           this.settings.receiveType =  this.settings.receiveType.filter(item=>{
              return item != num
            })
          }
        }
      },
      handleCheckboxChange3(value){
        let num = '3'
        if(value){
          if(!this.settings.receiveType.includes(num)){
            this.settings.receiveType.push(num)
          }
        }else{
          if(this.settings.receiveType.includes(num)){
           this.settings.receiveType = this.settings.receiveType.filter(item=>{
              return item != num
            })
          }
        }
      },
      getSelectValue1(value) {
        this.settings.accountSafe = value
      },
      getSelectValue2(value) {
        this.settings.acptInvit = value
      },
      getSelectValue3(value) {
        this.settings.conRequired = value
      },
      getSelectValue4(value) {
        this.settings.makeProgress = value
      },
      // 获取设置信息
      getSettings() {
        let id = localStorage.getItem("userId") || sessionStorage.getItem("userId");
        this.api.getBossExtSetting().then(res => {
          if (res.code !== 0) {
            return
          }

          this.settings.receiveType = res.data?res.data.receiveType.split(","):[]

          this.setSelected('options1', 1, res.data?res.data.sendSettingDTO.accountSafe:0)
          this.setSelected('options2', 2, res.data?res.data.sendSettingDTO.acptInvit:0)
          this.setSelected('options3', 2, res.data?res.data.sendSettingDTO.conRequired:0)
          this.setSelected('options4', 1, res.data?res.data.sendSettingDTO.makeProgress:0)

          this.settings.emailSetting = res.data?res.data.emailSetting:'2'
          if(!res.data){
            this.settings.receiveType = ["1","2","3"]
            this.setSelected('options1', 1,1)
            this.setSelected('options2', 2,1)
            this.setSelected('options3', 2,2)
            this.setSelected('options4', 2,1)
          }
        })
      },
      update() {
        let params = {
          bossId: localStorage.getItem("userId") || sessionStorage.getItem("userId"),
          emailSetting: this.settings.emailSetting,
          receiveType: this.settings.receiveType.join(","),
          sendSettingDTO: {
            accountSafe: this.settings.accountSafe,
            acptInvit: this.settings.acptInvit,
            conRequired: this.settings.conRequired,
            makeProgress: this.settings.makeProgress
          }
        }
        this.api.saveBossExtSetting(params).then(res => {
          if (res.code == 0) {
            this.$message.info(res.msg);
            return
          }
          this.$message.error("操作失败");
        })
      },
      // 设置默认选中
      setSelected(target,type,num) {
        var options = [];
        if(!num){
          num = 0;
        }
        if(type == 1) {
          options = [
            { text: '请选择', value: null, disabled: true, selected: true },
            { text: '每次', value: '1', selected: false },
            { text: '从不', value: '2', selected: false }
          ]
        } else {
          options = [
            { text: '请选择', value: null, disabled: true, selected: true },
            { text: '每次', value: '1', selected: false },
            { text: '每天至多2封', value: '2', selected: false },
            { text: '从不', value: '3', selected: false }
          ]
        }

        options.forEach((item,index)=>{
          if( index == num ){
            options[index].selected=true
          } else {
            options[index].selected=false
          }
        })
        
        this[target] = options
      }
    },
    mounted() {
      this.getSettings()
    }
  }
</script>

<style scoped lang="less">
  .setting-c{
    padding-bottom: 30px;
    // text-align: left;
    // margin-bottom: 2rem;
    font-size: 14px !important;
  }
  .h0{
    color: #333333;
    margin-bottom: 12px;
    font-size: 14px;
  }
  .w522{
    width: 556px;
  }
  .mb24{
    margin-bottom: 24px;
  }
  .mb30{
    margin-bottom: 30px;
  }
  .condition {
    line-height: 2.9rem;
  }
</style>
<style lang="less">
.setting-c{
  .form-check{
    padding-left: 0 !important;
    // margin-right: 113px;
    label{
      color: #999 !important;
    }
  }
  // .form-check-input[type="radio"] + label:before, 
  // .form-check-input[type="radio"] + label:after, 
  // label.btn input[type="radio"] + label:before,
  // label.btn input[type="radio"] + label:after{
  //   margin: 0 !important;
  // }
  .form-check-label{
    color: #999999;
  }
  .form-check-input[type="radio"]:not(:checked) + label:before,
   .form-check-input[type="radio"]:not(:checked) + label:after, 
   label.btn input[type="radio"]:not(:checked) + label:before,
   label.btn input[type="radio"]:not(:checked) + label:after {
    border: 2px solid #999999;
   }
}
</style>