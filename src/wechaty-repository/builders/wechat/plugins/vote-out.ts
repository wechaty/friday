/* eslint-disable sort-keys */
import type {
  Message,
}                   from 'wechaty'
import {
  VoteOut,
  VoteOutConfig,
}                   from 'wechaty-voteout'
import type {
  talkers,
}                   from 'wechaty-plugin-contrib'
import type { WeChatSettings } from '../../../settings/mod'

const warn: talkers.RoomTalkerOptions = [
  '{{ downEmoji }}-{{ downNum }}{{#upNum}} | +{{ upNum }}{{ upEmoji }}{{/upNum}}',
  '———————————',
  'The one who has been voted {{ downEmoji }} by {{ threshold }} people will be removed from the room as an unwelcome guest.',
  '{{#upNum}}{{ upEmoji }} By {{ upVoters }}{{/upNum}}',
  '{{#downNum}}{{ downEmoji }} By {{ downVoters }}{{/downNum}}',
].join('\n')

const kick: talkers.MessageTalkerOptions = [
  'UNWELCOME GUEST CONFIRMED:\n[Dagger] {{ votee }} [Cleaver]\n\nThank you [Rose] {{ downVoters }} [Rose] for voting for the community, we appreciate it.\n\nThanks everyone in this room for respecting our CODE OF CONDUCT.\n',
  'Removing {{ votee }} out of this room ...',
  async (message: Message) => {
    const room = message.room()
    if (room) {
      const mentionList = await message.mentionList()
      const votee = mentionList[0]
      if (votee) {
        await room.remove(votee).then(_ => 'Done.')
      }
    }
    return undefined
  },
]

const repeat: talkers.RoomTalkerOptions = [
  'You can only vote {{ votee }} for once.',
]

const getVoteOutPlugin = (settings: WeChatSettings) => {
  const config: VoteOutConfig = {
    room: [
      /^Wechaty Developers/i,
      /^Youth fed the/i,
      /^Wechaty Plugin Developers/i,
      /^Wechaty Testing$/,
      ...Object.values(settings.rooms.wechatyUserGroup).flat(), // MULTI_LANG_ROOM_ID,
    ],
    threshold: 3,
    kick,
    repeat,
    warn,
    downEmoji: [
      '[ThumbsDown]',
      '[弱]',
      '/:MMWeak',
      '<img class="qqemoji qqemoji80" text="[弱]_web" src="/zh_CN/htmledition/v2/images/spacer.gif" />',
    ],
    upEmoji: [
      '[ThumbsUp]',
      '[强]',
      '/:MMStrong',
      '< img class="qqemoji qqemoji79" text="[强]_web" src="/zh_CN/htmledition/v2/images/spacer.gif”>',
    ],
    whitelist: [
      'lizhuohuan',
    ],
  }

  const VoteOutPlugin = VoteOut(config)
  return VoteOutPlugin
}

export {
  getVoteOutPlugin,
}
