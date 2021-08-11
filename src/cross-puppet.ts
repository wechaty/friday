import {
  Wechaty,
  Message,
  FileBox,
}             from 'wechaty'

import {
  // HEADQUARTERS_ROOM_ID,
  // DEVELOPERS_ROOM_ID_LIST,

  // FRIDAY_ROOM_ID,

  GITTER_WECHATY_ROOM_ID,
  BOT5_CLUB_2019_ROOM_ID,
  BOT5_CLUB_2020_ROOM_ID,
  BOT5_CLUB_2021_ROOM_ID,
  BOT5_CLUB_ROOM_ID,
}                         from './database'

import {
  wechatyDevelopersHome,
  polyglotWechaty,
}                         from './database/mod'

function connectGitterFriday (args: {
  friday: Wechaty,
  gitter: Wechaty,
}): void {
  const { friday, gitter } = args

  const gitterRoom = gitter.Room.load(GITTER_WECHATY_ROOM_ID)

  const wechatRoomList = [
    ...wechatyDevelopersHome.headquarters,  // HEADQUARTERS_ROOM_ID,
    ...wechatyDevelopersHome.home,          // DEVELOPERS_ROOM_ID_LIST,
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

      const talker    = msg.talker()
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

      const name = msg.talker().name()

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
    ...wechatyDevelopersHome.home,          // ...DEVELOPERS_ROOM_ID_LIST,
    ...wechatyDevelopersHome.headquarters,     // HEADQUARTERS_ROOM_ID,

    ...Object.values(polyglotWechaty).flat(),  // MULTI_LANG_ROOM_ID,
    ...wechatyDevelopersHome.contributors,     // CONTRIBUTORS_ROOM_ID,

    /**
     * Summer of Code
     */
    ...wechatyDevelopersHome.summer, // SUMMER_OF_CODE_ROOM_ID,

    /**
      * BOT5.Club
      */
    BOT5_CLUB_2019_ROOM_ID,
    BOT5_CLUB_2020_ROOM_ID,
    BOT5_CLUB_2021_ROOM_ID,
    BOT5_CLUB_ROOM_ID,
  ].forEach(forwardWechatToGitter)

  /**
   * Huan(20201130): Friday.BOT has been disabled by Tencent
   *  See: https://github.com/wechaty/friday/issues/62
   * Huan(20201203): Resolved
   */
  forwardGitterToWechat()
  void forwardGitterToWechat
}

export {
  connectGitterFriday,
}
