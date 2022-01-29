import { NestFactory } from '@nestjs/core'
import { ApplicationModule } from './app.module.js'

import {
  WEB_PORT,
}               from './config.js'

async function bootstrap () {
  const app = await NestFactory.create(ApplicationModule)
  await app.listen(WEB_PORT, () => console.info('Application is listening on port 3000.'))
}

bootstrap()
  .catch(console.error)
