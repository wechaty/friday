#!/usr/bin/env node --loader=ts-node/esm

import { test }  from 'tstest'

import {
  stringFilterFactory,
}                       from './string-filter.js'

test('stringFilterFactory default true for undefined filter', async t => {
  const filterFunc = stringFilterFactory()
  t.equal(filterFunc('a'), true, 'should default to true')
})

test('stringFilterFactory support `:` as separator', async t => {
  const FIXTURES = [
    [
      'a:b',
      [
        [ 'a', true ],
        [ 'b', true ],
        [ 'c', false ],
      ],
    ],
    [
      '*:-b',
      [
        [ 'a', true ],
        [ 'b', false ],
        [ 'c', true ],
      ],
    ],
  ] as const

  for (const [ filter, testList ] of FIXTURES) {
    const filterFunc = stringFilterFactory(filter)
    for (const [ str, expected ] of testList) {
      t.equal(filterFunc(str), expected, `should filter "${str}" with "${filter}" as '${expected}'`)
    }
  }
})

test('stringFilterFactory smoke testing', async t => {
  const FIXTURES = [
    [
      '*',
      [
        [ 'a', true ],
        [ 'b', true ],
        [ 'c', true ],
      ],
    ],
    [
      'a,b',
      [
        [ 'a', true ],
        [ 'b', true ],
        [ 'c', false ],
      ],
    ],
    [
      '*,-b',
      [
        [ 'a', true ],
        [ 'b', false ],
        [ 'c', true ],
      ],
    ],
  ] as const

  for (const [ filter, testList ] of FIXTURES) {
    const filterFunc = stringFilterFactory(filter)
    for (const [ str, expected ] of testList) {
      t.equal(filterFunc(str), expected, `should filter "${str}" with "${filter}" as '${expected}'`)
    }
  }
})

test('stringFilterFactory for WechatyRepository', async t => {
  const FIXTURES = [
    [
      'WeChat,QQ',
      [
        [ 'WeChat', true ],
        [ 'QQ', true ],
        [ 'WhatsApp', false ],
      ],
    ],
    [
      '*,-WorkPro',
      [
        [ 'a', true ],
        [ 'WorkPro', false ],
        [ 'c', true ],
      ],
    ],
  ] as const

  for (const [ filter, testList ] of FIXTURES) {
    const filterFunc = stringFilterFactory(filter)
    for (const [ str, expected ] of testList) {
      t.equal(filterFunc(str), expected, `should filter "${str}" with "${filter}" as '${expected}'`)
    }
  }
})
