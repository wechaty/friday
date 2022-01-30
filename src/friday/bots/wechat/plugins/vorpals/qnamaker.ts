import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import { Faq  }           from 'wechaty-qnamaker'

import {
  configChinese,
  configEnglish,
}                         from '../qnamaker.js'

import { fridayConfig } from '../../deprecated.js'

const faqConfig: WechatyVorpalConfig = {
  contact : false,
  mention : false,
  room    : [
    fridayConfig.wechat.chatops.bot5,
    ...fridayConfig.wechat.wechatyDevelopers.contributors, // CONTRIBUTORS_ROOM_ID,
  ],
  silent  : true,

  use: [
    Faq([
      configChinese,
      configEnglish,
    ]),
  ],
}

const FaqVorpalPlugin = WechatyVorpal(faqConfig)

export {
  FaqVorpalPlugin,
}
