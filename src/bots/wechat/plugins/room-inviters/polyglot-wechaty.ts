import {
  RoomInviter,
}                       from 'wechaty-plugin-contrib'

import { fridaySetting } from '../../../../settings/deprecated.js'

import {
  repeat,
}                                       from './config.js'

// const wechatyNonTsConfig: RoomInviterConfig = {
//   password : [
//     /^\s*(python|go|java|scala|php|dotnet|rust)\s*(wechaty)*\s*$/i,
//   ],
//   repeat,
//   room    : MULTI_LANG_ROOM_ID,
//   rule    : WECHATY_DEVELOPERS_ROOM_RULES,
//   welcome : WECHATY_DEVELOPERS_ROOM_WELCOME,
// }

/**
 * https://stackoverflow.com/a/1026087/1123955
 */
function capitalizeFirstLetter (str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const rule = (language: string) => [
  `Thanks for asking me to invite you for joining the "${capitalizeFirstLetter(language)} Wechaty User Group"!`,
  'Wechaty is a Conversational SDK for chatbot makers.',
  `You can find our documentation at https://wechaty.js.org/docs/polyglot/${language.toLowerCase()}, and all archived discussions on https://gitter.im/wechaty/wechaty`,
  'Please introduce yourself after you join the room, cheers!',
].join('\n')

const welcome = (language: string) => [
  `, welcome to join the "${capitalizeFirstLetter(language)} Wechaty User Group"!`,
  `You can find ${capitalizeFirstLetter(language)} Wechaty docs at https://wechaty.js.org/docs/polyglot/${language.toLowerCase()} ,`,
  `read blog post at https://wechaty.js.org/tags.html#${language.toLowerCase()} .`,
  'Please go ahead to introduce yourself to the group.',
].join('\n')

const config = (language: keyof typeof fridaySetting.wechat.wechatyUserGroup) => ({
  password : [
    new RegExp(`^\\s*${language.toLowerCase()}\\s*(wechaty)*\\s*$`, 'i'),
    // /^\s*python\s*(wechaty)*\s*$/i,
  ],
  repeat,
  room    : fridaySetting.wechat.wechatyUserGroup[language],
  rule    : rule(language),
  welcome : welcome(language),
})

const InviterPluginList = []

for (const language of (
  Object.keys(fridaySetting.wechat.wechatyUserGroup) as (keyof typeof fridaySetting.wechat.wechatyUserGroup)[]
)) {
  const configObj = config(language)
  /**
   * Alias JavaScript -> TypeScript
   */
  if (language === 'typescript') {
    configObj.password.push(
      /^\s*javascript\s*(wechaty)*\s*$/i,
    )
  }
  /**
   * Alias gRPC -> Puppet
   */
  if (language === 'grpc') {
    configObj.password.push(
      /^\s*puppet\s*(wechaty)*\s*$/i,
    )
  }

  const InviterPlugin = RoomInviter(configObj)
  InviterPluginList.push(InviterPlugin)
}

export {
  InviterPluginList,
}
