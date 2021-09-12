import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  bot5Club,
}                             from '../../../../database/mod.js'

import { unidirectionalMapper } from '../unidirectional-mapper.js'

/**
 *
 * BOT5 Club
 *
 */

/**
 * - first club room in the array is the latest room (current year)
 * - second club room in the array (and all the following)
 *    is the previous room (previous year).
 */
const [current, ...previous] =  bot5Club.member

const Bot5OneToManyPlugin = SourceToTargetRoomConnector({
  map: unidirectionalMapper,
  source: [
    ...bot5Club.chair,
    current,
  ],
  target: [
    ...previous,
  ],
})

export {
  Bot5OneToManyPlugin,
}
