import { readPackageUpSync } from 'read-pkg-up'

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const pkg = readPackageUpSync({ cwd: __dirname })?.packageJson
const VERSION = pkg?.version || '0.0.0'

export { VERSION }
