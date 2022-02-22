import { Injectable } from '@nestjs/common'
import { ICommand, ofType, Saga } from '@nestjs/cqrs'
import { merge, Observable, Subject } from 'rxjs'
import {
  map,
  scan,
  throttleTime,
  tap,
}                           from 'rxjs/operators'
import * as TimeConstants   from 'time-constants'

import {
  SubmitCommunityMembersCountCommand,
  SubmitMessagesMobileTerminatedCountCommand,
  SubmitMessagesMobileOriginatedCountCommand,
}                                               from '../commands/mod.js'
import {
  MessageMobileTerminatedEvent,
  MessageMobileOriginatedEvent,
  CommunityDevelopersCountedEvent,
}                                               from '../events/mod.js'

@Injectable()
export class StatusPageSaga {

  @Saga()
  communityDevelopersCounted = (events$: Observable<any>): Observable<ICommand> => {
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
  messageReceived = (events$: Observable<any>): Observable<ICommand> => {
    const resetCounter$ = new Subject<void>()
    return merge(
      events$.pipe(
        ofType(MessageMobileTerminatedEvent),
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
        new SubmitMessagesMobileTerminatedCountCommand(count),
      ),
    )
  }

  @Saga()
  messageSent = (events$: Observable<any>): Observable<ICommand> => {
    const resetCounter$ = new Subject<void>()
    return merge(
      events$.pipe(
        ofType(MessageMobileOriginatedEvent),
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
        new SubmitMessagesMobileOriginatedCountCommand(count),
      ),
    )
  }

}
