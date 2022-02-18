import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import { Faq  }           from 'wechaty-qnamaker'

import {
  configChinese,
  configEnglish,
}                         from '../qnamaker.js'

import { botSettings } from '../../../../bot-settings/deprecated.js'

const faqConfig: WechatyVorpalConfig = {
  contact : false,
  mention : false,
  room    : [
    botSettings.weChat.rooms.chatops.friday,
    ...botSettings.weChat.rooms.wechatyDevelopers.contributors, // CONTRIBUTORS_ROOM_ID,
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
