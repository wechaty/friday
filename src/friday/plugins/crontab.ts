
import cron from 'node-cron'

interface CRONConfig {
  time: string,
  reply: string
}

const CRON_CONFIG: CRONConfig[] = [
  {
    reply: '星期一了，如果主席还没发活动总结的话要注意了',
    /**
     * 定时任务
     *     ┌─────────────── second (optional)
     *     │ ┌───────────── minute
     *     │ │ ┌─────────── hour
     *     │ │ │  ┌──────── day of month
     *     │ │ │  │ ┌────── month
     *     │ │ │  │ │ ┌──── day of week
     *     │ │ │  │ │ │
     *     │ │ │  │ │ │
     *     * * *  * * *      // */
    time: '0 0 19 * * 1',
  },
]

/**
 * TODO: Huan(202006)
 */
export async function crontab () {
  for (const cronConfig of CRON_CONFIG) {
    cron.schedule(cronConfig.time, () => {
      // await Chatops.instance().say(cronConfig.reply)
    })
  }
}
