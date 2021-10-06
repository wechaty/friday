import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  polyglotWechatyUserGroup,
  wechatyDevelopers,
}                             from '../../../../database/mod.js'

import { bidirectionalMapper }           from '../bidirectional-mapper.js'

/**
 *
 * OneToMany
 *
 */
const SourceToTargetPlugin = SourceToTargetRoomConnector({
  map: bidirectionalMapper,
  source: [
    ...Object.values(polyglotWechatyUserGroup).flat(),
  ],
  target: [
    ...wechatyDevelopers.homeHq,
    ...wechatyDevelopers.home,
  ],
})

export {
  SourceToTargetPlugin,
}
