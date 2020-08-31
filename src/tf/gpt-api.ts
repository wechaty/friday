import Axios from 'axios'

import { BertWordPieceTokenizer } from 'tokenizers'

import path from 'path'

async function gptApi (
  prefix: string,
  length = 20,
): Promise<string> {

  const wordPieceTokenizer = await BertWordPieceTokenizer.fromOptions({
    lowercase: true,
    vocabFile: path.join(__dirname, 'clue-vocab.txt'),
  })
  const wpEncoded = await wordPieceTokenizer.encode(prefix, undefined, {
    addSpecialTokens: false,
  })

  const idList = wpEncoded.ids

  const json = {
    instances: [{
      inp: idList,
      length: length,
    }],
  }

  const ret = await Axios.post(
    'http://dev.chatie.io:8506/v1/models/gpt:predict',
    json,
  )

  const prediction = ret.data.predictions[0] as number[]
  // console.info(prediction)
  const text = await wordPieceTokenizer.decode(prediction)
  // console.info(typeof text, text)

  return text.replace(/ /g, '')
}

export { gptApi }
