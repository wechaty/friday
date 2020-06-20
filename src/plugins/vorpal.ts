import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import { CHATOPS_ROOM_ID } from '../id-config'

const hn = require('vorpal-hacker-news')

const config: WechatyVorpalConfig = {
  room: CHATOPS_ROOM_ID,
  use: [
    hn,
  ],
}

export const VorpalPlugin = WechatyVorpal(config)
