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
7. some(callback): 测试数组中是否有元素满足callback函数指定的条件
8. fill(value,start?, end?):为数组填充数据
9. filter(callback): 返回由满足callback函数指定条件的元素组成的新数组
10. find(callback): 返回符合callback函数指定条件的第一个元素,没有返回undefined
11. findIndex(callback):返回符合callback函数指定条件的第一个元素的索引,没有返回-1
12. forEach(callback): 遍历数组,callback函数的参数为currentValue和index
13. includes(value): 判断数组中是否包含某个元素
14. indexOf(value): 返回数组中指定元素的第一次出现的索引,没有则返回-1
15. lastIndexOf(value):返回数组中指定元素的第后一次出现的索引,没有则返回-1
16. join(separator?): 通过指定分隔符将数组的各个元素连接成字符串
17. map(callback):  返回经过callback函数处理过的,每个元素组成的新数组.
18. reduce(callback): callback函数作为一个累加器,最后返回一个计算结果值.
19. reduceRight(callback): 与reduce类似,不过计算顺序由右往左.
20. push(value): 将元素加入到数组的末尾
21. pop(): 将数组的最后一个元素移出数组
22. reverse(): 将数组元素倒序.会改变原数组
23. shift(): 移出第一个元素.会改变原数组.如果数组为空则返回undefined.
24. unshift():在数组的头部添加一个或多个元素,会改变原数组
25. slice():获取数组指定区间的元素,不会改变原数组
26. sort(callback?):对数组进行排序(默认按照字符字典的顺序),会改变原数组
27. splice(start, deleteCount?,  item...): 在指定位置删除指定个数元素,并插入新元素,会改变原数组
28. toString():将数组转成字符串