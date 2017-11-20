import { playMode } from 'common/js/config.js'

const state = {
  singer: {},
  playing: false,
  fullScreen: false, // 是否全屏
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前播放索引
  disc: {},
  topList: {}
}

export default state