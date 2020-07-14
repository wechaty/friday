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
  MathMaster,
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
  contact: false,
  mention: false,
  room : CHATOPS_ROOM_ID,
  silent: true,
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
    MathMaster(),
  ],
}

/*******************************************************
 *
 * Contributors Room
 *
 */
const contributorsConfig: WechatyVorpalConfig = {
  contact: false,
  mention: true,
  room : CONTRIBUTORS_ROOM_ID,
  silent: true,
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
