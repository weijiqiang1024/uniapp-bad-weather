<template>
  <view class="frog-area">
    <view class="frog-content">
      <view class="frog-online">
        <viwe class="label">设备状态：</viwe>
        <viwe class="content">在线</viwe>
      </view>
      <view class="frog-status">
        <viwe class="label">工作状态：</viwe>
        <viwe class="content">
          <switch checked @change="switchChange" color="#06f" size="mini" />
        </viwe>
        <button type="primary" size="mini" class="primary pub-btn">发布</button>
      </view>
      <view class="frog-model">
        <viwe class="label">运行模式：</viwe>
        <viwe class="content">
          <view class="uni-list">
            <view class="uni-list-cell">
              <view class="uni-list-cell-db">
                <picker @change="bindPickerChange" :value="index" :range="array">
                  <view class="uni-input">{{array[index]}}</view>
                </picker>
              </view>
            </view>
          </view>
        </viwe>
        <button type="primary" size="mini" class="primary pub-btn">发布</button>
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
  data() {
    return {
      array: ["中国", "美国", "巴西", "日本"],
      index: 0,
    };
  },
  methods: {
    switchChange() {},
    bindPickerChange() {},
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
  padding-bottom: 10px;
}

.content {
  width: 100px;
}

.pub-btn {
  width: 30px;
  height: 24px;
}
</style>
