import * as envVar from 'env-var'

const token = envVar
  .get('WECHATY_PUPPET_GITTER_TOKEN')
  .required(true)
  .asString()

const name = 'friday@gitter'

export {
  name,
  token,
}
