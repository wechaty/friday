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
const exceptBroadcastingStation = (roomId: string) => !wechatyDevelopers.broadcast.includes(roomId)

const allUserGroups = Object.values(polyglotWechatyUserGroup).flat()
const allHomes      = Object.values(wechatyDevelopers).flat()
  .filter(exceptBroadcastingStation)

const HeadquartersBroadcastingPlugin = SourceToTargetRoomConnector({
  map: unidirectionalMapper,
  source: [
    ...wechatyDevelopers.broadcast,
  ],
  target: [
    ...allUserGroups,
    ...allHomes,
  ],
})

export {
  HeadquartersBroadcastingPlugin,
}
