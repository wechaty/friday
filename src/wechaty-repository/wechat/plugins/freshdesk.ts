/* eslint-disable sort-keys */
import {
  WechatyFreshdesk,
  WechatyFreshdeskConfig,
}                           from 'wechaty-freshdesk'

const config: WechatyFreshdeskConfig = {
  close: [
    [
      'Thank you for contacting the support of puppet service provider.',
      'We believe that your question has been answered and hope you are good now.',
      'Please feel free to contact us again if you have more questions.',
      'Thank you very much, and have a nice day!',
    ].join(' '),
  ],
  contact: true,
  room: false,

  /**
   * Huan(202201)
   *  TODO: use FridayConfig for the environment variables
   */
  apiKey          : process.env['WECHATY_PLUGIN_FRESHDESK_API_KEY'],
  portalUrl       : process.env['WECHATY_PLUGIN_FRESHDESK_PORTAL_URL'],
  webhookProxyUrl : process.env['WECHATY_PLUGIN_FRESHDESK_WEBHOOK_PROXY_URL'],
}

export const FreshdeskPlugin = WechatyFreshdesk(config)
