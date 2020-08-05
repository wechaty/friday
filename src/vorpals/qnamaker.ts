import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                        from 'wechaty-vorpal'
import { Faq  }           from 'wechaty-qnamaker'

import {
  configChinese,
  configEnglish,
}                         from '../plugins/qnamaker'

const faqConfig: WechatyVorpalConfig = {
  contact : true,
  mention : true,
  room    : true,
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
