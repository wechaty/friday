import { Contact, Message, Room } from 'wechaty'

import { KEYWORD_ROOM_CONFIG } from '../config'

export class InviteManager {

  public static async checkInvite (message: Message) {
    const room = message.room()
    const contact = message.from()
    if (!contact || room || message.type() !== Message.Type.Text) {
      return
    }
    const content = message.text()
    for (const config of KEYWORD_ROOM_CONFIG) {

      const matched = !!config.keywords.find(k => content.includes(k))
      if (!matched) {
        continue
      }

      const room = await message.wechaty.Room.find({ topic: config.topic })
      if (!room) {
        continue
      }

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
