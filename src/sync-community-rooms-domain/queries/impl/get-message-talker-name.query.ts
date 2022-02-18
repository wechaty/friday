export class GetMessageTalkerNameQuery {
  constructor(
    public readonly puppetId: string,
    public readonly messageId: string,
  ) {}
}
