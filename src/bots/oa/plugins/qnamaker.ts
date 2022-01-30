/* eslint-disable sort-keys */
import {
  WechatyQnAMaker,
  WechatyQnAMakerConfig,
}                           from 'wechaty-qnamaker'

const skipMessage = [
  /^wechaty$/i,
]

const scoreThreshold = 10

const configCeibs: WechatyQnAMakerConfig = {
  language: ['chinese'],

  skipMessage,
  contact: true,
  scoreThreshold,

  endpointKey     : process.env['WECHATY_PLUGIN_QNAMAKER_ENDPOINT_KEY_CEIBS'],
  knowledgeBaseId : process.env['WECHATY_PLUGIN_QNAMAKER_KNOWLEDGE_BASE_ID_CEIBS'],
  resourceName    : process.env['WECHATY_PLUGIN_QNAMAKER_RESOURCE_NAME_CEIBS'],
}

const QnAMakerCeibsPlugin = WechatyQnAMaker(configCeibs)

export {
  QnAMakerCeibsPlugin,
  configCeibs,
}
