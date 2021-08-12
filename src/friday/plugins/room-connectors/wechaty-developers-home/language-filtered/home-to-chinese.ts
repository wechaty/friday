import { Message } from 'wechaty'
import {
  SourceToTargetRoomConnector,
  matchers,
}                                     from 'wechaty-plugin-contrib'

import {
  MIKE_CONTACT_ID,
}                             from '../../../../../database'

import {
  wechatyDevelopers,
}                             from '../../../../../database/mod'

import { bidirectionalMapper }  from '../../bidirectional-mapper'
import { unidirectionalMapper } from '../../unidirectional-mapper'

const matchChinese = matchers.languageMatcher('chinese')

/**
 *
 * Many to One
 *
 */
const HomeToChinesePlugin = SourceToTargetRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  map: async (message: Message) => {
    if (message.type() === Message.Type.Text) {
      if (!matchChinese(message.text())) {
        return undefined
      }
    } else if (message.type() === Message.Type.Url) {
      const urlLink = await message.toUrlLink()
      const text = urlLink.description() ?? urlLink.title()
      if (!matchChinese(text)) {
        return undefined
      }
    }

    const room = message.room()
    // if (message.room()?.id === HEADQUARTERS_ROOM_ID) {
    if (room && wechatyDevelopers.headquarters.includes(room.id)) {
      return unidirectionalMapper(message)
    } else {
      return bidirectionalMapper(message)
    }
  },
  source: [
    ...wechatyDevelopers.home,  // DEVELOPERS_ROOM_ID_LIST,
    ...wechatyDevelopers.headquarters, // HEADQUARTERS_ROOM_ID,
  ],
  target: [
    ...wechatyDevelopers.chinese, // DEVELOPERS_ROOM_ID_CHINESE,
  ],
})

export {
  HomeToChinesePlugin,
}
