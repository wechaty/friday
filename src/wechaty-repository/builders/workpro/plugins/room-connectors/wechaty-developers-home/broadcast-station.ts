import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import type { WorkProSettings } from '../../../../../../wechaty-settings/mod.js'

import { getUnidirectionalMapper } from '../unidirectional-mapper.js'

/**
 *
 * Announcement
 *
 */
const getHeadquartersBroadcastStationPlugin = (settings: WorkProSettings) => {
  const exceptBroadcastStation = (roomId: string) => !settings.rooms.wechatyDevelopers.broadcastStation.includes(roomId)

  const allUserGroups = [
    ...Object.values(settings.rooms.polyglotUserGroup).flat(),
    ...Object.values(settings.rooms.puppetUserGroup).flat(),
  ]
  const allHomes = Object.values(settings.rooms.wechatyDevelopers).flat()
    .filter(exceptBroadcastStation)

  const HeadquartersBroadcastStationPlugin = SourceToTargetRoomConnector({
    map: getUnidirectionalMapper(settings),
    source: [
      ...settings.rooms.wechatyDevelopers.broadcastStation,
    ],
    target: [
      ...allUserGroups,
      ...allHomes,
    ],
  })
  return HeadquartersBroadcastStationPlugin
}

export {
  getHeadquartersBroadcastStationPlugin,
}
