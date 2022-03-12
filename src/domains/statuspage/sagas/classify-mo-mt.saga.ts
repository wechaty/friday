import { Injectable } from '@nestjs/common'
import { ICommand, ofType, Saga } from '@nestjs/cqrs'
import type { Observable } from 'rxjs'
import {
  map,
}                           from 'rxjs/operators'
import { PuppetMessageReceivedEvent } from '../../../wechaty-events/mod.js'
import { ClassifyMoMtCommand } from '../commands/impls/classify-mo-mt.command.js'

@Injectable()
export class ClassifyMoMtSaga {

  @Saga()
  puppetMessageReceived = (events$: Observable<any>): Observable<ICommand> => {
    return events$
      .pipe(
        ofType(
          PuppetMessageReceivedEvent,
        ),
        map(event =>
          new ClassifyMoMtCommand(event.puppetId, event.messageId),
        ),
      )
  }

}
