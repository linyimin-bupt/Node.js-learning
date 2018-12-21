import should from 'should'

import { Bit } from './bit'

describe('Bit', () => {

  describe('#getBit', () => {
    const number   = 0b00100
    it('should return 0', () => {
      const EXPECTED = 0
      const result   = Bit.getBit(number, 0)
      should(result).be.equal(EXPECTED)
    })
    it('should return 0', () => {
      const EXPECTED = 0
      const result   = Bit.getBit(number, 1)
      should(result).be.equal(EXPECTED)
    })

    it('should return 1', () => {
      const EXPECTED = 1
      const result   = Bit.getBit(number, 2)
      should(result).be.equal(EXPECTED)
    })
    it('should return 0', () => {
      const EXPECTED = 0
      const result   = Bit.getBit(number, 3)
      should(result).be.equal(EXPECTED)
    })

    it('should return 0', () => {
      const EXPECTED = 0
      const result   = Bit.getBit(number, 4)
      should(result).be.equal(EXPECTED)
    })
  })
  
  describe('#setBit', () => {
    it('should return 0b0101', () => {
      const EXPECTED = 0b0101
      const number   = 0b0100
      const result   = Bit.setBit(number, 0)
      should(result).be.equal(EXPECTED)
    })

    it('should return 0b0110', () => {
      const EXPECTED = 0b0110
      const number   = 0b0100
      const result   = Bit.setBit(number, 1)
      should(result).be.equal(EXPECTED)
    })

    it('should return 0b0100', () => {
      const EXPECTED = 0b0100
      const number   = 0b0100
      const result   = Bit.setBit(number, 2)
      should(result).be.equal(EXPECTED)
    })

    it('should return 0b1100', () => {
      const EXPECTED = 0b1100
      const number   = 0b0100
      const result   = Bit.setBit(number, 3)
      should(result).be.equal(EXPECTED)
    })
  })

  describe('#clearBit', () => {
    it('should return 0b0100', () => {
      const EXPECTED = 0b0100
      const number   = 0b0100
      const result   = Bit.clearBit(number, 0)
      should(result).be.equal(EXPECTED)
    })

    it('should return 0b0100', () => {
      const EXPECTED = 0b0100
      const number   = 0b0100
      const result   = Bit.clearBit(number, 1)
      should(result).be.equal(EXPECTED)
    })

    it('should return 0b0000', () => {
      const EXPECTED = 0b0000
      const number   = 0b0000
      const result   = Bit.clearBit(number, 2)
      should(result).be.equal(EXPECTED)
    })

    it('should return 0b0000', () => {
      const EXPECTED = 0b0000
      const number   = 0b0000
      const result   = Bit.clearBit(number, 3)
      should(result).be.equal(EXPECTED)
    })
  })

  describe('#updateBit', () => {
    it('should return 0b0101', () => {
      const EXPECTED = 0b0101
      const number   = 0b0100
      const result   = Bit.updateBit(number, 0, 1)
      should(result).be.equal(EXPECTED)
    })

    it('should return 0b0110', () => {
      const EXPECTED = 0b0110
      const number   = 0b0100
      const result   = Bit.updateBit(number, 1, 1)
      should(result).be.equal(EXPECTED)
    })

    it('should return 0b0000', () => {
      const EXPECTED = 0b0000
      const number   = 0b0000
      const result   = Bit.updateBit(number, 2, 0)
      should(result).be.equal(EXPECTED)
    })

    it('should return 0b1100', () => {
      const EXPECTED = 0b1100
      const number   = 0b0100
      const result   = Bit.updateBit(number, 3, 1)
      should(result).be.equal(EXPECTED)
    })
  })

  describe('#isEven', () => {
    it('should return true', () => {
      const EXPECTED = true
      const number   = 0b0100
      const result   = Bit.isEven(number)
      should(result).be.equal(EXPECTED)
    })

    it('should return false', () => {
      const EXPECTED = false
      const number   = 0b0101
      const result   = Bit.isEven(number)
      should(result).be.equal(EXPECTED)
    })

    it('should return false', () => {
      const EXPECTED = false
      const number   = 0b1111
      const result   = Bit.isEven(number)
      should(result).be.equal(EXPECTED)
    })

    it('should return true', () => {
      const EXPECTED = true
      const number   = 0b0000
      const result   = Bit.isEven(number)
      should(result).be.equal(EXPECTED)
    })
  })

  describe('#isPositive', () => {
    it('should return true', () => {
      const EXPECTED = true
      const number   = 0b0100
      const result   = Bit.isPositive(number)
      should(result).be.equal(EXPECTED)
    })

    it('should return false', () => {
      const EXPECTED = false
      const number   = 0b1101
      const result   = Bit.isPositive(number, 4)
      should(result).be.equal(EXPECTED)
    })

    it('should return false', () => {
      const EXPECTED = false
      const number   = 0b1111
      const result   = Bit.isPositive(number, 4)
      should(result).be.equal(EXPECTED)
    })

    it('should return false', () => {
      const EXPECTED = false
      const number   = 0b0000
      const result   = Bit.isPositive(number)
      should(result).be.equal(EXPECTED)
    })
  })

  describe('#multiplyByTwo', () => {
    it('should return 196', () => {
      const EXPECTED = 196
      const number   = 98
      const result   = Bit.multiplyByTwo(number)
      should(result).be.equal(EXPECTED)
    })

    it('should return 2', () => {
      const EXPECTED = 2
      const number   = 1
      const result   = Bit.multiplyByTwo(number)
      should(result).be.equal(EXPECTED)
    })

    it('should return 6', () => {
      const EXPECTED = 6
      const number   = 3
      const result   = Bit.multiplyByTwo(number)
      should(result).be.equal(EXPECTED)
    })

    it('should return 100', () => {
      const EXPECTED = 100
      const number   = 50
      const result   = Bit.multiplyByTwo(number)
      should(result).be.equal(EXPECTED)
    })
  })

  describe('#divideByTwo', () => {
    it('should return 49', () => {
      const EXPECTED = 49
      const number   = 98
      const result   = Bit.divideByTwo(number)
      should(result).be.equal(EXPECTED)
    })

    it('should return 0', () => {
      const EXPECTED = 0
      const number   = 1
      const result   = Bit.divideByTwo(number)
      should(result).be.equal(EXPECTED)
    })

    it('should return 1', () => {
      const EXPECTED = 1
      const number   = 3
      const result   = Bit.divideByTwo(number)
      should(result).be.equal(EXPECTED)
    })

    it('should return 25', () => {
      const EXPECTED = 25
      const number   = 50
      const result   = Bit.divideByTwo(number)
      should(result).be.equal(EXPECTED)
    })
  })

  describe('#switchSign', () => {
    it('should return 49', () => {
      const EXPECTED = 49
      const number   = -49
      const result   = Bit.switchSign(number)
      should(result).be.equal(EXPECTED)
    })

    it('should return 0', () => {
      const EXPECTED = 0
      const number   = 0
      const result   = Bit.switchSign(number)
      should(result).be.equal(EXPECTED)
    })

    it('should return 1', () => {
      const EXPECTED = 1
      const number   = -1
      const result   = Bit.switchSign(number)
      should(result).be.equal(EXPECTED)
    })

    it('should return -25', () => {
      const EXPECTED = -25
      const number   = 25
      const result   = Bit.switchSign(number)
      should(result).be.equal(EXPECTED)
    })
  })

  describe('#multiply', () => {
    it('should return 49', () => {
      const EXPECTED = 49
      const a   = 7
      const b   = 7
      const result   = Bit.multiply(a, b)
      should(result).be.equal(EXPECTED)
    })

    it('should return -56', () => {
      const EXPECTED = -56
      const a   = 7
      const b   = -8
      const result   = Bit.multiply(a, b)
      should(result).be.equal(EXPECTED)
    })

    it('should return -15', () => {
      const EXPECTED = -15
      const a   = 3
      const b   = -5
      const result   = Bit.multiply(a, b)
      should(result).be.equal(EXPECTED)
    })

    it('should return 120', () => {
      const EXPECTED = 120
      const a   = -3
      const b   = -40
      const result   = Bit.multiply(a, b)
      should(result).be.equal(EXPECTED)
    })
  })

  describe('#multiplyUnsigned', () => {
    it('should return 49', () => {
      const EXPECTED = 49
      const a   = 7
      const b   = 7
      const result   = Bit.multiplyUnsigned(a, b)
      should(result).be.equal(EXPECTED)
    })

    it('should return 56', () => {
      const EXPECTED = 56
      const a   = 7
      const b   = 8
      const result   = Bit.multiplyUnsigned(a, b)
      should(result).be.equal(EXPECTED)
    })

    it('should return 15', () => {
      const EXPECTED = 15
      const a   = 3
      const b   = 5
      const result   = Bit.multiplyUnsigned(a, b)
      should(result).be.equal(EXPECTED)
    })

    it('should return 120', () => {
      const EXPECTED = 120
      const a   = 3
      const b   = 40
      const result   = Bit.multiplyUnsigned(a, b)
      should(result).be.equal(EXPECTED)
    })
  })

  describe('#countSetBit', () => {
    it('should return 4', () => {
      const EXPECTED = 4
      const a   = 0b1111
      const result   = Bit.countSetBit(a)
      should(result).be.equal(EXPECTED)
    })

    it('should return 3', () => {
      const EXPECTED = 3
      const a   = 0b1011
      const result   = Bit.countSetBit(a)
      should(result).be.equal(EXPECTED)
    })

    it('should return 2', () => {
      const EXPECTED = 2
      const a   = 0b0110
      const result   = Bit.countSetBit(a)
      should(result).be.equal(EXPECTED)
    })

    it('should return 1', () => {
      const EXPECTED = 1
      const a   = 0b0001
      const result   = Bit.countSetBit(a)
      should(result).be.equal(EXPECTED)
    })
  })

  describe('#bitsDiff', () => {
    it('should return 0', () => {
      const EXPECTED = 0
      const a   = 0
      const b   = 0
      const result   = Bit.bitsDiff(a, b)
      should(result).be.equal(EXPECTED)
    })

    it('should return 2', () => {
      const EXPECTED = 2
      const a   = 0b0110
      const b   = 0b1010
      const result   = Bit.bitsDiff(a, b)
      should(result).be.equal(EXPECTED)
    })

    it('should return 0', () => {
      const EXPECTED = 0
      const a   = 0b1111
      const b   = 0b1111
      const result   = Bit.bitsDiff(a, b)
      should(result).be.equal(EXPECTED)
    })

    it('should return 4', () => {
      const EXPECTED = 4
      const a   = 0b111111
      const b   = 0b11111100
      const result   = Bit.bitsDiff(a, b)
      should(result).be.equal(EXPECTED)
    })
  })
})