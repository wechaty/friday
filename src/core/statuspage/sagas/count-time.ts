import type {
  Observable,
}                     from 'rxjs'
import {
  windowTime,
  mergeMap,
  count,
}                    from 'rxjs/operators'
import TimeConstants from 'time-constants'

const countTime = (periodMs = 5 * TimeConstants.MINUTE) => (obs: Observable<any>) => obs.pipe(
  windowTime(periodMs),
  mergeMap(window => window.pipe(
    count(),
  )),
)

export {
  countTime,
}
