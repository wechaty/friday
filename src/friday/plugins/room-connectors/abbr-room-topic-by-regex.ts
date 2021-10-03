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

const abbrRoomTopicForBot5 = abbrRoomTopicByRegex(/^(BOT)/)

const abbrRoomTopicForAll = async (message: Message) => {
  let topic = await abbrRoomTopicForPolyglot(message)
  if (topic) {
    return topic
  }

  topic = await abbrRoomTopicForBot5(message)
  if (topic) {
    return 'BOT5'
  }

  return abbrRoomTopicForDevelopersHome(message)
}

export {
  abbrRoomTopicByRegex,
  abbrRoomTopicForDevelopersHome,
  abbrRoomTopicForAll,
}
