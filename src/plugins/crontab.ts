
import cron from 'node-cron'
import {
  Wechaty,
} from 'wechaty'
import { CRON_CONFIG } from '../config'
import { chatops } from '../chatops'

export async function crontab (bot: Wechaty) {
  for (const cronConfig of CRON_CONFIG) {
    cron.schedule(cronConfig.time, async () => {
      await chatops(bot, cronConfig.reply)
    })
  }
}
