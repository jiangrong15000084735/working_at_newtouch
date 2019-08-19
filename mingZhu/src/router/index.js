import Vue from 'vue'
import Router from 'vue-router'
//主页
import home from '@/views/home'
import demo from '@/views/search/demo'
import homePage from '@/views/home/homePage'
import success from '@/views/other/success' // 成功案例//合筑作品（首页）
//注册 && 登陆
import registerWeChat from '@/views/home/registerWeChat'  // 微信注册
import loginWeChat from '@/views/home/loginWeChat'  // 微信登陆
import codeWeChat from '@/views/home/codeWeChat'  // 获取微信code
import forgetSecret from '@/views/home/forgetSecret'  // 忘记密码
import submit from '@/views/home/submit' //客户验证
import designerSubmitInfoSuccess from '@/views/home/designerSubmitInfoSuccess'  //建筑师认证成功(待确认)
import personalInformationNew from '@/views/individual/personalInformationNew' // 建筑师认证
// 建筑师
import personalCenter from '@/views/individual/designer/personalCenter' // 建筑师个人中心
import accountInfo from '@/views/individual/designer/accountInfo' //账户个人信息
import myArticle from '@/views/page/myArticle.vue'  // 建筑师我的文章
import projectManage from '@/views/individual/designer/projectManage' // 建筑师项目管理
import taskHall from '@/views/individual/taskHall'  // 招标信息
import message from '@/views/individual/designer/message'  //建筑师站内信
import signContract from '@/views/individual/designer/project-doing/sign-contract'  //建筑师签署合同
import projProgress from '@/views/individual/designer/project-doing/proj-progress'  //项目进程
import projDetail from '@/views/individual/designer/project-progress/proj-detail'  //项目基本信息
import projReviewed from '@/views/individual/designer/project-progress/proj-reviewed'
import expertReview from '@/views/individual/designer/project-doing/expert-review' // 专家评审结果
import payFee from '@/views/individual/designer/project-doing/pay-fee'  //支付设计费用
import projectProgress from '@/views/individual/designer/project-progress' // 项目进程
import aQ from '@/views/individual/designer/project-progress/a-q'  // 答疑
import pResult from '@/views/individual/designer/project-progress/p-result' //中间成果
import pResultConfirm from '@/views/individual/designer/project-progress/p-result-confirm'  //中间成果确认
import cResult from '@/views/individual/designer/project-progress/c-result' //最终成果
import review from '@/views/individual/projectDetialManagement/resultConfirm/review'  // 评审直播（待确认）
import MyArticle from '@/views/page/myArticle'
// 客户
import customerCenter from '@/views/individual/customer/personalCenter' // 客户个人中心
import customerAccountInfo from '@/views/individual/customer/accountInfo' //客户账户信息
import customerProjectManage from '@/views/individual/customer/customerProjectManage' //客户项目管理
import customerConcernDesigner from '@/views/individual/customer/customerConcernDesigner'//关注建筑师
import customerFavoriteCase from '@/views/individual/customer/customerFavoriteCase' //关注作品
import customerArticle from '@/views/individual/customer/customerArticle'//收藏文章
import customerMessage from '@/views/individual/customer/message' //站内信
// 客户项目详情管理
import  ProjectDetial from '@/views/individual/projectDetialManagement/projectDetial' // 项目详情
import RecommendDesign from '@/views/binding/RecommendDesign'  //建筑师列表

