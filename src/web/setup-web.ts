import * as http from 'http'

import express from 'express'

import {
  Wechaty,
  log,
}                   from 'wechaty'
import {
  wrapAsyncError,
}                   from 'gerror'

import {
  VERSION,
}             from '../config.js'

type Stopper = () => void

const wechatySet = new Set<Wechaty>()

function addWechaty (
  wechaty: Wechaty,
): void {
  wechatySet.add(wechaty)
}

const FORM_HTML = `
<form action="/chatops/" method="post">
  <label for="chatops">ChatOps: </label>
  <input id="chatops" type="text" name="chatops" value="Hello, BOT5.">
  <input type="submit" value="ChatOps">
</form>
`

const wechatyHtml = async (wechaty: Wechaty): Promise<string> => {

  let html = `<h1>BOT5 v${VERSION} ${wechaty} v${wechaty.version()}</h1>`

  if (wechaty.authQrCode) {
    html += [
      'Scan QR Code: <br />',
      wechaty.authQrCode + '<br />',
      '<a href="http://goqr.me/" target="_blank">http://goqr.me/</a><br />',
      '\n\n',
      '<image src="',
      'https://api.qrserver.com/v1/create-qr-code/?data=',
      encodeURIComponent(wechaty.authQrCode),
      '">',
    ].join('')

  } else if (wechaty.logonoff()) {
    const roomList = await wechaty.Room.findAll()
    let roomHtml = 'The rooms I have joined are as follows: <ol>'
    for (const room of roomList) {
      const topic = await room.topic()
      const roomId = room.id
      roomHtml = roomHtml + `<li> ${topic} / ${roomId} </li>\n`
    }
    roomHtml = roomHtml + '</ol>'

    html += [
      `<p> User ${wechaty.currentUser()} logged in. </p>`,
      FORM_HTML,
      `<div>${roomHtml}</div>`,
    ].join('')

  } else {

    html += "Hello, I'm currently not logged in, but I have no auth qr code to show for you. Please come back later."

  }

  return html
}

const rootHandlerAsync = async (req: express.Request, res: express.Response) => {
  log.verbose('Web', 'setup-web rootHandlerAsync({path: %s})', req.path)

  log.verbose('Web', 'setup-web rootHandlerAsync() wechaty count: %s, %s',
    wechatySet.size,
    [...wechatySet].map(String).join(', '),
  )

  const htmlList = await Promise.all(
    [...wechatySet].map(wechatyHtml),
  )

  const html = htmlList.join('\n<hr />\n')

  res.end(html)
}

const rootHandler = wrapAsyncError(console.error)(rootHandlerAsync)

function startWeb (
  port    : number,
): Stopper {
  log.verbose('startWeb', 'startWeb()')

  const app =  express()

  app.get('/', rootHandler)

  const server = http
    .createServer(app)
    .listen(port, () => {
      log.info('startWeb', 'startWeb() listening to http://localhost:%d', (server.address() as { port: number }).port)
    })

  return () => server.close()
}

export {
  startWeb,
  addWechaty,
}
