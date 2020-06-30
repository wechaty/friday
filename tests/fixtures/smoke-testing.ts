import { getWechaty } from '../../src/wechaty/mod'
import { setupWeb }   from '../../src/web/mod'

process.env.WECHATY_PUPPET = 'wechaty-puppet-mock'

async function main () {
  const bot = getWechaty('smoke-testing')

  await bot.start()
  await setupWeb(bot)

  await bot.stop()

  return 0
}

main()
  .then(process.exit)
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
