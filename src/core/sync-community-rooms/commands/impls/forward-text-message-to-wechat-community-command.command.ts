export class ForwardTextMessageToWeChatCommunityCommand {

  constructor (
    public readonly puppetId: string,
    public readonly messageId: string,
  ) {}

}
