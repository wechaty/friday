import { Injectable } from '@nestjs/common'
import { ICommand, ofType, Saga } from '@nestjs/cqrs'
import type {
  Observable,
}                     from 'rxjs'
import {
  map,
  tap,
}                      from 'rxjs/operators'

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

import { countTime } from './count-time.js'

@Injectable()
export class StatuspageSaga {

  @Saga()
  communityDevelopersCounted = (events$: Observable<any>): Observable<ICommand> => {
    return events$
      .pipe(
        ofType(CommunityDevelopersCountedEvent),
        map(event => new SubmitCommunityMembersCountCommand(event.counter)),
      )
  }

  @Saga()
  messageReceived = (events$: Observable<any>): Observable<ICommand> => events$.pipe(
    ofType(MessageMobileTerminatedEvent),
    countTime(),
    map(count => new SubmitMessagesMobileTerminatedCountCommand(count)),
  )

  @Saga()
  messageSent = (events$: Observable<any>): Observable<ICommand> => events$.pipe(
    tap(e => console.info('### Saga messageSent Event:', e)),
    ofType(MessageMobileOriginatedEvent),
    tap(e => console.info('### Saga messageSent MessageMobileOriginatedEvent:', e)),
    countTime(),
    tap(e => console.info('### Saga MessageMobileOriginatedEvent count:', e)),
    map(count => new SubmitMessagesMobileOriginatedCountCommand(count)),
  )

}
