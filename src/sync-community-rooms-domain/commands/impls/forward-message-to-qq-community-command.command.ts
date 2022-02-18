export class ForwardMessageToQqCommunityCommand {

  constructor (
    public readonly puppetId: string,
    public readonly messageId: string,
  ) {}

}
