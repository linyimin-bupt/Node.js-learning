import test                from 'blue-tape'

import { Bit } from './bit'

test('setBit', (t) => {
  const EXPECTED = 0x00110
  const number   = 0x00100
  const result   = Bit.setBit(number, 1)

  t.equal(EXPECTED, result)
})