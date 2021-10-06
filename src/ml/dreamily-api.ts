import Axios from 'axios'
import { log } from 'wechaty'

export enum StoryStyle {
  boyLove     = '601f92f60c9aaf5f28a6f908',   // #纯爱
  detailedly  = '601ac4c9bd931db756e22da6',   // #小梦1号
  fantasy     = '60211134902769d45689bf75',   // #玄幻
  imaginative = '60094a2a9661080dc490f75a',   // #小梦0号
  romance     = '601f936f0c9aaf5f28a6f90a',   // #言情
}

export interface DreamilyApiOptions {
  content : string,
  style   : StoryStyle,
}

const DREAMILY_ENDPOINT = 'http://if.caiyunai.com/v1/dream/'

/**
 *  账户注册：通过 http://if.caiyunai.com/dream 注册一个彩云小梦的普通用户
 *  注册完成后：在 chrome 浏览器地址栏输入（其中前缀 javascript 需要单独复制）：
 *    javascript:alert(localStorage.cy_dream_user)，得到你的uid
 */
const UID = '6065c60e950e7a5204b7b679'

const NID = '606686a19d4d31690c711993'

async function dreamilyApi (options: DreamilyApiOptions): Promise<string> {
  log.verbose('WechatyVorpalFriday', 'dreamilyApi(%s)', JSON.stringify(options))

  const payload = {
    content : options.content,
    mid     : options.style,
    nid     : NID,
    title   : 'Wechaty: A Conversational RPA SDK for Chatbot Makers.',
    // title: 'Friday',
  }
  // console.info('payload:', payload)

  const response = await Axios.post<typeof payload & {
    data?: any
  }>(
    DREAMILY_ENDPOINT + UID + '/novel_ai',
    payload,
  )

  if (response.status < 200 || response.status >= 300) {
    throw new Error('chatApi request fail: ' + response.statusText)
  }

  const xid = response.data.data.xid
  // console.info('response:', response.data.data.xid)
  // data: { status: 0, msg: 'ok', data: { xid: '6067fc298629c82947709bd2' } }

  const resultList = await xidResult({
    nid: NID,
    xid,
  })

  return resultList.map(result => result.content).join('\n\n-----\n\n')
}

interface XidPayload {
  xid: string,  // continue writing id
  nid: string,  // story id
}

interface XidResult {
  content: string
  _id: string,
  mid: string,
}

async function xidResult (payload: XidPayload): Promise<XidResult[]> {
  let ttl = 60
  while (ttl-- > 0) {
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 获取结果

    const response = await Axios.post<typeof payload & {
      data?: any
    }>(
      DREAMILY_ENDPOINT + UID + '/novel_dream_loop',
      payload,
    )

    if (response.status < 200 || response.status >= 300) {
      throw new Error('dreamily API request fail: ' + response.statusText)
    }

    // console.info('resp:', response.data.data.rows)

    if (response.data.data?.rows?.length > 0) {
      return response.data.data.rows
    }
  }
  throw new Error('xidResult: ttl timeout')
}

export { dreamilyApi }
