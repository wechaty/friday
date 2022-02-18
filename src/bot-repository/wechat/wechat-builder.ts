import { getMemory }   from './get-memory.js'
import { setupFinis }  from './setup-finis.js'
import { getIoClient } from './get-io-client.js'
import { setHandlers } from './set-handlers.js'

import { Injectable } from '@nestjs/common'
import * as WECHATY from 'wechaty'
import { Brolog } from 'brolog'

import { PuppetService }  from 'wechaty-puppet-service'

import type { WeChatSettings } from '../../bot-settings/mod.js'
import { getPlugins } from './plugins/mod.js'

@Injectable()
class WeChatBuilder implements WECHATY.BuilderInterface {

  private token: string
  private name: string

  constructor (
    private log: Brolog,
    settings: WeChatSettings,
  ) {
    this.log.verbose('WeChatBuilder', 'constructor({name: %s, token: %s})',
      settings.name,
      settings.token,
    )

    this.name   = settings.name
    this.token  = settings.token
  }

  build () {
    this.log.verbose('WeChatBuilder', 'build()')

    const puppet = new PuppetService({
      token: this.token,
    })
    const memory = getMemory(this.name)

    const wechaty = WECHATY.WechatyBuilder.build({
      memory,
      name: this.name,
      puppet,
    })

    /**
     * Huan(202201) TODO: use FridayConfig for the hard coded environment variables
     */
    wechaty.use(getPlugins({}))

    setHandlers(wechaty)

    const ioClient = getIoClient(wechaty)

    /**
     * Io Client Hook
     */
    wechaty.on('start', () => ioClient.start())
    wechaty.on('stop',  () => ioClient.stop())

    /**
     * Finis Hook
     */
    setupFinis(wechaty)
      .catch(e => {
        this.log.error('getWechaty', 'setupFinis() rejection: %s', e)
      })

    return wechaty
  }

}

export { WeChatBuilder }
