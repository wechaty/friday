import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import type { WeChatSettings } from '../../../../../settings/mod.js'

import { getUnidirectionalMapper }           from '../unidirectional-mapper.js'

/**
 *
 * Collecting all messages from developers' home X
 *
 */
const getHomeHqCollectingPlugin = (settings: WeChatSettings) => {
  const HomeHqCollectingPlugin = SourceToTargetRoomConnector({
    blacklist: [
      settings.mikeId,
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
      settings.mikeId,
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
