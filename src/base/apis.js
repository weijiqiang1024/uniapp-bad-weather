
import MinRequest from './request'
import baseConfig from "./config";

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
    config.baseURL = baseConfig.baseUrl
    return config
})


export default {
    apis: {
        login(data) {
            return minRequest.post('/api/sys_users/webLogin', data)
        },
        querySystem(data) {
            return minRequest.post('/api/s_surveillance_systems/list', data)
        },
        //获取气象设备参数
        queryMeteoInfo(data) {
            return minRequest.post('/api/meteorological_data/list', data)
        },
        //获取雾灯设备状态参数
        queryFrogInfo(url) {
            return minRequest.get(url, {}, { baseURL: baseConfig.frogUrl })
        },
        //获取视频列表
        getVideoList(data) {
            return minRequest.post('/api/d_video_cameras/list',data)
        },
        //获取雾灯列表
        getFrogList(data) {
            return minRequest.post('/api/d_frog_lights/list', data)
        },
        //获取能见度设备列表
        getMeteoList(data) {
            return minRequest.post('/api/d_visibility_meters/list', data)
        },
        //获取能见度设备列表
        getMeteoData(data) {
            return minRequest.post('/api/meteorological_data/list', data)
        },

    }
}