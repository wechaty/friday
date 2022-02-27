export class ForwardMessageToWeChatCommunityCommand {

  constructor (
    public readonly puppetId: string,
    public readonly messageId: string,
  ) {}

}
