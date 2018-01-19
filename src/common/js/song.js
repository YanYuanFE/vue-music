import { getLyric, getSongVkey } from 'api/song'
import { ERR_OK } from '../../api/config'
import { Base64 } from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
          console.log(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }

  getSongUrl(song) {
    if (this.url) {
      return Promise.resolve(this.url)
    }

    return new Promise((resolve, reject) => {
      getSongVkey(this.mid).then((res) => {
        if (res.code === ERR_OK) {
          const item = res.data.items[0]
          this.url = `http://dl.stream.qqmusic.qq.com/${item.filename}?vkey=${item.vkey}&guid=3655047200&fromtag=66`
          resolve(this.url)
          console.log(this.url)
        } else {
          reject(new Error('no song source'))
        }
      })
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
