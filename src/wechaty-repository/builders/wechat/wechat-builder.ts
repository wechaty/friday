import { getMemory }   from './get-memory.js'
import { getSetupFinis }  from './setup-finis.js'
import { getIoClient } from './get-io-client.js'
import { setHandlers } from './set-handlers.js'

import { Injectable } from '@nestjs/common'
import * as WECHATY from 'wechaty'
import { Brolog } from 'brolog'

import { PuppetService }  from 'wechaty-puppet-service'

import {
  WeChatSettings,
  EnvVar,
}                     from '../../../wechaty-settings/mod.js'

import { getPlugins } from './plugins/mod.js'

@Injectable()
class WeChatBuilder implements WECHATY.BuilderInterface {

  private token: string
  private name: string

  disabled: boolean

  constructor (
    private readonly log: Brolog,
    private envVar: EnvVar,
    private settings: WeChatSettings,
  ) {
    this.log.verbose('WeChatBuilder', 'constructor({name: %s, token: %s}) %s',
      settings.name,
      settings.wechatyPuppetToken,
      settings.disabled ? 'DISABLED' : '',
    )

    this.disabled = settings.disabled
    this.name     = settings.name
    this.token    = settings.wechatyPuppetToken
  }

  build () {
    this.log.verbose('WeChatBuilder', 'build()')

    const memory = getMemory(this.name, this.envVar)

    const wechaty = WECHATY.WechatyBuilder.build({
      memory,
      name: this.name,
      puppet: this.settings.wechatyPuppet as any,
      puppetOptions: {
        endpoint : this.settings.wechatyPuppetEndpoint,
        token    : this.settings.wechatyPuppetToken,
      },
    })

    /**
     * Huan(202201) TODO: use FridayConfig for the hard coded environment variables
     */
    wechaty.use(getPlugins(this.settings))

    setHandlers(wechaty, this.settings)

    const ioClient = getIoClient(wechaty, this.settings)

    /**
     * Io Client Hook
     */
    wechaty.on('start', () => ioClient.start())
    wechaty.on('stop',  () => ioClient.stop())

    /**
     * Finis Hook
     */
    const setupFinis = getSetupFinis(this.settings)
    setupFinis(wechaty)
      .catch(e => {
        this.log.error('getWechaty', 'setupFinis() rejection: %s', e)
      })

    return wechaty
  }

}

export { WeChatBuilder }
