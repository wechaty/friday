/* eslint-disable sort-keys */
import {
  VoteOut,
  VoteOutConfig,
}                             from 'wechaty-voteout'

const config: Partial<VoteOutConfig> = {
  // When the people reach the target, then means (s)he has been voted out.
  target: 3,
  warnTemplate: 'You have been warned {{ count }} times，you will be removed if you receive {{ target }} consecutive warnings.',
  kickoutTemplate: 'You have been voted to be an unwelcome guest in this room by {{ voters }}, kicking you out is a significant notice for everyone who is still in this room be nice, bye-bye...',
  room: [
    /Wechaty Developers/i,
    /Youth fed the/i,
  ],
  // Who never be kicked out by voting
  whiteList: [
    'lizhuohuan',
  ],
}

export const VoteOutPlugin = VoteOut(config)
