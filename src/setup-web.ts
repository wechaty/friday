import http from 'http'

import express from 'express'

import {
  Wechaty,
}                   from 'wechaty'

import {
  log,
  PORT,
  VERSION,
}             from './config'

import { getWechaty } from './get-wechaty'
import { CHATOPS_ROOM_ID } from './rooms-config'

async function chatopsHandler (request: express.Request, response: express.Response) {
  log.info('startWeb', 'chatopsHandler()')

  const payload: {
    chatops: string,
  } = request.params as any

  await getWechaty('friday').Room.load(CHATOPS_ROOM_ID).say(payload.chatops)

  return response.redirect('/')
}

export async function setupWeb (bot: Wechaty): Promise<void> {
  log.verbose('startWeb', 'startWeb(%s)', bot)

  let qrcodeValue : undefined | string
  let userName    : undefined | string

  const app =  express()

  const FORM_HTML = `
    <form action="/chatops/" method="post">
      <label for="chatops">ChatOps: </label>
      <input id="chatops" type="text" name="chatops" value="Hello, BOT5.">
      <input type="submit" value="ChatOps">
    </form>
  `
  const rootHandler = async (_req: express.Request, res: express.Response) => {
    let html

    if (qrcodeValue) {

      html = [
        `<h1>BOT5 v${VERSION}</h1>`,
        'Scan QR Code: <br />',
        qrcodeValue + '<br />',
        '<a href="http://goqr.me/" target="_blank">http://goqr.me/</a><br />',
        '\n\n',
        '<image src="',
        'https://api.qrserver.com/v1/create-qr-code/?data=',
        encodeURIComponent(qrcodeValue),
        '">',
      ].join('')

    } else if (userName) {
      let roomList = await bot.Room.findAll()
      let roomHtml = `The rooms I have joined are as follows: <ol>`
      for (let room of roomList) {
        const topic = await room.topic()
        const roomId = room.id
        roomHtml = roomHtml + `<li> ${topic} / ${roomId} </li>\n`
      }
      roomHtml = roomHtml + `</ol>`

      html = [
        `<p> BOT5 v${VERSION} User ${userName} logined. </p>`,
        FORM_HTML,
        roomHtml,
      ].join('')

    } else {

      html = `BOT5 v${VERSION} Hello, come back later please.`

    }
    res.end(html)
  }

  app.get('/', rootHandler)
  app.get('/chatops/', chatopsHandler)

  bot.on('scan', qrcode => {
    qrcodeValue = qrcode
    userName    = undefined
  })
  bot.on('login', user => {
    qrcodeValue = undefined
    userName    = user.name()
  })
  bot.on('logout', () => {
    userName = undefined
  })

  http.createServer(app).listen(PORT)

  log.info('startWeb', 'startWeb() listening to http://localhost:%d', PORT)
}
