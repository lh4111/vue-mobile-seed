<style lang="stylus">
.page.contact-us
  .cell
    .icon
      width 60px
      margin-right 30px

    .content
      flex-grow 1
      color #333
      font-size 30px

    .right
      justify-self flex-end
      font-size 26px
      color #999
      user-select auto

  .ercode
    display flex
    justify-content center

    img
      width 360px
      height 360px
      user-select auto

  .tips
    color #999
</style>

<template lang="pug">
  .page.contact-us
    .cell.flex.pdv-20.pdh-30.bdb
      icon(name="qq.png", :size="60")
      .content 官方QQ
      .right 3517463744
    .cell.flex.pdv-20.pdh-30.bdb
      icon(name="qqq.png", :size="60")
      .content 官方QQ交流群01
      .right 581282309
    .cell.flex.pdv-20.pdh-30.bdb
      icon(name="telegram.png", :size="60")
      .content 加入电报群
      .right biniuniu
    .cell.flex.pdv-20.pdh-30
      icon(name="weixin.png", :size="60")
      .content 官方客服微信号
      .right bitcoin2010
    .ercode
      img(src="~../assets/images/ercode.png")
    .tips.center 加客服微信进入官方微信群
</template>

<script>
import icon from "../components/Icon";
export default {
  components: { icon },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
