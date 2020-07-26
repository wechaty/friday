import {
  Contact,
  Room,
}                       from 'wechaty'
import {
  RoomInviter,
  RoomInviterConfig,
  talkers,
}                       from 'wechaty-plugin-contrib'

import {
  DEVELOPERS_ROOM_ID_LIST,
}                           from '../database'

const repeat: talkers.ContactTalkerOptions = async (contact: Contact, room?: Room) => {
  await contact.say('You are already in our room: ' + await room?.topic())
}

const wechatyConfig: RoomInviterConfig = {
  password : [
    /^wechaty$/i,
    /^plugin$/i,
  ],
  repeat,
  room: DEVELOPERS_ROOM_ID_LIST,
  rule: [
    'Thanks for asking me to invite you for joining the "Wechaty Developers\' Home" WeChat Room!',
    'Wechaty is a Conversational RPA for WeChat for connecting Chatbots in ease.',
    'You can find our documentation at https://wechaty.js.org',
    'Please introduce yourself after you join the room, cheers!',
  ],
  welcome: 'is joining us as a new Wechaty developer! Welcome, and please introduce yourself to the community!',
}

const wechatyNonTsConfig: RoomInviterConfig = {
  password : [
    /^(python|go|java|scala|php|dotnet) wechaty$/i,
    /^(python|go|java|scala|php|dotnet)$/i,
  ],
  repeat,
  room: '19367909379@chatroom',
  rule: [
    'Thanks for asking me to invite you for joining the "Wechaty Python/Go/Java Developers\' Home" WeChat Room!',
    'Python/Go/Java/Scala/PHP/.NET(C#) Wechaty are all in early stage, please help the project by submitting issues and sending pull requests.',
    'If you have any idea about the feature requests, questions, and document, please let us know.',
    'Related issue: https://github.com/wechaty/wechaty/issues/1927',
    'Please introduce yourself after you join the room, cheers!',
  ],
  welcome: [
    ", welcome to join the Wechaty Python/Go/Java Developer's Home! Please go ahead to introduce yourself to the group.",
  ],
}

const aidogConfig: RoomInviterConfig = {
  password: [
    /^aidog$/i,
  ],
  repeat,
  room: /^Youth fed the 5th dog$/i,
  welcome: '禁止在本群测试机器人。 注意：老群已满，此群为AiDog第五个新群',
}

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

const WechatyNonTsRoomInviter = RoomInviter(wechatyNonTsConfig)
const WechatyRoomInviter      = RoomInviter(wechatyConfig)
const AidogRoomInviter        = RoomInviter(aidogConfig)
const Bot5RoomInviter         = RoomInviter(bot5Config)

export {
  WechatyNonTsRoomInviter,
  WechatyRoomInviter,
  AidogRoomInviter,
  Bot5RoomInviter,
}
