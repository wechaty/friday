import { getCeibs } from './ceibs/bot'
import { getWxWork } from './wxwork/bot'
import { getHuanOa } from './huan-oa/bot'

void getCeibs
void getWxWork

const getBotList = () => [
  getCeibs('CEIBS.BOT'),
  getWxWork('WxWork.BOT'),
  getHuanOa('Huan.OA'),
]

export { getBotList }
