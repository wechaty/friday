import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import { Faq  }           from 'wechaty-qnamaker'

import {
  configChinese,
  configEnglish,
}                         from '../plugins/qnamaker'
import {
  FRIDAY_ROOM_ID,
  // CONTRIBUTORS_ROOM_ID,
}                         from '../../database'
import {
  wechatyDevelopers,
}                         from '../../database/mod'

const faqConfig: WechatyVorpalConfig = {
  contact : false,
  mention : false,
  room    : [
    FRIDAY_ROOM_ID,
    ...wechatyDevelopers.contributors, // CONTRIBUTORS_ROOM_ID,
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
