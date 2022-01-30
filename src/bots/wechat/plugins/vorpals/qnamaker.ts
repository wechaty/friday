import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import { Faq  }           from 'wechaty-qnamaker'

import {
  configChinese,
  configEnglish,
}                         from '../qnamaker.js'

import { fridaySetting } from '../../../../setting/deprecated.js'

const faqConfig: WechatyVorpalConfig = {
  contact : false,
  mention : false,
  room    : [
    fridaySetting.wechat.chatops.bot5,
    ...fridaySetting.wechat.wechatyDevelopers.contributors, // CONTRIBUTORS_ROOM_ID,
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
