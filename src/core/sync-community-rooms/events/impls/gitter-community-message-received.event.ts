export class GitterCommunityMessageReceivedEvent {

  constructor (
    public readonly puppetId: string,
    public readonly messageId: string,
  ) {}

}
