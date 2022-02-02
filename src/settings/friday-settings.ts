import { Injectable } from '@nestjs/common'
import type { NamedSetting } from './named-setting.js'

@Injectable()
class FridaySettings implements NamedSetting {

  constructor (
    public name = 'settings@friday',
  ) {}

}

export {
  FridaySettings,
}
