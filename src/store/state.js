import { playMode } from 'common/js/config'
import { loadSearch, loadPlay, loadFavorite } from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false, // 是否全屏
  playlist: [], // 当前播放列表
  sequenceList: [], // 原始歌曲列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前播放索引
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
