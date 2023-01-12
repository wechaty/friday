import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                        from 'wechaty-vorpal'
import type { WorkProSettings } from '../../../../../wechaty-settings/mod.js'
// import { Faq  }           from 'wechaty-qnamaker'

// import {
//   configChinese,
//   configEnglish,
// }                         from '../../../wechat/plugins/qnamaker.js'

const getFaqVorpalPlugin = (_settings: WorkProSettings) => {
  const faqConfig: WechatyVorpalConfig = {
    contact : true,
    mention : true,
    room    : true,
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
