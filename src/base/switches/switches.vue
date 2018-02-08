<template>
  <ul class="switches">
    <li class="switch-item"
        @click="switchItem(index)"
        v-for="(item, index) in switches" :class="{'active' : currentIndex === index}">
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'switches',
    props: {
      switches: {
        type: Array,
        default: []
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      switchItem(index) {
        this.$emit('switch', index)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~common/scss/variable";

  .switches {
    display: flex;
    align-items: center;
    width: 240px;
    margin: 0 auto;
    border: 1px solid $color-primary;
    border-radius: 5px;
    .switch-item {
      flex: 1;
      padding: 8px;
      text-align: center;
      font-size: $font-size-medium;
      color: $color-text-d;
      &.active {
        background: $color-primary;
        color: $color-background;
      }
    }
  }
</style>
