import { FridaySetting } from './mod.js'

/**
 * Huan(202201): This is a temporary solution to pass config
 *              to the plugins.
 *             It should be removed once we can use injection.
 * @deprecated: use injection in the future
 */
const fridaySetting = new FridaySetting()

export {
  fridaySetting,
}
