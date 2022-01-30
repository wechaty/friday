import * as wechat from './wechat/mod.js'
import * as oicq from './oicq/mod.js'
import * as gitter from './gitter/mod.js'
import * as oa from './oa/mod.js'
import * as whatsapp from './whatsapp/mod.js'
import * as wxwork from './wxwork/mod.js'

class FridayConfig {

  wechat = wechat
  oicq = oicq
  oa = oa
  gitter = gitter
  whatsapp = whatsapp
  wxwork = wxwork

  constructor () {}

}

export {
  FridayConfig,
}
