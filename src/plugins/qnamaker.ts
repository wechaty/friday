/* eslint-disable sort-keys */
import {
  WechatyQnAMaker,
  WechatyQnAMakerConfig,
}                           from 'wechaty-plugin-qnamaker'

const config: WechatyQnAMakerConfig = {
  contact: true,
  room: true,

  endpointKey     : process.env.WECHATY_PLUGIN_QNAMAKER_ENDPOINT_KEY,
  knowledgeBaseId : process.env.WECHATY_PLUGIN_QNAMAKER_KNOWLEDGE_BASE_ID,
  resourceName    : process.env.WECHATY_PLUGIN_QNAMAKER_RESOURCE_NAME,
}

export const QnAMakerPlugin = WechatyQnAMaker(config)
