<template>
  <view class="content" style="background-color:#fff;">
    <view class="user-area">
      <view
        class="title-back"
        :style="{backgroundImage:`url(${userImage});height:${windowHeight}px`}"
      >
        <view class="title-info">我的</view>
        <img src="../../static/img/userHL.png" alt class="police-logo" />
      </view>
      <view class="user-info">
        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">警员警号</view>
          <view class="wrapper">{{userData.police_id}}</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">警员姓名</view>
          <view class="wrapper">{{userData.username}}</view>
        </view>
        <view class="uni-form-item uni-row">
          <view class="title">所属机构</view>
          <view class="wrapper">{{userData.org_id || '--'}}</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">登录次数</view>
          <view class="wrapper">{{userData.total_login_counts}}</view>
        </view>
        <view class="uni-form-item uni-row">
          <view class="title">最近一次登录</view>
          <view class="wrapper">{{moment(userData.latest_login_time).format('YYYY-MM-DD HH:mm:ss')}}</view>
        </view>
      </view>
    </view>
    <view class="logout-btn">
      <!-- <button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button> -->
      <button @click="bindLogout" type="primary" class="primary primary-btn">
        退出登录
      </button>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import moment from "moment";
import config from "../../base/config";
// import userImage from "../../static/img/user_title.png";
export default {
  data() {
     
    return {
      userData: JSON.parse(uni.getStorageSync("userData")),
      userImage: config.backImageUrl + "user_title.png",
      windowHeight: 0
    };
  },
  mounted() {
    this.initPosition();
  },
  computed: {
    ...mapState({ hasLogin: "user/hasLogin", forcedLogin: "user/forcedLogin" }),
  },
  methods: {
    moment,
    ...mapMutations({ logout: "user/logout" }),
    initPosition() {
      /**
       * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
       * 反向使用 top 进行定位，可以避免此问题。
       */
      this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
      const { windowWidth, windowHeight } = uni.getSystemInfoSync();
      this.windowHeight = parseInt(windowHeight / 3);
    },
    scanImage() {
      let that = this;
      uni.scanCode({
        success: function (res) {
          // {"charSet":"utf-8","result":"6b0bd3413a9b45808f3d2fbd5b0ed387","codeVersion":4,"errMsg":"scanCode:ok","rawData":"NmIwYmQzNDEzYTliNDU4MDhmM2QyZmJkNWIwZWQzODc=","scanType":"QR_CODE"}
          let resData = res.result;
          if (resData) {
            that.getRegisterInfo(resData);
          }
        },
      });
    },
    async getRegisterInfo(id) {
      let params = {
        recordId: id,
        pageSize: 10,
        pageNumber: 1,
      };
      try {
        let res = await this.$minApi.queryRecord(params);
        if (res.status && res.result.rows.length > 0) {
          let info = res.result.rows[0];
          uni.navigateTo({
            url: "../user/verify?info=" + JSON.stringify(info),
          });
        } else {
          uni.showToast({
            icon: "none",
            title: "查询失败",
          });
        }
      } catch (error) {
        uni.showToast({
          icon: "none",
          title: "查询失败",
        });
      }
    },
    bindLogin() {
      uni.navigateTo({
        url: "../login/login",
      });
    },
    bindLogout() {
      //实际应该调后台登出接口 可惜后台服务没此接口
      this.logout();
      if (this.$ws) {
        this.$ws.ws.close();
      }

      uni.removeStorageSync("uniIdToken");
      uni.removeStorageSync("username");
      uni.removeStorageSync("userData");
      //若果用到websocket 在这里关闭

      uni.reLaunch({
        url: "../login/login",
      });
    },
  },
};
</script>

<style>
.contnet {
  position: relative;
  background-color: #fff !important;
  display: flex;
  flex-direction: column;
  justify-content: center !important;
  align-items: center !important;
}
.user-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* padding: 10px 0; */
  background: #fff;
}

.title-back {
  width: 100%;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.title-info {
  position: absolute;
  top: 26px;
  font-size: 16px;
  color: #fff;
}

.police-logo {
  width: 80px;
  height: 80px;
  background-size: 100% 100%;
  background: #fff;
  border-radius: 80px;
}

.user-info {
  width: 92%;
  border-radius: 10px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  transform: translateY(-20%);
  padding: 2px;
  background: #fff;
}

.uni-form-item {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 6px 0px;
  background: #fff;
  align-items: center;
}

.area-top {
  margin-top: 4px;
}

.uni-form-item .title {
  flex: 1.5;
  padding: 20rpx 0;
  padding-left: 30rpx;
  color: #6b7072;
  font-size: 15px;
}

.uni-form-item .wrapper {
  flex: 3.5;
  padding: 20rpx 0;
  padding-right: 50rpx;
  text-align: right;
}

.border-bottom {
  /* border-bottom: 2px solid #f6f6f6; */
  position: relative;
}

.border-bottom:after {
  content: "";
  background: #f6f6f6;
  position: absolute;
  bottom: 0;
  left: 30rpx;
  height: 3rpx;
  width: calc(100% - 60rpx);
}

.logout-btn {
  position: absolute;
  margin-top: 10px;
  width: 100%;
  bottom: 2%;
}

.primary-btn {
margin: 10px 4%;
background-color: #06f;
font-size: 34rpx !important;
letter-spacing: 4px;
height: 86rpx;
border-radius: 86rpx;
line-height: 86rpx;

}


.btn-image {
  width: 20px;
  height: 20px;
  margin-right: 20px;
  background-size: 100% 100%;
  transform: translateY(2px);
}
</style>
