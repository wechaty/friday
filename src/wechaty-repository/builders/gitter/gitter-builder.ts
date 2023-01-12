import { Injectable }       from '@nestjs/common'
import { WechatyBuilder }   from 'wechaty'
import { Brolog }           from 'brolog'
import { PuppetGitter }     from 'wechaty-puppet-gitter'

import { GitterSettings } from '../../../wechaty-settings/mod.js'

import type { Builder } from '../builder.js'

import { getPlugins } from './plugins/mod.js'

@Injectable()
class GitterBuilder implements Builder {

  constructor (
    private readonly log: Brolog,
    public readonly settings: GitterSettings,
  ) {
    this.log.verbose('GitterBuilder', 'constructor({name: %s, token: %s})',
      settings.name,
      settings.token,
    )
  }

  build () {
    this.log.verbose('GitterBuilder', 'build()')

    const puppet = new PuppetGitter({
      token: this.settings.token,
    })

    const wechaty = WechatyBuilder.build({
      name: this.settings.name,
      puppet,
    })

    wechaty.use(getPlugins())

    return wechaty
  }

}

export {
  GitterBuilder,
}
