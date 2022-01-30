import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import type * as WECHATY from 'wechaty'

import type { FridaySetting } from './setting/friday-setting.js'

import * as CQRS from './cqrs/mod.js'

// import { ChatopsCommand } from './cqrs/commands/impl/chatops.command.js'
// import type { ChatopsDto } from './cqrs/interfaces/chatops-dto.interface.js'
// import type { Bot } from './cqrs/models/bot.model.js'
// import { GetBotsQuery } from './cqrs/queries/impl/mod.js'
import { VERSION } from './config.js'

@Controller('/')
export class FridayController {

  constructor (
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly fridayConfig: FridaySetting,
  ) {}

  @Post('chatops/:roomId')
  async chatops (
    @Body() dto: CQRS.interfaces.ChatopsDto,
    @Param('roomId') roomId: undefined | string,
  ) {
    console.info(dto)

    if (!roomId) {
      roomId = this.fridayConfig.wechat.chatops.bot5
    }

    return this.commandBus.execute(
      new CQRS.commands.ChatopsCommand(roomId, dto.text),
    )
  }

  @Get()
  async dashboard (): Promise<string> {
    const bots: CQRS.models.Bot[] = await this.queryBus.execute(new CQRS.queries.GetBotsQuery())

    const FORM_HTML = `
      <form action="/chatops/" method="post">
        <label for="chatops">ChatOps: </label>
        <input id="chatops" type="text" name="chatops" value="Hello, BOT5.">
        <input type="submit" value="ChatOps">
      </form>
    `

    const wechatyHtml = async (wechaty: WECHATY.impls.WechatyInterface): Promise<string> => {

      let html = `<h1>BOT5 v${VERSION} ${wechaty} v${wechaty.version()}</h1>`

      if (wechaty.authQrCode) {
        html += [
          'Scan QR Code: <br />',
          wechaty.authQrCode + '<br />',
          '<a href="http://goqr.me/" target="_blank">http://goqr.me/</a><br />',
          '\n\n',
          '<image src="',
          'https://api.qrserver.com/v1/create-qr-code/?data=',
          encodeURIComponent(wechaty.authQrCode),
          '">',
        ].join('')

      } else if (wechaty.isLoggedIn) {
        const roomList = await wechaty.Room.findAll()
        let roomHtml = 'The rooms I have joined are as follows: <ol>'
        for (const room of roomList) {
          const topic = await room.topic()
          const roomId = room.id
          roomHtml = roomHtml + `<li> ${topic} / ${roomId} </li>\n`
        }
        roomHtml = roomHtml + '</ol>'

        html += [
          `<p> User ${wechaty.currentUser} logged in. </p>`,
          FORM_HTML,
          `<div>${roomHtml}</div>`,
        ].join('')

      } else {

        html += "Hello, I'm currently not logged in, but I have no auth qr code to show for you. Please come back later."

      }

      return html
    }

    const htmlList = bots.map(bot => wechatyHtml(bot.wechaty))
    const html = htmlList.join('\n<hr />\n')

    return html
  }

}
