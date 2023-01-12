/**
 * Author: Huan <zixia@zixia.net>
 * Date: 2023-01-11
 * License: Apache-2.0
 *
 * Env var `WECHATY_REPOSITORY` for cherry pick the Wechaty instance to be used.
 * @see https://github.com/nodejs/node/blob/a9bc3cf39bc615bfa63b5b48b61cb847fdf84c52/lib/internal/util/debuglog.js#L25
 * @see https://github.com/debug-js/debug/blob/d1616622e4d404863c5a98443f755b4006e971dc/src/common.js#L211
 */
export const getPickRegex = (filterList: string[]) => new RegExp(`^(${
  filterList
    .map(f => f.replaceAll('*', '.*'))
    .join('$|^')
})$`, 'i')

export const getSkipRegex = (filterList: string[]) => new RegExp(`^(${
  filterList
    .map(f => f.replaceAll('*', '.*'))
    .join('$|^')
})$`, 'i')

export const getAllFilterList = (filter: string) => filter
  .replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
  .split(/\s*[,:]\s*/)

export const getPickFilterList = (filterList: string[]) => filterList.filter(f => !f.startsWith('-'))
export const getSkipFilterList = (filterList: string[]) => filterList.filter(f => f.startsWith('-')).map(f => f.slice(1))

/**
 * If no filter is set, then return a function that always return true (load all)
 */
const DEFAULT = true

export function stringFilterFactory (filter?: string) {
  if (!filter) {
    return (_: string) => DEFAULT
  }

  const filterList = getAllFilterList(filter)
  const pickFilterList = getPickFilterList(filterList)
  const skipFilterList = getSkipFilterList(filterList)

  // console.info('pickFilterList', pickFilterList)
  // console.info('skipFilterList', skipFilterList)

  const isPick = (str: string) => getPickRegex(pickFilterList).test(str)
  const isSkip = skipFilterList.length === 0
    ? (_: string) => false
    : (str: string) => getSkipRegex(skipFilterList).test(str)

  return (str: string) => !isSkip(str) && isPick(str)
}
