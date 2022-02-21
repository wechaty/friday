import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'

// import { Chitchat }     from '../../ml/chitchat.js'
// import { Gpt }          from '../../ml/gpt.js'
import { Dreamily }     from '../../../../ai-lib/dreamily.js'
import type { WeChatSettings } from '../../../../settings/mod.js'

const getAiVorpalPlugin = (_settings: WeChatSettings) => {
  const aiConfig: WechatyVorpalConfig = {
    contact : true,
    mention : true,
    room    : true,
    silent  : true,

    use : [
      // Chitchat(),
      // Gpt(),
      Dreamily(),
    ],
  }

  const AiVorpalPlugin = WechatyVorpal(aiConfig)
  return AiVorpalPlugin
}

export {
  getAiVorpalPlugin,
}
