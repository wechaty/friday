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
  dong: [
    "Welcome to join our Wechaty Developers' Home by visiting https://gitter.im/wechaty/wechaty",
    'Currently, the WeChat room invitation is temporary not available because we are experiencing issue #62, learn more from https://github.com/wechaty/friday/issues/62 if you are interested.',
    'If you want to join the WeChat room, please come back and send me "Wechaty" again after December 3rd.',
  ],
}

const WechatyDingDongPlugin = DingDong({
  ...DEFAULT_CONFIG,
  ...wechatyDingDongConfig,
})

export {
  WechatyDingDongPlugin,
}
