import * as envVar from 'env-var'

const appId = envVar
  .get('HUAN_APP_ID')
  .required(true)
  .asString()

const appSecret = envVar
  .get('HUAN_APP_SECRET')
  .required(true)
  .asString()

const token = envVar
  .get('HUAN_TOKEN')
  .required(true)
  .asString()

const webhookProxyUrl = envVar
  .get('HUAN_WEBHOOK_PROXY_URL')
  .required(true)
  .asString()

const name = 'friday@oa'

export {
  appId,
  appSecret,
  name,
  token,
  webhookProxyUrl,
}
