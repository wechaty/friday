import {
  Room,
  Wechaty,
}             from 'wechaty'

import {
  log,
  CHATOPS_ROOM_ID,
  CHATOPS_ROOM_TOPIC,
}                   from './config'

let room: Room|null = null

export async function chatops (
  bot: Wechaty,
  text: string,
): Promise<void> {
  log.info('chatops', 'chatops(%s)', text)

  if (!room || !room.owner()) {
    try {
      room = bot.Room.load(CHATOPS_ROOM_ID)
      await room.sync()
    } catch (e) {
      log.warn('chatops', 'load room ID error %s', e)
    }
  }

  // Sometimes, we'll get wrong room by roomid
  if (!room || !room.owner()) {
    try {
      room = await bot.Room.find({ topic: CHATOPS_ROOM_TOPIC })
    } catch (e) {
      log.error('chatops', 'load by topic error %s', e)
    }
  }

  if (room) {
    await room.say(text)
  }
}
