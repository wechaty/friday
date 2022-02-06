import { Injectable } from '@nestjs/common'
import { ICommand, ofType, Saga } from '@nestjs/cqrs'
import { merge, Observable, Subject } from 'rxjs'
import {
  map,
  scan,
  throttleTime,
  tap,
}                 from 'rxjs/operators'
import * as TimeConstants from 'time-constants'

import { SubmitCommunityMembersCountCommand } from '../commands/impls/submit-community-members-count.command.js'
import { SubmitReceivedMessagesCountCommand } from '../commands/impls/submit-received-messages-count.command.js'
import { SubmitSentMessagesCountCommand } from '../commands/impls/submit-sent-messages-count.command.js'
import { CommunityDevelopersCountedEvent } from '../events/impls/community-developers-counted.event.js'
import { MessageReceivedEvent, MessageSentEvent } from '../events/mod.js'

@Injectable()
export class StatusPageSagas {

  @Saga()
  communityDevelopersCounted (events$: Observable<any>): Observable<ICommand> {
    return events$
      .pipe(
        ofType(
          CommunityDevelopersCountedEvent,
        ),
        map(event =>
          new SubmitCommunityMembersCountCommand(event.counter),
        ),
      )
  }

  @Saga()
  messageReceived (events$: Observable<any>): Observable<ICommand> {
    const resetCounter$ = new Subject<void>()
    return merge(
      events$.pipe(
        ofType(MessageReceivedEvent),
      ),
      resetCounter$,  // send `undefined` (void) to reset the `scan` state (accumarator)
    ).pipe(
      /**
       * If `value` is `undefined` (void), then reset `counter` to 0
       */
      scan((counter, value) => (value ? ++counter : 0), 0),
      throttleTime(5 * TimeConstants.MINUTE, undefined, {
        trailing: true, // emit the last value instead of the first
      }),
      tap(_ => resetCounter$.next()),
      map(count =>
        new SubmitReceivedMessagesCountCommand(count),
      ),
    )
  }

  @Saga()
  messageSent (events$: Observable<any>): Observable<ICommand> {
    const resetCounter$ = new Subject<void>()
    return merge(
      events$.pipe(
        ofType(MessageSentEvent),
      ),
      resetCounter$,  // send `undefined` (void) to reset the `scan` state (accumarator)
    ).pipe(
      /**
       * If `value` is `undefined` (void), then reset `counter` to 0
       */
      scan((counter, value) => (value ? ++counter : 0), 0),
      throttleTime(5 * TimeConstants.MINUTE, undefined, {
        trailing: true, // emit the last value instead of the first
      }),
      tap(_ => resetCounter$.next()),
      map(count =>
        new SubmitSentMessagesCountCommand(count),
      ),
    )
  }

}
