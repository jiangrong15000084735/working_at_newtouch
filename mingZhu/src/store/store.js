import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/api'
import { stat } from 'fs';
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isAuditState:null,
		reLogin:-1,
		role: '',
		author: 'li',
		auditState:'-1',
		activeType: '', // 注册类型   role: 1设计师 0非设计师
		user: {}, // 用户信息
		navScroll: '', // 右边导航固定条滚动后效果true false记录
		avatar: '',

		//
		retry_count_add: '',
		token: localStorage['site_current_token'] ? localStorage['site_current_token'] : '', //token
		account_id: localStorage['site_current_account_id'] ? localStorage['site_current_account_id'] : 0, //当前account_id
		app_id: localStorage['site_current_app_id'] ? localStorage['site_current_app_id'] : '', //当前 app_id
		retry_count: 0, //登录重试次数,防止同一页面中多个ajax同时触发登录操作
		after_login_go: localStorage['site_current_login_go'] ? localStorage['homePage'] : '', //登录后跳转

		taskBookStep: 0,
		requirementsStep: 0,
		allStep: 0,
		// 是否已经登陆
		isLogin: localStorage['isLogin'] ? localStorage['isLogin'] : false,
		// 登陆成功后是否需要刷新页面
		isRefresh: false,
		// 设计师项目管理，记住选中tab
		activeTab: 0,
		// 微信code
		code: null,
		// 微信openId
		openId: sessionStorage['openId'] ? sessionStorage['openId'] : null
	},
	getters: {
		userInfo: state => {
			return state.user
		},
		getAvatar: state => {
			return state.avatar
		},
		getAuditState: state => {
			return state.auditState
		},
		// 获取登陆状态
		getIsLogin: state => {
			return state.isLogin
		},
		// 获取登陆成功后是否需要刷新页面
		getIsRefresh: state => {
			return state.isRefresh
		},
		getActiveTab: state => {
			return state.activeTab
		},
		// 获取微信code
		getCode: state => {
			return state.code
		},
		// 获取微信openId
		getOpenId: state => {
			return state.openId
		}
	},
	mutations: {
		SetAuditState(state, payload) {
			state.auditState = payload
		},
		increment: state => state.count++,
		decrement: state => state.count--,
		setActiveType(state, payload) {
			state.activeType = payload
		},
		setUser(state, payload) {
			state.user = payload
		},
		setRole(state, num) {
			state.role = num
		},
		setNavScroll(state, payload) {
			state.navScroll = payload
		},
		setAvatar(state, payload) {
			state.avatar = payload
		},
		setReLogin(state,num){
			state.reLogin = num
		},
		GET_TASK_BOOK_STEP(state, step) {
			state.taskBookStep = step
		},
		GET_REQUIREMENT_STEP(state, step) {
			state.requirementsStep = step
		},
		GET_ALL_STEP(state, step) {
			state.allStep = step
		},
		// 设置登陆状态
		setIsLogin(state, payload) {
			state.isLogin = payload
		},
		// 设置登陆成功后是否需要刷新页面
		setIsRefresh(state, payload) {
			state.isRefresh = payload
		},
		setActiveTab(state, step) {
			state.activeTab = step
		},
		// 存储微信code
		setCode(state, payload) {
			state.code = payload
		},
		// 存储微信openId
		setOpenId(state, payload) {
			state.openId = payload
		}
	},
	actions: {
		getTaskBookStep(context, id) {
			api.seekTaskBaseInfo(id).then(res => {
				if (res.code == 0) {
					let projectDO = res.data.projectDO
					let step = projectDO.step
					if (projectDO.step > 0) {
						context.commit('GET_TASK_BOOK_STEP', { step: step })
					}
				}
			})
		},
		getRequirementsStep(context, id) {
			api.required(id).then(res => {
				if (res.code == 0) {
						let projectDO = res.data.projectDO;
						let step = projectDO.step
						if (step > 0) {
							context.commit('GET_REQUIREMENT_STEP', { step: step })
						}
				}
			});
		},
		getAllStep(context, id) {
			api.getProjectStatus({ id: id }).then(res => {
				if (res.code == 0) {
					let projectStatus = res.data.status
					if (projectStatus > 0) {
						context.commit('GET_ALL_STEP', { step: step })
					}
				}
			})
		}
	},
	//
	set_token(state, token) {
		state.token = token
		localStorage['site_current_token'] = token
	},
	set_accountid(state, aid) {
		state.account_id = aid
		localStorage['site_current_account_id'] = aid
	},
	set_appid(state, appid) {
		state.app_id = appid
		localStorage['site_current_app_id'] = appid
	},
	retry_count_add(state) {
		state.retry_count++
	},
	set_login_go(state, path) {
		state.after_login_go = path
		localStorage['site_current_login_go'] = path
	}
})