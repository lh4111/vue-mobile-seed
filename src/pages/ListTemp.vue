<template lang="pug">
  .page
    scroll.bg(class="wrapper", ref="scroll",  :data="data" :pullUpLoad="{}" :pullDownRefresh="{}" @pullingUp="pullingUp" @pullingDown="pullingDown")
      .content
        .pd-60.bdt(v-for="item in data", @click="clickItem(item)") {{item}}
</template>

<script>
export default {
  data() {
    return {
      pulldown: true,
      data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    }
  },
  methods: {
    clickItem(item){
      console.log(item);
    },
    pullingUp() {
      setTimeout(() => {
        if(Math.random() < 0.2) {
          this.data = this.data.concat(this.data)
        }else{
          this.$refs.scroll.forceUpdate()
        }
      }, 1500)
    },
    pullingDown() {
      setTimeout(() => {
        this.data = [0,1,2,3,4,5,6,7,8,9,10]
      }, 1500)
    },
  }
}
</script>
