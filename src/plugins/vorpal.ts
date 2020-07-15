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
  Version,
  Whoru,
  Ddr,
}                         from 'wechaty-vorpal-contrib'

import {
  CHATOPS_ROOM_ID,
  CONTRIBUTORS_ROOM_ID,
  DONUT_ROOM_ID,
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
    Whoru(),
    Version(),
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
    MathMaster(),
    Whoru(),
    Version(),
  ],
}

/*******************************************************
 *
 * Donut Room
 *
 */
const donutConfig: WechatyVorpalConfig = {
  contact: false,
  mention: true,
  room : DONUT_ROOM_ID,
  silent: true,
  use  : [
    Ddr(),
  ],
}

/*******************************************************
 *
 * Direct Message
 *
 */
const dmConfig: WechatyVorpalConfig = {
  contact: true,
  room : false,
  silent: true,
  use  : [
    MathMaster(),
    Whoru(),
    Version(),
  ],
}

const ChatopsVorpalPlugin       = WechatyVorpal(chatopsConfig)
const ContributorsVorpalPlugin  = WechatyVorpal(contributorsConfig)
const DonutVorpalPlugin         = WechatyVorpal(donutConfig)
const DirectMessageVorpalPlugin = WechatyVorpal(dmConfig)

export {
  ChatopsVorpalPlugin,
  ContributorsVorpalPlugin,
  DonutVorpalPlugin,
  DirectMessageVorpalPlugin,
}
