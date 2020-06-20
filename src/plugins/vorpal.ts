import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import { CHATOPS_ROOM_ID } from '../id-config'

const hackerNews = require('vorpal-hacker-news')

const extensionList = [
  /**
   * https://github.com/vorpaljs/vorpal-hacker-news
   *  hacker-news --length 3
   */
  hackerNews,
]
const config: WechatyVorpalConfig = {
  room: CHATOPS_ROOM_ID,
  use: extensionList,
}

export const VorpalPlugin = WechatyVorpal(config)
