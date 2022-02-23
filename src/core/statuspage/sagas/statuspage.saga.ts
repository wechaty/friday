import { Injectable } from '@nestjs/common'
import { ICommand, ofType, Saga } from '@nestjs/cqrs'
import {
  merge,
  Observable,
  Subject,
}                     from 'rxjs'
import {
  map,
  scan,
  throttleTime,
  tap,
  filter,
  ignoreElements,
  share,
}                      from 'rxjs/operators'
import TimeConstants   from 'time-constants'

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
export class StatuspageSaga {

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
    const resetSubject$ = new Subject<void>()

    const counter$ = merge(
      events$.pipe(
        ofType(MessageMobileTerminatedEvent),
      ),
      resetSubject$,  // send `undefined` (void) to reset the `scan` state (accumarator)
    ).pipe(
      tap(e => console.info('##### 1 next:', e)),
      /**
       * If `value` is `undefined` (void), then reset `counter` to 0
       */
      scan((counter, value) => (value ? ++counter : 0), 0),
      tap(e => console.info('##### 2 counter:', e)),
      throttleTime(
        // 300000,
        5 * TimeConstants.MINUTE,
        undefined,
        {
          trailing: true, // emit the last value instead of the first
        },
      ),
      tap(e => console.info('##### 3 throttled counter:', e)),
      share(),  // <- make the `counter$` observable hot Huan(202202)
    )

    const reset$ = counter$.pipe(
      tap(e => console.info('#### 4 reset$ counter:', e)),
      filter(e => e > 0),
      tap(_ => console.info('#### 5 reset$ resetSubject.next')),
      tap(_ => resetSubject$.next()),
      ignoreElements(),
    )

    const command$ = counter$.pipe(
      map(count =>
        new SubmitMessagesMobileTerminatedCountCommand(count),
      ),
    )

    return merge(
      reset$,
      command$,
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
      throttleTime(
        5 * TimeConstants.MINUTE,
        undefined,
        {
          trailing: true, // emit the last value instead of the first
        },
      ),
      tap(_ => resetCounter$.next()),
      map(count =>
        new SubmitMessagesMobileOriginatedCountCommand(count),
      ),
    )
  }

}
