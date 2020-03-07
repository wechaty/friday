import { Friendship } from 'wechaty'

const NEW_FRIEND_GREETING = [
  `Hi there, I'm Friday BOT. Thank you for adding me as your friend.`,
  `I'm open-sourced, please feel free to visit https://github.com/wechaty/friday if you want to know me more. Issues and Pull Requests are welcome!`,
  `Currently, I'm in charge of manage some developers' WeChat group: if you know any secret words, please tell me, so that I can invite you to that room!`,
]

export class FriendshipManager {

  public static async autoProcessFriendship (friendship: Friendship) {
    const friendshipType = friendship.type()
    if (friendshipType === Friendship.Type.Receive) {
      await friendship.accept()
    } else if (friendshipType === Friendship.Type.Confirm) {
      const contact = friendship.contact()
      for (const greeting of NEW_FRIEND_GREETING) {
        await contact.say(greeting)
        await contact.wechaty.sleep(3 * 1000)
      }
    }
  }

}
