import {
  WechatyIntercom,
  WechatyIntercomConfig,
}                           from 'wechaty-plugin-intercom'

import { PUPPET_SERVICE_PROVIDER_ROOM_ID } from '../id-config'

const config: WechatyIntercomConfig = {
  at: true,
  room: PUPPET_SERVICE_PROVIDER_ROOM_ID,
}

export const IntercomPlugin = WechatyIntercom(config)
