import { Injectable } from '@nestjs/common'
import * as WECHATY from 'wechaty'
import type { Logger } from 'brolog'
import { PuppetService } from 'wechaty-puppet-service'

import type { WxWorkSettings } from '../../settings/mod.js'
import { getPlugins } from './plugins/mod.js'

@Injectable()
class WXWorkBuilder implements WECHATY.BuilderInterface {

  private name: string
  private token: string

  constructor (
    private log: Logger,
    private settings: WxWorkSettings,
  ) {
    this.log.verbose('WXWorkBuilder', 'constructor(%s, %s)',
      settings.name,
      settings.token,
    )

    this.name = settings.name
    this.token = settings.token
  }

  build () {
    this.log.verbose('WXWorkBuilder', 'build()')

    const puppet = new PuppetService({
      token: this.token,
    })

    const wechaty = WECHATY.WechatyBuilder.build({
      name: this.name,
      puppet,
    })

    wechaty.use(getPlugins(this.settings))

    return wechaty
  }

}

/**
 * Huan(20201201): Wechaty Developers' Home 9
 *  R:10696051635011175
 */

// const oaTestChatOps = async (message: Message) => {
//   if (!workBot) { return }

//   const ROOM_ID = 'R:10696051746184005' // ChatOps - OA
//   const room = await workBot.Room.find({ id: ROOM_ID })
//   if (!room) {
//     throw new Error('Room id: ' + ROOM_ID + ' not found')
//   }
//   await room.say(message.toString())
// }

export { WXWorkBuilder }
