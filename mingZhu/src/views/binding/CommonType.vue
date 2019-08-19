<template>
  <div class="commonType2">
    <headerPart></headerPart>
    <template v-for="(item,index) in typeData">
      <div
        :key="index"
        v-if="item.key == path"
      >
        <!-- <div class="type-title">
          {{item.tit}}
        </div> -->
        <div class="classic-tabs">
          <mdb-tabs
            @activeTab="getActiveTabIndex"
            :active="activeIndex"
            class="mb-5"
            color="grey"
            :links="[
              { text: '委托设计' },
              { text: '公开招标' },
              { text: '邀请招标' },
              { text: '邀请+公开招标' }]"
          />
        </div>
        <h2>什么是{{item.tit}}?</h2>
        <div class="type-content">
          <p v-html="item.content">
          </p>
        </div>
        <h2>{{item.tit}}模式流程</h2>
        <!-- <div class="img-wrap">
          <img :src="item.imgSrc" alt="">
        </div> -->
        <section class="section" id="section">
          <div class="step-bar" id="stepBar">
            <div class="step-progress" id="stepProgress"></div>
            <div class="step-indicator" id="stepIndicator"></div>
            <div class="step-start"></div>
            <div class="step-end" id="stepEnd"></div>
          </div>
          <div class="flow-scenes" id="flowScenes">
            <template v-for="(list,key) in item.flows">
              <div class="flow-scene flow-scene1" :key="key" v-if="key%2 == 0">
                <div class="scene-img">
                  <!-- <img :src="list.imgSrc" class="transLeft" /> -->
                  <img :src="list.imgSrc" class="aniRight" />
                </div>
                <div class="scene-text">
                  <!-- <div class="scene-tag transRight" > -->
                  <div class="scene-tag aniLeft">
                    <div class="tag-left">{{list.number}}</div>
                    <div class="tag-right">{{list.tag}}</div>
                  </div>
                  <div class="scene-title aniLeft">{{list.title}}</div>
                  <div class="scene-content aniLeft">{{list.content}}</div>
                </div>
              </div>
              <div class="flow-scene flow-scene2" :key="key" v-if="key%2 != 0">
                <div class="scene-img">
                  <img :src="list.imgSrc" class="aniLeft" />
                </div>
                <div class="scene-text">
                  <div class="scene-tag aniRight">
                    <div class="tag-left">{{list.number}}</div>
                    <div class="tag-right">{{list.tag}}</div>
                  </div>
                  <div class="scene-title aniRight">{{list.title}}</div>
                  <div class="scene-content aniRight">{{list.content}}</div>
                </div>
              </div>
            </template>
          </div>
        </section>
      </div>
    </template>
    <footerPart></footerPart>
  </div>
</template>

