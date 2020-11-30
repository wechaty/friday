import { DingDong } from 'wechaty-plugin-contrib'

const DEFAULT_CONFIG = {
  contact : true,
  room    : false,
}

const wechatyDingDongConfig = {
  ding: [
    /^wechaty$/i,
    /^(\w+)*\s*wechaty\s*(\w+)*$/i,
  ],
  dong: "Welcome to join our Wechaty Developers' Home by visiting https://gitter.im/wechaty/wechaty",
}

const WechatyDingDongPlugin = DingDong({
  ...DEFAULT_CONFIG,
  ...wechatyDingDongConfig,
})

export {
  WechatyDingDongPlugin,
}
