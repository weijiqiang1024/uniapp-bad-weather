<template>
  <view class="meteo-area">
    <view class="meteo-content">
      <img src="../../static/img/visible_logo.png" alt class="meteo-logo" />
      <view class="meteo-number">
        <span class="text-style">能见度值：</span>
        <span class="text-style italic-value">{{meteoValue}} 米</span>
      </view>
      <view class="meteo-uptime">
        <span class="text-style">更新时间：</span>
        <span class="text-style">{{uptime}}</span>
      </view>
    </view>
  </view>
</template>

<script type="text/ecmascript-6">
import moment from "moment";
export default {
  props: {
    deviceInfo: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  name: "",
  mounted() {
    this.getMeteoInfo();
  },
  data() {
    return {
      meteoValue: 0,
      upTime: "",
    };
  },
  methods: {
    async getMeteoInfo() {
      let param = {
        eqId: this.deviceInfo.eqId,
        upTimeStart: new Date(moment(new Date()).format("YYYY-MM-DD 00:00:00")),
        upTimeEnd: new Date(),
        pageIndex: 1,
        pageSize: 10,
      };

      try {
        let res = await this.$minApi.queryMeteoInfo(param);
        if (res && res.ret == 1 && res.count > 0) {
          this.meteoValue = res.datas[0]["visibility"] || 0;
          this.upTime = res.datas[0]["upTime"]
            ? moment(res.datas[0]["upTime"]).format("YYYY-MM-DD hh:mm:ss")
            : "--";
        }
      } catch (error) {}
    },
  },
};
</script>

<style>
.meteo-content {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.meteo-logo {
  width: 100px;
  height: 100px;
  padding-bottom: 10px;
}

.meteo-number,
.meteo-uptime {
  padding-bottom: 10px;
}

.text-style {
  color: #426fce;
  font-weight: 700;
}

.italic-value {
  font-style: italic;
}
</style>
