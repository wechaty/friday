import {
  Wechaty,
}                   from 'wechaty'

import {
  log,
}               from './config'

import {
  chatops,
}             from './chatops'

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

  const heartbeat = async () => {
    await chatops(wechaty, `I'm alive!`)
  }

  const ONE_HOUR = 60 * 60 * 1000
  setInterval(heartbeat, ONE_HOUR)
}
