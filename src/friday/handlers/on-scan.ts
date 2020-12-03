import {
  log,
  Wechaty,
  ScanStatus,
}               from 'wechaty'

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
