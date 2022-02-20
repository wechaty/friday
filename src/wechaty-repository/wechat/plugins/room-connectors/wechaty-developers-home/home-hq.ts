import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  MIKE_CONTACT_ID,
}                     from '../../../../../wechaty-settings/deprecated.js'
import type { WeChatSettings } from '../../../../../wechaty-settings/mod.js'

import { getUnidirectionalMapper }           from '../unidirectional-mapper.js'

/**
 *
 * Collecting all messages from developers' home X
 *
 */
const getHomeHqCollectingPlugin = (settings: WeChatSettings) => {
  const HomeHqCollectingPlugin = SourceToTargetRoomConnector({
    blacklist: [
      MIKE_CONTACT_ID,
    ],
    map: getUnidirectionalMapper(settings),
    source: [
      ...settings.rooms.wechatyDevelopers.home,
    ],
    target: [
      ...settings.rooms.wechatyDevelopers.homeHq,
    ],
  })
  return HomeHqCollectingPlugin
}

/**
 *
 * Broadcasting text and url link from home HQ to developers' home X
 *
 */
const getHomeHqAnnouncingPlugin = (settings: WeChatSettings) => {
  const HomeHqAnnouncingPlugin = SourceToTargetRoomConnector({
    blacklist: [
      MIKE_CONTACT_ID,
    ],
    map: getUnidirectionalMapper(settings),
    source: [
      ...settings.rooms.wechatyDevelopers.homeHq,
    ],
    target: [
      ...settings.rooms.wechatyDevelopers.home,
      ...settings.rooms.wechatyDevelopers.monitor,
    ],
  })
  return HomeHqAnnouncingPlugin
}

export {
  getHomeHqAnnouncingPlugin,
  getHomeHqCollectingPlugin,
}
