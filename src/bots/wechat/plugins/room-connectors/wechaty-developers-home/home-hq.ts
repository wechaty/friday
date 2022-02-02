import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  weChatSettings,
  MIKE_CONTACT_ID,
}                     from '../../../../../settings/deprecated.js'

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
    ...weChatSettings.rooms.wechatyDevelopers.home,
  ],
  target: [
    ...weChatSettings.rooms.wechatyDevelopers.homeHq,
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
    ...weChatSettings.rooms.wechatyDevelopers.homeHq,
  ],
  target: [
    ...weChatSettings.rooms.wechatyDevelopers.home,
    ...weChatSettings.rooms.wechatyDevelopers.monitor,
  ],
})

export {
  HomeHqAnnouncingPlugin,
  HomeHqCollectingPlugin,
}
