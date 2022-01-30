import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import { fridaySetting } from '../../../../../setting/deprecated.js'

import { unidirectionalMapper } from '../unidirectional-mapper.js'

/**
 *
 * Announcement
 *
 */
const exceptBroadcastStation = (roomId: string) => !fridaySetting.wechat.wechatyDevelopers.broadcastStation.includes(roomId)

const allUserGroups = Object.values(fridaySetting.wechat.wechatyUserGroup).flat()
const allHomes      = Object.values(fridaySetting.wechat.wechatyDevelopers).flat()
  .filter(exceptBroadcastStation)

const HeadquartersBroadcastStationPlugin = SourceToTargetRoomConnector({
  map: unidirectionalMapper,
  source: [
    ...fridaySetting.wechat.wechatyDevelopers.broadcastStation,
  ],
  target: [
    ...allUserGroups,
    ...allHomes,
  ],
})

export {
  HeadquartersBroadcastStationPlugin,
}
