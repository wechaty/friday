import {
  Heartbeat,
  HeartbeatConfig,
}                   from 'wechaty-plugin-contrib'
import type { WeChatSettings } from '../../../../wechaty-settings/mod.js'

const getHeartbeatPlugin = (settings: WeChatSettings) => {
  const config: HeartbeatConfig = {
    emoji: {
      heartbeat : '[爱心]',
      login     : '[太阳]',
      logout    : '[月亮]',
      ready     : '[拳头]',
    },
    intervalSeconds: 60 * 60,       // 1 hour
    room: settings.rooms.chatops.heartbeat,
  }

  const HeartbeatPlugin = Heartbeat(config)
  return HeartbeatPlugin
}

export {
  getHeartbeatPlugin,
}
