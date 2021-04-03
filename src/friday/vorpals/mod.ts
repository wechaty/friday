import * as contributors  from './contributors'
import * as dm            from './direct-message'
import * as donut         from './chatops-donut'
import * as friday        from './chatops-friday'
import * as preangel      from './chatops-preangel'
import * as ddr           from './chatops-ddr'
import * as faq           from './qnamaker'
import * as ai            from './ai'

const vorpalPluginList = [
  ...Object.values(donut),
  ...Object.values(friday),
  ...Object.values(preangel),
  ...Object.values(contributors),
  ...Object.values(dm),
  ...Object.values(ddr),
  ...Object.values(faq),
  ...Object.values(ai),
]

export { vorpalPluginList }
