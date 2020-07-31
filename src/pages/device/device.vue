<template>
  <view class="device-page" :style="{background: `${swiperStyle[current][3]}`}">
    <img src="../../static/img/back.png" alt @click="backToPre" class="back-to-pre" />
    <view class="device-content">
      <view class="dvice-info">
        <view
          class="device-type-name"
        >{{deviceTypeDic[siteInfo['devices'][current]['device_type']]}}</view>
        <view class="device-dvice-name">{{siteInfo['devices'][current]['device_name']}}</view>
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
            :current="current"
            v-model="current"
            @change="currentChange"
          >
            <swiper-item
              :class="['swiper-item-container', current == 0?'currentPanel':'otherPanel']"
              :style="{position: 'absolute',width: '100%',
height: '100%',transform: `translate(${swiperStyle[current][0]}%, 0px) translateZ(0px)`}"
            >
              <view class="swiper-item uni-bg-area A">
                <view
                  class="item-content"
                >{{deviceTypeDic[siteInfo['devices'][current]['device_type']]}}</view>
              </view>
            </swiper-item>
            <swiper-item
              :class="['swiper-item-container', current == 1?'currentPanel':'otherPanel']"
              :style="{position: 'absolute',width: '100%',
height: '100%',transform: `translate(${swiperStyle[current][1]}%, 0px) translateZ(0px)`}"
            >
              <view class="swiper-item uni-bg-area B">
                <view
                  class="item-content"
                >{{deviceTypeDic[siteInfo['devices'][current]['device_type']]}}</view>
              </view>
            </swiper-item>
            <swiper-item
              :class="['swiper-item-container', current == 2?'currentPanel':'otherPanel']"
              :style="{position: 'absolute',width: '100%',
height: '100%',transform: `translate(${swiperStyle[current][2]}%, 0px) translateZ(0px)`}"
            >
              <view class="swiper-item uni-bg-area C">
                <view
                  class="item-content"
                >{{deviceTypeDic[siteInfo['devices'][current]['device_type']]}}</view>
              </view>
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
      current: 0,
      newCurrent: 0,
      swiperStyle: {
        //0:[a,b,c]表示对应状态下 panel对应的X偏移
        0: [0, 100, -100, "#74c69d"],
        1: [28, 100, 229, "#48bfe3"],
        2: [357, 156, 200, "#adb5bd"],
      },
      deviceTypeDic: {
        3: "防撞雾灯",
        6: "能见度仪",
        7: "视频",
      },
    };
  },
  methods: {
    backToPre() {
      uni.navigateBack({
        delta: 1,
      });
    },
    currentChange(e) {
      console.log(e, 88888);
      this.current = e.detail.current;
    },
  },
  watch: {
    current: function (oldVal, newVal) {
      debugger;
      console.log(oldVal, newVal, 9999);
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
  font-size: 13px;
  padding: 2px 10px;
  color: #f0f0f0;
  /* font-weight: 700; */
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
  padding-top: 10px;
}

.swiper-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 85%;
  border-radius: 10px;
  /* box-shadow: 0 0px 1px 1px rgba(255, 255, 255, 0.1); */
}

.item-content {
  padding: 10px;
}

.swiper-item-container {
  display: flex;
  justify-content: center;
}

.A {
  color: #fff;
  background: #52b788;
}

.B {
  color: #fff;
  background: #4ea8de;
}

.C {
  color: #fff;
  background: #6c757d;
}

.currentPanel {
  scale: 1;
}

.otherPanel {
  scale: 0.78;
}
</style>
