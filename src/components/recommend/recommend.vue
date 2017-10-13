<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          slider
        </div>
      </div>
    </scroll>
      
  </div>
</template>

<script>
  import { getRecommend } from 'api/recommend'
  import { ERR_OK } from 'api/config'

  export default {
    data() {
      return {
        recommends: []
      }
    },
    created() {
      this._getRecommend()
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

