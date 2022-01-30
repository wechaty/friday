import * as envVar from 'env-var'

import * as wechatyUserGroup    from './polyglot-wechaty-user-group.js'
import * as wechatyDevelopers   from './wechaty-developers.js'
import * as bot5Club            from './bot5.js'
import * as chatops             from './chatops.js'

const name = 'friday@wechat'

const token = envVar
  .get('WECHATY_PUPPET_SERVICE_TOKEN')
  .required(true)
  .asString()

export {
  name,
  token,
  chatops,
  wechatyUserGroup,
  wechatyDevelopers,
  bot5Club,
}
