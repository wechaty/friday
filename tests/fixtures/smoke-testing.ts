import { getWechaty } from '../../src/get-wechaty'
import { startBot }   from '../../src/start-bot'
import { startFinis } from '../../src/start-finis'
import { startWeb }   from '../../src/start-web'

process.env.WECHATY_PUPPET = 'wechaty-puppet-mock'

async function main () {
  const bot = getWechaty('smoke-testing')

  await Promise.all([
    bot.start(),
    startBot(bot),
    startFinis(bot),
    startWeb(bot),
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
