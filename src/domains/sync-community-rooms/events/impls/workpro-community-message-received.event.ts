export class WorkProCommunityMessageReceivedEvent {

  constructor (
    public readonly puppetId: string,
    public readonly messageId: string,
  ) {}

}
