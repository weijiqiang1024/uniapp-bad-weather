<template>
  <view class="content">
    <view
      class="sys-title-area"
      :style="{backgroundImage:`url(${systemTitleImage});height:${windowHeight}px`}"
    >
      <span class="sys-name">高速公路</span>
      <span class="sys-name">恶劣天气预警防控系统</span>
    </view>
    <view class="input-group">
      <view class="input-row border first-input">
        <span class="conut-span">
          <img src="../../static/img/count.png" alt class="count-image" />
        </span>

        <m-input
          class="m-input"
          type="text"
          clearable
          focus
          v-model="username"
          placeholder="请输入你的账号"
        ></m-input>
      </view>
      <view class="input-row">
        <span class="conut-span">
          <img src="../../static/img/pwd.png" alt class="count-image" />
        </span>
        <m-input type="password" displayable v-model="password" placeholder="请输入你的密码"></m-input>
      </view>
    </view>
    <view class="btn-row">
      <button type="primary" class="primary primary-btn" @tap="bindLogin">登录</button>
    </view>
    <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}"></view>
  </view>
</template>

<script>
import service from "../../service.js";
import { mapState, mapMutations } from "vuex";
import mInput from "../../components/m-input.vue";
import MinSocket from "../../base/websocke";
import config from "../../base/config";

export default {
  components: {
    mInput,
  },
  data() {
    return {
      providerList: [],
      hasProvider: false,
      username: "",
      password: "",
      positionTop: 0,
      windowHeight: 0,
      isDevtools: false,
      systemTitleImage: config.backImageUrl + "/sys_title_image.png",
    };
  },
  computed: mapState({ forcedLogi: "user/forcedLogin" }),
  methods: {
    ...mapMutations({ login: "user/login" }),
    initProvider() {
      const filters = ["weixin", "qq", "sinaweibo"];
      uni.getProvider({
        service: "oauth",
        success: (res) => {
          if (res.provider && res.provider.length) {
            for (let i = 0; i < res.provider.length; i++) {
              if (~filters.indexOf(res.provider[i])) {
                this.providerList.push({
                  value: res.provider[i],
                  image: "../../static/img/" + res.provider[i] + ".png",
                });
              }
            }
            this.hasProvider = true;
          }
        },
        fail: (err) => {
          console.error("获取服务供应商失败：" + JSON.stringify(err));
        },
      });
    },
    initPosition() {
      /**
       * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
       * 反向使用 top 进行定位，可以避免此问题。
       */
      this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
      const { windowWidth, windowHeight } = uni.getSystemInfoSync();
      this.windowHeight = parseInt(windowWidth / 1.66);
    },
    async bindLogin() {
      debugger;
      /**
       * 客户端对账号信息进行一些必要的校验。
       * 实际开发中，根据业务需要进行处理，这里仅做示例。
       */
      if (this.username.length < 3) {
        uni.showToast({
          icon: "none",
          title: "账号最短为 3 个字符",
        });
        return;
      }
      if (this.password.length < 6) {
        uni.showToast({
          icon: "none",
          title: "密码最短为 6 个字符",
        });
        return;
      }
      /**
       * 下面简单模拟下服务端的处理
       * 检测用户账号密码是否在已注册的用户列表中
       * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
       */
      const data = {
        username: this.username,
        password: this.password,
      };
      let _self = this;

      try {
        let res = await this.$minApi.login(data);
        if (res.ret == 1) {
          uni.setStorageSync("uniIdToken", res.token);
          uni.setStorageSync("username", res.userData[0]["username"]);
          uni.setStorageSync("userData", JSON.stringify(res.userData[0]));

          //若用到websocket 在这里订阅
          let ws = new MinSocket({ wsuri: config.wsuri });
          //挂载ws为全局对象 便于退出时 销毁
          this.$ws = ws;
          _self.toMain(_self.username);
          uni.showToast({
            icon: "none",
            title: res.msg,
          });
        }else{
          uni.showToast({
            icon: "none",
            title: res.msg,
          });
        }
      } catch (error) {
         uni.showToast({
            icon: "none",
            title: "登录失败",
          });
        console.log(error, 888);
      }
    },
    oauth(value) {
      uni.login({
        provider: value,
        success: (res) => {
          uni.getUserInfo({
            provider: value,
            success: (infoRes) => {
              /**
               * 实际开发中，获取用户信息后，需要将信息上报至服务端。
               * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
               */
              this.toMain(infoRes.userInfo.nickName);
            },
            fail() {
              uni.showToast({
                icon: "none",
                title: "登陆失败",
              });
            },
          });
        },
        fail: (err) => {
          console.error("授权登录失败：" + JSON.stringify(err));
        },
      });
    },
    getUserInfo({ detail }) {
      if (detail.userInfo) {
        this.toMain(detail.userInfo.nickName);
      } else {
        uni.showToast({
          icon: "none",
          title: "登陆失败",
        });
      }
    },
    toMain(userName) {
      debugger;
      this.login(userName);
      /**
       * 强制登录时使用reLaunch方式跳转过来
       * 返回首页也使用reLaunch方式
       */
      //   if (this.forcedLogin) {
      uni.reLaunch({
        url: "../main/main",
      });
      //   } else {
      //     uni.navigateBack();
      //   }
    },
  },
  onReady() {
    this.initPosition();
    this.initProvider();
    // #ifdef MP-WEIXIN
    this.isDevtools = uni.getSystemInfoSync().platform === "devtools";
    // #endif
  },
};
</script>

<style>
.content {
  background-color: #f5f5f5;
}
.action-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.action-row navigator {
  color: #06f;
  padding: 0 10px;
}

.oauth-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.oauth-image {
  position: relative;
  width: 50px;
  height: 50px;
  border: 1px solid #dddddd;
  border-radius: 50px;
  margin: 0 20px;
  background-color: #ffffff;
}

.oauth-image image {
  width: 30px;
  height: 30px;
  margin: 10px;
}

.oauth-image button {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.login-button {
  font-size: 14px !important;
  letter-spacing: 10px !important;
}

.sys-title-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-size: 100% 100%;
}

.sys-name {
  display: inline-block;
  padding-bottom: 4px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 4px;
  text-shadow: rgb(64, 64, 64) 0px 2px 6px;
}

.conut-span {
  width: 50px;
  line-height: 36px;
  height: 36px;
  display: inline-block;
  display: flex;
  align-items: center;
  padding-left: 15px;
  border-bottom: 1px solid #dbdbe0;
}

.count-image {
  width: 24px;
  height: 24px;
}

.first-input {
  margin-bottom: 16px;
}

.primary-btn {
  margin: 10px 4%;
  background-color: #06f;
  font-size: 16px !important;
  letter-spacing: 4px;
  height: 40px;
  border-radius: 40px;
  line-height: 40px;
}
</style>
