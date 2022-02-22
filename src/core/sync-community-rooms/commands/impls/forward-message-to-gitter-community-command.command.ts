export class ForwardMessageToGitterCommunityCommand {

  constructor (
    public readonly puppetId: string,
    public readonly messageId: string,
  ) {}

}
