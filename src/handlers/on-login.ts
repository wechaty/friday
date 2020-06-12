import {
  Contact,
  log,
  VERSION,
  Wechaty,
}             from 'wechaty'

export default async function onLogin (
  this : Wechaty,
  user : Contact,
): Promise<void> {
  const msg = `${user.name()} BOT5 v${VERSION} logged in`
  log.info('startBot', 'onLogin(%s) %s', user, msg)
  await user.say(msg)
}