// 了解合筑
import aboutUs from '@/views/page/aboutUs'  // 了解合筑
import commonType from '@/views/binding/commonType'  //了解流程
import aboutUsCustomer from '@/views/page/aboutUsCustomer'  // 关于我们-客户
import aboutUsDesigner from '@/views/page/aboutUsDesigner'  // 关于我们- 设计师
//合筑服务
import CommissionedDesign from '@/views/binding/CommissionedDesign'  //发布项目
import ProcurementPlan from '@/views/home/ProcurementPlan' // 发布项目结束
import addService from '@/views/page/addService' // 增值服务
//合筑咨询
import hezhuNews from '@/views/news/hezhuNews'   // 合筑新闻
import newsDetails from '@/views/news/newsDetails' // 新闻详情
import activitiesDetails from '@/views/page/activitiesDetails' // 合住竞赛详情
import excellentProject from '@/views/page/excellentProject' // 合筑视界
import excellentProjectDetails from '@/views/page/excellentProjectDetails' // 合筑视界详情
//帮助
import contactUs from '@/views/page/contactUs' // 联系我们
import question from '@/views/page/question' //问题反馈
import CommonProblem from '@/views/other/CommonProblem' // 常见问题

// 查找
import SearchDesigners from '@/views/search/SearchDesigners' // 查找设计师
import SearchDesignersJr from '@/views/search/SearchDesigners.jr' // 查找设计师
import seniorDesignerDetails from '@/views/search/seniorDesignerDetails' // 设计大咖详细资料
import DesignerDetailsNew from '@/views/search/designerDetailsNew' // 修改设计师详情页
import checkCase from '@/views/search/CheckCase' // 查看案例
import CaseDetails from '@/views/search/CaseDetails' // 案例详情页
import casePicture from '@/views/search/casePicture' // 案例图片
//footer
import hezhuItem from '@/views/page/hezhuItem' //合筑条款
import LegalStatement from '@/views/other/LegalStatement' // 法律声明
import clause from '@/views/other/clause' //合筑条款
import recruitInfo from '@/views/page/recruitInfo'  //招贤纳士

