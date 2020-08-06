<template>
  <view class="frog-area">
    <view class="frog-content">
      <view class="frog-online">
        <viwe class="label">设备状态：</viwe>
        <viwe class="text-content">在线</viwe>
      </view>
      <view class="frog-status">
        <viwe class="label">工作状态：</viwe>
        <viwe class="text-content">
          <switch :checked="state" @change="switchChange" color="#06f" class="switch-style" />
        </viwe>
        <button type="primary" size="mini" class="primary pub-btn" @click="publish('state')">发布</button>
      </view>
      <view class="frog-model">
        <viwe class="label">运行模式：</viwe>
        <viwe class="text-content">
          <view class="uni-list">
            <view class="uni-list-cell">
              <view class="uni-list-cell-db">
                <picker @change="bindPickerChange" :value="runModle" :range="array">
                  <view class="uni-input">{{array[runModle]}}</view>
                </picker>
              </view>
            </view>
          </view>
        </viwe>
        <button type="primary" size="mini" class="primary pub-btn" @click="publish('runmode')">发布</button>
      </view>
    </view>
  </view>
</template>

<script type="text/ecmascript-6">
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
      debugger;
    this.getFrogInfo();
  },
  data() {
    return {
      state: false, //雾灯开关
      runModle: 0,
      array: ["请选择","道路轮廓强化模式", "行车诱导模式", "行车警示模式", "雾霾模式", "事故提醒模式"],
      //   runMode: 0,
    };
  },
  methods: {
    switchChange(e) {
      console.log(e.target.value, 99999);
      this.state = e.target.value == 1 ? true : false;
    },
    bindPickerChange(e) {
      this.runModle = e.target.value;
    },
    async getFrogInfo() {
      if (!(this.deviceInfo && this.deviceInfo.device_nbr)) {
        uni.showToast({
          icon: "none",
          title: "无设备ip信息",
        });
      }
      let url = `/foglight/${this.deviceInfo.device_nbr}/status`;
      try {
        let res = await this.$minApi.queryFrogInfo(url);
        if (res) {
          this.state = res.state == 1 ? true : false;
          this.runModle = res.runMode;
        }
      } catch (error) {}
    },
    async publish(type){
        let url = `/foglight/${this.deviceInfo.device_nbr}/${type}/${type=='state'?(this.state == true?1:2):this.runModle}`;
        try {
        let res = await this.$minApi.publishFrogInfo(url);
        if (res && res.success == true) {
          uni.showToast({
          icon: "none",
          title: "发布成功",
        });
        }
      } catch (error) {
          uni.showToast({
          icon: "none",
          title: "发布失败",
        });
      }
    }
  },
};
</script>

<style>
.frog-content {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.frog-online,
.frog-status,
.frog-model {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #e7e7e7;
}

.text-content {
  width: 100px;
}

.pub-btn {
  width: 40px;
  height: 24px;
  font-size: 12px !important;
  letter-spacing: 0px !important;
  padding: 0px !important;
}

.switch-style {
  transform: scale(0.7);
}

.label {
  font-weight: 700;
}
</style>
