import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  Ding,
  Eval,
  Cash,
}                         from 'wechaty-vorpal-contrib'

import { CHATOPS_ROOM_ID } from '../database'

const hackerNews = require('vorpal-hacker-news')

const extensionList = [
  /**
   * https://github.com/vorpaljs/vorpal-hacker-news
   *  hacker-news --length 3
   */
  hackerNews,
  Ding(),
  Eval(),
  Cash(),
]

const config: WechatyVorpalConfig = {
  room : CHATOPS_ROOM_ID,
  use  : extensionList,
}

export const VorpalPlugin = WechatyVorpal(config)
