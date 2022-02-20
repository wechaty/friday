import {
  Heartbeat,
  HeartbeatConfig,
}                   from 'wechaty-plugin-contrib'

import { botSettings } from '../../../wechaty-settings/deprecated.js'

const config: HeartbeatConfig = {
  emoji: {
    heartbeat : '[爱心]',
    login     : '[太阳]',
    logout    : '[月亮]',
    ready     : '[拳头]',
  },
  intervalSeconds: 60 * 60,       // 1 hour
  room: botSettings.weChat.rooms.chatops.heartbeat,
}

export const HeartbeatPlugin = Heartbeat(config)
