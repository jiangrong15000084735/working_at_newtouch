<template>
  <mdb-container class="mingzhu-service px-0">
    <!-- 报名开始 -->
    <mdb-row class="mb-4">
      <mdb-col md="5">
         <div class="date-box">
            <label class="label-date" :class="disabled?'disabled':''">报名开始日期</label>
            <mdb-date-picker
              class="w-100"
              required
              :date="applyBeginDate"
              :option="option"
              @getValue="getApplyBeginDate"
              :limit="limit"
              :class="disabled?'disabled':''"
            ></mdb-date-picker>
          </div>
          <div class="tip-error mt-2" v-if="applyBeginDateError">{{applyBeginDateError}}</div>
      </mdb-col>
      <mdb-col md="5">
        <div class="date-box">
          <label class="label-date" :class="disabled?'disabled':''">报名开始时间</label>
          <div class="time">
              <mdb-time-picker
                :value="applyBeginTime"
                id="bookBeginTime"
                :placeholder="applyBeginTime.time"
                :hoursFormat="24"
                @getValue="getApplyBeginTime"
                :class="disabled?'disabled':''"
              />
          </div>
          <div class="tip-error mt-2" v-if="applyBeginTimeError">{{applyBeginTimeError}}</div>
        </div>
      </mdb-col>
    </mdb-row>
    <!-- 报名截止 -->
    <mdb-row class="mb-4">
      <mdb-col md="5">
         <div class="date-box">
            <label class="label-date" :class="disabled?'disabled':''">报名截止日期</label>
            <mdb-date-picker
              class="w-100"
              required
              :date="applyEndDate"
              :option="option"
              @getValue="getApplyEndDate"
              :limit="limit"
              :class="disabled?'disabled':''"
            ></mdb-date-picker>
          </div>
          <div class="tip-error mt-2" v-if="applyEndDateError">{{applyEndDateError}}</div>
      </mdb-col>
      <mdb-col md="5">
        <div class="date-box">
          <label class="label-date" :class="disabled?'disabled':''">报名截止时间</label>
          <div class="time">
              <mdb-time-picker
                :value="applyEndTime"
                id="bookBeginTime"
                :placeholder="applyEndTime.time"
                :hoursFormat="24"
                @getValue="getApplyEndTime"
                :class="disabled?'disabled':''"
              />
          </div>
          <div class="tip-error mt-2" v-if="applyEndTimeError">{{applyEndTimeError}}</div>
        </div>
      </mdb-col>
    </mdb-row>
    <!-- 设计开始 -->
    <mdb-row class="mb-4">
      <mdb-col md="5">
        <div class="date-box">
          <label class="label-date" :class="disabled?'disabled':''">设计开始日期</label>
          <mdb-date-picker
            class="w-100"
            required
            :date="designBeginDate"
            :option="option"
            @getValue="getDesignBeginDate"
            :limit="limit"
            :class="disabled?'disabled':''"
          ></mdb-date-picker>
        </div>
        <div class="tip-error mt-2" v-if="designBeginDateError">{{designBeginDateError}}</div>
      </mdb-col>
      <mdb-col md="5">
        <div class="date-box">
          <label class="label-date" :class="disabled?'disabled':''">设计开始时间</label>
          <div class="time">
              <mdb-time-picker
                :value="designBeginTime"
                id="bookBeginTime"
                :placeholder="designBeginTime.time"
                :hoursFormat="24"
                @getValue="getDesignBeginTime"
                :class="disabled?'disabled':''"
              />
          </div>
          <div class="tip-error mt-2" v-if="designBeginTimeError">{{designBeginTimeError}}</div>
        </div>
      </mdb-col>
    </mdb-row>
    <!-- 设计截止 -->
    <mdb-row class="mb-4">
      <mdb-col md="5">
        <div class="date-box">
            <label class="label-date" :class="disabled?'disabled':''">设计截止日期</label>
            <mdb-date-picker
              class="w-100"
              required
              :date="designEndDate"
              :option="option"
              @getValue="getDesignEndDate"
              :limit="limit"
              :class="disabled?'disabled':''"
            ></mdb-date-picker>
          </div>
          <div class="tip-error mt-2" v-if="designEndDateError">{{designEndDateError}}</div>
      </mdb-col>
      <mdb-col md="5">
        <div class="date-box">
          <label class="label-date" :class="disabled?'disabled':''">设计截止时间</label>
          <div class="time">
              <mdb-time-picker
                :value="designEndTime"
                id="bookBeginTime"
                :placeholder="designEndTime.time"
                :hoursFormat="24"
                @getValue="getDesignEndTime"
                :class="disabled?'disabled':''"
              />
          </div>
          <div class="tip-error mt-2" v-if="designEndTimeError">{{designEndTimeError}}</div>
        </div>
      </mdb-col>
    </mdb-row>
    <!-- 预期递交成果文件截止日期 -->
    <mdb-row class="mb-4">
      <mdb-col md="5">
        <div class="date-box">
          <label class="label-date" :class="disabled?'disabled':''">预期递交成果文件截止日期</label>
          <mdb-date-picker
            class="w-100"
            required
            :date="signUpDeadLine"
            :option="option"
            @getValue="getPickerValue2"
            :limit="limit"
            :class="disabled?'disabled':''"
          ></mdb-date-picker>
          <div class="tip-error mt-2" v-if="endTimeError">{{endTimeError}}</div>
        </div>
      </mdb-col>
      <mdb-col md="5">
        <div class="date-box">
          <label class="label-date" :class="disabled?'disabled':''">预期递交成果文件截止时间</label>
          <div class="time">
              <mdb-time-picker
                :value="signUpDeadLineTime"
                id="signUpDeadLineTime"
                :placeholder="signUpDeadLineTime.time"
                :hoursFormat="24"
                @getValue="getSignUpDeadLineTime"
                :class="disabled?'disabled':''"
              />
          </div>
          <div class="tip-error mt-2" v-if="signUpDeadLineTimeError">{{signUpDeadLineTimeError}}</div>
        </div>
      </mdb-col>
    </mdb-row>
    <!-- 书面提问截止日期 -->
    <mdb-row class="mb-4">
      <mdb-col md="5">
        <div class="date-box">
          <label class="label-date" :class="disabled?'disabled':''">书面提问截止日期</label>
          <mdb-date-picker
            class="w-100"
            required
            :date="bookEndDate"
            :option="option"
            @getValue="getBookEndDate"
            :limit="limit"
            :class="disabled?'disabled':''"
          ></mdb-date-picker>
        </div>
        <div class="tip-error mt-2" v-if="bookEndDateError">{{bookEndDateError}}</div>
      </mdb-col>
      <mdb-col md="5">
        <div class="date-box">
          <label class="label-date" :class="disabled?'disabled':''">书面提问截止时间</label>
          <div class="time">
              <mdb-time-picker
                :value="bookEndTime"
                id="bookBeginTime"
                :placeholder="bookEndTime.time"
                :hoursFormat="24"
                @getValue="getBookEndTime"
                :class="disabled?'disabled':''"
              />
          </div>
          <div class="tip-error mt-2" v-if="bookEndTimeError">{{bookEndTimeError}}</div>
        </div>
      </mdb-col>
    </mdb-row>
    <!-- 书面答疑回复截止日期-->
    <mdb-row  class="mb-4">
      <mdb-col md="5">
         <div class="date-box">
            <label class="label-date" :class="disabled?'disabled':''">书面答疑回复截止日期</label>
            <mdb-date-picker
              class="w-100"
              required
              :date="bookAnswerDate"
              :option="option"
              @getValue="getBookAnswerDate"
              :limit="limit"
              :class="disabled?'disabled':''"
            ></mdb-date-picker>
          </div>
          <div class="tip-error mt-2" v-if="bookAnswerDateError">{{bookAnswerDateError}}</div>
      </mdb-col>
      <mdb-col md="5">
        <div class="date-box">
          <label class="label-date" :class="disabled?'disabled':''">书面答疑回复截止时间</label>
          <div class="time">
              <mdb-time-picker
                :value="bookAnswerTime"
                id="bookBeginTime"
                :placeholder="bookAnswerTime.time"
                :hoursFormat="24"
                @getValue="getBookAnswerTime"
                :class="disabled?'disabled':''"
              />
          </div>
          <div class="tip-error mt-2" v-if="bookAnswerTimeError">{{bookAnswerTimeError}}</div>
        </div>
      </mdb-col>
    </mdb-row>
    <!-- 补充文件截止递交日期 -->
    <mdb-row class="mb-4">
      <mdb-col md="5">
        <div class="date-box">
            <label class="label-date" :class="disabled?'disabled':''">补充文件截止递交日期</label>
            <mdb-date-picker
              class="w-100"
              required
              :date="documentSubmissionDate"
              :option="option"
              @getValue="getBocumentSubmissionDate"
              :limit="limit"
              :class="disabled?'disabled':''"
            ></mdb-date-picker>
          </div>
          <div class="tip-error mt-2" v-if="documentSubmissionDateError">{{documentSubmissionDateError}}</div>
      </mdb-col>
      <mdb-col md="5">
        <div class="date-box">
          <label class="label-date" :class="disabled?'disabled':''">补充文件截止递交时间</label>
          <div class="time">
              <mdb-time-picker
                :value="documentSubmissionTime"
                id="documentSubmissionTime"
                :placeholder="documentSubmissionTime.time"
                :hoursFormat="24"
                @getValue="getDocumentSubmissionTime"
                :class="disabled?'disabled':''"
              />
          </div>
          <div class="tip-error mt-2" v-if="documentSubmissionTimeError">{{documentSubmissionTimeError}}</div>
        </div>
      </mdb-col>
    </mdb-row>
  </mdb-container>
