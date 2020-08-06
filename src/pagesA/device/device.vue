<template>
  <view class="device-page" :style="{backgroundImage: `url(${swiperStyle[current][3]})`}">
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
                <view class="item-content">
                  <view v-if="siteInfo['devices'][0]['device_type'] == 3">
                    <frog-component :deviceInfo="siteInfo['devices'][0]"></frog-component>
                  </view>
                  <view v-else-if="siteInfo['devices'][0]['device_type'] == 6">
                    <meteo-component :deviceInfo="siteInfo['devices'][0]"></meteo-component>
                  </view>
                  <view v-else-if="siteInfo['devices'][0]['device_type'] == 7">
                    <video-component :deviceInfo="siteInfo['devices'][0]"></video-component>
                  </view>
                  <view v-else>无信息</view>
                </view>
              </view>
            </swiper-item>
            <swiper-item
              :class="['swiper-item-container', current == 1?'currentPanel':'otherPanel']"
              :style="{position: 'absolute',width: '100%',
height: '100%',transform: `translate(${swiperStyle[current][1]}%, 0px) translateZ(0px)`}"
            >
              <view class="swiper-item uni-bg-area B">
                <view class="item-content">
                  <view v-if="siteInfo['devices'][1]['device_type'] == 3">
                    <frog-component :deviceInfo="siteInfo['devices'][1]"></frog-component>
                  </view>
                  <view v-else-if="siteInfo['devices'][1]['device_type'] == 6">
                    <meteo-component :deviceInfo="siteInfo['devices'][1]"></meteo-component>
                  </view>
                  <view v-else-if="siteInfo['devices'][1]['device_type'] == 7">
                    <video-component :deviceInfo="siteInfo['devices'][1]"></video-component>
                  </view>
                  <view v-else>无信息</view>
                </view>
              </view>
            </swiper-item>
            <swiper-item
              :class="['swiper-item-container', current == 2?'currentPanel':'otherPanel']"
              :style="{position: 'absolute',width: '100%',
height: '100%',transform: `translate(${swiperStyle[current][2]}%, 0px) translateZ(0px)`}"
            >
              <view class="swiper-item uni-bg-area C">
                <view class="item-content">
                  <view v-if="siteInfo['devices'][2]['device_type'] == 3">
                    <frog-component :deviceInfo="siteInfo['devices'][2]"></frog-component>
                  </view>
                  <view v-else-if="siteInfo['devices'][2]['device_type'] == 6">
                    <meteo-component :deviceInfo="siteInfo['devices'][2]"></meteo-component>
                  </view>
                  <view v-else-if="siteInfo['devices'][2]['device_type'] == 7">
                    <video-component :deviceInfo="siteInfo['devices'][2]"></video-component>
                  </view>
                  <view v-else>无信息</view>
                </view>
              </view>
            </swiper-item>
          </swiper>
        </view>
      </view>
    </view>
  </view>
</template>

<script type="text/ecmascript-6">
import config from "../../base/config";
import meteoComponent from "./meteoComponent";
import frogComponent from "./frogComponent";
import videoComponent from "./videoComponent";

export default {
  components: {
    "meteo-component": meteoComponent,
    "frog-component": frogComponent,
    "video-component": videoComponent,
  },
  onLoad: function (option) {
    //option为object类型，会序列化上个页面传递的参数
    console.log(option); //打印出上个页面传递的参数。
    this.siteInfo = JSON.parse(option.siteInfo);
  },
  data() {
    return {
      frogBackImage: config.backImageUrl + "/frog_back.jpg",
      meteoBackImage: config.backImageUrl + "/meteo_back.jpg",
      videoBackImage: config.backImageUrl + "/video_back.jpg",
      siteInfo: this.siteInfo,
      deviceSelect: 3,
      current: 0,
      newCurrent: 0,
      swiperStyle: {
        //0:[a,b,c]表示对应状态下 panel对应的X偏移
        0: [0, 100, -100, this.meteoBackImage],
        1: [28, 100, 229, this.frogBackImage],
        2: [357, 156, 200, this.videoBackImage],
      },
      deviceTypeDic: {
        3: "防撞雾灯",
        6: "能见度仪",
        7: "视频",
      },
      dviceInfo: {},
    };
  },
  methods: {
    backToPre() {
      //返回上一级菜单
      uni.navigateBack({
        delta: 1,
      });
    },
    currentChange(e) {
      console.log(e, 88888);
      this.current = e.detail.current;
    },
    sortDevice() {},
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
  height: 100vh;
  background: #06f;
  /* padding: 10px; */
  /* padding-top: 30px; */
  background-size: 100% 100%;
}

.back-to-pre {
  width: 20px;
  height: 20px;
  padding-left: 10px;
  position: relative;
  top: 30px;
}

.device-content {
  padding: 10px 0;
}

.dvice-info {
  padding: 10px;
  color: #fff;
  padding-top: 20px;
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
  box-shadow: 4px 10px 10px 0px rgba(0, 40, 99, 0.3);
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.swiper-item-container {
  display: flex;
  justify-content: center;
}

.A {
  /* color: #fff; */
  background: #fff;
}

.B {
  /* color: #fff; */
  background: #fff;
}

.C {
  /* color: #fff; */
  background: #fff;
}

.currentPanel {
  scale: 1;
}

.otherPanel {
  scale: 0.78;
}
</style>
