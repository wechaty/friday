/**
 * [nextYear, current, ...previous] rooms
 */
const rooms = [
  /**
   * [0]: Chair room (for the next year)
   *  is only for those who has given their talk to the club in the current year
   */
  'R:10696051795072507', // BOT5 Club Alumni 2023

  /**
   * [1]: Member room (for the current year)
   *  all messages in the latest room will be brodcasted to other rooms
   */
  'R:10740862767053411', // BOT5 Club Alumni 2022
] as const

export {
  rooms,
}
