import { Message } from 'wechaty'
import {
  OneToManyRoomConnector,
  ManyToOneRoomConnector,
  ManyToManyRoomConnector,
}                           from 'wechaty-plugin-contrib'

import {
  HEADQUARTERS_ROOM_ID,
  DEVELOPERS_ROOM_ID_LIST,

  BOT5_CLUB_2019_ROOM_ID,
  BOT5_CLUB_2020_ROOM_ID,
}                           from './rooms-config'

const blacklist = [ async () => true ]
const whitelist = [ async (message: Message) => message.type() === Message.Type.Text ]

const OneToManyPlugin = OneToManyRoomConnector({
  blacklist,
  many: [
    ...DEVELOPERS_ROOM_ID_LIST,
  ],
  map: async message => `[${message.from()?.name()}@HQ]: ${message.text()}`,
  one: HEADQUARTERS_ROOM_ID,
  whitelist,
})

const ManyToOnePlugin = ManyToOneRoomConnector({
  blacklist,
  many: [
    ...DEVELOPERS_ROOM_ID_LIST,
  ],
  map: async message => `[${message.from()?.name()}@HOME]: ${message.text()}`,
  one: HEADQUARTERS_ROOM_ID,
  whitelist,
})

const ManyToManyPlugin = ManyToManyRoomConnector({
  blacklist,
  many: [
    ...DEVELOPERS_ROOM_ID_LIST,
  ],
  map: async message => `[${message.from()?.name()}]: ${message.text()}`,
  whitelist,
})

const Bot5OneToManyPlugin = OneToManyRoomConnector({
  blacklist,
  many: [
    BOT5_CLUB_2019_ROOM_ID,
  ],
  map: async message => `[${message.from()?.name()}@HQ]: ${message.text()}`,
  one: BOT5_CLUB_2020_ROOM_ID,
  whitelist,
})

export {
  OneToManyPlugin,
  ManyToOnePlugin,
  ManyToManyPlugin,
  Bot5OneToManyPlugin,
}
