import { NestFactory } from '@nestjs/core'
import { ApplicationModule } from './app.module.js'

import { VERSION } from './config.js'

import { EnvVar } from './infrastructures/mod.js'

async function bootstrap () {
  const app     = await NestFactory.create(ApplicationModule)
  const envVar  = await app.resolve(EnvVar)

  const port = envVar
    .get('WEB_PORT')
    .default(8788)
    .asPortNumber()

  console.info(`Friday BOT v${VERSION}`)

  console.info(`Listening on port ${port} ...`)
  await app.listen(port, () =>
    console.info(`Listening on port ${port} ... done`),
  )
}

bootstrap()
  .catch(console.error)
