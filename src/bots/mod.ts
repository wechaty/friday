import { getCeibs } from './ceibs/bot'
import { getWxWork } from './wxwork/bot'
import { getHuanOa } from './huan-oa/bot'
import { getGitter } from './gitter/bot'

void getCeibs
void getWxWork

const getBots = () => ({
  ceibs  : getCeibs('CEIBS.BOT'),
  gitter : getGitter('Gitter'),
  oa     : getHuanOa('Huan.OA'),
  wxwork : getWxWork('WxWork.BOT'),
})

export { getBots }
