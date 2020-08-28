<template>
  <view class="content">
    <view v-for="m in infoList" :key="m.id" class="meteo-card">
      <view class="device-name-line">
        <view class="device-name">{{m.eqName}}</view>
        <view class="visible">{{m.visibility+'/米'}}</view>
      </view>
      <view class="update-time-line">
        <view class="update-time">{{moment(m.upTime).format('YYYY-MM-DD HH:mm:ss')}}</view>
        <view class="level">{{m.visibilityLevel}}</view>
      </view>
    </view>
  </view>
</template>

<script type="text/ecmascript-6">
import moment from "moment";
export default {
  name: "",
  onLoad: function (option) {
    //option为object类型，会序列化上个页面传递的参数
    console.log(option); //打印出上个页面传递的参数。
    this.meteoInfo = JSON.parse(option.meteoInfo);
  },
  data() {
    return {
      meteoInfo: this.meteoInfo,
      infoList: [],
    };
  },
  mounted() {
    this.getMeteoData();
  },
  methods: {
    moment,
    async getMeteoData() {
      try {
        let res = await this.$minApi.getMeteoData(this.meteoInfo);
        if (res.ret == 1) {
          // this.deviceList = res.datas;
          // this.total = res.count;
          this.infoList = res.datas;
        } else {
          uni.showToast({
            icon: "none",
            title: res.msg,
          });
        }
      } catch (error) {
        uni.showToast({
          icon: "none",
          title: "查询失败",
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.meteo-card {
  display: flex;
  flex-direction: column;
  padding: 15rpx 40rpx;
  background: #fff;
  margin-top: 10rpx;
}

.device-name-line,
.update-time-line {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.update-time-line {
  margin-top: 20rpx;
  font-size: 12px;
  justify-content: flex-start;
}

.update-time {
  padding: 2rpx 14rpx;
  color: #fff;
  background: #ccc;
  border-radius: 30rpx;
}

.level {
  margin-left: 30rpx;
  padding: 2rpx 30rpx;
  color: #fff;
  background: #ccc;
  border-radius: 30rpx;
}
</style>
