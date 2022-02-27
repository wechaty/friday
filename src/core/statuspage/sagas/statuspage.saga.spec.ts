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
import {
  test,
  testSchedulerRunner,
}                       from 'tstest'

import {
  MessageMobileOriginatedEvent,
  MessageMobileTerminatedEvent,
}                                               from '../events/mod.js'
import {
  SubmitMessagesMobileOriginatedCountCommand,
  SubmitMessagesMobileTerminatedCountCommand,
}                                               from '../commands/mod.js'

import { StatuspageSaga }               from './statuspage.saga.js'

/**
 * See: https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md
 * See Also: https://github.com/ohjames/rxjs-websockets/blob/master/src/index.spec.ts
 */
test('messageReceived()', testSchedulerRunner(m => {
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
    0: COMMAND_0,
    1: COMMAND_1,
    2: COMMAND_2,

    a: EVENT_0,
    b: EVENT_1,
    c: EVENT_2,
  }

  const actual    = '5m     --a-b 995ms 59s 4m    -c 998ms 59s 4m    - 999ms 59s 4m    5m                 |   '
  const expected  = '5m     0---- 995ms 59s 4m    2- 998ms 59s 4m    1 999ms 59s 4m    0 999ms 59s 4m     (0|)'

  const source$ = saga.messageReceived(
    m.hot(actual, values),
  )

  m.expectObservable(source$).toBe(expected, values)
}))

test('messageSent()', testSchedulerRunner(m => {
  const saga = new StatuspageSaga()

  const PUPPET_ID   = 'PUPPET_ID'
  const MESSAGE_ID  = 'MESSAGE_ID'

  const EVENT_0   = new MessageMobileOriginatedEvent(PUPPET_ID, MESSAGE_ID + 0)
  const EVENT_1   = new MessageMobileOriginatedEvent(PUPPET_ID, MESSAGE_ID + 1)
  const EVENT_2   = new MessageMobileOriginatedEvent(PUPPET_ID, MESSAGE_ID + 2)

  const COMMAND_1 = new SubmitMessagesMobileOriginatedCountCommand(1)
  const COMMAND_2 = new SubmitMessagesMobileOriginatedCountCommand(2)

  const values = {
    1: COMMAND_1,
    2: COMMAND_2,

    a: EVENT_0,
    b: EVENT_1,
    c: EVENT_2,
  }

  const actual    = '--a-b 995ms 59s 4m    -c------ 1m |   '
  const expected  = '                5m    2------- 1m (1|)'

  const source$ = saga.messageSent(
    m.hot(actual, values),
  )

  m.expectObservable(source$).toBe(expected, values)
}))
