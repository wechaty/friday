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

import TimeConstants    from 'time-constants'

import {
  countTime,
}                   from './count-time.js'

/**
 * See: https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md
 * See Also: https://github.com/ohjames/rxjs-websockets/blob/master/src/index.spec.ts
 */
test('RxJS operator: countTime()', testSchedulerRunner(m => {
  const actual    = '-0-0 996ms 59s 4m    0-0-0- 994ms 59s 4m     - 999ms 59s 4m    - 999ms 59s 4m    |   '
  const expected  = '               5m    2----- 994ms 59s 4m     3 999ms 59s 4m    0 999ms 59s 4m    (0|)'

  const result$ = m.cold(actual).pipe(
    countTime(5 * TimeConstants.MINUTE),
  )

  m.expectObservable(result$).toBe(expected)
}))
