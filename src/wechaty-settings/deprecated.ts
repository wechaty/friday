import { log } from 'wechaty-puppet'
import {
  WeChatSettings,
  WxWorkSettings,
  EnvVar,
}                   from './mod.js'

const envVar = new EnvVar()

/**
 * Huan(202201): This is a temporary solution to pass config
 *              to the plugins.
 *             It should be removed once we can use injection.
 * @deprecated: use injection in the future
 */
const botSettings = {
  weChat: new WeChatSettings(log, envVar),
  wxWork: new WxWorkSettings(log, envVar),
}

// const HEARTBEAT_ROOM_ID = '17376996519@chatroom'  // WeChat: ChatOps - Heartbeat 💖
/**
 * @deprecated: use injection in the future
 */
const HEARTBEAT_ROOM_ID = '24980472405@chatroom'  // ChatOps - Heartbeat' MIX 💖

/**
 * @deprecated: use injection in the future
 */
const MIKE_CONTACT_ID  = 'wxid_a8d806dzznm822'   // Mike BO
// const DDR2_CHATOPS_ROOM_WXWORK_ID = 'R:10696051757177702'  // ChatOps with wxwork - DDR

/**
 * @deprecated: use injection in the future
 */
const MIXED_HEARTBEAT_ROOM_ID = '9223372041384873513@im.chatroom'  // ChatOps - Heartbeat 💖

/**
 * @deprecated: use injection in the future
 */
const MIXED_FRIDAY_ROOM_ID    = '9223372041407373043@im.chatroom'  // ChatOps - Friday

export {
  HEARTBEAT_ROOM_ID,

  MIKE_CONTACT_ID,

  MIXED_FRIDAY_ROOM_ID,
  MIXED_HEARTBEAT_ROOM_ID,
  botSettings,
}
