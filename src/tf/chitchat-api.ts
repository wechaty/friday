import Axios from 'axios'

async function chatApi (gossip: string): Promise<string> {
  const gossipTokenList = gossip.split('')
  const json = {
    instances: [{
      length: gossipTokenList.length + 3,
      tokens: [
        '<S1>',
        ...gossipTokenList,
        '</S1>',
        '<S2>',
      ],
    }],
  }

  const ret = await Axios.post(
    'http://dev.chatie.io:8501/v1/models/chat:predict',
    json,
  )

  if (ret.status < 200 || ret.status >= 300) {
    throw new Error('chatApi request fail: ' + ret.statusText)
  }

  // {'predictions': [{'tokens': ['<S1>', '你', '好', '啊', '</S1>', '<S2>', '你', '好', '呀', '！', '</S2>', '</s>'], 'length': 11}]}
  const predictions = ret.data.predictions
  const tokenList = predictions[0].tokens as string[]

  const s2StartIdx = tokenList.indexOf('<S2>')
  const s2EndIdx = tokenList.indexOf('</S2>')

  const reply = tokenList.slice(s2StartIdx + 1, s2EndIdx).join('')
  return reply
}

export { chatApi }
