<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    created() {
      console.log(this.singer)
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
    }

  }
</script>

<style lang="scss" scoped>
  @import "~common/scss/variable";

  .singer-detail {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $color-background;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }

  .slider-enter, .slider-leave-to {
    transform: translate3d(100%, 0, 0);
  }

</style>
