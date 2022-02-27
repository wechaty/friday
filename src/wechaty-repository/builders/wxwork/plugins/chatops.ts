import {
  ChatOps,
}             from 'wechaty-plugin-contrib'

const getChatOpsPlugin = (roomId: string) => ChatOps({
  room: roomId,
})

export {
  getChatOpsPlugin,
}
