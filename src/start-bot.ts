import {
  Wechaty,
}                   from 'wechaty'

import {
  log,
}               from './config'

import {
  Chatops,
}             from './chatops'

import {
  crontab,
}             from './plugins'

export async function startBot (wechaty: Wechaty): Promise<void> {
  log.verbose('startBot', 'startBot(%s)', wechaty)

  wechaty
    .on('scan',         './handlers/on-scan')
    .on('error',        './handlers/on-error')
    .on('friendship',   './handlers/on-friendship')
    .on('logout',       './handlers/on-logout')
    .on('login',        './handlers/on-login')
    .on('message',      './handlers/on-message')
    .on('room-topic',   './handlers/on-room-topic')
    .on('room-invite',  './handlers/on-room-invite')
    .on('room-join',    './handlers/on-room-join')
    .on('room-leave',   './handlers/on-room-leave')

  const heartbeat = (emoji: string) => {
    return () => Chatops.instance().heartbeat(emoji)
  }
  const ONE_HOUR = 60 * 60 * 1000
  setInterval(heartbeat('[爱心]'), ONE_HOUR)
  wechaty.on('login', heartbeat(`[太阳] ${wechaty.name()}`))
  wechaty.on('ready', heartbeat(`[拳头] ${wechaty.name()}`))
  wechaty.on('logout', heartbeat(`[月亮] ${wechaty.name()}`))

  await crontab()
}
