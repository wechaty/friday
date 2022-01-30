import { FridayConfig } from '../../config/mod.js'

/**
 * Huan(202201): This is a temporary solution to pass config
 *              to the plugins.
 *             It should be removed once we can use injection.
 * @deprecated: use injection in the future
 */
const fridayConfig = new FridayConfig()

export {
  fridayConfig,
}
