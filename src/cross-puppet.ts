import {
  Wechaty,
  Message,
}             from 'wechaty'

import {
  HEADQUARTERS_ROOM_ID,
  DEVELOPERS_ROOM_ID_LIST,
  FRIDAY_ROOM_ID,

  GITTER_WECHATY_ROOM_ID,
}                         from './database'

function connectGitterFriday (args: {
  friday: Wechaty,
  gitter: Wechaty,
}): void {
  const { friday, gitter } = args

  const gitterRoom = gitter.Room.load(GITTER_WECHATY_ROOM_ID)
  const wechatRoom = friday.Room.load(FRIDAY_ROOM_ID)

  const forwardWechatToGitter = (roomId: string) => {
    friday.on('message', async msg => {
      const room = msg.room()

      if (!room)                              { return }
      if (room.id !== roomId)                 { return }
      if (msg.self())                         { return }
      if (msg.type() !== Message.Type.Text)   { return }

      const talker    = msg.from()!
      const roomAlias = await room.alias(talker)
      const name      = roomAlias || talker.name()
      const topic     = room.topic()

      const text = [
        name,
        ' @ ',
        topic,
        ' : ',
        msg.text(),
      ].join('')

      await gitterRoom.say(text)
    })
  }

  const forwardGitterToWechat = () => {
    gitterRoom.on('message', async msg => {
      if (msg.self())                         { return }
      if (msg.type() !== Message.Type.Text)   { return }

      const name = msg.from()!.name()

      const text = [
        name,
        ' @ gitter : ',
        msg.text(),
      ].join('')

      await wechatRoom.say(text)
    })
  }

  ;[
    ...DEVELOPERS_ROOM_ID_LIST,
    HEADQUARTERS_ROOM_ID,
  ].forEach(forwardWechatToGitter)

  forwardGitterToWechat()
}

export {
  connectGitterFriday,
}
