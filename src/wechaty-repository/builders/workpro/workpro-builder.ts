import { Injectable } from '@nestjs/common'
import * as WECHATY from 'wechaty'
import { Brolog } from 'brolog'
import { PuppetService } from 'wechaty-puppet-service'

import { WorkProSettings } from '../../../wechaty-settings/mod.js'

import { getPlugins } from './plugins/mod.js'
import type { Builder } from '../builder.js'
import { setHandlers } from './set-handlers.js'

@Injectable()
class WorkProBuilder implements Builder {

  constructor (
    private readonly log: Brolog,
    public readonly settings: WorkProSettings,
  ) {
    this.log.verbose('WorkProBuilder', 'constructor(%s, %s)',
      settings.name,
      settings.token,
    )
  }

  build () {
    this.log.verbose('WorkProBuilder', 'build()')

    const puppet = new PuppetService({
      /**
       * Huan(20220228): workaround for disable TLS temporary for upgrade from Juzi.BOT
       */
      tls: {
        disable: true,
      },
      token: this.settings.token,
    })

    const wechaty = WECHATY.WechatyBuilder.build({
      name: this.settings.name,
      puppet,
    })

    wechaty.use(getPlugins(this.settings))
    setHandlers(wechaty, this.settings)

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

export { WorkProBuilder }
