export class GetMessageSayablesQuery {
  constructor(
    public readonly puppetId: string,
    public readonly messageId: string,
  ) {}
}
