/* eslint-disable sort-keys */
import {
  WechatyQnAMaker,
  WechatyQnAMakerConfig,
}                           from 'wechaty-qnamaker'

// import {
//   DEVELOPERS_ROOM_ID_LIST,
//   MULTI_LANG_ROOM_ID,
// }                                   from '../../database'

import {
  polyglotWechatyUserGroup,
  wechatyDevelopers,
}                             from '../../database/mod'

const skipMessage = [
  /^wechaty$/i,
]

const room = [
  ...wechatyDevelopers.home,            // DEVELOPERS_ROOM_ID_LIST,
  ...Object.values(polyglotWechatyUserGroup).flat(), // MULTI_LANG_ROOM_ID,
]

const scoreThreshold = 30

const options = {
  contact: true,
  mention: true,
  room,
  scoreThreshold,
  skipMessage,
}
export const configEnglish: WechatyQnAMakerConfig = {
  ...options,
  language        : ['english'],
  endpointKey     : process.env.WECHATY_PLUGIN_QNAMAKER_ENDPOINT_KEY,
  knowledgeBaseId : process.env.WECHATY_PLUGIN_QNAMAKER_KNOWLEDGE_BASE_ID,
  resourceName    : process.env.WECHATY_PLUGIN_QNAMAKER_RESOURCE_NAME,
}

export const configChinese: WechatyQnAMakerConfig = {
  ...options,
  language        : ['chinese'],
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
