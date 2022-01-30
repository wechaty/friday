/**
 * Wechaty Plugin Support with KickOut Example #1939
 *  https://github.com/wechaty/wechaty/issues/1939
 */
import {
  DingDong,
}                    from 'wechaty-plugin-contrib'

// import {
//   QnAMakerCeibsPlugin,
// }                           from './qnamaker.js'

import { vorpalPluginList } from './vorpals/mod.js'

const getPlugins = () => {
  const pluginList = [
    DingDong(),
    // QnAMakerCeibsPlugin,
  ]

  return [
    ...pluginList,
    ...vorpalPluginList,
  ]
}

export {
  getPlugins,
}
