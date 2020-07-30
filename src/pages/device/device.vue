<template>
  <view class="device-page">
    <img src="../../static/img/back.png" alt @click="backToPre" class="back-to-pre" />
    <view class="device-content">
      <view class="dvice-info">
        <view class="device-type-name">雾灯</view>
        <view class="device-dvice-name">{{siteInfo['devices'][0]['device_name']}}</view>
        <view class="device-site-name">{{siteInfo['sysName']}}</view>
      </view>
      <view class="info-detail">
        <view class="device-list">
          <swiper
            class="swiper"
            :indicator-dots="indicatorDots"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration"
            circular="{true}"
            previous-margin="4px"
            next-margin="4px"
          >
            <swiper-item class="swiper-item">
              <view class="swiper-item uni-bg-area">A</view>
            </swiper-item>
            <swiper-item class="swiper-item">
              <view class="swiper-item uni-bg-area">B</view>
            </swiper-item>
            <swiper-item class="swiper-item">
              <view class="swiper-item uni-bg-area">C</view>
            </swiper-item>
          </swiper>
        </view>
      </view>
    </view>
  </view>
</template>

<script type="text/ecmascript-6">
export default {
  onLoad: function (option) {
    //option为object类型，会序列化上个页面传递的参数
    console.log(option); //打印出上个页面传递的参数。
    this.siteInfo = JSON.parse(option.siteInfo);
  },
  data() {
    return {
      siteInfo: this.siteInfo,
      deviceSelect: 3,
    };
  },
  methods: {
    backToPre() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>

<style>
.device-page {
  width: 100%;
  background: #06f;
  /* padding: 10px; */
  padding-top: 30px;
}

.back-to-pre {
  width: 20px;
  height: 20px;
  padding-left: 10px;
}

.device-content {
  padding: 10px 0;
}

.dvice-info {
  padding: 10px;
  color: #fff;
}

.device-dvice-name,
.device-site-name {
  font-size: 12px;
  padding: 2px 10px;
  color: #ccc;
}

.device-type-name {
  padding: 10px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 2px;
}

.info-detail {
  width: 100%;
  height: calc(100vh - 170px);
}

.device-list {
  height: calc(100vh - 200px);
}

.uni-bg-area {
  height: calc(100vh - 260px);
  background: #fff;
}

.swiper {
  height: calc(100vh - 210px);
}

.swiper-item {
  margin: 10px;
  width: 90%;
  border-radius: 10px;
  /* box-shadow: 0 0px 1px 1px rgba(255, 255, 255, 0.1); */
}
</style>
