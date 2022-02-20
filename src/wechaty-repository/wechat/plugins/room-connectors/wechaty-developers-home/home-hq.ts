import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  botSettings,
  MIKE_CONTACT_ID,
}                     from '../../../../../wechaty-settings/deprecated.js'

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
    ...botSettings.weChat.rooms.wechatyDevelopers.home,
  ],
  target: [
    ...botSettings.weChat.rooms.wechatyDevelopers.homeHq,
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
    ...botSettings.weChat.rooms.wechatyDevelopers.homeHq,
  ],
  target: [
    ...botSettings.weChat.rooms.wechatyDevelopers.home,
    ...botSettings.weChat.rooms.wechatyDevelopers.monitor,
  ],
})

export {
  HomeHqAnnouncingPlugin,
  HomeHqCollectingPlugin,
}
