import { readPackageUpSync } from 'read-pkg-up'

const pkg = readPackageUpSync({ cwd: __dirname })!.packageJson
const VERSION = pkg.version

export { VERSION }
