import { getMemory }   from './get-memory.js'
// import { getIoClient } from './get-io-client.js'
import { setHandlers } from './set-handlers.js'

import { Injectable } from '@nestjs/common'
import * as WECHATY from 'wechaty'
import { Brolog } from 'brolog'

import { WeChatSettings } from '../../../wechaty-settings/mod.js'
import { EnvVar }         from '../../../infrastructures/mod.js'

import { getPlugins } from './plugins/mod.js'
import type { Builder } from '../builder.js'

@Injectable()
class WeChatBuilder implements Builder {

  constructor (
    private readonly log: Brolog,
    private envVar: EnvVar,
    public settings: WeChatSettings,
  ) {
    this.log.verbose('WeChatBuilder', 'constructor({name: %s, token: %s})',
      settings.name,
      settings.wechatyPuppetToken,
    )
  }

  build () {
    this.log.verbose('WeChatBuilder', 'build()')

    const memory = getMemory(this.settings.name, this.envVar)

    const wechaty = WECHATY.WechatyBuilder.build({
      memory,
      name: this.settings.name,
      puppet: this.settings.wechatyPuppet as any,
      puppetOptions: {
        // endpoint : this.settings.wechatyPuppetEndpoint,
        token    : this.settings.wechatyPuppetToken,
      },
    })

    /**
     * Huan(202201) TODO: use FridayConfig for the hard coded environment variables
     */
    wechaty.use(getPlugins(this.settings))

    setHandlers(wechaty, this.settings)

    // const ioClient = getIoClient(wechaty, this.settings)

    // /**
    //  * Io Client Hook
    //  */
    // wechaty.on('start', () => wechaty.wrapAsync(ioClient.start()))
    // wechaty.on('stop',  () => wechaty.wrapAsync(ioClient.stop()))

    return wechaty
  }

}

export { WeChatBuilder }
