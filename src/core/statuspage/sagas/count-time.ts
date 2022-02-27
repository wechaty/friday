import type {
  Observable,
}                     from 'rxjs'
import {
  windowTime,
  mergeMap,
  count,
}                    from 'rxjs/operators'
import TimeConstants from 'time-constants'

/**
 * SO: Count events over a period of time and yield the sum once every second in RxJS
 *  @link https://stackoverflow.com/a/38223648/1123955
 *
 * @param {number} periodMs: period of time in milliseconds, default 5 minutes
 */
const countTime = (
  periodMs = 5 * TimeConstants.MINUTE,
) => (
  obs: Observable<any>,
) => obs.pipe(
  windowTime(periodMs),
  mergeMap(window => window.pipe(
    count(),
  )),
)

export {
  countTime,
}