</template>
<script>
import { setTimeout, clearTimeout } from "timers";
export default {
  data() {
    return {
      disabled:false,
      limit: [
        {
          type: "weekday",
          available: [1, 2, 3, 4, 5, 6, 0]
        },
        {
          type: "fromto",
          from: new Date(),
          to: ""
        }
      ],
      option: {
        type: "day",
        week: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        month: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        format: "YYYY/MM/DD",
        placeholder: "",
        inputStyle: {
          width: "100%",
          display: "inline-block",
          padding: "6px 0.725rem",
          "line-height": "1.375rem", 
          "font-size": "0.875rem",
          border: "0.125rem solid #fff",
          "box-shadow": "0 1px 3px 0 rgba(0, 0, 0, 0.2)",
          "border-radius": "0.125rem",
          color: "#333"
        },
        color: {
          header: "primary",
          headerText: "white",
          checkedDay: "primary"
        },
        buttons: {
          ok: "确定",
          cancel: "取消"
        }
      },

      //报名开始
      applyBeginDate:{
        time:""
      },
      applyBeginTime:{
        time:""
      },
      //报名结束
      applyEndDate:{
        time:""
      },
      applyEndTime:{
        time:""
      },
      //设计开始
      designBeginDate:{
        time:""
      },
      designBeginTime:{
        time:""
      },
      //设计结束
      designEndDate:{
        time:""
      },
      designEndTime:{
        time:""
      },

      // bookBeginDate:{  //书面提问开始日期
      //   time: ""
      // },
      // bookBeginTime:{  //书面提问开始时间
      //   time:""
      // },
      bookEndDate:{  //书面提问结束日期
        time:""
      },
      bookEndTime:{  //书面提问结束时间
        time:""
      },
      bookAnswerDate:{  // 书面答疑回复日期
        time:""
      },
      bookAnswerTime:{ // 书面答疑回复时间
        time:""
      },
      documentSubmissionDate:{  //补充文件日期
        time:""
      },
      documentSubmissionTime:{  //补充文件时间
        time:""
      },
      
      midTermDeadLine: {
        time: ""
      },
      signUpDeadLine: {
        time: ""
      },
      signUpDeadLineTime: {
        time: ""
      },
      actives: 4,
      collectProgramType: null,
      projectOPenDate: null,
      projectEndDate: null,
      required: {
        id: null,
        dockingNum: "",
        signUpDuration: "",
        midTermDeadLine: null,
        signUpDeadLine: null,
        signUpDeadLineTime:null,
        questionDealLine: null,
        questionReplyTime: null,
        extFileDeadLine: null,
        projectId: this.$route.query.id,
          
        // writeAskBeginDate:"",// 书面提问开始日期
        // writeAskBeginTime:"",//书面提问开始时间 

        writeAskEndDate:"",//书面提问截止日期 
        writeAskEndTime:"",//书面提问截止时间 

        writeAnswerDate:"",//书面答疑回复日期  
        writeAnswerTime:"",//书面答疑回复时间  

        addFileEndDate:"",  //补充文件截止递交日期 
        addFileEndTime:"", //补充文件截止递交时间

        applyBeginTime:"", // 报名开始日期
        applyBeginDate:"", // 报名开始时间
          
        applyEndDate:"",  //报名截止日期
        applyEndTime:"",  //报名截止时间
          
        designBeginDate:"", //设计开始日期
        designBeginTime:"",  //设计开始时间
          
        designEndDate:"",  //设计截止日期
        designEndTime:"",  //设计截止时间
      },

      beginTimeError: null,
      endTimeError: null,
      dockingNumError: null,
      signUpDurationError:null,
      startDate: null,
      endDate: null,
      releaseDate:null,

      signUpDeadLineTimeError:null,

      applyBeginTimeError:null, //报名开始
      applyBeginDateError:null, 

      applyEndDateError:null, //报名结束
      applyEndTimeError:null, 

      designBeginDateError:null, //设计开始
      designBeginTimeError:null, 

      designEndDateError:null, //设计结束
      designEndTimeError:null, 

      // bookBeginDateError:null,  //书面提问开始
      // bookBeginTimeError:null,

      bookEndDateError:null,  //书面提问结束
      bookEndTimeError:null,

      bookAnswerDateError: null,  //书面答疑回复
      bookAnswerTimeError: null,
      
      documentSubmissionTimeError: null, //补充文件提交
      documentSubmissionDateError: null,
    };
  },
  
  methods: {
    getSignUpDeadLineTime(value){
      this.required.signUpDeadLineTime = value
      if(!this.required.signUpDeadLineTime){
        this.signUpDeadLineTimeError = "请选择预期递交成果文件截止时间";
      }else{
        this.signUpDeadLineTimeError = null;
      }
    },
    // 报名开始日期
    getApplyBeginDate(value){
      this.required.applyBeginDate = value;
      let applyBeginDate = Number(new Date(this.required.applyBeginDate));
      let applyEndDate = Number(new Date(this.required.applyEndDate));
      let releaseDate = Number(new Date(this.releaseDate));
      if(!applyBeginDate){
        this.applyBeginDateError = "请选择报名开始日期";
      } else if(applyBeginDate>0&&applyEndDate>0&&applyBeginDate>=applyEndDate){
        this.applyBeginDateError = "报名开始日期必须小于结束日期";
        this.applyEndDateError = null;
      } else if(releaseDate>0&&applyBeginDate>0&&applyBeginDate<=releaseDate){
        this.applyBeginDateError = "报名时间必须大于项目发布时间";
      }else{
        this.applyBeginDateError = null;
        this.applyEndDateError = null;
      }
    },
    // 报名开始时间
    getApplyBeginTime(value){
      this.required.applyBeginTime = value;
      if(!this.required.applyBeginTime){
        this.applyBeginTimeError = "请选择报名开始时间";
      }else{
        this.applyBeginTimeError = null;
      }
    },
    // 报名结束日期
    getApplyEndDate(value){
      this.required.applyEndDate = value;
      let applyBeginDate = Number(new Date(this.required.applyBeginDate));
      let applyEndDate = Number(new Date(this.required.applyEndDate));
      let designBeginDate = Number(new Date(this.required.designBeginDate)); //设计开始日期
      if(!applyEndDate){
        this.applyEndDateError = "请选择报名截止日期";
      } else if(applyBeginDate>0&&applyEndDate>0&&applyBeginDate>=applyEndDate){
        this.applyEndDateError = "报名截止日期必须大于报名开始日期"
        this.applyBeginDateError = null;
      } else if(designBeginDate>0&&applyEndDate>0&&applyEndDate>=designBeginDate){
        this.applyEndDateError = "报名时间必须小于设计时间"
        this.designBeginDateError = null
      }else{
        this.applyEndDateError = null;
        this.applyBeginDateError = null;
        this.designBeginDateError = null
      }
    },
    // 报名结束时间
    getApplyEndTime(value){
      this.required.applyEndTime = value; //报名截止时间
      if(!this.required.applyEndTime){
        this.applyEndTimeError = "请选择报名截止时间";
      }else{
        this.applyEndTimeError = null;
      }
    },
    // 设计开始日期
    getDesignBeginDate(value){
      this.required.designBeginDate = value
      let designBeginDate = Number(new Date(this.required.designBeginDate)); //设计开始日期
      let designEndDate = Number(new Date(this.required.designEndDate));
      let applyEndDate = Number(new Date(this.required.applyEndDate));
      if(!designBeginDate){
        this.designBeginDateError = "请选择设计开始日期"
      } else if(designBeginDate>0&&designEndDate>0&&designBeginDate>=designEndDate){
        this.designBeginDateError = "设计开始日期必须小于设计结束日期"
        this.designEndDateError = null
      } else if(applyEndDate>0&&designBeginDate>0&&designBeginDate<=applyEndDate){
        this.designBeginDateError = "设计时间必须大于报名时间"
        this.applyEndDateError = null;
      } else {
        this.designBeginDateError = null
        this.designEndDateError = null
        this.applyEndDateError = null;
      }
    },
    //设计开始时间
    getDesignBeginTime(value){
      this.required.designBeginTime = value
      if(!this.required.designBeginTime){
        this.designBeginTimeError = "请选择设计开始时间"
      }else{
        this.designBeginTimeError = null;
      }
    },
    //设计结束日期
    getDesignEndDate(value){
      this.required.designEndDate = value
      let designBeginDate = Number(new Date(this.required.designBeginDate)); //设计开始日期
      let designEndDate = Number(new Date(this.required.designEndDate));
      if(!designEndDate){
        this.designEndDateError = "请选择设计截止日期";
      } else if(designBeginDate>0&&designEndDate>0&&designEndDate<=designBeginDate){
        this.designEndDateError = "设计截止日期必须大于设计开始日期"
        this.designBeginDateError = null
      }else{
        this.designEndDateError = null
        this.designBeginDateError = null
      }
    },
    //设计结束时间
    getDesignEndTime(value){
      this.required.designEndTime = value
      if(!this.required.designEndTime){
        this.designEndTimeError = "请选择设计截止时间"
      }else{
        this.designEndTimeError = null
      }
    },

    // getBookBeginDate(value){  //书面提问开始日期
    //   this.required.writeAskBeginDate = value
    //   let bookBeginDate = Number(new Date(this.required.writeAskBeginDate));
    //   let bookEndDate = Number(new Date(this.required.writeAskEndDate));
    //   if(!bookBeginDate){
    //     this.bookBeginDateError = "请选择书面提问开始日期";
    //   }if(bookEndDate>0&&bookBeginDate>0&&bookBeginDate>=bookEndDate){
    //     this.bookBeginDateError = "书面提问开始日期必须小于书面提问结束日期";
    //     this.bookEndDateError = null;
    //   }else{
    //     this.bookBeginDateError = null;
    //     this.bookEndDateError = null
    //   }
    // },
    // getBookBeginTime(value){  //书面提问开始时间
    //   this.required.writeAskBeginTime = value;
    //   if(!this.required.writeAskBeginTime){
    //     this.bookBeginTimeError = "请选择书面提问开始时间";
    //   }else{
    //     this.bookBeginTimeError = null;
    //   }
    // },
    getBookEndDate(value){    //书面提问截止日期
      this.required.writeAskEndDate = value;
      // let bookBeginDate = Number(new Date(this.required.writeAskBeginDate));
      let bookEndDate = Number(new Date(this.required.writeAskEndDate));
      // let bookAnswerDate = Number(new Date(this.required.writeAnswerDate));
      if(!bookEndDate){
        this.bookEndDateError = "请选择书面提问截止日期"
      }
      // if(bookEndDate&&bookBeginDate&&bookBeginDate>=bookEndDate){
      //   this.bookEndDateError = "书面提问截止日期必须大于书面提问开始日期";
      //   this.bookBeginDateError = null;
      //   this.bookAnswerDateError = null;
      // }else if(bookEndDate&&bookAnswerDate&&bookEndDate>=bookAnswerDate){
      //   this.bookEndDateError = "书面提问截止日期必须小于书面答疑日期";
      //   this.bookAnswerDateError = null;
      //   this.bookBeginDateError = null;
      // }
      else{
        this.bookEndDateError = null;
        // this.bookBeginDateError = null;
        // this.bookAnswerDateError = null;
      }
    },
    getBookEndTime(value){    //书面提问截止时间
       //书面提问截止时间  
      this.required.writeAskEndTime = value;
      if(!this.required.writeAskEndTime){
        this.bookEndTimeError = "请选择书面提问截止时间";
      }else{
        this.bookEndTimeError = null;
      }
    },
    getBookAnswerDate(value){   //书面答疑回复日期
     //书面答疑回复日期  
     this.required.writeAnswerDate = value
     let bookAnswerDate = Number(new Date(this.required.writeAnswerDate));
    //  let bookEndDate = Number(new Date(this.required.writeAskEndDate));
     if(!value){
        this.bookAnswerDateError = "请选择书面答疑回复日期"
      }
      // else if(bookAnswerDate&&bookEndDate&&bookAnswerDate<=bookEndDate){
      //   this.bookAnswerDateError = "书面答疑回复日期必须大于书面提问时间"
      //   this.bookEndDateError = null;
      // }
      else{
        this.bookAnswerDateError = null;
        this.bookEndDateError = null;
      }
    },
    getBookAnswerTime(value){ //书面答疑回复时间
     //书面答疑回复时间  
      this.required.writeAnswerTime = value;
      if(!value){
        this.bookAnswerTimeError = "请选择书面答疑回复时间"
      }else{
        this.bookAnswerTimeError = null;
      }
    },
    getBocumentSubmissionDate(value){  //补充文件日期
      //补充文件截止递交日期  
      this.required.addFileEndDate = value;
      let addFileEndDate = Number(new Date(this.required.addFileEndDate));
      // let bookAnswerDate = Number(new Date(this.required.writeAnswerDate));
      if(!addFileEndDate){
        this.documentSubmissionDateError = "请选择补充文件截止递交日期"
      }
      // else if(addFileEndDate&&bookAnswerDate&&addFileEndDate<=bookAnswerDate){
      //   this.documentSubmissionDateError = "补充文件日期必须大于书面答疑回复日期"
      //   this.bookAnswerDateError = null;
      // }
      else{
        this.documentSubmissionDateError = null;
        this.bookAnswerDateError = null;
      }
    },
    getDocumentSubmissionTime(value){  //补充文件时间
     //补充文件截止递交日期  
      this.required.addFileEndTime = value;
      if(!this.required.addFileEndTime){
        this.documentSubmissionTimeError = "请选择补充文件截止递交时间";
      }else{
        this.documentSubmissionTimeError =null;
      }
    },
    checkedDockingNum(value) {
      if(event&&event.type=="message"){
        let reg = /^[1-9][0-9]*$/;
        if(value){
          this.required.dockingNum = value.replace( /[^0-9]/g,'')
        }
        if (!this.required.dockingNum) {
          this.dockingNumError = "请输入对接次数要求";
        } else if (!reg.test(this.required.dockingNum)) {
          this.dockingNumError = "您输入的格式有误";
        }
        else if(this.required.dockingNum>=100){
          this.dockingNumError = "您输入的长度有误";
        } else {
          this.dockingNumError = null;
        }
      }
    },
    // signUpDurationNum(value){
    //   if(event&&event.type=="message"){
    //     let reg = /^[1-9][0-9]*$/;
    //     if(value){
    //       this.required.signUpDuration = value.replace( /[^0-9]/g,'')
    //     }
    //     if(!this.required.signUpDuration){
    //       this.signUpDurationError = "请输入公开报名信息公布时长（自然日）"
    //     } else if(!reg.test(this.required.signUpDuration)){
    //       this.signUpDurationError = "您输入的格式有误"
    //     }
    //     else if(this.required.signUpDuration>=100){
    //       this.signUpDurationError = "您输入的长度有误"
    //     }else{
    //       this.signUpDurationError = ""
    //     }
    //   }

    // },
    // getPickerValue1(value) {
    //   this.required.midTermDeadLine = value;
    //   let beginTime = Number(new Date(this.required.midTermDeadLine)); //开始时间
    //   let endTime = Number(new Date(this.required.signUpDeadLine)); //结束时间
    //   let startDate = Number(new Date(this.startDate));
    //   let endDate = Number(new Date(this.endDate));
    //   let nowData = Number(new Date());
    //   if (beginTime === 0) {
    //     this.beginTimeError = "请选择时间";
    //   } else if (
    //     this.collectProgramType == 3 &&
    //     endTime != 0 &&
    //     beginTime > endTime
    //   ) {
    //     this.beginTimeError =
    //       "预期中期成果文件截止递交时间应晚于预期成果文件截止递交时间";
    //     this.endTimeError = null;
    //   } else if (beginTime < startDate) {
    //     this.beginTimeError = "预期中期成果文件截止递交时间应晚于项目开始时间";
    //   } else if (beginTime > endDate) {
    //     this.beginTimeError = "预期中期成果文件截止递交时间应早于项目结束时间";
    //   } else {
    //     this.beginTimeError = null;
    //   }
    // },
    // 预期成果文件递交截止时间
    getPickerValue2(value) {
      this.required.signUpDeadLine = value;
      let beginTime = Number(new Date(this.required.midTermDeadLine)); //开始时间
      let endTime = Number(new Date(this.required.signUpDeadLine)); //结束时间
      // let startDate = Number(new Date(this.startDate));
      // let endDate = Number(new Date(this.endDate));
      let nowData = Number(new Date()); //当前时间
      if (endTime === 0) {
        this.endTimeError = "请选择时间";
      }
      //  else if (
      //   this.collectProgramType == 3 &&
      //   beginTime != 0 &&
      //   beginTime > endTime
      // ) {
      //   this.endTimeError =
      //     "预期中期成果文件截止递交时间应晚于预期成果文件截止递交时间";
      //   this.beginTimeError = null;
      // }
      //  else if (endTime < startDate) {
      //   this.endTimeError = "预期成果文件截止递交时间应晚于项目开始时间";
      // } else if (endTime > endDate) {
      //   this.endTimeError = "预期成果文件截止递交时间应早于项目结束时间";
      // }
       else {
        this.endTimeError = null;
      }
    },
    emptyError(){

    },
    checkLen(){
      let isCheckPass = true
      // if(this.required.dockingNum&&this.dockingNumError){
      //   document.documentElement.scrollTop = 200;
      //   isCheckPass = false;
      // }else{
      //   this.dockingNumError = null;
      // }
      // if(this.required.signUpDuration&&this.signUpDurationError){
      //   document.documentElement.scrollTop = 200;
      //   isCheckPass = false;
      // }else{
      //   this.signUpDurationError = null;
      // }
      if(this.required.midTermDeadLine&&this.beginTimeError){
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.beginTimeError = null
      }
      if(this.required.signUpDeadLine&&this.endTimeError){
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.endTimeError = null
      }
      if(this.required.signUpDeadLineTime&&this.signUpDeadLineTimeError){
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.signUpDeadLineTimeError = null
      }
      if(this.required.applyBeginDate&&this.applyBeginDateError){   //报名开始日期
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.applyBeginDateError = null
      }
      if(this.required.applyBeginTime&&this.applyBeginTimeError){  //报名开始时间
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.applyBeginTimeError = null
      }
      if(this.required.applyEndDate&&this.applyEndDateError){  //报名截止日期
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.applyEndDateError = null
      }
      if(this.required.applyEndTime&&this.applyEndTimeError){  //报名截止时间
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
         this.applyEndTimeError = null
      }
      if(this.required.designBeginDate&&this.designBeginDateError){  //设计开始日期
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.designBeginDateError = null
      }
      if(this.required.designBeginTime&&this.designBeginTimeError){ //设计开始时间
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.designBeginTimeError = null
      }
      if(this.required.designEndDate&&this.designEndDateError){   //设计截止日期
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.designBeginDateError = null
      }
      if(this.required.designEndTime&&this.designEndTimeError){  //设计截止时间
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.designEndTimeError = null
      }
      // if(this.required.writeAskBeginDate&&this.bookBeginDateError){ //书面提问开始日期
      //   document.documentElement.scrollTop = 200;
      //   isCheckPass = false;
      // }else{
      //   this.bookBeginDateError = null;
      // }
      // if(this.required.writeAskBeginTime&&this.bookBeginTimeError){   //书面提问开始时间
      //   document.documentElement.scrollTop = 200;
      //   isCheckPass = false;
      // }else{
      //   this.bookBeginTimeError = null;
      // }
      if(this.required.writeAskEndDate&&this.bookEndDateError){ //书面提问结束日期
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      } else{
        this.bookEndDateError = null;
      }
      if(this.required.writeAskEndTime&&this.bookEndTimeError){  //书面提问结束时间
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.bookEndTimeError = null
      }
      if(this.required.writeAnswerDate&&this.bookAnswerDateError){  //书面答疑回复日期
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.bookAnswerDateError ==null
      }
      if(this.required.writeAnswerTime&&this.bookAnswerTimeError){ //书面答疑回复time
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.bookAnswerTimeError = null
      }
      if(this.required.addFileEndDate&&this.documentSubmissionDateError){ //补充文件提交date
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.documentSubmissionDateError = null;
      }
      if(this.required.addFileEndTime&&this.documentSubmissionTimeError){ //补充文件提交time
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }else{
        this.documentSubmissionTimeError = null;
      }
      return isCheckPass
    },
    temporarilySave() {
      let isCheckPass = this.checkLen();
      if(isCheckPass){
        this.required.projectId = this.$route.query.id;
        this.required.type = 1;
        this.api.requiredDateUpdate(this.required).then(res => {
          if (res.code == 0) {
            this.required.id = res.data;
            this.$message("已保存,若需填写下一页,请提交!");
          } else {
            this.$message(res.msg);
          }
        });
      }
      return isCheckPass
    },
    checkForm() {
      let isCheckPass = true;
      if(this.collectProgramType==3){
         if (!this.required.midTermDeadLine||this.beginTimeError) {
          this.beginTimeError ="请选择时间"
          document.documentElement.scrollTop = 200;
          isCheckPass = false;
        }
      }
      if (!this.required.signUpDeadLine||this.endTimeError) {
        this.endTimeError ="请选择时间"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      // if(this.collectProgramType!=1){
      //    if (!this.required.dockingNum||this.dockingNumError) {
      //       this.dockingNumError = "请输入对接次数要求";
      //       document.documentElement.scrollTop = 200;
      //       isCheckPass = false;
      //     }
      // }
      // if(this.collectProgramType==1||this.collectProgramType==4){
      //   if(!this.required.signUpDuration|| this.signUpDurationError){
      //     this.signUpDurationError = "请输入公开报名信息公布时长（自然日）"
      //     document.documentElement.scrollTop = 200;
      //     isCheckPass = false;
      //   }
      // }
      if(!this.required.signUpDeadLineTime||this.signUpDeadLineTimeError){
        this.signUpDeadLineTimeError = "请选择预期递交成果文件截止时间"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(!this.required.applyBeginDate||this.applyBeginDateError){
        this.applyBeginDateError = "请输入报名开始日期"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(!this.required.applyBeginTime||this.applyBeginTimeError){
        this.applyBeginTimeError = "请选择报名开始时间"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(!this.required.applyEndDate||this.applyEndDateError){
        this.applyEndDateError = "请选择报名截止日期"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(!this.required.applyEndTime||this.applyEndTimeError){
        this.applyEndTimeError = "请选择报名截止时间"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(!this.required.designBeginDate||this.designBeginDateError){
        this.designBeginDateError = "请选择设计开始日期"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(!this.required.designBeginTime||this.designBeginTimeError){
        this.designBeginTimeError = "请选择设计开始时间"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(!this.required.designEndDate||this.designEndDateError){
        this.designBeginDateError = "请选择设计截止日期"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(!this.required.designEndTime||this.designEndTimeError){
        this.designEndTimeError = "请选择设计截止时间"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      // if(!this.required.writeAskBeginDate||this.bookBeginDateError){ //书面提问开始日期
      //   this.bookBeginDateError = "请选择书面提问开始日期";
      //   document.documentElement.scrollTop = 200;
      //   isCheckPass = false;
      // }
      // if(!this.required.writeAskBeginTime||this.bookBeginTimeError){   //书面提问开始时间
      //   this.this.bookBeginTimeError = "请选择书面提问开始时间";
      //   document.documentElement.scrollTop = 200;
      //   isCheckPass = false;
      // }
      if(!this.required.writeAskEndDate||this.bookEndDateError){ //书面提问结束日期
        this.bookEndDateError = "请选择书面提问截止日期";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(!this.required.writeAskEndTime||this.bookEndTimeError){  //书面提问结束时间
        this.bookEndTimeError = "请选择书面提问截止时间"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(!this.required.writeAnswerDate||this.bookAnswerDateError){  //书面答疑回复日期
        this.bookAnswerDateError = "请选择书面答疑截止回复日期"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(!this.required.writeAnswerTime||this.bookAnswerTimeError){ //书面答疑回复time
        this.bookAnswerTimeError = "请选择书面答疑截止回复时间"
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(!this.required.addFileEndDate||this.documentSubmissionDateError){ //补充文件提交date
        this.documentSubmissionDateError = "请选择补充文件截止递交日期";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      if(!this.required.addFileEndTime||this.documentSubmissionTimeError){ //补充文件提交time
        this.documentSubmissionTimeError = "请选择补充文件截止递交时间";
        document.documentElement.scrollTop = 200;
        isCheckPass = false;
      }
      return isCheckPass;
    },
    submit() {
      let isCheckPass = this.checkForm();
      if (isCheckPass) {
        this.required.projectId = this.$route.query.id;
        this.required.type = 1;
        this.api.requiredDateSubmit(this.required).then(res => {
          if (res.code == 0) {
            this.$message("操作成功");
            this.required.id = res.data;
          } else {
            this.$message(res.msg);
          }
        });
      }
      return isCheckPass;
    }
  },
  created() {
    this.api.required(this.$route.query.id).then(res => {
      if (res.code == 0) {
        this.releaseDate = res.data.projectDO.releaseDate
        this.startDate = res.data.projectDO.beginTime;
        this.endDate = res.data.projectDO.endTime;
        if (res.data.requiredDateDO != null) {
          this.required = res.data.requiredDateDO
          this.required.id = res.data.requiredDateDO.id;
          this.required.dockingNum = res.data.requiredDateDO.dockingNum;
          this.required.signUpDuration = res.data.requiredDateDO.signUpDuration;
          this.required.midTermDeadLine =
            res.data.requiredDateDO.midTermDeadLine?res.data.requiredDateDO.midTermDeadLine.split(" ")[0]:"";
          this.required.signUpDeadLine = 
            res.data.requiredDateDO.signUpDeadLine?res.data.requiredDateDO.signUpDeadLine.split(" ")[0]:"";
          this.midTermDeadLine.time = this.required.midTermDeadLine;
          this.signUpDeadLine.time = this.required.signUpDeadLine;
          this.required.questionDealLine =
            res.data.requiredDateDO.questionDealLine;
          this.required.questionReplyTime =
            res.data.requiredDateDO.questionReplyTime;
          this.required.extFileDeadLine =
            res.data.requiredDateDO.extFileDeadLine;
          this.required.signUpDeadLineTime = res.data.requiredDateDO.signUpDeadLineTime?res.data.requiredDateDO.signUpDeadLineTime:"";
          this.signUpDeadLineTime.time = this.required.signUpDeadLineTime
          //   // 书面提问开始日期  
          // this.required.writeAskBeginDate = res.data.requiredDateDO.writeAskBeginDate?res.data.requiredDateDO.writeAskBeginDate.split(" ")[0]:"";
          // this.bookBeginDate.time = this.required.writeAskBeginDate;
          //     //书面提问开始时间  
          // this.required.writeAskBeginTime = res.data.requiredDateDO.writeAskBeginTime?res.data.requiredDateDO.writeAskBeginTime:"";
          // this.bookBeginTime.time = this.required.writeAskBeginTime;
              //书面提问截止日期  
          this.required.writeAskEndDate = res.data.requiredDateDO.writeAskEndDate?res.data.requiredDateDO.writeAskEndDate.split(" ")[0]:"";
          this.bookEndDate.time = this.required.writeAskEndDate;
              //书面提问截止时间  
          this.required.writeAskEndTime = res.data.requiredDateDO.writeAskEndTime?res.data.requiredDateDO.writeAskEndTime:"";
          this.bookEndTime.time = this.required.writeAskEndTime;
              //书面答疑回复日期  
          this.required.writeAnswerDate = res.data.requiredDateDO.writeAnswerDate?res.data.requiredDateDO.writeAnswerDate.split(" ")[0]:"";
          this.bookAnswerDate.time = this.required.writeAnswerDate;
              //书面答疑回复时间
          this.required.writeAnswerTime = res.data.requiredDateDO.writeAnswerTime?res.data.requiredDateDO.writeAnswerTime:"";
          this.bookAnswerTime.time = this.required.writeAnswerTime;
              //补充文件截止递交日期
          this.required.addFileEndDate = res.data.requiredDateDO.addFileEndDate?res.data.requiredDateDO.addFileEndDate.split(" ")[0]:"";
          this.documentSubmissionDate.time = this.required.addFileEndDate;
              //补充文件截止递交日期
          this.required.addFileEndTime = res.data.requiredDateDO.addFileEndTime?res.data.requiredDateDO.addFileEndTime:"";
          this.documentSubmissionTime.time = this.required.addFileEndTime;

           //报名开始时间
          this.required.applyBeginDate = res.data.requiredDateDO.applyBeginDate?res.data.requiredDateDO.applyBeginDate.split(" ")[0]:"";
          this.applyBeginDate.time = this.required.applyBeginDate 
           // 报名开始日期
          this.required.applyBeginTime =  res.data.requiredDateDO.applyBeginTime?res.data.requiredDateDO.applyBeginTime:"";
          this.applyBeginTime.time = this.required.applyBeginTime;
          //报名截止日期
          this.required.applyEndDate =  res.data.requiredDateDO.applyEndDate?res.data.requiredDateDO.applyEndDate.split(" ")[0]:"";
          this.applyEndDate.time = this.required.applyEndDate
          //报名截止时间
          this.required.applyEndTime =  res.data.requiredDateDO.applyEndTime?res.data.requiredDateDO.applyEndTime:"";
          this.applyEndTime.time = this.required.applyEndTime;
          //设计开始日期
          this.required.designBeginDate =  res.data.requiredDateDO.designBeginDate?res.data.requiredDateDO.designBeginDate.split(" ")[0]:"";
          this.designBeginDate.time = this.required.designBeginDate;
          //设计开始时间
          this.required.designBeginTime =  res.data.requiredDateDO.designBeginTime?res.data.requiredDateDO.designBeginTime:"";
          this.designBeginTime.time = this.required.designBeginTime;
          //设计截止日期
          this.required.designEndDate =  res.data.requiredDateDO.designEndDate?res.data.requiredDateDO.designEndDate.split(" ")[0]:"";
          this.designEndDate.time = this.required.designEndDate;
          //设计截止时间
          this.required.designEndTime =  res.data.requiredDateDO.designEndTime?res.data.requiredDateDO.designEndTime:"";
          this.designEndTime.time = this.required.designEndTime;
          if(res.data.requiredDateDO.nonEditable==0){
            this.disabled=true
          }
        }
        if (res.data.projectDO != null) {
          this.collectProgramType = res.data.projectDO.collectProgramType;
          this.projectOPenDate = res.data.projectDO.beginTime;
          this.projectEndDate = res.data.projectDO.endTime;
          if(res.data.projectDO.auditState==5||
          (res.data.requiredDateDO&&res.data.requiredDateDO.auditState&&res.data.requiredDateDO.auditState!=3)
          ){
            this.disabled=true
          }
        }
      }
    });
  }
};
</script>
<style lang="less" scoped>
// 服务周期
.mingzhu-service {
  .tip-error{
    color:red;
  }
  .date-box{
    position: relative;
    .label-date{
      position: absolute;
      color: #999;
      padding-left: 0.3125rem;
      padding-right: 0.3125rem;
      left: 0.5rem;
      top: 0.625rem;
      font-weight: 500;
      background: #ffffff;
      font-size: 0.75rem !important;
      transform: translateY(-100%);
    }
  }
}
</style>
<style lang="less">
.mingzhu-service {
  .cov-vue-date{
    input{
      width: 100% !important;
      height: 3.125rem !important;
    }
  }
  .week ul li{
    height: 3.125rem !important;
    min-height: 3.125rem !important;
  }
  .week ul li::after{
    height: 0 !important;
    display: none !important;
  }
  .datepickbox{
    input{
      box-shadow: none !important;
      border: 0.0625rem solid #dadce0  !important;
      border-radius: 0.25rem  !important;
    }
  }
  .time {
    .md-form {
      margin-top: 0 !important;
      margin-bottom:0 !important;
      input {
        width: 20.9375rem;
        padding: 0.375rem;
        line-height: 2.1875rem;
        font-size: 1rem;
        box-shadow: none !important;
        border: 1px solid #dadce0  !important;
        border-radius: 0.25rem  !important;
        color: rgb(95, 95, 95);
        margin-bottom: 0;
      }
    }
  }
  .time .form-control.timepicker {
    margin-right: 0 !important;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>


