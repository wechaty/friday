import {
  log,
  Friendship,
  Wechaty,
}             from 'wechaty'

import { CHATOPS_ROOM_ID }            from '../id-config'

export default async function onFriendship (
  this       : Wechaty,
  friendship : Friendship,
): Promise<void> {
  log.info('on-friendship', 'onFriendship(%s)', friendship)

  const contact = await friendship.contact()
  const hello = await friendship.hello()

  let text
  if (friendship.type() === this.Friendship.Type.Receive) {
    text = `recreived friendship from ${contact} with ${hello}`
    await this.Room.load(CHATOPS_ROOM_ID).say(text)
  } else if (friendship.type() === this.Friendship.Type.Confirm) {
    text = `confirmed friendship from ${contact}`
    await this.Room.load(CHATOPS_ROOM_ID).say(text)
  }

}
