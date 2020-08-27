import {
  Wechaty,
  Message,
  FileBox,
}             from 'wechaty'

import {
  HEADQUARTERS_ROOM_ID,
  DEVELOPERS_ROOM_ID_LIST,

  // FRIDAY_ROOM_ID,

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
    // FRIDAY_ROOM_ID,
  ].map(id => friday.Room.load(id))

  const wechatRoomSay = async (textOrFile: string | FileBox): Promise<void> => {
    for (const room of wechatRoomList) {
      await room.say(textOrFile as any) // fix me...
      await room.wechaty.sleep(5000)
    }
  }

  const forwardWechatToGitter = (roomId: string) => {
    friday.on('message', async (msg: Message) => {
      const room = msg.room()

      if (!room)                              { return }
      if (room.id !== roomId)                 { return }
      if (msg.self())                         { return }

      const talker    = msg.from()!
      const roomAlias = await room.alias(talker)
      const name      = roomAlias || talker.name()

      const prefixText = [
        '`',
        name,
        '`: ',
      ].join('')

      switch (msg.type()) {
        case Message.Type.Text: {
          await gitterRoom.say(prefixText + msg.text())
          break
        }

        case Message.Type.Image: {
          const fileBox = await msg.toFileBox()
          await gitterRoom.say(fileBox)
          await gitterRoom.say(prefixText)
          break
        }

        default:
          break
      }

    })
  }

  const forwardGitterToWechat = () => {
    gitterRoom.on('message', async msg => {
      if (msg.self()) { return }

      const name = msg.from()!.name()

      const prefixText = [
        '[',
        name,
        ' @ Gitter]: ',
      ].join('')

      switch (msg.type()) {
        case Message.Type.Text: {
          await wechatRoomSay(prefixText + msg.text())
          break
        }
        case Message.Type.Image: {
          const fileBox = await msg.toFileBox()
          await wechatRoomSay(fileBox)
          await wechatRoomSay(prefixText)
          break
        }

        default: {
          break
        }
      }

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
