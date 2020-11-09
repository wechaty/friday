import {
  Wechaty,
  log,
  Contact,
}               from 'wechaty'

import { GITTER_WECHATY_ROOM_ID } from '../database'

import { statusPageMetricSubmitter } from './metric-submitter'

interface MetricBots {
  friday: Wechaty,
  gitter: Wechaty,
}

function startStatusPageMetricUpdater (
  bots: MetricBots,
) {
  const submit = submitter()

  setInterval(async () => {
    try {
      const membersNumber = await countWechatyDevelopersRoomMembers(bots)
      log.verbose('status-page/updater', 'startUpdater/srtInterval membersNumber: %s', membersNumber)
      await submit(membersNumber)
    } catch (e) {
      log.error('status-page/updater', 'startUpdater/srtInterval rejection: %s', e)
    }
  }, 60 * 1000)
}

async function countWechatyDevelopersRoomMembers (
  bots: MetricBots,
): Promise<number> {
  const setMember = (set: Set<string>) => (member: Contact) => set.add(member.id)
  let totalNum = 0

  /**
   * Friday
   */
  const topic = /Wechaty|BOT5/i
  const roomList = await bots.friday.Room.findAll({ topic })
  for (const room of roomList) {
    const memberList = await room.memberAll()
    const set = new Set<string>()
    memberList.forEach(setMember(set))
    if (set.size > 0) {
      totalNum += set.size
    } else {
      throw new Error('friday.Room return 0 members')
    }
  }

  /**
   * Gitter
   */
  const gitterRoom = bots.gitter.Room.load(GITTER_WECHATY_ROOM_ID)
  const gitterRoomMemberList = await gitterRoom.memberAll()
  {
    const set = new Set<string>()
    gitterRoomMemberList.forEach(setMember(set))
    if (set.size > 0) {
      totalNum += set.size
    } else {
      // should throw after implemented https://github.com/wechaty/wechaty-puppet-gitter/issues/5
      // throw new Error('gitter.Room return 0 members')
    }
  }

  /**
   * Total size
   */
  return totalNum
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
