import {
  log,
  Message,
  Wechaty,
}             from 'wechaty'

import { InviteManager } from '../managers/invite-manager'

export default async function onMessage (
  this    : Wechaty,
  message : Message,
): Promise<void> {
  log.info('on-message', 'onMessage(%s)', message)

  try {
    await InviteManager.checkInvite(message)
  } catch (e) {
    log.error('on-message', 'check invite failed:\n', e)
  }
}
