import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  MIKE_CONTACT_ID,
}                             from '../../../../../../setting/legacy/database.js'
import { fridaySetting } from '../../../../../../setting/deprecated.js'

import { bidirectionalMapper } from '../../bidirectional-mapper.js'

const LanguageToHomePlugin = SourceToTargetRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  map: bidirectionalMapper,
  source: [
    ...fridaySetting.wechat.wechatyDevelopers.chinese,
    ...fridaySetting.wechat.wechatyDevelopers.english,
  ],
  target: [
    ...fridaySetting.wechat.wechatyDevelopers.home,
    ...fridaySetting.wechat.wechatyDevelopers.homeHq,
  ],
})

export {
  LanguageToHomePlugin,
}
