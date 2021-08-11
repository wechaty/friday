import { Message } from 'wechaty'
import {
  ManyToOneRoomConnector,
  matchers,
}                                     from 'wechaty-plugin-contrib'

import {
  // DEVELOPERS_ROOM_ID_LIST,
  MIKE_CONTACT_ID,
  // DEVELOPERS_ROOM_ID_WXWORK,
  // DEVELOPERS_ROOM_ID_ENGLISH,
  // HEADQUARTERS_ROOM_ID,
}                             from '../../../../../database'
import {
  wechatyDevelopersHome,
}                             from '../../../../../database/mod'

import { bidirectionalMapper }  from '../../bidirectional-mapper'
import { unidirectionalMapper } from '../../unidirectional-mapper'

const matchEnglish = matchers.languageMatcher('english')

/**
 *
 * Many to One
 *
 */
const ManyToEnglishPlugin = ManyToOneRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  many: [
    ...wechatyDevelopersHome.home, // DEVELOPERS_ROOM_ID_LIST,
    ...wechatyDevelopersHome.monitor, // DEVELOPERS_ROOM_ID_WXWORK,
    ...wechatyDevelopersHome.headquarters, // HEADQUARTERS_ROOM_ID,
  ],
  map: async (message: Message) => {
    if (message.type() === Message.Type.Text) {
      if (!matchEnglish(message.text())) {
        return undefined
      }
    } else if (message.type() === Message.Type.Url) {
      const urlLink = await message.toUrlLink()
      const text    = urlLink.description() ?? urlLink.title()
      if (!matchEnglish(text)) {
        return undefined
      }
    }

    const room = message.room()
    // if (message.room()?.id === HEADQUARTERS_ROOM_ID) {
    if (room && wechatyDevelopersHome.headquarters.includes(room.id)) {
      return unidirectionalMapper(message)
    } else {
      return bidirectionalMapper(message)
    }
  },
  // Huan(202108): use array in the future
  one: wechatyDevelopersHome.english[0], // DEVELOPERS_ROOM_ID_ENGLISH,
})

export {
  ManyToEnglishPlugin,
}
