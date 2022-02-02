import {
  Message,
  types,
}               from 'wechaty'
import {
  SourceToTargetRoomConnector,
  matchers,
}                                     from 'wechaty-plugin-contrib'

import {
  weChatSettings,
  MIKE_CONTACT_ID,
}                       from '../../../../../../settings/deprecated.js'

import { bidirectionalMapper }  from '../../bidirectional-mapper.js'
import { unidirectionalMapper } from '../../unidirectional-mapper.js'

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
    if (message.type() === types.Message.Text) {
      if (!matchChinese(message.text())) {
        return undefined
      }
    } else if (message.type() === types.Message.Url) {
      const urlLink = await message.toUrlLink()
      const text = urlLink.description() ?? urlLink.title()
      if (!matchChinese(text)) {
        return undefined
      }
    }

    const room = message.room()
    // if (message.room()?.id === HEADQUARTERS_ROOM_ID) {
    if (room && weChatSettings.rooms.wechatyDevelopers.homeHq.includes(room.id)) {
      return unidirectionalMapper(message)
    } else {
      return bidirectionalMapper(message)
    }
  },
  source: [
    ...weChatSettings.rooms.wechatyDevelopers.home,  // DEVELOPERS_ROOM_ID_LIST,
    ...weChatSettings.rooms.wechatyDevelopers.homeHq, // HEADQUARTERS_ROOM_ID,
  ],
  target: [
    ...weChatSettings.rooms.wechatyDevelopers.chinese, // DEVELOPERS_ROOM_ID_CHINESE,
  ],
})

export {
  HomeToChinesePlugin,
}