<script>
  // import {WOW} from 'wowjs'
  // new WOW().init();
  import headerPart from '@/components/header.vue'
  import footerPart from '@/components/footer.vue'

  export default {
    name: "commonType2",
    components: {
      headerPart,
      footerPart
    },
    data() {
      return {
        typeData: [
          {
            key: 'InvitBinding',
            tit: "公开招标",
            content: '<p>公开招标模式是面向平台全网开放的方案征集方式。您发布的项目经平台审核通过后，所有通过验证的设计资源均可报名参加（最终参与名单根据招标要求进行筛选）。</p> <p>·在公考招标模式下最终入围名单和中标名单将依据招标文件由评审专家辅助客户决出，参与的设计资源所获的报酬依据入围和中选名单分配设计奖金。</p> <p>·公开招标模式具有征集流程最短、传播范围广、设计费用最低的特征，在设计费用合理的前提下有利于在最短的时间内吸引最多的设计资源参与设计，适合希望在短时间内拿到较多设计深度较浅的概念方案的客户。</p>',
            // imgSrc: require('@/assets/images/type1.jpg')
            flows: [
              {
                imgSrc: require('@/assets/images/model1.png'),
                number: '01',
                tag: '项目启动',
                title: '提交项目初步需求',
                content: '提交您项目的基本信息，成功提交后合筑空间将为您进行项目立项，并有专职项目经理为您提供进一步服务，开启您的合筑设计之旅'
              },
              {
                imgSrc: require('@/assets/images/model3.png'),
                number: '02',
                tag: '需求对接',
                title: '填写及完善项目设计任务书',
                content: '设计任务书是设计师执行设计任务的核心依据文件，合筑空间将引导您对任务书进行规范化、专业化填写，确保内容完整传达您的设计需求，同时合筑空间提供项目策划、代写任务书等增值服务'
              },
              {
                imgSrc: require('@/assets/images/model3.png'),
                number: '03',
                tag: '需求对接',
                title: '填写及完善方案征集条件',
                content: '设计任务书是设计师执行设计任务的核心依据文件，合筑空间将引导您对任务书进行规范化、专业化填写，确保内容完整传达您的设计需求，同时合筑空间提供项目策划、代写任务书等增值服务'
              },
              {
                imgSrc: require('@/assets/images/model5.png'),
                number: '04',
                tag: '需求对接',
                title: '签订方案征集代理合同',
                content: '需求对接完成后合筑将与客户签订方案征集代理合同，锁定需求。项目将在您支付相关代理服务费用后开始进行设计资源的对接'
              },
              {
                imgSrc: require('@/assets/images/model3.png'),
                number: '05',
                tag: '资源对接',
                title: '公开发布项目信息',
                content: '面向平台全网公开您的项目信息（屏蔽相关敏感信息）。所有通过验证的设计资源均可报名参加。'
              },
              {
                imgSrc: require('@/assets/images/model8.png'),
                number: '06',
                tag: '资源对接',
                title: '确定设计资源名单',
                content: '根据方案征集合同相关要求从邀请设计师列表及公开报名列表确定最终参与项目的设计资源名单'
              },
              {
                imgSrc: require('@/assets/images/model9.png'),
                number: '07',
                tag: '资源对接',
                title: '签订设计合同支付设计启动金',
                content: '设计资源对接完成后合筑将与客户与设计师签订方案设计合同。项目将在您支付项目启动金后（个人客户或未通过审核的用户需全额支付项目设计费）正式进入设计阶段。'
              },
              {
                imgSrc: require('@/assets/images/model10.png'),
                number: '08',
                tag: '设计阶段',
                title: '项目里程碑管理',
                content: '专属项目经理将根据项目特征及实际情况，为您的项目量身制定项目里程碑，实时管理设计师设计进度'
              },
              {
                imgSrc: require('@/assets/images/model11.png'),
                number: '09',
                tag: '设计阶段',
                title: '答疑、补充要求',
                content: '专属项目经理将辅助您对设计师的设计疑问进行答复和管理，协助您提供有利于设计推进的补充文件，确保项目顺利推进'
              },
              {
                imgSrc: require('@/assets/images/model12.png'),
                number: '10',
                tag: '评审阶段',
                title: '专家评审',
                content: '由业内权威专家及客户代表组成评审委员会，对项目成果进行的的网络直播评审，确保评审结果公正、公正'
              },
              {
                imgSrc: require('@/assets/images/model13.png'),
                number: '11',
                tag: '评审阶段',
                title: '托管设计费余款',
                content: '评审结束，评审结果符合方案征集代理合同及设计合同，客户支付设计费余款，平台向客户移交相关成果文件'
              },
              {
                imgSrc: require('@/assets/images/model14.png'),
                number: '12',
                tag: '评审阶段',
                title: '确定最终排序及中标方案',
                content: '提交您项目的基本信息，成功提交后合筑空间将为您进行项目立项，并有专职项目经理为您提供进一步服务，开启您的合筑设计之旅'
              }
            ]
          },
          {
            key: 'InvitAndPublic',
            tit: '邀请竞标+公开竞标',
            content: '<p>邀请招标+公开招标模式是结合了邀请招标和公开招标两种方案模式的征集方式。您的项目一经提交，平台将基于大数据算法为您智能匹配合适的项目设计资源，您可以从平台为项目匹配的推荐列表中选择项目设计资源，也可以自行选择设计资源形成邀请设计资源列表。您发布的项目经平台审核通过后，合筑空间将为您对接您希望邀请的设计资源进行设计，同时将您的项目信息面向全网设计资源发布。所有通过验证的设计资源均可报名参加（最终参与名单根据招标要求进行筛选）。</p><p>最终入围名单和中标名单将依据招标文件由评审专家辅助客户决出，参与的设计资源所获的报酬依据入围和中选名单分配设计奖金。</p> <p>邀请招标+公开招标模式下邀请的设计师既有明确的指向性，不论是平台经智能算法推荐的设计师，还是您自行挑选的设计师，均有比较高的匹配度，可以邀请到最适合本项目的设计资源参与设计，又有足够的广泛性，项目信息全网公布后可以获得良好的传播性。邀请招标+公开招标模式适合对项目有一定的想法和特定预期，希望通过提高设计师匹配度获得满意方案的客户，同时又希望获得较多可能性的客户。</p>',
            // 'imgSrc': require('@/assets/images/type2.jpg')
            flows: [
              {
                imgSrc: require('@/assets/images/model1.png'),
                number: '01',
                tag: '项目启动',
                title: '提交项目初步需求',
                content: '提交您项目的基本信息，成功提交后合筑空间将为您进行项目立项，并有专职项目经理为您提供进一步服务，开启您的合筑设计之旅'
              },
              {
                imgSrc: require('@/assets/images/model2.png'),
                number: '02',
                tag: '需求对接',
                title: '选择拟邀请的设计资源',
                content: '您的项目一经提交，平台将基于大数据算法为你智能匹配合适的项目设计资源，您可以从平台为项目匹配的推荐列表中选择项目设计资源，也可以自行选择设计资源形成邀请设计资源列表'
              },
              {
                imgSrc: require('@/assets/images/model3.png'),
                number: '03',
                tag: '需求对接',
                title: '填写及完善项目设计任务书',
                content: '设计任务书是设计师执行设计任务的核心依据文件，合筑空间将引导您对任务书进行规范化、专业化填写，确保内容完整传达您的设计需求，同时合筑空间提供项目策划、代写任务书等增值服务'
              },
              {
                imgSrc: require('@/assets/images/model3.png'),
                number: '04',
                tag: '需求对接',
                title: '填写及完善方案征集条件',
                content: '设计任务书是设计师执行设计任务的核心依据文件，合筑空间将引导您对任务书进行规范化、专业化填写，确保内容完整传达您的设计需求，同时合筑空间提供项目策划、代写任务书等增值服务'
              },
              {
                imgSrc: require('@/assets/images/model5.png'),
                number: '05',
                tag: '需求对接',
                title: '签订方案征集代理合同',
                content: '需求对接完成后合筑将与客户签订方案征集代理合同，锁定需求。项目将在您支付相关代理服务费用后开始进行设计资源的对接'
              },
              {
                imgSrc: require('@/assets/images/model6.png'),
                number: '06',
                tag: '资源对接',
                title: '对接拟邀请的设计资源',
                content: '平台根据您提交的拟邀请资源列表，在方案征集代理合同内相关条款的约定的周期和次数内对接设计资源'
              },
              {
                imgSrc: require('@/assets/images/model3.png'),
                number: '07',
                tag: '资源对接',
                title: '公开发布项目信息',
                content: '面向平台全网公开您的项目信息（屏蔽相关敏感信息）。所有通过验证的设计资源均可报名参加。'
              },
              {
                imgSrc: require('@/assets/images/model8.png'),
                number: '08',
                tag: '资源对接',
                title: '确定设计资源名单',
                content: '根据方案征集合同相关要求从邀请设计师列表及公开报名列表确定最终参与项目的设计资源名单'
              },
              {
                imgSrc: require('@/assets/images/model9.png'),
                number: '09',
                tag: '资源对接',
                title: '签订设计合同支付设计启动金',
                content: '设计资源对接完成后合筑将与客户与设计师签订方案设计合同。项目将在您支付项目启动金后（个人客户或未通过审核的用户需全额支付项目设计费）正式进入设计阶段。'
              },
              {
                imgSrc: require('@/assets/images/model10.png'),
                number: '10',
                tag: '设计阶段',
                title: '项目里程碑管理',
                content: '专属项目经理将根据项目特征及实际情况，为您的项目量身制定项目里程碑，实时管理设计师设计进度'
              },
              {
                imgSrc: require('@/assets/images/model11.png'),
                number: '11',
                tag: '设计阶段',
                title: '答疑、补充要求',
                content: '专属项目经理将辅助您对设计师的设计疑问进行答复和管理，协助您提供有利于设计推进的补充文件，确保项目顺利推进'
              },
              {
                imgSrc: require('@/assets/images/model12.png'),
                number: '12',
                tag: '评审阶段',
                title: '专家评审',
                content: '由业内权威专家及客户代表组成评审委员会，对项目成果进行的的网络直播评审，确保评审结果公正、公正'
              },
              {
                imgSrc: require('@/assets/images/model13.png'),
                number: '13',
                tag: '评审阶段',
                title: '托管设计费余款',
                content: '评审结束，评审结果符合方案征集代理合同及设计合同，客户支付设计费余款，平台向客户移交相关成果文件'
              },
              {
                imgSrc: require('@/assets/images/model14.png'),
                number: '14',
                tag: '评审阶段',
                title: '确定最终排序及中标方案',
                content: '提交您项目的基本信息，成功提交后合筑空间将为您进行项目立项，并有专职项目经理为您提供进一步服务，开启您的合筑设计之旅'
              }
            ]
          },
          {
            key: 'BiddingInvitation',
            tit: '邀请竞标',
            content: '<p>邀请招标模式是定向邀请指定的设计师或设计团队进行方案比选竞标的方案征集方式。您的项目一经提交，平台将基于大数据算法为您智能匹配合适的项目设计资源，您可以从平台为项目匹配的推荐列表中选择项目设计资源，也可以自行选择设计资源形成邀请设计资源列表。您发布的项目经平台审核通过后，合筑空间将为您对接您希望邀请的设计资源进行设计。</p><p>最终入围名单和中标名单将依据招标文件由评审专家辅助客户决出，参与的设计资源所获的报酬依据入围和中选名单分配设计奖金。</p><p>邀请招标模式下邀请的设计师有明确的指向性，不论是平台经智能算法推荐的设计师，还是您自行挑选的设计师，均有比较高的匹配度，可以邀请到最适合本项目的设计资源参与设计。邀请招标模式适合对项目有一定的想法和特定预期，希望通过提高设计师匹配度获得满意方案的客户。</p>',
            // 'imgSrc': require('@/assets/images/type2.jpg')
            flows: [
              {
                imgSrc: require('@/assets/images/model1.png'),
                number: '01',
                tag: '项目启动',
                title: '提交项目初步需求',
                content: '提交您项目的基本信息，成功提交后合筑空间将为您进行项目立项，并有专职项目经理为您提供进一步服务，开启您的合筑设计之旅'
              },
              {
                imgSrc: require('@/assets/images/model2.png'),
                number: '02',
                tag: '需求对接',
                title: '选择拟邀请的设计资源',
                content: '您的项目一经提交，平台将基于大数据算法为你智能匹配合适的项目设计资源，您可以从平台为项目匹配的推荐列表中选择项目设计资源，也可以自行选择设计资源形成邀请设计资源列表'
              },
              {
                imgSrc: require('@/assets/images/model3.png'),
                number: '03',
                tag: '需求对接',
                title: '填写及完善项目设计任务书',
                content: '设计任务书是设计师执行设计任务的核心依据文件，合筑空间将引导您对任务书进行规范化、专业化填写，确保内容完整传达您的设计需求，同时合筑空间提供项目策划、代写任务书等增值服务'
              },
              {
                imgSrc: require('@/assets/images/model3.png'),
                number: '04',
                tag: '需求对接',
                title: '填写及完善方案征集条件',
                content: '设计任务书是设计师执行设计任务的核心依据文件，合筑空间将引导您对任务书进行规范化、专业化填写，确保内容完整传达您的设计需求，同时合筑空间提供项目策划、代写任务书等增值服务'
              },
              {
                imgSrc: require('@/assets/images/model5.png'),
                number: '05',
                tag: '需求对接',
                title: '签订方案征集代理合同',
                content: '需求对接完成后合筑将与客户签订方案征集代理合同，锁定需求。项目将在您支付相关代理服务费用后开始进行设计资源的对接'
              },
              {
                imgSrc: require('@/assets/images/model6.png'),
                number: '06',
                tag: '资源对接',
                title: '对接拟邀请的设计资源',
                content: '平台根据您提交的拟邀请资源列表，在方案征集代理合同内相关条款的约定的周期和次数内对接设计资源'
              },
              {
                imgSrc: require('@/assets/images/model8.png'),
                number: '07',
                tag: '资源对接',
                title: '确定设计资源名单',
                content: '根据方案征集合同相关要求从邀请设计师列表及公开报名列表确定最终参与项目的设计资源名单'
              },
              {
                imgSrc: require('@/assets/images/model9.png'),
                number: '08',
                tag: '资源对接',
                title: '签订设计合同支付设计启动金',
                content: '设计资源对接完成后合筑将与客户与设计师签订方案设计合同。项目将在您支付项目启动金后（个人客户或未通过审核的用户需全额支付项目设计费）正式进入设计阶段。'
              },
              {
                imgSrc: require('@/assets/images/model10.png'),
                number: '09',
                tag: '设计阶段',
                title: '项目里程碑管理',
                content: '设计资源对接完成后合筑将与客户与设计师签订方案设计合同。项目将在您支付项目启动金后（个人客户或未通过审核的用户需全额支付项目设计费）正式进入设计阶段。'
              },
              {
                imgSrc: require('@/assets/images/model11.png'),
                number: '10',
                tag: '设计阶段',
                title: '答疑、补充要求',
                content: '专属项目经理将辅助您对设计师的设计疑问进行答复和管理，协助您提供有利于设计推进的补充文件，确保项目顺利推进'
              },
              {
                imgSrc: require('@/assets/images/model12.png'),
                number: '11',
                tag: '评审阶段',
                title: '专家评审',
                content: '由业内权威专家及客户代表组成评审委员会，对项目成果进行的的网络直播评审，确保评审结果公正、公正'
              },
              {
                imgSrc: require('@/assets/images/model13.png'),
                number: '12',
                tag: '评审阶段',
                title: '托管设计费余款',
                content: '评审结束，评审结果符合方案征集代理合同及设计合同，客户支付设计费余款，平台向客户移交相关成果文件'
              },
              {
                imgSrc: require('@/assets/images/model14.png'),
                number: '13',
                tag: '评审阶段',
                title: '确定最终排序及中标方案',
                content: '提交您项目的基本信息，成功提交后合筑空间将为您进行项目立项，并有专职项目经理为您提供进一步服务，开启您的合筑设计之旅'
              }
            ]
          },
          {
            key: 'CommissionedInvitation',
            tit: '直接委托',
            content: '</p>直接委托模式是定向邀请指定的设计师或设计团队进行方案设计，并买断所有设计资源设计成果的方案征集方法。您的项目一经提交，平台将基于大数据算法为您智能匹配合适的项目设计资源，您可以从平台为项目匹配的推荐列表中选择项目设计资源，也可以自行选择设计资源形成邀请设计资源列表。您发布的项目经平台审核通过后，合筑空间将为您对接您希望邀请的设计资源进行设计。</p> </p>在直接委托模式下，最终所有设计资源的设计成果均归属您所有，您需要为每一个符合要求的设计方案支付设计费用。</p></p>直接委托模式下邀请的设计师有明确的指向性，不论是平台经智能算法推荐的设计师，还是您自行挑选的设计师，均有比较高的匹配度，可以邀请到最适合本项目的设计资源参与设计，同时可以做大限度的激发设计团队的创作热情。直接委托模式适合对项目有一定的想法和特定预期，希望通过指定设计师高品质完成项目方案的客户。</p>',
            // 'imgSrc': require('@/assets/images/type2.jpg')
            flows: [
              {
                imgSrc: require('@/assets/images/model1.png'),
                number: '01',
                tag: '项目启动',
                title: '提交项目初步需求',
                content: '提交您项目的基本信息，成功提交后合筑空间将为您进行项目立项，并有专职项目经理为您提供进一步服务，开启您的合筑设计之旅'
              },
              {
                imgSrc: require('@/assets/images/model2.png'),
                number: '02',
                tag: '需求对接',
                title: '选择拟邀请的设计资源',
                content: '您的项目一经提交，平台将基于大数据算法为你智能匹配合适的项目设计资源，您可以从平台为项目匹配的推荐列表中选择项目设计资源，也可以自行选择设计资源形成邀请设计资源列表'
              },
              {
                imgSrc: require('@/assets/images/model3.png'),
                number: '03',
                tag: '需求对接',
                title: '填写及完善项目设计任务书',
                content: '设计任务书是设计师执行设计任务的核心依据文件，合筑空间将引导您对任务书进行规范化、专业化填写，确保内容完整传达您的设计需求，同时合筑空间提供项目策划、代写任务书等增值服务'
              },
              {
                imgSrc: require('@/assets/images/model3.png'),
                number: '04',
                tag: '需求对接',
                title: '填写及完善方案征集条件',
                content: '设计任务书是设计师执行设计任务的核心依据文件，合筑空间将引导您对任务书进行规范化、专业化填写，确保内容完整传达您的设计需求，同时合筑空间提供项目策划、代写任务书等增值服务'
              },
              {
                imgSrc: require('@/assets/images/model5.png'),
                number: '05',
                tag: '需求对接',
                title: '签订方案征集代理合同',
                content: '需求对接完成后合筑将与客户签订方案征集代理合同，锁定需求。项目将在您支付相关代理服务费用后开始进行设计资源的对接'
              },
              {
                imgSrc: require('@/assets/images/model6.png'),
                number: '06',
                tag: '资源对接',
                title: '对接拟邀请的设计资源',
                content: '平台根据您提交的拟邀请资源列表，在方案征集代理合同内相关条款的约定的周期和次数内对接设计资源'
              },
              {
                imgSrc: require('@/assets/images/model8.png'),
                number: '07',
                tag: '资源对接',
                title: '确定设计资源名单',
                content: '根据方案征集合同相关要求从邀请设计师列表及公开报名列表确定最终参与项目的设计资源名单'
              },
              {
                imgSrc: require('@/assets/images/model9.png'),
                number: '08',
                tag: '资源对接',
                title: '签订设计合同支付设计启动金',
                content: '设计资源对接完成后合筑将与客户与设计师签订方案设计合同。项目将在您支付项目启动金后（个人客户或未通过审核的用户需全额支付项目设计费）正式进入设计阶段。'
              },
              {
                imgSrc: require('@/assets/images/model10.png'),
                number: '09',
                tag: '设计阶段',
                title: '项目里程碑管理',
                content: '专属项目经理将根据项目特征及实际情况，为您的项目量身制定项目里程碑，实时管理设计师设计进度'
              },
              {
                imgSrc: require('@/assets/images/model11.png'),
                number: '10',
                tag: '设计阶段',
                title: '答疑、补充要求',
                content: '专属项目经理将辅助您对设计师的设计疑问进行答复和管理，协助您提供有利于设计推进的补充文件，确保项目顺利推进'
              },
              {
                imgSrc: require('@/assets/images/model12.png'),
                number: '11',
                tag: '评审阶段',
                title: '专家评审',
                content: '由业内权威专家及客户代表组成评审委员会，对项目成果进行的的网络直播评审，确保评审结果公正、公正'
              },
              {
                imgSrc: require('@/assets/images/model13.png'),
                number: '12',
                tag: '评审阶段',
                title: '托管设计费余款',
                content: '评审结束，评审结果符合方案征集代理合同及设计合同，客户支付设计费余款，平台向客户移交相关成果文件'
              }
            ]
          }
        ],
        path: '',
        diff: 0,
        stepbarHeight: 0,
        // 索引
        activeIndex: 0
      }
    },
    methods: {
      // 滚轮事件
      handleScroll(e) {
        // 滚动条滚动距离
        let scrollTop = $(document).scrollTop();
        // 动画区域距离顶部高度
        let scene = $("#section").offset().top;
        // 进度条总长度
        let stepBar = $("#stepBar").height();
        // 步骤区域距离顶部高度
        let flowScenes = $("#flowScenes").offset().top;
        // 可视区域高度
        let screenHeight = $(window).height();
        // 可视区域宽度
        let screenWidth = $(window).width();
        // console.log('比例：' + screenWidth / screenHeight);
        // 动画dom对象组
        let flowSceneArr = $(".flow-scene");
        // 设置一个固定距离
        let distance = 260;
        if (screenHeight > 657) {
          distance = 500;
        }
        // console.log("高度：" + screenHeight);
        // console.log(scrollTop - scene);
        // 循环每个动画的dom对象
        flowSceneArr.each(function(index, item){
          // 当前区块距离顶部高度
          let sceneBlock = $(item).offset().top;
          // 如果当前区块在可视区域
          if (sceneBlock > scrollTop && sceneBlock < (scrollTop + screenHeight)) {
            // console.log(index + "~" + "在")
            $(item).find(".aniRight").addClass("slideInRight animated");
            $(item).find(".aniLeft").addClass("slideInLeft animated");
            $(".flow-scene1").find(".aniLeft").addClass("delay02");
            $(".flow-scene2").find(".aniRight").addClass("delay02");
          } else {
            $(item).find(".aniRight").removeClass("slideInRight animated");
            $(item).find(".aniLeft").removeClass("slideInLeft animated");
            $(".flow-scene").find(".aniLeft").removeClass("delay02");
            $(".flow-scene").find(".aniRight").removeClass("delay02");
          }
        })
        
          // console.log(scene - scrollTop - screenHeight);
          if(scene - scrollTop - screenHeight < 0) {
        // if (scrollTop - scene >= -distance) {
          this.stepbarHeight = scrollTop - scene + distance;
          if (this.stepbarHeight >= stepBar) {
            this.stepbarHeight = stepBar;
          }
          // 小于顶部球高度
          if (this.stepbarHeight <= 50) {
            $("#stepIndicator").css({
              position: "absolute",
              top: 0
            });
          } else {
            $("#stepIndicator").css({
              position: "fixed",
              top: distance + "px"
            });
          }
          $("#stepProgress").css({
            height: this.stepbarHeight + "px"
          });
        } else {
          $("#stepIndicator").css({
            position: "absolute",
            top: 0
          });
        }
        // 如果滑到底部小球位置
        if (scrollTop - stepBar - scene >= -distance) {
          $("#stepIndicator").css({
            position: "absolute",
            top: 0
          });
          $("#stepEnd").css({
            borderColor: '#C8252C',
            backgroundColor: '#C8252C'
          });
        } else {
          $("#stepEnd").css({
            borderColor: '#eeeeee',
            backgroundColor: "#eeeeee"
          });
        }
      },
      getActiveTabIndex(index) {
        this.activeIndex = index;
        // 索引转换路径
        this.indexToPath();
      },
      // 索引转换路径
      indexToPath () {
        if (this.activeIndex == 0) { // 委托设计
          this.path = "CommissionedInvitation"
        } else  if (this.activeIndex == 1) { // 公开招标
          this.path = "InvitBinding";
        } else  if (this.activeIndex == 2) { // 邀请招标
          this.path = "BiddingInvitation";
        } else  if (this.activeIndex == 3) { // 邀请+公开招标
          this.path = "InvitAndPublic";
        }
      },
      // 路径转换索引
      pathToIndex () {
        if (this.path == "CommissionedInvitation") { // 委托设计
          this.activeIndex = 0;
        } else  if (this.path == "InvitBinding") { // 公开招标
          this.activeIndex = 1;
        } else  if (this.path == "BiddingInvitation") { // 邀请招标
          this.activeIndex = 2;
        } else  if (this.path == "InvitAndPublic") { // 邀请+公开招标
          this.activeIndex = 3;
        }
      }
    },
    mounted() {
      this.$store.commit('setNavScroll', false)
      this.path = this.$route.path.split('/')[1]
      // 路径转换索引
      this.pathToIndex();
      window.addEventListener('scroll', this.handleScroll, true);
      this.$nextTick(()=>{
        window.scrollTo(0,0);
      });
    },
    destroyed: function () {
      // 离开页面清除（移除）滚轮滚动事件
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
</script>

<style lang="less">
  .commonType2{
    .classic-tabs{
      padding-top: 4rem /* 64/16 */;
      .tab-content {
        padding: 0;
      }
      .nav{
        justify-content: center;
        background-color: #fff!important;
        .nav-item{
          display: inline-block;
          &:first-child{
            margin-left: 0;
          }
          a{
            padding: 1.125rem /* 18/16 */ 1.5rem /* 24/16 */;
            color: #000;
            &.active{
              border-color: #4285f4;
            }
          }
        }
      }
    }
  }
</style>

<style scoped lang="less">
  .type-title {
    // height: 6.4rem;
    padding-top: 4rem /* 64/16 */;
    line-height: 40px;
    display: flex;
    background: #000;
    align-items: center;
    text-align: center;
    justify-content: center;
    // font-size: .7rem;
    font-size: 18px;
    color: #fff;
  }
  .type-content {
    margin: 0 auto;
    width: percentage(956/1920);
    font-size: 18px;
    color: #666666;
    letter-spacing: 0;
    line-height: 35px;
  }
  .img-wrap {
    width: 60%;
    margin: 0 auto;
    text-align: center;
  }
  .img-wrap img {
    width: 100%;
  }
  h2 {
    // font-size: 46/100rem;
    font-size: 18px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    // line-height: 46/100rem;
    margin: .5rem 0;
  }
  .section{
    position: relative;
    overflow: hidden;
    padding-top: 200px;
    padding-bottom: 60px;
    margin-bottom: 100px;
    .step-bar{
      position: absolute;
      width: 4px;
      border-radius: 999px;
      height: 98%;
      z-index: 5;
      top: 20px;
      left: 50%;
      margin-left: -2px;
      background-color: #ddd;
      .step-progress{
        position: absolute;
        height: 0;
        top: 0;
        left: 0;
        z-index: 1;
        background: #C8252C;
        width: 100%;
        transition: height 0.1;
        // will-change: height;
      }
      .step-indicator{
        width: 20px;
        height: 20px;
        background: #C8252C;
        position: absolute;
        border-radius: 100%;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -10px;
        z-index: 5;
      }
      .step-start{
        position: absolute;
        margin-left: -23px;
        width: 50px;
        height: 50px;
        text-align: center;
        padding: 5px;
        text-transform: uppercase;
        border-radius: 100%;
        font-weight: bold;
        z-index: 10;
        border: 5px solid #C8252C;
        background: #C8252C;
        color: #FFFFFF;
      }
      .step-end{
        position: absolute;
        margin-left: -23px;
        width: 50px;
        height: 50px;
        text-align: center;
        padding: 5px;
        text-transform: uppercase;
        border-radius: 100%;
        font-weight: bold;
        z-index: 10;
        bottom: -30px;
        border: 5px solid #eeeeee;
        background: #eeeeee;
        color: #999999;
        border-color: rgb(238, 238, 238);
        color: rgb(153, 153, 153);
        background-color: rgb(238, 238, 238);
      }
    }
    .flow-scenes{
      overflow: visible;
      .flow-scene{
        position: relative;
        // max-height: 17.5rem /* 280/16 */;
        // height: 31.25rem /* 500/16 */;
        // margin-bottom: 3.125rem /* 50/16 */;
        max-height: 280px;
        height: 500px;
        margin-bottom: 50px;
        .scene-img{
          position: absolute;
          top: 0;
          z-index: 0;
          max-width: 50%;
          width: 100%;
          overflow: hidden;
          img{
            // max-width: 12.5rem /* 200/16 */;
            max-width: 200px;
            display: inline-block;
            vertical-align: top;
          }
        }
        .scene-text{
          position: absolute;
          top: 0;
          z-index: 5;
          overflow: hidden;
          // max-width: 31.25rem /* 500/16 */;
          max-width: 500px;
          .scene-tag{
            font-size: 0;
            // line-height: 1.25rem /* 20/16 */;
            line-height: 20px;
            .tag-left{
              display: inline-block;
              vertical-align: top;
              // padding-left: .3125rem /* 5/16 */;
              // padding-right: .3125rem /* 5/16 */;
              // font-size: .75rem /* 12/16 */;
              padding-left: 5px;
              padding-right: 5px;
              font-size: 12px;
              color: #fff;
              background-color: #000;
            }
            .tag-right{
              display: inline-block;
              vertical-align: top;
              // padding-left: .5rem /* 8/16 */;
              // padding-right: .5rem /* 8/16 */;
              // font-size: .75rem /* 12/16 */;
              padding-left: 8px;
              padding-right: 8px;
              font-size: 12px;
              color: #333;
              background-color: #F3DAA4;
            }
          }
          .scene-title{
            // margin-top: .625rem /* 10/16 */;
            // line-height: 1.375rem /* 22/16 */;
            // font-size: 1rem /* 16/16 */;
            margin-top: 10px;
            line-height: 22px;
            font-size: 16px;
            color: #333;
          }
          .scene-content{
            // margin-top: .625rem /* 10/16 */;
            // line-height: 1.375rem /* 22/16 */;
            // font-size: .75rem /* 12/16 */;
            // font-size: .75rem /* 12/16 */;
            margin-top: 10px;
            line-height: 22px;
            font-size: 12px;
            color: #999;
          }
        }
        &:nth-child(odd) {
          .scene-img{
            left: 50%;
            margin-left: -50%;
            padding-left: 15px;
            padding-right: 50px;
            text-align: right;
          }
          .scene-text{
            left: 50%;
            margin-left: 0;
            padding-left: 50px;
            padding-right: 15px;
          }
        }
        &:nth-child(even) {
          .scene-img{
            right: 50%;
            margin-right: -50%;
            padding-left: 50px;
            padding-right: 15px;
          }
          .scene-text{
            right: 50%;
            padding-left: 15px;
            padding-right: 50px;
            margin-right: 0;
            text-align: right;
          }
        }
      }
    }
  }
  .transLeft{
    animation-duration: 0.5s;
    animation-fill-mode: both;
    animation-name: sceneLeft;
  }
  .transRight{
    animation-duration: 0.5s;
    animation-fill-mode: both;
    animation-name: sceneRight;
  }
  .delay02{
    animation-delay: 0.2s;
  }
  @keyframes sceneLeft {
    from {
      transform: translate3d(300%, 0, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes sceneRight {
    from {
      transform: translate3d(-300%, 0, 0);
      visibility: visible;
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }
</style>



