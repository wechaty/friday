import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'
import type { WeChatSettings } from '../../../../../../wechaty-settings/mod.js'

import { bidirectionalMapper }           from '../bidirectional-mapper.js'

/**
 *
 * OneToMany
 *
 */
const getSourceToTargetPlugin = (settings: WeChatSettings) => {
  const SourceToTargetPlugin = SourceToTargetRoomConnector({
    map: bidirectionalMapper,
    source: [
      ...Object.values(settings.rooms.wechatyUserGroup).flat(),
    ],
    target: [
      ...settings.rooms.wechatyDevelopers.homeHq,
      ...settings.rooms.wechatyDevelopers.home,
    ],
  })
  return SourceToTargetPlugin
}

export {
  getSourceToTargetPlugin,
}
