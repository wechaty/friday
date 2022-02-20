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
import 'dotenv/config'
import { getLogger } from 'brolog'

import { WeChatBuilder }  from '../src/wechaty-repository/wechat/wechat-builder.js'
import {
  WeChatSettings,
  EnvVar,
}                   from '../src/wechaty-settings/mod.js'

test('smoke testing with perfect restart', async t => {
  const ORIGINAL_WECHATY_PUPPET = process.env['WECHATY_PUPPET']

  process.env['WECHATY_TOKEN'] = 'mock_token'
  process.env['WECHATY_PUPPET_SERVER_PORT'] = '18788'

  process.env['WECHATY_PUPPET'] = 'wechaty-puppet-mock'

  const logger =  getLogger()
  const envVar = new EnvVar()
  const settings = new WeChatSettings(logger, new EnvVar())
  const builder = new WeChatBuilder(
    logger,
    envVar,
    settings,
  )
  const wechaty = builder.build()
  t.ok(wechaty, 'should instantiated a wecahty successfully')

  await wechaty.start()

  // Error: WebSocket was closed before the connection was established
  await new Promise(resolve => setTimeout(resolve, 3000))

  await wechaty.stop()
  t.pass('should stop-ed wecahty successfully')

  process.env['WECHATY_PUPPET'] = ORIGINAL_WECHATY_PUPPET
})
