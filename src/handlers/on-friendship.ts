import {
  log,
  Friendship,
  Wechaty,
}             from 'wechaty'

import { FRIDAY_CHATOPS_ROOM_ID }            from '../database'

export default async function onFriendship (
  this       : Wechaty,
  friendship : Friendship,
): Promise<void> {
  log.info('on-friendship', 'onFriendship(%s)', friendship)

  const contact = await friendship.contact()
  const hello = await friendship.hello()

  let text
  if (friendship.type() === this.Friendship.Type.Receive) {
    text = `received friendship from ${contact} with ${hello}`
    await this.Room.load(FRIDAY_CHATOPS_ROOM_ID).say(text)
  } else if (friendship.type() === this.Friendship.Type.Confirm) {
    text = `confirmed friendship from ${contact}`
    await this.Room.load(FRIDAY_CHATOPS_ROOM_ID).say(text)
  }

}
