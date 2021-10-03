import {
  Wechaty,
  log,
}               from 'wechaty'

import { countRoomMembers } from './count-room-members.js'

import type { MetricBots } from './types.js'

import {
  submitMessagesSentCount,
  submitMessagesReceivedCount,
  submitMembersCount,
}                               from './submitters.js'

const metrics = {
  mo: 0,
  mt: 0,
}

function startStatusPageMetricUpdater (
  bots: MetricBots,
) {
  Object.values(bots)
    .forEach((bot: Wechaty) => bot.on('message', m => {
      // console.info('XXXXXXXXXXXXXXXXXX', m + ' self: ' + m.self())
      if (m.self()) {
        metrics.mo += 1
      } else {
        metrics.mt += 1
      }
    }))

  // warm the rooms up
  countRoomMembers(bots).catch(console.error)

  // debug
  setInterval(() => {
    console.info('metrics', metrics)
  }, 5 * 1000)

  setInterval(async () => {
    /**
     * Count MO / MT
     */
    log.verbose('status-page/updater', 'startUpdater/setInterval mo/mt: %s/%s', metrics.mo, metrics.mt)
    const future = Promise.all([
      submitMessagesSentCount(metrics.mo),
      submitMessagesReceivedCount(metrics.mt),
    ])
    metrics.mo = 0
    metrics.mt = 0
    await future

    /**
     * Count Members
     */
    const membersNumber = await countRoomMembers(bots)
    await submitMembersCount(membersNumber)
    log.verbose('status-page/updater', 'startUpdater/setInterval membersNumber: %s', membersNumber)

  }, 5 * 60 * 1000)
}

export {
  startStatusPageMetricUpdater,
}