import projectDetail from '@/views/individual/projectDetail' // 任务详情页（待确认）
import addServiceEnd from '@/views/page/addServiceEnd' //（待确认）

Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            // name: 'home',
            component: home,
            menuType: 'single',
            redirect: '/homePage',
            children: [
                // {
                //   path: '/',
                //   name: 'homePage',
                //   // component: homePage
                //   // component: resolve => require(['@/views/homePage'], resolve)
                //   component: resolve => require.ensure([], () => resolve(homePage, 'homePage'))
                // },
                {
                    path: '/review',  //（直播待确认）
                    name: 'review',
                    component: review

                },
                {
                    path: '/addService',  //增值服务
                    name: 'addService',
                    component: addService

                },
                {
                    path: '/addServiceEnd', //（待确认）
                    name: 'addServiceEnd',
                    component: addServiceEnd

                },
                {
                    path:'/projectDetial',  // 项目详情
                    name:'projectDetial',
                    component:ProjectDetial
                },
                {
                    path: '/submit',  // 客户验证
                    name: 'submit',
                    component: submit
                },
                {
                    path: '/projectDetail/:id?',  // 任务详情页（待确认）
                    name: 'projectDetail',
                    component: projectDetail
                },
                {
                    path: '/taskHall', // 招标信息
                    name: 'taskHall',
                    component: taskHall
                },
                {
                    path: '/personalCenter',   //建筑师个人中心
                    name: 'personalCenter',
                    component: personalCenter,
                    children: [
                    {
                        path: '/',
                        redirect: '/accountInfo'  // 账户信息（个人中心默认显示）
                    },
                    {
                        path: '/accountInfo',// 账户信息（个人中心默认显示）
                        name: 'accountInfo',
                        component: accountInfo
                    }, {
                        path: '/myArticle', // 我的文章
                        name: 'myArticle',
                        component: myArticle
                    }, {
                        path: '/projectManage',  // 项目管理
                        name: 'projectManage',
                        component: projectManage
                    },
                     {
                        path: '/message',  // 站内信
                        name: 'message',
                        component: message
                    }, {
                        path: 'sign-contract', // 建筑师签署合同
                        name: 'signContract',
                        component: signContract
                    }, {
                        path: 'proj-progress',  // 项目进程
                        name: 'projProgress',
                        component: projProgress
                    }, {
                        path: 'expert-review', //专家评审结果
                        name: 'expertReview',
                        component: expertReview
                    }, {
                        path: 'pay-fee',  //支付设计费用
                        name: 'payFee',
                        component: payFee
                    }]
                },
                {
                    path: '/customerCenter',  // 客户个人中心
                    name: 'customerCenter',
                    component: customerCenter,
                    children: [{
                            path: '/',
                            redirect: '/customerAccountInfo'//账户信息
                        },
                        {
                            path: '/customerAccountInfo', //账户信息
                            name: 'customerAccountInfo',
                            component: customerAccountInfo
                        },
                        {
                            path: '/customerProjectManage', //项目管理
                            name: 'customerProjectManage',
                            component: customerProjectManage
                        },
                        {
                            path: '/customerConcernDesigner', //关注建筑师
                            name: 'customerConcernDesigner',
                            component: customerConcernDesigner
                        },
                        {
                            path: '/customerFavoriteCase', //关注作品
                            name: 'customerFavoriteCase',
                            component: customerFavoriteCase
                        },
                        {
                            path: '/customerArticle',  //收藏文章
                            name: 'customerArticle',
                            component: customerArticle
                        },
                        {
                            path: '/customerMessage', //站内信
                            name: 'customerMessage',
                            component: customerMessage
                        }
                    ]
                },
                {
                    path: 'sign-contract',  // 签署设计合同
                    name: 'signContract',
                    component: signContract
                },
                {
                    path: '/proj-detail/:id?', // 项目详情
                    name: 'projDetail',
                    component: projDetail
                },
                {
                    path: '/proj-reviewed',
                    name: 'projReviewed',
                    component: projReviewed
                },
                {
                    path: 'proj-progress',  // 建筑师项目进程
                    name: 'projProgress',
                    component: projProgress
                },
                {
                    path: 'expert-review',  // 设计师专家评审
                    name: 'expertReview',
                    component: expertReview
                },
                {
                    path: 'pay-fee',  // 支付费用
                    name: 'payFee',
                    component: payFee
                },
                {
                    path: '/project-progress',  // 项目进程
                    name: 'projectProgress',
                    component: projectProgress,
                    children: [{
                        path: 'a-q',  // 答疑
                        name: 'aQ',
                        component: aQ
                    }, {
                        path: 'p-result',  //中间成果
                        name: 'pResult',
                        component: pResult
                    }, {
                        path: 'p-result-confirm',  // 中间成果确认
                        name: 'pResultConfirm',
                        component: pResultConfirm
                    }, {
                        path: 'c-result',  // 最终成果
                        name: 'cResult',
                        component: cResult
                    }]
                },
                {
                    path: '/personalInformationNew',  //设计师认证
                    name: 'personalInformationNew',
                    component: personalInformationNew
                },
                {
                    path: '/hezhuItem',  //合筑条款
                    name: 'hezhuItem',
                    component: hezhuItem

                },
                {
                    path: '/clause', //合筑条款
                    name: ' clause',
                    component: clause
                },
                {
                    path: '/LegalStatement', // 法律声明
                    name: ' LegalStatement',
                    component: LegalStatement
                },
                {
                    path: '/recruitInfo',  //招贤纳士
                    name: ' recruitInfo',
                    component: recruitInfo
                },

                {
                    path: '/seniorDesignerDetails',  //高级设计师主页查看页面
                    name: 'seniorDesignerDetails',
                    component: seniorDesignerDetails
                },
                {
                    path: '/CaseDetails', //案例详情页面
                    name: 'CaseDetails',
                    component: CaseDetails
                },
                {
                    path: '/designerDetails',  //设计个人主页（可编辑页面）
                    name: 'designerDetails',
                    component: DesignerDetailsNew
                },
                {
                    path: '/newsDetails',  // 新闻详情页
                    name: 'newsDetails',
                    component: newsDetails
                },
                {
                    path: '/competitionDetail', // 合住竞赛详情
                    name: 'competitionDetail',
                    component: activitiesDetails
                },
                {
                    path: '/activitiesDetails', // 论坛活动详情(待确认)
                    name: 'activitiesDetails',
                    component: activitiesDetails
                },
                {
                    path: '/checkCase', // 案例列表
                    name: 'checkCase',
                    component: checkCase
                },
                {
                    path: '/SearchDesigners', // 查找设计师
                    name: 'SearchDesigners',
                    component: SearchDesignersJr
                },
                {
                    path: '/RecommendDesign',   // 推荐设计师
                    name: 'RecommendDesign',
                    component: RecommendDesign
                },
                {
                    path: '/success',  //合筑作品（首页）
                    name: 'success',
                    component: success
                },
                {
                    path: '/excellentProject',  //合筑视界
                    name: 'excellentProject',
                    component: excellentProject
                },
                {
                    path: '/excellentProjectDetails',  //合筑视界详情
                    name: 'excellentProjectDetails',
                    component: excellentProjectDetails
                },
                {
                    path: '/hezhuNews',  // 合筑新闻
                    name: 'hezhuNews',
                    component: hezhuNews
                },
                {
                    path: '/contactUs',  // 联系我们
                    name: 'contactUs',
                    component: contactUs
                },
                {
                    path: '/question', // 问题反馈
                    name: 'question',
                    component: question
                },
                {
                    path: '/CommonProblem',  //常见问题
                    name: 'CommonProblem',
                    component: CommonProblem
                },
                {
                    path: '/projectDetails/:id?',
                    component: projectDetail
                },
                {
                    path: '/myArticle',  // 我的文章
                    name: 'myArticle',
                    component: MyArticle
                },
            ]
        },
        {
          path: '/demo',
          name: 'Demo',
          component: demo
        },
        {
            path: '/homePage',  //主页
            name: 'homePage',
            component: resolve => require.ensure([], () => resolve(homePage, 'homePage'))
        },
        {
            path: '/registerWeChat',   //微信注册
            name: 'registerWeChat',
            component: registerWeChat
        },
        {
            path: '/loginWeChat',  // 微信登陆
            name: 'loginWeChat',
            component: loginWeChat
        },
        {
            path: '/codeWeChat',   //获取微信code
            name: 'codeWeChat',
            component: codeWeChat
        },
        {
            path: '/forgetSecret',  // 忘记密码
            name: 'forgetSecret',
            component: forgetSecret
        },
        {
            path: '/designerSubmitInfoSuccess',   //设计师注册成功
            name: 'designerSubmitInfoSuccess',
            component: designerSubmitInfoSuccess
        },
        {
            path: '/CommissionedDesign',   // 发布项目
            name: '/CommissionedDesign',
            component: CommissionedDesign
        },
        {
            path: '/ProcurementPlan',  //发布项目成功
            name: 'ProcurementPlan',
            component: ProcurementPlan
        },

        {
            path: '/InvitBinding', // 公开竞标模式
            name: 'InvitBinding',
            component: commonType
        },
        {
            path: '/BiddingInvitation', // 邀请竞标模式
            name: 'BiddingInvitation',
            component: commonType
        },
        {
            path: '/CommissionedInvitation', // 直接委托模式
            name: 'CommissionedInvitation',
            component: commonType
        },
        {
            path: '/InvitAndPublic',  // 邀请竞标+公开竞标
            name: 'InvitAndPublic',
            component: commonType
        },
        {
            path: '/casePicture', // 案例图片页面
            name: 'casePicture',
            component: casePicture
        },
        {
            path: '/understandCoop',  // 了解合筑
            name: 'aboutUs',
            component: aboutUs
        },
        {
            path: '/aboutUsCustomer', // 关于我们-客户
            name: 'aboutUsCustomer',
            component: aboutUsCustomer
        },
        {
            path: '/aboutUsDesigner', // 关于我们- 设计师
            name: 'aboutUsDesigner',
            component: aboutUsDesigner
        },
    ],

    scrollBehavior(to, from, savedPosition) {
            return {
                x: 0,
                y: 0
            }
    }
})
