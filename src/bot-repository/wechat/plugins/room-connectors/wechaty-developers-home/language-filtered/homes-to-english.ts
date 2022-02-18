import {
  Message,
  types,
}             from 'wechaty'
import {
  SourceToTargetRoomConnector,
  matchers,
}                                     from 'wechaty-plugin-contrib'

import {
  botSettings,
  MIKE_CONTACT_ID,
}                     from '../../../../../../bot-settings/deprecated.js'

import { bidirectionalMapper }  from '../../bidirectional-mapper.js'
import { unidirectionalMapper } from '../../unidirectional-mapper.js'

const matchEnglish = matchers.languageMatcher('english')

/**
 *
 * Many to One
 *
 */
const HomeToEnglishPlugin = SourceToTargetRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  map: async (message: Message) => {
    if (message.type() === types.Message.Text) {
      if (!matchEnglish(message.text())) {
        return undefined
      }
    } else if (message.type() === types.Message.Url) {
      const urlLink = await message.toUrlLink()
      const text    = urlLink.description() ?? urlLink.title()
      if (!matchEnglish(text)) {
        return undefined
      }
    }

    const room = message.room()
    // if (message.room()?.id === HEADQUARTERS_ROOM_ID) {
    if (room && botSettings.weChat.rooms.wechatyDevelopers.homeHq.includes(room.id)) {
      return unidirectionalMapper(message)
    } else {
      return bidirectionalMapper(message)
    }
  },
  source: [
    ...botSettings.weChat.rooms.wechatyDevelopers.home, // DEVELOPERS_ROOM_ID_LIST,
    ...botSettings.weChat.rooms.wechatyDevelopers.homeHq, // HEADQUARTERS_ROOM_ID,
  ],
  target: [
    ...botSettings.weChat.rooms.wechatyDevelopers.english, // DEVELOPERS_ROOM_ID_ENGLISH,
  ],
})

export {
  HomeToEnglishPlugin,
}
