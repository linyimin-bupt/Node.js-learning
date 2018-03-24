## Node Array的常用方法

### 属性

1. length:数组的长度

   ```typescript
   let x: Array<number> = [1,2,3,4,5,6];
   console.log(x.length);
   ```

   **运行结果**

   ```
   6
   ```

   ​

### 常用方法

1. Array.isArray(Object o): 判断一个对象是否是数组
2. Array.of(element0[, element1[, ...[, elementN]]]): 将参数转换成一个数组实例
3. concat(arr1, arr2...):连接多个数组并返回一个新的数组实例
4. copyWithin(target, start?, end?):复制一个数组(部分),但不改变原数组
5. entries():返回一个以索引为key的key/value对的**Iterator**对象
6. every(callback):测试所有的元素是否满足callback函数指定的条件
7. fill(value,start?, end?):为数组填充数据
8. filter(callback): 返回由满足callback函数指定条件的元素组成的新数组
9. find(callback): 返回符合callback函数指定条件的第一个元素,没有返回undefined
10. findIndex(callback):返回符合callback函数指定条件的第一个元素的索引,没有返回-1
11. forEach(callback): 遍历数组,callback函数的参数为currentValue和index
12. includes(value): 判断数组中是否包含某个元素
13. indexOf(value): 返回数组中指定元素的第一次出现的索引,没有则返回-1
14. lastIndexOf(value):返回数组中指定元素的第后一次出现的索引,没有则返回-1
15. join(separator?): 通过指定分隔符将数组的各个元素连接成字符串
16. map(callback):  返回经过callback函数处理过的,每个元素组成的新数组.
17. push(value): 将元素加入到数组的末尾
18. pop(): 将数组的最后一个元素移出数组