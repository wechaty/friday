/**
 * [nextYear, current, ...previous] rooms
 */
const rooms = [
  /**
   * [0]: Chair room (for the next year)
   *  is only for those who has given their talk to the club in the current year
   */
  '18013756151@chatroom', // BOT Friday Club Alumni 2023

  /**
   * [1]: Member room (for the current year)
   *  all messages in the latest room will be brodcasted to other rooms
   */
  '19244336373@chatroom', // BOT Friday Club Alumni 2022

  '18825797159@chatroom', // BOT Friday Club Alumni 2021
  '18095776930@chatroom', // BOT Friday Club Alumni 2020
  '17301175542@chatroom', // BOT Friday Club Alumni 2019
] as const

export {
  rooms,
}
