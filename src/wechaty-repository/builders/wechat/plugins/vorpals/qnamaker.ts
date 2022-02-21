import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import type { WeChatSettings } from '../../../../settings/mod'
// import { Faq  }           from 'wechaty-qnamaker'

// import {
//   configChinese,
//   configEnglish,
// }                         from '../qnamaker.js'

const getFaqVorpalPlugin = (settings: WeChatSettings) => {
  const faqConfig: WechatyVorpalConfig = {
    contact : false,
    mention : false,
    room    : [
      settings.rooms.chatops.friday,
      ...settings.rooms.wechatyDevelopers.contributors, // CONTRIBUTORS_ROOM_ID,
    ],
    silent  : true,

    use: [
      // Faq([
      //   configChinese,
      //   configEnglish,
      // ]),
    ],
  }

  const FaqVorpalPlugin = WechatyVorpal(faqConfig)
  return FaqVorpalPlugin
}

export {
  getFaqVorpalPlugin,
}
