import { getFriday } from '../../src/friday/bot.js'

process.env.WECHATY_PUPPET = 'wechaty-puppet-mock'

async function main () {
  const bot = getFriday('smoke-testing')

  await bot.start()
  await new Promise(resolve => setTimeout(resolve, 3000))
  await bot.stop()

  return 0
}

main()
  .then(process.exit)
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
