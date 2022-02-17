export class GetMessageChannelNameQuery {
  constructor(
    public readonly puppetId: string,
    public readonly messageId: string,
  ) {}
}
