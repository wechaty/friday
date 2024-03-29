import type * as PUPPET from 'wechaty-puppet'

export class SendMessageCommand {

  constructor (
    public readonly puppetId: string,
    public readonly conversaionId: string,
    public readonly sayable: PUPPET.payloads.Sayable,
  ) {}

}
