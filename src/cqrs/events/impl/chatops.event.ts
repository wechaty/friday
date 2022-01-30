export class ChatopsEvent {

  constructor (
    public readonly puppetId: string,
    public readonly roomId: string,
    public readonly text: string,
  ) {}

}
