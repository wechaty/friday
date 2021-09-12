import * as contrib  from './contrib.js'
import * as faq      from './qnamaker.js'

const vorpalPluginList = [
  ...Object.values(contrib),
  ...Object.values(faq),
]

export { vorpalPluginList }
