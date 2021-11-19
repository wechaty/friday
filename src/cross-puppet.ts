import {
  Wechaty,
  Message,
  log,
  type,
  Room,
}             from 'wechaty'
import type { FileBoxInterface } from 'file-box'

import {
  GITTER_WECHATY_ROOM_ID,
  QQ_WECHATY_ROOM_ID,
}                         from './database.js'

import {
  wechatyDevelopers,
  polyglotWechatyUserGroup,
  bot5Club,
}                         from './database/mod.js'

async function connectGitterFriday (args: {
  friday : Wechaty,
  gitter : Wechaty,
  qq     : Wechaty,
}): Promise<void> {
  const { friday, gitter, qq } = args

  const gitterRoom  = await gitter.Room.find({ id: GITTER_WECHATY_ROOM_ID })
  const qqRoom      = await qq.Room.find({ id: QQ_WECHATY_ROOM_ID })

  if (!gitterRoom) {
    throw new Error('Gitter Room with id: ' + GITTER_WECHATY_ROOM_ID + ' not found')
  }
  if (!qqRoom) {
    throw new Error('QQ Group with id: ' + QQ_WECHATY_ROOM_ID + ' not found')
  }

  const qqRoomSay = async (msg: string): Promise<void> => {
    if (!qq.isLoggedIn) {
      return
    }

    const room = await qq.Room.find(QQ_WECHATY_ROOM_ID)
    if (!room) {
      return
    }

    await room.say(msg)
  }

  const wechatRoomListAll = await Promise.all(
    [
      ...wechatyDevelopers.homeHq,
      ...wechatyDevelopers.home,
    ].map(
      id => friday.Room.find({ id }),
    ),
  )
  const wechatRoomList = wechatRoomListAll.filter(Boolean) as Room[]

  const wechatRoomSay = async (textOrFile: string | FileBoxInterface): Promise<void> => {
    for (const room of wechatRoomList) {
      await room.say(textOrFile as any) // fix me...
      await room.wechaty.sleep(5000)
    }
  }

  const prefixStr = (from?: string) => (name: string) => {
    return from
      ? [
          '[',
          name,
          ` @ ${from}`,
          ']: ',
        ].join('')
      : `[${name}]: `
  }
  const prefixMd = (from?: string) => (name: string) => {
    return from
      ? [
          '`',
          name,
          ' @ ',
          from,
          '`: ',
        ].join('')
      : '`' + name + '`: '
  }

  const forwardWechatToGitterQQ = (roomId: string) => {
    friday.on('message', async (msg: Message) => {
      const room = msg.room()

      if (!room)                              { return }
      if (room.id !== roomId)                 { return }
      if (msg.self())                         { return }

      const talker    = msg.talker()
      const roomAlias = await room.alias(talker)
      const name      = roomAlias || talker.name()

      const prefixMdWechatName = prefixMd('WeChat')(name)
      const prefixStrWechatName = prefixStr('WeChat')(name)

      switch (msg.type()) {
        case type.Message.Text: {
          await gitterRoom.say(prefixMdWechatName + msg.text())
          await qqRoomSay(prefixStrWechatName + msg.text())
          break
        }

        case type.Message.Image: {
          const fileBox = await msg.toFileBox()
          await gitterRoom.say(fileBox)
          await gitterRoom.say(prefixMdWechatName)
          break
        }

        default:
          break
      }

    })
  }

  const forwardGitterToWechatQQ = () => {
    gitterRoom.on('message', async msg => {
      if (msg.self()) { return }

      const name = msg.talker().name()
      const prefixStrGitterName = prefixStr('Gitter')(name)

      switch (msg.type()) {
        case type.Message.Text: {
          await wechatRoomSay(prefixStrGitterName + msg.text())
          await qqRoomSay(prefixStrGitterName + msg.text())
          break
        }
        case type.Message.Image: {
          const fileBox = await msg.toFileBox()
          await wechatRoomSay(fileBox)
          await wechatRoomSay(prefixStrGitterName)
          break
        }

        default: {
          break
        }
      }

    })
  }

  const forwardQQToWechatGitter = () => {
    log.verbose('cross-puppet', 'forwardQQToWechatGitter()')

    qqRoom.on('message', async msg => {
      log.verbose('cross-puppet', 'forwardQQToWechatGitter() qqRoom.on(message) %s', msg)

      if (msg.self()) { return }

      const name = msg.talker().name()
      const prefixMdQQName  = prefixMd('QQ')(name)
      const prefixStrQQName = prefixStr('QQ')(name)

      log.verbose('cross-puppet', 'forwardQQToWechatGitter() qqRoom.on(message) type %s', msg.type())

      switch (msg.type()) {
        case type.Message.Text: {
          log.verbose('cross-puppet', 'forwardQQToWechatGitter() qqRoom.on(message) forwarding message: "%s"', msg.text())

          await wechatRoomSay(prefixStrQQName + msg.text())
          await gitterRoom.say(prefixMdQQName + msg.text())
          break
        }
        case type.Message.Image: {
          const fileBox = await msg.toFileBox()

          await wechatRoomSay(fileBox)
          await wechatRoomSay(prefixStrQQName)

          await gitterRoom.say(fileBox)
          await gitterRoom.say(prefixMdQQName)

          break
        }

        default: {
          log.verbose('cross-puppet', 'forwardQQToWechatGitter() qqRoom.on(message) unknown message type: "%s"', msg.type())

          break
        }
      }

    })
  }

  ;[
    ...wechatyDevelopers.home,
    ...wechatyDevelopers.homeHq,
    ...wechatyDevelopers.contributors,
    ...Object.values(polyglotWechatyUserGroup).flat(),

    /**
     * Summer of Code
     */
    ...wechatyDevelopers.summer, // SUMMER_OF_CODE_ROOM_ID,

    /**
      * BOT5.Club
      */
    ...bot5Club.member,
    ...bot5Club.chair,
  ].forEach(forwardWechatToGitterQQ)

  /**
   * Huan(20201130): Friday.BOT has been disabled by Tencent
   *  See: https://github.com/wechaty/friday/issues/62
   * Huan(20201203): Resolved
   */
  // void forwardGitterToWechatQQ
  forwardGitterToWechatQQ()

  forwardQQToWechatGitter()
}

export {
  connectGitterFriday,
}
