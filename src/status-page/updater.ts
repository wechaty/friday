import {
  Wechaty,
  log,
}               from 'wechaty'

import { statusPageMetricSubmitter } from './metric-submitter'

function startStatusPageMetricUpdater (
  friday: Wechaty,
) {
  const submit = submitter()

  setInterval(async () => {
    try {
      const membersNumber = await countWechatyDevelopersRoomMembers(friday)
      log.verbose('status-page/updater', 'startUpdater/srtInterval membersNumber: %s', membersNumber)
      await submit(membersNumber)
    } catch (e) {
      log.error('status-page/updater', 'startUpdater/srtInterval rejection: %s', e)
    }
  }, 60 * 1000)
}

async function countWechatyDevelopersRoomMembers (
  friday: Wechaty,
): Promise<number> {
  const topic = /Wechaty/i
  const roomList = await friday.Room.findAll({ topic })
  const memberSet = new Set()
  for (const room of roomList) {
    const memberList = await room.memberAll()
    memberList.map(m => memberSet.add(m.id))
  }
  return memberSet.size
}

function submitter () {
  const apiKey   = process.env.STATUS_PAGE_API_KEY
  const metricId = process.env.STATUS_PAGE_METRIC_ID_MEMBERS
  const pageId   = process.env.STATUS_PAGE_PAGE_ID

  if (!apiKey || !metricId || !pageId) {
    throw new Error('no status page api env variables!')
  }

  const submit = statusPageMetricSubmitter({ apiKey, metricId, pageId })
  return submit
}

export {
  startStatusPageMetricUpdater,
}
