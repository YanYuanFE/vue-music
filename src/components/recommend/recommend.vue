<template>
  <div class="recommend" ref="recommend">
      <div class="recommend-content">
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="" class="needsclick">
              </a>
            </div>
          </slider>
        </div>
      </div>
      
  </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import { getRecommend } from 'api/recommend'
  import { ERR_OK } from 'api/config'

  export default {
    components: {
      Slider,
      Scroll
    },
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
  @import "~common/scss/variable";

  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .recommend-content {
      height: 100%;
      overflow: hidden;
      .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
      }
    }
  }

</style>

