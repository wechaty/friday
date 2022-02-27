import {
  Heartbeat,
}                   from 'wechaty-plugin-contrib'

const getHeartbeatPlugin = (
  heartbeatRoomId: string,
) => Heartbeat({
  emoji: {
    heartbeat : '[爱心]',
    login     : '[太阳]',
    logout    : '[月亮]',
    ready     : '[拳头]',
  },
  intervalSeconds: 60 * 60,       // 1 hour
  room: heartbeatRoomId,
})

export {
  getHeartbeatPlugin,
}
