import type { EventBus, IEventHandler } from '@nestjs/cqrs'
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator.js'
import type { Brolog } from 'brolog'
import * as WECHATY from 'wechaty'

import type { 
  GitterSettings, 
  QqSettings, 
  WeChatSettings, 
  WhatsAppSettings, 
}                     from '../../../bot-settings/mod.js'

import type { BotRepository } from '../../../bots/bot.repository.js'
import { PuppetMessageEventReceived } from '../../../bots/events/mod.js'
import { 
  GitterCommunityMessageEvent, 
  QqCommunityMessageEvent, 
  WeChatCommunityMessageEvent, 
  WhatsappCommunityMessageEvent, 
}                                   from '../mod.js'

@EventsHandler(PuppetMessageEventReceived)
export class PuppetMessageHandler implements IEventHandler<PuppetMessageEventReceived> {

  const weChatCommunityRoomList: string[]

  constructor (
    private readonly log: Brolog,
    private readonly eventBus: EventBus,
    private readonly weChatSettings: WeChatSettings,
    private readonly whatsAppSettings: WhatsAppSettings,
    private readonly qqSettings: QqSettings,
    private readonly gitterSettings: GitterSettings,
    private readonly repository: BotRepository,
  ) {
    this.weChatCommunityRoomList = [
      ...this.weChatSettings.rooms.wechatyDevelopers.home,
      ...this.weChatSettings.rooms.wechatyDevelopers.homeHq,
      ...this.weChatSettings.rooms.wechatyDevelopers.contributors,
      ...Object.values(this.weChatSettings.rooms.wechatyUserGroup).flat(),
  
      /**
       * Summer of Code
       */
      ...this.weChatSettings.rooms.wechatyDevelopers.summer, // SUMMER_OF_CODE_ROOM_ID,
  
      /**
        * BOT5.Club
        */
      ...this.weChatSettings.rooms.bot5Club.rooms,
    ]
  }

  async handle (event: PuppetMessageEventReceived) {
    this.log.verbose('PuppetMessageHandler', 'handle({puppetId: %s, messageId: %s})', event.puppetId, event.messageId)

    const bot = this.repository.findByPuppetId(event.puppetId)
    if (!bot) {
      this.log.warn('PuppetMessageHandler', 'handle({puppetId: %s}) bot not found', event.puppetId)
      return
    }

    const message = await bot.wechaty.Message.find({ id: event.messageId })
    if (!message) {
      this.log.warn('PuppetMessageHandler', 'handle({ messageId: %s }) message not found', event.messageId)
      return
    }

    const wechatyName = bot.wechaty.name()
    switch (wechatyName) {
      case this.weChatSettings.name:
        this.handleWeChatMessage(message)
        break
      case this.gitterSettings.name:
        this.handleGitterMessage(message)
        break
      case this.QqSettings.name:
        this.handleQqMessage(message)
        break
      case this.whatsAppSettings.name:
        this.handleWhatsAppMessage(message)
        break
      default:
        this.log.warn('PuppetMessageHandler', 'handle() bot name %s not found', wechatyName)
    }
  }

  private prefixText (from?: string) {
    return (name: string) => {
      return from
        ? [
            '[',
            name,
            ` @ ${from}`,
            ']: ',
          ].join('')
        : `[${name}]: `
    }
  }

  private prefixMarkdown (from?: string) {
    return (name: string) => {
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
  }

  private handleWeChatMessage(message: WECHATY.Message) {
    this.log.verbose('PuppetMessageHandler', 'handleWeChatEvent(%s)', message)

    const room = message.room()

    if (message.self())                                     { return }      
    if (!room)                                              { return }
    if (!this.weChatCommunityRoomList.includes(room.id))    { return }

    this.eventBus.publish(
      new WeChatCommunityMessageEvent(
        message.wechaty.puppet.id,
        message.id,
      )
    )
  }

  private handleGitterMessage(message: WECHATY.Message) {
    this.log.verbose('PuppetMessageHandler', 'handleGitterEvent(%s)', message)

    const room = message.room()

    if (message.self())                                 { return }      
    if (!room)                                          { return }
    if (room.id !== this.gitterSettings.wechatyRoomId)  { return }

    this.eventBus.publish(
      new GitterCommunityMessageEvent(
        message.wechaty.puppet.id,
        message.id,
      )
    )
  }

  private handleQqMessage(message: WECHATY.Message) {
    this.log.verbose('PuppetMessageHandler', 'handleQqEvent(%s)', message)

    const room = message.room()

    if (message.self())                             { return }      
    if (!room)                                      { return }
    if (room.id !== this.qqSettings.wechatyRoomId)  { return }

    this.eventBus.publish(
      new QqCommunityMessageEvent(
        message.wechaty.puppet.id,
        message.id,
      )
    )
  }
  
  private handleWhatsAppMessage(message: WECHATY.Message) {
    this.log.verbose('PuppetMessageHandler', 'handleWhatsAppEvent(%s)', message)

    const room = message.room()

    if (message.self())                           { return }      
    if (!room)                                    { return }

    // FIXME: change `.name` to the WhatsApp room id
    if (room.id !== this.whatsAppSettings.name)   { return }

    this.eventBus.publish(
      new WhatsappCommunityMessageEvent(
        message.wechaty.puppet.id,
        message.id,
      )
    )
  }
  
  private unknown () {
    const talker    = message.talker()
    const roomAlias = await room.alias(talker)
    const name      = roomAlias || talker.name()

    const prefixMdWechatName = this.prefixMarkdown('WeChat')(name)
    const prefixStrWechatName = this.prefixText('WeChat')(name)

    switch (message.type()) {
      case WECHATY.types.Message.Text: {
        await gitterRoom.say(prefixMdWechatName + message.text())
        await qqRoomSay(prefixStrWechatName + message.text())
        break
      }

      case WECHATY.types.Message.Image: {
        const fileBox = await message.toFileBox()
        await gitterRoom.say(fileBox)
        await gitterRoom.say(prefixMdWechatName)
        break
      }

      default:
        break
    }

  })

    if () {

    }
    this.eventBus.publish(
      new WeChatCommunityMessageEvent(
        message.wechaty.puppet.id,
        message.id,
      )
    )
  }

}
