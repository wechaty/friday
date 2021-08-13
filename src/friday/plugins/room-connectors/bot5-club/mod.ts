import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  bot5Club,
}                             from '../../../../database/mod'

import { unidirectionalMapper } from '../unidirectional-mapper'

/**
 *
 * BOT5 Club
 *
 */
const Bot5OneToManyPlugin = SourceToTargetRoomConnector({
  map: unidirectionalMapper,
  source: [
    /**
     * The first club room in the array is the latest room (current year)
     */
    bot5Club.member[0],
  ],
  target: [
    /**
     * The second club room in the array (and all the following)
     *  is the previous room (previous year).
     */
    ...bot5Club.member.slice(1),
  ],
})

export {
  Bot5OneToManyPlugin,
}
