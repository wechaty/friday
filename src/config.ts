/**
 * VERSION
 */
import readPkgUp from 'read-pkg-up'

import { KeywordRoomConfig, CRONConfig } from './schema'

export {
  log,
}               from 'brolog'

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
      'bot5',
      'BOT5',
      'Bot5',
      'BotFriday',
    ],
    rules: [
      'I\'m trying to invite you into Bot5, please read the manual first: https://www.bot5.club/manuals/newcomer ',
      '欢迎加入 Bot5, 请务必阅读新人手册，拒绝伸手党： https://www.bot5.club/manuals/newcomer',
    ],
    topic: 'ChatOps - BOT5 Wechaty',
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
