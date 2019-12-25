import {
  log,
  Message,
  Wechaty,
}             from 'wechaty'

import moment from 'moment'

import { chatops } from '../chatops'

import { VoteManager } from '../managers/vote-manager'
import { InviteManager } from '../managers/invite-manager'

const BORN_TIME = Date.now()

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
    if (message.self()) {
      return
    }

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

  await dingDong.call(this, message)
  await ctpStatus(this, message)
}

async function ctpStatus (
  wechaty: Wechaty,
  message: Message,
): Promise<void> {
  if (message.self()) {
    return
  }

  const room = message.room()
  if (!room) {
    return
  }

  // ChatOps - CTP Status
  const CTP_STATUS_ROOM_ID = '17962906510@chatroom'
  if (room.id !== CTP_STATUS_ROOM_ID) {
    return
  }

  let text = await message.mentionText()
  let reply
  if (text.match(/^#ding$/i)) {
    reply = 'dong'
  } else if (text.match(/^#uptime$/i)) {
    const time = moment(BORN_TIME).fromNow()
    reply = `I'm online ${time}`
  } else {
    reply = 'unknown CTP command'
  }

  await message.say(reply)
  await wechaty.sleep(1)
}

async function dingDong (
  this:     Wechaty,
  message:  Message,
) {
  log.info('on-message', 'dingDong()')

  let text = message.text()
  const type = message.type()
  const room = message.room()
  // const from = message.from()
  const mentionSelf = await message.mentionSelf()

  if (room) {
    if (!mentionSelf) {
      return
    }

    log.info('on-message', 'dingDong() message in room and mentioned self')
    text = await message.mentionText()
    console.info('mentionText', text)
  }

  if (type === Message.Type.Text) {
    if (text.match(/^#ding$/i)) {
      await message.say('dong')
    }
  }

}
