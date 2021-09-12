import {
  Heartbeat,
  HeartbeatConfig,
}                   from 'wechaty-plugin-contrib'

import {
  WXWORK_HEARTBEAT_ROOM_ID,
}                                   from '../../../database.js'

const config: HeartbeatConfig = {
  emoji: {
    heartbeat : '[爱心]',
    login     : '[太阳]',
    logout    : '[月亮]',
    ready     : '[拳头]',
  },
  intervalSeconds: 60 * 60,       // 1 hour
  room: WXWORK_HEARTBEAT_ROOM_ID,
}

export const HeartbeatPlugin = Heartbeat(config)
