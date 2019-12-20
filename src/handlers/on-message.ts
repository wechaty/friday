import {
  log,
  Message,
  Wechaty,
}             from 'wechaty'
import { VoteManager } from '../managers/voteManager'

export default async function onMessage (
  this    : Wechaty,
  message : Message,
): Promise<void> {
  log.info('on-message', 'onMessage(%s)', message)
  try {
    await VoteManager.checkVote(message)
  } catch (e) {
    log.error('on-message', 'Failed to check vote for the message:\n', e)
  }
}
