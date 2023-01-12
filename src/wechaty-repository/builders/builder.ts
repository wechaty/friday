import type * as WECHATY from 'wechaty'

import type { NamedInterface } from '../../wechaty-settings/mod.js'

export interface Builder extends WECHATY.BuilderInterface, WECHATY.BuilderInterface {
  settings: NamedInterface
}
