export class WeChatCommunityMessageReceivedEvent {

  constructor (
    public readonly puppetId: string,
    public readonly messageId: string,
  ) {}

}
