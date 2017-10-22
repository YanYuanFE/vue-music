<template>
  <transition name="slide">
    13123
  </transition>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }

  .slider-enter, .slider-leave-to {
    transform: translate3d(100%, 0, 0);
  }

</style>
