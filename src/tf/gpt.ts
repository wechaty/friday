// import {
//   log,
// }                 from 'wechaty'
// import {
//   Vorpal,
//   CommandContext,
//   Args,
// }                           from 'wechaty-vorpal'

// import { chatApi } from './chitchat-api'

// function Chitchat () {
//   log.verbose('WechatyVorpalFriday', 'Chitchat()')

//   return function ChitchatExtension (vorpal: Vorpal) {
//     log.verbose('WechatyVorpalFriday', 'ChitchatExtension(vorpal)')

//     vorpal
//       .command('chitchat <gossip>', 'Small talk with our chatbot!')
//       .option('-l --length <number>', 'the maximum reply length')
//       .action(chitchatAction)
//   }
// }

// interface ChitchatOptions {
//   length?: number
// }

// async function chitchatAction (
//   this: CommandContext,
//   args: Args
// ): Promise<number> {
//   log.verbose('WechatyVorpalFriday', 'chitchatAction("%s")', JSON.stringify(args))

//   const gossip: string = args.gossip as string
//   const options = args.options as any as ChitchatOptions

//   const normalizedOptions = {
//     length: gossip.length + 3,
//     ...options,
//   }

//   this.stdout.next(`Room<${options.room}> announced.`)
//   return 0
// }

// export { Announce }
