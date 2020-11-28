import {
  RoomInviter,
  RoomInviterConfig,
}                       from 'wechaty-plugin-contrib'

const bot5Config: RoomInviterConfig = {
  password: [
    /^bot5$/i,
    /^BotFriday$/i,
    /^friday$/i,
  ],
  room: /^Bot Friday Open Forum - BFOF$/i,
  rule: [
    "I'm trying to invite you into Bot5, please read the manual first: https://www.bot5.club/manuals/newcomer",
  ],
  welcome: [
    'Welcome to join us!',
  ],
}

const Bot5RoomInviter = RoomInviter(bot5Config)

export {
  Bot5RoomInviter,
}
