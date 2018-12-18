export class Bit {
  static getBit(number: number, position: number): number {
    return (number >> position) & 1 
  }

  static setBit(number: number, position: number): number {
    return (1 << position) | number
  }

  static clearBit(): void {

  }

  static updateBit(number: number, bitPosition: number, bitValue: 0 | 1): void {

  }

  static isEven(number : number): boolean {
    return false
  }

  static isPositive(number: number): boolean {
    return false
  }

  static mutiplyByTwo(number: number): number {
    return number << 1
  }

  static divideByTwo(number: number): number {
    return number >> 1
  }

  static switchSign(number: number): number {
    return 0
  }

  static multiply(a: number, b: number): number {
    return 0
  }

  static multiplyUnsigned(a: number, b: number): number {
    return 0
  }

  static countSetBit(number: number): number {
    return 0
  }

  static bitsDiff(a: number, b: number): number {
    return 0
  }

  static bitLength(number: number): number {
    return 0
  }

  static isPowerOfTwo(number: number): boolean {
    return false
  }

}