export class Bit {
  static getBit(number: number, position: number): number {
    return (number >> position) & 1 
  }

  static setBit(number: number, position: number): number {
    return (1 << position) | number
  }

  static clearBit(number: number, position: number): number {
    return ~(1 << position) & number
  }

  static updateBit(number: number, position: number, bitValue: 0 | 1): number {
    const clearMask = ~ (1 << position)
    // Clear bit value and then set it up to required value
    return clearMask & number | (bitValue  << position)
  }

  static isEven(number : number): boolean {
    return (number & 1) === 0
  }

  static isPositive(number: number, bitNum?: number): boolean {
    if (number === 0) {
      return false
    }
    bitNum = bitNum ? bitNum - 1 : 31
    return ((number >> bitNum) & 1) === 0
  }

  static multiplyByTwo(number: number): number {
    return number << 1
  }

  static divideByTwo(number: number): number {
    return number >> 1
  }

  static switchSign(number: number): number {
    if (number < 0) {
      return ~(number - 1)
    }
    return ~number + 1 
  }

  static multiply(a: number, b: number): number {
    if (a === 0 || b === 0) {
      return 0
    }
    const multiplyByOdd = () => this.multiply(this.multiplyByTwo(a), this.divideByTwo(b + 1)) - a

    const multiplyByEven = () => this.multiply(this.multiplyByTwo(a), this.divideByTwo(b))

    return this.isEven(b) ? multiplyByEven() : multiplyByOdd()
  }

  static multiplyUnsigned(a: number, b: number): number {
    return 0
  }

  // static countSetBit(number: number): number {
  //   return 0
  // }

  // static bitsDiff(a: number, b: number): number {
  //   return 0
  // }

  // static bitLength(number: number): number {
  //   return 0
  // }

  // static isPowerOfTwo(number: number): boolean {
  //   return false
  // }

}