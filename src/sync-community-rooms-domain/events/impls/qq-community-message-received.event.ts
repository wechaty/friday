export class QqCommunityMessageReceivedEvent {

  constructor (
    public readonly puppetId: string,
    public readonly messageId: string,
  ) {}

}
