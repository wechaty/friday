#!/usr/bin/env ts-node
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

import test  from 'blue-tape'

import { getFriday }  from '../src/friday/bot'

// import { spy } from 'sinon'

test('smoke testing with perfect restart', async t => {
  const ORIGINAL_WECHATY_PUPPET = process.env.WECHATY_PUPPET

  process.env.WECHATY_PUPPET = 'wechaty-puppet-mock'
  const wechaty = getFriday('test')
  t.ok(wechaty, 'should instantiated a wecahty successfully')

  await wechaty.start()
  await wechaty.stop()
  t.pass('should stop-ed wecahty successfully')

  process.env.WECHATY_PUPPET = ORIGINAL_WECHATY_PUPPET
})
