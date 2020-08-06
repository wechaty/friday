/* eslint-disable sort-keys */
import {
  WechatyQnAMaker,
  WechatyQnAMakerConfig,
}                           from 'wechaty-qnamaker'

import {
  // DEVELOPERS_ROOM_ID_LIST,
  HEADQUARTERS_ROOM_ID,
  MULTI_LANG_ROOM_ID,
}                                   from '../../database'

const skipMessage = [
  /^wechaty$/i,
]

const room = [
  // ...DEVELOPERS_ROOM_ID_LIST,
  MULTI_LANG_ROOM_ID,
  HEADQUARTERS_ROOM_ID,
]

const scoreThreshold = 30

export const configEnglish: WechatyQnAMakerConfig = {
  language: ['english'],

  skipMessage,
  room,
  mention: false,
  contact: true,
  scoreThreshold,

  endpointKey     : process.env.WECHATY_PLUGIN_QNAMAKER_ENDPOINT_KEY,
  knowledgeBaseId : process.env.WECHATY_PLUGIN_QNAMAKER_KNOWLEDGE_BASE_ID,
  resourceName    : process.env.WECHATY_PLUGIN_QNAMAKER_RESOURCE_NAME,
}

export const configChinese: WechatyQnAMakerConfig = {
  language: ['chinese'],

  skipMessage,
  room,
  mention: false,
  contact: true,
  scoreThreshold,

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
