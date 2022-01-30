import type { Contact } from 'wechaty'
import { log } from 'wechaty'

import { fridayConfig } from '../../config/deprecated.js'

import type { MetricBots } from './types.js'

async function countRoomMembers (
  bots: MetricBots,
): Promise<number> {
  const setMember = (set: Set<string>) => (member: Contact) => set.add(member.id)

  /**
   * Friday
   */
  const topic = /Wechaty|BOT5/i
  const fridaySet = new Set<string>()

  if (bots.friday.isLoggedIn) {
    const roomList = await bots.friday.Room.findAll({ topic })
    for (const room of roomList) {
      const memberList = await room.memberAll()
      memberList.forEach(setMember(fridaySet))
    }
    if (fridaySet.size <= 0) {
      log.error('Friday', 'status-page count-room-member countRoomMembers(): friday.Room return 0 members')
    }
  } else {
    log.error('Friday', 'status-page count-room-member countRoomMembers(): friday is not logon yet')
  }

  /**
   * Gitter
   */
  const gitterRoom = await bots.gitter.Room.find({ id: fridayConfig.gitter.wechatyRoomId })
  if (!gitterRoom) {
    throw new Error('Gitter room id: ' + fridayConfig.gitter.wechatyRoomId + 'not found')
  }
  const gitterRoomMemberList = await gitterRoom.memberAll()
  const gitterSet = new Set<string>()
  gitterRoomMemberList.forEach(setMember(gitterSet))
  if (gitterSet.size <= 0) {
    // TODO: Huan(202011) should throw after implemented https://github.com/wechaty/wechaty-puppet-gitter/issues/5
    // throw new Error('gitter.Room return 0 members')
  }

  /**
   * Total size
   */
  const sum = (a: number, b: number) => a + b
  const totalNum = [
    fridaySet,
    gitterSet,
  ].map(s => s.size)
    .reduce(sum, 0)

  return totalNum
}

export {
  countRoomMembers,
}
