<template>
  <div class="m-header">
    <div class="icon"></div>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .m-header {
    position: relative;
    height: 44px;
    text-align: center;
    color: $color-background;
    background-color: $color-primary;
    .icon {
      display: inline-block;
      vertical-align: top;
      margin-top: 6px;
      width: 90px;
      height: 25px;
      margin-right: 9px;
      @include bg-image('logo');
      background-size: cover;
      background-repeat: no-repeat;
      /*background-size: 30px 32px;*/
    }
    .text {
      display: inline-block;
      vertical-align: top;
      line-height: 44px;
      font-size: $font-size-large;
    }
    .mine {
      position: absolute;
      top: 0;
      right: 0;
      .icon-mine {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: $color-background;
      }
    }
  }
</style>

