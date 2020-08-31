#!/usr/bin/env ts-node

import test  from 'tstest'

import {
  gptApi,
}                   from './gpt-api'

test('gptApi()', async (t) => {
  const PREFIX = '天是sky，地是land，云是'
  const LENGTH = 5
  const result = await gptApi(PREFIX, LENGTH)

  t.true(result.length > LENGTH, 'should get reply text: ' + result)
})
