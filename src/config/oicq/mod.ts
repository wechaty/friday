import * as envVar from 'env-var'

const qq = envVar
  .get('WECHATY_PUPPET_OICQ_QQ')
  .required(true)
  .asIntPositive()

const name = 'friday@qq'

const wechatyRoomId = 'group_696864249' // Wechaty Developers' Home QQ

export {
  name,
  qq,
  wechatyRoomId,
}
