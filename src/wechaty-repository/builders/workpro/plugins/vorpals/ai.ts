import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'

// import { Chitchat }     from '../../ml/chitchat.js'
// import { Gpt }          from '../../ml/gpt.js'
import { Dreamily }     from '../../../../../applications/ai-lib/dreamily.js'
import type { WorkProSettings } from '../../../../../wechaty-settings/mod.js'

const getAiVorpalPlugin = (_settings: WorkProSettings) => {
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
