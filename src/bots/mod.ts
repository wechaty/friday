import { getCeibs } from './ceibs/bot'
import { getWxWork } from './wxwork/bot'

void getCeibs

const getBotList = () => [
  getCeibs('CEIBS.BOT'),
  getWxWork('WxWork.BOT'),
]

export { getBotList }
