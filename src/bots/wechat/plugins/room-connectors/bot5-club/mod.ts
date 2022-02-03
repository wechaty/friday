import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import { botSettings } from '../../../../../bot-settings/deprecated.js'

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
const [next, current, ...previous] =  botSettings.weChat.rooms.bot5Club.rooms

const Bot5OneToManyPlugin = SourceToTargetRoomConnector({
  map: unidirectionalMapper,
  source: [
    next,
    current,
  ],
  target: [
    ...previous,
  ],
})

export {
  Bot5OneToManyPlugin,
}
