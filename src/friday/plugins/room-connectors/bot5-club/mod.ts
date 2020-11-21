import {
  OneToManyRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  BOT5_CLUB_2019_ROOM_ID,
  BOT5_CLUB_2020_ROOM_ID,
}                             from '../../../../database'

import { unidirectionalMapper }           from '../unidirectional-mapper'

/**
 *
 * BOT5 Club
 *
 */
const Bot5OneToManyPlugin = OneToManyRoomConnector({
  many: [
    BOT5_CLUB_2019_ROOM_ID,
  ],
  map: unidirectionalMapper,
  one: BOT5_CLUB_2020_ROOM_ID,
})

export {
  Bot5OneToManyPlugin,
}
