export class GetMessageSignatureQuery {
  constructor(
    public readonly type: 'Markdown' | 'Plaintext',
    public readonly puppetId: string,
    public readonly messageId: string,
  ) {}
}
