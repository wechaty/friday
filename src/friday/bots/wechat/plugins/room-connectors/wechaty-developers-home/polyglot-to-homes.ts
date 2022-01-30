import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import { fridayConfig } from '../../../deprecated.js'

import { bidirectionalMapper }           from '../bidirectional-mapper.js'

/**
 *
 * OneToMany
 *
 */
const SourceToTargetPlugin = SourceToTargetRoomConnector({
  map: bidirectionalMapper,
  source: [
    ...Object.values(fridayConfig.wechat.wechatyUserGroup).flat(),
  ],
  target: [
    ...fridayConfig.wechat.wechatyDevelopers.homeHq,
    ...fridayConfig.wechat.wechatyDevelopers.home,
  ],
})

export {
  SourceToTargetPlugin,
}
