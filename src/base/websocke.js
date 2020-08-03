/* 
 * @Title: websocket 封装 （最佳实践应该剥离开vuex store依赖 封装单一的websoket服务 这里项目比较简单 暂不做抽离）
 *第三方websocket库 用不了 只能用uni自带的websocket 坑爹呢
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2020-08-03 14:18:15 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2020-08-03 18:07:22
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

//  import * as WebSocket from 'ws';
import moment from "moment";
class MinSocket {
    //socket 实例
    ws = null;
    //参数
    params = null;
    constructor(params){
         this.params = params
         this.init();
     }
    
     //初始化
     init(){
         let wsuri = this.params.wsuri;
         debugger;
         this.ws = uni.connectSocket({
             url: wsuri, //仅为示例，并非真实接口地址。
             complete: () => { }
         });;
        //  console.log(this.ws,999);
         this.ws.onOpen(res => this.websocketonopen(res));
         this.ws.onError(res => this.websocketonerror(res));
         this.ws.onMessage(res => this.websocketonmessage(res));
         this.ws.onClose(res => this.websocketclose(res));
     }
     
    websocketonopen(){
        console.log("WebSocket连接成功");
    }
    websocketonerror(e) {
        //错误
        console.log(e, "WebSocket连接发生错误");
    }
    websocketonmessage(e) {
        console.log(e, "message");
        console.info(moment().format("YYYY-MM-DD HH:mm:ss"));
        //数据接收
        const redata = JSON.parse(e.data);
        switch (redata.ret) {
            case 1:
                this.changeMatureMsg(redata.result);
                break;
            case 2:
                this.ws.send({data:JSON.stringify({ type: "0", value: ["0", "1", "2", "5"] })});
                break;
            case 3:
                this.changeDealMsg();
                break;
            default:
                break;
        }
    }
    websocketsend(agentData) {
        //数据发送
        this.ws.send(agentData);
    }
    websocketclose() {
        //关闭
        console.log("connection closed");
        this.ws.close();
    }
}

//#endregion
export default MinSocket;
