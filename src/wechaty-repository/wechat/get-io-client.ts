import {
  Wechaty,
  log,
  IoClient,
}                 from 'wechaty'
import envVar from 'env-var'
import type {
  IoClientOptions,
}                   from 'wechaty/dist/esm/src/io-client.js'

function getIoClient (wechaty: Wechaty) {
  log.verbose('getWechaty', 'getIoClient(%s)', wechaty)

  const token = envVar
    .get('WECHATY_TOKEN')
    .asString()

  if (!token) {
    throw new Error('token not found: please set WECHATY_TOKEN in environment before start')
  }

  const port = envVar.get('WECHATY_PUPPET_SERVER_PORT')
    .default(0)
    .asPortNumber()

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
