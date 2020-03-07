import {
  log,
  Friendship,
  Wechaty,
}             from 'wechaty'

import { FriendshipManager }  from '../managers/friendship-manager'

import { Chatops }            from '../chatops'

export default async function onFriendship (
  this       : Wechaty,
  friendship : Friendship,
): Promise<void> {
  log.info('on-friendship', 'onFriendship(%s)', friendship)

  const contact = await friendship.contact()
  const hello = await friendship.hello()

  if (friendship.type() === this.Friendship.Type.Receive) {
    await Chatops.instance().queue(() => {
      Chatops.instance().say(`recreived friendship from ${contact} with ${hello}`)
        .catch(e => log.error('on-friendship', 'onFriendship() queue() rejection %s', e))
    })
  } else if (friendship.type() === this.Friendship.Type.Confirm) {
    await Chatops.instance().queue(() => {
      Chatops.instance().say(`confirmed friendship from ${contact}`)
        .catch(e => log.error('on-friendship', 'onFriendship() queue() rejection %s', e))
    })
  }

  try {
    await FriendshipManager.autoProcessFriendship(friendship)
  } catch (e) {
    log.error(`on-friendship`, `failed to auto process friendship:\n`, e)
  }
}
