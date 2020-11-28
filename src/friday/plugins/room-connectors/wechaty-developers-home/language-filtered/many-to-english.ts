import { Message } from 'wechaty'
import {
  ManyToOneRoomConnector,
  matchers,
}                                     from 'wechaty-plugin-contrib'

import {
  DEVELOPERS_ROOM_ID_LIST,
  MIKE_CONTACT_ID,
  DEVELOPERS_ROOM_ID_WXWORK,
  DEVELOPERS_ROOM_ID_ENGLISH,
}                             from '../../../../../database'

import { bidirectionalMapper } from '../../bidirectional-mapper'

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
    ...DEVELOPERS_ROOM_ID_LIST,
    DEVELOPERS_ROOM_ID_WXWORK,
  ],
  map: async (message: Message) => {
    if (message.type() !== Message.Type.Text) {
      return undefined
    }
    if (!matchEnglish(message.text())) {
      return undefined
    }
    return bidirectionalMapper(message)
  },
  one: DEVELOPERS_ROOM_ID_ENGLISH,
})

export {
  ManyToEnglishPlugin,
}
