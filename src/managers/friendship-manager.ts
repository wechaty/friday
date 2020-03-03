import { Friendship } from 'wechaty'

const NEW_FRIEND_GREETING = [
  '嗨，你好，我是 Friday BOT。',
  '目前我在管理的公开群有 3 个，回复关键词进群：',
  '----------------------------',
  `wechaty - 加入"Wechaty Developers' Home"`,
  'python - 加入 "Python Wechaty"',
  'aidog - 加入“Youth fed the 5th dog”',
].join('\n')

export class FriendshipManager {

  public static async autoProcessFriendship (friendship: Friendship) {
    const friendshipType = friendship.type()
    if (friendshipType === Friendship.Type.Receive) {
      await friendship.accept()
    } else if (friendshipType === Friendship.Type.Confirm) {
      const contact = friendship.contact()
      // for (const greeting of NEW_FRIEND_GREETING) {
      await contact.say(NEW_FRIEND_GREETING)
      // }
    }
  }

}
