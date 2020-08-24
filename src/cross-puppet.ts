import {
  Wechaty,
  Message,
}             from 'wechaty'

import { getRoomShortName } from './friday/plugins/room-connector'

import {
  HEADQUARTERS_ROOM_ID,
  DEVELOPERS_ROOM_ID_LIST,

  GITTER_WECHATY_ROOM_ID,
  MULTI_LANG_ROOM_ID,
  CONTRIBUTORS_ROOM_ID,
  SUMMER_OF_CODE_ROOM_ID,
  BOT5_CLUB_2019_ROOM_ID,
  BOT5_CLUB_2020_ROOM_ID,
  BOT5_CLUB_ROOM_ID,
}                         from './database'

function connectGitterFriday (args: {
  friday: Wechaty,
  gitter: Wechaty,
}): void {
  const { friday, gitter } = args

  const gitterRoom = gitter.Room.load(GITTER_WECHATY_ROOM_ID)

  const wechatRoomList = [
    HEADQUARTERS_ROOM_ID,
    ...DEVELOPERS_ROOM_ID_LIST,
  ].map(id => friday.Room.load(id))

  const wechatRoomSay = async (text: string): Promise<void> => {
    for (const room of wechatRoomList) {
      await room.say(text)
      await room.wechaty.sleep(5000)
    }
  }

  const forwardWechatToGitter = (roomId: string) => {
    friday.on('message', async msg => {
      const room = msg.room()

      if (!room)                              { return }
      if (room.id !== roomId)                 { return }
      if (msg.self())                         { return }
      if (msg.type() !== Message.Type.Text)   { return }

      const talker    = msg.from()!
      const roomAlias = await room.alias(talker)
      const name      = roomAlias || talker.name()
      const roomName  = await getRoomShortName(msg) ?? 'WeChat'

      const text = [
        '`',
        name,
        ' @ ',
        roomName,
        '`: ',
        msg.text(),
      ].join('')

      await gitterRoom.say(text)
    })
  }

  const forwardGitterToWechat = () => {
    gitterRoom.on('message', async msg => {
      if (msg.self())                         { return }
      if (msg.type() !== Message.Type.Text)   { return }

      const name = msg.from()!.name()

      const text = [
        '[',
        name,
        ' @ Gitter]: ',
        msg.text(),
      ].join('')

      await wechatRoomSay(text)
    })
  }

  ;[
    ...DEVELOPERS_ROOM_ID_LIST,
    HEADQUARTERS_ROOM_ID,

    MULTI_LANG_ROOM_ID,
    CONTRIBUTORS_ROOM_ID,

    /**
     * Summer of Code
     */
    SUMMER_OF_CODE_ROOM_ID,

    /**
      * BOT5.Club
      */
    BOT5_CLUB_2019_ROOM_ID,
    BOT5_CLUB_2020_ROOM_ID,
    BOT5_CLUB_ROOM_ID,
  ].forEach(forwardWechatToGitter)

  forwardGitterToWechat()
}

export {
  connectGitterFriday,
}
