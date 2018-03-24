## Buffer类的使用

### Buffer类的创建

1. 指定长度的Buffer实例

   ```typescript
   let a: Buffer = new Buffer(number: length);
   # 为Buffer实例赋值
   a.fill(value);
   ```

2. 通过数组实现Buffer的实例(使用数组初始化缓冲区)

   ```typescript
   let a: Buffer = new Buffer(array);
   ```

3. 通过字符串和编码实现Buffer的实例(使用字符串初始化缓冲区)

   ```typescript
   # 默认编码是utf-8
   let a: Buffer = new Buffer(str, encoding);
   ```

### Buffer类的辅助操作方法

1. 编码检查

   ```typescript
   Buffer.isEncoding('utf-8');
   Buffer.ifEncoding('gbk');
   ```

   **执行结果**

   ```
   > Buffer.isEncoding('utf-8')
   true
   > Buffer.isEncoding('gbk')
   false
   ```

2. Buffer类检查

   ```typescript
   Buffer.isBuffer(new Buffer([1,2,3,4,5,6]));
   Buffer.isBuffer([1,2,3,4,5,6]);
   ```

   **执行结果**

   ```
   > Buffer.isBuffer(new Buffer([1,2,3,4,5,6]));
   true
   > Buffer.isBuffer([1,2,3,4,5,6]);
   false
   ```

3. 字符串的字节长度

   ```typescript
   Buffer.byteLength("我喜欢编程");	
   ```

   **执行结果**

   ```
   > Buffer.byteLength("我喜欢编程");
   15
   ```

4. Buffer的连接

   ```typescript
   let a: Buffer = new Buffer("我");
   let b: Buffer = new Buffer("喜");
   let c: Buffer = new Buffer("欢");
   let d: Buffer = new Buffer("编程");
   let str: Buffer = Buffer.concat([a, b, c, d]);
   console.log(str.toString());
   ```

   **运行结果**

   ```
   我喜欢编程
   ```

   ​

5. Buffer的比较:用于Buffer的内容排序,按字符串的顺序进行排序

   ```typescript
   let a: Buffer = new Buffer("10");
   let b: Buffer = new Buffer('50');
   let c: Buffer = new Buffer('123');

   console.log(Buffer.compare(a, b));
   console.log(Buffer.compare(b, c));

   console.log([a, b, c].sort(Buffer.compare).toString());
   ```

   **运行结果**

   ```
   -1
   1
   10,123,50
   ```

### Buffer的数据写入

```typescript
let a: Buffer = new Buffer(128);
a.write("第一次写入数据");
console.log(a.toString());
let len1: number = a.write("覆盖第一次写入的数据");
console.log(a.toString());
a.write("接着第二次的数据写入新数据",len1);
console.log(a.toString());
```

**运行结果**

```
第一次写入数据
覆盖第一次写入的数据
覆盖第一次写入的数据接着第二次的数据写入新数据
```

**注意:**

若想要继续写入Buffer,应该获取当前字节数作为偏移量,而不能直接使用a.length获取,这中方式获取到的整个Buffer的长度,而无法继续写入新的字节数据.

 	**Node.js的节点的缓冲区，根据读写整数的范围，提供了不同宽度的支持，使从1到8个字节（8位、16位、32位）的整数、浮点数(float)、双精度浮点数(double)可以被访问，分别对应不同的writeXXX()函数，使用方法与buf.write()类似。**

------



### Buffer的复制操作

```typescript
let a: Buffer = new Buffer("我喜欢编程");
let b: Buffer= new Buffer(128);
a.copy(b);
console.log(b.length + "  " + b.toString());
```

**运行结果**

```
128  我喜欢编程
```

