import readPkgUp from 'read-pkg-up'

const pkg = readPkgUp.sync({ cwd: __dirname })!.package
const VERSION = pkg.version

export { VERSION }
