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
import {
  test,
  sinon,
}             from 'tstest'

import request from 'supertest'
import {
  Test,
  TestingModule,
}                   from '@nestjs/testing'
import { INestApplication, Logger } from '@nestjs/common'

import * as PUPPET from 'wechaty-puppet'

import { PresentationModule } from '../src/presentations/mod.js'
import { EnvVar }       from '../src/infrastructures/mod.js'

import type { ChatopsDto } from '../src/presentations/interfaces/chatops-dto.interface.js'

import envFixture from './fixtures/env.js'
import { WechatyRepository } from '../src/wechaty-repository/wechaty.repository.js'

test('Friday Controler', async t => {
  let app: INestApplication
  let testingModule: TestingModule
  let sandbox: sinon.SinonSandbox
  let spy: sinon.SinonSpy

  t.beforeEach(async () => {
    sandbox = sinon.createSandbox()

    const builder = Test.createTestingModule({
      imports: [PresentationModule],
    })

    builder
      .setLogger(new Logger('E2ETesting'))
      .overrideProvider(EnvVar)
      .useValue(new EnvVar({
        ...envFixture as any,
        WECHATY_DISABLE_GITTER   : 'true',
        WECHATY_DISABLE_OA       : 'true',
        WECHATY_DISABLE_QQ       : 'true',
        WECHATY_DISABLE_WHATSAPP : 'true',
        WECHATY_DISABLE_WXWORK   : 'true',
        // WECHATY_DISABLE_WECHAT   : 'true',
      }))

    testingModule = await builder.compile()

    app = testingModule.createNestApplication()
    await app.init()

    const repository = testingModule.get<WechatyRepository>(WechatyRepository)
    const weChatWechaty = repository.findByName('WeChat')
    if (!weChatWechaty) {
      throw new Error('no WeChat wechaty')
    }

    spy = sandbox.fake.resolves(undefined)
    sandbox.replace(weChatWechaty.puppet, 'messageSend', spy)
  })

  t.afterEach(async () => {
    await app.close()
    await testingModule.close()
    sandbox.restore()
  })

  await t.test('POST chatops/:roomId', async t => {
    const EXPECTED_ROOM_ID  = 'expected-room-id'
    const EXPECTED_TEXT     = 'expected-text'
    const EXPECTED_SAYABLE = PUPPET.payloads.sayable.text(EXPECTED_TEXT)

    const dto: ChatopsDto = {
      text: EXPECTED_TEXT,
    }

    await t.resolves(
      () => request(app.getHttpServer())
        .post(`/chatops/${EXPECTED_ROOM_ID}`)
        .send(dto)
        .expect(201),
    )
    t.ok(spy.calledOnce, 'get called once')

    t.same(spy.args[0]![1], EXPECTED_SAYABLE, 'received chatops message send call')
  })

  t.teardown(async () => {
  })
})
