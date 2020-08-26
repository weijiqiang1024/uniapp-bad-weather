<template>
  <div class="meteo-detail">
    <img src="../../static/img/back.png" alt @click="backToPre" class="back-to-pre" />
    <view class="site-name">{{siteInfo.device_name || '--'}}</view>
    <view class="content-panel">
      <img :src="meteoImage" alt class="meteo-image" />
      <!-- <view class="meteo-image"></view> -->
      <view class="device-info">
        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">点位信息：</view>
          <view class="wrapper">{{siteInfo.device_name || '--'}}</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">能见度等级：</view>
          <view class="wrapper">五级</view>
        </view>
        <view class="uni-form-item uni-row border-bottom">
          <view class="title">雾灯状态：</view>
          <view class="wrapper">开</view>
        </view>
        <view class="uni-form-item uni-row">
          <view class="title">更新时间：</view>
          <view class="wrapper">{{moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}}</view>
        </view>
      </view>
    </view>
  </div>
</template>

<script type="text/ecmascript-6">
import config from "../../base/config";
import moment from "moment";
export default {
  name: "",
  onLoad: function (option) {
    //option为object类型，会序列化上个页面传递的参数
    // console.log(option); //打印出上个页面传递的参数。
    this.siteInfo = JSON.parse(option.siteInfo);
  },
  data() {
    return {
      siteInfo: this.siteInfo,
      meteoImage: config.backImageUrl + "user_title.png",
    };
  },
  methods: {
    moment,
    backToPre() {
      //返回上一级菜单
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>

<style scoped>
.meteo-detail {
  width: 100%;
  height: 100vh;
  /* padding: 20px; */
  /* text-align: center; */
  color: #fff;
  /* border-top-left-radius: 10px;
  border-bottom-left-radius: 10px; */
  /* 关键在这里，设置切线的角度和长度 */
  background: linear-gradient(-40deg, transparent 900rpx, rgb(0, 102, 255) 0),
    linear-gradient(140deg, transparent 1320rpx, rgb(0, 102, 255) 0);

  /* 设置之后需要把位置向相反的方向偏移，达到粘合 */
  /* margin-right: -50px; */
}

.back-to-pre {
  width: 20px;
  height: 20px;
  padding-left: 10px;
  position: relative;
  top: 30px;
}

.content-panel {
  display: flex;
  flex-direction: column;
  width: 90%;
  height: calc(100vh - 170px);
  background: #fff;
  position: relative;
  top: 170rpx;
  margin: 0 5%;
  border-radius: 10rpx;
  /* box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1); */
  box-shadow: 4px 10px 10px 10px rgba(0, 0, 0, 0.3);
  background: linear-gradient(-40deg, transparent 900rpx, rgb(0, 102, 255) 0),
    linear-gradient(140deg, transparent 1320rpx, rgb(0, 102, 255) 0);
}

.site-name {
  font-size: 14px;
  color: #ffffff;
  position: absolute;
  top: 136rpx;
  letter-spacing: 4rpx;
  left: 5%;
}

.meteo-image {
  width: 100%;
  flex: 1;
  border-top-left-radius: 10rpx;
  border-top-right-radius: 10rpx;
}

.device-info {
  flex: 1;
}

.uni-form-item {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 6px 0px;
  /* background: #fff; */
  align-items: center;
}

.area-top {
  padding-top: 60rpx;
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
  left: 40rpx;
  height: 3rpx;
  width: calc(100% - 80rpx);
}

.uni-form-item .title {
  flex: 1.5;
  /* padding: 20rpx 0; */
  padding-left: 30rpx;
  color: #6b7072;
  font-size: 30rpx;
  text-align: right;
}

.uni-form-item .wrapper {
  flex: 3;
  padding: 20rpx 0;
  /* padding-right: 50rpx; */
  text-align: left;
  font-size: 30rpx;
  color: #6b7072;
}
</style>
