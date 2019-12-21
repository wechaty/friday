import {
  Friendship,
  log,
  Wechaty,
}             from 'wechaty'
import { FriendshipManager } from '../managers/friendship-manager'

export default async function onFriendship (
  this       : Wechaty,
  friendship : Friendship,
): Promise<void> {
  log.info('on-friendship', 'onFriendship(%s)', friendship)
  try {
    await FriendshipManager.autoProcessFriendship(friendship)
  } catch (e) {
    log.error(`on-friendship`, `failed to auto process friendship:\n`, e)
  }
}
