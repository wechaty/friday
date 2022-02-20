import {
  Message,
  types,
}             from 'wechaty'
import {
  SourceToTargetRoomConnector,
  matchers,
}                                     from 'wechaty-plugin-contrib'

import {
  MIKE_CONTACT_ID,
}                     from '../../../../../../wechaty-settings/deprecated.js'
import type { WeChatSettings } from '../../../../../../wechaty-settings/mod.js'

import { bidirectionalMapper }  from '../../bidirectional-mapper.js'
import { getUnidirectionalMapper } from '../../unidirectional-mapper.js'

const matchEnglish = matchers.languageMatcher('english')

/**
 *
 * Many to One
 *
 */
const getHomeToEnglishPlugin = (settings: WeChatSettings) => {
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
      if (room && settings.rooms.wechatyDevelopers.homeHq.includes(room.id)) {
        return getUnidirectionalMapper(settings)(message)
      } else {
        return bidirectionalMapper(message)
      }
    },
    source: [
      ...settings.rooms.wechatyDevelopers.home, // DEVELOPERS_ROOM_ID_LIST,
      ...settings.rooms.wechatyDevelopers.homeHq, // HEADQUARTERS_ROOM_ID,
    ],
    target: [
      ...settings.rooms.wechatyDevelopers.english, // DEVELOPERS_ROOM_ID_ENGLISH,
    ],
  })
  return HomeToEnglishPlugin
}

export {
  getHomeToEnglishPlugin,
}
