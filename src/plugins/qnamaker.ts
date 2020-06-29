/* eslint-disable sort-keys */
import {
  WechatyQnAMaker,
  WechatyQnAMakerConfig,
}                           from 'wechaty-plugin-qnamaker'

const skipMessage = [
  /^wechaty$/i,
]

const configEnglish: WechatyQnAMakerConfig = {
  language: ['english'],

  skipMessage,
  contact: true,
  room: true,
  at: true,

  endpointKey     : process.env.WECHATY_PLUGIN_QNAMAKER_ENDPOINT_KEY,
  knowledgeBaseId : process.env.WECHATY_PLUGIN_QNAMAKER_KNOWLEDGE_BASE_ID,
  resourceName    : process.env.WECHATY_PLUGIN_QNAMAKER_RESOURCE_NAME,
}

const configChinese: WechatyQnAMakerConfig = {
  language: ['chinese'],

  skipMessage,
  contact: true,
  room: true,
  at: true,

  endpointKey     : process.env.WECHATY_PLUGIN_QNAMAKER_ENDPOINT_KEY_CHINESE,
  knowledgeBaseId : process.env.WECHATY_PLUGIN_QNAMAKER_KNOWLEDGE_BASE_ID_CHINESE,
  resourceName    : process.env.WECHATY_PLUGIN_QNAMAKER_RESOURCE_NAME_CHINESE,
}

const QnAMakerEnglishPlugin = WechatyQnAMaker(configEnglish)
const QnAMakerChinesePlugin = WechatyQnAMaker(configChinese)

export {
  QnAMakerChinesePlugin,
  QnAMakerEnglishPlugin,
}
