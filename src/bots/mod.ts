import { getCeibs } from './ceibs/bot'
import { getWxWork } from './wxwork/bot'

// void getCeibs
// void getWxWork

const getBotList = () => [
  getCeibs('CEIBS.BOT'),
  getWxWork('WxWork.BOT'),
]

export { getBotList }
