import { getWechaty } from '../../src/get-wechaty'
import { setupWechatyPlugins }   from '../../src/setup-wechaty'
import { setupFinis } from '../../src/setup-finis'
import { setupWeb }   from '../../src/setup-web'

process.env.WECHATY_PUPPET = 'wechaty-puppet-mock'

async function main () {
  const bot = getWechaty('smoke-testing')

  setupWechatyPlugins(bot)

  await Promise.all([
    bot.start(),
    setupFinis(bot),
    setupWeb(bot),
  ])

  await bot.stop()

  return 0
}

main()
  .then(process.exit)
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
