import * as wechat from './wechat/mod.js'
import * as oicq from './oicq/mod.js'
import * as gitter from './gitter/mod.js'

class FridayConfig {

  wechat = wechat
  oicq = oicq
  gitter = gitter

  constructor () {}

}

export {
  FridayConfig,
}
