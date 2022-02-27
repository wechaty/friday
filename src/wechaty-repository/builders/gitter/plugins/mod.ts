/**
 * Wechaty Plugin Support with KickOut Example #1939
 *  https://github.com/wechaty/wechaty/issues/1939
 */
import {
  DingDong,
  EventLogger,
}                    from 'wechaty-plugin-contrib'

import { vorpalPluginList } from './vorpals/mod.js'

// import {
//   QnAMakerCeibsPlugin,
// }                           from './qnamaker.js'

const getPlugins = () => {

  const pluginList = [
    DingDong(),
    EventLogger(),
    // QnAMakerCeibsPlugin,
  ]
  return [
    ...pluginList,
    ...vorpalPluginList,
  ]
}

export { getPlugins }
