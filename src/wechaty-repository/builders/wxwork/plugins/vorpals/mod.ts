import type { WxWorkSettings } from '../../../../../wechaty-settings/mod.js'
import * as chatops from './chatops.js'
import * as pub     from './public.js'
import * as faq     from './qnamaker.js'

const getVorpalPluginList = (settings: WxWorkSettings) => {
  const vorpalPluginList = [
    ...Object.values(chatops).map(get => get(settings)),
    ...Object.values(pub).map(get => get(settings)),
    ...Object.values(faq).map(get => get(settings)),
  ]
  return vorpalPluginList
}

export { getVorpalPluginList }
