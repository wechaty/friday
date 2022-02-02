import {
  log,
  Friendship,
  Wechaty,
}             from 'wechaty'

import { weChatSettings }            from '../../../settings/deprecated.js'

export default async function onFriendship (
  this       : Wechaty,
  friendship : Friendship,
): Promise<void> {
  log.info('on-friendship', 'onFriendship(%s)', friendship)

  const contact = await friendship.contact()
  const hello = await friendship.hello()

  let text: string
  if (friendship.type() === this.Friendship.Type.Receive) {
    text = `received friendship from ${contact} with ${hello}`
  } else if (friendship.type() === this.Friendship.Type.Confirm) {
    text = `confirmed friendship from ${contact}`
  } else {
    throw new Error('unknown friendship type: ' + friendship.type())
  }

  const room = await this.Room.find({ id: weChatSettings.rooms.chatops.friday })
  if (!room) {
    throw new Error('room id: ' + weChatSettings.rooms.chatops.friday + ' not found')
  }
  await room.say(text)

}
