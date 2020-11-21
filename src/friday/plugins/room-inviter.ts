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
  MULTI_LANG_ROOM_ID,

  DEVELOPERS_ROOM_ID_CHINESE,
  DEVELOPERS_ROOM_ID_ENGLISH,
}                             from '../../database'

const repeat: talkers.ContactTalkerOptions = async (contact: Contact, room?: Room) => {
  await contact.say('You are already in our room: ' + await room?.topic())
}

const WECHATY_DEVELOPERS_ROOM_RULES = [
  'Thanks for asking me to invite you for joining the "Wechaty Developers\' Home" WeChat Room!',
  'Wechaty is a Conversational RPA for WeChat for connecting Chatbots in ease.',
  'You can find our documentation at https://wechaty.js.org',
  'Please introduce yourself after you join the room, cheers!',
]
const WECHATY_DEVELOPERS_ROOM_WELCOME = [
  ", welcome to join the Wechaty Python/Go/Java Developer's Home! Please go ahead to introduce yourself to the group.",
]

const WECHATY_DEVELOPERS_ROOM_RULES_CHINESE = [
  '欢迎你加入 "Wechaty Developers\' Home" 微信群！',
  'Wechaty 可以帮助你用 7 行代码接入聊天软件的实现自动化，',
  '官网 https://wechaty.js.org 可以查看新闻、博客和文档资料。',
  '请你在加入微信群后进行自我介绍，谢谢！',
]

const wechatyConfig: RoomInviterConfig = {
  password : [
    /^wechaty$/i,
    /^plugin$/i,
  ],
  repeat,
  room: DEVELOPERS_ROOM_ID_LIST,
  rule: WECHATY_DEVELOPERS_ROOM_RULES,
  welcome: WECHATY_DEVELOPERS_ROOM_WELCOME,
}

const wechatyNonTsConfig: RoomInviterConfig = {
  password : [
    /^(python|go|java|scala|php|dotnet) wechaty$/i,
    /^(python|go|java|scala|php|dotnet)$/i,
  ],
  repeat,
  room: MULTI_LANG_ROOM_ID,
  rule: WECHATY_DEVELOPERS_ROOM_RULES,
  welcome: WECHATY_DEVELOPERS_ROOM_WELCOME,
}

const wechatyChineseConfig: RoomInviterConfig = {
  password : [
    /^wechaty chinese$/i,
    /^wechaty 中文$/i,
  ],
  repeat,
  room: DEVELOPERS_ROOM_ID_CHINESE,
  rule: WECHATY_DEVELOPERS_ROOM_RULES_CHINESE,
  welcome: [
    '，欢迎你加入 Wechaty 中文开发者微信群！请发送一个简短的自我介绍向群友们做个介绍，谢谢！',
  ],
}

const wechatyEnglishConfig: RoomInviterConfig = {
  password : [
    /^wechaty english$/i,
  ],
  repeat,
  room: DEVELOPERS_ROOM_ID_ENGLISH,
  rule: WECHATY_DEVELOPERS_ROOM_RULES,
  welcome: WECHATY_DEVELOPERS_ROOM_WELCOME,
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

const AidogRoomInviter          = RoomInviter(aidogConfig)
const Bot5RoomInviter           = RoomInviter(bot5Config)
const WechatyChineseRoomInviter = RoomInviter(wechatyChineseConfig)
const WechatyEnglishRoomInviter = RoomInviter(wechatyEnglishConfig)
const WechatyNonTsRoomInviter   = RoomInviter(wechatyNonTsConfig)
const WechatyRoomInviter        = RoomInviter(wechatyConfig)

export {
  AidogRoomInviter,
  Bot5RoomInviter,
  WechatyChineseRoomInviter,
  WechatyEnglishRoomInviter,
  WechatyNonTsRoomInviter,
  WechatyRoomInviter,
}
