<template>
  <view class="content-area">
    <view v-for="item in videoList" :key="item.id">
      <view class="video-card">
        <view class="video-image">
          <img src="../static/img/meteo.png" alt class="image-class" />
        </view>
        <view class="device-info">
          <view class="video-icon">
            <!-- <img src="../static/img/video.png" alt class="image-class" /> -->
            <view class="video-name">{{item.device_name}}</view>
          </view>
          <view class="other-info">
            <view class="other-item other-item-org">{{item.org_name}}</view>
            <view class="other-item other-item-road">{{item.road_name}}</view>
          </view>
        </view>
        <view class="device-status">
          <view
            class="device-status-real"
            :style="{color:deviceStatusColor(item.status)}"
          >{{deviceStatus(item.status)}}</view>
          <view class="device-info-detail" @click="goMeteoPreview(item)">
            <span class="view-detail">预览</span>
            <img src="../../static/img/go_detai.png" alt class="image-class image-detail" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  mounted() {
    this.getMeteoList();
  },
  data() {
    return {
      videoList: [],
      total: 0,
      searchVal: "",
    };
  },
  methods: {
    async getMeteoList() {
      let data = {
        pageIndex: 1,
        pageSize: 10,
      };

      try {
        let res = await this.$minApi.getMeteoList(data);
        if (res.ret == 1) {
          this.videoList = res.datas;
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
    deviceStatus(info) {
      let status = "未知";
      if (info) {
        status =
          info.online_status == 0
            ? "在线"
            : info.online_status == 1
            ? "离线"
            : "未知";
      }
      return status;
    },
    deviceStatusColor(info) {
      let color = "grey";
      if (info) {
        color =
          info.online_status == 0
            ? "green"
            : info.online_status == 1
            ? "red"
            : "grey";
      }
      return color;
    },
    goMeteoPreview(data){
      uni.navigateTo({
        url: "/pagesA/meteo/meteoDetail?siteInfo=" + JSON.stringify(data),
      });
    }
  },
};
</script>

<style>
.content-area {
  width: 100%;
}

.video-card {
  display: flex;
  flex-direction: row;
  width: 92%;
  /* padding: 10px; */
  margin: 0 auto;
  margin-top: 6px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 10px;
  /* box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.3); */
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.1);
}

.device-info {
  display: flex;
  flex-direction: column;
  flex: 3;
  padding: 10px;
}

.video-name {
  /* padding-bottom: 4px; */
  /* text-align: center; */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-weight: 700;
  padding-left: 6px;
  color: #333;
}

.video-icon {
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
}

.image-class {
  width: 32px;
  height: 32px;
}

.other-info {
  display: flex;
  flex-direction: column;
  padding: 4px;
  padding-left: 26px;
  flex-grow: 2;
}

.other-item-road {
  padding-left: 10px;
}

.other-item {
  font-size: 12px;
  color: #a8a7cc;
}

.device-status {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  padding: 10px;
  padding-top: 14px;
}

.device-info-detail {
  display: flex;
  align-items: flex-end;
}

.view-detail {
  font-size: 12px;
  color: #06f;
  padding-right: 2px;
}

.image-detail {
  width: 10px;
  height: 10px;
}

.video-image {
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  text-align: center;
  color: #fff;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  /* 关键在这里，设置切线的角度和长度 */
  background: linear-gradient(-120deg, transparent 50px, rgb(11, 215, 109) 0);
  /* 设置之后需要把位置向相反的方向偏移，达到粘合 */
  margin-right: -50px;
}
</style>
