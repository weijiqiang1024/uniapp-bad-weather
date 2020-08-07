<template>
  <view class="content-area">
    <view v-for="item in videoList" :key="item.id">
      <view class="video-card">
        <view class="video-icon">
          <img src="../../static/img/site.png" alt class="image-class" />
          <view class="video-name">{{item.device_name}}</view>
        </view>
        <view class="other-info">
          <view class="other-item">{{item.org_name}}</view>
          <view class="other-item">{{item.road_name}}</view>
        </view>
        <view class="device-status">
          <view class="device-status-real">{{item.org_name}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  mounted() {
    this.getVideoList();
  },
  data() {
    return {
      videoList: [],
      total: 0,
      searchVal: "",
    };
  },
  methods: {
    async getVideoList() {
      let data = {
        pageIndex: 1,
        pageSize: 10,
      };

      try {
        let res = await this.$minApi.getVideoList(data);
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
  },
};
</script>

<style>
.content-area {
  width: 100%;
}

.video-card {
  display: flex;
  flex-direction: column;
  width: 86%;
  padding: 10px;
  margin: 0 auto;
  margin-top: 6px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 10px;
  box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.3);
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
  width: 20px;
  height: 20px;
}

.other-info {
  display: flex;
  flex-direction: column;
  padding-left: 26px;
  flex-grow: 2;
}

.other-item {
  font-size: 12px;
  color: #a8a7cc;
}
</style>
