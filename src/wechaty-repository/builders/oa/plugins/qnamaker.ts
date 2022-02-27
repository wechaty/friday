// /* eslint-disable sort-keys */
// import {
//   WechatyQnAMaker,
//   WechatyQnAMakerConfig,
// }                           from 'wechaty-qnamaker'
// import { getEnvVar } from '../../../wechaty-settings/deprecated.js'

// const skipMessage = [
//   /^wechaty$/i,
// ]

// const scoreThreshold = 10

// const configCeibs: WechatyQnAMakerConfig = {
//   language: ['chinese'],

//   skipMessage,
//   contact: true,
//   scoreThreshold,

//   endpointKey     : getEnvVar().get('WECHATY_PLUGIN_QNAMAKER_ENDPOINT_KEY_CEIBS').asString(),
//   knowledgeBaseId : getEnvVar().get('WECHATY_PLUGIN_QNAMAKER_KNOWLEDGE_BASE_ID_CEIBS').asString(),
//   resourceName    : getEnvVar().get('WECHATY_PLUGIN_QNAMAKER_RESOURCE_NAME_CEIBS').asString(),
// }

// const QnAMakerCeibsPlugin = WechatyQnAMaker(configCeibs)

// export {
//   QnAMakerCeibsPlugin,
//   // configCeibs,
// }
export {}
