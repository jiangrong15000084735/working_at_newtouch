import axios from 'axios'
import {
    Message
} from 'element-ui'
import router from '../router/index'
// import store from '../store/store.js'
import qs from 'qs'
import store from '../store/store'
// let path = process.env.NODE_ENV;
// 判断是否在微信里
let ua = window.navigator.userAgent.toLowerCase();
let inWeixin = ua.match(/MicroMessenger/i) == 'micromessenger';
console.log('api ---- inWeixin', inWeixin);

export default {
    savePublicSolicition(params) {
        return httpPost('/Mingzhu/system/required/save', params)
    }, // 上传需求文件
    navMenu(params) {
        return httpGet('/Mingzhu/system/directoryManage/listALL', params)
    }, // 导航栏
    notifyNum(params, params2) {
        return httpGet('/Mingzhu/oa/notify/selfList/' + params, params2)
    }, // 导航消息数量
    homePageBanner(params) {
        return httpGet('/Mingzhu/system/banner/listFront', params)
    }, // 首页banner图
    homePagePic(params) {
        return httpGet('/Mingzhu/system/succeedCase/listFront', params)
    }, // 首页案例、设计之旅、合作logo图
    homePageDesigner(params) {
        return httpGet('/Mingzhu/search/designer/indexDesignerList', params)
    }, //首页推荐设计师
    homePageContest(params) {
        return httpGet('/Mingzhu/pages/indexContest', params)
    }, //首页推荐竞赛
    homePagePoint(params) {
        return httpGet('/Mingzhu/viewPoint/indexViewPoints', params)
    }, //首页推荐项目
    homePageNews(params) {
        return httpGet('/Mingzhu/news/indexNewsList', params)
    }, //首页推荐新闻
    homePageNum(params) {
        return httpGet('/Mingzhu/common/dict/list/hompage_overview', params)
    }, //首页数据
    homePageQuestion(params) {
        return httpGet('/Mingzhu/commonQuestion/indexList ', params)
    }, //首页数据
    buildingType(params) {
        return httpGet('/Mingzhu/common/dict/list/' + params)
    }, // 建筑类型 
    rebuildingType(params) {
        return httpGet('/Mingzhu/common/dict/relist/' + params)
    },
    caseList(params) {
        return httpGet('/Mingzhu/boss/concernCase/list', params)
    }, // 我喜欢的案例
    designerList(params) {
        return httpGet('/Mingzhu/boss/concernDesigner/list', params)
    }, // 我喜欢的设计师
    concernDesigner(params) {
        return httpPost('/Mingzhu/boss/concern/designer', params)
    }, // 关注设计师
    cancelConcernDesigner(params) {
        return httpPost('/Mingzhu/boss/cancelconcern/designer', params)
    }, // 取消关注设计师
    getProject(params) {
        return httpPost('/Mingzhu/system/project/get', params)
    }, // 项目信息
    submitRefuse(params) {
        return httpPost('/Mingzhu/system/projectInvitation/save', params)
    }, // 设计师拒绝邀请
    IntelligentAssessController(params) {
        return httpPost(
            '/Mingzhu/IntelligentAssessController/IntelligentAssess',
            params
        )
    }, // 智能估价
    companyDetail(params) {
        return httpGet('/Mingzhu/boss/getOneDetail', params)
    }, // 公司信息

    companyDetailNew(params) {
        return httpGet('/Mingzhu/boss/getOneBossTemp', params)
    }, // 公司信息新
    updateCompanyDetail(params) {
        return httpPost('/Mingzhu/boss/update', params)
    }, // 修改公司信息
    updateCompanyDetailNew(params,type) {
        return httpPost(`/Mingzhu/boss/updateTemp/${type}`, params)
    }, // 修改公司信息新
    authentication(params) {
        return httpGet(`/Mingzhu/boss/authentication/${params}`)
    },
    designerProjectDetail(params) {
        return httpGet('/Mingzhu/system/project/getProjectList', params)
    }, // 设计师项目信息
    getProjectInfo(params) {
        return httpPost('/Mingzhu/system/project/get', params)
    }, // 项目信息
    updateProject(params) {
        return httpPost('/Mingzhu/system/project/update', params)
    }, // 项目信息修改
    getProjectList(params) {
        return httpPost('/Mingzhu/system/project/getTwo', params)
    }, // 需求方项目列表

    projectList1(params) {
        return httpPost('/Mingzhu/system/project/search', params)
    }, // 任务大厅

    submitRefuse(params) {
        return httpPost('/Mingzhu/system/projectInvitation/save', params)
    }, // 设计师拒绝邀请
    IntelligentAssessController(params) {
        return httpPost(
            '/Mingzhu/IntelligentAssessController/IntelligentAssess',
            params
        )
    }, // 智能估价
    getVerificationCode(params) {
        return httpGet('/Mingzhu/getVerificationCode', params)
    }, // 注册获取验证码
    customerRegister(params) {
        return httpPost('/Mingzhu/boss/register', params)
    }, // 客户注册
    designerRegister(params) {
        return httpPost('/Mingzhu/design/register', params)
    }, // 设计师注册
    login(params) {
        return httpGet('/Mingzhu/login/toLogin', params)
    }, // 登录
    logout(params) {
        return httpGet('/Mingzhu/login/logout', params)
    }, // 退出
    valueaddedServiceList(params) {
        return httpGet('/Mingzhu/system/valueaddedService/list', params)
    }, // 增值服务列表
    valueaddedServiceSubmit(params) {
        return httpPost('/Mingzhu/system/valueaddedService/submit', params)
    },
    seniorDesignerList(params) {
        return httpGet('/Mingzhu/search/designer/seniorDesigner/list', params)
    }, // 大咖设计师
    seniorDesignerDetail(params) {
        return httpGet('/Mingzhu/search/designer/seniorDesigner/detail', params)
    }, // 大咖设计师详情
    upLoadIdcardBack(params) {
        return httpPost('/Mingzhu/orcFile/upLoadIdcardBack', params)
    }, // 设计师 上传身份证背面
    upLoadIdcardFront() {
        return '/Mingzhu/orcFile/upLoadIdcardFront'
    }, // 设计师 上传身份证正面

    // 招标接口
    required(params) {
        return httpGet('/Mingzhu/system/required/' + params)
    },
    // 招标暂存1
    requireUpdate(params) {
        return httpPost('/Mingzhu/system/project/update', params)
    },
    // 招标1提交
    requireSave(params) {
        return httpPost('/Mingzhu/system/project/submit', params)
    },
    // 招标2暂存
    saveOrUpdate(params) {
        return httpPost('/Mingzhu/system/requiredResult/saveOrUpdate', params)
    }, // 2提交
    requiredResultSubmit(params) {
        return httpPost('/Mingzhu/system/requiredResult/submit', params)
    },
    // 招标周期暂存3
    requiredDateUpdate(params) {
        return httpPost('/Mingzhu/system/requiredDate/saveOrUpdate', params)
    },
    // 招标周期提交3
    requiredDateSubmit(params) {
        return httpPost('/Mingzhu/system/requiredDate/submit', params)
    },
    // 招标细节4
    openingDetailsUpdate(params) {
        return httpPost('/Mingzhu/system/requiredOpenBid/saveOrUpdate', params)
    },
    // 招标细节提交4
    openingDetailsSubmit(params) {
        return httpPost('/Mingzhu/system/requiredOpenBid/submit', params)
    },
    designerInformationUpdate(params) {
        return httpPostJson(
            '/Mingzhu/informationMaintenance/designerInformationUpdate',
            params
        )
    }, // 设计师审核资料提交
    customerInformationUpdate(params) {
        return httpPostJson(
            '/Mingzhu/informationMaintenance/customerInformationUpdate',
            params
        )
    }, // 客户审核资料提交
    upload() {
        return '/Mingzhu/common/file/upload'
    }, // 文件上传
    download(params) {
        return httpGet('/Mingzhu/common/sysFile/download/' + params)
    }, // 文件下载

    uploadFile() {
        return '/Mingzhu/desginerCase/upload'
    }, // 上传案例图片
    getUrl(params) {
        return httpPost('/Mingzhu/common/file/getUrl', params)
    }, // 文件路径获取/
    getAddPraise(params) {
        return httpPost('/Mingzhu/desginerCase/addPraise/praise', params)
    }, // 案例点赞
    getBuildingTypes(params) {
        return httpGet('/Mingzhu/common/dict/list/building_type', params)
    }, // 获取建筑类型
    getHotLabel(params) {
        return httpGet('/Mingzhu/common/dict/list/hotLabel', params)
    }, // 获取热门标签
    getTeamType(params) {
        return httpGet('/Mingzhu/common/dict/list/designer_teamType', params)
    }, // 获取团队类型
    getTeamNumber(params) {
        return httpGet('/Mingzhu/common/dict/list/team_number', params)
    }, // 获取团队人数
    getWorkLife(params) {
        return httpGet('/Mingzhu/common/dict/list/work_life', params)
    }, // 获取工作年限
    getQualification(params) {
        return httpGet('/Mingzhu/common/dict/list/qualification', params)
    }, // 获取职业资格
    getQualificationTitle(params) {
        return httpGet('/Mingzhu/common/dict/list/professional_title', params)
    }, // 获取专业职称
    getProfessionalqualification(params) {
        return httpGet('/Mingzhu/common/dict/list/audit_write_back_table', params)
    }, // 获取职业资格
    getDesigerCaseList(params) {
        return httpPost(`/Mingzhu/desginerCase/getByDesignerSerial`, params)
    }, // 获取设计师案例集合
    getProvince(params) {
        return httpGet('/Mingzhu/common/address/getState/' + params)
    },
    getCity(provinceid) {
        return httpGet('/Mingzhu/common/dict/getCity/' + provinceid)
    },
    addCase(params) {
        return httpPost('/Mingzhu/desginerCase/add', params)
    },
    removeCase(params) {
        return httpGet('/Mingzhu/desginerCase/remove', params)
    }, // 删除设计师案例
    updateCase(params) {
        return httpPost('/Mingzhu/desginerCase/update', params)
    },
    // 删除个人经历
    saveTaskBaseInfo(params) {
        return httpPost('/Mingzhu/common/taskBaseInfo/save', params)
    }, // 保存项目任务书基本信息
    saveTaskArchRequired(params) {
        return httpPost('/Mingzhu/newtouch/taskArchRequired/save', params)
    }, // 保存项目任务书建筑要求
    saveTaskDesignRequired(params) {
        return httpPost('/Mingzhu/common/taskDesignRequired/save', params)
    }, // 保存项目任务书设计要求
    saveTaskDepend(params) {
        return httpPost('/Mingzhu/common/taskDepend/save', params)
    }, // 保存项目任务书设计依赖
    // 任务书接口
    seekTaskBaseInfo(params) {
        return httpGet('/Mingzhu/common/taskBaseInfo/' + params)
    }, // 任务书查询接口
    updateTaskBaseInfo(params) {
        return httpPostJson('/Mingzhu/common/taskBaseInfo/saveOrUpdate', params)
    }, // 暂存项目基础信息
    submitTaskBaseInfo(params) {
        return httpPostJson('/Mingzhu/common/taskBaseInfo/submit', params)
    }, // 提交项目基础信息
    updateTaskDesignRequired(params) {
        return httpPost('/Mingzhu/common/taskDesignRequired/saveOrUpdate', params)
    }, // 暂存项目需求1
    submitTaskDesignRequired(params) {
        return httpPost('/Mingzhu/common/taskDesignRequired/submit', params)
    }, // 提交项目需求1
    updateTaskArchRequired(params) {
        return httpPost('/Mingzhu/newtouch/taskArchRequired/saveOrUpdate', params)
    }, // 暂存项目需求2
    submitTaskArchRequired(params) {
        return httpPost('/Mingzhu/newtouch/taskArchRequired/submit', params)
    }, // 提交项目需求2
    updateTaskDepend(params) {
        return httpPost('/Mingzhu/common/taskDepend/saveOrUpdate', params)
    }, // 暂存设计依据
    submitTaskDepend(params) {
        return httpPost('/Mingzhu/common/taskDepend/submit', params)
    }, // 提交设计依据

    deleteLearning(params) {
        return httpPost('/Mingzhu/informationMaintenance/deleteLearning', params)
    },
    // 删除个人荣誉
    deletePersonalHonor(params) {
        return httpPost(
            '/Mingzhu/informationMaintenance/deletePersonalHonor',
            params
        )
    },
    deletePersonalHonor(params) {
        return httpPost(
            '/Mingzhu/informationMaintenance/deletePersonalHonor',
            params
        )
    },
    manageInCircleDesignerList(params) {
        return httpGet(
            '/Mingzhu/IncircleDesigner/manageInCircleDesignerList',
            params
        )
    }, // 入围中标管理
    queryValueAddedList(params) {
        return httpGet(
            '/Mingzhu/system/valueaddedService/queryValueAddedList',
            params
        )
    }, // 增值服务查询接口
    invitationDetailEnd(params) {
        return httpGet(
            '/Mingzhu/system/projectInvitation/invitationDetailEnd',
            params
        )
    }, // 客户查询邀请信息列表(无论次去重)
    invitationDetail(params) {
        return httpGet('/Mingzhu/system/projectInvitation/invitationDetail', params)
    }, // 客户查询邀请信息列表
    getRequiredOutline(params) {
        return httpGet('/Mingzhu/system/project/getRequiredOutline', params)
    }, // 招标需求概况
    calculateByProjectId(params) {
        return httpGet('/Mingzhu/budget/calculateByProjectId', params)
    }, // 设计费报价
    getDesingerDtailByDesinerId(params) {
        return httpPost('/Mingzhu/informationMaintenance/getByDesignerId', params)
    },

    getUrl(params) {
        return httpPost('/Mingzhu/common/file/getUrl', params)
    }, // 文件路径获取
    designerProjectDetail(params) {
        return httpGet('/Mingzhu/system/project/getProjectList', params)
    }, // 设计师项目信息
    designerloginInfo(params) {
        return httpGet('/Mingzhu/search/designer/designer/detail', params)
    }, // 设计师登录者信息
    bossloginInfo(params) {
        return httpGet('/Mingzhu/boss/getOneDetail', params)
    }, // 需求方登录者信息
    resetSecret(params) {
        return httpPost('/Mingzhu/login/updatePassWord', params)
    }, // 重置密码
    sendVerificationCode(parmas) {
        return httpPost('/Mingzhu/login/sendForgetPassWordVerificationCode', parmas)
    }, // 找回密码
    recommendDesignerlist(parmas) {
        return httpGet('/Mingzhu/system/RecommendDesigner/list', parmas)
    }, // 推荐设计师列表
    saveInviteList(parmas) {
        return httpPost('/Mingzhu/system/projectInvitation/saveInviteList', parmas)
    }, // 发送邀请
    caseDetails(parmas) {
        return httpPost('/Mingzhu/desginerCase/getByCaseName', parmas)
    }, // 案例详情

    submitExamine(id, parmas) {
        return httpGet(
            `/Mingzhu/informationMaintenance/designer/preliminaryAudit/${id}`,
            parmas
        )
    },
    estimateMoney(params, params2) {
        return httpGet('/Mingzhu/ceculator/' + params, params2)
    }, // 估价

    projectIndexPage(params) {
        return httpPost('/Mingzhu/system/project/designer/projectIndexPage', params)
    }, // 设计师我的项目主页
    estimateMoney(params, params2) {
        return httpGet('/Mingzhu/ceculator/' + params, params2)
    }, // 估价
    getCaseList(params) {
        return httpPost('/Mingzhu/desginerCase/getCaseList', params)
    }, // 案例搜索页面
    getDesignerList(params) {
        return httpGet('/Mingzhu/search/designer/list', params)
    }, // 搜索展示设计师列表
    designerDetail(params) {
        return httpGet('/Mingzhu/search/designer/designer/detail', params)
    }, // 设计师详情
    getCaseDetails(params) {
        return httpPost('/Mingzhu/desginerCase/getByCaseId', params)
    }, // 根据ID查看案例详情
    getProjectInfomation(params) {
        return httpPost('/Mingzhu/system/project/get', params)
    }, // 获取项目详细信息
    foreignDesignerList(params) {
        return httpGet('/Mingzhu/search/designer/foreignDesigner/list', params)
    }, // 境外设计师列表
    projectList1(params) {
        return httpPost('/Mingzhu/system/project/search', params)
    }, // 任务大厅
    reponseInvitation(params) {
        return httpPost(
            '/Mingzhu/system/projectInvitation/reponseInvitation',
            params
        )
    }, // 设计师接受或拒绝邀请按钮
    newsList(parmas) {
        return httpGet('/Mingzhu/news/newslist', parmas)
    }, // 新闻列表
    // getTaskAndOthers(params) {
    //     return httpPost('/Mingzhu/common/file/taskFileList', params)
    // }, // 查询任务书及相关附件
    // getTask(params) {
    //     return httpGet('/Mingzhu/common/file/list', params)
    // }, // 查询任务书附件
    getTask(params) {
        return httpGet('/Mingzhu//common/file/admin/requiredTaskFile/list', params)
    }, // 查询任务书
    getAnsewQuestion(params) {
        return httpGet('/Mingzhu/question/designerQuestion/list', params)
    }, // 获取项目答疑的列表文件
    getDesigerAnser(params) {
        return httpGet('/Mingzhu/question/designerQuestion', params)
    }, // 获取设计师问题答案

    submitQuestion(params) {
        return httpPost('/Mingzhu/question/designAskQuestion', params)
    }, // 设计师向项目经理提问
    queryContract(params) {
        return httpPost('/Mingzhu/contractSignStatus/queryContract', params)
    }, // 查询设计师合同
    dowmLoadeFile(params, fileName) {
        return httpGet1(`/Mingzhu/common/sysFile/download/${fileName}`, params)
    }, // 下载文件
    designSign(params) {
        return httpPost('/Mingzhu/contractSignStatus/sign', params)
    }, // 是否同意签署设计师合同

    getFindInCircleAndWinbidDetail(params) {
        return httpGet(
            '/Mingzhu/IncircleDesigner/findInCircleAndWinbidDetail',
            params
        )
    }, // 入围中标信息
    newsDetail(params) {
        return httpGet('/Mingzhu/news/query/commonquestion', params)
    }, // 新闻详情页
    activityList() {
        return httpGet('/Mingzhu/pages/bbs/list')
    }, // 论坛列表
    activityDetails(params) {
        return httpGet('/Mingzhu/pages/bbs/show', params)
    }, // 论坛详情
    uploadFile(parmas) {
        return httpPost('/Mingzhu/common/file/uploadFile', parmas)
    }, // 任务书文件上传
    remove(parmas) {
        return httpPost('/Mingzhu/common/file/remove', parmas)
    }, // 任务书文件删除
    projectList(parmas) {
        return httpPost('/Mingzhu/common/file/projectList', parmas)
    }, // 任务书文件列表
    prjExtendFile(parmas) {
        return httpGet('/Mingzhu/project/prjExtendFile/list', parmas)
    }, // 补充文件列表
    savePrjExtendFile(parmas) {
        return httpPost('/Mingzhu/project/prjExtendFile/save', parmas)
    }, // 保存补充文件列表
    removePrjExtendFile(parmas) {
        return httpPost('/Mingzhu/project/prjExtendFile/remove', parmas)
    }, // 删除补充文件列表
    notify(parmas) {
        return httpGet('/Mingzhu/system/project/notify', parmas)
    }, // 需求方-项目消息
    bossReceiveQuestionDetail(parmas) {
        return httpGet('/Mingzhu/question/bossReceiveQuestionDetail', parmas)
    }, // 客户项目管理的问题详情
    bossReceiveQuestionList(parmas) {
        return httpGet('/Mingzhu/question/bossReceiveQuestionList', parmas)
    }, // 客户项目管理的问题列表
    bossAnswer(parmas) {
        return httpPost('/Mingzhu/question/bossAnswer', parmas)
    }, // 客户回答问题
    deleteBossAnswer(parmas) {
        return httpGet('/Mingzhu/question/deleteBossAnswer', parmas)
    }, // 客户删除问题
    getLandmark(parmas) {
        return httpGet('/Mingzhu/system/project/getLandmark', parmas)
    }, // 项目详情--里程碑
    queryContractDetail(parmas) {
        return httpPost('/Mingzhu/contractSignStatus/queryContractDetail', parmas)
    }, // 合同详情
    queryContractList(parmas) {
        return httpPost('/Mingzhu/contractSignStatus/queryContractList', parmas)
    }, // 合同列表
    queryContractSign(parmas) {
        return httpPost('/Mingzhu/contractSignStatus/sign', parmas)
    }, // 合同签约
    orderByBoss(parmas) {
        return httpPost('/Mingzhu/IncircleDesigner/orderByBoss', parmas)
    }, // 客户排名
    saveProjectMoney(parmas) {
        return httpGet('/Mingzhu/system/projectMoneyTrust/save', parmas)
    }, // 设计费托管上传
    listProjectMoney(parmas) {
        return httpGet('/Mingzhu/system/projectMoneyTrust/list', parmas)
    }, // 设计费托管上传  //1:招标代理服务费，2:增值服务费，3:项目启动资金
    removeProjectMoney(parmas) {
        return httpPost('/Mingzhu/system/projectMoneyTrust/remove', parmas)
    }, // 设计费托管删除
    queryother(parmas) {
        return httpPost('/Mingzhu/IncircleDesigner/queryother', parmas)
    }, // 请求查看其他作品
    signUp(parmas) {
        return httpPost('/Mingzhu/openCollectionList/enter', parmas)
    }, // 我要报名
    projectMoneyTrustState(parmas) {
        return httpGet('/Mingzhu/system/projectMoneyTrust/state', parmas)
    }, // 资金托管支付托管
    concernCase(params) {
        return httpPost('/Mingzhu/boss/concern/case', params)
    }, // 需求方关注设计师案例
    cancelConcernCase(params) {
        return httpPost('/Mingzhu/boss/cancelconcern/case', params)
    }, // 取消关注设计师案例
    findLoginInfo(params) {
        return httpPost('/Mingzhu/login/loginInfo', params)
    }, // 获取当前登入信息
    findPrjExtendFile(params) {
        return httpGet(
            '/Mingzhu/project/prjExtendFile/designer/PrjExtendFileList',
            params
        )
    }, // 设计师根据项目ID查询补充文件
    getManuscriptList(params) {
        return httpGet('/Mingzhu/manuscript/manuscriptList', params)
    }, // 查询成果列表
    getInformation(params) {
        return httpPost('/Mingzhu/system/project/get', params)
    },
    getAchievements(params) {
        return httpGet('/Mingzhu/common/dict/list/tb_manuscript_type', params)
    }, // 获取设计成果
    getBossFeedBack(params) {
        return httpGet('/Mingzhu/manuscript/manuscriptBossFeedBackList', params)
    }, // 获取客户反馈
    manuscriptupload(params) {
        return httpPost('/Mingzhu/manuscript/upload', params)
    }, // 上传成果文件
    deletemanuscript(params) {
        return httpGet('/Mingzhu//manuscript/manuscripDelete', params)
    }, // 删除成果文件
    invitionStatusDetail(params) {
        return httpPost(
            '/Mingzhu/system/project/designer/invitionStatusDetail',
            params
        )
    }, // 设计师接受邀请状态详情
    validateVeriCode(params) {
        return httpPost('/Mingzhu/login/validateVerificationCode', params)
    }, // 单独手机验证码校验
    qryCurrentUserProjectProcess(params) {
        return httpGet('/Mingzhu/system/project/qryCurrentUserProjectProcess', params)
    }, // 根据需求方id获取项目列表
    qryCurrentUserProjectProcessNew(params) {
        return httpGet('/Mingzhu/system/project/qryCurrentUserProject', params)
    }, // 根据需求方id获取项目列表新接口客户项目管理
    qryCurrentProjectProcess(params) {
        return httpGet('/Mingzhu/system/project/qryCurrentProjectProcess', params)
    }, // 获取项目流程
    midtermDesigners(params) {
        return httpGet('/Mingzhu/manuscript/midtermDesigners', params)
    }, // 获取中间成果设计师列表
    getManuscript(params) {
        return httpGet('/Mingzhu/manuscript/midtermResultList', params)
    }, // 获取中间成果文件列表
    submitInviteList(params) {
        return httpPost('/Mingzhu/system/projectInvitation/submitInviteList', params)
    }, // 确认邀请的设计师
    majorRequirement(params) {
        return httpGet('/Mingzhu/common/dict/list/design_required_type', params)
    }, // 设计说明专业要求
    designFeeBudget(params) {
        return httpGet('/Mingzhu/system/project/designBudget/audit', params)
    }, // 提交设计费报价
    refuseAdjust(params) {
        return httpGet('/Mingzhu/budget/refuseAdjust', params)
    }, // 关闭项目
    getDesignBudget(params) {
        return httpGet('/Mingzhu/system/project/designBudget/get', params)
    }, // 获取自己填写的设计费报价
    succeedCase(params) {
        return httpGet(
            '/Mingzhu/system/succeedCase/detail',
            params
        )
    },
    latestProjectNotify(params) {
        return httpGet('/Mingzhu/oa/notify/latestProjectNotify', params)
    }, // 项目最新消息
    personLatestNotify(params) {
        return httpGet('/Mingzhu/oa/notify/personLatestNotify', params)
    }, // 用户最新消息
    excellentProjectList(params) {
        return httpGet('/Mingzhu/viewPoint/findViewPointList', params)
    }, // 优秀案例/视界
    getProjectDetail(params) {
        return httpGet('/Mingzhu/viewPoint/query/viewPointDetail', params)
    }, // 首页 项目详情
    viewPointDetail(params) {
        return httpGet('/Mingzhu/system/succeedCase/detail', params)
    }, // 优秀案例/视界详情
    viewPointLatestNotify(params) {
        return httpGet('/Mingzhu/system/succeedCase/getPropView', params)
    }, // 优秀案例/合筑世界最新消息
    buttSuccess(params) {
        return httpGet('/Mingzhu/system/projectInvitation/buttSuccess', params)
    }, // 确认设计师，签署代理合同
    contest(params) {
        return httpGet('/Mingzhu/pages/contest/list', params)
    }, // 竞赛专页列表
    contestDetail(params) {
        return httpGet('/Mingzhu/pages/contest/show', params)
    }, // 最新竞赛消息
    contestPreview(params) {
        return httpGet('/Mingzhu/pages/contest/getPropContestPreview', params)
    }, // 竞赛专页详情
    goingProject(params) {
        return httpGet('/Mingzhu/system/project/qryBossOngoingProject', params)
    }, // 邀请时获取用户项目
    designerFront() {
        return httpGet('/Mingzhu/system/succeedCase/indexHezhuView')
    },
    designerFrontL() {
        return httpGet('/Mingzhu/system/succeedCase/indexHezhuViewL')
    },
    contactSave(params) {
        return httpPost('/Mingzhu/contactus/save', params)
    },
    commonQuestionList() {
        return httpGet('/Mingzhu/commonQuestion/list')
    },
    commonQuestionAns(params) {
        return httpGet('/Mingzhu/commonQuestion/query/commonquestion', params)
    },
    returnNewsId(params) {
        return httpGet('/Mingzhu/oa/notify/notifyIsRead', params)
    },
    feedBackUpload(params) {
        return httpPost('/Mingzhu/manuscript/uploadBossFeedBack', params)
    },
    taskGetProvince(params) {
        return httpGet('/Mingzhu/common/address/getState' + params)
    },
    getCity(params) {
        return httpGet('/Mingzhu/common/dict/getCity/' + params)
    },
    getCounty(params) {
        return httpGet('/Mingzhu/common/dict/getCounty/' + params)
    },
    getTaskInfo(params) {
        return httpPost('/Mingzhu/system/project/getTaskInfo', params)
    },
    getLastNews(params) {
        return httpGet('/Mingzhu/news/getPropNews', params)
    }, // 最新新闻消息列表
    getpropDesignerCaseDOList(params) {
        return httpPost('/Mingzhu/desginerCase/getPropinquityDesignerCase', params)
    }, // 热门和相似案例
    getexcellentTypeList(params) {
        return httpGet('/Mingzhu/common/dict/list/build_type', params)
    }, // 合筑视界分类列表
    getexcellentList(params) {
        return httpGet('/Mingzhu/system/succeedCase/list', params)
    }, //合筑视界列表
    // getNewexcellentList(params) {
    //     return httpGet('/Mingzhu/system/succeedCase/list', params)
    // } //合筑视界最新列表
    getCasePic(params) {
        return httpPost('/Mingzhu/desginerCase/getDesignerCasePicture', params)
    }, // 获取案例图片
    getInfoByDesignerId(params) {
        return httpGet('/Mingzhu/informationMaintenance/getInfoByDesignerId', params)
    }, //设计师基本信息
    getInfoByDesignerIdNew(params) {
     return httpGet('/Mingzhu/system/designerTemp/getInfoByDesignerId', params)
    }, //设计师基本信息新
    queryListByDesignerId(params) {
        return httpGet('/Mingzhu/desginerCase/queryListByDesignerId', params)
    }, //设计师奖励经历
    getHonors(params) {
        return httpGet('/Mingzhu/informationMaintenance/getHonors', params)
    }, //设计师作品类型
    getCaseClassification(params) {
        return httpGet('/Mingzhu/informationMaintenance/caseClassification', params)
    }, //设计师个人项目
    getDesignerBaseInfo(params) {
        return httpGet('/Mingzhu/informationMaintenance/getInfoByDesignerId', params)
    },
    getDesignerInfoUpdate(params) {
        return httpPostJson('/Mingzhu/search/designer/update', params)
    },
    getDesignerInfoUpdateNew(params,type) {
        return httpPostJson(`/Mingzhu/search/designer/updateAudit/${type}`, params)
    },
    updateDesignerInfo(params) {
        return httpPostJson('/Mingzhu/informationMaintenance/designerInformationUpdate', params)
    },
    // text(params) {
    //     return httpPost('/Mingzhu//common/email/sendBossFollowEmail', params)
    // }
    newDesignerDynamic(params) {
        return httpPost('/Mingzhu/front/designerDynamic/save', params)
    }, //新增设计师个人动态
    getArticleList(params) {
        return httpGet('/Mingzhu/system/succeedCase/list', params)
    }, //我的文章列表
    upLoadArticle(params) {
        return httpPost('/Mingzhu/article/audit', params)
    }, //我的文章上传
    getSettings(params) {
        return httpPost('/Mingzhu/informationMaintenance/designerSetting/query', params)
    },
    updateSetting(params){
        return httpPost('/Mingzhu/informationMaintenance/maintain/designerSetting', params)
    },
    getNation() {
        return httpGet('/Mingzhu/common/address/getCountry')
    }, //查询所有国家列表接口
    getDesigerDynamic(params) {
        return httpGet('/Mingzhu/front/designerDynamic/list',params)
    }, //设计师个人动态查询
    getPersonalNotify(params) {
        return httpGet('/Mingzhu/oa/notify/personalNotify', params)
    }, //站内信
    //答疑信息
    getAnswerNotifyList(params) {
        return httpGet('/Mingzhu/question/answerNotifyList/', params)
    },
    //lee
    getDesigerWorkType(params,value) {
        return httpGet(`/Mingzhu/search/designer/${value}`, params)
    },
    //所属事务所
    wxLogin(params) {
        return httpGet('/Mingzhu/wechat/callBack', params)
    }, // 微信登录传code
    verifyPhoneOrEmail(params){
        return httpPost('/Mingzhu/verifyPhoneOrEmail', params)
    },
    bindPhoneOrEmail(params){
        return httpPost('/Mingzhu/bindPhoneOrEmail', params)
    },
    wechatLogin(){
        return httpPost('/Mingzhu/wechat/wechatLogin')
    },
    checkEnableChgPwd(){
        return httpGet('/Mingzhu/login/checkEnableChgPwd') 
    },
    userChgPwd(params){
        return httpPost('/Mingzhu/login/userChgPwd',params)
    },
    deleteQuestion(params) {
        return httpGet('/Mingzhu/question/deleteDesignerQuestion', params)
    }, // 删除设计师答疑
    finalResultList(params) {
        return httpGet('/Mingzhu/manuscript/finalResultList', params)
    }, // 最终成果
    updateCompletePct(params) {
        return httpPost('/Mingzhu/system/projectInvitation/update/completePct', params)
    }, // 项目进度百分比更新
    seachCompletePct(params) {
        return httpGet('/Mingzhu/system/projectInvitation/search/completePct', params)
    }, // 项目进度百分比查询
    getProject(params){
        return httpPost('/Mingzhu/system/project/get',params)
    },//项目概况
    getRequiredOverView(params){
        return httpGet('/Mingzhu/system/required/queryRequiredOverView',params)
    }, //招标要求
    getNotify(params){
        return httpGet('/Mingzhu/system/project/notify',params)
    }, // 项目消息
    getProjectStatus(params){
        return httpGet('/Mingzhu/system/projectStatus/qryStatus',params)
    },//项目状态
    exampleDownload(params){
        return `/Mingzhu/common/sysFile/exampleDownload/${params}`
    },//type,1,2,3,4 对应公开,邀请,委托,公开+邀请
    viewNotify(params){
        return httpGet(`/Mingzhu/search/designer/${params}`)
    },  //站内信查看
    removeNotify(params){
        return httpPost('/Mingzhu/oa/notify/remove',params)
    },  //站内信删除
    
    articlePraise(params){
        return httpPost('/Mingzhu/article/praise/praise',params)
    }, // 文章点赞
    cancelAddPraise(params) {
        return httpPost('/Mingzhu/desginerCase/addPraise/cancel', params)
    }, // 取消案例点赞
    cancelArticlePraise(params){
        return httpPost('/Mingzhu/article/praise/cancel',params)
    }, // 取消文章点赞
    getAgenda(params){
        return httpGet('/Mingzhu/common/agenda/get',params)
    }, // 查询专家评审
    getTProvince(){
        return httpGet('/Mingzhu/common/dict/taskGetProvince')
    },
    getLocation(params){
        return httpGet(`/Mingzhu/common/address/getWorkAddressBydesignerId/${params}`)
    },
    updateLocation(params){
        return httpPost('/Mingzhu/common/address/updateWorkCity', params)
    },
    getBossExtSetting(params){
        return httpPost('/Mingzhu/informationMaintenance/bossExtSetting/query',params)
    }, // 客户高级配置查询
    saveBossExtSetting(params){
        return httpPostJson('/Mingzhu/informationMaintenance/maintain/bossExtSetting',params)
    }, // 客户高级配置保存
    saveWorkCity(params){
        return httpPost('/Mingzhu/common/address/updateWorkCity',params)
    }, //设计师 保存国家城市
    queryWorkAddress(params){
        return httpGet(`/Mingzhu/common/address/getWorkAddressBydesignerId/${params}`)
    }, // 设计师查询国家城市
    saveBossWorkCity(params){
        return httpPost('/Mingzhu/common/address/updateBossWorkCity',params)
    }, //客户 保存国家城市
    queryWorkAddressByBossId(params){
        return httpGet(`/Mingzhu/common/address/getWorkAddressBybossId/${params}`)
    }, // 客户查询国家城市

    getCollectedArticles(params){
        return httpGet('/Mingzhu/article/collectedArticles',params)
    }, // 收藏文章查询

    // 作品建筑位置chaxun
    projectGetProvince(){
        return httpGet('/Mingzhu/common/dict/getProvince')
    },
    // 合筑视界关注
    getCollection(params1,params2,params3){
        return httpPost(`/Mingzhu/collection/${params1}/${params2}`,params3)
    },
    getMyArticle(params) {
        return httpGet('/Mingzhu/system/succeedCase/myArticle', params)
    },
    //关注项目
    watchUp(params,val) {
        return httpPost(`/Mingzhu/system/project/concern/${val}`, params)
    },
    //关注新闻
    watchNews(val,params){
        return httpPost(`/Mingzhu/news/praise/${val}`, params)
    },
    qryCurrentUserResolvedQuestion(params){
        return httpGet("/Mingzhu/question/qryCurrentUserResolvedQuestion", params)
    },
    qryDesignerProportion(params){
        return httpGet("/Mingzhu/system/projectInvitation/qryDesignerProportion", params)
    },//已确认设计师和总邀请/委托设计师之比
    qryFinallyDesigner(params){
        return httpGet("/Mingzhu/system/projectInvitation/qryFinallyDesigner", params)
    },//对接后的设计师
    qryProjectStatus(params){
        return httpGet("/Mingzhu/system/projectStatus/qryProjectStatus", params)
    },// 设计师查询进行中项目进度
    updPasswordNeedLogin(params){
        return httpGet("/Mingzhu/login/updPasswordNeedLogin", params)
    },// 判断是否登录
    updPassword(params){
        return httpGet("/Mingzhu/login/updPassword", params)
    },//修改密码保存
    queryOriginRequired(params){
        return httpGet("/Mingzhu/system/required/queryOriginRequired",params)
    },//项目初始需求
    saveBudget(params){
        return httpPost("/Mingzhu/common/taskBaseInfo/saveBudget",params)
    },//设计费用预算暂存
    submitBudget(params){
        return httpPost("/Mingzhu/common/taskBaseInfo/submitBudget",params)
    },//设计费用预算提交
    relateAccount(params){
		return httpGet('/Mingzhu/login/relateAccount',params) 
	}, // 关联账号
	loginCode(params){
		return httpGet('/Mingzhu/login/loginCode',params) 
    }, // 验证码登陆
    queryOptionalandUnpaidList(params){
        return httpGet('/Mingzhu/system/valueaddedService/queryOptionalandUnpaidList',params) 
    }, //获取增值服务
    valueaddedPackage(params){
        return httpPost("/Mingzhu/common/valueaddedPackage/save",params)
    },//保存增值服务
    getServicesByPackageId(params){
        return httpGet(`/Mingzhu/common/valueaddedPackage/getServicesByPackageId/${params}`)
    },
    packageUpdate(params){
        return httpPost("/Mingzhu/common/valueaddedPackage/update",params)
    },//保存增值服务凭证
    getPackgeUrl(params){
        return httpPost("/Mingzhu/common/valueaddedPackage/getUrl",params)
    },//获取凭证
    getAllToBePaid(params){
        return httpGet(`/Mingzhu/common/valueaddedPackage/getAllToBePaid/${params}`)
    },//获取所有的待支付的增值包
    getAllToBeConfirmed(params){
        return httpGet(`/Mingzhu/common/valueaddedPackage/getAllToBeConfirmed/${params}`)
    },//获取所有的待确认的增值包
    getAllByBossId(params){
        return httpGet(`/Mingzhu/common/valueaddedPackage/getAllByBossId/${params}`)
    },//获取所有的支付，待支付的增值包
    qryLastResult(params){
        return httpGet("/Mingzhu/manuscript/qryLastResult",params)
    },//最终成果
    wechatCheckLogin (params) {
      return httpGet("/Mingzhu/wechat/wechatCheckLogin",params)
    }, // 微信自动登陆
    queryChoiceList(params) {
        return httpGet("/Mingzhu/system/valueaddedService/queryChoiceList",params)
      }, // 增值服务
    updateVoucher(params){
        return httpPost("/Mingzhu/system/valueaddedService/updateVoucher",params)
    },//上传增值服务凭证
    getFileUrl(params) {
        return httpPost("/Mingzhu/system/valueaddedService/getFileUrl",params)
      }, // 增值服务
    getVedio(params) {
        return httpGet("/Mingzhu/common/agenda/getVedio",params)
    }, // 直播
    qryAgedaStatus(params) {
        return httpGet("/Mingzhu/common/agenda/qryAgedaStatus",params)
    }, // 查询评审议程
    updateAgedaStatus(params) {
        return httpGet("/Mingzhu/common/agenda/updateAgedaStatus",params)
    }, // 确认评审议程
    getRankNum(params) {
        return httpPost("/Mingzhu/IncircleDesigner/getRankNum",params)
    }, // 排名数量
    queryProjectInfo(params) {
        return httpGet("/Mingzhu/system/project/queryProjectInfo",params)
    }, // 项目概况
    checkIsAudit(params) {
        return httpGet("/Mingzhu/login/checkIsAudit",params)
    }, // 
    getRequiredTaskFileBoss(params) {
        return httpGet("/Mingzhu/common/file/admin/requiredTaskFileBoss/list",params)
    }, // 客户设计任务书文件查询接口
    getRequiredTaskFileDesigner(params) {
        return httpGet("/Mingzhu/common/file/admin/requiredTaskFileDesigner/list",params)
    }, // 设计师设计任务书文件查询接口
    requiredTaskFileBossUpdStatus(params) {
        return httpGet("/Mingzhu/common/file/admin/requiredTaskFileBossUpdStatus",params)
    }, // 客户设计任务书更新状态
    updatePrjExtendFile(params){
        return httpPost("/Mingzhu/project/prjExtendFile/save",params)
    },// 提交补充文件
    getPrjExtendFile(params) {
        return httpGet("/Mingzhu/project/prjExtendFile/list",params)
    }, // 客户查看补充文件
    getDesignerPaymentVoucher(params) {
        return httpPost("/Mingzhu/designerInvoice/getDesignerPaymentVoucher",params)
    }, //设计师项目管理 设计师获取凭证
    addDesignerPaymentVoucher(params) {
        return httpPost("/Mingzhu/designerInvoice/addDesignerPaymentVoucher",params)
    }, //设计师项目管理 设计师获取发票凭证/IncircleDesigner/isIncircle
    isIncircle(params) {
        return httpGet("/Mingzhu/IncircleDesigner/isIncircle",params)
    }, //设计师项目管理 设计师获取入围
    getPrjExtendFileList(params) {
        return httpGet("/Mingzhu/project/prjExtendFile/designer/PrjExtendFileList",params)
    }, //设计师答疑中的补充文件
    qryCaculator(params) {
        return httpGet("/Mingzhu/budget/qryCaculator",params)
    }, //获取排名和金额
    qryProjectStatus(params) {
        return httpGet("/Mingzhu/system/projectMoneyTrust/qryProjectStatus",params)
    }, // 设计师项目状态查询
}

