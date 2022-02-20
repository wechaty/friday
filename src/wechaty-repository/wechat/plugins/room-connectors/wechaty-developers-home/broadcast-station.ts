import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import { botSettings } from '../../../../../wechaty-settings/deprecated.js'

import { unidirectionalMapper } from '../unidirectional-mapper.js'

/**
 *
 * Announcement
 *
 */
const exceptBroadcastStation = (roomId: string) => !botSettings.weChat.rooms.wechatyDevelopers.broadcastStation.includes(roomId)

const allUserGroups = Object.values(botSettings.weChat.rooms.wechatyUserGroup).flat()
const allHomes      = Object.values(botSettings.weChat.rooms.wechatyDevelopers).flat()
  .filter(exceptBroadcastStation)

const HeadquartersBroadcastStationPlugin = SourceToTargetRoomConnector({
  map: unidirectionalMapper,
  source: [
    ...botSettings.weChat.rooms.wechatyDevelopers.broadcastStation,
  ],
  target: [
    ...allUserGroups,
    ...allHomes,
  ],
})

export {
  HeadquartersBroadcastStationPlugin,
}
