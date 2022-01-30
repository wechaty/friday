import { Injectable } from '@nestjs/common'
import * as WECHATY from 'wechaty'
import { Brolog } from 'brolog'
import { PuppetService } from 'wechaty-puppet-service'

import type { FridaySetting } from '../../setting/friday-setting.js'
import { getPlugins } from './plugins/mod.js'

@Injectable()
class WXWorkBuilder implements WECHATY.BuilderInterface {

  protected name: string
  protected token: string
  protected heartbeatRoom: string
  protected chatOpsRoom: string

  constructor (
    protected config: FridaySetting,
    protected log: Brolog,
  ) {
    this.log.verbose('WXWorkBuilder', 'constructor(%s, %s)',
      config.wxwork.name,
      config.wxwork.token,
    )

    this.name = config.wxwork.name
    this.token = config.wxwork.token
    this.heartbeatRoom = config.wxwork.heartbeatRoomId
    this.chatOpsRoom = config.wxwork.chatOpsRoomId
  }

  build () {
    this.log.verbose('WXWorkBuilder', 'build()')

    const token = this.token
    const name = this.name

    const puppet = new PuppetService({
      token,
    })

    const wechaty = WECHATY.WechatyBuilder.build({
      name,
      puppet,
    })

    wechaty.use(getPlugins({
      chatOpsRoomId: this.chatOpsRoom,
      heartbeatRoomId: this.heartbeatRoom,
    }))

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
