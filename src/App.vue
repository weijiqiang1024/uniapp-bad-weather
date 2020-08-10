<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/* 头条小程序需要把 iconfont 样式放到组件外 */
@import "components/m-icon/m-icon.css";

/*每个页面公共css */
page {
  min-height: 100%;
  display: flex;
  font-size: 14px;
  color: #314659;

}

/* #ifdef MP-BAIDU */
page {
  width: 100%;
  height: 100%;
  display: block;
}

swan-template {
  width: 100%;
  min-height: 100%;
  display: flex;
}

/* 原生组件模式下需要注意组件外部样式 */
custom-component {
  width: 100%;
  min-height: 100%;
  display: flex;
}

/* #endif */

/* #ifdef MP-ALIPAY */
page {
  min-height: 100vh;
}

/* #endif */

/* 原生组件模式下需要注意组件外部样式 */
m-input {
  width: 100%;
  /* min-height: 100%; */
  display: flex;
  flex: 1;
}

.content {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #F0F1F6;
  /* padding: 10px; */
}

.input-group {
  /* background-color: #ffffff; */
  margin: 0 10%;
  margin-top: 40px;
  position: relative;
}

.input-group::before {
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}

.input-group::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}

.input-row {
  display: flex;
  flex-direction: row;
  position: relative;
  font-size: 14px;
  line-height: 36px;
  background: #F5F5F5;

}

.input-row .title {
  width: 100px;
  padding-left: 15px;
}

.input-row.border::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 8px;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #c8c7cc;
}

.btn-row {
  margin-top: 25px;
  padding: 10px;
}

button.primary {
  /* background-color: #0faeff; */
  background-color: #06f;
  font-size: 14px;
  letter-spacing: 4px;
}

button.default {
  color: #000;
  background-color: #f8f8f8;
  font-size: 14px;
}

.button-hover{
  background-color: #06f !important;
}
</style>
