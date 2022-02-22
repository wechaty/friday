import { NestFactory } from '@nestjs/core'
import { ApplicationModule } from './app.module.js'

import { VERSION } from './config.js'

import { EnvVar } from './infrastructure/mod.js'

async function bootstrap () {
  const app     = await NestFactory.create(ApplicationModule)
  const envVar  = await app.resolve(EnvVar)

  const port = envVar
    .get('WEB_PORT')
    .default(8788)
    .asPortNumber()

  await app.listen(port, () => console.info(`Friday BOT v${VERSION} is listening on port ${port}.`))
}

bootstrap()
  .catch(console.error)
