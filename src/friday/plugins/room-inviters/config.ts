import {
  Contact,
  Room,
}                     from 'wechaty'
import {
  talkers,
}                     from 'wechaty-plugin-contrib'

const repeat: talkers.ContactTalkerOptions = async (contact: Contact, room?: Room) => {
  await contact.say('You are already in our room: ' + await room?.topic())
}

const WECHATY_DEVELOPERS_ROOM_RULES = [
  'Thanks for asking me to invite you for joining the "Wechaty Developers\' Home" WeChat Room!',
  'Wechaty is a Conversational SDK for chatbot makers.',
  'You can find our documentation at https://wechaty.js.org/docs/, and all archived discussions on https://gitter.im/wechaty/wechaty',
  'Please introduce yourself after you join the room, cheers!',
]
const WECHATY_DEVELOPERS_ROOM_WELCOME = [
  ", welcome to join the Wechaty Python/Go/Java/PHP/.Net/Scala/Rust Developer's Home! Please go ahead to introduce yourself to the group.",
]

const WECHATY_DEVELOPERS_ROOM_RULES_CHINESE = [
  '欢迎你加入 "Wechaty Developers\' Home" 微信群！',
  'Wechaty 可以帮助你用 7 行代码接入聊天软件的实现自动化，',
  '官网 https://wechaty.js.org 可以查看新闻、博客和文档资料。',
  '请你在加入微信群后进行自我介绍，谢谢！',
]

export {
  WECHATY_DEVELOPERS_ROOM_RULES,
  WECHATY_DEVELOPERS_ROOM_RULES_CHINESE,
  WECHATY_DEVELOPERS_ROOM_WELCOME,
  repeat,
}
