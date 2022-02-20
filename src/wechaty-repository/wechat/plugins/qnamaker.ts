/* eslint-disable sort-keys */
import {
  WechatyQnAMaker,
  WechatyQnAMakerConfig,
}                           from 'wechaty-qnamaker'

import { botSettings } from '../../../wechaty-settings/deprecated.js'

const skipMessage = [
  /^wechaty$/i,
]

const room = [
  ...botSettings.weChat.rooms.wechatyDevelopers.home,            // DEVELOPERS_ROOM_ID_LIST,
  ...Object.values(botSettings.weChat.rooms.wechatyUserGroup).flat(), // MULTI_LANG_ROOM_ID,
]

const scoreThreshold = 30

const options = {
  contact: true,
  mention: true,
  room,
  scoreThreshold,
  skipMessage,
}

/**
 * Huan(202201): TODO: use `FridayConfig` for the environment variables
 */
export const configEnglish: WechatyQnAMakerConfig = {
  ...options,
  language        : ['english'],
  endpointKey     : process.env['WECHATY_PLUGIN_QNAMAKER_ENDPOINT_KEY'],
  knowledgeBaseId : process.env['WECHATY_PLUGIN_QNAMAKER_KNOWLEDGE_BASE_ID'],
  resourceName    : process.env['WECHATY_PLUGIN_QNAMAKER_RESOURCE_NAME'],
}

export const configChinese: WechatyQnAMakerConfig = {
  ...options,
  language        : ['chinese'],
  endpointKey     : process.env['WECHATY_PLUGIN_QNAMAKER_ENDPOINT_KEY_CHINESE'],
  knowledgeBaseId : process.env['WECHATY_PLUGIN_QNAMAKER_KNOWLEDGE_BASE_ID_CHINESE'],
  resourceName    : process.env['WECHATY_PLUGIN_QNAMAKER_RESOURCE_NAME_CHINESE'],
}

const QnAMakerEnglishPlugin = WechatyQnAMaker(configEnglish)
const QnAMakerChinesePlugin = WechatyQnAMaker(configChinese)

export {
  QnAMakerChinesePlugin,
  QnAMakerEnglishPlugin,
}
