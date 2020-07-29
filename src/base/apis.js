
import MinRequest from './request'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
    return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
    return response.data
})

// 设置默认配置
minRequest.setConfig((config) => {
    config.baseURL = 'http://36.7.79.167:3300'
    return config
})


export default {
    apis: {
        login(data) {
            return minRequest.post('/api/sys_users/webLogin', data)
        }
    }
}