export class ForwardMessageCommand {

  constructor (
    public readonly puppetId: string,
    public readonly conversaionId: string,
    public readonly messageId: string,
  ) {}

}
