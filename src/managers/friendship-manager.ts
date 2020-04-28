import { Friendship } from 'wechaty'

const NEW_FRIEND_GREETING = [
  `Hi there, my name is Friday, I'm a Chatbot built by Wechaty and for Wechaty.`,
  `I'm open-sourced, please feel free to visit https://github.com/wechaty/friday if you want to know me more.`,
  `Currently, I'm in charge of managing some developers' WeChat group: if you know any secret words, please send to me, then I'll be able to invite you to join!`,
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
