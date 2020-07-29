<template>
  <view class="content">
    <view class="user-area">
      <view class="title-area">个人信息</view>
      <view class="user-image">
        <img :src="userImage" alt="用户头像" class="image" />
      </view>
      <view class="user-info">
        <ul>
          <li>
            <label for class="label-tag">警号：</label>
            <span>{{userData.police_id}}</span>
          </li>
          <li>
            <label for class="label-tag">姓名：</label>
            <span>{{userData.name}}</span>
          </li>
          <li>
            <label for class="label-tag">登录次数：</label>
            <span>{{userData.total_login_counts}}</span>
          </li>
          <li>
            <label for class="label-tag">最后登录时间：</label>
            <span>{{moment(userData.latest_login_time).format("YYYY-MM-DD hh:mm:ss")}}</span>
          </li>
        </ul>
      </view>
    </view>
    <view class="user-area user-area-we">
      <view class="title-area">关于我们</view>
      <view class="user-info">
        <ul>
          <li>
            <label for class="label-tag">版本号：</label>
            <span>V1.0</span>
          </li>
          <li>
            <label for class="label-tag">客服热线：</label>
            <span>0551-65278205</span>
          </li>
          <li>
            <label for class="label-tag">版本信息：</label>
            <span>***************</span>
          </li>
        </ul>
      </view>
    </view>
    <view class="btn-row logout-btn">
      <button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
      <button v-if="hasLogin" type="default" @tap="bindLogout" class="default">退出登录</button>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import moment from "moment";
import userImage from "../../static/img/userImage.png";
export default {
  data() {
    return {
      userData: JSON.parse(uni.getStorageSync("userData")),
      userImage: userImage,
      moment: moment,
    };
  },
  computed: {
    ...mapState(["hasLogin", "forcedLogin"]),
  },
  methods: {
    ...mapMutations(["logout"]),
    bindLogin() {
      uni.navigateTo({
        url: "../login/login",
      });
    },
    bindLogout() {
      //实际应该调后台登出接口 可惜后台服务没此接口
      this.logout();
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
.user-area {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
  background: #fff;
}

.user-image {
  width: 100%;
  text-align: center;
  padding-top: 10px;
}

.image {
  width: 48px;
  height: 48px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

ul {
  padding-top: 10px;
}

li {
  height: 24px;
  line-height: 24px;
}

.label-tag {
  display: inline-block;
  width: 130px;
  text-align: right;
}

.logout-btn {
  margin-top: 10px;
}

.title-area {
  margin: 0 20px;
  height: 24px;
  line-height: 24px;
  /* border-bottom: 1px solid #dfdfdf; */
  border-left: 4px solid #06f;
  padding-left: 6px;
}

.user-area-we {
  margin-top: 10px;
}
</style>
