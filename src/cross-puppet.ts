import {
  Wechaty,
  Message,
  FileBox,
  log,
}             from 'wechaty'

import {
  GITTER_WECHATY_ROOM_ID,
  QQ_WECHATY_ROOM_ID,
}                         from './database.js'

import {
  wechatyDevelopers,
  polyglotWechatyUserGroup,
  bot5Club,
}                         from './database/mod.js'

function connectGitterFriday (args: {
  friday : Wechaty,
  gitter : Wechaty,
  qq     : Wechaty,
}): void {
  const { friday, gitter, qq } = args

  const gitterRoom  = gitter.Room.load(GITTER_WECHATY_ROOM_ID)
  const qqRoom      = qq.Room.load(QQ_WECHATY_ROOM_ID)

  const wechatRoomList = [
    ...wechatyDevelopers.homeHq,
    ...wechatyDevelopers.home,
  ].map(id => friday.Room.load(id))

  const wechatRoomSay = async (textOrFile: string | FileBox): Promise<void> => {
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

      const prefixMdWechatName = prefixMd()(name)
      const prefixStrWechatName = prefixStr()(name)

      switch (msg.type()) {
        case Message.Type.Text: {
          await gitterRoom.say(prefixMdWechatName + msg.text())
          await qqRoom.say(prefixStrWechatName + msg.text())
          break
        }

        case Message.Type.Image: {
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
        case Message.Type.Text: {
          await wechatRoomSay(prefixStrGitterName + msg.text())
          await qqRoom.say(prefixStrGitterName + msg.text())
          break
        }
        case Message.Type.Image: {
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
        case Message.Type.Text: {
          log.verbose('cross-puppet', 'forwardQQToWechatGitter() qqRoom.on(message) forwarding message: "%s"', msg.text())

          await wechatRoomSay(prefixStrQQName + msg.text())
          await gitterRoom.say(prefixMdQQName + msg.text())
          break
        }
        case Message.Type.Image: {
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
