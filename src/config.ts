/**
 * VERSION
 */
import readPkgUp from 'read-pkg-up'

import { KeywordRoomConfig, CRONConfig } from './schema'

export {
  log,
} from 'brolog'

const pkg = readPkgUp.sync({ cwd: __dirname })!.packageJson
export const VERSION = pkg.version

/**
 * Env Vars
 */
export const PORT = process.env.PORT || 8788

export const BOT_ROOM_ID       = '18131996049@chatroom'  // 'ChatOps - BOT5 Wechaty'
export const HEARTBEAT_ROOM_ID = '17376996519@chatroom'  // 'ChatOps - Heartbeat'

export const WECHATY_DEVELOPERS_HOME_ID_LIST = [
  '24113855649@chatroom',   // Wechaty Developers' Room
  '7582163093@chatroom',    // Wechaty Developers' Room 1
  '5729603967@chatroom',    // Wechaty Developers' Room 2
  '4335801863@chatroom',    // Wechaty Developers' Room 3
  // '', // Wechaty Developers' Room 4
  // '', // Wechaty Developers' Room 5
]

export const KEYWORD_ROOM_CONFIG: KeywordRoomConfig[] = [
  {
    cipherList: [
      'python',
    ],
    id: '19367909379@chatroom',
    rules: [
      `Thanks for asking me to invite you for joining the "Python Wechaty" WeChat Room!`,
      `Python Wechaty is in very early stage, please help the project by submitting issues and sending pull requests.`,
      `If you have any idea about the feature requests, questions, and document, please let us know.`,
      `Repo address: https://github.com/wechaty/python-wechaty`,
      `Please introduce yourself after you join the room, cheers!`,
    ],
    topic: 'Python Wechaty',
    welcomes: [
      'is joining us as a new Python Wechaty developer! Welcome, and please watch our repo at https://github.com/wechaty/python-wechaty',
    ],
  },
  {
    cipherList: [
      'wechaty',
    ],
    id: '24113855649@chatroom',
    rules: [
      `Thanks for asking me to invite you for joining the "Wechaty Developers' Home" Wechat Room!`,
      `Wechaty is a Conversational RPA for Wechat for connecting Chatbots in ease.`,
      `You can find our documentation at https://github.com/wechaty/wechaty/blob/master/docs/index.md`,
      `and FAQ at https://github.com/wechaty/wechaty/wiki/FAQ`,
      `Please introduce yourself after you join the room, cheers!`,
    ],
    topic: `Wechaty Developers' Home`,
    welcomes: [
      `is joining us as a new Wechaty developer! Welcome, and please introduce yourself to the community!`,
    ],
  },
  {
    cipherList: [
      'aidog',
    ],
    rules: [],
    topic: 'Youth fed the 5th dog',
    welcomes: [
      '禁止在本群测试机器人。 注意：老群已满，此群为AiDog第五个新群',
    ],
  },
  {
    cipherList: [
      'bot5',
      'BotFriday',
    ],
    rules: [
      `I'm trying to invite you into Bot5, please read the manual first: https://www.bot5.club/manuals/newcomer `,
    ],
    topic: 'Bot Friday Open Forum - BFOF',
    welcomes: [
      'Welcome to join us!',
    ],
  },
]

// 定时任务测试
// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *
export const CRON_CONFIG: CRONConfig[] = [
  {
    reply: '星期一了，如果主席还没发活动总结的话要注意了',
    time: '0 0 19 * * 1',
  },
]
