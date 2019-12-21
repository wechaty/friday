import { Friendship } from 'wechaty'

const NEW_FRIEND_GREETING = [
  `我当前管理的公开群有 2 个，回复关键词进群： ---------------------------- 回复【wechaty】加入"Wechaty Developers' Home" 回复 【aidog】加入“Youth fed the 5th dog”`,
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
      }
    }
  }

}
