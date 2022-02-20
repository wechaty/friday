import {
  type EventBus,
  type IEventHandler,
  EventsHandler,
}                         from '@nestjs/cqrs'
import type { Logger }    from 'brolog'
import type * as WECHATY       from 'wechaty'

import type {
  GitterSettings,
  QqSettings,
  WeChatSettings,
  WhatsAppSettings,
}                     from '../../../../wechaty-settings/mod.js'

import type { WechatyRepository }     from '../../../../wechaty-repository/mod.js'
import { PuppetMessageReceivedEvent } from '../../../../wechaty-repository/events/mod.js'
import {
  GitterCommunityMessageReceivedEvent,
  QqCommunityMessageReceivedEvent,
  WeChatCommunityMessageReceivedEvent,
  WhatsAppCommunityMessageReceivedEvent,
}                                         from '../mod.js'

@EventsHandler(PuppetMessageReceivedEvent)
export class PuppetMessageReceivedHandler implements IEventHandler<PuppetMessageReceivedEvent> {

  readonly weChatCommunityRoomList: string[]

  constructor (
    private readonly log: Logger,
    private readonly eventBus: EventBus,
    private readonly weChatSettings: WeChatSettings,
    private readonly whatsAppSettings: WhatsAppSettings,
    private readonly qqSettings: QqSettings,
    private readonly gitterSettings: GitterSettings,
    private readonly repository: WechatyRepository,
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

  async handle (event: PuppetMessageReceivedEvent) {
    this.log.verbose('PuppetMessageReceivedHandler', 'handle({puppetId: %s, messageId: %s})', event.puppetId, event.messageId)

    const wechaty = this.repository.findByPuppetId(event.puppetId)
    if (!wechaty) {
      this.log.warn('PuppetMessageReceivedHandler', 'handle({puppetId: %s}) bot not found', event.puppetId)
      return
    }

    const message = await wechaty.Message.find({ id: event.messageId })
    if (!message) {
      this.log.warn('PuppetMessageReceivedHandler', 'handle({ messageId: %s }) message not found', event.messageId)
      return
    }

    const wechatyName = wechaty.name()
    switch (wechatyName) {
      case this.weChatSettings.name:
        this.handleWeChatMessage(message)
        break
      case this.gitterSettings.name:
        this.handleGitterMessage(message)
        break
      case this.qqSettings.name:
        this.handleQqMessage(message)
        break
      case this.whatsAppSettings.name:
        this.handleWhatsAppMessage(message)
        break
      default:
        this.log.warn('PuppetMessageReceivedHandler', 'handle() bot name "%s" unknown', wechatyName)
    }
  }

  private handleWeChatMessage (message: WECHATY.Message) {
    this.log.verbose('PuppetMessageReceivedHandler', 'handleWeChatMessage(%s)', message)

    const room = message.room()

    if (message.self())                                     { return }
    if (!room)                                              { return }
    if (!this.weChatCommunityRoomList.includes(room.id))    { return }

    this.eventBus.publish(
      new WeChatCommunityMessageReceivedEvent(
        message.wechaty.puppet.id,
        message.id,
      ),
    )
  }

  private handleGitterMessage (message: WECHATY.Message) {
    this.log.verbose('PuppetMessageReceivedHandler', 'handleGitterMessage(%s)', message)

    const room = message.room()

    if (message.self())                                 { return }
    if (!room)                                          { return }
    if (room.id !== this.gitterSettings.wechatyRoomId)  { return }

    this.eventBus.publish(
      new GitterCommunityMessageReceivedEvent(
        message.wechaty.puppet.id,
        message.id,
      ),
    )
  }

  private handleQqMessage (message: WECHATY.Message) {
    this.log.verbose('PuppetMessageReceivedHandler', 'handleQqMessage(%s)', message)

    const room = message.room()

    if (message.self())                             { return }
    if (!room)                                      { return }
    if (room.id !== this.qqSettings.wechatyRoomId)  { return }

    this.eventBus.publish(
      new QqCommunityMessageReceivedEvent(
        message.wechaty.puppet.id,
        message.id,
      ),
    )
  }

  private handleWhatsAppMessage (message: WECHATY.Message) {
    this.log.verbose('PuppetMessageReceivedHandler', 'handleWhatsAppMessage(%s)', message)

    const room = message.room()

    if (message.self())                           { return }
    if (!room)                                    { return }

    // FIXME: change `.name` to the WhatsApp room id
    if (room.id !== this.whatsAppSettings.name)   { return }

    this.eventBus.publish(
      new WhatsAppCommunityMessageReceivedEvent(
        message.wechaty.puppet.id,
        message.id,
      ),
    )
  }

}