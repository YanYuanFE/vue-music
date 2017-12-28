import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function search(query, page, zhida, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    remoteplace: 'txt.mqq.all',
    aggr: 0,
    sem: 1,
    ie: 'utf-8',
    flag: 1,
    t: 0,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    n: perpage,
    perpage,
    p: page,
    w: query
  })

  return jsonp(url, data, options)
}
