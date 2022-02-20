import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import type { WeChatSettings } from '../../../../../wechaty-settings/mod.js'

import { getUnidirectionalMapper } from '../unidirectional-mapper.js'

/**
 *
 * BOT5 Club
 *
 */
const getBot5OneToManyPlugin = (settings: WeChatSettings) => {
  /**
   * - first club room in the array is the latest room (current year)
   * - second club room in the array (and all the following)
   *    is the previous room (previous year).
   */
  const [next, current, ...previous] =  settings.rooms.bot5Club.rooms

  const Bot5OneToManyPlugin = SourceToTargetRoomConnector({
    map: getUnidirectionalMapper(settings),
    source: [
      next,
      current,
    ],
    target: [
      ...previous,
    ],
  })
  return Bot5OneToManyPlugin
}

export {
  getBot5OneToManyPlugin,
}
