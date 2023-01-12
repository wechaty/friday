export type BotName =
  | 'Gitter'
  | 'OfficialAccount'
  | 'QQ'
  | 'WeChat'
  | 'WhatsApp'
  | 'WorkPro'

export interface NamedInterface {
  name: BotName
}
