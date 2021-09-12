import {
  log,
}                 from 'wechaty'
import type {
  Vorpal,
  CommandContext,
  Args,
}                           from 'wechaty-vorpal'

import { gptApi } from './gpt-api.js'

function Gpt () {
  log.verbose('WechatyVorpalFriday', 'Gpt()')

  return function GptExtension (vorpal: Vorpal) {
    log.verbose('WechatyVorpalFriday', 'GptExtension(vorpal)')

    vorpal
      .command('gpt <prefix>', 'Make GPT writing for you.')
      .option('-l --length <number>', 'the maximum continue writing length')
      .action(gptAction)
  }
}

interface GptOptions {
  length?: number
}

async function gptAction (
  this: CommandContext,
  args: Args
): Promise<number> {
  log.verbose('WechatyVorpalFriday', 'gptAction("%s")', JSON.stringify(args))

  const prefix: string = args['prefix'] as string
  const options = args.options as any as GptOptions

  const normalizedOptions = {
    length: 20,
    ...options,
  }

  if (normalizedOptions.length > 100) {
    this.stderr.next('gpt continue writing can not longer than 100 words due to the resource limitation of our server. Donation is welcome! https://opencollective.com/wechaty')
    return 0
  }

  try {
    const text = await gptApi(prefix, normalizedOptions.length)
    this.stdout.next(`GPT: ${text}`)
    return 0
  } catch (e) {
    console.error(e)
    return 1
  }

}

export { Gpt }
