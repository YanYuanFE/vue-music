import jsonp from 'common/js/jsonp'
import { commonParams } from './config'
import axios from 'axios'

export function getLyric (mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    g_tk: 5381,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongVkey(mid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    uin: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    cid: 205361747,
    g_tk: 5381,
    filename: `C400${mid}.m4a`,
    guid: +new Date()
  })

  const options = {
    param: 'callback'
  }

  return jsonp(url, data, options)
}
