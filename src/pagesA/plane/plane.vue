<template>
  <view class="content">
    <!-- <view class="search-area">
      <input
        type="text"
        class="seacrh-input"
        confirm-type="search"
        placeholder-style="color:#cccccc"
        placeholder="请输入点位名称"
        v-model="searchVal"
      />
      <uni-icons
        :color="'#999999'"
        class="icon-search"
        type="search"
        size="18"
        @click="handleSearch"
      />
      <uni-icons
        :color="'#999999'"
        v-if="searchVal!==''"
        class="icon-clear"
        type="clear"
        size="18"
        @click="clear"
      />
    </view>-->
    <view class="content-area">
      <view v-for="(item) in systemArray" :key="item.id">
        <view class="site-card">
          <view class="site-icon">
            <img src="../../static/img/site.png" alt class="image-class" />
            <view class="site-name">{{item.sysName}}</view>
          </view>
          <view class="site-content">
            <view class="site-device">
              <view
                v-for="(obj) in item.devices"
                :key="obj.id"
                class="device-name"
              >{{obj.device_name}}</view>
            </view>
            <view class="site-detail" @click="goSiteDetail(item)">
              <span class="view-detail">详情</span>
              <img
                src="../../static/img/go_detai.png"
                alt
                class="image-class image-detail"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
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
        }else{
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
    goSiteDetail(data) {
      // console.log(data, 9999);
      uni.navigateTo({
        url: "/pagesA/device/device?siteInfo=" + JSON.stringify(data),
      });
    },
    clear() {
      this.searchVal = "";
    },
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

.search-area {
  display: flex;
  justify-content: center;
  width: 100%;
}

.seacrh-input {
  width: 80%;
  padding: 0 10px;
  height: 24px;
  line-height: 24px;
  border: 1px solid #c8c7cc;
  border-radius: 24px;
}

.content-area {
  width: 100%;
  /* padding: 5%; */
}

.site-card {
  display: flex;
  flex-direction: column;
  width: 86%;
  padding: 10px;
  margin: 0 auto;
  margin-top: 6px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 10px;
  /* box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.3); */
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.1);
}

.site-name {
  /* padding-bottom: 4px; */
  /* text-align: center; */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-weight: 700;
  padding-left: 6px;
  color: #333;
}

.site-content {
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: flex-end;
}

.site-icon {
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
}

.site-detail {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: row;
  flex-grow: 1;
}

.site-device {
  display: flex;
  flex-direction: column;
  padding-left: 26px;
  flex-grow: 2;
}

.device-name {
  font-size: 12px;
  color: #a8a7cc;
}

.image-class {
  width: 20px;
  height: 20px;
}

.image-detail {
  width: 10px;
  height: 10px;
}

.view-detail {
  font-size: 12px;
  color: #06f;
  padding-right: 2px;
}
</style>
