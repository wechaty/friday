import { Contact, Message, Room, log } from 'wechaty'

import { KEYWORD_ROOM_CONFIG } from '../config'

export class InviteManager {

  public static async checkInvite (message: Message) {
    if (message.room()) {
      return
    }

    const contact = message.from()
    if (!contact) {
      return
    }

    if (message.type() !== Message.Type.Text) {
      return
    }

    const text = message.text()

    const inText = (keyword: string) => text.includes(keyword)

    for (const config of KEYWORD_ROOM_CONFIG) {

      const keywords = config.keywords

      const matched = keywords.some(inText)
      if (!matched) {
        continue
      }

      let tryRoom = await message.wechaty.Room.find({ topic: config.topic })
      if (!tryRoom) {
        log.verbose('InviteManager', 'Room.find({topic: "%s"}) not found room.', config.topic)
        await contact.say(`Sorry but we can not find the room with topic "${config.topic}". Please file an issue on Github to help us know this problem at https://github.com/wechaty/wechaty/issues , thank you very much!`)
        return
      }
      const room = tryRoom

      // Check whether the member is already in the room
      const members = await room.memberAll()
      const alreadyInRoom = !!members.find(m => m.id === contact.id)
      if (alreadyInRoom) {
        await contact.say(`You are already in the room: ${config.topic}.`)
        continue
      }

      // Send room rules to the newcomer
      for (const rule of config.rules) {
        await message.say(rule)
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      // Invite the member into the room
      await room.add(contact)

    }
  }

  public static async welcomeNewMember (
    room: Room,
    inviteeList: Contact[],
  ) {
    const topic = await room.topic()
    const matchedConfig = KEYWORD_ROOM_CONFIG.filter(c => c.topic === topic)

    for (const config of matchedConfig) {
      let firstWelcome = true
      for (const welcome of config.welcomes) {
        if (firstWelcome) {
          await room.say(welcome, ...inviteeList)
          firstWelcome = false
        } else {
          await room.say(welcome)
        }
      }
    }
  }

}
