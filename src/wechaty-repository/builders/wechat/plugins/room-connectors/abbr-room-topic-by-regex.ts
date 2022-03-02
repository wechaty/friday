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
const abbrRoomTopicForDevelopersHome = abbrRoomTopicByRegex(/^Wechaty\s+.*?([^\s]+\s*(\d+)?)$/i)
/**
 * "Python Wechaty User Group" -> "Python"
 */
const abbrRoomTopicForPolyglot = abbrRoomTopicByRegex(/^\s*([^\s]+)\s+Wechaty User Group$/i)

/**
 * "Wechaty Puppet WhatsApp" -> "WhatsApp"
 */
const abbrRoomTopicForPuppet = abbrRoomTopicByRegex(/^Wechaty Puppet ([^\s]+)$/i)

const abbrRoomTopicForBot5 = abbrRoomTopicByRegex(/^(BOT5) /)

const abbrRoomTopicForAll = async (message: Message) => {
  return await abbrRoomTopicForDevelopersHome(message)
    || await abbrRoomTopicForPolyglot(message)
    || await abbrRoomTopicForPuppet(message)
    || await abbrRoomTopicForBot5(message)
}

export {
  abbrRoomTopicByRegex,
  abbrRoomTopicForDevelopersHome,
  abbrRoomTopicForAll,
}
