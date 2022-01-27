import { getCeibs }   from './ceibs/bot.js'
import { getWxWork }  from './wxwork/bot.js'
import { getHuanOa }  from './huan-oa/bot.js'
import { getGitter }  from './gitter/bot.js'
import { getQQ }      from './qq/bot.js'
import { getWhatsapp } from './whatsapp/bot.js'

void getCeibs
void getWxWork
void getHuanOa

const getBots = () => ({
  ceibs  : getCeibs('CEIBS.BOT'),
  gitter : getGitter('Gitter'),
  /**
   * Huan(202109):
   *  1. OA has a flash-store conflict issue
   *  2. wxwork is non-TLS
   */
  oa: getHuanOa('Huan.OA'),
  // wxwork : getWxWork('WxWork.BOT'),
  qq: getQQ('QQ'),
  whatsapp: getWhatsapp('Whatsapp'),
})

export { getBots }
