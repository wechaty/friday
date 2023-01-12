import * as contributors  from './contributors.js'
import * as dm            from './direct-message.js'
import * as friday        from './chatops-friday.js'
import * as preangel      from './chatops-preangel.js'
import * as ddr           from './chatops-ddr.js'
import * as faq           from './qnamaker.js'
import * as ai            from './ai.js'
import type { WorkProSettings } from '../../../../../wechaty-settings/mod.js'

const getVorpalPlugins = (settings: WorkProSettings) => {
  const vorpalPluginList = [
    ...Object.values(friday).map(get => get(settings)),
    ...Object.values(preangel).map(get => get(settings)),
    ...Object.values(contributors).map(get => get(settings)),
    ...Object.values(dm).map(get => get(settings)),
    ...Object.values(ddr).map(get => get(settings)),
    ...Object.values(faq).map(get => get(settings)),
    ...Object.values(ai).map(get => get(settings)),
  ]

  return vorpalPluginList
}

export { getVorpalPlugins }
