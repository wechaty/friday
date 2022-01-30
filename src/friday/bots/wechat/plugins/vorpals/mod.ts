import * as contributors  from './contributors.js'
import * as dm            from './direct-message.js'
import * as friday        from './chatops-friday.js'
import * as preangel      from './chatops-preangel.js'
import * as ddr           from './chatops-ddr.js'
import * as faq           from './qnamaker.js'
import * as ai            from './ai.js'

const getVorpalPlugins = () => {
  const vorpalPluginList = [
    ...Object.values(friday),
    ...Object.values(preangel),
    ...Object.values(contributors),
    ...Object.values(dm),
    ...Object.values(ddr),
    ...Object.values(faq),
    ...Object.values(ai),
  ]

  return vorpalPluginList
}

export { getVorpalPlugins }
