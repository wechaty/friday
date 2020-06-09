/* eslint-disable sort-keys */
import {
  VoteOut,
  VoteOutConfig,
}                 from 'wechaty-voteout'

// import {
//   DEVELOPERS_ROOM_ID_LIST,
// }                           from '../rooms-config'

const config: VoteOutConfig = {
  // When the people reach the target, then means (s)he has been voted out.
  target: 3,
  // Warn template, set to falsy to disable the warn message
  warnTemplate: '可能是因为你的聊天内容不当导致被用户投票，当前票数为 {{ count }}，当天累计票数达到 {{ target }} 时，你将被请出此群。',
  // Kickout template, set to falsy to disable the message.
  kickoutTemplate: '经 {{ voters }} 几人投票，你即将离开此群。',
  // Different puppet get different sign
  // We run more cases to see what sign it is, and update the comment here.
  sign: [
    '[弱]',
    '[ThumbsDown]',
    '<img class="qqemoji qqemoji80" text="[弱]_web" src="/zh_CN/htmledition/v2/images/spacer.gif" />',
  ],

  // The function to check if some one is voted.
  // Default function is to check is there a sign in the text.
  isVoted: null,
  // Which room(s) you want the bot to work with.
  // Can be a room topic array or a function
  // E.g. ['Room1', 'Room2']
  // E.g. room: function (room) { room.topic().indexOf('我的') > -1 }
  // Set to falsy value means works for all rooms.
  room: false,
  // Who never be kickedout by voting
  whiteList: [],
  // Vote expred time, default to 1 day.
  expired: 24 * 3600 * 1000, // 1 day
}

export const VoteOutPlugin = VoteOut(config)
