<template>
  <view class="content">
    <view class="query-area">
      <form @submit="formSubmit" @reset="formReset">
        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">设备名称</view>
          <view class="wrapper select-wrapper">
            <picker
              @change="deviceNameChange"
              :value="paramData.deviceNbr"
              :range="dviceList"
              :range-key="device_nbr"
            >
              <view class="uni-input">{{dviceList[paramData.deviceNbr]['device_name']}}</view>
            </picker>
            <img src="../../static/img/expand.png" alt class="input-icon" />
          </view>
        </view>
        <view class="uni-form-item uni-row">
          <view class="title">时间</view>
          <view class="wrapper select-wrapper">
            <picker mode="date" @change="cityStartTimeChange" name="startTime">
              <view class="uni-input">{{moment(paramData.startTime).format('YYYY-MM-DD')}}</view>
            </picker>
            <img src="../../static/img/expand.png" alt class="input-icon" />
          </view>
        </view>
        <view class="query-row">
          <button type="primary" :class="['primary','primary-btn']" @tap="bindLogin">搜 索</button>
        </view>
      </form>
    </view>
  </view>
</template>

<script type="text/ecmascript-6">
import moment from "moment";
export default {
  name: "",
  data() {
    return {
      paramData: {
        startTime: moment(new Date()).format("YYYY-MM-DD"),
        endTime: moment(new Date()).format("YYYY-MM-DD"),
        deviceNbr: 0, //货物类别
        dviceList:[]
      }, //表单数据
    };
  },
  mounted(){
    this.getMeteoList();
  },
  methods: {
    moment,
    async getMeteoList(){
      try {
        let res = await this.$minApi.getMeteoList();
        if (res.ret == 1) {
          let temp = {
            device_nbr:'default',
            device_name:''
          }
          res.datas.unshift(temp);
          this.dviceList = res.datas;
          this.total = res.count;
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
    }
  },
};
</script>

<style scoped>
.uni-form-item {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 6px 0px;
  background: #fff;
  align-items: center;
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

.select-wrapper {
  position: relative;
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
}

.input-icon {
  position: absolute;
  width: 10px;
  height: 14px;
  right: 10px;
  top: 14px;
}

.primary-btn{
  margin: 10px 4%;
  background-color: #ccc;
  font-size: 34rpx !important;
  letter-spacing: 4px;
  height: 86rpx;
  border-radius: 86rpx;
  line-height: 86rpx;
}

.primary-btn-disable {
  background-color: #ccc;
}

.primary-btn-enable {
  background-color: #06f;
}

.query-row{
  padding: 20rpx;
}
</style>