/**  axios基础配置 */
axios.defaults.timeout = 30000
axios.defaults.headers['Content-Type'] =
    'application/x-www-form-urlencoded;charset=UTF-8'
    // axios.defaults.headers.common['Authorization'] = 'hotelbank';

function find(str, s, num) {
    var x = str.indexOf(s)
    for (let i = 0; i < num; i++) {
        x = str.indexOf(s, x + 1)
    }
    return x
}
// var url = '';
// var urlpath = '';

export function exportFile(url, params) {
    if (!params) {
        return url
    }
    let paramStr = qs.stringify(params)
    return url + '?' + paramStr
}

export function httpPostJson(url, params) {
    axios.defaults.timeout = 30000
    axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
        // console.log('%cPOST请求', 'color: #20a0ff;');
        // console.log('%c请求参数:', 'color: #20a0ff;', params);
        // console.log('%c请求接口地址:', 'color: #20a0ff;', url);
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then(
                response => {
                    // 返回数据
                    if (response.data.code == ' 0 ' || response.data.code == '200') {
                        // 深拷贝数据
                        let copyDate = JSON.parse(JSON.stringify(response.data))
                        resolve(response.data) // 成功后返回结果
                            // console.log('%c请求接口:', 'color: #13ce66;');
                            // console.log(url);
                            // console.log('%c返回数据:', 'color: #13ce66;');
                            // console.log(response.data);
                    } else {
                        resolve(response.data)
                            // console.log('%c请求接口:', 'color: #13ce66;');
                            // console.log(url);
                            // console.log('%c错误信息:', 'color: #ff4949;');
                            // console.log(response.data);
                            // if (response.data.msg) {
                            //   Message.error(response.data.msg) // 错误信息
                            // } else {
                            //   Message.error('错误') // 未设置错误信息时返回
                            // }
                    }
                },
                err => {
                    // 服务器错误
                    reject(err)
                    Message.error('请求超时')
                        // console.log('%c请求接口:', 'color: #ff4949;', url);
                }
            )
            .catch(error => {
                reject(error)
                Message.error('系统错误')
            })
    })
}
/** axios封装请求get,post方法 */
export function httpPost(url, params) {
    axios.defaults.timeout = 30000
    axios.defaults.headers['Content-Type'] =
        'application/x-www-form-urlencoded;charset=UTF-8'
        // console.log('%cPOST请求', 'color: #20a0ff;');
        // console.log('%c请求参数:', 'color: #20a0ff;', params);
        // console.log('%c请求接口地址:', 'color: #20a0ff;', url);
    if (params) {
        params = qs.stringify(Object.assign(params))
    }
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then(
                response => {
                    // console.log('%c返回数据:', 'color: #13ce66;', response.data);
                    // 返回数据
                    if (response.data.code == '0' || response.data.code == '200') {
                        // 深拷贝数据
                        let copyDate = JSON.parse(JSON.stringify(response.data))
                        resolve(response.data) // 成功后返回结果
                            // console.log('%c请求接口:', 'color: #13ce66;');
                            // console.log(url);
                            // console.log('%c返回数据:', 'color: #13ce66;');
                            // console.log(response.data);
                    } else if (response.data.code == '401') {
                        // Message.error("请先登录")
                        localStorage.clear();
                        sessionStorage.clear();
                        store.commit("setUser", {});
												store.commit("setRole", "");
												if (inWeixin) {
													Message.error('账号未注册或登录');
													// Bus.$emit("wechatLogin",'');
												} else {
													Bus.$emit("loginBox",'');
												}
                        resolve(response.data)
                        // store.commit("setReLogin",1);
                        // router.push({
                        //     path: '/'
                        // })
                        // router.push({
                        //     path: '/homePage',
                        // })
                    } else {
                        resolve(response.data)
                            // console.log('%c请求接口:', 'color: #13ce66;');
                            // console.log(url);
                            // console.log('%c错误信息:', 'color: #ff4949;');
                            // console.log(response.data);
                            // if (response.data.msg) {
                            //   Message.error(response.data.msg) // 错误信息
                            // } else {
                            //   Message.error('错误') // 未设置错误信息时返回
                            // }
                    }
                    // if (response.data.code === '000000') {
                    //   //深拷贝数据
                    //   let copyDate = JSON.parse(JSON.stringify(response.data));
                    //   resolve(response.data); //成功后返回结果
                    //   // console.log('%c请求接口:', 'color: #13ce66;');
                    //   // console.log(url);
                    //   // console.log('%c返回数据:', 'color: #13ce66;');
                    //   // console.log(response.data);
                    // } else {
                    //   // console.log('%c请求接口:', 'color: #13ce66;');
                    //   // console.log(url);
                    //   // console.log('%c错误信息:', 'color: #ff4949;');
                    //   // console.log(response.data);
                    //   if (response.data.msg) {
                    //     Message.error(response.data.msg); //错误信息
                    //   } else {
                    //     Message.error("错误"); //未设置错误信息时返回
                    //   }
                    // }
                },
                err => {
                    // 服务器错误
                    reject(err)
                    Message.error('请求超时')
                        // console.log('%c请求接口:', 'color: #ff4949;', url);
                }
            )
            .catch(error => {
                reject(error)
                Message.error('系统错误')
            })
    })
}

