import {
  Heartbeat,
  HeartbeatConfig,
}                   from 'wechaty-plugin-contrib'

import {
  MIXED_HEARTBEAT_ROOM_WXWORK_ID,
}                                   from '../../../database'

const config: HeartbeatConfig = {
  emoji: {
    heartbeat : '[爱心]',
    login     : '[太阳]',
    logout    : '[月亮]',
    ready     : '[拳头]',
  },
  intervalSeconds: 60 * 60,       // 1 hour
  room: MIXED_HEARTBEAT_ROOM_WXWORK_ID,
}

export const HeartbeatPlugin = Heartbeat(config)
