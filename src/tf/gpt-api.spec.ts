#!/usr/bin/env ts-node

import test  from 'tstest'

import {
  gptApi,
}                   from './gpt-api'

test('gptApi()', async (t) => {
  const PREFIX = '今天天气不错！'
  const LENGTH = 5
  const result = await gptApi(PREFIX, LENGTH)

  t.true(result.length > LENGTH, 'should get reply text: ' + result)
})
