import {
  WechatyIntercom,
  WechatyIntercomConfig,
}                           from 'wechaty-plugin-intercom'

import { PUPPET_SERVICE_PROVIDER_ROOM_ID } from '../id-config'

const config: WechatyIntercomConfig = {
  at: true,
  close: [
    [
      'Thank you for contacting the support of puppet service provider.',
      'We believe that your question has been answered and hope you are good now.',
      'Please feel free to contact us again if you have more questions.',
      'Thank you very much, and have a nice day!',
    ].join(' '),
  ],
  room: PUPPET_SERVICE_PROVIDER_ROOM_ID,
}

export const IntercomPlugin = WechatyIntercom(config)
