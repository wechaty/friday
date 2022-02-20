import envVar from 'env-var'

export class EnvVar {

  private envVar: typeof envVar

  constructor (
    env?: typeof process.env,
  ) {
    const ev = env ? envVar.from(env) : envVar
    this.envVar = ev as any as typeof envVar
  }

  get (key: string) {
    return this.envVar.get(key)
  }

}
