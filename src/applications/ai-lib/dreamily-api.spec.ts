#!/usr/bin/env ts-node

import { test }  from 'tstest'

import {
  StoryStyle,
  dreamilyApi,
}                   from './dreamily-api.js'

test.skip('Dreamily API', async (t) => {
  const PAYLOAD = {
    content: '不想当将军的司机不是好厨子',
    style: StoryStyle.imaginative,
  }

  // console.info('payload', PAYLOAD)

  const text = await dreamilyApi(PAYLOAD)

  console.info('text:', text)
  await t.skip('tbw')
})
