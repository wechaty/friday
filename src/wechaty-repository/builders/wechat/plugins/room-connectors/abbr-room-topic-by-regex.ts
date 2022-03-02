import type { Message } from 'wechaty'

function abbrRoomTopicByRegex (matcher: RegExp) {
  return async function abbrRoomTopic (message: Message): Promise<undefined | string> {
    const room = message.room()
    if (!room) {
      return
    }

    const topic = await room.topic()
    const matched = topic.match(matcher)

    if (!matched) {
      return
    }

    return matched[1]
  }
}

/**
 * "Wechaty Developers' Home 8" -> "Home 8"
 */
const abbrRoomTopicForDevelopersHome = abbrRoomTopicByRegex(/^Wechaty\s+.*?([^\s]+\s*(\d+)?)$/)
/**
 * "Python Wechaty User Group" -> "Python"
 */
const abbrRoomTopicForPolyglot = abbrRoomTopicByRegex(/^\s*([^\s]+)\s+Wechaty User Group$/)

/**
 * "Wechaty Puppet WhatsApp" -> "WhatsApp"
 */
const abbrRoomTopicForPuppet = abbrRoomTopicByRegex(/^Wechaty Puppet ([^\s]+)$/)

const abbrRoomTopicForBot5 = abbrRoomTopicByRegex(/^(BOT5) /)

const abbrRoomTopicForAll = async (message: Message) => {
  return await abbrRoomTopicForPolyglot(message)
    || await abbrRoomTopicForBot5(message)
    || await abbrRoomTopicForPuppet(message)
    || await abbrRoomTopicForDevelopersHome(message)
}

export {
  abbrRoomTopicByRegex,
  abbrRoomTopicForDevelopersHome,
  abbrRoomTopicForAll,
}
