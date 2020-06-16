import {
  Heartbeat,
  HeartbeatConfig,
}                   from 'wechaty-plugin-contrib'

import {
  HEARTBEAT_ROOM_ID,
}                         from '../id-config'

const config: HeartbeatConfig = {
  emoji: {
    heartbeat : '[爱心]',
    login     : '[太阳]',
    logout    : '[月亮]',
    ready     : '[拳头]',
  },
  intervalSeconds: 60 * 60,       // 1 hour
  room: HEARTBEAT_ROOM_ID,
}

export const HeartbeatPlugin = Heartbeat(config)
