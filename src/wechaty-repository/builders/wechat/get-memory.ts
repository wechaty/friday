import {
  log,
}                 from 'wechaty'
import {
  MemoryCard,
}                 from 'memory-card'
import type { EnvVar } from '../../env-var'

export let memory: undefined | MemoryCard

export function getMemory (
  name: string,
  envVar: EnvVar,
): MemoryCard {
  log.verbose('getMemory', 'getMemory(%s)', name)

  if (memory) {
    return memory
  }

  const AWS_ACCESS_KEY_ID     = envVar.get('AWS_ACCESS_KEY_ID').asString()
  const AWS_SECRET_ACCESS_KEY = envVar.get('AWS_SECRET_ACCESS_KEY').asString()
  const AWS_REGION            = envVar.get('AWS_REGION').asString()
  const AWS_S3_BUCKET         = envVar.get('AWS_S3_BUCKET').asString()

  if (AWS_ACCESS_KEY_ID
    && AWS_REGION
    && AWS_SECRET_ACCESS_KEY
    && AWS_S3_BUCKET
  ) {
    log.verbose('getMemory', 'getMemory() creating new s3 memory')

    memory = new MemoryCard({
      name,
      storageOptions: {
        accessKeyId     : AWS_ACCESS_KEY_ID,
        bucket          : AWS_S3_BUCKET,
        region          : AWS_REGION,
        secretAccessKey : AWS_SECRET_ACCESS_KEY,
        type            : 's3',
      },
    })
  } else {
    log.verbose('getMemory', 'getMemory() creating new file memory')
    memory = new MemoryCard({ name })
  }

  return memory
}
