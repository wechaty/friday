import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  polyglotWechatyUserGroup,
  wechatyDevelopers,
}                               from '../../../../database/mod.js'

import { unidirectionalMapper } from '../unidirectional-mapper.js'

/**
 *
 * Announcement
 *
 */
const exceptBroadcastStation = (roomId: string) => !wechatyDevelopers.broadcastStation.includes(roomId)

const allUserGroups = Object.values(polyglotWechatyUserGroup).flat()
const allHomes      = Object.values(wechatyDevelopers).flat()
  .filter(exceptBroadcastStation)

const HeadquartersBroadcastStationPlugin = SourceToTargetRoomConnector({
  map: unidirectionalMapper,
  source: [
    ...wechatyDevelopers.broadcastStation,
  ],
  target: [
    ...allUserGroups,
    ...allHomes,
  ],
})

export {
  HeadquartersBroadcastStationPlugin,
}
