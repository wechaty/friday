
import cron from 'node-cron'

import { CRON_CONFIG } from '../config'
import { Chatops } from '../chatops'

/**
 * TODO: Huan(202006)
 */
export async function crontab () {
  for (const cronConfig of CRON_CONFIG) {
    cron.schedule(cronConfig.time, async () => {
      await Chatops.instance().say(cronConfig.reply)
    })
  }
}
