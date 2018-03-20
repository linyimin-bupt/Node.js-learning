## Node错误异常处理

### 同步代码

1. 使用try...catch

   ```typescript
   try {
       var err = new Error('example')
       throw err
   } catch (err) {
       // handle the error safely
       console.log(err)
   }
   ```

   **执行结果**

   ```
   Error: example
       at Object.<anonymous> (/home/linyimin/项目/api-gateway/src/test/test.ts:188:15)
       at Module._compile (module.js:635:30)
       at Module.m._compile (/usr/local/node/lib/node_modules/ts-node/src/index.ts:422:23)
       at Module._extensions..js (module.js:646:10)
       at Object.require.extensions.(anonymous function) [as .ts] (/usr/local/node/lib/node_modules/ts-node/src/index.ts:425:12)
       at Module.load (module.js:554:32)
       at tryModuleLoad (module.js:497:12)
       at Function.Module._load (module.js:489:3)
       at Function.Module.runMain (module.js:676:10)
       at Object.<anonymous> (/usr/local/node/lib/node_modules/ts-node/src/_bin.ts:177:12)
   ```

   ​

   ​

2. 函数直接返回Error

   ```typescript
   function divide(x: number, y: number): number | Error{
     if(y === 0){
       let error: Error = new Error("Can not divided by 0");
       return error;
     }
     return x / y;
   }

   let result: number | Error = divide(4, 2);
   if(result instanceof Error){
     console.log('4/0 = err', result);
   }else{
     console.log('4/2=', result);
   }

   result = divide(4, 0);
   if(result instanceof Error){
     console.log('4/0 = err', result);
   }else{
     console.log('4/2=', result);
   }
   ```

   **执行结果**

   ```
   4/2= 2
   4/0 = err Error: Can not divided by 0
       at divide (/home/linyimin/项目/api-gateway/src/test/test.ts:188:26)
       at Object.<anonymous> (/home/linyimin/项目/api-gateway/src/test/test.ts:201:12)
       at Module._compile (module.js:635:30)
       at Module.m._compile (/usr/local/node/lib/node_modules/ts-node/src/index.ts:422:23)
       at Module._extensions..js (module.js:646:10)
       at Object.require.extensions.(anonymous function) [as .ts] (/usr/local/node/lib/node_modules/ts-node/src/index.ts:425:12)
       at Module.load (module.js:554:32)
       at tryModuleLoad (module.js:497:12)
       at Function.Module._load (module.js:489:3)
       at Function.Module.runMain (module.js:676:10)
   ```

   ​

### 异步代码

1. 使用回调函数进行处理

   ```typescript
   function divide(x: number, y: number, next: Function): void {
       if ( y === 0 ) {
           next(new Error("Can't divide by zero"))
       }
       else {
           next(null, x/y)
       }
     }
     
     divide(4,2,function(err,result){    
       if ( err ) {
           console.log('4/2=err', err)
       }
       else {
           console.log('4/2='+result)
       }
     })
     divide(4,0,function(err,result){
       if ( err ) {
           console.log('4/0=err', err)
       }
       else {
           console.log('4/0='+result)
       }
     });
     
     
   ```

   **执行结果**

   ```
   4/2=2
   4/0=err Error: Can't divide by zero
       at divide (/home/linyimin/项目/api-gateway/src/test/test.ts:188:14)
       at Object.<anonymous> (/home/linyimin/项目/api-gateway/src/test/test.ts:203:3)
       at Module._compile (module.js:635:30)
       at Module.m._compile (/usr/local/node/lib/node_modules/ts-node/src/index.ts:422:23)
       at Module._extensions..js (module.js:646:10)
       at Object.require.extensions.(anonymous function) [as .ts] (/usr/local/node/lib/node_modules/ts-node/src/index.ts:425:12)
       at Module.load (module.js:554:32)
       at tryModuleLoad (module.js:497:12)
       at Function.Module._load (module.js:489:3)
       at Function.Module.runMain (module.js:676:10)
   ```

   ​

2. 将错误作为参数传给Promise的reject函数进行处理

   ```typescript
   function divide(x: number, y: number): Promise<number | Error>{
       return new Promise((resolve, reject) => {
           if(y === 0){
               let err: Error = new Error("Can not divided by 0");
               return reject(err);
           }
           resolve(x/y);
       });
   }

   divide(4, 2).then((result) =>{
       console.log('x / y = ', result);
   }).catch((err) => {
       console.log('x / y = err', err);
   });

   divide(4, 0).then((result) =>{
       console.log('x / y = ', result);
   }).catch((err) => {
       console.log('x / y = err', err);
   });
   ```

   **执行结果**

   ```
   x / y =  2
   x / y = err Error: Can not divided by 0
       at Promise (/home/linyimin/项目/api-gateway/src/test/test.ts:190:30)
       at new Promise (<anonymous>)
       at divide (/home/linyimin/项目/api-gateway/src/test/test.ts:188:12)
       at Object.<anonymous> (/home/linyimin/项目/api-gateway/src/test/test.ts:203:1)
       at Module._compile (module.js:635:30)
       at Module.m._compile (/usr/local/node/lib/node_modules/ts-node/src/index.ts:422:23)
       at Module._extensions..js (module.js:646:10)
       at Object.require.extensions.(anonymous function) [as .ts] (/usr/local/node/lib/node_modules/ts-node/src/index.ts:425:12)
       at Module.load (module.js:554:32)
       at tryModuleLoad (module.js:497:12)
   ```

   ​

3. 使用EventEmitter发布错误事件

   ```typescript
   import {EventEmitter} from "events";
   class Divider extends EventEmitter{
       constructor(){
           super();
       }
       divide(x: number, y: number): Divider{
           if(y === 0){
               let err: Error = new Error("Can not divided by 0");
               this.emit('error', err);
           }else{
               this.emit('divided', x, y, x / y);
           }
           return this;
           
       }
   }

   let divider = new Divider();
   divider.on('error', function(err){
       console.log(err);
   });
   divider.on('divided', function(x ,y , z){
       console.log(x + '/' + y + '=' + z);
   });

   divider.divide(4,0).divide(4,2);
   ```

   **执行结果**

   ```
   Error: Can not divided by 0
       at Divider.divide (/home/linyimin/项目/api-gateway/src/test/test.ts:167:30)
       at Object.<anonymous> (/home/linyimin/项目/api-gateway/src/test/test.ts:185:9)
       at Module._compile (module.js:635:30)
       at Module.m._compile (/usr/local/node/lib/node_modules/ts-node/src/index.ts:422:23)
       at Module._extensions..js (module.js:646:10)
       at Object.require.extensions.(anonymous function) [as .ts] (/usr/local/node/lib/node_modules/ts-node/src/index.ts:425:12)
       at Module.load (module.js:554:32)
       at tryModuleLoad (module.js:497:12)
       at Function.Module._load (module.js:489:3)
       at Function.Module.runMain (module.js:676:10)
   4/2=2
   ```

   ​

