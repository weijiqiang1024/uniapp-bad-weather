/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2020-08-03 11:17:09 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2020-08-04 10:57:24
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */
// import { v4 as uuidv4 } from 'uuid';
import { RECEIVE_MSG } from "../mutationType";
const state = {
    /**
		 * 是否需要强制登录
		 */
    meteo: {}
}

const mutations = {
    //气象信息
    [RECEIVE_MSG](state, payload) {
        let msg = payload.msg;
        if (!msg) return;
        switch (msg.Vtype) {
            case 1:
                updateMeteo(state, msg);
                break;
            default:
                break;
        }
    }
}

const actions = {

}

const getters = {

}

function updateMeteo(state, msg) {
    msg.uuid = generateUUID();
    state.meteo[msg.eqId] = msg;
}

//生成uuid
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
