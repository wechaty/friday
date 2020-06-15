/* eslint-disable sort-keys */
import {
  Contact,
  Room,
}                   from 'wechaty'
import {
  VoteOut,
  VoteOutConfig,
}                   from 'wechaty-voteout'
import {
  talkers,
}                   from 'wechaty-plugin-contrib'

const warn: talkers.RoomTalkerOptions = [
  '{{ downEmoji }}-{{ downNum }}{{#upNum}} | +{{ upNum }}{{ upEmoji }}{{/upNum}}',
  '———————————',
  'The one who has been voted {{ downEmoji }} by {{ threshold }} people will be removed from the room as an unwelcome guest.',
  '{{#upVoters}}{{ upEmoji }} By {{ upVoters }}{{/upVoters}}',
  '{{#downVoters}}{{ downEmoji }} By {{ downVoters }}{{/downVoters}}',
].join('\n')

const kick: talkers.RoomTalkerOptions = [
  'UNWELCOME GUEST CONFIRMED:\n[Dagger] {{ votee }} [Cleaver]\n\nThank you [Rose] {{ downVoters }} [Rose] for voting for the community, we appreciate it.\n\nThanks everyone in this room for respecting our CODE OF CONDUCT.\n',
  'Removing {{ votee }} out to this room ...',
  (room: Room, contact: Contact) => room.del(contact).then(_ => 'Done.'),
]

const repeat: talkers.RoomTalkerOptions = [
  'You can only vote {{ votee }} for once.',
]

const config: VoteOutConfig = {
  room: [
    /^Wechaty Developers/i,
    /^Youth fed the/i,
    /^test/i,
  ],
  downEmoji: [
    '[ThumbsUp]',
    '[强]',
    '/:MMStrong',
    '< img class="qqemoji qqemoji79" text="[强]_web" src="/zh_CN/htmledition/v2/images/spacer.gif”>',
  ],
  kick,
  repeat,
  threshold: 3,
  upEmoji: [
    '[ThumbsDown]',
    '[弱]',
    '/:MMWeak',
    '<img class="qqemoji qqemoji80" text="[弱]_web" src="/zh_CN/htmledition/v2/images/spacer.gif" />',
  ],
  warn,
  whitelist: [
    'lizhuohuan',
  ],
}

export const VoteOutPlugin = VoteOut(config)
