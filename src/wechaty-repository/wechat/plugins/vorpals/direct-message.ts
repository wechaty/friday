import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  MathMaster,
  Version,
  Whoru,
}                         from 'wechaty-vorpal-contrib'

import hackerNews from 'vorpal-hacker-news'
import type { WeChatSettings } from '../../../../wechaty-settings/mod'

const dmConfig: WechatyVorpalConfig = {
  contact : true,
  room    : false,
  silent  : true,

  use: [
    MathMaster(),
    Whoru(),
    Version(),
    /**
     * https://github.com/vorpaljs/vorpal-hacker-news
     *  hacker-news --length 3
     */
    hackerNews,
  ],
}

const getDirectMessageVorpalPlugin = (_settings: WeChatSettings) => {
  const DirectMessageVorpalPlugin = WechatyVorpal(dmConfig)
  return DirectMessageVorpalPlugin
}

export {
  getDirectMessageVorpalPlugin,
}
