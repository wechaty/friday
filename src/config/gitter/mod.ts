import * as envVar from 'env-var'

const token = envVar
  .get('WECHATY_PUPPET_GITTER_TOKEN')
  .required(true)
  .asString()

const name = 'friday@gitter'

const wechatyRoomId = '573324fcc43b8c60197242bf' // 'https://gitter.im/wechaty/wechaty'

export {
  name,
  token,
  wechatyRoomId,
}
