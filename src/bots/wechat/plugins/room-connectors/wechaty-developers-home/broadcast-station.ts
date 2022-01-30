import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import { fridayConfig } from '../../../../../config/deprecated.js'

import { unidirectionalMapper } from '../unidirectional-mapper.js'

/**
 *
 * Announcement
 *
 */
const exceptBroadcastStation = (roomId: string) => !fridayConfig.wechat.wechatyDevelopers.broadcastStation.includes(roomId)

const allUserGroups = Object.values(fridayConfig.wechat.wechatyUserGroup).flat()
const allHomes      = Object.values(fridayConfig.wechat.wechatyDevelopers).flat()
  .filter(exceptBroadcastStation)

const HeadquartersBroadcastStationPlugin = SourceToTargetRoomConnector({
  map: unidirectionalMapper,
  source: [
    ...fridayConfig.wechat.wechatyDevelopers.broadcastStation,
  ],
  target: [
    ...allUserGroups,
    ...allHomes,
  ],
})

export {
  HeadquartersBroadcastStationPlugin,
}
