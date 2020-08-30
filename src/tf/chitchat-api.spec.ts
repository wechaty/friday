#!/usr/bin/env ts-node

import test  from 'tstest'

import {
  chatApi,
}                   from './chitchat-api'

test('chatApi()', async (t) => {
  const GOSSIP = '今天天气不错！'
  const reply = await chatApi(GOSSIP)

  t.true(reply.length > 2, 'should get reply text: ' + reply)
})
