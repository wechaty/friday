import type { LoggerService } from '@nestjs/common'
import { log } from 'wechaty-puppet'

export class BroLogger implements LoggerService {

  /**
   * Write a 'log' level log.
   */
  log (message: any, ...optionalParams: any[]) {
    log.info(message, ...optionalParams)
  }

  /**
   * Write an 'error' level log.
   */
  error (message: any, ...optionalParams: any[]) {
    log.error(message, ...optionalParams)
  }

  /**
   * Write a 'warn' level log.
   */
  warn (message: any, ...optionalParams: any[]) {
    log.warn(message, ...optionalParams)
  }

  /**
   * Write a 'debug' level log.
   */
  debug (message: any, ...optionalParams: any[]) {
    log.silly(message, ...optionalParams)
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose (message: any, ...optionalParams: any[]) {
    log.verbose(message, ...optionalParams)
  }

}
