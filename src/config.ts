import readPkgUp from 'read-pkg-up'

export {
  log,
} from 'wechaty'

const pkg = readPkgUp.sync({ cwd: __dirname })!.packageJson
export const VERSION = pkg.version

/**
 * Env Vars
 */
export const PORT = process.env.PORT || 8788

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
export interface CRONConfig {
  time: string,
  reply: string
}

export const CRON_CONFIG: CRONConfig[] = [
  {
    reply: '星期一了，如果主席还没发活动总结的话要注意了',
    time: '0 0 19 * * 1',
  },
]
