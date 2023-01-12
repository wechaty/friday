import {
  log,
  Wechaty,
}               from 'wechaty'
import {
  ScanStatus,
}               from 'wechaty-puppet/types'

export default async function onScan (
  this   : Wechaty,
  qrcode : string,
  status : number,
): Promise<void> {
  log.info('on-scan', 'onScan() [%s(%s)] %s',
    ScanStatus[status],
    status,
    qrcode,
  )
}
