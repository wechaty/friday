import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import { botSettings } from '../../../../../bot-settings/deprecated.js'

import { bidirectionalMapper }           from '../bidirectional-mapper.js'

/**
 *
 * OneToMany
 *
 */
const SourceToTargetPlugin = SourceToTargetRoomConnector({
  map: bidirectionalMapper,
  source: [
    ...Object.values(botSettings.weChat.rooms.wechatyUserGroup).flat(),
  ],
  target: [
    ...botSettings.weChat.rooms.wechatyDevelopers.homeHq,
    ...botSettings.weChat.rooms.wechatyDevelopers.home,
  ],
})

export {
  SourceToTargetPlugin,
}
