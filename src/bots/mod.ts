import { getCeibs } from './ceibs/bot'
import { getWxWork } from './wxwork/bot'

const getBotList = () => [
  getCeibs('CEIBS.BOT'),
  getWxWork('WxWork.BOT'),
]

export { getBotList }
