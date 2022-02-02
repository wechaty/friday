import * as envVar from 'env-var'
import type { Brolog } from 'brolog'

import type { NamedSetting } from '../named-setting.js'

import * as wechatyUserGroup    from './polyglot-wechaty-user-group.js'
import * as wechatyDevelopers   from './wechaty-developers.js'
import * as bot5Club            from './bot5.js'
import * as chatops             from './chatops.js'

class WeChatSettings implements NamedSetting {

  constructor (
    protected log: Brolog,

    public name = 'friday@wechat',

    public token = envVar
      .get('WECHATY_PUPPET_SERVICE_TOKEN')
      .required(true)
      .asString(),

    public rooms = {
      bot5Club,
      chatops,
      wechatyDevelopers,
      wechatyUserGroup,
    },

  ) {
    this.log.verbose('WeChatSettings', 'constructor(%s) token=%s', this.name, token)
  }

}

export {
  WeChatSettings,
}
