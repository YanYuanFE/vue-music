<template>
  <scroll ref="suggest"
           class="suggest"
           :data="result"
           :pullup="pullup"
           :beforeScroll="beforeScroll"
           @beforeScroll="listScroll"
           @scrollToEnd="searchMore"
  >
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
  import { search } from 'api/search'
  import { ERR_OK } from 'api/config'
  import { createSong } from 'common/js/song'
  import Singer from 'common/js/singer'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import NoResult from 'base/no-result/no-result'
  import { mapMutations, mapActions } from 'vuex'

  const TYPE_SINGER = 'singer'
  const perpage = 20
  export default {
    name: 'suggest',
    props: {
      showSinger: {
        type: Boolean,
        default: true
      },
      query: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        page: 1,
        hasMore: true,
        result: [],
        pullup: true,
        beforeScroll: true
      }
    },
    methods: {
      search() {
        this.page = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this._genResult(res.data)
            this._checkMore(res.data)
          }
        })
      },
      searchMore() {
        if (!this.hasMore) {
          return
        }
        this.page++
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._genResult(res.data))
            this._checkMore(res.data)
          }
        })
      },
      _genResult(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      getIconCls(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      selectItem(item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/search/${singer.id}`
          })
          this.setSinger(singer)
        } else {
          console.log(item)
          this.insertSong(item)
        }
        this.$emit('select')
      },
      refresh() {
        this.$refs.suggest.refresh()
      },
      listScroll() {
        this.$emit('listScroll')
      },
      _checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
          this.hasMore = false
        }
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
      query() {
        this.search()
      }
    },
    components: {
      Singer,
      Scroll,
      Loading,
      NoResult
    }
  }
</script>

<style scoped lang="scss">
  @import "~common/scss/variable";
  @import "~common/scss/mixin";

  .suggest {
    height: 100%;
    overflow: hidden;
    .suggest-list {
      padding: 0 30px;
      .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
      }
      .icon {
        flex: 0 0 30px;
        width: 30px;
        [class^="icon-"] {
          font-size: 14px;
          color: $color-text-l;
        }
      }
      .name {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-l;
        overflow: hidden;
        .text {
          @include no-wrap;
        }
      }
    }
    .no-result-wrapper {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
