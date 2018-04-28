### 安装相关依赖

```shell
npm install mocha should -g
npm install mocha should -D
```

### 安装类型定义文件

```shell
npm install @types/mocha @types/should -D
```

### 编写测试用例

**./sortTestHelper/sortTestHelper.ts产生一个指定元素个数，和范围的随机整型数组**

```typescript
/**
 * 生成n个随机数的的数组
 * @param n 数组的元素个数
 * @param rangeL 随机数的最小值
 * @param rangeR 随机数的最大值
 */
function generateRandomArray(n: number, rangeL: number, rangeR: number): number[]{
    if(rangeL > rangeR){
        throw new Error('rangeL应该大于rangR')
    }
    let arr = new Array(n)
    for (let i = 0; i < n; i++) {
        arr[i] = Math.floor(Math.random() * (rangeR - rangeL + 1)) + rangeL
    }
    return arr
}

export default generateRandomArray
```

**./tests/sortTestHelper.test.ts测试用例的编写**

```typescript
import { default as generateRandomArray } from '../sortHelper/sortTestHelper'
import 'mocha';
import * as should from 'should'
describe('随即生成数组测试', function () {
	it('用例1', function () {
		const arr = generateRandomArray(10, 100, 105)
		let isRight = true
		for (let index in arr) {
			if (arr[index] < 100 || arr[index] > 105) {
				isRight = false
				break
			}
		}
		should(isRight).be.equal(true)
	})
})
```



### 运行测试用例

```shell
mocha -r ts-node/register ./tests/*test.ts
```

或者将上述命令写在package.json文件中

```json
"scripts": {
  "test": "mocha -r ts-node/register src/**/test.ts",
}
```

使用下面的命令完成测试用例的运行

```shell
npm run test
```



### 运行结果

```


  随即生成数组测试
    ✓ 用例1


  1 passing (4ms)

```

