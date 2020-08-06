<template>
  <view class="content">
    <view
      class="sys-title-area"
      :style="{backgroundImage:`url(${systemMainImage});height:${titleImageHeight}px`}"
    >
      <!-- <span class="sys-name">高速公路</span>
      <span class="sys-name">恶劣天气预警防控系统</span>-->
    </view>
    <view class="content-area">
      <view class="baner-item banner-top">
        <view class="baner-item">
          <img
            src="../../static/img/video_main.png"
            alt="视频"
            :style="{width:`${innerBannerWidth}px`,height:`${bannerItemHeight}px`,marginRight:'10px'}"
            class="video-main img-tag"
            @click="gotoPage('video')"
          />
        </view>
        <view class="baner-item">
          <img
            src="../../static/img/frog_main.png"
            alt="雾灯"
            :style="{width:`${innerBannerWidth}px`,height:`${bannerItemHeight}px`}"
            class="frog-main img-tag"
            @click="gotoPage('frog')"
          />
        </view>
      </view>
      <view class="baner-item">
        <img
          src="../../static/img/meteo_main.png"
          alt="能见度仪"
          :style="{width:`${bannerItemWidth}px`,height:`${bannerItemHeight}px`}"
          class="meteo-main img-tag"
          @click="gotoPage('meto')"
        />
      </view>
      <view class="baner-item">
        <img
          src="../../static/img/plane_main.png"
          alt="方案下发"
          :style="{width:`${bannerItemWidth}px`,height:`${bannerItemHeight}px`}"
          class="plane-main img-tag"
          @click="gotoPage('plane')"
        />
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import config from "../../base/config";
// import { uniIcons } from "@dcloudio/uni-ui";
export default {
  //   components: {
  //     uniIcons,
  //   },
  data() {
    return {
      systemArray: [],
      total: 0,
      searchVal: "",
      windowWidth: 0,
      titleImageHeight: 0,
      innerBannerWidth: 0, //内部banner宽度
      innerBannerHeight: 0, //内部banner高度
      bannerItemWidth: 0,
      bannerItemHeight: 0,
      systemMainImage: config.backImageUrl + "/main_title_image.png",
    };
  },
  computed: mapState({
    forcedLogin: "user/forcedLogin",
    hasLogin: "user/hasLogin",
    userName: "user/userName",
  }),
  onLoad() {
    let uniIdToken = uni.getStorageSync("uniIdToken");
    this.login(uni.getStorageSync("username"));
    if (uniIdToken) {
    } else {
      this.guideToLogin();
    }
  },
  mounted() {
    debugger;
    //默认数据查询
    this.handleSearch();
  },
  methods: {
    ...mapMutations({ login: "user/login" }),
    initPosition() {
      /**
       * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
       * 反向使用 top 进行定位，可以避免此问题。
       */
      this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
      const { windowWidth, windowHeight } = uni.getSystemInfoSync();
      this.windowWidth = windowWidth;
      this.titleImageHeight = parseInt(windowWidth / 1.68);
      this.bannerItemWidth = windowWidth - 20;
      this.bannerItemHeight = parseInt(this.bannerItemWidth / 3.06);
      this.innerBannerWidth = parseInt((this.bannerItemWidth - 10) / 2);
      this.innerBannerHeight = parseInt(this.innerBannerWidth / 1.48);
    },
    guideToLogin() {
      uni.showModal({
        title: "未登录",
        content: "您未登录，需要登录后才能继续",
        /**
         * 如果需要强制登录，不显示取消按钮
         */
        showCancel: !this.forcedLogin,
        success: (res) => {
          if (res.confirm) {
            /**
             * 如果需要强制登录，使用reLaunch方式
             */
            if (this.forcedLogin) {
              uni.reLaunch({
                url: "../login/login",
              });
            } else {
              uni.navigateTo({
                url: "../login/login",
              });
            }
          }
        },
      });
    },
    async handleSearch() {
      let queryDate = {
        pageIndex: 1,
        pageSize: 10,
      };
      try {
        let res = await this.$minApi.querySystem(queryDate);
        if (res.ret == 1) {
          this.systemArray = res.datas;
          this.total = res.count;
        }
      } catch (error) {}
    },
    gotoPage(page) {
      console.log(page, 9999);
      uni.navigateTo({
        url: `/pagesA/${page}/${page}`,
      });
    },

    clear() {
      this.searchVal = "";
    },
  },
  onReady() {
    this.initPosition();
  },
};
</script>

<style>
.hello {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.title {
  color: #8f8f94;
  margin-top: 25px;
}

.ul {
  font-size: 15px;
  color: #8f8f94;
  margin-top: 25px;
}

.ul > view {
  line-height: 25px;
}

.sys-title-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-size: 100% 100%;
}
.sys-name {
  display: inline-block;
  padding-bottom: 4px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 4px;
  text-shadow: rgb(64, 64, 64) 0px 2px 6px;
}

.content-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* width: 100%; */
  padding: 1%;
}

.baner-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* width: 100%; */
  padding-top: 8px;
}

.banner-top {
  padding-top: 0px;
}

.baner-item img {
  position: relative;
}

.img-tag:after {
  content: "❯";
  color: #fff;
  font-size: 20px;
  position: absolute;
  /* font-weight: 700; */
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}
</style>
