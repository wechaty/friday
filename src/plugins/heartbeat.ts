import {
  Heartbeat,
  HeartbeatConfig,
}                   from 'wechaty-plugin-contrib'

const room = '17376996519@chatroom' // 'ChatOps - Heartbeat'

const config: HeartbeatConfig = {
  emoji: {
    heartbeat : '[爱心]',
    login     : '[太阳]',
    logout    : '[月亮]',
    ready     : '[拳头]',
  },
  intervalSeconds: 60 * 60,       // 1 hour
  room,
}

export const HeartbeatPlugin = Heartbeat(config)
