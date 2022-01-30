import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  MIKE_CONTACT_ID,
}                             from '../../../../../setting/legacy/database.js'
import { fridaySetting } from '../../../../../setting/deprecated.js'

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
    ...fridaySetting.wechat.wechatyDevelopers.home,
  ],
  target: [
    ...fridaySetting.wechat.wechatyDevelopers.homeHq,
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
    ...fridaySetting.wechat.wechatyDevelopers.homeHq,
  ],
  target: [
    ...fridaySetting.wechat.wechatyDevelopers.home,
    ...fridaySetting.wechat.wechatyDevelopers.monitor,
  ],
})

export {
  HomeHqAnnouncingPlugin,
  HomeHqCollectingPlugin,
}
