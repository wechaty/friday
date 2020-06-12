import {
  log,
}                     from './config'
import { getWechaty } from './get-wechaty'
import { setupWechatyPlugin }   from './setup-wechaty'
import { setupFinis } from './setup-finis'
import { setupWeb }   from './setup-web'

async function main () {
  log.verbose('main', 'main()')

  const name = process.env.WECHATY_NAME || 'heroku-wechaty'

  const bot = getWechaty(name)
  setupWechatyPlugin(bot)

  await Promise.all([
    bot.start(),
    setupFinis(bot),
    setupWeb(bot),
  ])

  while (bot.state.on()) {
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  return 0
}

main()
  .then(process.exit)
  .catch((e) => {
    log.error('Main', 'main() rejection: %s', e)
    process.exit(1)
  })
