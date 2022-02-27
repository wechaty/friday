export class ForwardMessageToWhatsAppCommunityCommand {

  constructor (
    public readonly puppetId: string,
    public readonly messageId: string,
  ) {}

}
