<template>
  <div class="project-progress">
    <p>项目进程</p>
    <div class="row">
      <div :class="{'col-lg-4':activeIndex === -1, 'col-lg-12': activeIndex !== -1}">
        <mdb-stepper simpleV class="progress-stepper" :class="{origin: activeIndex === -1}">
          <li v-for="(step, index) in steppers" :class="{active: activeIndex === index}" :key="index" slot="simple" @click="go(step, index)">
            <a>
              <span class="circle">{{index + 1}}</span>
              <span class="label">{{step.title}}</span>
            </a>
            <div class="step-view step-content grey lighten-3" v-if="activeIndex === index">
              <router-view></router-view>
            </div>
          </li>
          <!--<li class="completed" slot="simple">
            <a>
              <span class="circle">1</span>
              <span class="label">First step</span>
            </a>
          </li>
          <li class="active" slot="simple">
            <a>
              <span class="circle">2</span>
              <span class="label">Second step</span>
            </a>
            <div class="step-content grey lighten-3">

            </div>
          </li>
          <li class="warning" slot="simple">
            <a>
              <span class="circle"><i class="fas fa-exclamation"></i></span>
              <span class="label">Third step</span>
            </a>
          </li>
          <li slot="simple">
            <a>
              <span class="circle">4</span>
              <span class="label">Fourth step</span>
            </a>
          </li>-->
        </mdb-stepper>
      </div>
      <div class="col-lg-8" v-if="activeIndex === -1">
        <h1>项目进程</h1>
        <h2>项目完成百分比</h2>
        <div class="row">
          <div class="col-md-8">
            <lxx-progress v-model="percent"></lxx-progress>
          </div>
        </div>
        <h2>项目用时百分比</h2>
        <lxx-progress-circle radius="8rem" :percent="76"></lxx-progress-circle>
        <div>
          开始日期：<mdb-date-picker :date="startDate" :option="option" @getValue="getStartValue"></mdb-date-picker>
          结束日期：<mdb-date-picker :date="endDate" :option="option" @getValue="getEndValue"></mdb-date-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'project-progress',
    data () {
      return {
        startDate: new Date(),
        endDate: new Date(),
        percent: 55,
        activeIndex: -1,
        steppers: [{
          title: '答疑',
          path: '/a-q'
        }, {
          title: '中间成果',
          path: '/p-result'
        }, {
          title: '中间成果确认',
          path: '/p-result-confirm'
        }, {
          title: '完整成果',
          path: '/c-result'
        }],
        indexs: ['/project-progress/a-q', '/project-progress/p-result', '/project-progress/p-result-confirm', '/project-progress/c-result'],
        option: {
          type: 'day',
          week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          format: 'YYYY-MM-DD',
          placeholder: '请选择时间',
          inputStyle: {
            'display': 'inline-block',
            'padding': '6px',
            'line-height': '22px',
            'font-size': '16px',
            'border': '2px solid #fff',
            'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
            'border-radius': '2px',
            'color': '#5F5F5F'
          },
          color: {
            header: 'primary',
            headerText: 'white',
            checkedDay: 'primary'
          },
          buttons: {
            ok: '确定',
            cancel: '取消'
          }
        }
      }
    },
    watch: {
      $route (to) {
        let index = this.indexs.indexOf(to.path)
        this.activeIndex = index
      }
    },
    methods: {
      go (step, index) {
        this.activeIndex = index
        this.$router.push('/project-progress'+step.path)
      },
      getStartValue () {
        console.log('start value')
      },
      getEndValue () {
        console.log('end value')
      }
    }
  }
</script>

<style scoped lang="stylus">
  .project-progress
    margin-top 4rem
    min-height 32rem
    .step-view
      width 96%
</style>
