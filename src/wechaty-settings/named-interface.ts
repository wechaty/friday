export type BotName =
  | 'Gitter'
  | 'OfficialAccount'
  | 'QQ'
  | 'WeChat'
  | 'WhatsApp'
  | 'WXWork'

export interface NamedInterface {
  name: BotName
}
