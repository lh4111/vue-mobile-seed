<template lang="pug">
  .list-wrapper(ref='wrapper')
    .scroll-content
      div(ref='listWrapper')
        slot
          ul.list-content
            li.list-item(@click='clickItem($event,item)', v-for='item in data') {{item}}
      slot(name='pullup', :pullupload='pullUpLoad', :ispullupload='isPullUpLoad')
        .pullup-wrapper(v-if='pullUpLoad')
          .before-trigger(v-if='!isPullUpLoad')
            span {{pullUpTxt}}
          .after-trigger(v-else='')
            loading
    slot(name='pulldown', :pulldownrefresh='pullDownRefresh', :pulldownstyle='pullDownStyle', :beforepulldown='beforePullDown', :ispullingdown='isPullingDown', :bubbley='bubbleY')
      .pulldown-wrapper(ref='pulldown', :style='pullDownStyle', v-if='pullDownRefresh')
        .before-trigger(v-if='beforePullDown')
          bubble(:y='bubbleY')
        .after-trigger(v-else='')
          .loading(v-if='isPullingDown')
            loading
          div(v-else='')
            span {{refreshTxt}}
</template>

<script>
import BScroll from "better-scroll";
import Loading from "./loading/Loading.vue";
import Bubble from "./bubble/Bubble.vue";
const DIRECTION_H = "horizontal";
const DIRECTION_V = "vertical";

const getRect = el => {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }
};

export default {
  name: "scroll",
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },
    scrollbar: {
      type: null,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: false
    },
    pullUpLoad: {
      type: null,
      default: false
    },
    startY: {
      type: Number,
      default: 0
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    mouseWheel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      isPullUpLoad: false,
      pullUpDirty: true,
      pullDownStyle: "",
      bubbleY: 0
    };
  },
  computed: {
    pullUpTxt() {
      const moreTxt =
        (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more) ||
        "加载更多";
      const noMoreTxt =
        (this.pullUpLoad &&
          this.pullUpLoad.txt &&
          this.pullUpLoad.txt.noMore) ||
        "没有更多了";
      return this.pullUpDirty ? moreTxt : noMoreTxt;
    },
    refreshTxt() {
      return (this.pullDownRefresh && this.pullDownRefresh.txt) || "下拉刷新";
    }
  },
  created() {
    this.pullDownInitTop = -50;
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
        this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper)
          .height + 1}px`;
      }
      let options = {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.freeScroll || this.direction === DIRECTION_V,
        scrollX: this.freeScroll || this.direction === DIRECTION_H,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY,
        freeScroll: this.freeScroll,
        mouseWheel: this.mouseWheel
      };
      this.scroll = new BScroll(this.$refs.wrapper, options);
      if (this.listenScroll) {
        this.scroll.on("scroll", pos => {
          this.$emit("scroll", pos);
        });
      }
      if (this.listenBeforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScrollStart");
        });
      }
      if (this.pullDownRefresh) {
        this._initPullDownRefresh();
      }
      if (this.pullUpLoad) {
        this._initPullUpLoad();
      }
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    clickItem(e, item) {
      this.$emit("click", item);
    },
    destroy() {
      this.scroll.destroy();
    },
    forceUpdate(dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false;
        this._reboundPullDown().then(() => {
          this._afterPullDown();
        });
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false;
        this.scroll.finishPullUp();
        this.pullUpDirty = dirty;
        this.refresh();
      } else {
        this.refresh();
      }
    },
    _initPullDownRefresh() {
      this.scroll.on("pullingDown", () => {
        this.beforePullDown = false;
        this.isPullingDown = true;
        this.$emit("pullingDown");
      });
      this.scroll.on("scroll", pos => {
        if (this.beforePullDown) {
          this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
          this.pullDownStyle = `top:${Math.min(
            pos.y + this.pullDownInitTop,
            10
          )}px`;
        } else {
          this.bubbleY = 0;
        }
        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 -
            (this.pullDownRefresh.stop - pos.y)}px`;
        }
      });
    },
    _initPullUpLoad() {
      this.scroll.on("pullingUp", () => {
        this.isPullUpLoad = true;
        this.$emit("pullingUp");
      });
    },
    _reboundPullDown() {
      const { stopTime = 600 } = this.pullDownRefresh;
      return new Promise(resolve => {
        setTimeout(() => {
          this.isRebounding = true;
          this.scroll.finishPullDown();
          resolve();
        }, stopTime);
      });
    },
    _afterPullDown() {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`;
        this.beforePullDown = true;
        this.isRebounding = false;
        this.refresh();
      }, 0);
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.forceUpdate(true);
      }, this.refreshDelay);
    }
  },
  components: {
    Loading,
    Bubble
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.list-wrapper
  position relative
  height 100%
  overflow hidden
  background #fff

  .scroll-content
    position relative
    z-index 1

  .list-content
    position relative
    z-index 10
    background #fff

    .list-item
      height 60px
      line-height 60px
      font-size 18px
      padding-left 20px
      border-bottom 1px solid #e5e5e5

.pulldown-wrapper
  position absolute
  width 100%
  left 0
  display flex
  justify-content center
  align-items center
  transition all

  .after-trigger
    margin-top 10px

.pullup-wrapper
  width 100%
  display flex
  justify-content center
  align-items center
  padding 16px 0
</style>
