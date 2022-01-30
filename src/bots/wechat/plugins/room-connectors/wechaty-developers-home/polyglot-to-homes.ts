import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import { fridaySetting } from '../../../../../setting/deprecated.js'

import { bidirectionalMapper }           from '../bidirectional-mapper.js'

/**
 *
 * OneToMany
 *
 */
const SourceToTargetPlugin = SourceToTargetRoomConnector({
  map: bidirectionalMapper,
  source: [
    ...Object.values(fridaySetting.wechat.wechatyUserGroup).flat(),
  ],
  target: [
    ...fridaySetting.wechat.wechatyDevelopers.homeHq,
    ...fridaySetting.wechat.wechatyDevelopers.home,
  ],
})

export {
  SourceToTargetPlugin,
}
