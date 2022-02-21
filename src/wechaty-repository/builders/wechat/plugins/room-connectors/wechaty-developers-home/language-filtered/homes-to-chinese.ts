import {
  Message,
  types,
}               from 'wechaty'
import {
  SourceToTargetRoomConnector,
  matchers,
}                                     from 'wechaty-plugin-contrib'

import type { WeChatSettings } from '../../../../../../settings/mod.js'

import { bidirectionalMapper }  from '../../bidirectional-mapper.js'
import { getUnidirectionalMapper } from '../../unidirectional-mapper.js'

const matchChinese = matchers.languageMatcher('chinese')

/**
 *
 * Many to One
 *
 */
const getHomeToChinesePlugin = (settings: WeChatSettings) => {
  const HomeToChinesePlugin = SourceToTargetRoomConnector({
    blacklist: [
      settings.mikeId,
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
      if (room && settings.rooms.wechatyDevelopers.homeHq.includes(room.id)) {
        return getUnidirectionalMapper(settings)(message)
      } else {
        return bidirectionalMapper(message)
      }
    },
    source: [
      ...settings.rooms.wechatyDevelopers.home,  // DEVELOPERS_ROOM_ID_LIST,
      ...settings.rooms.wechatyDevelopers.homeHq, // HEADQUARTERS_ROOM_ID,
    ],
    target: [
      ...settings.rooms.wechatyDevelopers.chinese, // DEVELOPERS_ROOM_ID_CHINESE,
    ],
  })
  return HomeToChinesePlugin
}

export {
  getHomeToChinesePlugin,
}
