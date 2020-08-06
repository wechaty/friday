import * as chatops from './chatops'
import * as pub     from './public'
import * as faq     from './qnamaker'

const vorpalPluginList = [
  ...Object.values(chatops),
  ...Object.values(pub),
  ...Object.values(faq),
]

export { vorpalPluginList }
