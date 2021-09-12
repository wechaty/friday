import { getCeibs } from './ceibs/bot.js'
import { getWxWork } from './wxwork/bot.js'
import { getHuanOa } from './huan-oa/bot.js'
import { getGitter } from './gitter/bot.js'

void getCeibs
void getWxWork
void getHuanOa

const getBots = () => ({
  ceibs  : getCeibs('CEIBS.BOT'),
  gitter : getGitter('Gitter'),
  oa     : getHuanOa('Huan.OA'),
  wxwork : getWxWork('WxWork.BOT'),
})

export { getBots }
