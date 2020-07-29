import Vue from 'vue'
import App from './App'

import store from './store'

import MinRequest  from "./base/request";
import minRequest from "./base/apis";

Vue.config.productionTip = false

Vue.use(MinRequest);

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App,
	minRequest
})
app.$mount()
