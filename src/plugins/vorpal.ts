import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  Ding,
  Eval,
  Cash,
  UrlLink,
  Announce,
  Find,
}                         from 'wechaty-vorpal-contrib'

import {
  CHATOPS_ROOM_ID,
  CONTRIBUTORS_ROOM_ID,
}                         from '../database'

const hackerNews = require('vorpal-hacker-news')

/*******************************************************
 *
 * ChatOps Room
 *
 */
const chatopsConfig: WechatyVorpalConfig = {
  at: false,
  contact: false,
  room : CHATOPS_ROOM_ID,
  use  : [
    /**
     * https://github.com/vorpaljs/vorpal-hacker-news
     *  hacker-news --length 3
     */
    hackerNews,
    Ding(),
    Eval(),
    Cash(),
    UrlLink(),
    Announce(),
    Find(),
  ],
}

/*******************************************************
 *
 * Contributors Room
 *
 */
const contributorsConfig: WechatyVorpalConfig = {
  at: true,
  contact: false,
  room : CONTRIBUTORS_ROOM_ID,
  use  : [
    UrlLink(),
    Find(),
  ],
}

const ChatopsVorpalPlugin      = WechatyVorpal(chatopsConfig)
const ContributorsVorpalPlugin = WechatyVorpal(contributorsConfig)

export {
  ChatopsVorpalPlugin,
  ContributorsVorpalPlugin,
}
