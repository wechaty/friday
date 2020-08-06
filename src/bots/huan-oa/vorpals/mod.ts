import * as contrib  from './contrib'
import * as faq      from './qnamaker'

const vorpalPluginList = [
  ...Object.values(contrib),
  ...Object.values(faq),
]

export { vorpalPluginList }
