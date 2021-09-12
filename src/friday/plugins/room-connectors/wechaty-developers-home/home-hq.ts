import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  MIKE_CONTACT_ID,
}                             from '../../../../database.js'
import {
  wechatyDevelopers,
}                             from '../../../../database/mod.js'

import { unidirectionalMapper }           from '../unidirectional-mapper.js'

/**
 *
 * Collecting all messages from developers' home X
 *
 */
const HomeHqCollectingPlugin = SourceToTargetRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  map: unidirectionalMapper,
  source: [
    ...wechatyDevelopers.home,
  ],
  target: [
    ...wechatyDevelopers.homeHq,
  ],
})

/**
 *
 * Broadcasting text and url link from home HQ to developers' home X
 *
 */
const HomeHqAnnouncingPlugin = SourceToTargetRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  map: unidirectionalMapper,
  source: [
    ...wechatyDevelopers.homeHq,
  ],
  target: [
    ...wechatyDevelopers.home,
    ...wechatyDevelopers.monitor,
  ],
})

export {
  HomeHqAnnouncingPlugin,
  HomeHqCollectingPlugin,
}
