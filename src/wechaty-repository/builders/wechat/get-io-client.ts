import {
  Wechaty,
  log,
  IoClient,
}                   from 'wechaty'
import type {
  IoClientOptions,
}                   from 'wechaty/dist/esm/src/io-client.js'

import type { WeChatSettings }  from '../../../wechaty-settings/mod'

function getIoClient (
  wechaty: Wechaty,
  settings: WeChatSettings,
) {
  log.verbose('getWechaty', 'getIoClient(%s)', wechaty)

  const token = settings.wechatyToken
  const port  = settings.wechatyPuppetServerPort

  if (!port) {
    throw new Error('port not found: please set WECHATY_PUPPET_SERVER_PORT in environment before start')
  }

  const options: IoClientOptions = {
    port,
    token,
    wechaty,
  }

  const client = new IoClient(options)

  return client
}

export { getIoClient }
