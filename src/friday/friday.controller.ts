import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import type * as WECHATY from 'wechaty'

import { WeChatSettings }     from '../wechaty-settings/mod.js'
import { WechatyRepository }  from '../wechaty-repository/mod.js'

import { VERSION } from '../config.js'

import { ChatopsCommand }   from './commands/mod.js'
import type { ChatopsDto }  from './interfaces/mod.js'

@Controller('/')
export class FridayController {

  constructor (
    private readonly commandBus: CommandBus,
    private readonly repository: WechatyRepository,
    private readonly weChatSettings: WeChatSettings,
  ) {}

  @Post('chatops/:roomId')
  async chatops (
    @Body() dto: ChatopsDto,
    @Param('roomId') roomId: undefined | string,
  ) {
    // console.info(dto)

    if (!roomId) {
      roomId = this.weChatSettings.rooms.chatops.friday
    }

    await this.commandBus.execute(
      new ChatopsCommand(roomId, dto.text),
    )

    return {
      status: 'ok',
    }
  }

  @Get()
  async dashboard (): Promise<string> {
    const wechatyList: WECHATY.impls.WechatyInterface[] = await this.repository.findAll()

    const FORM_HTML = `
      <form action="/chatops/123" method="post">
        <label for="chatops">ChatOps: </label>
        <input id="text_id" type="text" name="text" value="Hello, BOT5.">
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

    const htmlList = await Promise.all(
      wechatyList.map(wechaty => wechatyHtml(wechaty)),
    )
    const html = htmlList.join('\n<hr />\n')

    return html
  }

}
