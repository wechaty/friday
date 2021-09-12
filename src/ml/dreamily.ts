import {
  log,
}                 from 'wechaty'
import type {
  Vorpal,
  CommandContext,
  Args,
}                           from 'wechaty-vorpal'

import {
  dreamilyApi,
  DreamilyApiOptions,
  StoryStyle,
}                       from './dreamily-api.js'

function Dreamily () {
  log.verbose('WechatyVorpalFriday', 'Dreamily()')

  return function DreamilyExtension (vorpal: Vorpal) {
    log.verbose('WechatyVorpalFriday', 'DreamilyExtension(vorpal)')

    vorpal
      .command('dreamily <content>', '彩云小梦 Dreamily 帮你续写小说！')
      .option('-s --style [style]', 'Style of the story: ' + Object.keys(StoryStyle).join(', '))
      .action(dreamilyAction)
  }
}

interface DreamilyOptions {
  style?: StoryStyle
}

async function dreamilyAction (
  this: CommandContext,
  args: Args
): Promise<number> {
  log.verbose('WechatyVorpalFriday', 'dreamilyAction("%s")', JSON.stringify(args))

  const options = args.options as any as DreamilyOptions

  const content = args['content'] as string

  if (options.style) {
    if (!(options.style in StoryStyle)) {
      this.stderr.next([
        `Error: style "${options.style}" is not supported. `,
        `Please pict one from ${Object.keys(StoryStyle).join(', ')}`,
      ].join(''))
      return -1
    }
  }

  const style: StoryStyle = options.style
    ? options.style in StoryStyle
      ? options.style
      : StoryStyle.imaginative
    : StoryStyle.imaginative

  const apiOption: DreamilyApiOptions = {
    content,
    style,
  }

  this.stdout.next(`Please wait... Dreamily is thinking how to continue writing "${content}" ...`)
  const reply = await dreamilyApi(apiOption)
  this.stdout.next(content + '...\n' + reply)
  this.stdout.next('Thanks for ask Dreamily for writing, you are welcome to try more if you like it!')

  return 0
}

export { Dreamily }
