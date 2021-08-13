import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  polyglotWechatyUserGroup,
  wechatyDevelopers,
}                             from '../../../../database/mod'

import { bidirectionalMapper }           from '../bidirectional-mapper'

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
    ...wechatyDevelopers.headquarters,
    ...wechatyDevelopers.home,
  ],
})

export {
  SourceToTargetPlugin,
}
