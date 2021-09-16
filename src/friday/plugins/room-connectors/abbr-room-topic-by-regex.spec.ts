#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
/**
 *   Wechaty - https://github.com/chatie/wechaty
 *
 *   @copyright 2016-2018 Huan LI <zixia@zixia.net>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

import { test } from 'tstest'
import type { Message } from 'wechaty'

import { abbrRoomTopicForAll } from './abbr-room-topic-by-regex.js'

test('abbrRoomTopicForAll()', async t => {
  const FIXTURES = [
    ["Wechaty Developers' Home 8", 'Home 8'],
    ["Wechaty Developers' Home", 'Home'],
    ['Python Wechaty User Group', 'Python'],
    ['Wechaty Broadcast Station', 'Station'],
  ]

  for (const [topic, expected] of FIXTURES as [string, string][]) {
    const actual = await abbrRoomTopicForAll({
      room: () => ({
        topic: () => topic,
      }),
    } as any as Message)
    t.equal(actual, expected, `should convert "${topic}" => "${expected}"`)
  }
})