export function httpGet1(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(
                response => {
                    let copyDate = JSON.parse(JSON.stringify(response.data))
                    resolve(response.data) // 成功后返回结果
                },
                err => {
                    reject(err)
                    Message.error('请求超时')
                }
            )
            .catch(error => {
                reject(error)
                Message.error('系统错误')
            })
    })
}

export function httpGet(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(
                response => {
                    // console.log('%c返回数据:', 'color: #13ce66;', response.data);
                    // 返回数据
                    if (response.data.code == '0' || response.data.code == '200') {
                        // 深拷贝数据
                        let copyDate = JSON.parse(JSON.stringify(response.data))
                        resolve(response.data) // 成功后返回结果
                            // console.log('%c请求接口:', 'color: #13ce66;');
                            // console.log(url);
                            // console.log('%c返回数据:', 'color: #13ce66;');
                            // console.log(response.data);
                    } else if (response.data.code == '401') {
                        // Message.error("请先登录")
                        localStorage.clear();
                        sessionStorage.clear();
                        store.commit("setUser", {});
                        store.commit("setRole", "");
                        if (inWeixin) {
													// Bus.$emit("wechatLogin",'');
													Message.error('账号未注册或登录');
												} else {
													Bus.$emit("loginBox",'');
												}
                        resolve(response.data)
                        // store.commit("setReLogin",1)
                        // router.push({
                        //     path: '/',
                        // })
                        // router.push({
                        //     path: '/homePage',
                        //     query: {
                        //         redirect: location.hostname
                        //     }
                        // })
                    } else {
                        resolve(response.data)
                            // console.log('%c请求接口:', 'color: #13ce66;');
                            // console.log(url);
                            // console.log('%c错误信息:', 'color: #ff4949;');
                            // console.log(response.data);
                            // if (response.data.msg) {
                            //   Message.error(response.data.msg) // 错误信息
                            // } else {
                            //   Message.error('错误') // 未设置错误信息时返回
                            // }
                    }
                },
                err => {
                    reject(err)
                    Message.error('请求超时')
                        // console.log('%c请求失败', 'color: #ff4949;');
                        // console.log('%c请求接口:', 'color: #ff4949;');
                        // console.log(url);
                        // console.log('%c网络出错了', 'color: #ff4949;')
                }
            )
            .catch(error => {
                reject(error)
                Message.error('系统错误')
            })
    })
}

