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

export const CHATOPS_ROOM_TOPIC = 'ChatOps - BOT5 Wechaty' // 'BOT5 Club ChatOps'
export const CHATOPS_ROOM_ID = '9195068372@chatroom'

export const KEYWORD_ROOM_CONFIG: KeywordRoomConfig[] = [
  {
    keywords: [
      'wechaty',
      'Wechaty',
    ],
    rules: [
      'I\'m trying to invite you into Wechaty Developers\' Home, please read the doc first: Docs: https://docs.chatie.io/ FAQ: https://docs.chatie.io/faq Wechaty is very powerful that it can run over different protocols. You can specify the protocol by set the environment variable WECHATY_PUPPET to different puppet provider. If you cannot use Web protocol, you can apply other protocal following the instruction here: https://github.com/wechaty/wechaty/wiki/Support-Developers',
      `欢迎加入 Wechaty Developers' Home, 请务必阅读文档，拒绝伸手党： Docs: https://docs.chatie.io/ FAQ: https://docs.chatie.io/faq Wechaty 支持切换多种协议，除了支持网页协议外，还支持iPad协议，你只需要切换环境变量 WECHATY_PUPPET 即可。 如果你不能用网页协议，按照这里的介绍申请使用iPad协议接入: https://github.com/wechaty/wechaty/wiki/Support-Developers`,
    ],
    topic: `Wechaty Developers' Home`,
    welcomes: [
      'Welcome to join us!',
    ],
  }, {
    keywords: [
      'aidog',
      'Aidog',
      'AiDog',
    ],
    rules: [],
    topic: 'Youth fed the 5th dog',
    welcomes: [
      '禁止在本群测试机器人。 注意：老群已满，此群为AiDog第五个新群',
    ],
  },
  {
    keywords: [
      'bot5',
      'BOT5',
      'Bot5',
      'BotFriday',
    ],
    rules: [
      'I\'m trying to invite you into Bot5, please read the manual first: https://www.bot5.club/manuals/newcomer ',
      '欢迎加入 Bot5, 请务必阅读新人手册： https://www.bot5.club/manuals/newcomer',
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
