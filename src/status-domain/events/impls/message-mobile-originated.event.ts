export class MessageMobileOriginatedEvent {

  constructor (
    public readonly puppetId: string,
    public readonly messageId: string,
  ) {}

}
