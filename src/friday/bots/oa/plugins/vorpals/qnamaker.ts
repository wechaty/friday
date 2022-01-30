import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                        from 'wechaty-vorpal'
import { Faq  }           from 'wechaty-qnamaker'

import { configCeibs } from '../qnamaker.js'

const faqConfig: WechatyVorpalConfig = {
  contact : true,
  mention : true,
  room    : true,
  silent  : true,

  use: [
    Faq(configCeibs),
  ],
}

const FaqVorpalPlugin = WechatyVorpal(faqConfig)

export {
  FaqVorpalPlugin,
}
