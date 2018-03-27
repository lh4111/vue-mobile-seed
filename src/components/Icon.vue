
<template lang="pug">
  img.icon(:style="imgStyle",:src="icon")
</template>

<script>
/**
 * @name Icon
 *
 * @param String name
 * @param Number size
 * @param Boolean gray
 */
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 20
    },
    gray: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      icon: require('../assets/icons/' + this.name)
    }
  },
  computed: {
    imgStyle() {
      let style = {
        width: this.size / 100 + 'rem',
        height: this.size / 100 + 'rem'
      }
      this.gray && (style.filter = 'brightness(1.4) grayscale(1)')
      return style
    }
  },
  created() {},
  methods: {}
}
</script>
