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
import request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import type { INestApplication } from '@nestjs/common'

import {
  test,
  sinon,
}             from 'tstest'

import { ChatopsCommand } from '../src/friday-controller/mod.js'

import { FridayBotModule } from '../src/friday-bot.module.js'
import { CommandBus } from '@nestjs/cqrs'
import type { ChatopsDto } from '../src/friday-controller/interfaces/chatops-dto.interface.js'
import { EnvVar } from '../src/wechaty-settings/env-var.js'

test('Friday Controler', async t => {
  let app: INestApplication
  let testingModule: TestingModule
  let sandbox: sinon.SinonSandbox

  t.beforeEach(async t => {
    sandbox = sinon.createSandbox()

    const builder = Test.createTestingModule({
      imports: [FridayBotModule],
    })

    builder
      .setLogger(console)
      .overrideProvider(EnvVar)
      .useValue(new EnvVar({
        WECHATY_PLUGIN_QNAMAKER_ENDPOINT_KEY: 'x',
        WECHATY_PLUGIN_QNAMAKER_KNOWLEDGE_BASE_ID_CEIBS: 'x',
        WECHATY_PLUGIN_QNAMAKER_RESOURCE_NAME_CEIBS: 'x',
      }))

    testingModule = await builder.compile()

    const commandBus = testingModule.get(CommandBus)
    const spy = sandbox.spy(commandBus, 'execute')

    app = testingModule.createNestApplication()
    await app.init()

    t.context.spy = spy
  })

  t.afterEach(async t => {
    await testingModule.close()
    sandbox.restore()
    t.context.spy.resetHistory()
  })

  await t.test('POST chatops/:roomId', async t => {
    const EXPECTED_ROOM_ID  = 'expected-room-id'
    const EXPECTED_TEXT     = 'expected-text'

    const dto: ChatopsDto = {
      text: EXPECTED_TEXT,
    }

    await t.resolves(
      () => request(app.getHttpServer())
        .post(`/chatops/${EXPECTED_ROOM_ID}`)
        .send(dto)
        .expect(200),
    )
    t.equal(t.context.spy.calledOnce(), 'get called once')

    const command = new ChatopsCommand(
      EXPECTED_ROOM_ID,
      EXPECTED_TEXT,
    )

    t.same(t.context.spy.args[0][0], command, 'received chatops command')
  })

  t.teardown(async () => {
    await app.close()
  })
})
