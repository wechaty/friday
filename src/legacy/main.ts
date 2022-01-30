import {
  startStatusPageMetricUpdater,
}                                 from './status-page/mod.js'

import {
  connectGitterFriday,
}                       from './cross-puppet.js'


  const gitter = bots.gitter
  const qq = bots.qq

  await connectGitterFriday({
    friday,
    gitter,
    qq,
  })

  startStatusPageMetricUpdater({
    friday,
    gitter: bots.gitter,
  })

