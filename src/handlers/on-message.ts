import {
  log,
  Message,
  Wechaty,
}             from 'wechaty'

import { chatops } from '../chatops'

import { VoteManager } from '../managers/vote-manager'
import { InviteManager } from '../managers/invite-manager'

export default async function onMessage (
  this    : Wechaty,
  message : Message,
): Promise<void> {
  log.info('on-message', 'onMessage(%s)', message)

  try {
    await InviteManager.checkInvite(message)
  } catch (e) {
    log.error('on-message', 'check invite failed: %s', e)
  }

  try {
    await VoteManager.checkVote(message)
  } catch (e) {
    log.error('on-message', 'Failed to check vote for the message: %s', e)
  }

  try {
    const room = message.room()
    if (room) {
      const mentionSelf = await message.mentionSelf()
      if (mentionSelf) {
        await chatops(this, `${message}`)
      }
    } else {  // direct message
      await chatops(this, `${message}`)
    }
  } catch (e) {
    log.error('on-message', 'Failed to chatops for the message: %s', e)
  }
}
