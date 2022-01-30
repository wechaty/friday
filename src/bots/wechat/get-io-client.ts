import {
  Wechaty,
  log,
  IoClient,
}                 from 'wechaty'
import type {
  IoClientOptions,
}                   from 'wechaty/dist/esm/src/io-client.js'

function getIoClient (wechaty: Wechaty) {
  log.verbose('getWechaty', 'getIoClient(%s)', wechaty)

  const token = process.env['WECHATY_TOKEN']
  if (!token) {
    throw new Error('token not found: please set WECHATY_TOKEN in environment before start')
  }

  const port = parseInt(process.env['WECHATY_PUPPET_SERVER_PORT'] || '0')
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