export function httpDelete(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .delete(url, {
                params: params
            })
            .then(
                response => {
                    // console.log('%c请求参数:', 'color: #20a0ff;', params);
                    // console.log('%c请求成功', 'color: #13ce66;');
                    let copyDate = JSON.parse(JSON.stringify(response.data))
                        // 返回数据
                    resolve(copyDate)
                        // if (response.data.isSuccess) {
                        //   resolve(response.data);//成功后返回结果
                        //   console.log('%c请求接口:', 'color: #13ce66;');
                        //   console.log(url);
                        //   console.log('%c返回数据:', 'color: #13ce66;');
                        //   console.log(response.data);
                        // } else {
                        //   console.log('%c请求接口:', 'color: #13ce66;');
                        //   console.log(url);
                        //   console.log('%c错误信息:', 'color: #ff4949;');
                        //   console.log(response.data);
                        //   if (response.data.errorMsg) {
                        //     Message.error(response.data.errorMsg);//错误信息
                        //   } else {
                        //     Message.error("错误");//未设置错误信息时返回
                        //   }
                        // }
                },
                err => {
                    reject(err)
                    Message.error('请求超时')
                        // console.log('%c请求失败', 'color: #ff4949;');
                        // console.log('%c请求接口:', 'color: #ff4949;');
                        // console.log(url);
                        // console.log('%c网络出错了', 'color: #ff4949;')
                }
            )
            .catch(error => {
                reject(error)
                Message.error('系统错误')
            })
    })
}