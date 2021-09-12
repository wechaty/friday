import * as chatops from './chatops.js'
import * as pub     from './public.js'
import * as faq     from './qnamaker.js'

const vorpalPluginList = [
  ...Object.values(chatops),
  ...Object.values(pub),
  ...Object.values(faq),
]

export { vorpalPluginList }
