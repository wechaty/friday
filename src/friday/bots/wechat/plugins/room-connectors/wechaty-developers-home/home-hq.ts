import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  MIKE_CONTACT_ID,
}                             from '../../../../../config/legacy/database.js'
import { fridayConfig } from '../../../../../config/deprecated.js'

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
    ...fridayConfig.wechat.wechatyDevelopers.home,
  ],
  target: [
    ...fridayConfig.wechat.wechatyDevelopers.homeHq,
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
    ...fridayConfig.wechat.wechatyDevelopers.homeHq,
  ],
  target: [
    ...fridayConfig.wechat.wechatyDevelopers.home,
    ...fridayConfig.wechat.wechatyDevelopers.monitor,
  ],
})

export {
  HomeHqAnnouncingPlugin,
  HomeHqCollectingPlugin,
}
