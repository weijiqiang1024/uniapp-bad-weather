import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import createLogger from "@/utils/logger"

import user from "./user";
import socket from "./socket";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

//数据持久化
const vuexLocal = new VuexPersistence({
	storage: {
	getItem: key => uni.getStorageSync(key),
	setItem: (key, value) => uni.setStorageSync(key, value),
	removeItem: key => uni.removeStorageSync(key)
}
})

const store = new Vuex.Store({
	modules: {
		user,
		socket
	},state: {
		token: ""
	},
	mutations: {

	},
	actions: {

	},
	getters:{

	},
	strict: debug,
	plugins: debug ? [createLogger(), vuexLocal.plugin] : [vuexLocal.plugin],
	
})

export default store
