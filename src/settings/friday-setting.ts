import type { NamedSetting } from './named-setting.js'

class FridaySetting implements NamedSetting {

  constructor (
    public name = 'settings@friday',
  ) {}

}

export {
  FridaySetting,
}
