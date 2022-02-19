#!/usr/bin/env ts-node

import { test }  from 'tstest'

import {
  chatApi,
}                   from './chitchat-api.js'

test.skip('chatApi()', async (t) => {
  const GOSSIP = '今天天气不错！'
  const reply = await chatApi(GOSSIP)

  t.true(reply.length > 0, 'should get reply text: ' + reply)
})
