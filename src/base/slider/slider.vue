<template>
  <div class="slider">
    <div class="slier-group">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot">

      </span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'slider',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

