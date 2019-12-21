import {
  Contact,
  log,
  Room,
  Wechaty,
}             from 'wechaty'
import { InviteManager } from '../managers/invite-manager'

export default async function onRoomJoin (
  this        : Wechaty,
  room        : Room,
  inviteeList : Contact[],
  inviter     : Contact,
): Promise<void> {
  log.info('on-room-join', 'onRoomJoin(%s, %s, %s)', room, inviteeList.join(','), inviter)
  try {
    await InviteManager.welcomeNewMember(room, inviteeList)
  } catch (e) {
    log.error('on-room-join', 'failed to welcome newcomers:\n', e)
  }
}
