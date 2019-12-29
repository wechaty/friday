import {
  Wechaty, Message,
}             from 'wechaty'

import {
  log,
  BOT_ROOM_ID,
  HEARTBEAT_ROOM_ID,
}                     from './config'

export class Chatops {

  private static singleton: Chatops

  public static instance (
    bot?: Wechaty,
  ) {
    if (!this.singleton) {
      if (!bot) {
        throw new Error('instance need a Wechaty instance to initialize')
      }
      this.singleton = new Chatops(bot)
    }
    return this.singleton
  }

  /**
   * Static
   * --------
   * Instance
   */

  private constructor (
    private bot: Wechaty,
  ) {
    //
  }

  public async heartbeat (text: string): Promise<void> {
    return this.roomMessage(HEARTBEAT_ROOM_ID, text)
  }

  public async say (textOrMessage: string | Message) {
    return this.roomMessage(BOT_ROOM_ID, textOrMessage)
  }

  private async roomMessage (
    roomId: string,
    textOrMessage: string | Message,
  ): Promise<void> {
    log.info('Chatops', 'roomMessage(%s, %s)', roomId, textOrMessage)

    const online = this.bot.logonoff()
    if (!online) {
      log.error('Chatops', 'roomMessage() this.bot is offline')
      return
    }

    const room = this.bot.Room.load(roomId)
    await room.ready()

    await room.say(`${textOrMessage}`)

    if (textOrMessage instanceof Message && textOrMessage.type() !== Message.Type.Text) {
      switch (textOrMessage.type()) {
        case Message.Type.Image:
          const image = await textOrMessage.toFileBox()
          await room.say(image)
          break
        case Message.Type.Url:
          const urlLink = await textOrMessage.toUrlLink()
          await room.say(urlLink)
          break
        default:
          const typeName = Message.Type[textOrMessage.type()]
          await room.say(`message type: ${typeName}`)
          break
      }
    }

  }

}
