export class GetMessageSignatureQuery {
  constructor(
    public readonly type: 'markdown' | 'plaintext',
    public readonly puppetId: string,
    public readonly messageId: string,
  ) {}
}
