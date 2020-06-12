import {
  EventHotHandler,
  EventHotHandlerConfig,
}                           from 'wechaty-plugin-contrib'

const config: EventHotHandlerConfig = {
  'error'       : './handlers/on-error',
  'friendship'  : './handlers/on-friendship',
  'login'       : './handlers/on-login',
  'logout'      : './handlers/on-logout',
  'message'     : './handlers/on-message',
  'room-invite' : './handlers/on-room-invite',
  'room-join'   : './handlers/on-room-join',
  'room-leave'  : './handlers/on-room-leave',
  'room-topic'  : './handlers/on-room-topic',
  'scan'        : './handlers/on-scan',
}

export const EventHotHandlerPlugin = EventHotHandler(config)
