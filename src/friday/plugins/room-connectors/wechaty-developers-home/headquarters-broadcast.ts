import { Message } from 'wechaty'
import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  // HEADQUARTERS_ROOM_ID,
  // DEVELOPERS_ROOM_ID_LIST,
  MIKE_CONTACT_ID,
  // DEVELOPERS_ROOM_ID_WXWORK,
}                             from '../../../../database'
import {
  polyglotWechatyUserGroup,
  wechatyDevelopers,
}                             from '../../../../database/mod'

import { unidirectionalMapper }           from '../unidirectional-mapper'

/**
 *
 * Broadcast text and url link
 *
 */
const BroadcastToHomePlugin = SourceToTargetRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  map: unidirectionalMapper,
  source: [
    ...wechatyDevelopers.headquarters, // HEADQUARTERS_ROOM_ID,
  ],
  target: [
    ...wechatyDevelopers.home,
    ...wechatyDevelopers.monitor,
  ],
})

/**
 *
 * Broadcast text and url link
 *
 */
const BroadcastToPolyglotPlugin = SourceToTargetRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  map: (msg) => msg.type() === Message.Type.Text ? unidirectionalMapper(msg) : [],
  source: [
    ...wechatyDevelopers.headquarters,
  ],
  target: [
    ...Object.values(polyglotWechatyUserGroup).flat(),
  ],
})

export {
  BroadcastToHomePlugin,
  BroadcastToPolyglotPlugin,
}
