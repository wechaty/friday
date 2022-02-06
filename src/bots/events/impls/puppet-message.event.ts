export class PuppetMessageEvent {

  constructor (
    public readonly puppetId: string,
    public readonly messageId: string,
  ) {}

}
