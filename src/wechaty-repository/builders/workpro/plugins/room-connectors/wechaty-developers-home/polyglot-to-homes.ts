import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'
import type { WorkProSettings } from '../../../../../../wechaty-settings/mod.js'

import { bidirectionalMapper }           from '../bidirectional-mapper.js'

/**
 *
 * OneToMany
 *
 */
const getSourceToTargetPlugin = (settings: WorkProSettings) => {
  const SourceToTargetPlugin = SourceToTargetRoomConnector({
    map: bidirectionalMapper,
    source: [
      ...Object.values(settings.rooms.polyglotUserGroup).flat(),
      ...Object.values(settings.rooms.puppetUserGroup).flat(),
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
