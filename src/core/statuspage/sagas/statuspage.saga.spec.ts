#!/usr/bin/env -S node --no-warnings --loader ts-node/esm
/**
 *   Wechaty - https://github.com/chatie/wechaty
 *
 *   @copyright 2022 Huan LI <zixia@zixia.net>
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
import {
  TestScheduler,
}                 from 'rxjs/testing'

import { StatuspageSaga } from './statuspage.saga.js'
import { MessageMobileTerminatedEvent } from '../events/mod.js'
import { SubmitMessagesMobileTerminatedCountCommand } from '../commands/mod.js'
import { throttleTime } from 'rxjs'

/**
 * See: https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md
 * See Also: https://github.com/ohjames/rxjs-websockets/blob/master/src/index.spec.ts
 */
test.only('messageReceived()', async t => {
  const scheduler = new TestScheduler((actual, expected) => {
    for (let i = 0; i < actual.length; i++) {
      t.same(actual[i], expected[i], `the marbals of actual is expected as ${expected[i].frame}/${expected[i].notification.kind}:${JSON.stringify(expected[i].notification.value)}`)
    }
  })

  scheduler.run(m => {
    const saga = new StatuspageSaga()

    const PUPPET_ID   = 'PUPPET_ID'
    const MESSAGE_ID  = 'MESSAGE_ID'

    const EVENT_0   = new MessageMobileTerminatedEvent(PUPPET_ID, MESSAGE_ID + 0)
    const EVENT_1   = new MessageMobileTerminatedEvent(PUPPET_ID, MESSAGE_ID + 1)
    const EVENT_2   = new MessageMobileTerminatedEvent(PUPPET_ID, MESSAGE_ID + 2)

    const COMMAND_0 = new SubmitMessagesMobileTerminatedCountCommand(0)
    const COMMAND_1 = new SubmitMessagesMobileTerminatedCountCommand(1)
    const COMMAND_2 = new SubmitMessagesMobileTerminatedCountCommand(2)

    const values = {
      a: EVENT_0,
      b: EVENT_1,
      c: EVENT_2,

      x: COMMAND_0,
      y: COMMAND_1,
      z: COMMAND_2,
    }

    const actual    = 'a - b - 4m 59s 996ms     - c'
    const expected  = '                  5m     z 4m 59s 999ms      y 4m 59s 999ms  x'

    const source$ = saga.messageReceived(
      m.hot(actual, values),
    )

    m.expectObservable(source$).toBe(expected, values)
  })
})

test('test', async t => {
  const scheduler = new TestScheduler((actual, expected) => {
    t.same(actual, expected, 'the marbals of actual is expected')
  })

  scheduler.run(m => {
    const time = 200
    const operation = throttleTime(time, undefined, { trailing: true })
    const actual   = 'abcdef'
    const expected = '200ms f'

    m.expectObservable(
      m.cold(actual).pipe(operation),
    ).toBe(expected)
  })
})
