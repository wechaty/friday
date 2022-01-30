import { getMemory }   from './get-memory.js'
import { setupFinis }  from './setup-finis.js'
import { getIoClient } from './get-io-client.js'
import { setHandlers } from './set-handlers.js'

import { Injectable } from '@nestjs/common'
import * as WECHATY from 'wechaty'
import { Brolog } from 'brolog'

import { PuppetService }  from 'wechaty-puppet-service'

import type { FridayConfig } from '../../config/friday-config.js'
import { getPlugins } from './plugins/mod.js'

@Injectable()
class WeChatBuilder implements WECHATY.BuilderInterface {

  protected token: string
  protected name: string

  constructor (
    protected config: FridayConfig,
    protected log: Brolog,
  ) {
    this.log.verbose('WeChatBuilder', 'constructor({name: %s, token: %s})',
      config.wechat.name,
      config.wechat.token,
    )

    this.name   = config.wechat.name
    this.token  = config.wechat.token
  }

  build () {
    this.log.verbose('WeChatBuilder', 'build()')

    const token = this.token
    const name = this.name

    const puppet = new PuppetService({ token })
    const memory = getMemory(name)

    const wechaty = WECHATY.WechatyBuilder.build({
      memory,
      name,
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
