import {
  log,
}                 from 'wechaty'
import type {
  Vorpal,
  CommandContext,
  Args,
}                           from 'wechaty-vorpal'

import { chatApi } from './chitchat-api.js'

function Chitchat () {
  log.verbose('WechatyVorpalFriday', 'Chitchat()')

  return function ChitchatExtension (vorpal: Vorpal) {
    log.verbose('WechatyVorpalFriday', 'ChitchatExtension(vorpal)')

    vorpal
      .command('chitchat <gossip>', 'Small talk with our chatbot!')
      .option('-r --repl [time]', 'REPL mode. In this mode just send what you want to say, no command needed any more.')
      .action(chitchatAction)
  }
}

interface ChitchatOptions {
  repl?: string
}

async function chitchatAction (
  this: CommandContext,
  args: Args
): Promise<number> {
  log.verbose('WechatyVorpalFriday', 'chitchatAction("%s")', JSON.stringify(args))

  const options = args.options as any as ChitchatOptions
  void options

  const gossip: string = args['gossip'] as string
  const reply = await chatApi(gossip)
  this.stdout.next(reply)

  return 0
}

export { Chitchat }
