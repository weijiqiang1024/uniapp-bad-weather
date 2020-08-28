<template>
  <view class="content">
    <view class="query-area">
      <form @submit="formSubmit" @reset="formReset">
        <view class="uni-form-item uni-row area-top border-bottom">
          <view class="title">设备名称</view>
          <view class="wrapper select-wrapper">
            <picker
              @change="deviceNameChange"
              :value="deviceIndex"
              :range="deviceList"
              range-key="device_name"
            >
              <view class="uni-input">{{ deviceList[deviceIndex].device_name }}</view>
            </picker>
            <img src="../../static/img/expand.png" alt class="input-icon" />
          </view>
        </view>
        <view class="uni-form-item uni-row">
          <view class="title">时间范围</view>
          <view class="wrapper select-wrapper select-time-font">
            <!-- <picker mode="date" @change="cityStartTimeChange" name="startTime">
              <view class="uni-input">{{moment(paramData.startTime).format('YYYY-MM-DD')}}</view>
            </picker>-->
            {{rangetime[0]}} - {{rangetime[1]}}
            <mx-date-picker
              :show="showPicker"
              :type="type"
              :value="value"
              :show-tips="true"
              :begin-text="'开始'"
              :end-text="'结束'"
              :show-seconds="true"
              @confirm="onSelected"
              @cancel="onSelected"
            />

            <img
              src="../../static/img/expand.png"
              alt
              class="input-icon"
              @click="onShowDatePicker('rangetime')"
            />
          </view>
        </view>
        <view class="query-row">
          <view
            :class="['primary-btn',buttonStatus=='disabled'?'primary-btn-disable':'primary-btn-enable']"
            @click="getMeteoData"
          >搜 索</view>
        </view>
      </form>
    </view>
  </view>
</template>

<script type="text/ecmascript-6">
import moment from "moment";
import MxDatePicker from "../../components/mx-datepicker/mx-datepicker.vue"; //https://github.com/nulllfeng/uniapp_date_and_time_selector
export default {
  name: "",
  components: {
    MxDatePicker,
  },
  data() {
    return {
      deviceIndex: 0, //气象设备
      deviceList: [],
      showPicker: false,
      rangetime: ["2020/08/01 14:00", "2020/08/02 13:59"],
      type: "rangetime",
      value: "",
      buttonStatus: "disabled",
    };
  },
  mounted() {
    this.getMeteoList();
  },
  methods: {
    moment,
    async getMeteoList() {
      try {
        let res = await this.$minApi.getMeteoList();
        if (res.ret == 1) {
          let temp = {
            device_nbr: "default",
            device_name: "请选择",
          };
          res.datas.unshift(temp);
          this.deviceList = res.datas;
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
    },
    deviceNameChange(e) {
      this.deviceIndex = e.detail.value;
    },
    onShowDatePicker(type) {
      //显示
      this.type = type;
      this.showPicker = true;
      this.value = this[type];
    },
    onSelected(e) {
      //选择
      this.showPicker = false;
      if (e) {
        let temp = (e.value + "").split(",");
        temp = temp.map((t) => t.substring(0, 16));
        this[this.type] = temp;
        this.buttonStatus = "enable";
        // //选择的值
        // console.log("value => " + e.value);
        // //原始的Date对象
        // console.log("date => " + e.date);
      }
    },
    getMeteoData() {
      if (this.buttonStatus == "disabled") return;
      let eqId, upTimeStart, upTimeEnd;
      if (this.deviceIndex != 0) {
        eqId = this.deviceList[this.deviceIndex].device_nbr;
      }
      if (this.rangetime) {
        upTimeStart = new Date(this.rangetime[0]).getTime();
        upTimeEnd = new Date(this.rangetime[1]).getTime();
      }
      let params = {
        eqId,
        upTimeStart,
        upTimeEnd,
        pageIndex: 1,
        pageSize: 50,
      };

      uni.navigateTo({
        url: "/pages/meteo/meteoData?meteoInfo=" + JSON.stringify(params),
      });
    },
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

.primary-btn {
  margin: 10px 4%;
  background-color: #ccc;
  font-size: 34rpx !important;
  letter-spacing: 4px;
  height: 80rpx;
  border-radius: 80rpx;
  line-height: 80rpx;
  cursor: pointer;
  border: 1px solid #ccc;
  text-align: center;
  color: #fff;
}

.primary-btn-disable {
  background-color: #ccc;
  border: 1px solid #ccc;
}

.primary-btn-enable {
  background-color: #06f;
  border: 1px solid #06f;
}

.query-row {
  padding: 20rpx;
}

.select-time-font {
  font-size: 26rpx;
}
</style>
