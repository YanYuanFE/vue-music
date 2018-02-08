<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" :placeholder="placeholder" type="text" class="box" />
    <i class="icon-dismiss" @click="clear" v-show="query"></i>
  </div>
</template>

<script>
  import { debounce } from 'common/js/util'

  export default {
    name: 'search-box',
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      }
    },
    created() {
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 200))
    }
  }
</script>

<style scoped lang="scss">
  @import "~common/scss/variable";

  .search-box {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    height: 40px;
    background: $color-background;
    border-radius: 6px;
    .icon-search {
      font-size: 24px;
      color: $color-text-l;
    }
    .box {
      flex: 1;
      margin: 0 5px;
      line-height: 18px;
      background: $color-background;
      color: $color-text-l;
      font-size: $font-size-medium;
      &::placeholder {
        color: $color-text-l;
      }
    }
    .icon-dismiss {
      font-size: 16px;
      color: $color-text-l;
    }
  }

</style>
