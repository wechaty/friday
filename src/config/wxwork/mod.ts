import * as envVar from 'env-var'

const token = envVar
  .get('WECHATY_PUPPET_SERVICE_TOKEN_WXWORK')
  .required(true)
  .asString()

const name = 'friday@wxwork'

const heartbeatRoomId = 'R:10696051718181051'  // ChatOps - Heartbeat 💖
const chatOpsRoomId   = 'R:10696051757179651'  // 'R:3057039320'  // ChatOps - WXWork

export {
  name,
  token,
  heartbeatRoomId,
  chatOpsRoomId,
}
