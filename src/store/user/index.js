/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2020-08-03 11:17:09 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2020-08-04 09:01:28
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */
const state={
    /**
		 * 是否需要强制登录
		 */
    forcedLogin: false,
    hasLogin: false,
    userName: ""
}

const mutations={
    login(state, userName) {
        state.userName = userName || '新用户';
        state.hasLogin = true;
    },
    logout(state) {
        state.userName = "";
        state.hasLogin = false;
    }
}

const actions={

}

const getters={

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
